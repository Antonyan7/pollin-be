import {ExecutionContext} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {DecodedIdToken} from 'firebase-admin/auth'
import {AuthMFAfactorTypes, AuthTypes, ClientHeaders} from '@libs/common/enums'
import {AuthGuard} from '@libs/common/guards/auth.guard'
import {MfaRequiredException} from '@libs/services-common/exceptions/mfa-required.exception'
import {UnauthorizedException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {FirebaseAuthAdapter} from '@libs/common/adapters/'

const userEmail1 = 'fhealthdev+Nestproject+TEST_AUTH3@gmail.com'

// eslint-disable-next-line max-lines-per-function
describe('AuthGuard', () => {
  let guard: AuthGuard
  let spyAppCheck: jest.SpyInstance
  let spyReflector: jest.SpyInstance
  let spySession: jest.SpyInstance
  let spyGetUserById: jest.SpyInstance
  let spyIdToken: jest.SpyInstance
  let spySamlIdentityProviderToken: jest.SpyInstance
  let getRequestMock: jest.Mock
  let httpContext: ExecutionContext

  beforeEach(async () => {
    getRequestMock = jest.fn()
    httpContext = {
      switchToHttp: () => ({
        getRequest: getRequestMock,
      }),
      getHandler: () => Function,
    } as unknown as ExecutionContext

    guard = new AuthGuard(new Reflector(), new FirebaseAuthAdapter())

    spyAppCheck = jest.spyOn(FirebaseAuthAdapter.prototype, 'verifyAppCheckToken')
    spyReflector = jest.spyOn(Reflector.prototype, 'get')
    spySession = jest.spyOn(FirebaseAuthAdapter.prototype, 'verifySessionCookie')
    spyIdToken = jest.spyOn(FirebaseAuthAdapter.prototype, 'verifyIdToken')
    spyGetUserById = jest.spyOn(FirebaseAuthAdapter.prototype, 'getAuthUserById')
    spySamlIdentityProviderToken = jest.spyOn(
      FirebaseAuthAdapter.prototype,
      'verifySamlIdentityProviderToken',
    )
  })

  afterEach(() => {
    spyAppCheck.mockRestore()
    spyReflector.mockRestore()
    spySession.mockRestore()
    spyGetUserById.mockRestore()
    spyIdToken.mockRestore()
    spySamlIdentityProviderToken.mockRestore()
  })

  it('should be defined', () => {
    expect(guard).toBeDefined()
  })

  // eslint-disable-next-line max-lines-per-function
  describe('canActivate', () => {
    const context = {
      cookies: {session: {}},
      headers: {
        [ClientHeaders.AppCheck]: 'APP_CHECK_TOKEN',
        [ClientHeaders.IdToken]: 'ID_TOKEN',
      },
      raw: {},
    }

    it('should be defined', async () => {
      expect(guard.canActivate).toBeDefined()
    })

    it(`should return true for AuthType AppCheck`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.AppCheck})
      spyAppCheck.mockResolvedValue(null)
      getRequestMock.mockReturnValue(context)
      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(true)
    })

    it(`should throw an exception for AuthType AppCheck`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.AppCheck})
      spyAppCheck.mockRejectedValue(new UnauthorizedException(i18Messages.INVALID_APP_CHECK_TOKEN))
      getRequestMock.mockReturnValue(context)
      try {
        const result = await guard.canActivate(httpContext)
        expect(result).toBeUndefined()
      } catch (error) {
        expect(error).toBeDefined()
        expect(error.status).toBe(401)
        expect(error.response.message).toBe(i18Messages.INVALID_APP_CHECK_TOKEN)
      }
    })

    it(`should return true for AuthType FirebaseIdTokenWithoutEmail`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.FirebaseIdTokenWithoutEmail})
      spyAppCheck.mockResolvedValue(null)
      spyIdToken.mockResolvedValue({
        email: userEmail1,
        email_verified: false,
        authUserId: 'uid',
        tokenIat: 12333,
        tokenExp: 12020201,
      } as unknown as DecodedIdToken)
      getRequestMock.mockReturnValue(context)
      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(true)
    })

    it(`should return true for AuthType FirebaseSession`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.FirebaseSession})
      spyAppCheck.mockResolvedValue(null)
      spySession.mockResolvedValue({
        email: userEmail1,
        email_verified: true,
        authUserId: 'uid',
        tokenIat: 12333,
        tokenExp: 12020201,
      } as unknown as DecodedIdToken)
      getRequestMock.mockReturnValue(context)
      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(true)
    })

    it(`should throw an exception for AuthType FirebaseSession`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.FirebaseSession})
      spyAppCheck.mockResolvedValue(null)
      getRequestMock.mockReturnValue(context)
      spySession.mockResolvedValue(null)
      try {
        const result = await guard.canActivate(httpContext)
        expect(result).toBeUndefined()
      } catch (error) {
        expect(error).toBeDefined()
        expect(error.status).toBe(401)
        expect(error.response.message).toBe(i18Messages.INVALID_SESSION_COOKIE)
      }
    })

    it(`should throw an exception for AuthType FirebaseSession`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.FirebaseSession})
      spyAppCheck.mockResolvedValue(null)
      getRequestMock.mockReturnValue(context)
      spySession.mockResolvedValue({
        email: userEmail1,
        email_verified: false,
        authUserId: 'uid',
        tokenIat: 12333,
        tokenExp: 12020201,
      } as unknown as DecodedIdToken)
      try {
        const result = await guard.canActivate(httpContext)
        expect(result).toBeUndefined()
      } catch (error) {
        expect(error).toBeDefined()
        expect(error.status).toBe(401)
        expect(error.response.message).toBe(i18Messages.EMAIL_IS_NOT_VERIFIED)
      }
    })

    it(`should return true for AuthType FirebaseSessionPhoneMFA`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.FirebaseSessionPhoneMFA})
      spyAppCheck.mockResolvedValue(null)
      spySession.mockResolvedValue({
        email: userEmail1,
        email_verified: true,
        authUserId: 'uid',
        tokenIat: 12333,
        tokenExp: 12020201,
      } as unknown as DecodedIdToken)
      spyGetUserById.mockResolvedValue({
        multiFactor: {enrolledFactors: [{factorId: AuthMFAfactorTypes.Phone}]},
      })
      getRequestMock.mockReturnValue(context)
      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(true)
    })

    it(`should throw an exception for AuthType FirebaseSessionPhoneMFA`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.FirebaseSessionPhoneMFA})
      spyAppCheck.mockResolvedValue(null)
      getRequestMock.mockReturnValue(context)
      spySession.mockResolvedValue({
        email: userEmail1,
        email_verified: true,
        authUserId: 'uid',
        tokenIat: 12333,
        tokenExp: 12020201,
      } as unknown as DecodedIdToken)
      spyGetUserById.mockResolvedValue({
        multiFactor: {enrolledFactors: [{factorId: 'AuthMFAfactorTypes.phone'}]},
      })
      try {
        const result = await guard.canActivate(httpContext)
        expect(result).toBeUndefined()
      } catch (error) {
        expect(error).toBeDefined()
        expect(error.status).toBe(401)
        expect(error.response.message).toBe(i18Messages.PHONE_MFA_IS_NOT_ENABLED)
      }
    })

    it(`should return true for AuthType SAMLAuthProviderGoogle`, async () => {
      spyReflector.mockReturnValue({type: AuthTypes.SAMLAuthProviderGoogle})
      spyAppCheck.mockResolvedValue(null)
      spyIdToken.mockResolvedValue({
        email: userEmail1,
        email_verified: false,
        authUserId: 'uid',
        tokenIat: 12333,
        tokenExp: 12020201,
      } as unknown as DecodedIdToken)
      getRequestMock.mockReturnValue(context)
      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(true)
    })

    describe('when AuthType is conditional', () => {
      const queryAuthTypeMap = {
        FS: AuthTypes.FirebaseSession,
        MFA: AuthTypes.FirebaseSessionPhoneMFA,
      }

      beforeEach(() => {
        spyReflector.mockReturnValue((req) => queryAuthTypeMap[req.query.authType])

        spyAppCheck.mockResolvedValue(null)

        spySession.mockResolvedValue(<Partial<DecodedIdToken>>{
          email: userEmail1,
          email_verified: true,
          authUserId: 'uid',
          tokenIat: 12333,
          tokenExp: 12020201,
        })
      })

      describe('when token matches condition', () => {
        beforeEach(() => {
          getRequestMock.mockReturnValue({
            ...context,
            query: {
              authType: 'FS' as keyof typeof queryAuthTypeMap,
            },
          })
        })

        it('should allow to access', async () => {
          expect(guard.canActivate(httpContext)).resolves.toStrictEqual(true)
        })
      })

      describe('when token does not match condition', () => {
        beforeEach(() => {
          getRequestMock.mockReturnValue({
            ...context,
            query: {
              authType: 'MFA' as keyof typeof queryAuthTypeMap,
            },
          })

          spyGetUserById.mockResolvedValue({
            multiFactor: {enrolledFactors: [{factorId: 'AuthMFAfactorTypes.phone'}]},
          })
        })

        it('should not allow to access', () => {
          expect(guard.canActivate(httpContext)).rejects.toThrow(
            new MfaRequiredException(i18Messages.PHONE_MFA_IS_NOT_ENABLED),
          )
        })
      })

      describe('when query does non existent AuthType', () => {
        it('should throw exception', async () => {
          spyReflector.mockReturnValue(() => ({type: 'NonExistent'}))
          spySession.mockResolvedValue({
            email: userEmail1,
            email_verified: true,
            authUserId: 'uid',
            tokenIat: 12333,
            tokenExp: 12020201,
          } as unknown as DecodedIdToken)

          getRequestMock.mockReturnValue({...context, query: {authType: 'unsupported_value'}})
          expect(guard.canActivate(httpContext)).rejects.toThrow(
            new UnauthorizedException(i18Messages.UNSUPPORTED_AUTH_TYPE),
          )
        })
      })

      describe('when query does not supported by conditional AuthType', () => {
        beforeEach(() => {
          getRequestMock.mockReturnValue({...context, query: {authType: 'unsupported_value'}})
        })

        it('should throw exception', async () => {
          expect(guard.canActivate(httpContext)).rejects.toThrow(
            new UnauthorizedException(i18Messages.ADD_CORRESPONDING_PERMISSIONS_TO_ENDPOINT),
          )
        })
      })
    })
  })
})
