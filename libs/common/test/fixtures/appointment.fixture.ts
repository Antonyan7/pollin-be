/* eslint-disable max-lines */
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment.entity'
import {
  AppointmentPaymentStatus,
  AppointmentPlanSheetResultsStatus,
  AppointmentStatus,
} from '@libs/common/enums'

import {
  cartPatientFixture,
  milestoneDetailsPatientFixture,
  milestonePatientFixture,
  partnerIntakeJourneyTypeFixture,
  patientConstraintServiceTypesFixture,
  patientEmailVerifiedOtherForAppointmentFixture,
  patientEmailVerifiedFixture,
  patientForQuestionnaireFixture,
  serviceProviderFixture,
  serviceProviderForAppointmentsLengthFixture,
  serviceProviderForIsEditableFixture,
  serviceTypeFixture,
  serviceTypeForAppointmentUpdateFixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithOhipBillingCodeFixture,
  patientForTestResultAuthFixture,
  patientToPushPaymentAlertFixture,
  patientBookedAppointmentCartFixture,
  patientForProfileDoctorsFixture,
  patientForMaleIcFormFixture,
  serviceProviderSemenCollectionFixture,
  patientForPlans,
  patientForPlanPartnerFixture,
  serviceProviderForAutomaticSelectionFixture,
  patientProfileAppointmentFixture,
  serviceProviderBilling,
  milestoneRequiredActionsPatientFixture,
  patientForUltrasoundDay3Fixture,
  patientForProfileOverviewTransgenderMaleFixture,
  serviceTypeProcedureFixture,
  serviceProviderForBookingFlowFixture,
  patientForUltrasoundResultsDetailFixture,
  patientForAppointmentByDateFixture,
  serviceProviderV2Fixture,
  serviceTypeV2Fixture,
  patientForCheckInAppointmentsFixture,
  patientForInProgressAppointmentFixture,
  serviceTypeFollowUpFixture,
  patientForV2ConfirmFailFixture,
  serviceTypePhoneCallTypeFixture,
  serviceTypeInActiveFixture,
} from '@libs/common/test/fixtures'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {appliedStartDate} from '@libs/common/test/fixtures/applied-scheduling-template-period.fixture'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {afterVisitSummaryForPatientMilestoneAppointmentFixture} from '@libs/common/test/fixtures/after-visit-summary.fixture'
import {
  serviceTypeBloodCycleMonitoringFixture,
  serviceTypeBloodWithSuperTypeFixture,
  serviceTypeForUltrasoundDay3Fixture,
  serviceTypeForUltrasoundFolliculesFixture,
  serviceTypeForUltrasoundSonohysterogramFixture,
  serviceTypeSemenCollectionFixture,
  serviceTypeSwabCollectionFixture,
  serviceTypeUrineCollectionFixture,
  serviceTypeWithAppointmentCancellationAndSmsConfirmationEnabledFixture,
  serviceTypeWithAutomaticSelectionFixture,
  serviceTypeWithCustomConfirmationBeforeHoursFixture,
  serviceTypeWithDuration25Fixture,
  serviceTypeWithDuration40Fixture,
  serviceTypeWithoutFirstAvailableDayFixture,
  serviceTypeWithoutTaxFixture,
  serviceTypeWithSuperTypeForUltrasoundFixture,
  virtualServiceTypeForMilestoneFixture,
} from './service-type.fixture'
import {MilestoneStep} from '@libs/services-common/enums/journey-enum'
import {
  testOrderForGetSpecimensForAppointmentFixture,
  testOrderForUltrasoundDay3Fixture,
  testOrderForUltrasoundFolliclesDetailFixture,
  testOrderForUltrasoundFolliclesDetailWIthEmptyActivePlanFixture,
  testOrderForUltrasoundFolliclesOldFixture,
  testOrderSpecimenCollectionFixture,
  testOrderSpermCryoCreateVialsFixture,
  testOrderForUltrasoundFolliclesFixture,
  testOrderForUltrasoundFolliclesLessDataFixture,
  testOrderForUltrasoundSonohysterogramFixture,
  testOrderSpecimenBarcodeFixture,
  testOrderForClaimDetailsFixture,
  testOrderForUltrasound3Fixture,
  testOrderForPatAppTestResultsFixture,
  testOrderForOrderActionsFixture,
  testOrderForPatientUpdateOhipFixture,
  testOrderForPatientUpdateOhipWithTestWithPriceFixture,
  testOrderForAppWithTestWithPriceForCheckoutFixture,
  testOrderPendingPaymentListFixture,
  testOrderFixture,
  testOrderForViewFixture,
} from './test-order.fixture'
import {catheterTypeFirstFixture} from './catheter-type.fixture'
import {
  patientAppointmentFixture,
  patientBilling,
  patientClinicEmrJohnSFixture,
  patientForEPPFixture,
  patientForGetSpecimenDetailsFixture,
  patientForPlanTypesFixture,
  patientForPlansV2Fixture,
  patientForProfileTestResultsFixture,
  patientForUltrasoundFixture,
  patientForUltrasoundWithEmptyActivePlanFixture as patientForUltrasoundWithEmptyActivePlanFixture,
  patientForAvoidDuplicatedPaymentFixture,
  patientForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture,
  patientForSkipUpdatingPatientIntakeStatusForV1WhenUpdatedAppStatusFixture,
  patientForPartnerAcceptedForPartnerIntakeUpdateFixture,
  patientForPatientAppointmentTestResultsFixture,
  patientForPlansV3Fixture,
  patientForBackgroundInformationFixture,
  patientForUpdateOhipAvailabilityFixture,
  patientWithOhipAvailUnknownFixture,
  patientForPendingPaymentListForOhipYesFixture,
  patientForPendingPaymentListForOhipNoFixture,
  patientClinicEmrKimLeFixture,
  patientForKeepSlotBusyFixture,
  patientForCheckInAppMetadataUpdatedFixture,
  patientForFeedbackFixture,
  patientDischargedFixture,
  patientNotActiveFixture,
  patientForEncounterTypeFixture,
  patientToMoveSpecimenAppointmentInProgressFixture,
  patientWithoutDoctorSoftDeletedFixture,
  patientToSoftDeleteFixture,
  patientForLinkedBillsFixture,
  patientForAppointmentsBackgroundFixture,
  patientForLinkedItemAdhocCheckoutFixture,
  patientForMilestoneRequiredActionFixture,
} from './patient.fixture'
import {mockedMeetingIdToFail} from '@libs/common/adapters/__mocks__/zoom.adapter'

export const maximumCountAppointmentStartDate: string = '2022-11-18'
export const maximumAppointmentEndDate: string = '2022-11-18'

// will be updated after adding handling for multiple messages
export const appointmentWithoutPatientIdValidationMessage: string = 'patientId should not be empty'

export const providersAppointmentTitle: string = `EmailVerified EmailVerified | IC-V | Running Late | Acuity synced`

export const providersAppointmentColor: string = '#F8B5C9'

export const invalidAppointmentUUid: string = '4c493218-1d16-4e44-a95b-8d57b1ae9c2d'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)
export const nextYear: number = dateTimeUtil.getYear() + 1
const fourYearsAhead: number = dateTimeUtil.getYear() + 4

export const ohipClaimDateSent: string = `${nextYear}-06-17`
const requiredActionStartDate: Date = dateTimeUtil.addHours(dateTimeUtil.now(), 2)

