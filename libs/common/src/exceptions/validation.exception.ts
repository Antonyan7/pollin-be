// eslint-disable-next-line no-restricted-imports
import {HttpException, HttpStatus} from '@nestjs/common'

export class ValidationException extends HttpException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message?: string | Record<string, unknown> | any, error = 'Validation Error') {
    super({statusCode: HttpStatus.BAD_REQUEST, error, message}, HttpStatus.BAD_REQUEST)
  }
}
