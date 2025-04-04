import {DocumentCategory} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientDocumentType} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {DocumentCategoryPurpose} from '@libs/services-common/enums/document-category-types.enum'

export const documentCategory404: string = '1651cf57-2a3f-47d0-5790-a776fa1e1313'

export const documentCategoryConsentFixture: Partial<DocumentCategory> = {
  id: 1,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1313',
  title: 'Consent',
  sequence: 2,
}

export const documentCategoryOtherFixture: Partial<DocumentCategory> = {
  id: 2,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1312',
  title: 'Other',
  sequence: 1,
}

export const documentCategoryMatureOocyteFixture: Partial<DocumentCategory> = {
  id: 3,
  uuid: 'f95ebbbf-7883-4025-bb28-897f023fb5e8',
  title: 'Mature Oocyte',
  sequence: 3,
  purpose: DocumentCategoryPurpose.MatureOocyteGroupPhoto,
  type: PatientDocumentType.PatientPlan,
}

export const documentCategoryBiopsyFixture: Partial<DocumentCategory> = {
  id: 4,
  uuid: '756c3e1a-690e-4518-aab9-2d313528f260',
  title: 'Biopsy',
  sequence: 4,
  purpose: DocumentCategoryPurpose.Biopsy,
  type: PatientDocumentType.PatientPlan,
}

export const documentCategoryPlanConsentFixture: Partial<DocumentCategory> = {
  id: 5,
  uuid: '2251cf57-2a3f-47d0-8790-c776fa1e1313',
  title: 'Plan Consent',
  type: PatientDocumentType.PatientPlan,
  sequence: 1,
}

export const documentCategoryReferralChartFixture: Partial<DocumentCategory> = {
  id: 6,
  uuid: '1233992c-930d-4ab3-9d0a-2f84c4f4471c',
  title: 'ReferralChart',
  type: PatientDocumentType.PatientProfile,
  sequence: 1,
  purpose: DocumentCategoryPurpose.ReferralChart,
}