export const appointmentFixture: Partial<Appointment> = {
  id: 1,
  uuid: '06d88a39-df2f-47b4-ae57-95f471e8d821',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentFixtureForCheckin: Partial<Appointment> = {
  id: 315,
  uuid: 'af225c45-769a-4c09-8eee-e6eaca5119f1',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
  parentAppointmentId: appointmentFixture.id,
}
export const pastAppointmentFixture: Partial<Appointment> = {
  id: 2,
  uuid: '16dd6873-f788-487a-89b3-fa74530c40d2',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2022-06-17T03:24:00'),
  end: dateTimeUtil.toDate('2022-06-17T04:24:00'),
  serviceType: serviceTypeFixture as ServiceType,
  virtualMeetingId: 'asas',
  virtualMeetingUrl: 'asasURL',
}

export const appointmentForSlotFixture: Partial<Appointment> = {
  id: 3,
  uuid: 'e458_appointment_test',
  status: AppointmentStatus.RunningLate,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T06:24:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T07:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  externalAppointmentIDForAcuity: 115,
}

export const appointmentCancelledStatusFixture: Partial<Appointment> = {
  id: 4,
  uuid: 'appointmentCancelled',
  status: AppointmentStatus.Cancelled,
  patientId: partnerIntakeJourneyTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2023-06-17T03:24:00'),
  end: dateTimeUtil.toDate('2023-06-17T04:24:00'),
  serviceType: serviceTypeFixture as ServiceType,
  patient: partnerIntakeJourneyTypeFixture as Patient,
}
export const appointmentInProgressStatusFixture: Partial<Appointment> = {
  id: 5,
  uuid: 'appointmentInProgress',
  status: AppointmentStatus.CheckedIn,
  patientId: patientForQuestionnaireFixture.id,
  serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T03:24:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  milestoneStep: MilestoneStep.InitialConsultation,
}
export const appointmentBookedStatusFixture: Partial<Appointment> = {
  id: 6,
  totalAmount: '300.00',
  uuid: 'appointmentBooked',
  status: AppointmentStatus.Booked,
  patientId: cartPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T03:24:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  patient: cartPatientFixture as Patient,
  testResultGenerationInProgress: true,
  specimenGenerationInProgress: true,
}

export const appointmentMaxTimeUnitFixture: Partial<Appointment> = {
  id: 7,
  uuid: 'appointment_test_max_units',
  status: AppointmentStatus.Booked,
  patientId: cartPatientFixture.id,
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${maximumCountAppointmentStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${maximumAppointmentEndDate}T23:00:00`),
  serviceType: serviceTypeFixture as ServiceType,
  patient: cartPatientFixture as Patient,
}

export const appointmentForPatientEmailVerifiedCompletedFixture: Partial<Appointment> = {
  id: 8,
  uuid: 'appointment_verified_patient_done',
  status: AppointmentStatus.Done,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
  milestoneStep: MilestoneStep.InitialConsultation,
}

export const appointmentForPatientCartCompletedFixture: Partial<Appointment> = {
  id: 9,
  uuid: 'appointment_cart_patient_done',
  status: AppointmentStatus.Done,
  patientId: cartPatientFixture.id,
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
  milestoneStep: MilestoneStep.InitialConsultation,
}

export const appointmentForSpecimenCollectionStatusToBeUpdatedFixture: Partial<Appointment> = {
  id: 15,
  uuid: 'b54768b7-c528-4a1d-b079-13c38f9ad72f',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const appointmentForSpecimenCollectionStatusNotToBeUpdatedFixture: Partial<Appointment> = {
  id: 16,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49f1e684',
  status: AppointmentStatus.Booked,
  patientId: cartPatientFixture.id,
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const appointmentForMilestoneDetailsServiceGroupFixture: Partial<Appointment> = {
  id: 10,
  uuid: 'appointment_milestone_service_group',
  status: AppointmentStatus.Booked,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 13),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 14),
}

export const appointmentForMilestoneDetailsServiceTypeFixture: Partial<Appointment> = {
  id: 11,
  uuid: 'appointment_milestone_service_type',
  status: AppointmentStatus.Booked,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 30),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 31),
}

export const appointmentWithoutAfterSummaryFixture: Partial<Appointment> = {
  id: 12,
  uuid: 'appointment_without_summary',
  status: AppointmentStatus.Done,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration25Fixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
}

export const appointmentWithAfterSummaryFixture: Partial<Appointment> = {
  id: 13,
  uuid: 'appointment_with_summary',
  status: AppointmentStatus.Done,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  afterVisitSummaryId: afterVisitSummaryForPatientMilestoneAppointmentFixture.id,
}

export const appointmentForSpecimenCollectionServiceTypeFixture: Partial<Appointment> = {
  id: 14,
  uuid: 'appointment_specimen_test',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const appointmentForServiceTypeFixture: Partial<Appointment> = {
  id: 316,
  uuid: '7d54fa00-74ea-4de1-ae8e-1eb2727140d8',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const appointmentForIsEditableFixture: Partial<Appointment> = {
  id: 17,
  uuid: 'appointment_is_editable_false',
  status: AppointmentStatus.Done,
  patientId: cartPatientFixture.id,
  serviceProviderId: serviceProviderForIsEditableFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-12-01T07:00:00`),
  end: dateTimeUtil.toDate(`${nextYear}-12-01T23:00:00`),
}

/** Follow up appoitnemnt (before 48 hours till now) - should show as required actionin milestone */
export const appointmentForRequiredActionMilestoneFixture: Partial<Appointment> = {
  id: 19,
  uuid: 'ApptReqActionMilestLess48Hours',
  status: AppointmentStatus.Booked,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 32),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
}

export const appointmentForCustomConfirmationBeforeHoursRequiredActionMilestoneFixture: Partial<Appointment> =
  {
    id: 204,
    uuid: 'ApptReqActionMilestMoreThan72Hours',
    status: AppointmentStatus.Booked,
    patientId: patientForMilestoneRequiredActionFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithCustomConfirmationBeforeHoursFixture.id,
    start: dateTimeUtil.addHours(dateTimeUtil.now(), 72),
    end: dateTimeUtil.addHours(dateTimeUtil.now(), 73),
  }

/** Follow up appoitnemnt (in More than 48 hours till now) - should NOT show as required actionin milestone */
export const appointmentForRequiredActionMilestoneMoreThan72HoursFixture: Partial<Appointment> = {
  id: 20,
  uuid: 'ApptReqActionMilestMore48Hours',
  status: AppointmentStatus.Booked,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 73),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 74),
  paymentStatus: AppointmentPaymentStatus.Paid,
}

export const appointmentConfirmRequiredActionMilestoneFixture: Partial<Appointment> = {
  id: 21,
  uuid: 'ConfirmRequiredAction',
  status: AppointmentStatus.Booked,
  patientId: milestonePatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
}

export const appointmentConfirmRequiredActionMilestoneSGDominantFixture: Partial<Appointment> = {
  id: 22,
  uuid: 'ConfirmRequiredActionSGDominant',
  status: AppointmentStatus.Booked,
  patientId: milestonePatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
}

export const appointmentForSubmitSpecimenCollectionFixture: Partial<Appointment> = {
  id: 23,
  uuid: 'b54768b7-c528-4a1d-b079-13c38f9ad90f',
  status: AppointmentStatus.InProgress,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const appointmentConfirmRequiredActionMilestone50HourAgoStartFixture: Partial<Appointment> =
  {
    id: 24,
    uuid: 'ConfirmRequiredAction50HourStartAgo',
    status: AppointmentStatus.Booked,
    patientId: milestonePatientFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
    start: dateTimeUtil.subHours(dateTimeUtil.now(), 50),
    end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  }

export const appointmentConfirmRequiredActionMilestoneSGFixture: Partial<Appointment> = {
  id: 25,
  uuid: 'ConfirmRequiredActionServiceGroup1',
  status: AppointmentStatus.Booked,
  patientId: milestonePatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
}

export const appointmentConfirmRequiredActionMilestoneExtraFixture: Partial<Appointment> = {
  id: 26,
  uuid: 'ConfirmRequiredActionServiceGroup2',
  status: AppointmentStatus.Booked,
  patientId: milestonePatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration25Fixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
}

export const appointmentConstraintServiceTypesFixture: Partial<Appointment> = {
  id: 27,
  uuid: 'ConstraintServiceTypesAppointment',
  status: AppointmentStatus.Done,
  patientId: patientConstraintServiceTypesFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 50),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 49),
  milestoneStep: MilestoneStep.InitialConsultation,
}

export const appointmentFutureOnOtherPatientFixture: Partial<Appointment> = {
  id: 28,
  uuid: 'e4567810_appointment_test',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedOtherForAppointmentFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2023-06-17T03:24:00'),
  end: dateTimeUtil.toDate('2023-06-17T04:24:00'),
  serviceType: serviceTypeFixture as ServiceType,
}

export const appointmentForSpecimenListTypeOrderFixture: Partial<Appointment> = {
  id: 29,
  uuid: 'appointment_specimen_type_list',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const appointmentForSpecimenCancelledFixture: Partial<Appointment> = {
  id: 30,
  uuid: 'appointment_cancelled',
  status: AppointmentStatus.Cancelled,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const pastAppointmentLast5dayFixture: Partial<Appointment> = {
  id: 31,
  uuid: '31_appointment_test',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  end: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
  serviceType: serviceTypeFixture as ServiceType,
}

export const appointmentWithTestResultsFixture: Partial<Appointment> = {
  id: 32,
  uuid: '32_appointment',
  status: AppointmentStatus.Done,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const appointmentWithTestResultsNonDominantFixture: Partial<Appointment> = {
  id: 33,
  uuid: '33_appointment',
  status: AppointmentStatus.Done,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}

export const appointmentWithoutTestResultsFixture: Partial<Appointment> = {
  id: 34,
  uuid: '34_appointment',
  status: AppointmentStatus.Done,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const appointmentForRequiredActionMilestoneInProgressFixture: Partial<Appointment> = {
  id: 35,
  uuid: '35_appointment',
  status: AppointmentStatus.InProgress,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
}

export const appointmentForPatientCheckedInFixture: Partial<Appointment> = {
  id: 36,
  uuid: '36_appointment',
  status: AppointmentStatus.CheckedIn,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.todayWithZeroTimeTZ(),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 7),
}
export const appointmentForTodayBookedFixture: Partial<Appointment> = {
  id: 314,
  uuid: 'fffdc3b3-7881-4306-b6f2-52c05f72f2a3',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.todayWithZeroTimeTZ(),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 7),
}

export const appointmentForTodayBookedForPatientFixture: Partial<Appointment> = {
  id: 37,
  uuid: '37_appointment-00000-00000',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 15),
  end: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 16),
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
}
export const appointmentNoShowFixture: Partial<Appointment> = {
  id: 38,
  uuid: '38_appointment-00000-00000',
  status: AppointmentStatus.NoShow,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 15),
  end: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 16),
}

