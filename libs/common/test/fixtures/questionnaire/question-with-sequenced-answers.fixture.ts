import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed} from '@seeds/typeorm'
import {questionnaireWithSequencedAnswerOptionsFixture} from '../questionnaire.fixture'

export const quetionWithSequencedAnswersFixture: QuestionInputSeed = {
  id: 235,
  uuid: 235 + '_Question',
  type: QuestionType.Choice,
}

export const questionnaireToQuestionWithSequencedAnswersFixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaireWithSequencedAnswerOptionsFixture.id,
    questionId: quetionWithSequencedAnswersFixture.id,
    sequence: 1,
  }
