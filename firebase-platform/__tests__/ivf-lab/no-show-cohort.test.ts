import {
  appointmentNoShowFixture,
  appointmentToNotCancelCohortDateFixture,
  createIVFLabSeeds,
  destroyIVFLabFixtures,
  ivfTaskDetailsNoShowFixture,
  ivfTaskGroupNoShowFixture,
  ivfTaskSummaryNoShowFixture,
  noShowId,
  patientForNoShowFixture,
  patientPlanCohortNoShowFixture,
} from './seeds'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {testPubSubEvent} from '@functions-types'
import {DataSource} from 'typeorm'
import {IvfTaskSummarySeed, PatientPlanCohortSeed, IvfTaskDetailsHistorySeed} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {removePlanCohortRelatedDataHandler} from '@firebase-platform/functions/appointments/src/handlers/ivf-cohort-date/no-show-cohort.handler'
import {PatientPlanCohortIvfTaskGroupSeed} from '@seeds/typeorm'
import {handlerUpdatedAppointmentStatusNoShow} from '@firebase-platform/functions/email-notification/src/appointment-updated-no-show/handler'
import {AppointmentUpdatedNoShowSchema} from '@libs/common/model/proto-schemas/appointment-updated-no-show.schema'
import {sendEmailToIVFLabTemplateFixture} from '../fixtures/email-template.fixture'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {IvfTaskDetailsSeed} from '@seeds/typeorm'
import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

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
jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../../libs/common/src/adapters/sendinblue.adapter.ts')

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

