import {Module} from '@nestjs/common'
import {IvfPatientsController} from './ivf-patients.controller'
import {CommonModule, NestprojectConfigService} from '@libs/common'
import {DataLayerModule} from '@libs/data-layer'
import {AuditTrailModule} from '@libs/audit-trail'
import {IvfPatientsService} from './services/ivf-patients.service'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {
  PatientPlanCohortRepository,
  PatientPlanCohortIvfTaskDetailsRepository,
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortIvfTaskSummaryRepository,
  PatientPlanCohortSignOffHistoryRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
  IvfDishToPlanTypeRepository,
  IvfDishToPlanAddonRepository,
  PatientPlanCohortIvfDishRepository,
  IvfDishToIvfTaskGroupRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {PatientPlanRepository, PlanTypeRepository} from '@libs/data-layer/apps/plan/repositories'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {IvfLabCohortDateService} from '@libs/common/services/ivf-lab/ivf-lab-cohort-date.service'
import {IVFCancellationReasonRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {DailyViewService} from '@apps/lis/daily-view/services/daily-view.service'
import {IvfIVFLabStatusService} from '@apps/lis/ivf-patients/services/ivf-cohort-status.service'
import {IvfPatientsV3Controller} from '@apps/lis/ivf-patients/ivf-patients-v3.controller'
import {IvfPatientsV3Service} from '@apps/lis/ivf-patients/services/ivf-patients-v3.service'
import {TransportFolderRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {IVFDispositionReasonRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'

@Module({
  imports: [CommonModule, DataLayerModule, AuditTrailModule],
  controllers: [IvfPatientsController, IvfPatientsV3Controller],
  providers: [
    NestprojectConfigService,
    PlanTypeRepository,
    IvfPatientsService,
    IvfPatientsV3Service,
    PatientPlanRepository,
    StaffRepository,
    PatientRepository,
    PatientPlanCohortRepository,
    PatientPlanCohortIvfTaskDetailsRepository,
    PatientPlanCohortIvfTaskGroupRepository,
    PatientPlanCohortIvfTaskSummaryRepository,
    PatientPlanCohortSignOffHistoryRepository,
    PatientPlanCohortIvfTaskExpandedEmbryoRepository,
    IVFCancellationReasonRepository,
    IvfLabCohortDateService,
    IvfIVFLabStatusService,
    I18nLocalizationService,
    DailyViewService,
    TransportFolderRepository,
    IvfDishToPlanTypeRepository,
    IvfDishToPlanAddonRepository,
    PatientPlanCohortIvfDishRepository,
    IvfDishToIvfTaskGroupRepository,
    IVFDispositionReasonRepository,
  ],
})
export class IvfPatientsModule {}
