/* eslint-disable max-lines */
import {PatientPlanCohortIvfTaskSummary} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfTaskToDayFixture,
  ivfTaskToDay2Fixture,
  ivfTaskToDay4Fixture,
  ivfTaskToDayZeroPICSIFixture,
  ivfTaskToDayZeroIcsiInjectionFixture,
  ivfTaskToDayForVerifyHepBcHivFixture,
  ivfTaskToDayOocytesCollectionFixture,
  ivfTaskPostStrippingFixture,
  ivfTaskMatureOocytePhotoFixture,
  ivfTaskDay5CheckFixture,
  ivfTaskDay3CheckFixture,
  ivfTaskDay6CheckFixture,
  ivfTaskToDay3Fixture,
  ivfTaskFertilizationCheckFixture,
  ivfTaskEmbryoPhotoFixture,
  ivfTaskEmbryoFreezingOocytesFixture,
  ivfTaskMatureOocytePhotoDay2Fixture,
  ivfTaskPrintLabelFixture,
  ivfTaskDay7Fixture,
  ivfTaskDayFreezeEmrbyoFixture,
  ivfTaskPostStrippingForCheckMaxCountFixture,
  ivfTaskDayCallPatientFixture,
  ivfTaskDaySetupWorksheetFixture,
  ivfTaskEmbryoDay2Fixture,
  ivfTaskJourneyWitnessFixture,
  ivfTaskDishInventoryFixture,
  ivfTaskPartnerDishInventoryFixture,
  ivfTaskToDayOocytesCollection2Fixture,
  ivfTaskDaySignOffInseminationIVFFixture,
  ivfTaskDaySignOffChangeOverFixture,
  ivfTaskToDayOocytesCollectionWithZeroFixture,
  ivfTaskDay3CheckDashboardDayUpdateFixture,
  ivfTaskToDayOocytesCollectionForSpermWashFixture,
  ivfTaskToDayOocytesCollectionForSpermWashWithZeroOocyteCollectedFixture,
  ivfTaskToDayEggThawFixture,
  ivfTaskToDayMiiDay1CryoStrawDeletionFixture,
  ivfTaskToDayForDay5CheckExpandedEmbryoDeletionFixture,
  ivfTaskToDayForMiiDay1Fixture,
  ivfTaskToDayForPIDLabelFixture,
  ivfTaskToDayForMiiDay1ForDiscardedValidationFixture,
  ivfTaskToDayEggThawStrawSelectionVisibilityFixture,
  ivfTaskToDayOocyteCollectionStrawSelectionFixture,
} from '@libs/common/test/fixtures/ivf-task-to-day.fixture'
import {
  patientPlanCohort7Fixture,
  patientPlanCohort2Fixture,
  patientPlanCohortFixture,
  patientPlanCohort4Fixture,
  patientPlanCohort1Fixture,
  patientPlanCohortForTaskHistoryFixture,
  spawnedPatientPlanCohortFixture,
  patientPlanCohortForCompleteFixture,
  patientPlanCohortForCheckingMaxCountFixture,
  patientPlanCohortDay3FreshTransferFixture,
  patientPlanCohortForCompletedIVFStateFixture,
  patientPlanCohort8Fixture,
  patientPlanCohortForOocyteCollectionFixture,
  patientPlanCohortForTaskGroupForFixture,
  patientPlanCohortForV2Fixture,
  patientPlanCohortDayOocytesCollectedZeroFixture,
  patientPlanCohortForSpermWashAndOocyteCollectedFixture,
  patientPlanCohortDay3CheckDashboardDayUpdateFixture,
  patientPlanCohortForEggThawFixture,
  patientPlanCohortForDiscardFixture,
  patientPlanCohortForDeleteStrawFutureFixture,
  patientPlanCohortForMiiDay1CryoFixture,
  patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture,
  patientPlanCohortForEggThawStrawSelectionVisibility2Fixture,
  patientPlanCohortForEggThawStrawSelectionVisibilityFixture,
  patientPlanCohortStrawNumberFixture,
  patientPlanCohortForStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {
  ivfTaskGroup2Fixture,
  ivfTaskGroupForDay6Fixture,
  ivfTaskGroupForForIVFReportPlanComponentV3Fixture,
  ivfTaskGroupForGetPatientEmbryoFixture,
  ivfTaskGroupForGetCallPatientFixture,
  ivfTaskGroupForGetPatientPartnersDay2Fixture,
  ivfTaskGroupForGetPatientPartnersFixture,
  ivfTaskGroupForGetPatientPartnersForCheckingMaxCountFixture,
  ivfTaskGroupForGetPatientPartnersSpawnedFixture,
  ivfTaskGroupForIVFTaskHistoryFixture,
  patientPlanCohortIVFTaskGroup21Fixture,
  patientPlanCohortIVFTaskGroup3Fixture,
  patientPlanCohortIVFTaskGroup47Fixture,
  patientPlanCohortIVFTaskGroup54Fixture,
  spawnedPatientPlanCohortIVFTaskGroupFixture,
  taskGroupForCheckDisabledV1Fixture,
  ivfTaskGroupForFreshTransferFixture,
  ivfTaskGroupForDisabledTaskGroupDay1Fixture,
  ivfTaskGroupForDisabledTaskGroupDay2Fixture,
  ivfTaskGroupForResetSignOffFixture,
  patientPlanCohortIVFTaskGroupForFutureFixture,
  patientPlanCohortIvfTaskGroupOocyteCollectionFixture,
  patientPlanCohortIvfTaskGroupOocyteCollectionWithoutWarmedFixture,
  ivfTaskGroupForV2Fixture,
  patientPlanCohortIvfTaskGroupWithOocytesCollectedZeroFixture,
  ivfTaskGroupForSpermWashAndOocyteCollectedFixture,
  ivfTaskGroupForDay3CheckDashboardUpdateFixture,
  ivfTaskGroupForEggThawFixture,
  patientPlanCohortGroupForDiscardScanBarcodeFixture,
  ivfTaskGroupForStrawDeletionFixture,
  ivfTaskGroupForMiiDay1CryoFixture,
  ivfTaskGroupForMiiDay1CryoMaaxDiscardedValidationFixture,
  ivfTaskGroupForEggThawStrawSelection2Fixture,
  ivfTaskGroupForEggThawStrawSelectionFixture,
  ivfTaskGroupForStrawNumberFixture,
  ivfTaskGroupForStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort-ivf-task-group.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {staffAuthorOfStaffNoteAndAddendumFixture} from '@libs/common/test/fixtures/staff.fixture'
import {patientNoteVerifyHepBcHivFixture} from './patient-note.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const ivfTaskSummaryFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 1,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca726',
  IVFTaskToDayId: ivfTaskToDay2Fixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummary2Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 2,
  uuid: 'c67b0da0-bb7b-4fc3-8cde-faeb2d6d5700',
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroup2Fixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummary3Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 4,
  uuid: 'a5f49e97-6e77-4c9f-bd75-80c9f1cb1a37',
  IVFTaskToDayId: ivfTaskToDay4Fixture.id,
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortIVFTaskGroup54Fixture.id,
  signedOffDate: dateTimeUtil.now(),
  signedOffById: staffAuthorOfStaffNoteAndAddendumFixture.id,
}

export const ivfTaskSummary4Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 5,
  uuid: 'f90b2b91-3a34-4e02-bd90-3b5b2e6b1a44',
  IVFTaskToDayId: ivfTaskToDay4Fixture.id,
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortIVFTaskGroup54Fixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForInseminationIVFFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 6,
  uuid: 'd9a71136-7377-4bcb-99c5-7c669f3138f9',
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForPICSIFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 7,
  uuid: '58854a93-1ee5-47af-8a4a-1b4ea9e11990',
  IVFTaskToDayId: ivfTaskToDayZeroPICSIFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForIcsiInjectionFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 8,
  uuid: '262fe617-46f5-42c8-8007-b6db3507cf81',
  IVFTaskToDayId: ivfTaskToDayZeroIcsiInjectionFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForVerifyHepBcHivFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 15,
  uuid: '010ac3cb6ec6407ca88bfd5cb1eadb5d',
  IVFTaskToDayId: ivfTaskToDayForVerifyHepBcHivFixture.id,
  patientNoteId: patientNoteVerifyHepBcHivFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForMiiDay1CryoFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 10,
  uuid: 'c805df08-1a11-4876-8bba-5ba865581bd4',
  IVFTaskToDayId: ivfTaskToDay4Fixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForMiiDay1CryoSpawnedFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 52,
    uuid: '7e25b732-c39a-4128-8ad7-17f2b32c2522',
    IVFTaskToDayId: ivfTaskToDay4Fixture.id,
    patientPlanCohortId: spawnedPatientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersSpawnedFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForHeaders1ForDay0Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 11,
  uuid: '05c21741ca3344d2b1c697ec4ffeea47',
  IVFTaskToDayId: ivfTaskToDayZeroIcsiInjectionFixture.id,
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortIVFTaskGroup47Fixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForHeaders2ForDay0Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 12,
  uuid: '922b69e323e84b83b3d5d9a40dc2c5fb',
  IVFTaskToDayId: ivfTaskToDayZeroPICSIFixture.id,
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortIVFTaskGroup47Fixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForFutureCohortForDay0Fixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 80,
    uuid: '80070da3-856b-4a8e-8b55-b7160a5cf5e9',
    IVFTaskToDayId: ivfTaskToDayZeroPICSIFixture.id,
    patientPlanCohortId: patientPlanCohort8Fixture.id,
    patientPlanCohortIvfTaskGroupId: patientPlanCohortIVFTaskGroupForFutureFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForHeaders2ForDay1Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 13,
  uuid: '858ae4e3e9e24cc99b92f54e76b26c1e',
  IVFTaskToDayId: ivfTaskToDayZeroPICSIFixture.id,
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortIVFTaskGroup3Fixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForHeaders3ForDay1Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 14,
  uuid: 'f13de42b-eb1a-4079-8118-1b699dc9b145',
  IVFTaskToDayId: ivfTaskToDayZeroPICSIFixture.id,
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortIVFTaskGroup21Fixture.id,
  signedOffDate: dateTimeUtil.now(),
  signedOffById: staffAuthorOfStaffNoteAndAddendumFixture.id,
}

