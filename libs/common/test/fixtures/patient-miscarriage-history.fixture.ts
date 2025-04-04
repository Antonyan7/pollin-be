import {PatientMiscarriageHistory} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientForProfileOverviewFemaleFixture} from './patient.fixture'

export const patientMiscarriageFixture: Partial<PatientMiscarriageHistory> = {
  id: 1,
  year: 2020,
  patientId: patientForProfileOverviewFemaleFixture.id,
}
