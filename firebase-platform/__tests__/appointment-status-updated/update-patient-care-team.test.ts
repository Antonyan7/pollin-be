import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  appointmentFixture,
  createAppointmentStatusUpdatedFixtures,
  destroyAppointmentStatusUpdatedFixtures,
  patientFixture,
} from './seed'
import {updatePatientCareTeamHandler} from '@codebase/appointments/handlers/appointment-status-updated'
import {PatientToServiceProviderSeed} from '@seeds/typeorm'
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

describe('Firebase Function: update patient care team on appointment status change to Done', () => {
  let dataSource: DataSource

  let patientToServiceProviderSeed: PatientToServiceProviderSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    await createAppointmentStatusUpdatedFixtures(dataSource)
    patientToServiceProviderSeed = new PatientToServiceProviderSeed(dataSource)
  })

  test('should not update patient care team', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Cancelled},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await updatePatientCareTeamHandler(message)

    const patientToServiceProvider = await patientToServiceProviderSeed.findByPatientId(
      patientFixture.id,
    )
    expect(patientToServiceProvider.length).toBe(0)
  })

  test('should update patient care team', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await updatePatientCareTeamHandler(message)

    let patientToServiceProvider = await patientToServiceProviderSeed.findByPatientId(
      patientFixture.id,
    )
    expect(patientToServiceProvider.length).toBe(1)

    await updatePatientCareTeamHandler(message)

    patientToServiceProvider = await patientToServiceProviderSeed.findByPatientId(patientFixture.id)
    //still should just 1 relation but updated
    expect(patientToServiceProvider.length).toBe(1)
  })

  afterAll(async () => {
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
