import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed} from '@seeds/typeorm'
import {
  integerQuestionFixture,
  questionStaticGenderFixture,
  questionStaticNo2Fixture,
  questionStaticNo3Fixture,
  questionStaticNoFixture,
  questionStaticNumberOfPregnanciesFixture,
  questionStaticSexAtBirthFixture,
  questionStaticSexualOrientationFixture,
} from '../question.fixture'
import {
  questionnaireForConstraintFromAnotherQuestionnaireFixture,
  questionnaireForStaticAnswerConstraintFixture,
  questionnaireForStaticAnswerConstraintGroupFixture,
  questionnaireWithConsecutiveConstrainedQuestionsFixture,
} from '../questionnaire.fixture'
import {PatientInfoMapCode} from '@libs/services-common/enums'

export const groupQuestionWithStaticAnswerFixture: QuestionInputSeed = {
  id: 202,
  uuid: 'GroupQuestWithStaticAnswerChildUUID',
  type: QuestionType.Group,
  required: true,
}

export const childQuestionWithStaticAnswerFixture: QuestionInputSeed = {
  id: 203,
  uuid: 'ChildQuestionWithStaticAnswerUUID',
  parentQuestionId: groupQuestionWithStaticAnswerFixture.id,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.SexAtBirth,
}

export const childQuestionWithoutStaticAnswerFixture: QuestionInputSeed = {
  id: 204,
  uuid: 'ChildQuestionWithoutStaticAnswerUUID',
  parentQuestionId: groupQuestionWithStaticAnswerFixture.id,
  type: QuestionType.String,
}

export const questionnaireToQuestionForStaticAnswerConstraint1Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
    questionId: questionStaticSexAtBirthFixture.id,
    sequence: 2,
  }

export const questionnaireToQuestionForStaticAnswerConstraint2Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
    questionId: questionStaticNumberOfPregnanciesFixture.id,
    sequence: 6,
  }

export const questionnaireToQuestionForStaticAnswerConstraint3Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
    questionId: integerQuestionFixture.id,
    sequence: 8,
  }

export const questionnaireToQuestionForStaticAnswerConstraint4Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
    questionId: questionStaticNoFixture.id,
    sequence: 10,
  }

export const questionnaireToQuestionForStaticAnswerConstraint5Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
    questionId: questionStaticNo2Fixture.id,
    sequence: 12,
  }

export const questionnaireToQuestionForStaticAnswerConstraint6Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
    questionId: questionStaticNo3Fixture.id,
    sequence: 14,
  }

export const questionnaireToQuestionForStaticAnswerConstraintGroup1Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintGroupFixture.id,
    questionId: groupQuestionWithStaticAnswerFixture.id,
    sequence: 1,
  }

export const questionnaireToQuestionForStaticAnswerConstraintGroup2Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintGroupFixture.id,
    questionId: questionStaticGenderFixture.id,
    sequence: 2,
  }

export const questionnaireToQuestionForStaticAnswerConstraintGroup3Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForStaticAnswerConstraintGroupFixture.id,
    questionId: integerQuestionFixture.id,
    sequence: 3,
  }

export const questionnaireToQuestionWithSexAtBirthFixture: Partial<QuestionnaireToQuestion> = {
  questionnaireId: questionnaireForConstraintFromAnotherQuestionnaireFixture.id,
  questionId: questionStaticSexAtBirthFixture.id,
  sequence: 1,
}

export const questionnaireToQuestionForAnotherQuestionnaireFixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForConstraintFromAnotherQuestionnaireFixture.id,
    questionId: questionStaticGenderFixture.id,
    sequence: 2,
  }

export const questionnaireToQuestionForAnotherQuestionnaireGroup1Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForConstraintFromAnotherQuestionnaireFixture.id,
    questionId: questionStaticNumberOfPregnanciesFixture.id,
    sequence: 3,
  }

export const questionnaireToQuestionForAnotherQuestionnaireGroup2Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireForConstraintFromAnotherQuestionnaireFixture.id,
    questionId: integerQuestionFixture.id,
    sequence: 4,
  }

export const questionnaireToQuestionForConsecutiveConstrains1Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireWithConsecutiveConstrainedQuestionsFixture.id,
    questionId: questionStaticSexAtBirthFixture.id,
    sequence: 1,
  }

export const questionnaireToQuestionForConsecutiveConstrains2Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireWithConsecutiveConstrainedQuestionsFixture.id,
    questionId: questionStaticSexualOrientationFixture.id,
    sequence: 2,
  }

export const questionnaireToQuestionForConsecutiveConstrains3Fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireWithConsecutiveConstrainedQuestionsFixture.id,
    questionId: integerQuestionFixture.id,
    sequence: 3,
  }
