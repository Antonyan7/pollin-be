import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {PatientAlertSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  patientMilestoneFixture,
  destroyAppointmentStatusUpdatedFixtures,
  patientFixture,
} from './seed'
import {removePatientAlertRequiredActionHandler} from '@codebase/appointments/handlers/appointment-status-updated'
import {PatientAlertType} from '@libs/services-common/enums/patient.enum'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
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

describe('Firebase Function: remove patient alert for required action', () => {
  let dataSource: DataSource

  let patientAlertSeed: PatientAlertSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)

    patientAlertSeed = new PatientAlertSeed(dataSource)
  })

  test('should not remove patient alert for required action', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Booked},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create({
      milestoneId: patientMilestoneFixture.id,
      type: PatientAlertType.CompleteRequiredActions,
      patientId: patientFixture.id,
    })

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))
    await removePatientAlertRequiredActionHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeTruthy()
  })

  test('should not remove patient alert for required action (old status was not booked)', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create({
      milestoneId: patientMilestoneFixture.id,
      type: PatientAlertType.CompleteRequiredActions,
      patientId: patientFixture.id,
    })

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))
    await removePatientAlertRequiredActionHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeTruthy()
  })

  test('should remove patient alert for required action (Cancelled)', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Cancelled},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const {id: alertId} = await patientAlertSeed.create({
      milestoneId: patientMilestoneFixture.id,
      type: PatientAlertType.CompleteRequiredActions,
      patientId: patientFixture.id,
    })

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))
    await removePatientAlertRequiredActionHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeFalsy()
  })

  test('should remove patient alert for required action (Done)', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }

    const {id: alertId} = await patientAlertSeed.create({
      milestoneId: patientMilestoneFixture.id,
      type: PatientAlertType.CompleteRequiredActions,
      patientId: patientFixture.id,
    })

    const {id: extraAlertId} = await patientAlertSeed.create({
      type: PatientAlertType.CompleteRequiredActions,
      patientId: patientFixture.id,
    })

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))
    await removePatientAlertRequiredActionHandler(message)

    const alert = await patientAlertSeed.findOneById(alertId)
    expect(alert).toBeFalsy()

    const extraAlert = await patientAlertSeed.findOneById(extraAlertId)
    expect(extraAlert).toBeTruthy()
  })

  afterAll(async () => {
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
