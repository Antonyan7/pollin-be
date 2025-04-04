import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {OAuth2Client} from 'google-auth-library'
import {AuthTypes} from '@libs/common/enums'
type ClaimData = {
  email: string
  email_verified: boolean
}

@Injectable()
export class BackgroundTaskGuard implements CanActivate {
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
    const req = context.switchToHttp().getRequest()
    req.raw.locals = {}
    req.raw.locals.session = {authType: AuthTypes.PubSubBackgroundTask, source: 'PubSub'}

    return true
  }
}