export const pastAppointmentLast7dayFixture: Partial<Appointment> = {
  id: 39,
  uuid: '39_appointment_test',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.subDays(dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 0), 6),
  end: dateTimeUtil.subDays(dateTimeUtil.now(), 7),
  serviceType: serviceTypeFixture as ServiceType,
}

export const pastAppointmentLinkedToEncounterFixture: Partial<Appointment> = {
  id: 40,
  uuid: '40_appointment_test',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  start: dateTimeUtil.subDays(dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 0), 3),
  end: dateTimeUtil.subDays(dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 0), 4),
}

export const appointmentForPaymentAlertPendingFixture: Partial<Appointment> = {
  id: 42,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e3346',
  status: AppointmentStatus.Booked,
  patientId: patientToPushPaymentAlertFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const appointmentForBookedAppointmentCheckoutFixture: Partial<Appointment> = {
  id: 43,
  lockedPrice: '75.00',
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e3347',
  status: AppointmentStatus.Confirmed,
  patientId: patientBookedAppointmentCartFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const appointmentForBookedAppointmentCheckoutPaidFixture: Partial<Appointment> = {
  id: 44,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e3348',
  status: AppointmentStatus.Booked,
  patientId: patientBookedAppointmentCartFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  paymentStatus: AppointmentPaymentStatus.Paid,
}

export const appointmentForReferralWithOhipReferralRequiredFixture: Partial<Appointment> = {
  id: 45,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e1212',
  patientId: patientForProfileDoctorsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
}

export const appointmentForReferralWithoutOhipReferralRequiredFixture: Partial<Appointment> = {
  id: 46,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e1213',
  patientId: patientForProfileDoctorsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const appointmentForReferralPaidFixture: Partial<Appointment> = {
  id: 47,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e1214',
  patientId: patientForProfileDoctorsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  paymentStatus: AppointmentPaymentStatus.Paid,
}

export const appointmentRejectedSemenCollectionFixture: Partial<Appointment> = {
  id: 48,
  uuid: '4cdc04d8-2957-4237-a92b-b4e5fed7958f',
  patientId: patientForMaleIcFormFixture.id,
  serviceProviderId: serviceProviderSemenCollectionFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  paymentStatus: AppointmentPaymentStatus.Paid,
  status: AppointmentStatus.Confirmed,
}

export const appointmentSemenCollectionFixture: Partial<Appointment> = {
  id: 49,
  uuid: '894504d8-2957-4237-a92b-b4e5fed7958f',
  patientId: patientForMaleIcFormFixture.id,
  serviceProviderId: serviceProviderSemenCollectionFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  status: AppointmentStatus.Confirmed,
}

export const appointmentRunningLateFixture: Partial<Appointment> = {
  id: 50,
  uuid: '894504d8-2957-4237-a92b-b4e5fed7993f',
  status: AppointmentStatus.RunningLate,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.todayWithZeroTimeTZ(), 17),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
}
export const appointmentRunningLateForCheckedInFixture: Partial<Appointment> = {
  id: 319,
  uuid: '0c6de7cf-5db6-4318-8a82-e268c2098799',
  status: AppointmentStatus.RunningLate,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.todayWithZeroTimeTZ(), 17),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
}

export const appointmentWithSpecialWorkflowFixture: Partial<Appointment> = {
  id: 51,
  uuid: '894504d8-2957-4237-a92b-b4e5fed7993c',
  status: AppointmentStatus.CheckedIn,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
  testOrderId: testOrderSpecimenCollectionFixture.id,
}

export const appointmentForStimSheetFixture: Partial<Appointment> = {
  id: 52,
  uuid: '894504d8-2957-4237-a92b-b4e5fed8893c',
  status: AppointmentStatus.Done,
  patientId: patientForPlans.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2018-02-03T13:00:00'),
  end: dateTimeUtil.toDate('2018-02-03T13:10:00'),
}

export const appointmentForStimSheetNotIUIFixture: Partial<Appointment> = {
  id: 53,
  identifier: 'appointmentForStimSheetNotIUIFixture',
  uuid: 'b5fe5b05-660a-4cb0-843f-3b3d3c912b31',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-05T13:10:00'),
}

export const appointmentForStimSheetIUIFixture: Partial<Appointment> = {
  id: 54,
  identifier: 'appointmentForStimSheetIUIFixture',
  uuid: 'b5fe5b05-660a-4cb0-843f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-05T13:00:00'),
  catheterTypeId: catheterTypeFirstFixture.id,
}

export const appointmentBeforeStimSheetFixture: Partial<Appointment> = {
  id: 55,
  uuid: 'b5fe5b05-660a-4cb0-843f-3b3d3c912b33',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-01-01T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-01T13:00:00'),
}

export const appointmentAfterStimSheetFixture: Partial<Appointment> = {
  id: 56,
  uuid: 'b5fe5b05-660a-4cb0-843f-3b3d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
}

export const appointmentForStimSheetWithSignedDayFixture: Partial<Appointment> = {
  id: 57,
  uuid: '894504e8-2957-4237-a92b-b4e5fed8893c',
  status: AppointmentStatus.Done,
  patientId: patientForPlans.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2018-02-04T13:00:00'),
  end: dateTimeUtil.toDate('2018-02-03T13:10:00'),
}

export const appointmentWithoutCatheterSelectionFixture: Partial<Appointment> = {
  id: 58,
  uuid: '894504d8-2957-4237-a92b-b4e5fed7693c',
  status: AppointmentStatus.CheckedIn,
  patientId: patientForPlans.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
  start: dateTimeUtil.toDate('2018-02-03T13:00:00'),
  end: dateTimeUtil.toDate('2018-02-03T13:10:00'),
}

export const appointmentForUltrasoundFollOldFixture: Partial<Appointment> = {
  id: 60,
  uuid: 'b5fe5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:11:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  testOrderId: testOrderForUltrasoundFolliclesOldFixture.id,
}

export const appointmentForUltrasoundFollGetDetailToPrefillFixture: Partial<Appointment> = {
  id: 61,
  uuid: 'b5fe5b05-660a-4cb0-843f-443d3c9lll34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithSuperTypeForUltrasoundFixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  testOrderId: testOrderForUltrasoundFolliclesDetailFixture.id,
}

export const appointmentForUltrasoundFollGetDetailToPrefillWithNotActivePlanFixture: Partial<Appointment> =
  {
    id: 62,
    uuid: 'b5fe5bc5-660a-4cb0-843f-443d3c9lll34',
    status: AppointmentStatus.Done,
    patientId: patientForUltrasoundWithEmptyActivePlanFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeFixture.id,
    start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
    end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
    testOrderId: testOrderForUltrasoundFolliclesDetailWIthEmptyActivePlanFixture.id,
  }

export const appointmentForStimSheetUltrasoundFixture: Partial<Appointment> = {
  id: 63,
  uuid: 'b5fe5bc5-220a-4cb0-843f-443d3c9lll34',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-05T13:00:00'),
}

export const appointmentForStimSheetLatestFixture: Partial<Appointment> = {
  id: 64,
  uuid: 'b5fa5bc5-220a-4cb0-843f-443d3c9lll34',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T15:00:00'),
  end: dateTimeUtil.toDate('2020-02-05T15:00:00'),
}

export const appointmentForUltrasoundReviewedReleasedFixture: Partial<Appointment> = {
  id: 65,
  uuid: '66fe5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
}

export const appointmentForUltrasoundOnMobileFixture: Partial<Appointment> = {
  id: 67,
  uuid: 67 + 'fe5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  start: dateTimeUtil.now(),
  end: dateTimeUtil.addMinutes(dateTimeUtil.now(), 40),
  testOrderId: testOrderForUltrasoundFolliclesOldFixture.id,
}

export const appointmentGetSpecimensForAppointmentFixture: Partial<Appointment> = {
  id: 68,
  uuid: 68 + '3466ab-53e4-4733-be1d-79a77c4ea916',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderForGetSpecimensForAppointmentFixture.id,
}

export const appointmentForCryoCreateVials: Partial<Appointment> = {
  id: 71,
  uuid: '06d9b778-21eb-46af-8212-e13b0bd16d11',
  status: AppointmentStatus.Done,
  patientId: patientForGetSpecimenDetailsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  testOrderId: testOrderSpermCryoCreateVialsFixture.id,
}

export const appointmentForUltrasoundDay3Fixture: Partial<Appointment> = {
  id: 75,
  uuid: 75 + 'fe5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundDay3Fixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  testOrderId: testOrderForUltrasoundDay3Fixture.id,
}

export const appointmentForUltrasoundDay3LessDataFixture: Partial<Appointment> = {
  id: 76,
  uuid: 76 + 'DD5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundDay3Fixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundDay3Fixture.id,
  start: dateTimeUtil.toDate('2020-01-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-01-04T13:00:00'),
  testOrderId: testOrderForUltrasound3Fixture.id,
}

export const appointmentForUltrasoundFollFixture: Partial<Appointment> = {
  id: 78,
  uuid: 78 + 'fe5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  start: dateTimeUtil.toDate('2020-02-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-04T13:00:00'),
  testOrderId: testOrderForUltrasoundFolliclesFixture.id,
}

