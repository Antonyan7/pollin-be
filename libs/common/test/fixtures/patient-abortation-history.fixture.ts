import {PatientAbortionHistory} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientForProfileOverviewFemaleFixture} from './patient.fixture'

export const patientAbortionHistoryForGetProfileOverviewFixture: Partial<PatientAbortionHistory> = {
  id: 1,
  patientId: patientForProfileOverviewFemaleFixture.id,
  year: 2010,
}
