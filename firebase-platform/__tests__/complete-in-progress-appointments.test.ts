import {completeInProgressAppointmentsHandler} from '@codebase/appointments/handlers/complete-in-progress-appointments'
import {
  AppointmentSeed,
  PatientSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {
  appointmentsForCompleteInProgressAppointmentsFixtures,
  appointmentWithoutWorkflowId,
  arrivedAppointmentStatus,
  followUpServiceTypeFixture,
  inProgressAppointmentStatusId,
  notInProgressAppointmentsForCompleteInProgressAppointmentsFixtures,
  patientFixtureForCompleteInProgressAppointmentsFixture,
  secondInProgressAppointmentStatusId,
  serviceProviderForCompleteInProgressAppointmentsFixture,
  serviceTypeForAppointmentUpdatesFixture,
  serviceTypeForCompleteInProgressAppointmentsFixture,
  serviceWithoutWorkflowAppointmentsFixture,
  superTypeForCompleteInProgressAppointmentsFixture,
  superTypeWithoutWorkflowAppointmentsFixture,
} from './fixtures/appointments/complete-in-progress-appointments.fixture'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'

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
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')

let patientSeed: PatientSeed
let appointmentSeed: AppointmentSeed
let serviceProviderSeed: ServiceProviderSeed
let superTypeSeed: SuperTypeSeed
let serviceTypeSeed: ServiceTypeSeed

describe('Firebase Function: appointment-created', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    appointmentSeed = new AppointmentSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)

    await patientSeed.create(patientFixtureForCompleteInProgressAppointmentsFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await superTypeSeed.create(superTypeForCompleteInProgressAppointmentsFixture)
    await superTypeSeed.create(superTypeWithoutWorkflowAppointmentsFixture)
    await serviceTypeSeed.create(serviceTypeForAppointmentUpdatesFixture)
    await serviceTypeSeed.create(followUpServiceTypeFixture)
    await serviceTypeSeed.create(serviceTypeForCompleteInProgressAppointmentsFixture)
    await serviceTypeSeed.create(serviceWithoutWorkflowAppointmentsFixture)
    await serviceProviderSeed.create(serviceProviderForCompleteInProgressAppointmentsFixture)

    // default appointments, will be removed after first test case
    await appointmentSeed.createArray(appointmentsForCompleteInProgressAppointmentsFixtures)
  })

  test('Should update InProgress appointments to Done', async () => {
    const publishSpy = jest.spyOn(PubSubHelpers, 'publishAppointmentUpdated')

    await completeInProgressAppointmentsHandler()

    const appointments = await appointmentSeed.findByUuids([
      arrivedAppointmentStatus,
      inProgressAppointmentStatusId,
      secondInProgressAppointmentStatusId,
      appointmentWithoutWorkflowId,
    ])

    const updatedAppointment = appointments.find(
      (appointment) => inProgressAppointmentStatusId === appointment.uuid,
    )

    const otherInProgress = appointments.find(
      (appointment) => secondInProgressAppointmentStatusId === appointment.uuid,
    )

    const arrivedAppointment = appointments.find(
      (appointment) => arrivedAppointmentStatus === appointment.uuid,
    )

    const withoutWorkflow = appointments.find(
      (appointment) => appointment.uuid === appointmentWithoutWorkflowId,
    )

    expect(arrivedAppointment.status).toBe(AppointmentStatus.CheckedIn)
    expect(updatedAppointment.status).toBe(AppointmentStatus.Done)
    expect(otherInProgress.status).toBe(AppointmentStatus.Done)
    expect(withoutWorkflow.status).toBe(AppointmentStatus.Done)

    expect(publishSpy).toHaveBeenCalledTimes(3)

    await appointmentSeed.removeByIds(
      appointmentsForCompleteInProgressAppointmentsFixtures.map((item) => item.id),
    )

    publishSpy.mockClear()
  })

  test('Should not update appointments to Done - there are no InProgress appointments', async () => {
    // appointments to add after first test case, it's removing after this test ends
    await appointmentSeed.createArray(
      notInProgressAppointmentsForCompleteInProgressAppointmentsFixtures,
    )

    const publishSpy = jest.spyOn(PubSubHelpers, 'publishAppointmentUpdated')

    await completeInProgressAppointmentsHandler()

    expect(publishSpy).toHaveBeenCalledTimes(0)

    await appointmentSeed.removeByIds(
      notInProgressAppointmentsForCompleteInProgressAppointmentsFixtures.map((item) => item.id),
    )
  })

  afterAll(async () => {
    jest.clearAllMocks()

    /**
     * Removing of appointments is after each test case
     * */
    await serviceProviderSeed.removeById(serviceProviderForCompleteInProgressAppointmentsFixture.id)
    await serviceTypeSeed.removeById(serviceTypeForCompleteInProgressAppointmentsFixture.id)
    await serviceTypeSeed.removeByIds([
      serviceTypeForAppointmentUpdatesFixture.id,
      serviceWithoutWorkflowAppointmentsFixture.id,
      followUpServiceTypeFixture.id,
    ])
    await superTypeSeed.removeByIds([superTypeForCompleteInProgressAppointmentsFixture.id])
    await superTypeSeed.removeByIds([superTypeWithoutWorkflowAppointmentsFixture.id])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await patientSeed.removePatientByAuthUserId(
      patientFixtureForCompleteInProgressAppointmentsFixture.authUserId,
    )

    await dataSource.destroy()
  })
})
