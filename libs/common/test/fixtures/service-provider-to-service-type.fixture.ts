import {
  dominantServiceTypeWithZeroPriceFixture,
  serviceTypeBookingIntentFixture,
  serviceTypeInActiveFixture,
  serviceTypePhoneCallTypeFixture,
  serviceTypeServiceCategoryItemsWithMdBillingFixture,
  serviceTypeUrineCollectionFixture,
  serviceTypeWithAutomaticSelectionFixture,
  serviceTypeWithAutomaticSelectionOverlayFixture,
  serviceTypeWithDuration40Fixture,
  serviceTypeWithminimumHoursRequiredFixture,
  serviceTypeWithoutFirstAvailableDayFixture,
} from './service-type.fixture'
import {
  serviceTypeFixture,
  serviceTypeForAppointmentUpdateFixture,
  serviceTypeWithDuration30Fixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {ServiceProviderToServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  serviceProviderAppointmentsFixtureId,
  serviceProviderBilling,
  serviceProviderFixture,
  serviceProviderFixtureId,
  serviceProviderForAutomaticSelectionFixture,
  serviceProviderForBookingFlowFixture,
  serviceProviderInActiveFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const firstAvailableDate: string = '2030-09-10'
export const serviceProviderToServiceTypeFixture: Partial<ServiceProviderToServiceType> = {
  id: 1,
  serviceProviderId: serviceProviderFixtureId,
  serviceTypeId: serviceTypeFixture.id,
  firstAvailableDate: dateTimeUtil.toDate(firstAvailableDate),
}

export const serviceProviderToServiceTypeAppointmentsFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 2,
    serviceProviderId: serviceProviderAppointmentsFixtureId,
    serviceTypeId: serviceTypeFixture.id,
    firstAvailableDate: dateTimeUtil.toDate('2030-11-10'),
  }

export const serviceProviderToServiceTypeValidationFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 3,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
    firstAvailableDate: dateTimeUtil.toDate('2030-11-10'),
  }

export const serviceProviderToServiceTypeBookingFlowFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 4,
    serviceProviderId: serviceProviderForBookingFlowFixture.id,
    serviceTypeId: serviceTypeFixture.id,
    firstAvailableDate: dateTimeUtil.toDate('2030-11-10'),
  }

export const serviceProviderToServiceType30minFixture: Partial<ServiceProviderToServiceType> = {
  id: 5,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  firstAvailableDate: dateTimeUtil.toDate(firstAvailableDate),
}

export const serviceProviderToServiceTypeUpdateAppointmentFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 6,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithDuration40Fixture.id,
    firstAvailableDate: dateTimeUtil.toDate(firstAvailableDate),
  }

export const serviceProviderToServiceTypeBookingFlowServiceTypeFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 7,
    serviceProviderId: serviceProviderForBookingFlowFixture.id,
    serviceTypeId: serviceTypeBookingIntentFixture.id,
    firstAvailableDate: dateTimeUtil.toDate('2032-10-02'),
  }
export const serviceProviderToServiceTypeAutomaticProviderFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 8,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
    firstAvailableDate: dateTimeUtil.toDate('2030-12-10'),
  }

export const serviceProviderToServiceTypeAutomaticProviderEarlierFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 9,
    serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
    serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
    firstAvailableDate: dateTimeUtil.toDate('2030-11-10'),
  }

export const serviceProviderToServiceTypeForminimumHoursRequiredFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 11,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithminimumHoursRequiredFixture.id,
    firstAvailableDate: dateTimeUtil.now(),
  }

export const serviceProviderToServiceTypehAutomaticSelectionOverlayFixtureFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 12,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithAutomaticSelectionOverlayFixture.id,
    firstAvailableDate: dateTimeUtil.now(),
  }

export const serviceProviderToChangeAppointmentFixture: Partial<ServiceProviderToServiceType> = {
  id: 13,
  serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
  firstAvailableDate: dateTimeUtil.now(),
}

export const serviceProviderToUrineCollectionFixture: Partial<ServiceProviderToServiceType> = {
  id: 14,
  serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
  serviceTypeId: serviceTypeUrineCollectionFixture.id,
  firstAvailableDate: null,
}

export const serviceProviderAvailForDominantServiceTypeWithZeroPriceFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 16,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: dominantServiceTypeWithZeroPriceFixture.id,
    firstAvailableDate: dateTimeUtil.now(),
  }

export const serviceProviderAvailForInClinicServiceTypeFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 17,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeServiceCategoryItemsWithMdBillingFixture.id,
    firstAvailableDate: dateTimeUtil.now(),
  }

export const serviceProviderServiceTypeInactiveProviderFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 18,
    serviceProviderId: serviceProviderInActiveFixture.id,
    serviceTypeId: serviceTypePhoneCallTypeFixture.id,
    firstAvailableDate: dateTimeUtil.now(),
  }

export const serviceProviderServiceTypeWithNullFirstDateFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 19,
    serviceProviderId: serviceProviderFixture.id,
    serviceTypeId: serviceTypeWithoutFirstAvailableDayFixture.id,
    firstAvailableDate: null,
  }

export const serviceProviderServiceTypeInactiveServiceTypeFixture: Partial<ServiceProviderToServiceType> =
  {
    id: 21,
    serviceProviderId: serviceProviderBilling.id,
    serviceTypeId: serviceTypeInActiveFixture.id,
    firstAvailableDate: dateTimeUtil.now(),
  }
