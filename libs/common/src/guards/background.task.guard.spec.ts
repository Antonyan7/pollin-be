import {ExecutionContext} from '@nestjs/common'
import {NestprojectConfigService} from '@libs/common'
import {BackgroundTaskGuard} from '@libs/common/guards/background.task.guard'

describe('Verify Background TaskGuard', () => {
  let guard: BackgroundTaskGuard

  let getRequestMock: jest.Mock
  let httpContext: ExecutionContext
  let configService: NestprojectConfigService

  beforeEach(async () => {
    getRequestMock = jest.fn()
    httpContext = {
      switchToHttp: () => ({
        getRequest: getRequestMock,
      }),
      getHandler: () => Function,
    } as unknown as ExecutionContext

    configService = NestprojectConfigService.getInstance()
    guard = new BackgroundTaskGuard(configService)
  })

  it('BackgroundTaskGuard should be defined', async () => {
    expect(guard.canActivate).toBeDefined()
  })

  describe('canActivate of BackgroundTaskGuard', () => {
    it('BackgroundTaskGuard should be defined', async () => {
      expect(guard.canActivate).toBeDefined()
    })

    it(`should return true for all existing headers`, async () => {
      const backgroundCloudInvoker = configService.get<string>('BACKGROUND_CLOUD_RUN_INVOKER')
      jest.spyOn(guard, 'getClaimData').mockImplementation(() => {
        return Promise.resolve({
          email: backgroundCloudInvoker,
          email_verified: true,
        })
      })

      getRequestMock.mockReturnValue({
        cookies: {session: {}},
        headers: {
          ['authorization']: 'Bearer MOCK_TOKEN',
        },
        raw: {},
      })

      const result = await guard.canActivate(httpContext)
      expect(result).toStrictEqual(true)
    })
  })
})
