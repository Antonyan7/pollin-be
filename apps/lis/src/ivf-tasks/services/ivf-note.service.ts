import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PatientNoteRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {Injectable} from '@nestjs/common'
import {Equal} from 'typeorm'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {
  DateTimeUtil,
  handleOptionalStringValues,
  NestprojectConfigService,
  StructuredLogger,
} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {PatientPlanAuditTrailService} from '@libs/audit-trail/services/patient-plan-audit-trail.service'
import {AuditUserAction, IVFTaskToPatientNoteMapper} from '@libs/services-common/enums'
import {BadRequestException} from '@libs/services-common/exceptions'
import {NoteHistoryPayload} from '@apps/lis/ivf-tasks/services/ivf-tasks-history.service'

@Injectable()
export class IvfNoteService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly patientNoteRepository: PatientNoteRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly configService: NestprojectConfigService,
    private readonly patientPlanAuditTrailService: PatientPlanAuditTrailService,
  ) {}

  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  async upsertNote(data: {
    summaryId: number
    taskType: IVFTaskType
    content: string
    patientId: number
    staff: Staff
  }): Promise<{patientNoteId: number; noteChange?: NoteHistoryPayload}> {
    const {summaryId, taskType, content, patientId, staff} = data

    const noteType = IVFTaskToPatientNoteMapper[taskType]
    if (!noteType && content) {
      StructuredLogger.warn(
        activityLogs.IvfTasksFunctions.UpsertNote,
        activityLogs.IvfTasksActions.UnsupportedNoteTaskType,
        {taskName: taskType},
      )
      throw new BadRequestException(
        this.i18nService.translate(i18Messages.NOTES_ARE_NOT_SUPPORTED_FOR_THIS_TASK),
      )
    }

    const oldNote = await this.patientNoteRepository.findOneBy({
      patientPlanCohortIvfTaskSummary: {id: Equal(summaryId)},
      patientId: Equal(patientId),
      type: Equal(noteType),
    })

    if (!oldNote && !content) {
      StructuredLogger.info(
        activityLogs.IvfTasksFunctions.UpsertNote,
        activityLogs.IvfTasksActions.NoNeedInNoteCreation,
        {summaryId},
      )
      return {patientNoteId: null}
    }

    if (handleOptionalStringValues(content) === handleOptionalStringValues(oldNote?.content)) {
      StructuredLogger.info(
        activityLogs.IvfTasksFunctions.UpsertNote,
        activityLogs.IvfTasksActions.NoteWasNotChanged,
        {summaryId, patientNotesIds: [oldNote?.id]},
      )
      return {patientNoteId: oldNote?.id}
    }

    if (oldNote && (oldNote.type !== noteType || oldNote.patientId !== patientId)) {
      StructuredLogger.error(
        activityLogs.IvfTasksFunctions.UpsertNote,
        activityLogs.IvfTasksActions.WrongNoteMetadata,
        {
          summaryId,
          type: oldNote?.type ? oldNote.type.toString() : null,
          patientId: oldNote.patientId,
        },
      )
      return {patientNoteId: oldNote?.id}
    }

    const nodeId = oldNote?.id

    const patientNote: Partial<PatientNote> = {
      id: nodeId,
      patientId,
      content: content ?? '',

      revisionId: generateRevisionId(this.dateTimeUtil.now()),
      updatedByStaffId: staff.id,
      updatedByStaffAt: this.dateTimeUtil.now(),
      type: noteType,
    }

    const savedNote = await this.patientNoteRepository.save(patientNote)

    await this.patientPlanAuditTrailService.addPatientNotesAudit(
      [savedNote],
      nodeId ? AuditUserAction.Update : AuditUserAction.Create,
      staff,
    )

    return {patientNoteId: savedNote.id, noteChange: {from: oldNote?.content, to: content}}
  }
}
