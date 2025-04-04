import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed, ServiceCategoryInputSeed} from '@seeds/typeorm'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'
import {
  applicationCodeMaxDateTodayFixture,
  applicationCodeMaxDateYesterdayFixture,
} from '../application-code.fixture'

/**
 * Questionnaire Ids 100-110
 */
export const questionnaire_questionValidationMaxDate_fixture: Partial<Questionnaire> = {
  id: 100,
  uuid: 100 + '_Questionnaire',
}

/**
 * ServiceCategory 100-110
 */
export const serviceCategory_questionValidationMaxDate_fixture: ServiceCategoryInputSeed = {
  id: 100,
  uuid: 100 + '_ServiceCategory',
  questionnaireId: questionnaire_questionValidationMaxDate_fixture.id,
}

/**
 * Question 200-210
 */

export const question_questionValidationMaxDate_today_fixture: QuestionInputSeed = {
  id: 200,
  uuid: 200 + '_Question',
  applicationCodeId: applicationCodeMaxDateTodayFixture.id,
  errorMessageForValidation: 'Date shold be less than now',
  type: QuestionType.Date,
}

export const question_questionValidationMaxDate_yesterday_fixture: QuestionInputSeed = {
  id: 201,
  uuid: 201 + '_Question',
  applicationCodeId: applicationCodeMaxDateYesterdayFixture.id,
  errorMessageForValidation: 'Date shold be less than Yesterday 23:59',
  type: QuestionType.Date,
}

/**
 * QuestionnaireToQuestion
 */

export const qTq_questionValidationMaxDate_today_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_questionValidationMaxDate_today_fixture.id,
  questionnaireId: questionnaire_questionValidationMaxDate_fixture.id,
  sequence: 1,
}

export const qTq_questionValidationMaxDate_yesterday_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_questionValidationMaxDate_yesterday_fixture.id,
  questionnaireId: questionnaire_questionValidationMaxDate_fixture.id,
  sequence: 2,
}