export const appointmentForUltrasoundFollLessDataFixture: Partial<Appointment> = {
  id: 80,
  uuid: 80 + 'DD5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  start: dateTimeUtil.toDate('2020-05-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-05-04T13:00:00'),
  testOrderId: testOrderForUltrasoundFolliclesLessDataFixture.id,
}

export const appointmentForPartnerFixture: Partial<Appointment> = {
  id: 81,
  uuid: 81 + 'DD5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Booked,
  patientId: patientForProfileTestResultsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-12-01T13:00:00`),
  end: dateTimeUtil.toDate(`${nextYear}-12-01T14:00:00`),
  testOrderId: null,
}

export const appointmentForStimSheetDay3Fixture: Partial<Appointment> = {
  id: 82,
  identifier: 'appointmentForStimSheetDay',
  uuid: 'b5fe5b05-660a-2ab0-843f-4b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundDay3Fixture.id,
  start: dateTimeUtil.toDate('2020-02-02T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-02T13:00:00'),
}

export const appointmentForUltrasoundSonohysterogramFixture: Partial<Appointment> = {
  id: 83,
  uuid: 83 + 'fe5b05-660a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundSonohysterogramFixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  testOrderId: testOrderForUltrasoundSonohysterogramFixture.id,
}

export const appointmentSpecimenBarcodeFixture: Partial<Appointment> = {
  id: 84,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e4313',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeUrineCollectionFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T13:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T14:24:00`),
  testOrderId: testOrderSpecimenBarcodeFixture.id,
}

export const appointmentForEPPCreationFixture: Partial<Appointment> = {
  id: 85,
  uuid: 'b3fe5cc5-220a-4cb0-843f-443d3c9lll34',
  status: AppointmentStatus.Done,
  patientId: patientForEPPFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  start: dateTimeUtil.toDate('2020-03-05T14:00:00'),
  end: dateTimeUtil.toDate('2020-03-05T14:00:00'),
}

export const appointmentSemenCollectionOptionalFieldsFixture: Partial<Appointment> = {
  id: 86,
  uuid: '105517e3-1fd9-4e7f-a0e9-39b14a5af363',
  patientId: patientForMaleIcFormFixture.id,
  serviceProviderId: serviceProviderSemenCollectionFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  status: AppointmentStatus.Confirmed,
}

export const getProfileAppointmentFixture: Partial<Appointment> = {
  id: 87,
  uuid: '6a0133ab-f62a-4d3a-8db7-65ec9453866d',
  status: AppointmentStatus.CheckedIn,
  patientId: patientProfileAppointmentFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  start: dateTimeUtil.toDate('2020-03-05T14:00:00'),
  end: dateTimeUtil.toDate('2020-03-05T14:00:00'),
}

export const appointmentWithoutOrderFixture: Partial<Appointment> = {
  id: 88,
  uuid: 'a3fe5cc5-220a-4cb0-843f-443d3c9ll333',
  status: AppointmentStatus.Confirmed,
  patientId: patientForGetSpecimenDetailsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2023-01-01T07:00:00`),
  end: dateTimeUtil.toDate(`2023-01-01T08:00:00`),
  serviceType: serviceTypeFixture as ServiceType,
  patient: patientAppointmentFixture as Patient,
}

export const appointmentForOhipClaimFixture: Partial<Appointment> = {
  id: 89,
  uuid: '62dce2ce-3449-448d-a4f4-af749905c508',
  status: AppointmentStatus.Done,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${ohipClaimDateSent}T03:24:00`),
  end: dateTimeUtil.toDate(`${ohipClaimDateSent}T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentForOhipClaimSubmissionFixture: Partial<Appointment> = {
  id: 90,
  uuid: '1111cf57-2a3f-47d0-8790-c776fa1e4313',
  status: AppointmentStatus.Done,
  patientId: patientBilling.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentNotShowStatusFixture: Partial<Appointment> = {
  id: 79,
  uuid: 79 + 'fe5b05-660a-4cb0-843f-443d3c912b79',
  status: AppointmentStatus.NoShow,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  start: dateTimeUtil.toDate('2020-02-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-04T13:00:00'),
  testOrderId: testOrderForUltrasoundFolliclesFixture.id,
}

export const appointmentRequiredActionMilestoneFixture: Partial<Appointment> = {
  id: 91,
  uuid: '0b1f5d63-6ef9-41ce-819a-f73fd85aec0f',
  status: AppointmentStatus.Booked,
  patientId: milestoneRequiredActionsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: requiredActionStartDate,
  end: dateTimeUtil.addMinutes(requiredActionStartDate, 40),
}

export const appointmentForOBWorksheetFixture: Partial<Appointment> = {
  id: 95,
  identifier: 'appointmentForOBWorksheetFixture',
  uuid: 'b5fe5b15-260a-4cb0-843f-3b3d3c912b31',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
  start: dateTimeUtil.toDate('2020-02-08T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-08T13:10:00'),
}

export const cancelledAppointmentFixture: Partial<Appointment> = {
  id: 96,
  uuid: '65f67441-511b-4c69-8f4e-004e64ebcc30',
  status: AppointmentStatus.Cancelled,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${dateTimeUtil.getYear()}-11-11T12:20:00`),
  end: dateTimeUtil.toDate(`${dateTimeUtil.getYear()}-11-11T12:30:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentForCollectSpecimenWithoutStorageFixture: Partial<Appointment> = {
  id: 97,
  uuid: '39f5b209-a603-4764-aaab-e2e44ac57e82',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
}

export const appointmentForStimSheetRowTitleFixture: Partial<Appointment> = {
  id: 98,
  identifier: 'appointmentForStimSheetRowTitleFixture',
  uuid: 'b5fe5b05-661a-4cb0-843f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-02-12T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-12T13:00:00'),
}

export const appointmentWithSameStimSheetDateFixture: Partial<Appointment> = {
  id: 99,
  identifier: 'appointmentWithSameStimSheetDateFixture',
  uuid: 'b5fe5b05-661a-4cb1-843f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanTypesFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithoutFirstAvailableDayFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-05T13:10:00'),
}

export const appointmentForStimSheetLatestHormoneFixture: Partial<Appointment> = {
  id: 100,
  identifier: 'appointmentForStimSheetLatestFixture',
  uuid: 'b5fe5b05-661a-3cb0-843f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithoutFirstAvailableDayFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-05T13:10:00'),
}

export const appointmentForHCGSheetHormoneFixture: Partial<Appointment> = {
  id: 101,
  identifier: 'appointmentForHCGSheetHormoneFixture',
  uuid: 'c5fe5b02-661a-3cb0-843f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithoutFirstAvailableDayFixture.id,
  start: dateTimeUtil.toDate('2020-02-17T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-17T13:00:00'),
}

export const appointmentMilestoneListFixture: Partial<Appointment> = {
  id: 102,
  uuid: '14bd4084-a089-4b7f-846f-1488df7834dd',
  status: AppointmentStatus.Done,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const appointmentForOhipClaimDetailsFixture: Partial<Appointment> = {
  id: 103,
  uuid: '6afa1c00-346c-47a6-9a50-1be7d7a8e443',
  status: AppointmentStatus.Done,
  patientId: patientBilling.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderForClaimDetailsFixture.id,
  description: 'test description',
}

export const appointmentIUIForPlansV2Fixture: Partial<Appointment> = {
  id: 104,
  uuid: '6afa1b00-346c-47a6-9a50-1be7d7a8e443',
  status: AppointmentStatus.Done,
  patientId: patientForPlansV2Fixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  description: 'test description',
}

export const appointmentIUIForPlansTypesFixture: Partial<Appointment> = {
  id: 105,
  uuid: '6afa2b00-346c-47a6-9a50-1be7d7a8e443',
  status: AppointmentStatus.Done,
  patientId: patientForPlanTypesFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-12T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-12T04:24:00`),
  description: 'test description',
}

export const appointmentForStimSheetHormoneFixture: Partial<Appointment> = {
  id: 106,
  identifier: 'appointmentForStimSheetHormoneFixture',
  uuid: 'b5fe5b02-661a-3cb0-843f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithoutFirstAvailableDayFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-05T13:00:00'),
}

export const appointmentForUltrasoundDay3SuccessFixture: Partial<Appointment> = {
  id: 107,
  uuid: '44147074-6907-4b16-834d-48b0ce222b15',
  status: AppointmentStatus.Done,
  patientId: patientForUltrasoundDay3Fixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundDay3Fixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00'),
  testOrderId: testOrderForUltrasound3Fixture.id,
}

export const pastAppointmentLinkedToStaffNoteFixture: Partial<Appointment> = {
  id: 115,
  uuid: '115_appointment_test',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  start: dateTimeUtil.subDays(dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 0), 3),
  end: dateTimeUtil.subDays(dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 0), 4),
}

