import {QuestionInputSeed} from '@seeds/typeorm'
import {QuestionType} from '@libs/data-layer/apps/questionnaires/enums/question-type'
import {uuidSuffix} from '@libs/common/test/fixtures/question.fixture'
import {PatientInfoMapCode} from '@libs/services-common/enums'

export const questionEctopicPregnanciesYearFixture: QuestionInputSeed = {
  id: 211,
  uuid: 211 + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.EctopicPregnanciesYear,
}
export const questionEctopicPregnanciesTypeFixture: QuestionInputSeed = {
  id: 212,
  uuid: 212 + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.EctopicPregnanciesType,
}
export const questionEctopicPregnanciesMonthsToConceiveFixture: QuestionInputSeed = {
  id: 213,
  uuid: 213 + uuidSuffix,
  repeat: false,
  type: QuestionType.Choice,
  patientInfoMapCode: PatientInfoMapCode.EctopicPregnanciesMonthsToConceive,
}
