import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {
  appointmentToCancelCohortDateFixture,
  appointmentToNotCancelCohortDateFixture,
  appointmentToSetCohortDateFertilizationFixture,
  appointmentToSetCohortDateFixture,
  appointmentToUpdateCohortDateFixture,
  createIVFLabSeeds,
  destroyIVFLabFixtures,
  ivfTaskSummaryFixture,
  ivfTaskToDayFixture,
  ivfTaskToPlanTypeCaIonophoreFixture,
  ivfTaskToPlanTypeIcsiInjectionFixture,
  patientPlanCohortToCancelFixture,
  patientPlanCohortToNotCancelFixture,
  patientPlanDetailForIVFFixture,
  patientPlanDetailForIVFICSIFixture,
  patientPlanForIVFFixture,
  patientPlanForICSIFixture,
  ivfTaskToPlanTypeISCIFixture,
  ivfTaskToDayIcsiInjectionFixture,
  appointmentToSetCohortDateWithPlanInstructionFixture,
  patientPlanWithPlanInstructionStartFixture,
  appointmentToSetCohortDateDay5,
  patientPlanForDay5StartFixture,
  ivfTaskToPlanTypeDishInventoryFixture,
  ivfTaskToPlanTypeInjectionAssignmentPlanInstructionFixture,
  ivfDishFixture,
} from './seeds'
import {setCohortDateOnAppointmentsCreatedHandler} from '@firebase-platform/functions/appointments/src/handlers/ivf-cohort-date/set-cohort-date.handler'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {testPubSubEvent} from '@functions-types'
import {
  AppointmentSeed,
  IvfTaskSummarySeed,
  PatientPlanCohortSeed,
  PatientPlanDetailSeed,
  PatientPlanSeed,
  PatientPlanCohortIvfDishSeed,
} from '@seeds/typeorm'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {PatientPlanCohort} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {appointmentFixture} from '../util'
import {setCohortDateOnAppointmentRescheduleHandler} from '@firebase-platform/functions/appointments/src/handlers/ivf-cohort-date/update-cohort-date.handler'
import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {removePatientPlanCohortOnAppointmentStatusUpdateHandler} from '@firebase-platform/functions/appointments/src/handlers/ivf-cohort-date/cancel-cohort'
import {IvfLabCohortDateService} from '@libs/common/services/ivf-lab/ivf-lab-cohort-date.service'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PlanAddonType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientPlanAddonSeed} from '@seeds/typeorm/patient-plan-addon.seed'

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)
jest.setTimeout(15000)
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
jest.mock('@libs/common/adapters/pubsub.adapter')