export const ivfTaskSummaryForOocytesCollectionFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 16,
  uuid: 'c805df08-1a11-4876-8bba-5ba865582cd4',
  IVFTaskToDayId: ivfTaskToDayOocytesCollectionFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForPostStrippingFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 17,
  uuid: 'c805df08-2a11-5876-8bba-5ba865582cd4',
  IVFTaskToDayId: ivfTaskPostStrippingFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForCheckMaxCountFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 51,
  uuid: '3d484d01-2be2-4157-aed2-35f0c7d6b91a',
  IVFTaskToDayId: ivfTaskPostStrippingForCheckMaxCountFixture.id,
  patientPlanCohortId: patientPlanCohortForCheckingMaxCountFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersForCheckingMaxCountFixture.id,
  signedOffDate: null,
  signedOffById: null,
}
export const ivfTaskSummaryForSpermWashFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 18,
  uuid: 'b805df08-2a11-5876-8bba-5ba865582cd4',
  IVFTaskToDayId: ivfTaskToDay3Fixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForMatureOocytesPhotoFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 19,
    uuid: 'a805df08-3a11-5876-8bba-5ba865582cd4',
    IVFTaskToDayId: ivfTaskMatureOocytePhotoFixture.id,
    patientPlanCohortId: patientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForDay5Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 20,
  uuid: 'f96c11a9-1e69-48df-9e8f-74c6fc4f4fb0',
  IVFTaskToDayId: ivfTaskDay5CheckFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForDay3Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 21,
  uuid: '5a4474fe-b3af-4c1b-97c4-d7a66b811f25',
  IVFTaskToDayId: ivfTaskDay3CheckFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForDay3FreshTransferFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 85,
  uuid: '63add496-ff5a-4de2-ae51-b52a8be76e70',
  IVFTaskToDayId: ivfTaskDay3CheckFixture.id,
  patientPlanCohortId: patientPlanCohortDay3FreshTransferFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForFreshTransferFixture.id,
  disabledAt: null,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForDishInventoryFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 89,
  uuid: '63add496-ff5a-4de2-ae51-b52a8be76e71',
  IVFTaskToDayId: ivfTaskDishInventoryFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForFreshTransferFixture.id,
  disabledAt: null,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForDay6Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 22,
  uuid: 'e2f56a19-d646-44a8-8668-f0b2e658a9af',
  IVFTaskToDayId: ivfTaskDay6CheckFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForDay6Fixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForFertilisationCheckFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 24,
    uuid: '8e1b1fff-2eed-4afd-8223-e6ed61f9b926',
    IVFTaskToDayId: ivfTaskFertilizationCheckFixture.id,
    patientPlanCohortId: patientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForEmbryoPhotoFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 25,
  uuid: '919f5597-9f8c-48ae-8b59-1e3ea06e0170',
  IVFTaskToDayId: ivfTaskEmbryoPhotoFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForFreezingOocytesFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 26,
  uuid: 'da2dc6c9-6d67-4359-8630-ac69cbdf1f48',
  IVFTaskToDayId: ivfTaskEmbryoFreezingOocytesFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForPostStrippingIVFReportFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 27,
    uuid: 'd2b36fe6-68cd-42ab-a49d-897eb5a75875',
    IVFTaskToDayId: ivfTaskPostStrippingFixture.id,
    patientPlanCohortId: patientPlanCohort1Fixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForForIVFReportPlanComponentV3Fixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForIVFTaskHistoryFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 28,
  uuid: 'a2b36fe6-68cd-42ab-a49d-897eb5b75875',
  IVFTaskToDayId: ivfTaskPostStrippingFixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryTaskHistoryWithoutChangesFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 29,
    uuid: 'b2b36fe6-68cd-42ab-a49d-897eb5b75875',
    IVFTaskToDayId: ivfTaskPostStrippingFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryTaskHistoryOocyteCollectionFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 30,
    uuid: 'a2b36fe6-12ca-42ab-a49d-897eb5b75875',
    IVFTaskToDayId: ivfTaskToDayOocytesCollectionFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryTaskHistorySpermWashFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 31,
  uuid: 'a2b36fe5-12ca-42ab-a49d-897eb5b75875',
  IVFTaskToDayId: ivfTaskToDay3Fixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryTaskHistoryPostStrippingFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 32,
    uuid: 'a2b36fe6-12ca-22ab-a49d-897eb5b75875',
    IVFTaskToDayId: ivfTaskPostStrippingFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryTaskHistoryOocyteGroupPhotoFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 33,
    uuid: 'a2b3aae6-12ca-22ab-a49d-897eb5b75875',
    IVFTaskToDayId: ivfTaskMatureOocytePhotoFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryTaskHistoryIcsiInjectionFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 34,
    uuid: 'a333aae6-12ca-22ab-b49d-897eb5b75875',
    IVFTaskToDayId: ivfTaskToDayZeroIcsiInjectionFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryTaskHistoryOocytesInseminationnFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 35,
    uuid: 'a333aae6-12ca-22ab-c49d-837bb5b75875',
    IVFTaskToDayId: ivfTaskToDayFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryTaskHistoryPicsiFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 36,
  uuid: 'a333bbe2-12ca-22ab-c49d-837bb5b75875',
  IVFTaskToDayId: ivfTaskToDayZeroPICSIFixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryTaskHistoryMiiDay1Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 37,
  uuid: 'a333bbe2-12ca-32ac-c50d-837bb5b75875',
  IVFTaskToDayId: ivfTaskToDay4Fixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryTaskHistoryEmbryoGroupPhotoFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 40,
    uuid: 'b333bab2-12ca-32ac-c49d-237bb5b75875',
    IVFTaskToDayId: ivfTaskEmbryoPhotoFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryInjectionAssessmentFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 41,
  uuid: 'b343bcb3-12ca-32ac-c49d-237bb5b75875',
  IVFTaskToDayId: ivfTaskToDay2Fixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryHistoryDay3CheckFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 42,
  uuid: 'b353bcb3-12ca-32aa-c49d-537bb5b75875',
  IVFTaskToDayId: ivfTaskDay3CheckFixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryForMatureOocytesPhoto2Fixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 43,
    uuid: '318f7c91-2d71-4963-b9bd-de4c39a255cc',
    IVFTaskToDayId: ivfTaskMatureOocytePhotoDay2Fixture.id,
    patientPlanCohortId: patientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersDay2Fixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForOptionalMatureOocytePhotoFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 44,
    uuid: '15929680-09f1-46be-9fcf-fb552026e640',
    IVFTaskToDayId: ivfTaskMatureOocytePhotoFixture.id,
    patientPlanCohortId: patientPlanCohort1Fixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroup2Fixture.id,
  }

export const ivfTaskSummaryForPrintLabelFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 45,
  uuid: '10f8dad0-8df0-4ee5-8440-a517293e421d',
  IVFTaskToDayId: ivfTaskPrintLabelFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForFreezeEmbryoFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 48,
  uuid: 'a3ced1bd-af98-4ea0-8f51-444a4483e802',
  IVFTaskToDayId: ivfTaskDayFreezeEmrbyoFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  signedOffDate: null,
  signedOffById: null,
}
export const ivfTaskSummaryForPrintLabelForSpawnedFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 46,
    uuid: '42d22891-0d00-4d26-8964-a0dcfe805c81',
    IVFTaskToDayId: ivfTaskPrintLabelFixture.id,
    patientPlanCohortId: spawnedPatientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: spawnedPatientPlanCohortIVFTaskGroupFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForPrintLabelForCancelledFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 50,
    uuid: 'a1138fab-0875-47a3-bbaa-fd34512db66d',
    IVFTaskToDayId: ivfTaskPrintLabelFixture.id,
    patientPlanCohortId: spawnedPatientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: spawnedPatientPlanCohortIVFTaskGroupFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryHistoryDay7CheckFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 47,
  uuid: 'b353bcb3-12ca-32aa-c49d-537ab5a75875',
  IVFTaskToDayId: ivfTaskDay7Fixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryForCompletionStatusFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 49,
  uuid: 'ee6cac6a-1353-4663-8786-d761436ef37f',
  IVFTaskToDayId: ivfTaskDay7Fixture.id,
  patientPlanCohortId: patientPlanCohortForCompleteFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryTaskDisabledAtCheckHistoryIcsiInjectionFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 60,
    uuid: 'a2b3aae6-12ca-22ab-a49d-897eb5b7756',
    IVFTaskToDayId: ivfTaskMatureOocytePhotoFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: taskGroupForCheckDisabledV1Fixture.id,
  }

