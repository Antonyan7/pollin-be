/* eslint-disable max-lines */
import {BookingIntent} from '@libs/data-layer/apps/scheduling/entities/fireorm/booking-intent'
import {AuthUserFixture} from '@libs/common/test/fixtures/auth.fixture'
import {
  questionnaireFixture,
  questionnaireForServiceGroupFixture,
  questionnaireMaleSexAtBirthUpdatePatientFixture,
  questionnaireFemaleSexAtBirthUpdatePatientFixture,
  questionnaireForGroupQuestionFixture,
  questionnaireWithAnswersFixture,
  questionnaireForAvailabilityFixture,
  questionnaireForAvailabilityNextDayAvailFixture,
  questionnaireForPeriodAnswerDeletedFixture,
  questionnaireForSexAtBirthMaleFixture,
  questionnaire_irregularPeriodsAllowedInServiceType,
  questionnaire_irregularPeriodsAllowed,
  questionnaireWithHasMenstrualPeriodFixture,
} from '@libs/common/test/fixtures/questionnaire.fixture'
import {
  serviceCategoryFixture,
  ServiceCategory_irregularPeriodsAllowed_fixture,
  serviceCategory_serviceCategoryItems_emptyList_fixture,
  serviceCategoryForServiceCategoryItemsFixture,
  serviceCategoryServiceTypeLockerFixture,
  serviceCategoryServiceGroupLockerFixture,
  serviceCategoryForPatientFlowDetailsFixture,
  serviceMaleSexAtBirthUpdatePatientFixture,
  serviceFemaleSexAtBirthUpdatePatientFixture,
  serviceCategoryWithQuestionnaireFixture,
  serviceCategoryExistsFixture,
  serviceCategoryNotExistsFixture,
  serviceCategoryICFixture,
  ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture,
  serviceCategoryNotForMobileFixture,
  serviceCategoryTypeLockedByMultipleServiceTypesFixture,
  serviceCategoryForAutomaticSelectionFixture,
  serviceCategoryForSexAtBirthFixture,
  serviceCategoryForIrregularPeriodFixture,
  serviceCategoryAvailabilityFixture,
  serviceCategoryWithRelationsFixture,
  serviceCategoryRevisionFixture,
} from '@libs/common/test/fixtures/service-category.fixture'
import {serviceProviderFixture} from '@libs/common/test/fixtures/service-provider.fixture'
import {
  serviceGroupCheckoutApptFixture,
  serviceGroupDetailsFixture,
  serviceGroupFixture,
  serviceGroupSubTitleOhipCodeFixture,
  serviceGroupWith25ServiceTypeDurationFixture,
  serviceGroupWithoutMensturalCheckFixture,
} from '@libs/common/test/fixtures/service-group.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {
  serviceTypeFixture,
  serviceTypeForAvailabilityFixture,
  serviceTypeForBookingFlowServiceTypeFixture,
  serviceTypeForMobileFixture,
  serviceTypeForSpecificDatesBookingFixture,
  serviceTypeRevisionFixture,
  serviceTypeWithAutomaticSelectionFixture,
  serviceTypeWithAutomaticSelectionOverlayFixture,
  serviceTypeWithDuration25Fixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithOneSlotFixture,
  serviceTypeWithoutFirstAvailableDayFixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {ServiceCategoryItemType} from '@libs/data-layer/apps/scheduling/enums/service-category-item-type'
import {serviceCategoryForMobileFixture} from './service-category.fixture'
import {patientMilestoneForTestsFixtureId} from '@libs/common/test/fixtures/patient-milestone-variables.fixture'

export const bookingIntentSuccessId: string = 'SERVICE_GROUP_BOOKING_INTENT_TEST_ID_1'
export const bookingIntentQuestionnaireIntentNotFoundId: string =
  'SERVICE_GROUP_BOOKING_INTENT_TEST_ID_3'
const authUserId: string = AuthUserFixture.questionnaire.uid

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))

