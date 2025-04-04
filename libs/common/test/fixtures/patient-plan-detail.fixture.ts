import {DateTimeUtil} from '@libs/common'
import {PatientPlanDetail} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  patientPlanEPLFixture,
  patientPlanForDetailsAlertFixture,
  patientPlanForIVFTaskHistoryFixture,
  patientPlanForMilestoneReportPeriodFixture,
  patientPlanForMobileComponentsDetailsV2Fixture,
  patientPlanForMobileDetailsV2Fixture,
  patientPlanForMobileDetailsV2WithAddonsFixture,
  patientPlanForOrderedFixture,
  patientPlanForPlanCartV2WithAddonsFixture,
  patientPlanForPlanCartV2WithTestTypesFixture,
  patientPlanForPlanTypesV2Fixture,
  patientPlanForPlanTypesV2OlderFixture,
  patientPlanForPrimingWorkSheetChecklistFixture,
  patientPlanForReadyToOrderFixture,
  patientPlanManualPushFixture,
  patientPlanToChangeEggAnalysisFixture,
  patientPlanToManuallySetCohortDateFixture,
  patientPlanToNotReportPeriodFixture,
  patientPlanToReportPeriodV2Fixture,
  patientPlanToUpdatePeriodFixture,
  patientPlanV2CancelledFixture,
  patientPlanV2CompletedFixture,
  patientPlanV2ForCartFixture,
  patientPlanV2ForCartWithoutCycleDaysFixture,
  patientPlanV2ForCycleDetailsFixture,
  patientPlanV2ForCycleDetailsWithoutFollicleNumberFixture,
  patientPlanV2ForGetGroupTaskFixture,
  patientPlanV2ForGetGroupTaskForCheckingMaxCountFixture,
  patientPlanV2ForOrderFirstFixture,
  patientPlanV2ToUpdateFixture,
  patientPlanV2WithExpectedDayFixture,
  patientPlanV3CancelledFixture,
  patientPlanV3CompletedFixture,
  patientPlanV3ToUpdateFertilizationFixture,
  patientPlanV3ToUpdateFixture,
  patientPlanWithLinkedInventoryCardFixture,
  patientPlanForEggThawFixture,
  patientPlanForConsentGenerationWithAllAddonsFixture,
  patientPlanWithoutPatientConsentModulesFixture,
  patientPlanWith1PartnerDifferentRolesFixture,
  patientPlanForPlansBackgroundPriceFixture,
  patientPlanForEggThawStrawSelectionVisibilityFixture,
  patientPlanCartConfirmWithUpdatedPricesNoOhipFixture,
  patientPlanSplitPaymentSuccessFixture,
} from './patient-plan.fixture'
import {
  patientClinicEmrKimberlySFixture,
  patientClinicEmrLeChuFixture,
  patientForDocumentGenerationFixture,
  patientForIVFTasks2Fixture,
  patientForPlanGenerationPartnerFixture,
  patientForProfileHighlightFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {EggStatus, PlanMockCycleType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {OBCareType} from '@libs/data-layer/apps/plan/enums/epp-plan.enum'
import {
  patientPlanForIVF2Fixture,
  patientPlanForIVFFixture,
} from '@libs/common/test/fixtures/patient-plan-ivf.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientPlanDetailOlderFixture: Partial<PatientPlanDetail> = {
  id: 1,
  patientPlanId: patientPlanForPlanTypesV2OlderFixture.id,
  expectedDayOneOfPeriod: '2029-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2029-06-02'),
}

export const patientPlanDetailFixture: Partial<PatientPlanDetail> = {
  id: 2,
  patientPlanId: patientPlanForPlanTypesV2Fixture.id,
  expectedDayOneOfPeriod: '2030-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2030-06-02'),
}

export const patientPlanDetailToUpdateFixture: Partial<PatientPlanDetail> = {
  id: 3,
  patientPlanId: patientPlanV2ToUpdateFixture.id,
  expectedDayOneOfPeriod: '2012-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2012-06-02'),
  follicleNumber: '1221',
  geneticTestingFileUrl: 'oldFileURL',
  geneticTestingFileName: 'oldFileName',
  lastMenstrualPeriodDate: '2012-12-12',
}

