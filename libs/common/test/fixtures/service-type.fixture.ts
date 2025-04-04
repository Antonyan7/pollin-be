/* eslint-disable max-lines */
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  ServiceCategory_irregularPeriodsAllowed_fixture,
  ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture,
  serviceCategoryICFixture,
  serviceCategoryAvailabilityFixture,
  serviceCategoryBloodCycleMonitoringFixture,
  serviceCategoryFixture,
  serviceCategoryFollowUpFixture,
  serviceCategoryForAutomaticSelectionFixture,
  serviceCategoryForIrregularPeriodFixture,
  serviceCategoryForMobileFixture,
  serviceCategoryForServiceCategoryItemsFixture,
  serviceCategoryNotForMobileFixture,
  serviceCategoryRevisionFixture,
  serviceCategoryServiceGroupLockerFixture,
  serviceCategoryServiceTypeLockerFixture,
  serviceCategoryTypeLockedByMultipleServiceTypesFixture,
  serviceCategoryV2Fixture,
  serviceCategoryWithIntroFixture,
  serviceCategoryNotActiveFixture,
} from '@libs/common/test/fixtures/service-category.fixture'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment.entity'
import {
  serviceTypeIdRevisionFixture,
  serviceTypeLockedId,
} from '@libs/common/test/fixtures/service-type-constraint.fixture'
import {AppointmentStatus} from '@libs/common/enums'
import {superTypeBloodFixture, superTypeDiagnosticImagingFixture} from './super-type.fixture'

export const invalidServiceTypeUUID: string = '404c11ae-eca3-463a-9448-a0f0ea7cc404'

export const serviceTypeFixture: Partial<ServiceType> = {
  id: 1,
  name: 'TEST_NAME',
  uuid: 'b131b3bf-132d-11ed-814e-0242ac110004',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'service type description',
  milestoneSummary: 'service type milestone Summary description',
  longDescription: 'service type long Description',
  serviceCategoryId: serviceCategoryICFixture.id,
  durationInMinutes: 10,
  price: 100,
  hasUncomplicatedProcedure: true,
  hasCatheterSelection: true,
  hasLinkToEncounters: true,
  imageURL: 'imageUrlForPatientMilestoneUsedInMobileApp',
  showResultsOnStimSheet: true,
  sendReferringDoctorBillingNumber: true,
  linkedServiceTypeId: 2,
}
export const serviceTypeV2Fixture: Partial<ServiceType> = {
  id: 72,
  name: 'Consultation',
  uuid: 'c231c3bf-142d-21fe-825e-0342bc210005',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'CONS',
  color: '#A4C6E4',
  shortDescription: 'Description of the consultation service',
  milestoneSummary: 'Summary of consultation service milestones',
  longDescription: 'Detailed description of the consultation service',
  serviceCategoryId: serviceCategoryV2Fixture.id,
  durationInMinutes: 30,
  price: 150,
  hasUncomplicatedProcedure: false,
  hasCatheterSelection: false,
  hasLinkToEncounters: true,
  imageURL: 'imageUrlForConsultationService',
  showResultsOnStimSheet: false,
  sendReferringDoctorBillingNumber: true,
}

export const serviceTypeForAppointmentUpdateFixture: Partial<ServiceType> = {
  id: 2,
  name: 'TEST_NAME_TO_UPDATE',
  uuid: 'serviceTypeUpdatedUUID',
  type: ServiceTypeMethod.Virtual,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  serviceCategoryId: serviceCategoryFixture.id,
  price: 0,
}

export const serviceTypeWithOhipBillingCodeFixture: Partial<ServiceType> = {
  id: 3,
  name: 'serviceTypeWithOhipBillingCode',
  uuid: '5cb25bca-0121-11ed-b939-0242ac120002',
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  type: ServiceTypeMethod.InClinic,
  serviceCategoryId: serviceCategoryFixture.id,
  durationInMinutes: 10,
  ohipReferralRequired: true,
  price: 100,
}

// have not been created by seed
export const InClinicServiceTypeFixture: Partial<ServiceType> = {
  id: 4,
  name: 'name',
  type: ServiceTypeMethod.InClinic,
  serviceCategoryId: serviceCategoryFixture.id,
}

export const VirtualServiceTypeFixture: Partial<ServiceType> = {
  id: 5,
  name: 'name',
  type: ServiceTypeMethod.Virtual,
  serviceCategoryId: serviceCategoryFixture.id,
}

