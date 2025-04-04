import {NestprojectConfigService} from '@libs/common'
import {RedisModule} from '@libs/redis'

const configService = NestprojectConfigService.getInstance()
export const RedisCacheModule = RedisModule.forRoot({
  host: configService.get('REDIS_HOST'),
  port: configService.get('REDIS_PORT'),
  maxRetriesPerRequest: 3,
  maxLoadingRetryTime: 15000,
})
