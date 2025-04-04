import {ExecutionContext, createParamDecorator} from '@nestjs/common'

export interface SessionContext {
  email: string
  isEmailVerified: boolean
  authUserId: string
  tokenIat: number
  tokenExp: number
  source: string
  /** Required for Staff User */
  staffId?: number
  /** Required for Staff User */
  staffUUID?: string
  /** Required for Staff User */
  name?: string
}
/**
 * Passes authUser object to the controller
 */
export const SessionContextDecorator = createParamDecorator(
  (_, ctx: ExecutionContext): SessionContext => {
    const request = ctx.switchToHttp().getRequest()
    return request.raw.locals?.session
  },
)
