import {PushNotificationInternalType} from '@libs/services-common/enums/push-notification.enum'
import {PushNotificationType} from '@libs/common/enums/push-notification.enum'

export const internalNotificationTypeToDestinationType = new Map<
  PushNotificationInternalType,
  PushNotificationType
>([
  [PushNotificationInternalType.TestsOrdered, PushNotificationType.Milestone],
  [PushNotificationInternalType.MedicationPayment, PushNotificationType.MilestoneAlert],
  [PushNotificationInternalType.MedicationChanges, PushNotificationType.MedicationDetails],
  [PushNotificationInternalType.MedicationAdded, PushNotificationType.MedicationDetails],
  [PushNotificationInternalType.AppointmentPaymentAlert, PushNotificationType.MilestoneAlert],
  [PushNotificationInternalType.MedicationsDiscontinued, PushNotificationType.Medications],
  [PushNotificationInternalType.PatientPlansPushed, PushNotificationType.PlansSelection],
  [PushNotificationInternalType.ReportPeriodPlanMilestonePushed, PushNotificationType.Milestone],
  [PushNotificationInternalType.TestResultsReleased, PushNotificationType.TestResults],
  [PushNotificationInternalType.ChatMessageCreated, PushNotificationType.Chat],
  [PushNotificationInternalType.FertilityIQReleased, PushNotificationType.ReportDetails],
  [PushNotificationInternalType.EggFreezingReleased, PushNotificationType.ReportDetails],
  [PushNotificationInternalType.EggFreezingUpdated, PushNotificationType.ReportDetails],
  [PushNotificationInternalType.MilestoneAlert, PushNotificationType.MilestoneAlert],
  [PushNotificationInternalType.PatientFeedback, PushNotificationType.SubmitPatientFeedback],
  [PushNotificationInternalType.LibraryContent, PushNotificationType.Library],
  [PushNotificationInternalType.ConsentPackageSent, PushNotificationType.CompleteConsent],
  [PushNotificationInternalType.ConsentPackageReminder, PushNotificationType.CompleteConsent],
  [PushNotificationInternalType.ConsentPackageVoided, PushNotificationType.ViewConsents],
  [PushNotificationInternalType.AppointmentCreated, PushNotificationType.Milestone],
  [PushNotificationInternalType.AppointmentCreatedReminder, PushNotificationType.Milestone],
  [PushNotificationInternalType.BookingRequestMilestone, PushNotificationType.Milestone],
  [PushNotificationInternalType.BookingRequestMilestoneReminder, PushNotificationType.Milestone],
  [PushNotificationInternalType.AppointmentRescheduled, PushNotificationType.Milestone],
])

export const pushNotificationTitle = new Map<PushNotificationInternalType, string>([
  [PushNotificationInternalType.FertilityIQReleased, 'Your Fertility IQ is ready!'],
  [PushNotificationInternalType.EggFreezingReleased, 'Your Egg Freezing Report is ready!'],
  [PushNotificationInternalType.EggFreezingUpdated, 'Egg Freezing Report updated!'],
  [PushNotificationInternalType.TestsOrdered, 'A new order was created'],
  [PushNotificationInternalType.MedicationPayment, 'Please pay your medication'],
  [PushNotificationInternalType.MedicationChanges, 'Acknowledge Medication Changes'],
  [PushNotificationInternalType.MedicationAdded, 'Your doctor added a new medication'],
  [PushNotificationInternalType.AppointmentPaymentAlert, 'Please pay for your appointment'],
  [PushNotificationInternalType.PartnerReminder, 'Invite your partner'],
  [PushNotificationInternalType.PatientIntake, 'Complete your intake!'],
  [PushNotificationInternalType.PartnerIntake, 'Complete your intake!'],
  [
    PushNotificationInternalType.MedicationsDiscontinued,
    'URGENT: One or more medications discontinued',
  ],
  [PushNotificationInternalType.PatientPlansPushed, 'Select a plan!'],
  [
    PushNotificationInternalType.ReportPeriodPlanMilestonePushed,
    'Please report your first day of period',
  ],
  [PushNotificationInternalType.TestResultsReleased, 'Results Ready to View'],
  [PushNotificationInternalType.ChatMessageCreated, 'New Message'],
  [PushNotificationInternalType.MilestoneAlert, 'Wire payment received'],
  [PushNotificationInternalType.PatientFeedback, "We'd love your feedback!"],
  [PushNotificationInternalType.LibraryContent, 'Care Team Recommendation'],
  [PushNotificationInternalType.ConsentPackageSent, 'You have a new consent!'],
  [PushNotificationInternalType.ConsentPackageReminder, 'Please complete your consent'],
  [PushNotificationInternalType.ConsentPackageVoided, 'Consent voided'],
])

export const pushNotificationBody = new Map<PushNotificationInternalType, string>([
  [
    PushNotificationInternalType.FertilityIQReleased,
    'Learn about the determining factors of fertility and see your own results.',
  ],
  [PushNotificationInternalType.EggFreezingReleased, 'See the results of your egg freezing plan.'],
  [
    PushNotificationInternalType.EggFreezingUpdated,
    'See the updated results of your egg freezing plan.',
  ],
  [PushNotificationInternalType.TestsOrdered, 'Click to see your order'],
  [PushNotificationInternalType.MedicationPayment, 'Please pay for your prescribed medication'],
  [
    PushNotificationInternalType.MedicationChanges,
    'Changes have been made to your medications, please review and acknowledge',
  ],
  [
    PushNotificationInternalType.MedicationAdded,
    'Please review the new medication your doctor added',
  ],
  [
    PushNotificationInternalType.AppointmentPaymentAlert,
    'An appointment payment alert has been pushed to you',
  ],
  [
    PushNotificationInternalType.PartnerReminder,
    'Invite your partner to signup and join your fertility journey',
  ],
  [
    PushNotificationInternalType.PatientIntake,
    'Please complete your intake prior to your initial consultation',
  ],
  [
    PushNotificationInternalType.PartnerIntake,
    'Please complete your intake prior to your initial consultation',
  ],
  [
    PushNotificationInternalType.MedicationsDiscontinued,
    'Your doctor wants you to stop taking one or more medications as of today',
  ],
  [
    PushNotificationInternalType.PatientPlansPushed,
    `Your doctor created {{plansCount}} personalized plans just for you!`,
  ],
  [
    PushNotificationInternalType.ReportPeriodPlanMilestonePushed,
    `Please report your first day of period to begin your {{planName}} plan`,
  ],
  [
    PushNotificationInternalType.TestResultsReleased,
    'Your test results are now available, please visit the Nestproject app to view them',
  ],
  [PushNotificationInternalType.ChatMessageCreated, '{{messageContent}}'],
  [
    PushNotificationInternalType.MilestoneAlert,
    'Payment for your plan has been received. Check out the next milestone in your journey',
  ],
  [
    PushNotificationInternalType.PatientFeedback,
    'Share your experience with us and help improve our service.',
  ],
  [
    PushNotificationInternalType.LibraryContent,
    'Your care team has recommended one or more handouts for you.',
  ],
  [
    PushNotificationInternalType.ConsentPackageSent,
    'Please review it, answer any included questions and provide a signature to complete it.',
  ],
  [
    PushNotificationInternalType.ConsentPackageReminder,
    `You have a consent which hasn't been completed. Please complete it to avoid any delays in you fertility journey.`,
  ],
  [
    PushNotificationInternalType.ConsentPackageVoided,
    'One or more of your consents have been voided.',
  ],
])
