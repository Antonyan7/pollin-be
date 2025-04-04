/* eslint-disable max-lines */
import {PatientPlanCohortIvfTaskGroup} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {
  patientPlanCohort1Fixture,
  patientPlanCohort2Fixture,
  patientPlanCohort3Fixture,
  patientPlanCohort4Fixture,
  patientPlanCohort5Fixture,
  patientPlanCohort6Fixture,
  patientPlanCohort7Fixture,
  patientPlanCohortFixture,
  spawnedPatientPlanCohortFixture,
  patientPlanCohortForCancelFixture,
  patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture,
  patientPlanCohortForTaskHistoryFixture,
  patientPlanCohortForCancelledStateFixture,
  patientPlanCohortForCheckingMaxCountFixture,
  patientPlanCohortForTestResultsComponentFixture,
  patientPlanCohortDay3FreshTransferFixture,
  patientPlanCohortForV2Fixture,
  patientPlanCohortForCompletedIVFStateFixture,
  patientPlanCohort8Fixture,
  patientPlanCohortForScanBarcodeFixture,
  patientPlanCohortDishScanFixture,
  patientPlanCohortDishScanNotAssignedFixture,
  patientPlanCohortForWitnessingChecklistFixture,
  patientPlanCohort2ForWitnessingChecklistFixture,
  patientPlanCohortForPartnerBarcodeFixture,
  patientPlanCohortDishScanNoGroupFixture,
  patientPlanCohortForOocyteCollectionFixture,
  patientPlanCohortForTaskGroupForFixture,
  patientPlanCohortDayOocytesCollectedZeroFixture,
  patientPlanCohortDay3CheckDashboardDayUpdateFixture,
  patientPlanCohortForSpermWashAndOocyteCollectedFixture,
  patientPlanCohortForEggThawFixture,
  patientPlanCohortForDiscardFixture,
  patientPlanCohortForDeleteStrawFutureFixture,
  patientPlanCohortForMiiDay1CryoFixture,
  patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture,
  patientPlanCohortForEggThawStrawSelectionVisibilityFixture,
  patientPlanCohortForEggThawStrawSelectionVisibility2Fixture,
  patientPlanCohortStrawNumberFixture,
  patientPlanCohortForStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {
  staffAuthorOfStaffNoteAndAddendumFixture,
  staffUserFixture,
} from '@libs/common/test/fixtures/staff.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)

export const patientPlanCohortIVFTaskGroup1Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 1,
  uuid: '91c31619-86e2-4655-a1aa-0cc79b838018',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: -1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), -1),
  ),
}

export const patientPlanCohortIVFTaskGroup2Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 2,
  uuid: '4c46ab47-6acd-40fa-84f1-4c782a44af52',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 0,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 0),
  ),
}

export const patientPlanCohortIVFTaskGroup3Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 3,
  uuid: '91fb09e3-beb6-4c76-831f-dbce1eb21ceb',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 1),
  ),
}
export const spawnedPatientPlanCohortIVFTaskGroupFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 63,
  uuid: '90200deb-f611-452e-8c6f-3a6cd7b57a72',
  patientPlanCohortId: spawnedPatientPlanCohortFixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(spawnedPatientPlanCohortFixture.cohortDate), 1),
  ),
}

export const patientPlanCohortIVFTaskGroup4Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 4,
  uuid: '1f1fcaf8-a946-4d26-bc91-a971e9d15ac8',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 2,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 2),
  ),
}

export const patientPlanCohortIVFTaskGroup5Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 5,
  uuid: 'd511c567-17a9-4f41-9f73-2687c5b64450',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 3,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 3),
  ),
}

export const patientPlanCohortIVFTaskGroup6Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 6,
  uuid: '8d04f5ad-bc99-438d-a19b-cdd8f75800df',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 4,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 4),
  ),
}

export const patientPlanCohortIVFTaskGroup7Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 7,
  uuid: '640bba0e-9849-4a75-acaa-d9b5ed32873b',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 5,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 5),
  ),
}

