import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'
import {
  groupQuestionFixture,
  questionMiscarriageYearfixture,
  questionShowOnlyPortalFixture,
  questionYearDropdownChildQuestionFixture,
  questionYearDropdownGroupQuestionFixture,
  questionYearDropdownWithPreTermDeliveryYearChildQuestionFixture,
} from '@libs/common/test/fixtures/question.fixture'
import {
  questionnaireWithPatientIntakeFemaleCompletedFixture,
  questionnaireYearDropdownFixture,
} from '@libs/common/test/fixtures/questionnaire.fixture'

export const questionnaireToQuestionYearDropdownMiscarriageYearFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionMiscarriageYearfixture.id,
    questionnaireId: questionnaireYearDropdownFixture.id,
    sequence: 1,
  }

export const questionnaireToQuestionYearDropdownParentFixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionYearDropdownGroupQuestionFixture.id,
  questionnaireId: questionnaireYearDropdownFixture.id,
  sequence: 2,
}
export const questionnaireToQuestionYearDropdownChildFixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionYearDropdownChildQuestionFixture.id,
  questionnaireId: questionnaireYearDropdownFixture.id,
  sequence: 3,
}
export const questionnaireToQuestionYearDropdownChildWithPreTermDeliveryYearFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: questionYearDropdownWithPreTermDeliveryYearChildQuestionFixture.id,
    questionnaireId: questionnaireYearDropdownFixture.id,
    sequence: 4,
  }
export const questionnaireToGroupQuestionFixture: Partial<QuestionnaireToQuestion> = {
  questionId: groupQuestionFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 3,
}
export const questionnaireToQuestionShowPortalFixture: Partial<QuestionnaireToQuestion> = {
  questionId: questionShowOnlyPortalFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
  sequence: 6,
  sequencePortal: 6,
  showJustOnPortal: true,
}
