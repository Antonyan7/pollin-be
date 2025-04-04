import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {v4} from 'uuid'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {QuestionnaireJourneyMilestone} from '@libs/data-layer/apps/questionnaires/enums/questionnaire-enums'
import {
  introductionFixture,
  introductionForBookingFlowFixture,
  introductionForQuestionnaireWithAnswersFixture,
  introductionForQuestionnaireWithoutAnswersFixture,
} from '@libs/common/test/fixtures/introduction.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))
export const questionnaireUUID1PatientIntakeFemaleCompletedFixture: string = 'FxLgoRDZWSzuqYl2r6l1y'
export const questionnaireOhipUUID: string = 'fba500db-5160-485c-b80d-ac78ca2d5eee'
export const questionnaireHasOhipCardUUID: string = 'fba500db-5160-485c-b80d-ac78ca2d5ccc'
export const questionnaireIntentOhipUUID: string = '4dca90a6-84ac-4e42-850e-be69983543e9'
export const questionnaireTypeUUID: string = '-dLwzjQnY0bn9gEH6bddY'
export const questionnaireUUID4: string = 'e06d0d1f-5ff4-42a6-ad09-36a35fe2c9db'
const questionnaireQuestionnaireIntentUUID: string = v4()
const questionnaireServiceCategoryNotExistsUUID: string = v4()
export const questionnaireForBookingFlowId: number = 10
export const questionnaireForBookingFlowUUID: string = '25a6c54f-4ac4-4e11-bf70-629e38d9bb95'
export const questionnaireTestSequenceUUID: string = '25a6c54f-4ac4-4e11-bf70-629e38d9bb99'
export const questionnaireId_Progress: number = 17
export const questionnaireId_Ohip: number = 14
export const questionnaireId_IntentOhip: number = 15
export const questionnaireId3: number = 11
export const questionnaireUUID3: string = '570890a0-f00c-4c81-baf6-e3704e915714'
export const questionnaireRepeatUUID: string = 'f35c7a05-731d-4309-b03a-ec8ed992aea1'
export const questionnaireOhipValidationUUID1: string = 'FxLgoR5tWS5tqY5tr65ty'

export const questionnaireFixture: Partial<Questionnaire> = {
  id: 1,
  uuid: '98b83e1d-a71b-4df7-8c9f-219c7404378f',
  title: 'questionnaire-fixture',
}

export const questionnaire2Fixture: Partial<Questionnaire> = {
  id: 2,
  uuid: '4dca90a6-84ac-4e42-850e-be69983543e8',
}

export const questionnaireServiceGroupFixture: Partial<Questionnaire> = {
  id: 3,
  uuid: questionnaireQuestionnaireIntentUUID,
}

export const questionnaireServiceCategoryNotExistsFixture: Partial<Questionnaire> = {
  id: 4,
  uuid: questionnaireServiceCategoryNotExistsUUID,
}

export const questionnaireWithPatientIntakeFemaleCompletedFixture: Partial<Questionnaire> = {
  id: 5,
  uuid: questionnaireUUID1PatientIntakeFemaleCompletedFixture,
  journeyMilestone: QuestionnaireJourneyMilestone.PatientIntakeFemale,
}

export const questionnaireForOhipServiceCategoryFixture: Partial<Questionnaire> = {
  id: 6,
  uuid: questionnaireOhipUUID,
}
export const questionnaireForServiceCategoryTypeFixture: Partial<Questionnaire> = {
  id: 9,
  uuid: questionnaireTypeUUID,
}

export const questionnaireForBookingFlow: Partial<Questionnaire> = {
  id: questionnaireForBookingFlowId,
  uuid: questionnaireForBookingFlowUUID,
  introductionId: introductionForBookingFlowFixture.id,
}

export const questionnaireMultiSelectFixture: Partial<Questionnaire> = {
  id: questionnaireId3,
  uuid: questionnaireUUID3,
}

// type Questionnaire just for this 1 fixture
export const questionnaireUnitFixture: Questionnaire = {
  id: 12,
  uuid: questionnaireUUID4,
  title: 'TEST_TITLE',
  questionnaireToQuestions: null,
  serviceCategory: null,
  updatedAt: dateTimeUtil.now(),
  createdAt: dateTimeUtil.now(),
  updatedBy: 'SEED',
  serviceCategoryId: 0,
  revision: 1,
  introduction: null,
  introductionId: null,
  internalName: 'TEST_INTERNAL_NAME',
  deletedAt: null,
}

export const questionnaireFixtureTwo: Partial<Questionnaire> = {
  id: 13,
  uuid: '33b22867-1332-11ed-814e-0242ac666002',
  title: 'questionnaire-fixture2',
}

export const questionnaireOhip1Fixture: Partial<Questionnaire> = {
  id: questionnaireId_Ohip,
  uuid: '62322a0b-12c4-4d0f-b276-4660148a9334',
}

export const questionnaireOhip2Fixture: Partial<Questionnaire> = {
  id: questionnaireId_IntentOhip,
  uuid: '502e6f86-ee6d-407e-a03d-ad0d125d2add',
}