export const serviceTypeWithCustomConfirmationBeforeHoursFixture: Partial<ServiceType> = {
  id: 123,
  name: 'serviceType with Custom Confirmation Before Hours (96)',
  type: ServiceTypeMethod.InClinic,
  confirmationBeforeHours: 96,
  serviceCategoryId: serviceCategoryFixture.id,
}

// service category unit test data
export const serviceTypeAppointmentBooked: Partial<ServiceType>[] = [
  {
    id: 1,
    appointments: [
      {
        status: AppointmentStatus.Done,
      } as Appointment,
    ],
  },
]
export const serviceTypeAppointmentInProgress: Partial<ServiceType>[] = [
  {
    id: 2,
    appointments: [
      {
        id: 2,
        status: AppointmentStatus.CheckedIn,
      } as Appointment,
    ],
  },
]
export const serviceTypeAppointmentCanceled: Partial<ServiceType>[] = [
  {
    id: 3,
    appointments: [
      {
        id: 3,
        status: AppointmentStatus.Cancelled,
      } as Appointment,
    ],
  },
]

export const serviceTypeServiceCategoryItemsWithMdBillingFixture: Partial<ServiceType> = {
  id: 6,
  uuid: 6 + '_serviceTypeUUID',
  type: ServiceTypeMethod.Virtual,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
  durationInMinutes: 30,
  name: 'serviceTypeServiceCategoryItemsWithMdBillingFixtureNOT AC',
}

// id 7 is reserved for serviceGroupWithoutServiceTypeFixture (it should not exist)

export const serviceTypeLockedFixture: Partial<ServiceType> = {
  id: serviceTypeLockedId,
  uuid: 9 + '_serviceTypeUUID',
  price: 110,
  name: 'ServiceTypeLocked',
  abbreviation: 'not ac',
  type: ServiceTypeMethod.InClinic,
  serviceCategoryId: serviceCategoryServiceTypeLockerFixture.id,
}
export const serviceTypeServiceGroupLockedFixture: Partial<ServiceType> = {
  id: 10,
  uuid: 10 + '_serviceTypeUUID',
  price: 110,
  name: 'serviceTypeServiceGroupLocked',
  type: ServiceTypeMethod.InClinic,
  serviceCategoryId: serviceCategoryServiceGroupLockerFixture.id,
}

export const ServiceType_serviceCategoryItem_two_fixture: Partial<ServiceType> = {
  id: 11,
  uuid: 11 + '_serviceTypeUUID',
  price: 110,
  type: ServiceTypeMethod.InClinic,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
}

export const ServiceType_irregularPeriodsAllowed1_fixture: Partial<ServiceType> = {
  id: 12,
  uuid: 12 + '_serviceTypeUUID',
  serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionOlderThanNDays.id,
  type: ServiceTypeMethod.InClinic,
}

export const serviceTypeNotForMobileFixture: Partial<ServiceType> = {
  id: 13,
  serviceCategoryId: serviceCategoryForMobileFixture.id,
  type: ServiceTypeMethod.InClinic,
  showOnMobile: false,
}

export const serviceTypeForMobileFixture: Partial<ServiceType> = {
  id: 14,
  uuid: 14 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryForMobileFixture.id,
  type: ServiceTypeMethod.InClinic,
  providerAutomaticSelection: true,
}

export const serviceTypeForPatientFlowDetailsFixture: Partial<ServiceType> = {
  id: 15,
  uuid: 'b131b3bf-132d-11ed-814e-0242ac110015',
  serviceCategoryId: serviceCategoryWithIntroFixture.id,
  type: ServiceTypeMethod.InClinic,
}

/** with Resources */
export const serviceTypeWithDuration30Fixture: Partial<ServiceType> = {
  id: 16,
  name: 'TEST_NAME',
  uuid: 'b131b3bf-132d-11ed-814e-0242ac110321',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'service type description',
  milestoneSummary: 'service type milestone Summary description',
  serviceCategoryId: serviceCategoryICFixture.id,
  durationInMinutes: 30,
  price: 100,
  providerAutomaticSelection: true,
  longDescription: 'long desc',
}

