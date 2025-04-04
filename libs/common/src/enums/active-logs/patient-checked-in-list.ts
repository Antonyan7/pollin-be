export enum PatientsCheckInListAction {
  InternalError = 'InternalError',
  PatientNotFound = 'PatientNotFound',
  InvalidPayload = 'InvalidPayload',
}

export enum PatientsCheckedInListFunction {
  GetCheckedInList = 'GetCheckInList',
  GetPatientAppointmentsListByDate = 'GetPatientAppointmentsListByDate',
}
