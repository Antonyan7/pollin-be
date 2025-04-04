import {DynamicModule, ValidationError, ValidationPipe} from '@nestjs/common'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {TestingModule, Test} from '@nestjs/testing'
import cookie, {FastifyCookieOptions} from '@fastify/cookie'
import {AuthGuard} from '@libs/common/guards'
import {Reflector} from '@nestjs/core'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {SessionRenewalInterceptor} from '@libs/common/interceptors'
import {FirebaseSessionService} from '@libs/common/services/firebase/session.service'
import {AllExceptionsFilter} from '@libs/services-common/exception-filters/all-exceptions.filter'
import {DtoValidationException} from '@libs/services-common/exceptions'
import {ClientHeaders} from '@libs/common/enums'
import {asyncStorage, createRequestContext} from '@libs/services-common/helpers/async-hook'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {RolesGuard} from '../src/guards'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {RedisService} from '@libs/redis'
import {NestprojectConfigService} from '../src'
import {App} from 'supertest/types'
import {BackgroundTaskGuard} from '@libs/common/guards/background.task.guard'
import {TestModuleType} from './utils/test.utils'

jest.mock('@libs/common/utils/structured-logger')
jest.mock('@libs/common/services/open-telemetry.service.ts')
jest.mock('@libs/redis/redis.module')

export enum TestAppPorts {
  Booking = 9000,
  Core = 9001,
  Lis = 9002,
  Emr = 9003,
  LisBackground = 9011,
  EmrBackground = 9012,
  CoreBackground = 9013,
}

export class TestPortProvider {
  private static instance: TestPortProvider
  private nextPort = 8000

  public static getInstance(): TestPortProvider {
    if (!TestPortProvider.instance) {
      TestPortProvider.instance = new TestPortProvider()
    }

    return TestPortProvider.instance
  }

  public getNextPort(): number {
    return ++this.nextPort
  }
}

export async function generateTestApp(
  applicationModule: unknown,
  port?: number,
  testModuleType = TestModuleType.NotSpecified,
): Promise<{
  app: NestFastifyApplication
  appModule: TestingModule
  server: App
}> {
  // TODO a check if application already started on some port
  // console.log(port)

  const appModule: TestingModule = await Test.createTestingModule({
    imports: [applicationModule as DynamicModule],
  }).compile()

  const app = appModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

  const COOKIES_SECRET = 'test-secret'
  app.register(cookie, {
    secret: COOKIES_SECRET,
  } as FastifyCookieOptions)

  const reflector = app.get(Reflector)
  const firebaseAuthAdapter = new FirebaseAuthAdapter()
  const firebaseSessionService = app.get(FirebaseSessionService)
  const i18nLocalizationService = app.get(I18nLocalizationService)

  const configService = NestprojectConfigService.getInstance()

  if (testModuleType == TestModuleType.BackgroundService) {
    app.useGlobalGuards(new BackgroundTaskGuard(configService))
  } else {
    app.useGlobalGuards(new AuthGuard(reflector, firebaseAuthAdapter))
  }

  if (testModuleType == TestModuleType.ClinicPortalService) {
    const staffRepository = app.get(StaffRepository)
    const redisService = app.get(RedisService)
    app.useGlobalGuards(new RolesGuard(reflector, staffRepository, redisService, configService))
  }

  app.useGlobalInterceptors(new SessionRenewalInterceptor(firebaseSessionService))
  app.useGlobalFilters(new AllExceptionsFilter(null, i18nLocalizationService))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors: ValidationError[]): DtoValidationException => {
        return new DtoValidationException(errors, true)
      },
    }),
  )

  await app.init()
  app.use((request, _, next) => {
    const requestMetadata = createRequestContext({
      [ClientHeaders.DeviceId]: request.headers[ClientHeaders.DeviceId],
      [ClientHeaders.RequestId]: request.headers[ClientHeaders.RequestId],
      [ClientHeaders.Lang]: request.headers[ClientHeaders.Lang],
      ipAddress: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
    })
    asyncStorage.run(requestMetadata, () => next())
  })

  const server = app.getHttpServer()

  const nextPort = port || TestPortProvider.getInstance().getNextPort()
  await new Promise((resolve) => app.listen(nextPort, resolve))

  return {app, server, appModule}
}

export async function destroyTestApp(testModule: {
  app: NestFastifyApplication
  appModule: TestingModule
  server: App
}): Promise<void> {
  try {
    await testModule.app.close()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}