export const questionnaireProgressFixture: Partial<Questionnaire> = {
  id: questionnaireId_Progress,
  uuid: 'dbd306f7-be43-4c14-b29a-e28902286f27',
}

export const questionnairePrevQuestionFixture: Partial<Questionnaire> = {
  id: 18,
  uuid: 'preQWithConstQuestionaireUUID',
}
export const questionnairePeriodFixture: Partial<Questionnaire> = {
  id: 19,
  uuid: 'pbd306f7-be43-4c14-b29a-e28902286f25',
}
export const questionnaireGenderFixture: Partial<Questionnaire> = {
  id: 20,
  uuid: 'dbd306f7-be43-4c14-b29a-e28902286f26',
}
export const questionnaireMaleSexAtBirthUpdatePatientFixture: Partial<Questionnaire> = {
  id: 21,
  uuid: 21 + '000000-0000-0000-0000-000_Quest_re',
}
export const questionnaireFemaleSexAtBirthUpdatePatientFixture: Partial<Questionnaire> = {
  id: 22,
  uuid: 22 + '000000-0000-0000-0000-000_Quest_re',
}

// 1. START get-prev-question-group.test.ts
export const questionnaireId_getPrev_group_fixture: number = 25
export const questionnaire_getPrev_group_fixture: Partial<Questionnaire> = {
  id: questionnaireId_getPrev_group_fixture,
  uuid: 25 + '000000-0000-0000-0000-000_Quest_re',
}
// 1.1 END

// 3. START get-prev-question-simple.test.ts
export const questionnaireId_getPrev_simple_fixture: number = 26
export const questionnaire_getPrev_simple_fixture: Partial<Questionnaire> = {
  id: questionnaireId_getPrev_simple_fixture,
  uuid: 26 + '000000-0000-0000-0000-000_Quest_re',
}

// 3.1 END

// Ids 40-45 reserved for questionnaire-revision.fixture.ts
// Ids 50-55 reserved for get-next-question-without-answer.fixture.ts
// Ids 70-80 reserved for question-validation-count.fixture.ts

export const questionnaire_irregularPeriodsAllowed: {
  olderThanNDays: Partial<Questionnaire>
  lessThanNDays: Partial<Questionnaire>
  lessThanNDaysMoreThenMDays: Partial<Questionnaire>
  notLessThanNDaysMoreThenMDays: Partial<Questionnaire>
} = {
  olderThanNDays: {
    id: 81,
    uuid: '81_questionnaire',
  },
  lessThanNDays: {
    id: 82,
    uuid: '82_questionnaire',
  },
  lessThanNDaysMoreThenMDays: {
    id: 83,
    uuid: '83_questionnaire',
  },
  notLessThanNDaysMoreThenMDays: {
    id: 84,
    uuid: '84_questionnaire',
  },
}
export const questionnaire_irregularPeriodsAllowedInServiceType: {
  olderThanNDays: Partial<Questionnaire>
  lessThanNDays: Partial<Questionnaire>
  lessThanNDaysMoreThenMDays: Partial<Questionnaire>
  notLessThanNDaysMoreThenMDays: Partial<Questionnaire>
} = {
  olderThanNDays: {
    id: 85,
    uuid: 85 + 'questionnaire',
  },
  lessThanNDays: {
    id: 86,
    uuid: 86 + 'questionnaire',
  },
  lessThanNDaysMoreThenMDays: {
    id: 87,
    uuid: 87 + 'questionnaire',
  },
  notLessThanNDaysMoreThenMDays: {
    id: 88,
    uuid: 88 + 'questionnaire',
  },
}

// Ids 100-110 reserved for question-validation-max-date.fixture.ts

export const questionnaireWithAnswersFixture: Partial<Questionnaire> = {
  id: 111,
  uuid: 111 + '_questionnaire',
  serviceCategoryId: 0,
  revision: 1,
  introductionId: introductionForQuestionnaireWithAnswersFixture.id,
}

export const questionnaireWithoutAnswersFixture: Partial<Questionnaire> = {
  id: 112,
  uuid: 'a983fb00-13ee-4bdf-9862-113a50c2e54a',
  title: 'questionnaireWithoutAnswersTitle',
  introductionId: introductionForQuestionnaireWithoutAnswersFixture.id,
}

export const questionnaireForStaticAnswerOptionsFixtureId: number = 115

export const questionnaireForStaticAnswerOptionsFixture: Partial<Questionnaire> = {
  id: questionnaireForStaticAnswerOptionsFixtureId,
  uuid: 'a983fb00-13ee-4bdf-9862-113a50c2e54b',
  title: 'questionnaireForStaticAnswerOptions',
}

export const questionnaireForServiceCategoryFixture: Partial<Questionnaire> = {
  id: 113,
  uuid: 'b7a885ab-2fc0-450e-b8de-515f5b3cb8b3',
  title: 'questionnaireForServiceCategoryFixture',
  introductionId: introductionFixture.id,
}

export const questionnaireForOnlyServiceCategoryFixture: Partial<Questionnaire> = {
  id: 114,
  uuid: 'f35c7a05-731d-4309-b03a-ec8ed992aea0',
  title: 'questionnaireForOnlyServiceCategoryFixture',
}

