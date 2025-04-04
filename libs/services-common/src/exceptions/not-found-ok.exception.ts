import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {HttpStatus} from '@nestjs/common'
import {DefaultHttpException} from '@libs/services-common/exceptions/http.exception'

export class NotFound200Exception extends DefaultHttpException {
  constructor(message: string) {
    super({
      message,
      statusCode: HttpStatus.OK,
      code: ResponseStatusCodes.NotFound,
    })
  }
}
