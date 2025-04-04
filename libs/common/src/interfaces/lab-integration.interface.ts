import {HL7AbnormalFlag} from '@libs/common/enums/test-orders-and-results.enum'

export interface LabPatientAddress {
  street?: string
  unit?: string
  city?: string
  province?: string
  postalCode?: string
}

export interface LabPatient {
  firstName: string
  lastName: string
  middleName: string
  dateOfBirth?: string
  ohipNumber?: string
  ohipVersion?: string
  address?: LabPatientAddress
  sexAtBirth?: string
  phoneHome?: string
  alternateId?: string
}

export interface LabObservationResult {
  setId?: string
  testName: string
  universalCode: string
  subId?: string
  resultValue: string
  resultStatus: string
  abnormalFlags?: HL7AbnormalFlag | string | null
  resultObservationDate?: string
  producerId?: string
  producersText?: string
  unit?: string
  refRange?: string
  comment?: string
}

export interface LabObservationRequest {
  testName: string
  universalCode: string
  specimenReceiveDate?: string
  fillerOrderNumber?: string
  placerOrderNumber?: string
  orderingProvider?: string
  resultChangeDate?: string
  diagnosticServSectID?: string
  requestResultStatus?: string
  requestResultCopiesTo?: string
  hasPDFReport?: boolean
  observationDate?: string // specimen collection date
  department?: string
  observationResults: LabObservationResult[]
}

/**
 * Syncronized results from third parties will need to implement this interface
 */
export interface LabSyncParsedData {
  labIdentifier: string
  patient: LabPatient
  observationRequests: LabObservationRequest[]
}
