import {DateTimeUtil} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  PatientMedicationSeed,
  PatientPrescriptionSeed,
  PatientPushNotificationSeed,
  PatientSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {v4} from 'uuid'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {MedicationAddedSchema} from '@libs/common/model/proto-schemas/medication-added.schema'
import {testPubSubEvent} from '@functions-types'
import {handlerMedicationAdded} from '@firebase-platform/functions/push-notification/src/medications/handler'
import {PatientPrescriptionStatus} from '@libs/services-common/enums/medication.enum'
import {StructuredLogger} from '@libs/common'
import {invalidTokenMedication} from '@libs/common/adapters/__mocks__/push-notification.adapter'
import {
  REGISTRATION_TOKEN_NOT_REGISTERED,
  UNREGISTERED_TOKEN,
} from '@libs/common/errors/push-notification.errors'
import * as activityLogs from '@libs/common/enums/activity-logs'

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
jest.mock('../../../libs/common/src/adapters/push-notification.adapter.ts')

const dateTimeUtil = new DateTimeUtil()

const id = 7252024

const patientFixture = {
  id,
  uuid: v4(),
  authUserId: 'task-medication-user-2',
}

export const patientPushNotificationFixture = {
  id,
  patientId: patientFixture.id,
  registrationToken: invalidTokenMedication,
  pushNotificationsEnabled: true,
}

const prescriptionFixture = {
  id,
  uuid: v4(),
  prescribedOn: dateTimeUtil.now(),
  patientId: patientFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
}

const patientMedicationWithPrescriptionFixture = {
  id: id + 1,
  uuid: v4(),
  patientId: patientFixture.id,
  startDate: dateTimeUtil.now(),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 1),
  prescriptionId: prescriptionFixture.id,
}

let dataSource: DataSource

let patientSeed: PatientSeed
let patientPrescriptionSeed: PatientPrescriptionSeed
let patientMedicationSeed: PatientMedicationSeed
let patientPushNotificationSeed: PatientPushNotificationSeed

describe('Task overdue email', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    patientPrescriptionSeed = new PatientPrescriptionSeed(dataSource)
    patientMedicationSeed = new PatientMedicationSeed(dataSource)
    patientPushNotificationSeed = new PatientPushNotificationSeed(dataSource)

    await patientSeed.create(patientFixture)
    await Promise.all([
      patientPrescriptionSeed.create(prescriptionFixture),
      patientPushNotificationSeed.create(patientPushNotificationFixture),
    ])
    await patientMedicationSeed.createArray([patientMedicationWithPrescriptionFixture])
  })

  it('should fail to send notification for new medication - token is not registered', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')

    const pushNotificationBeforeRequest = await patientPushNotificationSeed.findByPatientId(
      patientFixture.id,
    )
    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientId: patientFixture.id,
          patientMedicationUUID: patientMedicationWithPrescriptionFixture.uuid,
        },
        MedicationAddedSchema,
      ),
    )

    await handlerMedicationAdded(message)
    const pushNotificationAfterRequest = await patientPushNotificationSeed.findByPatientId(
      patientFixture.id,
    )

    expect(pushNotificationBeforeRequest).toBeTruthy()
    expect(pushNotificationAfterRequest).toBeNull()
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.PushNotificationFunctions.HandleSendNotificationError,
      activityLogs.PushNotificationActions.UnregisteredToken,
      {
        errorInfo: {message: REGISTRATION_TOKEN_NOT_REGISTERED},
        message: UNREGISTERED_TOKEN,
      },
    )
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientMedicationSeed.removePatientMedicationByIds([
      patientMedicationWithPrescriptionFixture.id,
    ])
    await patientPrescriptionSeed.removeByIds([prescriptionFixture.id])
    await patientSeed.removeByIds([patientFixture.id])
    await dataSource.destroy()
  })
})
