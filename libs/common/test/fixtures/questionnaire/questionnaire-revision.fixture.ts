import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {AnswerOptionInputSeed, QuestionInputSeed, ServiceCategoryInputSeed} from '@seeds/typeorm'

/**
 * Questionnaire Ids 40-45
 */
export const questionnaireRevisionFixture: Partial<Questionnaire> = {
  id: 40,
  uuid: 40 + '_Questionnaire',
}

/**
 * ServiceCategory 30-35
 */
export const serviceCategory_revision_fixture: ServiceCategoryInputSeed = {
  id: 30,
  uuid: 30 + '_ServiceCategory',
  questionnaireId: questionnaireRevisionFixture.id,
}

/**
 * Question 90-100
 */
export const question_revision_fixture: QuestionInputSeed = {
  id: 90,
  uuid: 90 + '_Question',
  type: QuestionType.String,
}

/**will be added later to questionnaire to check changing revision */
export const question_revision_WiilBeAddedLater_fixture: QuestionInputSeed = {
  id: 91,
  uuid: 91 + '_Question',
  type: QuestionType.String,
}

/**
 * QuestionnaireToQuestion
 */
export const qTq_revision_fixture = {
  questionId: question_revision_fixture.id,
  questionnaireId: questionnaireRevisionFixture.id,
  sequence: 1,
}

/**
 * AnswerOption 20-30
 */
export const answerOption_revision_fixture: AnswerOptionInputSeed = {
  id: 20,
  uuid: 20 + '_AnswerOption',
  questionId: question_revision_fixture.id,
}
