import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {Request} from 'express'
import {ClientHeaders} from '@libs/common/enums'
import {StructuredLogger} from '@libs/common'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {regexUUID} from '@libs/common/utils/regex.utils'

@Injectable()
export class HeadersGuard implements CanActivate {
  private static requiredHeaders = [
    ClientHeaders.DeviceId,
    ClientHeaders.Source,
    ClientHeaders.RequestId,
    ClientHeaders.Lang,
    ClientHeaders.AppVersion,
  ]

  canActivate(context: ExecutionContext): boolean {
    const requestHeaders = context.switchToHttp().getRequest<Request>().headers
    const canActive = HeadersGuard.requiredHeaders.every((header) =>
      Boolean(requestHeaders[header]),
    )

    if (!canActive) {
      StructuredLogger.error('canActivate', 'HeadersGuard', {message: 'not all headers are set'})
      return false
    }

    const NestprojectSource = <string>requestHeaders[ClientHeaders.Source]

    const deviceId = <string>requestHeaders[ClientHeaders.DeviceId]
    if (!regexUUID.test(deviceId)) {
      StructuredLogger.error(
        'canActivate',
        'HeadersGuard-canActivate-validate-deviceId',
        parseError(
          new Error(
            `'x-Nestproject-device-id' is not match format or not provided for Nestproject Source: ${NestprojectSource}`,
          ),
        ),
      )
      return false
    }

    const requestId = <string>requestHeaders[ClientHeaders.RequestId]
    if (!regexUUID.test(requestId)) {
      StructuredLogger.error(
        'canActivate',
        'HeadersGuard-canActivate-validate-requestId',
        parseError(
          new Error(
            `'x-Nestproject-request-id' is not match format or not provided for Nestproject Source: ${NestprojectSource}`,
          ),
        ),
      )

      return false
    }

    return true
  }
}
