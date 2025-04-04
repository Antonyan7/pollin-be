import {
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskEmbryoGroupPhoto,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhoto,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  patientPlanCohort1Fixture,
  patientPlanCohort2Fixture,
  patientPlanCohortDay3CheckDashboardDayUpdateFixture,
  patientPlanCohortDay3FreshTransferFixture,
  patientPlanCohortDayOocytesCollectedZeroFixture,
  patientPlanCohortFixture,
  patientPlanCohortForCheckingMaxCountFixture,
  patientPlanCohortForCompletedIVFStateEggFreezingFixture,
  patientPlanCohortForCompletedIVFStateFixture,
  patientPlanCohortForCompleteFixture,
  patientPlanCohortForCompletionFixture,
  patientPlanCohortForCompletionForStatsFixture,
  patientPlanCohortForDiscardFixture,
  patientPlanCohortForDeleteStrawFutureFixture,
  patientPlanCohortForEggThawFixture,
  patientPlanCohortForOocyteCollectionFixture,
  patientPlanCohortForSpermWashAndOocyteCollectedFixture,
  patientPlanCohortForTaskGroupForFixture,
  patientPlanCohortForTaskHistoryFixture,
  patientPlanCohortForV2Fixture,
  spawnedPatientPlanCohortFixture,
  patientPlanCohortForMiiDay1CryoFixture,
  patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture,
  patientPlanCohortForEggThawStrawSelectionVisibilityFixture,
  patientPlanCohortForEggThawStrawSelectionVisibility2Fixture,
  patientPlanCohortStrawNumberFixture,
  patientPlanCohortForStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {OocyteQuality} from '@libs/data-layer/apps/clinic-ivf/enums'
import {ivfTaskGroupForIVFTaskHistoryFixture} from './patient-plan-cohort-ivf-task-group.fixture'
import {ivfUnitOptionFixture, ivfUnitOptionHighfieldFixture} from './ivf-unit-option.fixture'
import {staffEmbryologistFixture, staffUserFixture} from './staff.fixture'

export const ivfTaskDetailsFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 1,
  uuid: 'f10acf4f-235b-43e7-9f4b-27fea743ea1e',
  patientPlanCohortId: patientPlanCohortFixture.id,
  day3EmbryosMoreThan6Cells: 20,
  oocytesCollected: 24,
  oocytesWarmed: 3,
  journeyWitness: 'old witness',
  oocyteCollectionEmbryologistId: staffEmbryologistFixture.id,
}
export const newIvfTaskDetailsFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 10,
  uuid: '57056891-667d-4e22-b798-950bbf94d079',
  patientPlanCohortId: patientPlanCohortForCheckingMaxCountFixture.id,
  oocytesDisabled: false,
}
export const ivfTaskDetailsForGetDataFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 5,
  uuid: '4fe65f98-53e7-41c2-b232-f4e95d40afcc',
  patientPlanCohortId: patientPlanCohortForTaskGroupForFixture.id,
  oocytesCollected: 10,
  oocytesWarmed: null,
  totalOocytes: 12,
  matureOocytes: 1,
  immatureOocytes: 3,
  degenOocytes: 2,
  abnormalOocytes: 3,
}

export const ivfTaskDetailsForSpawnFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 6,
  uuid: '82b5a245-d153-4c4a-8f4e-da4187e7bda4',
  patientPlanCohortId: patientPlanCohort1Fixture.id,
  oocytesCollected: 10,
  totalOocytes: 12,
  matureOocytes: 1,
  immatureOocytes: 3,
  degenOocytes: 2,
  abnormalOocytes: 3,
}

export const ivfTaskDetailsForIVFHistoryFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 7,
  uuid: 'f10acf4f-235b-43e7-9f4b-37faa241ea1e',
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  oocytesCollected: null,
  oocytesWarmed: 55,
  spermWashFinalConcentration: 11,
  spermWashFinalConcentrationUnitId: ivfUnitOptionFixture.id,
  spermWashInitialConcentration: 17,
  spermWashInitialConcentrationUnitId: ivfUnitOptionHighfieldFixture.id,
  spermWashFinalMotility: 12,
  spermWashInitialMotility: 13,
  oocytesSurvived: 0,
  matureOocytes: 22,
  immatureOocytes: 23,
  degenOocytes: 3,
  abnormalOocytes: 21,
  icsiSplit: 50,
  icsiMatureOocytesInjected: 2,
  oocytesInseminated: 5,
  picsiImmatureOocytes: 82,
  picsiMatureOocytesInjected: 83,
  matureOocytesToCry: 13,
  oocytesDiscarded: 2,
  oocyteAssessmentsGranular: 1,
  oocyteAssessmentsSer: 2,
  oocyteAssessmentsComment: 'old comment',
  oocyteQuality: OocyteQuality.Excellent,
  day3EmbryosMoreThan6Cells: 1,
  day3EmbryosLessThan6Cells: 2,
  day3EmbryosArrested: 3,
  day3EmbryosAverageFrag: 1,
  day3AssistedHatching: false,
  oocyteCollectionEmbryologistId: staffUserFixture.id,

  matureOocyteGroups: [
    {
      uuid: 'f10acf4f-235b-43e7-8f4b-37faa241ea1e',
      patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
      day: 10,
      title: 'photo-pre-2.jps',
      photoPath: 'path2',
    },
  ] as PatientPlanCohortIvfTaskMatureOocyteGroupPhoto[],
  embryoGroupPhotos: [
    {
      uuid: 'f10acf4f-235b-43e7-9f4b-37faa241ea1e',
      patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
      day: ivfTaskGroupForIVFTaskHistoryFixture.day,
      title: 'photo-pre-1.jps',
      photoPath: 'path',
    },
    {
      uuid: 'f10acf4f-235b-43e7-8f4b-37faa241ea1e',
      patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
      day: 10,
      title: 'photo-pre-2.jps',
      photoPath: 'path2',
    },
  ] as PatientPlanCohortIvfTaskEmbryoGroupPhoto[],
}

export const ivfTaskForCompletionDetailsFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 8,
  uuid: 'ec694c8a-e8da-4f50-aab8-1f65a1d206bf',
  patientPlanCohortId: patientPlanCohortForCompletionFixture.id,
  day3EmbryosMoreThan6Cells: 1,
  day3EmbryosLessThan6Cells: 2,
  day3EmbryosArrested: 3,
  day5Arrested: 4,
  day6Arrested: 5,
  day7Discarded: 7,
}

export const ivfTaskForCompletionStatsDetailsFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 9,
  uuid: '55be1d55-322f-4ca6-8d3c-3121a377fe66',
  patientPlanCohortId: patientPlanCohortForCompletionForStatsFixture.id,
  day3EmbryosMoreThan6Cells: 2,
  day3EmbryosLessThan6Cells: 2,
  day3EmbryosArrested: 3,
  day5Arrested: 0,
  day6Arrested: 0,
  day7Discarded: 1,
}

export const ivfTaskForCompletionStatsDetailsEggFreezingFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 13,
    uuid: 'cdfe0aae-5c32-4cad-af8a-838be976d7f0',
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateEggFreezingFixture.id,
    matureOocytesToCry: 10,
    immatureOocytes: 2,
    matureOocytes: 4,
    degenOocytes: 2,
    abnormalOocytes: 4,
  }

export const ivfTaskForSpawnedFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 11,
  uuid: 'b9c351eb-8f37-4768-afb5-449989ee0a19',
  patientPlanCohortId: spawnedPatientPlanCohortFixture.id,
  day3EmbryosMoreThan6Cells: 2,
  day3EmbryosLessThan6Cells: 2,
  day3EmbryosArrested: 3,
  day5Arrested: 0,
  day6Arrested: 0,
  day7Discarded: 1,
}

export const ivfTaskForCohort2Fixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 12,
  uuid: '553214fb-604f-47f5-9d30-0d7a91aba7c7',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  immatureOocytes: 2,
}
export const ivfTaskForCohortForNewGroupFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 15,
  uuid: '7b81b62d-e9b7-4277-b1e6-97a2f632feff',
  patientPlanCohortId: patientPlanCohortForV2Fixture.id,
  immatureOocytes: 2,
}
export const ivfTaskForDay3FreshFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 14,
  uuid: '9ecabbdc-2fc6-4ae6-8dc5-77d922fda8a7',
  patientPlanCohortId: patientPlanCohortDay3FreshTransferFixture.id,
  totalOocytes: 12,
  matureOocytes: 1,
  immatureOocytes: 3,
}

export const patientPlanCohortForCompletedIVFStateDetailsFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 16,
    uuid: 'f6e246af-64c3-4933-8494-7b9b09446acc',
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateFixture.id,
  }

export const patientPlanCohortForCompletionIVFDetailsFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 17,
    uuid: 'f6e246af-64c3-4933-8494-7b9b09446ac2',
    patientPlanCohortId: patientPlanCohortForCompleteFixture.id,
  }

export const ivfTaskDetailsWithZeroOocyteCollectedFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 18,
    uuid: 'a163f9fc-ecc9-4599-8733-4a79b0b9b5c1',
    patientPlanCohortId: patientPlanCohortForOocyteCollectionFixture.id,
    day3EmbryosMoreThan6Cells: 20,
    oocytesCollected: 0,
    journeyWitness: 'old witness',
    oocyteCollectionEmbryologistId: staffEmbryologistFixture.id,
  }
