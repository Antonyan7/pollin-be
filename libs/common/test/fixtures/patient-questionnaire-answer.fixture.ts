import {
  question1Fixture,
  questionForMultiSelectFixture,
} from '@libs/common/test/fixtures/question.fixture'
import {PatientQuestionnaireAnswer} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {
  patientQuestionnaireConsentMainPatientFixture,
  patientQuestionnaireConsentPartnerFixture,
} from './patient-questionnaire.fixture'
import {
  patientForConsentMobileFixture,
  patientForConsentMobilePartnerFixture,
} from './patient.fixture'
import {answerOptionForOneMultiSelectQuestionFixture} from './answer-option.fixture'

//need fixture as i am not saving answer on answering last question on patientQuestionnaire (Consent)
export const patientQuestionnaireAnswerPartnerFixture: Partial<PatientQuestionnaireAnswer> = {
  id: 1,
  questionId: question1Fixture.id,
  patientId: patientForConsentMobilePartnerFixture.id,
  patientQuestionnaireId: patientQuestionnaireConsentPartnerFixture.id,
  value: 'Aspirin',
}

//need fixture as i am not saving answer on answering last question on patientQuestionnaire (Consent)
// for primary patient
export const patientQuestionnaireAnswerMultiplePartnerFixture: Partial<PatientQuestionnaireAnswer> =
  {
    id: 2,
    questionId: questionForMultiSelectFixture.id,
    patientId: patientForConsentMobilePartnerFixture.id,
    patientQuestionnaireId: patientQuestionnaireConsentPartnerFixture.id,
    value: answerOptionForOneMultiSelectQuestionFixture.uuid,
  }

//need fixture as i am not saving answer on answering last question on patientQuestionnaire (Consent)
export const patientQuestionnaireAnswerPrimaryFixture: Partial<PatientQuestionnaireAnswer> = {
  id: 4,
  questionId: question1Fixture.id,
  patientId: patientForConsentMobileFixture.id,
  patientQuestionnaireId: patientQuestionnaireConsentMainPatientFixture.id,
  value: 'Aspirin',
}

//need fixture as i am not saving answer on answering last question on patientQuestionnaire (Consent)
// for primary patient
export const patientQuestionnaireAnswerMultiplePrimaryFixture: Partial<PatientQuestionnaireAnswer> =
  {
    id: 5,
    questionId: questionForMultiSelectFixture.id,
    patientId: patientForConsentMobileFixture.id,
    patientQuestionnaireId: patientQuestionnaireConsentMainPatientFixture.id,
    value: answerOptionForOneMultiSelectQuestionFixture.uuid,
  }