export const serviceTypeWithDuration40Fixture: Partial<ServiceType> = {
  id: 17,
  name: 'TEST_NAME',
  uuid: 'b131b3bf-132d-11ed-814e-0242ac120004',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'service type 40 min description',
  serviceCategoryId: serviceCategoryICFixture.id,
  durationInMinutes: 40,
  price: 100,
}

export const serviceTypeWithDuration25Fixture: Partial<ServiceType> = {
  id: 18,
  uuid: 'b131b3bf-132d-11ed-814e-0242ac12707',
  serviceCategoryId: serviceCategoryNotForMobileFixture.id,
  durationInMinutes: 25,
}

export const serviceTypeRevisionFixture: Partial<ServiceType> = {
  id: serviceTypeIdRevisionFixture,
  serviceCategoryId: serviceCategoryRevisionFixture.id,
}
export const serviceTypePhoneCallTypeFixture: Partial<ServiceType> = {
  id: 22,
  name: 'serviceTypePhoneCallType',
  uuid: 22 + '_serviceTypeUUID',
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  type: ServiceTypeMethod.PhoneCall,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
}

// id 23 is reserved in serviceTypeIdRevisionFixture
export const serviceType_irregularPeriodsAllowed_true_fixture: {
  questionOlderThanNDays: Partial<ServiceType>
  questionLessThanNDays: Partial<ServiceType>
  questionLessThanNDaysMoreThenMDays: Partial<ServiceType>
  questionNotLessThanNDaysMoreThenMDays: Partial<ServiceType>
} = {
  questionOlderThanNDays: {
    id: 24,
    uuid: 24 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionOlderThanNDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: true,
  },
  questionLessThanNDays: {
    id: 25,
    uuid: 25 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionLessThanNDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: true,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 26,
    uuid: 26 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionLessThanNDaysMoreThenMDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: true,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 27,
    uuid: 27 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionNotLessThanNDaysMoreThenMDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: true,
  },
}

export const serviceType_irregularPeriodsAllowed_false_fixture: {
  questionOlderThanNDays: Partial<ServiceType>
  questionLessThanNDays: Partial<ServiceType>
  questionLessThanNDaysMoreThenMDays: Partial<ServiceType>
  questionNotLessThanNDaysMoreThenMDays: Partial<ServiceType>
} = {
  questionOlderThanNDays: {
    id: 28,
    uuid: 28 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionOlderThanNDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: false,
  },
  questionLessThanNDays: {
    id: 29,
    uuid: 29 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture.questionLessThanNDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: false,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 30,
    uuid: 30 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionLessThanNDaysMoreThenMDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: false,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 31,
    uuid: 31 + '_serviceTypeUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_in_serviceType_fixture
        .questionNotLessThanNDaysMoreThenMDays.id,
    type: ServiceTypeMethod.InClinic,
    irregularPeriodsAllowed: false,
  },
}

export const serviceTypeConstrainedByMultipleServiceTypesFixture: Partial<ServiceType> = {
  id: 32,
  uuid: 32 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryTypeLockedByMultipleServiceTypesFixture.id,
  name: 'locked by multiple service types',
}

export const serviceTypeBookingIntentFixture: Partial<ServiceType> = {
  id: 33,
  name: 'TEST_NAME',
  uuid: 'b131b3bf-132d-11ed-814e-0242ac114698',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'service type description',
  milestoneSummary: 'service type milestone Summary description',
  longDescription: 'service type long Description',
  durationInMinutes: 10,
  price: 100,
}

export const serviceTypeWithAutomaticSelectionFixture: Partial<ServiceType> = {
  id: 34,
  uuid: 34 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryForAutomaticSelectionFixture.id,
  providerAutomaticSelection: true,
}

export const serviceTypeWithAutomaticSelectionOverlayFixture: Partial<ServiceType> = {
  id: 35,
  name: 'overlay3534343',
  abbreviation: 'abbr',
  uuid: '4f7c11ae-eca3-463a-9448-a0f0ea7cc541',
  serviceCategoryId: serviceCategoryForAutomaticSelectionFixture.id,
  providerAutomaticSelection: true,
  durationInMinutes: 40,
  price: 40,
}

export const serviceTypeWithminimumHoursRequiredFixture: Partial<ServiceType> = {
  id: 37,
  uuid: '684ef5e3-97e0-4a07-b373-9e40e232af9b',
  serviceCategoryId: serviceCategoryFixture.id,
  durationInMinutes: 10,
  minimumHoursRequired: 24 * 3,
}