export const appointmentForOhipClaimActionsFixture: Partial<Appointment> = {
  id: 116,
  uuid: '2226b893-560a-4359-a9af-551f2acd9ddc',
  status: AppointmentStatus.Done,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${ohipClaimDateSent}T03:24:00`),
  end: dateTimeUtil.toDate(`${ohipClaimDateSent}T04:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentForStatusFilteringPlansV2Fixture: Partial<Appointment> = {
  id: 117,
  uuid: '2226b893-560a-4359-a9af-551f2abd1ddc',
  status: AppointmentStatus.Booked,
  patientId: patientClinicEmrJohnSFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T13:24:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T14:24:00`),
}

export const appointmentLifeLabB12Fixture: Partial<Appointment> = {
  id: 118,
  uuid: '3336b893-560a-4359-a9af-551f2abd1dac',
  status: AppointmentStatus.Done,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
  start: dateTimeUtil.toDate('2020-02-05T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-05T13:00:00'),
}

export const appointmentInitialConsultation: Partial<Appointment> = {
  id: 119,
  uuid: '2226b893-560a-4359-a9af-551f2abd1daa',
  status: AppointmentStatus.Booked,
  patientId: patientForProfileOverviewTransgenderMaleFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T13:24:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T14:24:00`),
  milestoneStep: MilestoneStep.InitialConsultation,
}
export const appointmentInitialConsultationForCheckingMaxCount: Partial<Appointment> = {
  id: 295,
  uuid: 'f91bd172-8b03-42f0-a338-36f2c8796cc2',
  status: AppointmentStatus.Booked,
  patientId: patientForProfileOverviewTransgenderMaleFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${dateTimeUtil.formatDateYMD(dateTimeUtil.now())}T13:24:00`),
  end: dateTimeUtil.toDate(`${dateTimeUtil.formatDateYMD(dateTimeUtil.now())}T14:24:00`),
  milestoneStep: MilestoneStep.InitialConsultation,
}
export const appointmentForAvoidDuplicatedPaymentFixture: Partial<Appointment> = {
  id: 225,
  lockedPrice: '23.23',
  uuid: 225 + '1cf57-2a3f-47d7-8790-c771fa1e3347',
  status: AppointmentStatus.Booked,
  patientId: patientForAvoidDuplicatedPaymentFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
}

export const appointmentForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture: Partial<Appointment> =
  {
    id: 230,
    uuid: 230 + '1cf57-2a3f-47d7-8790-c771fa1e3347',
    status: AppointmentStatus.Booked,
    patientId: patientForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeFixture.id, //initialConsultation by ServiceCategory
    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
    serviceType: serviceTypeFixture as ServiceType,
  }

export const appointmentForStimSheetTestPanelHormoneTypeFixture: Partial<Appointment> = {
  id: 231,
  identifier: 'appointmentForStimSheetTestPanelHormoneTypeFixture',
  uuid: 'b5fe5b05-660a-4cb0-243f-3b3d3c912b31',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSwabCollectionFixture.id,
  start: dateTimeUtil.toDate('2020-03-05T13:10:00'),
  end: dateTimeUtil.toDate('2020-03-05T13:10:00'),
}

export const appointmentForStimSheetWithoutEncounterLinkFixture: Partial<Appointment> = {
  id: 232,
  uuid: '894524d2-2957-4237-a92b-b4e5fed8893c',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundDay3Fixture.id,
  start: dateTimeUtil.toDate('2020-03-06T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-06T13:10:00'),
}

export const appointmentForSkipUpdatingPatientIntakeStatusForV1WhenUpdatedAppStatusFixture: Partial<Appointment> =
  {
    id: 235,
    uuid: 235 + '1cf57-2a3f-47d7-8790-c771fa1e3347',
    status: AppointmentStatus.Booked,
    patientId: patientForSkipUpdatingPatientIntakeStatusForV1WhenUpdatedAppStatusFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeFixture.id, //initialConsultation by ServiceCategory
    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
    serviceType: serviceTypeFixture as ServiceType,
  }

export const appointmentForPartnerAcceptedForPartnerIntakeUpdateFixture: Partial<Appointment> = {
  id: 240,
  uuid: 240 + '1cf57-2a3f-47d7-8790-c771fa1e3347',
  status: AppointmentStatus.Booked,
  patientId: patientForPartnerAcceptedForPartnerIntakeUpdateFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id, //NOT IC
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

export const appointmentForProcedureServiceTypeFixture: Partial<Appointment> = {
  id: 241,
  uuid: '37544cf1-2234-4033-bad9-8b113f8b7c53',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeProcedureFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T07:00:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T23:00:00`),
  externalAppointmentIDForAcuity: 111,
}

export const appointmentForBookedAppointmentFixture: Partial<Appointment> = {
  id: 242,
  lockedPrice: '88.88',
  uuid: 'b1a3fabc-1f55-416b-b187-621c50441a7a',
  status: AppointmentStatus.Booked,
  patientId: patientBookedAppointmentCartFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const appointmentForPatAppTestResultsFixture: Partial<Appointment> = {
  id: 245,
  uuid: 245 + '3fabc-1f55-416b-b187-621c50441a7a',
  status: AppointmentStatus.Booked,
  patientId: patientForPatientAppointmentTestResultsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  testOrderId: testOrderForPatAppTestResultsFixture.id,
  start: dateTimeUtil.toDate(`2021-06-13T13:20:00`),
  planSheetResultsStatus: AppointmentPlanSheetResultsStatus.Completed,
}

export const appointmentIUIForPlansV3Fixture: Partial<Appointment> = {
  id: 255,
  uuid: '6afa1b00-346c-47a6-9a50-2be7d7a8e443',
  status: AppointmentStatus.Done,
  patientId: patientForPlansV3Fixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  description: 'test description',
}

export const appointmentForTestOrderActionFixture: Partial<Appointment> = {
  id: 256,
  uuid: 256 + '22abc-1f55-416b-b187-621c50441a99',
  status: AppointmentStatus.Booked,
  patientId: patientForBackgroundInformationFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeProcedureFixture.id,
  testOrderId: testOrderForOrderActionsFixture.id,
}

export const appointmentWithoutTaxFixture: Partial<Appointment> = {
  id: 260,
  uuid: 260 + '_appointment_test',
  status: AppointmentStatus.Confirmed,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithoutTaxFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

export const appointmentForUpdateOhipAvailabilityForSTNotCoveredByOhipFixture: Partial<Appointment> =
  {
    id: 270,
    uuid: 270 + '_appointment_test',
    status: AppointmentStatus.Confirmed,
    paymentStatus: AppointmentPaymentStatus.PendingPayment,
    patientId: patientForUpdateOhipAvailabilityFixture.id,
    serviceTypeId: serviceTypeFixture.id,
    lockedPrice: String(serviceTypeFixture.price),

    serviceProviderId: serviceProviderFixture.id,
    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  }

export const appointmentForUpdateOhipAvailabilityForSTCoveredByOhipFixture: Partial<Appointment> = {
  id: 271,
  uuid: 271 + '_appointment_test',
  status: AppointmentStatus.Confirmed,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  patientId: patientForUpdateOhipAvailabilityFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  lockedPrice: String(serviceTypeWithOhipBillingCodeFixture.price),

  serviceProviderId: serviceProviderFixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.todayWithZeroTimeTZ(), 1), //today in the morning
  end: dateTimeUtil.addHours(dateTimeUtil.todayWithZeroTimeTZ(), 2),
}

export const appointmentInPastForUpdateOhipAvailabilityForSTCoveredByOhipFixture: Partial<Appointment> =
  {
    id: 272,
    uuid: 272 + '_appointment_test',
    status: AppointmentStatus.Confirmed,
    paymentStatus: AppointmentPaymentStatus.PendingPayment,
    patientId: patientForUpdateOhipAvailabilityFixture.id,
    serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
    lockedPrice: String(serviceTypeWithOhipBillingCodeFixture.price),

    serviceProviderId: serviceProviderFixture.id,
    start: dateTimeUtil.addDays(dateTimeUtil.now(), -1), //yesterday
    end: dateTimeUtil.addHours(dateTimeUtil.addDays(dateTimeUtil.now(), -1), 1),
  }

export const appointmentDay0StimSheetIUIFixture: Partial<Appointment> = {
  id: 273,
  identifier: 'appointmentDay0StimSheetIUIFixture',
  uuid: 'b5fe5b05-660a-4cb0-233f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-01-16T13:00:00'),
  end: dateTimeUtil.toDate('2020-01-16T13:00:00'),
  catheterTypeId: catheterTypeFirstFixture.id,
}

export const appointmentNotOnStimSheetIUIFixture: Partial<Appointment> = {
  id: 274,
  identifier: 'appointmentNotOnStimSheetIUIFixture',
  uuid: 'b5fe5b05-660a-4cb0-223f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-01-17T13:00:00'),
  end: dateTimeUtil.toDate('2020-01-17T13:00:00'),
  catheterTypeId: catheterTypeFirstFixture.id,
}

export const appointmentForPatWithOhipAvailUnknownFixture: Partial<Appointment> = {
  id: 280,
  uuid: 280 + '_appointment_test',
  status: AppointmentStatus.Confirmed,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  patientId: patientWithOhipAvailUnknownFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,

  serviceProviderId: serviceProviderFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), -1), //yesterday
  end: dateTimeUtil.addHours(dateTimeUtil.addDays(dateTimeUtil.now(), -1), 1),
}

