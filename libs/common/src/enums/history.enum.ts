export enum ActionHistorySortByFieldEnum {
  EditedBy = 'EditedBy',
  Date = 'Date',
  ScannedBy = 'ScannedBy',
  Task = 'Task',
  DishType = 'DishType',
  PatientFullName = 'PatientFullName',
  IdentityMatched = 'IdentityMatched',
}

export enum HistoryUserType {
  ClinicUser = 'ClinicUser',
  Patient = 'Patient',
  Partner = 'Partner',
  /** Manual update by clinic admin from Django */
  SystemAdmin = 'SystemAdmin',
  /** Automatic updates by CF etc */
  System = 'System',
}

export const AuthUserNameAutomation = 'Automatic'

export const HistoryUserTypeTitle = {
  [HistoryUserType.ClinicUser]: 'Clinic User',
  [HistoryUserType.Patient]: 'Patient',
  [HistoryUserType.Partner]: 'Partner',
  [HistoryUserType.SystemAdmin]: 'System Admin',
  [HistoryUserType.System]: 'System',
}

export enum HistoryTitleLabel {
  Task = 'Task History',
  NoteOrder = 'Note & Order History',
  Plan = 'History of Updates',
  Appointment = 'Appointment History',
  Order = 'Order History',
  WitnessingLog = 'Witnessing Log',
  Consents = 'Consents History',
}

export enum HistoryLineItemText {
  Task = 'Task',
  Plan = 'Plan',
  Patient = 'Patient',
  Appointment = 'Appointment',
  Consent = 'Consents',
}
