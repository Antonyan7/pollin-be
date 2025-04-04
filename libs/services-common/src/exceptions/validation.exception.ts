import {DefaultHttpException} from '@libs/services-common/exceptions'
import {HttpStatus} from '@nestjs/common'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'

export class ValidationException extends DefaultHttpException {
  constructor(message?: string, failureReasons = ResponseStatusCodes.BadRequest, title?: string) {
    super({
      message: message,
      statusCode: HttpStatus.BAD_REQUEST,
      code: failureReasons,
      title: title,
    })
  }
}
