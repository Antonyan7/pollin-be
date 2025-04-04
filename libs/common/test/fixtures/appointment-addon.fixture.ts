import {AppointmentAddon} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment-addon.entity'
import {
  appointmentForOhipClaimDetailsFixture,
  appointmentForSlotFixture,
} from '@libs/common/test/fixtures/appointment.fixture'
import {
  extendedDurationFixture,
  virtualAppointmentFixture,
} from '@libs/common/test/fixtures/addon.fixture'

export const appointmentAddonFixture: Partial<AppointmentAddon> = {
  id: 1,
  appointmentId: appointmentForSlotFixture.id,
  addonId: extendedDurationFixture.id,
}

export const appointmentAddonForClaimDetailsFixture: Partial<AppointmentAddon> = {
  id: 2,
  appointmentId: appointmentForOhipClaimDetailsFixture.id,
  addonId: extendedDurationFixture.id,
}

export const appointmentSecondAddonForClaimDetailsFixture: Partial<AppointmentAddon> = {
  id: 3,
  appointmentId: appointmentForOhipClaimDetailsFixture.id,
  addonId: virtualAppointmentFixture.id,
}
