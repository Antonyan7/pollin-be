import {DynamicModule, Global, Module} from '@nestjs/common'
import {RedisConfig} from './interfaces/redis-config.interface'
import {DEFAULT_REDIS_INST} from './module.tokens'
import {RedisService} from './services/redis.service'
import {Redis as NestRedisModule} from 'ioredis'
import {StructuredLogger} from '@libs/common'
import {parseError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'

@Global()
@Module({})
export class RedisModule {
  static forRoot(config: RedisConfig): DynamicModule {
    const {host, port} = config
    const redisProvider = {
      provide: DEFAULT_REDIS_INST,
      useFactory: (): NestRedisModule => {
        const client = new NestRedisModule({
          host,
          port: Number(port),
          maxRetriesPerRequest: config.maxRetriesPerRequest,
          maxLoadingRetryTime: config.maxLoadingRetryTime,
        })

        client.on('error', (error: Error) => {
          if (error['code'] === 'ECONNRESET') {
            StructuredLogger.warn(
              activityLogs.RedisFunctions.ErrorEvent,
              activityLogs.RedisActions.ConnectionReset,
              {message: 'Connection to Redis timed out.'},
            )
          } else if (error['code'] === 'ECONNREFUSED') {
            StructuredLogger.warn(
              activityLogs.RedisFunctions.ErrorEvent,
              activityLogs.RedisActions.ConnectionRefused,
              {message: 'Connection to Redis refused!'},
            )
          } else {
            StructuredLogger.error(
              activityLogs.RedisFunctions.ErrorEvent,
              activityLogs.RedisActions.OtherError,
              parseError(error),
            )
          }
        })

        client.on('reconnecting', () => {
          if (client.status === 'reconnecting') {
            StructuredLogger.info(
              activityLogs.RedisFunctions.ReconnectEvent,
              activityLogs.RedisActions.Reconnect,
              {message: 'Reconnecting to Redis ...'},
            )
          } else {
            StructuredLogger.error(
              activityLogs.RedisFunctions.ReconnectEvent,
              activityLogs.RedisActions.OtherError,
              {message: 'Error reconnecting to Redis.'},
            )
          }
        })

        client.on('connect', (error: Error) => {
          if (!error) {
            StructuredLogger.info(
              activityLogs.RedisFunctions.ConnectionEvent,
              activityLogs.RedisActions.Connected,
              {message: 'Connected to Redis!'},
            )
          }
        })

        return client
      },
    }

    return {
      module: RedisModule,
      providers: [redisProvider, RedisService],
      exports: [RedisService],
    }
  }
}
