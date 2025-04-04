import {
  questionnaire_irregularPeriodsAllowed,
  questionnaire_irregularPeriodsAllowedInServiceType,
  questionnaireFemaleSexAtBirthUpdatePatientFixture,
  questionnaireFixture,
  questionnaireFixtureTwo,
  questionnaireForBookingFlowId,
  questionnaireForOhipServiceCategoryFixture,
  questionnaireForOnlyServiceCategoryFixture,
  questionnaireForServiceCategoryFixture,
  questionnaireForServiceCategoryTypeFixture,
  questionnaireForServiceGroupFixture,
  questionnaireForSexAtBirthMaleFixture,
  questionnaireForStaticAnswerOptionsFixtureId,
  questionnaireForTestSequenceFixture,
  questionnaireGenderFixture,
  questionnaireId3,
  questionnaireId_getPrev_group_fixture,
  questionnaireId_getPrev_simple_fixture,
  questionnaireId_IntentOhip,
  questionnaireId_Ohip,
  questionnaireId_Progress,
  questionnaireMaleSexAtBirthUpdatePatientFixture,
  questionnairePatientDontHaveSexAtBirthFixture,
  questionnairePeriodFixture,
  questionnairePrevQuestionFixture,
  questionnaireServiceCategoryNotExistsFixture,
  questionnaireServiceGroupFixture,
  questionnaireWithAnswersFixture,
  questionnaireWithHasMenstrualPeriodFixture,
  questionnaireWithPatientIntakeFemaleCompletedFixture,
} from '@libs/common/test/fixtures/questionnaire.fixture'
import {v4} from 'uuid'
import {ServiceCategoryInputSeed} from '@seeds/typeorm'
import {MilestoneStep} from '@libs/services-common/enums/journey-enum'

const serviceCategoryExistsUUID: string = 'dec82b01-132d-11ed-814a-0242ac110002'
const serviceCategoryInvalidUUID: string = v4()

export const serviceCategoryTestSequence: ServiceCategoryInputSeed = {
  id: 1,
  title: 'a',
  questionnaireId: questionnaireForTestSequenceFixture.id,
  uuid: 'dec82b01-132d-11ed-814e-0242ac110003',
}

export const serviceCategoryFixture: ServiceCategoryInputSeed = {
  id: 2,
  uuid: 'dec82b01-132d-11ed-814e-0242ac110004',
  imageURL: 'https://google.com',
  questionnaireId: questionnaireFixture.id,
  title: 'Service Category Title',
  shortDescription: 'service category description',
  milestoneSummary: 'service category milestoneSummary description',
  longDescription: 'service category long Description',
  serviceImageURL: 'test_service_category_service_image_url',
}

export const serviceCategoryTwoFixture: ServiceCategoryInputSeed = {
  id: 3,
  uuid: 'dec82b01-132d-11ed-814e-111222333444',
  imageURL: 'https://google.com2',
  questionnaireId: questionnaireFixtureTwo.id,
}

export const serviceCategoryExistsFixture: ServiceCategoryInputSeed = {
  id: 4,
  title: 'b',
  uuid: serviceCategoryExistsUUID,
  questionnaireId: questionnaireServiceGroupFixture.id,
}

export const serviceCategoryNotExistsFixture: ServiceCategoryInputSeed = {
  id: 5,
  uuid: serviceCategoryInvalidUUID,
  questionnaireId: questionnaireServiceCategoryNotExistsFixture.id,
}

export const serviceCategoryOhipFixture: ServiceCategoryInputSeed = {
  id: 6,
  uuid: 'b2591e4d-97a3-489f-968e-6d705e8353b4',
  questionnaireId: questionnaireForOhipServiceCategoryFixture.id,
}

export const serviceCategoryTypeFixture: ServiceCategoryInputSeed = {
  id: 9,
  uuid: '53f35167-58c4-47c0-8fe3-b57cd173c7bf',
  questionnaireId: questionnaireForServiceCategoryTypeFixture.id,
}

