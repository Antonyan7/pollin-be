import {removeExpiredPasswordResetTokensHandler} from '@codebase/cache/handlers'
import {Timestamp} from 'firebase-admin/firestore'
import {Config} from '@config/config.util'
import {PasswordResetTokenSeed} from '@seeds/firestore/password-reset-token-seed'

const PASSWORD_RESET_TOKEN_EXPIRE_HOURS = Config.get<number>('PASSWORD_RESET_TOKEN_EXPIRE_HOURS')
const passwordResetTokenSeed = new PasswordResetTokenSeed()
const passwordResetTokenID = 'FirebaseFunctionExpireAllPasswordResetTokenID'
const passwordResetToken = 'PasswordResetToken'
const passwordResetTokenCreateDate = new Date()
passwordResetTokenCreateDate.setHours(
  passwordResetTokenCreateDate.getHours() - PASSWORD_RESET_TOKEN_EXPIRE_HOURS,
)

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

describe('Firebase Function: remove-expired-password-reset-token', () => {
  beforeAll(async () => {
    await passwordResetTokenSeed.create(
      {
        id: passwordResetTokenID,
        token: passwordResetToken,
        authUserId: 'test',
        createdAt: Timestamp.fromDate(passwordResetTokenCreateDate),
        updatedAt: Timestamp.fromDate(passwordResetTokenCreateDate),
        updatedBy: null,
      },
      testDataCreator,
    )
  })

  test('should remove all expired PasswordResetToken', async () => {
    const result = removeExpiredPasswordResetTokensHandler()
    await expect(result).resolves.not.toThrow()

    const token = await passwordResetTokenSeed.getById(passwordResetTokenID)
    expect(token.data()).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await passwordResetTokenSeed.deleteByTestDataCreator(testDataCreator)
  })
})