export const ivfTaskDetailsOocyteCollectedZeroFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 19,
  uuid: 'c2ca1c74-2852-4044-9820-3793a3d348e0',
  patientPlanCohortId: patientPlanCohortDayOocytesCollectedZeroFixture.id,
  oocytesCollected: 0,
}

export const ivfTaskDetailsOocyteCollectedZeroForSpermWashFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 20,
    uuid: '37483a27-bbb4-446d-8c4d-9adbb350df4c',
    patientPlanCohortId: patientPlanCohortForSpermWashAndOocyteCollectedFixture.id,
    oocytesCollected: 0,
  }

export const ivfTaskForDay3CheckDashboardDayUpdateFreshFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 21,
    uuid: 'e4ef1624-01dd-4c9c-949d-f97643f856bf',
    patientPlanCohortId: patientPlanCohortDay3CheckDashboardDayUpdateFixture.id,
    totalOocytes: 12,
    matureOocytes: 1,
    immatureOocytes: 3,
  }

export const ivfTaskDetailsForEggThawFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 22,
  uuid: '87e34d0a-99c0-4f74-b250-d6a0c18fdd05',
  patientPlanCohortId: patientPlanCohortForEggThawFixture.id,
  eggsWarmed: 12,
  eggsSurvived: 1,
}

export const ivfTaskDetailsDiscardDishFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 23,
  uuid: '0bfe01e4-340c-426f-89c3-e9cd5222915d',
  patientPlanCohortId: patientPlanCohortForDiscardFixture.id,
  eggsWarmed: 12,
  eggsSurvived: 1,
}

export const ivfTaskDetailsForStrawDeleteFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 24,
  uuid: 'dcf5da8c-d884-4bf5-9d27-1eed73501ade',
  patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
  totalOocytes: 12,
  matureOocytes: 1,
  immatureOocytes: 3,
  day5Arrested: 1,
  day3EmbryosMoreThan6Cells: 10,
  day3EmbryosLessThan6Cells: 20,
}

export const ivfTaskDetailsMiiDay1CryoFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 25,
  uuid: '457b7afe-d54f-4a65-bb46-41a8172d744c',
  patientPlanCohortId: patientPlanCohortForMiiDay1CryoFixture.id,
  day3EmbryosMoreThan6Cells: 20,
  matureOocytes: 22,
  immatureOocytes: 23,
  oocytesCollected: 24,
  oocytesDiscarded: 2,
  matureOocytesToCry: 2,
  oocytesWarmed: 3,
  journeyWitness: 'old witness',
  oocyteCollectionEmbryologistId: staffEmbryologistFixture.id,
}

export const ivfTaskDetailsMiiDay1CryoMaxDiscardedValidationFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 26,
    uuid: '406035b3-c98a-4a43-a075-6b6e3ca846e5',
    patientPlanCohortId: patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture.id,
    day3EmbryosMoreThan6Cells: 20,
    matureOocytes: 22,
    immatureOocytes: 22,
    oocytesCollected: 24,
    oocytesDiscarded: 2,
    matureOocytesToCry: 2,
    oocytesWarmed: 3,
    journeyWitness: 'old witness',
    oocyteCollectionEmbryologistId: staffEmbryologistFixture.id,
  }

export const ivfTaskDetailsForEggThawStrawSelectionFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 27,
    uuid: '92fa745d-7cbc-4691-b198-e99e672bcccf',
    patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibilityFixture.id,
    eggsWarmed: 12,
    eggsSurvived: 1,
  }

export const ivfTaskDetailsForEggThawStrawSelection2Fixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 28,
    uuid: 'c8687880-dffa-4eb0-b461-fca42dad6103',
    patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibility2Fixture.id,
    eggsWarmed: 12,
    eggsSurvived: 1,
  }

export const ivfTaskDetailsStrawNumberFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: 29,
  uuid: 'e8fdccb5-bf2f-4e44-90fc-9ee5c6d1ad15',
  patientPlanCohortId: patientPlanCohortStrawNumberFixture.id,
  eggsWarmed: 12,
  eggsSurvived: 1,
}
export const ivfTaskDetailsStrawSelectionOocyteCollectionFixture: Partial<PatientPlanCohortIvfTaskDetails> =
  {
    id: 30,
    uuid: '9ee5849e-8251-4646-a80b-55f91753ad12',
    patientPlanCohortId: patientPlanCohortForStrawSelectionOocyteCollectionFixture.id,
    oocytesCollected: 24,
    oocytesWarmed: 3,
    oocytesSurvived: 0,
  }