export const serviceTypeWithAllowedIrregularPeriodFixture: Partial<ServiceType> = {
  id: 38,
  uuid: 38 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
  irregularPeriodsAllowed: true,
}

export const serviceTypeWithForbiddenIrregularPeriodFixture: Partial<ServiceType> = {
  id: 39,
  uuid: 39 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryForIrregularPeriodFixture.id,
}

export const serviceTypeBloodCycleMonitoringFixture: Partial<ServiceType> = {
  id: 40,
  uuid: 40 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryBloodCycleMonitoringFixture.id,
  durationInMinutes: 10,
  abbreviation: 'abbr',
}

export const serviceTypeForPatientMilestoneWithoutProvider: Partial<ServiceType> = {
  id: 41,
  uuid: '357d173f-de42-4731-a9e8-893c0576b261',
  serviceCategoryId: serviceCategoryBloodCycleMonitoringFixture.id,
}

export const serviceTypeSwabCollectionFixture: Partial<ServiceType> = {
  id: 42,
  uuid: 'f813c767-b2da-4b24-967d-01193a3cd2d1',
  serviceCategoryId: serviceCategoryBloodCycleMonitoringFixture.id,
}

export const serviceTypeUrineCollectionFixture: Partial<ServiceType> = {
  id: 43,
  uuid: '4f7c11ae-eca3-46aa-9448-a0f0ea7cc541',
  serviceCategoryId: serviceCategoryBloodCycleMonitoringFixture.id,
}

export const serviceTypeSemenCollectionFixture: Partial<ServiceType> = {
  id: 44,
  uuid: '61b8b910-58dc-4c67-a7e0-2a774a4bd2e4',
  serviceCategoryId: serviceCategoryBloodCycleMonitoringFixture.id,
  name: 'EPP creation',
  isIUIorTransfer: true,
}

export const serviceTypeOhipBillingCodeFixture: Partial<ServiceType> = {
  id: 45,
  name: 'OHIP_SERVICE_TYPE',
  uuid: '91015425-7dbb-45bf-a652-d038a6f77010',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'service type description',
  milestoneSummary: 'service type milestone Summary description',
  serviceCategoryId: serviceCategoryICFixture.id,
  durationInMinutes: 30,
  price: 99,
  providerAutomaticSelection: true,
  longDescription: 'long desc',
}

export const serviceTypeWithoutFirstAvailableDayFixture: Partial<ServiceType> = {
  id: 46,
  uuid: 46 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryFixture.id,
}

export const serviceTypeToApplyBlockFixture: Partial<ServiceType> = {
  id: 47,
  uuid: 47 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryFixture.id,
}

export const serviceTypeForUltrasoundFolliculesFixture: Partial<ServiceType> = {
  id: 50,
  uuid: 50 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryICFixture.id,
  showResultsOnStimSheet: true,
  hasLinkToEncounters: true,
}

export const serviceTypeForAvailabilityFixture: Partial<ServiceType> = {
  id: 51,
  uuid: 51 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryFixture.id,
  durationInMinutes: 30,
}

export const serviceTypeForBookingFlowServiceTypeFixture: Partial<ServiceType> = {
  id: 52,
  uuid: 52 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  durationInMinutes: 10,
}

export const serviceTypeWithOneSlotFixture: Partial<ServiceType> = {
  id: 53,
  uuid: 53 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  durationInMinutes: 10,
}

export const serviceTypeForSpecificDatesBookingFixture: Partial<ServiceType> = {
  id: 54,
  uuid: '2f7c11ae-eca3-46aa-9448-a0f0ea7cc541',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  durationInMinutes: 10,
}

export const serviceTypeForClinicScheduleDatesFixture: Partial<ServiceType> = {
  id: 55,
  uuid: '2f7c22ae-eca3-46aa-9448-a0f0ea7cc541',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  providerAutomaticSelection: true,
  durationInMinutes: 20,
}

export const serviceTypeForUltrasoundDay3Fixture: Partial<ServiceType> = {
  id: 58,
  uuid: 58 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryICFixture.id,
  showResultsOnStimSheet: true,
  hasLinkToEncounters: false,
}

export const serviceTypeForUltrasoundSonohysterogramFixture: Partial<ServiceType> = {
  id: 60,
  uuid: 60 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryICFixture.id,
}

