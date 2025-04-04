import cookie, {FastifyCookieOptions} from '@fastify/cookie'
import {NestFactory, Reflector} from '@nestjs/core'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {createTraceAgent} from '@libs/services-common/utils/trace-agent'
import {INestApplication, ValidationError, ValidationPipe, VersioningOptions} from '@nestjs/common'
import {AuthGuard, RolesGuard} from '@libs/common/guards'
import {SessionRenewalInterceptor} from '@libs/common/interceptors'
import {FirebaseSessionService} from '@libs/common/services/firebase/session.service'
import {FirebaseAuthAdapter} from '@libs/common/adapters/firebase/firebase-auth.adapter'
import {HeadersGuard} from '@libs/common/guards/headers.guard'
import {
  NestprojectConfigService,
  isRunningOnGCP,
  StructuredLogger,
  InitiateCloudProfiler,
} from '@libs/common'
import {AllExceptionsFilter} from '@libs/services-common/exception-filters/all-exceptions.filter'
import {DtoValidationException} from '@libs/services-common/exceptions'
import fastifyMultipart from '@fastify/multipart'
import {OpenTelemetryService} from '@libs/common/services/open-telemetry.service'
import {asyncHookMiddleware} from '@libs/services-common/middlewares/async-storage.middleware'
import {I18nLocalizationService} from '../services/i18n-localization.service'
import {ActivityLoggingInterceptor} from '../interceptors/activity-logging.interceptor'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {RedisService} from '@libs/redis'
import {BackgroundTaskGuard} from '@libs/common/guards/background.task.guard'

export interface BootstrapApplicationConfig {
  appModule: unknown
  globalPrefix?: string
  isClinicPortalService?: boolean
  isBackgroundService?: boolean
  versioning?: VersioningOptions
  packageJson?: {[key: string]: string; name: string}
  enableShutdownHooks?: boolean
  port?: number
  prefix?: string
  hook?: (app: INestApplication) => Promise<void>
  isDevelopment?: boolean
  corsSettings?: {
    origin?: string
    credentials?: boolean
    exposedHeaders?: string[]
    allowedHeaders?: string[]
  }
}

export async function bootstrap(config: BootstrapApplicationConfig): Promise<INestApplication> {
  const telemetry = new OpenTelemetryService()
  const configService = NestprojectConfigService.getInstance()
  const span = telemetry.startSpan('ApplicationBootstrap', {service: config.prefix})

  // Launch cloud profiler for GAE
  await InitiateCloudProfiler()

  const app = await NestFactory.create<NestFastifyApplication>(
    config.appModule,
    new FastifyAdapter(),
  )
  span.addEvent('NestJS application is created')

  //This is for GCP warmup requests
  if (isRunningOnGCP()) {
    app.use((request, res, next) => {
      if (request.originalUrl.includes('_ah/warmup')) {
        res.end('NestJS application created')
      } else {
        next()
      }
    })
  }

  if (config.prefix) {
    app.setGlobalPrefix(config.prefix)
  }

  createTraceAgent()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors: ValidationError[]): DtoValidationException => {
        return new DtoValidationException(
          errors,
          configService.getBool('SHOW_DETAILED_VALIDATION_MESSAGE'),
        )
      },
    }),
  )
  span.addEvent('Global Pipes applied')

  app.register(cookie, {} as FastifyCookieOptions)
  app.register(fastifyMultipart, {limits: {files: 1, fieldNameSize: 200}})

  const reflector = app.get(Reflector)
  const firebaseAuthAdapter = new FirebaseAuthAdapter()
  const firebaseSessionService = app.get(FirebaseSessionService)
  const i18nLocalizationService = app.get(I18nLocalizationService)
  const guards = []
  if (config.isBackgroundService) {
    guards.push(new BackgroundTaskGuard(configService))
  } else {
    guards.push(new HeadersGuard())
    guards.push(new AuthGuard(reflector, firebaseAuthAdapter))
    if (config.isClinicPortalService) {
      const staffRepository = app.get(StaffRepository)
      const redisService = app.get(RedisService)
      guards.push(new RolesGuard(reflector, staffRepository, redisService, configService))
    }
  }

  app.useGlobalGuards(...guards)
  app.useGlobalInterceptors(new SessionRenewalInterceptor(firebaseSessionService))
  app.useGlobalInterceptors(new ActivityLoggingInterceptor(reflector, config.prefix))
  app.useGlobalFilters(new AllExceptionsFilter(config.isDevelopment, i18nLocalizationService))
  span.addEvent('Guards, Filters and Interceptors applied')

  app.use(asyncHookMiddleware)
  span.addEvent('Async Storage is created')

  const corsDomains = configService.get<string[]>('CORS_DOMAINS')
  if (!!corsDomains.length) {
    app.enableCors({origin: corsDomains})
  }

  await app.listen(config.port, '0.0.0.0')

  StructuredLogger.getLogger()
  span.addEvent('Application Bootstrap finished')
  span.end()

  return app
}
