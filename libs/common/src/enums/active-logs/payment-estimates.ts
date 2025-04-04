export enum PaymentEstimatesServiceFunctions {
  GetPaymentEstimatesList = 'GetPaymentEstimatesList',
  SendEstimateEmailToPatient = 'SendEstimateEmailToPatient',
  ResendPaymentEstimate = 'ResendPaymentEstimate',
}

export enum PaymentEstimatesServiceActions {
  GetPaymentEstimatesListFailed = 'GetPaymentEstimatesListFailed',
  SendEstimateEmailToPatientFailed = 'SendEstimateEmailToPatientFailed',
  SendEstimateEmailToPatientStarted = 'SendEstimateEmailToPatientStarted',
  ResendPaymentEstimateFailed = 'ResendPaymentEstimateFailed',
}
