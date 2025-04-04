import {
  patientPlanForAlertFixture,
  patientPlanToUpdatePeriodFixture,
  patientPlanV3CancelledFixture,
} from './patient-plan.fixture'
import {PatientPlanAlert} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-alert.entity'
import {PlanAlertType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {staffUserFixture} from './staff.fixture'

export const patientPlanAlertAcknowledgedFixture: Partial<PatientPlanAlert> = {
  id: 1,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249b',
  patientPlanId: patientPlanV3CancelledFixture.id,
  type: PlanAlertType.DayOneOfPeriodUpdated,
  acknowledgedByStaffId: staffUserFixture.id,
  message: 'patientPlanAlertAcknowledgedFixture',
}

export const patientPlanAlertNotAcknowledgedFixture: Partial<PatientPlanAlert> = {
  id: 2,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249c',
  patientPlanId: patientPlanV3CancelledFixture.id,
  type: PlanAlertType.DayOneOfPeriodUpdated,
  acknowledgedByStaffId: null,
  message: 'patientPlanAlertNotAcknowledgedFixture',
}

export const patientPlanAlertAcknowledgedMobileFixture: Partial<PatientPlanAlert> = {
  id: 3,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249d',
  patientPlanId: patientPlanToUpdatePeriodFixture.id,
  type: PlanAlertType.DayOneOfPeriodUpdated,
  acknowledgedByStaffId: staffUserFixture.id,
  message: 'patientPlanAlertAcknowledgedMobileFixture',
}

export const patientPlanAlertNotAcknowledgedMobileFixture: Partial<PatientPlanAlert> = {
  id: 4,
  uuid: '5c5044e7-18f6-4308-b34a-47373858249b',
  patientPlanId: patientPlanToUpdatePeriodFixture.id,
  type: PlanAlertType.DayOneOfPeriodUpdated,
  acknowledgedByStaffId: null,
  message: 'patientPlanAlertNotAcknowledgedMobileFixture',
}

export const patientPlanAlertToAcknowledgeFixture: Partial<PatientPlanAlert> = {
  id: 5,
  uuid: '5c5044e7-28f6-4308-b34a-47373858249b',
  patientPlanId: patientPlanForAlertFixture.id,
  type: PlanAlertType.DayOneOfPeriodUpdated,
  acknowledgedByStaffId: null,
  message: 'patientPlanAlertToAcknowledgeFixture',
}
