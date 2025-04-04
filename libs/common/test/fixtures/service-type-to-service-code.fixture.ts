import {ServiceTypeToServiceCode} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {
  serviceTypeForUltrasoundDay3Fixture,
  serviceTypeOhipBillingCodeFixture,
  serviceTypePhoneCallTypeFixture,
  serviceTypeServiceCategoryItemsWithMdBillingFixture,
  serviceTypeWithDuration25Fixture,
  serviceTypeWithOhipBillingCodeFixture,
} from './service-type.fixture'
import {
  mdBillingServiceCodeFixture,
  mdbillingServiceCodeFixture,
} from './mdbilling-service-code.fixture'

export const serviceCodeForServiceTypeWithOhipBillingCodeFixture: Partial<ServiceTypeToServiceCode> =
  {
    id: 1,
    serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
    mdBillingServiceCodeId: mdbillingServiceCodeFixture.id,
  }

export const serviceCodeForServiceTypeServiceCategoryItemsWithMdBillingFixture: Partial<ServiceTypeToServiceCode> =
  {
    id: 4,
    serviceTypeId: serviceTypeServiceCategoryItemsWithMdBillingFixture.id,
    mdBillingServiceCodeId: mdbillingServiceCodeFixture.id,
  }

export const serviceCodeForServiceTypeWithDuration25Fixture: Partial<ServiceTypeToServiceCode> = {
  id: 5,
  serviceTypeId: serviceTypeWithDuration25Fixture.id,
  mdBillingServiceCodeId: mdBillingServiceCodeFixture.id,
}

export const serviceCodeForServiceTypePhoneCallTypeFixture: Partial<ServiceTypeToServiceCode> = {
  id: 6,
  serviceTypeId: serviceTypePhoneCallTypeFixture.id,
  mdBillingServiceCodeId: mdBillingServiceCodeFixture.id,
}

export const serviceCodeForServiceTypeOhipBillingCodeFixture: Partial<ServiceTypeToServiceCode> = {
  id: 7,
  serviceTypeId: serviceTypeOhipBillingCodeFixture.id,
  mdBillingServiceCodeId: mdBillingServiceCodeFixture.id,
}

export const serviceCodeForServiceTypeForUltrasoundDay3Fixture: Partial<ServiceTypeToServiceCode> =
  {
    id: 8,
    serviceTypeId: serviceTypeForUltrasoundDay3Fixture.id,
    mdBillingServiceCodeId: mdBillingServiceCodeFixture.id,
  }
