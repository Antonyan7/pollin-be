import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {HttpStatus} from '@nestjs/common'
import {DefaultHttpException} from '@libs/services-common/exceptions/http.exception'

export class UnauthorizedException extends DefaultHttpException {
  constructor(message: string) {
    super({
      message: message,
      statusCode: HttpStatus.UNAUTHORIZED,
      code: ResponseStatusCodes.Unauthorized,
    })
  }
}
