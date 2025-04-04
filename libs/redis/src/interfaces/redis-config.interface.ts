export interface RedisConfig {
  host: string
  port: string
  maxRetriesPerRequest: number
  maxLoadingRetryTime: number
}
