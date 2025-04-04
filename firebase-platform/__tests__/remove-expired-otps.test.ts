import {removeExpiredOtpsHandler} from '@codebase/cache/handlers'
import {OTPCodeSeed} from '@seeds/firestore/otp-code.seed'
import {OTPCodeType} from '@libs/data-layer/apps/users/entities/fireorm/otp-codes'
import {Timestamp} from 'firebase-admin/firestore'
import {Config} from '@config/config.util'

const EXPIRED_OTP_TIME = Config.get<number>('OTP_EXPIRE_HOURS')
const otpSeed = new OTPCodeSeed()
const otpID = 'FirebaseFunctionExpireAllOTPID'
const otpCreateDate = new Date()
otpCreateDate.setHours(otpCreateDate.getHours() - EXPIRED_OTP_TIME)
jest.setTimeout(15000)

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

const testDataCreator = __filename.split('/__tests__/')[1]

describe('Firebase Function: remove-expired-otps', () => {
  beforeAll(async () => {
    await otpSeed.create(
      {
        id: otpID,
        code: '131142',
        authUserId: 'test',
        type: OTPCodeType.EmailVerify,
        createdAt: Timestamp.fromDate(otpCreateDate),
        updatedAt: Timestamp.fromDate(otpCreateDate),
        updatedBy: null,
      },
      testDataCreator,
    )
  })

  test('should remove all expired OTPs', async () => {
    const result = removeExpiredOtpsHandler()
    await expect(result).resolves.not.toThrow()

    const otpCode = await otpSeed.fetchByID(otpID)
    expect(otpCode.data()).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await otpSeed.deleteByTestDataCreator(testDataCreator)
  })
})
