import {PatientPushNotification} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientConsentRemindersFixture,
  patientForAppointmentsBackgroundFixture,
  patientForConsentFixture,
  patientForWorksheetListFixture,
  patientIdToPushPaymentAlertFixture,
} from './patient.fixture'

export const patientPushNotificationForPushPaymentAlertFixture: Partial<PatientPushNotification> = {
  patientId: patientIdToPushPaymentAlertFixture,
  pushNotificationsEnabled: true,
  registrationToken: 'DefaultSeedRegistrationToken',
}

export const patientPushNotificationForConsentRemindersFixture: Partial<PatientPushNotification> = {
  patientId: patientConsentRemindersFixture.id,
  pushNotificationsEnabled: true,
  registrationToken: 'DefaultSeedRegistrationTokenrr',
}

export const patientPushNotificationForPatientForConsentFixture: Partial<PatientPushNotification> =
  {
    patientId: patientForConsentFixture.id,
    pushNotificationsEnabled: true,
    registrationToken: 'DefaultSeedRegistrationTokenee',
  }

export const patientPushNotificationForPatientForWorksheetListFixture: Partial<PatientPushNotification> =
  {
    patientId: patientForWorksheetListFixture.id,
    pushNotificationsEnabled: true,
    registrationToken: 'patientPushNotificationForPatientForWorksheetListFixture',
  }

export const patientPushNotificationForPatientForAppointmentsBackgroundFixture: Partial<PatientPushNotification> =
  {
    patientId: patientForAppointmentsBackgroundFixture.id,
    pushNotificationsEnabled: true,
    registrationToken: 'patientPushNotificationForPatientForAppointmentsBackgroundFixture',
  }
