import {PatientProfile} from '@libs/data-layer/apps/users/entities/fireorm/patient-profile.entity'
import {
  patientForCareProvidersFixture,
  patientForProfileHighlightFixture,
  patientJourneyFixture,
} from './patient.fixture'

export const patientProfileForGetPatientFixture: Partial<PatientProfile> = {
  id: 'patient-profile-get-patient',
  patientId: patientForCareProvidersFixture.id,
  questionnaires: [
    {
      questionnaireId: 1,
      createdOn: null,
    },
  ],
}

export const patientProfileForPatchPatientFixture: Partial<PatientProfile> = {
  id: 'patient-profile-patch-patient',
  patientId: patientJourneyFixture.id,
  questionnaires: [],
}

export const patientProfileForHighlightFixture: Partial<PatientProfile> = {
  id: 'patient-profile-highlight',
  patientId: patientForProfileHighlightFixture.id,
  questionnaires: [
    {
      questionnaireId: 1,
      createdOn: null,
    },
  ],
}
