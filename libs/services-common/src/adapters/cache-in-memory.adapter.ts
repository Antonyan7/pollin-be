import {NestprojectConfigService} from '@libs/common'
import {Cache, caching} from 'cache-manager'
const configService = NestprojectConfigService.getInstance()

export class CacheInMemoryAdapter {
  private cacheManager: Cache
  constructor() {
    this.initialize()
  }
  async initialize(): Promise<void> {
    this.cacheManager = await caching('memory', {
      ttl: configService.get<number>('CACHE_TIME_TO_LEAVE'),
    })
  }
  async getDataFromCache<T>(key: string): Promise<T> {
    return this.cacheManager.get<T>(key)
  }
  async writeDataInCache<T>(key: string, data: T, ttl: number): Promise<void> {
    return this.cacheManager.set(key, data, ttl)
  }
}
