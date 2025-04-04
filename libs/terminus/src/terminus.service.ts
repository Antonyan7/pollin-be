import {
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  HealthIndicatorFunction,
} from '@nestjs/terminus'
import {Inject, Injectable} from '@nestjs/common'
// import {DataSource} from 'typeorm'
import {HealthConfig} from './terminus.module'
import {TERMINUS_CONFIG_TOKEN} from './module.tokens'
import {VersionHealthIndicator} from './health-check/version.health'
// import {RedisHealthIndicator} from './health-check/redis.health'
import {InjectDataSource} from '@nestjs/typeorm'
import {DataSource} from 'typeorm'

@Injectable()
export class TerminusService {
  // eslint-disable-next-line max-params
  constructor(
    @Inject(TERMINUS_CONFIG_TOKEN)
    protected readonly config: HealthConfig,
    protected readonly typeorm: TypeOrmHealthIndicator,
    protected readonly memory: MemoryHealthIndicator,
    protected readonly disk: DiskHealthIndicator,
    protected readonly version: VersionHealthIndicator,
    // protected readonly redis: RedisHealthIndicator,
    @InjectDataSource()
    protected readonly databaseConnection: DataSource,
  ) {}

  async getHealthIndicators(): Promise<HealthIndicatorFunction[]> {
    const indicators: HealthIndicatorFunction[] = []
    const {diskHealth, memoryHealth, databaseHealth, versionHealth} = this.config

    // version
    if (versionHealth && this.version) {
      indicators.push(async () => this.version.getVersion(versionHealth))
    }

    // redis
    // if (redisHealth && this.redis) {
    // indicators.push(async () => this.redis.isHealthy())
    // }

    // typeorm database
    if (databaseHealth) {
      indicators.push(async () =>
        this.typeorm.pingCheck(this.databaseConnection.options.type, {
          connection: this.databaseConnection,
          timeout: 7000,
        }),
      )
    }
    // disk
    if (diskHealth) {
      indicators.push(async () => this.disk.checkStorage('disk', diskHealth))
    }
    // memory
    if (memoryHealth) {
      if (memoryHealth.memoryHeap) {
        indicators.push(async () => this.memory.checkHeap('heap', memoryHealth.memoryHeap))
      }
      if (memoryHealth.memoryRss) {
        indicators.push(async () => this.memory.checkRSS('rss', memoryHealth.memoryRss))
      }
    }

    return indicators
  }
}
