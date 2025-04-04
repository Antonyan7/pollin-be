import {PushNotificationTemplate} from '@libs/data-layer/apps/notification'
import {PushNotificationInternalType} from '@libs/services-common/enums'

export const pushNotificationTemplateForAppCreatedFixture: Partial<PushNotificationTemplate> = {
  id: 1,
  type: PushNotificationInternalType.AppointmentCreated,
  title: 'Appointment Created Title',
  body: 'Appointment Created body',
}

export const pushNotificationTemplateForDisabledTestsOrderedFixture: Partial<PushNotificationTemplate> =
  {
    id: 2,
    type: PushNotificationInternalType.TestsOrdered,
    title: 'Tests Ordered Title',
    body: 'Tests Ordered body',
    disabled: true,
  }

export const pushNotificationTemplateForBookingRequestReminderFixture: Partial<PushNotificationTemplate> =
  {
    id: 3,
    type: PushNotificationInternalType.BookingRequestMilestone,
    title: 'Booking Request Milestone Title',
    body: 'Booking Request Milestone body',
  }

export const pushNotificationTemplateForBookingRequestReminderReminderFixture: Partial<PushNotificationTemplate> =
  {
    id: 4,
    type: PushNotificationInternalType.BookingRequestMilestoneReminder,
    title: 'Booking Request Milestone Reminder Title',
    body: 'Booking Request Milestone Reminder body',
  }

export const pushNotificationTemplateForAppRescheduledFixture: Partial<PushNotificationTemplate> = {
  id: 5,
  type: PushNotificationInternalType.AppointmentRescheduled,
  title: 'Appointment Rescheduled Title',
  body: 'Appointment Rescheduled body',
}