export const appointmentWithTestCoveredByOhipForUpdateOhipFixture: Partial<Appointment> = {
  id: 283,
  uuid: 283 + '3fabc-1f55-416b-b187-621c50441a7a',
  status: AppointmentStatus.Booked,
  patientId: patientForUpdateOhipAvailabilityFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  testOrderId: testOrderForPatientUpdateOhipFixture.id,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  lockedPrice: String(serviceTypeWithOhipBillingCodeFixture.price),

  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

export const appointmentWithTestWithPriceForUpdateOhipFixture: Partial<Appointment> = {
  id: 284,
  uuid: 284 + '3fabc-1f55-416b-b187-621c50441a7a',
  status: AppointmentStatus.Booked,
  patientId: patientForUpdateOhipAvailabilityFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  testOrderId: testOrderForPatientUpdateOhipWithTestWithPriceFixture.id,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  lockedPrice: String(serviceTypeWithOhipBillingCodeFixture.price),
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

export const appointmentWithTestWithPriceCheckoutFixture: Partial<Appointment> = {
  id: 285,
  uuid: 285 + '3fabc-1f55-416b-b187-621c50441a7a',
  status: AppointmentStatus.Booked,
  patientId: patientBookedAppointmentCartFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  testOrderId: testOrderForAppWithTestWithPriceForCheckoutFixture.id,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,

  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

// OHIP YES
export const appointmentForPatientOhipYesAndNotCoveredForPendingPaymentListFixture: Partial<Appointment> =
  {
    id: 289,
    uuid: 289 + '3fabc-1f55-416b-b187-621c50441a7a',
    lockedPrice: '10.00',
    status: AppointmentStatus.Booked,
    patientId: patientForPendingPaymentListForOhipYesFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeFixture.id,
    paymentStatus: AppointmentPaymentStatus.PendingPayment,

    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  }

/**
 * OHIP YES
 * ST - covered by ohip
 * tests - some covered some not , and some free
 */
export const appointmentForPatientOhipYesWithTestForPendingPaymentListFixture: Partial<Appointment> =
  {
    id: 290,
    uuid: 290 + '3fabc-1f55-416b-b187-621c50441a7a',
    status: AppointmentStatus.Booked,
    patientId: patientForPendingPaymentListForOhipYesFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
    paymentStatus: AppointmentPaymentStatus.PendingPayment,
    testOrderId: testOrderPendingPaymentListFixture.id,

    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  }

// OHIP YES
export const appointmentForPatientOhipYesNotTaxesForPendingPaymentListFixture: Partial<Appointment> =
  {
    id: 291,
    uuid: 291 + '3fabc-1f55-416b-b187-621c50441a7a',
    status: AppointmentStatus.Booked,
    patientId: patientForPendingPaymentListForOhipYesFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithoutTaxFixture.id,
    paymentStatus: AppointmentPaymentStatus.PendingPayment,

    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  }

// OHIP NO
export const appointmentForPatientOhipNoAndNotCoveredForPendingPaymentListFixture: Partial<Appointment> =
  {
    id: 292,
    uuid: 292 + '3fabc-1f55-416b-b187-621c50441a7a',
    lockedPrice: '10.00',
    status: AppointmentStatus.Booked,
    patientId: patientForPendingPaymentListForOhipNoFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeFixture.id,
    paymentStatus: AppointmentPaymentStatus.PendingPayment,

    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  }

// OHIP NO
export const appointmentForPatientOhipNoAndCouldBeCoveredForPendingPaymentListFixture: Partial<Appointment> =
  {
    id: 293,
    uuid: 293 + '3fabc-1f55-416b-b187-621c50441a7a',
    status: AppointmentStatus.Booked,
    lockedPrice: '10.00',
    patientId: patientForPendingPaymentListForOhipNoFixture.id,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
    paymentStatus: AppointmentPaymentStatus.PendingPayment,

    start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
    end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  }

// OHIP NO
export const appointmentForPatientOhipCanceledForPendingPaymentListFixture: Partial<Appointment> = {
  id: 294,
  uuid: 294 + '3fabc-1f55-416b-b187-621c50441a7a',
  status: AppointmentStatus.Cancelled,
  patientId: patientForPendingPaymentListForOhipNoFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,

  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

/** order-super-type.test.ts */
export const patientAppointmentWithMilestoneTestOrderFixture: Partial<Appointment> = {
  id: 300,
  uuid: '3003fabc-1f55-416b-b187-621c50441111',
  status: AppointmentStatus.Booked,
  patientId: patientClinicEmrKimLeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
  description: 'View State',
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  testOrderId: testOrderFixture.id,

  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

export const appointmentForEditProviderFixture: Partial<Appointment> = {
  id: 301,
  uuid: 301 + '3fabc-1f55-416b-b187-621c50441111',
  lockedPrice: '12.00',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderForBookingFlowFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  virtualMeetingId: mockedMeetingIdToFail,
}

export const appointmentForKeepSLotBusyAt7AmFixture: Partial<Appointment> = {
  id: 310,
  uuid: 310 + '3fabc-1f55-416b-b187-621c50441111',
  status: AppointmentStatus.Booked,
  patientId: patientForKeepSlotBusyFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,

  start: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T11:00:00.000Z`),
  end: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T11:30:00.000Z`),
}

export const appointmentForKeepSLotBusyAtMiddleOfDayAmFixture: Partial<Appointment> = {
  id: 311,
  uuid: 311 + '3fabc-1f55-416b-b187-621c50441111',
  status: AppointmentStatus.Booked,
  patientId: patientForKeepSlotBusyFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,

  start: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T15:00:00.000Z`),
  end: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T15:30:00.000Z`),
}

export const appointmentForKeepSLotBusyWithLinkedProviderFixture: Partial<Appointment> = {
  id: 312,
  uuid: 312 + '3fabc-1f55-416b-b187-621c50441111',
  status: AppointmentStatus.Booked,
  patientId: patientForKeepSlotBusyFixture.id,
  serviceProviderId: serviceProviderForIsEditableFixture.id,
  serviceTypeId: serviceTypeFixture.id,

  start: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T17:00:00.000Z`),
  end: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T18:00:00.000Z`),
}

export const appointmentForKeepSLotBusyCanceledFixture: Partial<Appointment> = {
  id: 313,
  uuid: 313 + '3fabc-1f55-416b-b187-621c50441111',
  status: AppointmentStatus.Cancelled,
  patientId: patientForKeepSlotBusyFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,

  start: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T18:00:00.000Z`),
  end: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T18:30:00.000Z`),
}

export const appointmentForCheckInAppMetadataUpdatedFixture: Partial<Appointment> = {
  id: 317,
  uuid: 317 + '3fabc-1f55-416b-b187-621c50441111',
  status: AppointmentStatus.Booked,
  patientId: patientForCheckInAppMetadataUpdatedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,

  start: dateTimeUtil.toDate(`${fourYearsAhead}-08-11T18:00:00.000Z`),
  end: dateTimeUtil.toDate(`${fourYearsAhead}-08-11T18:30:00.000Z`),
}

/**Created in tests */
export const appointmentForPatientCheckedInInProgressFixture: Partial<Appointment> = {
  id: 320,
  uuid: 320 + '_appointment',
  status: AppointmentStatus.InProgress,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
}

export const appointmentForPatientCheckedInUpdateStatusFixture: Partial<Appointment> = {
  id: 325,
  uuid: 325 + '_appointment',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 18),
  end: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 19),
}

export const appointmentForPatientFeedbackFormFixture: Partial<Appointment> = {
  id: 326,
  uuid: '7e99a447-0a46-4f1f-92ae-00576c4fd3eb',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 18),
  end: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 19),
}

export const apptForUltrasoundResultDetailsFixture: Partial<Appointment> = {
  id: 327,
  uuid: '5dcfca2d-ec94-46a0-a750-340d190ef79c',
  status: AppointmentStatus.Booked,
  patientId: patientForUltrasoundResultsDetailFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFolliculesFixture.id,
  description: 'View State',
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

export const appointmentForPatientV2Fixture: Partial<Appointment> = {
  id: 328,
  uuid: 'ccfc5411-a1ba-41e6-a9d3-626bb220abd1',
  status: AppointmentStatus.NoShow,
  patientId: patientForAppointmentByDateFixture.id,
  serviceProviderId: serviceProviderV2Fixture.id,
  serviceTypeId: serviceTypeV2Fixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T05:24:00Z`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T06:24:00Z`),
  planSheetResultsStatus: AppointmentPlanSheetResultsStatus.Completed,
}

export const appointmentForFinalReportFixture: Partial<Appointment> = {
  id: 329,
  uuid: '11c6c5ba-606b-4249-8dd1-9ca5ef082312',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2024-09-16T23:24:00`),
  end: dateTimeUtil.toDate(`2027-12-16T23:24:00`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'final report appointment description',
}

export const patientMilestoneTestOrderForIsActiveFixture: Partial<Appointment> = {
  id: 330,
  uuid: '3333fabc-1f55-416b-b187-621c50442222',
  status: AppointmentStatus.Booked,
  patientId: patientClinicEmrKimLeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
  description: 'View State',
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  testOrderId: testOrderForViewFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-08-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-08-17T04:24:00`),
}

