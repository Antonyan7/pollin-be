import {I18nLocalizationService} from './../services/i18n-localization.service'
import {StructuredLogger} from '@libs/common'

/* eslint-disable no-restricted-imports */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common'
/* eslint-enable no-restricted-imports */
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import * as i18Messages from '@libs/common/i18n/en/message.json'

/**
 * Changes error model response
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private isDevelopment: boolean,
    private readonly i18nLocalizationService: I18nLocalizationService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const exceptionResponse = exception['response']

    // show the stack trace in responses for the 'development' env
    if (exception instanceof HttpException) {
      const httpException = exception as HttpException

      if (this.isDevelopment && typeof exceptionResponse === 'object' && httpException.stack) {
        ;(exceptionResponse as Record<string, unknown> & {stack: string}).stack =
          httpException.stack
      }
    }

    // If unknown
    if (!exceptionResponse) {
      StructuredLogger.error('AllExceptionsFilter', 'catch', {
        message: 'Unknown error in exception: ' + exception,
        exceptionStack: (exception as Error)?.stack,
      })

      return response.status(status).send({
        data: null,
        status: {
          code: ResponseStatusCodes.UnknownError,
          message: !this.isDevelopment
            ? this.i18nLocalizationService.translate(i18Messages.INTERNAL_ERROR)
            : exception['message'],
        },
      })
    }

    let code, message, title, data

    try {
      code = exceptionResponse['code'] ?? exceptionResponse['statusCode']
      message =
        exceptionResponse['message'] ??
        this.i18nLocalizationService.translate(i18Messages.INTERNAL_ERROR)
      title = exceptionResponse['title']
      data = exceptionResponse['data'] ?? null
      if (Array.isArray(message)) {
        message = message.join(', ')
      }
    } catch (error) {
      StructuredLogger.error('AllExceptionsFilter', 'catch get properties', {
        message: 'cant get one value: code, statusCode, message or title from exception',
        errMsg: error?.message,
      })
    }

    if (exception instanceof UnprocessableEntityException) {
      code = ResponseStatusCodes.UnprocessableEntity
    }
    response.status(status).send({
      data,
      status: {
        code,
        message,
        title,
      },
    })
  }
}