export const patientPlanCohortIVFTaskGroupForDisablingFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 93,
    uuid: '0085f96e-6955-4e0c-b1c1-9fb01a1d7a7c',
    patientPlanCohortId: patientPlanCohortFixture.id,
    day: 6,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 6),
    ),
  }

export const patientPlanCohortIVFTaskGroup8Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 8,
  uuid: 'fdc70305-6886-43a7-8019-9a87ba912571',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 6,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 6),
  ),
}

export const patientPlanCohortIVFTaskGroup9Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 9,
  uuid: '4c3c9f11-a8a4-4d5d-81b4-3797212ba67e',
  patientPlanCohortId: patientPlanCohort2Fixture.id,
  day: 7,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort2Fixture.cohortDate), 7),
  ),
}

export const patientPlanCohortIVFTaskGroup10Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 10,
  uuid: '46e59e89-6756-424a-96ea-9d1b76f41376',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: -1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), -1),
  ),
}

export const patientPlanCohortIVFTaskGroup11Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 11,
  uuid: 'b129f5fd-9c66-40fe-8c12-cdcbbba27079',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 0,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 0),
  ),
}

export const patientPlanCohortIVFTaskGroup12Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 12,
  uuid: '23dc32bd-33dc-41b8-8625-4bd0df3f9b6d',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 1),
  ),
}

export const patientPlanCohortIVFTaskGroup13Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 13,
  uuid: '15cb9e26-2291-49ca-b04a-6af5e1cf5fe0',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 2,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 2),
  ),
}

export const patientPlanCohortIVFTaskGroup14Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 14,
  uuid: '53996ca2-5b70-4a08-b440-aa79f6f1906a',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 3,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 3),
  ),
}

export const patientPlanCohortIVFTaskGroup15Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 15,
  uuid: 'a4753112-e413-4f80-ba34-28cf40f8e3ba',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 4,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 4),
  ),
}

export const patientPlanCohortIVFTaskGroup16Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 16,
  uuid: '451db01b-c86b-4ff0-9ade-7faa7a0bb50c',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 5,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 5),
  ),
}

export const patientPlanCohortIVFTaskGroup17Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 17,
  uuid: '6d783544-488c-415e-9384-43dbe35c2e5b',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 6,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 6),
  ),
}

export const patientPlanCohortIVFTaskGroup18Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 18,
  uuid: 'bcc9ee7e-a8c0-4ad0-a22a-86882bdef7ae',
  patientPlanCohortId: patientPlanCohort3Fixture.id,
  day: 7,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort3Fixture.cohortDate), 7),
  ),
}

export const patientPlanCohortIVFTaskGroup19Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 19,
  uuid: '13aec043-1839-45a4-8ec6-6ad57a32ccbe',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: -1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), -1),
  ),
}

export const patientPlanCohortIVFTaskGroup20Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 20,
  uuid: 'edcfd0bd-08b2-44a5-82ea-4889202c20c9',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 0,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 0),
  ),
}

export const patientPlanCohortIVFTaskGroup21Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 21,
  uuid: 'dbda4691-4b60-41aa-b4bd-8afeb1c8861b',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 1),
  ),
  completionPercentage: 100,
}

export const patientPlanCohortIVFTaskGroup22Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 22,
  uuid: 'e86ce50b-729f-463b-befa-5cd25f418c9e',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 2,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 2),
  ),
}

export const patientPlanCohortIVFTaskGroup23Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 23,
  uuid: '1031b8e4-0fb2-443a-8ca9-87f5f40285be',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 3,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 3),
  ),
}

export const patientPlanCohortIVFTaskGroup24Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 24,
  uuid: '676cb146-6c82-4e3c-81dd-08814fbf70c6',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 4,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 4),
  ),
}

export const patientPlanCohortIVFTaskGroup25Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 25,
  uuid: 'c75c25dc-a2e0-4bae-915f-c4fdc173ffcb',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 5,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 5),
  ),
}

export const patientPlanCohortIVFTaskGroup26Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 26,
  uuid: '7e93ccd0-cd27-4269-9b00-a4621ecdbee1',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 6,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 6),
  ),
}

