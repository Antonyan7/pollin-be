import {
  CryoSubscriptionStatus,
  PatientCryoSubscription,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientSubscriptionFixture} from './patient'
import {DateTimeUtil} from '@libs/common'

const dateUtil = new DateTimeUtil()

export const cryoSubscriptionBasic: Partial<PatientCryoSubscription> = {
  id: 1000,
  patientId: patientSubscriptionFixture.id,
  stripeSubscriptionId: 'sub_cryo-basic',
  startDate: dateUtil.toDate('2024-01-01'),
  billingCycleStartDate: dateUtil.toDate('2024-01-01'),
  renewalDate: dateUtil.toDate('2024-01-10'),
  status: CryoSubscriptionStatus.Active,
}
