import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {
  appointmentToUpdateCohortDateFixture,
  createIVFLabSeeds,
  destroyIVFLabFixtures,
  patientPlanForIVFFixture,
} from './seeds'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {testPubSubEvent} from '@functions-types'
import {PatientPlanSeed, PatientPlanChangeNotificationSeed} from '@seeds/typeorm'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {setCohortDateOnAppointmentRescheduleHandler} from '@firebase-platform/functions/appointments/src/handlers/ivf-cohort-date/update-cohort-date.handler'
import {HistoryUserType} from '@libs/common/enums'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

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

describe('Firebase Function Service: Set cohort date', () => {
  let dataSource: DataSource

  let patientPlanChangeNotificationSeed: PatientPlanChangeNotificationSeed
  let patientPlanSeed: PatientPlanSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createIVFLabSeeds(dataSource)

    patientPlanChangeNotificationSeed = new PatientPlanChangeNotificationSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)
  })

  it('should add start notification change by appointment-rescheduled event', async () => {
    await patientPlanSeed.updateStatus(patientPlanForIVFFixture.id, PlanStatusEnum.Active)

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentToUpdateCohortDateFixture.id,
          oldAppointment: {date: '2020-10-31T01:20:00Z'},
          newAppointment: {date: '2020-11-31T01:20:00Z'},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await setCohortDateOnAppointmentRescheduleHandler(message)

    const patientPlanChangeNotification = await patientPlanChangeNotificationSeed.findByPlanId(
      patientPlanForIVFFixture.id,
    )

    expect(patientPlanChangeNotification[0].dataChange[0].propertyName).toBe('Start Date')
    expect(patientPlanChangeNotification[0].dataChange[0].fromValue).toBeTruthy()
    expect(patientPlanChangeNotification[0].dataChange[0].toValue).toBeTruthy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await destroyIVFLabFixtures(dataSource)
  })
})
