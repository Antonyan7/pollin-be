import * as dotenv from 'dotenv'
dotenv.config({debug: false, override: true})

import {Injectable} from '@nestjs/common'
// eslint-disable-next-line no-restricted-imports
import {ConfigService} from '@nestjs/config'
import {envConfig, ConfigType} from '@config/index'
import {StructuredLogger} from '@libs/common/utils/structured-logger'
import * as activityLogs from '@libs/common/enums/activity-logs'

/**
 * Config service wrapper to log not exiting configuration variable
 */
@Injectable()
export class NestprojectConfigService {
  private static NestprojectConfigService: NestprojectConfigService
  envSpecificConfig: ConfigType
  constructor(private configService: ConfigService) {
    this.envSpecificConfig = envConfig()
  }

  get<T = unknown>(propertyPath: string): T {
    const variable = this.configService.get<T>(propertyPath) || this.envSpecificConfig[propertyPath]

    if (!variable && !propertyPath.startsWith('FEATURE_') && !propertyPath.startsWith('DEBUG_')) {
      StructuredLogger.warn(
        activityLogs.NestprojectConfigServiceFunctions.Get,
        activityLogs.NestprojectConfigServiceActions.CheckVariables,
        {message: `${propertyPath} is not defined in this environment. This is likely an error`},
      )
    }
    return variable as T
  }

  public getBool(key: string): boolean {
    return this.get(key) === 'enabled'
  }

  isTestEnv(): boolean {
    return this.configService.get('NODE_ENV') === 'test'
  }

  static getInstance(): NestprojectConfigService {
    if (!this.NestprojectConfigService) {
      this.NestprojectConfigService = new NestprojectConfigService(new ConfigService())
    }
    return this.NestprojectConfigService
  }
}
