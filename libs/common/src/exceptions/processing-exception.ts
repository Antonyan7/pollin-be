/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line no-restricted-imports
import {HttpException, HttpStatus} from '@nestjs/common'

export class ProcessingException extends HttpException {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(message?: any, error = 'Processing Error') {
    super({statusCode: HttpStatus.CONFLICT, error, message}, HttpStatus.CONFLICT)
  }
}