export const bookingIntentFixture: BookingIntent = {
  id: 'booking-intent-fixture',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  authUserId: AuthUserFixture.emailVerified.uid,
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: AuthUserFixture.emailVerified.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const bookingIntentForServiceProvidersWithServiceGroupFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-service-providers',
  serviceCategoryId: serviceCategoryFixture.id,
  serviceCategoryItemId: serviceGroupDetailsFixture.uuid,
  authUserId: AuthUserFixture.serviceProvider.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const bookingIntentForServiceProvidersWithServiceTypeFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-service-providers-service-type',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceCategoryItemId: serviceTypeFixture.uuid,
  authUserId: AuthUserFixture.serviceProvider.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntentWithWrongServiceProviderIdFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-wrong-service-provider',
  serviceCategoryId: serviceCategoryFixture.id,
  serviceCategoryItemId: serviceTypeWithDuration25Fixture.uuid,
  authUserId: AuthUserFixture.serviceProvider.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntentForServiceCategoryFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-service-category',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: null,
  serviceCategoryItemId: null,
  authUserId: AuthUserFixture.serviceCategory.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const bookingIntentForAvailability: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-availability',
  questionnaireId: questionnaireForAvailabilityFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const bookingIntentForAvailabilityNextDayUtc: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-availNextDayUtc',
  questionnaireId: questionnaireForAvailabilityNextDayAvailFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeForAvailabilityFixture.uuid,
  authUserId: AuthUserFixture.availabilityNextDayUtc.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntent2Fixture: Partial<BookingIntent> = {
  id: bookingIntentSuccessId,
  serviceCategoryId: serviceCategoryExistsFixture.id,
  authUserId,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}
export const bookingIntentInvalidServiceGroupFixture: Partial<BookingIntent> = {
  id: bookingIntentQuestionnaireIntentNotFoundId,
  serviceCategoryId: serviceCategoryNotExistsFixture.id,
  authUserId,
}

export const bookingIntentForCartConfirmFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-cart-confirm',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirm.uid,
}

export const bookingIntentForCartConfirmV2Fixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-cart-confirmV2',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirmV2.uid,
}

export const bookingIntentWithServiceTypeFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-with-service-type',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeForBookingFlowServiceTypeFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemRevision: 1,
}

export const bookingIntentToChangeRevisionFixture: Partial<BookingIntent> = {
  id: 'booking-intent-revision',
  serviceCategoryId: serviceCategoryRevisionFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeRevisionFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.bookingFlowDetails.uid,
  serviceCategoryItemRevision: 1,
}

export const bookingIntentWithServiceTypeAndIntroductionFixture: Partial<BookingIntent> = {
  id: 'booking-intent-intro-type',
  serviceCategoryId: serviceCategoryWithRelationsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.availabilityNextDayUtc.uid,
  serviceCategoryItemRevision: 1,
}

export const bookingIntentWithOneSlotFixture: Partial<BookingIntent> = {
  id: 'booking-intent-one-slot',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeWithOneSlotFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemRevision: 1,
}

export const bookingIntentWithServiceTypeAndQuestionnaireFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-with-service-type-and-questionnaire',
  serviceCategoryId: serviceCategoryWithQuestionnaireFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  questionnaireId: questionnaireWithAnswersFixture.id,
  serviceCategoryItemId: serviceTypeForMobileFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.bookingFlowDetails.uid,
  serviceCategoryRevision: 1,
}

export const bookingIntentWithServiceGroupFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-with-service-group',
  questionnaireId: questionnaireForServiceGroupFixture.id,
  serviceCategoryId: serviceCategoryForPatientFlowDetailsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.bookingFlowDetails.uid,
}

export const bookingIntentWithoutServiceTypeAndServiceGroupFixture: Partial<BookingIntent> = {
  id: 'booking-intent-without-service-type',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  authUserId: AuthUserFixture.emailVerified.uid,
}

export const bookingIntentServiceCategoryItemFixture: Partial<BookingIntent> = {
  id: 'bookingIntent-serviceCategoryItem-fixture',
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
  authUserId: AuthUserFixture.emailVerified.uid,
}

export const bookingIntentServiceCategoryItemPartnerFixture: Partial<BookingIntent> = {
  id: 'bookingIntent-serviceCategoryItem-fixture',
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
  authUserId: AuthUserFixture.partner.uid,
}

export const bookingIntent_serviceCategoryItem_notExistServiceCategory_fixture: Partial<BookingIntent> =
  {
    id: 'bookingIntent_notExistServiceCategory_fixture',
    serviceCategoryId: 982735987, //not exist
    authUserId: AuthUserFixture.emailVerified.uid,
  }

/** Based on serviceCategory - there will not any serviceGroup and eny ServiceType. Return empty  */
export const bookingIntent_serviceCategoryItem_emptyFilter_fixture: Partial<BookingIntent> = {
  id: 'bookingIntent_emptyFilter_fixture',
  serviceCategoryId: serviceCategory_serviceCategoryItems_emptyList_fixture.id,
  authUserId: AuthUserFixture.emailVerified.uid,
}

