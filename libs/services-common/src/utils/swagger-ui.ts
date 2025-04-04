import {SwaggerModule} from '@nestjs/swagger'
import {INestApplication} from '@nestjs/common'
import {SwaggerConfiguration} from '@libs/services-common/configuration'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {NestprojectConfigService} from '@libs/common'
import {Service} from '@libs/services-common/enums/server'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'

export const checkAuthSwagger = (app: INestApplication, path: string): void => {
  const configService = app.get(NestprojectConfigService)

  const isSwaggerEnabled = configService.get<string>('IS_SWAGGER_ENABLED')
  const authCredentials = configService.get<string>('SWAGGER_PASSWORD')
  if (isSwaggerEnabled !== 'enabled') {
    StructuredLogger.warn(
      activityLogs.SwaggerActions.CreateSwagger,
      activityLogs.SwaggerActions.ISwaggerEnabled,
      {
        message: activityLogs.SwaggerActions.SwaggerEnabledMessage,
      },
    )
    return
  }

  if (!authCredentials) {
    StructuredLogger.warn(
      activityLogs.SwaggerActions.CreateSwagger,
      activityLogs.SwaggerActions.AuthCredentials,
      {
        message: activityLogs.SwaggerActions.AuthCredentialsMessage,
      },
    )
    return
  }

  const authParts = authCredentials.split(':')
  if (authParts.length != 2) {
    StructuredLogger.warn(
      activityLogs.SwaggerActions.CreateSwagger,
      activityLogs.SwaggerActions.AuthParts,
      {
        message: activityLogs.SwaggerActions.CheckAuthPartsMessage,
      },
    )
    return
  }

  /**
   * Functional middleware for swagger auth
   */
  app.use((req, res, next) => {
    if ((req.originalUrl as string).startsWith(path) || path === Service.Swagger) {
      const userPass = Buffer.from(
        (req.headers.authorization || '').split(' ')[1] || '',
        'base64',
      ).toString()

      if (userPass != authCredentials || !isSwaggerEnabled) {
        res.writeHead(401, {'WWW-Authenticate': 'Basic realm="nope"'})
        res.end('HTTP Error 401 Unauthorized: Access is denied')
      }
      return next()
    }

    return next()
  })
}
export const createSwagger = (app: INestApplication, appPrefix: string): void => {
  const apiDocPath = `/${appPrefix}/api/doc/`
  checkAuthSwagger(app, apiDocPath)
  const document = SwaggerModule.createDocument(app, SwaggerConfiguration)
  document.components.schemas = {
    ...document.components.schemas,
    ExceptionResponses: {
      type: 'object',
      properties: {
        data: {type: 'string', description: 'exception data', example: null},
        status: {
          properties: {
            code: {
              type: 'string',
              description: 'exception code',
              enum: [...Object.values(ResponseStatusCodes)],
            },
          },
        },
      },
    },
  }
  SwaggerModule.setup(apiDocPath, app, document)
}