export const ivfTaskSummaryForDisabledAtCheckFertilizationICSIFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 56,
    uuid: 'a333aae6-12ca-22ab-b49d-897eb5b7758',
    IVFTaskToDayId: ivfTaskToDayZeroIcsiInjectionFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: taskGroupForCheckDisabledV1Fixture.id,
    disabledAt: dateTimeUtil.now(),
  }
export const ivfTaskSummaryForDisabledAtCheckIVFTaskHistoryFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 57,
    uuid: 'a2b36fe6-68cd-42ab-a49d-897eb5b77759',
    IVFTaskToDayId: ivfTaskPostStrippingFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: taskGroupForCheckDisabledV1Fixture.id,
  }

export const ivfTaskSummaryTaskDisabledAtCheckHistoryWithoutChangesFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 58,
    uuid: 'b2b36fe6-68cd-42ab-a49d-897eb5b77760',
    IVFTaskToDayId: ivfTaskPostStrippingFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: taskGroupForCheckDisabledV1Fixture.id,
  }

export const ivfTaskSummaryTaskDisabledAtCheckHistoryOocyteCollectionFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 59,
    uuid: 'a2b36fe6-12ca-42ab-a49d-897eb5b77761',
    IVFTaskToDayId: ivfTaskToDayOocytesCollectionFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: taskGroupForCheckDisabledV1Fixture.id,
  }
