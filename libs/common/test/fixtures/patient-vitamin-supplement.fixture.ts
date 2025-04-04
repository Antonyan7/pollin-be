import {PatientVitaminSupplement} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientForProfileOverviewFemaleFixture} from './patient.fixture'

export const patientPatientVitaminSupplementFixture: Partial<PatientVitaminSupplement> = {
  id: 1,
  patientId: patientForProfileOverviewFemaleFixture.id,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249a',
  dosageAndFrenquency: 'dosageAndFrenquency',
  name: 'PatientVitaminSupplement name',
}
