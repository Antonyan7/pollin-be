export enum ApplicationBootstrapFunctions {
  Bootstrap = 'Bootstrap',
  WarmUpBootstrap = 'WarmUpBootstrap',
}

export enum ApplicationBootstrapActions {
  CheckDebugModeFlag = 'CheckDebugModeFlag',
  CheckUnhandledRequests = 'CheckUnhandledRequests',
}

export enum DatabaseConnectionFunctions {
  GetCreateDatabaseConnection = 'GetCreateDatabaseConnection',
}

export enum DatabaseConnectionActions {
  Initialized = 'Initialized',
  UnInitialized = 'UnInitialized',
  ConnectionEstablished = 'ConnectionEstablished',
  GetCreateDatabaseConnectionFailed = 'GetCreateDatabaseConnectionFailed',
}
