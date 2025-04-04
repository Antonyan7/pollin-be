export enum CreatePatientAndAppointmentFunctions {
  ValidateOhip = 'ValidateOhip',
  ValidatePhoneNumber = 'ValidatePhoneNumber',
  ValidateEmail = 'ValidateEmail',
  CreateAppointment = 'CreateAppointment',
  CreatePatient = 'CreatePatient',
  CreatePatientAndAppointment = 'CreatePatientAndAppointment',
  CreateFirebaseUser = 'CreateFirebaseUser',
  ValidateAcuityDateOfBirthWithException = 'ValidateAcuityDateOfBirthWithException',
  CreateAppointmentMilestoneAlertWithUpdatingSchedule = 'CreateAppointmentMilestoneAlertWithUpdatingSchedule',
  CheckAlreadyExistPatientByOhipAndEmail = 'CheckAlreadyExistPatientByOhipAndEmail',
  AutoFillPhoneNumberForShortFormat = 'AutoFillPhoneNumberForShortFormat',
  ValidateAcuity = 'ValidateAcuity',
}

export enum CreatePatientAndAppointmentActions {
  ValidateOhipFailed = 'ValidateOhipFailed',
  ValidatePhoneNumberFailed = 'ValidatePhoneNumberFailed',
  ValidateEmailFailed = 'ValidateEmailFailed',
  ValidateDateOfBirthFailed = 'ValidateDateOfBirthFailed',
  CreateAppointmentFailed = 'CreateAppointmentFailed',
  CreatePatientAndAppointmentFailed = 'CreatePatientAndAppointmentFailed',
  CreateFirebaseUserFailed = 'CreateFirebaseUserFailed',
  CheckAlreadyExistPatientByOhipAndEmailFailed = 'CheckAlreadyExistPatientByOhipAndEmail',
  CheckAlreadyExistPatientByOhipAndEmailPatientExistInFirebaseButNotInDb = 'CheckAlreadyExistPatientByOhipAndEmailPatientExistInFirebaseButNotInDb',
  CreatePatientFailed = 'CreatePatientFailed',
  PhoneNumberHasLessThan10DigitsAndWeAutomaticallyAddedPlus1WhichCouldCauseIssue = 'PhoneNumberHasLessThan10DigitsAndWeAutomaticallyAddedPlus1WhichCouldCauseIssue',
  ValidateAcuityDateOfBirthWithExceptionFailed = 'ValidateAcuityDateOfBirthWithExceptionFailed',
  AcuityDataIsNoMatch = 'AcuityDataIsNoMatch',
  AcuityIdInBadFormat = 'AcuityIdInBadFormat',
  AcuityNotFound = 'AcuityNotFound',
}
