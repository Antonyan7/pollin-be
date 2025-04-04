import {DynamicModule, Global, Module} from '@nestjs/common'
import {RedisConfig} from '../interfaces/redis-config.interface'
import {DEFAULT_REDIS_INST} from '../module.tokens'
import {Redis as NestRedisModule} from 'ioredis'
import {RedisService} from '../services/redis.service'

@Global()
@Module({})
export class RedisModule {
  static forRoot(config: RedisConfig): DynamicModule {
    const {host, port} = config
    const redisProvider = {
      provide: DEFAULT_REDIS_INST,
      useFactory: (): NestRedisModule => {
        return {
          host,
          port: Number(port),
        } as unknown as NestRedisModule
      },
    }

    return {
      module: RedisModule,
      providers: [redisProvider, RedisService],
      exports: [redisProvider, RedisService],
    }
  }
  private connected = false

  public connect(): void {
    this.connected = true
  }

  public disconnect(): void {
    this.connected = false
  }

  public isConnected(): boolean {
    return this.connected
  }
}
