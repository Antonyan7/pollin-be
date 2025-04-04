import {EmailTemplate} from '@libs/data-layer/apps/email/entities/typeorm'
import {EmailTemplateType} from '@libs/data-layer/apps/email/enums/email-type.enum'

export const timeOverlapsForSyncByAcuityTemplateFixture: Partial<EmailTemplate> = {
  id: 1,
  type: EmailTemplateType.TimeOverlapsForSyncByAcuity,
  subject: 'timeOverlapsForSyncByAcuityTemplateFixture',
  body: 'bodyTimeOverlapsForSyncByAcuityTemplateFixture',
}

export const acuitySyncRandomFailTemplateFixture: Partial<EmailTemplate> = {
  id: 2,
  type: EmailTemplateType.AcuitySyncRandomFail,
  subject: 'acuitySyncRandomFailTemplateFixture',
}

export const patientNamesNotMatchingByAcuityTemplateFixture: Partial<EmailTemplate> = {
  id: 3,
  type: EmailTemplateType.PatientNamesNotMatchingByAcuity,
}

export const createPatientFromPortalTemplateFixture: Partial<EmailTemplate> = {
  id: 4,
  type: EmailTemplateType.CreatePatientFromPortal,
}
export const patientNamesMatchingByAcuityTemplateFixture: Partial<EmailTemplate> = {
  id: 5,
  type: EmailTemplateType.PatientNamesMatchingByAcuity,
}

export const resendVerifyEmailOTPTemplateFixture: Partial<EmailTemplate> = {
  id: 6,
  type: EmailTemplateType.ResendVerifyEmailOTP,
}
export const emailUpdateOTPTemplateFixture: Partial<EmailTemplate> = {
  id: 7,
  type: EmailTemplateType.EmailUpdateOTP,
}
export const resetPasswordOTPTemplateFixture: Partial<EmailTemplate> = {
  id: 8,
  type: EmailTemplateType.ResetPasswordOTP,
}
export const partnerLinkingCodeTemplateFixture: Partial<EmailTemplate> = {
  id: 9,
  type: EmailTemplateType.PartnerLinkingCode,
}
export const appointmentNoShowTemplateFixture: Partial<EmailTemplate> = {
  id: 10,
  type: EmailTemplateType.AppointmentNoShow,
  subject: `Nestproject Appointment Marked as No-Show: <%= params.appointmentType %>, <%= params.appointmentDateTime %>`,
}
export const appointmentCancelledTemplateFixture: Partial<EmailTemplate> = {
  id: 11,
  type: EmailTemplateType.AppointmentCancelled,
}
export const staffAppointmentRescheduledTemplateFixture: Partial<EmailTemplate> = {
  id: 12,
  type: EmailTemplateType.StaffAppointmentRescheduled,
  subject: `Appointment Rescheduled - <%= params.appointmentIdentifier %>`,
}
export const staffAppointmentCancelledTemplateFixture: Partial<EmailTemplate> = {
  id: 13,
  type: EmailTemplateType.StaffAppointmentCancelled,
  subject: `Appointment Cancelled - <%= params.appointmentIdentifier %>`,
}
export const taskOverdueTemplateFixture: Partial<EmailTemplate> = {
  id: 14,
  type: EmailTemplateType.TaskOverdue,
}
export const sendEmailToIVFLabTemplateFixture: Partial<EmailTemplate> = {
  id: 15,
  type: EmailTemplateType.SendEmailToIVFLab,
  subject: `Nestproject Appointment Marked as No-Show: <%= params.appointmentType %>, <%= params.appointmentDateTime %>`,
}
export const sendEmailWhenExternalIdNotFoundInAcuityOnCreatingFixture: Partial<EmailTemplate> = {
  id: 16,
  type: EmailTemplateType.CreateServiceProviderNotFoundInAcuity,
  subject: `Resource not found in acuity - <%= params.providerTitle %> for <%= params.appointmentDateTime %> appointment`,
}
export const sendEmailWhenExternalIdNotFoundInAcuityOnUpdatingFixture: Partial<EmailTemplate> = {
  id: 17,
  type: EmailTemplateType.UpdateServiceProviderNotFoundInAcuity,
  subject: `Resource not found in acuity - <%= params.providerTitle %> for <%= params.appointmentDateTime %> appointment`,
}

