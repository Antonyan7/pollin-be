import {PatientPaymentEstimateItem} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {PatientPaymentEstimateItemType} from '@libs/data-layer/apps/clinic-billing/enum/patient-payment-estimate-item-type.enum'
import {patientPaymentEstimateForListFixture} from './patient-payment-estimate.fixture'
import {patientPlanFixture} from './patient-plan.fixture'

export const patientPaymentEstimateItemForListFixture: Partial<PatientPaymentEstimateItem> = {
  id: 1,
  uuid: 1 + '23e4567-e89b-12d3-a456-426614174000',
  patientPaymentEstimateId: patientPaymentEstimateForListFixture.id,
  type: PatientPaymentEstimateItemType.PatientPlan,
  patientPlanId: patientPlanFixture.id,
}
