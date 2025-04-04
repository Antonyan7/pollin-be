import {REGISTRATION_TOKEN_NOT_REGISTERED} from '@libs/common/errors/push-notification.errors'

export function isUnregisteredToken(errorCode: string): boolean {
  return errorCode === REGISTRATION_TOKEN_NOT_REGISTERED
}