describe('Firebase Function Service: Create history for details, update cohort and remove details', () => {
  let dataSource: DataSource

  let patientPlanCohortSeed: PatientPlanCohortSeed
  let ivfTaskSummarySeed: IvfTaskSummarySeed
  let ivfTaskGroupSeed: PatientPlanCohortIvfTaskGroupSeed
  let ivfTaskDetailsSeed: IvfTaskDetailsSeed
  let detailsHistorySeed: IvfTaskDetailsHistorySeed
  let emailTemplateSeed: EmailTemplateSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createIVFLabSeeds(dataSource)

    patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
    ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
    ivfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(dataSource)
    detailsHistorySeed = new IvfTaskDetailsHistorySeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)
    ivfTaskDetailsSeed = new IvfTaskDetailsSeed(dataSource)

    await emailTemplateSeed.createArray([sendEmailToIVFLabTemplateFixture])
  })

  it('Should not do any process- Appointment not found', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: 100000,
          oldAppointment: {status: AppointmentStatus.NoShow},
          newAppointment: {status: AppointmentStatus.NoShow},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await removePlanCohortRelatedDataHandler(message)
  })

  it('Should fail, patient not found: Fail', async () => {
    const emailMessage = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentNoShowFixture.id,
          oldAppointment: {status: AppointmentStatus.NoShow},
          newAppointment: {status: AppointmentStatus.NoShow},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
          authUserId: 'not_found',
        },
        AppointmentUpdatedNoShowSchema,
      ),
    )

    await handlerUpdatedAppointmentStatusNoShow(emailMessage)
  })

  it('Should fail, appointment not found: Fail', async () => {
    const emailMessage = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: 1111111,
          authUserId: patientForNoShowFixture.authUserId,
          oldAppointment: {status: AppointmentStatus.NoShow},
          newAppointment: {status: AppointmentStatus.NoShow},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedNoShowSchema,
      ),
    )

    await handlerUpdatedAppointmentStatusNoShow(emailMessage)
  })

  it('Should not create detail history and remove cohort related data if new status is not no-show: Success', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyEmailAdapterProvider = jest.spyOn(
      EmailAdapterProvider.prototype,
      'fetchActiveProviders',
    )
    spyEmailAdapterProvider.mockResolvedValue([
      {
        id: 'sendinblue',
        name: 'sendinblue',
        active: true,
        disabled: false,
        createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedBy: 'TEST',
      },
    ])

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentNoShowFixture.id,
          oldAppointment: {status: AppointmentStatus.NoShow},
          newAppointment: {status: AppointmentStatus.Done},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await removePlanCohortRelatedDataHandler(message)
    const [cohort, group, detail, summary, history] = await Promise.all([
      patientPlanCohortSeed.findById(patientPlanCohortNoShowFixture.id),
      ivfTaskGroupSeed.findOneById(ivfTaskGroupNoShowFixture.id),
      ivfTaskDetailsSeed.getOneById(ivfTaskDetailsNoShowFixture.id),
      ivfTaskSummarySeed.findOneById(ivfTaskSummaryNoShowFixture.id),
      detailsHistorySeed.findByCohortId(patientPlanCohortNoShowFixture.id),
    ])

    expect(cohort.cohortDate).not.toBe(null)
    expect(group).not.toBe(null)
    expect(detail).not.toBe(null)
    expect(summary).not.toBe(null)
    expect(history).toBeFalsy()

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('Should create detail history and remove cohort related data if new status is no-show: Success', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyEmailAdapterProvider = jest.spyOn(
      EmailAdapterProvider.prototype,
      'fetchActiveProviders',
    )
    spyEmailAdapterProvider.mockResolvedValue([
      {
        id: 'sendinblue',
        name: 'sendinblue',
        active: true,
        disabled: false,
        createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedBy: 'TEST',
      },
    ])

    const historyBefore = await detailsHistorySeed.findByCohortId(patientPlanCohortNoShowFixture.id)
    const detailsBefore = await ivfTaskDetailsSeed.getOneById(ivfTaskDetailsNoShowFixture.id)

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentNoShowFixture.id,
          oldAppointment: {status: AppointmentStatus.Done},
          newAppointment: {status: AppointmentStatus.NoShow},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await removePlanCohortRelatedDataHandler(message)
    const [cohort, group, detail, summary, history] = await Promise.all([
      patientPlanCohortSeed.findById(patientPlanCohortNoShowFixture.id),
      ivfTaskGroupSeed.findOneById(ivfTaskGroupNoShowFixture.id),
      ivfTaskDetailsSeed.getOneById(ivfTaskDetailsNoShowFixture.id),
      ivfTaskSummarySeed.findOneById(ivfTaskSummaryNoShowFixture.id),
      detailsHistorySeed.findByCohortId(patientPlanCohortNoShowFixture.id),
    ])

    expect(historyBefore).toBe(null)
    expect(cohort.cohortDate).toBe(null)
    expect(group).toBe(null)
    expect(detail).toBe(null)
    expect(summary).toBe(null)
    expect(history).toBeTruthy()
    expect(detailsBefore.day3EmbryosArrested).toBe(noShowId)
    expect(detailsBefore.spermWashInitialConcentration).toBe(noShowId)
    expect(history.day3EmbryosArrested).toBe(noShowId)
    expect(history.spermWashInitialConcentration).toBe(noShowId)

    const emailMessage = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentNoShowFixture.id,
          authUserId: patientForNoShowFixture.authUserId,
        },
        AppointmentUpdatedNoShowSchema,
      ),
    )

    await handlerUpdatedAppointmentStatusNoShow(emailMessage)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    spyOnEmailSending.mockClear()
  })

  it('Should send an email with the correct subject format for status no show', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const emailMessage = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentToNotCancelCohortDateFixture.id,
        },
        AppointmentUpdatedNoShowSchema,
      ),
    )

    await handlerUpdatedAppointmentStatusNoShow(emailMessage)
    const emailPayload = spyOnEmailSending.mock.calls[0][0]
    expect(emailPayload.subject).toContain(`Nestproject Appointment Marked as No-Show: TEST_NAME, `)
  })
  afterAll(async () => {
    jest.clearAllMocks()
    await destroyIVFLabFixtures(dataSource)
    await emailTemplateSeed.deleteByIds([sendEmailToIVFLabTemplateFixture.id])
  })
})
