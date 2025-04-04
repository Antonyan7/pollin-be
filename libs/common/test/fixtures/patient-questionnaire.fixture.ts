import {PatientQuestionnaire} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientConsentPackageForGetAnswersSeparatedApiFixture,
  patientConsentPackageForSignMobileFixture,
  patientConsentPackageWith2ModulesAndPartnerFixture,
} from './patient-consent-package.fixture'
import {
  patientForConsentMobileFixture,
  patientForConsentMobilePartnerFixture,
  patientForConsentQuestionnaireFixture,
  patientForConsentQuestionnairePartnerFixture,
  patientForConsentSignMobileFixture,
  patientForConsentSignPartnerMobileFixture,
} from './patient.fixture'

export const patientQuestionnaireConsentMainPatientFixture: Partial<PatientQuestionnaire> = {
  id: 1,
  uuid: '9b1c8c73-9be1-4e4d-becf-6ed70496312f',
  patientId: patientForConsentMobileFixture.id,
  patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
}

export const patientQuestionnaireConsentPartnerFixture: Partial<PatientQuestionnaire> = {
  id: 2,
  uuid: 2 + 'b13b3bf-13gd-11ed-814e-0242ac110004',
  patientId: patientForConsentMobilePartnerFixture.id,
  patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
}

export const patientQuestionnaireForConsentDetailQuestionnaireFixture: Partial<PatientQuestionnaire> =
  {
    id: 3,
    uuid: '9ff15897-07a2-4fd1-b1b9-9599487630e4',
    patientId: patientForConsentQuestionnaireFixture.id,
    patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
  }

export const patientQuestionnaireForConsentDetailQuestionnairePartnerFixture: Partial<PatientQuestionnaire> =
  {
    id: 4,
    uuid: '18a1c988-4450-45e5-84d8-834c876c3293',
    patientId: patientForConsentQuestionnairePartnerFixture.id,
    patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
  }

export const patientQuestionnaireForGetAnswersSeparatedApiFixture: Partial<PatientQuestionnaire> = {
  id: 5,
  uuid: '58a1c988-4450-45e5-84d8-834c876c3293',
  patientId: patientForConsentMobileFixture.id,
  patientConsentPackageId: patientConsentPackageForGetAnswersSeparatedApiFixture.id,
}

export const patientQuestionnaireForSignMobileFixture: Partial<PatientQuestionnaire> = {
  id: 6,
  uuid: '68a1c988-4450-45e5-84d8-834c876c3293',
  patientId: patientForConsentSignMobileFixture.id,
  patientConsentPackageId: patientConsentPackageForSignMobileFixture.id,
}

export const patientQuestionnaireForSignPartnerMobileFixture: Partial<PatientQuestionnaire> = {
  id: 7,
  uuid: '78a1c988-4450-45e5-84d8-834c876c3293',
  patientId: patientForConsentSignPartnerMobileFixture.id,
  patientConsentPackageId: patientConsentPackageForSignMobileFixture.id,
}
