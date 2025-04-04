export enum AuthServiceFunctions {
  ResetPassword = 'ResetPassword',
  VerifyOtp = 'VerifyOtp',
  UpdatePassword = 'UpdatePassword',
  GenerateJwtToken = 'GenerateJwtToken',
  RemovePasswordResetOTPs = 'RemovePasswordResetOTPs',
}

export enum AuthServiceActions {
  ResetPassword = 'ResetPassword',
  ResetPasswordFailed = 'ResetPasswordFailed',
  VerifyOtp = 'VerifyOtp',
  GenerateJwtToken = 'GenerateJwtToken',
  FindUnexpiredOtp = 'FindUnexpiredOtp',
  FindAuthUserFailed = 'FindAuthUserFailed',
  UpdatePassword = 'UpdatePassword',
  GetAuthUserById = 'GetAuthUserById',
  FindUnexpiredOtpFailed = 'FindUnexpiredOtpFailed',
  FindUnexpiredOtpStarted = 'FindUnexpiredOtpStarted',
  E2EInsertOTPStarted = 'E2EInsertOTPStarted',
  E2EInsertOTPFailed = 'E2EInsertOTPFailed',
  FindUnexpiredPasswordResetTokenStarted = 'FindUnexpiredPasswordResetTokenStarted',
  FindUnexpiredPasswordResetTokenFailed = 'FindUnexpiredPasswordResetTokenFailed',
  VerifyOtopFailed = 'VerifyOtopFailed',
  UpdatePasswordFailed = 'UpdatePasswordFailed',
  RemovePasswordResetOTPs = 'RemovePasswordResetOTPs',
  RemovePasswordResetOTPsFailed = 'RemovePasswordResetOTPsFailed',
}

export enum AuthGuardFunctions {
  ValidateAppCheck = 'ValidateAppCheck',
  ValidateSamlIdentityProviderToken = 'ValidateSamlIdentityProviderToken',
}

export enum AuthGuardActions {
  ValidateAppCheckFailed = 'ValidateAppCheckFailed',
  ValidateSamlIdentityProviderTokenFailed = 'ValidateSamlIdentityProviderTokenFailed',
  ValidateSamlIdentityProviderToken = 'ValidateSamlIdentityProviderToken',
}

export enum AuthServiceFunctions {
  FindUnexpiredOtp = 'FindUnexpiredOtp',
  FindUnexpiredPasswordResetToken = 'FindUnexpiredPasswordResetToken',
  E2EInsertOTP = 'E2EInsertOTP',
}
