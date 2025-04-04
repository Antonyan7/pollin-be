import * as functions from 'firebase-functions/v2'
import * as crypto from 'crypto'
import {ValidConfig} from '@config/valid-config.util'
import {PushNotificationAdapter} from '@libs/common/adapters'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {PatientPushNotificationSeed, PatientSeed} from '@seeds/typeorm'
import {
  patientData,
  patientPushNotificationData,
} from '../push-notifications/push-notification.seed'
import {StructuredLogger} from '@libs/common'
import {AppConfigSeed} from '@seeds/firestore/app-config'
import {chatMessageCreatedHandler} from '@firebase-platform/functions/push-notification/src/chat-message-created-updated/handler'

jest.mock('../../../libs/common/src/adapters/push-notification.adapter')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.setTimeout(10000)

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

let dataSource: DataSource
let patientSeed: PatientSeed
let patientPushNotificationSeed: PatientPushNotificationSeed

let appConfigSeed = new AppConfigSeed()

describe('Message created handler', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)
    await patientSeed.create(patientData)
    await patientPushNotificationSeed.create(patientPushNotificationData)

    await appConfigSeed.createFixture()
  })

  const spy = jest.spyOn(ValidConfig.prototype, 'get')
  spy.mockReturnValue('private-key')

  test('should send a push notification if the token is valid', async () => {
    const verifiedPushValidationToken = crypto
      .createHmac('sha256', 'private-key')
      .update(patientData.uuid)
      .digest('hex')

    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    const request = {
      body: {
        inbox: {id: '1'},
        conversation: {
          meta: {
            sender: {
              identifier: patientData.uuid,
              custom_attributes: {
                webhook_payload_validation_token: verifiedPushValidationToken,
              },
            },
          },
          messages: [
            {
              content: 'Hi, how are you?',
            },
          ],
        },
      },
    } as functions.https.Request

    await chatMessageCreatedHandler(request)

    expect(spyPushNotificationAdapterSend).toBeCalledWith(
      expect.objectContaining({
        title: 'New Message',
        body: 'Hi, how are you?',
        registrationToken: 'PatientPushNotifiationTokenCfTest',
      }),
    )

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    expect(spyOnLogger).toHaveBeenCalledTimes(0)

    spyPushNotificationAdapterSend.mockClear()
    spyOnLogger.mockClear()
  })

  test('should not send a push notification - wrong inbox id', async () => {
    const verifiedPushValidationToken = crypto
      .createHmac('sha256', 'private-key')
      .update(patientData.uuid)
      .digest('hex')

    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const request = {
      body: {
        inbox: {id: '33'},
        conversation: {
          meta: {
            sender: {
              identifier: patientData.uuid,
              custom_attributes: {
                webhook_payload_validation_token: verifiedPushValidationToken,
              },
            },
          },
          messages: [
            {
              content: 'Hi, how are you?',
            },
          ],
        },
      },
    } as functions.https.Request

    await expect(chatMessageCreatedHandler(request)).rejects.toThrow('Unknown inbox id')

    expect(spyPushNotificationAdapterSend).toBeCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  test('should handle error if patient UUID is invalid', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    const invalidRequest = {
      body: {
        inbox: {id: '1'},
        conversation: {
          meta: {
            sender: {
              identifier: '',
              custom_attributes: {
                webhook_payload_validation_token: '',
              },
            },
          },
        },
      },
    } as functions.https.Request

    await expect(chatMessageCreatedHandler(invalidRequest)).rejects.toThrow('Invalid identifier')

    expect(spyPushNotificationAdapterSend).not.toHaveBeenCalled()

    spyPushNotificationAdapterSend.mockClear()
    spyOnLogger.mockClear()
  })

  it('should handle error if patient is not found', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    const patientNotFoundRequest = {
      body: {
        inbox: {id: '1'},
        conversation: {
          meta: {
            sender: {
              identifier: 'not-valid-patient-identifier',
              custom_attributes: {
                webhook_payload_validation_token: '',
              },
            },
          },
        },
      },
    } as functions.https.Request

    await expect(chatMessageCreatedHandler(patientNotFoundRequest)).rejects.toThrow(
      'Patient was not found. uuid: not-valid-patient-identifier',
    )

    expect(spyPushNotificationAdapterSend).not.toHaveBeenCalled()

    spyPushNotificationAdapterSend.mockClear()
    spyOnLogger.mockClear()
  })

  it('should handle error if push validation token is invalid', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    const invalidRequest = {
      body: {
        inbox: {id: '1'},
        conversation: {
          meta: {
            sender: {
              identifier: patientData.uuid,
              custom_attributes: {
                webhook_payload_validation_token: 'invalid-token',
              },
            },
          },
        },
      },
    } as functions.https.Request

    await expect(chatMessageCreatedHandler(invalidRequest)).rejects.toThrow(
      'Invalid chat contact signature',
    )

    expect(spyPushNotificationAdapterSend).not.toHaveBeenCalled()

    spyPushNotificationAdapterSend.mockClear()
    spyOnLogger.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()
  })
})