export const patientPlanCohortIVFTaskGroup27Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 27,
  uuid: '060115be-7199-466f-a0b3-751aa4310fef',
  patientPlanCohortId: patientPlanCohort4Fixture.id,
  day: 7,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort4Fixture.cohortDate), 7),
  ),
}

export const patientPlanCohortIVFTaskGroup28Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 28,
  uuid: '9bade3f7-264f-4a07-a26a-2226c27d3a87',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: -1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), -1),
  ),
}

export const patientPlanCohortIVFTaskGroup29Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 29,
  uuid: 'f88f6aa0-53ed-4a50-ad07-c3d831f6b2ab',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 0,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 0),
  ),
}

export const patientPlanCohortIVFTaskGroup30Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 30,
  uuid: '5837d962-8e1e-4614-ba30-7d5c4756607a',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 1),
  ),
}

export const patientPlanCohortIVFTaskGroup31Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 31,
  uuid: '501fbc8a-371c-4bdf-83cf-7155f8737909',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 2,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 2),
  ),
}

export const patientPlanCohortIVFTaskGroup32Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 32,
  uuid: 'b998eafb-e1b3-4da6-aa7a-96535affa50e',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 3,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 3),
  ),
}

export const patientPlanCohortIVFTaskGroup33Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 33,
  uuid: '341a767c-2eae-4813-92e9-5df830ef4737',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 4,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 4),
  ),
}

export const patientPlanCohortIVFTaskGroup34Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 34,
  uuid: 'f71de7e8-123d-490b-a392-20e0f49b03ec',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 5,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 5),
  ),
}

export const patientPlanCohortIVFTaskGroup35Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 35,
  uuid: '7e8ef21d-277c-4dcb-a621-cd17f649c5d4',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 6,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 6),
  ),
}

export const patientPlanCohortIVFTaskGroup36Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 36,
  uuid: 'c65c1b1c-457b-4686-83cb-c9aa465cb17c',
  patientPlanCohortId: patientPlanCohort5Fixture.id,
  day: 7,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort5Fixture.cohortDate), 7),
  ),
}

export const patientPlanCohortIVFTaskGroup37Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 37,
  uuid: '4781d658-66e9-4bc3-9ad6-78de6fbca284',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: -1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), -1),
  ),
}

export const patientPlanCohortIVFTaskGroup38Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 38,
  uuid: '33a0aa83-c045-4b83-92f7-cc28abc83846',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 0,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 0),
  ),
}

export const patientPlanCohortIVFTaskGroup39Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 39,
  uuid: '25f2ff85-61d0-4724-9674-7271ae535256',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 1),
  ),
}

export const patientPlanCohortIVFTaskGroup40Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 40,
  uuid: '437f1937-86f7-4e52-a092-18bbd44d552d',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 2,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 2),
  ),
}

export const patientPlanCohortIVFTaskGroup41Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 41,
  uuid: 'c369ed29-0fd9-45d2-b838-4f944133b569',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 3,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 3),
  ),
}

export const patientPlanCohortIVFTaskGroup42Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 42,
  uuid: '033d045b-8bdb-461a-b304-7949deaad941',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 4,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 4),
  ),
}
export const patientPlanCohortIVFTaskGroup43Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 43,
  uuid: '69d2582c-4ec4-4f84-922a-581598a40708',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 5,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 5),
  ),
}

export const patientPlanCohortIVFTaskGroup44Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 44,
  uuid: '02548792-fa0c-4776-9faf-fb3ba6b1f36f',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 6,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 6),
  ),
}

export const patientPlanCohortIVFTaskGroup45Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 45,
  uuid: 'd5d1caf4-d9c5-4029-bb12-930d2973fbd9',
  patientPlanCohortId: patientPlanCohort6Fixture.id,
  day: 7,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort6Fixture.cohortDate), 7),
  ),
}

export const patientPlanCohortIVFTaskGroup46Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 46,
  uuid: '4d406c3b-ee04-4676-92e0-1804e33b8ec9',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: -1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), -1),
  ),
}

export const patientPlanCohortIVFTaskGroup47Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 47,
  uuid: 'da894087-22be-4bf6-8822-a184fc29e1c1',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 0,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 0),
  ),
}

