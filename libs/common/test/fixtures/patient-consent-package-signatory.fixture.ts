import {PatientConsentPackageSignatory} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientEmailVerifiedFixture,
  patientFemaleFixture,
  patientForBackgroundInformationFixture,
  patientForConsentFixture,
  patientForConsentMobileFixture,
  patientForConsentMobilePartnerFixture,
  patientForConsentQuestionnaireFixture,
  patientForConsentQuestionnairePartnerFixture,
  patientForConsentSignMobileFixture,
  patientForConsentSignPartnerMobileFixture,
  patientForPlanTypesFixture,
  patientForWorksheetListFixture,
  patientWithoutDoctorSoftDeletedFixture,
} from './patient.fixture'
import {
  patientConsentPackageBackgroundFixture,
  patientConsentPackageFixture,
  patientConsentPackageForBackgroundReminderFixture,
  patientConsentPackageForGetAnswersSeparatedApiFixture,
  patientConsentPackageForMobilePastFixture,
  patientConsentPackageForMobileUpcomingFixture,
  patientConsentPackageForQuestionnaireFixture,
  patientConsentPackageForReminderFixture,
  patientConsentPackageToVoidFixture,
  patientConsentPackageVoidedFixture,
  patientConsentPackageWith2ModulesAndPartnerFixture,
  patientConsentPackageWithPlanButCanceledAfterActivatedFixture,
  patientConsentPackageWithPlanFixture,
  patientConsentPackageForSignMobileFixture,
} from './patient-consent-package.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {ConsentModuleRelationType} from '@libs/data-layer/apps/users/enum'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)

export const patientConsentPackageSignatoryFixture: Partial<PatientConsentPackageSignatory> = {
  id: 1,
  patientConsentPackageId: patientConsentPackageFixture.id,
  signingPatientId: patientEmailVerifiedFixture.id,
}

export const patientConsentPackageSignatoryPartnerFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 2,
    patientConsentPackageId: patientConsentPackageFixture.id,
    signingPatientId: patientForPlanTypesFixture.id,
  }

export const patientConsentPackageSignatoryVoidedFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 3,
    patientConsentPackageId: patientConsentPackageVoidedFixture.id,
    signingPatientId: patientEmailVerifiedFixture.id,
  }

export const patientConsentPackageSignatoryForPastFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 4,
    patientConsentPackageId: patientConsentPackageForMobilePastFixture.id,
    signingPatientId: patientForConsentMobileFixture.id,
    signedDate: dateTimeUtil.toDate('2025-01-03T15:20:00Z'),
    contributionTitle: 'patientConsentPackageSignatoryForPastFixture contributionTitle',
    signedLocation: 'patientConsentPackageSignatoryForPastFixture signedLocation',
  }

export const patientConsentPackageSignatoryForPartnerFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 6,
    patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
    signingPatientId: patientForConsentMobilePartnerFixture.id,
    relationType: ConsentModuleRelationType.Patient,
    signedDate: dateTimeUtil.toDate('2025-01-03T15:20:00Z'),
    contributionTitle: 'patientConsentPackageSignatoryForPartnerFixture contributionTitle',
    signedLocation: 'patientConsentPackageSignatoryForPartnerFixture signedLocation',
  }
export const patientConsentPackageSignatoryFor2ModulesFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 9,
    patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
    signingPatientId: patientForConsentMobileFixture.id,
  }

export const patientConsentPackageSignatoryForPlanFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 7,
    patientConsentPackageId: patientConsentPackageWithPlanFixture.id,
    signingPatientId: patientForConsentMobileFixture.id,
    signedDate: dateTimeUtil.toDate('2025-01-03T15:20:00Z'),
  }

export const patientConsentPackageSignatoryForMobileUpcomingFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 8,
    patientConsentPackageId: patientConsentPackageForMobileUpcomingFixture.id,
    signingPatientId: patientForConsentMobileFixture.id,
  }

