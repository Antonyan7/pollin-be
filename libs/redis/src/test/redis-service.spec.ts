import {Cluster} from 'ioredis'
import {RedisService} from '@libs/redis'

describe('RedisService', () => {
  let redisService: RedisService
  let mockRedisClient: Cluster

  beforeEach(() => {
    // Create a mock Redis client
    mockRedisClient = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    } as unknown as Cluster

    // Create an instance of the RedisService with the mock client
    redisService = new RedisService(mockRedisClient)
  })

  describe('get', () => {
    it('should call redisClient.get with the provided key', async () => {
      const key = 'test-key'
      await redisService.get(key)
      expect(mockRedisClient.get).toHaveBeenCalledWith(key)
    })
  })

  describe('set', () => {
    it('should call redisClient.set with the provided key and value', async () => {
      const key = 'test-key'
      const value = 'test-value'
      await redisService.set(key, value)
      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value)
    })
  })

  describe('delete', () => {
    it('should call redisClient.del with the provided key', async () => {
      const key = 'test-key'
      await redisService.delete(key)
      expect(mockRedisClient.del).toHaveBeenCalledWith(key)
    })
  })
})