export const serviceCategoryICFixture: ServiceCategoryInputSeed = {
  id: 10,
  uuid: '53f35167-58c4-47c0-3fe4-b57cd173c7ba',
  questionnaireId: questionnaireForBookingFlowId,
  title: 'InitialConsultation',
  milestoneStep: MilestoneStep.InitialConsultation, //it is unique - so it can be just in 1 serviceCategory
  imageURL: 'imageUrl',
  shortDescription: 'service category description',
  longDescription: 'service category long Description',
}

export const serviceCategoryMultiSelectFixture: ServiceCategoryInputSeed = {
  id: 11,
  questionnaireId: questionnaireId3,
}

export const serviceCategoryPrevQuestionFixture: ServiceCategoryInputSeed = {
  id: 12,
  questionnaireId: questionnairePrevQuestionFixture.id,
}

export const serviceCategoryOhip2Fixture: ServiceCategoryInputSeed = {
  id: 13,
  questionnaireId: questionnaireId_Ohip,
}
export const serviceCategoryIntentOhip2Fixture: ServiceCategoryInputSeed = {
  id: 14,
  questionnaireId: questionnaireId_IntentOhip,
}

export const serviceCategoryProgressFixture: ServiceCategoryInputSeed = {
  id: 16,
  questionnaireId: questionnaireId_Progress,
}

export const serviceCategoryWithPatientIntakeFemaleCompletedFixture: ServiceCategoryInputSeed = {
  id: 17,
  uuid: '700c9c6e-54cc-45ec-be6c-f00016a19f9b',
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
}
export const serviceCategoryGenderFixture: ServiceCategoryInputSeed = {
  id: 18,
  questionnaireId: questionnairePeriodFixture.id,
}
export const serviceCategoryPeriodFixture: ServiceCategoryInputSeed = {
  id: 19,
  questionnaireId: questionnaireGenderFixture.id,
}
export const serviceMaleSexAtBirthUpdatePatientFixture: ServiceCategoryInputSeed = {
  id: 20,
  uuid: 20 + '000000-0000-0000-0000-0_ServiceCat',
  questionnaireId: questionnaireMaleSexAtBirthUpdatePatientFixture.id,
}
export const serviceFemaleSexAtBirthUpdatePatientFixture: ServiceCategoryInputSeed = {
  id: 21,
  uuid: 21 + '000000-0000-0000-0000-0_ServiceCat',
  questionnaireId: questionnaireFemaleSexAtBirthUpdatePatientFixture.id,
}

// 1. START get-prev-question-group.test.ts
export const serviceCategory_getPrev_group_fixture: ServiceCategoryInputSeed = {
  id: 22,
  uuid: 22 + '000000-0000-0000-0000-0_ServiceCat',
  questionnaireId: questionnaireId_getPrev_group_fixture,
}
// 1.1 END

// 3. START get-prev-question-group.test.ts
export const serviceCategory_getPrev_simple_fixture: ServiceCategoryInputSeed = {
  id: 23,
  uuid: 23 + '000000-0000-0000-0000-0_ServiceCat',
  questionnaireId: questionnaireId_getPrev_simple_fixture,
}

// Ids 30-35 reserved for questionnaire-revision.fixture.ts

// Ids 40-45 reserved for get-next-question-without-answer.fixture.ts
// Ids 70-80 reserved for question-validation-count.fixture.ts

export const serviceCategoryForServiceCategoryItemsFixture: ServiceCategoryInputSeed = {
  id: 81,
  uuid: 81 + '_ServiceCategory',
}
export const serviceCategory_serviceCategoryItems_emptyList_fixture: ServiceCategoryInputSeed = {
  id: 82,
  uuid: 82 + '_ServiceCategory',
}

