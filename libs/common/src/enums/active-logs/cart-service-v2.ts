export enum CartAppointmentServiceFunctions {
  ConfirmPaymentV2 = 'ConfirmPaymentV2',
  GetPatientMilestoneData = 'GetPatientMilestoneData',
  FindOrCreatePatientMilestone = 'FindOrCreatePatientMilestone',
  CreateAppointmentWithPaymentOrderItemsAndMilestoneAndAvailability = 'CreateAppointmentWithPaymentOrderItemsAndMilestoneAndAvailability',
}

export enum CartAppointmentServiceActions {
  ConfirmPaymentV2Starting = 'ConfirmPaymentV2Starting',
  ConfirmPaymentV2Failed = 'ConfirmPaymentV2Failed',
  CreateAppoitntmentsV2 = 'CreateAppoitntmentsV2',
  ValidateServiceProvider = 'ValidateServiceProvider',
  CreatePatientAlertToCompleteQuestionnaire = 'CreatePatientAlertToCompleteQuestionnaire',
  GetAllServiceTypes = 'GetAllServiceTypes',
  GetQuestionnaireForPatientIntake = 'GetQuestionnaireForPatientIntake',
  SetServiceGroupOnMilestone = 'SetServiceGroupOnMilestone',
  SetServiceTypeOnMilestone = 'SetServiceTypeOnMilestone',
  SetServiceTypeWithTestsOnMilestone = 'SetServiceTypeWithTestsOnMilestone',
  AppointmentHasServiceCategory = 'AppointmentHasServiceCategory',
  AppointmentWithoutServiceCategory = 'AppointmentWithoutServiceCategory',
  FindPatientMilestone = 'FindPatientMilestone',
}