export const dominantServiceTypeWithZeroPriceFixture: Partial<ServiceType> = {
  id: 61,
  name: 'Free service dominant',
  uuid: '8a6fbfbc-5b0e-4b5f-ad76-45fba77434a0',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'free service type description',
  milestoneSummary: 'free service type milestone Summary description',
  serviceCategoryId: serviceCategoryICFixture.id,
  durationInMinutes: 30,
  price: 0,
  providerAutomaticSelection: true,
  longDescription: 'long desc',
}

export const serviceTypeWithZeroPriceFixture: Partial<ServiceType> = {
  id: 62,
  name: 'Free service type',
  uuid: '9c4035c9-ea94-487f-8137-3c44026857a9',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'Free service type description',
  milestoneSummary: 'Free service type milestone Summary description',
  longDescription: 'Free service type long Description',
  serviceCategoryId: serviceCategoryICFixture.id,
  durationInMinutes: 10,
  price: 0,
  hasUncomplicatedProcedure: true,
  hasCatheterSelection: true,
  hasLinkToEncounters: true,
  imageURL: 'imageUrlForPatientMilestoneUsedInMobileApp',
  showResultsOnStimSheet: true,
}

export const serviceTypeProcedureFixture: Partial<ServiceType> = {
  id: 65,
  uuid: '1f1c22ae-eca3-46aa-9448-a0f0ea7cc541',
  name: 'a',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  durationInMinutes: 10,
  isTentative: true,
  abbreviation: 'abbr',
}

export const serviceTypeWithoutTaxFixture: Partial<ServiceType> = {
  id: 70,
  name: 'B',
  uuid: 70 + '1c22ae-eca3-46aa-9448-a0f0ea7cc541',
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
  durationInMinutes: 10,
  price: 100,
  taxable: false,
  abbreviation: 'abbr',
}

export const serviceTypeToApplyTimeOffBlockFixture: Partial<ServiceType> = {
  id: 71,
  uuid: 71 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryNotActiveFixture.id,
}

export const serviceTypeBloodWithSuperTypeFixture: Partial<ServiceType> = {
  id: 74,
  uuid: 74 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryFixture.id,
  superTypeId: superTypeBloodFixture.id,
  abbreviation: 'BloodWithSuperType',
}

export const serviceTypeFollowUpFixture: Partial<ServiceType> = {
  id: 75,
  uuid: 75 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryFollowUpFixture.id,
  abbreviation: 'FollowUpAbbreviation',
  name: 'serviceTypeFollowUpFixture',
}

export const serviceTypeInActiveFixture: Partial<ServiceType> = {
  id: 76,
  uuid: 76 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryFixture.id,
  abbreviation: 'serviceTypeInActiveFixture',
  name: 'serviceTypeInActiveFixture',
  isActive: false,
}

export const serviceTypeWithSuperTypeForUltrasoundFixture: Partial<ServiceType> = {
  id: 79,
  uuid: 79 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryFixture.id,
  superTypeId: superTypeDiagnosticImagingFixture.id,
  abbreviation: 'BloodWithSuperType',
}

export const serviceTypeForTemplatesFixture: Partial<ServiceType> = {
  id: 80,
  uuid: 80 + '_serviceTypeUUID',
  serviceCategoryId: serviceCategoryForAutomaticSelectionFixture.id,
  providerAutomaticSelection: true,
}

export const virtualServiceTypeForMilestoneFixture: Partial<ServiceType> = {
  id: 85,
  name: 'virtualServiceTypeForMilestoneFixture',
  type: ServiceTypeMethod.Virtual,
  serviceCategoryId: serviceCategoryFixture.id,
}

export const serviceTypeWithAppointmentCancellationAndSmsConfirmationEnabledFixture: Partial<ServiceType> =
  {
    id: 86,
    uuid: '30da7daf-ab03-4ea1-8462-a1e20ac053cc',
    name: 'Service Type with Appointment Cancellation Enabled',
    type: ServiceTypeMethod.Virtual,
    serviceCategoryId: serviceCategoryFixture.id,
    cancelIfNotConfirmed: true,
    smsConfirmation: true,
    confirmationBeforeHours: 72,
  }

export const serviceTypeWithExternalFixture: Partial<ServiceType> = {
  id: 87,
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  serviceCategoryId: serviceCategoryFixture.id,
  type: ServiceTypeMethod.External,
  name: 'Service Type with External',
}
