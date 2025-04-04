import {Injectable} from '@nestjs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'

import {
  SignOff,
  SignOffIVFLabTaskRequestDTO,
  TaskIVF,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {
  IvfEmbryoGradeRepository,
  PatientPlanCohortCryoSampleContainersRepository,
  PatientPlanCohortIvfTaskDetailsRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortIvfTaskSummaryRepository,
  PatientPlanCohortRepository,
  PatientPlanCohortSignOffHistoryRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {DateTimeUtil, handleOptionalStringValues, NestprojectConfigService} from '@libs/common'
import {BadRequestException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {
  callThePatientResponse,
  day3CheckResponse,
  day5CheckResponsePayload,
  day6CheckResponsePayload,
  day7CheckResponsePayload,
  embryoGroupPhotoResponse,
  fertilizationCheckResponse,
  generateIvfTasksResponse,
  getGroupTitle,
  getLastUpdateDetails,
  getPatientDetails,
  getPatientPlan,
  getPlanCohortSignOffHistoryPayload,
  getSignedOffDetails,
  getSpermSources,
  icsiInjectionResponse,
  injectionAssessmentResponse,
  inseminationIVFResponse,
  journeyWitnessResponse,
  matureOocyteGroupPhotoResponse,
  miiDay1CryoResponse,
  picsiResponse,
  postStrippingResponse,
  printLabelResponse,
  spermWashResponse,
  verifyHepBcHivResponse,
} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {Equal, IsNull} from 'typeorm'
import {PatientPartnerRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {CryoType, IVFTaskType, nonEditableStatuses} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  IVFUnitOptionType,
  PatientPlanCohort,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskGroup,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {getFullName, getInitials} from '@libs/common/helpers/patient.helper'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getCompletionPercentage} from '@apps/lis/daily-view/helper/daily-view.helper'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  DaysProps,
  DetailProps,
  validateDaysProps,
  validateDetailProps,
} from '@apps/lis/ivf-tasks/helper/sign-off.helper'
import {
  Day5CheckResponse,
  Day6CheckResponse,
  Day7CheckResponse,
  FertilizationCheckResponse,
  GetIVFLabTaskGroupResponseDTO,
  IvfTaskDetailsResponse,
  MiiDay1CryoResponse,
  PIDLabelResponse,
  SignOffIVFLabTaskResponseDTO,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {FreezeOocyteService} from '@apps/lis/ivf-tasks/services/freeze-oocyte.service'
import {FreezeEmbryosService} from '@apps/lis/ivf-tasks/services/freeze-embryos.service'
import {IvfUnitOptionRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/ivf-unit-option.repository'
import {IvfTasksV2Service} from '@apps/lis/ivf-tasks/services/ivf-tasks-v2.service'
import {IvfDishService} from '@apps/lis/ivf-tasks/services/ivf-dish.service'
import {CryoSampleContainerRepository} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'

@Injectable()
export class IvfTasksService {
  // eslint-disable-next-line max-params
  constructor(
    private configService: NestprojectConfigService,
    private staffRepository: StaffRepository,
    private readonly i18nLocalizationService: I18nLocalizationService,
    private readonly patientPlanCohortIvfTaskSummaryRepository: PatientPlanCohortIvfTaskSummaryRepository,
    private readonly patientPlanCohortSignOffHistoryRepository: PatientPlanCohortSignOffHistoryRepository,
    private readonly patientPlanCohortIvfTaskDetailsRepository: PatientPlanCohortIvfTaskDetailsRepository,
    private readonly patientPlanCohortIvfTaskGroupRepository: PatientPlanCohortIvfTaskGroupRepository,
    private readonly patientPartnerRepository: PatientPartnerRepository,
    private readonly ivfTaskExpandedEmbryoRepository: PatientPlanCohortIvfTaskExpandedEmbryoRepository,
    private readonly ivfEmbryoGradeRepository: IvfEmbryoGradeRepository,
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
    private readonly ivfUnitOptionRepository: IvfUnitOptionRepository,
    private readonly freezeOocyteService: FreezeOocyteService,
    private readonly freezeEmbryosService: FreezeEmbryosService,
    private readonly ivfTasksV2Service: IvfTasksV2Service,
    private readonly patientPlanCohortCryoSampleContainersRepository: PatientPlanCohortCryoSampleContainersRepository,
    private readonly ivfDishService: IvfDishService,
    private readonly cryoSampleContainerRepository: CryoSampleContainerRepository,
  ) {}

  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  async checkEligibilityToEdit(taskSummaryId: string): Promise<void> {
    const patientPlanCohort = await this.patientPlanCohortRepository.findOne({
      where: {
        patientPlanCohortIvfTaskSummary: {
          uuid: taskSummaryId,
        },
      },
      relations: {
        patientPlanCohortIvfTaskSummary: true,
        patientPlan: true,
      },
    })

    if (nonEditableStatuses.includes(patientPlanCohort?.patientPlan?.ivfLabStatus)) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.EDIT_COHORT_NOT_ALLOWED),
        ResponseStatusCodes.Failed,
      )
    }
  }

  async getIVFLabTaskGroup(ivfTaskGroupUUID: string): Promise<GetIVFLabTaskGroupResponseDTO> {
    try {
      const group =
        await this.patientPlanCohortIvfTaskGroupRepository.findOneForGetTaskGroup(ivfTaskGroupUUID)

      if (!group) {
        throw new BadRequestException(
          this.i18nLocalizationService.translate(i18Messages.IVF_TASK_GROUP_NOT_FOUND),
          ResponseStatusCodes.NotFound,
        )
      }

      const details = await this.patientPlanCohortIvfTaskDetailsRepository.getByIdWithPhotos(
        group.patientPlanCohort.patientPlanCohortIvfTaskDetails.id,
        group.day,
      )

      const patientPlan = group.patientPlanCohort.patientPlan
      const patient = patientPlan.patient

      const [partners, remainingTasksCount, ivfTasks] = await Promise.all([
        this.patientPartnerRepository.getPatientPartnersForIvf(patient.id),
        this.patientPlanCohortIvfTaskSummaryRepository.count({
          where: {
            patientPlanCohortIvfTaskGroupId: group.id,
            signedOffDate: IsNull(),
            disabledAt: IsNull(),
          },
        }),
        this.getIvfTasks(group, details),
      ])
      const signOff = await this.ivfTasksV2Service.getSignOff(group)

      return {
        title: getGroupTitle(group.day),
        details: {
          patient: getPatientDetails(patient),
          partners: partners.map((partner) => getPatientDetails(partner?.partner, true)),
          spermSources: getSpermSources(patientPlan.spermSources),
          patientPlan: getPatientPlan(
            patientPlan,
            group.patientPlanCohort.patientPlan.ivfLabStatus,
          ),
          date: group.date,
        },
        remainingTasksCount,
        ivfTasks,
        signOff,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.GetIVFLabTaskGroup,
        eventName: activityLogs.IvfTasksActions.GetIVFLabTaskGroupFailed,
      })
    }
  }

  async getSignOff(summary: PatientPlanCohortIvfTaskSummary, staffUser: Staff): Promise<SignOff> {
    const isDone = !!summary.signedOffDate
    const signedOffUser = summary.signedOffById
      ? await this.staffRepository.findOneById(summary.signedOffById)
      : null

    const initials = signedOffUser ? getInitials(signedOffUser) : null
    const signedOffDetails = getSignedOffDetails(signedOffUser, staffUser, summary)

    return {
      isDone,
      initials,
      details: signedOffDetails,
    }
  }

  async getIvfTasks(
    group: PatientPlanCohortIvfTaskGroup,
    details: PatientPlanCohortIvfTaskDetails,
  ): Promise<TaskIVF[]> {
    try {
      const patientPlanCohort = group.patientPlanCohort
      const detail = details
      const patientPlan = patientPlanCohort.patientPlan
      const summaries = group.ivfTaskSummaries

      const spawnedPatientPlanCohort =
        await this.patientPlanCohortRepository.findSpawnedCohortByOriginalCohortId(
          patientPlanCohort.id,
        )

      const ivfTasks = await Promise.all(
        summaries.map(async (summary) => {
          const details = await this.getIvfTasksDetails({
            task: summary.IVFTaskToDay.task,
            detail,
            patientPlan,
            patientPlanCohort,
            isSpawnedPatientPlanCohort: !!spawnedPatientPlanCohort,
            group,
          })

          if (
            [IVFTaskType.DishInventory, IVFTaskType.PartnerDishInventory].includes(
              summary.IVFTaskToDay.task,
            ) &&
            details?.['dishes']?.length === 0
          ) {
            return null
          }

          return {
            order: summary.IVFTaskToDay.order,
            id: summary.uuid,
            uiid: summary.IVFTaskToDay.task,
            lastUpdateDetails: getLastUpdateDetails(summary, summary.updatedByStaff),
            details,
            note: handleOptionalStringValues(summary.patientNote?.content),
          }
        }),
      )
      return generateIvfTasksResponse(ivfTasks.filter(Boolean))
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.GetIvfTasks,
        eventName: activityLogs.IvfTasksActions.GetIvfTasksFailed,
      })
    }
  }

  async getIvfTasksDetails(data: {
    task: IVFTaskType
    detail: PatientPlanCohortIvfTaskDetails
    patientPlan: PatientPlan
    patientPlanCohort: PatientPlanCohort
    isSpawnedPatientPlanCohort: boolean
    group: PatientPlanCohortIvfTaskGroup
  }): Promise<IvfTaskDetailsResponse> {
    const {task, detail, patientPlan, patientPlanCohort, isSpawnedPatientPlanCohort, group} = data
    const day = group.day
    const cohortDate = patientPlanCohort.cohortDate
    switch (task) {
      case IVFTaskType.InjectionAssessment:
        return injectionAssessmentResponse(detail)
      case IVFTaskType.InseminationIVF:
        return inseminationIVFResponse(detail, patientPlan)
      case IVFTaskType.PICSI:
        return picsiResponse(detail, patientPlan.spermSources)
      case IVFTaskType.IcsiInjection:
        return icsiInjectionResponse(detail, patientPlan)
      case IVFTaskType.MiiDay1Cryo:
        return this.getMiiDay1CryoResponse(patientPlanCohort, detail)
      case IVFTaskType.VerifyHepBcHiv:
        return verifyHepBcHivResponse(patientPlan)
      case IVFTaskType.Day3Check:
        return day3CheckResponse(detail)
      case IVFTaskType.OocyteCollection:
        return this.ivfTasksV2Service.getOocyteCollectionResponse(detail, patientPlanCohort)
      case IVFTaskType.PostStripping:
        return postStrippingResponse(detail, cohortDate, isSpawnedPatientPlanCohort)
      case IVFTaskType.SpermWash:
        const unitOptions = await this.ivfUnitOptionRepository.findByType(
          IVFUnitOptionType.SpermWashConcentration,
        )
        return spermWashResponse(detail, unitOptions)
      case IVFTaskType.MatureOocyteGroupPhoto:
        return matureOocyteGroupPhotoResponse(detail)
      case IVFTaskType.EmbryoGroupPhoto:
        return embryoGroupPhotoResponse(detail)
      case IVFTaskType.Day5Check:
        return this.day5CheckResponse(detail, day)
      case IVFTaskType.Day6Check:
        return this.day6CheckResponse(detail, day)
      case IVFTaskType.Day7Check:
        return this.day7CheckResponse(detail, day)
      case IVFTaskType.FertilizationCheck:
        return this.getFertilizationCheckResponse(detail, patientPlan)
      case IVFTaskType.OocyteFreezing:
        return this.freezeOocyteService.getResponse(detail, patientPlanCohort)
      case IVFTaskType.PrintLabel:
        return printLabelResponse(patientPlan)
      case IVFTaskType.FrozenEmbryoTransfer:
        return this.freezeEmbryosService.getResponse(patientPlan, detail)
      case IVFTaskType.CallThePatient:
        return callThePatientResponse(detail)
      case IVFTaskType.JourneyWitness:
        return journeyWitnessResponse(detail)
      case IVFTaskType.DishInventory:
        return this.ivfDishService.dishInventoryResponse(patientPlanCohort.id)
      case IVFTaskType.PartnerDishInventory:
        return this.ivfDishService.partnerDishInventoryResponse(patientPlanCohort.id)
      case IVFTaskType.EggThaw:
        return this.ivfTasksV2Service.getEggThawResponse(detail, patientPlanCohort)
      case IVFTaskType.PIDLabel:
        return this.getPidLabelResponse(patientPlan)
    }
  }

  async getMiiDay1CryoResponse(
    patientPlanCohort: PatientPlanCohort,
    detail: PatientPlanCohortIvfTaskDetails,
  ): Promise<MiiDay1CryoResponse> {
    const [existingOocytes, lastStrawNumber] = await Promise.all([
      this.patientPlanCohortCryoSampleContainersRepository.getByPatientPlanCohortIdWithCryoSamleContainer(
        patientPlanCohort.id,
        CryoType.MiiDay1Cryo,
      ),
      this.cryoSampleContainerRepository.maximum('strawNumber', {
        cryoInventoryCard: {eggPatientPlan: {id: Equal(patientPlanCohort.patientPlan.id)}},
      }),
    ])

    if (patientPlanCohort.spawnedFromPatientPlanCohortId) {
      const originalPatientPlanCohort =
        await this.patientPlanCohortRepository.findOriginalCohortWithImmature(
          patientPlanCohort.spawnedFromPatientPlanCohortId,
        )

      return miiDay1CryoResponse({
        detail,
        existingOocytes,
        lastStrawNumber,
        immatureOocytes: originalPatientPlanCohort.patientPlanCohortIvfTaskDetails.immatureOocytes,
      })
    }
    return miiDay1CryoResponse({detail, existingOocytes, lastStrawNumber})
  }

  async getFertilizationCheckResponse(
    detail: PatientPlanCohortIvfTaskDetails,
    patientPlan: PatientPlan,
  ): Promise<FertilizationCheckResponse> {
    return {
      numberOfOocytes: detail.matureOocytes,
      sourceGroups: fertilizationCheckResponse(detail, patientPlan),
    }
  }

  async day7CheckResponse(
    detail: PatientPlanCohortIvfTaskDetails,
    day: number,
  ): Promise<Day7CheckResponse> {
    const [day5And6EmbryosCount, embryos, grades, lastEmbryoNumber] = await Promise.all([
      this.ivfTaskExpandedEmbryoRepository.getEmbryosCountByDay(detail.patientPlanCohortId, [5, 6]),
      this.ivfTaskExpandedEmbryoRepository.getForDayCheckResponse(detail.patientPlanCohortId, day),
      this.ivfEmbryoGradeRepository.find(),
      this.ivfTaskExpandedEmbryoRepository.maximum('embryoNumber', {
        patientPlanCohortId: detail.patientPlanCohortId,
      }),
    ])

    const remainingCount = await this.getRemainingEmbryos(detail)

    return day7CheckResponsePayload({
      detail,
      embryos,
      grades,
      day5And6EmbryosCount,
      remainingCount,
      lastEmbryoNumber,
    })
  }

  private async getRemainingEmbryos(detail: PatientPlanCohortIvfTaskDetails): Promise<number> {
    const allDayEmbryosCount = await this.ivfTaskExpandedEmbryoRepository.getEmbryosCountByDay(
      detail.patientPlanCohortId,
      [5, 6, 7],
    )

    const day3EmbryosMoreThan6Cells = detail.day3EmbryosMoreThan6Cells ?? 0
    const day3EmbryosLessThan6Cells = detail.day3EmbryosLessThan6Cells ?? 0

    const numberOfEmbryos = day3EmbryosMoreThan6Cells + day3EmbryosLessThan6Cells

    const day5EmbryoArrested = detail.day5Arrested ?? 0
    const day6EmbryoArrested = detail.day6Arrested ?? 0
    const day7EmbryoDiscarded = detail.day7Discarded ?? 0

    const usedEmbryoCount =
      allDayEmbryosCount + day5EmbryoArrested + day6EmbryoArrested + day7EmbryoDiscarded

    return numberOfEmbryos - usedEmbryoCount
  }

  async day6CheckResponse(
    detail: PatientPlanCohortIvfTaskDetails,
    day: number,
  ): Promise<Day6CheckResponse> {
    const [day5EmbryosCount, embryos, grades, lastEmbryoNumber] = await Promise.all([
      this.ivfTaskExpandedEmbryoRepository.getEmbryosCountByDay(detail.patientPlanCohortId, [5]),
      this.ivfTaskExpandedEmbryoRepository.getForDayCheckResponse(detail.patientPlanCohortId, day),
      this.ivfEmbryoGradeRepository.find(),
      this.ivfTaskExpandedEmbryoRepository.maximum('embryoNumber', {
        patientPlanCohortId: detail.patientPlanCohortId,
      }),
    ])

    const remainingCount = await this.getRemainingEmbryos(detail)

    return day6CheckResponsePayload({
      detail,
      embryos,
      grades,
      day5EmbryosCount,
      remainingCount,
      lastEmbryoNumber,
    })
  }

  async day5CheckResponse(
    detail: PatientPlanCohortIvfTaskDetails,
    day: number,
  ): Promise<Day5CheckResponse> {
    const [embryos, grades, lastEmbryoNumber] = await Promise.all([
      this.ivfTaskExpandedEmbryoRepository.getForDayCheckResponse(detail.patientPlanCohortId, day),
      this.ivfEmbryoGradeRepository.find(),
      this.ivfTaskExpandedEmbryoRepository.maximum('embryoNumber', {
        patientPlanCohortId: detail.patientPlanCohortId,
      }),
    ])

    const remainingCount = await this.getRemainingEmbryos(detail)

    return day5CheckResponsePayload({detail, embryos, grades, remainingCount, lastEmbryoNumber})
  }

  private throwValidationError(): void {
    throw new BadRequestException(
      this.i18nLocalizationService.translate(i18Messages.SIGN_OFF_VALIDATION_ERROR),
      ResponseStatusCodes.Failed,
    )
  }

  private async validateRequiredFields(
    ivfTaskSummary: PatientPlanCohortIvfTaskSummary,
  ): Promise<void> {
    const detail = ivfTaskSummary.patientPlanCohort.patientPlanCohortIvfTaskDetails
    const task = ivfTaskSummary.IVFTaskToDay.task

    if (DaysProps.includes(task) && !validateDaysProps(task, detail)) {
      this.throwValidationError()
    } else if (DetailProps.includes(task) && !validateDetailProps(task, detail)) {
      this.throwValidationError()
    }

    if (task === IVFTaskType.OocyteFreezing) {
      await this.freezeOocyteService.checkSignOffEligibility(
        detail,
        ivfTaskSummary.patientPlanCohort.id,
      )
    }
  }

  async signOffIVFLabTask(
    payload: SignOffIVFLabTaskRequestDTO,
    authUserId: string,
  ): Promise<SignOffIVFLabTaskResponseDTO> {
    try {
      const promises = []
      const {id} = payload

      const [staff, ivfTaskSummary] = await Promise.all([
        this.staffRepository.findOneAndReturnIdByAuthUserId(authUserId),
        this.patientPlanCohortIvfTaskSummaryRepository.findOneByUUIDForSignOff(id),
      ])

      if (!ivfTaskSummary) {
        throw new BadRequestException(
          this.i18nLocalizationService.translate(i18Messages.IVF_TASK_SUMMARY_NOT_FOUND),
          ResponseStatusCodes.NotFound,
        )
      }

      await this.validateRequiredFields(ivfTaskSummary)

      if (ivfTaskSummary.signedOffDate) {
        promises.push(
          this.patientPlanCohortSignOffHistoryRepository.save(
            getPlanCohortSignOffHistoryPayload(ivfTaskSummary),
          ),
        )
      }

      promises.push(
        this.patientPlanCohortIvfTaskSummaryRepository.update(
          {id: ivfTaskSummary.id},
          {
            signedOffDate: this.dateTimeUtil.now(),
            signedOffById: staff.id,
            updatedBy: authUserId,
          },
        ),
      )

      await Promise.all(promises)
      const updatedSummary =
        await this.patientPlanCohortIvfTaskSummaryRepository.findOneByUUIDForSignOff(id)

      const signedOffTasksCount =
        updatedSummary.patientPlanCohortIvfTaskGroup.ivfTaskSummaries.filter(
          (ivfTaskSummary) => ivfTaskSummary.signedOffById,
        ).length
      const allTaskCount = updatedSummary.patientPlanCohortIvfTaskGroup.ivfTaskSummaries.filter(
        (ivfTaskSummary) => !ivfTaskSummary.disabledAt,
      ).length

      const completionPercentage = getCompletionPercentage(allTaskCount, signedOffTasksCount)

      const [remainingTasksCount, staffUser] = await Promise.all([
        this.patientPlanCohortIvfTaskSummaryRepository.count({
          where: {
            patientPlanCohortIvfTaskGroupId: ivfTaskSummary.patientPlanCohortIvfTaskGroupId,
            signedOffDate: IsNull(),
            disabledAt: IsNull(),
          },
        }),
        this.staffRepository.findOneById(updatedSummary.signedOffById),
        this.patientPlanCohortIvfTaskGroupRepository.update(
          {
            id: updatedSummary.patientPlanCohortIvfTaskGroupId,
          },
          {
            completionPercentage,
          },
        ),
      ])

      const signOff = await this.getSignOff(updatedSummary, staffUser)

      return {
        remainingTasksCount,
        completionPercentage,
        uiid: updatedSummary.IVFTaskToDay.task,
        signOff,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.SignOffIVFLabTask,
        eventName: activityLogs.IvfTasksActions.SignOffIVFLabTaskFailed,
      })
    }
  }
  async getPidLabelResponse(patientPlan: PatientPlan): Promise<PIDLabelResponse> {
    return {
      patientIdentifier: patientPlan.patient.patientIdentifier,
      patientFullName: getFullName(patientPlan.patient.firstName, patientPlan.patient.lastName),
      dateOfBirth: this.dateTimeUtil.formatBirthDate(patientPlan.patient.dateOfBirth),
    }
  }
}
