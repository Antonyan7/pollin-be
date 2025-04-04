import {PatientConsentPackage} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientConsentRemindersFixture,
  patientEmailVerifiedFixture,
  patientFemaleFixture,
  patientForConsentFixture,
  patientForConsentMobileFixture,
  patientForConsentQuestionnaireFixture,
  patientForConsentSignMobileFixture,
  patientToPushPlanMilestoneV2Fixture,
} from './patient.fixture'
import {ConsentPackageSourceType, ConsentPackageStatus} from '@libs/data-layer/apps/users/enum'
import {
  patientPlanFixture,
  patientPlanForConsentMobileCanceledAfterActivatedFixture,
  patientPlanForConsentMobileFixture,
  patientPlanReadyToOrderV2Fixture,
  patientPlanToReportPeriodV2Fixture,
} from './patient-plan.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(String(commonConfig.DEFAULT_TIME_ZONE))

export const notFoundPatientConsentPackageFixtureUUID: string =
  '165dcf57-2a3f-47d2-8790-c776fa2e3211'

export const patientConsentPackageFixture: Partial<PatientConsentPackage> = {
  id: 1,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa2e3211',
  patientId: patientEmailVerifiedFixture.id,
  status: ConsentPackageStatus.Completed,
  patientPlanId: patientPlanReadyToOrderV2Fixture.id,
  title: 'patientConsentPackageFixture',
  sentDate: dateTimeUtil.toDate('2050-03-08T13:00:00'),
}

export const patientConsentPackageVoidedFixture: Partial<PatientConsentPackage> = {
  id: 2,
  uuid: 2 + '651cf57-2a3f-47d0-8790-c776fa2e3211',
  patientId: patientEmailVerifiedFixture.id,
  fileURL: 'patientConsentPackageVoidedURL',
  status: ConsentPackageStatus.Voided,
  voidReason: 'reasonForPatientConsentPackageVoidedFixture',
  sentDate: dateTimeUtil.toDate('2050-03-08T12:00:00'),
  title: 'patientConsentPackageVoidedFixture',
}

export const patientConsentPackagePaperFixture: Partial<PatientConsentPackage> = {
  id: 3,
  uuid: 3 + '652cf53-2a3f-47d0-8790-c776gg1e1313',
  patientId: patientEmailVerifiedFixture.id,
  status: ConsentPackageStatus.Paper,
  title: 'patientConsentPackagePaperFixture',
}

// Upcoming milestone
export const patientConsentPackageForMobileUpcomingFixture: Partial<PatientConsentPackage> = {
  id: 5,
  uuid: 5 + '651cf57-2a3f-47d0-8790-c776gg1e1313',
  patientId: patientForConsentMobileFixture.id,
  status: ConsentPackageStatus.Incomplete,
  title: 'patientConsentPackageForMobileUpcomingFixture title',
}

// PastMilestone
export const patientConsentPackageForMobilePastFixture: Partial<PatientConsentPackage> = {
  id: 6,
  uuid: 6 + '651cf57-2a3f-47d0-8790-c776gg1e1313',
  patientId: patientForConsentMobileFixture.id,
  status: ConsentPackageStatus.PendingPartnerCompletion,
}

export const patientConsentPackageWithPlanFixture: Partial<PatientConsentPackage> = {
  id: 7,
  uuid: 7 + '651cf57-2a3f-47d0-8790-c776gg1e1313',
  patientId: patientForConsentMobileFixture.id,
  status: ConsentPackageStatus.Voided,
  patientPlanId: patientPlanForConsentMobileFixture.id,
  title: 'patientConsentPackageWithPlanFixture title',
}

export const patientConsentPackageWithPlanButCanceledAfterActivatedFixture: Partial<PatientConsentPackage> =
  {
    id: 8,
    uuid: 8 + '651cf57-2a3f-47d0-8790-c776gg1e1313',
    patientId: patientForConsentMobileFixture.id,
    status: ConsentPackageStatus.Voided,
    patientPlanId: patientPlanForConsentMobileCanceledAfterActivatedFixture.id,
    title: 'patientConsentPackageWithPlanButCanceledAfterActivatedFixture title plan',
  }

