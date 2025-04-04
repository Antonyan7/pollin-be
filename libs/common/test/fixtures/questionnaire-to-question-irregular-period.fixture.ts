import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {
  questionnaireWithPatientIntakeMaleCompletedFixture,
  questionnaire_irregularPeriodsAllowed,
  questionnaire_irregularPeriodsAllowedInServiceType,
} from '@libs/common/test/fixtures/questionnaire.fixture'
import {
  question_irregularPeriodsAllowed_daysBetweenPeriods_fixture,
  question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture,
  questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture,
  questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture,
} from '@libs/common/test/fixtures/question-irregular-period.fixture'
import {stringQuestion2Fixture} from './question.fixture'

export const qTq_irregularPeriodsAllowed_questionOlderThanNDays_fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaire_irregularPeriodsAllowed.olderThanNDays.id,
    questionId: question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture.id,
    sequence: 1,
  }
export const qTq_irregularPeriodsAllowed_LessThanNDaysMoreThenMDays_fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaire_irregularPeriodsAllowed.lessThanNDaysMoreThenMDays.id,
    questionId: question_irregularPeriodsAllowed_daysBetweenPeriods_fixture.id,
    sequence: 1,
  }
export const qTq_irregularPeriodsAllowed_in_serviceType_questionOlderThanNDays_fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId: questionnaire_irregularPeriodsAllowedInServiceType.olderThanNDays.id,
    questionId: questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture.id,
    sequence: 1,
  }
export const qTq_irregularPeriodsAllowed_in_serviceType_LessThanNDaysMoreThenMDays_fixture: Partial<QuestionnaireToQuestion> =
  {
    questionnaireId:
      questionnaire_irregularPeriodsAllowedInServiceType.lessThanNDaysMoreThenMDays.id,
    questionId: questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture.id,
    sequence: 1,
  }
export const questionnaireToQuestionWithRegexForValidationFixture: Partial<QuestionnaireToQuestion> =
  {
    questionId: stringQuestion2Fixture.id,
    questionnaireId: questionnaireWithPatientIntakeMaleCompletedFixture.id,
    sequence: 2,
  }
