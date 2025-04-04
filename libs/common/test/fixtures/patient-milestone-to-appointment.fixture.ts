import {PatientMilestoneToAppointment} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  milestoneForTestResultFixture,
  milestoneForTestResultWithNonDominantAppointmentFixture,
  patientMilestonesConfirmRequiredActionServiceGroupTypeFixture,
} from './patient-milestone.fixture'
import {
  appointmentConfirmRequiredActionMilestoneSGFixture,
  appointmentConfirmRequiredActionMilestoneSGDominantFixture,
  appointmentWithTestResultsFixture,
  appointmentWithTestResultsNonDominantFixture,
  appointmentWithoutTestResultsFixture,
} from './appointment.fixture'

export const patientMilestoneToAppointmentsConfirmRequiredActionsDominant: Partial<PatientMilestoneToAppointment> =
  {
    patientMilestoneId: patientMilestonesConfirmRequiredActionServiceGroupTypeFixture.id,
    appointmentId: appointmentConfirmRequiredActionMilestoneSGDominantFixture.id,
  }

export const patientMilestoneToAppointmentsConfirmRequiredActions: Partial<PatientMilestoneToAppointment> =
  {
    patientMilestoneId: patientMilestonesConfirmRequiredActionServiceGroupTypeFixture.id,
    appointmentId: appointmentConfirmRequiredActionMilestoneSGFixture.id,
  }

export const patientMilestoneToAppointmentsTestResultsFixture: Partial<PatientMilestoneToAppointment> =
  {
    patientMilestoneId: milestoneForTestResultFixture.id,
    appointmentId: appointmentWithTestResultsFixture.id,
  }

export const patientMilestoneToAppointmentsTestResultsNonDominantFixture: Partial<PatientMilestoneToAppointment> =
  {
    patientMilestoneId: milestoneForTestResultFixture.id,
    appointmentId: appointmentWithTestResultsNonDominantFixture.id,
  }

export const patientMilestoneToAppointmentsTestResultsActionFixture: Partial<PatientMilestoneToAppointment> =
  {
    patientMilestoneId: milestoneForTestResultWithNonDominantAppointmentFixture.id,
    appointmentId: appointmentWithoutTestResultsFixture.id,
  }

export const patientMilestoneToAppointmentsTestResultsActionNonDominantFixture: Partial<PatientMilestoneToAppointment> =
  {
    patientMilestoneId: milestoneForTestResultWithNonDominantAppointmentFixture.id,
    appointmentId: appointmentWithTestResultsNonDominantFixture.id,
  }