export const patientPlanDetailToReportPeriodV2Fixture: Partial<PatientPlanDetail> = {
  id: 4,
  patientPlanId: patientPlanToReportPeriodV2Fixture.id,
}

export const patientPlanDetailForMobileDetailsV2Fixture: Partial<PatientPlanDetail> = {
  id: 5,
  patientPlanId: patientPlanForMobileDetailsV2Fixture.id,
}

export const patientPlanDetailForCartFixture: Partial<PatientPlanDetail> = {
  id: 6,
  patientPlanId: patientPlanV2ForCartFixture.id,
}

export const patientPlanDetailForCartWithoutCycleDaysFixture: Partial<PatientPlanDetail> = {
  id: 7,
  patientPlanId: patientPlanV2ForCartWithoutCycleDaysFixture.id,
}

export const patientPlanDetailV2CancelledFixture: Partial<PatientPlanDetail> = {
  id: 8,
  patientPlanId: patientPlanV2CancelledFixture.id,
}

export const patientPlanDetailV2CompletedFixture: Partial<PatientPlanDetail> = {
  id: 9,
  patientPlanId: patientPlanV2CompletedFixture.id,
}

export const patientPlanDetailV2ForCycleDetailsFixture: Partial<PatientPlanDetail> = {
  id: 10,
  patientPlanId: patientPlanV2ForCycleDetailsFixture.id,
  follicleNumber: '1-3',
}

export const patientPlanV2DetailForCycleDetailsWithoutFollicleNumberFixture: Partial<PatientPlanDetail> =
  {
    id: 11,
    patientPlanId: patientPlanV2ForCycleDetailsWithoutFollicleNumberFixture.id,
  }

export const patientPlanDetailV2ForOrderFirstFixture: Partial<PatientPlanDetail> = {
  id: 12,
  patientPlanId: patientPlanV2ForOrderFirstFixture.id,
}

export const patientPlanDetailForMobileDetailsV2WithAddonsFixture: Partial<PatientPlanDetail> = {
  id: 13,
  freshEmbryoTransferNumber: 3,
  patientPlanId: patientPlanForMobileDetailsV2WithAddonsFixture.id,
}

export const patientPlanDetailForPlanCartV2WithAddonsFixture: Partial<PatientPlanDetail> = {
  id: 14,
  freshEmbryoTransferNumber: 3,
  patientPlanId: patientPlanForPlanCartV2WithAddonsFixture.id,
}

export const patientPlanDetailV2WithExpectedDayFixture: Partial<PatientPlanDetail> = {
  id: 15,
  patientPlanId: patientPlanV2WithExpectedDayFixture.id,
}

export const patientPlanDetailForGetGroupTaskFixture: Partial<PatientPlanDetail> = {
  id: 16,
  patientPlanId: patientPlanV2ForGetGroupTaskFixture.id,
  freshEmbryoTransferNumber: 13,
  uterusContributorId: patientForIVFTasks2Fixture.id,
  eggsToThaw: 2,
  eggStatus: EggStatus.FrozenDonor,
  eggDonorId: '222',
}

export const patientPlanDetailForPlanCartV2WithoutAddonsFixture: Partial<PatientPlanDetail> = {
  id: 17,
  freshEmbryoTransferNumber: 3,
  patientPlanId: patientPlanForPlanCartV2WithTestTypesFixture.id,
}

export const patientPlanDetailForManualPushFixture: Partial<PatientPlanDetail> = {
  id: 18,
  freshEmbryoTransferNumber: 3,
  patientPlanId: patientPlanManualPushFixture.id,
}

export const patientPlanDetailForPrimingWorkSheetChecklistFixture: Partial<PatientPlanDetail> = {
  id: 19,
  patientPlanId: patientPlanForPrimingWorkSheetChecklistFixture.id,
}

export const patientPlanDetailForComponentsFixture: Partial<PatientPlanDetail> = {
  id: 20,
  endometrialAssessmentOther: 'test other',
  follicleNumber: '5',
  fertilisationDirectiveSplitIVFPercentages: 75,
  patientPlanId: patientPlanForMobileComponentsDetailsV2Fixture.id,
}