export const BookingIntentForServiceCategoryWithIrregularPeriodsAllowed: {
  questionOlderThanNDays: Partial<BookingIntent>
  questionLessThanNDays: Partial<BookingIntent>
  questionLessThanNDaysMoreThenMDays: Partial<BookingIntent>
  questionNotLessThanNDaysMoreThenMDays: Partial<BookingIntent>
} = {
  questionOlderThanNDays: {
    id: 'booking_intent_service_category_item_with_first_day_of_period_patient_code_fixture1',
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionOlderThanNDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId: questionnaire_irregularPeriodsAllowed.olderThanNDays.id,
  },
  questionLessThanNDays: {
    id: 'booking_intent_service_category_item_with_first_day_of_period_patient_code_fixture2',
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId: questionnaire_irregularPeriodsAllowed.lessThanNDays.id,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 'booking_intent_service_category_item_with_first_day_of_period_patient_code_fixture3',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDaysMoreThenMDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId: questionnaire_irregularPeriodsAllowed.lessThanNDaysMoreThenMDays.id,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 'booking_intent_service_category_item_with_first_day_of_period_patient_code_fixture4',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionNotLessThanNDaysMoreThenMDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId: questionnaire_irregularPeriodsAllowed.notLessThanNDaysMoreThenMDays.id,
  },
}
export const BookingIntentForServiceCategoryWithIrregularPeriodsAllowedInServiceType: {
  questionOlderThanNDays: Partial<BookingIntent>
  questionLessThanNDays: Partial<BookingIntent>
  questionLessThanNDaysMoreThenMDays: Partial<BookingIntent>
  questionNotLessThanNDaysMoreThenMDays: Partial<BookingIntent>
} = {
  questionOlderThanNDays: {
    id: 'booking_intent_service_category_item_irregularPeriodsAllowed_in_serviceType_fixture1',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionOlderThanNDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId: questionnaire_irregularPeriodsAllowedInServiceType.olderThanNDays.id,
  },
  questionLessThanNDays: {
    id: 'booking_intent_service_category_item_irregularPeriodsAllowed_in_serviceType_fixture2',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionLessThanNDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId: questionnaire_irregularPeriodsAllowedInServiceType.lessThanNDays.id,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 'booking_intent_service_category_item_irregularPeriodsAllowed_in_serviceType_fixture3',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionLessThanNDaysMoreThenMDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId:
      questionnaire_irregularPeriodsAllowedInServiceType.lessThanNDaysMoreThenMDays.id,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 'booking_intent_service_category_item_irregularPeriodsAllowed_in_serviceType_fixture4',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionNotLessThanNDaysMoreThenMDays.id,
    authUserId: AuthUserFixture.emailVerified.uid,
    questionnaireId:
      questionnaire_irregularPeriodsAllowedInServiceType.notLessThanNDaysMoreThenMDays.id,
  },
}

export const bookingIntentServiceTypeLockedFixture: Partial<BookingIntent> = {
  id: 'bookingIntentServiceTypeLockedFixture',
  serviceCategoryId: serviceCategoryServiceTypeLockerFixture.id,
  authUserId: AuthUserFixture.constraintServiceTypes.uid,
}

export const bookingIntentServiceGroupLockedFixture: Partial<BookingIntent> = {
  id: 'bookingIntentServiceGroupLockedFixture',
  serviceCategoryId: serviceCategoryServiceGroupLockerFixture.id,
  authUserId: AuthUserFixture.constraintServiceTypes.uid,
}

export const bookingIntentForMobileFixture: Partial<BookingIntent> = {
  id: 'bookingIntentForMobileFixture',
  serviceCategoryId: serviceCategoryForMobileFixture.id,
  authUserId: AuthUserFixture.questionnaire.uid,
}

export const bookingIntentServiceItemsFiltered: Partial<BookingIntent> = {
  id: 'bookingIntentServiceItemsFiltered',
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
  authUserId: AuthUserFixture.emailVerified.uid,
  questionnaireId: questionnaireMaleSexAtBirthUpdatePatientFixture.id,
}

export const bookingIntentServiceItemsNoMatchFiltered: Partial<BookingIntent> = {
  id: 'bookingIntentServiceItemsFilteredNoMatch',
  serviceCategoryId: serviceFemaleSexAtBirthUpdatePatientFixture.id,
  authUserId: AuthUserFixture.emailVerified.uid,
  questionnaireId: questionnaireFemaleSexAtBirthUpdatePatientFixture.id,
}

