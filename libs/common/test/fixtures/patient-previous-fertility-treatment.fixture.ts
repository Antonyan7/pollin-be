import {PatientPreviousFertilityTreatment} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientForProfileOverviewFemaleFixture} from './patient.fixture'

export const patientPreviousFertilityTreatmentFixture: Partial<PatientPreviousFertilityTreatment> =
  {
    id: 1,
    patientId: patientForProfileOverviewFemaleFixture.id,
    uuid: '5c5044e7-08f6-4308-b34a-47373858249a',
    type: 'patientPreviousFertilityTreatment type',
    cycles: 2,
  }

export const patientPreviousFertilityTreatmentToBeRemovedFixture: Partial<PatientPreviousFertilityTreatment> =
  {
    id: 2,
    patientId: patientForProfileOverviewFemaleFixture.id,
    uuid: '5c5044e7-08f6-4308-b34a-47373858249c',
    type: 'patientPreviousFertilityTreatment type to be removed',
    cycles: 3,
  }
