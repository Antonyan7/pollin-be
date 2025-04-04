import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {AppointmentSeed, PatientAlertSeed, PatientMilestoneSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  patientMilestoneFixture,
  destroyAppointmentStatusUpdatedFixtures,
  patientFixture,
} from './seed'
import {addPatientConfirmAlertHandler} from '@codebase/appointments/handlers/appointment-status-updated'
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

describe('Firebase Function: add patient confirm alert', () => {
  let dataSource: DataSource

  let patientMilestoneSeed: PatientMilestoneSeed
  let appointmentSeed: AppointmentSeed
  let patientAlertSeed: PatientAlertSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)

    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    patientAlertSeed = new PatientAlertSeed(dataSource)
  })

  test('should not add patient alert for required action (wrong appointment status)', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      newAppointment: {status: AppointmentStatus.InProgress},
      oldAppointment: {status: AppointmentStatus.Booked},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await addPatientConfirmAlertHandler(message)

    const {patientAlerts} = await patientMilestoneSeed.findWithRelatedAlerts(
      patientMilestoneFixture.id,
    )
    expect(patientAlerts.length).toBe(0)
  })

  test('should add patient alert for required action', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      newAppointment: {status: AppointmentStatus.Booked},
      oldAppointment: {status: AppointmentStatus.Confirmed},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await addPatientConfirmAlertHandler(message)

    const {patientAlerts} = await patientMilestoneSeed.findWithRelatedAlerts(
      patientMilestoneFixture.id,
    )
    expect(patientAlerts.length).toBe(1)
    expect(patientAlerts[0]).toMatchObject({
      type: PatientAlertType.CompleteRequiredActions,
      milestoneId: patientMilestoneFixture.id,
      appointmentId: patientMilestoneFixture.dominantAppointmentId,
    })
  })

  test('should not add patient alert for required action (alert already exists)', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      newAppointment: {status: AppointmentStatus.Booked},
      oldAppointment: {status: AppointmentStatus.Confirmed},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const milestone = await patientMilestoneSeed.findWithRelatedAlerts(patientMilestoneFixture.id)
    expect(milestone.patientAlerts.length).toBe(1)

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await addPatientConfirmAlertHandler(message)

    const {patientAlerts} = await patientMilestoneSeed.findWithRelatedAlerts(
      patientMilestoneFixture.id,
    )
    expect(patientAlerts.length).toBe(1)
  })

  test(`should not add patient alert for required action (appointment doesn't have patient milestone)`, async () => {
    const appointmentId = appointmentFixture.id + 1
    await appointmentSeed.create({
      ...appointmentFixture,
      id: appointmentId,
      identifier: `A${appointmentId}`,
    })
    const data = {
      appointmentId,
      newAppointment: {status: AppointmentStatus.Booked},
      oldAppointment: {status: AppointmentStatus.Confirmed},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await addPatientConfirmAlertHandler(message)

    const patientAlerts = await patientAlertSeed.findByPatientId(patientFixture.id)
    expect(patientAlerts.some((alert) => alert.appointmentId === appointmentId)).toBeFalsy()
  })

  afterAll(async () => {
    await appointmentSeed.removeById(appointmentFixture.id + 1)
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
