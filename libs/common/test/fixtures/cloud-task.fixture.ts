import {
  CloudTask,
  CloudTaskType,
} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {
  partnerInvitationFixture,
  partnerInvitationForRejectFixture,
} from './patient-partner.fixture'
import {patientEmailVerifiedFixture} from './patient.fixture'

export const cloudTaskReminderForPartnerAcceptFixture: Partial<CloudTask> = {
  id: 'cloud-task-partner-accept',
  patientId: patientEmailVerifiedFixture.id,
  partnerInvitationId: partnerInvitationFixture.uuid,
  cloudTaskId: 'cloudTaskReminderForPartnerAccept',
  type: CloudTaskType.PartnerInvitationEmailReminder,
}

export const cloudTaskReminderForPartnerRejectFixture: Partial<CloudTask> = {
  id: 'cloud-task-partner-reject',
  patientId: patientEmailVerifiedFixture.id,
  partnerInvitationId: partnerInvitationForRejectFixture.uuid,
  cloudTaskId: 'cloudTaskReminderForPartnerReject',
  type: CloudTaskType.PartnerInvitationEmailReminder,
}

export const cloudTaskPartnerInvitationNotificationFixture: Partial<CloudTask> = {
  id: 'cloudTask-reminder-partner-notification',
  patientId: patientEmailVerifiedFixture.id,
  partnerInvitationId: null,
  cloudTaskId: 'cloudTaskPartnerInvitationNotification',
  type: CloudTaskType.PartnerInvitationNotificationReminder,
}

export const cloudTaskReminderForUpdateAppointmentFixture: Partial<CloudTask> = {
  id: 'cloudTask-reminder-updaAppt',
  patientId: patientEmailVerifiedFixture.id,
  partnerInvitationId: null,
  cloudTaskId: 'cloudTaskReminderForUpdateAppointment',
  type: CloudTaskType.PatientIntakeNotificationReminder,
}

export const cloudTaskReminderForUpdateAppointmentPartnerFixture: Partial<CloudTask> = {
  id: 'cloudTask-reminder-updaAppt-partner',
  patientId: patientEmailVerifiedFixture.id,
  partnerInvitationId: null,
  cloudTaskId: 'cloudTaskReminderForUpdateAppointmentPartner',
  type: CloudTaskType.PartnerIntakeNotificationReminder,
}