export const patientPlanDetailForDetailsFixture: Partial<PatientPlanDetail> = {
  id: 21,
  patientPlanId: patientPlanForDetailsAlertFixture.id,
}

export const patientPlanDetailForDetailsOrderFixture: Partial<PatientPlanDetail> = {
  id: 22,
  patientPlanId: patientPlanForOrderedFixture.id,
}

export const patientPlanDetailV3CancelledFixture: Partial<PatientPlanDetail> = {
  id: 23,
  patientPlanId: patientPlanV3CancelledFixture.id,
}

export const patientPlanDetailV3CompletedFixture: Partial<PatientPlanDetail> = {
  id: 24,
  patientPlanId: patientPlanV3CompletedFixture.id,
}

export const patientPlanDetailToUpdateV3Fixture: Partial<PatientPlanDetail> = {
  id: 25,
  patientPlanId: patientPlanV3ToUpdateFixture.id,
  expectedDayOneOfPeriod: '2012-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2012-06-02'),
  geneticTestingFileUrl: 'oldFileURL',
  geneticTestingFileName: 'oldFileName',
  lastMenstrualPeriodDate: '2012-12-12',
  freshEmbryoTransferComment: 'old comment',
  freshEmbryoTransferNumber: 2,
  oocytePatientId: patientClinicEmrLeChuFixture.id,
  uterusContributorId: patientClinicEmrKimberlySFixture.id,
  linkedPatientPlanId: patientPlanV3CompletedFixture.id,
  alert: 'planAlertToremove',
  ovulationDate: '2012-02-02',
  dayOneOfCycle: '2012-02-03',
  estimatedDateOfConfinement: '2012-01-03',
  obUltrasound: OBCareType.Specialized,
  follicleNumber: '1-3',
  mockCycleType: PlanMockCycleType.Medicated,
  eggsToThaw: 2,
  eggStatus: EggStatus.FrozenDonor,
  additionalInfo: 'info',
  endometrialAssessmentOther: '1235fsd',
}

export const patientPlanDetailToManuallySetCohortDateFixture: Partial<PatientPlanDetail> = {
  id: 26,
  patientPlanId: patientPlanToManuallySetCohortDateFixture.id,
  expectedDayOneOfPeriod: '2012-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2012-06-02'),
  follicleNumber: '1221',
  geneticTestingFileUrl: 'oldFileURL',
  geneticTestingFileName: 'oldFileName',
  lastMenstrualPeriodDate: '2012-12-12',
}

export const patientPlanDetailToNotReportPeriodFixture: Partial<PatientPlanDetail> = {
  id: 27,
  patientPlanId: patientPlanToNotReportPeriodFixture.id,
}

export const patientPlanDetailForReadyToOrderFixture: Partial<PatientPlanDetail> = {
  id: 28,
  patientPlanId: patientPlanForReadyToOrderFixture.id,
}

export const patientPlanDetailForIVFTaskHistoryFixture: Partial<PatientPlanDetail> = {
  id: 29,
  patientPlanId: patientPlanForIVFTaskHistoryFixture.id,
}

export const patientPlanDetailForFertilizationFixture: Partial<PatientPlanDetail> = {
  id: 30,
  patientPlanId: patientPlanV3ToUpdateFertilizationFixture.id,
}

export const patientPlanDetailEPLFixture: Partial<PatientPlanDetail> = {
  id: 31,
  patientPlanId: patientPlanEPLFixture.id,
}

export const patientPlanDetailToUpdatePeriodFixture: Partial<PatientPlanDetail> = {
  id: 32,
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2029-06-02'),
  patientPlanId: patientPlanToUpdatePeriodFixture.id,
}

