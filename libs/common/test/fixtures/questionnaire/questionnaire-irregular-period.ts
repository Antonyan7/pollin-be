import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {QuestionInputSeed} from '@seeds/typeorm'
import {questionnaireWithHasMenstrualPeriodFixture} from '../questionnaire.fixture'
import {PatientInfoMapCode} from '@libs/services-common/enums'

export const questionWithHasPeriodFixture: QuestionInputSeed = {
  id: 8001,
  uuid: 8001 + '_Question',
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.HasPeriod,
}

export const questionnaireToQuestionWithHasPeriodFixture: Partial<QuestionnaireToQuestion> = {
  questionnaireId: questionnaireWithHasMenstrualPeriodFixture.id,
  questionId: questionWithHasPeriodFixture.id,
  sequence: 1,
}
