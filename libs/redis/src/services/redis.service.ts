import {Inject, Injectable} from '@nestjs/common'
import {Cluster} from 'ioredis'
import {REDIS_DEL_ERROR, REDIS_GET_ERROR, REDIS_SET_ERROR} from '@libs/redis/errors/errors'
import {InternalServerErrorException} from '@libs/services-common/exceptions'
import {StructuredLogger} from '@libs/common'
import {DEFAULT_REDIS_INST} from '@libs/redis/module.tokens'

@Injectable()
export class RedisService {
  constructor(@Inject(DEFAULT_REDIS_INST) private readonly redisClient: Cluster) {}
  async get(key: string): Promise<string> {
    try {
      return await this.redisClient.get(key)
    } catch (error) {
      this.handleError(error, REDIS_GET_ERROR)
    }
  }

  async set(key: string, value: string, expirationInSeconds = 0): Promise<string> {
    try {
      if (value === undefined) {
        return value
      }
      const setResult = await this.redisClient.set(key, value)
      // Set the expiration time for the key
      if (expirationInSeconds > 0) {
        await this.redisClient.expire(key, expirationInSeconds)
      }
      return setResult
    } catch (error) {
      this.handleError(error, REDIS_SET_ERROR)
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      await this.redisClient.del(key)
      return true
    } catch (error) {
      this.handleError(error, REDIS_DEL_ERROR)
    }
  }

  private handleError(error: Error, errorCode: string): void {
    if (error) {
      StructuredLogger.error('RedisService Error', error.stack, {code: errorCode})
      throw new InternalServerErrorException(errorCode)
    }
  }
}
