import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed, ServiceCategoryInputSeed} from '@seeds/typeorm'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'

// !! using this fixutres also for delete-prev-questionnaire-intent.test.ts
// but with another user -so it should not cross

/**
 * Questionnaire Ids 120-125
 */
export const questionnaire_submitted_noBookingFlow_fixture: Partial<Questionnaire> = {
  id: 120,
  uuid: 120 + '_Questionnaire',
  serviceCategoryId: null, //without booking flow
}

export const questionnaire_submitted_hasBookingFlow_fixture: Partial<Questionnaire> = {
  id: 121,
  uuid: 121 + '_Questionnaire',
}

/**
 * ServiceCategory 95-100
 *
 */
export const serviceCategory_submitted_fixture: ServiceCategoryInputSeed = {
  id: 95,
  uuid: 95 + '_ServiceCategory',
  questionnaireId: questionnaire_submitted_hasBookingFlow_fixture.id,
}

/**
 * Question 190-200
 */
export const question_submitted_fixture: QuestionInputSeed = {
  id: 190,
  uuid: 190 + '_Question',
  type: QuestionType.String,
}

/**
 * QuestionnaireToQuestion
 */
export const qTq_submitted_noBooking_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_submitted_fixture.id,
  questionnaireId: questionnaire_submitted_noBookingFlow_fixture.id,
  sequence: 1,
}
export const qTq_submitted_hasBooking_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_submitted_fixture.id,
  questionnaireId: questionnaire_submitted_hasBookingFlow_fixture.id,
  sequence: 1,
}
