export enum PatientOhipValidationFunction {
  ValidateOhipByMdBilling = 'ValidateOhipByMdBilling',
  GetRandomStaffBillingNumber = 'GetRandomStaffBillingNumber',
}

export enum PatientOhipValidationActions {
  ValidateOhipByMdBillingFailFromAdapter = 'ValidateOhipByMdBillingFailFromAdapter',
  CartIsNotValidByMdBilling = 'CartIsNotValidByMdBilling',
  GetRandomStaffBillingNumberFailed = 'GetRandomStaffBillingNumberFailed',
  OhipNotValidByMdBIllingAndDoesntHaveErrorMsg = 'OhipNotValidByMdBIllingAndDoesntHaveErrorMsg',
}

export enum OhipValidationServiceFunction {
  ClearAndValidateOhipExistenceAndCheckingByMdBilling = 'ClearAndValidateOhipExistenceAndCheckingByMdBilling',
  ValidateOhipByMdBilling = 'ValidateOhipByMdBilling',
  GetRandomStaffBillingNumber = 'GetRandomStaffBillingNumber',
}

export enum OhipValidationServiceActions {
  StartMethod = 'StartMethod',
  CartIsNotValidByMdBilling = 'CartIsNotValidByMdBilling',
  GetRandomStaffBillingNumberFailed = 'GetRandomStaffBillingNumberFailed',
  Failed = 'Failed',
}
