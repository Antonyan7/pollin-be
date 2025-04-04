import {PatientDocument} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientEmailVerifiedFixture,
  patientForPlanPartnerFixture,
  patientForPlansV3Fixture,
} from './patient.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {
  documentCategoryConsentFixture,
  documentCategoryOtherFixture,
  documentCategoryPlanConsentFixture,
} from './document-category.fixture'
import {patientPlanCompletedFixture, patientPlanV2NotOrderableFixture} from './patient-plan.fixture'
import {PatientDocumentType} from '@libs/data-layer/apps/users/enum/patient-document.enum'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const patientDocumentConsentFixture: Partial<PatientDocument> = {
  id: 1,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1313',
  patientId: patientEmailVerifiedFixture.id,
  name: 'patientDocumentConsentFixture',
  url: 'patient/document/consent',
  categoryId: documentCategoryConsentFixture.id,
  createdAt: dateTimeUtil.toDate('2023-02-02'),
}

export const patientDocumentOtherFixture: Partial<PatientDocument> = {
  id: 2,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientEmailVerifiedFixture.id,
  name: 'patientDocumentOtherFixture',
  url: 'patient/document/other',
  categoryId: documentCategoryOtherFixture.id,
  createdAt: dateTimeUtil.toDate('2023-01-01'),
  originalFileName: 'patientDocumentOtherFixture_originalFileName',
}

export const patientDocumentForStimSheetFixture: Partial<PatientDocument> = {
  id: 3,
  uuid: '1251cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForStimSheetFixture',
  url: 'patient/document/patientDocumentForStimSheetFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForOBWorkSheetFixture: Partial<PatientDocument> = {
  id: 4,
  uuid: '2251cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForOBWorkSheetFixture',
  url: 'patient/document/patientDocumentForOBWorkSheetFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForHCGSheetFixture: Partial<PatientDocument> = {
  id: 5,
  uuid: '3251cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForHCGSheetFixture',
  url: 'patient/document/patientDocumentForHCGSheetFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForStimSheetToAddFixture: Partial<PatientDocument> = {
  id: 6,
  uuid: '1351cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForStimSheetToAddFixture',
  url: 'patient/document/patientDocumentForStimSheetToAddFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForOBWorkSheetToAddFixture: Partial<PatientDocument> = {
  id: 7,
  uuid: '2451cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForOBWorkSheetToAddFixture',
  url: 'patient/document/patientDocumentForOBWorkSheetToAddFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForHCGSheetToAddFixture: Partial<PatientDocument> = {
  id: 8,
  uuid: '3551cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForHCGSheetToAddFixture',
  url: 'patient/document/patientDocumentForHCGSheetToAddFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForPatientPlanFixture: Partial<PatientDocument> = {
  id: 9,
  uuid: '2552cf57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientPlanCompletedFixture.patientId,
  patientPlanId: patientPlanCompletedFixture.id,
  name: 'patientDocumentForPatientPlanFixture',
  url: 'patient/plans/patientDocumentForPatientPlanFixture',
  categoryId: documentCategoryOtherFixture.id,
  type: PatientDocumentType.PatientPlan,
  createdAt: dateTimeUtil.toDate('2023-05-02T13:00:00'),
}

export const patientDocumentForEditableNoteFixture: Partial<PatientDocument> = {
  id: 10,
  uuid: '1351cf22-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlansV3Fixture.id,
  name: 'patientDocumentForEditableNoteFixture',
  url: 'patient/document/patientDocumentForEditableNoteFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForEPLSheetFixture: Partial<PatientDocument> = {
  id: 11,
  uuid: '3351ca57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForEPLSheetFixture',
  url: 'patient/document/patientDocumentForEPLSheetFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForEPLSheetToAddFixture: Partial<PatientDocument> = {
  id: 12,
  uuid: '3551cf57-2a3f-23d0-8790-c776fa1e1312',
  patientId: patientForPlanPartnerFixture.id,
  name: 'patientDocumentForEPLSheetToAddFixture',
  url: 'patient/document/patientDocumentForEPLSheetToAddFixture',
  categoryId: documentCategoryOtherFixture.id,
}

export const patientDocumentForPlanToUpdateFixture: Partial<PatientDocument> = {
  id: 13,
  uuid: '3551cf43-2a3f-23d0-8790-c776fa1e1312',
  patientId: patientPlanV2NotOrderableFixture.id,
  name: 'patientDocumentForPlanToUpdateFixture',
  patientPlanId: patientPlanV2NotOrderableFixture.id,
  url: 'patient/document/patientDocumentForPlanToUpdateFixture',
  categoryId: documentCategoryPlanConsentFixture.id,
  type: PatientDocumentType.PatientPlan,
}

export const patientDocumentForPatientPlanLastCreatedFixture: Partial<PatientDocument> = {
  id: 14,
  uuid: '2222ca57-2a3f-47d0-8790-c776fa1e1312',
  patientId: patientPlanCompletedFixture.patientId,
  patientPlanId: patientPlanCompletedFixture.id,
  name: 'patientDocumentForPatientPlanLastCreatedFixture',
  url: 'patient/plans/patientDocumentForPatientPlanLastCreatedFixture',
  categoryId: documentCategoryOtherFixture.id,
  type: PatientDocumentType.PatientPlan,
  createdAt: dateTimeUtil.toDate('2023-05-05T13:00:00'),
}