export const patientPlanCohortIVFTaskGroupForFutureFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 80,
    uuid: 'f942d2b3-fe09-485e-9f3e-8c5a676761c2',
    patientPlanCohortId: patientPlanCohort8Fixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort8Fixture.cohortDate), 0),
    ),
  }

export const patientPlanCohortIVFTaskGroup48Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 48,
  uuid: '39d86f14-1603-4529-a713-afc5552b8293',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 1),
  ),
}

export const patientPlanCohortIVFTaskGroup49Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 49,
  uuid: '86fc66d3-f8e6-4b4f-8189-e98b13f40fdb',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 2,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 2),
  ),
}

export const patientPlanCohortIVFTaskGroup50Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 50,
  uuid: 'ced99a98-a935-49ac-ace8-241c268fabde',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 3,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 3),
  ),
}

export const patientPlanCohortIVFTaskGroup51Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 51,
  uuid: '911cbe4e-d031-4764-ac5e-2d8081a9aa51',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 4,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 4),
  ),
}

export const patientPlanCohortIVFTaskGroup52Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 52,
  uuid: 'c42145bf-2b8e-41d6-9c2b-8f13f4d86a1b',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 5,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 5),
  ),
}

export const patientPlanCohortIVFTaskGroup53Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 53,
  uuid: '21f41af8-711f-4052-948a-012789c8cdde',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 6,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 6),
  ),
  signedOffById: staffUserFixture.id,
  signedOffDate: dateTimeUtil.now(),
}

export const patientPlanCohortIVFTaskGroup54Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 54,
  uuid: '548cb056-ab8e-4b5d-9ac1-803b83935b9b',
  patientPlanCohortId: patientPlanCohort7Fixture.id,
  day: 7,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohort7Fixture.cohortDate), 7),
  ),
  completionPercentage: 50,
}

export const ivfTaskGroup2Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 56,
  uuid: 'c8ee875d-5827-4604-9962-cb4d1e2c5778',
  patientPlanCohortId: patientPlanCohort1Fixture.id,
  day: -1,
}

export const ivfTaskGroupForGetPatientPartnersFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 57,
  uuid: '90f1675c-a652-4ef7-94ec-08b1cfbf0704',
  patientPlanCohortId: patientPlanCohortFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 1),
  ),
  completionPercentage: 50,
  day: 5,
}
export const ivfTaskGroupForFreshTransferFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 70,
  uuid: '4727a6f9-dd41-44a4-803d-3c3a6d9d0a01',
  patientPlanCohortId: patientPlanCohortDay3FreshTransferFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(
      dateTimeUtil.toDate(patientPlanCohortDay3FreshTransferFixture.cohortDate),
      1,
    ),
  ),
  completionPercentage: 50,
  day: 3,
}

export const ivfTaskGroupForGetPatientPartnersSpawnedFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 68,
    uuid: '38e11125-333e-4aa1-b81e-aac71fc292bd',
    patientPlanCohortId: spawnedPatientPlanCohortFixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(dateTimeUtil.toDate(spawnedPatientPlanCohortFixture.cohortDate), 1),
    ),
    completionPercentage: 50,
    day: 1,
  }

export const ivfTaskGroupForGetCallPatientFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 69,
  uuid: 'e2fbf2c4-d872-4adb-98cb-d352835bd1c9',
  patientPlanCohortId: patientPlanCohortFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 1),
  ),
  completionPercentage: 50,
  day: 1,
}
export const ivfTaskGroupForGetPatientPartnersForCheckingMaxCountFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 67,
    uuid: '123f2d8d-6286-49a4-aa1f-0d98418e0de5',
    patientPlanCohortId: patientPlanCohortForCheckingMaxCountFixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(
        dateTimeUtil.toDate(patientPlanCohortForCheckingMaxCountFixture.cohortDate),
        1,
      ),
    ),
    completionPercentage: 50,
    day: 1,
  }
