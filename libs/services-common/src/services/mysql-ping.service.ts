import {StructuredLogger, NestprojectConfigService} from '@libs/common'
import {Injectable} from '@nestjs/common'
import {Cron, CronExpression} from '@nestjs/schedule'
import {DataSource} from 'typeorm'
import {parseError} from '../helpers/error-handling'

enum MySQLPingServiceActivityLog {
  PingMysqlDB = 'PingMysqlDB',
  PingDatabaseSuccesfully = 'PingDatabaseSuccesfully',
  DatabasePingFailed = 'DatabasePingFailed',
}

@Injectable()
export class MySQLPingService {
  constructor(
    private dataSource: DataSource,
    private config: NestprojectConfigService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async pingMysqlDB(): Promise<void> {
    try {
      const flagEnabled = this.config.getBool('FEATURE_MYSQL_PING')
      if (!flagEnabled) {
        return
      }

      await this.dataSource.query('SELECT 1')

      StructuredLogger.info(
        MySQLPingServiceActivityLog.PingMysqlDB,
        MySQLPingServiceActivityLog.PingDatabaseSuccesfully,
        {
          message: 'Ping sent to MySQL',
        },
      )
    } catch (error) {
      StructuredLogger.error(
        MySQLPingServiceActivityLog.PingMysqlDB,
        MySQLPingServiceActivityLog.DatabasePingFailed,
        {
          message: 'Cron job for MySQL ping failed',
          ...parseError(error),
        },
      )
    }
  }
}
