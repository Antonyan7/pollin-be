import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuthUserFixture} from './auth.fixture'
import {PatientPlanHistory} from '@libs/data-layer/apps/plan/entities/fireorm'
import {patientPlanCancelledFixture, patientPlanFixture} from './patient-plan.fixture'
import {HistoryUserType} from '@libs/common/enums'
import {PlanStatusEnumTitles} from '@libs/services-common/enums'
import {PlanTypeComponentEnum} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const patientPlanHistoryFixture: Partial<PatientPlanHistory> = {
  id: '1',
  authUserFullName: 'Apc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  authUserType: HistoryUserType.SystemAdmin,
  patientPlanId: patientPlanFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('05-05-2001')),
  changes: [
    {
      propertyName: 'Status',
      from: '-',
      to: PlanStatusEnumTitles.get(PlanStatusEnum.ReadyToOrder),
    },
  ],
}

export const patientPlanHistoryWithoutUserTypeFixture: Partial<PatientPlanHistory> = {
  id: '2',
  authUserFullName: 'Apx Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  entityTitle: 'Heading',
  component: PlanTypeComponentEnum.AdditionalPlanInfo,
  patientPlanId: patientPlanFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('06-06-2001')),
  changes: [
    {
      propertyName: 'Status',
      from: PlanStatusEnumTitles.get(PlanStatusEnum.ReadyToOrder),
      to: PlanStatusEnumTitles.get(PlanStatusEnum.Ordered),
    },
  ],
}

export const patientPlanHistoryForOtherPlanFixture: Partial<PatientPlanHistory> = {
  id: '3',
  authUserFullName: 'Apa Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  authUserType: HistoryUserType.Patient,
  patientPlanId: patientPlanCancelledFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('05-05-2001')),
  changes: [
    {
      propertyName: 'Status',
      from: '-',
      to: PlanStatusEnumTitles.get(PlanStatusEnum.ReadyToOrder),
    },
  ],
}