export const ivfTaskGroupForDay6Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 58,
  uuid: '51f898f4-0a26-4cc4-9438-581a7d19de84',
  patientPlanCohortId: patientPlanCohortFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 1),
  ),
  completionPercentage: 50,
  day: 7,
}
export const ivfTaskGroupForForIVFReportPlanComponentV3Fixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 59,
    uuid: '1b9171ae-6e31-4530-b89a-9430cf65a0dd',
    patientPlanCohortId: patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture.id,
    date: patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture.cohortDate,
    completionPercentage: 50,
    day: 0,
  }

export const ivfTaskGroupForIVFTaskHistoryFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 60,
  uuid: '1b1171bb-6e31-4530-b89a-9430cf65a0dd',
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  date: patientPlanCohortForTaskHistoryFixture.cohortDate,
  completionPercentage: 50,
  day: 0,
}

export const ivfTaskGroupForCancelledIVFFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 62,
  uuid: '08b28d22-dfe3-4965-a06b-b60364569913',
  patientPlanCohortId: patientPlanCohortForCancelFixture.id,
  date: patientPlanCohortForCancelFixture.cohortDate,
  completionPercentage: 50,
  day: 0,
}

export const ivfTaskGroupForGetPatientPartnersDay2Fixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 61,
    uuid: '7e72b040-d80a-4470-9f6d-eead14aa63b9',
    patientPlanCohortId: patientPlanCohortFixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 2),
    ),
    completionPercentage: 50,
    day: 3,
  }

export const ivfTaskGroupForCancelledStateFixtureFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 64,
  uuid: '46f1d417-1678-4588-883d-9dc9ef442c6a',
  patientPlanCohortId: patientPlanCohortForCancelledStateFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(
      dateTimeUtil.toDate(patientPlanCohortForCancelledStateFixture.cohortDate),
      0,
    ),
  ),
  completionPercentage: 50,
  day: 0,
}

export const taskGroupForCheckDisabledV1Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 66,
  uuid: '08b28d22-dfe3-4965-a06b-b60364568855',
  patientPlanCohortId: patientPlanCohortForTaskHistoryFixture.id,
  date: patientPlanCohortForCancelFixture.cohortDate,
  completionPercentage: 50,
  day: 0,
}

export const ivfTaskGroupForGetPatientEmbryoFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 90,
  uuid: '90f1675c-a652-4ef7-94ec-08b1cfbf0805',
  patientPlanCohortId: patientPlanCohortFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 2),
  ),
  completionPercentage: 50,
  day: 2,
}

export const ivfTaskGroupForPlanTypeTestResultsFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 91,
  uuid: '90f1675c-a652-4ef7-94ec-28b1cfbf0801',
  patientPlanCohortId: patientPlanCohortForTestResultsComponentFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 2),
  ),
  completionPercentage: 50,
  day: 2,
}

export const ivfTaskGroupForV2Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 92,
  uuid: '90ecb394-7ae7-4547-9470-fd68b4a522b3',
  patientPlanCohortId: patientPlanCohortForV2Fixture.id,
  date: patientPlanCohortFixture.cohortDate,
  day: 2,
  signedOffDate: null,
  signedOffById: null,
}
export const ivfTaskGroupForResetSignOffFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 96,
  uuid: '475baf5b-42b6-475f-a0f6-cf679f773e9a',
  patientPlanCohortId: patientPlanCohortForV2Fixture.id,
  date: patientPlanCohortFixture.cohortDate,
  day: 2,
  signedOffDate: dateTimeUtil.now(),
  signedOffById: staffAuthorOfStaffNoteAndAddendumFixture.id,
}

export const ivfTaskGroupForDisabledTaskGroupDay1Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 94,
  uuid: '2144af20-2367-45de-92fe-a67b45c0e455',
  patientPlanCohortId: patientPlanCohortForCompletedIVFStateFixture.id,
  date: patientPlanCohortForCompletedIVFStateFixture.cohortDate,
  day: 1,
  signedOffDate: null,
  signedOffById: null,
}

export const ivfTaskGroupForDisabledTaskGroupDay2Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 95,
  uuid: 'd6187c34-69a8-48d2-93f2-ce8c08796179',
  patientPlanCohortId: patientPlanCohortForCompletedIVFStateFixture.id,
  date: patientPlanCohortForCompletedIVFStateFixture.cohortDate,
  day: 2,
  signedOffDate: null,
  signedOffById: null,
}

