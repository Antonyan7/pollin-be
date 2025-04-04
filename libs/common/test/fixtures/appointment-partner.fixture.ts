import {AppointmentPartner} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment-partners.entity'
import {
  appointmentFixture,
  appointmentForPatientCheckedInFixture,
  appointmentForSlotFixture,
} from '@libs/common/test/fixtures/appointment.fixture'
import {patientEmailVerifiedFixture} from '@libs/common/test/fixtures/patient.fixture'

export const appointmentPartnerFixture: Partial<AppointmentPartner> = {
  id: 1,
  patientId: patientEmailVerifiedFixture.id,
  appointmentId: appointmentForSlotFixture.id,
}

export const appointmentPartnerForCheckInLisFixture: Partial<AppointmentPartner> = {
  id: 2,
  patientId: patientEmailVerifiedFixture.id,
  appointmentId: appointmentForPatientCheckedInFixture.id,
}

export const appointmentPartnerForCheckedInPartnersFixture: Partial<AppointmentPartner> = {
  id: 3,
  patientId: patientEmailVerifiedFixture.id,
  appointmentId: appointmentFixture.id,
}
