import {
  serviceTypeFixture,
  serviceTypePhoneCallTypeFixture,
  serviceTypeServiceCategoryItemsWithMdBillingFixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithOhipBillingCodeFixture,
  serviceTypeWithZeroPriceFixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {ServiceGroupToServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {serviceTypeIdRevisionFixture} from './service-type-constraint.fixture'

const serviceGroupWithHalfOhipBillingCodeFixtureId: number = 26
const serviceGroupFixtureId: number = 1
const serviceGroupSubTitleOhipCodeFixtureId: number = 6
const serviceGroupToPhoneCallServiceTypeFixtureId: number = 30
const serviceGroupIdCheckoutApptFixture: number = 35
export const serviceGroupForFreeServiceTypesFixtureId: number = 42

export const serviceGroupToServiceTypeFixture: Partial<ServiceGroupToServiceType> = {
  serviceGroupId: serviceGroupFixtureId,
  serviceTypeId: serviceTypeFixture.id,
}

export const serviceGroupToServiceTypeWith30minDurationFixture: Partial<ServiceGroupToServiceType> =
  {
    serviceGroupId: serviceGroupFixtureId,
    serviceTypeId: serviceTypeWithDuration30Fixture.id,
  }

export const serviceGroupToServiceTypeSubTitleOhipCodeFixture: Partial<ServiceGroupToServiceType> =
  {
    serviceGroupId: serviceGroupSubTitleOhipCodeFixtureId,
    serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
  }
export const serviceGroupToPhoneCallServiceTypeFixture: Partial<ServiceGroupToServiceType> = {
  serviceGroupId: serviceGroupToPhoneCallServiceTypeFixtureId,
  serviceTypeId: serviceTypePhoneCallTypeFixture.id,
}
export const serviceGroupDominantServiceTypeForOhipCoveringFixture: Partial<ServiceGroupToServiceType> =
  {
    serviceGroupId: serviceGroupWithHalfOhipBillingCodeFixtureId,
    serviceTypeId: serviceTypeFixture.id,
  }

export const serviceGroupServiceTypeForOhipCoveringFixture: Partial<ServiceGroupToServiceType> = {
  serviceGroupId: serviceGroupWithHalfOhipBillingCodeFixtureId,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
}
export const serviceGroupToServiceTypeRevisionFixture: Partial<ServiceGroupToServiceType> = {
  serviceGroupId: 32,
  serviceTypeId: serviceTypeIdRevisionFixture,
}

export const serviceGroupToServiceTypeCheckoutAppDominantFixture: Partial<ServiceGroupToServiceType> =
  {
    serviceGroupId: serviceGroupIdCheckoutApptFixture,
    serviceTypeId: serviceTypeFixture.id,
  }

// create first (id n1) - but sequence 2
export const serviceGroupToServiceTypeCheckoutAppSecondSimpleFixture: Partial<ServiceGroupToServiceType> =
  {
    serviceGroupId: serviceGroupIdCheckoutApptFixture,
    serviceTypeId: serviceTypeServiceCategoryItemsWithMdBillingFixture.id,
    sequence: 2,
  }

// create second (id n2) - but sequence 1
export const serviceGroupToServiceTypeCheckoutAppFirstSimpleFixture: Partial<ServiceGroupToServiceType> =
  {
    serviceGroupId: serviceGroupIdCheckoutApptFixture,
    serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
    sequence: 1,
  }

export const serviceGroupToServiceTypeForFreeServicesFixture: Partial<ServiceGroupToServiceType> = {
  serviceGroupId: serviceGroupForFreeServiceTypesFixtureId,
  serviceTypeId: serviceTypeWithZeroPriceFixture.id,
}