export const patientPlanCohortGroupForScanBarcode1Fixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 103,
    uuid: '682c6f0c-2fdf-4729-8402-977950571ad8',
    patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
    day: 1,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.todayWithZeroTimeTZ(), -2)),
  }

export const patientPlanCohortGroupForScanBarcode2Fixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 101,
    uuid: '9b26f64c-f932-4f10-ad6e-6b74834677a6',
    patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
    day: 2,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const patientPlanCohortGroupForScanBarcode3Fixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 102,
    uuid: '2250f6db-c8d9-4b93-9465-53bd9400c415',
    patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
    day: 3,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.todayWithZeroTimeTZ(), -2)),
  }

export const patientPlanCohortDishScanGroupPrepDayFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 97,
    uuid: '91fb09e3-beb6-4c76-831f-dbce1eb21cec',
    patientPlanCohortId: patientPlanCohortDishScanFixture.id,
    day: -1,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.todayWithZeroTimeTZ(), -2)),
  }

export const patientPlanCohortDishScanGroupDay0Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 98,
  uuid: '91fb09e3-beb6-4c76-831f-dbce1eb21ced',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
  patientIdentityCardScannedById: staffUserFixture.id,
  day: 0,
  date: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.todayWithZeroTimeTZ(), 0)),
}

export const patientPlanCohortDishScanGroupDay1Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 99,
  uuid: '91fb09e3-beb6-4c76-831f-dbce1eb21cee',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
  day: 1,
  date: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.todayWithZeroTimeTZ(), 2)),
}

export const patientPlanCohortDishScanGroupNotAssignedFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 100,
    uuid: '91fb09e3-beb6-4c76-831f-dbce1eb21cef',
    patientPlanCohortId: patientPlanCohortDishScanNotAssignedFixture.id,
    day: 1,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.todayWithZeroTimeTZ(), 0)),
  }

export const patientPlanCohortGroupForWitnessingChecklistFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 104,
    uuid: '2250f6db-c8d9-4b93-9465-53bd9400c416',
    patientPlanCohortId: patientPlanCohortForWitnessingChecklistFixture.id,
    day: 3,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.todayWithZeroTimeTZ(), 0)),
  }

export const patientPlanCohort2GroupForWitnessingChecklistFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 105,
    uuid: '2250f6db-c8d9-4b93-9465-53bd9400c417',
    patientPlanCohortId: patientPlanCohort2ForWitnessingChecklistFixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const patientPlanCohortGroupForPartnerBarcodeFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 106,
    uuid: 'cfee281b-e233-48d9-8afe-07316235a8ea',
    patientPlanCohortId: patientPlanCohortForPartnerBarcodeFixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const patientPlanCohortGroupForNotRequiredDishScanFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 107,
    uuid: '2250f6db-c8d9-4b93-9465-53bd9400c418',
    patientPlanCohortId: patientPlanCohortDishScanNoGroupFixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const patientPlanCohortIvfTaskGroupOocyteCollectionFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 108,
    uuid: 'ea9515cf-71ea-4561-92bc-c3fde65c1ff7',
    patientPlanCohortId: patientPlanCohortForOocyteCollectionFixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const patientPlanCohortIvfTaskGroupOocyteCollectionWithoutWarmedFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 109,
    uuid: 'c95d77c8-93d2-4956-9454-8f037519aaa0',
    patientPlanCohortId: patientPlanCohortForTaskGroupForFixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const patientPlanCohortIvfTaskGroupWithOocytesCollectedZeroFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 110,
    uuid: '49c8c02d-e2ab-435a-9f7e-fe36c20c833d',
    patientPlanCohortId: patientPlanCohortDayOocytesCollectedZeroFixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const ivfTaskGroupForDay3CheckDashboardUpdateFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 111,
    uuid: '2d70c3bf-3efd-4296-ae26-39ec8bfa27dc',
    patientPlanCohortId: patientPlanCohortDay3CheckDashboardDayUpdateFixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(
        dateTimeUtil.toDate(patientPlanCohortDay3CheckDashboardDayUpdateFixture.cohortDate),
        1,
      ),
    ),
    completionPercentage: 50,
    day: 4,
  }

