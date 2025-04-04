import {Module, DynamicModule} from '@nestjs/common'
import {TerminusModule, DiskHealthIndicatorOptions} from '@nestjs/terminus'
import {TerminusService} from './terminus.service'
import {VersionHealth, VersionHealthIndicator} from './health-check/version.health'
import {TerminusController} from './terminus.controller'
import {TERMINUS_CONFIG_TOKEN} from './module.tokens'
import {RedisHealthIndicator} from './health-check/redis.health'

export interface MemoryHealth {
  memoryHeap?: number
  memoryRss?: number
}

export interface HealthConfig {
  databaseHealth?: boolean
  versionHealth?: VersionHealth
  memoryHealth?: MemoryHealth
  diskHealth?: DiskHealthIndicatorOptions
  redisHealth?: boolean
}
export interface HealthConfigForModules {
  databaseHealth?: boolean
  versionHealth?: boolean
  memoryHealth?: boolean
  diskHealth?: boolean
  redisHealth?: boolean
}

@Module({})
export class TerminusAppModule {
  static forRoot(config: HealthConfig): DynamicModule {
    return {
      module: TerminusAppModule,
      imports: [TerminusModule],
      controllers: [TerminusController],
      providers: [
        TerminusService,
        RedisHealthIndicator,
        VersionHealthIndicator,
        {
          provide: TERMINUS_CONFIG_TOKEN,
          useValue: config,
        },
      ],
    }
  }
}
