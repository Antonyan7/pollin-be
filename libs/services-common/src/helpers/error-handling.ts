import {
  NotFound404Exception,
  InternalServerErrorException,
  BadRequestException,
  BadRequestValidationException,
  UnauthorizedException,
  UnprocessableEntityException,
  ValidationException,
  NotFound200Exception,
  BadRequest200Exception,
  InvalidOk200Exception,
  DtoValidationException,
  BadRequestWithoutLogException,
} from '@libs/services-common/exceptions'
import {MfaRequiredException} from '../exceptions/mfa-required.exception'
import {StructuredLogger} from '@libs/common'
import {BadRequestWarningException} from '@libs/services-common/exceptions/bad-request-warning-log.exception'
import {ErrorLogService} from '@libs/common/enums'
import {BadRequestWarningValidationException} from '@libs/services-common/exceptions/bad-request-warning-validation.exception'

export const handleError = <T extends Record<string, unknown>>(
  error: Error,
  logError: {functionName: string; eventName: string; data?: T},
  errorType?: ErrorLogService,
): void => {
  const warningSeverityExceptions = [
    BadRequestValidationException,
    BadRequest200Exception,
    InvalidOk200Exception,
    BadRequestWarningException,
    BadRequestWarningValidationException,
  ]

  const noLogExceptions = [BadRequestWithoutLogException, NotFound200Exception]

  const exceptions = [
    NotFound404Exception,
    ValidationException,
    InternalServerErrorException,
    UnprocessableEntityException,
    BadRequestException,
    UnauthorizedException,
    MfaRequiredException,
    DtoValidationException,
    ...warningSeverityExceptions,
    ...noLogExceptions,
  ]

  if (warningSeverityExceptions.some((exception) => error instanceof exception)) {
    StructuredLogger.warn(logError.functionName, logError.eventName, {
      ...parseError(error),
      ...logError.data,
    })
  } else if (!noLogExceptions.some((exception) => error instanceof exception)) {
    StructuredLogger.error(logError.functionName, logError.eventName, {
      ...parseError(error, errorType),
      ...logError.data,
    })
  }
  // handle instantiated errors for throwing the exceptions of the same type as the input error
  for (const exceptionType of exceptions) {
    if (error instanceof exceptionType) {
      throw error
    }
  }

  throw new InternalServerErrorException()
}

export const parseError = (
  error: Error,
  errorType?: ErrorLogService,
): {errorInfo: {message: string | Error; stack?: string}} => {
  if (errorType) {
    return {
      errorInfo: {
        message: error?.message ?? error,
        stack: customizeErrorParse(error?.stack, errorType),
      },
    }
  }
  return {errorInfo: {message: error?.message ?? error, stack: error?.stack}}
}

export const customizeErrorParse = (
  stack: string | undefined,
  errorType: ErrorLogService,
): string => {
  return `${errorType}: (${stack ? stack?.split(': ')[0] : ''}) ${stack ? stack?.split(': ').slice(1).join(': ') : ''}`
}
