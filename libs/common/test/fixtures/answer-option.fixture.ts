import {
  multiSelectQuestionFixture,
  questionOhipFixture,
  genderAtBirthQuestionFixture,
  ohipNumberChildQuestionDataFixture,
  question1Fixture,
  question_getPrev_groupChild_fixture,
  questionSeeCounsellorForStressFixture,
  choiceQuestionFixture,
  questionForMultiSelectFixture,
} from '@libs/common/test/fixtures/question.fixture'
import {applicationCodeExistsTypeFixture} from '@libs/common/test/fixtures/application-code.fixture'
import {AnswerOptionInputSeed} from '@seeds/typeorm'
import {AnswerOption} from '@libs/data-layer/apps/questionnaires/entities/typeorm/answer-options.entity'
import {
  question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture,
  questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture,
} from '@libs/common/test/fixtures/question-irregular-period.fixture'
import {quetionWithSequencedAnswersFixture} from './questionnaire/question-with-sequenced-answers.fixture'

export const answerOptionFixture: AnswerOptionInputSeed = {
  id: 1,
  uuid: 'd0ae4e4a-2fc6-428a-80b9-9c5ad95fc9aa',
  display: 'display',
  questionId: questionOhipFixture.id,
  applicationCodeId: applicationCodeExistsTypeFixture.id,
}

export const answerOptionMultiSelectFixture: Partial<AnswerOption> = {
  id: 3,
  uuid: 'd0ae4e4a-2fc6-428a-80b9-9c5ad95fc9ef',
  display: 'answerValue1',
  questionId: multiSelectQuestionFixture.id,
}

export const secondAnswerOptionMultiSelectFixture: Partial<AnswerOption> = {
  id: 4,
  uuid: '6c965fc2-6a35-4c60-b3e0-cbd24932c6d4',
  display: 'answerValue2',
  questionId: multiSelectQuestionFixture.id,
}

export const answerOptionForQuestionConstraint2Fixture: AnswerOptionInputSeed = {
  id: 6,
  uuid: 6 + '0000000-0000-0000-0000-AnswerOption',
  questionId: ohipNumberChildQuestionDataFixture.id, //should be constraintQuestionId from QuestionConstraintFixture
}

export const answerOptionForQuestionConstraintPrevQuestion1Fixture: AnswerOptionInputSeed = {
  id: 8,
  uuid: 8 + '_000000-0000-0000-0000-AnswerOption',
  questionId: question1Fixture.id,
}

export const answerOptionForQuestionConstraintPrevQuestion2Fixture: AnswerOptionInputSeed = {
  id: 9,
  uuid: 9 + '_000000-0000-0000-0000-AnswerOption',
  questionId: question1Fixture.id,
}
export const answerOptionForquestionConstraint1Fixture: AnswerOptionInputSeed = {
  id: 10,
  uuid: 10 + '_00000-0000-0000-0000-AnswerOption',
  questionId: ohipNumberChildQuestionDataFixture.id,
}
export const answerOptionWithGenderAtBirthMaleFixture: AnswerOptionInputSeed = {
  id: 11,
  uuid: 'GenderAtBirthMaleUUID',
  questionId: genderAtBirthQuestionFixture.id,
}
export const answerOptionWithGenderAtBirthFemaleFixture: AnswerOptionInputSeed = {
  id: 12,
  uuid: 'GenderAtBirthFemaleUUID',
  questionId: genderAtBirthQuestionFixture.id,
}

// 1. START get-prev-question-group.test.ts
question_getPrev_groupChild_fixture

export const answerOption1_getPrev_groupChild_fixture: AnswerOptionInputSeed = {
  id: 15,
  uuid: 15 + 'AnswerOptionChild1',
  questionId: question_getPrev_groupChild_fixture.id,
}

export const answerOption2_getPrev_groupChild_fixture: AnswerOptionInputSeed = {
  id: 16,
  uuid: 16 + 'AnswerOptionChild2',
  questionId: question_getPrev_groupChild_fixture.id,
}
// 1.1. END

export const answer_irregularPeriodsAllowed1_fixture: AnswerOptionInputSeed = {
  id: 17,
  uuid: '17_answer',
  questionId: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.id,
}

export const answerOptionStaticfixture: AnswerOptionInputSeed = {
  id: 18,
  uuid: 18 + 'AnswerOption1',
  questionId: questionSeeCounsellorForStressFixture.id,
}
export const answer_irregularPeriodsAllowed_in_serviceType_fixture: AnswerOptionInputSeed = {
  id: 19,
  uuid: 19 + '_answer',
  questionId: questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture.id,
}

// Ids 20-30 reserved for questionnaire-revision.fixture.ts

export const answerOptionNotSequencedFixture: AnswerOptionInputSeed = {
  id: 31,
  uuid: 31 + '_answer',
  questionId: quetionWithSequencedAnswersFixture.id,
}

export const answerOptionSequencedSecondFixture: AnswerOptionInputSeed = {
  id: 32,
  uuid: 32 + '_answer',
  questionId: quetionWithSequencedAnswersFixture.id,
  sequence: 2,
}

export const answerOptionSequencedFirstFixture: AnswerOptionInputSeed = {
  id: 33,
  uuid: 33 + '_answer',
  questionId: quetionWithSequencedAnswersFixture.id,
  sequence: 1,
}
export const answerOptionHasOhipYesFixture: AnswerOptionInputSeed = {
  id: 34,
  uuid: 34 + '_answer',
  display: 'Yes',
  questionId: choiceQuestionFixture.id,
  sequence: 1,
}
export const answerOptionHasOhipNoFixture: AnswerOptionInputSeed = {
  id: 35,
  uuid: 35 + '_answer',
  display: 'No',
  questionId: choiceQuestionFixture.id,
  sequence: 2,
}

export const answerOptionForOneMultiSelectQuestionFixture: Partial<AnswerOption> = {
  id: 40,
  uuid: 'b15bd122-e838-4147-9571-d592ed3d6e3a',
  display: 'answerValue111',
  questionId: questionForMultiSelectFixture.id,
}

export const answerOptionForTwoMultiSelectQuestionFixture: Partial<AnswerOption> = {
  id: 41,
  uuid: 'de4040b0-d447-4f5e-be46-212e53a6ae23',
  display: 'answerValue222',
  questionId: questionForMultiSelectFixture.id,
}
