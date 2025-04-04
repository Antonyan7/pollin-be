import {Injectable, Optional} from '@nestjs/common'
import {HealthIndicator, HealthIndicatorResult, HealthCheckError} from '@nestjs/terminus'
import {RedisService} from '@libs/redis'

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(
    @Optional()
    protected readonly redisService: RedisService,
  ) {
    super()
  }
  async isHealthy(): Promise<HealthIndicatorResult> {
    if (this.redisService) {
      const randomValue = `health:${Math.random()}`

      await this.redisService.set(randomValue, randomValue)

      const saved = await this.redisService.get(randomValue)

      await this.redisService.delete(randomValue)

      const isHealthy = saved === randomValue

      const result = this.getStatus('redis', isHealthy)

      if (isHealthy) {
        return result
      }
    }
    throw new HealthCheckError('Redis health failed', this.getStatus('redis', false))
  }
}
