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
import {
  handlerMedicationAdded,
  handlerMedicationUpdated,
  handlerMedicationsDiscontinued,
} from '@firebase-platform/functions/push-notification/src/medications/handler'
import {PushNotificationAdapter} from '@libs/common/adapters'
import {PushNotificationType} from '@libs/common/enums/push-notification.enum'
import {PatientPrescriptionStatus} from '@libs/services-common/enums/medication.enum'
import {MedicationsDiscontinuedSchema} from '@libs/common/model/proto-schemas/medications-discontinued.schema'

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

const id = 7252023

const patientFixture = {
  id,
  uuid: v4(),
  authUserId: 'task-medication-user',
}

const patientPushNotificationFixture = {
  id,
  patientId: patientFixture.id,
  registrationToken: 'test',
  pushNotificationsEnabled: true,
}

const prescriptionFixture = {
  id,
  uuid: v4(),
  prescribedOn: dateTimeUtil.now(),
  patientId: patientFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
}

const patientMedicationFixture = {
  id,
  uuid: v4(),
  patientId: patientFixture.id,
  startDate: dateTimeUtil.now(),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 1),
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
    await patientMedicationSeed.createArray([
      patientMedicationFixture,
      patientMedicationWithPrescriptionFixture,
    ])
  })

  it('should send notification for new medication', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')
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

    expect(spyPushNotificationAdapterSend).toBeCalledWith(
      expect.objectContaining({
        type: PushNotificationType.MedicationDetails,
        id: patientMedicationWithPrescriptionFixture.uuid,
      }),
    )
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  it('should send notification for medication changes', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientId: patientFixture.id,
          patientMedicationUUID: patientMedicationWithPrescriptionFixture.uuid,
        },
        MedicationAddedSchema,
      ),
    )

    await handlerMedicationUpdated(message)

    expect(spyPushNotificationAdapterSend).toBeCalledWith(
      expect.objectContaining({
        type: PushNotificationType.MedicationDetails,
        id: patientMedicationWithPrescriptionFixture.uuid,
      }),
    )
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  it('should send notification for medications discontinue', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientId: patientFixture.id,
          patientMedicationsIds: [patientMedicationWithPrescriptionFixture.id],
        },
        MedicationsDiscontinuedSchema,
      ),
    )

    await handlerMedicationsDiscontinued(message)

    expect(spyPushNotificationAdapterSend).toBeCalledWith(
      expect.objectContaining({
        type: PushNotificationType.Medications,
        id: null,
      }),
    )
    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(1)
    spyPushNotificationAdapterSend.mockClear()
  })

  it('should not send notification for medications discontinue - medication is not visible on mobile', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientId: patientFixture.id,
          patientMedicationsIds: [patientMedicationFixture.id],
        },
        MedicationsDiscontinuedSchema,
      ),
    )

    await handlerMedicationsDiscontinued(message)

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  it('should not send notification for medication changes - medication doesnt have prescription', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientId: patientFixture.id,
          patientMedicationUUID: patientMedicationFixture.uuid,
        },
        MedicationAddedSchema,
      ),
    )

    await handlerMedicationUpdated(message)

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  it('should not send notification for new medication - medication doesnt have prescription', async () => {
    const spyPushNotificationAdapterSend = jest.spyOn(PushNotificationAdapter.prototype, 'send')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientId: patientFixture.id,
          patientMedicationUUID: patientMedicationFixture.uuid,
        },
        MedicationAddedSchema,
      ),
    )

    await handlerMedicationAdded(message)

    expect(spyPushNotificationAdapterSend).toHaveBeenCalledTimes(0)
    spyPushNotificationAdapterSend.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientMedicationSeed.removePatientMedicationByIds([
      patientMedicationFixture.id,
      patientMedicationWithPrescriptionFixture.id,
    ])
    await patientPrescriptionSeed.removeByIds([prescriptionFixture.id])
    await patientSeed.removeByIds([patientFixture.id])
    await dataSource.destroy()
  })
})
