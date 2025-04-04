import {Injectable} from '@nestjs/common'
import {
  PatientPlanCohortEggToThawRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
  PatientPlanCohortIvfTaskGroupRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {
  DateTimeUtil,
  handleOptionalNumberValues,
  handleOptionalStringValues,
  isNull,
  NestprojectConfigService,
  StructuredLogger,
} from '@libs/common'
import {
  EggThawingResponse,
  OocytesCollectionResponse,
  SignOffIVFLabTaskResponseV2DTO,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {SignOffIVFLabTaskRequestV2DTO} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request-v2.dto'
import {SignOff} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {getInitials} from '@libs/common/helpers/patient.helper'
import {
  getCryoSampleContainerTitle,
  getSignedOffDetailsV2,
} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {
  PatientPlanCohort,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskGroup,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {CryoType, IVFTaskType, nonEditableStatuses} from '@libs/data-layer/apps/clinic-ivf/enums'
import {BadRequestException, BadRequestValidationException} from '@libs/services-common/exceptions'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {
  DaysProps,
  DetailProps,
  validateDaysProps,
  validateDetailProps,
} from '@apps/lis/ivf-tasks/helper/sign-off.helper'
import {FreezeOocyteService} from '@apps/lis/ivf-tasks/services/freeze-oocyte.service'
import {DefaultValue} from '@libs/common/enums'
import {CryoSampleContainerRepository} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {PatientPlanCohortCryoSampleContainersRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/patient-plan-cohort-cryo-sample-containers.repository'
import {CohortEggToThawType} from '@libs/data-layer/apps/clinic-ivf/enums'

@Injectable()
export class IvfTasksV2Service {
  // eslint-disable-next-line max-params
  constructor(
    private readonly i18nLocalizationService: I18nLocalizationService,
    private configService: NestprojectConfigService,
    private staffRepository: StaffRepository,
    private readonly freezeOocyteService: FreezeOocyteService,
    private patientPlanCohortIvfTaskGroupRepository: PatientPlanCohortIvfTaskGroupRepository,
    private readonly cryoSampleContainerRepository: CryoSampleContainerRepository,
    private readonly patientPlanCohortCryoSampleContainersRepository: PatientPlanCohortCryoSampleContainersRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly patientPlanCohortEggToThawRepository: PatientPlanCohortEggToThawRepository,
    private readonly ivfTaskExpandedEmbryoRepository: PatientPlanCohortIvfTaskExpandedEmbryoRepository,
  ) {}
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  async signOffDay(
    payload: SignOffIVFLabTaskRequestV2DTO,
    authUserId: string,
  ): Promise<SignOffIVFLabTaskResponseV2DTO> {
    try {
      const {taskGroupId} = payload
      const [staff, ivfTaskGroup] = await Promise.all([
        this.staffRepository.findOneAndReturnIdByAuthUserId(authUserId),
        this.patientPlanCohortIvfTaskGroupRepository.findOneByUUIDForSignOff(taskGroupId),
      ])
      if (!ivfTaskGroup) {
        throw new BadRequestException(
          this.i18nLocalizationService.translate(i18Messages.IVF_TASK_GROUP_NOT_FOUND),
          ResponseStatusCodes.NotFound,
        )
      }
      const taskDate = ivfTaskGroup.date
      await this.validateTaskEditDate(taskDate)

      if (ivfTaskGroup.signedOffDate) {
        throw new BadRequestException(
          this.i18nLocalizationService.translate(i18Messages.DAY_ALREADY_SIGNED_OFF),
          ResponseStatusCodes.Conflict,
        )
      }
      await this.validateRequiredFieldsForSignOffDay(ivfTaskGroup)

      const updatedTaskGroup = await this.patientPlanCohortIvfTaskGroupRepository.save({
        id: ivfTaskGroup.id,
        signedOffDate: this.dateTimeUtil.now(),
        signedOffById: staff.id,
      })

      const signOffDetails = await this.getSignOff(updatedTaskGroup)

      await PubSubHelpers.publishIvfTaskSigned(ivfTaskGroup.id)
      return {
        signOff: signOffDetails,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.SignOffIVFDay,
        eventName: activityLogs.IvfTasksActions.SignOffIVFDayFailed,
      })
    }
  }

  async validateRequiredFieldsForSignOffDay(
    ivfTaskGroup: PatientPlanCohortIvfTaskGroup,
  ): Promise<void> {
    const details = ivfTaskGroup.patientPlanCohort.patientPlanCohortIvfTaskDetails
    for (const summary of ivfTaskGroup.ivfTaskSummaries) {
      const task = summary.IVFTaskToDay.task
      if (this.shouldSkipValidation(details, ivfTaskGroup)) {
        return
      }

      if (DaysProps.includes(task) && !validateDaysProps(task, details)) {
        StructuredLogger.info(
          activityLogs.IvfTasksFunctions.ValidateRequiredFieldsForSignOffDay,
          activityLogs.IvfTasksActions.ValidateDayPropsFailed,
          {message: `Day props validation failed for task: ${task}`},
        )
        this.throwValidationError()
      } else if (DetailProps.includes(task) && !validateDetailProps(task, details)) {
        StructuredLogger.info(
          activityLogs.IvfTasksFunctions.ValidateRequiredFieldsForSignOffDay,
          activityLogs.IvfTasksActions.ValidateDetailsPropsFailed,
          {message: `Detail props validation failed for task: ${task}`},
        )
        this.throwValidationError()
      }

      if (task === IVFTaskType.OocyteCollection) {
        await this.checkOocyteCollectedEligibility(details)
      }

      if (task === IVFTaskType.OocyteFreezing) {
        await this.freezeOocyteService.checkSignOffEligibility(
          details,
          ivfTaskGroup.patientPlanCohort.id,
        )
      }
      if (task === IVFTaskType.MiiDay1Cryo) {
        await this.checkSignOffEligibilityForMiiDay1Cryo(details, ivfTaskGroup.patientPlanCohort.id)
      }
    }
  }

  async checkSignOffEligibilityForMiiDay1Cryo(
    detail: PatientPlanCohortIvfTaskDetails,
    patientPlanCohortId: number,
  ): Promise<void> {
    const eggCount =
      await this.patientPlanCohortCryoSampleContainersRepository.countEggsPatientPlanCohortIdWithCryoSamleContainer(
        patientPlanCohortId,
        CryoType.MiiDay1Cryo,
      )

    if (detail.matureOocytesToCry > 0 && detail.matureOocytesToCry !== eggCount) {
      throw new BadRequestValidationException(
        this.i18nService.translate(
          i18Messages.ALL_MATURE_OOCYTES_MUST_BE_ASSIGNED_TO_STRAWS_BEFORE_SIGNOFF,
        ),
      )
    }
  }

  private shouldSkipValidation(
    details: PatientPlanCohortIvfTaskDetails,
    ivfTaskGroup: PatientPlanCohortIvfTaskGroup,
  ): boolean {
    return (
      details.oocytesCollected === 0 &&
      ivfTaskGroup.ivfTaskSummaries.some(
        (groupSummary) => groupSummary.IVFTaskToDay.task === IVFTaskType.OocyteCollection,
      )
    )
  }

  async checkOocyteCollectedEligibility(details: PatientPlanCohortIvfTaskDetails): Promise<void> {
    if (details.oocytesCollected > 0 && isNull(details.oocytesWarmed)) {
      StructuredLogger.info(
        activityLogs.IvfTasksFunctions.ValidateRequiredFieldsForSignOffDay,
        activityLogs.IvfTasksActions.ValidateDetailsPropsFailed,
        {
          message: `Detail props validation failed for oocytes: Oocyte collected: ${details.oocytesCollected}, Oocyte warmed: ${details.oocytesWarmed}`,
        },
      )
      this.throwValidationError()
    }
  }

  private throwValidationError(): void {
    throw new BadRequestException(
      this.i18nLocalizationService.translate(i18Messages.SIGN_OFF_VALIDATION_ERROR),
      ResponseStatusCodes.Failed,
    )
  }
  async validateSignOffEligibilityV2(taskGroupId: string): Promise<void> {
    const ivfTaskGroup = await this.patientPlanCohortIvfTaskGroupRepository.findOne({
      where: {
        uuid: taskGroupId,
      },
      relations: {
        patientPlanCohort: {
          patientPlan: true,
        },
      },
    })

    if (nonEditableStatuses.includes(ivfTaskGroup.patientPlanCohort.patientPlan?.ivfLabStatus)) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.EDIT_COHORT_NOT_ALLOWED),
        ResponseStatusCodes.Failed,
      )
    }
  }
  async getSignOff(group: PatientPlanCohortIvfTaskGroup): Promise<SignOff> {
    const isDone = !!group.signedOffDate
    const signedOffUser = group.signedOffById
      ? await this.staffRepository.findOneById(group.signedOffById)
      : null
    const initials = signedOffUser ? getInitials(signedOffUser) : null
    const signedOffDetails = getSignedOffDetailsV2(signedOffUser, group)

    return {
      isDone,
      initials,
      details: signedOffDetails,
    }
  }
  async validateTaskEditDate(ivfGroupDate: string): Promise<void> {
    const currentDate = this.dateTimeUtil.now()
    const taskDateParsed = this.dateTimeUtil.toDate(ivfGroupDate)

    if (this.dateTimeUtil.isAfter(taskDateParsed, currentDate)) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.IVF_TASK_DATE_IN_THE_FUTURE),
      )
    }
  }

  async getEggThawResponse(
    patientPlanCohortDetails: PatientPlanCohortIvfTaskDetails,
    patientPlanCohort: PatientPlanCohort,
  ): Promise<EggThawingResponse> {
    const eggs = await this.cryoSampleContainerRepository.findStrawForEggThaw(
      patientPlanCohort.patientPlan.patientId,
      patientPlanCohort.id,
    )
    const patientAllThawedEggs =
      await this.patientPlanCohortEggToThawRepository.findAllThawedEggsByPatientId(
        patientPlanCohort.patientPlan.patientId,
        CohortEggToThawType.EggThaw,
      )
    const eggFromOtherCohort = patientAllThawedEggs.filter(
      (thawedEgg) => thawedEgg.patientPlanCohortId !== patientPlanCohort.id,
    )

    return {
      numberOfEggsThawed: patientPlanCohort.patientPlan.detail.eggsToBeThawed ?? 0,
      eggsWarmed: patientPlanCohortDetails.eggsWarmed,
      eggsSurvived: patientPlanCohortDetails.eggsSurvived,
      mediaLotId: handleOptionalStringValues(patientPlanCohortDetails.eggThawMediaLot?.uuid),
      eggOptions: eggs
        .filter(
          (egg) => !eggFromOtherCohort.find((thawEgg) => thawEgg.cryoSampleContainerId === egg.id),
        )
        .map((egg, index) => {
          const [thawEggs] = egg.patientPlanCohortEggToThaws
          return {
            id: egg.uuid,
            title: `Straw ${index + 1} ${DefaultValue.LongDash} ${getCryoSampleContainerTitle(egg)}`,
            patientPlan: egg.cryoInventoryCard?.eggPatientPlan
              ? {
                  id: egg.cryoInventoryCard.eggPatientPlan.uuid,
                }
              : null,
            cryoCard: egg.cryoInventoryCard
              ? {
                  id: egg.cryoInventoryCard.uuid,
                }
              : null,
            dispositionId: thawEggs?.ivfDispositionReason?.uuid || null,
            isChecked: !!thawEggs,
            details: {
              freezeDate: egg.freezeDate,
              tankId: handleOptionalStringValues(egg.cryoCane?.cryoCan?.cryoTank?.uuid),
              canId: handleOptionalStringValues(egg.cryoCane?.cryoCan?.uuid),
              caneId: handleOptionalStringValues(egg.cryoCane?.uuid),
              freezeWitness: handleOptionalStringValues(egg.freezeWitness),
              comments: handleOptionalStringValues(egg.freezeComment),
              status: egg.status,
              eggCount: handleOptionalNumberValues(egg.eggCount),
              grade: null,
            },
          }
        }),
      thawTechId: handleOptionalStringValues(patientPlanCohortDetails.eggThawThawTech?.uuid),
    }
  }
  async getOocyteCollectionResponse(
    detail: PatientPlanCohortIvfTaskDetails,
    patientPlanCohort: PatientPlanCohort,
  ): Promise<OocytesCollectionResponse> {
    const eggs = await this.cryoSampleContainerRepository.findStrawForEggThaw(
      patientPlanCohort.patientPlan.patientId,
      patientPlanCohort.id,
    )

    const patientAllOocyteThawedEggs =
      await this.patientPlanCohortEggToThawRepository.findAllThawedEggsByPatientId(
        patientPlanCohort.patientPlan.patientId,
        CohortEggToThawType.OocyteCollection,
      )
    const eggFromOtherCohort = patientAllOocyteThawedEggs.filter(
      (thawedEgg) =>
        thawedEgg.patientPlanCohortId !== patientPlanCohort.id ||
        (thawedEgg.patientPlanCohortId !== patientPlanCohort.id &&
          thawedEgg.type === CohortEggToThawType.OocyteCollection),
    )

    return {
      oocytesCollected: detail.oocytesCollected,
      oocytesWarmed: detail.oocytesWarmed,
      oocytesSurvived: detail.oocytesSurvived,
      embryologistId: handleOptionalStringValues(detail.oocyteCollectionEmbryologist?.uuid),
      physicianId: handleOptionalStringValues(detail.oocyteCollectionPhysician?.uuid),
      isEditable: !detail.oocytesDisabled,
      eggOptions: eggs
        .filter(
          (egg) => !eggFromOtherCohort.find((thawEgg) => thawEgg.cryoSampleContainerId === egg.id),
        )
        .map((egg, index) => {
          const [thawEggs] = egg.patientPlanCohortEggToThaws
          return {
            id: egg.uuid,
            title: `Straw ${index + 1} ${DefaultValue.LongDash} ${getCryoSampleContainerTitle(egg)}`,
            patientPlan: egg.cryoInventoryCard?.eggPatientPlan
              ? {id: egg.cryoInventoryCard.eggPatientPlan.uuid}
              : null,
            cryoCard: egg.cryoInventoryCard ? {id: egg.cryoInventoryCard.uuid} : null,
            dispositionId: thawEggs?.ivfDispositionReason?.uuid || null,
            isChecked: !!thawEggs,
            details: {
              freezeDate: egg.freezeDate,
              tankId: handleOptionalStringValues(egg.cryoCane?.cryoCan?.cryoTank?.uuid),
              canId: handleOptionalStringValues(egg.cryoCane?.cryoCan?.uuid),
              caneId: handleOptionalStringValues(egg.cryoCane?.uuid),
              freezeWitness: handleOptionalStringValues(egg.freezeWitness),
              comments: handleOptionalStringValues(egg.freezeComment),
              status: egg.status,
              eggCount: handleOptionalNumberValues(egg.eggCount),
              grade: null,
            },
          }
        }),
    }
  }
  async getEmbryoIdByUUID(uuid: string): Promise<number> {
    return (
      await this.ivfTaskExpandedEmbryoRepository.findOne({
        where: {uuid},
      })
    )?.id
  }
}
