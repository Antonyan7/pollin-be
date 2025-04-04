import {DefaultFilterForAppointment} from '@libs/data-layer/apps/scheduling/entities/typeorm/default-filter-for-appointment.entity'

export const defaultFilterForAppointmentFixture: Partial<DefaultFilterForAppointment> = {
  id: 1,
  uuid: 1 + '43afec0-18b2-4d45-vdv7-a1c7da668780',
  title: 'title_defaultFilterForAppointmentFixture',
  sequence: 1,
  isDefault: true,
}

export const defaultFilterForAppointmentTwoFixture: Partial<DefaultFilterForAppointment> = {
  id: 2,
  uuid: 2 + '43afec0-18b2-4d45-vdv7-a1c7da668780',
  title: '2_title_defaultFilterForAppointmentFixture',
  sequence: 2,
}

export const defaultFilterForAppointmentEmailVerifiedStaffFixture: Partial<DefaultFilterForAppointment> =
  {
    id: 3,
    uuid: 3 + '43afec0-18b2-4d45-vdv7-a1c7da668780',
    title: '3_title_defaultFilterForAppointmentFixture',
    sequence: 3,
  }
