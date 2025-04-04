export enum PatientAppointmentsByOhipAvailabilityServiceFunction {
  PatientAppointmentsByOhipAvailabilityService = 'PatientAppointmentsByOhipAvailabilityService',
}

export enum PatientAppointmentsByOhipAvailabilityServiceAction {
  StartMethod = 'StartMethod',
  InternalError = 'InternalError',

  UpdatingAppointmentPaymentStatus = 'UpdatingAppointmentPaymentStatus',

  NewOhipAvailabilityIsYes = 'NewOhipAvailabilityIsYes',
  NewOhipAvailabilityIsNo = 'NewOhipAvailabilityIsNo',
}
