export enum FirebaseAuthAdapterFunctions {
  Verifyidtoken = 'Verifyidtoken',
  VerifySessionCookie = 'VerifySessionCookie',
  UpdateUserEmail = 'UpdateUserEmail',
  CreateSessionCookie = 'CreateSessionCookie',
  CreateAuthUser = 'CreateAuthUser',
  DeleteAuthUser = 'DeleteAuthUser',
  GetAuthUserByEmail = 'GetAuthUserByEmail',
  GetAuthUserById = 'GetAuthUserById',
  UpdateAuthUserPassword = 'UpdateAuthUserPassword',
  VerifyAuthUserEmail = 'VerifyAuthUserEmail',
  GetTenantAwareAuth = 'GetTenantAwareAuth',
  VerifySamlIdentityProviderToken = 'VerifySamlIdentityProviderToken',
  CustomIdTokenUsage = 'CustomIdTokenUsage',
  SetNewCustomClaimsForBucket = 'SetNewCustomClaimsForBucket',
  DeleteCustomClaimsForBucket = 'DeleteCustomClaimsForBucket',
  UpdateAuthUserPhoneNumber = 'UpdateAuthUserPhoneNumber',
  UpdateAndVerifyAuthUserEmail = 'UpdateAndVerifyAuthUserEmail',
}

export enum FirebaseAuthAdapterActions {
  VerifyIdTokenFailed = 'VerifyIdTokenFailed',
  VerifySessionCookieFailed = 'VerifySessionCookieFailed',
  CreateSessionCookieFailed = 'CreateSessionCookieFailed',
  CreateAuthUserFailed = 'CreateAuthUserFailed',
  DeleteAuthUserFailed = 'DeleteAuthUserFailed',
  GetAuthUserByEmailFailed = 'GetAuthUserByEmailFailed',
  GetAuthUserByIdFailed = 'GetAuthUserByIdFailed',
  UpdateAuthUserPasswordFailed = 'UpdateAuthUserPasswordFailed',
  VerifyAuthUserEmailFailed = 'VerifyAuthUserEmailFailed',
  GetTenantAwareAuthFailed = 'GetTenantAwareAuthFailed',
  VerifySamlIdentityProviderTokenFailed = 'VerifySamlIdentityProviderToken',
  CustomIdTokenUsageDisabled = 'CustomIdTokenUsageDisabled',
  UserEmailUpdateFailed = 'UserEmailUpdateFailed',
  SetNewCustomClaimsForBucketFailed = 'SetNewCustomClaimsForBucketFailed',
  DeleteCustomClaimsForBucketFailed = 'DeleteCustomClaimsForBucketFailed',
  UpdateAuthUserPhoneNumberFailed = 'UpdateAuthUserPhoneNumberFailed',
}

export enum FirebaseSessionServiceFunctions {
  IsAllowedToRenew = 'IsAllowedToRenew',
}

export enum FirebaseSessionServiceActions {
  CheckToken = 'CheckToken',
}
