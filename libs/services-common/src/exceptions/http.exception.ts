import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
// eslint-disable-next-line no-restricted-imports
import {HttpException} from '@nestjs/common'
export class DefaultHttpException<T = unknown> extends HttpException {
  constructor(data: {
    message: string
    statusCode: number
    code: ResponseStatusCodes
    title?: string
    data?: T
  }) {
    super(
      {message: data.message, code: data.code, data: data.data, title: data.title},
      data.statusCode,
    )
  }
}
