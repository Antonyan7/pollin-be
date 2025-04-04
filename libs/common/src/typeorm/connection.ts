import {DataSource} from 'typeorm'
import {DataSourceOptions} from 'typeorm/data-source/DataSourceOptions'
import {AppDataSource} from '@dataSource'
import {entities} from '@libs/common/typeorm/entities'
import {isFunctionRunningInEmulator} from '../utils'
import {StructuredLogger, NestprojectConfigService} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {parseError} from '@libs/services-common/helpers/error-handling'

const configService = NestprojectConfigService.getInstance()

/**
 * Checks if connection pool exist,
 * if not creates one and returns connection
 * @returns
 */
let dataSource = AppDataSource
const getCreateDatabaseConnection = async (): Promise<DataSource> => {
  if (dataSource?.isInitialized) {
    return dataSource
  }

  // Create new connection
  try {
    let connectionConfig = {}

    if (isCloudFunction() && !isFunctionRunningInEmulator()) {
      // Connect via socket when deployed to GCP
      connectionConfig = {
        host: configService.get<string>('DB_SQL_HOST'),
        extra: {
          socketPath: configService.get<string>('DB_SQL_HOST'),
          connectionLimit: 1,
        },
      }
    } else {
      // Connect via TCP when on local with local DB or Cloud SQL with proxy
      connectionConfig = {
        host: configService.get<string>('DB_SQL_LOCAL_HOST'),
        port: configService.get<string>('DB_SQL_LOCAL_PORT'),
      }
    }
    const config = {
      ...connectionConfig,
      type: 'mysql',
      database: configService.get<string>('DB_SQL_NAME'),
      username: configService.get<string>('DB_SQL_USERNAME'),
      password: configService.get<string>('DB_SQL_PASSWORD'),
      entities: entities,
      synchronize: false,
      logging: ['warn', 'error'],
    } as DataSourceOptions

    dataSource = await new DataSource(config).initialize()

    StructuredLogger.info(
      activityLogs.DatabaseConnectionFunctions.GetCreateDatabaseConnection,
      activityLogs.DatabaseConnectionActions.ConnectionEstablished,
      {message: 'DB connection established'},
    )
  } catch (error) {
    StructuredLogger.error(
      activityLogs.DatabaseConnectionFunctions.GetCreateDatabaseConnection,
      activityLogs.DatabaseConnectionActions.GetCreateDatabaseConnectionFailed,
      {message: 'No connection to SQL database', ...parseError(error)},
    )
  }
  return dataSource
}

/**
 * Checks variables auto set by cloud function
 */
const isCloudFunction = (): boolean => {
  const isEnvSet = (envKey: string): boolean =>
    typeof configService.get<string>(envKey) === 'string'
  return isEnvSet('FUNCTION_TARGET') && isEnvSet('FUNCTION_SIGNATURE_TYPE')
}
export {getCreateDatabaseConnection}
