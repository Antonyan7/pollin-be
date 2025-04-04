import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {DefaultHttpException} from '@libs/services-common/exceptions/http.exception'
import {HttpStatus} from '@nestjs/common'

export class InternalServerErrorException extends DefaultHttpException {
  constructor(
    message?: string,
    failureReasons = ResponseStatusCodes.InternalServerError,
    title?: string,
  ) {
    super({
      message: message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: failureReasons,
      title: title,
    })
  }
}
