export enum RedisFunctions {
  ErrorEvent = 'ErrorEvent',
  ReconnectEvent = 'ReconnectEvent',
  ConnectionEvent = 'ConnectionEvent',
}

export enum RedisActions {
  ConnectionReset = 'ConnectionReset',
  ConnectionRefused = 'ConnectionRefused',
  OtherError = 'OtherError',
  Reconnect = 'Reconnect',
  Connected = 'Connected',
}