export const questionnaireForGroupQuestionFixture: Partial<Questionnaire> = {
  id: 116,
  uuid: questionnaireRepeatUUID,
  title: 'questionnaireForGroupQuestionFixture',
}

export const questionnaireForServiceGroupFixture: Partial<Questionnaire> = {
  id: 117,
  uuid: '33b22867-1332-11ed-814e-0242ac666003',
  title: 'questionnaire-fixture-service-group',
}

export const questionnaireYearDropdownFixture: Partial<Questionnaire> = {
  id: 118,
  uuid: 'f35c7a05-731d-4309-b03a-ec8ed992aea2',
}

// Ids 120-125 reserved for questionnaire-submitted.fixture.ts

export const questionnaireForStaticAnswerConstraintFixture: Partial<Questionnaire> = {
  id: 126,
  uuid: '33b22867-1332-11ed-814e-0242ac666118',
}

export const questionnaireForStaticAnswerConstraintGroupFixture: Partial<Questionnaire> = {
  id: 127,
  uuid: '33b22867-1332-11ed-814e-0242ac666119',
}

export const questionnaireForTestSequenceFixture: Partial<Questionnaire> = {
  id: 128,
  uuid: questionnaireTestSequenceUUID,
}

export const emptyQuestionnaireFixture: Partial<Questionnaire> = {
  id: 129,
  uuid: 'f35c7a05-731d-4309-b033-558ed992aub1',
}

export const questionnaireForAvailabilityFixture: Partial<Questionnaire> = {
  id: 135,
  uuid: '98b8641d-a71b-4df7-8c9f-219c740uu78f',
}

export const questionnaireForAvailabilityNextDayAvailFixture: Partial<Questionnaire> = {
  id: 136,
  uuid: '9986431d-a71b-44f7-8c9f-219c740uu78f',
}

// Ids 140-145 reserved for completed-for-display-type.ts

export const questionnairePatientDontHaveSexAtBirthFixture: Partial<Questionnaire> = {
  id: 150,
  uuid: 150 + '000two00-0000-0000-000_Quest_re',
}

export const questionnaireForConstraintFromAnotherQuestionnaireFixture: Partial<Questionnaire> = {
  id: 151,
  uuid: '33b22867-1332-11ed-814e-0242ac666123',
  introductionId: introductionFixture.id,
}

export const questionnaireWithPatientIntakeMaleCompletedFixture: Partial<Questionnaire> = {
  id: 152,
  uuid: '33b22867-1332-11ed-814e-0242ac666124',
  journeyMilestone: QuestionnaireJourneyMilestone.PatientIntakeMale,
}

export const questionnaireWithConsecutiveConstrainedQuestionsFixture: Partial<Questionnaire> = {
  id: 153,
  uuid: '33b22867-1332-11ed-814e-0242ac666153',
}

export const questionnaireForCheckRaceFixture: Partial<Questionnaire> = {
  id: 155,
  uuid: '52f6cd6a-9b62-11ed-a8fc-0242ac120002',
  title: 'questionnaireForCheckRaceFixture',
}

export const questionnaireWithSequencedAnswerOptionsFixture: Partial<Questionnaire> = {
  id: 156,
  uuid: '52f6cd6a-9b62-11ed-a8fc-0242ac120044',
}

export const questionnaireForPeriodAnswerDeletedFixture: Partial<Questionnaire> = {
  id: 158,
  uuid: '52f6cd6a-9b62-11ed-a8fc-y24yac120044',
}

export const questionnaireForIndirectRevisionChangeFixture: Partial<Questionnaire> = {
  id: 159,
  uuid: '52f6cd6a-9b62-11ed-a8fc-y24yac120045',
  revision: 1,
}

export const questionnaireForSexAtBirthMaleFixture: Partial<Questionnaire> = {
  id: 161,
  uuid: '52f6cd6a-9b62-11ed-a8fc-y24yac120046',
}

export const questionnaireWithHasMenstrualPeriodFixture: Partial<Questionnaire> = {
  id: 162,
  uuid: '52f6cd6a-9b62-11ed-a8fc-y24yac120047',
}

export const questionnaireWithHasOhipCardFixture: Partial<Questionnaire> = {
  id: 163,
  uuid: questionnaireHasOhipCardUUID,
}

export const questionnaireForOHIPFixture: Partial<Questionnaire> = {
  id: 165,
  uuid: '52f6bb6a-9b62-11ed-a8fc-y24yac120047',
}

export const questionnaireForOhipValidationFixture: Partial<Questionnaire> = {
  id: 170,
  uuid: questionnaireOhipValidationUUID1,
}

export const questionnaireForRevisionsNotChangedFixture: Partial<Questionnaire> = {
  id: 180,
  uuid: 180 + '_Questionnaire',
}

export const questionnaireSkipQuestionFixture: Partial<Questionnaire> = {
  id: 181,
  uuid: 181 + '_Questionnaire',
}

export const questionnaireForRemovedQuestionByRevisionFixture: Partial<Questionnaire> = {
  id: 183,
  uuid: 183 + '_Questionnaire',
}
