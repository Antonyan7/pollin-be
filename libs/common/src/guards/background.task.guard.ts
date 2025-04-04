import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {OAuth2Client} from 'google-auth-library'
import {NestprojectConfigService, StructuredLogger} from '@libs/common'
import {UnauthorizedException} from '@libs/services-common/exceptions'
import {AuthTypes} from '../enums/auth.enum'
type ClaimData = {
  email: string
  email_verified: boolean
}

@Injectable()
export class BackgroundTaskGuard implements CanActivate {
  constructor(private configService: NestprojectConfigService) {}
  async getClaimData(token: string): Promise<ClaimData> {
    const authClient = new OAuth2Client()
    const ticket = await authClient.verifyIdToken({
      idToken: token,
    })
    const claim = ticket.getPayload()
    return {
      email: claim.email,
      email_verified: claim.email_verified,
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const BackgroundTaskGuardInvalidToken = 'BackgroundTaskGuardInvalidToken'
    const req = context.switchToHttp().getRequest()
    req.raw.locals = {}
    req.raw.locals.session = {authType: AuthTypes.PubSubBackgroundTask, source: 'PubSub'}
    try {
      const bearer = req.headers['authorization']
      const [, token] = bearer.match(/Bearer (.*)/)
      const claim = await this.getClaimData(token)
      const backgroundCloudInvoker = this.configService.get<string>('BACKGROUND_CLOUD_RUN_INVOKER')
      if (backgroundCloudInvoker === claim.email && claim.email_verified) {
        return true
      }
    } catch (error) {
      StructuredLogger.warn('BackgroundTaskGuard', BackgroundTaskGuardInvalidToken, error)
      throw new UnauthorizedException(BackgroundTaskGuardInvalidToken)
    }
    return false
  }
}
