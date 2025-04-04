export enum MDBillingAdapterActions {
  ReadServiceCodesFailed = 'ReadServiceCodesFailed',
  ReadDiagnosticCodesFailed = 'ReadDiagnosticCodesFailed',
  OHIPValidationFailed = 'MBillingOHIPValidationFailed',
  OHIPValidationFailedWithoutAnyStatus = 'OHIPValidationFailedWithoutAnyStatus',
  CreateClaimFailed = 'CreateClaimFailed',
  GetClaimDetailsFailed = 'GetClaimDetailsFailed',
  ResponseReceivedFromMDBilling = 'ResponseReceivedFromMDBilling',
}

export enum MDBillingAdapterFunctions {
  GetServiceCodes = 'GetServiceCodes',
  GetDiagnosticCodes = 'GetDiagnosticCodes',
  ValidateOHIP = 'ValidateOHIP',
  CreateClaim = 'CreateClaim',
  GetClaimDetails = 'GetClaimDetails',
}
