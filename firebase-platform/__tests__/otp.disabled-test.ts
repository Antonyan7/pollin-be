import {DateTimeUtil, EmailProvider} from '@libs/common'
import {Config} from '@config'
// import {testPubSubEvent} from '@functions-types'
// import {
//   // handlerPatientCreated,
//   handlerResetPassword,
//   handlerVerifyEmailRequest,
//   handlerVerifyUpdatedEmailRequest,
// } from '@firebase-platform/functions/email-notification/src/otp-code/handler'
// import {OTPCodeRepository} from '@libs/data-layer/apps/users/repositories/fireorm/otp-codes.repository'
// import {OTPCodeType} from '@libs/data-layer/apps/users/entities/fireorm/otp-codes'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {UserRecord} from 'firebase-admin/auth'
import {EmailAdapterProvider} from '../functions/email-notification/src/common'
// import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
// import {VerifyUpdateEmailSchema} from '@libs/common/model/proto-schemas/verify-update-email-request.schema'
import {userRecordFixture} from '@libs/common/test/fixtures'
// import FirebaseHelpers from '@libs/common/helpers/firebase.helper'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  emailUpdateOTPTemplateFixture,
  resendVerifyEmailOTPTemplateFixture,
  resetPasswordOTPTemplateFixture,
} from './fixtures/email-template.fixture'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

jest.setTimeout(15000)
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')

// const data = {
//   authUserId: 'authuserid',
// }
// const dataWithEmail = {
//   authUserId: 'authuserid',
//   email: 'fhealthdev+otp@gmail.com',
// }

// const getMessage = (data: {
//   authUserId: string | number
//   email?: string
// }): {data: string; attributes: Record<string, unknown>} => ({
//   attributes: {},
//   data: encodePubSubMessage(data, VerifyUpdateEmailSchema),
// })

// const failedData = {
//   authUserId: 23,
//   email: 'fhealthdev+otp2@gmail.com',
// }

const auditable = {
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: 'TEST',
}

describe('Email OTP Sender Firebase Functions', () => {
  const spyUserContactInfo = jest.spyOn(FirebaseAuthAdapter.prototype, 'getAuthUserById')
  spyUserContactInfo.mockResolvedValue(userRecordFixture as UserRecord)
  let dataSource: DataSource

  let emailTemplateSeed: EmailTemplateSeed

  let spyEmailAdapterProvider: jest.SpyInstance<Promise<EmailProvider[]>, []>

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    emailTemplateSeed = new EmailTemplateSeed(dataSource)
    await emailTemplateSeed.createArray([
      resendVerifyEmailOTPTemplateFixture,
      emailUpdateOTPTemplateFixture,
      resetPasswordOTPTemplateFixture,
    ])
    spyEmailAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')

    spyEmailAdapterProvider.mockResolvedValue([
      {id: 'sendinblue', name: 'sendinblue', active: true, disabled: false, ...auditable},
    ])
  })

  // test('should send OTP for verify-email-request', async () => {
  //   const spyOTP = jest.spyOn(OTPCodeRepository.prototype, 'create')
  //   jest.spyOn(FirebaseHelpers, 'otpGenerator').mockReturnValue('13')

  //   spyOTP.mockResolvedValue({
  //     id: '1',
  //     authUserId: data.authUserId,
  //     code: '123456',
  //     type: OTPCodeType.EmailVerify,
  //     updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     updatedBy: 'TestTopic',
  //   })

  //   const result = handlerVerifyEmailRequest(getMessage(data) as unknown as CloudEvent<PubSubEvent>)

  //   await expect(result).resolves.not.toThrow()
  // })

  // test('should send OTP for verify-update-email-request', async () => {
  //   const spyOTP = jest.spyOn(OTPCodeRepository.prototype, 'create')
  //   spyOTP.mockResolvedValue({
  //     id: '1',
  //     authUserId: data.authUserId,
  //     code: '123456',
  //     type: OTPCodeType.EmailVerify,
  //     updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     updatedBy: 'TestTopic',
  //   })

  //   const result = handlerVerifyUpdatedEmailRequest(
  //     getMessage(dataWithEmail) as unknown as CloudEvent<PubSubEvent>,
  //   )

  //   await expect(result).resolves.not.toThrow()
  // })

  // TODO: TEAMC-572
  // test('should send OTP for patient-created', async () => {
  //   const spyOTP = jest.spyOn(OTPCodeRepository.prototype, 'create')
  //   spyOTP.mockResolvedValue({
  //     id: '1',
  //     authUserId: data.authUserId,
  //     code: '123456',
  //     type: OTPCodeType.EmailVerify,
  //     updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     updatedBy: 'TestTopic',
  //   })

  //   const result = handlerPatientCreated(getMessage(data) as unknown as CloudEvent<PubSubEvent>)

  //   await expect(result).resolves.not.toThrow()
  // })

  // test('should send OTP for reset-password-requested', async () => {
  //   const spyOTP = jest.spyOn(OTPCodeRepository.prototype, 'create')
  //   spyOTP.mockResolvedValue({
  //     id: '1',
  //     authUserId: data.authUserId,
  //     code: '123456',
  //     type: OTPCodeType.ResetPassword,
  //     updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  //     updatedBy: 'TestTopic',
  //   })

  //   const result = handlerResetPassword(getMessage(data) as unknown as CloudEvent<PubSubEvent>)

  //   await expect(result).resolves.not.toThrow()
  // })

  // test('should fail to validate otp code with invalid payload', async () => {
  //   expect(() => getMessage(failedData)).toThrow()
  // })

  afterAll(async () => {
    await emailTemplateSeed.deleteByIds([
      resetPasswordOTPTemplateFixture.id,
      emailUpdateOTPTemplateFixture.id,
      resendVerifyEmailOTPTemplateFixture.id,
    ])
    jest.clearAllMocks()
  })
})
