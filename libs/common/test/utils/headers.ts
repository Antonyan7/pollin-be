import {ClientHeaders} from '@libs/common/enums'
import {AuthUser} from '../fixtures/auth.fixture'

export function headers(AuthUser: AuthUser): Record<string, string> {
  return {
    ...ClientHeaders,
    accept: 'application/json',
    [ClientHeaders.IdToken]: AuthUser.idToken,
    Cookie: `session=${AuthUser.sessionCookie}`,
  }
}
