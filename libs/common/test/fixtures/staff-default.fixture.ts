import {StaffDefault} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  staffUserFixture,
  staffUserMobileFixture,
  staffWithMockedAssignorIdFixture,
} from '@libs/common/test/fixtures/staff.fixture'
import {
  serviceProviderFixtureId,
  serviceProviderNotActiveFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {
  defaultFilterForAppointmentEmailVerifiedStaffFixture,
  defaultFilterForAppointmentFixture,
} from '@libs/common/test/fixtures/default-filter-for-appointment.fixture'

export const staffDefaultFixture: Partial<StaffDefault> = {
  id: 1,
  staffId: staffUserFixture.id,
  bookingServiceProviderId: serviceProviderFixtureId,
  defaultFilterForAppointmentId: defaultFilterForAppointmentFixture.id,
}

export const staffDefaultWithDeactivatedBookingServiceProviderFixture: Partial<StaffDefault> = {
  id: 2,
  staffId: staffUserMobileFixture.id,
  bookingServiceProviderId: serviceProviderNotActiveFixture.id,
  defaultFilterForAppointmentId: null,
}

export const staffDefaultEmailVerifiedFixture: Partial<StaffDefault> = {
  id: 3,
  staffId: staffWithMockedAssignorIdFixture.id,
  bookingServiceProviderId: serviceProviderFixtureId,
  defaultFilterForAppointmentId: defaultFilterForAppointmentEmailVerifiedStaffFixture.id,
}