export const ServiceCategory_irregularPeriodsAllowed_fixture: {
  questionOlderThanNDays: ServiceCategoryInputSeed
  questionLessThanNDays: ServiceCategoryInputSeed
  questionLessThanNDaysMoreThenMDays: ServiceCategoryInputSeed
  questionNotLessThanNDaysMoreThenMDays: ServiceCategoryInputSeed
} = {
  questionOlderThanNDays: {
    id: 83,
    uuid: '83_ServiceCategory',
    questionnaireId: questionnaire_irregularPeriodsAllowed.olderThanNDays.id,
  },
  questionLessThanNDays: {
    id: 84,
    uuid: '84_ServiceCategory',
    questionnaireId: questionnaire_irregularPeriodsAllowed.lessThanNDays.id,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 85,
    uuid: '85_ServiceCategory',
    questionnaireId: questionnaire_irregularPeriodsAllowed.lessThanNDaysMoreThenMDays.id,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 86,
    uuid: '86_ServiceCategory',
    questionnaireId: questionnaire_irregularPeriodsAllowed.notLessThanNDaysMoreThenMDays.id,
  },
}
export const ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture: {
  questionOlderThanNDays: ServiceCategoryInputSeed
  questionLessThanNDays: ServiceCategoryInputSeed
  questionLessThanNDaysMoreThenMDays: ServiceCategoryInputSeed
  questionNotLessThanNDaysMoreThenMDays: ServiceCategoryInputSeed
} = {
  questionOlderThanNDays: {
    id: 135,
    uuid: 135 + '_ServiceCategory',
    questionnaireId: questionnaire_irregularPeriodsAllowedInServiceType.olderThanNDays.id,
  },
  questionLessThanNDays: {
    id: 136,
    uuid: 136 + '_ServiceCategory',
    questionnaireId: questionnaire_irregularPeriodsAllowedInServiceType.lessThanNDays.id,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 137,
    uuid: 137 + '_ServiceCategory',
    questionnaireId:
      questionnaire_irregularPeriodsAllowedInServiceType.lessThanNDaysMoreThenMDays.id,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 138,
    uuid: 138 + '_ServiceCategory',
    questionnaireId:
      questionnaire_irregularPeriodsAllowedInServiceType.notLessThanNDaysMoreThenMDays.id,
  },
}

// Ids 100-110 reserved for question-validation-max-date.fixture.ts
export const serviceCategoryServiceTypeLockerFixture: ServiceCategoryInputSeed = {
  id: 88,
  uuid: 88 + '_ServiceCategory',
}

export const serviceCategoryServiceGroupLockerFixture: ServiceCategoryInputSeed = {
  id: 89,
  uuid: 89 + '_ServiceCategory',
}

export const serviceCategoryForStaticAnswerOptionsFixture: ServiceCategoryInputSeed = {
  id: 24,
  uuid: 24 + '000000-0000-0000-0000-0_ServiceCat',
  questionnaireId: questionnaireForStaticAnswerOptionsFixtureId,
}

export const serviceCategoryWithoutRelationsFixture: ServiceCategoryInputSeed = {
  id: 90,
  uuid: '43fc93a8-0013-46de-8643-953c746d60fb',
  questionnaireId: null,
}

export const serviceCategoryWithRelationsFixture: ServiceCategoryInputSeed = {
  id: 91,
  uuid: 'e4a5d0a2-3b92-4fe7-ad5d-abd2d740bb3d',
  questionnaireId: questionnaireForServiceCategoryFixture.id,
}

export const serviceCategoryWithQuestionnaireFixture: ServiceCategoryInputSeed = {
  id: 92,
  uuid: '2cef4524-d2d0-4b0f-9c0c-2c21000baff0',
  questionnaireId: questionnaireForOnlyServiceCategoryFixture.id,
}

export const serviceCategoryWithIntroFixture: ServiceCategoryInputSeed = {
  id: 93,
  uuid: '948657d9-717a-4f80-a4e9-5fe281b03a74',
}

// Ids 95-100 reserved for question-validation-max-date.fixture.ts

