/* eslint-disable max-lines */
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm/patient.entity'
import {AuthUserFixture} from '@libs/common/test/fixtures/auth.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {
  mainServiceProviderForCareTeamFixture,
  serviceProviderAppointmentsFixture,
  serviceProviderBilling,
  serviceProviderFixture,
  serviceProviderFixtureId,
  serviceProviderForMobileFixture,
  serviceProviderForSerGroupAvailAutoProviderSelectionFixture,
  serviceProviderV2Fixture,
  serviceProviderWithCareTeamEmailFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {
  cartConfirmBookAppointmentPaymentDetailIdFixtureId,
  cartConfirmFailsPaymentDetailIdFixtureId,
  cartConfirmPaymentDetailIdFixture,
  cartConfirmPaymentDetailV2IdFixture,
  cartConfirmSuccessPaymentDetailIdFixtureId,
  cartConfirmThreeCasesDetailIdFixtureId,
  cartPatientDetailDoesntHaveSexAtBirth,
  cartPatientDetailIdFixture,
  cartPatientUpdateFemaleSexAtBirthDetailIdFixture,
  cartPatientUpdateFemaleSexAtBirthDetailIdV2Fixture,
  cartPatientUpdateMaleSexAtBirthDetailIdFixture,
  cartPatientUpdateMaleSexAtBirthDetailIdV2Fixture,
  detailForPatientOverviewFemaleDetailIdFixture,
  detailForPatientOverviewMaleDetailIdFixture,
  detailForPatientOverviewTransgenderMaleDetailIdFixture,
  detailIdForQuestionnaireRevisionNotChangedFixture,
  partnerDetailForHighlightId,
  partnerIntakeJourneyTypeDetailIdFixture,
  partnerPatientForProfileTestResultsDetailIdFixture,
  patientAppointmentDetailIdFixture,
  patientClinicSchedulingDetailIdFixture,
  patientDetailForGetContactInfoIdFixture,
  patientDetailIdCartConfirmRevisionsFixture,
  patientDetailIdInitialConsultationConstraintFixture,
  patientEmailNotVerifiedDetailIdFixture,
  patientEmailVerifiedDetailIdFixture,
  patientEmailVerifiedOtherDetailIdFixture,
  patientForBackgroundInformationDetailIdFixture,
  patientForFemaleIcFormDetailIdFixture,
  patientForGeneralHealthDetailIdFixture,
  patientForMaleIcFormDetailIdFixture,
  patientForPrescriptionFileCreationDetailIdFixture,
  patientForProfileHighlightDetailIdFixture,
  patientForProfileTestResultsDetailIdFixture,
  patientForTestResultAuthDetailIdFixture,
  patientJourneyBlockedDetailIdFixture,
  patientJourneyDetailIdFixture,
  patientPartnerForProfileDetailIdFixture,
  patientPartnerForProfileWithInvalidHighlightDetailIdFixture,
  patientQuestionnaireControllerDetailIdFixture,
  patientQuestionnaireDeletePrevIntentDetailIdFixture,
  patientQuestionnaireDetailIdFixture,
  patientQuestionnaireInvalidOhipIdFixture,
  patientQuestionnaireJustControllerDetailIdFixture,
  patientQuestionnaireOhipValidationIdFixture,
  patientServiceTypeDetailsFixtureId,
  patientServiceTypeSecondExtraDetailsFixtureId,
  patientSortByAlertAndDateOfBirthDetailIdFixture,
  showAppointmentsJourneyTypeDetailIdFixture,
} from '@libs/common/test/fixtures/patient-to-patient-detail-variables.fixture'
import {
  NotificationState,
  PatientOhipAvailability,
  PatientStatusEnum,
  UserType,
} from '@libs/services-common/enums/patient.enum'
import {JourneyType} from '@libs/services-common/enums/journey-enum'
import {
  patientToServiceProviderFixture,
  patientToServiceProvidersForCareProvidersFixtures,
} from '@libs/common/test/fixtures/patient-to-service-provider.fixture'
import {PatientToServiceProvider} from '@libs/data-layer/apps/users/entities/typeorm/patient-to-service-provider.entity'
import {uuidSuffix} from '@libs/common/test/fixtures/question.fixture'
import {PatientPhotoVerificationStatus} from '@libs/services-common/enums'
import {
  patientDetailFemaleForCycleDetailsId,
  patientDetailFemaleForPlanPartnerFixtureId,
  patientFemaleDetailGynaecologicalHistoryFixture,
  patientFemaleIcFormDetailFemaleIdFixture,
  patientForFertilityHistoryPatientDetailFemaleIdFixture,
  patientForHighlightMensesPatientDetailFemaleIdFixture,
  patientQuestionnaireDetailFemaleIdFixture,
} from '@libs/common/test/fixtures/patient-to-patient-female-detail-variables.fixture'
import {
  patientDetailMaleFixtureId,
  patientGenitourinaryHistoryDetailMaleFixtureId,
  patientMaleIcFormDetailMaleFixtureId,
} from './patient-to-patient-male-detail-variables.fixture'
import {pharmacyPatientForPrescriptionFixture} from './pharmacy.fixture'
import {patientPartnerForProfileWithInvalidHighlightUuid} from '@libs/common/test/fixtures/patient-ids.fixture'
import {
  detailForGetProfileDoctorsFixture,
  detailForPlanCreationFixture,
  detailForProfileDoctorsFixture,
  patientDetailForEPLPlansFixture,
  patientDetailForIVFFixture,
  patientDetailForIVFFStrawNumberixture,
  patientDetailForIvfPatientForCompletionEggFreezingFixture,
  patientDetailForIvfPatientForCompletionFixtureFixture,
  patientDetailForPlansV2Fixture,
  patientDetailForPlansV3Fixture,
  patientDetailForScanBarcodeFixture,
  patientDetailForUpdateOhipAvailabilityFixture,
  patientForTestResultHistoryDetail,
} from './patient-detail.fixture'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {
  PatientCreatedFrom,
  PatientQuestionnaireIntakeStatus,
} from '@libs/data-layer/apps/users/enum'
import {
  priorityStatusFixture,
  priorityStatusSecondSequenceFixture,
} from '@libs/common/test/fixtures/priority-status.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)

export const patientId404: string = '1c2594a3-ad09-4ca7-8370-933e0f9606fd'
export const patientSpermCryoDateOfBirth: string = '1994-01-01'
export const patientForTestResultId: number = 25
const patientForCareProvidersId: number = 28
export const patientClinicEmrSKimleyId: number = 29
export const patientClinicEmrSamMooreId: number = 30
export const patientClinicEmrKimLeId: number = 31
export const patientClinicEmrJohnSId: number = 32
export const patientClinicEmrKimberlySId: number = 33
export const patientClinicEmrLeChuId: number = 34
export const patientClinicEmrListKimLeeId: number = 35
export const patientSendIntakeReminderId: number = 61
export const patientWithoutPregnancyId: number = 66
export const patientWithoutGenitourinaryId: number = 67
export const patientIdToPushPaymentAlertFixture: number = 118
export const patientDateOfBirth: string = '2000-01-01'

export const patientEmailVerifiedFixture: Partial<Patient> = {
  id: 1,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1313',
  patientIdentifier: 'PID0000101',
  authUserId: AuthUserFixture.emailVerified.uid,
  firstName: 'EmailVerified',
  lastName: 'EmailVerified',
  middleName: 'EmailVerified',
  stripeCustomerId: 'stripeCustomerId',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
  detailId: patientEmailVerifiedDetailIdFixture,
  detailMaleId: patientDetailMaleFixtureId,
  lastIntakeReminderSentOn: dateTimeUtil.subtractDaysFromNow(3),
  ohipCardNumber: '0000123456',
  ohipCardVersionCode: 'PF',
  hasDuplicateName: true,
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.FinalizingInProgressByClinicStaff,
  ohipAvailability: PatientOhipAvailability.Yes,
  email: 'fhealthdev+testSearch@gmail.com',
  phoneNumber: '+52468787',
}

export const patientEmailNotVerifiedFixture: Partial<Patient> = {
  id: 2,
  uuid: '9020b9d7-271a-4900-9dfc-a747b98d1ee0',
  authUserId: AuthUserFixture.emailNotVerified.uid,
  firstName: 'EmailNotVerified',
  lastName: 'EmailNotVerified',
  middleName: 'EmailNotVerified',
  serviceProviderId: serviceProviderFixture.id,
  detailId: patientEmailNotVerifiedDetailIdFixture,
}

export const patientVerifyOtpEmailNotVerifiedFixture: Partial<Patient> = {
  id: 70,
  uuid: '9020b9d7-271a-4900-9dfc-a747b98d1ee5',
  authUserId: AuthUserFixture.verifyOtpEmailNotVerified.uid,
  firstName: 'EmailNotVerified',
  lastName: 'EmailNotVerified',
  middleName: 'EmailNotVerified',
}

export const createPatientDataCyrillicFixture: Partial<Patient> = {
  firstName: "Ім'я",
  lastName: 'Прізвище',
  middleName: 'Абвгд',
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
  sexAtBirth: SexAtBirth.Female,
  termsAndConditions: true,
}

export const createPatientDefaultMilestonesFixture: Partial<Patient> = {
  firstName: 'firstName_defaultMilestonesFixture',
  lastName: 'lastName_defaultMilestonesFixture',
  middleName: 'middleName_defaultMilestonesFixture',
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
  sexAtBirth: SexAtBirth.Female,
  termsAndConditions: true,
}

export const patientForQuestionnaireFixture: Partial<Patient> = {
  id: 3,
  uuid: 'b5fe5b05-660a-4cb0-843f-3b3d3c912b92',
  authUserId: AuthUserFixture.questionnaire.uid,
  firstName: 'Questionnaire',
  lastName: 'Johnson',
  middleName: 'Fixture',
  userType: UserType.Patient,
  serviceProviderId: serviceProviderAppointmentsFixture.id,
  detailId: patientQuestionnaireDetailIdFixture,
  status: PatientStatusEnum.PlanType,
  detailFemaleId: patientQuestionnaireDetailFemaleIdFixture,
  email: 'fhealthdev+2testSearch@gmail.com',
  phoneNumber: '+16468787',
}

export const patientQuestionnaireControllerFixture: Partial<Patient> = {
  id: 4,
  authUserId: AuthUserFixture.questionnaireController.uid,
  firstName: 'Questionnaire',
  lastName: 'Patient',
  middleName: 'Fixture',
  detailId: patientQuestionnaireControllerDetailIdFixture,
}

export const patientJourneyBlockedFixture: Partial<Patient> = {
  id: 5,
  authUserId: AuthUserFixture.journeyBlocked.uid,
  uuid: 5 + uuidSuffix,
  detailId: patientJourneyBlockedDetailIdFixture,
}

export const cartPatientFixture: Partial<Patient> = {
  id: 6,
  authUserId: AuthUserFixture.cart.uid,
  uuid: 'f1f42993-3c4b-4862-b64d-3f3fe92468f9',
  firstName: 'Cart',
  lastName: 'Johnson',
  middleName: 'Fixture',
  stripeCustomerId: 'cus_CartTestStriperCustomerID5',
  serviceProviderId: serviceProviderAppointmentsFixture.id,
  detailId: cartPatientDetailIdFixture,
  status: PatientStatusEnum.PlanType,
  ohipCardNumber: 'CartOhipCardNumber',
  ohipCardVersionCode: 'CD',
  userType: UserType.Patient,
  phoneNumber: '12468787',
  email: 'fhealthdev+cartPatientFixture@gmail.com',
}

export const patientAppointmentFixture: Partial<Patient> = {
  id: 7,
  uuid: '05deec77-21c3-437c-8f71-549fa7a739f4',
  authUserId: AuthUserFixture.appointment.uid,
  firstName: 'Appointment',
  lastName: 'User',
  middleName: 'Fixture',
  stripeCustomerId: 'cus_AppointmentTestStriperCustomerID',
  detailId: patientAppointmentDetailIdFixture,
}

export const patientClinicSchedulingFixture: Partial<Patient> = {
  id: 8,
  uuid: '05deec77-21c3-437c-8f71-549fa7a739f8',
  authUserId: AuthUserFixture.clinicScheduling.uid,
  firstName: 'Clinic',
  lastName: 'Patient',
  middleName: 'Fixture',
  detailId: patientClinicSchedulingDetailIdFixture,
}

export const partnerIntakeJourneyTypeFixture: Partial<Patient> = {
  id: 9,
  uuid: 'sdfghgfd-2a3f-8676-8790-8998',
  authUserId: AuthUserFixture.partnerIntakeJourneyType.uid,
  firstName: 'PartnerIntake',
  lastName: 'Patient',
  middleName: 'Fixture',
  currentJourneyType: JourneyType.PartnerIntake,
  notificationState: NotificationState.ManagePartners,
  detailId: partnerIntakeJourneyTypeDetailIdFixture,
  serviceProviderId: serviceProviderFixtureId,
}

export const cartPatientUpdateMaleSexAtBirthFixture: Partial<Patient> = {
  id: 10,
  authUserId: AuthUserFixture.cartUpdatePatientMaleSexAtBirth.uid,
  firstName: 'cartUpdatePatientMaleSexAtBirth',
  lastName: 'User',
  middleName: 'Fixture',
  stripeCustomerId: 'cus_UpdateMaleSexAtBirthTestStriperCustomerID',
  sexAtBirth: SexAtBirth.Male,
  detailId: cartPatientUpdateMaleSexAtBirthDetailIdFixture,
}

