import {Injectable} from '@nestjs/common'
import {NestprojectConfigService} from '../config/config-service'
import {DateConst} from '@libs/common/enums'
import {SessionContext} from '@libs/common/decorators'
import {FirebaseAuthAdapter} from '@libs/common/adapters/firebase/firebase-auth.adapter'
import {UnauthorizedException} from '@libs/services-common/exceptions'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {DateTimeUtil} from '@libs/common'
import * as i18Messages from '@libs/common/i18n/en/message.json'

@Injectable()
export class FirebaseSessionService {
  private expiryMinutes = this.configService.get<number>('SESSION_EXPIRY_MINUTES')
  private loginTokenExpiryMinutes = this.configService.get<number>('LOGIN_TOKEN_EXPIRY_MINUTES')
  private dateTime = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(
    private readonly firebaseAuthAdapter: FirebaseAuthAdapter,
    private readonly configService: NestprojectConfigService,
  ) {
    this.firebaseAuthAdapter = new FirebaseAuthAdapter()
  }

  isAllowedToRenew(session: SessionContext): boolean {
    const {tokenExp} = session
    const currentTime = this.getCurrentTime()
    const forSecondValid = tokenExp - currentTime
    const forMinutesValid = forSecondValid / DateConst.OneMinuteSec

    if (currentTime < tokenExp && forMinutesValid < this.expiryMinutes / 2) {
      StructuredLogger.info(
        activityLogs.FirebaseSessionServiceFunctions.IsAllowedToRenew,
        activityLogs.FirebaseSessionServiceActions.CheckToken,
        {message: 'Session renewal'},
      )
      return true
    }

    return false
  }

  /**
   * Check if not revoked, email verified and was issued no more that N minutes ago
   */
  async validateCreateSession(idToken: string): Promise<void> {
    const decodedToken = await this.firebaseAuthAdapter.verifyIdToken(idToken)
    const currentTime = this.getCurrentTime()
    const {auth_time: authTime} = decodedToken
    const authAgoSec = currentTime - authTime

    if (!decodedToken.email_verified) {
      throw new UnauthorizedException(i18Messages.EMAIL_NOT_VERIFIED)
    }

    if (authAgoSec > this.loginTokenExpiryMinutes * DateConst.OneMinuteSec) {
      throw new UnauthorizedException(i18Messages.LOGIN_TIME_OUT)
    }
  }

  /**
   * create session with validate token and is not revoked
   */
  async createSession(idToken: string): Promise<{
    session: string
    options: {
      maxAge: number
      httpOnly: boolean
      secure: boolean
      path: string
      domain: string
    }
  }> {
    const expiryMinutes = this.expiryMinutes
    const options = {
      maxAge: expiryMinutes * DateConst.OneMinuteMsec,
      httpOnly: true,
      secure: this.configService.getBool('SESSION_SECURE'),
      path: '/',
      domain: this.configService.get<string>('SESSION_DOMAIN'),
    }

    const session = await this.firebaseAuthAdapter.createSessionCookie(idToken, expiryMinutes)

    if (!session) {
      throw new UnauthorizedException(i18Messages.INVALID_TOKEN_ERROR)
    }

    return {session, options}
  }

  /**
   * Should Current Epoch Unix Timestamp
   * Same timezone as Firebase session
   */
  private getCurrentTime(): number {
    return this.dateTime.nowToDate(DateConst.OneSecMsec)
  }
}
