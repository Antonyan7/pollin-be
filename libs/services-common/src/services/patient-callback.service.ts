import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {Staff, Task} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  StaffRepository,
  TaskRepository,
} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {Injectable} from '@nestjs/common'
import {I18nLocalizationService} from './i18n-localization.service'
import {StaffAuditTrailService} from '@libs/audit-trail/services/staff-audit-trail.service'

import {
  STAFF_TASK_ASSIGNEE_NOT_FOUND,
  STAFF_USER_NOT_FOUND,
  CALLBACK_NOT_FOUND,
} from '@libs/common/i18n/en/message.json'
import {BadRequestException, BadRequestWarningException} from '../exceptions'
import {
  AutomatedTaskTitle,
  AutomatedTaskType,
  TaskPriority,
} from '@libs/data-layer/apps/clinic-tasks/enums'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {AuditUserAction} from '../enums'
import {handleError} from '../helpers/error-handling'
import {PatientCallbackRequestDTO, PatientCallbackResponseDTO} from '../dto/patient-callback.dto'
import {getPatientCallbackDTO} from '../helpers/patient-callback.helper'
import {
  PatientCallbackAction,
  PatientCallbackFunction,
} from '@libs/common/enums/active-logs/patient-callback'
import {CommonAction} from '@libs/common/enums'

export type PatientCallbackData = {
  assignee: Staff
  content: string
  dueDate: Date
  patientId: number
}
export enum PatientCallbackSourceType {
  PatientEncounter = 'PatientEncounter',
  PatientStaffNote = 'PatientStaffNote',
}

@Injectable()
export class PatientCallbackService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  // eslint-disable-next-line max-params
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly staffRepository: StaffRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly configService: NestprojectConfigService,
    private readonly staffAuditTrailService: StaffAuditTrailService,
  ) {}

  async validateAndReturnCallbackDetails(
    details: PatientCallbackRequestDTO,
    patientId: number,
  ): Promise<PatientCallbackData> {
    if (!details) {
      return null
    }

    const {assigneeId, content, date} = details
    const {month, year} = date

    StructuredLogger.info(
      PatientCallbackFunction.ValidateAndReturnCallbackDetails,
      CommonAction.GetRequestData,
      {month, year, assigneeUUID: assigneeId},
    )

    const assignee = await this.staffRepository.findOneByUUID(assigneeId)
    if (!assignee) {
      throw new BadRequestWarningException(
        this.i18nService.translate(STAFF_TASK_ASSIGNEE_NOT_FOUND),
      )
    }

    const dueDate = this.dateTimeUtil.tzTimeToUTC(
      this.dateTimeUtil.customDate(year, month, 1, 7, 0, 0),
    )

    return {assignee, content: content || '', dueDate, patientId}
  }

  async addCallback(
    source: {id: number; type: PatientCallbackSourceType},
    callbackDetails: PatientCallbackData,
    staff: Staff,
  ): Promise<Task> {
    try {
      if (!callbackDetails) {
        StructuredLogger.info(
          PatientCallbackFunction.AddCallback,
          PatientCallbackAction.SkipCallbackCreation,
          {id: source.id, type: source.type},
        )
        return
      }

      const {assignee, content, dueDate} = callbackDetails

      const taskType = AutomatedTaskType.PatientCallback

      const callbackTask = await this.taskRepository.save({
        title: AutomatedTaskTitle.get(taskType),
        assigneeId: assignee.id,
        creatorId: staff.id,
        dueDate,
        description: content,
        priority: TaskPriority.Medium,
        patientId: callbackDetails.patientId,
        automatedTaskType: taskType,

        [this.getSourceField(source.type)]: source.id,

        revisionId: generateRevisionId(this.dateTimeUtil.now()),
        updatedBy: staff.authUserId,
        updatedByStaffId: staff.id,
      })

      await this.staffAuditTrailService.addTaskAudit(callbackTask, AuditUserAction.Create, staff)

      StructuredLogger.info(PatientCallbackFunction.AddCallback, CommonAction.Success, {
        taskUUID: callbackTask.uuid,
      })

      return callbackTask
    } catch (error) {
      handleError(error, {
        functionName: PatientCallbackFunction.AddCallback,
        eventName: PatientCallbackAction.AddCallbackFailed,
      })
    }
  }

  async updateCallback(
    callbackTask: Task,
    details: PatientCallbackRequestDTO,
    authUserId: string,
  ): Promise<PatientCallbackResponseDTO> {
    try {
      if (!callbackTask) {
        throw new BadRequestException(this.i18nService.translate(CALLBACK_NOT_FOUND))
      }

      const [callbackData, staff] = await Promise.all([
        this.validateAndReturnCallbackDetails(details, callbackTask.patientId),
        this.staffRepository.findOneByAuthUserId(authUserId),
      ])

      if (!staff) {
        throw new BadRequestException(this.i18nService.translate(STAFF_USER_NOT_FOUND))
      }

      const {assignee, content, dueDate} = callbackData

      const payloadToUpdate: Partial<Task> = {
        assigneeId: assignee.id,
        description: content,

        revisionId: generateRevisionId(this.dateTimeUtil.now()),
        updatedBy: staff.authUserId,
        updatedByStaffId: staff.id,
      }

      if (
        dueDate.getMonth() !== callbackTask.dueDate?.getMonth() ||
        dueDate.getFullYear() !== callbackTask.dueDate?.getFullYear()
      ) {
        payloadToUpdate.dueDate = dueDate
      }

      await this.taskRepository.update(callbackTask.id, payloadToUpdate)

      const updatedTask = await this.taskRepository.findOneById(callbackTask.id)
      await this.staffAuditTrailService.addTaskAudit(updatedTask, AuditUserAction.Update, staff)

      StructuredLogger.info(PatientCallbackFunction.UpdateCallback, CommonAction.Success, {
        taskUUID: callbackTask.uuid,
      })

      return getPatientCallbackDTO(
        {dueDate: updatedTask.dueDate, content: updatedTask.description, assignee},
        this.dateTimeUtil,
      )
    } catch (error) {
      handleError(error, {
        functionName: PatientCallbackFunction.UpdateCallback,
        eventName: PatientCallbackAction.UpdateCallbackFailed,
      })
    }
  }

  private getSourceField(type: PatientCallbackSourceType): keyof Task {
    return new Map<PatientCallbackSourceType, keyof Task>([
      [PatientCallbackSourceType.PatientEncounter, 'patientEncounterId'],
      [PatientCallbackSourceType.PatientStaffNote, 'patientStaffNoteId'],
    ]).get(type)
  }
}
