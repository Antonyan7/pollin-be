import {NestprojectConfigService} from '../services'

export enum CloudTaskExecutionType {
  CloudFunction = 'CloudFunction',
  BackgroundAPI = 'BackgroundAPI',
}

export enum BackgroundServiceAPI {
  SendConsentReminder = 'SendConsentReminder',
  CancelPatientAppointment = 'CancelPatientAppointment',
  SendSmsNotificationToConfirmAppointment = 'sendSmsNotificationToConfirmAppointment',
  SendBookingRequestReminder = 'SendBookingRequestReminder',
}

export const BackgroundServiceAPIPath = {
  [BackgroundServiceAPI.SendConsentReminder]: [
    'emr-background',
    'v1/consents/send-patient-package-reminder',
  ],
  [BackgroundServiceAPI.CancelPatientAppointment]: ['booking-background', 'v1/appointments/cancel'],
  [BackgroundServiceAPI.SendSmsNotificationToConfirmAppointment]: [
    'booking-background',
    'v1/appointments/send-notification-to-confirm',
  ],
  [BackgroundServiceAPI.SendBookingRequestReminder]: [
    'booking-background',
    'v1/appointments/send-booking-request-reminder',
  ],
}

export const getTargetURL = (api: BackgroundServiceAPI): string => {
  const [service, path] = BackgroundServiceAPIPath[api]
  return `https://${service}-${NestprojectConfigService.getInstance().get<string>('CLOUD_RUN_BASE_DOMAIN')}/${service}/${path}`
}
