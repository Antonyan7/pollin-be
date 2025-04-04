import {
  choiceQuestionFixture,
  integerQuestionFixture,
  ohipGroupQuestionFixture,
  questionStaticNo2Fixture,
  questionStaticNoFixture,
} from './question.fixture'
import {
  ohipNumberChildQuestionDataFixture,
  question1Fixture,
  question2WithConstraintFixture,
  question3WithConstraintFixture,
  question3WithNotExecutedConstraintDataFixture,
  question4WithExecutedConstraintDataFixture,
  questionStaticNumberOfPregnanciesFixture,
  questionStaticSexAtBirthFixture,
  questionStaticGenderFixture,
  questionStaticSexualOrientationFixture,
} from '@libs/common/test/fixtures/question.fixture'
import {
  answerOptionForquestionConstraint1Fixture,
  answerOptionForQuestionConstraint2Fixture,
  answerOptionForQuestionConstraintPrevQuestion1Fixture,
  answerOptionForQuestionConstraintPrevQuestion2Fixture,
  answerOptionHasOhipYesFixture,
} from '@libs/common/test/fixtures/answer-option.fixture'
import {QuestionConstraintInputSeed} from '@seeds/typeorm'
import {childQuestionWithStaticAnswerFixture} from './questionnaire/get-next-contraint-question-by-static-answer.fixture'
import {StaticConstraintAnswerOption} from '@libs/services-common/enums/patient.enum'
import {
  questionnaireForConstraintFromAnotherQuestionnaireFixture,
  questionnaireForStaticAnswerConstraintFixture,
  questionnaireForStaticAnswerConstraintGroupFixture,
  questionnairePrevQuestionFixture,
  questionnaireWithConsecutiveConstrainedQuestionsFixture,
  questionnaireWithHasOhipCardFixture,
  questionnaireWithPatientIntakeFemaleCompletedFixture,
} from '@libs/common/test/fixtures/questionnaire.fixture'

export const questionConstraint1Fixture: QuestionConstraintInputSeed = {
  questionId: question3WithNotExecutedConstraintDataFixture.id,
  constraintQuestionId: ohipNumberChildQuestionDataFixture.id,
  answerOptionId: answerOptionForquestionConstraint1Fixture.id, //any value
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
}

export const questionConstraint2: QuestionConstraintInputSeed = {
  questionId: question4WithExecutedConstraintDataFixture.id,
  constraintQuestionId: ohipNumberChildQuestionDataFixture.id,
  answerOptionId: answerOptionForQuestionConstraint2Fixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
}

export const questionConstraintPrevQuestion1Fixture: QuestionConstraintInputSeed = {
  id: 20,
  questionId: question2WithConstraintFixture.id,
  constraintQuestionId: question1Fixture.id,
  answerOptionId: answerOptionForQuestionConstraintPrevQuestion1Fixture.id,
  questionnaireId: questionnairePrevQuestionFixture.id,
}

export const questionConstraintPrevQuestion2Fixture: QuestionConstraintInputSeed = {
  id: 25,
  questionId: question3WithConstraintFixture.id,
  constraintQuestionId: question1Fixture.id,
  answerOptionId: answerOptionForQuestionConstraintPrevQuestion2Fixture.id,
  questionnaireId: questionnaireForStaticAnswerConstraintGroupFixture.id,
}

export const questionConstraintFixture: QuestionConstraintInputSeed = {
  id: 35,
  questionId: questionStaticNumberOfPregnanciesFixture.id,
  constraintQuestionId: questionStaticSexAtBirthFixture.id,
  questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
  staticAnswer: StaticConstraintAnswerOption.Female,
}

export const questionConstraint2Fixture: QuestionConstraintInputSeed = {
  id: 36,
  questionId: questionStaticNo2Fixture.id,
  constraintQuestionId: questionStaticNoFixture.id,
  questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
  staticAnswer: StaticConstraintAnswerOption.No,
}

export const questionConstraintForGroupChildFixture: QuestionConstraintInputSeed = {
  id: 40,
  questionId: questionStaticGenderFixture.id,
  questionnaireId: questionnaireForStaticAnswerConstraintGroupFixture.id,
  constraintQuestionId: childQuestionWithStaticAnswerFixture.id,
  staticAnswer: StaticConstraintAnswerOption.Female,
}

export const questionConstraintByAnotherQuestionnaireFixture: QuestionConstraintInputSeed = {
  id: 45,
  questionId: questionStaticGenderFixture.id,
  constraintQuestionId: questionStaticSexAtBirthFixture.id,
  questionnaireId: questionnaireForConstraintFromAnotherQuestionnaireFixture.id,
  staticAnswer: StaticConstraintAnswerOption.Female,
}

export const questionConstraintByAnotherQuestionnaireForInitialFixture: QuestionConstraintInputSeed =
  {
    id: 50,
    questionId: questionStaticSexAtBirthFixture.id,
    constraintQuestionId: questionStaticSexualOrientationFixture.id,
    questionnaireId: questionnaireForConstraintFromAnotherQuestionnaireFixture.id,
    staticAnswer: StaticConstraintAnswerOption.Other,
  }

export const questionConstraintForGroupChildOfAnotherQuestionnaireFixture: QuestionConstraintInputSeed =
  {
    id: 55,
    questionId: questionStaticNumberOfPregnanciesFixture.id,
    constraintQuestionId: childQuestionWithStaticAnswerFixture.id,
    questionnaireId: questionnaireForConstraintFromAnotherQuestionnaireFixture.id,
    staticAnswer: StaticConstraintAnswerOption.Female,
  }

export const questionConstraintForForConsecutiveConstraints1Fixture: QuestionConstraintInputSeed = {
  id: 60,
  questionId: questionStaticSexualOrientationFixture.id,
  questionnaireId: questionnaireWithConsecutiveConstrainedQuestionsFixture.id,
  constraintQuestionId: questionStaticSexAtBirthFixture.id,
  staticAnswer: StaticConstraintAnswerOption.Male,
}

export const questionConstraintForForConsecutiveConstraints2Fixture: QuestionConstraintInputSeed = {
  id: 65,
  questionId: integerQuestionFixture.id,
  questionnaireId: questionnaireWithConsecutiveConstrainedQuestionsFixture.id,
  constraintQuestionId: questionStaticSexualOrientationFixture.id,
  staticAnswer: StaticConstraintAnswerOption.Male,
}

export const questionConstraintOhipCardNoFixture: QuestionConstraintInputSeed = {
  id: 66,
  questionId: ohipGroupQuestionFixture.id,
  questionnaireId: questionnaireWithHasOhipCardFixture.id,
  constraintQuestionId: choiceQuestionFixture.id,
  answerOptionId: answerOptionHasOhipYesFixture.id,
}
