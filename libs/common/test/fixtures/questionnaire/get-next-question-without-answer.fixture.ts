import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed, ServiceCategoryInputSeed} from '@seeds/typeorm'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'

/**
 * Questionnaire Ids 50-55
 */
export const questionnaire_getNextQWithoutAnswer_fixture: Partial<Questionnaire> = {
  id: 50,
  uuid: 50 + '_Questionnaire',
}

/**
 * ServiceCategory 40-45
 */
export const serviceCategory_getNextQWithoutAnswer_fixture: ServiceCategoryInputSeed = {
  id: 40,
  uuid: 40 + '_ServiceCategory',
  questionnaireId: questionnaire_getNextQWithoutAnswer_fixture.id,
}

/**
 * Question 110-120
 */
export const question_getNextQWithoutAnswer_first_fixture: QuestionInputSeed = {
  id: 110,
  uuid: 110 + '_Question',
  type: QuestionType.String,
}

export const question_getNextQWithoutAnswer_second_fixture: QuestionInputSeed = {
  id: 111,
  uuid: 111 + '_Question',
  type: QuestionType.String,
  required: false,
}

export const question_getNextQWithoutAnswer_fixture: QuestionInputSeed = {
  id: 118,
  uuid: 118 + '_Question',
  type: QuestionType.String,
  required: false,
}

export const question_getNextQWithoutAnswer_third_group_fixture: QuestionInputSeed = {
  id: 112,
  uuid: 112 + '_Question',
  type: QuestionType.Group,
  required: false,
}
export const question_getNextQWithoutAnswer_third_child_one_fixture: QuestionInputSeed = {
  id: 113,
  uuid: 113 + '_Question',
  type: QuestionType.String,
  required: false,
  parentQuestionId: question_getNextQWithoutAnswer_third_group_fixture.id,
}
export const question_getNextQWithoutAnswer_third_child_two_fixture: QuestionInputSeed = {
  id: 114,
  uuid: 114 + '_Question',
  type: QuestionType.String,
  required: false,
  parentQuestionId: question_getNextQWithoutAnswer_third_group_fixture.id,
}
export const question_getNextQWithoutAnswer_last_fixture: QuestionInputSeed = {
  id: 115,
  uuid: 115 + '_Question',
  type: QuestionType.String,
  required: false,
}

export const question_getNextQWithoutAnswerWithMaxLenght_fixture: QuestionInputSeed = {
  id: 116,
  uuid: 116 + '_Question',
  type: QuestionType.String,
  required: false,
  maxLengthValidation: 200,
}

/**
 * QuestionnaireToQuestion
 */
export const qTq_getNextQWithoutAnswer_first_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getNextQWithoutAnswer_first_fixture.id,
  questionnaireId: questionnaire_getNextQWithoutAnswer_fixture.id,
  sequence: 1,
}

export const qTq_getNextQWithoutAnswer_second_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getNextQWithoutAnswer_second_fixture.id,
  questionnaireId: questionnaire_getNextQWithoutAnswer_fixture.id,
  sequence: 2,
}

export const qTq_getNextQWithoutAnswer_group_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getNextQWithoutAnswer_third_group_fixture.id,
  questionnaireId: questionnaire_getNextQWithoutAnswer_fixture.id,
  sequence: 3,
}
export const qtq_getNextQWithoutAnswerWithMaxLenght_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getNextQWithoutAnswerWithMaxLenght_fixture.id,
  questionnaireId: questionnaire_getNextQWithoutAnswer_fixture.id,
  sequence: 4,
}

export const qTq_getNextQWithoutAnswer_last_fixture: Partial<QuestionnaireToQuestion> = {
  questionId: question_getNextQWithoutAnswer_last_fixture.id,
  questionnaireId: questionnaire_getNextQWithoutAnswer_fixture.id,
  sequence: 5,
}