// Each package should have signatory
export const patientConsentPackageSignatoryForCanceledAfterActivatedFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 10,
    patientConsentPackageId: patientConsentPackageWithPlanButCanceledAfterActivatedFixture.id,
    signingPatientId: patientForConsentMobileFixture.id,
    signedDate: dateTimeUtil.toDate('2025-01-03T15:20:00Z'),
  }

export const patientConsentPackageSignatoryBackgroundActiveFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 11,
    patientConsentPackageId: patientConsentPackageBackgroundFixture.id,
    signingPatientId: patientForConsentFixture.id,
    isActive: true,
  }

export const patientConsentPackageSignatoryBackgroundNotActiveFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 12,
    patientConsentPackageId: patientConsentPackageBackgroundFixture.id,
    signingPatientId: patientForWorksheetListFixture.id,
    isActive: false,
  }

export const patientConsentPackageSignatoryToVoidFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 13,
    patientConsentPackageId: patientConsentPackageToVoidFixture.id,
    signingPatientId: patientFemaleFixture.id,
  }

export const patientConsentPackageSignatoryToVoidSoftDeletedFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 14,
    patientConsentPackageId: patientConsentPackageToVoidFixture.id,
    signingPatientId: patientWithoutDoctorSoftDeletedFixture.id,
  }

export const patientConsentPackageSignatoryToSendReminderFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 15,
    patientConsentPackageId: patientConsentPackageForReminderFixture.id,
    signingPatientId: patientForWorksheetListFixture.id,
  }

export const patientConsentPackageSignatoryToNotSendReminderSignedFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 16,
    patientConsentPackageId: patientConsentPackageForReminderFixture.id,
    signingPatientId: patientFemaleFixture.id,
    signedDate: new DateTimeUtil().now(),
  }

export const patientConsentPackageSignatoryToNotSendReminderNotActiveFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 17,
    patientConsentPackageId: patientConsentPackageForReminderFixture.id,
    signingPatientId: patientForBackgroundInformationFixture.id,
    isActive: false,
  }

export const patientConsentPackageSignatoryBackgroundReminderFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 18,
    patientConsentPackageId: patientConsentPackageForBackgroundReminderFixture.id,
    signingPatientId: patientConsentPackageForBackgroundReminderFixture.patientId,
  }

export const patientConsentPackageSignatoryBackgroundReminderSignedFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 19,
    patientConsentPackageId: patientConsentPackageForBackgroundReminderFixture.id,
    signingPatientId: patientFemaleFixture.id,
    signedDate: new DateTimeUtil().now(),
  }

export const patientConsentPackageSignatoryForQuestionnaireFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 24,
    patientConsentPackageId: patientConsentPackageForQuestionnaireFixture.id,
    signingPatientId: patientForConsentQuestionnaireFixture.id,
    signedDate: new DateTimeUtil().now(),
  }

export const patientConsentPackageSignatoryForQuestionnairePartnerFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 25,
    patientConsentPackageId: patientConsentPackageForQuestionnaireFixture.id,
    signingPatientId: patientForConsentQuestionnairePartnerFixture.id,
    signedDate: new DateTimeUtil().now(),
  }

export const patientConsentPackageSignatoryForGetAnswersSeparatedApiFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 29,
    patientConsentPackageId: patientConsentPackageForGetAnswersSeparatedApiFixture.id,
    signingPatientId: patientForConsentMobileFixture.id,
    relationType: ConsentModuleRelationType.Patient,
  }

export const patientConsentPackageSignatoryForSignFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 30,
    patientConsentPackageId: patientConsentPackageForSignMobileFixture.id,
    signingPatientId: patientForConsentSignMobileFixture.id,
    relationType: ConsentModuleRelationType.Patient,
  }

export const patientConsentPackageSignatoryForSignPartnerFixture: Partial<PatientConsentPackageSignatory> =
  {
    id: 31,
    patientConsentPackageId: patientConsentPackageForSignMobileFixture.id,
    signingPatientId: patientForConsentSignPartnerMobileFixture.id,
    relationType: ConsentModuleRelationType.Partners,
  }
