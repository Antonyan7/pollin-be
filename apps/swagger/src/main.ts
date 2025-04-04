import {NestFactory} from '@nestjs/core'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {join} from 'path'
import {SwaggerAppModule} from '@apps/swagger/swagger.app.module'
import {getDefaultPort} from '@libs/services-common/configuration'
import {Service} from '@libs/services-common/enums/server'
import {checkAuthSwagger} from '@libs/services-common/utils/swagger-ui'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    SwaggerAppModule,
    new FastifyAdapter(),
  )
  app.setGlobalPrefix('swagger')
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  })
  app.setViewEngine({
    engine: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      ejs: require('ejs'),
    },
    templates: join(__dirname, 'views'),
  })
  checkAuthSwagger(app, Service.Swagger)
  await app.listen(getDefaultPort(Service.Swagger))
}
void bootstrap()
