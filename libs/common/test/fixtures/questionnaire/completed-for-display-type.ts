import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed, ServiceCategoryInputSeed} from '@seeds/typeorm'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'

/**
 * Questionnaire Ids 140-145
 */
export const questionnaire_completedByDisplay_fixture: Partial<Questionnaire> = {
  id: 142,
  uuid: 142 + '_Questionnaire',
}

/**
 * ServiceCategory 110-115
 */
export const serviceCategory_completedByDisplay_fixture: ServiceCategoryInputSeed = {
  id: 110,
  uuid: 110 + '_ServiceCategory',
  questionnaireId: questionnaire_completedByDisplay_fixture.id,
}

/**
 * Question 220-225
 */

export const question_completedByDisplay_first_fixture: QuestionInputSeed = {
  id: 220,
  uuid: 220 + '_Question',
}

/** after type=display - is completed should be true */
export const question_completedByDisplay_secondDisplay_fixture: QuestionInputSeed = {
  id: 221,
  uuid: 221 + '_Question',
  type: QuestionType.Display,
  textHtml: 'textDescription question_completedByDisplay_secondDisplay_fixture',
}

/**
 * QuestionnaireToQuestion
 */

export const qTq_completedByDisplay_first_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_completedByDisplay_first_fixture.id,
  questionnaireId: questionnaire_completedByDisplay_fixture.id,
  sequence: 1,
}

export const qTq_completedByDisplay_secondDisplay_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_completedByDisplay_secondDisplay_fixture.id,
  questionnaireId: questionnaire_completedByDisplay_fixture.id,
  sequence: 2,
}
