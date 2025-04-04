import {QuestionnaireIntent} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {
  emptyQuestionnaireFixture,
  questionnaireForServiceCategoryFixture,
} from '../questionnaire.fixture'
import {serviceCategoryFixture} from '../service-category.fixture'
import {patientForQuestionnaireFlowDetailsFixture} from '../patient.fixture'

export const questionnaireIntentCompletedFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-completed',
  questionnaireId: questionnaireForServiceCategoryFixture.id,
  patientId: patientForQuestionnaireFlowDetailsFixture.id,
  isCompleted: true,
  serviceCategoryId: serviceCategoryFixture.id,
  questions: [],
}

export const questionnaireIntentWithRevisionChangedFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire-intent-revision-changed',
  questionnaireId: emptyQuestionnaireFixture.id,
  patientId: patientForQuestionnaireFlowDetailsFixture.id,
  isCompleted: false,
  serviceCategoryId: serviceCategoryFixture.id,
  questions: [],
  questionnaireRevision: 10,
}
