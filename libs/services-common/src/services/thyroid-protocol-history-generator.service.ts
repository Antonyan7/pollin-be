import {
  DateTimeUtil,
  handleOptionalStringValues,
  NestprojectConfigService,
  StructuredLogger,
} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {ThyroidProtocolResultNote} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  ThyroidProtocolHistory,
  ThyroidProtocolResultPropertyName,
  ThyroidProtocolResultHistoryAction,
} from '@libs/data-layer/apps/clinic-test/entities/fireorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {HistoryChange} from '@libs/common/interfaces/history-change.interface'

export class ThyroidProtocolHistoryGeneratorService {
  private configService = NestprojectConfigService.getInstance()
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  private oldNoteVersion: ThyroidProtocolResultNote | Partial<ThyroidProtocolResultNote>
  private newNoteVersion: ThyroidProtocolResultNote | Partial<ThyroidProtocolResultNote>

  setOldNoteVersion(result: ThyroidProtocolResultNote | Partial<ThyroidProtocolResultNote>): void {
    this.oldNoteVersion = result
  }

  setNewNoteVersion(result: ThyroidProtocolResultNote | Partial<ThyroidProtocolResultNote>): void {
    this.newNoteVersion = result
  }

  generateDiffs(
    action: string | ThyroidProtocolResultHistoryAction | null,
    staff?: Staff,
    systemOrThirdParty?: {identifier: string; name: string},
  ): Partial<ThyroidProtocolHistory> {
    try {
      let authUserId: string
      let authUserFullName: string
      let updatedBy: string

      if (staff) {
        authUserId = staff.authUserId
        authUserFullName = getFullName(staff.firstName, staff.lastName)
        updatedBy = staff.authUserId
      } else {
        authUserId = systemOrThirdParty.identifier
        authUserFullName = systemOrThirdParty.name
        updatedBy = systemOrThirdParty.identifier
      }

      const changes = [
        this.generateChange(
          ThyroidProtocolResultPropertyName.Content,
          this.oldNoteVersion?.content || null,
          this.newNoteVersion.content,
        ),
      ].filter((item) => item)

      if (!changes.length) {
        StructuredLogger.info(
          activityLogs.ThyroidProtocolHistoryGeneratorServiceFunctions.GenerateDiffs,
          activityLogs.ThyroidProtocolHistoryGeneratorServiceActions
            .NoChangesAppliedToThyroidProtocolResult,
          {message: 'No changes applied to thyroid protocol result'},
        )

        return null
      }

      const thyroidProtocolHistoryItem: Partial<ThyroidProtocolHistory> = {
        thyroidProtocolResultId: this.newNoteVersion.id,
        changes,
        action: action ? action.toString() : null,
        authUserId,
        authUserFullName,
        date: this.dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedBy,
      }

      return thyroidProtocolHistoryItem
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ThyroidProtocolHistoryGeneratorServiceFunctions.GenerateDiffs,
        eventName: activityLogs.ThyroidProtocolHistoryGeneratorServiceActions.GenerateDiffsFailed,
      })
    }
  }

  generateDifference(data: {
    thyroidProtocolResultId: number
    propertyName: string | ThyroidProtocolResultPropertyName
    oldValue: string | null
    newValue: string | null
    action: string | ThyroidProtocolResultHistoryAction | null
    staff?: Staff
    systemOrThirdParty?: {identifier: string; name: string}
  }): Partial<ThyroidProtocolHistory> {
    try {
      const {
        thyroidProtocolResultId,
        propertyName,
        oldValue,
        newValue,
        action,
        staff,
        systemOrThirdParty,
      } = data

      let authUserId: string
      let authUserFullName: string
      let updatedBy: string

      if (staff) {
        authUserId = staff.authUserId
        authUserFullName = getFullName(staff.firstName, staff.lastName)
        updatedBy = staff.authUserId
      } else if (systemOrThirdParty) {
        authUserId = systemOrThirdParty.identifier
        authUserFullName = systemOrThirdParty.name
        updatedBy = systemOrThirdParty.identifier
      }

      const changes = [this.generateChange(propertyName, oldValue, newValue)].filter((item) => item)

      if (!changes.length) {
        StructuredLogger.info(
          activityLogs.ThyroidProtocolHistoryGeneratorServiceFunctions.GenerateDiffs,
          activityLogs.ThyroidProtocolHistoryGeneratorServiceActions
            .NoChangesAppliedToThyroidProtocolResult,
          {message: 'No changes applied to thyroid protocol result'},
        )

        return null
      }

      const thyroidProtocolHistoryItem: Partial<ThyroidProtocolHistory> = {
        thyroidProtocolResultId,
        changes,
        action: action ? action.toString() : null,
        authUserId,
        authUserFullName,
        date: this.dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedBy,
      }

      return thyroidProtocolHistoryItem
    } catch (error) {
      handleError(error, {
        functionName:
          activityLogs.ThyroidProtocolHistoryGeneratorServiceFunctions.GenerateDifference,
        eventName:
          activityLogs.ThyroidProtocolHistoryGeneratorServiceActions.GenerateDifferenceFailed,
      })
    }
  }

  private generateChange(
    propertyName: string | ThyroidProtocolResultPropertyName,
    from: string | null,
    to: string | null,
  ): HistoryChange {
    if (handleOptionalStringValues(from) === handleOptionalStringValues(to)) {
      return
    }

    return {
      propertyName,
      from: handleOptionalStringValues(from),
      to: handleOptionalStringValues(to),
    }
  }
}
