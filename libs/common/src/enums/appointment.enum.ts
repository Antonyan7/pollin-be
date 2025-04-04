export enum AppointmentStatus {
  Booked = 'Booked',
  Cancelled = 'Cancelled',
  NoShow = 'NoShow',
  CheckedIn = 'CheckedIn',
  RunningLate = 'RunningLate',
  Confirmed = 'Confirmed',
  InProgress = 'InProgress',
  Done = 'Done',
}
export enum PatientsByAppointmentStatusAlert {
  Cancelled = 'cancelled',
  NoShow = 'a no show',
}

export enum AppointmentPaymentStatus {
  FreeService = 'FreeService',
  PendingPayment = 'PendingPayment',
  CoveredByOHIP = 'CoveredByOHIP',
  Paid = 'Paid',
}

export const AppointmentIsNotPayedStatuses = [AppointmentPaymentStatus.PendingPayment]

export enum AppointmentAlertId {
  VerifyPhoto = 'VerifyPhoto',
  UpdateOHIP = 'UpdateOHIP',
  UpdateContact = 'UpdateContact',
  RefetchAppointments = 'RefetchAppointments',
  PaymentRequired = 'PaymentRequired',
}

export const AppointmentAlertLabel = new Map<AppointmentAlertId, string>([
  [AppointmentAlertId.VerifyPhoto, 'Verify'],
  [AppointmentAlertId.UpdateOHIP, 'Update OHIP info'],
  [AppointmentAlertId.UpdateContact, 'Update contact info'],
  [AppointmentAlertId.RefetchAppointments, 'Refresh'],
  [AppointmentAlertId.PaymentRequired, 'View Details'],
])

export enum AppointmentCreatedFrom {
  Unknown = 'Unknown',
  Mobile = 'Mobile',
  Web = 'Web',
  Acuity = 'Acuity',
}

export enum PatientAcuityAppointmentAgeGroup {
  UnderTwentyFive = 'UnderTwentyFive',
  TwentySixToThirty = 'TwentySixToThirty',
  ThirtyOneToThirtyFive = 'ThirtyOneToThirtyFive',
  ThirtySixToFortyTwo = 'ThirtySixToFortyTwo',
  FortyThreePlus = 'FortyThreePlus',
}

export enum PatientAgeGroup {
  UnderTwentyFive = 'UnderTwentyFive',
  TwentySixToThirty = 'TwentySixToThirty',
  ThirtyOneToThirtyFive = 'ThirtyOneToThirtyFive',
  ThirtySixToFortyTwo = 'ThirtySixToFortyTwo',
  FortyThreePlus = 'FortyThreePlus',
}

export const PatientAgeGroupLabel = new Map<PatientAgeGroup, string>([
  [PatientAgeGroup.UnderTwentyFive, 'less than 25'],
  [PatientAgeGroup.TwentySixToThirty, '26-30'],
  [PatientAgeGroup.ThirtyOneToThirtyFive, '31-35'],
  [PatientAgeGroup.ThirtySixToFortyTwo, '36-42'],
  [PatientAgeGroup.FortyThreePlus, '43+'],
])

export const notAllowedToMarkAsInProgressStatuses = [
  AppointmentStatus.Cancelled,
  AppointmentStatus.NoShow,
  AppointmentStatus.Done,
]

export enum AppointmentCheckedInVia {
  Mobile = 'Mobile',
  Web = 'Web',
}

export const AppointmentCheckedInViaLabel = new Map<AppointmentCheckedInVia, string>([
  [AppointmentCheckedInVia.Mobile, 'App'],
  [AppointmentCheckedInVia.Web, 'Portal'],
])

export enum AppointmentFilterColumnEnum {
  Patient = 'Patient',
  Doctor = 'Doctor',
  Resource = 'Resource',
  Appointment = 'Appointment',
  Status = 'Status',
  OverflowMenu = 'OverflowMenu',
  Action = 'Action',
  SignOff = 'SignOff',
  ResultStatus = 'ResultStatus',
}

export enum FollowUpStatusEnum {
  Ready = 'Ready',
  NotReady = 'NotReady',
}

export enum AppointmentPlanSheetResultsStatus {
  Pending = 'Pending',
  Completed = 'Completed',
}

export const SkipFeedBackBasedOnAppStatuses: AppointmentStatus[] = [
  AppointmentStatus.Booked,
  AppointmentStatus.Cancelled,
  AppointmentStatus.NoShow,
]

export const SkipFeedBackBasedOnAppStatusesExceptBooked: AppointmentStatus[] = [
  AppointmentStatus.Cancelled,
  AppointmentStatus.NoShow,
]
