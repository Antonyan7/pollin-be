import {DateTimeUtil, StructuredLogger} from '@libs/common/utils'
import {
  IvfDishToIvfTaskGroup,
  IvfDishToPlanAddon,
  IvfDishToPlanType,
  PatientPlanCohort,
  PatientPlanCohortIvfDish,
  PatientPlanCohortIvfTaskGroup,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {IVFLabStatus, IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  IvfDishToIvfTaskGroupRepository,
  IvfDishToPlanAddonRepository,
  IvfDishToPlanTypeRepository,
  PatientPlanCohortIvfDishRepository,
  PatientPlanCohortIvfTaskDetailsRepository,
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortIvfTaskSummaryRepository,
  PatientPlanCohortRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanAddonCode, PlanAddonType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Injectable} from '@nestjs/common'
import {Equal, IsNull} from 'typeorm'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {NestprojectConfigService} from '@libs/common'
import {allPossibleDays, IvfLabDayEnum} from '@libs/services-common/enums'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {PubSubAdapter} from '@libs/common/adapters'
import {
  PatientPlanCohortStartDateUpdatedPubSubPayload,
  PatientPlanCohortStartDateUpdatedSchema,
} from '@libs/common/model/proto-schemas/patient-plan-cohort-start-date-updated.schema'
import {getFirstPatientPlanAddonByType} from '@libs/common/helpers/plan.helper'

type SetCohortDatePayload = {
  activePatientPlan: PatientPlan
  cohortDate: string
  appointment?: Appointment
}

//Used on CF
@Injectable()
export class IvfLabCohortDateService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
    private readonly patientPlanCohortIvfTaskDetailsRepository: PatientPlanCohortIvfTaskDetailsRepository,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly patientPlanCohortIvfTaskGroupRepository: PatientPlanCohortIvfTaskGroupRepository,
    private readonly patientPlanCohortIvfTaskSummaryRepository: PatientPlanCohortIvfTaskSummaryRepository,
    private readonly ivfDishToPlanTypeRepository: IvfDishToPlanTypeRepository,
    private readonly ivfDishToPlanAddonRepository: IvfDishToPlanAddonRepository,
    private readonly patientPlanCohortIvfDishRepository: PatientPlanCohortIvfDishRepository,
    private readonly ivfDishToIvfTaskGroupRepository: IvfDishToIvfTaskGroupRepository,
  ) {}
  private configService = NestprojectConfigService.getInstance()
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  private getActivePeriodDate(cohortDate: string | Date, daysCount: number): string {
    return this.dateTimeUtil.formatDateYMD(
      this.dateTimeUtil.addDays(this.dateTimeUtil.toDate(cohortDate), daysCount),
    )
  }

  getIvfDishesFromPlanTypesAndPlanAddons(
    ivfDishesToPlanTypes: IvfDishToPlanType[],
    ivfDishesToPlanAddons: IvfDishToPlanAddon[],
  ): {ivfDishesToDaysMap: Map<number, number[]>; ivfDishRequiredToDaysMap: Map<string, boolean>} {
    const ivfDishesToDaysMap: Map<number, number[]> = new Map()
    const ivfDishRequiredToDaysMap: Map<string, boolean> = new Map()

    ivfDishesToPlanTypes.map((ivfDishesToPlanType) => {
      if (!ivfDishesToDaysMap.has(ivfDishesToPlanType.ivfDishId)) {
        ivfDishesToDaysMap.set(ivfDishesToPlanType.ivfDishId, [ivfDishesToPlanType.day])
      } else {
        ivfDishesToDaysMap.get(ivfDishesToPlanType.ivfDishId).push(ivfDishesToPlanType.day)
      }
      ivfDishRequiredToDaysMap.set(
        `${ivfDishesToPlanType.ivfDishId}_${ivfDishesToPlanType.day}`,
        ivfDishesToPlanType.required,
      )
    })

    ivfDishesToPlanAddons.forEach((ivfDishesToPlanAddon) => {
      if (!ivfDishesToDaysMap.has(ivfDishesToPlanAddon.ivfDishId)) {
        ivfDishesToDaysMap.set(ivfDishesToPlanAddon.ivfDishId, [ivfDishesToPlanAddon.day])
      } else {
        ivfDishesToDaysMap.get(ivfDishesToPlanAddon.ivfDishId).push(ivfDishesToPlanAddon.day)
      }
      ivfDishRequiredToDaysMap.set(
        `${ivfDishesToPlanAddon.ivfDishId}_${ivfDishesToPlanAddon.day}`,
        ivfDishesToPlanAddon.required,
      )
    })

    return {ivfDishesToDaysMap, ivfDishRequiredToDaysMap}
  }

  async saveInitialPatientPlanCohortIvfDishes(
    ivfDishesToDaysMap: Map<number, number[]>,
    patientPlanCohortId: number,
  ): Promise<void> {
    const patientPlanCohortIvfDishes: Partial<PatientPlanCohortIvfDish>[] = []
    for (const ivfDishId of ivfDishesToDaysMap.keys()) {
      patientPlanCohortIvfDishes.push({ivfDishId, patientPlanCohortId})
    }
    await this.patientPlanCohortIvfDishRepository.save(patientPlanCohortIvfDishes)
  }

  async addDishesToPatientPlanCohortTaskGroup(
    ivfDishesToDaysMap: Map<number, number[]>,
    ivfDishRequiredToDaysMap: Map<string, boolean>,
    patientPlanCohortIvfTaskGroup: PatientPlanCohortIvfTaskGroup,
  ): Promise<void> {
    const ivfDishToIvfTaskGroups: Partial<IvfDishToIvfTaskGroup>[] = []
    for (const ivfDishId of ivfDishesToDaysMap.keys()) {
      if (ivfDishesToDaysMap.get(ivfDishId).includes(patientPlanCohortIvfTaskGroup.day)) {
        const isRequired =
          ivfDishRequiredToDaysMap.get(`${ivfDishId}_${patientPlanCohortIvfTaskGroup.day}`) ?? null
        ivfDishToIvfTaskGroups.push({
          ivfDishId,
          patientPlanCohortIvfTaskGroupId: patientPlanCohortIvfTaskGroup.id,
          required: isRequired,
        })
      }
    }
    await this.ivfDishToIvfTaskGroupRepository.save(ivfDishToIvfTaskGroups)
  }

  async setCohortStartDate(
    {activePatientPlan, cohortDate, appointment}: SetCohortDatePayload,
    spawn = false,
  ): Promise<{
    patientPlanCohort: PatientPlanCohort
    createdTaskGroups?: PatientPlanCohortIvfTaskGroup[]
  }> {
    const oldPatientPlanCohort = await this.patientPlanCohortRepository.findOneBy({
      patientPlanId: Equal(activePatientPlan.id),
      spawnedFromPatientPlanCohortId: IsNull(),
    })
    const activePeriodStart = this.getActivePeriodDate(cohortDate, allPossibleDays[0])
    const activePeriodEnd = this.getActivePeriodDate(
      cohortDate,
      allPossibleDays[allPossibleDays.length - 1],
    )

    const patientPlanCohort = await this.patientPlanCohortRepository.save({
      id: spawn ? null : oldPatientPlanCohort?.id,
      patientPlanId: activePatientPlan.id,
      appointmentId: appointment?.id ?? null,
      cohortDate,
      activePeriodStart,
      activePeriodEnd,
      spawnedFromPatientPlanCohortId: spawn ? oldPatientPlanCohort?.id : null,
      revisionId: generateRevisionId(this.dateTimeUtil.now()),
    })

    if (!spawn) {
      await this.patientPlanRepository.update(activePatientPlan.id, {
        ivfLabStatus: this.dateTimeUtil.isAfter(
          this.dateTimeUtil.toDate(cohortDate),
          this.dateTimeUtil.UTCToTz(this.dateTimeUtil.now()),
        )
          ? IVFLabStatus.Upcoming
          : IVFLabStatus.Active,
      })
    }
    await this.publishCohortDateUpdated(patientPlanCohort.id)

    if (oldPatientPlanCohort && oldPatientPlanCohort.cohortDate && !spawn) {
      StructuredLogger.info(
        activityLogs.IvfTasksFunctions.SetCohortStartDate,
        activityLogs.IvfTasksActions.UpdateCohortDate,
        null,
      )

      await this.updateTaskGroupDates(patientPlanCohort)

      return {patientPlanCohort}
    }

    const patientCohortId = patientPlanCohort.id
    await this.patientPlanCohortIvfTaskDetailsRepository.save({
      patientPlanCohortId: patientCohortId,
    })

    const ivfDishToPlanType = await this.ivfDishToPlanTypeRepository.findByPlanTypeId(
      activePatientPlan.planTypeId,
    )
    const ivfDishToPlanAddon = await this.ivfDishToPlanAddonRepository.findByPlanAddonId(
      getFirstPatientPlanAddonByType(activePatientPlan, PlanAddonType.FertilizationDirective)
        ?.planAddonId,
    )
    const {ivfDishesToDaysMap, ivfDishRequiredToDaysMap} =
      this.getIvfDishesFromPlanTypesAndPlanAddons(ivfDishToPlanType, ivfDishToPlanAddon)

    await this.saveInitialPatientPlanCohortIvfDishes(ivfDishesToDaysMap, patientCohortId)

    const createdTaskGroups: Map<number, PatientPlanCohortIvfTaskGroup> = new Map()

    for (const day of allPossibleDays) {
      const date = this.dateTimeUtil.formatDateYMD(
        this.dateTimeUtil.addDays(this.dateTimeUtil.toDate(cohortDate), day),
      )

      const patientPlanCohortTaskGroup = await this.patientPlanCohortIvfTaskGroupRepository.save({
        patientPlanCohortId: patientCohortId,
        day,
        date,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
      })
      await this.addDishesToPatientPlanCohortTaskGroup(
        ivfDishesToDaysMap,
        ivfDishRequiredToDaysMap,
        patientPlanCohortTaskGroup,
      )
      createdTaskGroups.set(day, patientPlanCohortTaskGroup)
    }
    const lastActiveDay = await this.generateTasks({
      activePatientPlan,
      spawn,
      createdTaskGroups,
      cohortDate,
      patientCohortId,
    })
    await this.patientPlanCohortRepository.save({
      id: patientPlanCohort.id,
      activePeriodEnd: this.getActivePeriodDate(cohortDate, lastActiveDay),
    })

    return {
      patientPlanCohort: await this.patientPlanCohortRepository.findOneById(patientCohortId),
      createdTaskGroups: [...createdTaskGroups.values()],
    }
  }

  private async updateTaskGroupDates(patientPlanCohort: PatientPlanCohort): Promise<void> {
    await this.patientPlanCohortIvfTaskGroupRepository
      .createQueryBuilder()
      .update(PatientPlanCohortIvfTaskGroup)
      .set({
        date: () => `DATE_ADD('${patientPlanCohort.cohortDate}', INTERVAL day DAY)`,
      })
      .where('patientPlanCohortId = :patientPlanCohortId', {
        patientPlanCohortId: patientPlanCohort.id,
      })
      .execute()
  }

  async publishCohortDateUpdated(patientPlanCohortId: number): Promise<void> {
    const configService = NestprojectConfigService.getInstance()
    const topic = configService.get<string>('TOPIC_PATIENT_PLAN_COHORT_START_DATE_UPDATED')
    const pubSubAdapter = new PubSubAdapter(topic)

    await pubSubAdapter.publishWithSchema<PatientPlanCohortStartDateUpdatedPubSubPayload>(
      {
        patientPlanCohortId,
      },
      PatientPlanCohortStartDateUpdatedSchema,
    )
  }

  private async generateTasks({
    activePatientPlan,
    spawn,
    createdTaskGroups,
    cohortDate,
    patientCohortId,
  }: {
    activePatientPlan: PatientPlan
    spawn: boolean
    createdTaskGroups: Map<number, PatientPlanCohortIvfTaskGroup>
    cohortDate: string
    patientCohortId: number
  }): Promise<IvfLabDayEnum> {
    let lastActiveDay = allPossibleDays[0]

    for (const {IVFTaskToDay} of activePatientPlan.planType.ivfTaskToDayToPlanType) {
      const {day, shouldAppearOnSpawn} = IVFTaskToDay

      if (spawn && !shouldAppearOnSpawn) {
        continue
      }

      const dayGroup = createdTaskGroups.get(day)
      const patientPlan = await this.patientPlanRepository.findOneByIdForCheckAddon(
        activePatientPlan.id,
      )

      const disabledTasksBasedOnLabInstruction = patientPlan.labInstructions.flatMap(
        (labInstruction) =>
          labInstruction.planLabInstruction.ivfTaskToPlanLabInstructions.map(
            (ivfTaskToPlanLabInstruction) => ivfTaskToPlanLabInstruction.task,
          ),
      )

      const triggerCreateTaskGroupAndSummary = async (disabledAt?: Date): Promise<void> => {
        if (day > lastActiveDay) {
          lastActiveDay = day
        }
        await this.createTaskGroupAndSummary({
          cohortDate,
          dayGroup,
          day,
          patientCohortId,
          IVFTaskToDayId: IVFTaskToDay.id,
          createdTaskGroups,
          disabledAt,
        })
      }

      await this.checkTaskEligibility({
        task: IVFTaskToDay.task,
        day,
        patientPlan,
        disabledTasksBasedOnLabInstruction,
        triggerCreateTaskGroupAndSummaryCallback: triggerCreateTaskGroupAndSummary,
      })
    }

    return lastActiveDay
  }

  private async checkTaskEligibility({
    task,
    day,
    patientPlan,
    triggerCreateTaskGroupAndSummaryCallback,
    disabledTasksBasedOnLabInstruction,
  }: {
    task: IVFTaskType
    day: number
    patientPlan: PatientPlan
    disabledTasksBasedOnLabInstruction: IVFTaskType[]
    triggerCreateTaskGroupAndSummaryCallback: (disabledAt?: Date) => Promise<void>
  }): Promise<void> {
    if (disabledTasksBasedOnLabInstruction.includes(task)) {
      await triggerCreateTaskGroupAndSummaryCallback(this.dateTimeUtil.now())
      return
    }
    switch (task) {
      case IVFTaskType.InseminationIVF:
        if (this.checkTaskForInseminationIVF(day, patientPlan)) {
          await triggerCreateTaskGroupAndSummaryCallback()
        } else {
          await triggerCreateTaskGroupAndSummaryCallback(this.dateTimeUtil.now())
        }
        break
      case IVFTaskType.PICSI:
        if (this.checkTaskForPICSI(day, patientPlan)) {
          await triggerCreateTaskGroupAndSummaryCallback()
        } else {
          await triggerCreateTaskGroupAndSummaryCallback(this.dateTimeUtil.now())
        }
        break
      case IVFTaskType.IcsiInjection:
        if (this.checkTaskForIcsiInjection(day, patientPlan)) {
          await triggerCreateTaskGroupAndSummaryCallback()
        } else {
          await triggerCreateTaskGroupAndSummaryCallback(this.dateTimeUtil.now())
        }
        break
      case IVFTaskType.CaIonophore:
        if (this.checkTaskAddCaIonophore(patientPlan)) {
          await triggerCreateTaskGroupAndSummaryCallback()
        } else {
          await triggerCreateTaskGroupAndSummaryCallback(this.dateTimeUtil.now())
        }
        break
      case IVFTaskType.InjectionAssessment:
        if (this.checkTaskForInjectionAssesment(patientPlan)) {
          await triggerCreateTaskGroupAndSummaryCallback()
        } else {
          await triggerCreateTaskGroupAndSummaryCallback(this.dateTimeUtil.now())
        }
        break
      default:
        await triggerCreateTaskGroupAndSummaryCallback()
    }
  }

  private async createTaskGroupAndSummary(data: {
    cohortDate: string
    dayGroup: PatientPlanCohortIvfTaskGroup
    day: number
    patientCohortId: number
    IVFTaskToDayId: number
    createdTaskGroups: Map<number, PatientPlanCohortIvfTaskGroup>
    disabledAt: Date
  }): Promise<void> {
    const {dayGroup, patientCohortId, IVFTaskToDayId, disabledAt} = data

    if (!dayGroup) {
      StructuredLogger.warn(
        activityLogs.IvfTasksFunctions.SetCohortStartDate,
        activityLogs.IvfTasksActions.CreateTaskGroupAndSummary,
        {
          message: `No Service Category in Cart Data`,
        },
      )
    }

    await this.patientPlanCohortIvfTaskSummaryRepository.save({
      IVFTaskToDayId,
      patientPlanCohortId: patientCohortId,
      patientPlanCohortIvfTaskGroupId: dayGroup.id,
      //TODO refactor
      activePeriodStart: this.dateTimeUtil.now(),
      activePeriodEnd: this.dateTimeUtil.now(),
      disabledAt,
    })
  }

  private checkTaskForInseminationIVF(day: number, patientPlan: PatientPlan): boolean {
    const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
      patientPlan,
      PlanAddonType.FertilizationDirective,
    )?.planAddon

    const code = fertilizationDirectiveAddon?.code
    const whiteListArray = [PlanAddonCode.IVFOrICSISplit, PlanAddonCode.IVF]
    return day === 0 && whiteListArray.includes(code)
  }

  private checkTaskForPICSI(day: number, patientPlan: PatientPlan): boolean {
    const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
      patientPlan,
      PlanAddonType.FertilizationDirective,
    )?.planAddon

    const code = fertilizationDirectiveAddon?.code
    const whiteListArray = [PlanAddonCode.PICSI]
    return day === 0 && whiteListArray.includes(code)
  }

  private checkTaskForIcsiInjection = (day: number, patientPlan: PatientPlan): boolean => {
    const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
      patientPlan,
      PlanAddonType.FertilizationDirective,
    )?.planAddon

    const code = fertilizationDirectiveAddon?.code
    const whiteListArray = [
      PlanAddonCode.ICSI,
      PlanAddonCode.IVFOrICSISplit,
      PlanAddonCode.ICSIAndCaIonophore,
    ]
    return day === 0 && whiteListArray.includes(code)
  }

  private checkTaskAddCaIonophore = (patientPlan: PatientPlan): boolean => {
    const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
      patientPlan,
      PlanAddonType.FertilizationDirective,
    )?.planAddon

    const code = fertilizationDirectiveAddon?.code
    return code === PlanAddonCode.ICSIAndCaIonophore
  }

  private checkTaskForInjectionAssesment = (patientPlan: PatientPlan): boolean => {
    const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
      patientPlan,
      PlanAddonType.FertilizationDirective,
    )?.planAddon

    const code = fertilizationDirectiveAddon?.code
    const whiteListArray = [
      PlanAddonCode.ICSI,
      PlanAddonCode.IVFOrICSISplit,
      PlanAddonCode.ICSIAndCaIonophore,
    ]

    return whiteListArray.includes(code)
  }
}