const spyOnPublishCohortStartDateChange = jest.spyOn(
  IvfLabCohortDateService.prototype,
  'publishCohortDateUpdated',
)
describe('Firebase Function Service: Set cohort date', () => {
  let dataSource: DataSource

  let patientPlanCohortSeed: PatientPlanCohortSeed
  let patientPlanSeed: PatientPlanSeed
  let patientPlanDetailSeed: PatientPlanDetailSeed
  let ivfTaskSummarySeed: IvfTaskSummarySeed
  let appointmentSeed: AppointmentSeed
  let patientPlanCohortIvfDishSeed: PatientPlanCohortIvfDishSeed
  let patientPlanAddonSeed: PatientPlanAddonSeed

  let createdPatientPlanCohortId: number

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createIVFLabSeeds(dataSource)

    patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)
    ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    patientPlanDetailSeed = new PatientPlanDetailSeed(dataSource)
    patientPlanCohortIvfDishSeed = new PatientPlanCohortIvfDishSeed(dataSource)
    patientPlanAddonSeed = new PatientPlanAddonSeed(dataSource)
  })

  it('should not set cohort date by appointment created event - appointment service type doesnt have relation to ivf', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage({appointmentIds: [appointmentFixture.id]}, AppointmentsCreatedSchema),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )
    expect(patientPlanCohort).toBeNull()
  })

  it('should not set cohort date by appointment created event - plan is not active', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateFixture.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )
    expect(patientPlanCohort).toBeNull()
  })

  it('should not update cohort date by appointment-rescheduled event - wrong appointment', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage({appointmentId: appointmentFixture.id}, AppointmentUpdatedSchema),
    )

    await setCohortDateOnAppointmentRescheduleHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )
    expect(patientPlanCohort).toBeNull()
  })

  it('should not update cohort date by appointment created event - plan is not active', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentId: appointmentToUpdateCohortDateFixture.id},
        AppointmentUpdatedSchema,
      ),
    )

    await setCohortDateOnAppointmentRescheduleHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )
    expect(patientPlanCohort).toBeNull()
  })

  it('should set cohort date by appointment created event', async () => {
    await patientPlanSeed.updateStatus(patientPlanForIVFFixture.id, PlanStatusEnum.Active)

    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateFixture.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    expect(spyOnPublishCohortStartDateChange).toBeCalled()

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )
    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanForIVFFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(appointmentToSetCohortDateFixture.start),
        patientPlanCohortIvfTaskDetails: expect.objectContaining({
          patientPlanCohortId: patientPlanCohort.id,
        }),
      }),
    )
    expect(patientPlanCohort.ivfTaskGroups.find((ivfDay) => ivfDay.day === 1)).toMatchObject({
      ivfTaskSummaries: expect.arrayContaining([
        expect.objectContaining({IVFTaskToDayId: ivfTaskToPlanTypeCaIonophoreFixture.id}),
      ]),
    })

    expect(patientPlanCohort.ivfTaskGroups.find((ivfDay) => ivfDay.day === 0)).toMatchObject({
      ivfTaskSummaries: expect.arrayContaining([
        expect.objectContaining({IVFTaskToDayId: ivfTaskToPlanTypeIcsiInjectionFixture.id}),
      ]),
    })

    expect(patientPlanCohort.activePeriodStart).toBeTruthy()
    expect(patientPlanCohort.activePeriodEnd).toBeTruthy()

    createdPatientPlanCohortId = patientPlanCohort.id
  })
  it('should set cohort date by appointment created event for not visible Injection Assignment', async () => {
    await patientPlanSeed.updateStatus(patientPlanForICSIFixture.id, PlanStatusEnum.Active)

    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateFixture.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    expect(spyOnPublishCohortStartDateChange).toBeCalled()

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForICSIFixture.id,
    )
    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanForICSIFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(appointmentToSetCohortDateFixture.start),
        patientPlanCohortIvfTaskDetails: expect.objectContaining({
          patientPlanCohortId: patientPlanCohort.id,
        }),
      }),
    )
    expect(patientPlanCohort.ivfTaskGroups.find((ivfDay) => ivfDay.day === 0)).toMatchObject({
      ivfTaskSummaries: expect.not.arrayContaining([
        expect.objectContaining({
          IVFTaskToDayId: ivfTaskToPlanTypeInjectionAssignmentPlanInstructionFixture.id,
        }),
      ]),
    })
    expect(patientPlanCohort.ivfTaskGroups.find((ivfDay) => ivfDay.day === 0)).toMatchObject({
      ivfTaskSummaries: expect.arrayContaining([
        expect.objectContaining({
          IVFTaskToDayId: ivfTaskToPlanTypeIcsiInjectionFixture.id,
        }),
      ]),
    })

    expect(patientPlanCohort.activePeriodStart).toBeTruthy()
    expect(patientPlanCohort.activePeriodEnd).toBeTruthy()

    createdPatientPlanCohortId = patientPlanCohort.id
  })

  it('should set cohort date by appointment created event for dish inventory', async () => {
    await patientPlanSeed.updateStatus(patientPlanForICSIFixture.id, PlanStatusEnum.Active)

    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateFixture.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    expect(spyOnPublishCohortStartDateChange).toBeCalled()

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForICSIFixture.id,
    )
    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanForICSIFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(appointmentToSetCohortDateFixture.start),
        patientPlanCohortIvfTaskDetails: expect.objectContaining({
          patientPlanCohortId: patientPlanCohort.id,
        }),
      }),
    )

    expect(patientPlanCohort.ivfTaskGroups.find((ivfDay) => ivfDay.day === 0)).toMatchObject({
      ivfTaskSummaries: expect.arrayContaining([
        expect.objectContaining({
          IVFTaskToDayId: ivfTaskToPlanTypeDishInventoryFixture.id,
        }),
      ]),
    })
    const patientPlanCohortIvfDish = await patientPlanCohortIvfDishSeed.findByPatientPlanCohortId(
      patientPlanCohort.id,
    )
    const ivfDish = patientPlanCohortIvfDish.find((dish) => dish.ivfDishId === ivfDishFixture.id)
    expect(ivfDish).toBeTruthy()

    const cohort = await patientPlanCohortSeed.findCohortWithTaskGroupsAndDishRelation(
      patientPlanCohort.id,
    )

    const filteredTaskGroups = cohort.ivfTaskGroups.filter(
      (taskGroup) => taskGroup.ivfDishToIvfTaskGroups?.length > 0,
    )

    expect(filteredTaskGroups[0].ivfDishToIvfTaskGroups[0].required).toBe(true)
    const isDishExists = filteredTaskGroups.find((taskGroup) =>
      taskGroup.ivfDishToIvfTaskGroups.some(
        (ivfDishGroup) => ivfDishGroup.ivfDishId === ivfDishFixture.id,
      ),
    )
    expect(isDishExists).toBeTruthy()

    expect(patientPlanCohort.activePeriodStart).toBeTruthy()
    expect(patientPlanCohort.activePeriodEnd).toBeTruthy()
  })

  it('should update cohort date by appointment-rescheduled event', async () => {
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

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )
    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanForIVFFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(appointmentToUpdateCohortDateFixture.start),
        patientPlanCohortIvfTaskDetails: expect.objectContaining({
          patientPlanCohortId: patientPlanCohort.id,
        }),
      }),
    )
    const ivfGroup = patientPlanCohort.ivfTaskGroups.find(
      (group) =>
        group.date ===
        dateTimeUtil.formatTzDate(
          dateTimeUtil.addDays(appointmentToUpdateCohortDateFixture.start, ivfTaskToDayFixture.day),
        ),
    )

    expect(ivfGroup).toBeTruthy()

    if (createdPatientPlanCohortId) {
      expect(createdPatientPlanCohortId !== patientPlanCohort.id)
    }
  })

  it('should not update cohort date by appointment-rescheduled event - appointment is not latest created one', async () => {
    await patientPlanSeed.updateStatus(patientPlanForIVFFixture.id, PlanStatusEnum.Active)

    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentId: appointmentToSetCohortDateFixture.id},
        AppointmentUpdatedSchema,
      ),
    )

    await setCohortDateOnAppointmentRescheduleHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )
    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>({
      patientPlanId: patientPlanForIVFFixture.id,
      cohortDate: dateTimeUtil.formatTzDate(appointmentToUpdateCohortDateFixture.start),
      patientPlanCohortIvfTaskDetails: expect.objectContaining({
        patientPlanCohortId: patientPlanCohort.id,
      }),
    })
  })

  it('should not cancel cohort date - cohort has signed task', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentToCancelCohortDateFixture.id,
          oldAppointment: {status: AppointmentStatus.InProgress},
          newAppointment: {status: AppointmentStatus.Cancelled},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await removePatientPlanCohortOnAppointmentStatusUpdateHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findById(
      patientPlanCohortToCancelFixture.id,
    )
    expect(patientPlanCohort).toBeTruthy()
  })

  it('should not cancel cohort date - task details were saved', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentToNotCancelCohortDateFixture.id,
          oldAppointment: {status: AppointmentStatus.InProgress},
          newAppointment: {status: AppointmentStatus.Cancelled},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await removePatientPlanCohortOnAppointmentStatusUpdateHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findById(
      patientPlanCohortToNotCancelFixture.id,
    )
    expect(patientPlanCohort).toBeTruthy()
  })

  it('should not cancel cohort date - appointment is not Cancelled', async () => {
    await ivfTaskSummarySeed.removeById(ivfTaskSummaryFixture.id)
    await appointmentSeed.updateStatusById(
      appointmentToCancelCohortDateFixture.id,
      AppointmentStatus.Done,
    )

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentToCancelCohortDateFixture.id,
          oldAppointment: {status: AppointmentStatus.InProgress},
          newAppointment: {status: AppointmentStatus.Cancelled},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await removePatientPlanCohortOnAppointmentStatusUpdateHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findById(
      patientPlanCohortToCancelFixture.id,
    )
    expect(patientPlanCohort).toBeTruthy()
  })

  it('should cancel cohort date - success', async () => {
    await ivfTaskSummarySeed.removeById(ivfTaskSummaryFixture.id)
    await appointmentSeed.updateStatusById(
      appointmentToCancelCohortDateFixture.id,
      AppointmentStatus.Cancelled,
    )

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          appointmentId: appointmentToCancelCohortDateFixture.id,
          oldAppointment: {status: AppointmentStatus.InProgress},
          newAppointment: {status: AppointmentStatus.Cancelled},
          authUserFullName: 'fullName',
          authUserType: HistoryUserType.ClinicUser,
        },
        AppointmentUpdatedSchema,
      ),
    )

    await removePatientPlanCohortOnAppointmentStatusUpdateHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findById(
      patientPlanCohortToCancelFixture.id,
    )
    expect(patientPlanCohort).toBeNull()
  })

  it('should set cohort date by appointment created event without all optional tasks', async () => {
    await Promise.all([
      patientPlanCohortSeed.removeByPlanIds([patientPlanForIVFFixture.id]),
      patientPlanDetailSeed.updateById(patientPlanDetailForIVFFixture.id, {
        freshEmbryoTransferNumber: null,
      }),
      patientPlanAddonSeed.deleteByPatientPlanIdAndType(
        patientPlanForIVFFixture.id,
        PlanAddonType.FertilizationDirective,
      ),
    ])

    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateFixture.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForIVFFixture.id,
    )

    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanForIVFFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(appointmentToSetCohortDateFixture.start),
        patientPlanCohortIvfTaskDetails: expect.objectContaining({
          patientPlanCohortId: patientPlanCohort.id,
        }),
      }),
    )

    expect(
      patientPlanCohort.ivfTaskGroups[0].ivfTaskSummaries.find(
        (summary) => summary.IVFTaskToDayId === ivfTaskToPlanTypeCaIonophoreFixture.id,
      ),
    ).toBeFalsy()
  })

  it('should set cohort date by appointment created event without all optional tasks isci', async () => {
    await Promise.all([
      patientPlanCohortSeed.removeByPlanIds([patientPlanForICSIFixture.id]),
      patientPlanDetailSeed.updateById(patientPlanDetailForIVFICSIFixture.id, {
        freshEmbryoTransferNumber: null,
      }),
      patientPlanAddonSeed.deleteByPatientPlanIdAndType(
        patientPlanForICSIFixture.id,
        PlanAddonType.FertilizationDirective,
      ),
    ])
    await patientPlanSeed.updateStatus(patientPlanForIVFFixture.id, PlanStatusEnum.Cancelled)

    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateFertilizationFixture.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForICSIFixture.id,
    )
    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanForICSIFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(appointmentToSetCohortDateFertilizationFixture.start),
        patientPlanCohortIvfTaskDetails: expect.objectContaining({
          patientPlanCohortId: patientPlanCohort.id,
        }),
      }),
    )

    expect(
      patientPlanCohort.ivfTaskGroups[1].ivfTaskSummaries.find(
        (summary) =>
          summary.IVFTaskToDayId === ivfTaskToDayIcsiInjectionFixture.id &&
          summary.disabledAt !== null,
      ),
    ).toBeTruthy()
    expect(
      patientPlanCohort.ivfTaskGroups[2].ivfTaskSummaries.find(
        (summary) =>
          summary.IVFTaskToDayId === ivfTaskToPlanTypeISCIFixture.id && summary.disabledAt !== null,
      ),
    ).toBeTruthy()
  })

  it('should set cohort date by appointment created with respecting day 5 start', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateWithPlanInstructionFixture.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanWithPlanInstructionStartFixture.id,
    )

    expect(patientPlanCohort.ivfTaskGroups[0].ivfTaskSummaries.length).toBe(0)
    expect(patientPlanCohort.ivfTaskGroups[1].ivfTaskSummaries.length).toBe(1)
    expect(patientPlanCohort.ivfTaskGroups[2].ivfTaskSummaries.length).toBe(1)

    expect(patientPlanCohort.ivfTaskGroups[1].ivfTaskSummaries[0].disabledAt).toBeTruthy()
    expect(patientPlanCohort.ivfTaskGroups[2].ivfTaskSummaries[0].disabledAt).toBeFalsy()

    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanWithPlanInstructionStartFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(
          dateTimeUtil.addDays(dateTimeUtil.toDate(dateTimeUtil.now()), 3),
        ),
      }),
    )
  })

  it('should set cohort date by appointment created with respecting day 5 start', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {appointmentIds: [appointmentToSetCohortDateDay5.id]},
        AppointmentsCreatedSchema,
      ),
    )

    await setCohortDateOnAppointmentsCreatedHandler(message)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanForDay5StartFixture.id,
    )
    expect(patientPlanCohort).toMatchObject<Partial<PatientPlanCohort>>(
      expect.objectContaining({
        patientPlanId: patientPlanForDay5StartFixture.id,
        cohortDate: dateTimeUtil.formatTzDate(
          dateTimeUtil.subDays(dateTimeUtil.toDate(dateTimeUtil.now()), 2),
        ),
        patientPlanCohortIvfTaskDetails: expect.objectContaining({
          patientPlanCohortId: patientPlanCohort.id,
        }),
      }),
    )
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await destroyIVFLabFixtures(dataSource)
  })
})