//also have signature for partner
export const patientConsentPackageWith2ModulesAndPartnerFixture: Partial<PatientConsentPackage> = {
  id: 10,
  uuid: '86034cb3-b813-4612-8628-38b597c91c8f',
  patientId: patientForConsentMobileFixture.id,
  status: ConsentPackageStatus.PendingPartnerCompletion,
  title: 'Consent Package',
}

// Creating in test
export const patientConsentPackageForReportPeriodBlockByConsentFixture: Partial<PatientConsentPackage> =
  {
    id: 11,
    uuid: 11 + '51cf57-2a3f-47d0-8790-c776fa1a2313',
    patientId: patientToPushPlanMilestoneV2Fixture.id,
    status: ConsentPackageStatus.Incomplete,
    patientPlanId: patientPlanToReportPeriodV2Fixture.id,
  }

//background api
export const patientConsentPackageBackgroundFixture: Partial<PatientConsentPackage> = {
  id: 12,
  uuid: 12 + '51cf57-2a3f-47d0-8790-c776fa1a2313',
  patientId: patientForConsentFixture.id,
  status: ConsentPackageStatus.Completed,
  title: 'patientConsentPackage',
  patientPlanId: patientPlanFixture.id,
  fileURL: 'fileURL',
  sourceType: ConsentPackageSourceType.SentByClinicUser,
  voidedDate: dateTimeUtil.toDate('2050-03-08T13:00:00'),
}

export const patientConsentPackageToVoidFixture: Partial<PatientConsentPackage> = {
  id: 13,
  uuid: 13 + 'e98576-981c-4173-aee6-5dc2cce71232',
  patientId: patientFemaleFixture.id,
  status: ConsentPackageStatus.Completed,
  title: 'patientConsentPackageToVoidFixture title',
}

export const patientConsentPackageToNotVoidFixture: Partial<PatientConsentPackage> = {
  id: 14,
  uuid: 14 + 'e98576-981c-4173-aee6-5dc2cce71232',
  patientId: patientFemaleFixture.id,
  status: ConsentPackageStatus.Paper,
  title: 'patientConsentPackageToNotVoidFixture title',
}

export const patientConsentPackageForReminderFixture: Partial<PatientConsentPackage> = {
  id: 15,
  uuid: 15 + 'e98576-981c-4173-aee6-5dc2cce71232',
  patientId: patientFemaleFixture.id,
  status: ConsentPackageStatus.Incomplete,
  title: 'patientConsentPackageForReminderFixture',
}

export const patientConsentPackageForBackgroundReminderFixture: Partial<PatientConsentPackage> = {
  id: 16,
  uuid: 16 + 'e98576-981c-4173-aee6-5dc2cce71232',
  patientId: patientConsentRemindersFixture.id,
  status: ConsentPackageStatus.Voided,
  title: 'patientConsentPackageForBackgroundReminderFixture',
}

export const patientConsentPackageForQuestionnaireFixture: Partial<PatientConsentPackage> = {
  id: 18,
  uuid: '39aaf055-9016-475a-9e2b-8d33cc62e257',
  patientId: patientForConsentQuestionnaireFixture.id,
  status: ConsentPackageStatus.Incomplete,
  title: 'Consent Packagedd',
}

export const patientConsentPackageForGetAnswersSeparatedApiFixture: Partial<PatientConsentPackage> =
  {
    id: 20,
    uuid: '5e47fba0-014d-4bae-afae-4bda2ee23a91',
    patientId: patientForConsentMobileFixture.id,
  }

export const patientConsentPackageForSignMobileFixture: Partial<PatientConsentPackage> = {
  id: 23,
  uuid: '4d9b7a7d-8878-4452-a51a-f86e2cb02119',
  patientId: patientForConsentSignMobileFixture.id,
  status: ConsentPackageStatus.Incomplete,
  title: 'Consent Package',
}
