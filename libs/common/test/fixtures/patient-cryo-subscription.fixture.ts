import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common/utils'
import {PatientCryoSubscription} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientEmailVerifiedFixture} from './patient.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const patientCryoSubscriptionFixture: Partial<PatientCryoSubscription> = {
  id: 1,
  uuid: 1 + '6c908f5-132d-11ed-814e-0242ac110003',
  patientId: patientEmailVerifiedFixture.id,
  stripeSubscriptionId: 'stripeSubscriptionId_patientCryoSubscriptionFixture',
  startDate: dateTimeUtil.now(),
  billingCycleStartDate: dateTimeUtil.now(),
  renewalDate: dateTimeUtil.now(),
}
