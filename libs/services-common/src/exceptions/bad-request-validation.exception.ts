import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {HttpStatus} from '@nestjs/common'
import {DefaultHttpException} from '@libs/services-common/exceptions/http.exception'

export class BadRequestValidationException<T = unknown> extends DefaultHttpException {
  // eslint-disable-next-line max-params
  constructor(
    message: string,
    failureReasons = ResponseStatusCodes.BadRequest,
    title?: string,
    data: T = null,
  ) {
    super({
      message: message,
      statusCode: HttpStatus.BAD_REQUEST,
      code: failureReasons,
      title: title,
      data: data,
    })
  }
}
