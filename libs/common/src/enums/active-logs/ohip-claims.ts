export enum OhipClaimsServiceFunctions {
  GetPatientBills = 'GetPatientBills',
  CreatePatientBill = 'CreatePatientBill',
  GetOHIPClaimsList = 'GetOHIPClaimsList',
  UpdateOHIPClaimCodes = 'UpdateOHIPClaimCodes',
  GetOHIPClaimDetails = 'GetOHIPClaimDetails',
  SendOHIPClaim = 'SendOHIPClaim',
  ChangeClaimStatusManually = 'ChangeClaimStatusManually',
  GetPatientPendingPayments = 'GetPatientPendingPayments',
  ArchivePatientBill = 'ArchivePatientBill',
  GetPatientBillDetails = 'GetPatientBillDetails',
}

export enum OhipClaimsServiceActions {
  PatientNotFound = 'PatientNotFound',
  PatientPaymentAdhocNotFound = 'PatientPaymentAdhocNotFound',
  StaffUserNotFound = 'StaffUserNotFound',
  CreatePatientBillFailed = 'CreatePatientBillFailed',
  GetPatientBillsListFailed = 'GetPatientBillsListFailed',
  GetPatientBillDetailsFailed = 'GetPatientBillDetailsFailed',
  GetOHIPClaimsListFailed = 'GetOHIPClaimsListFailed',
  GetOHIPClaimDetailsFailed = 'GetOHIPClaimDetailsFailed',
  UpdateOHIPClaimCodesFailed = 'UpdateOHIPClaimCodesFailed',
  ChangeClaimStatusManuallyFailed = 'ChangeClaimStatusManuallyFailed',
  ClaimIDMissing = 'ClaimIDMissing',
  GetPatientPendingPaymentsFailed = 'GetPatientPendingPaymentsFailed',
  ArchivePatientBillFailed = 'ArchivePatientBillFailed',
  GetPatientBillsFailed = 'GetPatientBillsFailed',
  BillingNumberMissing = 'BillingNumberMissing',
  SendOHIPClaimFailed = 'SendOHIPClaimFailed',
  ClaimSendReqFailed = 'ClaimSendReqFailed',
  OHIPOrSexAtBirthMissing = 'OHIPOrSexAtBirthMissing',
}
