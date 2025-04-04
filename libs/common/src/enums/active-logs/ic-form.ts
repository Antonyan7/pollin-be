export enum IcFormFunctions {
  UpdatePatientIcForm = 'UpdatePatientIcForm',
  GetPatientIcForm = 'GetPatientIcForm',
  MedicationChanges = 'MedicationChanges',
  GetCompletedIcForm = 'GetCompletedIcForm',
  GetPartnersIcForm = 'GetPartnersIcForm',
  DeletePatientOrPartnerQuestionnaireIntent = 'DeletePatientOrPartnerQuestionnaireIntent',
}

export enum IcFormActions {
  UpdatePatientIcFormFailed = 'UpdatePatientIcFormFailed',
  GetPatientIcFormFailed = 'GetPatientIcFormFailed',
  MedicationChangesFailed = 'MedicationChangesFailed',
  GetCompletedIcFormFailed = 'GetCompletedIcFormFailed',
  GetPartnersIcFormFailed = 'GetPartnersIcFormFailed',
  GetPartnersDtoIcFormFailed = 'GetPartnersDtoIcFormFailed',
  ExecutingForFemale = 'ExecutingForFemale',
  ExecutingForMale = 'ExecutingForMale',
  ICFormWasFound = 'ICFormWasFound',
  DeletePatientOrPartnerQuestionnaireIntent = 'DeletePatientOrPartnerQuestionnaireIntent',
  PatientHasMoreThanOneQuestionnaireIntentForPatientOrPartnerIntake = 'PatientHasMoreThanOneQuestionnaireIntentForPatientOrPartnerIntake',
}
