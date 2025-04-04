import {patientFixtureWireTransfer, wireTransferPatientFixture} from './patient-profile.fixture'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {PatientMilestoneStatus, PatientMilestoneType} from '@libs/services-common/enums'
import {v4} from 'uuid'
import {
  paymentOrderWireTransferFixture,
  wireTransferPaymentOrderFixture,
} from './payment-order.fixture'
import {patientPlanFixtureCF} from './plan-type-fixture'

export const patientMilestoneFixture: Partial<PatientMilestone> = {
  id: 1010,
  uuid: v4(),
  patientId: patientFixtureWireTransfer.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
  paymentOrderId: paymentOrderWireTransferFixture.id,
  isDisabled: false,
}

export const patientMilestoneWireTransferPaidFixture: Partial<PatientMilestone> = {
  id: 1011,
  uuid: v4(),
  patientId: wireTransferPatientFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
  paymentOrderId: wireTransferPaymentOrderFixture.id,
  isDisabled: false,
  patientPlanId: patientPlanFixtureCF.id,
}
