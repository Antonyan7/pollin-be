import {Module} from '@nestjs/common'
import {CommonModule} from '@libs/common'
import {DataLayerModule} from '@libs/data-layer'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {AuditTrailModule} from '@libs/audit-trail'
import {LabSyncTestResultController} from './lab-sync-test-results.controller'
import {LabSyncTestResultListService} from './services/lab-sync-test-result-list.service'
import {TestPanelRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-panel.repository'
import {TestTypeRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-type.repository'
import {LabSyncObservationRequestRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/lab-sync-observation-request.repository'
import {LabSyncTestResultLinkService} from './services/lab-sync-test-result-link.service'
import {
  LabSyncObservationResultRepository,
  TestResultAttachmentRepository,
  TestResultMeasurementRepository,
  TestResultRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {LabSyncTestResultActionService} from './services/lab-sync-test-result-action.service'
import {LabSyncRawDataRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {LabSyncStatusService} from './services/lab-sync-status.service'
import {LabSyncEntitiesAuditTrialService} from '@libs/audit-trail/services/lab-sync-entities-audit-trial.service'
import {LabSyncObservationRequestStatusHistoryRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/lab-sync-observation-request-status-history.repository'

@Module({
  imports: [CommonModule, DataLayerModule, AuditTrailModule],
  controllers: [LabSyncTestResultController],
  providers: [
    StaffRepository,
    I18nLocalizationService,
    TestTypeRepository,
    TestPanelRepository,
    PatientRepository,
    TestResultRepository,
    TestResultMeasurementRepository,
    LabSyncObservationRequestRepository,
    LabSyncObservationResultRepository,
    LabSyncObservationRequestStatusHistoryRepository,
    LabSyncTestResultListService,
    LabSyncTestResultLinkService,
    LabSyncTestResultActionService,
    LabSyncRawDataRepository,
    LabSyncStatusService,
    LabSyncEntitiesAuditTrialService,
    TestResultAttachmentRepository,
  ],
})
export class LabSyncTestResultModule {}