export const ivfTaskSummaryHistoryFertilizationCheckFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 55,
    uuid: 'b3b43cb3-12ca-32aa-c49d-537ab5a75875',
    IVFTaskToDayId: ivfTaskFertilizationCheckFixture.id,
    patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
  }

export const ivfTaskSummaryForCallPatientFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 70,
  uuid: '2c07e04a-ec1a-4421-92f7-9a5275cb91d2',
  IVFTaskToDayId: ivfTaskDayCallPatientFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetCallPatientFixture.id,
}

export const ivfTaskSummarySetupWorksheetFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 71,
  uuid: '2c07e22a-ac1a-4421-92f7-9a5275cb91d2',
  IVFTaskToDayId: ivfTaskDaySetupWorksheetFixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryVerifyHepBcHivFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 72,
  uuid: '2c07e22a-bc1a-4421-22f7-2a5275cb91d2',
  IVFTaskToDayId: ivfTaskToDayForVerifyHepBcHivFixture.id,
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForIVFTaskHistoryFixture.id,
}

export const ivfTaskSummaryForChackFreezingEmbryosFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 73,
    uuid: '318f7c91-2d71-4963-b9bd-de4c39a278ff',
    IVFTaskToDayId: ivfTaskEmbryoDay2Fixture.id,
    patientPlanCohortId: patientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientEmbryoFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForJourneyWitnessFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 84,
  uuid: 'a2f56a19-d646-24a8-8668-f2b2e652a9af',
  IVFTaskToDayId: ivfTaskJourneyWitnessFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
}

