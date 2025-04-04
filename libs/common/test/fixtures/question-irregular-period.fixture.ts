import {QuestionInputSeed} from '@seeds/typeorm'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'

import {PatientInfoMapCode} from '@libs/services-common/enums'
export const question_irregularPeriodsAllowed_firstDayOfLastPeriod_fixture: QuestionInputSeed = {
  id: 181,
  uuid: '181_question',
  type: QuestionType.Date,
  patientInfoMapCode: PatientInfoMapCode.FirstDayOfLastPeriod,
}

export const question_irregularPeriodsAllowed_daysBetweenPeriods_fixture: QuestionInputSeed = {
  id: 182,
  uuid: '182_question',
  type: QuestionType.Date,
  patientInfoMapCode: PatientInfoMapCode.DaysBetweenPeriods,
}
export const questionIrregularPeriodsAllowedInServiceTypeFirstDayFixture: QuestionInputSeed = {
  id: 215,
  uuid: 215 + '_question',
  type: QuestionType.Date,
  patientInfoMapCode: PatientInfoMapCode.FirstDayOfLastPeriod,
}
export const questionIrregularPeriodsAllowedInServiceTypeDaysBetweenFixture: QuestionInputSeed = {
  id: 216,
  uuid: 216 + '_question',
  type: QuestionType.Date,
  patientInfoMapCode: PatientInfoMapCode.DaysBetweenPeriods,
}