export const conflictingAppointmentCreatedTemplateFixture: Partial<EmailTemplate> = {
  id: 18,
  type: EmailTemplateType.CreatedConflictingICAppointmentForProvider,
  subject: `Multiple Bookings for Acuity Slot - <%= params.date %>, <%= params.startTime %>-<%= params.endTime %>`,
}

export const sendEmailWhenServiceTypeNotFoundInAcuityFixture: Partial<EmailTemplate> = {
  id: 18,
  type: EmailTemplateType.CreateServiceTypeNotInAcuity,
  subject: `Appointment Type - <%= params.appointmentTypeAbbreviation %> not found in acuity for <%= params.appointmentDateTime %> appointment with <%= params.providerTitle %> `,
}

export const sendEmailDoesNotHaveScheduleForSlotFixture: Partial<EmailTemplate> = {
  id: 19,
  type: EmailTemplateType.DoesNotHaveScheduleForSlot,
  subject: `sendEmailDoesNotHaveScheduleForSlotFixture`,
  body: 'bodyEmailDoesNotHaveScheduleForSlotFixture ',
}

export const emailTimeOverlapsBlockForSyncByAcuityFixture: Partial<EmailTemplate> = {
  id: 20,
  type: EmailTemplateType.TimeOverlapsBlockForSyncByAcuity,
  subject: `emailTimeOverlapsBlockForSyncByAcuityFixture`,
  body: 'emailTimeOverlapsBlockForSyncByAcuityFixture ',
}

export const emailTemplatedPatientDeactivatedFixture: Partial<EmailTemplate> = {
  id: 21,
  type: EmailTemplateType.PatientDeactivated,
  subject: `emailTemplatedPatientDeactivatedFixture`,
  body: 'emailTemplatedPatientDeactivatedFixture <%= params.firstName %> <%= params.email %>',
}

export const emailTemplatedPatientRestoredFixture: Partial<EmailTemplate> = {
  id: 22,
  type: EmailTemplateType.PatientRestored,
  subject: `emailTemplatedPatientRestoredFixture`,
  body: 'emailTemplatedPatientRestoredFixture <%= params.firstName %> <%= params.email %>',
}

export const emailTemplatedConsentSentFixture: Partial<EmailTemplate> = {
  id: 23,
  type: EmailTemplateType.ConsentSent,
  subject: `emailTemplatedConsentSentFixture`,
  body: 'emailTemplatedConsentSentFixture <%= params.firstName %> <%= params.consentLink %>',
}

export const emailTemplatedConsentCompletedFixture: Partial<EmailTemplate> = {
  id: 24,
  type: EmailTemplateType.ConsentCompleted,
  subject: `emailTemplatedConsentCompletedFixture`,
  body: 'emailTemplatedConsentCompletedFixture <%= params.firstName %>',
}

export const emailTemplatedConsentVoidedFixture: Partial<EmailTemplate> = {
  id: 25,
  type: EmailTemplateType.ConsentVoided,
  subject: `emailTemplatedConsentVoidedFixture`,
  body: 'emailTemplatedConsentVoidedFixture <%= params.firstName %>',
}

export const emailTemplateConsentReminderFixture: Partial<EmailTemplate> = {
  id: 26,
  type: EmailTemplateType.ConsentReminder,
  subject: `emailTemplateConsentReminderFixture`,
  body: 'emailTemplateConsentReminderFixture <%= params.firstName %> <%= params.consentLink %>',
}

export const emailTemplatePaymentEstimateSentFixture: Partial<EmailTemplate> = {
  id: 27,
  type: EmailTemplateType.PaymentEstimateSent,
  subject: `emailTemplatePaymentEstimateSentFixture`,
  body: 'emailTemplatePaymentEstimateSentFixture <%= params.firstName %> <%= params.lastName %>',
}
