export enum LifeLabsAdapterFunctions {
  ReadCertificate = 'LifeLabsReadCertificate',
  HandlerPullResultsFromLifeLabs = 'HandlerPullResultsFromLifeLabs',
  PullResults = 'LifeLabsPullResults',
  InitSession = 'LifeLabsInitSession',
  Auth = 'LifeLabsAuth',
  FollowRedirect = 'LifeLabsFollowRedirect',
  SingOut = 'LifeLabsSignOut',
  SendAcknowledgement = 'LifeLabsAcknowledgement',
  UploadXmlResult = 'UploadXmlResult',
}

export enum LifeLabsAdapterActions {
  ReadCertificateFailed = 'LifeLabsReadCertificateFailed',
  PullResultsFailed = 'LifeLabsPullResultsFailed',
  PullResultsSuccess = 'LifeLabsPullResultsSuccess',
  AuthFailed = 'LifeLabsAuthFailed',
  InitSessionFailed = 'LifeLabsInitSession',
  InitSessionSuccess = 'LifeLabsInitSessionSuccess',
  FollowRedirectSuccess = 'LifeLabsFollowRedirectSuccess',
  SignOutFailed = 'LifeLabsSignOutFailed',
  SignOutSuccess = 'LifeLabsSignOutSuccess',
  AcknowledgementFailed = 'LifeLabsAcknowledgementFailed',
  AcknowledgementSuccess = 'LifeLabsAcknowledgementSuccess',
  NoPendingResults = 'NoPendingResults',
  UploadXmlResultFailed = 'UploadXmlResultFailed',
  CheckFeatureFlag = 'CheckFeatureFlag',
}
