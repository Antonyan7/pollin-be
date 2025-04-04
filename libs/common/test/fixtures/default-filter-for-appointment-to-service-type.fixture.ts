import {DefaultFilterForAppointmentToServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/default-filter-for-appointment-to-service-type.entity'
import {
  defaultFilterForAppointmentEmailVerifiedStaffFixture,
  defaultFilterForAppointmentFixture,
  defaultFilterForAppointmentTwoFixture,
} from './default-filter-for-appointment.fixture'
import {serviceTypeFixture, serviceTypeForAppointmentUpdateFixture} from './service-type.fixture'

export const defaultFilterForAppointmentToServiceTypeFixture: Partial<DefaultFilterForAppointmentToServiceType> =
  {
    id: 1,
    defaultFilterForAppointmentId: defaultFilterForAppointmentFixture.id,
    serviceTypeId: serviceTypeFixture.id,
  }

export const defaultFilterForAppointmentToServiceTypeTwoStOneFixture: Partial<DefaultFilterForAppointmentToServiceType> =
  {
    id: 2,
    defaultFilterForAppointmentId: defaultFilterForAppointmentTwoFixture.id,
    serviceTypeId: serviceTypeFixture.id,
  }

export const defaultFilterForAppointmentToServiceTypeTwoStTwoFixture: Partial<DefaultFilterForAppointmentToServiceType> =
  {
    id: 3,
    defaultFilterForAppointmentId: defaultFilterForAppointmentTwoFixture.id,
    serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  }

export const defaultFilterForAppointmentToServiceTypeEmailVerifiedStaffFixture: Partial<DefaultFilterForAppointmentToServiceType> =
  {
    id: 4,
    defaultFilterForAppointmentId: defaultFilterForAppointmentEmailVerifiedStaffFixture.id,
    serviceTypeId: serviceTypeFixture.id,
  }
