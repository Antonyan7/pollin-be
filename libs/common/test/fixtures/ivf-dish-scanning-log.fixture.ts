import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuthUserFixture} from './auth.fixture'
import {DishScanningLog} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {patientPlanCohortIVFTaskGroup20Fixture} from '@libs/common/test/fixtures/patient-plan-cohort-ivf-task-group.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const ivfDishScanningLogFixtures: Partial<DishScanningLog> = {
  id: '1',
  authUserFullName: 'Bcc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  date: dateTimeUtil.getFirestoreTimeStampNowDate(),
  day: 'Day 1',
  patientPlanCohortGroupId: patientPlanCohortIVFTaskGroup20Fixture.id,
  patientPlanCohortId: patientPlanCohortIVFTaskGroup20Fixture.patientPlanCohortId,
  dishLabel: 'OPU',
  patientFullName: 'Name Full',
  identityMatch: false,
  identityMatchReason: null,
  scannedDate: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('2020-01-01')),
  scannedBy: 'Doctor',
  patientPlanCohortIvfDishId: null,
}