export const ivfTaskGroupForSpermWashAndOocyteCollectedFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 112,
    uuid: 'd09382db-1e32-4904-87f7-21643cbf73fa',
    patientPlanCohortId: patientPlanCohortForSpermWashAndOocyteCollectedFixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 1),
    ),
    completionPercentage: 50,
    day: 5,
  }

export const ivfTaskGroupForEggThawFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 113,
  uuid: 'f3abb3c7-67bd-436f-8ca1-cbe2573bc77b',
  patientPlanCohortId: patientPlanCohortForEggThawFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate), 1),
  ),
  completionPercentage: 50,
  day: 1,
}

export const ivfTaskGroupForStrawDeletionFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 114,
  uuid: '5c9f8cff-24a8-484c-ac48-235267b5fd03',
  patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(
      dateTimeUtil.toDate(patientPlanCohortForDeleteStrawFutureFixture.cohortDate),
      1,
    ),
  ),
  completionPercentage: 50,
  day: 0,
}

export const patientPlanCohortGroupForDiscardScanBarcodeFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 115,
    uuid: 'd1b6891b-d3d1-40b2-96d4-301c1b776681',
    patientPlanCohortId: patientPlanCohortForDiscardFixture.id,
    day: 0,
    date: dateTimeUtil.formatDateYMD(dateTimeUtil.todayWithZeroTimeTZ()),
  }

export const ivfTaskGroupForMiiDay1CryoFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 116,
  uuid: 'ed62a345-a113-4608-b407-4e8f2a4a0122',
  patientPlanCohortId: patientPlanCohortForMiiDay1CryoFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortForMiiDay1CryoFixture.cohortDate), 1),
  ),
  completionPercentage: 50,
  day: 1,
}
export const ivfTaskGroupForMiiDay1CryoMaaxDiscardedValidationFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 117,
    uuid: '71081f57-21af-41a9-b843-f5ea1b6ab900',
    patientPlanCohortId: patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(
        dateTimeUtil.toDate(
          patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture.cohortDate,
        ),
        1,
      ),
    ),
    completionPercentage: 50,
    day: 2,
  }

export const ivfTaskGroupForEggThawStrawSelectionFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 118,
  uuid: '1848acb4-f18e-4c4f-a138-0d16e55ec743',
  patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibilityFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(
      dateTimeUtil.toDate(patientPlanCohortForEggThawStrawSelectionVisibilityFixture.cohortDate),
      1,
    ),
  ),
  completionPercentage: 50,
  day: 0,
}

export const ivfTaskGroupForEggThawStrawSelection2Fixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 119,
    uuid: '75b8519d-cad7-4dee-a572-df5bca04d303',
    patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibility2Fixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(
        dateTimeUtil.toDate(patientPlanCohortForEggThawStrawSelectionVisibility2Fixture.cohortDate),
        1,
      ),
    ),
    completionPercentage: 50,
    day: 0,
  }

export const ivfTaskGroupForStrawNumberFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 120,
  uuid: '95cf1b10-1adb-44f1-b08f-77b2a68f157b',
  patientPlanCohortId: patientPlanCohortStrawNumberFixture.id,
  date: dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(patientPlanCohortStrawNumberFixture.cohortDate), 1),
  ),
  completionPercentage: 50,
  day: 5,
}

export const ivfTaskGroupForStrawSelectionOocyteCollectionFixture: Partial<PatientPlanCohortIvfTaskGroup> =
  {
    id: 121,
    uuid: 'cb08188a-2d50-4a73-8e72-7e09f0d1521d',
    patientPlanCohortId: patientPlanCohortForStrawSelectionOocyteCollectionFixture.id,
    date: dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(
        dateTimeUtil.toDate(patientPlanCohortForStrawSelectionOocyteCollectionFixture.cohortDate),
        1,
      ),
    ),
    completionPercentage: 50,
    day: 5,
  }
