import {wireTransferPatientFixture} from './patient-profile.fixture'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {planTypeFixture} from '../appointment-status-updated/seed'

export const patientPlanFixtureCF: Partial<PatientPlan> = {
  id: 45444333,
  patientId: wireTransferPatientFixture.id,
  planTypeId: planTypeFixture.id,
}
