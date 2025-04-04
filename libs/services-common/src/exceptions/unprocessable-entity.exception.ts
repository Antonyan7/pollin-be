import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {HttpStatus} from '@nestjs/common'
import {DefaultHttpException} from '@libs/services-common/exceptions/http.exception'

export class UnprocessableEntityException extends DefaultHttpException {
  constructor(
    message: string,
    failureReasons = ResponseStatusCodes.UnprocessableEntity,
    title?: string,
  ) {
    super({
      message: message,
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      code: failureReasons,
      title: title,
    })
  }
}