export const bookingIntentForMenstrualPeriodConstraintFixture: Partial<BookingIntent> = {
  id: 'booking-intent-for-menstrual-period-constraint-fixture',
  questionnaireId: questionnaireForGroupQuestionFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupWithoutMensturalCheckFixture.uuid,
  authUserId: AuthUserFixture.mensturalConstraint.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
}

export const bookingIntentForMenstrualPeriodConstraintWithSkipDaysFixture: Partial<BookingIntent> =
  {
    id: 'booking-intent-for-menstrual-period-constraint-with-skip-days-fixture',
    questionnaireId: questionnaireForServiceGroupFixture.id,
    serviceCategoryId: serviceCategoryFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceCategoryItemId: serviceGroupSubTitleOhipCodeFixture.uuid,
    authUserId: AuthUserFixture.bookingIntent.uid,
    serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  }

export const bookingIntentForAvailability30minFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-availability-30',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryICFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeWithDuration30Fixture.uuid,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntenForBookingFlowDetailsWithServiceGroupFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-flow-details-sg',
  serviceCategoryId: serviceCategoryNotForMobileFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupWith25ServiceTypeDurationFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.bookingFlowDetails.uid,
}

export const bookingIntentForCheckoutConfirmRevisionsSCFixture: Partial<BookingIntent> = {
  id: 'booking-intent-for-cart-confirm-revisions-sc',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirmRevisions.uid,
}

export const bookingIntentForCheckoutConfirmRevisionsSTFixture: Partial<BookingIntent> = {
  id: 'booking-intent-for-cart-confirm-revisions-st',
  questionnaireId: questionnaireFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.cartConfirmRevisions.uid,
}

export const bookingIntentForCheckoutConfirmRevisionsSGFixture: Partial<BookingIntent> = {
  id: 'booking-intent-for-cart-confirm-revisions-sg',
  questionnaireId: questionnaireFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupCheckoutApptFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirmRevisions.uid,
}

export const bookingIntentWithServiceGroupToDeleteFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-to-delete-sg',
  serviceCategoryItemId: serviceGroupWith25ServiceTypeDurationFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.bookingIntent.uid,
}

export const bookingIntentWithServiceTypeToDeleteFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-to-delete-st',
  serviceCategoryItemId: serviceTypeWithDuration25Fixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.bookingIntent.uid,
}

export const bookingIntentSTConstrainedByMultipleServiceTypesFixture: Partial<BookingIntent> = {
  id: 'booking-intent-constraint-service-types',
  serviceCategoryId: serviceCategoryTypeLockedByMultipleServiceTypesFixture.id,
  authUserId: AuthUserFixture.constraintServiceTypes.uid,
}

