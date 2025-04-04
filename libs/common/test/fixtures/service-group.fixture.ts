import {
  serviceCategoryFixture,
  ServiceCategory_irregularPeriodsAllowed_fixture,
  serviceCategoryForServiceCategoryItemsFixture,
  serviceCategoryServiceGroupLockerFixture,
  serviceMaleSexAtBirthUpdatePatientFixture,
  serviceCategoryExistsFixture,
  serviceCategoryForMobileFixture,
  serviceCategoryWithOhipBilledItemsFixture,
  serviceCategoryRevisionFixture,
  serviceCategoryNotForMobileFixture,
  serviceCategoryForSexAtBirthFixture,
  serviceCategoryAvailabilityFixture,
} from '@libs/common/test/fixtures/service-category.fixture'
import {
  InClinicServiceTypeFixture,
  serviceTypeFixture,
  serviceTypeServiceGroupLockedFixture,
  serviceTypeForMobileFixture,
  serviceTypeNotForMobileFixture,
  VirtualServiceTypeFixture,
  serviceTypeWithOhipBillingCodeFixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithDuration25Fixture,
  serviceTypePhoneCallTypeFixture,
  dominantServiceTypeWithZeroPriceFixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {
  ServiceGroup,
  ServiceGroupToServiceType,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  serviceGroupDominantServiceTypeForOhipCoveringFixture,
  serviceGroupForFreeServiceTypesFixtureId,
  serviceGroupServiceTypeForOhipCoveringFixture,
  serviceGroupToPhoneCallServiceTypeFixture,
  serviceGroupToServiceTypeCheckoutAppDominantFixture,
  serviceGroupToServiceTypeCheckoutAppFirstSimpleFixture,
  serviceGroupToServiceTypeCheckoutAppSecondSimpleFixture,
  serviceGroupToServiceTypeFixture,
  serviceGroupToServiceTypeForFreeServicesFixture,
  serviceGroupToServiceTypeSubTitleOhipCodeFixture,
  serviceGroupToServiceTypeWith30minDurationFixture,
} from '@libs/common/test/fixtures/service-group-to-service-type.fixture'

import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'

export const serviceGroupUUID: string = '657d0e64-c659-458d-bfb2-332bbce16180'
const serviceGroupFixtureId: number = 1
const serviceGroupSubTitleOhipCodeFixtureId: number = 6
const serviceGroupToPhoneCallServiceTypeFixtureId: number = 30

/** With Resources */
export const serviceGroupFixture: Partial<ServiceGroup> = {
  id: serviceGroupFixtureId,
  uuid: 'b131b3bf-132d-11ed-814e-0242ac110002',
  title: 'Service Group Fixture',
  durationInMinutes: 50,
  longDescription: 'Service Group Long Description',
  shortDescription: 'Service Group Description Fixture',
  milestoneSummary: 'Service Group milestoneSummary Description Fixture',
  dominantServiceTypeId: serviceTypeWithDuration30Fixture.id,
  internal: false,
  irregularPeriodsAllowed: false,
  minimumHoursRequired: 24,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceGroupToServiceType: [
    serviceGroupToServiceTypeFixture as ServiceGroupToServiceType,
    serviceGroupToServiceTypeWith30minDurationFixture as ServiceGroupToServiceType,
  ],
  serviceImageURL: 'test_service_group_service_image_url',
}

export const serviceGroupDuration10Fixture: Partial<ServiceGroup> = {
  ...serviceGroupFixture,
  id: 2,
  uuid: 'b131b3bf-132d-11ed-814e-0242ac111102',
  durationInMinutes: 10,
}

export const serviceGroupDetailsFixture: Partial<ServiceGroup> = {
  id: 3,
  uuid: serviceGroupUUID,
  durationInMinutes: 10,
  internal: true,
  irregularPeriodsAllowed: true,
  dominantServiceType: serviceTypeFixture as ServiceType,
  serviceCategoryId: serviceCategoryExistsFixture.id,
  dominantServiceTypeId: serviceTypeFixture.id,
  shortDescription: 'serviceGroupDetailsDescription',
  longDescription: 'serviceGroupDetailsLongDescription',
}

export const serviceGroupSubTitleOhipCodeFixture: Partial<ServiceGroup> = {
  id: serviceGroupSubTitleOhipCodeFixtureId,
  uuid: 'subtitleOhipUUID',
  title: 'serviceGroupSubTitleOhipCodeTitle',
  durationInMinutes: 30,
  longDescription: 'serviceGroupSubTitleOhipCodeLongDescription',
  shortDescription: 'serviceGroupSubTitleOhipCodeDescription',
  dominantServiceTypeId: serviceTypeWithDuration30Fixture.id,
  internal: false,
  irregularPeriodsAllowed: false,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceGroupToServiceType: [
    serviceGroupToServiceTypeSubTitleOhipCodeFixture as ServiceGroupToServiceType,
  ],
}

export const serviceGroupWithoutServiceTypeFixture: Partial<ServiceGroup> = {
  id: 7,
  uuid: '8180ac43-5cbc-4270-9986-1e81439b8079',
  internal: true,
  irregularPeriodsAllowed: true,
}

export const serviceGroupWithInClinicServiceTypeFixture: Partial<ServiceGroup> = {
  id: 8,
  uuid: '20887890-0aaf-4f94-94a4-a97934f2e022',
  internal: true,
  irregularPeriodsAllowed: true,
  dominantServiceType: InClinicServiceTypeFixture as ServiceType,
}

export const serviceGroupWithVirtualServiceTypeFixture: Partial<ServiceGroup> = {
  id: 9,
  uuid: '1da5e206-ad6a-4baf-8dbe-34fda98daee6',
  internal: true,
  irregularPeriodsAllowed: true,
  dominantServiceType: VirtualServiceTypeFixture as ServiceType,
}

export const serviceGroupServiceCategoryItemsfixture: Partial<ServiceGroup> = {
  id: 10,
  uuid: 10 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
  durationInMinutes: 10,
  shortDescription: 'serviceGroupServiceCategoryItemsDescription',
  title: 'serviceGroupServiceCategoryItemsTitle',
  serviceGroupToServiceType: [
    serviceGroupToServiceTypeSubTitleOhipCodeFixture as ServiceGroupToServiceType,
  ],
}

export const serviceGroup_serviceCategroyItems_two_fixture: Partial<ServiceGroup> = {
  id: 11,
  uuid: 11 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeFixture.id,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
}

export const ServiceGroup_irregularPeriodsAllowed_true_fixture: {
  questionOlderThanNDays: Partial<ServiceGroup>
  questionLessThanNDays: Partial<ServiceGroup>
  questionLessThanNDaysMoreThenMDays: Partial<ServiceGroup>
  questionNotLessThanNDaysMoreThenMDays: Partial<ServiceGroup>
} = {
  questionOlderThanNDays: {
    id: 12,
    uuid: '12_ServiceGroupUUID',
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionOlderThanNDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: true,
  },
  questionLessThanNDays: {
    id: 14,
    uuid: '14_ServiceGroupUUID',
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: true,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 16,
    uuid: '16_ServiceGroupUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDaysMoreThenMDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: true,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 18,
    uuid: '18_ServiceGroupUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionNotLessThanNDaysMoreThenMDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: true,
  },
}

export const ServiceGroup_irregularPeriodsAllowed_false_fixture: {
  questionOlderThanNDays: Partial<ServiceGroup>
  questionLessThanNDays: Partial<ServiceGroup>
  questionLessThanNDaysMoreThenMDays: Partial<ServiceGroup>
  questionNotLessThanNDaysMoreThenMDays: Partial<ServiceGroup>
} = {
  questionOlderThanNDays: {
    id: 13,
    uuid: '13_ServiceGroupUUID',
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionOlderThanNDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: false,
  },
  questionLessThanNDays: {
    id: 15,
    uuid: '15_ServiceGroupUUID',
    serviceCategoryId: ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: false,
  },
  questionLessThanNDaysMoreThenMDays: {
    id: 17,
    uuid: '17_ServiceGroupUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionLessThanNDaysMoreThenMDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: false,
  },
  questionNotLessThanNDaysMoreThenMDays: {
    id: 19,
    uuid: '19_ServiceGroupUUID',
    serviceCategoryId:
      ServiceCategory_irregularPeriodsAllowed_fixture.questionNotLessThanNDaysMoreThenMDays.id,
    dominantServiceTypeId: serviceTypeFixture.id,
    irregularPeriodsAllowed: false,
  },
}

export const serviceGroupLockedFixture: Partial<ServiceGroup> = {
  id: 20,
  uuid: 20 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeServiceGroupLockedFixture.id,
  serviceCategoryId: serviceCategoryServiceGroupLockerFixture.id,
}

export const serviceGroupNotForMobileFixture: Partial<ServiceGroup> = {
  id: 21,
  uuid: 21 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeNotForMobileFixture.id,
  serviceCategoryId: serviceCategoryForMobileFixture.id,
}

export const serviceGroupForMobileFixture: Partial<ServiceGroup> = {
  id: 22,
  uuid: 22 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeForMobileFixture.id,
  serviceCategoryId: serviceCategoryForMobileFixture.id,
}

export const serviceGroupForServiceItemsFilteringFixture: Partial<ServiceGroup> = {
  id: 23,
  uuid: 23 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeForMobileFixture.id,
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
}

export const serviceGroupForServiceItemsFilteringWithAppCodeFixture: Partial<ServiceGroup> = {
  id: 24,
  uuid: 24 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeForMobileFixture.id,
  serviceCategoryId: serviceMaleSexAtBirthUpdatePatientFixture.id,
}

export const serviceGroupWithOhipBillingCodeFixture: Partial<ServiceGroup> = {
  id: 25,
  uuid: 25 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  serviceCategoryId: serviceCategoryWithOhipBilledItemsFixture.id,
}

export const serviceGroupWith25ServiceTypeDurationFixture: Partial<ServiceGroup> = {
  id: 26,
  uuid: 26 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeWithDuration25Fixture.id,
  serviceCategoryId: serviceCategoryNotForMobileFixture.id,
  durationInMinutes: 50,
}

export const serviceGroupWithHalfOhipBillingCodeFixture: Partial<ServiceGroup> = {
  id: 27,
  uuid: 27 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeFixture.id,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
  serviceGroupToServiceType: [
    serviceGroupServiceTypeForOhipCoveringFixture as ServiceGroupToServiceType,
    serviceGroupDominantServiceTypeForOhipCoveringFixture as ServiceGroupToServiceType,
  ],
}

// id 32 is reserved for serviceGroupIdRevisionFixture
export const serviceGroupRevisionFixture: Partial<ServiceGroup> = {
  id: 32,
  uuid: 32 + '_ServiceGroupUUID',
  serviceCategoryId: serviceCategoryRevisionFixture.id,
  dominantServiceTypeId: serviceTypePhoneCallTypeFixture.id,
}

export const serviceGroupPhoneCallServiceTypeFixture: Partial<ServiceGroup> = {
  id: serviceGroupToPhoneCallServiceTypeFixtureId,
  uuid: serviceGroupToPhoneCallServiceTypeFixtureId + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypePhoneCallTypeFixture.id,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
  durationInMinutes: 10,
  longDescription: 'Service Group Long Description',
  shortDescription: 'Service Group Description Fixture',
  milestoneSummary: 'Service Group milestoneSummary Description Fixture',
  title: 'serviceGroupPhoneCallServiceTypeFixture',
  serviceGroupToServiceType: [
    serviceGroupToPhoneCallServiceTypeFixture as ServiceGroupToServiceType,
  ],
}

const serviceGroupIdCheckoutApptFixture: number = 35
export const serviceGroupCheckoutApptFixture: Partial<ServiceGroup> = {
  id: 35,
  dominantServiceTypeId: serviceTypeFixture.id,
  uuid: serviceGroupIdCheckoutApptFixture + '_ServiceGroupUUID',
  serviceCategoryId: serviceCategoryFixture.id,
  serviceGroupToServiceType: [
    serviceGroupToServiceTypeCheckoutAppDominantFixture as ServiceGroupToServiceType,
    serviceGroupToServiceTypeCheckoutAppSecondSimpleFixture as ServiceGroupToServiceType,
    serviceGroupToServiceTypeCheckoutAppFirstSimpleFixture as ServiceGroupToServiceType,
  ],
}

export const serviceGroupBookingIntentFixture: Partial<ServiceGroup> = {
  id: 37,
  uuid: 37 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeFixture.id,
  serviceCategoryId: serviceCategoryForServiceCategoryItemsFixture.id,
  minimumHoursRequired: 24,
  title: 'serviceGroupBookingIntent',
}

export const serviceGroupWithSexAtBirthFemaleFixture: Partial<ServiceGroup> = {
  id: 38,
  uuid: 38 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeFixture.id,
  serviceCategoryId: serviceCategoryForSexAtBirthFixture.id,
  irregularPeriodsAllowed: true,
  sexAtBirth: SexAtBirth.Female,
}

export const serviceGroupWithSexAtBirthMaleFixture: Partial<ServiceGroup> = {
  id: 39,
  uuid: 39 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeFixture.id,
  serviceCategoryId: serviceCategoryForSexAtBirthFixture.id,
  sexAtBirth: SexAtBirth.Male,
}

export const serviceGroupWithoutSexAtBirthFixture: Partial<ServiceGroup> = {
  id: 40,
  uuid: 40 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeFixture.id,
  serviceCategoryId: serviceCategoryForSexAtBirthFixture.id,
}

export const serviceGroupWithoutMensturalCheckFixture: Partial<ServiceGroup> = {
  id: 41,
  uuid: 41 + '_ServiceGroupUUID',
  dominantServiceTypeId: serviceTypeWithDuration30Fixture.id,
  serviceCategoryId: serviceCategoryAvailabilityFixture.id,
}

export const serviceGroupForFreeServiceTypesFixture: Partial<ServiceGroup> = {
  id: serviceGroupForFreeServiceTypesFixtureId,
  uuid: '21fe3e06-bb43-4b28-b481-a3c81d2a3046',
  title: 'Free Service Group Fixture',
  durationInMinutes: 30,
  longDescription: 'Free Service Group Long Description',
  shortDescription: 'Free Service Group Description Fixture',
  milestoneSummary: 'Free Service Group milestoneSummary Description Fixture',
  dominantServiceTypeId: dominantServiceTypeWithZeroPriceFixture.id,
  internal: false,
  irregularPeriodsAllowed: false,
  minimumHoursRequired: 24,
  serviceCategoryId: serviceCategoryFixture.id,
  serviceGroupToServiceType: [
    serviceGroupToServiceTypeForFreeServicesFixture as ServiceGroupToServiceType,
  ],
}
