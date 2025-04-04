import {createParamDecorator, ExecutionContext} from '@nestjs/common'
import {ClientHeaders, TimeFormat} from '@libs/common/enums'

/**
 * Get time format for user from headers
 */
export const ClientTimeFormat = createParamDecorator((_, ctx: ExecutionContext): TimeFormat => {
  const request = ctx.switchToHttp().getRequest()
  const format = request.headers[ClientHeaders.TimeFormat]

  return Object.values(TimeFormat).includes(format) ? format : TimeFormat.H12
})
