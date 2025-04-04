import {DecodedIdToken} from 'firebase-admin/auth'
import {Reflector} from '@nestjs/core'
import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {AuthMFAfactorTypes, AuthTypes, ClientHeaders} from '@libs/common/enums'
import {
  FirebaseAuthAdapter,
  IdTokenPayload,
} from '@libs/common/adapters/firebase/firebase-auth.adapter'
import {UnauthorizedException, InternalServerErrorException} from '@libs/services-common/exceptions'
import {StructuredLogger, isE2eTestingBuild} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {MfaRequiredException} from '@libs/services-common/exceptions/mfa-required.exception'
import {getRequestContext} from '@libs/services-common/helpers/async-hook'
import * as i18Messages from '@libs/common/i18n/en/message.json'

/**
 * Global auth guard to handle different types of auth based on handler metadata
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private firebaseAuthAdapter: FirebaseAuthAdapter,
  ) {}

  /**
   * Verify session cookie by default
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    const {session} = req.cookies
    const appCheckToken = req.headers[ClientHeaders.AppCheck]
    const idToken = req.headers[ClientHeaders.IdToken]
    const source = req.headers[ClientHeaders.Source]
    const requestAuthType = this.reflector.get('AuthType', context.getHandler())
    const authType =
      typeof requestAuthType === 'function' ? requestAuthType(req) : requestAuthType?.type

    if (!authType) {
      throw new InternalServerErrorException(i18Messages.ADD_CORRESPONDING_PERMISSIONS_TO_ENDPOINT)
    }

    if (typeof requestAuthType === 'function' && !Object.values(AuthTypes).includes(authType)) {
      throw new UnauthorizedException(i18Messages.UNSUPPORTED_AUTH_TYPE)
    }
    // App check for every call
    if (isE2eTestingBuild()) {
      StructuredLogger.warn('AuthGuardCanActivate', 'AppCheckValidationSkipped', {})
    } else {
      await this.firebaseAuthAdapter.verifyAppCheckToken(appCheckToken, source)
    }

    let decodedToken = null

    // Consider Firebase session as default validation
    switch (authType) {
      case AuthTypes.AppCheck:
        break

      case AuthTypes.FirebaseSession:
        decodedToken = await this.validateSessionCookies(session)
        break

      case AuthTypes.FirebaseIdTokenWithoutEmail:
        decodedToken = await this.firebaseAuthAdapter.verifyIdToken(idToken)
        break

      case AuthTypes.FirebaseSessionPhoneMFA:
        decodedToken = await this.validateSessionCookies(session)
        await this.validatePhoneMFA(decodedToken)
        break

      case AuthTypes.SAMLAuthProviderGoogle:
        decodedToken = await this.validateSamlIdentityProviderToken(idToken)
        break

      default:
        decodedToken = await this.validateSessionCookies(session)
        await this.validatePhoneMFA(decodedToken)
        break
    }

    req.raw.locals = {}
    if (decodedToken) {
      req.raw.locals.session = {
        email: decodedToken.email,
        isEmailVerified: decodedToken.email_verified,
        authUserId: decodedToken.uid,
        tokenIat: decodedToken.iat,
        tokenExp: decodedToken.exp,
        staffId: decodedToken?.staffId,
        staffUUID: decodedToken?.staffUUID,
        name: decodedToken?.name,
        role: decodedToken?.role,
        roles: decodedToken?.roles,
        authType,
        source,
      }

      const requestContext = getRequestContext()
      if (requestContext) {
        requestContext.userId = decodedToken.uid
      }
    } else {
      req.raw.locals.session = {authType, source}
    }

    return true
  }

  private async validateSessionCookies(
    sessionCookie: string,
    checkEmailVerified = true,
  ): Promise<DecodedIdToken> {
    const decodedSession = await this.firebaseAuthAdapter.verifySessionCookie(sessionCookie)

    if (!decodedSession) {
      throw new UnauthorizedException(i18Messages.INVALID_SESSION_COOKIE)
    }

    if (checkEmailVerified && !decodedSession.email_verified) {
      throw new UnauthorizedException(i18Messages.EMAIL_IS_NOT_VERIFIED)
    }
    return decodedSession
  }

  private async validatePhoneMFA(decodedToken: DecodedIdToken): Promise<void> {
    if (isE2eTestingBuild()) {
      StructuredLogger.warn('validatePhoneMFA', 'MFAValidationSkipped', {})
      return
    }
    const user = await this.firebaseAuthAdapter.getAuthUserById(decodedToken.user_id)
    const factor = user?.multiFactor?.enrolledFactors?.find(
      (factor) => factor.factorId === AuthMFAfactorTypes.Phone,
    )
    if (!factor) {
      throw new MfaRequiredException(i18Messages.PHONE_MFA_IS_NOT_ENABLED)
    }
  }

  private async validateSamlIdentityProviderToken(idToken: string): Promise<IdTokenPayload> {
    // Don't use tenantAwareAuth for E2E test since it is not possible to export tenants auth
    if (isE2eTestingBuild()) {
      StructuredLogger.warn('validateSamlIdentityProviderToken', 'SamlTokenValidationSkipped', {})
      const decodedIdToken = await this.firebaseAuthAdapter.verifyIdToken(idToken)
      return decodedIdToken as IdTokenPayload
    }

    try {
      // TODO: To be removed by TEAMB-13593
      StructuredLogger.info(
        activityLogs.AuthGuardFunctions.ValidateSamlIdentityProviderToken,
        activityLogs.AuthGuardActions.ValidateSamlIdentityProviderToken,
        {message: `Start Saml token validation: ${idToken}`},
      )
      return await this.firebaseAuthAdapter.verifySamlIdentityProviderToken(idToken)
    } catch (error) {
      StructuredLogger.warn(
        activityLogs.AuthGuardFunctions.ValidateSamlIdentityProviderToken,
        activityLogs.AuthGuardActions.ValidateSamlIdentityProviderTokenFailed,
        error,
      )
      throw new UnauthorizedException(i18Messages.INVALID_ID_TOKEN)
    }
  }
}
