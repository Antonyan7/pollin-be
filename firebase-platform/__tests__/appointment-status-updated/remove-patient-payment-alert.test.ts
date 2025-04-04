import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {PatientAlertSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  destroyAppointmentStatusUpdatedFixtures,
  patientFixture,
} from './seed'

import {PatientAlertType} from '@libs/services-common/enums/patient.enum'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {removePatientPaymentAlertHandler} from '@codebase/appointments/handlers/appointment-status-updated'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'

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

const paymentAlertFixture = {
  appointmentId: appointmentFixture.id,
  type: PatientAlertType.AppointmentCheckout,
  patientId: patientFixture.id,
}

describe('Firebase Function: remove patient payment alert', () => {
  let dataSource: DataSource

  let patientAlertSeed: PatientAlertSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)

    patientAlertSeed = new PatientAlertSeed(dataSource)
  })

  test('should not remove patient payment alert', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Booked},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create(paymentAlertFixture)

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await removePatientPaymentAlertHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeTruthy()
  })

  test('should remove patient payment alert (NoShow)', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.NoShow},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create(paymentAlertFixture)

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await removePatientPaymentAlertHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeFalsy()
  })

  test('should remove patient payment alert (Cancelled)', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Cancelled},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create(paymentAlertFixture)

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await removePatientPaymentAlertHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeFalsy()
  })

  afterAll(async () => {
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
