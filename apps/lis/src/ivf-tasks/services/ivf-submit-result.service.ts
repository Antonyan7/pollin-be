/* eslint-disable max-lines */
import {Injectable} from '@nestjs/common'
import {Equal, In, UpdateResult} from 'typeorm'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {isEqual} from 'lodash'
import {
  CryoCaneV2Repository,
  CryoCanV2Repository,
  CryoSampleContainerRepository,
  MediaLotRepository,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {
  EggThawRequest,
  FertilizationCheckRequest,
  FreezeEmbryoRequest,
  InjectionAssessmentRequest,
  MatureOocyteGroupPhotoRequest,
  MiiDay1CryoStraw,
  OocytesCollectionRequest,
  PostStrippingRequest,
  SpermWashRequest,
  SubmitTaskDetailsRequestDTO,
  TaskDetails,
  TaskIVF,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {
  Day3CheckRequest,
  Day5CheckRequest,
  Day7CheckRequest,
  DishInventoryRequest,
  DishRequest,
  ExpandedEmbryo,
  ExpandedEmbryoDetailsFreeze,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {
  IvfDishBarcodeRepository,
  IvfDishRepository,
  IVFDispositionReasonRepository,
  PatientPlanCohortCryoSampleContainersRepository,
  PatientPlanCohortEggToThawRepository,
  PatientPlanCohortIvfDishRepository,
  PatientPlanCohortIvfTaskDetailsRepository,
  PatientPlanCohortIvfTaskEmbryoGroupPhotoRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhotoRepository,
  PatientPlanCohortIvfTaskSummaryRepository,
  PatientPlanCohortRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {BadRequestException, BadRequestValidationException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {
  callPatientResponse,
  day3CheckResponse,
  embryoGroupPhotoResponse,
  getLastUpdateDetails,
  icsiInjectionResponse,
  injectionAssessmentResponse,
  inseminationIVFResponse,
  journeyWitnessResponse,
  matureOocyteGroupPhotoResponse,
  miiDay1CryoResponse,
  picsiResponse,
  postStrippingResponse,
  spermWashResponse,
  validateDay5CheckTask,
  validateDay7CheckTask,
  verifyHepBcHivResponse,
} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {
  CryoType,
  dashboardUpdateNeededTasks,
  DishOwner,
  IVFTaskType,
} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  IvfDish,
  IvfDishBarcode,
  IVFUnitOptionType,
  PatientPlanCohort,
  PatientPlanCohortIvfDish,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskEmbryoGroupPhoto,
  PatientPlanCohortIvfTaskGroup,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhoto,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PatientPlanAuditTrailService} from '@libs/audit-trail/services/patient-plan-audit-trail.service'
import {AuditUserAction, IvfEmbryoActions, IvfLabDayEnum} from '@libs/services-common/enums'
import {IvfTasksService} from '@apps/lis/ivf-tasks/services/ivf-tasks.service'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {PatientPlanSpermSourceRepository} from '@libs/data-layer/apps/plan/repositories/patient-plan-sperm-source.repository'
import {
  getCallPatientTaskDetailsUpdatePayload,
  getDay3CheckTaskDetailsUpdatePayload,
  getFertilizationCheckIcsiUpdatePayload,
  getFertilizationCheckIvfUpdatePayload,
  getFertilizationCheckPIcsiUpdatePayload,
  getGroupPhotosPayload,
  getIcsiInjectionIVFTaskDetailsUpdatePayload,
  getInjectionAssessmentTaskDetailsUpdatePayload,
  getInseminationIVFTaskDetailsUpdatePayload,
  getJourneyWitnessUpdatePayload,
  getMiiDay1CryoTaskDetailsUpdatePayload,
  getOocyteFreezingUpdatePayload,
  getOocyteGroupPhotosPayload,
  getOocytesCollectionUpdatePayload,
  getPICSIIVFTaskDetailsUpdatePayload,
  getPostStrippingUpdatePayload,
} from '@apps/lis/ivf-tasks/helper/generate-update-detail-payload.helper'
import {
  DateTimeUtil,
  handleNullableNumberValues,
  handleOptionalNumberValues,
  handleOptionalStringValues,
  NestprojectConfigService,
  StructuredLogger,
} from '@libs/common'
import {DocumentCategoryRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {DocumentCategoryPurpose} from '@libs/services-common/enums/document-category-types.enum'
import {IvfEmbryoService} from '@apps/lis/ivf-tasks/services/ivf-embryo.service'
import {EmbryoGroupPhotoRequest} from '@apps/lis/ivf-tasks/dto/ivf-task-embryo-group-photo.dto'
import {FreezeOocyteService} from '@apps/lis/ivf-tasks/services/freeze-oocyte.service'
import {IvfTaskDetailsResponse} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {IvfTaskHistoryPayload, IvfTasksHistoryService} from './ivf-tasks-history.service'
import {PatientDocumentType} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {FreezeEmbryosService} from '@apps/lis/ivf-tasks/services/freeze-embryos.service'
import {PatientDocumentService} from '@libs/services-common/services/patient-document.service'
import {plainToClass} from 'class-transformer'
import {validatePayload} from '@libs/common/helpers'
import {IvfUnitOptionRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/ivf-unit-option.repository'
import {IvfNoteService} from './ivf-note.service'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {RoleType} from '@libs/data-layer/apps/clinic-tasks/enums/role.enum'
import {getPatientsByDayDTO} from '@apps/lis/spawn-cohort/dto/spawn-cohort.dto'
import {DailyViewService} from '@apps/lis/daily-view/services/daily-view.service'
import {IvfTasksV2Service} from '@apps/lis/ivf-tasks/services/ivf-tasks-v2.service'
import {IvfDaysDTO} from '@apps/lis/daily-view/dto/daily-view.dto'
import {IvfDishService} from '@apps/lis/ivf-tasks/services/ivf-dish.service'
import {formalizeBarcodeWithPrefix} from '@apps/lis/double-witness/helper/barcode.helper'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {CryoInventoryCapacityService} from '@apps/lis/cryo-cards/services/cryo-inventory-capacity.service'
import {CatheterTypeRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/catheter-type.repository'
import {CohortEggToThawType} from '@libs/data-layer/apps/clinic-ivf/enums'

@Injectable()
export class IvfSubmitResultService {
  // eslint-disable-next-line max-params
  constructor(
    private staffRepository: StaffRepository,
    private readonly i18nLocalizationService: I18nLocalizationService,
    private readonly patientPlanCohortIvfTaskSummaryRepository: PatientPlanCohortIvfTaskSummaryRepository,
    private readonly patientPlanCohortIvfTaskGroupRepository: PatientPlanCohortIvfTaskGroupRepository,
    private readonly ivfTaskExpandedEmbryoRepository: PatientPlanCohortIvfTaskExpandedEmbryoRepository,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly patientPlanSpermSourceRepository: PatientPlanSpermSourceRepository,
    private readonly patientPlanCohortIvfTaskDetailsRepository: PatientPlanCohortIvfTaskDetailsRepository,
    private readonly patientPlanCohortIvfTaskMatureOocyteGroupPhotoRepository: PatientPlanCohortIvfTaskMatureOocyteGroupPhotoRepository,
    private readonly patientPlanCohortIvfTaskEmbryoGroupPhotoRepository: PatientPlanCohortIvfTaskEmbryoGroupPhotoRepository,
    private readonly patientPlanCohortCryoSampleContainersRepository: PatientPlanCohortCryoSampleContainersRepository,
    private readonly ivfTasksHistoryService: IvfTasksHistoryService,
    private readonly documentCategoryRepository: DocumentCategoryRepository,
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
    private readonly ivfUnitOptionRepository: IvfUnitOptionRepository,
    private readonly patientPlanAuditTrailService: PatientPlanAuditTrailService,
    private readonly ivfTasksService: IvfTasksService,
    private readonly ivfTasksV2Service: IvfTasksV2Service,
    private readonly patientDocumentService: PatientDocumentService,
    private readonly ivfEmbryoService: IvfEmbryoService,
    private readonly cryoCaneV2Repository: CryoCaneV2Repository,
    private readonly cryoCanV2Repository: CryoCanV2Repository,
    private readonly i18nService: I18nLocalizationService,
    private readonly freezeOocyteService: FreezeOocyteService,
    private readonly freezeEmbryosService: FreezeEmbryosService,
    private readonly configService: NestprojectConfigService,
    private readonly ivfNoteService: IvfNoteService,
    private readonly dailyViewService: DailyViewService,
    private readonly ivfDishBarcodeRepository: IvfDishBarcodeRepository,
    private readonly patientPlanCohortIvfDishRepository: PatientPlanCohortIvfDishRepository,
    private readonly ivfDishRepository: IvfDishRepository,
    private readonly ivfDishService: IvfDishService,
    private readonly patientPlanCohortEggToThawRepository: PatientPlanCohortEggToThawRepository,
    private readonly cryoSampleContainerRepository: CryoSampleContainerRepository,
    private readonly ivfDispositionReasonRepository: IVFDispositionReasonRepository,
    private readonly cryoInventoryCapacityService: CryoInventoryCapacityService,
    private readonly catheterTypeRepository: CatheterTypeRepository,
    private readonly mediaLotRepository: MediaLotRepository,
  ) {}

  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  validateInjectionAssessmentPayload(details: InjectionAssessmentRequest): void {
    const {oocyteAssessments} = details
    Object.values(oocyteAssessments).forEach((item) => {
      if (item.isEnabled === false && item.qualityRating !== null) {
        throw new BadRequestException(
          this.i18nLocalizationService.translate(i18Messages.IVF_TASK_SUBMIT_VALIDATION_ERROR),
          ResponseStatusCodes.BadRequest,
        )
      }
    })
  }

  async submitTaskDetails(
    bodyPayload: SubmitTaskDetailsRequestDTO,
    authUserId: string,
  ): Promise<TaskIVF> {
    try {
      const {details, id: summaryUUID, dashboardFilterDate, note} = bodyPayload
      const [summary, staff] = await Promise.all([
        this.patientPlanCohortIvfTaskSummaryRepository.findOneByUUIDForSubmitDetails(summaryUUID),
        this.staffRepository.findOneByAuthUserId(authUserId),
      ])

      if (!summary) {
        throw new BadRequestException(
          this.i18nLocalizationService.translate(i18Messages.IVF_TASK_SUMMARY_NOT_FOUND),
          ResponseStatusCodes.NotFound,
        )
      }
      const taskDate = summary.patientPlanCohortIvfTaskGroup.date
      await this.ivfTasksV2Service.validateTaskEditDate(taskDate)

      if (summary.patientPlanCohortIvfTaskGroup.signedOffDate) {
        await this.resetSignOffFields(summary.patientPlanCohortIvfTaskGroup)
      }

      const taskType = summary.IVFTaskToDay.task
      const patientPlanCohort = summary.patientPlanCohort

      const {patientNoteId, noteChange} = await this.ivfNoteService.upsertNote({
        summaryId: summary.id,
        patientId: patientPlanCohort.patientPlan.patientId,
        taskType,
        content: note,
        staff,
      })

      const historyPayload =
        (await this.saveTaskDetailsAndReturnPayload(summary, details, staff)) ?? {}
      historyPayload.note = noteChange

      await this.addUpdateAtSummary(summaryUUID, staff, patientNoteId)

      const newSummary =
        await this.patientPlanCohortIvfTaskSummaryRepository.findOneByUUIDForSubmitDetails(
          summaryUUID,
        )
      const [spawnedPatientPlanCohort, newDetail] = await Promise.all([
        this.patientPlanCohortRepository.findSpawnedCohortByOriginalCohortId(
          newSummary.patientPlanCohort.id,
        ),
        this.patientPlanCohortIvfTaskDetailsRepository.getByIdWithPhotos(
          newSummary.patientPlanCohort.patientPlanCohortIvfTaskDetails.id,
          newSummary.patientPlanCohortIvfTaskGroup.day,
        ),
      ])

      const disabledIvfTaskGroupIds = await this.checkDisabledStateDay6and7(
        summary,
        newSummary.patientPlanCohort.id,
        newDetail,
      )

      const [newDetails] = await Promise.all([
        this.getIvfTasksSubmitDetails({
          task: taskType,
          detail: newDetail,
          patientPlanId: newSummary.patientPlanCohort.patientPlanId,
          day: newSummary.patientPlanCohortIvfTaskGroup.day,
          cohortDate: newSummary.patientPlanCohort.cohortDate,
          patientPlanCohort: newSummary.patientPlanCohort,
          spawnedPatientPlanCohort: !!spawnedPatientPlanCohort,
        }),
        this.ivfTasksHistoryService.saveHistory(summary, historyPayload, staff),
      ])
      const dashboardDayUpdate = await this.getDashboardDayUpdateData(
        summary,
        patientPlanCohort.id,
        dashboardFilterDate,
      )

      return {
        id: newSummary.uuid,
        uiid: taskType,
        lastUpdateDetails: getLastUpdateDetails(newSummary, staff),
        details: newDetails,
        disabledIvfTaskGroupIds,
        dashboardDayUpdate,
        note: handleOptionalStringValues(newSummary.patientNote?.content),
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.SubmitTaskDetails,
        eventName: activityLogs.IvfTasksActions.SubmitTaskDetailsFailed,
      })
    }
  }

  private async getDashboardDayUpdateData(
    summary: PatientPlanCohortIvfTaskSummary,
    patientPlanCohortId: number,
    dashboardFilterDate?: string,
  ): Promise<IvfDaysDTO> {
    let dashboardDayUpdateData
    const dashboardDayUpdateNeeded = dashboardUpdateNeededTasks.includes(summary.IVFTaskToDay.task)
    if (!dashboardFilterDate) {
      return
    }

    if (dashboardDayUpdateNeeded) {
      const patientPlanCohortData =
        await this.patientPlanCohortRepository.findCohortDailyViewByOriginalCohortId(
          patientPlanCohortId,
        )

      const {ivfTaskGroups, currentDayActive} = this.dailyViewService.getTaskGroupsWithType(
        patientPlanCohortData,
        dashboardFilterDate,
      )

      dashboardDayUpdateData = getPatientsByDayDTO({
        patientPlanCohort: patientPlanCohortData,
        ivfTaskGroups,
        currentDayActive,
      })
    }

    return dashboardDayUpdateData
  }

  async resetSignOffFields(taskGroup: PatientPlanCohortIvfTaskGroup): Promise<void> {
    await this.patientPlanCohortIvfTaskGroupRepository.save({
      id: taskGroup.id,
      signedOffById: null,
      signedOffDate: null,
      signedOffBy: null,
    })
  }

  // eslint-disable-next-line max-lines-per-function
  private async saveTaskDetailsAndReturnPayload(
    summary: PatientPlanCohortIvfTaskSummary,
    payload: TaskDetails,
    staff: Staff,
  ): Promise<IvfTaskHistoryPayload> {
    const detail = summary.patientPlanCohort?.patientPlanCohortIvfTaskDetails
    const updatedBy = staff.authUserId

    switch (summary.IVFTaskToDay.task) {
      case IVFTaskType.InjectionAssessment:
        this.validateInjectionAssessmentPayload(payload)

        const detailsInjectionAssessment =
          await getInjectionAssessmentTaskDetailsUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsInjectionAssessment,
          },
        )
        return {taskDetails: detailsInjectionAssessment}
      case IVFTaskType.InseminationIVF:
        const detailsInseminationIVF = await getInseminationIVFTaskDetailsUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsInseminationIVF,
          },
        )
        return {taskDetails: detailsInseminationIVF}
      case IVFTaskType.PICSI:
        const detailsPICSI = await getPICSIIVFTaskDetailsUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {
            id: detail.id,
          },
          {
            updatedBy,
            ...detailsPICSI,
          },
        )
        return {taskDetails: detailsPICSI}
      case IVFTaskType.IcsiInjection:
        const detailsIcsiInjection = await getIcsiInjectionIVFTaskDetailsUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsIcsiInjection,
          },
        )
        return {taskDetails: detailsIcsiInjection}
      case IVFTaskType.MiiDay1Cryo:
        const detailsMiiDay1Cryo = await getMiiDay1CryoTaskDetailsUpdatePayload(payload)
        await this.checkStrawValidation(detailsMiiDay1Cryo.matureOocytesToCry, payload.straws)
        if (summary.patientPlanCohort.spawnedFromPatientPlanCohortId) {
          const originalPatientPlanCohort =
            await this.patientPlanCohortRepository.findOriginalCohortWithImmature(
              summary.patientPlanCohort.spawnedFromPatientPlanCohortId,
            )

          await this.checkOocyteDiscardedValidation(
            detail,
            payload,
            originalPatientPlanCohort.patientPlanCohortIvfTaskDetails.immatureOocytes,
          )
        } else {
          await this.checkOocyteDiscardedValidation(detail, payload)
        }

        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {updatedBy, ...detailsMiiDay1Cryo},
        )

        const processedMiiDay1CryoStraws = await this.freezeOocyteService.processOocytes({
          patientPlanCohort: summary.patientPlanCohort,
          oocyteStraws: payload.straws,
          authUserId: updatedBy,
          cryoType: CryoType.MiiDay1Cryo,
          summary: summary,
          staff: staff,
        })

        return {taskDetails: detailsMiiDay1Cryo, processedStraws: processedMiiDay1CryoStraws}
      case IVFTaskType.Day3Check:
        await this.checkDay3state(detail.id, payload)

        const detailsDay3Check = await getDay3CheckTaskDetailsUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsDay3Check,
          },
        )
        return {taskDetails: detailsDay3Check}
      case IVFTaskType.OocyteCollection:
        const embryologist = await this.getEmbryologist(payload.embryologistId)
        const physician = await this.staffRepository.findOneByUUID(payload.physicianId)
        const detailsOocyteCollection = await getOocytesCollectionUpdatePayload(
          payload,
          embryologist,
          physician,
        )
        await this.checkEditAbilityOocyteCollection(detail, payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsOocyteCollection,
          },
        )
        await this.saveOocytesToThaw(
          summary.patientPlanCohortId,
          payload,
          summary.patientPlanCohort.patientPlan.patientId,
        )
        return {
          taskDetails: detailsOocyteCollection,
          embryologistName: embryologist
            ? getFullName(embryologist.firstName, embryologist.lastName)
            : null,
        }
      case IVFTaskType.PostStripping:
        const detailsPostStripping = await getPostStrippingUpdatePayload(payload)
        await this.checkEditAbilityPostStripping(summary, detail, payload)

        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsPostStripping,
          },
        )
        return {taskDetails: detailsPostStripping}
      case IVFTaskType.SpermWash:
        const [detailsSpermWash, propertyToUnit] = await this.getSpermWashPayload(
          payload,
          summary,
          detail,
        )
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsSpermWash,
          },
        )
        return {taskDetails: detailsSpermWash, propertyToUnit}
      case IVFTaskType.MatureOocyteGroupPhoto:
        return {
          day: summary.patientPlanCohortIvfTaskGroup.day,
          groupPhotos: await this.saveOocytesGroupPhotos({
            taskDetails: detail,
            payload,
            staff,
            day: summary.patientPlanCohortIvfTaskGroup.day,
            patientId: summary.patientPlanCohort.patientPlan.patientId,
            patientPlanId: summary.patientPlanCohort.patientPlan.id,
          }),
        }
      case IVFTaskType.Day5Check:
        return await this.submitDay5CheckTaskDetails(summary, staff, payload)
      case IVFTaskType.Day6Check:
        return await this.submitDay6CheckTaskDetails(summary, staff, payload)
      case IVFTaskType.Day7Check:
        return await this.submitDay7CheckTaskDetails(summary, staff, payload)
      case IVFTaskType.DishInventory:
        return await this.submitDishInventoryTaskDetails(summary, payload)
      case IVFTaskType.PartnerDishInventory:
        return await this.submitPartnerDishInventoryTaskDetails(summary, payload)
      case IVFTaskType.FertilizationCheck:
        return await this.submitFertilizationCheck(detail.id, payload)
      case IVFTaskType.FrozenEmbryoTransfer:
        return await this.submitFrozenEmbryoTransfer(payload, summary)
      case IVFTaskType.OocyteFreezing:
        this.freezeOocyteService.validatePayload(payload, detail)

        const detailsOocyteFreezing = await getOocyteFreezingUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsOocyteFreezing,
          },
        )

        const processedStraws = await this.freezeOocyteService.processOocytes({
          patientPlanCohort: summary.patientPlanCohort,
          oocyteStraws: payload.straws,
          authUserId: updatedBy,
          cryoType: CryoType.OocyteFreezing,
          summary,
          staff,
        })
        return {taskDetails: detailsOocyteFreezing, processedStraws}
      case IVFTaskType.EmbryoGroupPhoto:
        return {
          day: summary.patientPlanCohortIvfTaskGroup.day,
          groupPhotos: await this.saveGroupPhotos({
            taskDetails: detail,
            payload,
            staff,
            day: summary.patientPlanCohortIvfTaskGroup.day,
            patientId: summary.patientPlanCohort.patientPlan.patientId,
            patientPlanId: summary.patientPlanCohort.patientPlan.id,
          }),
        }
      case IVFTaskType.CallThePatient:
        const detailsCallThePatient = await getCallPatientTaskDetailsUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          {
            updatedBy,
            ...detailsCallThePatient,
          },
        )
        return {taskDetails: detailsCallThePatient}
      case IVFTaskType.JourneyWitness:
        const detailsJourneyWitness = await getJourneyWitnessUpdatePayload(payload)
        await this.patientPlanCohortIvfTaskDetailsRepository.update(
          {id: detail.id},
          detailsJourneyWitness,
        )

        return {taskDetails: detailsJourneyWitness}
      case IVFTaskType.EggThaw:
        return this.submitEggThaw(summary, payload)
      default:
        return {}
    }
  }

  async submitEggThaw(
    summary: PatientPlanCohortIvfTaskSummary,
    payload: EggThawRequest,
  ): Promise<IvfTaskHistoryPayload> {
    const eggThawThawTech = await this.staffRepository.findOneByUUID(payload.thawTechId)
    const eggThawDetails: Partial<PatientPlanCohortIvfTaskDetails> = {
      eggsWarmed: payload.eggsWarmed,
      eggsSurvived: payload.eggsSurvived,
      eggThawThawTechId: eggThawThawTech.id,
    }

    const detail = summary.patientPlanCohort?.patientPlanCohortIvfTaskDetails

    if (payload.mediaLotId) {
      const mediaLot = await this.mediaLotRepository.getActiveMediaLotByUUID(payload.mediaLotId)
      eggThawDetails.eggThawMediaLotId = handleOptionalNumberValues(mediaLot?.id)
    }

    await this.patientPlanCohortIvfTaskDetailsRepository.update({id: detail.id}, eggThawDetails)

    await this.saveEggsToThaw(
      summary.patientPlanCohortId,
      payload,
      summary.patientPlanCohort.patientPlan.patientId,
    )

    return {taskDetails: eggThawDetails}
  }

  async submitFrozenEmbryoTransfer(
    payload: FreezeEmbryoRequest,
    summary: PatientPlanCohortIvfTaskSummary,
  ): Promise<IvfTaskHistoryPayload> {
    const [fetPhysician, fetCatheter, fetThawTech, transferTech] = await Promise.all([
      this.staffRepository.findOneByUUID(payload.physicianId),
      this.catheterTypeRepository.findOneByUUID(payload.catheterId),
      this.staffRepository.findOneByUUID(payload.thawTechId),
      this.staffRepository.findOneByUUID(payload.transferTechId),
    ])

    const taskDetails: Partial<PatientPlanCohortIvfTaskDetails> = {
      fetThawTechId: fetThawTech.id,
      fetTransferTechId: transferTech.id,
      numberOfEmbryosThawed: payload.numberOfEmbryosThawed,
      fetPhysicianId: fetPhysician.id,
      fetCatheterId: fetCatheter?.id,
    }

    const detail = summary.patientPlanCohort?.patientPlanCohortIvfTaskDetails
    await this.patientPlanCohortIvfTaskDetailsRepository.update({id: detail.id}, taskDetails)
    await this.freezeEmbryosService.saveFrozenEmbryos(
      summary.patientPlanCohortId,
      payload,
      summary.patientPlanCohort.patientPlan.patientId,
    )
    return {taskDetails}
  }
  async saveOocytesToThaw(
    patientPlanCohortId: number,
    payload: OocytesCollectionRequest,
    patientId: number,
  ): Promise<void> {
    const [selectedEggs, dispositions] = await Promise.all([
      this.cryoSampleContainerRepository.find({
        where: {uuid: In(payload.selectedEggs.map((egg) => egg.id))},
        relations: {
          cryoInventoryCard: true,
          cryoCane: {cryoCan: true},
        },
      }),
      this.ivfDispositionReasonRepository.find({
        where: {uuid: In(payload.selectedEggs.map((egg) => egg.dispositionId))},
      }),
    ])

    const dispositionMap = new Map()
    dispositions.forEach((disposition) => {
      dispositionMap.set(disposition.uuid, disposition)
    })

    if (selectedEggs.length) {
      await this.patientPlanCohortEggToThawRepository.save(
        selectedEggs.map((selectedEgg) => {
          const matchingRequestEgg = payload.selectedEggs.find((egg) => egg.id === selectedEgg.uuid)
          return {
            patientPlanCohortId,
            cryoSampleContainerId: selectedEgg.id,
            ivfDispositionReasonId: matchingRequestEgg
              ? dispositionMap.get(matchingRequestEgg.dispositionId)?.id || null
              : null,
            type: CohortEggToThawType.OocyteCollection,
          }
        }),
      )
    }

    await this.cryoSampleContainerRepository.update(
      {id: In(selectedEggs.map((straw) => straw.id))},
      {status: CryoStatus.Thawed},
    )

    await PubSubHelpers.publishPatientSampleUpdated(patientId)

    const tankIds = [...new Set(selectedEggs.map((egg) => egg.cryoCane?.cryoCan?.cryoTankId))]
    await this.cryoInventoryCapacityService.updateCapacity(tankIds)
  }

  async saveEggsToThaw(
    patientPlanCohortId: number,
    payload: EggThawRequest,
    patientId: number,
  ): Promise<void> {
    const selectedEggs = await this.cryoSampleContainerRepository.find({
      where: {uuid: In(payload.selectedEggs.map((egg) => egg.id))},
      relations: {
        cryoInventoryCard: true,
        cryoCane: {cryoCan: true},
      },
    })

    const dispositions = await this.ivfDispositionReasonRepository.find({
      where: {uuid: In(payload.selectedEggs.map((egg) => egg.dispositionId))},
    })
    const dispositionMap = new Map()
    dispositions.forEach((disposition) => {
      dispositionMap.set(disposition.uuid, disposition)
    })

    if (selectedEggs.length) {
      await this.patientPlanCohortEggToThawRepository.save(
        selectedEggs.map((selectedEgg) => {
          const matchingRequestEgg = payload.selectedEggs.find((egg) => egg.id === selectedEgg.uuid)
          return {
            patientPlanCohortId,
            cryoSampleContainerId: selectedEgg.id,
            ivfDispositionReasonId: matchingRequestEgg
              ? dispositionMap.get(matchingRequestEgg.dispositionId)?.id || null
              : null,
          }
        }),
      )
    }
    await this.cryoSampleContainerRepository.update(
      {id: In(selectedEggs.map((straw) => straw.id))},
      {status: CryoStatus.Thawed},
    )

    await PubSubHelpers.publishPatientSampleUpdated(patientId)

    const tankIds = [...new Set(selectedEggs.map((egg) => egg.cryoCane?.cryoCan?.cryoTankId))]
    await this.cryoInventoryCapacityService.updateCapacity(tankIds)
  }

  private async checkOocyteDiscardedValidation(
    detail: PatientPlanCohortIvfTaskDetails,
    payload: TaskDetails,
    immatureOocytesFromOriginal?: number,
  ): Promise<void> {
    const immatureOocytes = immatureOocytesFromOriginal || detail.immatureOocytes
    if (
      payload.oocytesDiscarded >
      payload.matureOocytesToCryo + immatureOocytes - payload.straws.length
    ) {
      throw new BadRequestException(
        this.i18nService.translate(
          i18Messages.CANNOT_DISCARD_MORE_OOCYTES_THAN_THE_TOTAL_AVAILABLE,
        ),
      )
    }
  }
  private async checkStrawValidation(
    matureOocytesToCry: number,
    straws: MiiDay1CryoStraw[],
  ): Promise<void> {
    if (straws.length > matureOocytesToCry) {
      throw new BadRequestException(
        this.i18nService.translate(
          i18Messages.CANNOT_CREATE_MORE_STRAWS_THAN_THE_NUMBER_OF_MATURE_OOCYTES_AVAILABLE,
        ),
      )
    }
  }
  private async checkEditAbilityPostStripping(
    summary: PatientPlanCohortIvfTaskSummary,
    detail: PatientPlanCohortIvfTaskDetails,
    payload: TaskDetails,
  ): Promise<void> {
    const summaryForValidation =
      await this.patientPlanCohortIvfTaskSummaryRepository.findOneByUUIDForValidation(summary.uuid)
    const taskDetailsDTO = this.postStrippingTaskDetail(detail)

    const spawnedCohortDailyView = await this.patientPlanCohortRepository.findAllByPatientPlanId(
      summaryForValidation.patientPlanCohort.patientPlanId,
    )

    if (spawnedCohortDailyView >= 2 && detail.immatureOocytes !== payload.immatureOocytes) {
      if (!isEqual(payload, taskDetailsDTO)) {
        throw new BadRequestException(
          this.i18nService.translate(
            i18Messages.COHORT_ALREADY_SPAWNED_IMMATURE_OOCYTES_UPDATE_FORBIDDEN,
          ),
        )
      }
    }
  }

  private postStrippingTaskDetail(details: PatientPlanCohortIvfTaskDetails): PostStrippingRequest {
    return {
      matureOocytes: details.matureOocytes,
      immatureOocytes: details.immatureOocytes,
      degenOocytes: details.degenOocytes,
      abnormalOocytes: details.abnormalOocytes,
    }
  }

  private async getEmbryologist(uuid: string): Promise<Staff> {
    const embryologist = uuid
      ? await this.staffRepository.findOneByUUIDAndRoleType(uuid, RoleType.Embryologist)
      : null

    if (uuid && !embryologist) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.EMBRYOLOGIST_NOT_FOUND))
    }

    return embryologist
  }

  private async checkEditAbilityOocyteCollection(
    details: PatientPlanCohortIvfTaskDetails,
    payload: TaskDetails,
  ): Promise<void> {
    if (
      details.oocytesDisabled &&
      (payload.oocytesWarmed !== details.oocytesWarmed ||
        payload.oocytesCollected !== details.oocytesCollected)
    ) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.YOU_CANNOT_EDIT_OOCYTE),
        ResponseStatusCodes.BadRequest,
      )
    }
    if (payload.oocytesWarmed === 0 && payload.selectedEggs.length > 0) {
      throw new BadRequestValidationException(
        this.i18nLocalizationService.translate(i18Messages.OOCYTES_WARMED_REQUIRED),
      )
    }
    if (details.oocytesWarmed > 0 && payload.oocytesWarmed === 0) {
      throw new BadRequestValidationException(
        this.i18nLocalizationService.translate(
          i18Messages.OOCYTES_WARMED_CANNOT_BE_CHANGED_TO_ZERO,
        ),
      )
    }
  }

  private async checkDay3state(detailId: number, payload: TaskDetails): Promise<void> {
    const taskDetails = await this.patientPlanCohortIvfTaskDetailsRepository.getById(detailId)
    const taskDetailsDTO = this.day3CheckTaskDetails(taskDetails)
    if (taskDetails.day3Disabled && !isEqual(payload, taskDetailsDTO)) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(
          i18Messages.YOU_CANNOT_EDIT_DAY_3_AFTER_EDITING_DAY_5,
        ),
        ResponseStatusCodes.BadRequest,
      )
    }
  }
  private day3CheckTaskDetails(details: PatientPlanCohortIvfTaskDetails): Day3CheckRequest {
    return {
      embryosMoreThan6Cells: details.day3EmbryosMoreThan6Cells,
      embryosLessThan6Cells: details.day3EmbryosLessThan6Cells,
      embryosArrested: details.day3EmbryosArrested,
      embryosAverageFrag: details.day3EmbryosAverageFrag,
      assistedHatching: details.day3AssistedHatching,
      freshTransfer: {
        enabled: details.day3FreshTransfer,
        embryosToTransfer: details.day3FreshTransfer ? details.day3EmbryosToTransfer : null,
        assistedHatching: details.day3FreshTransfer ? details.day3AssistedHatching : null,
      },
    }
  }

  async submitFertilizationCheck(
    detailId: number,
    payload: FertilizationCheckRequest,
  ): Promise<IvfTaskHistoryPayload> {
    const updateIVFData = await getFertilizationCheckIvfUpdatePayload(payload)
    const updateICSIData = await getFertilizationCheckIcsiUpdatePayload(payload)
    const updatePICSIData = await getFertilizationCheckPIcsiUpdatePayload(payload)

    const taskDetails = {...updateIVFData, ...updateICSIData, ...updatePICSIData}

    await this.patientPlanCohortIvfTaskDetailsRepository.update({id: detailId}, {...taskDetails})

    return {taskDetails}
  }

  addUpdateAtSummary(uuid: string, staff: Staff, patientNoteId: number): Promise<UpdateResult> {
    return this.patientPlanCohortIvfTaskSummaryRepository.update(
      {uuid},
      {
        patientNoteId,
        updatedBy: staff.authUserId,
        updatedByStaffId: staff.id,
        updatedByStaffAt: this.dateTimeUtil.now(),
      },
    )
  }

  async getSpermWashPayload(
    details: SpermWashRequest,
    summary: PatientPlanCohortIvfTaskSummary,
    detail: PatientPlanCohortIvfTaskDetails,
  ): Promise<
    [Partial<PatientPlanCohortIvfTaskDetails>, Map<keyof PatientPlanCohortIvfTaskDetails, string>]
  > {
    const oocyteCollectionTask = await this.patientPlanCohortIvfTaskGroupRepository.findOne({
      where: {
        uuid: Equal(summary.patientPlanCohortIvfTaskGroup.uuid),
        ivfTaskSummaries: {
          IVFTaskToDay: {
            task: IVFTaskType.OocyteCollection,
          },
        },
      },
      relations: {
        ivfTaskSummaries: {IVFTaskToDay: true},
      },
    })

    const hasOocyteCollectionTaskWithZeroCollected =
      detail.oocytesCollected === 0 && oocyteCollectionTask !== null

    await validatePayload(plainToClass(SpermWashRequest, details))

    const {initialConcentration, finalConcentration, initialMotility, finalMotility} = details

    const unitUUIDs = [
      ...new Set([initialConcentration.unitId, finalConcentration.unitId].filter((item) => item)),
    ]

    const unitOptions = unitUUIDs.length
      ? await this.ivfUnitOptionRepository.findByUUIDsAndType(
          unitUUIDs,
          IVFUnitOptionType.SpermWashConcentration,
        )
      : []
    if (unitOptions.length !== unitUUIDs.length && !hasOocyteCollectionTaskWithZeroCollected) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.IVF_UNIT_WAS_NOT_FOUND))
    }

    const unitUUIDToValue = new Map(unitOptions.map((option) => [option.uuid, option]))

    if (
      initialConcentration.value &&
      !initialConcentration.unitId &&
      !hasOocyteCollectionTaskWithZeroCollected
    ) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.IVF_UNIT_WAS_NOT_PASSED))
    }
    if (
      finalConcentration.value &&
      !finalConcentration.unitId &&
      !hasOocyteCollectionTaskWithZeroCollected
    ) {
      throw new BadRequestException(this.i18nService.translate(i18Messages.IVF_UNIT_WAS_NOT_PASSED))
    }

    return [
      {
        spermWashInitialMotility: handleNullableNumberValues(initialMotility),
        spermWashInitialConcentration: handleNullableNumberValues(initialConcentration.value),
        spermWashInitialConcentrationUnitId: handleNullableNumberValues(
          unitUUIDToValue.get(initialConcentration?.unitId)?.id,
        ),
        spermWashFinalMotility: handleNullableNumberValues(finalMotility),
        spermWashFinalConcentration: handleNullableNumberValues(finalConcentration.value),
        spermWashFinalConcentrationUnitId: handleNullableNumberValues(
          unitUUIDToValue.get(finalConcentration?.unitId)?.id,
        ),
      },
      new Map([
        [
          'spermWashInitialConcentrationUnit',
          unitUUIDToValue.get(initialConcentration?.unitId)?.title,
        ],
        ['spermWashFinalConcentrationUnit', unitUUIDToValue.get(finalConcentration?.unitId)?.title],
      ]),
    ]
  }

  async submitDay7CheckTaskDetails(
    summary: PatientPlanCohortIvfTaskSummary,
    staff: Staff,
    payload: Day7CheckRequest,
  ): Promise<IvfTaskHistoryPayload> {
    await validateDay7CheckTask(payload)
    await this.validateCryoDetails(payload.embryosExpanded)
    await this.validateExpandedEmbryoNumber(payload.embryosExpanded, summary.patientPlanCohortId)

    const detail = summary.patientPlanCohort?.patientPlanCohortIvfTaskDetails

    const embryosMaxCount = detail.day3EmbryosMoreThan6Cells + detail.day3EmbryosLessThan6Cells

    const day5AndDay6Embryos = await this.ivfTaskExpandedEmbryoRepository.getDay5AndDay6Embryos(
      summary.patientPlanCohortId,
    )

    if (
      day5AndDay6Embryos.length + payload.embryosDiscarded + payload.embryosExpanded?.length >
      embryosMaxCount
    ) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(
          i18Messages.SUM_OF_ARRESTED_AND_EXPANDED_EMBRYOS_MORE_THEN_EMBRYO_CELLS_COUNT,
        ),
        ResponseStatusCodes.BadRequest,
      )
    }

    const {embryosExpanded} = payload

    const taskDetails = {
      day3Disabled: true,
      day7Discarded: handleNullableNumberValues(payload.embryosDiscarded),
    }

    const [processedEmbryos] = await Promise.all([
      this.ivfEmbryoService.processEmbryoAndAttachments(embryosExpanded, summary, staff),
      this.patientPlanCohortIvfTaskDetailsRepository.update(
        {id: detail.id},
        {
          updatedBy: staff.authUserId,
          ...taskDetails,
        },
      ),
    ])

    return {taskDetails, processedEmbryos}
  }

  validateAlreadyUsedBarcode(
    dishes: DishRequest[],
    patientPlanCohortIvfDishes: PatientPlanCohortIvfDish[],
    dishOwner: DishOwner,
  ): boolean {
    const dishUuids = dishes.map((dish) => dish.dish.id)
    for (const patientPlanCohortIvfDish of patientPlanCohortIvfDishes) {
      if (
        !dishUuids.includes(patientPlanCohortIvfDish.ivfDish.uuid) ||
        patientPlanCohortIvfDish.ivfDish.dishOwner !== dishOwner
      ) {
        return false
      }
    }
    return true
  }

  async validatePatientBarcodes(
    dishes: DishRequest[],
    patientPlanCohortId: number,
  ): Promise<IvfDishBarcode[]> {
    const barcodes = await this.ivfDishBarcodeRepository.find({
      where: {
        value: In(dishes.map((dish) => formalizeBarcodeWithPrefix(dish.barcode.value))),
        patientPlanCohortId,
      },
    })

    if (barcodes.length < dishes.filter((dish) => dish.barcode.value).length) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.IVF_DISH_BARCODE_NOT_FOUND),
        ResponseStatusCodes.NotFound,
      )
    }

    const patientPlanCohortIvfDishes = await this.patientPlanCohortIvfDishRepository.find({
      where: {
        ivfDishBarcodeId: In(barcodes.map((barcode) => barcode.id)),
      },
      relations: {ivfDish: true},
    })

    if (!this.validateAlreadyUsedBarcode(dishes, patientPlanCohortIvfDishes, DishOwner.Patient)) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.IVF_DISH_BARCODE_ALREADY_USED),
        ResponseStatusCodes.NotFound,
      )
    }

    return barcodes
  }

  async validatePartnerBarcodes(
    dishes: DishRequest[],
    patientPlanCohortId: number,
  ): Promise<IvfDishBarcode[]> {
    const barcodes = await this.ivfDishBarcodeRepository.find({
      where: {
        value: In(dishes.map((dish) => formalizeBarcodeWithPrefix(dish.barcode.value))),
        patientPlanCohortId,
      },
    })

    if (barcodes.length < dishes.filter((dish) => dish.barcode.value).length) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.IVF_DISH_BARCODE_NOT_FOUND),
        ResponseStatusCodes.NotFound,
      )
    }

    const patientPlanCohortIvfDishes = await this.patientPlanCohortIvfDishRepository.find({
      where: {
        ivfDishBarcodeId: In(barcodes.map((barcode) => barcode.id)),
      },
      relations: {ivfDish: true},
    })
    if (
      !this.validateAlreadyUsedBarcode(dishes, patientPlanCohortIvfDishes, DishOwner.PatientPartner)
    ) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.IVF_DISH_BARCODE_ALREADY_USED),
        ResponseStatusCodes.NotFound,
      )
    }

    return barcodes
  }

  async validateDishes(dishes: DishRequest[], dishOwner: DishOwner): Promise<IvfDish[]> {
    const ivfDishes = await this.ivfDishRepository.find({
      where: {uuid: In(dishes.map((dish) => dish.dish.id)), dishOwner},
    })
    if (ivfDishes.length < dishes.length) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.IVF_DISH_NOT_FOUND),
        ResponseStatusCodes.NotFound,
      )
    }
    return ivfDishes
  }

  validateSubmitDishInventoryTaskDetailsDishes(dishes: DishRequest[]): void {
    const barcodes = dishes
      .filter((dish) => dish.barcode.value)
      .map((dish) => formalizeBarcodeWithPrefix(dish.barcode.value))
    if (barcodes.length > new Set(barcodes).size) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.SAME_BARCODE_APPLIED_TO_MULTIPLE_DISHES),
      )
    }
  }

  async submitDishInventoryTaskDetails(
    summary: PatientPlanCohortIvfTaskSummary,
    payload: DishInventoryRequest,
  ): Promise<IvfTaskHistoryPayload> {
    const {dishes} = payload
    this.validateSubmitDishInventoryTaskDetailsDishes(dishes)
    const barcodes = await this.validatePatientBarcodes(dishes, summary.patientPlanCohortId)
    const ivfDishes = await this.validateDishes(dishes, DishOwner.Patient)
    await this.ivfDishService.addBarcodeToDish({
      dishes,
      barcodes,
      ivfDishes,
      patientPlanCohortId: summary.patientPlanCohortId,
    })
    return {}
  }

  async submitPartnerDishInventoryTaskDetails(
    summary: PatientPlanCohortIvfTaskSummary,
    payload: DishInventoryRequest,
  ): Promise<IvfTaskHistoryPayload> {
    const {dishes} = payload
    this.validateSubmitDishInventoryTaskDetailsDishes(dishes)
    const barcodes = await this.validatePartnerBarcodes(dishes, summary.patientPlanCohortId)
    const ivfDishes = await this.validateDishes(dishes, DishOwner.PatientPartner)
    await this.ivfDishService.addBarcodeToDish({
      dishes,
      barcodes,
      ivfDishes,
      patientPlanCohortId: summary.patientPlanCohortId,
    })
    return {}
  }

  async validateExpandedEmbryoNumber(
    expandedEmbryos: ExpandedEmbryo[],
    patientPlanCohortId: number,
  ): Promise<void> {
    const lastEmbryoNumber = await this.ivfTaskExpandedEmbryoRepository.maximum('embryoNumber', {
      patientPlanCohortId,
    })

    const payloadExpandedEmbryoNumbers = expandedEmbryos
      .filter((expandedEmbryo) => !expandedEmbryo.id)
      .map(({embryoNumber}) => embryoNumber)

    if (!payloadExpandedEmbryoNumbers.length) {
      return
    }
    const orderedEmbryoNumbers = new Set(payloadExpandedEmbryoNumbers.map((a, i) => a - i))

    if (
      orderedEmbryoNumbers.size > 1 ||
      orderedEmbryoNumbers.values().next().value !== lastEmbryoNumber + 1
    ) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(i18Messages.WRONG_EMBRYO_NUMBERING),
      )
    }
  }

  async submitDay6CheckTaskDetails(
    summary: PatientPlanCohortIvfTaskSummary,
    staff: Staff,
    payload: Day5CheckRequest,
  ): Promise<IvfTaskHistoryPayload> {
    const detail = summary.patientPlanCohort?.patientPlanCohortIvfTaskDetails
    await validateDay5CheckTask(payload)
    await this.validateCryoDetails(payload.embryosExpanded)
    await this.validateExpandedEmbryoNumber(payload.embryosExpanded, summary.patientPlanCohortId)

    const embryosMaxCount = detail.day3EmbryosMoreThan6Cells + detail.day3EmbryosLessThan6Cells

    const day5Embryos = await this.ivfTaskExpandedEmbryoRepository.getDay5Embryos(
      summary.patientPlanCohortId,
    )

    if (
      day5Embryos.length + payload.embryosArrested + payload.embryosExpanded?.length >
      embryosMaxCount
    ) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(
          i18Messages.SUM_OF_ARRESTED_AND_EXPANDED_EMBRYOS_MORE_THEN_EMBRYO_CELLS_COUNT,
        ),
        ResponseStatusCodes.BadRequest,
      )
    }

    const {embryosExpanded} = payload

    const taskDetails = {
      day3Disabled: true,
      day6Arrested: handleNullableNumberValues(payload.embryosArrested),
    }

    const [processedEmbryos] = await Promise.all([
      this.ivfEmbryoService.processEmbryoAndAttachments(embryosExpanded, summary, staff),
      this.patientPlanCohortIvfTaskDetailsRepository.update(
        {id: detail.id},
        {
          updatedBy: staff.authUserId,
          ...taskDetails,
        },
      ),
    ])

    return {
      taskDetails,
      processedEmbryos,
    }
  }

  async submitDay5CheckTaskDetails(
    summary: PatientPlanCohortIvfTaskSummary,
    staff: Staff,
    payload: Day5CheckRequest,
  ): Promise<IvfTaskHistoryPayload> {
    const detail = summary.patientPlanCohort?.patientPlanCohortIvfTaskDetails

    await this.validateDay5CheckTaskPayload(payload, detail)
    await this.validateExpandedEmbryoNumber(payload.embryosExpanded, summary.patientPlanCohortId)

    const {embryosExpanded} = payload

    const taskDetails = {
      day3Disabled: true,
      day5Arrested: handleNullableNumberValues(payload.embryosArrested),
    }
    const [processedEmbryos] = await Promise.all([
      this.ivfEmbryoService.processEmbryoAndAttachments(embryosExpanded, summary, staff),
      this.patientPlanCohortIvfTaskDetailsRepository.update(
        {id: detail.id},
        {
          updatedBy: staff.authUserId,
          ...taskDetails,
        },
      ),
    ])

    return {taskDetails, day: summary.patientPlanCohortIvfTaskGroup.day, processedEmbryos}
  }

  async validateDay5CheckTaskPayload(
    payload: Day5CheckRequest,
    detail: PatientPlanCohortIvfTaskDetails,
  ): Promise<void> {
    await validateDay5CheckTask(payload)
    await this.validateCryoDetails(payload.embryosExpanded)
    const embryosMaxCount = detail.day3EmbryosMoreThan6Cells + detail.day3EmbryosLessThan6Cells

    if (payload.embryosArrested + payload.embryosExpanded.length > embryosMaxCount) {
      throw new BadRequestException(
        this.i18nLocalizationService.translate(
          i18Messages.SUM_OF_ARRESTED_AND_EXPANDED_EMBRYOS_MORE_THEN_EMBRYO_CELLS_COUNT,
        ),
        ResponseStatusCodes.BadRequest,
      )
    }
  }

  private async checkDisabledStateDay6and7(
    summary: PatientPlanCohortIvfTaskSummary,
    patientPlanCohortId: number,
    detail: PatientPlanCohortIvfTaskDetails,
  ): Promise<string[]> {
    const dashboardDayUpdateNeeded = dashboardUpdateNeededTasks.includes(summary.IVFTaskToDay.task)
    if (!dashboardDayUpdateNeeded) {
      return []
    }
    const disabledGroupsDays = []
    const embryosMaxCount = detail.day3EmbryosMoreThan6Cells + detail.day3EmbryosLessThan6Cells

    const cohortEmbryos =
      await this.ivfTaskExpandedEmbryoRepository.getAllDayEmbryos(patientPlanCohortId)

    const usedEmbryoCount =
      cohortEmbryos.length + detail.day5Arrested + detail.day6Arrested + detail.day7Discarded

    let day6Value = null
    let day7Value = null
    if (usedEmbryoCount >= embryosMaxCount) {
      if (!detail.day6Arrested && !cohortEmbryos.filter((embryo) => embryo.day === 6).length) {
        day6Value = this.dateTimeUtil.now()
        disabledGroupsDays.push(IvfLabDayEnum.DaySix)
      }
      if (!detail.day7Discarded && !cohortEmbryos.filter((embryo) => embryo.day === 7).length) {
        day7Value = this.dateTimeUtil.now()
        disabledGroupsDays.push(IvfLabDayEnum.DaySeven)
      }
    }
    await Promise.all([
      this.patientPlanCohortIvfTaskSummaryRepository.updateDisabledAtByTask(
        patientPlanCohortId,
        IVFTaskType.Day6Check,
        day6Value,
      ),
      this.patientPlanCohortIvfTaskSummaryRepository.updateDisabledAtByTask(
        patientPlanCohortId,
        IVFTaskType.Day7Check,
        day7Value,
      ),
    ])

    if (disabledGroupsDays.length) {
      const disabledGroups = await this.patientPlanCohortIvfTaskGroupRepository.findByDays(
        patientPlanCohortId,
        disabledGroupsDays,
      )
      return disabledGroups.map((disabledGroup) => disabledGroup.uuid)
    }
    return []
  }

  async validateCryoDetails(embryosExpanded: ExpandedEmbryo[]): Promise<void[]> {
    return Promise.all(
      embryosExpanded.map(async (embryo) => {
        if (embryo.actionType === IvfEmbryoActions.Freeze) {
          const embryoDetails = embryo.details as ExpandedEmbryoDetailsFreeze
          if (!embryoDetails.caneId) {
            return
          }
          if (!embryoDetails.canId) {
            return
          }
          const canV2 = await this.cryoCanV2Repository.findOneBy({uuid: Equal(embryoDetails.canId)})
          if (!canV2) {
            throw new BadRequestException(
              this.i18nService.translate(i18Messages.CRYO_CAN_V2_NOT_FOUND),
            )
          }
          const caneV2 = await this.cryoCaneV2Repository.findOneBy({
            uuid: Equal(embryoDetails.caneId),
          })
          if (!caneV2) {
            throw new BadRequestException(
              this.i18nService.translate(i18Messages.CRYO_CANE_V2_NOT_FOUND),
            )
          }
        }
      }),
    )
  }

  private async saveOocytesGroupPhotos(data: {
    taskDetails: PatientPlanCohortIvfTaskDetails
    payload: MatureOocyteGroupPhotoRequest
    staff: Staff
    day: number
    patientId: number
    patientPlanId: number
  }): Promise<PatientPlanCohortIvfTaskMatureOocyteGroupPhoto[]> {
    const {taskDetails, payload, staff, day, patientId, patientPlanId} = data
    const newGroupPhotos = await getOocyteGroupPhotosPayload({
      cohortDetails: taskDetails,
      payload,
      staff,
      day,
    })

    const savedGroupPhotos =
      await this.patientPlanCohortIvfTaskMatureOocyteGroupPhotoRepository.save(newGroupPhotos)

    const documentCategory = await this.documentCategoryRepository.findOneBy({
      purpose: DocumentCategoryPurpose.MatureOocyteGroupPhoto,
      type: PatientDocumentType.PatientPlan,
    })

    if (documentCategory) {
      const originalFileNameMap = new Map<string, string>(
        payload.matureOocyteGroupPhotos.map((photo) => [photo.url, photo.originalFileName]),
      )
      await Promise.all(
        newGroupPhotos.map((newGroupPhoto) =>
          this.patientDocumentService.createPatientDocument(
            {
              categoryId: documentCategory.id,
              name: newGroupPhoto.title,
              url: newGroupPhoto.photoPath,
              patientId,
              patientPlanId,
              type: PatientDocumentType.PatientPlan,
              categoryType: documentCategory.type,
              originalFileName: originalFileNameMap.get(newGroupPhoto.photoPath),
            },
            staff,
          ),
        ),
      )
    } else {
      StructuredLogger.warn(
        activityLogs.IvfPatientsHelperFunctions.SaveOocytesGroupPhotos,
        activityLogs.IvfPatientsHelperActions.NoDocumentCategory,
        {message: `You don't have active category for Mature Oocyte Group photos`},
      )
    }

    await this.patientPlanAuditTrailService.addPatientPlanMatureOocytesPhotosAudit(
      savedGroupPhotos,
      AuditUserAction.Create,
      staff,
    )

    return savedGroupPhotos
  }

  private async saveGroupPhotos(data: {
    taskDetails: PatientPlanCohortIvfTaskDetails
    payload: EmbryoGroupPhotoRequest
    staff: Staff
    day: number
    patientId: number
    patientPlanId: number
  }): Promise<PatientPlanCohortIvfTaskEmbryoGroupPhoto[]> {
    const {taskDetails, payload, staff, day, patientId, patientPlanId} = data

    const newGroupPhotos = await getGroupPhotosPayload({
      cohortDetails: taskDetails,
      payload,
      staff,
      day,
    })

    const savedGroupPhotos =
      await this.patientPlanCohortIvfTaskEmbryoGroupPhotoRepository.save(newGroupPhotos)

    const documentCategory = await this.documentCategoryRepository.findOneBy({
      purpose: DocumentCategoryPurpose.EmbryoGroupPhoto,
      type: PatientDocumentType.PatientPlan,
    })

    if (documentCategory) {
      const originalFileNameMap = new Map<string, string>(
        payload.embryoGroupPhotos.map((photo) => [photo.url, photo.originalFileName]),
      )

      await Promise.all(
        newGroupPhotos.map((newGroupPhoto) =>
          this.patientDocumentService.createPatientDocument(
            {
              categoryId: documentCategory.id,
              name: newGroupPhoto.title,
              url: newGroupPhoto.photoPath,
              patientId,
              patientPlanId,
              type: PatientDocumentType.PatientPlan,
              categoryType: documentCategory.type,
              originalFileName: originalFileNameMap.get(newGroupPhoto.photoPath),
            },
            staff,
          ),
        ),
      )
    } else {
      StructuredLogger.warn(
        activityLogs.IvfPatientsHelperFunctions.SaveOocytesGroupPhotos,
        activityLogs.IvfPatientsHelperActions.NoDocumentCategory,
        {message: `You don't have active category for Mature Oocyte Group photos`},
      )
    }

    await this.patientPlanAuditTrailService.addPatientPlanMatureOocytesPhotosAudit(
      savedGroupPhotos,
      AuditUserAction.Create,
      staff,
    )

    return savedGroupPhotos
  }

  // eslint-disable-next-line max-lines-per-function
  private async getIvfTasksSubmitDetails(data: {
    task: IVFTaskType
    detail: PatientPlanCohortIvfTaskDetails
    patientPlanCohort: PatientPlanCohort
    patientPlanId: number
    day: number
    cohortDate: string
    spawnedPatientPlanCohort: boolean
  }): Promise<IvfTaskDetailsResponse> {
    const {
      task,
      detail,
      patientPlanId,
      day,
      cohortDate,
      spawnedPatientPlanCohort,
      patientPlanCohort,
    } = data

    switch (task) {
      case IVFTaskType.InjectionAssessment:
        return injectionAssessmentResponse(detail)
      case IVFTaskType.InseminationIVF:
        return inseminationIVFResponse(
          detail,
          await this.patientPlanRepository.findOneForIVFById(patientPlanId),
        )
      case IVFTaskType.PICSI:
        return picsiResponse(
          detail,
          await this.patientPlanSpermSourceRepository.findForIVFByPatientPlanId(patientPlanId),
        )
      case IVFTaskType.IcsiInjection:
        return icsiInjectionResponse(
          detail,
          await this.patientPlanRepository.findOneForIVFWithSpermSourcesById(patientPlanId),
        )
      case IVFTaskType.MiiDay1Cryo:
        const [existingOocytes, lastStrawNumber] = await Promise.all([
          this.patientPlanCohortCryoSampleContainersRepository.getByPatientPlanCohortIdWithCryoSamleContainer(
            patientPlanCohort.id,
            CryoType.MiiDay1Cryo,
          ),
          this.cryoSampleContainerRepository.maximum('strawNumber', {
            cryoInventoryCard: {eggPatientPlan: {id: Equal(patientPlanCohort.patientPlanId)}},
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
            immatureOocytes:
              originalPatientPlanCohort.patientPlanCohortIvfTaskDetails.immatureOocytes,
          })
        }
        return miiDay1CryoResponse({detail, existingOocytes, lastStrawNumber})
      case IVFTaskType.VerifyHepBcHiv:
        return verifyHepBcHivResponse(
          await this.patientPlanRepository.findOneForIVFHepBcHivById(patientPlanId),
        )
      case IVFTaskType.Day3Check:
        return day3CheckResponse(detail)
      case IVFTaskType.OocyteCollection:
        return this.ivfTasksV2Service.getOocyteCollectionResponse(detail, patientPlanCohort)
      case IVFTaskType.PostStripping:
        return postStrippingResponse(detail, cohortDate, spawnedPatientPlanCohort)
      case IVFTaskType.SpermWash:
        const unitOptions = await this.ivfUnitOptionRepository.findByType(
          IVFUnitOptionType.SpermWashConcentration,
        )
        return spermWashResponse(detail, unitOptions)
      case IVFTaskType.MatureOocyteGroupPhoto:
        return await matureOocyteGroupPhotoResponse(detail)
      case IVFTaskType.EmbryoGroupPhoto:
        return await embryoGroupPhotoResponse(detail)
      case IVFTaskType.Day5Check:
        return this.ivfTasksService.day5CheckResponse(detail, day)
      case IVFTaskType.Day6Check:
        return this.ivfTasksService.day6CheckResponse(detail, day)
      case IVFTaskType.Day7Check:
        return this.ivfTasksService.day7CheckResponse(detail, day)
      case IVFTaskType.DishInventory:
        return this.ivfDishService.dishInventoryResponse(patientPlanCohort.id)
      case IVFTaskType.PartnerDishInventory:
        return this.ivfDishService.partnerDishInventoryResponse(patientPlanCohort.id)
      case IVFTaskType.FertilizationCheck:
        return this.ivfTasksService.getFertilizationCheckResponse(
          detail,
          await this.patientPlanRepository.findOneForIVFWithSpermSourcesById(patientPlanId),
        )
      case IVFTaskType.OocyteFreezing:
        return this.freezeOocyteService.getResponse(detail, patientPlanCohort)
      case IVFTaskType.FrozenEmbryoTransfer:
        return this.freezeEmbryosService.getResponse(
          await this.patientPlanRepository.findOneForIVFWithUterusById(patientPlanId),
          detail,
        )
      case IVFTaskType.CallThePatient:
        return callPatientResponse(detail)
      case IVFTaskType.JourneyWitness:
        return journeyWitnessResponse(detail)
      case IVFTaskType.EggThaw:
        return this.ivfTasksV2Service.getEggThawResponse(detail, patientPlanCohort)
      case IVFTaskType.PIDLabel:
        return this.ivfTasksService.getPidLabelResponse(
          await this.patientPlanRepository.findOneForPIDLabelById(patientPlanId),
        )
    }
  }
}