export const serviceCategoryNotForMobileFixture: ServiceCategoryInputSeed = {
  id: 101,
  uuid: 'dec82b01-132d-11ed-814e-111222335555',
  showOnMobile: false,
}

export const serviceCategoryForMobileFixture: ServiceCategoryInputSeed = {
  id: 102,
  uuid: 'dec82b01-132d-11ed-814e-11122236666',
  showOnMobile: true,
}

export const serviceCategoryForPatientFlowDetailsFixture: ServiceCategoryInputSeed = {
  id: 103,
  uuid: 'dec82b01-132d-11ed-814e-111222333555',
  questionnaireId: questionnaireForServiceGroupFixture.id,
}

export const serviceCategoryWithOhipBilledItemsFixture: ServiceCategoryInputSeed = {
  id: 104,
  uuid: 'dec82b01-132d-11ed-814e-111222333104',
}

// Ids 110-115 reserved for completed-for-display-type.ts

export const serviceCategoryPatientDontHaveSexAtBirthFixture: ServiceCategoryInputSeed = {
  id: 120,
  uuid: 120 + '0002-two0-0000-0000-0_ServiceCat',
  questionnaireId: questionnairePatientDontHaveSexAtBirthFixture.id,
}

export const serviceCategoryRevisionFixture: ServiceCategoryInputSeed = {
  id: 130,
  uuid: 130 + '0002-two0-0000-0000-0_ServiceCat',
}

export const serviceCategoryWithoutQuestionnaireFixture: ServiceCategoryInputSeed = {
  id: 134,
  uuid: 'de552b01-166d-11ed-814e-0242ac110004',
}

export const serviceCategoryWithQuestionnaireIntentFixture: ServiceCategoryInputSeed = {
  id: 140,
  uuid: 140 + '_ServiceCategory',
  questionnaireId: questionnaireWithAnswersFixture.id,
}

export const serviceCategoryTypeLockedByMultipleServiceTypesFixture: ServiceCategoryInputSeed = {
  id: 141,
  uuid: 141 + '_ServiceCategory',
}

export const serviceCategoryForAutomaticSelectionFixture: ServiceCategoryInputSeed = {
  id: 142,
  uuid: 142 + '_ServiceCategory',
}

export const serviceCategoryForSexAtBirthFixture: ServiceCategoryInputSeed = {
  id: 143,
  uuid: 143 + '_ServiceCategory',
  questionnaireId: questionnaireForSexAtBirthMaleFixture.id,
}

export const serviceCategoryForIrregularPeriodFixture: ServiceCategoryInputSeed = {
  id: 144,
  uuid: 144 + '_ServiceCategory',
  questionnaireId: questionnaireWithHasMenstrualPeriodFixture.id,
}

export const serviceCategoryBloodCycleMonitoringFixture: ServiceCategoryInputSeed = {
  id: 145,
  uuid: 145 + '_ServiceCategory',
}

export const serviceCategorySemenCollectionFixture: ServiceCategoryInputSeed = {
  id: 146,
  uuid: 146 + '_ServiceCategory',
}

export const serviceCategoryAvailabilityFixture: ServiceCategoryInputSeed = {
  id: 147,
  uuid: 147 + '_ServiceCategory',
}

export const serviceCategoryDisabledFixture: ServiceCategoryInputSeed = {
  id: 148,
  uuid: 148 + '_ServiceCategory',
}
export const serviceCategoryV2Fixture: ServiceCategoryInputSeed = {
  id: 149,
  uuid: 149 + '_ServiceCategory',
}
export const serviceCategoryFollowUpFixture: ServiceCategoryInputSeed = {
  id: 150,
  title: 'WWWW',
  uuid: 150 + '_ServiceCategory',
  milestoneStep: MilestoneStep.FollowUp,
}

export const serviceCategoryNotActiveFixture: ServiceCategoryInputSeed = {
  id: 151,
  title: 'a',
  uuid: 'dec82b01-132d-11ed-814a-1243ac110003',
  isActive: false,
}
