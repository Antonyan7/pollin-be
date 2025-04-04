import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {AppointmentSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  destroyAppointmentStatusUpdatedFixtures,
} from './seed'
import {addAfterVisitSummaryHandler} from '@codebase/appointments/handlers/appointment-status-updated'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
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

describe('Firebase Function: add after visit summary on appointment status change to Done', () => {
  let dataSource: DataSource

  let appointmentSeed: AppointmentSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)

    appointmentSeed = new AppointmentSeed(dataSource)
  })

  test('should not add after visit summary', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Cancelled},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await addAfterVisitSummaryHandler(message)

    const appointment = await appointmentSeed.findById(appointmentFixture.id)
    expect(appointment.afterVisitSummaryId).toBeFalsy()
  })

  test('should add after visit summary', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await addAfterVisitSummaryHandler(message)

    const appointment = await appointmentSeed.findById(appointmentFixture.id)
    expect(appointment.afterVisitSummaryId).toBeTruthy()
  })

  afterAll(async () => {
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
