import {AppointmentStatus} from '@libs/common/enums'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  destroyAppointmentStatusUpdatedFixtures,
  appointmentOHIPCoveredId,
  appointmentOHIPCoveredFixture,
} from './seed'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  appointmentHistoryHandler,
  appointmentHistoryAppointmentCreateHandler,
} from '@firebase-platform/functions/appointments/src/handlers/appointment-status-updated'

import {HistoryUserType} from '@libs/common/enums'
import {AppointmentHistorySeed} from '@seeds/firestore/appointment-history.seed'
import {AppointmentUpdatedPubSubPayload} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {PatientPlanHistoryComponent} from '@libs/data-layer/apps/plan/entities/fireorm'

import {
  AppointmentsCreatedPubSubPayload,
  AppointmentsCreatedSchema,
} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {DefaultValue} from '@libs/common/enums'
import {getAppointmentStatusTitle} from '@libs/services-common/enums'

const payload: Partial<AppointmentUpdatedPubSubPayload> = {
  authUserId: 'appointment-history',
  appointmentId: appointmentFixture.id,
  oldAppointment: {status: AppointmentStatus.Booked},
  newAppointment: {status: AppointmentStatus.InProgress},
  authUserFullName: 'fullName',
  authUserType: HistoryUserType.ClinicUser,
}

const payloadWithSameStatus: Partial<AppointmentUpdatedPubSubPayload> = {
  authUserId: 'appointment-history',
  appointmentId: appointmentOHIPCoveredFixture.id,
  oldAppointment: {status: AppointmentStatus.Done},
  newAppointment: {status: AppointmentStatus.Done},
  authUserFullName: 'fullName',
  authUserType: HistoryUserType.ClinicUser,
}

const payloadAppointmentCreated: Partial<AppointmentsCreatedPubSubPayload> = {
  authUserId: 'appointment-history-created',
  appointmentIds: [appointmentOHIPCoveredId],
  authUserFullName: 'fullName',
  authUserType: HistoryUserType.ClinicUser,
}

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

describe('Firebase Function: Appointment History', () => {
  let dataSource: DataSource

  let appointmentHistorySeed: AppointmentHistorySeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)

    appointmentHistorySeed = new AppointmentHistorySeed()
  })

  test('should create appointment history when update appointment status', async () => {
    const message = testPubSubEvent(encodePubSubMessage(payload, AppointmentUpdatedSchema))

    await appointmentHistoryHandler(message)

    const history = await appointmentHistorySeed.findByAppointmentId(payload.appointmentId)
    expect(history.length).toBeTruthy()
    const change = history[0].changes
    expect(change).toMatchObject(
      expect.arrayContaining([
        {
          propertyName: PatientPlanHistoryComponent.Status,
          from: getAppointmentStatusTitle.get(payload.oldAppointment.status),
          to: getAppointmentStatusTitle.get(payload.newAppointment.status),
        },
      ]),
    )
  })

  test('should not create appointment history - same status', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(payloadWithSameStatus, AppointmentUpdatedSchema),
    )

    await appointmentHistoryHandler(message)

    const history = await appointmentHistorySeed.findByAppointmentId(
      payloadWithSameStatus.appointmentId,
    )
    expect(history?.length).toBeFalsy()
  })

  test('should create appointment history when create appointment', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(payloadAppointmentCreated, AppointmentsCreatedSchema),
    )

    await appointmentHistoryAppointmentCreateHandler(message)

    const history = await appointmentHistorySeed.findByAppointmentId(appointmentOHIPCoveredId)
    expect(history.length).toBeTruthy()
    const change = history[0].changes
    expect(change).toMatchObject(
      expect.arrayContaining([
        {
          propertyName: PatientPlanHistoryComponent.Status,
          from: DefaultValue.Dash,
          to: AppointmentStatus.Done,
        },
      ]),
    )
  })

  afterAll(async () => {
    await appointmentHistorySeed.deleteByAuthUserId(payload.authUserId)
    await appointmentHistorySeed.deleteByAuthUserId(payloadAppointmentCreated.authUserId)
    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
