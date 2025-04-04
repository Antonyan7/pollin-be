import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {ClientHeaders} from '@libs/common/enums'
import {
  asyncStorage,
  createRequestContext,
  RequestMetadata,
} from '@libs/services-common/helpers/async-hook'
import {Request, Response, NextFunction} from 'express'

export const asyncHookMiddleware = (request: Request, _: Response, next: NextFunction): void => {
  const headers = request.headers

  const ipAddress = request.headers['x-forwarded-for']
    ? String(request.headers['x-forwarded-for']).split(',')[0]
    : request.socket.remoteAddress

  const context = {
    [ClientHeaders.DeviceId]: headers[ClientHeaders.DeviceId],
    [ClientHeaders.RequestId]: headers[ClientHeaders.RequestId],
    [ClientHeaders.Lang]: headers[ClientHeaders.Lang],
    ipAddress,
  } as RequestMetadata

  StructuredLogger.debug(
    activityLogs.ApplicationBootstrapFunctions.Bootstrap,
    activityLogs.ApplicationBootstrapActions.CheckDebugModeFlag,
    {message: JSON.stringify(context)},
  )

  const requestMetadata = createRequestContext(context)
  asyncStorage.run(requestMetadata, () => next())
}