export const cartPatientUpdateFemaleSexAtBirthFixture: Partial<Patient> = {
  id: 11,
  authUserId: AuthUserFixture.cartUpdatePatientFemaleSexAtBirth.uid,
  firstName: 'cartUpdatePatientFemaleSexAtBirth',
  lastName: 'User',
  middleName: 'Fixture',
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'cus_UpdateFemaleSexAtBirthTestStriperCustomerID',
  detailId: cartPatientUpdateFemaleSexAtBirthDetailIdFixture,
}

export const cartConfirmPaymentFixture: Partial<Patient> = {
  id: 12,
  authUserId: AuthUserFixture.cartConfirm.uid,
  firstName: 'cartConfirmFixture',
  lastName: 'User',
  middleName: 'Fixture',
  stripeCustomerId: 'cus_cartConfirmStriperCustomerID',
  detailId: cartConfirmPaymentDetailIdFixture,
}

export const patientSortByAlertAndDateOfBirthFixture: Partial<Patient> = {
  id: 13,
  uuid: 'sdfghgfd-2a3f-5676-8790-8888',
  authUserId: '999',
  firstName: 'FirstName',
  lastName: 'LastName',
  middleName: 'MiddleName',
  stripeCustomerId: 'nolanStripeCustomerId',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  detailId: patientSortByAlertAndDateOfBirthDetailIdFixture,
  phoneNumber: '+12468787111',
  email: 'fhealthdev+patientSortByAlertAndDateOfBirthFixture@gmail.com',
}

