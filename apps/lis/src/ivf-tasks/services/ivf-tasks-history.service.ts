import {
  callPatientHistoryChange,
  day3CheckHistoryChange,
  embryoGroupPhotoHistoryChanges,
  fertilizationCheckHistoryChange,
  filterEmptyHistoryUpdates,
  generateSingleHistoryItemUpdate,
  icsiInjectionhistoryChanges,
  injectionAssessmentHistoryChange,
  journeyWitnessHistoryChange,
  matureOocyteGroupPhotoHistoryChanges,
  miiDay1HistoryChange,
  oocytesInseminationHistoryChange,
  picsiHistoryChange,
  postStrippingHistoryChanges,
  spermWashHistoryChanges,
} from '@apps/lis/ivf-tasks/helper/ivf-tasks-history.helper'
import {
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskEmbryoGroupPhoto,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {Injectable} from '@nestjs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {IVFTaskType, IVFTaskTypeLabel} from '@libs/data-layer/apps/clinic-ivf/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  IvfTashHistoryUpdate,
  oocytesCollectionoHistoryChanges,
} from '../helper/ivf-tasks-history.helper'
import {
  DateTimeUtil,
  handleOptionalStringValues,
  NestprojectConfigService,
  StructuredLogger,
} from '@libs/common'
import {GetIVFTaskHistoryRequestDTO} from '../dto/ivf-tasks-history.dto'
import {IvfTaskHistoryRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/fireorm'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {PatientPlanCohortIvfTaskSummaryRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {BadRequestException} from '@libs/services-common/exceptions'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {getItemsDTO} from '@libs/common/helpers'
import {ProcessedStraws} from './freeze-oocyte.service'
import {ProcessedEmbryo} from './ivf-embryo.service'
import {GetHistoryResponseDTO, HistoryLineItemType} from '@libs/services-common/dto/history.dto'
import {HistoryLineItemText, HistoryTitleLabel} from '@libs/common/enums'
import {
  day567HistoryChange,
  freezingOocytesHistoryChange,
  getEmbryologistIds,
} from '../helper/ivf-tasks-day-567-history.helper'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {IVFTaskEntityTitle} from '@libs/services-common/enums'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {In} from 'typeorm'

export type NoteHistoryPayload = {
  from: string
  to: string
}

export type IvfTaskHistoryPayload = {
  taskDetails?: Partial<PatientPlanCohortIvfTaskDetails>
  cohortSpawned?: boolean
  day?: number
  groupPhotos?:
    | PatientPlanCohortIvfTaskEmbryoGroupPhoto[]
    | PatientPlanCohortIvfTaskEmbryoGroupPhoto[]
  processedStraws?: ProcessedStraws
  processedEmbryos?: ProcessedEmbryo[]
  propertyToUnit?: Map<keyof PatientPlanCohortIvfTaskDetails, string>
  note?: NoteHistoryPayload
  embryologistName?: string
}

@Injectable()
export class IvfTasksHistoryService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly configService: NestprojectConfigService,
    private readonly ivfTaskHistoryRepository: IvfTaskHistoryRepository,
    private readonly ivfTaskSummaryRepository: PatientPlanCohortIvfTaskSummaryRepository,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly staffRepository: StaffRepository,
  ) {}

  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  async getHistory(
    payload: GetIVFTaskHistoryRequestDTO,
  ): Promise<{data: GetHistoryResponseDTO; cursor: string}> {
    try {
      const {taskId, paginationCursor, sortByField, sortOrder} = payload

      const taskSummary = await this.ivfTaskSummaryRepository.findOneForHistoryByUUID(taskId)
      if (!taskSummary) {
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.IVF_TASK_SUMMARY_NOT_FOUND),
        )
      }

      const pageSize = this.configService.get<number>('IVF_TASK_HISTORY_PAGE_SIZE')

      const {items, nextCursor} = await this.ivfTaskHistoryRepository.getPaginatedHistory(
        {pageSize, sortByField, sortOrder},
        [{fieldName: 'sourceTaskSummaryId', value: taskSummary.id}],
        paginationCursor,
      )

      const taskType = taskSummary.IVFTaskToDay.task

      const patient = taskSummary.patientPlanCohort.patientPlan.patient
      return {
        data: {
          patient: {id: patient.uuid, fullName: getFullName(patient.firstName, patient.lastName)},
          title: HistoryTitleLabel.Task,
          lineItems: [
            {
              id: taskSummary.uuid,
              type: HistoryLineItemType.Text,
              entity: {
                name: HistoryLineItemText.Task,
                value: IVFTaskTypeLabel[taskType] ?? taskType,
              },
            },
            {
              id: patient.uuid,
              type: HistoryLineItemType.Patient,
              entity: {
                name: HistoryLineItemText.Patient,
                value: getFullName(patient.firstName, patient.lastName),
              },
            },
          ],
          historyItems: items.map((item) => ({
            id: item.id,
            entityTitle: handleOptionalStringValues(item.entityTitle),
            date: this.dateTimeUtil.formatUTCDateInRFC3339Tz(item.date.toDate()),
            changes: getItemsDTO(item.changes),
            editedBy: {
              fullName: handleOptionalStringValues(item.authUserFullName),
              userType: null,
            },
          })),
        },
        cursor: nextCursor,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.GetHistory,
        eventName: activityLogs.IvfTasksActions.GetHistoryFailed,
      })
    }
  }

  async saveHistory(
    summary: PatientPlanCohortIvfTaskSummary,
    savePayload: IvfTaskHistoryPayload,
    staff: Staff,
  ): Promise<void> {
    try {
      const rawHistoryUpdates = await this.generateHistoryUpdates(summary, savePayload)
      rawHistoryUpdates.push(
        generateSingleHistoryItemUpdate(savePayload.note?.from, savePayload.note?.to, {
          propertyName: IVFTaskEntityTitle.AdditionalNote,
        }),
      )

      const historyUpdates = filterEmptyHistoryUpdates(rawHistoryUpdates)
      if (!historyUpdates?.length) {
        return
      }

      await this.ivfTaskHistoryRepository.saveMultiple(
        historyUpdates.map(({entityTitle, changes, embryoId}) => ({
          id: null,
          authUserFullName: getFullName(staff.firstName, staff.lastName),
          authUserId: staff.authUserId,
          entityTitle,
          changes,
          sourceTaskSummaryId: summary.id,
          sourceTaskEmbryoId: embryoId,

          updatedBy: staff.authUserId,
          updatedByStaffId: staff.id,
        })),
      )
    } catch (error) {
      StructuredLogger.error(
        activityLogs.IvfTasksFunctions.SaveHistory,
        activityLogs.IvfTasksActions.SaveHistoryFailed,
        {taskName: summary?.IVFTaskToDay?.task, taskUUID: summary?.uuid, errMsg: error?.message},
      )
    }
  }

  private async getEmbryologists(savePayload: IvfTaskHistoryPayload): Promise<Staff[]> {
    return this.staffRepository.find({
      where: {
        id: In(getEmbryologistIds(savePayload)),
      },
    })
  }

  private async generateHistoryUpdates(
    summary: PatientPlanCohortIvfTaskSummary,
    savePayload: IvfTaskHistoryPayload,
  ): Promise<IvfTashHistoryUpdate[]> {
    const details = summary.patientPlanCohort?.patientPlanCohortIvfTaskDetails

    const taskType = summary.IVFTaskToDay.task
    let embryologists = null
    if ([IVFTaskType.Day5Check, IVFTaskType.Day6Check, IVFTaskType.Day7Check].includes(taskType)) {
      embryologists = await this.getEmbryologists(savePayload)
    }

    switch (taskType) {
      case IVFTaskType.InjectionAssessment:
        return injectionAssessmentHistoryChange(details, savePayload)
      case IVFTaskType.InseminationIVF:
        return oocytesInseminationHistoryChange(details, savePayload)
      case IVFTaskType.PICSI:
        return picsiHistoryChange(details, savePayload)
      case IVFTaskType.IcsiInjection:
        return icsiInjectionhistoryChanges(details, savePayload)
      case IVFTaskType.MiiDay1Cryo:
        return miiDay1HistoryChange(details, savePayload, this.dateTimeUtil)
      case IVFTaskType.Day3Check:
        return day3CheckHistoryChange(details, savePayload)
      case IVFTaskType.OocyteCollection:
        return oocytesCollectionoHistoryChanges(details, savePayload)
      case IVFTaskType.PostStripping:
        return postStrippingHistoryChanges(details, savePayload)
      case IVFTaskType.SpermWash:
        return spermWashHistoryChanges(details, savePayload)
      case IVFTaskType.MatureOocyteGroupPhoto:
        return matureOocyteGroupPhotoHistoryChanges(details, savePayload)
      case IVFTaskType.Day5Check:
        return day567HistoryChange(
          {details, savePayload, taskType, embryologists},
          this.dateTimeUtil,
        )
      case IVFTaskType.Day6Check:
        return day567HistoryChange(
          {details, savePayload, taskType, embryologists},
          this.dateTimeUtil,
        )
      case IVFTaskType.Day7Check:
        return day567HistoryChange(
          {details, savePayload, taskType, embryologists},
          this.dateTimeUtil,
        )
      case IVFTaskType.FertilizationCheck:
        const patientPlan = await this.patientPlanRepository.findOneForIVFWithSpermSourcesById(
          summary.patientPlanCohort.patientPlanId,
        )
        return fertilizationCheckHistoryChange(details, savePayload, patientPlan)
      case IVFTaskType.OocyteFreezing:
        return freezingOocytesHistoryChange(details, savePayload, this.dateTimeUtil)
      case IVFTaskType.EmbryoGroupPhoto:
        return embryoGroupPhotoHistoryChanges(details, savePayload)
      case IVFTaskType.CallThePatient:
        return callPatientHistoryChange(details, savePayload)
      case IVFTaskType.JourneyWitness:
        return journeyWitnessHistoryChange(details, savePayload)
      default:
        return []
    }
  }
}
