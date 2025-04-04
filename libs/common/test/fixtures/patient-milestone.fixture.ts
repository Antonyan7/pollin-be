/* eslint-disable max-lines */
import {v4} from 'uuid'
import {
  appointmentBookedStatusFixture,
  appointmentForPatientEmailVerifiedCompletedFixture,
  appointmentForRequiredActionMilestoneInProgressFixture,
  appointmentWithTestResultsFixture,
  appointmentWithoutTestResultsFixture,
  appointmentRequiredActionMilestoneFixture,
  appointmentFixture,
  appointmentForPatAppTestResultsFixture,
  appointmentForTestOrderActionFixture,
  appointmentWithTestCoveredByOhipForUpdateOhipFixture,
  appointmentWithTestWithPriceForUpdateOhipFixture,
  appointmentWithTestWithPriceCheckoutFixture,
  appointmentForPatientOhipYesWithTestForPendingPaymentListFixture,
  patientAppointmentWithMilestoneTestOrderFixture,
  patientMilestoneTestOrderForIsActiveFixture,
  appointmentWithoutRequiredActionMilestoneInProgressFixture,
  appointmentForAppointmentsBackgroundFixture,
  appointmentForCustomConfirmationBeforeHoursRequiredActionMilestoneFixture,
  appointmentForMilestoneDetailVirtualFixture,
  appointmentForStimSheetCustomTestTypesFixture,
  appointmentForStimSheetCustomTestTypesCancelledFixture,
  appointmentForAppointmentsBackgroundCancellationEnabledFixture,
} from './appointment.fixture'
import {
  PatientMilestoneStatus,
  PatientMilestoneType,
} from '@libs/services-common/enums/milestone.enum'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {
  milestoneDetailsPatientFixture,
  milestonePatientFixture,
  milestoneRequiredActionsPatientFixture,
  patientAppointmentFixture,
  patientBookedAppointmentCartFixture,
  patientBookingForSpecificDatesFixture,
  patientClinicEmrJohnSFixture,
  patientClinicEmrKimLeFixture,
  patientEmailVerifiedFixture,
  patientFemaleFixture,
  patientFixtureForPlanV2CartFixture,
  patientForAppointmentsBackgroundFixture,
  patientForBackgroundInformationFixture,
  patientForBookingFlowServiceTypeFixture,
  patientForBookingTestFixture,
  patientForCartWithMilestoneFixture,
  patientForConsentMobileFixture,
  patientForConsentSignMobileFixture,
  patientForFreeServicesFixture,
  patientForInProgressAppointmentFixture,
  patientForMilestoneRequiredActionFixture,
  patientForMilestoneServiceTypeWithTestsFixture,
  patientForMilestoneTestsFixture,
  patientForPatientAppointmentTestResultsFixture,
  patientForPendingPaymentListForOhipYesFixture,
  patientForPlanMilestonesFixture,
  patientForPlans,
  patientForPlansBackgroundFixture,
  patientForRevisionFixture,
  patientForTestResultAuthFixture,
  patientForUpdateOhipAvailabilityFixture,
  patientInvitationAcceptFixture,
  patientOhipFixture,
  patientPlanCartFixture,
  patientPlanSelectionDetailsFixture,
  patientToPushMilestoneFixture,
  patientToPushPlanMilestoneFixture,
  patientToPushPlanMilestoneV2Fixture,
  patientWireTransferV2Fixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {
  serviceTypeBookingIntentFixture,
  serviceTypeFixture,
  serviceTypeForSpecificDatesBookingFixture,
  serviceTypeServiceCategoryItemsWithMdBillingFixture,
  serviceTypeUrineCollectionFixture,
  serviceTypeWithAutomaticSelectionFixture,
  serviceTypeWithCustomConfirmationBeforeHoursFixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithDuration40Fixture,
  virtualServiceTypeForMilestoneFixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {
  serviceGroupFixture,
  serviceGroupWithHalfOhipBillingCodeFixture,
  serviceGroupPhoneCallServiceTypeFixture,
} from '@libs/common/test/fixtures/service-group.fixture'
import {
  serviceCategoryFixture,
  serviceCategoryICFixture,
} from '@libs/common/test/fixtures/service-category.fixture'
import {
  appointmentConfirmRequiredActionMilestone50HourAgoStartFixture,
  appointmentConfirmRequiredActionMilestoneSGDominantFixture,
  appointmentForMilestoneDetailsServiceGroupFixture,
  appointmentForMilestoneDetailsServiceTypeFixture,
  appointmentForRequiredActionMilestoneFixture,
  appointmentForRequiredActionMilestoneMoreThan72HoursFixture,
  appointmentForSlotFixture,
  appointmentWithAfterSummaryFixture,
  appointmentWithoutAfterSummaryFixture,
  pastAppointmentFixture,
} from '@libs/common/test/fixtures/appointment.fixture'
import {defaultMilestoneWithServiceTypeDisabledFixture} from './default-milestone.fixture'
import {DateTimeUtil} from '@libs/common'
import {
  patientPlanCompletedForMilestoneFixture,
  patientPlanFixture,
  patientPlanForMilestoneReportPeriodFixture,
  patientPlanForPastMilestoneFixture,
  patientPlanToReportPeriodV2Fixture,
  patientPlanWireTransferForMilestoneFixture,
} from './patient-plan.fixture'
import {
  milestoneForListFixtureId,
  patientMilestoneDisabledId,
  patientMilestoneForOhipTestsFixtureId,
  patientMilestoneForServiceTypeWithZeroPromisePriceFixtureId,
  patientMilestoneForTestsFixtureId,
  patientMilestoneForTestsNotTaxableFixtureId,
} from '@libs/common/test/fixtures/patient-milestone-variables.fixture'
import {testOrderFixture, testOrderForViewFixture} from './test-order.fixture'
import {paymentOrderForWireTransferFixture} from '@libs/common/test/fixtures/payment-order.fixture'
import {
  patientConsentPackageForMobilePastFixture,
  patientConsentPackageForSignMobileFixture,
  patientConsentPackageForMobileUpcomingFixture,
  patientConsentPackageToVoidFixture,
  patientConsentPackageWithPlanFixture,
} from './patient-consent-package.fixture'
import {patientPartnerForPlanFixture} from './patient-partner.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientMilestoneNotFoundUUID: string = '404e4d74-7f81-11ed-a1eb-0242ac120404'

export const patientMilestonesFixture: Partial<PatientMilestone> = {
  id: 1,
  patientId: milestonePatientFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  dominantAppointmentId: appointmentForPatientEmailVerifiedCompletedFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Past,
}

export const patientMilestonesWithServiceCategoryTypeFixture: Partial<PatientMilestone> = {
  id: 2,
  patientId: milestonePatientFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  status: PatientMilestoneStatus.Past,
}

export const patientMilestonesWithServiceGroupTypeFixture: Partial<PatientMilestone> = {
  id: 3,
  patientId: milestonePatientFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  dominantAppointmentId: appointmentForSlotFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Past,
}

export const patientMilestonesWithAppointmentStatusFixture: Partial<PatientMilestone> = {
  id: 4,
  patientId: milestonePatientFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  dominantAppointmentId: appointmentBookedStatusFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestonesWithoutAppointmentDisabledFixture: Partial<PatientMilestone> = {
  id: patientMilestoneDisabledId,
  patientId: milestonePatientFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Upcoming,
  isDisabled: true,
  serviceTypePromisedPrice: '55.12',
}

export const patientMilestonesWitJourneyMilestoneFixture: Partial<PatientMilestone> = {
  id: 6,
  patientId: milestonePatientFixture.id,
  serviceCategoryId: serviceCategoryICFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  status: PatientMilestoneStatus.Upcoming,
}

export const milestoneDetailsWithServiceCategoryFixture: Partial<PatientMilestone> = {
  id: 7,
  uuid: '4bee4d74-7f81-11ed-a1eb-0242ac120006',
  patientId: milestoneDetailsPatientFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  status: PatientMilestoneStatus.Upcoming,
}

export const milestoneDetailsWithServiceTypeFixture: Partial<PatientMilestone> = {
  id: 8,
  uuid: 'milestoneWithServiceType',
  patientId: milestoneDetailsPatientFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
}

export const milestoneDetailsWithServiceTypeAppointmentFixture: Partial<PatientMilestone> = {
  id: 9,
  uuid: 'milestoneWithServiceTypeAppointment',
  patientId: milestoneDetailsPatientFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  dominantAppointmentId: appointmentForMilestoneDetailsServiceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
}

export const milestoneDetailsWithServiceGroupFixture: Partial<PatientMilestone> = {
  id: 10,
  uuid: 'milestoneWithServiceGroup',
  patientId: milestoneDetailsPatientFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  dominantAppointmentId: appointmentForMilestoneDetailsServiceGroupFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Upcoming,
}

export const milestoneDetailsWithoutServiceItemFixture: Partial<PatientMilestone> = {
  id: 11,
  uuid: 'milestoneWithoutServiceItem',
  patientId: patientEmailVerifiedFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestonePastWithoutAppointmentFixture: Partial<PatientMilestone> = {
  id: 12,
  uuid: '4bee4d74-7f81-11ed-a1eb-0242ac120002',
  patientId: milestoneDetailsPatientFixture.id,
  serviceCategoryId: serviceCategoryICFixture.id,
  type: PatientMilestoneType.ServiceCategory,
}

export const patientMilestonePastWithAppointmentWithoutSummaryFixture: Partial<PatientMilestone> = {
  id: 13,
  uuid: 'b131b3bf-132d-11ed-814e-0242ac110005',
  patientId: milestoneDetailsPatientFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  serviceCategoryId: serviceCategoryICFixture.id,
  dominantAppointmentId: appointmentWithoutAfterSummaryFixture.id,
}

export const patientMilestonePastWithAppointmentWithSummaryFixture: Partial<PatientMilestone> = {
  id: 14,
  uuid: 'b131b3bf-132d-11ed-814e-0242ac110006',
  patientId: milestoneDetailsPatientFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  serviceCategoryId: serviceCategoryICFixture.id,
  dominantAppointmentId: appointmentWithAfterSummaryFixture.id,
}

export const patientMilestoneRequiredActionForCommingApointmentFixture: Partial<PatientMilestone> =
  {
    id: 15,
    uuid: 'b131b3bf-132d-11ed-814f-0242ac110006',
    patientId: milestonePatientFixture.id,
    dominantAppointmentId: appointmentForRequiredActionMilestoneFixture.id,
    serviceTypeId: serviceTypeFixture.id,
    type: PatientMilestoneType.ServiceType,
  }

export const patientMilestoneRequiredActionForDynamicConfirmationBeforeHours: Partial<PatientMilestone> =
  {
    id: 173,
    uuid: '8e860e8c-d021-47e5-a672-dbd1e8647a21',
    patientId: patientForMilestoneRequiredActionFixture.id,
    dominantAppointmentId:
      appointmentForCustomConfirmationBeforeHoursRequiredActionMilestoneFixture.id,
    serviceTypeId: serviceTypeWithCustomConfirmationBeforeHoursFixture.id,
    status: PatientMilestoneStatus.Upcoming,
    type: PatientMilestoneType.ServiceType,
  }

export const patientMilestoneNotRequiredActionForCommingApointmentMoreThan72Fixture: Partial<PatientMilestone> =
  {
    id: 16,
    uuid: 'b70f45dc-86e2-11ed-a1eb-0242ac120002',
    patientId: milestonePatientFixture.id,
    dominantAppointmentId: appointmentForRequiredActionMilestoneMoreThan72HoursFixture.id,
    serviceTypeId: serviceTypeFixture.id,
    type: PatientMilestoneType.ServiceType,
  }

// ids 20-30 reserved for milestone list pagination

export const patientMilestoneTypePhoneCallFixture: Partial<PatientMilestone> = {
  id: 33,
  uuid: '92b7706e-883c-11ed-a1eb-0242ac120002',
  patientId: milestonePatientFixture.id,
  serviceGroupId: serviceGroupPhoneCallServiceTypeFixture.id,
  dominantAppointmentId: appointmentForSlotFixture.id,
  type: PatientMilestoneType.ServiceGroup,
}

export const patientMilestoneDetailTypePhoneCallFixture: Partial<PatientMilestone> = {
  id: 34,
  uuid: '6af3206e-8841-11ed-a1eb-0242ac120002',
  patientId: milestoneDetailsPatientFixture.id,
  serviceGroupId: serviceGroupPhoneCallServiceTypeFixture.id,
  dominantAppointmentId: appointmentForSlotFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestonesConfirmRequiredActionFixture: Partial<PatientMilestone> = {
  id: 35,
  patientId: milestonePatientFixture.id,
  uuid: 'ConfirmRequiredAction',
  serviceTypeId: serviceTypeFixture.id,
  dominantAppointmentId: appointmentConfirmRequiredActionMilestoneSGDominantFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Past,
}

export const patientMilestonesConfirmRequiredActionServiceGroupTypeFixture: Partial<PatientMilestone> =
  {
    id: 36,
    patientId: milestonePatientFixture.id,
    uuid: 'ConfirmRequiredActionServiceGroup',
    serviceGroupId: serviceGroupWithHalfOhipBillingCodeFixture.id,
    dominantAppointmentId: appointmentConfirmRequiredActionMilestoneSGDominantFixture.id,
    type: PatientMilestoneType.ServiceGroup,
    status: PatientMilestoneStatus.Past,
  }

export const patientMilestonesConfirmRequiredAction50HourAgoStartFixture: Partial<PatientMilestone> =
  {
    id: 37,
    patientId: milestonePatientFixture.id,
    uuid: 'ConfirmRequiredAction50HourStartAgo',
    serviceGroupId: serviceGroupWithHalfOhipBillingCodeFixture.id,
    dominantAppointmentId: appointmentConfirmRequiredActionMilestone50HourAgoStartFixture.id,
    type: PatientMilestoneType.ServiceGroup,
    status: PatientMilestoneStatus.Past,
  }

export const patientMilestonesForCheckMilestoneDescriptionFixture: Partial<PatientMilestone> = {
  id: 60,
  patientId: milestonePatientFixture.id,
  serviceTypeId: serviceTypeServiceCategoryItemsWithMdBillingFixture.id,
  dominantAppointmentId: pastAppointmentFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Past,
}

export const milestoneDetailsPastFixture: Partial<PatientMilestone> = {
  id: 61,
  uuid: 'milestonePastAppointment',
  patientId: milestoneDetailsPatientFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  dominantAppointmentId: appointmentForMilestoneDetailsServiceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Past,
}

export const milestoneForTestResultFixture: Partial<PatientMilestone> = {
  id: 62,
  uuid: 'milestoneTestResult',
  patientId: patientForTestResultAuthFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  dominantAppointmentId: appointmentWithTestResultsFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Past,
}

export const milestoneForTestResultWithNonDominantAppointmentFixture: Partial<PatientMilestone> = {
  id: 63,
  uuid: 'milestoneTestResultAction',
  patientId: patientForTestResultAuthFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  dominantAppointmentId: appointmentWithoutTestResultsFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Past,
}

export const patientMilestoneServiceTypeNotDefaultForCartFixture: Partial<PatientMilestone> = {
  id: 64,
  uuid: 'milestoneWithTypeForCart',
  patientId: patientForCartWithMilestoneFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneServiceCategoryDefaultForCartFixture: Partial<PatientMilestone> = {
  id: 65,
  uuid: 'milestoneWithDefCategoryForCart',
  patientId: patientForCartWithMilestoneFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  status: PatientMilestoneStatus.Upcoming,
  defaultMilestoneId: defaultMilestoneWithServiceTypeDisabledFixture.id,
}

export const patientMilestoneRequiredActionInProgressFixture: Partial<PatientMilestone> = {
  id: 66,
  uuid: 'b131b3bf-132d-11ed-814f-0242ac110012',
  patientId: milestonePatientFixture.id,
  dominantAppointmentId: appointmentForRequiredActionMilestoneInProgressFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  type: PatientMilestoneType.ServiceType,
}

export const patientMilestoneServiceCategoryNotDefaultForCartFixture: Partial<PatientMilestone> = {
  id: 67,
  uuid: 'milestoneWithServiceCategoryForCart',
  patientId: patientForCartWithMilestoneFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  type: PatientMilestoneType.ServiceCategory,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneForPlanFixture: Partial<PatientMilestone> = {
  id: 68,
  uuid: 'patientMilestoneForPlan',
  patientId: patientForPlans.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
  patientPlanId: patientPlanForPastMilestoneFixture.id,
}

export const patientMilestonePushedFromClinicFixture: Partial<PatientMilestone> = {
  id: 69,
  uuid: 'patientMilestonePushedFromClinic',
  patientId: patientToPushMilestoneFixture.id,
  type: PatientMilestoneType.ServiceType,
  serviceTypeId: serviceTypeFixture.id,
  status: PatientMilestoneStatus.Upcoming,
  createdAt: dateTimeUtil.now(),
}

export const patientMilestoneAppointmentPatientFixture: Partial<PatientMilestone> = {
  id: 70,
  uuid: v4(),
  patientId: patientAppointmentFixture.id,
  type: PatientMilestoneType.PlanSelection,
  serviceTypeId: serviceTypeFixture.id,
  status: PatientMilestoneStatus.Upcoming,
  createdAt: dateTimeUtil.now(),
}

export const patientMilestonePastPlanFixture: Partial<PatientMilestone> = {
  id: 71,
  patientId: patientToPushPlanMilestoneFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Past,
  dateMovedToPast: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

export const patientPastMilestoneForPastPlanFixture: Partial<PatientMilestone> = {
  id: 72,
  uuid: '72patientPastMilestoneForPlan',
  patientId: patientForPlans.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Past,
  updatedAt: dateTimeUtil.now(),
  dateMovedToPast: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  patientPlanId: patientPlanForPastMilestoneFixture.id,
}

export const patientPastMilestoneForSemenCollectionsFixture: Partial<PatientMilestone> = {
  id: 73,
  uuid: 'patientPastMilestoneForSemenCol',
  patientId: patientClinicEmrJohnSFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneReportPeriodPastFixture: Partial<PatientMilestone> = {
  id: 75,
  uuid: 'patientPastMilestoneReportPeriod',
  patientId: patientForPlans.id,
  type: PatientMilestoneType.PlanReportPeriod,
  status: PatientMilestoneStatus.Past,
  dateMovedToPast: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  patientPlanId: patientPlanForMilestoneReportPeriodFixture.id,
}

export const patientMilestoneReportPeriodUpcomingFixture: Partial<PatientMilestone> = {
  id: 76,
  uuid: 'patientMilestoneReportPeriod',
  patientId: patientForPlans.id,
  type: PatientMilestoneType.PlanReportPeriod,
  status: PatientMilestoneStatus.Upcoming,
  patientPlanId: patientPlanFixture.id,
}

export const patientMilestoneServiceTypeWithTestsFixture: Partial<PatientMilestone> = {
  id: 77,
  uuid: 'b9e349dc-7d64-40e6-a85e-baf9359980ec',
  patientId: patientForMilestoneServiceTypeWithTestsFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeFixture.id,
  dominantAppointmentId: appointmentForSlotFixture.id,
}

export const patientMilestoneForTestsFixture: Partial<PatientMilestone> = {
  id: patientMilestoneForTestsFixtureId,
  uuid: '5dff6f42-f0b3-4de1-a009-6c6230edb761',
  patientId: patientForMilestoneTestsFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeUrineCollectionFixture.id,
}

export const patientMilestoneForOhipTestsFixture: Partial<PatientMilestone> = {
  id: patientMilestoneForOhipTestsFixtureId,
  uuid: '79b5216d-ceb0-4913-b34a-86c508a222bd',
  patientId: patientOhipFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeFixture.id,
}

export const patientMilestoneCartPatientFixture: Partial<PatientMilestone> = {
  id: 80,
  uuid: '79b5216d-ceb0-4913-b34a-86c508a22269',
  patientId: patientPlanCartFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeFixture.id,
}

export const patientMilestoneForSpecificDatesFixture: Partial<PatientMilestone> = {
  id: 81,
  uuid: '79b5216d-ceb0-4312-b44a-86c508a22269',
  patientId: patientBookingForSpecificDatesFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeForSpecificDatesBookingFixture.id,
}

export const patientMilestoneForSpecificDatesWithoutProviderFixture: Partial<PatientMilestone> = {
  id: 82,
  uuid: '69b5216d-ceb0-4312-b44a-86c508a22269',
  patientId: patientBookingForSpecificDatesFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
}

export const patientMilestoneForSpecificDatesIntentFixture: Partial<PatientMilestone> = {
  id: 83,
  uuid: '79b3316d-ceb0-4312-b44a-86c508a22269',
  patientId: patientBookingForSpecificDatesFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeFixture.id,
}

export const patientMilestoneDefaultForInvitationAcceptFixture: Partial<PatientMilestone> = {
  patientId: patientInvitationAcceptFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeFixture.id,
  defaultMilestoneId: defaultMilestoneWithServiceTypeDisabledFixture.id,
}

export const patientMilestoneForBookingFlowTestFixture: Partial<PatientMilestone> = {
  id: 89,
  uuid: '79b5216d-bea0-4312-b33a-86c508a22269',
  patientId: patientForBookingFlowServiceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeBookingIntentFixture.id,
}

export const patientMilestoneForBookingFlowTestLatestFixture: Partial<PatientMilestone> = {
  id: 90,
  uuid: '71b5216d-bea0-4312-b33a-86c508a22269',
  patientId: patientForBookingFlowServiceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeBookingIntentFixture.id,
}

export const patientMilestoneForNotTaxableTestsFixture: Partial<PatientMilestone> = {
  serviceTypePromisedPrice: '80.00',
  id: patientMilestoneForTestsNotTaxableFixtureId,
  uuid: 'cec26e44-a9a2-4e72-86f5-8f9335afa7c7',
  patientId: patientForBookingTestFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneRequiredActionFixture: Partial<PatientMilestone> = {
  id: 92,
  uuid: '30b86548-a56c-4458-9721-5b6cff8c1859',
  patientId: milestoneRequiredActionsPatientFixture.id,
  dominantAppointmentId: appointmentRequiredActionMilestoneFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
}

export const patientMilestoneUpdateAppointmentFixture: Partial<PatientMilestone> = {
  id: 93,
  uuid: '30b86548-a56c-4458-9721-5b6cff8c1877',
  patientId: patientEmailVerifiedFixture.id,
  dominantAppointmentId: appointmentFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  type: PatientMilestoneType.ServiceType,
}

export const milestoneForListFixture: Partial<PatientMilestone> = {
  id: milestoneForListFixtureId,
  uuid: '7ed120bb-3a53-4d32-99f9-954bb34104ab',
  patientId: patientForTestResultAuthFixture.id,
  serviceGroupId: serviceGroupFixture.id,
  dominantAppointmentId: appointmentWithTestResultsFixture.id,
  type: PatientMilestoneType.ServiceGroup,
  status: PatientMilestoneStatus.Past,
}

export const patientMilestonePastPlanV2Fixture: Partial<PatientMilestone> = {
  id: 95,
  patientId: patientToPushPlanMilestoneV2Fixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Past,
  dateMovedToPast: dateTimeUtil.now(),
}

export const patientMilestoneReportPeriodV2Fixture: Partial<PatientMilestone> = {
  id: 96,
  uuid: 'b1b69f4f-bb93-36b6-8b15-f11506f994b6',
  patientId: patientToPushPlanMilestoneV2Fixture.id,
  type: PatientMilestoneType.PlanReportPeriod,
  status: PatientMilestoneStatus.Upcoming,
  patientPlanId: patientPlanToReportPeriodV2Fixture.id,
}

export const patientMilestoneSelectionCartPlansV2Fixture: Partial<PatientMilestone> = {
  id: 97,
  patientId: patientFixtureForPlanV2CartFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneSelectionDetailsFixture: Partial<PatientMilestone> = {
  id: 98,
  uuid: 'b1b67f4f-bb93-36b2-3b15-f11506f994b6',
  patientId: patientPlanSelectionDetailsFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneSelectionPlanV2Fixture: Partial<PatientMilestone> = {
  id: 99,
  uuid: 'b1b29f4f-bb93-46b2-3b15-f11506f994b6',
  patientId: patientForPlanMilestonesFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneSelectionPastFixture: Partial<PatientMilestone> = {
  id: 100,
  uuid: 'b1b39f4f-bb93-45b2-3b15-f11506f994b6',
  patientId: patientForPlanMilestonesFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Past,
  patientPlanId: patientPlanCompletedForMilestoneFixture.id,
  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 14),
  dateMovedToPast: dateTimeUtil.subDays(dateTimeUtil.now(), 14),
}

export const patientMilestoneReportPeriodV2UpcomingFixture: Partial<PatientMilestone> = {
  id: 101,
  uuid: 'c1b69f4f-bb93-23b2-3b15-f11506f994b6',
  patientId: patientForPlanMilestonesFixture.id,
  type: PatientMilestoneType.PlanReportPeriod,
  status: PatientMilestoneStatus.Upcoming,
  patientPlanId: patientPlanCompletedForMilestoneFixture.id,
}

export const patientMilestoneReportPeriodV2PastFixture: Partial<PatientMilestone> = {
  id: 102,
  uuid: 'b2b69f4f-bb93-23b2-3b15-f11506f994b6',
  patientId: patientForPlanMilestonesFixture.id,
  type: PatientMilestoneType.PlanReportPeriod,
  status: PatientMilestoneStatus.Past,
  patientPlanId: patientPlanCompletedForMilestoneFixture.id,
  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  dateMovedToPast: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

export const patientMilestoneForPatAppTestResultsFixture: Partial<PatientMilestone> = {
  id: 105,
  uuid: 105 + '69f4f-bb93-23b2-3b15-f11506f994b6',
  patientId: patientForPatientAppointmentTestResultsFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,

  dominantAppointmentId: appointmentForPatAppTestResultsFixture.id,

  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

export const patientMilestoneServiceTypeWithTestsForOrderActionsFixture: Partial<PatientMilestone> =
  {
    id: 107,
    uuid: '55b69f4f-bb93-23b2-3b15-f11506f994b6',
    patientId: patientForBackgroundInformationFixture.id,
    type: PatientMilestoneType.ServiceTypeWithTests,
    status: PatientMilestoneStatus.Upcoming,
    dominantAppointmentId: appointmentForTestOrderActionFixture.id,
  }

export const patientMilestoneForOrderActionsFixture: Partial<PatientMilestone> = {
  id: 108,
  uuid: '9b69f4f-bb93-23b2-3b15-f11506f944b6',
  patientId: patientForBackgroundInformationFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneForPatientUpdateOhipFixture: Partial<PatientMilestone> = {
  id: 110,
  uuid: 110 + '69f4f-bb93-23b2-3b15-f11506f994b6',
  patientId: patientForUpdateOhipAvailabilityFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,

  dominantAppointmentId: appointmentWithTestCoveredByOhipForUpdateOhipFixture.id,

  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

export const patientMilestoneForPatientUpdateOhipWithTestWithPriceFixture: Partial<PatientMilestone> =
  {
    id: 111,
    uuid: 111 + '69f4f-bb93-23b2-3b15-f11506f994b6',
    patientId: patientForUpdateOhipAvailabilityFixture.id,
    type: PatientMilestoneType.ServiceTypeWithTests,
    status: PatientMilestoneStatus.Upcoming,

    dominantAppointmentId: appointmentWithTestWithPriceForUpdateOhipFixture.id,

    updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  }

export const patientMilestoneForAppWithTestWithPriceForCheckoutFixture: Partial<PatientMilestone> =
  {
    id: 112,
    uuid: 112 + '69f4f-bb93-23b2-3b15-f11506f994b6',
    patientId: patientBookedAppointmentCartFixture.id,
    type: PatientMilestoneType.ServiceTypeWithTests,
    status: PatientMilestoneStatus.Upcoming,

    dominantAppointmentId: appointmentWithTestWithPriceCheckoutFixture.id,

    updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  }

export const patientMilestoneForPendingPaymentListWithTestsFixture: Partial<PatientMilestone> = {
  id: 115,
  uuid: 115 + '69f4f-bb93-23b2-3b15-f11506f994b6',
  patientId: patientForPendingPaymentListForOhipYesFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,

  dominantAppointmentId: appointmentForPatientOhipYesWithTestForPendingPaymentListFixture.id,

  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

/** testOrderFixture */
export const patientMilestoneTestOrderForViewStateFixture: Partial<PatientMilestone> = {
  id: 116,
  uuid: 116 + '69f4f-bb93-23b2-3b15-f11506f994b7',
  patientId: patientClinicEmrKimLeFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
  dominantAppointmentId: patientAppointmentWithMilestoneTestOrderFixture.id,
  testOrderId: testOrderFixture.id,
  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

export const patientMilestoneWireTransferFixture: Partial<PatientMilestone> = {
  id: 117,
  uuid: 'b504aaf1-361d-4cd9-a369-bad0bc96d8b7',
  patientId: patientWireTransferV2Fixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
  patientPlanId: patientPlanWireTransferForMilestoneFixture.id,
  paymentOrderId: paymentOrderForWireTransferFixture.id,
}

export const patientMilestoneRevisionFixture: Partial<PatientMilestone> = {
  id: 118,
  uuid: '5b4f334d-577a-4779-ac1f-8890bee49a35',
  patientId: patientForRevisionFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneForIsActiveViewStateFixture: Partial<PatientMilestone> = {
  id: 119,
  uuid: '9e59ca85-802c-4a45-9bed-295d1efb1b43',
  patientId: patientClinicEmrKimLeFixture.id,
  type: PatientMilestoneType.ServiceTypeWithTests,
  status: PatientMilestoneStatus.Upcoming,
  dominantAppointmentId: patientMilestoneTestOrderForIsActiveFixture.id,
  testOrderId: testOrderForViewFixture.id,
  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

export const patientMilestoneWithoutRequiredActionFixture: Partial<PatientMilestone> = {
  id: 120,
  uuid: 'a8bb8e3b-6fc5-4f2c-81ec-ceb8975889b2',
  patientId: patientForInProgressAppointmentFixture.id,
  dominantAppointmentId: appointmentWithoutRequiredActionMilestoneInProgressFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  serviceTypeId: serviceTypeFixture.id,
}

export const patientMilestoneForConsentMobileUpcomingFixture: Partial<PatientMilestone> = {
  id: 125,
  uuid: 125 + 'b8e3b-6fc5-4f2c-81ec-ceb8975889b2',
  patientId: patientForConsentMobileFixture.id,
  type: PatientMilestoneType.ConsentPackage,
  status: PatientMilestoneStatus.Upcoming,
  patientConsentPackageId: patientConsentPackageForMobileUpcomingFixture.id,
}

export const patientMilestoneForConsentMobilePastFixture: Partial<PatientMilestone> = {
  id: 126,
  uuid: 126 + 'b8e3b-6fc5-4f2c-81ec-ceb8975889b2',
  patientId: patientForConsentMobileFixture.id,
  type: PatientMilestoneType.ConsentPackage,
  status: PatientMilestoneStatus.Past,
  patientConsentPackageId: patientConsentPackageForMobilePastFixture.id,
}

export const patientMilestoneForAppointmentsBackgroundTestTypeFixture: Partial<PatientMilestone> = {
  id: 127,
  uuid: 127 + 'b8e3b-6fc5-4f2c-81ec-ceb8975889b2',
  patientId: patientForAppointmentsBackgroundFixture.id,
  type: PatientMilestoneType.ConsentPackage,
  status: PatientMilestoneStatus.Upcoming,
  dominantAppointmentId: appointmentForAppointmentsBackgroundFixture.id,
}

export const patientMilestoneForAppointmentsBackgroundPanelFixture: Partial<PatientMilestone> = {
  id: 128,
  uuid: 128 + 'b8e3b-6fc5-4f2c-81ec-ceb8975889b2',
  patientId: patientForAppointmentsBackgroundFixture.id,
  type: PatientMilestoneType.ConsentPackage,
  status: PatientMilestoneStatus.Past,
  dominantAppointmentId: appointmentForAppointmentsBackgroundFixture.id,
}

export const patientMilestoneForConsentSignMobileFixture: Partial<PatientMilestone> = {
  id: 130,
  uuid: 130 + 'b8e3b-6fc5-4f2c-81ec-ceb8975889b2',
  patientId: patientForConsentSignMobileFixture.id,
  status: PatientMilestoneStatus.Upcoming,
  type: PatientMilestoneType.ConsentPackage,
  patientConsentPackageId: patientConsentPackageForSignMobileFixture.id,
}

export const patientMilestoneForConsentFixture: Partial<PatientMilestone> = {
  id: 131,
  uuid: '7647013b-d921-4f2c-b790-818bd9030342',
  patientId: patientFemaleFixture.id,
  status: PatientMilestoneStatus.Upcoming,
  type: PatientMilestoneType.ConsentPackage,
  patientConsentPackageId: patientConsentPackageToVoidFixture.id,
}

export const patientMilestoneForMilestoneDetailVirtualFixture: Partial<PatientMilestone> = {
  id: 135,
  uuid: 135 + '1b3bf-132d-11ed-814f-0242ac110006',
  patientId: milestoneDetailsPatientFixture.id,
  dominantAppointmentId: appointmentForMilestoneDetailVirtualFixture.id,
  serviceTypeId: virtualServiceTypeForMilestoneFixture.id,
  type: PatientMilestoneType.ServiceType,
}

export const patientMilestoneForStimSheetFixture: Partial<PatientMilestone> = {
  id: 132,
  uuid: '7647013b-a921-4a2c-c790-818bd9030342',
  patientId: patientPartnerForPlanFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  dominantAppointmentId: appointmentForStimSheetCustomTestTypesFixture.id,
}

export const patientMilestoneForStimSheetCancelledFixture: Partial<PatientMilestone> = {
  id: 133,
  uuid: '7647013a-b923-4a2c-c790-818bd9030342',
  patientId: patientPartnerForPlanFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  dominantAppointmentId: appointmentForStimSheetCustomTestTypesCancelledFixture.id,
}

export const patientMilestoneForPlanUpdateToRemoveMilesotneFixture: Partial<PatientMilestone> = {
  id: 138,
  uuid: 138 + '1b3bf-132d-11ed-814f-0242ac110006',
  patientId: patientForPlansBackgroundFixture.id,
  type: PatientMilestoneType.PlanSelection,
  status: PatientMilestoneStatus.Upcoming,
}
export const patientMilestoneForAppointmentsBackgroundCancellationEnabledFixture: Partial<PatientMilestone> =
  {
    id: 140,
    uuid: 140 + '1b3bf-132d-11ed-814f-0242ac110006',
    patientId: patientForPlansBackgroundFixture.id,
    dominantAppointmentId: appointmentForAppointmentsBackgroundCancellationEnabledFixture.id,
    type: PatientMilestoneType.ServiceType,
    status: PatientMilestoneStatus.Upcoming,
  }

export const patientMilestoneForConsentWithPlanFixture: Partial<PatientMilestone> = {
  id: 142,
  uuid: 142 + 'b8e3b-6fc5-4f2c-81ec-ceb8975889b2',
  patientId: patientForConsentMobileFixture.id,
  type: PatientMilestoneType.ConsentPackage,
  status: PatientMilestoneStatus.Upcoming,
  patientConsentPackageId: patientConsentPackageWithPlanFixture.id,
}

export const patientMilestoneForServiceTypeWithZeroPromisePriceFixture: Partial<PatientMilestone> =
  {
    id: patientMilestoneForServiceTypeWithZeroPromisePriceFixtureId,
    uuid: '143b8e3b-6fc5-4f2c-81ec-ceb8975889b2',
    patientId: patientForFreeServicesFixture.id,
    type: PatientMilestoneType.ServiceType,
    status: PatientMilestoneStatus.Upcoming,
    serviceTypeId: serviceTypeFixture.id,
    serviceTypePromisedPrice: '0.00',
  }
