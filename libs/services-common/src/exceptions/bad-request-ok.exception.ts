import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {HttpStatus} from '@nestjs/common'
import {DefaultHttpException} from '@libs/services-common/exceptions/http.exception'

export class BadRequest200Exception extends DefaultHttpException {
  constructor(message: string, failureReasons = ResponseStatusCodes.BadRequest, title?: string) {
    super({
      message: message,
      statusCode: HttpStatus.OK,
      code: failureReasons,
      title: title,
    })
  }
}
