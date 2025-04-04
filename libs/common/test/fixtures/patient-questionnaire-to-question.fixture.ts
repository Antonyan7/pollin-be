import {PatientQuestionnaireToQuestion} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientQuestionnaireConsentPartnerFixture,
  patientQuestionnaireForConsentDetailQuestionnaireFixture,
  patientQuestionnaireForConsentDetailQuestionnairePartnerFixture,
  patientQuestionnaireForGetAnswersSeparatedApiFixture,
} from './patient-questionnaire.fixture'
import {
  question1Fixture,
  questionDateOfBirthFixture,
  questionForMultiSelectFixture,
} from './question.fixture'

export const patientQuestionnaireToQuestionFixture: Partial<PatientQuestionnaireToQuestion> = {
  id: 2,
  questionId: question1Fixture.id,
  patientQuestionnaireId: patientQuestionnaireConsentPartnerFixture.id,
}

export const patientQuestionnaireToQuestionForConcentQuestionnaireOneFixture: Partial<PatientQuestionnaireToQuestion> =
  {
    id: 4,
    questionId: question1Fixture.id,
    patientQuestionnaireId: patientQuestionnaireForConsentDetailQuestionnaireFixture.id,
    sequence: 1,
  }

export const patientQuestionnaireToQuestionForConcentQuestionnaireTwoFixture: Partial<PatientQuestionnaireToQuestion> =
  {
    id: 5,
    questionId: questionForMultiSelectFixture.id,
    patientQuestionnaireId: patientQuestionnaireForConsentDetailQuestionnaireFixture.id,
    sequence: 2,
  }

export const patientQuestionnaireToQuestionForConcentQuestionnaireOnePartnerFixture: Partial<PatientQuestionnaireToQuestion> =
  {
    id: 10,
    questionId: question1Fixture.id,
    patientQuestionnaireId: patientQuestionnaireForConsentDetailQuestionnairePartnerFixture.id,
    sequence: 1,
  }

export const patientQuestionnaireToQuestionForConcentQuestionnaireTwoPartnerFixture: Partial<PatientQuestionnaireToQuestion> =
  {
    id: 11,
    questionId: questionForMultiSelectFixture.id,
    patientQuestionnaireId: patientQuestionnaireForConsentDetailQuestionnairePartnerFixture.id,
    sequence: 2,
  }

export const patientQuestionnaireToQuestionForGetAnswersSeparatedApiOneFixture: Partial<PatientQuestionnaireToQuestion> =
  {
    id: 13,
    questionId: question1Fixture.id,
    patientQuestionnaireId: patientQuestionnaireForGetAnswersSeparatedApiFixture.id,
    sequence: 1,
  }

export const patientQuestionnaireToQuestionForGetAnswersSeparatedApiTwoFixture: Partial<PatientQuestionnaireToQuestion> =
  {
    id: 14,
    questionId: questionForMultiSelectFixture.id,
    patientQuestionnaireId: patientQuestionnaireForGetAnswersSeparatedApiFixture.id,
    sequence: 2,
  }

export const patientQuestionnaireToQuestionForSignMobileFixture: Partial<PatientQuestionnaireToQuestion> =
  {
    id: 15,
    questionId: questionDateOfBirthFixture.id,
    patientQuestionnaireId: patientQuestionnaireForGetAnswersSeparatedApiFixture.id,
    sequence: 3,
  }