export const bookingIntentForSlotAfterInNextYearUTCFixture: Partial<BookingIntent> = {
  id: 'booking-Intent-for-slot-next-year',
  questionnaireId: questionnaireForAvailabilityNextDayAvailFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeForAvailabilityFixture.uuid,
  authUserId: AuthUserFixture.availabilityNextDayUtc.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntentForAutomaticProviderFixture: Partial<BookingIntent> = {
  id: 'booking-Intent-for-automatic-provider',
  serviceCategoryId: serviceCategoryForAutomaticSelectionFixture.id,
  serviceCategoryItemId: serviceTypeWithAutomaticSelectionFixture.uuid,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntentForAutomaticProviderOverlayFixture: Partial<BookingIntent> = {
  id: 'booking-Intent-for-automatic-provider-overlay',
  serviceCategoryId: serviceCategoryForAutomaticSelectionFixture.id,
  serviceCategoryItemId: serviceTypeWithAutomaticSelectionOverlayFixture.uuid,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntentForAutomaticProviderOverlaySlotsFixture: Partial<BookingIntent> = {
  id: 'booking-Intent-for-automatic-provider-slots',
  serviceCategoryId: serviceCategoryForAutomaticSelectionFixture.id,
  serviceCategoryItemId: serviceTypeWithAutomaticSelectionOverlayFixture.uuid,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

/** without serviceProviderId - we shoult choose any for this serviceType */
export const bookingIntentServiceGroupAvailAutomaticProviderFixture: Partial<BookingIntent> = {
  id: 'booking-Intent-for-auto-provider-servGroup',
  serviceCategoryId: serviceCategoryForAutomaticSelectionFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid, //for test it could be any group, but in real it should be gorup with all serviceType.autoProvider = true
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  //serviceProviderId is null for this test
}

export const bookingIntentWithServiceTypeMilestoneFixture: Partial<BookingIntent> = {
  id: 'booking-intent-service-type-milestone-cart',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  serviceCategoryItemId: serviceTypeFixture.uuid,
  authUserId: AuthUserFixture.cartWithExistingMilestone.uid,
}

export const bookingIntentWithServiceCategoryMilestoneFixture: Partial<BookingIntent> = {
  id: 'booking-intent-service-category-milestone-cart',
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  serviceCategoryItemId: serviceTypeFixture.uuid,
  serviceCategoryId: serviceCategoryFixture.id,
  authUserId: AuthUserFixture.cartWithExistingMilestone.uid,
}

export const bookingIntentForMenstrualPeriodWithDeletedAnswerFromQuestIntentFixture: Partial<BookingIntent> =
  {
    id: 'booking-intent-for-menstrual-period-delete-answer',
    questionnaireId: questionnaireForPeriodAnswerDeletedFixture.id,
    serviceCategoryId: serviceCategoryFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceCategoryItemId: serviceGroupFixture.uuid,
    authUserId: AuthUserFixture.availability.uid,
    serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  }

export const bookingIntentForMaleServiceCategoryItemsWithQuestionnaireFixture: Partial<BookingIntent> =
  {
    id: 'booking-intent-for-service-category-items-female-questionnaire',
    questionnaireId: questionnaireForSexAtBirthMaleFixture.id,
    serviceCategoryId: serviceCategoryForSexAtBirthFixture.id,
    authUserId: AuthUserFixture.female.uid,
  }

export const bookingIntentForFemaleServiceCategoryItemsFixture: Partial<BookingIntent> = {
  id: 'booking-intent-for-service-category-items-female',
  serviceCategoryId: serviceCategoryForSexAtBirthFixture.id,
  authUserId: AuthUserFixture.female.uid,
}

export const bookingIntentForFemaleWithIrregullarPeriodFixture: Partial<BookingIntent> = {
  id: 'booking-intent-for-irregular-period',
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  questionnaireId: questionnaireWithHasMenstrualPeriodFixture.id,
  authUserId: AuthUserFixture.female.uid,
}

export const bookingIntentWithMilestoneIdForAvailability: Partial<BookingIntent> = {
  id: 'booking-intent-with-milestoneId-fixture-for-availability',
  questionnaireId: questionnaireForAvailabilityFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  authUserId: AuthUserFixture.profileForBookingTestsTypes.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  milestoneId: patientMilestoneForTestsFixtureId,
}

export const bookingIntentWithoutFirstAvailableDay: Partial<BookingIntent> = {
  id: 'booking-intent-without-first-avail-day',
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeWithoutFirstAvailableDayFixture.uuid,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}

export const bookingIntentForCartConfirmSuccessFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-cart-confirm-success',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirmSuccess.uid,
}

export const bookingIntentForCartConfirmFailsFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-cart-confirm-fails',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirmFails.uid,
}

export const bookingIntentForBookAppointmentConfirmFailsFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-book-appointment',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.bookAppointment.uid,
}

export const bookingIntentSecondExtraFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-second-extra',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirm.uid,
}

export const bookingIntentForServiceTypeFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-cart-confirm',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirm.uid,
}

export const bookingIntentForThreeMainCasesCartConfirmFixture: Partial<BookingIntent> = {
  id: 'booking-intent-fixture-for-main-three-cases-cart',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceGroupFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceGroup,
  authUserId: AuthUserFixture.cartConfirmThreeCases.uid,
}

export const bookingIntentForSpecificDatesFixture: Partial<BookingIntent> = {
  id: 'booking-intent-specific-dates',
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeForSpecificDatesBookingFixture.uuid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
  authUserId: AuthUserFixture.bookingForSpecificDates.uid,
  milestoneId: 81,
}

export const bookingIntentForGroupedSlotsByStDurationFixture: Partial<BookingIntent> = {
  id: 'booking-intent-Grouped-By-STDuration',
  serviceCategoryId: serviceCategoryICFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceCategoryItemId: serviceTypeWithDuration30Fixture.uuid,
  authUserId: AuthUserFixture.availability.uid,
  serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
}
