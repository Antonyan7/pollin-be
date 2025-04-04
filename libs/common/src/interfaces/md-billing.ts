type MDBillingResponseStatus = {
  IsSuccess: boolean
  ErrorMessages: string[]
  StatusCode: number
}

export enum MDBillingGender {
  M = 'M',
  F = 'F',
}

export type CreateClaimService = {
  ServiceCodeId: number
  DiagnosticCodeId?: number
  /**
   * @example `2001-01-01T00:00:00`
   */
  ServiceDate: string
  /**
   * Quantity of services performed. Default: 1
   */
  Quantity: number
}

type PatientForMDBAPI = {
  FirstName: string
  LastName: string
  /**
   * @example `2001-01-01T00:00:00`
   */
  DateOfBirth: string
  Gender: MDBillingGender
  /**
   * Numeric string. Patients OHIP card number
   * @example 7777777777
   */
  HealthCardNumber: string
  VersionCode?: string
}

export type ServiceCodeItem = {
  /**
   * This value will be assigned in the ServiceCodeId parameter in the CreateClaim method
   */
  ServiceCodeId: number
  ServiceCode: string
  ServiceCodeSearchDescription?: string
}

export type DiagnosticCodeItem = {
  /**
   * This value will be assigned in the ServiceCodeId parameter in the CreateClaim method
   */
  DiagnosticCodeId: number
  DiagnosticCode: string
  DiagnosticCodeDescription?: string
  DiagnosticCodeSearchDescription?: string
}

export enum MDBillingClaimStatus {
  /**
   * Unsubmitted status is what triggers the claim to be sent from MDBilling to MOH
   */
  Unsubmitted = 'Unsubmitted',
  /**
   * MDBilling Submitted to MOH
   */
  Submitted = 'Submitted',
  /**
   * Rejected by MOH
   */
  Rejected = 'Rejected',
  /**
   * Paid by MOH
   */
  Paid = 'Paid',
}

export type ClaimDetailItem = {
  ClaimId: number
  ClaimStatus: MDBillingClaimStatus
}

export type OHIPValidationPayload = {
  /**
   * Numberic string. 6 digit billing number of the physician
   */
  BillingNumber: string

  /**
   * Numeric string. Ten digit health card (OHIP) of the patient
   */
  HealthCardNumber: string

  /**
   * OHIP card version
   * Not required as some Ontario health cards do not have a version code
   */
  VersionCode?: string
}

export type OHIPValidationResponse = {
  IsHealthCardValid: boolean
  FirstName: string
  LastName: string
  /**
   * @example `2001-01-01T00:00:00`
   */
  DOB: string
  /**
   * @example `F
   */
  Gender: string
  /**
   * Response received from the Ministry of Health validation service.
   */
  ResponseMessage: string
} & MDBillingResponseStatus

export type CreateClaimRequest = {
  /**
   * Numeric string. 6 digit billing number of the physician
   */
  BillingNumber: string
  PatientForMDBAPI: PatientForMDBAPI
  Services: CreateClaimService[]
  /**
   * Sent when flag is enabled on Service Type
   */
  ReferringPhysicianBillingNumber: string
}

export type CreateClaimResponse = {
  /**
   * Unique Id of the claim from MDBilling
   */
  ClaimId?: number
  /**
   * The total value of the claim (in float)
   */
  ClaimTotal?: number
} & MDBillingResponseStatus

export type GetClaimDetailsPayload = {
  BillingNumber: string
  ClaimIds: number[]
}

export type GetClaimDetailsResponse = {
  ClaimDetailItems: ClaimDetailItem[]
} & MDBillingResponseStatus

export type GetServiceCodesResponse = {
  ServiceCodeMobileAppItems: ServiceCodeItem[]
} & MDBillingResponseStatus

export type GetDiagnosticCodesResponse = {
  DiagnosticCodeMobileAppItems: DiagnosticCodeItem[]
} & MDBillingResponseStatus
