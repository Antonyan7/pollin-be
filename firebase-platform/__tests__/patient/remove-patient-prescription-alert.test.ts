import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {v4} from 'uuid'
import {DateTimeUtil} from '@libs/common'
import {PatientSeed, PatientPrescriptionSeed, PatientAlertSeed} from '@seeds/typeorm'

import {PatientAlertType} from '@libs/services-common/enums/patient.enum'
import {PatientPrescriptionStatus} from '@libs/services-common/enums/medication.enum'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {PrescriptionUpdatedSchema} from '@libs/common/model/proto-schemas/prescription-updated.schema'

import {removePatientPrescriptionAlertHandler} from '@firebase-platform/functions/patients/src/handlers/prescription-updated/remove-patient-prescription-alert-handler'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'

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
jest.setTimeout(10000)

const dateTimeUtil = new DateTimeUtil()

describe('Firebase Function: removePatientPrescriptionAlertHandler', () => {
  let dataSource: DataSource

  let patientSeed: PatientSeed
  let patientAlertSeed: PatientAlertSeed
  let patientPrescriptionSeed: PatientPrescriptionSeed
  const idForSeeds1 = 100000001
  const idForSeeds2 = 100000002
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    patientPrescriptionSeed = new PatientPrescriptionSeed(dataSource)
    patientAlertSeed = new PatientAlertSeed(dataSource)
  })

  test('should not remove patient prescription checkout alert for Unpaid Prescription', async () => {
    const idForSeeds = idForSeeds1

    const patientFixture: Partial<Patient> = {
      id: idForSeeds,
      authUserId: 'CF_TEST_PRESCRIPTION_ALERT_AUTH_1',
      firstName: 'CF_TEST_PRESCRIPTION_ALERT_FIRSTNAME',
      lastName: 'CF_TEST_PRESCRIPTION_ALERT_LASTNAME',
    }

    const prescribedPrescriptionFixture = {
      id: idForSeeds,
      uuid: v4(),
      prescribedOn: dateTimeUtil.now(),
      patientId: patientFixture.id,
      status: PatientPrescriptionStatus.Prescribed,
    }

    const patientMedicationCheckoutAlertFixture = {
      id: idForSeeds,
      prescriptionId: idForSeeds,
      patientId: idForSeeds,
      type: PatientAlertType.MedicationsCheckout,
    }
    await patientSeed.create(patientFixture)
    await patientPrescriptionSeed.create(prescribedPrescriptionFixture)
    const data = {
      prescriptionId: idForSeeds,
      //authUserFullName: 'fullName',
      //authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create(patientMedicationCheckoutAlertFixture)

    const message = testPubSubEvent(encodePubSubMessage(data, PrescriptionUpdatedSchema))

    await removePatientPrescriptionAlertHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeTruthy()
  })

  test('should remove patient prescription checkout alert for Paid Prescription', async () => {
    const idForSeeds = idForSeeds2

    const patientFixture: Partial<Patient> = {
      id: idForSeeds,
      authUserId: 'CF_TEST_PRESCRIPTION_ALERT_AUTH_2',
      firstName: 'CF_TEST_PRESCRIPTION_ALERT_FIRSTNAME',
      lastName: 'CF_TEST_PRESCRIPTION_ALERT_LASTNAME',
    }

    const paidPrescriptionFixture = {
      id: idForSeeds,
      uuid: v4(),
      prescribedOn: dateTimeUtil.now(),
      patientId: patientFixture.id,
      status: PatientPrescriptionStatus.Paid,
    }

    const patientMedicationCheckoutAlertFixture = {
      id: idForSeeds,
      prescriptionId: idForSeeds,
      patientId: idForSeeds,
      type: PatientAlertType.MedicationsCheckout,
    }
    await patientSeed.create(patientFixture)
    await patientPrescriptionSeed.create(paidPrescriptionFixture)
    const data = {
      prescriptionId: idForSeeds,
      //authUserFullName: 'fullName',
      //authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create(patientMedicationCheckoutAlertFixture)

    const message = testPubSubEvent(encodePubSubMessage(data, PrescriptionUpdatedSchema))

    await removePatientPrescriptionAlertHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeFalsy()
  })

  afterAll(async () => {
    await patientSeed.removeByIds([idForSeeds1, idForSeeds2])
    await patientPrescriptionSeed.removeByIds([idForSeeds1, idForSeeds2])
    await patientAlertSeed.removeByIds([idForSeeds1, idForSeeds2])
    await dataSource.destroy()
  })
})