/**Created in tests */
export const appointmentForCheckInListWIthSuperTypeFixture: Partial<Appointment> = {
  id: 335,
  uuid: 335 + '6c5ba-606b-4249-8dd1-9ca5ef082312',
  status: AppointmentStatus.Confirmed,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  serviceType: serviceTypeBloodWithSuperTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'final report appointment description',
}

export const appointmentForPatientV2CycleMonFixture: Partial<Appointment> = {
  id: 336,
  uuid: 'ccfc5411-a1ba-41e6-a9d3-626bb220abd2',
  status: AppointmentStatus.NoShow,
  patientId: patientForAppointmentByDateFixture.id,
  serviceProviderId: serviceProviderV2Fixture.id,
  serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}
export const appointmentWithoutRequiredActionMilestoneInProgressFixture: Partial<Appointment> = {
  id: 338,
  uuid: '8efdfb6e-2a73-41ca-989e-4c1ef1d446ec',
  status: AppointmentStatus.InProgress,
  patientId: patientForInProgressAppointmentFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
}

export const appointmentForMilestoneDetailsMobileCheckInFixture: Partial<Appointment> = {
  id: 337,
  uuid: 'mobile_appointment_check_in',
  status: AppointmentStatus.Booked,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 10),
  end: dateTimeUtil.setHours(dateTimeUtil.todayWithZeroTimeTZ(), 11),
}

export const appointmentForCheckInAppointmentFixture: Partial<Appointment> = {
  id: 339,
  uuid: 'eae5a600-28b0-498b-a143-97d00a309b34',
  status: AppointmentStatus.Booked,
  patientId: patientForCheckInAppointmentsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  description: 'View State',
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  testOrderId: testOrderForViewFixture.id,
  start: dateTimeUtil.addMinutes(dateTimeUtil.now(), 12),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 1),
}

export const appointmentFollowUpFixture: Partial<Appointment> = {
  id: 340,
  uuid: '2233a5ac-c5ae-484c-8ce9-028660b52dbe',
  status: AppointmentStatus.Booked,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFollowUpFixture.id,
  description: 'View State',
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  testOrderId: testOrderForViewFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-19T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-19T04:24:00`),
}

export const appointmentFollowUpUnSignedFixture: Partial<Appointment> = {
  id: 341,
  uuid: 'fe71975f-a9e9-4d97-b45e-a2d9cb9eb149',
  status: AppointmentStatus.Booked,
  patientId: patientForV2ConfirmFailFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFollowUpFixture.id,
  description: 'View State',
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  testOrderId: testOrderForViewFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-09-19T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-09-19T04:24:00`),
}

export const appointmentForCheckInMobileTwoFixture: Partial<Appointment> = {
  id: 345,
  uuid: 345 + '5a600-28b0-498b-a143-97d00a309b34',
  status: AppointmentStatus.Confirmed,
  patientId: patientForCheckInAppointmentsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.addHours(dateTimeUtil.now(), 1),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 2),
}

//should not return this app on checkIn list on mobile for today
export const appointmentForCheckInMobileNotTOdayFixture: Partial<Appointment> = {
  id: 346,
  uuid: 346 + '5a600-28b0-498b-a143-97d00a309b34',
  status: AppointmentStatus.Confirmed,
  patientId: patientForCheckInAppointmentsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 10),
  end: dateTimeUtil.addMinutes(dateTimeUtil.addDays(dateTimeUtil.now(), 10), 30),
}

export const appointmentToNotShowOnDayTestsFixture: Partial<Appointment> = {
  id: 347,
  uuid: 347 + '3fabc-1f55-416b-b187-621c50441a7a',
  status: AppointmentStatus.Booked,
  patientId: patientForPatientAppointmentTestResultsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  testOrderId: testOrderForPatAppTestResultsFixture.id,
  start: dateTimeUtil.toDate(`2021-06-13T13:20:00`),
}

export const appointmentForPatientsByDateWithResultStatusFixture: Partial<Appointment> = {
  id: 348,
  uuid: 'ccfc5411-a1ba-43a2-a9d3-626bb220abd1',
  status: AppointmentStatus.Booked,
  patientId: patientForAppointmentByDateFixture.id,
  serviceProviderId: serviceProviderV2Fixture.id,
  serviceTypeId: serviceTypeV2Fixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T13:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T14:24:00`),
  planSheetResultsStatus: AppointmentPlanSheetResultsStatus.Pending,
}

export const appointmentForManualStatusUpdateFixture: Partial<Appointment> = {
  id: 349,
  uuid: '9111cf57-443f-47d0-9990-c776fa1e9913',
  status: AppointmentStatus.Done,
  patientId: patientBilling.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00Z`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00Z`),
  serviceType: serviceTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentForManualStatusUpdateFailedFixture: Partial<Appointment> = {
  ...appointmentForManualStatusUpdateFixture,
  id: 350,
  uuid: '9555cf57-443f-47d0-9990-c776fa1e9913',
}

export const appointmentInActiveProviderFixture: Partial<Appointment> = {
  id: 351,
  uuid: 'ae7ff557-c73d-436d-91e3-be8fd751cd0e',
  status: AppointmentStatus.Done,
  patientId: patientBilling.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypePhoneCallTypeFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00Z`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00Z`),
  serviceType: serviceTypePhoneCallTypeFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentForFeedbackFixture: Partial<Appointment> = {
  id: 353,
  uuid: 353 + '1cf57-443f-47d0-9990-c776fa1e9913',
  status: AppointmentStatus.Done,
  patientId: patientForFeedbackFixture.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2024-06-17T03:24:00Z`),
  end: dateTimeUtil.toDate(`2024-06-17T04:24:00Z`),
  parentAppointmentId: appointmentFixture.id,
}

export const appointmentForFeedbackCanceledFixture: Partial<Appointment> = {
  id: 354,
  uuid: 354 + '1cf57-443f-47d0-9990-c776fa1e9913',
  status: AppointmentStatus.Cancelled,
  patientId: patientForFeedbackFixture.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2024-06-19T03:24:00Z`),
  end: dateTimeUtil.toDate(`2024-06-19T04:24:00Z`),
}

export const appointmentInActiveServiceTypeFixture: Partial<Appointment> = {
  id: 355,
  uuid: 355 + '1cf57-443f-47d0-9990-c776fa1e9913',
  status: AppointmentStatus.Done,
  patientId: patientBilling.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypeInActiveFixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00Z`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00Z`),
  serviceType: serviceTypeInActiveFixture as ServiceType,
  testOrderId: testOrderSpecimenCollectionFixture.id,
  description: 'test description',
}

export const appointmentNotActivePatientFixture: Partial<Appointment> = {
  id: 356,
  uuid: 'ccfc5464-a1ba-41e6-a9a3-626bb220abd1',
  status: AppointmentStatus.Booked,
  patientId: patientNotActiveFixture.id,
  serviceProviderId: serviceProviderV2Fixture.id,
  serviceTypeId: serviceTypeV2Fixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T06:24:00Z`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T06:24:00Z`),
  planSheetResultsStatus: AppointmentPlanSheetResultsStatus.Completed,
}

export const appointmentDischargedFixture: Partial<Appointment> = {
  id: 357,
  uuid: 'ccfc5411-a1ba-41e6-a2b4-126bb220abd1',
  status: AppointmentStatus.Booked,
  patientId: patientDischargedFixture.id,
  serviceProviderId: serviceProviderV2Fixture.id,
  serviceTypeId: serviceTypeV2Fixture.id,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T05:24:00Z`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T06:24:00Z`),
  planSheetResultsStatus: AppointmentPlanSheetResultsStatus.Completed,
}

export const appointmentForStimSheetWithEncounterNotesCancelledFixture: Partial<Appointment> = {
  id: 358,
  uuid: '894524d2-2957-4237-a22b-c1a5fed8893c',
  status: AppointmentStatus.Cancelled,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-03-08T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-08T13:10:00'),
}

export const appointmentForStimSheetWithoutEncounterNotesCancelledFixture: Partial<Appointment> = {
  id: 359,
  uuid: '894524a3-2957-4237-a22b-c1a5fed2894c',
  status: AppointmentStatus.Cancelled,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  start: dateTimeUtil.toDate('2020-03-15T13:00:00Z'),
  end: dateTimeUtil.toDate('2020-03-15T15:10:00Z'),
  serviceTypeId: serviceTypeForUltrasoundDay3Fixture.id,
}

export const appointmentForUltrasoundToBeDoneFixture: Partial<Appointment> = {
  id: 360,
  uuid: 'b5fe5b05-440a-4cb0-843f-443d3c9lll34',
  status: AppointmentStatus.CheckedIn,
  patientId: patientForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-03-04T13:00:00Z'),
  end: dateTimeUtil.toDate('2020-03-04T13:00:00Z'),
  testOrderId: testOrderForUltrasoundFolliclesDetailFixture.id,
  createdAt: dateTimeUtil.toDate('2020-03-04T13:00:00'),
}

export const apptForObUltrasoundResultDetailsFixture: Partial<Appointment> = {
  id: 365,
  uuid: 365 + 'fca2d-ec94-46a0-a750-340d190ef79c',
  status: AppointmentStatus.Booked,
  patientId: patientForUltrasoundResultsDetailFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithSuperTypeForUltrasoundFixture.id,
  description: 'View State',
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  start: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
}

export const appointmentForEncounterTypeFixture: Partial<Appointment> = {
  id: 366,
  uuid: 366 + 'fca2d-ec94-46a0-a750-340d190ef79c',
  status: AppointmentStatus.Done,
  patientId: patientForEncounterTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2019-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`2019-06-17T04:24:00`),
}

export const appointmentForEncounterTypeOlderFixture: Partial<Appointment> = {
  id: 367,
  uuid: 367 + 'fca2d-ec94-46a0-a750-340d190ef79c',
  status: AppointmentStatus.Done,
  patientId: patientForEncounterTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2018-06-17T03:24:00`),
  end: dateTimeUtil.toDate(`2018-06-17T04:24:00`),
}

