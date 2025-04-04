import {defaultFilterForAppointmentEmailVerifiedStaffFixture} from '@libs/common/test/fixtures/default-filter-for-appointment.fixture'
import {DefaultFilterForAppointmentToServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {serviceProviderFixture} from '@libs/common/test/fixtures/service-provider.fixture'

export const defaultFilterForAppointmentToServiceProviderFixture: Partial<DefaultFilterForAppointmentToServiceProvider> =
  {
    id: 1,
    defaultFilterForAppointmentId: defaultFilterForAppointmentEmailVerifiedStaffFixture.id,
    serviceProviderId: serviceProviderFixture.id,
  }
