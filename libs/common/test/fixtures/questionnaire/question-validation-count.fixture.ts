import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed, ServiceCategoryInputSeed} from '@seeds/typeorm'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'

/**
 * Questionnaire Ids 70-80
 */
export const questionnaire_questionValidation_fixture: Partial<Questionnaire> = {
  id: 70,
  uuid: 70 + '_Questionnaire',
}

/**
 * ServiceCategory 70-80
 * may using in another test cases
 */
export const serviceCategory_questionValidation_fixture: ServiceCategoryInputSeed = {
  id: 70,
  uuid: 70 + '_ServiceCategory',
  questionnaireId: questionnaire_questionValidation_fixture.id,
}

/**
 * Question 170-180
 */

export const question_questionValidation_group_fixture: QuestionInputSeed = {
  id: 170,
  uuid: 170 + '_Question',
  type: QuestionType.Group,
  maxCountValidation: 2,
  errorMessageForValidation: 'maxRepeatedCountForGroupIs2',
}

export const question_questionValidation_childGroup_fixture: QuestionInputSeed = {
  id: 171,
  uuid: 171 + '_Question',
  parentQuestionId: question_questionValidation_group_fixture.id,
  type: QuestionType.String,
}

export const question_questionValidation_multiChoice_fixture: QuestionInputSeed = {
  id: 172,
  uuid: 172 + '_Question',
  type: QuestionType.MultipleChoice,
  maxCountValidation: 2,
  errorMessageForValidation: 'maxRepeatedCountForMultipleChoiceIs2',
}

/**
 * QuestionnaireToQuestion
 */

export const qTq_questionValidation_group_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_questionValidation_group_fixture.id,
  questionnaireId: questionnaire_questionValidation_fixture.id,
  sequence: 1,
}

export const qTq_questionValidation_multiChoice_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_questionValidation_multiChoice_fixture.id,
  questionnaireId: questionnaire_questionValidation_fixture.id,
  sequence: 2,
}
