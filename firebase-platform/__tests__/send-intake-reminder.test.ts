import {handlerSendIntakeReminder} from '@firebase-platform/functions/email-notification/src/send-intake-reminder/handler'
import {testPubSubEvent} from '@functions-types'
import {PatientSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {PatientUUIDSchema} from '@libs/common/model/proto-schemas/patient-uuid.schema'

jest.setTimeout(10000)

jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
const authUserId = 'CF_TEST_AUTH_ID_INTAKE'
const firstName1 = 'CF_TEST_NAME_INTAKE'
const lastName1 = 'CF_TEST_LAST_NAME_INTAKE'
const middleName = 'CF_TEST_MIDDLE_NAME_INTAKE'
const userEmail = 'fhealthdev+Nestproject+TEST@gmail.com'

let patientUUID = null
jest.mock('@google-cloud/logging-bunyan')

const failedData = {
  patientUUID: 'INVALID_UUID',
}

let patientSeed: PatientSeed

describe('Firebase Function: remove-expired-otps', () => {
  let dataSource: DataSource
  let spyGetUserById: jest.SpyInstance

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    const patient = await patientSeed.create({
      authUserId: authUserId,
      firstName: firstName1,
      lastName: lastName1,
      middleName: middleName,
    })
    patientUUID = patient.uuid
    spyGetUserById = jest.spyOn(FirebaseAuthAdapter.prototype, 'getAuthUserById')
  })
  test('send intake reminder email', async () => {
    spyGetUserById.mockResolvedValue({
      email: userEmail,
    })
    const message = testPubSubEvent(encodePubSubMessage({patientUUID}, PatientUUIDSchema))

    const result = handlerSendIntakeReminder(message)
    await expect(result).resolves.not.toThrow()
  })
  test('send intake reminder email patient not found', async () => {
    const failedMessage = testPubSubEvent(encodePubSubMessage(failedData, PatientUUIDSchema))

    const result = handlerSendIntakeReminder(failedMessage)
    await expect(result).resolves.not.toThrow()
  })
  afterAll(async () => {
    jest.clearAllMocks()
    await patientSeed.removePatientByAuthUserId(authUserId)
  })
})
