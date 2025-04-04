import {AuthUserFixture, JWTFixture} from '@libs/common/test/fixtures/auth.fixture'
import {v4} from 'uuid'

export const jwtSign = (): string => v4()
export const jwtVerify = (token: string): Record<string, unknown> => {
  if (token === JWTFixture.invalid) {
    return undefined
  }

  return {}
}
export const jwtDecode = (token: string): {authUserId: string} => {
  if (token === JWTFixture.passwordReset.valid) {
    return {
      authUserId: AuthUserFixture.basic.uid,
    }
  }

  if (token === JWTFixture.passwordReset.userNotFound) {
    return {
      authUserId: null,
    }
  }
}
