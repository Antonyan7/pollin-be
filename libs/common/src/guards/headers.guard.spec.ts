import {ExecutionContext} from '@nestjs/common'
import {ClientHeaders} from '@libs/common/enums'
import {HeadersGuard} from '@libs/common/guards/headers.guard'

describe('HeadersGuard', () => {
  let guard: HeadersGuard

  let getRequestMock: jest.Mock
  let httpContext: ExecutionContext
  // randomly generated UUIDs
  const DEVICE_ID = '49701e19-5e96-414e-bc23-98e506753045'
  const REQUEST_ID = '15D67B8D-61E6-4275-A85B-47FCC898E815' // uppercase UUID
  const INVALID_DEVICE_ID = 'invalid-414e-bc23-d'
  const INVALID_REQUEST_ID = 'invalid-824e-bc23-zzz'

  beforeEach(async () => {
    getRequestMock = jest.fn()
    httpContext = {
      switchToHttp: () => ({
        getRequest: getRequestMock,
      }),
      getHandler: () => Function,
    } as unknown as ExecutionContext

    guard = new HeadersGuard()
  })

  it('should be defined', () => {
    expect(guard).toBeDefined()
  })

  describe('canActivate of HeadersGuard', () => {
    it('should be defined', async () => {
      expect(guard.canActivate).toBeDefined()
    })
    it(`should return true for all existing headers`, async () => {
      getRequestMock.mockReturnValue({
        cookies: {session: {}},
        headers: {
          [ClientHeaders.AppCheck]: 'APP_CHECK_TOKEN',
          [ClientHeaders.IdToken]: 'ID_TOKEN',
          [ClientHeaders.DeviceId]: DEVICE_ID,
          [ClientHeaders.Source]: 'SOURCE',
          [ClientHeaders.RequestId]: REQUEST_ID,
          [ClientHeaders.Lang]: 'LANG',
          [ClientHeaders.AppVersion]: 'APP_VERSION',
        },
        raw: {},
      })

      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(true)
    })

    it(`should return false for absent some headers`, async () => {
      getRequestMock.mockReturnValue({
        cookies: {session: {}},
        headers: {
          [ClientHeaders.AppCheck]: 'APP_CHECK_TOKEN',
          [ClientHeaders.IdToken]: 'ID_TOKEN',
          [ClientHeaders.DeviceId]: 'DEVICE_ID',
          [ClientHeaders.Source]: 'SOURCE',
        },
        raw: {},
      })
      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(false)
    })

    it(`should return false for not correct format of 'deviceId'`, async () => {
      getRequestMock.mockReturnValue({
        cookies: {session: {}},
        headers: {
          [ClientHeaders.AppCheck]: 'APP_CHECK_TOKEN',
          [ClientHeaders.IdToken]: 'ID_TOKEN',
          [ClientHeaders.DeviceId]: INVALID_DEVICE_ID,
          [ClientHeaders.Source]: 'SOURCE',
          [ClientHeaders.RequestId]: REQUEST_ID,
          [ClientHeaders.Lang]: 'LANG',
          [ClientHeaders.AppVersion]: 'APP_VERSION',
        },
        raw: {},
      })
      const result = guard.canActivate(httpContext)
      expect(result).toStrictEqual(false)
    })

    it(`should return false for not correct format of 'requestId'`, async () => {
      getRequestMock.mockReturnValue({
        cookies: {session: {}},
        headers: {
          [ClientHeaders.AppCheck]: 'APP_CHECK_TOKEN',
          [ClientHeaders.IdToken]: 'ID_TOKEN',
          [ClientHeaders.DeviceId]: DEVICE_ID,
          [ClientHeaders.Source]: 'SOURCE',
          [ClientHeaders.RequestId]: INVALID_REQUEST_ID,
          [ClientHeaders.Lang]: 'LANG',
          [ClientHeaders.AppVersion]: 'APP_VERSION',
        },
        raw: {},
      })
      const result = guard.canActivate(httpContext)
      expect(result).toStrictEqual(false)
    })
  })
})
