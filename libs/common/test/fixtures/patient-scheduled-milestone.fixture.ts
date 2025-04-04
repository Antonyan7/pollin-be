import {PatientScheduledMilestone} from '@libs/data-layer/apps/plan/entities/typeorm'
import {DateTimeUtil} from '@libs/common'
import {patientPlanFixture} from '@libs/common/test/fixtures/patient-plan.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const PatientScheduledMilestoneFixture: Partial<PatientScheduledMilestone> = {
  id: 1,
  patientPlanId: patientPlanFixture.id,
  date: dateTimeUtil.toDate('2023-01-01'),
}
