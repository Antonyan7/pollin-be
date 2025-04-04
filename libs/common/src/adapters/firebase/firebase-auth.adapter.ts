import {appCheck} from 'firebase-admin'
import {
  DecodedIdToken,
  getAuth,
  CreateRequest,
  UserRecord,
  TenantAwareAuth,
  PhoneMultiFactorInfo,
  UpdatePhoneMultiFactorInfoRequest,
  UpdateRequest,
} from 'firebase-admin/auth'
import {Injectable} from '@nestjs/common'
import {DateConst} from '@libs/common/enums'
import {
  BadRequestException,
  BadRequestWarningException,
  UnauthorizedException,
} from '@libs/services-common/exceptions'
import {isNullish, StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'
import {handleError, parseError} from '@libs/services-common/helpers/error-handling'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {JwtService} from '@nestjs/jwt'
import {getPhoneNumberFactor} from '@libs/common/helpers/phone-number.helper'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities/staff.entity'

export interface IdTokenPayload extends DecodedIdToken {
  name?: string
  staffId?: number
  staffUUID?: string
}

// declared to have shorted Logging in service
const logFunc = activityLogs.FirebaseAuthAdapterFunctions
const logAct = activityLogs.FirebaseAuthAdapterActions

@Injectable()
class FirebaseAuthAdapter {
  appCheck: appCheck.AppCheck
  private tenantAwareAuth: TenantAwareAuth

  private readonly firebaseAuth = getAuth()
  private jwtService = new JwtService()

  constructor() {
    this.appCheck = appCheck()
    this.tenantAwareAuth = this.createTenantAwareAuth()
  }

  private validateAppCheckTokenPayload(appCheckToken: string, source: string): void {
    try {
      if (isNullish([appCheckToken])) {
        throw new BadRequestWarningException(i18Messages.FIREBASE_APP_CHECK_TOKEN_MISSING_ERROR)
      }

      if (!appCheckToken?.length) {
        throw new BadRequestWarningException(i18Messages.FIREBASE_EMPTY_APP_CHECK_TOKEN_ERROR)
      }

      const isValid = this.jwtService.decode(appCheckToken)
      if (!isValid) {
        throw new BadRequestException(i18Messages.INVALID_FIREBASE_APP_CHECK_TOKEN_PAYLOAD_ERROR)
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.AuthGuardFunctions.ValidateAppCheck,
        eventName: activityLogs.AuthGuardActions.ValidateAppCheckFailed,
        data: {appCheckToken, source},
      })
    }
  }

  async verifyAppCheckToken(appCheckToken: string, source: string): Promise<void> {
    //verify appCheckToken payload
    this.validateAppCheckTokenPayload(appCheckToken, source)

    try {
      await this.appCheck.verifyToken(appCheckToken)
    } catch (error) {
      handleError(new UnauthorizedException(i18Messages.INVALID_APP_CHECK_TOKEN), {
        functionName: activityLogs.AuthGuardFunctions.ValidateAppCheck,
        eventName: activityLogs.AuthGuardActions.ValidateAppCheckFailed,
        data: {message: error, appCheckToken, source},
      })
    }
  }

  async verifyIdToken(idToken: string): Promise<IdTokenPayload> {
    // for a few specific cases - so checking revoke for every time is ok
    const checkRevoked = true

    let decodedToken = null
    try {
      decodedToken = await this.firebaseAuth.verifyIdToken(idToken, checkRevoked)
    } catch (error) {
      handleError(new UnauthorizedException(i18Messages.INVALID_ID_TOKEN), {
        functionName: logFunc.Verifyidtoken,
        eventName: logAct.VerifyIdTokenFailed,
        data: {errMsg: error?.message},
      })
    }
    return decodedToken
  }

  /**
   * Don't make Firebase server call for every check
   * createSessionCookie checks if token was revoked
   */
  async verifySessionCookie(sessionCookie: string): Promise<DecodedIdToken> {
    const checkCookiesRevoked = false
    let decodedCookie = null
    try {
      decodedCookie = await this.firebaseAuth.verifySessionCookie(
        sessionCookie,
        checkCookiesRevoked,
      )
    } catch (error) {
      StructuredLogger.warn(
        logFunc.VerifySessionCookie,
        logAct.VerifySessionCookieFailed,
        parseError(error),
      )
      return null
    }
    return decodedCookie
  }

  /**
   * Firebase Validates if Id Token is not revoked and valid when issues a session token
   */
  async createSessionCookie(idToken: string, expiryMinutes: number): Promise<string> {
    const expiresIn = expiryMinutes * DateConst.OneMinuteMsec

    let sessionCookie = null
    try {
      sessionCookie = await this.firebaseAuth.createSessionCookie(idToken, {expiresIn})
    } catch (error) {
      StructuredLogger.warn(
        logFunc.CreateSessionCookie,
        logAct.CreateSessionCookieFailed,
        parseError(error),
      )
      return null
    }
    return sessionCookie
  }

  async createAuthUser(props: CreateRequest): Promise<string> {
    try {
      const authUser = await this.firebaseAuth.createUser(props)

      return authUser.uid
    } catch (error) {
      handleError(error, {
        functionName: logFunc.CreateAuthUser,
        eventName: logAct.CreateAuthUserFailed,
      })
    }
  }

  async deleteUser(authUserId: string): Promise<void> {
    try {
      await this.firebaseAuth.deleteUser(authUserId)
    } catch (error) {
      handleError(error, {
        functionName: logFunc.DeleteAuthUser,
        eventName: logAct.DeleteAuthUserFailed,
      })
    }
  }

  async getAuthUserByEmail(email: string): Promise<UserRecord> {
    try {
      return await this.firebaseAuth.getUserByEmail(email)
    } catch (error) {
      StructuredLogger.warn(
        logFunc.GetAuthUserByEmail,
        logAct.GetAuthUserByEmailFailed,
        parseError(error),
      )
      return null
    }
  }

  async getAuthUserById(id: string, throwError = true): Promise<UserRecord> {
    try {
      return await this.firebaseAuth.getUser(id)
    } catch (error) {
      if (!throwError) {
        return null
      }

      handleError(error, {
        functionName: logFunc.GetAuthUserById,
        eventName: logAct.GetAuthUserByIdFailed,
      })
    }
  }

  async updateAuthUserPassword(id: string, password: string): Promise<UserRecord> {
    try {
      return await this.firebaseAuth.updateUser(id, {password})
    } catch (error) {
      handleError(error, {
        functionName: logFunc.UpdateAuthUserPassword,
        eventName: logAct.UpdateAuthUserPasswordFailed,
      })
    }
  }

  async verifyAuthUserEmail(id: string): Promise<UserRecord> {
    try {
      return this.firebaseAuth.updateUser(id, {emailVerified: true})
    } catch (error) {
      handleError(error, {
        functionName: logFunc.VerifyAuthUserEmail,
        eventName: logAct.VerifyAuthUserEmailFailed,
      })
    }
  }

  async updateAuthUserEmail(id: string, email: string, verify = false): Promise<UserRecord> {
    try {
      const payload: UpdateRequest = {email}
      if (verify) {
        payload.emailVerified = true
      }

      return this.firebaseAuth.updateUser(id, payload)
    } catch (error) {
      handleError(error, {
        functionName: logFunc.UpdateUserEmail,
        eventName: logAct.UserEmailUpdateFailed,
      })
    }
  }

  async updateAuthUserPhoneNumber(id: string, newPhoneNumber: string): Promise<UserRecord> {
    try {
      const authUser = await this.firebaseAuth.getUser(id)
      const enrolledFactors =
        (authUser?.multiFactor?.enrolledFactors as PhoneMultiFactorInfo[]) ?? []

      const factorToUpdate = getPhoneNumberFactor(enrolledFactors)

      const factorsToSet: UpdatePhoneMultiFactorInfoRequest[] = enrolledFactors.map((factor) => ({
        ...factor,
        ...(factorToUpdate && factor.uid === factorToUpdate.uid
          ? {phoneNumber: newPhoneNumber}
          : {}),
      }))

      if (!factorToUpdate) {
        factorsToSet.push({
          phoneNumber: newPhoneNumber,
          factorId: 'phone',
        })
      }

      return this.firebaseAuth.updateUser(id, {
        multiFactor: {
          enrolledFactors: factorsToSet,
        },
      })
    } catch (error) {
      handleError(error, {
        functionName: logFunc.UpdateAuthUserPhoneNumber,
        eventName: logAct.UpdateAuthUserPhoneNumberFailed,
      })
    }
  }

  async verifySamlIdentityProviderToken(idToken: string): Promise<IdTokenPayload> {
    // for a few specific cases - so checking revoke for every time is ok
    const checkRevoked = true
    try {
      if (!this.tenantAwareAuth) {
        StructuredLogger.error(logFunc.GetTenantAwareAuth, logAct.GetTenantAwareAuthFailed, {
          tenantAwareAuth: this.tenantAwareAuth,
        })
        throw new UnauthorizedException(i18Messages.INVALID_TENANT_ID_ERROR)
      }

      const decodedIdToken = await this.tenantAwareAuth.verifyIdToken(idToken, checkRevoked)
      const decodedIdTokenPayload = decodedIdToken as IdTokenPayload

      this.validateIdentityProvider(decodedIdTokenPayload)

      return decodedIdTokenPayload
    } catch (error) {
      StructuredLogger.warn(
        logFunc.VerifySamlIdentityProviderToken,
        logAct.VerifySamlIdentityProviderTokenFailed,
        parseError(error),
      )
      throw new UnauthorizedException(i18Messages.INVALID_ID_TOKEN)
    }
  }

  private createTenantAwareAuth(): TenantAwareAuth {
    const tenantManager = this.firebaseAuth.tenantManager()
    const tenantId = NestprojectConfigService.getInstance().get<string>('TENANT_ID')
    return tenantManager.authForTenant(tenantId)
  }

  private validateIdentityProvider(decodedIdToken: IdTokenPayload): void {
    const NestprojectConfigService = NestprojectConfigService.getInstance()
    const identityProvider = NestprojectConfigService.get<string>('IDENTITY_PROVIDER')
    const isEnabledCustomIdToken = NestprojectConfigService.get<string>('IS_ENABLED_CUSTOM_ID_TOKEN')

    const signInProviderOriginal = decodedIdToken?.firebase?.sign_in_provider
    const signInProviderCustom = decodedIdToken?.sign_in_provider

    // check if matches identity provider for original token and field from custom token is not set
    const isValidOriginalSignIn =
      signInProviderOriginal === identityProvider && signInProviderCustom === undefined

    // check if matches identity provider for custom token
    const isValidCustomSignIn =
      signInProviderCustom === identityProvider && signInProviderOriginal === 'custom'

    // Log and Throw Error for custom token and if it's disabled
    // IS_ENABLED_CUSTOM_ID_TOKEN is false for prod env
    if (isValidCustomSignIn && !isEnabledCustomIdToken) {
      StructuredLogger.error(logFunc.CustomIdTokenUsage, logAct.CustomIdTokenUsageDisabled, {
        isEnabledCustomIdToken,
      })
      throw new UnauthorizedException(i18Messages.CUSTOM_ID_TOKEN_USAGE_DISABLED)
    }

    // check with OR condition to cover all scenarios
    // if origin token is used, custom is false
    // if custom token is used, origin is false
    // identity provider doesn't match is covered
    if (
      (!isValidOriginalSignIn && !isValidCustomSignIn) ||
      (isValidOriginalSignIn && isValidCustomSignIn)
    ) {
      throw new UnauthorizedException(i18Messages.INVALID_IDENTITY_PROVIDER_ERROR)
    }
  }

  /**
   * shoud set customClaim into bucket storage
   * ... {storage: {folderPath1 : 1, folderPath2 : 1}}
   * Just for web users (using tenantAwareAuth)
   */
  async setNewCustomClaimsForBucket(
    staffUser: Staff,
    uniqueFolders: string[],
    revokeToken = false,
  ): Promise<void> {
    try {
      const authUserId = staffUser.authUserId
      const storageFoldersArr = uniqueFolders.map((folderPath) => {
        return {[folderPath]: 1}
      })

      const storageFoldersObjList = Object.assign({}, ...storageFoldersArr) //to remove indexes

      const storageClaims = {storage: {...storageFoldersObjList}}

      const webAuthUser = await this.getUserByTenant(authUserId) //to save other prev custom claims

      await this.tenantAwareAuth.setCustomUserClaims(authUserId, {
        ...webAuthUser.customClaims,
        ...storageClaims,
        staffId: staffUser.id,
        staffUUID: staffUser.uuid,
      })

      if (revokeToken) {
        await this.tenantAwareAuth.revokeRefreshTokens(authUserId)
      }
    } catch (error) {
      StructuredLogger.warn(
        logFunc.SetNewCustomClaimsForBucket,
        logAct.SetNewCustomClaimsForBucketFailed,
        parseError(error),
      )
      return null
    }
  }

  /**
   * shoud delete custom claims for bucket storage
   * Just for web users (using tenantAwareAuth)
   */
  async deleteCustomClaimsForBucket(authUserId: string): Promise<void> {
    try {
      const storageClaims = {storage: {}}

      const webAuthUser = await this.getUserByTenant(authUserId) //to save other prev custom claims
      await this.tenantAwareAuth.setCustomUserClaims(authUserId, {
        ...webAuthUser.customClaims,
        ...storageClaims,
      })
    } catch (error) {
      StructuredLogger.warn(
        logFunc.DeleteCustomClaimsForBucket,
        logAct.DeleteCustomClaimsForBucketFailed,
        parseError(error),
      )
      return null
    }
  }

  /**
   *  Get web user (diff tenant)
   */
  async getUserByTenant(authUserId: string): Promise<UserRecord> {
    return this.tenantAwareAuth.getUser(authUserId)
  }
}

export {FirebaseAuthAdapter}