export const ivfTaskSummaryForDisabledTaskGroupDay1Fixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 86,
    uuid: 'babf918c-e22f-4e02-b250-b4c22175943d',
    IVFTaskToDayId: ivfTaskDaySetupWorksheetFixture.id,
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForDisabledTaskGroupDay1Fixture.id,
    disabledAt: dateTimeUtil.now(),
  }

export const ivfTaskSummaryForDisabledTaskGroupDay2Fixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 87,
    uuid: '4bbe23ab-2ed6-4b79-b629-3838d507eff5',
    IVFTaskToDayId: ivfTaskMatureOocytePhotoDay2Fixture.id,
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForDisabledTaskGroupDay2Fixture.id,
  }

export const ivfTaskSummaryForResetSignOffFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 88,
  uuid: '5c481cdb-7c50-48b2-9621-b01496826723',
  IVFTaskToDayId: ivfTaskDay3CheckFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForResetSignOffFixture.id,
}

export const ivfTaskSummaryForPartnerDishInventoryFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 90,
    uuid: '5a4474fe-b3af-4c1b-97c4-d7a66b811f26',
    IVFTaskToDayId: ivfTaskPartnerDishInventoryFixture.id,
    patientPlanCohortId: patientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForDishInventorySubmitFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 91,
    uuid: '5a4474fe-b3af-4c1b-97c4-d7a66b811f27',
    IVFTaskToDayId: ivfTaskDishInventoryFixture.id,
    patientPlanCohortId: patientPlanCohortFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  }

