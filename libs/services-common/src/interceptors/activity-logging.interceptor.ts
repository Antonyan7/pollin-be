import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common'
import {Observable} from 'rxjs'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {parseError} from '../helpers/error-handling'
import {Reflector} from '@nestjs/core'
import {PATH_METADATA} from '@nestjs/common/constants'
import {ActivityLogFields, StructuredLogger} from '@libs/common'

export type RequestBody = {[key: string]: RequestBody} | RequestBody[] | number | string

export function getLogObject(obj: RequestBody): RequestBody {
  if (obj === null || obj === undefined || typeof obj !== 'object' || Array.isArray(obj)) {
    return null
  }

  const newObj = Object.entries(obj).reduce((accumulator, [key, value]) => {
    if (ActivityLogFields.has(key)) {
      accumulator[key] = value
    }
    return accumulator
  }, {})

  return Object.keys(newObj).length > 0 ? newObj : null
}

@Injectable()
export class ActivityLoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly prefix: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const request = context.switchToHttp().getRequest()

    const controllerPath = this.reflector.get<string>(PATH_METADATA, context.getClass())
    const handlerPath = this.reflector.get<string>(PATH_METADATA, context.getHandler())
    const method = request.method

    const endpoint = `${method} ${this.prefix}/${controllerPath}/${handlerPath}`.replaceAll(
      '//',
      '/',
    )
    const authUserId = request.raw.locals?.session?.authUserId

    let additionalMetaData = null

    try {
      if (request.body) {
        additionalMetaData = getLogObject(request.body)
      }
    } catch (error) {
      StructuredLogger.warn(
        activityLogs.ActivityLoggingInterceptorFunctions.Intercept,
        activityLogs.ActivityLoggingInterceptorActions.LogCreationFailed,
        parseError(error),
      )
    }

    StructuredLogger.activity(authUserId, endpoint, additionalMetaData ?? null)

    return next.handle()
  }
}
