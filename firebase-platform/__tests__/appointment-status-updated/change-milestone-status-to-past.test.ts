import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {PatientMilestoneSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  patientMilestoneFixture,
  appointmentFixture,
  destroyAppointmentStatusUpdatedFixtures,
} from './seed'
import {PatientMilestoneStatus} from '@libs/services-common/enums/milestone.enum'
import {changeMilestoneStatusToPastHandler} from '@codebase/appointments/handlers/appointment-status-updated'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'

jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter.ts')
jest.mock('@google-cloud/logging-bunyan')
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

describe('Firebase Function: change patient milestone status to Past on appointment status change to Done', () => {
  let dataSource: DataSource

  let patientMilestoneSeed: PatientMilestoneSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)

    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
  })

  test('should not change milestone status', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Cancelled},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await changeMilestoneStatusToPastHandler(message)

    const patientMilestone = await patientMilestoneSeed.findById(patientMilestoneFixture.id)
    expect(patientMilestone.status).toBe(PatientMilestoneStatus.Upcoming)
  })

  test('should change milestone status', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await changeMilestoneStatusToPastHandler(message)

    const patientMilestone = await patientMilestoneSeed.findById(patientMilestoneFixture.id)
    expect(patientMilestone.status).toBe(PatientMilestoneStatus.Past)
  })

  afterAll(async () => {
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
