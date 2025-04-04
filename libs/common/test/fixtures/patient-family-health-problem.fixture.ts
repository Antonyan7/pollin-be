import {PatientFamilyHealthProblem} from '@libs/data-layer/apps/users/entities/typeorm'
import {FamilyMemberEnum} from '@libs/services-common/enums/medical-background-dropdown.enum'
import {patientForGeneralHealthFixture} from './patient.fixture'

export const patientFamilyHealthProblemFixture: Partial<PatientFamilyHealthProblem> = {
  id: 1,
  patientId: 1,
  uuid: '6d5bb10b-1117-4cdc-8788-63f1eecdd6d5',
  problemOrDisease: 'problemOrDisease',
}

export const patientFamilyHealthProblemForGeneralHealthFixture: Partial<PatientFamilyHealthProblem> =
  {
    id: 2,
    patientId: patientForGeneralHealthFixture.id,
    uuid: '6d5bb10b-1117-4cdc-8788-63f1eecdd6d8',
    problemOrDisease: 'problemOrDisease General Health',
    familyMemberName: FamilyMemberEnum.Father,
  }

export const patientFamilyHealthProblemForGeneralHealthToBeRemovedFixture: Partial<PatientFamilyHealthProblem> =
  {
    id: 3,
    patientId: patientForGeneralHealthFixture.id,
    uuid: '6d5bb10b-1117-4cdc-8788-63f1eecdd6d9',
    problemOrDisease: 'problemOrDisease General Health to be removed',
    familyMemberName: FamilyMemberEnum.Mother,
  }