export const appointmentForSpecimenCollectionStatusToMoveInProgressFixture: Partial<Appointment> = {
  id: 368,
  uuid: 'b54768b2-c228-1a1d-c079-13c38f9ad72f',
  status: AppointmentStatus.Confirmed,
  patientId: patientToMoveSpecimenAppointmentInProgressFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2018-06-17T12:24:00`),
  end: dateTimeUtil.toDate(`2018-06-17T13:24:00`),
}

export const appointmentForFeedbackTentatitveFixture: Partial<Appointment> = {
  id: 369,
  uuid: 369 + '1cf57-443f-47d0-9990-c776fa1e9913',
  status: AppointmentStatus.Done,
  patientId: patientForFeedbackFixture.id,
  serviceProviderId: serviceProviderBilling.id,
  serviceTypeId: serviceTypeProcedureFixture.id,
  start: dateTimeUtil.toDate(`2024-06-20T03:24:00Z`),
  end: dateTimeUtil.toDate(`2024-06-20T04:24:00Z`),
  parentAppointmentId: appointmentFixtureForCheckin.id,
}

export const appointmentForSoftDeletedPatientFixture: Partial<Appointment> = {
  uuid: '2151cf57-443f-47d0-2993-a772ba1e9913',
  status: AppointmentStatus.InProgress,
  patientId: patientWithoutDoctorSoftDeletedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
}

export const appointmentPartnerLinks: Partial<Appointment> = {
  id: 370,
  uuid: 370 + '1cf57-443f-47d0-9990-c776fa1e9913',
  status: AppointmentStatus.InProgress,
  patientId: patientEmailVerifiedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`2024-06-20T03:24:00Z`),
  end: dateTimeUtil.toDate(`2024-06-20T04:24:00Z`),
  virtualMeetingUrl: 'virtualMeetingUrl',
}

export const appointmentUltrasoundForSoftDeletedPatientFixture: Partial<Appointment> = {
  id: 371,
  uuid: 'a5fe5c03-620a-4cb0-843f-443d3c912b34',
  status: AppointmentStatus.Done,
  patientId: patientToSoftDeleteFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithSuperTypeForUltrasoundFixture.id,
  start: dateTimeUtil.toDate('2060-03-04T13:11:00'),
  end: dateTimeUtil.toDate('2060-03-04T13:00:00'),
}

export const appointmentForStimSheetForNotCompletedResultFixture: Partial<Appointment> = {
  id: 372,
  identifier: 'notCompletedResultFixture',
  uuid: 'b5fe5b05-662a-4cb0-843f-3b3d3c912b32',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithoutFirstAvailableDayFixture.id,
  start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
}

export const appointmentForBillsPaidFixture: Partial<Appointment> = {
  id: 373,
  identifier: 'appointmentForBillsPaidFixture',
  uuid: 'b5fe5b05-662a-4cb0-843f-3b3d3c922b34',
  patientId: patientForLinkedBillsFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  paymentStatus: AppointmentPaymentStatus.Paid,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  totalAmount: '100',
}

export const appointmentForBillsNotPaidFixture: Partial<Appointment> = {
  id: 374,
  identifier: 'appointmentForBillsNotPaidFixture',
  uuid: 'b5fe5b03-662a-4cb0-843f-4b3d3c912b32',
  patientId: patientForLinkedBillsFixture.id,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  totalAmount: '100',
}

export const appointmentForBillsWithoutTotalAmountFixture: Partial<Appointment> = {
  id: 375,
  identifier: 'appointmentForBillsWithoutTotalAmountFixture',
  uuid: 'b5fe5b02-662a-4cb0-843f-3b3a3c912b32',
  patientId: patientForLinkedBillsFixture.id,
  paymentStatus: AppointmentPaymentStatus.PendingPayment,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
}

export const appointmentForAppointmentsBackgroundFixture: Partial<Appointment> = {
  id: 376,
  uuid: 'b5fe5b01-662a-4cb0-843f-3b3b4c912b22',
  status: AppointmentStatus.Booked,
  lockedPrice: '10',
  patientId: patientForAppointmentsBackgroundFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  serviceProviderId: serviceProviderFixture.id,
}

export const appointmentForAdhocCheckoutFixture: Partial<Appointment> = {
  id: 377,
  totalAmount: '100',
  uuid: 'a5fe5b03-662a-4cb0-843f-3b3b4c912b22',
  status: AppointmentStatus.Booked,
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
  serviceProviderId: serviceProviderFixture.id,
}

export const appointmentForMilestoneDetailVirtualFixture: Partial<Appointment> = {
  id: 380,
  uuid: 'appForMileilVirtualFixture',
  status: AppointmentStatus.Booked,
  patientId: milestoneDetailsPatientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: virtualServiceTypeForMilestoneFixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 32),
  end: dateTimeUtil.addHours(dateTimeUtil.now(), 9),
  virtualMeetingUrl: 'virtualMeetingUrlappointmentForMilestoneDetailVirtualFixture',
}

export const appointmentForStimSheetCustomTestTypesFixture: Partial<Appointment> = {
  id: 382,
  uuid: '294524d2-2957-3237-a92b-a4e5fed8893c',
  status: AppointmentStatus.Done,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundSonohysterogramFixture.id,
  start: dateTimeUtil.toDate('2020-02-07T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-07T13:10:00'),
}

export const appointmentForStimSheetCustomTestTypesCancelledFixture: Partial<Appointment> = {
  id: 383,
  uuid: '294524d2-2958-3237-a92b-a4e5fed8893c',
  status: AppointmentStatus.Cancelled,
  patientId: patientForPlanPartnerFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForUltrasoundSonohysterogramFixture.id,
  start: dateTimeUtil.toDate('2020-02-08T13:00:00'),
  end: dateTimeUtil.toDate('2020-02-08T13:10:00'),
}

export const appointmentForSpermCryoSemenCollectionFixture: Partial<Appointment> = {
  id: 384,
  uuid: 'f02a606b-df10-47a0-a423-708f1a35c9fd',
  status: AppointmentStatus.Done,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  start: dateTimeUtil.toDate('2020-03-11T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-11T13:15:00'),
}

export const appointmentForAppointmentsBackgroundCancellationEnabledFixture: Partial<Appointment> =
  {
    id: 385,
    uuid: 'b5fe5b01-662a-4cb0-843f-3b3b4412b22',
    status: AppointmentStatus.Booked,
    patientId: patientForAppointmentsBackgroundFixture.id,
    serviceTypeId: serviceTypeWithAppointmentCancellationAndSmsConfirmationEnabledFixture.id,
    start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
    end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
    serviceProviderId: serviceProviderFixture.id,
    milestoneStep: MilestoneStep.InitialConsultation,
    identifier: 'appointmentForAppointmentsBackgroundCancellationEnabledFixture',
  }

export const appointmentForAppointmentsBackgroundCancellationEnabledFollowUpFixture: Partial<Appointment> =
  {
    id: 386,
    uuid: 'f9e8ffe4-7e16-4c45-8ca8-103049062683',
    status: AppointmentStatus.Booked,
    patientId: patientForAppointmentsBackgroundFixture.id,
    serviceTypeId: serviceTypeWithAppointmentCancellationAndSmsConfirmationEnabledFixture.id,
    start: dateTimeUtil.toDate('2020-02-02T13:10:00'),
    end: dateTimeUtil.toDate('2020-02-02T13:10:00'),
    serviceProviderId: serviceProviderFixture.id,
    milestoneStep: MilestoneStep.FollowUp,
  }

export const appointmentStrawNumberFixture: Partial<Appointment> = {
  id: 387,
  uuid: '20d7c559-db56-4e31-95fc-9e62af8987a5',
  status: AppointmentStatus.Booked,
  patientId: patientForProfileOverviewTransgenderMaleFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T13:24:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T14:24:00`),
  milestoneStep: MilestoneStep.InitialConsultation,
}

export const appointmentForCryoSemenCollectionFixture: Partial<Appointment> = {
  id: 388,
  uuid: '21d7c559-db56-4e31-95fc-9e62af8987b6',
  status: AppointmentStatus.Booked,
  patientId: patientForTestResultAuthFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenCollectionFixture.id,
  start: dateTimeUtil.toDate('2020-03-11T13:00:00'),
  end: dateTimeUtil.toDate('2020-03-11T13:15:00'),
}