export const showAppointmentsJourneyTypeFixture: Partial<Patient> = {
  id: 14,
  uuid: '19e388a4-7c7f-4489-a3a0-8be7ef06a144',
  authUserId: AuthUserFixture.showAppointmentsJourneyType.uid,
  firstName: 'showAppointments',
  lastName: 'Patient',
  middleName: 'Fixture',
  currentJourneyType: JourneyType.ShowAppointments,
  notificationState: NotificationState.ManagePartners,
  detailId: showAppointmentsJourneyTypeDetailIdFixture,
  photoKey: 'urlPath',
  photoVerificationStatus: PatientPhotoVerificationStatus.Pending,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientForProfileHighlightFixture: Partial<Patient> = {
  id: 15,
  uuid: '8c4d3bc4-d79d-450f-9d1c-8a03c41bc5d4',
  patientIdentifier: 'patientIdentifier',
  authUserId: AuthUserFixture.availability.uid,
  firstName: 'PatientHighlight1',
  lastName: 'PatientHighlight1',
  middleName: 'PatientHighlight1',
  stripeCustomerId: 'svdbrgfefvergb',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientForProfileHighlightDetailIdFixture,
  detailFemaleId: patientForHighlightMensesPatientDetailFemaleIdFixture,
  photoVerificationStatus: PatientPhotoVerificationStatus.Verified,
  currentJourneyType: JourneyType.ShowAppointments,
  photoKey: 'link',
  dateOfBirth: dateTimeUtil.toDate('1970-01-01'),
  hasDuplicateName: true,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.V1Finalized,
  priorityStatusId: priorityStatusSecondSequenceFixture.id,
  chatwootConversationId: '1231',
  hasSameSexPartner: true,
}

export const patientForProfileWithoutHighlightFixture: Partial<Patient> = {
  id: 16,
  uuid: '1651cf57-2a3f-47d0-8790-3333',
  authUserId: 'AuthUserFixture.emailVerified.uid2',
  firstName: 'PatientHighlight2',
  lastName: 'Johnson',
  middleName: 'PatientHighlight2',
  stripeCustomerId: 'wqwerrrt-rttrt-45656',
  serviceProviderId: null,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
  detailId: null,
  dateOfBirth: dateTimeUtil.toDate('1970-01-01'),
  status: PatientStatusEnum.PlanType,
}

export const patientPartnerForProfileFixture: Partial<Patient> = {
  id: 17,
  uuid: '10328a69-ae65-48c7-9962-890387630867',
  authUserId: AuthUserFixture.partnerIcForm.uid,
  firstName: 'PartnerFirstName',
  lastName: 'PartnerLastName',
  middleName: 'PartnerMiddleName',
  stripeCustomerId: '234565gf',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  notificationState: NotificationState.InvitePartners,
  detailId: patientPartnerForProfileDetailIdFixture,
  ohipCardNumber: 'PartnerForProfileOhipCardNumber',
  ohipCardVersionCode: 'ohipCardVersionCode',
  invalidOhipErrorMessage: 'MD error message',
  isOhipValid: false,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CompletedByPatient,
  dateOfBirth: dateTimeUtil.toDate('1970-01-01'),
  priorityStatusId: priorityStatusFixture.id,
  phoneNumber: '(555) 444-3333',
  lastIntakeReminderSentOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}

export const patientJourneyFixture: Partial<Patient> = {
  id: 19,
  authUserId: AuthUserFixture.journey.uid,
  notificationState: NotificationState.InvitePartners,
  detailId: patientJourneyDetailIdFixture,
  firstName: 'Sam',
}

export const patientPartnerForProfileWithInvalidHighlightFixture: Partial<Patient> = {
  id: 20,
  uuid: patientPartnerForProfileWithInvalidHighlightUuid,
  patientIdentifier: 'Identifier',
  authUserId: 'AuthUserFixture.emailVerified.uid4',
  firstName: 'patentPartnerFirstName',
  lastName: 'ApatinetPartnerLastName',
  middleName: 'PartnerMiddleName',
  stripeCustomerId: 'dfrevee',
  serviceProviderId: null,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientPartnerForProfileWithInvalidHighlightDetailIdFixture,
  dateOfBirth: dateTimeUtil.toDate('1991-01-01'),
}

export const patientQuestionnaireDeletePrevIntentFixture: Partial<Patient> = {
  id: 21,
  authUserId: AuthUserFixture.questionnaireDeletePrevIntents.uid,
  firstName: 'QuestionnaireDeletePrevIntent',
  lastName: 'PatientDeletePrevIntent',
  detailId: patientQuestionnaireDeletePrevIntentDetailIdFixture,
  status: PatientStatusEnum.Active,
}

export const patientForProfileTestResultsFixture: Partial<Patient> = {
  id: 22,
  uuid: 'aa68b4ff-6107-4f56-b8b1-3c9ce14a6d9c',
  patientIdentifier: 'id+patient',
  authUserId: 'dfvgr-tbrghh-tnjn',
  firstName: 'patientPartner',
  lastName: 'patientPartner',
  middleName: 'patientPartnerMiddleName',
  serviceProviderId: serviceProviderFixture.id,
  sexAtBirth: SexAtBirth.Male,
  detailId: patientForProfileTestResultsDetailIdFixture,
  userType: UserType.Patient,
  dateOfBirth: '2002-02-02',
}

export const partnerPatientForProfileTestResultsFixture: Partial<Patient> = {
  id: 23,
  uuid: 'b2b66525-92ea-4f63-ac83-e48cb41da55a',
  patientIdentifier: 'id+partner1',
  authUserId: 'fve-sdcf-fvfvf-vfvff',
  sexAtBirth: SexAtBirth.Female,
  detailId: partnerPatientForProfileTestResultsDetailIdFixture,
  firstName: 'partnerPatientForProfileTestResultsFirstName',
  lastName: 'partnerPatientForProfileTestResultsLastName',
}

export const patientForProfileOverviewMaleFixture: Partial<Patient> = {
  id: 24,
  uuid: '477b711e-019d-4700-9ce0-ed41d1efb9b5',
  authUserId: 'AuthUserFixture.overviewMale.uid4',
  sexAtBirth: SexAtBirth.Male,
  detailId: detailForPatientOverviewMaleDetailIdFixture,
  email: 'deleted',
}

export const patientForTestResultAuthFixture: Partial<Patient> = {
  id: patientForTestResultId,
  uuid: patientForTestResultId + '_patientUUIDFixture',
  patientIdentifier: 'id+partner',
  authUserId: AuthUserFixture.testResult.uid,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientForTestResultAuthDetailIdFixture,
  patientToServiceProviders: [patientToServiceProviderFixture as PatientToServiceProvider],
  dateOfBirth: dateTimeUtil.addYear(dateTimeUtil.now(), -25),
}

export const patientForProfileOverviewFemaleFixture: Partial<Patient> = {
  id: 26,
  uuid: '3333-2a3f-47d0-9090-24422',
  authUserId: 'AuthUserFixture.overviewFemale.uid4',
  sexAtBirth: SexAtBirth.Female,
  detailId: detailForPatientOverviewFemaleDetailIdFixture,
  detailFemaleId: patientForFertilityHistoryPatientDetailFemaleIdFixture,
  currentJourneyType: JourneyType.ShowAppointments,
}

export const patientForGetContactInformation: Partial<Patient> = {
  id: 27,
  uuid: 27 + '_patientUUIDFixture',
  patientIdentifier: 'PID0000100',
  authUserId: 'id-contact-information',
  firstName: 'Jane',
  lastName: 'Doe',
  detailId: patientDetailForGetContactInfoIdFixture,
  serviceProviderId: serviceProviderFixture.id,
  ohipCardNumber: '4444555333',
  ohipCardVersionCode: 'PF',
  dateOfBirth: dateTimeUtil.toDate('1970-01-02'),
}

export const patientForCareProvidersFixture: Partial<Patient> = {
  id: patientForCareProvidersId,
  uuid: patientForCareProvidersId + '_patientUUIDFixture',
  authUserId: AuthUserFixture.careProviders.uid,
  serviceProviderId: mainServiceProviderForCareTeamFixture.id,
  photoKey: 'photo.png',
  patientToServiceProviders:
    patientToServiceProvidersForCareProvidersFixtures as PatientToServiceProvider[],
  currentJourneyType: JourneyType.ShowAppointments,
  ohipCardNumber: '8758483948',
  ohipCardVersionCode: 'CF',
}

export const patientClinicEmrSKimleyFixture: Partial<Patient> = {
  id: patientClinicEmrSKimleyId,
  uuid: patientClinicEmrSKimleyId + uuidSuffix,
  authUserId: 'AuthUserFixture.clinicEmr.uid1',
  firstName: 'S',
  lastName: 'Kimley',
  userType: UserType.Patient,
}

export const patientClinicEmrSamMooreFixture: Partial<Patient> = {
  id: patientClinicEmrSamMooreId,
  uuid: patientClinicEmrSamMooreId + uuidSuffix,
  authUserId: 'AuthUserFixture.clinicEmr.uid2',
  firstName: 'Sam',
  lastName: 'Moore',
  userType: UserType.Patient,
  lastIntakeReminderSentOn: dateTimeUtil.subtractDaysFromNow(3),
}

export const patientClinicEmrKimLeFixture: Partial<Patient> = {
  id: patientClinicEmrKimLeId,
  uuid: patientClinicEmrKimLeId + uuidSuffix,
  authUserId: 'AuthUserFixture.clinicEmr.uid3',
  firstName: 'Kim',
  lastName: 'patientClinicEmrKimLeFixture',
  userType: UserType.Patient,
  serviceProviderId: serviceProviderFixture.id,
  patientIdentifier: 'DEV_PID2131231231',
}

export const patientClinicEmrJohnSFixture: Partial<Patient> = {
  id: patientClinicEmrJohnSId,
  uuid: patientClinicEmrJohnSId + uuidSuffix,
  authUserId: 'AuthUserFixture.clinicEmr.uid4',
  firstName: 'John',
  lastName: 'S',
  userType: UserType.Patient,
  status: PatientStatusEnum.PlanType,
  serviceProviderId: serviceProviderFixture.id,
}

export const patientClinicEmrKimberlySFixture: Partial<Patient> = {
  id: patientClinicEmrKimberlySId,
  uuid: patientClinicEmrKimberlySId + uuidSuffix,
  authUserId: 'AuthUserFixture.clinicEmr.uid5',
  firstName: 'Kimberly',
  lastName: 'S',
  userType: UserType.Patient,
}

export const patientClinicEmrLeChuFixture: Partial<Patient> = {
  id: patientClinicEmrLeChuId,
  uuid: patientClinicEmrLeChuId + uuidSuffix,
  authUserId: 'AuthUserFixture.clinicEmr.uid6',
  firstName: 'Le',
  lastName: 'Chu',
  userType: UserType.Patient,
}

export const patientClinicEmrListKimLeeFixture: Partial<Patient> = {
  id: patientClinicEmrListKimLeeId,
  uuid: patientClinicEmrListKimLeeId + uuidSuffix,
  authUserId: 'AuthUserFixture.clinicEmr.uid7',
  firstName: 'Kim',
  lastName: 'Lee',
  userType: UserType.Patient,
}

export const patientForBookingFlowFixture: Partial<Patient> = {
  id: 36,
  uuid: 36 + uuidSuffix,
  authUserId: AuthUserFixture.bookingFlow.uid,
  userType: UserType.Patient,
}

export const cartPatientDoesntHaveSexAtBirthFixture: Partial<Patient> = {
  id: 40,
  uuid: 40 + uuidSuffix,
  authUserId: AuthUserFixture.cartPatientDoesntHaveSexAtBirth.uid,
  firstName: 'cartPatientDoesntHaveSexAtBirth',
  lastName: 'User',
  middleName: 'Fixture',
  stripeCustomerId: 'cartPatientDoesntHaveSexAtBirth',
  detailId: cartPatientDetailDoesntHaveSexAtBirth,
  userType: UserType.Partner,
}

export const patientNextDayUtcFixture: Partial<Patient> = {
  id: 43,
  uuid: 43 + uuidSuffix,
  authUserId: AuthUserFixture.availabilityNextDayUtc.uid,
}

//reusable user that will always be user
export const eternalUserPatientFixture: Partial<Patient> = {
  id: 44,
  uuid: 44 + uuidSuffix,
  authUserId: AuthUserFixture.userType.uid,
}

export const milestoneDetailsPatientFixture: Partial<Patient> = {
  id: 45,
  uuid: 45 + uuidSuffix,
  patientIdentifier: 'PID_234567',
  authUserId: AuthUserFixture.milestoneDetails.uid,
  userType: UserType.Patient,
  firstName: 'Name',
  lastName: 'LastName',
  ohipAvailability: PatientOhipAvailability.No,
}

export const milestonePatientFixture: Partial<Patient> = {
  id: 46,
  uuid: 46 + uuidSuffix,
  firstName: 'Tom',
  lastName: 'Johnson',
  authUserId: AuthUserFixture.milestone.uid,
  userType: UserType.Patient,
  ohipAvailability: PatientOhipAvailability.No,
}

export const patientForCreateBookingIntentFixture: Partial<Patient> = {
  id: 47,
  uuid: 47 + uuidSuffix,
  authUserId: AuthUserFixture.bookingIntent.uid,
}

export const patientForQuestionnaireFlowDetailsFixture: Partial<Patient> = {
  id: 48,
  uuid: 48 + uuidSuffix,
  patientIdentifier: 'patientSummaryIdentifier',
  authUserId: AuthUserFixture.questionnaireFlowDetails.uid,
}

export const patientWithQuestionnaireIntentAnswersFixture: Partial<Patient> = {
  id: 49,
  uuid: 49 + uuidSuffix,
  authUserId: AuthUserFixture.questionnaireWithAnswers.uid,
}

export const cartPatientUpdateMaleSexAtBirthV2Fixture: Partial<Patient> = {
  id: 50,
  authUserId: AuthUserFixture.cartUpdatePatientMaleSexAtBirthV2.uid,
  firstName: 'cartUpdatePatientMaleSexAtBirthV2',
  lastName: 'UserV2',
  middleName: 'FixtureV2',
  stripeCustomerId: 'cus_V2UpdateMaleSexAtBirthTestStriperCustomerID',
  detailId: cartPatientUpdateMaleSexAtBirthDetailIdV2Fixture,
  sexAtBirth: SexAtBirth.Male,
}

export const cartPatientUpdateFemaleSexAtBirthV2Fixture: Partial<Patient> = {
  id: 51,
  authUserId: AuthUserFixture.cartUpdatePatientFemaleSexAtBirthV2.uid,
  firstName: 'cartUpdatePatientFemaleSexAtBirthV2',
  lastName: 'UserV2',
  middleName: 'FixtureV2',
  stripeCustomerId: 'cus_V2UpdateFemaleSexAtBirthTestStriperCustomerID',
  detailId: cartPatientUpdateFemaleSexAtBirthDetailIdV2Fixture,
  sexAtBirth: SexAtBirth.Female,
}

export const cartConfirmV2PaymentFixture: Partial<Patient> = {
  id: 53,
  authUserId: AuthUserFixture.cartConfirmV2.uid,
  firstName: 'cartConfirmFixtureV2',
  lastName: 'UserV2',
  middleName: 'FixtureV2',
  stripeCustomerId: 'cus_cartConfirmV2StriperCustomerID',
  detailId: cartConfirmPaymentDetailV2IdFixture,
}

export const patientInitialConsultationConstraintFixture: Partial<Patient> = {
  id: 55,
  authUserId: AuthUserFixture.initialConsultationConstraint.uid,
  firstName: 'initialConsultationConstraint',
  lastName: 'initialConsultationConstraint',
  middleName: 'initialConsultationConstraint',
  stripeCustomerId: 'cus_initialConsultationConstraintStriperCustomerID',
  detailId: patientDetailIdInitialConsultationConstraintFixture,
}

export const patientCartConfirmRevisionsFixture: Partial<Patient> = {
  id: 57,
  authUserId: AuthUserFixture.cartConfirmRevisions.uid,
  firstName: 'cartConfirmRevisions',
  lastName: 'cartConfirmRevisions',
  middleName: 'cartConfirmRevisions',
  stripeCustomerId: 'cus_cartConfirmRevisionsStriperCustomerID',
  detailId: patientDetailIdCartConfirmRevisionsFixture,
}

export const patientTwoPartnerInvintationsFixture: Partial<Patient> = {
  id: 58,
  authUserId: AuthUserFixture.twoPartnerInvintations.uid,
}
export const patientConstraintServiceTypesFixture: Partial<Patient> = {
  id: 59,
  authUserId: AuthUserFixture.constraintServiceTypes.uid,
}
export const patientEmailVerifiedOtherForAppointmentFixture: Partial<Patient> = {
  id: 60,
  uuid: '1001cf57-2a3f-47d0-8790-c101fa1e1313',
  authUserId: AuthUserFixture.emailVerifiedOther.uid,
  firstName: 'EmailVerified1',
  lastName: 'EmailVerified1',
  middleName: 'EmailVerified1',
  stripeCustomerId: 'stripeCustomerId1',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
  detailId: patientEmailVerifiedOtherDetailIdFixture,
  hasDuplicateName: true,
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}
export const patientSendIntakeReminderFixture: Partial<Patient> = {
  id: patientSendIntakeReminderId,
  uuid: patientSendIntakeReminderId + uuidSuffix,
  authUserId: AuthUserFixture.sendIntakeReminder.uid,
  firstName: 'sendIntakeReminder',
  lastName: 'sendIntakeReminder',
  lastIntakeReminderSentOn: dateTimeUtil.subtractDaysFromNow(1),
}
export const patientInvitationAcceptFixture: Partial<Patient> = {
  id: 62,
  authUserId: AuthUserFixture.partnerInvitationAccept.uid,
  sexAtBirth: SexAtBirth.Female,
}
export const patientPrescriptionsFixture: Partial<Patient> = {
  id: 63,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1316',
  firstName: 'Jane',
  lastName: 'Doe',
  authUserId: AuthUserFixture.prescriptions.uid,
  sexAtBirth: SexAtBirth.Female,
  pharmacyId: pharmacyPatientForPrescriptionFixture.id,
  detailId: patientForPrescriptionFileCreationDetailIdFixture,
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
}
export const patientIdentifierFixture: Partial<Patient> = {
  id: 64,
  authUserId: 'patientIdentifierFixture',
  patientIdentifier: 'patientIdentifierFixture',
  uuid: '1ffb42e0-aa1f-4d45-b6b3-d0a6af21136b',
  firstName: 'Identifier',
  lastName: 'Fixture',
  sexAtBirth: SexAtBirth.Female,
  pharmacyId: null,
  detailId: null,
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
}
export const patientForCartWithMilestoneFixture: Partial<Patient> = {
  id: 65,
  authUserId: AuthUserFixture.cartWithExistingMilestone.uid,
  uuid: '89759004-dc45-4a74-a4ff-ca1c703c9e9a',
  patientIdentifier: 'DEV_PID000000065',
  userType: UserType.Patient,
}
export const patientWithoutPregnancyHistoryFixture: Partial<Patient> = {
  id: patientWithoutPregnancyId,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1314',
  authUserId: 'AuthUserFixture.overviewFemale',
}

export const patientForBackgroundInformationFixture: Partial<Patient> = {
  id: 77,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1310',
  authUserId: 'dfvgr-tbrghh-tnjn-sfsfs',
  firstName: 'James',
  lastName: 'Brown',
  middleName: 'EmailVerified',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
  detailId: patientForBackgroundInformationDetailIdFixture,
  lastIntakeReminderSentOn: dateTimeUtil.subtractDaysFromNow(3),
  hasDuplicateName: true,
  dateOfBirth: dateTimeUtil.toDate('1970-01-01'),
}

export const patientWithGenitourinaryHistoryFixture: Partial<Patient> = {
  id: patientWithoutGenitourinaryId,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1315',
  authUserId: 'authUserFixture-genitourinary-history',
  detailMaleId: patientGenitourinaryHistoryDetailMaleFixtureId,
}

export const patientForGynaecologicalHistoryFixture: Partial<Patient> = {
  id: 78,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1311',
  authUserId: 'dfvgr-tbrghh-tnjn-sfsf',
  firstName: 'Jane',
  lastName: 'Brown',
  middleName: 'EmailVerified',
  userType: UserType.Patient,
  detailFemaleId: patientFemaleDetailGynaecologicalHistoryFixture,
}

export const patientForGeneralHealthFixture: Partial<Patient> = {
  id: 79,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1011',
  authUserId: 'dfvgr-tbrghh-tnjn-sfsf-ds',
  firstName: 'Tom',
  lastName: 'Johnson',
  userType: UserType.Patient,
  detailId: patientForGeneralHealthDetailIdFixture,
  hasDuplicateName: true,
}

export const patientFemaleFixture: Partial<Patient> = {
  id: 81,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1333',
  authUserId: AuthUserFixture.female.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForProfileOverviewWithoutDetailFixture: Partial<Patient> = {
  id: 82,
  uuid: '3333-2a3f-47d0-9090-24452',
  authUserId: 'AuthUserFixture.overview.uid',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPartnerUserTypeFixture: Partial<Patient> = {
  id: 83,
  uuid: '3333-2a3f-47d0-9090-24496',
  authUserId: AuthUserFixture.partner.uid,
  sexAtBirth: SexAtBirth.Female,
  userType: UserType.Partner,
  firstName: 'Partner',
  lastName: 'Partner',
  detailId: partnerDetailForHighlightId,
  dateOfBirth: dateTimeUtil.toDate('1990-01-01'),
  hasDuplicateName: true,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientForContactUsFormFixture: Partial<Patient> = {
  id: 84,
  uuid: '1381cf57-2a3f-47d0-8790-c771fa1a1112',
  authUserId: AuthUserFixture.contactUs.uid,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientForPartnersCountFixture: Partial<Patient> = {
  id: 85,
  uuid: '3333-2a3f-47d0-9090-24497',
  authUserId: AuthUserFixture.partnersCount.uid,
  userType: UserType.Patient,
  currentJourneyType: JourneyType.ShowAppointments,
  sexAtBirth: SexAtBirth.Male,
}

export const patientForMaleIcFormFixture: Partial<Patient> = {
  id: 111,
  uuid: '1381cf57-2a3f-47d0-8790-c771fa1e1111',
  authUserId: 'dfvgr-tbrghh-tnjn-sfsf-ds11',
  firstName: 'Tom',
  lastName: 'Johnson',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
  detailId: patientForMaleIcFormDetailIdFixture,
  detailMaleId: patientMaleIcFormDetailMaleFixtureId,
  lastIntakeReminderSentOn: dateTimeUtil.subtractDaysFromNow(3),
  dateOfBirth: dateTimeUtil.toDate('1990-01-01'),
  hasDuplicateName: true,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientForFemaleIcFormFixture: Partial<Patient> = {
  id: 112,
  uuid: '1991cf57-2a3f-47d0-8790-c771fa1e2222',
  authUserId: 'dfvgr-tbrghh-tnjn-sfsf-ds22',
  firstName: 'Jane',
  lastName: 'Johnson',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientForFemaleIcFormDetailIdFixture,
  detailFemaleId: patientFemaleIcFormDetailFemaleIdFixture,
  lastIntakeReminderSentOn: dateTimeUtil.subtractDaysFromNow(5),
  dateOfBirth: dateTimeUtil.toDate('1990-01-01'),
  hasDuplicateName: true,
}

export const patientForPlans: Partial<Patient> = {
  id: 113,
  uuid: '1610cf57-2a7f-47d1-8731-c776fa1e1316',
  authUserId: AuthUserFixture.plans.uid,
  status: PatientStatusEnum.PlanType,
  firstName: 'Johnson',
  userType: UserType.Patient,
}

export const patientForPlansCreationFixture: Partial<Patient> = {
  id: 114,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e2222',
  authUserId: AuthUserFixture.createPlans.uid,
  sexAtBirth: SexAtBirth.Female,
  currentJourneyType: JourneyType.ShowAppointments,
  firstName: 'patientForPlans',
  lastName: 'lastname',
  detailId: detailForPlanCreationFixture.id,
  revisionId: 'revision-0',
}

export const patientToPushPlanMilestoneFixture: Partial<Patient> = {
  id: 115,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e2233',
  authUserId: AuthUserFixture.pushPlanMilestone.uid,
  userType: UserType.Patient,
}

export const patientForEmptyHighlightFixture: Partial<Patient> = {
  id: 116,
  uuid: '50361579-9ca5-451d-a995-665a12fa1522',
  authUserId: '50361579-9ca5-451d-a995-665a12fa1522',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientToPushMilestoneFixture: Partial<Patient> = {
  id: 117,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e2234',
  authUserId: AuthUserFixture.pushAppointmentMilestone.uid,
  userType: UserType.Patient,
}

export const patientToPushPaymentAlertFixture: Partial<Patient> = {
  id: patientIdToPushPaymentAlertFixture,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e3345',
  authUserId: AuthUserFixture.pushPaymentAlert.uid,
  userType: UserType.Patient,
  detailId: detailForGetProfileDoctorsFixture.id,
}

export const patientBookedAppointmentCartFixture: Partial<Patient> = {
  id: 119,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e3346',
  authUserId: AuthUserFixture.bookedAppointmentCart.uid,
}

export const patientForProfileDoctorsFixture: Partial<Patient> = {
  id: 120,
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e3347',
  authUserId: AuthUserFixture.profileDoctors.uid,
  userType: UserType.Patient,
  detailId: detailForProfileDoctorsFixture.id,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForTestResultHistory: Partial<Patient> = {
  id: 121,
  uuid: '5804d7ae-2c83-423b-ad1d-365534768bdb',
  authUserId: AuthUserFixture.profileTestResultHistory.uid,
  userType: UserType.Patient,
  detailId: patientForTestResultHistoryDetail.id,
}

export const patientForPushNotificationFixture: Partial<Patient> = {
  id: 125,
  uuid: '16667f57-2a3f-47d7-8790-c771fa1e3347',
  authUserId: AuthUserFixture.pushNotification.uid,
  userType: UserType.Patient,
}

export const patientForMilestoneServiceTypeWithTestsFixture: Partial<Patient> = {
  id: 126,
  uuid: 'b1d23e83-3948-446e-8ad2-4a9a21876b6d',
  authUserId: AuthUserFixture.profileServiceTypeWithTests.uid,
  userType: UserType.Patient,
}

export const patientForMilestoneTestsFixture: Partial<Patient> = {
  id: 127,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d58',
  authUserId: AuthUserFixture.profileForBookingTestsTypes.uid,
  userType: UserType.Patient,
}

export const patientPaymentFailFixture: Partial<Patient> = {
  id: 128,
  uuid: 'd580f110-f8ec-485f-95b8-2801257e7a48',
  authUserId: AuthUserFixture.paymentFailTest.uid,
  userType: UserType.Patient,
}

export const patientPaymentForMultipleCartItemsFixture: Partial<Patient> = {
  id: 129,
  uuid: '9d0f4fe3-dc2b-4a7c-a2d3-cdf1aae1f142',
  authUserId: AuthUserFixture.multipleCartItemsPaymentTest.uid,
  userType: UserType.Patient,
  ohipCardNumber: 'PaymentForMultipleCartohipCardNumber',
  ohipCardVersionCode: 'CD',
}

export const patientForPlanPartnerFixture: Partial<Patient> = {
  id: 130,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d79',
  authUserId: AuthUserFixture.partnerForPlan.uid,
  sexAtBirth: SexAtBirth.Male,
  firstName: 'patientForPlanPartner',
  lastName: '130lastname',
  patientIdentifier: 'TEST_PID000000130',
  dateOfBirth: '2000-01-01',
  ohipCardNumber: '2113334551',
  ohipCardVersionCode: '321',
  detailFemaleId: patientDetailFemaleForPlanPartnerFixtureId,
}

export const patientOhipFixture: Partial<Patient> = {
  id: 131,
  uuid: 'cda0e048-a562-4215-8947-89481cd66816',
  authUserId: AuthUserFixture.ohipCoveredAppoinitments.uid,
  userType: UserType.Partner,
  sexAtBirth: SexAtBirth.Male,
  ohipCardNumber: 'ohipCardNumber',
  ohipCardVersionCode: 'CD',
}

export const patientPlanSelectionDetailsFixture: Partial<Patient> = {
  id: 132,
  uuid: 'cda0e048-a562-4215-8947-89481cd66818',
  authUserId: AuthUserFixture.planSelectionDetails.uid,
  userType: UserType.Partner,
  sexAtBirth: SexAtBirth.Female,
  firstName: 'selection',
  lastName: 'planSelection',
  patientIdentifier: 'TEST_PID000000132',
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientAcknowledgedMedicationsFixture: Partial<Patient> = {
  id: 133,
  uuid: 'd86274c7-db0c-4def-ab11-f67eeb155564',
  authUserId: AuthUserFixture.acknowledgedMedications.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
  firstName: 'Jack',
  lastName: 'Sparrow',
}

export const patientCreateDrugBankFixture: Partial<Patient> = {
  id: 134,
  uuid: '7861b279-e147-4200-8de1-3cdf2b230cab',
  authUserId: AuthUserFixture.createDrugBank.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  firstName: 'Johnny',
  lastName: 'Depp',
}

export const patientAppointmentTestOrderFixture: Partial<Patient> = {
  id: 135,
  uuid: 'a19d5807-f017-44ff-8edb-51123236c79b',
  authUserId: AuthUserFixture.appointmentWithTestOrder.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
  firstName: 'Martin',
  lastName: 'Scorsese',
}

export const patientForUltrasoundFixture: Partial<Patient> = {
  id: 140,
  uuid: '7861b279-e147-4200-8de1-3cdf2b2kkcab',
  authUserId: AuthUserFixture.ultrasound.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  firstName: 'Johnny2sd2',
  lastName: 'Johnson',
  serviceProviderId: serviceProviderFixture.id,
  ohipCardNumber: '4242333333',
  ohipCardVersionCode: 'DD',
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
  patientIdentifier: 'PatIdentDD',
  status: PatientStatusEnum.Active,
}

export const patientForUltrasoundWithEmptyActivePlanFixture: Partial<Patient> = {
  id: 141,
  uuid: '786bb279-e147-4200-8de1-3cdf2b2kkcab',
  authUserId: AuthUserFixture.ultrasoundWithNotActivePlan.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  serviceProviderId: serviceProviderFixtureId,
  firstName: 'Johnny2sd2dd',
  lastName: 'Johnson',
  status: PatientStatusEnum.Discharged,
  ohipCardNumber: '111333444',
}

export const patientForUltrasoundInLatestTestResultFixture: Partial<Patient> = {
  id: 143,
  uuid: '786bb279-e147-4200-8de1-3cdbbb2kkcab',
  authUserId: AuthUserFixture.ultrasoundInlatestTestResult.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  firstName: 'Johnny2sd2dd',
  lastName: 'Johnson',
  status: PatientStatusEnum.Discharged,
}

export const patientForUltrasoundSighOffFixture: Partial<Patient> = {
  id: 144,
  uuid: '786bb279-e147-4200-8de1-3cdcchpkkcab',
  authUserId: AuthUserFixture.ultrasoundSignOffInStimSHeet.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  firstName: 'Johnny2sd2dd22',
  lastName: 'Johnson2',
}

export const patientForBookingFlowServiceTypeFixture: Partial<Patient> = {
  id: 145,
  uuid: '782cb279-e147-4200-8de1-3cdbbb2kkcab',
  authUserId: AuthUserFixture.bookingFlowWithServiceType.uid,
  userType: UserType.Patient,
}

export const patientForBookingFlowServiceGroupFixture: Partial<Patient> = {
  id: 146,
  uuid: '582cb279-e147-4200-8de1-3cdbbb2kkcab',
  authUserId: AuthUserFixture.bookingFlowWithServiceGroup.uid,
  userType: UserType.Patient,
}

export const patientMenstrualContraintFixture: Partial<Patient> = {
  id: 147,
  uuid: '522cb279-e147-4200-8de1-3cbbbb2aacab',
  authUserId: AuthUserFixture.mensturalConstraint.uid,
  userType: UserType.Patient,
}

export const patientBookingFlowDetailsFixture: Partial<Patient> = {
  id: 148,
  uuid: '522ab279-e147-4200-8de1-3cbbbb2aacab',
  authUserId: AuthUserFixture.bookingFlowDetails.uid,
}

export const patientPartnerInvitationValidationFixture: Partial<Patient> = {
  id: 149,
  uuid: '533cb279-e147-4200-8de1-3cbbbb2aacab',
  authUserId: AuthUserFixture.partnerInvitationValidation.uid,
  userType: UserType.Patient,
}

export const cartConfirmPaymentFail: Partial<Patient> = {
  id: 150,
  uuid: '25ac8791-bcfa-4ee4-8c57-c41833e0b1ce',
  authUserId: AuthUserFixture.confirmFail.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  firstName: 'Confirm',
  lastName: 'Fail',
}

export const cartConfirmSuccessPaymentFixture: Partial<Patient> = {
  id: 151,
  authUserId: AuthUserFixture.cartConfirmSuccess.uid,
  firstName: 'cartConfirmSuccessFixture',
  lastName: 'cartConfirmSuccessFixture',
  middleName: 'cartConfirmSuccessFixture',
  stripeCustomerId: 'cus_cartConfirmSuccessStriperCustomerID',
  detailId: cartConfirmSuccessPaymentDetailIdFixtureId,
  ohipCardNumber: 'cartConfirmOhipCardNumber',
  ohipCardVersionCode: 'CD',
}

export const cartConfirmFailsPaymentFixture: Partial<Patient> = {
  id: 152,
  authUserId: AuthUserFixture.cartConfirmFails.uid,
  firstName: 'cartConfirmFailsFixture',
  lastName: 'cartConfirmFailsFixture',
  middleName: 'cartConfirmFailsFixture',
  stripeCustomerId: 'cus_cartConfirmFailsStriperCustomerID',
  detailId: cartConfirmFailsPaymentDetailIdFixtureId,
}

export const cartConfirmBookAppointmentFixture: Partial<Patient> = {
  id: 153,
  authUserId: AuthUserFixture.bookAppointment.uid,
  firstName: 'bookAppointment',
  lastName: 'bookAppointment',
  middleName: 'bookAppointment',
  stripeCustomerId: 'cus_cartConfirmBookAppointmentStriperCustomerID',
  detailId: cartConfirmBookAppointmentPaymentDetailIdFixtureId,
}

export const patientServiceTypeSecondExtraFixture: Partial<Patient> = {
  id: 155,
  authUserId: AuthUserFixture.serviceTypeSecondExtra.uid,
  firstName: 'serviceTypeSecondExtra',
  lastName: 'User',
  middleName: 'Fixture',
  stripeCustomerId: 'cus_serviceTypeSecondExtraStriperCustomerID',
  sexAtBirth: SexAtBirth.Male,
  detailId: patientServiceTypeSecondExtraDetailsFixtureId,
}

export const patientServiceTypeFixture: Partial<Patient> = {
  id: 156,
  authUserId: AuthUserFixture.cartConfirmServiceType.uid,
  firstName: 'serviceTypeSecondExtra',
  lastName: 'User',
  middleName: 'Fixture',
  stripeCustomerId: 'cus_serviceTypeStriperCustomerID',
  sexAtBirth: SexAtBirth.Male,
  detailId: patientServiceTypeDetailsFixtureId,
  ohipCardNumber: 'ServiceTypeohipCardNumber',
  ohipCardVersionCode: 'CD',
}

export const patientCartNotFoundFixture: Partial<Patient> = {
  id: 157,
  authUserId: AuthUserFixture.cartNotFound.uid,
  firstName: 'cartNotFound',
  lastName: 'User',
  middleName: 'Fixture',
  stripeCustomerId: 'cus_cartNotFoundStriperCustomerID',
  sexAtBirth: SexAtBirth.Male,
}

export const cartConfirmThreeCasesFixture: Partial<Patient> = {
  id: 154,
  authUserId: AuthUserFixture.cartConfirmThreeCases.uid,
  firstName: 'cartConfirmThreeCases',
  lastName: 'cartConfirmThreeCases',
  middleName: 'cartConfirmThreeCases',
  stripeCustomerId: 'cus_cartConfirmThreeCasesStriperCustomerID',
  detailId: cartConfirmThreeCasesDetailIdFixtureId,
  ohipCardNumber: 'ConfirmThreeCasesohipCardNumber',
  ohipCardVersionCode: 'CD',
  email: 'fhealthdev+cartConfirm3Cases@gmail.com',
}

export const patientBookingForSpecificDatesFixture: Partial<Patient> = {
  id: 158,
  uuid: '1651cf57-2a3f-47d7-4390-c771fa1e3345',
  authUserId: AuthUserFixture.bookingForSpecificDates.uid,
  userType: UserType.Patient,
}

export const patientForGetSpecimenDetailsFixture: Partial<Patient> = {
  id: 159,
  uuid: '60dc674b-ad67-4e28-9cc0-21381d5639b5',
  firstName: 'specimenDetailsFirstName',
  lastName: 'specimenDetailsLastName',
  patientIdentifier: 'PID0000102',
  authUserId: AuthUserFixture.specimenDetails.uid,
  userType: UserType.Patient,
  serviceProviderId: serviceProviderFixture.id,
  dateOfBirth: dateTimeUtil.toDate(patientSpermCryoDateOfBirth),
}

export const patientPartnerForGetSpecimenDetailsFixture: Partial<Patient> = {
  id: 160,
  uuid: '90227e73-4e67-4d4c-8c69-cdfd68375ee5',
  firstName: 'specimenDetailsPartnerFirstName',
  lastName: 'specimenDetailsPartnerLastName',
  patientIdentifier: 'PID0000103',
  authUserId: AuthUserFixture.partnerSpecimenDetails.uid,
  userType: UserType.Patient,
  serviceProviderId: serviceProviderFixture.id,
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
}

export const patientForGetSpermCryoListFixture: Partial<Patient> = {
  id: 161,
  uuid: '1c9594f3-ad09-4ca7-8370-933e0f9606fd',
  patientIdentifier: 'PID0000159',
  authUserId: AuthUserFixture.spermCryoList.uid,
  userType: UserType.Patient,
  firstName: 'UniqueNameForSpermCryo',
  lastName: 'UniqueLastNameForSpermCryo',
}

export const patientPendingInvitationFixture: Partial<Patient> = {
  id: 162,
  uuid: '221cce51-9e90-41c4-b99c-42e6ac6ce9a8',
  patientIdentifier: 'PID0000162',
  authUserId: AuthUserFixture.patientPendingInvitation.uid,
  userType: UserType.User,
}

export const mainPatientForSpermCryoFixture: Partial<Patient> = {
  id: 164,
  uuid: '682af9f6-3d6c-4029-9e12-94138f0772bd',
  patientIdentifier: 'PID0000164',
  authUserId: AuthUserFixture.spermCryoMainPatient.uid,
  userType: UserType.Partner,
  firstName: 'spermCryoMainPatient',
  lastName: 'spermCryoMainPatient',
  serviceProviderId: serviceProviderFixture.id,
}

export const patientForSpermCryoPartnerFixture: Partial<Patient> = {
  id: 165,
  uuid: 'f7b9c242-34ea-4e12-8383-28164f981797',
  patientIdentifier: 'PID0000165',
  authUserId: AuthUserFixture.spermCryoPartner.uid,
  userType: UserType.Partner,
  firstName: 'spermCryoPartner',
  lastName: 'spermCryoPartner',
  serviceProviderId: serviceProviderFixture.id,
}

export const patientForReassignTaskFixture: Partial<Patient> = {
  id: 166,
  uuid: '8551362e-1714-4512-b4d1-cae0c5f7142e',
  patientIdentifier: 'PID0000166',
  authUserId: AuthUserFixture.taskReassign.uid,
  firstName: 'reassignTask',
  lastName: 'reassignTask',
  middleName: 'reassignTask',
  stripeCustomerId: 'stripeCustomerId166',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
  sexAtBirth: SexAtBirth.Female,
}

export const patientPlanCartFixture: Partial<Patient> = {
  id: 167,
  uuid: '221cce51-9e12-41c4-c99c-42e6ac6ce9a8',
  firstName: 'firstName',
  lastName: 'lastName',
  patientIdentifier: 'PID0000167',
  authUserId: AuthUserFixture.planCart.uid,
  userType: UserType.Patient,
  ohipCardNumber: '1111333348', //valid based on mod10
  ohipCardVersionCode: 'MV',
  phoneNumber: '(555) 444-3333',
  email: 'fhealthdev+planCart@gmail.com',
}

export const patientForEPPFixture: Partial<Patient> = {
  id: 168,
  uuid: '221cce51-9e12-41c4-c68c-42e6ac6ce9a8',
  patientIdentifier: 'PID0000168',
  authUserId: AuthUserFixture.eppPlan.uid,
  userType: UserType.Patient,
  ohipCardNumber: '1111333333',
  sexAtBirth: SexAtBirth.Female,
  firstName: 'patientForEPPFixtureFirstName',
  lastName: 'patientForEPPFixtureLastName',
}

export const patientProfileAppointmentFixture: Partial<Patient> = {
  id: 169,
  uuid: 'aa4a7070-b93c-42b4-981e-00e8982b2e0c',
  patientIdentifier: 'PID0000169',
  authUserId: AuthUserFixture.profileAppointment.uid,
  userType: UserType.Patient,
  ohipCardNumber: '1111333344',
  ohipCardVersionCode: 'MV',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForFreeServicesFixture: Partial<Patient> = {
  id: 170,
  uuid: '7fad194a-8b11-48f5-8569-01740c9351c6',
  patientIdentifier: 'PID0000170',
  authUserId: AuthUserFixture.patientForFreeServices.uid,
  userType: UserType.Patient,
  ohipCardNumber: '1111333345',
  ohipCardVersionCode: 'MV',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForNotTaxableServicesFixture: Partial<Patient> = {
  id: 171,
  uuid: '3d7cad7f-3ed2-4bdb-86b3-3e8b7223027f',
  patientIdentifier: 'PID0000171',
  authUserId: AuthUserFixture.patientForNotTaxableServices.uid,
  userType: UserType.Patient,
  ohipCardNumber: '1111333346',
  ohipCardVersionCode: 'MV',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForBookingTestFixture: Partial<Patient> = {
  id: 172,
  patientIdentifier: 'PID0000172',
  authUserId: AuthUserFixture.patientForBookingTests.uid,
  userType: UserType.Patient,
  ohipCardNumber: '1111333347',
  ohipCardVersionCode: 'MV',
  sexAtBirth: SexAtBirth.Female,
}

export const patientBilling: Partial<Patient> = {
  id: 173,
  uuid: '7fad194a-1111-48f5-8569-01740c9351c6',
  patientIdentifier: 'PID0000173',
  authUserId: AuthUserFixture.billingSubmission.uid,
  userType: UserType.Patient,
  ohipCardNumber: '1111333334',
  ohipCardVersionCode: 'MV',
  sexAtBirth: SexAtBirth.Female,
  serviceProviderId: serviceProviderBilling.id,
  firstName: 'ClaimDetailsFirstName',
  lastName: 'ClaimDetailsLastName',
  email: 'fhealthdev+billingSubmission@gmail.com',
}

export const createPatientForCheckServiceImageUrlFixture: Partial<Patient> = {
  firstName: 'patientForCheckServiceImageUrl',
  lastName: 'patientForCheckServiceImageUrl',
  middleName: 'patientForCheckServiceImageUrl',
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
  sexAtBirth: SexAtBirth.Female,
  termsAndConditions: true,
}

export const patientWithoutDetailFixture: Partial<Patient> = {
  id: 175,
  uuid: '7fad203a-1111-48f5-8569-01740c9351c6',
  patientIdentifier: 'PID0000175',
  authUserId: AuthUserFixture.withoutDetail.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  serviceProviderId: serviceProviderBilling.id,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.PendingCompletionByPatient,
}

export const patientNotOhipFixture: Partial<Patient> = {
  id: 176,
  uuid: '7dc1c983-bbdd-4256-ba07-68b589ad3429',
  authUserId: AuthUserFixture.notOhipCoveredAppoinitments.uid,
  userType: UserType.Partner,
  sexAtBirth: SexAtBirth.Male,
}

export const milestoneRequiredActionsPatientFixture: Partial<Patient> = {
  id: 177,
  uuid: 177 + uuidSuffix,
  firstName: 'Required',
  lastName: 'Actions',
  authUserId: AuthUserFixture.milestoneRequiredAction.uid,
  userType: UserType.Patient,
  ohipCardNumber: '3447-432-919',
  ohipAvailability: PatientOhipAvailability.Yes,
}

export const getSpecimenListPatientFixture: Partial<Patient> = {
  id: 178,
  uuid: 178 + uuidSuffix,
  firstName: 'Required',
  lastName: 'Actions',
  authUserId: AuthUserFixture.getSpecimenList.uid,
  userType: UserType.Patient,
}

export const patientQuestionnaireJustControllerFixture: Partial<Patient> = {
  id: 180,
  uuid: 180 + uuidSuffix,
  authUserId: AuthUserFixture.questionnaireJustController.uid,
  firstName: 'QuestionnaireJust',
  lastName: 'PatientJust',
  middleName: 'FixtureJust',
  detailId: patientQuestionnaireJustControllerDetailIdFixture,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.NotStartedByPatient,
}

export const patientQuestionnaireOhipValidationFixture: Partial<Patient> = {
  id: 181,
  uuid: 181 + uuidSuffix,
  authUserId: AuthUserFixture.questionnaireOhipValidation.uid,
  firstName: 'FOhipValidation',
  lastName: 'LOhipValidation',
  detailId: patientQuestionnaireOhipValidationIdFixture,
}

export const patientQuestionnaireInvalidOhipFixture: Partial<Patient> = {
  id: 182,
  uuid: 182 + uuidSuffix,
  authUserId: AuthUserFixture.questionnaireInvalidOhip.uid,
  firstName: 'InvalidOhip',
  lastName: 'InvalidOhip',
  detailId: patientQuestionnaireInvalidOhipIdFixture,
  isOhipValid: false,
  invalidOhipErrorMessage: 'invalidOhipErrorMessage',
}

export const patientToUpdatePlansFixture: Partial<Patient> = {
  id: 183,
  uuid: '7fbd203a-1111-45f5-8569-01240c9351c6',
  authUserId: AuthUserFixture.updatePlans.uid,
  firstName: 'Update',
  lastName: 'Plans',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.FinalizingInProgressByClinicStaff,
}

export const patientForPlanTypesFixture: Partial<Patient> = {
  id: 184,
  uuid: '7fad203a-1111-48f5-8569-01240c9351c6',
  authUserId: AuthUserFixture.planTypes.uid,
  firstName: 'Plan',
  lastName: 'Types',
  status: PatientStatusEnum.Active,
}

export const patientForPlansV2Fixture: Partial<Patient> = {
  id: 190,
  uuid: '9be5c946-c5fb-41a3-9e41-8ef6a55f9dbc',
  authUserId: AuthUserFixture.plansV2.uid,
  firstName: 'Plans',
  lastName: 'V2',
  patientIdentifier: 'PID190',
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForPlansV2Fixture.id,
  status: PatientStatusEnum.Active,
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
}

export const patientForAdhocPaymentFixture: Partial<Patient> = {
  id: 191,
  uuid: '5b3cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: AuthUserFixture.patientForAdhocPayment.uid,
  firstName: 'Ad',
  lastName: 'Hoc',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlansV2PartnerFemaleFixture: Partial<Patient> = {
  id: 192,
  uuid: '5b3cf117-6254-49df-b3ac-ebcff9836a5a',
  authUserId: AuthUserFixture.plansV2Partner.uid,
  firstName: 'Plans V2',
  lastName: 'Partner',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlansV2PartnerMaleFixture: Partial<Patient> = {
  id: 193,
  uuid: '5b3cf227-6254-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForPlansV2PartnerMaleFixture',
  firstName: 'Plans V2',
  lastName: 'Male',
  sexAtBirth: SexAtBirth.Male,
}

export const patientForUltrasoundDay3Fixture: Partial<Patient> = {
  id: 194,
  uuid: '6d297326-2c5a-421a-9ea7-6c2b31cd638f',
  authUserId: AuthUserFixture.ultrasoundDay3.uid,
  serviceProviderId: serviceProviderFixtureId,
  firstName: 'Plans V2',
  lastName: 'Male',
  sexAtBirth: SexAtBirth.Male,
}

export const patientToPushPlanMilestoneV2Fixture: Partial<Patient> = {
  id: 195,
  uuid: '2651cf57-2a3f-47d7-8790-c771fa1e2233',
  authUserId: AuthUserFixture.pushPlanMilestoneV2.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientFixtureForPlanV2CartFixture: Partial<Patient> = {
  id: 196,
  uuid: '2652cf57-2a3f-47d7-8790-c771fa1e2233',
  firstName: 'Patient',
  lastName: 'For Plan V2 Cart',
  authUserId: AuthUserFixture.cartPlansV2.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlanMilestonesFixture: Partial<Patient> = {
  id: 197,
  uuid: '3652cf27-2a3f-47d7-8790-c771fa1e2233',
  authUserId: AuthUserFixture.planMilestones.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientIntakeFixture: Partial<Patient> = {
  id: 198,
  uuid: '3652cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.patientIntake.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.PendingCompletionByPatient,
  firstName: 'FirstNamePatientIntakeFixture',
  lastName: 'LastNamePatientIntakeFixture',
}

export const patientWithSinglePlanFixture: Partial<Patient> = {
  id: 199,
  uuid: '3652cf27-2a3f-37d7-8790-c771fa1e2244',
  firstName: 'patientWithSingle',
  lastName: 'patientWithSingle',
  authUserId: AuthUserFixture.patientWithSinglePlan.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.FinalizingInProgressByClinicStaff,
}

export const patientWithActivePlanForOrderFirstFixture: Partial<Patient> = {
  id: 200,
  uuid: '3652cf27-2a3f-37d2-8790-c771fa1e2244',
  authUserId: 'ForPlanStatus1',
  firstName: 'ForPlanStatus',
  lastName: 'S',
  userType: UserType.Patient,
  status: PatientStatusEnum.PlanType,
}

export const patientWithActivePlanForOrderSecondFixture: Partial<Patient> = {
  id: 202,
  uuid: '2652cf27-2a3f-37d2-8790-c771fa1e2244',
  authUserId: 'ForPlanStatus3',
  firstName: 'ForPlanStatus',
  lastName: 'S',
  userType: UserType.Patient,
  status: PatientStatusEnum.PlanType,
}

export const patientForStimCycleDetailsFixture: Partial<Patient> = {
  id: 203,
  uuid: '2652cf22-2b3f-37d2-8790-c771fa1e2244',
  authUserId: 'patientForStimCycleDetails',
  firstName: 'patient',
  lastName: 'cycle details',
  userType: UserType.Patient,
  detailFemaleId: patientDetailFemaleForCycleDetailsId,
}

export const patientForIVFTasks1Fixture: Partial<Patient> = {
  id: 1213,
  uuid: '1b036bbf-e13e-483f-9c0d-251d69120f9f',
  authUserId: 'patientForIVF',
  firstName: 'IVF Patient',
  lastName: 'Ivf Patient Last Name - 1213',
  userType: UserType.Patient,
}

export const patientForIVFTasks2Fixture: Partial<Patient> = {
  id: 1219,
  uuid: 'd1a589d3-b6ad-4108-8a29-15485a908b6b',
  authUserId: AuthUserFixture.patientForIVFTasks2.uid,
  firstName: 'IVF Patient',
  lastName: 'Ivf Patient Last Name - 1219',
  userType: UserType.Patient,
  detailId: patientDetailForScanBarcodeFixture.id,
  dateOfBirth: dateTimeUtil.toDate('1994-01-01'),
  patientIdentifier: 'DEV_PID0000206',
}

export const patientForIVFTasks3Fixture: Partial<Patient> = {
  id: 1214,
  uuid: '5c7e881c-c117-4504-966d-b04caed875ec',
  authUserId: 'patientForIVF205',
  firstName: 'IVF Patient',
  lastName: 'Ivf Patient Last Name - 1214',
  userType: UserType.Patient,
}

export const patientForIVFTasks4Fixture: Partial<Patient> = {
  id: 1215,
  uuid: '44254623-ef3e-4429-ac8e-a538e1bdfe4d',
  authUserId: 'patientForIVF206',
  firstName: 'IVF Patient',
  lastName: 'Ivf Patient Last Name - 1215',
  userType: UserType.Patient,
}

export const patientForIVFTasks5Fixture: Partial<Patient> = {
  id: 1216,
  uuid: '26b0e07e-3025-446a-958b-2b92210209c6',
  authUserId: 'patientForIVF207',
  firstName: 'IVF Patient',
  lastName: 'Ivf Patient Last Name - 1216',
  userType: UserType.Patient,
}

export const patientForIVFTasks6Fixture: Partial<Patient> = {
  id: 1217,
  uuid: 'c9a7d840-898e-4280-88b8-18d627cc82d6',
  authUserId: 'patientForIVF208',
  firstName: 'IVF Patient',
  lastName: 'Ivf Patient Last Name - 1217',
  userType: UserType.Patient,
}

export const patientForIVFTasks7Fixture: Partial<Patient> = {
  id: 1218,
  uuid: '74c70030-70ed-43ff-97e3-72163fd9f0ee',
  authUserId: 'patientForIVF209',
  firstName: 'IVF Patient',
  lastName: 'Ivf Patient Last Name - 1218',
  userType: UserType.Patient,
}

export const ivfPatientFemaleFixture: Partial<Patient> = {
  id: 204,
  uuid: '36e798d7-8aa0-4c05-a7c1-5e37db2f4f9a',
  patientIdentifier: 'PID0000204',
  firstName: 'ivfPatientFemale',
  lastName: 'ivfPatientFemale',
  authUserId: AuthUserFixture.ivfPatientFemale.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForIVFFixture.id,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
}

export const ivfPatientMalePartnerFixture: Partial<Patient> = {
  id: 205,
  uuid: 'a78a23b0-630b-4b96-a018-335147d9e39a',
  patientIdentifier: 'PID0000205',
  firstName: 'ivfPatientMale',
  lastName: 'ivfPatientMale',
  authUserId: AuthUserFixture.ivfPatientMale.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
}

export const patientForCompletedPatientIntakeFixture: Partial<Patient> = {
  id: 208,
  uuid: 208 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authForCompletedPatientIntake.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CompletedByPatient,
  firstName: 'firstName',
  lastName: 'lastName',
}

export const patientForCheckedInPatientIntakeFixture: Partial<Patient> = {
  id: 209,
  uuid: 209 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authForCheckedInPatientIntake.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
  firstName: 'firstName',
  lastName: 'lastName',
}

export const patientForFinalizingInProgressInPatientIntakeFixture: Partial<Patient> = {
  id: 210,
  uuid: 210 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authForFinalizingInProgressInPatientIntake.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.FinalizingInProgressByClinicStaff,
  firstName: 'firstName',
  lastName: 'lastName',
}

export const patientForFinalizedPatientIntakeFixture: Partial<Patient> = {
  id: 211,
  uuid: 211 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authForFinalizedPatientIntake.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.FinalizedByClinicStaff,
  firstName: 'firstName',
  lastName: 'lastName',
}

export const patientForV1FinalizedPatientIntakeFixture: Partial<Patient> = {
  id: 212,
  uuid: 212 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authForV1FinalizedPatientIntake.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.V1Finalized,
  firstName: 'firstName',
  lastName: 'lastName',
}

export const patientForProfileOverviewTransgenderMaleFixture: Partial<Patient> = {
  id: 213,
  uuid: 213 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: 'AuthUserFixture.overviewTransgenderMale.uid4',
  sexAtBirth: SexAtBirth.Male,
  detailId: detailForPatientOverviewTransgenderMaleDetailIdFixture,
}

export const patientForPatientIntakeQuestionnaireFixture: Partial<Patient> = {
  id: 215,
  uuid: 215 + 'a23b0-630b-4b96-a018-335147d9e39a',
  authUserId: AuthUserFixture.authUserPatientIntakeQuestionnaire.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.PendingCompletionByPatient,
}

export const patientForPlansV2CheckoutWithAddons: Partial<Patient> = {
  id: 216,
  firstName: 'Patient',
  lastName: 'For Plans V2 Checkout with addons',
  uuid: 216 + '2cf27-2a32-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.plansV2cartWithAddons.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForFlowDetailsCleanFixture: Partial<Patient> = {
  id: 217,
  uuid: 217 + '2ff27-2a32-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.clean.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForFlowDetailsServiceProviderFixture: Partial<Patient> = {
  id: 218,
  uuid: 218 + '2ff27-2a32-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.serviceProvider.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientForAvoidDuplicatedPaymentFixture: Partial<Patient> = {
  id: 225,
  uuid: 225 + '1cf57-2a3f-47d7-8790-c771fa1e3346',
  authUserId: AuthUserFixture.authForAvoidDuplicatedPayment.uid,
}

export const patientForPlansV2CheckoutWithTestTypesFixture: Partial<Patient> = {
  id: 226,
  uuid: 226 + '2cf27-2a32-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.plansV2cartWithTestTypes.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForQuestionnaireRevisionNotChangedFixture: Partial<Patient> = {
  id: 230,
  uuid: 230 + 'e5b05-660a-4cb0-843f-3b3d3c912b92',
  authUserId: AuthUserFixture.authForQuestionnaireNotChangedRevision.uid,
  firstName: 'Questionnaire2',
  lastName: 'Johnson2',
  middleName: 'Fixture2',
  userType: UserType.Patient,
  serviceProviderId: serviceProviderAppointmentsFixture.id,
  detailId: detailIdForQuestionnaireRevisionNotChangedFixture,
  status: PatientStatusEnum.PlanType,
}

export const patientForCheckedInWithoutQuestionnaireIntentPatientIntakeFixture: Partial<Patient> = {
  id: 235,
  uuid: 235 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authForCheckedInWithoutQuestionnaireIntentPatientIntake.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
  firstName: 'firstName',
  lastName: 'lastName',
}

export const patientForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture: Partial<Patient> = {
  id: 237,
  uuid: 237 + 'e5b05-660a-4cb0-843f-3b3d3c912b92',
  authUserId: AuthUserFixture.authForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture.uid,
  userType: UserType.Patient,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.NotStartedByPatient,
}

export const patientWithNotStartedPatientIntakeFixture: Partial<Patient> = {
  id: 240,
  uuid: 240 + '1cf57-2a3f-47d0-8790-c776fa1e1313',
  authUserId: AuthUserFixture.authForPatientWithNotStartedPatientIntakeFixture.uid,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.NotStartedByPatient,
}

export const patientIntakeRevisionStatusFixture: Partial<Patient> = {
  id: 241,
  uuid: 241 + '1cf57-2a3f-47d0-8790-c776fa1e1313',
  authUserId: AuthUserFixture.authPatientIntakeRevisionStatusFixture.uid,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientWithNotCompletedPatientIntakeV1Fixture: Partial<Patient> = {
  id: 250,
  uuid: 250 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authPatientWithNotCompletedPatientIntakeV1.uid,
  sexAtBirth: SexAtBirth.Female,
  currentJourneyType: JourneyType.PatientIntakeFemale,
}

export const patientForSkipUpdatingPatientIntakeStatusForV1WhenUpdatedAppStatusFixture: Partial<Patient> =
  {
    id: 255,
    uuid: 255 + 'e5b05-660a-4cb0-843f-3b3d3c912b92',
    authUserId:
      AuthUserFixture.authPatientForSkipUpdatingPatientIntakeStatusForV1WhenUpdatedAppStatusFixture
        .uid,
    userType: UserType.Patient,
    currentJourneyType: JourneyType.PatientIntakeFemale,
    patientIntakeStatus: PatientQuestionnaireIntakeStatus.NotStartedByPatient,
  }

export const patientForPartnerAcceptedForPartnerIntakeUpdateFixture: Partial<Patient> = {
  id: 260,
  uuid: 260 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authPatientForPartnerAcceptedForPartnerIntakeUpdateFixture.uid,
  sexAtBirth: SexAtBirth.Male,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.NotStartedByPatient,
  userType: UserType.Partner,
}

export const patientForPartnerDeclinedForPartnerIntakeUpdateFixture: Partial<Patient> = {
  id: 261,
  uuid: 261 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authPatientForPartnerDeclinedForPartnerIntakeUpdateFixture.uid,
  sexAtBirth: SexAtBirth.Male,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.NotStartedByPatient,
  userType: UserType.Partner,
}

export const patientForPrimingWorksheetFixture: Partial<Patient> = {
  id: 262,
  uuid: 262 + '3cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.primingWorksheet.uid,
  sexAtBirth: SexAtBirth.Female,
  userType: UserType.Patient,
}

export const patientForPatientAppointmentTestResultsFixture: Partial<Patient> = {
  id: 265,
  uuid: 265 + '2cf27-2a3f-47d7-8790-c771fa1e2244',
  authUserId: AuthUserFixture.authForPatientAppointmentTestResults.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlansV3Fixture: Partial<Patient> = {
  id: 266,
  uuid: '9be6c946-c5fb-41a3-9e41-8ef6a55f9dbc',
  authUserId: AuthUserFixture.plansV3.uid,
  firstName: 'Plans',
  lastName: 'V3',
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForPlansV3Fixture.id,
  status: PatientStatusEnum.Active,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
}

export const patientForPlansV3PartnerFemaleFixture: Partial<Patient> = {
  id: 267,
  uuid: '5b3cf117-6254-49df-c2ac-ebcff9836a5a',
  authUserId: 'patientForPlansV3PartnerFemaleFixture',
  firstName: 'Plans V3',
  lastName: 'Partner',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlansV3PartnerMaleFixture: Partial<Patient> = {
  id: 268,
  uuid: '5b3cf227-6254-49df-c2ac-ebcff9836a5a',
  authUserId: 'patientForPlansV3PartnerMaleFixture',
  firstName: 'PlansV3Partner',
  lastName: 'Le',
  sexAtBirth: SexAtBirth.Male,
  userType: UserType.Partner,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
}

export const patientForV2PaymentSheetFixture: Partial<Patient> = {
  id: 269,
  uuid: '9d22c588-6a8f-47e9-8dce-fdfc7010d01e',
  authUserId: AuthUserFixture.initializeCustomer.uid,
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'stripe_customer_payment_sheet_v2',
}

export const patientForV2ConfirmFixture: Partial<Patient> = {
  id: 270,
  uuid: '3229fc91-14ea-49c4-ad34-4de7f022c372',
  authUserId: AuthUserFixture.cartConfirmSplitPaymentV2.uid,
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'stripe_customer_id_for_split_payment',
}

export const patientToManuallySetCohortDateFixture: Partial<Patient> = {
  id: 271,
  uuid: '3a29fc11-24eb-49c4-ad34-4de7f022c372',
  authUserId: 'patientToManuallySetCohortDate',
  sexAtBirth: SexAtBirth.Female,
  firstName: 'patientToManuallySetCohort First',
  lastName: 'patientToManuallySetCohort Last',
}

export const patientForV2SplitPaymentHistoryFixture: Partial<Patient> = {
  id: 272,
  uuid: '809c2d94-3370-48f2-90ef-f1660b1674ca',
  authUserId: AuthUserFixture.splitPaymentHistoryV2.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientContactInformationFixture: Partial<Patient> = {
  id: 280,
  uuid: '3229f451-14ea-49c4-ad34-4de7f022c372',
  authUserId: AuthUserFixture.authContactInformation.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPatientUpdateFixture: Partial<Patient> = {
  id: 281,
  uuid: 281 + '9f451-14ea-49c4-ad34-4de7f022c372',
  authUserId: AuthUserFixture.authPatientUpdate.uid,

  patientIdentifier: 'PID0000281',
  firstName: 'patientForPatientUpdateFixture',
  lastName: 'patientForPatientUpdateFixture',
  middleName: 'patientForPatientUpdateFixture',
  stripeCustomerId: 'stripeCustomerIdpatientForPatientUpdateFixture',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
  ohipCardNumber: '0000123488',
  ohipCardVersionCode: '45',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  sexAtBirth: SexAtBirth.Female,
}

export const patientForUpdateOhipAvailabilityFixture: Partial<Patient> = {
  id: 290,
  authUserId: AuthUserFixture.authUpdateOhipAvailability.uid,
  uuid: 290 + uuidSuffix,
  detailId: patientDetailForUpdateOhipAvailabilityFixture.id,
}

export const patientForV2ConfirmOHIPCoveredFixture: Partial<Patient> = {
  id: 291,
  uuid: 'b22da493-5f15-459d-848c-cac9ade02cdd',
  authUserId: AuthUserFixture.ohipCoveredCartConfirmSplitPaymentV2.uid,
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'patientForV2ConfirmOHIPCoveredFixture',
  ohipCardNumber: 'V2ConfirmOHIPCovered',
  ohipCardVersionCode: '45',
}
export const patientForV2ConfirmFailFixture: Partial<Patient> = {
  id: 292,
  uuid: 'b0aab4a9-e720-4dbf-82ac-4778cd9adad9',
  authUserId: AuthUserFixture.cartConfirmSplitPaymentFailedV2.uid,
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'stripe_customer_id_for_split_payment_fail_test',
  firstName: 'firstName',
  lastName: 'lastName',
}

export const ivfPatientForCompletionFixture: Partial<Patient> = {
  id: 293,
  uuid: '6b15a938-45bd-4f44-b769-27be829deca5',
  patientIdentifier: 'PID0000295',
  firstName: 'Patient',
  lastName: 'For Completion',
  authUserId: AuthUserFixture.ivfPatientForCompletionMale.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForIvfPatientForCompletionFixtureFixture.id,
  dateOfBirth: dateTimeUtil.toDate('2002-09-21'),
}
export const ivfPatientForCompletionEggFreezingFixture: Partial<Patient> = {
  id: 308,
  uuid: 'c08f22bc-2784-47b3-a523-acb698e84ca9',
  patientIdentifier: 'PID0000293',
  firstName: 'Patient',
  lastName: 'For Completion',
  authUserId: AuthUserFixture.ivfPatientForCompletionEggFreezingMale.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForIvfPatientForCompletionEggFreezingFixture.id,
  dateOfBirth: dateTimeUtil.toDate('2002-09-21'),
}

export const patientWithOhipAvailUnknownFixture: Partial<Patient> = {
  id: 299,
  uuid: 299 + 'da493-5f15-459d-848c-cac9ade02cdd',
  authUserId: AuthUserFixture.authPatientWithOhipAvailUnknown.uid,
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'patientWithOhipAvailUnknownFixture',
  ohipAvailability: PatientOhipAvailability.Unknown,
}

export const patientForPendingPaymentListForOhipYesFixture: Partial<Patient> = {
  id: 300,
  uuid: 300 + 'da493-5f15-459d-848c-cac9ade02cdd',
  authUserId: AuthUserFixture.authPendingPaymentListForOhipYes.uid,
  sexAtBirth: SexAtBirth.Female,
  ohipAvailability: PatientOhipAvailability.Yes,
}

export const patientForPendingPaymentListForOhipNoFixture: Partial<Patient> = {
  id: 301,
  uuid: 301 + 'da493-5f15-459d-848c-cac9ade02cdd',
  authUserId: AuthUserFixture.authPendingPaymentListForOhipNo.uid,
  sexAtBirth: SexAtBirth.Female,
  ohipAvailability: PatientOhipAvailability.No,
}

export const patientCartConfirmWithUpdatedPricesNoOhipFixture: Partial<Patient> = {
  id: 302,
  uuid: '8f9c403d-ecc7-4386-879b-c88e65a6fb43',
  authUserId: AuthUserFixture.cartConfirmWithUpdatedPricesNoOhip.uid,
  sexAtBirth: SexAtBirth.Female,
  ohipAvailability: PatientOhipAvailability.No,
  stripeCustomerId: 'patientCartConfirmWithUpdatedPricesNoOhipFixture',
}

export const patientCartConfirmForUpdatedOrderFixture: Partial<Patient> = {
  id: 303,
  uuid: 'eedeaceb-16af-4ee3-9a0d-492185a8ad5e',
  authUserId: AuthUserFixture.cartConfirmUpdatedOrders.uid,
  sexAtBirth: SexAtBirth.Female,
  ohipAvailability: PatientOhipAvailability.No,
  stripeCustomerId: 'patientCartConfirmForUpdatedOrderFixture',
}

export const mobileIvfPatientFixture: Partial<Patient> = {
  id: 304,
  uuid: 304 + 'da493-5f15-459d-848c-cac9ade02cdd',
  authUserId: AuthUserFixture.mobileIvfPatient.uid,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
  serviceProviderId: serviceProviderForMobileFixture.id,
}

export const patientForThyroidProtocolFixture: Partial<Patient> = {
  id: 305,
  uuid: '2b2ff128-a374-465a-bdae-b35255116c6f',
  firstName: 'Patient for Thyroid',
  lastName: 'Protocol Worksheet',
  authUserId: AuthUserFixture.thyroidProtocolWorksheet.uid,
  sexAtBirth: SexAtBirth.Male,
  ohipAvailability: PatientOhipAvailability.No,
}

export const patientForPlansEPLFixture: Partial<Patient> = {
  id: 306,
  uuid: '9ae6c942-a5fb-41a3-9e41-8ef6a55f9dbc',
  authUserId: 'patientForPlansEPLFixture',
  firstName: 'Plans',
  lastName: 'EPL',
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForEPLPlansFixture.id,
  status: PatientStatusEnum.Active,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
  patientIdentifier: 'DEV_PID0000305',
}

export const patientForV2WireTransferFixture: Partial<Patient> = {
  id: 307,
  uuid: '2b44c8f7-539b-4a98-8a96-462a8aad13d8',
  authUserId: AuthUserFixture.cartConfirmWireTransferV2.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientWireTransferV2Fixture: Partial<Patient> = {
  id: 311,
  uuid: '13f4486f-bd42-4408-a8e0-c7277d456f69',
  authUserId: AuthUserFixture.planWireTransfer.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientIntakeRevisionChangesForMovedQuestionFixture: Partial<Patient> = {
  id: 312,
  uuid: 312 + '1cf57-2a3f-47d0-8790-c776fa1e1313',
  authUserId: AuthUserFixture.authPatientIntakeRevisionChangesForMovedQuestion.uid,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientForProfileTestResultsForDiffPatientFixture: Partial<Patient> = {
  id: 315,
  uuid: 315 + '1cf57-2a3f-47d0-8790-c776fa1e1313',
  authUserId: 'randomAnyAuthUser',
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.CheckedIn,
}

export const patientWithSinglePlanOrderablePlanFixture: Partial<Patient> = {
  id: 316,
  uuid: '3652cf27-2a3a-47d7-8790-c771fa1e2244',
  firstName: 'patientWithSingle',
  lastName: 'lanOrderablePlan',
  authUserId: 'patientWithSinglePlanOrderablePlanFixture',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  patientIntakeStatus: PatientQuestionnaireIntakeStatus.FinalizingInProgressByClinicStaff,
}

export const nonIvfPatientFixture: Partial<Patient> = {
  id: 317,
  uuid: 317 + 'da493-5f15-459d-848c-cac9ade02cdd',
  authUserId: AuthUserFixture.nonIvfPatient.uid,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
}

export const patientFemaleForFertilityIQFixture: Partial<Patient> = {
  id: 318,
  uuid: '3442cf27-2a4a-47d7-sb90-c771fa1e22hh',
  firstName: 'FirstNamePatientFemaleForFertilityIQ',
  lastName: 'LastNameForFertilityIQ',
  authUserId: 'patientFemaleForFertilityIQFixtureAuthId',
  sexAtBirth: SexAtBirth.Female,
  userType: UserType.Patient,
}

export const patientMaleForFertilityIQFixture: Partial<Patient> = {
  id: 319,
  uuid: '9s42cf27-7n4a-95d7-sb90-k271fa1e22dh',
  firstName: 'FirstNamePatientMaleForFertilityIQFixture',
  lastName: 'LastNameForFertilityIQ',
  authUserId: 'patientMaleForFertilityIQFixtureAuthId',
  sexAtBirth: SexAtBirth.Male,
  userType: UserType.Patient,
}

export const patientMaleForFertilityIQReleasedFixture: Partial<Patient> = {
  id: 320,
  uuid: '3ea67293-e1f1-4227-b0a3-0dac63fe4f4e',
  firstName: 'FirstName',
  lastName: 'FertilityIQReleased',
  authUserId: 'patientMaleForFertilityIQReleasedFixtureAuthId',
  sexAtBirth: SexAtBirth.Male,
  userType: UserType.Patient,
}

export const patientFemaleForFertilityIQReleasedFixture: Partial<Patient> = {
  id: 321,
  uuid: '1f517296-6e34-4433-b0f5-20815df8e61d',
  firstName: 'FirstNameFemale',
  lastName: 'FertilityIQReleased',
  authUserId: 'patientFemaleForFertilityIQReleasedFixtureAuthId',
  sexAtBirth: SexAtBirth.Female,
  userType: UserType.Patient,
}

export const patientForKeepSlotBusyFixture: Partial<Patient> = {
  id: 325,
  uuid: 325 + '2cf27-2a3a-47d7-8790-c771fa1e2244',
  firstName: 'patientForKeepSlotBusyFixture',
  lastName: 'patientForKeepSlotBusyFixtureLast',
  authUserId: AuthUserFixture.authKeepSlotBusy.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientReportFixture: Partial<Patient> = {
  id: 326,
  uuid: 326 + '3842b9cb-32be-4ccf-b7b6-337b4a2dd',
  firstName: 'patientWithReportsFixture',
  lastName: 'patientWithReportsFixtureLast',
  authUserId: AuthUserFixture.patientReports.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
  serviceProviderId: serviceProviderFixture.id,
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}

export const patientReportFemaleUserFixture: Partial<Patient> = {
  id: 327,
  uuid: 'd1ffaeab-eaf7-4243-a64a-22eed6502815',
  firstName: 'patientReportFemaleUserFixture',
  lastName: 'patientReportFemaleUserFixture',
  authUserId: AuthUserFixture.femalePatientReports.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForRevisionFixture: Partial<Patient> = {
  id: 328,
  uuid: '5080fc8d-15f9-4887-8402-1ccc1886f01b',
  firstName: 'patientForRevisionFixture',
  lastName: 'patientForRevisionFixture',
  authUserId: AuthUserFixture.patientForRevisions.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Male,
}

export const patientForMrpUpdateWithoutCommentFixture: Partial<Patient> = {
  id: 330,
  uuid: '165fff57-ff3f-47d0-8790-c776fa1e1315',
  authUserId: 'authpatientForMrpUpdateWithoutCommentFIxture',
}

export const patientForCheckInAppMetadataUpdatedFixture: Partial<Patient> = {
  id: 335,
  uuid: 335 + 'c619f-8d03-4660-a147-c4dcee193d79',
  authUserId: AuthUserFixture.authForCHeckInAppMetadataUpdatedFIxture.uid,
  sexAtBirth: SexAtBirth.Male,
  firstName: 'patientForPlanPartner',
  lastName: '130lastname',
}
export const patientAcuityCrossRegistrationFixture: Partial<Patient> = {
  id: 336,
  uuid: '836d22f2-f79a-4c2d-b2b1-69190809c1c7',
  authUserId: AuthUserFixture.authEmailNotVerifiedAcuityCrossRegistration.uid,
  sexAtBirth: SexAtBirth.Male,
  firstName: 'patientAcuityCrossRegistration',
  lastName: 'acuityCrossRegistrationLastName',
  createdFrom: PatientCreatedFrom.AcuitySync,
}

export const patientForV2ConfirmSuccessFixture: Partial<Patient> = {
  id: 337,
  uuid: 'fe64c94b-d95e-4183-91c1-0effc86ab7f4',
  authUserId: AuthUserFixture.cartConfirmSplitPaymentV2Success.uid,
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'stripe_patientForV2ConfirmSuccessFixture',
}

export const patientForUltrasoundResultsDetailFixture: Partial<Patient> = {
  id: 338,
  uuid: '894a90b4-2015-4338-bdf3-0f020ca323d8',
  authUserId: AuthUserFixture.ultrasoundDetail.uid,
  sexAtBirth: SexAtBirth.Female,
  stripeCustomerId: 'stripe_patientForUltrasoundResultsDetailFixture',
}

export const patientForAppointmentByDateFixture: Partial<Patient> = {
  id: 339,
  firstName: 'John',
  lastName: 'Doe',
  uuid: '16a47551-5cdb-4566-a094-161a2e84b689',
  sexAtBirth: SexAtBirth.Female,
  patientIdentifier: 'PIK0004101',
  serviceProviderId: serviceProviderV2Fixture.id,
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  userType: UserType.Patient,
  status: PatientStatusEnum.PlanType,
  photoKey: 'urlPath',
  photoVerificationStatus: PatientPhotoVerificationStatus.Verified,
}

export const patientForDeactivatedFixture: Partial<Patient> = {
  id: 340,
  uuid: 'fdc506d7-1c21-4355-adcf-120e55ab6e6d',
  firstName: 'George',
  lastName: 'Orwell',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForInProgressAppointmentFixture: Partial<Patient> = {
  id: 341,
  uuid: 'add0f99f-1ef7-470c-8eaa-246146189a4f',
  firstName: 'patientForInProgressAppointmentFixture',
  lastName: 'patientForInProgressAppointmentFixture',
  authUserId: AuthUserFixture.inProgressAppointmentUser.uid,
  sexAtBirth: SexAtBirth.Male,
}

export const patientForCheckInAppointmentsFixture: Partial<Patient> = {
  id: 342,
  firstName: 'John',
  lastName: 'Doe',
  uuid: 'eae5a600-28b0-498b-a143-97d00a309b34',
  authUserId: AuthUserFixture.authUserForCheckIn.uid,
  sexAtBirth: SexAtBirth.Female,
  patientIdentifier: 'PIK0004121',
  serviceProviderId: serviceProviderFixture.id,
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  userType: UserType.Patient,
  status: PatientStatusEnum.PlanType,
  photoKey: 'urlPath',
  photoVerificationStatus: PatientPhotoVerificationStatus.Verified,
  isOhipValid: false,
}

export const patientForLibraryContentFixture: Partial<Patient> = {
  id: 345,
  uuid: 345 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  firstName: 'patientForLibraryContentFixtureFirst',
  lastName: 'patientForLibraryContentFixtureLast',
  authUserId: AuthUserFixture.authUserForLibraryContent.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForForLibraryContentWithTestOrderFixture: Partial<Patient> = {
  id: 347,
  uuid: 347 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  firstName: 'patientForForLibraryContentWithTestOrderFixtureFirst',
  lastName: 'patientForForLibraryContentWithTestOrderFixtureLast',
  authUserId: AuthUserFixture.authUserForLibraryContentWithTestOrder.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForFeedbackFixture: Partial<Patient> = {
  id: 350,
  uuid: 350 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 350 + '_PID0000',
  authUserId: AuthUserFixture.authUserForFeedback.uid,
  userType: UserType.User,
  firstName: 'patientForFeedbackFixtureFirstName',
  lastName: 'patientForFeedbackFixtureLastName',
}

export const patientToUpdateEmailFixture: Partial<Patient> = {
  id: 351,
  uuid: 351 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 351 + '_PID0000',
  authUserId: AuthUserFixture.updateEmail.uid,
  userType: UserType.User,
}

export const patientNotActiveFixture: Partial<Patient> = {
  id: 360,
  uuid: 360 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 360 + '_PID0000',
  authUserId: 'patientNotActiveFixture',
  userType: UserType.Patient,
  status: PatientStatusEnum.NotActive,
}

export const patientDischargedFixture: Partial<Patient> = {
  id: 361,
  uuid: 361 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 361 + '_PID0000',
  authUserId: 'patientDischargedFixture',
  userType: UserType.Patient,
  status: PatientStatusEnum.Discharged,
}

export const patientForWorksheetListFixture: Partial<Patient> = {
  id: 362,
  uuid: 362 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 362 + '_PID0000',
  authUserId: 'patientForWorksheetListFixture',
  userType: UserType.Patient,
  email: 'fhealthdev+patientForWorksheetListFixture@gmail.com',
  firstName: 'patientForWorksheetListFixtureFirName',
}

export const patientForPartnerManageFixture: Partial<Patient> = {
  id: 370,
  uuid: 370 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  authUserId: AuthUserFixture.authUserForPartnerManage.uid,
  userType: UserType.User,
}

export const patientForEncounterTypeFixture: Partial<Patient> = {
  id: 363,
  uuid: 363 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 363 + '_PID0000',
  authUserId: 'patientForEncounterTypeFixture',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  firstName: 'PatientForEncounterType',
  lastName: 'Patient',
}

export const patientForEncounterTypePartnerFixture: Partial<Patient> = {
  id: 364,
  uuid: 364 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 364 + '_PID0000',
  authUserId: 'patientForEncounterTypePartnerFixture',
  userType: UserType.Partner,
  sexAtBirth: SexAtBirth.Male,
  firstName: 'PatientForEncounterTypePartner',
  lastName: 'Partner',
}

export const patientForPatientPartnerInvitation: Partial<Patient> = {
  id: 375,
  uuid: 375 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  authUserId: AuthUserFixture.authUserForPatientPartnerInvitation.uid,
  userType: UserType.User,
}

export const patientForPatientPartnerInvitationValidateFixture: Partial<Patient> = {
  id: 376,
  uuid: 376 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  authUserId: AuthUserFixture.authUserForPatientPartnerInvitationValidate.uid,
  userType: UserType.User,
}

export const patientToMoveSpecimenAppointmentInProgressFixture: Partial<Patient> = {
  id: 377,
  uuid: 377 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  authUserId: 'patientToMoveSpecimen',
  userType: UserType.Patient,
}

export const patientWithoutDoctorSoftDeletedFixture: Partial<Patient> = {
  id: 378,
  uuid: 378 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  authUserId: 'patientWithoutDoctor',
  userType: UserType.Patient,
  serviceProviderId: serviceProviderForSerGroupAvailAutoProviderSelectionFixture.id,
  firstName: 'softdeleted',
  deletedAt: dateTimeUtil.now(),
  email: AuthUserFixture.patientSoftDeleted.email,
}

export const patientForDocumentGenerationFixture: Partial<Patient> = {
  id: 379,
  uuid: 379 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  authUserId: 'patientForDocumentGenerationFixture',
  userType: UserType.Patient,
  firstName: 'Document',
  lastName: 'Generation',
}

export const patientForArchivedAdhocPaymentFixture: Partial<Patient> = {
  id: 381,
  uuid: 381 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: AuthUserFixture.patientForArchivedAdhocPayment.uid,
  firstName: 'AdAr',
  lastName: 'HocAr',
  sexAtBirth: SexAtBirth.Female,
}

export const patientDeactivatedFixture: Partial<Patient> = {
  id: 382,
  uuid: 382 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'deactivated',
  firstName: 'AdAr',
  lastName: 'HocAr',
  sexAtBirth: SexAtBirth.Female,
  status: PatientStatusEnum.Deactivated,
}

export const patientToSoftDeleteFixture: Partial<Patient> = {
  id: 383,
  uuid: 383 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  authUserId: 'patientToSoftDeleteFixture',
  userType: UserType.Patient,
  firstName: 'todelete',
  email: 'patientToSoftDeleteFixture',
}

export const patientForConsentMobileFixture: Partial<Patient> = {
  id: 385,
  uuid: 385 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 385 + '_PID0000',
  authUserId: AuthUserFixture.authForConsentMobile.uid,
  userType: UserType.User,
  firstName: 'patientForConsentMobileFixtureFirstName',
  lastName: 'patientForConsentMobileFixtureLastName',
}

export const patientForConsentMobilePartnerFixture: Partial<Patient> = {
  id: 387,
  uuid: 387 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 387 + '_PID0000',
  authUserId: AuthUserFixture.authForConsentPartnerMobile.uid,
  userType: UserType.Partner,
  firstName: 'patientForConsentMobilePartnerFixtureFirst',
  lastName: 'patientForConsentMobilePartnerFixtureLast',
}
//background api
export const patientForConsentFixture: Partial<Patient> = {
  id: 389,
  authUserId: 'TEST_USER_1',
  firstName: 'Test',
  lastName: 'Patient',
  sexAtBirth: SexAtBirth.Male,
  email: 'patientForConsentFixture',
}

export const patientBookingFlowWithoutCategoryItemFixture: Partial<Patient> = {
  id: 388,
  uuid: 388 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: AuthUserFixture.bookingFlowWithoutCategoryItem.uid,
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlanGenerationFixture: Partial<Patient> = {
  id: 400,
  patientIdentifier: 'PID400',
  uuid: 400 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForPlanGenerationFixture',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlanGenerationPartnerFixture: Partial<Patient> = {
  id: 401,
  uuid: 401 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForPlanGenerationPartnerFixture',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlanGenerationPartnerMaleFixture: Partial<Patient> = {
  id: 402,
  uuid: 402 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForPlanGenerationPartnerMaleFixture',
  sexAtBirth: SexAtBirth.Male,
}

export const patientConsentRemindersFixture: Partial<Patient> = {
  id: 403,
  uuid: 403 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientConsentRemindersFixture',
  email: 'fhealthdev+consentReminders@gmail.com',
  firstName: 'Reminder',
  sexAtBirth: SexAtBirth.Male,
}

export const patientForDeletingStrawFutureFixture: Partial<Patient> = {
  id: 404,
  uuid: 404 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForDeletingStrawFutureFixture',
  sexAtBirth: SexAtBirth.Male,
}

export const patientForConsentQuestionnaireFixture: Partial<Patient> = {
  id: 408,
  uuid: 408 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 408 + '_PID0000',
  authUserId: AuthUserFixture.authForConsentQuestionnaire.uid,
  userType: UserType.Patient,
  firstName: 'patientForConsentQuestionnaireFixtureFirst',
  lastName: 'patientForConsentQuestionnaireFixtureLast',
}

export const patientForConsentQuestionnairePartnerFixture: Partial<Patient> = {
  id: 415,
  uuid: 415 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 415 + '_PID0000',
  authUserId: AuthUserFixture.authForConsentQuestionnairePartner.uid,
  userType: UserType.Partner,
}

export const patientForDiscardDishFutureFixture: Partial<Patient> = {
  id: 405,
  uuid: 405 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForDiscardDishFutureFixture',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForLinkedBillsFixture: Partial<Patient> = {
  id: 420,
  uuid: 420 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForLinkedBillsFixture',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForMiiDay1CryoMaxDeletionFieldValidationFixture: Partial<Patient> = {
  id: 421,
  uuid: 421 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForDiscardDishFutureFixture1442',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPlansBackgroundFixture: Partial<Patient> = {
  id: 422,
  uuid: 422 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForPlansBackgroundFixture',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForStrawSelectionVisibilityFixture: Partial<Patient> = {
  id: 423,
  uuid: 423 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForPlansBackgroundFixtureStrawSelection',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForAppointmentsBackgroundFixture: Partial<Patient> = {
  id: 450,
  uuid: '720bb5c8-3138-4808-82b9-b4ca34431ff4',
  firstName: 'Patient',
  lastName: 'ForAppointmentsBackground',
  authUserId: 'patientForAppointmentsBackgroundFixture',
  sexAtBirth: SexAtBirth.Female,
  serviceProviderId: serviceProviderWithCareTeamEmailFixture.id,
  phoneNumber: `+16555554444`,
}

export const patientForConsentSignMobileFixture: Partial<Patient> = {
  id: 431,
  uuid: 431 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 431 + '_PID0000',
  authUserId: AuthUserFixture.authForConsentSignMobile.uid,
  userType: UserType.Patient,
  firstName: 'patientForConsentSignMobileFixtureFirstName',
  lastName: 'patientForConsentSignMobileFixtureLastName',
}

export const patientForConsentSignPartnerMobileFixture: Partial<Patient> = {
  id: 432,
  uuid: 432 + '0f99f-1ef7-470c-8eaa-246146189a4f',
  patientIdentifier: 432 + '_PID0000',
  authUserId: AuthUserFixture.authForConsentSignPartnerMobile.uid,
  userType: UserType.Partner,
  firstName: 'patientForConsentSignPartnerMobileFixtureFirstName',
  lastName: 'patientForConsentSignPartnerMobileFixtureLastName',
}

export const patientChangeStatusFixture: Partial<Patient> = {
  id: 434,
  uuid: 434 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientChangeStatusFixture',
}
export const patientForLinkedItemAdhocCheckoutFixture: Partial<Patient> = {
  id: 433,
  uuid: 433 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: AuthUserFixture.patientForLinkedItemAdhocCheckout.uid,
  sexAtBirth: SexAtBirth.Female,
}
export const patientForMilestoneRequiredActionFixture: Partial<Patient> = {
  id: 435,
  uuid: 435 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  firstName: 'MILESTONE',
  lastName: 'REQUIRED_ACTIONS',
  authUserId: AuthUserFixture.milestoneRequiredActionProlonged.uid,
  userType: UserType.Patient,
}

export const ivfPatientFemaleStrawNumberFixture: Partial<Patient> = {
  id: 436,
  uuid: 'e35f65b7-779d-4dab-95b8-903aa4336670',
  patientIdentifier: 'PID0000436',
  firstName: 'ivfPatientFemaleStrawNumberFixture',
  lastName: 'ivfPatientFemaleStrawNumberFixture',
  authUserId: AuthUserFixture.ivfPatientStrawNumberFemale.uid,
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForIVFFStrawNumberixture.id,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
}

export const patientForStrawSelectionOocyteCollectionFixture: Partial<Patient> = {
  id: 437,
  uuid: 437 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: 'patientForPlansBackgroundFixtureStrawSelectionOocyteCollection',
  sexAtBirth: SexAtBirth.Female,
}

export const patientForPaymentMethodsFixture: Partial<Patient> = {
  id: 440,
  uuid: 440 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  authUserId: AuthUserFixture.authUserForPaymentMethods.uid,
  stripeCustomerId: 'cus_CartTestStriperCustomerID',
}

export const patientForEstimatesFixture: Partial<Patient> = {
  id: 441,
  uuid: 441 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  patientIdentifier: 'PID0000441',
  authUserId: 'authUserForEstimates',
  sexAtBirth: SexAtBirth.Female,
  photoKey: 'photoKey',
  firstName: 'Patient',
  lastName: 'ForEstimates',
}

export const patientForPrescriptionUpdateFixture: Partial<Patient> = {
  id: 442,
  uuid: 442 + 'cf117-6154-49df-b3ac-ebcff9836a5a',
  patientIdentifier: 'PID0000442',
  authUserId: 'authUserForPrescriptionUpdate',
  sexAtBirth: SexAtBirth.Female,
  firstName: 'Patient',
  lastName: 'ForPrescriptionUpdate',
}
