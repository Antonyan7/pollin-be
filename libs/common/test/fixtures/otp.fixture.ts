import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {OTPCode, OTPCodeType} from '@libs/data-layer/apps/users/entities/fireorm/otp-codes'
import {AuthUserFixture} from '@libs/common/test/fixtures/auth.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const otpResetPasswordCodeFixture: string = 'otp-fixture-reset-password'
export const otpID: string = 'FirebaseFunctionExpireAllOTPID'

export const otpResetPasswordFixture: OTPCode = {
  id: 'otp-id-fixture-reset-password',
  code: otpResetPasswordCodeFixture,
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.basic.uid,
  type: OTPCodeType.ResetPassword,
  updatedBy: AuthUserFixture.basic.uid,
}

export const authOtpFixture: OTPCode = {
  id: 'auth-otp-fixture-id',
  code: 'auth-top-fixture-code',
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.emailNotVerified.uid,
  type: OTPCodeType.EmailVerify,
  updatedBy: AuthUserFixture.emailNotVerified.uid,
}

export const otpRemoveExpiredFixture: OTPCode = {
  id: otpID,
  code: '131142',
  authUserId: 'test',
  type: OTPCodeType.EmailVerify,
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: null,
}

export const otpResetPasswordSecondTimeUseFixture: OTPCode = {
  id: 'otp-id-second-time-use',
  code: 'second-time-use',
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.basic.uid,
  type: OTPCodeType.ResetPassword,
  updatedBy: AuthUserFixture.basic.uid,
}

export const otpResetPasswordSecondTimeUseTokenFixture: OTPCode = {
  id: 'otp-id-second-time-use-token',
  code: 'second-time-use-token',
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.basic.uid,
  type: OTPCodeType.ResetPassword,
  updatedBy: AuthUserFixture.basic.uid,
}

export const otpResetPasswordCreateTokenFixture: OTPCode = {
  id: 'otp-id-create-token-use-token',
  code: 'create-token',
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.basic.uid,
  type: OTPCodeType.ResetPassword,
  updatedBy: AuthUserFixture.basic.uid,
}

export const otpUpdateEmailFixture: OTPCode = {
  id: 'otp-update-email',
  code: '654321',
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.updateEmail.uid,
  type: OTPCodeType.UpdateEmailVerify,
  updatedBy: AuthUserFixture.updateEmail.uid,
}

export const emailVerifyOtpFixture: OTPCode = {
  id: 'email-verify-fixture-id',
  code: 'email-verify-fixture-code',
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.verifyOtpEmailNotVerified.uid,
  type: OTPCodeType.EmailVerify,
  updatedBy: AuthUserFixture.verifyOtpEmailNotVerified.uid,
}

export const updateEmailVerifyOtpFixture: OTPCode = {
  id: 'email-update-verify-fixture-id',
  code: 'email-verify-fixture-code',
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  authUserId: AuthUserFixture.updateEmail.uid,
  type: OTPCodeType.UpdateEmailVerify,
  updatedBy: AuthUserFixture.updateEmail.uid,
}
