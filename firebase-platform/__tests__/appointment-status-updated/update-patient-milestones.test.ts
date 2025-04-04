import {
  PatientMilestoneSeed,
  PatientDefaultMilestoneSeed,
  TestOrderActionSeed,
} from '@seeds/typeorm'
import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {AppointmentSeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  patientMilestoneFixture,
  destroyAppointmentStatusUpdatedFixtures,
  patientFixture,
  serviceCategoryFixture,
} from './seed'
import {updatePatientMilestonesHandler} from '@codebase/appointments/handlers/appointment-status-updated'
import {
  DefaultMilestoneUserType,
  PatientMilestoneType,
} from '@libs/services-common/enums/milestone.enum'
import {MilestoneStep} from '@libs/services-common/enums/journey-enum'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'

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
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.setTimeout(10000)

describe('Firebase Function: update patient milestones', () => {
  let dataSource: DataSource

  let patientMilestoneSeed: PatientMilestoneSeed
  let patientDefaultMilestoneSeed: PatientDefaultMilestoneSeed
  let appointmentSeed: AppointmentSeed
  let testOrderActionSeed: TestOrderActionSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)

    patientDefaultMilestoneSeed = new PatientDefaultMilestoneSeed(dataSource)
    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    testOrderActionSeed = new TestOrderActionSeed(dataSource)

    await patientDefaultMilestoneSeed.create({
      isDisabled: false,
      serviceCategoryId: serviceCategoryFixture.id,
      type: PatientMilestoneType.ServiceCategory,
      userType: DefaultMilestoneUserType.User,
    })
  })

  test('should not remove patient milestone', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await updatePatientMilestonesHandler(message)

    const patientMilestone = await patientMilestoneSeed.findById(patientMilestoneFixture.id)
    expect(patientMilestone).toBeTruthy()
  })

  test('should just remove patient milestone', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.NoShow},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await updatePatientMilestonesHandler(message)

    const patientMilestones = await patientMilestoneSeed.findPatientMilestones(patientFixture.id)
    const orderActions = await testOrderActionSeed.repository.find({
      where: {testOrderId: appointmentFixture.testOrderId},
    })
    expect(patientMilestones.length).toBe(0)
    expect(orderActions.length).toBe(0)
  })

  test('should remove patient milestone and push default milestones', async () => {
    await appointmentSeed.updateMilestoneStepById(
      appointmentFixture.id,
      MilestoneStep.InitialConsultation,
    )
    await patientMilestoneSeed.create(patientMilestoneFixture)

    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.NoShow},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await updatePatientMilestonesHandler(message)

    const patientMilestones = await patientMilestoneSeed.findPatientMilestones(patientFixture.id)
    expect(patientMilestones.length).toBe(1)

    expect(patientMilestones[0].serviceCategoryId).toBe(serviceCategoryFixture.id)
  })

  afterAll(async () => {
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
  })
})
