import * as functions from 'firebase-functions/v2'
import * as crypto from 'crypto'
import {ValidConfig} from '@config/valid-config.util'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {PatientSeed} from '@seeds/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  ChatConversationCreatedData,
  handlerChatwootConversationCreated,
} from '@firebase-platform/functions/webhooks/src/handlers/chatwoot-conversation-created.handler'
import {StructuredLogger} from '@libs/common'
import {AppConfigSeed} from '@seeds/firestore/app-config'

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

jest.mock('@google-cloud/logging-bunyan')

let dataSource: DataSource
let patientSeed: PatientSeed

const patientFixture: Partial<Patient> = {
  id: 2132,
  uuid: '8c4d3bc4-d79d-450f-9d1c-8a03c41bc5d2',
  authUserId: 'patientFixture',
}

const patientToNotUpdateFixture: Partial<Patient> = {
  id: 2133,
  uuid: '8c4d3bc4-d79d-450f-9d1c-8a03c41bc5d1',
  authUserId: 'patientToNotUpdateFixture',
}

describe('handlerNotificationOnChatMessage', () => {
  let appConfigSeed = new AppConfigSeed()

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)

    await patientSeed.createArray([patientFixture, patientToNotUpdateFixture])

    await appConfigSeed.createFixture()
  })

  const spy = jest.spyOn(ValidConfig.prototype, 'get')
  spy.mockReturnValue('private-key')

  test('should update patient conversation id if the token is valid', async () => {
    const verifiedPushValidationToken = crypto
      .createHmac('sha256', 'private-key')
      .update(patientFixture.uuid)
      .digest('hex')

    const body: ChatConversationCreatedData = {
      id: 5,
      meta: {
        sender: {
          custom_attributes: {
            chat_team_identifier: '1',
            webhook_payload_validation_token: verifiedPushValidationToken,
          },
          identifier: patientFixture.uuid,
          messages: [{account_id: 1}],
        },
      },
      inbox: {id: '1'},
    }

    const request = {
      body,
    } as functions.https.Request

    await handlerChatwootConversationCreated(request)

    const patient = await patientSeed.findOneById(patientFixture.id)
    expect(patient.chatwootConversationId).toBe(String(body.id))
  })

  test('should not update patient conversation id if the inbox id is not valid', async () => {
    const body = {
      inbox: {id: '2'},
    } as ChatConversationCreatedData

    const request = {
      body,
    } as functions.https.Request

    await expect(handlerChatwootConversationCreated(request)).rejects.toThrow('Unknown inbox id')
  })

  test('should not update patient conversation id if the token is not valid', async () => {
    const wrongPushValidationToken = crypto
      .createHmac('sha256', 'private-key')
      .update(patientFixture.uuid)
      .digest('hex')

    const body: ChatConversationCreatedData = {
      id: 2,
      inbox: {id: '1'},
      meta: {
        sender: {
          custom_attributes: {
            chat_team_identifier: '1',
            webhook_payload_validation_token: wrongPushValidationToken,
          },
          identifier: patientToNotUpdateFixture.uuid,
          messages: [{account_id: 1}],
        },
      },
    }

    const request = {
      body,
    } as functions.https.Request

    await expect(handlerChatwootConversationCreated(request)).rejects.toThrow(
      'Invalid push validation token sent from mobile',
    )

    const patient = await patientSeed.findOneById(patientToNotUpdateFixture.id)
    expect(patient.chatwootConversationId).toBeNull()
  })

  test('should not update patient conversation id if patient was not found', async () => {
    const patientUUID = 'wrong one'

    const validPushValidationToken = crypto
      .createHmac('sha256', 'private-key')
      .update(patientUUID)
      .digest('hex')

    const body: ChatConversationCreatedData = {
      id: 2,
      inbox: {id: '1'},
      meta: {
        sender: {
          custom_attributes: {
            chat_team_identifier: '1',
            webhook_payload_validation_token: validPushValidationToken,
          },
          identifier: patientUUID,
          messages: [{account_id: 1}],
        },
      },
    }

    const request = {
      body,
    } as functions.https.Request

    const spyOnLogger = jest.spyOn(StructuredLogger, 'error')

    await expect(handlerChatwootConversationCreated(request)).rejects.toThrow(
      `Patient with uuid ${patientUUID} was not found`,
    )

    expect(spyOnLogger.mock.calls[0][2].errorInfo.message).toBe(
      `Patient with uuid ${patientUUID} was not found`,
    )
    spyOnLogger.mockClear()
  })

  afterAll(async () => {
    await patientSeed.removeByIds([patientFixture.id, patientToNotUpdateFixture.id])

    jest.clearAllMocks()
  })
})