export const ivfTaskSummaryForOocyteCollection2Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 92,
  uuid: 'c95d77c8-94d2-4756-9454-8f037519aaa0',
  IVFTaskToDayId: ivfTaskToDayOocytesCollection2Fixture.id,
  patientPlanCohortId: patientPlanCohortForOocyteCollectionFixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortIvfTaskGroupOocyteCollectionFixture.id,
}

export const ivfTaskSummaryForOocyteCollection3Fixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 93,
  uuid: 'cb92e657-a8db-4dd6-87fe-bd586ba1c799',
  IVFTaskToDayId: ivfTaskToDayOocytesCollection2Fixture.id,
  patientPlanCohortId: patientPlanCohortForTaskGroupForFixture.id,
  patientPlanCohortIvfTaskGroupId:
    patientPlanCohortIvfTaskGroupOocyteCollectionWithoutWarmedFixture.id,
}

export const ivfTaskSummaryForSignOffInseminationIVFFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 94,
    uuid: '32b5a09e-3b75-4fb9-a162-39b74d0ee4ff',
    IVFTaskToDayId: ivfTaskDaySignOffInseminationIVFFixture.id,
    patientPlanCohortId: patientPlanCohortForV2Fixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForV2Fixture.id,
    disabledAt: dateTimeUtil.now(),
  }

export const ivfTaskSummaryForSignOffChangeOverFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 95,
  uuid: '49c8c02d-e2ab-435a-9f7e-fe36c20c833d',
  IVFTaskToDayId: ivfTaskDaySignOffChangeOverFixture.id,
  patientPlanCohortId: patientPlanCohortForV2Fixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForV2Fixture.id,
  disabledAt: null,
}
export const ivfTaskSummaryForOocyteCollectionWithZeroFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 96,
    uuid: 'c2ca1c74-2852-4044-9820-3793a3d348e0',
    IVFTaskToDayId: ivfTaskToDayOocytesCollectionWithZeroFixture.id,
    patientPlanCohortId: patientPlanCohortDayOocytesCollectedZeroFixture.id,
    patientPlanCohortIvfTaskGroupId:
      patientPlanCohortIvfTaskGroupWithOocytesCollectedZeroFixture.id,
    disabledAt: null,
  }

export const ivfTaskSummaryForSpermWashWithoutUnitsFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 97,
    uuid: '1d265ad1-2d46-472a-bfab-65c665dc2a60',
    IVFTaskToDayId: ivfTaskToDayOocytesCollectionForSpermWashFixture.id,
    patientPlanCohortId: patientPlanCohortForSpermWashAndOocyteCollectedFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForSpermWashAndOocyteCollectedFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }
export const ivfTaskSummaryForSpermWashWithoutUnitsAndWithZeroOocyteCollectedFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 98,
    uuid: '9d5c2178-70b1-46ff-a79c-614e529d28b5',
    IVFTaskToDayId: ivfTaskToDayOocytesCollectionForSpermWashWithZeroOocyteCollectedFixture.id,
    patientPlanCohortId: patientPlanCohortForSpermWashAndOocyteCollectedFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForSpermWashAndOocyteCollectedFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForDay3CheckDashboardUpdatesFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 99,
    uuid: '4e7b3a16-7167-4d28-8866-301f9edfead3',
    IVFTaskToDayId: ivfTaskDay3CheckDashboardDayUpdateFixture.id,
    patientPlanCohortId: patientPlanCohortDay3CheckDashboardDayUpdateFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForDay3CheckDashboardUpdateFixture.id,
    disabledAt: dateTimeUtil.now(),
    signedOffDate: null,
    signedOffById: null,
  }
export const ivfTaskSummaryForEggThawFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 100,
  uuid: '25b3a991-2773-4394-858a-28f1bcd054ce',
  IVFTaskToDayId: ivfTaskToDayEggThawFixture.id,
  patientPlanCohortId: patientPlanCohortForEggThawFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForEggThawFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForMiiDay1CryoForDeleteStrawFutureFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 101,
    uuid: '61866deb-d38b-45e9-94e2-3cf2b70a1699',
    IVFTaskToDayId: ivfTaskToDayMiiDay1CryoStrawDeletionFixture.id,
    patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForStrawDeletionFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForDay5CheckExpandedEmbryoDeletionFutureFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 102,
    uuid: '65315f19-67ba-40e6-ac25-af68045e9fcb',
    IVFTaskToDayId: ivfTaskToDayForDay5CheckExpandedEmbryoDeletionFixture.id,
    patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForStrawDeletionFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForDiscardDishFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 103,
  uuid: '9d7b203f-e7d5-48b5-aaaf-704298a2e8f1',
  IVFTaskToDayId: ivfTaskDishInventoryFixture.id,
  patientPlanCohortId: patientPlanCohortForDiscardFixture.id,
  patientPlanCohortIvfTaskGroupId: patientPlanCohortGroupForDiscardScanBarcodeFixture.id,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForPIDLabelFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 104,
  uuid: 'ab223e20-729b-436a-b0ca-a27accaae026',
  IVFTaskToDayId: ivfTaskToDayForPIDLabelFixture.id,
  patientPlanCohortId: patientPlanCohortFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForFreshTransferFixture.id,
  disabledAt: null,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskSummaryForMiiDay1CryoMatureOocyteValidationFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 106,
    uuid: '425480ba-2456-47b7-b05b-452ae6ab637c',
    IVFTaskToDayId: ivfTaskToDayForMiiDay1Fixture.id,
    patientPlanCohortId: patientPlanCohortForMiiDay1CryoFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForMiiDay1CryoFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForMiiDay1CryoMaxDiscardedValidaationFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 105,
    uuid: 'cde5a56d-60d8-4605-96d3-94915e341dd6',
    IVFTaskToDayId: ivfTaskToDayForMiiDay1ForDiscardedValidationFixture.id,
    patientPlanCohortId: patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForMiiDay1CryoMaaxDiscardedValidationFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForEggThawStrawSelectionVisibilityFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 107,
    uuid: '28020a38-6696-4c8b-a409-c074cc2b4b14',
    IVFTaskToDayId: ivfTaskToDayEggThawStrawSelectionVisibilityFixture.id,
    patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibilityFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForEggThawStrawSelectionFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForEggThawStrawSelectionVisibility2Fixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 108,
    uuid: '034728de-4604-4478-9488-3d44624c0286',
    IVFTaskToDayId: ivfTaskToDayEggThawStrawSelectionVisibilityFixture.id,
    patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibility2Fixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForEggThawStrawSelection2Fixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForMiiDay1CryoStrawNumberFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 109,
    uuid: '81c63ee7-5e27-41e9-bd88-b43888cab9e6',
    IVFTaskToDayId: ivfTaskToDay4Fixture.id,
    patientPlanCohortId: patientPlanCohortStrawNumberFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForStrawNumberFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }

export const ivfTaskSummaryForStrawSelectionOocyteCollectedFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 110,
    uuid: 'cfe3a0f8-b05b-427d-85d9-2a7419537029',
    IVFTaskToDayId: ivfTaskToDayOocyteCollectionStrawSelectionFixture.id,
    patientPlanCohortId: patientPlanCohortForStrawSelectionOocyteCollectionFixture.id,
    patientPlanCohortIvfTaskGroupId: ivfTaskGroupForStrawSelectionOocyteCollectionFixture.id,
    signedOffDate: null,
    signedOffById: null,
  }
