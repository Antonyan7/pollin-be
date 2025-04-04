import {Observable} from 'rxjs'
import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common'

import {FirebaseSessionService} from '@libs/common/services/firebase/session.service'
import {AuthTypes, ClientHeaders} from '@libs/common/enums'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

@Injectable()
export class SessionRenewalInterceptor implements NestInterceptor {
  constructor(private sessionService: FirebaseSessionService) {} //  private reflector: Reflector

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<void>> {
    const httpReq = context.switchToHttp().getRequest()
    const httpRes = context.switchToHttp().getResponse()

    const idToken = httpReq.headers[ClientHeaders.IdToken]

    const {session} = httpReq.raw.locals

    if (!session) {
      StructuredLogger.error(
        activityLogs.SessionRenewalInterceptorFunctions.Intercept,
        activityLogs.SessionRenewalInterceptorActions.SessionWasNotFound,
        {idToken},
      )
      return next.handle()
    }

    if (
      session.authType !== AuthTypes.FirebaseSession &&
      session.authType !== AuthTypes.FirebaseSessionPhoneMFA
    ) {
      return next.handle()
    }

    if (this.sessionService.isAllowedToRenew(session)) {
      if (idToken) {
        const {session, options} = await this.sessionService.createSession(idToken)
        StructuredLogger.info(
          activityLogs.SessionRenewalInterceptorFunctions.Intercept,
          activityLogs.SessionRenewalInterceptorActions.CheckIdToken,
          {message: 'Issuing new session'},
        )
        httpRes.setCookie('session', session, options)
      }
    }

    return next.handle()
  }
}
