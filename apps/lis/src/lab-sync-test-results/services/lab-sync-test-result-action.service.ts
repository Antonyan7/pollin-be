import {Injectable} from '@nestjs/common'
import {LabSyncObservationRequestRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {VoidResultRequestDTO} from '../dto/get-lab-sync-test-results.dto'
import {
  StructuredLogger,
  handleOptionalStringValues,
  DateTimeUtil,
  NestprojectConfigService,
} from '@libs/common'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {BadRequestException} from '@libs/services-common/exceptions'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {LabSyncEntitiesAuditTrialService} from '@libs/audit-trail/services/lab-sync-entities-audit-trial.service'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Equal} from 'typeorm'
import {LabSyncObservationRequestStatusHistoryRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/lab-sync-observation-request-status-history.repository'
import {LabSyncObservationRequest} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

@Injectable()
export class LabSyncTestResultActionService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly labSyncObservationRequestRepository: LabSyncObservationRequestRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly labSyncEntitiesAuditTrialService: LabSyncEntitiesAuditTrialService,
    private readonly configService: NestprojectConfigService,
    private readonly staffRepository: StaffRepository,
    private readonly obrStatusHistoryRepository: LabSyncObservationRequestStatusHistoryRepository,
  ) {}

  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  async voidTestResult(voidResultReqBody: VoidResultRequestDTO, authUserId: string): Promise<void> {
    const {unlinkedTestResultId, reason} = voidResultReqBody

    StructuredLogger.info(
      activityLogs.LabSyncTestResultsFunctions.VoidResult,
      activityLogs.CommonAction.UpdateEntity,
      {unlinkedTestResultUUID: unlinkedTestResultId},
    )

    try {
      const unlinkedTestResult =
        await this.labSyncObservationRequestRepository.findOneByUUID(unlinkedTestResultId)

      if (!unlinkedTestResult) {
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.UNLINKED_RESULT_NOT_FOUND),
        )
      }

      const staff: Staff = await this.staffRepository.findOneBy({
        authUserId: Equal(authUserId),
      })

      const revisionId = generateRevisionId(this.dateTimeUtil.now())

      await this.labSyncObservationRequestRepository.update(
        {
          id: unlinkedTestResult.id,
        },
        {
          status: LabSyncTestResultStatus.Void,
          voidReason: handleOptionalStringValues(reason),
          revisionId,
          updatedBy: staff.authUserId,
          updatedByStaffId: staff.id,
        },
      )

      await this.obrStatusHistoryRepository.addActionHistory(
        unlinkedTestResult.id,
        LabSyncTestResultStatus.Void,
        staff.id,
      )

      const updatedData = await this.labSyncObservationRequestRepository.findOneBy({
        id: Equal(unlinkedTestResult.id),
      })

      await this.labSyncEntitiesAuditTrialService.addLabSyncObservationsAudit<LabSyncObservationRequest>(
        {
          updatedData,
          userAction: AuditUserAction.Update,
          staff,
          revisionId,
          tableUpdated: AuditTrailCollection.LabSyncObservationRequestRevisions,
        },
      )
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.LabSyncTestResultsFunctions.VoidResult,
        eventName: activityLogs.LabSyncTestResultsActions.VoidResultFailed,
      })
    }
  }
}