export const patientPlanDetailWithIncludingInventoryCardFixture: Partial<PatientPlanDetail> = {
  id: 33,
  patientPlanId: patientPlanWithLinkedInventoryCardFixture.id,
  expectedDayOneOfPeriod: '2012-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2012-06-02'),
  geneticTestingFileUrl: 'oldFileURL',
  geneticTestingFileName: 'oldFileName',
  lastMenstrualPeriodDate: '2012-12-12',
  freshEmbryoTransferComment: 'old comment',
  freshEmbryoTransferNumber: 2,
  oocytePatientId: patientClinicEmrLeChuFixture.id,
  uterusContributorId: patientClinicEmrKimberlySFixture.id,
  linkedPatientPlanId: patientPlanV3CompletedFixture.id,
  alert: 'planAlertToremove',
  ovulationDate: '2012-02-02',
  dayOneOfCycle: '2012-02-03',
  estimatedDateOfConfinement: '2012-01-03',
  obUltrasound: OBCareType.Specialized,
  follicleNumber: '1-3',
  mockCycleType: PlanMockCycleType.Medicated,
  eggsToThaw: 2,
  eggStatus: EggStatus.FrozenDonor,
  additionalInfo: 'info',
  endometrialAssessmentOther: '1235fsd',
}
export const patientPlanDetailForInjectionAssignmentFixture: Partial<PatientPlanDetail> = {
  id: 34,
  patientPlanId: patientPlanForIVFFixture.id,
  expectedDayOneOfPeriod: '2030-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2030-06-02'),
}

export const patientPlanDetailForErrorSecondCohortCreatingFixture: Partial<PatientPlanDetail> = {
  id: 35,
  patientPlanId: patientPlanV2ForGetGroupTaskForCheckingMaxCountFixture.id,
  expectedDayOneOfPeriod: '2030-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2030-06-02'),
}

export const patientPlanDetailForMilestoneReportPeriodFixture: Partial<PatientPlanDetail> = {
  id: 37,
  patientPlanId: patientPlanForMilestoneReportPeriodFixture.id,
  reportedDayOneOfPeriod: dateTimeUtil.toDate(`2024-06-17T15:00:00`),
}

export const patientPlanDetailForDoubleWitnessFixture: Partial<PatientPlanDetail> = {
  id: 38,
  patientPlanId: patientPlanForIVF2Fixture.id,
  expectedDayOneOfPeriod: '2030-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2030-06-02'),
}

export const patientPlanDetailToChangeEggAnalysisFixture: Partial<PatientPlanDetail> = {
  id: 39,
  patientPlanId: patientPlanToChangeEggAnalysisFixture.id,
}

export const patientPlanDetailForEggThawFixture: Partial<PatientPlanDetail> = {
  id: 40,
  patientPlanId: patientPlanForEggThawFixture.id,
  eggsToBeThawed: 2,
}

export const patientPlanDetailForConsentGenerationWithAllAddonsFixture: Partial<PatientPlanDetail> =
  {
    id: 41,
    patientPlanId: patientPlanForConsentGenerationWithAllAddonsFixture.id,
    uterusContributorId: patientForDocumentGenerationFixture.id,
    oocytePatientId: patientForProfileHighlightFixture.id,
    freshEmbryoTransferNumber: 2,
  }

export const patientPlanDetailWithoutPatientConsentModulesFixture: Partial<PatientPlanDetail> = {
  id: 42,
  patientPlanId: patientPlanWithoutPatientConsentModulesFixture.id,
}

export const patientPlanDetailWith1PartnerDifferentRolesFixture: Partial<PatientPlanDetail> = {
  id: 43,
  patientPlanId: patientPlanWith1PartnerDifferentRolesFixture.id,
  uterusContributorId: patientForPlanGenerationPartnerFixture.id,
  oocytePatientId: patientForPlanGenerationPartnerFixture.id,
}

export const patientPlanDetailForPlansBackgroundPriceFixture: Partial<PatientPlanDetail> = {
  id: 44,
  freshEmbryoTransferNumber: 3,
  patientPlanId: patientPlanForPlansBackgroundPriceFixture.id,
}

export const patientPlanDetailForEggThawStrawSelectionFixture: Partial<PatientPlanDetail> = {
  id: 45,
  patientPlanId: patientPlanForEggThawStrawSelectionVisibilityFixture.id,
  eggsToBeThawed: 2,
}

export const patientPlanDetailForCartConfirmWithUpdatedPricesNoOhipFixture: Partial<PatientPlanDetail> =
  {
    id: 46,
    patientPlanId: patientPlanCartConfirmWithUpdatedPricesNoOhipFixture.id,
  }

export const patientPlanDetailForSplitPaymentSuccessFixture: Partial<PatientPlanDetail> = {
  id: 47,
  patientPlanId: patientPlanSplitPaymentSuccessFixture.id,
}
