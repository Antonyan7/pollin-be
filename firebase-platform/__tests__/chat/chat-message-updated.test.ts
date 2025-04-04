import * as functions from 'firebase-functions/v2'
import {AppConfigSeed} from '@seeds/firestore/app-config'
import {chatMessageUpdatedHandler} from '@firebase-platform/functions/push-notification/src/chat-message-created-updated/handler'
import {PatientSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import * as crypto from 'crypto'
import {NestprojectConfigService} from '@libs/common'

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.setTimeout(10000)

describe('Chat message updated handler', () => {
  let appConfigSeed = new AppConfigSeed()

  const phoneNumber = '+1234567890'
  const patientUUID = 'd07dfb65-d420-440f-9727-8431114a00ca'

  const patientId = 5634534

  let dataSource: DataSource
  let patientSeed: PatientSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)

    await appConfigSeed.createFixture()
    await patientSeed.createArray([
      {
        id: patientId,
        uuid: patientUUID,
        authUserId: 'sms-validation-patient',
        firstName: 'SMS_VALIDATION_TEST_NAME',
        lastName: 'SMS_VALIDATION_TEST_LAST_NAME',
        phoneNumber: phoneNumber,
      },
    ])
  })

  afterAll(async () => {
    await patientSeed.removeByIds([patientId])
  })

  it('should call sms validation if the inbox id is sms', async () => {
    const smsRequest = {
      body: {
        inbox: {id: '201'},
        conversation: {
          meta: {
            sender: {
              identifier: '',
            },
          },
        },
      },
    } as functions.https.Request

    await expect(chatMessageUpdatedHandler(smsRequest)).rejects.toThrow('Invalid identifier')
  })

  it('should throw error if the inbox id is unknown', async () => {
    const verifiedPushValidationToken = crypto
      .createHmac(
        'sha256',
        NestprojectConfigService.getInstance().get('CONVERSATION_PLATFORM_PUSH_VALIDATION_PRIVATE_KEY'),
      )
      .update(patientUUID)
      .digest('hex')

    const unknownRequest = {
      body: {
        inbox: {id: 'unknown'},
        conversation: {
          meta: {
            sender: {
              identifier: patientUUID,
              custom_attributes: {
                webhook_payload_validation_token: verifiedPushValidationToken,
              },
            },
          },
        },
      },
    } as functions.https.Request

    await expect(chatMessageUpdatedHandler(unknownRequest)).rejects.toThrow('Unknown inbox id')
  })

  afterAll(async () => {
    jest.clearAllMocks()
  })
})
