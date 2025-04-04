import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  destroyAppointmentStatusUpdatedFixtures,
  appointmentOHIPCoveredFixture,
  patientPlanStatusFixture,
  patientClaimFixture,
} from './seed'
import {createOHIPClaimHandler} from '@codebase/appointments/handlers/appointment-status-updated'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {OhipClaimSeed} from '@seeds/typeorm'
import {mdBillingServiceCodeFixture} from '@libs/common/test/fixtures/mdbilling-service-code.fixture'

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

describe('Handler: createOHIPClaimHandler', () => {
  let dataSource: DataSource
  let ohipClaimSeed: OhipClaimSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)
    ohipClaimSeed = new OhipClaimSeed(dataSource)
  })

  test('should not create claim if appointment is not Done', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Cancelled},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    const result = await createOHIPClaimHandler(message)
    expect(result).toBeFalsy()
  })

  test('should not create claim if appointment is not covered by OHIP', async () => {
    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    const result = await createOHIPClaimHandler(message)
    expect(result).toBeFalsy()
  })

  test('should create claim if appointment is Done & patient has OHIP', async () => {
    const data = {
      appointmentId: appointmentOHIPCoveredFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Done},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    const ohipClaimId = await createOHIPClaimHandler(message)
    expect(ohipClaimId).toBeTruthy()

    const ohipClaim = await ohipClaimSeed.getById(ohipClaimId)

    expect(ohipClaim).toBeTruthy()

    expect(patientClaimFixture.ohipCardNumber).toBeTruthy()

    // length should be 4, two for serviceType, second one for testType and third one for testPanel
    expect(ohipClaim.ohipClaimToCodes.length).toBe(4)

    ohipClaim.ohipClaimToCodes.forEach((code) => {
      expect(code.mdBillingDiagnosticCode).toBe(mdBillingServiceCodeFixture.defaultDiagnosticCodeId)
    })

    expect(ohipClaim.dayOneOfCycleSnapshot).toBeTruthy()
    expect(ohipClaim.patientStatusSnapshot).toBe(patientPlanStatusFixture.patientStatusAbbreviation)

    const duplicateClaimId = await createOHIPClaimHandler(message)
    expect(duplicateClaimId).toBeNull()
  })

  afterAll(async () => {
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
