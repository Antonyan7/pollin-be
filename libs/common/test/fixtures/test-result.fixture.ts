/* eslint-disable max-lines */
import {
  patientPartnerForProfileWithInvalidHighlightFixture,
  partnerPatientForProfileTestResultsFixture,
  patientForProfileTestResultsFixture,
  testTypeFixture,
  testPanelSemenAnalysisFixture,
  testTypeSemenCultureFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  testPanelFixture,
  appointmentWithTestResultsFixture,
  appointmentWithTestResultsNonDominantFixture,
  testTypeBloodGroupScreenFixture,
  patientForTestResultHistory,
  appointmentForUltrasoundFollGetDetailToPrefillFixture,
  appointmentForUltrasoundDay3Fixture,
  appointmentForUltrasoundDay3LessDataFixture,
  appointmentForUltrasoundFollFixture,
  appointmentForUltrasoundFollLessDataFixture,
  appointmentForUltrasoundSonohysterogramFixture,
  appointmentForUltrasoundFollOldFixture,
  appointmentForUltrasoundReviewedReleasedFixture,
  appointmentForUltrasoundOnMobileFixture,
  appointmentForStimSheetNotIUIFixture,
  appointmentForCryoCreateVials,
  testTypeForObUltrasoundFixture,
  serviceProviderObUltrasoundFixture,
  appointmentNotShowStatusFixture,
  appointmentForOBWorksheetFixture,
  patientForPlanTypesFixture,
  testTypeHCGFixture,
  appointmentForUltrasoundDay3SuccessFixture,
  patientForUltrasoundDay3Fixture,
  appointmentForStimSheetTestPanelHormoneTypeFixture,
  patientReportFixture,
  testPanelForCreateAppointmentFixture,
  patientReportFemaleUserFixture,
  testTypeAFCFixture,
  patientForRevisionFixture,
  patientAppointmentWithMilestoneTestOrderFixture,
  patientForUltrasoundResultsDetailFixture,
  apptForUltrasoundResultDetailsFixture,
  apptForObUltrasoundResultDetailsFixture,
  appointmentForFinalReportFixture,
  appointmentForUltrasoundToBeDoneFixture,
  testTypePatientHighlightsFixture,
  patientForProfileHighlightFixture,
  testTypePatientHighlights2Fixture,
  testPanelHighlightsFixture,
  appointmentForEncounterTypeOlderFixture,
  appointmentForEncounterTypeFixture,
  appointmentUltrasoundForSoftDeletedPatientFixture,
} from '@libs/common/test/fixtures'

import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  labInfoFixture,
  labInfoLifeLabsFixture,
  labInfoSecondFixture,
  labInfoThirdFixture,
} from './lab-info.fixture'
import {
  patientClinicEmrKimLeFixture,
  patientForGetSpecimenDetailsFixture,
  patientForPlanPartnerFixture,
  patientForPlansCreationFixture,
  patientForTestResultAuthFixture,
  patientForUltrasoundFixture,
  patientForUltrasoundWithEmptyActivePlanFixture,
  patientForUltrasoundInLatestTestResultFixture,
  patientForEPPFixture,
  patientForMaleIcFormFixture,
  patientFemaleForFertilityIQFixture,
  patientMaleForFertilityIQFixture,
  patientMaleForFertilityIQReleasedFixture,
  patientFemaleForFertilityIQReleasedFixture,
  patientPlanSelectionDetailsFixture,
  patientWithGenitourinaryHistoryFixture,
  patientForDeactivatedFixture,
  patientForEncounterTypeFixture,
  patientForDocumentGenerationFixture,
  patientToSoftDeleteFixture,
} from './patient.fixture'
import {
  testDeactivatedTypeFixture,
  testTypeDNAFragmentationIndexFixture,
  testTypeForDynacareFixture,
  testTypeForTestResultFixture,
  testTypeForUltrasoundDay3Fixture,
  testTypeForUltrasoundFolliclesFixture,
  testTypeForUltrasoundOHSSFixture,
  testTypeForUltrasoundSonohysterogramFixture,
  testTypeGeneticTestingPGTAFixture,
  testTypeGeneticTestingPGTMFixture,
  testTypeGlucoseFixture,
  testTypeLifeLabB12Fixture,
  testTypeSpermCryoFixture,
} from './test-type.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {serviceProviderFixture} from './service-provider.fixture'
import {
  specimen18DaysFixture,
  specimen30DaysPlusFixture,
  specimenBGSGroupFixture,
  specimenCollectedFixture,
  specimenCompletedFixture,
  specimenCompletedForEditTestResultFixture,
  specimenFixture,
  specimenForBiopsyFixture,
  specimenForBiopsyInTransitFixture,
  specimenForCreateCryoVialsFixture,
  specimenForCreateCryoVialsV2Fixture,
  specimenForEncountersFixture,
  specimenForGeneticTestsResultFixture,
  specimenForIsActiveFixture,
  specimenForPlanCreationFixture,
  specimenForPlanResultsFixture,
  specimenForPreliminaryBloodFixture,
  specimenForRejectedTestFixture,
  specimenForReviewedTestResultFixture,
  specimenForSubmitFixture,
  specimenForTestNotCompleteFixture,
  specimenForUltrasoundTestResultFixture,
  specimenForVerbalTestResultFixture,
  specimenInTransitFixture,
  specimenLifeLabB12Fixture,
  specimenPendingFixture,
  specimenToGenerateDocumentFixture,
  specimenToGenerateDocumentLatestFixture,
  specimenViewStateFlagFixture,
  specimenWithoutMachineFixture,
  specimenWithTransportOutsideFixture,
} from './specimen.fixture'
import {
  testPanelForTestResultDetailFixture,
  testPanelForTestResultFixture,
} from '@libs/common/test/fixtures/test-panel.fixture'
import {
  FinalResultType,
  ResultStatusForPatient,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {staffUserFixture} from '@libs/common/test/fixtures/staff.fixture'
import {
  testOrderFixture,
  testOrderForViewFixture,
} from '@libs/common/test/fixtures/test-order.fixture'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const uuidSuffix: string = '-test-result-uuid'

export const testResultFixture: Partial<TestResult> = {
  id: 1,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac112002',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.NotReceived,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  specimenId: specimenFixture.id,
  testTypeId: testTypeFixture.id,
  appointmentId: appointmentForFinalReportFixture.id,
  comment: 'Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}

export const testResultPanelFixture: Partial<TestResult> = {
  id: 2,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac712002',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  specimenId: specimenFixture.id,
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelFixture.id,
  comment: 'Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}

export const testResultForTestPanelSemenAnalysisRecentFixture: Partial<TestResult> = {
  id: 3,
  uuid: 'ecc3d194-0b42-40b8-a436-37760aff901b',
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Released,
  finalResult: FinalResultType.Abnormal,
  testResultKind: TestResultKind.TestPanel,
  specimenId: specimenCompletedFixture.id,
  testPanelId: testPanelSemenAnalysisFixture.id,
  testTypeId: null,
  comment: 'Test Panel Result Recent with comment',
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  orderingPhysicianId: serviceProviderFixture.id,
  reviewComment: 'test comment',
  releasedOn: dateTimeUtil.now(),
  reviewedOn: dateTimeUtil.now(),
  releaseComment: 'release comment',
}

export const testResultForTestPanelSemenAnalysisOldestFixture: Partial<TestResult> = {
  id: 4,
  uuid: 'be710ccf-a9d1-4df2-a8e6-4f6bb8514993',
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestPanel,
  specimenId: specimenFixture.id,
  testPanelId: testPanelSemenAnalysisFixture.id,
  testTypeId: null,
  comment: 'Test Panel Result Oldest with comment',
  statusForPatient: ResultStatusForPatient.Pending,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 17),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultSemenCultureFixture: Partial<TestResult> = {
  id: 7,
  uuid: '2c4891fd-a9c7-4b38-879f-846b8c4cb010',
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.NotReceived,
  finalResult: FinalResultType.Abnormal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenPendingFixture.id,
  testPanelId: null,
  testTypeId: testTypeSemenCultureFixture.id,
  comment: 'Comment for test result',
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  completedBy: staffUserFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  reviewComment: 'test comment',
  releasedOn: dateTimeUtil.now(),
  reviewedOn: dateTimeUtil.now(),
}

export const testResultAMHOldestFixture: Partial<TestResult> = {
  id: 11,
  uuid: '5br-tbef-dfgd-0c2',
  patientId: partnerPatientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  specimenId: specimenFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 32),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultAMHRecentFixture: Partial<TestResult> = {
  id: 12,
  uuid: '78aaedb4-6c39-4824-bdd0-2df94786562b',
  patientId: partnerPatientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenFixture.id,
  testPanelId: null,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultTBDFixture: Partial<TestResult> = {
  id: 13,
  uuid: 13 + uuidSuffix,
  patientId: partnerPatientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenWithoutMachineFixture.id,
  testPanelId: null,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResult18DaysFixture: Partial<TestResult> = {
  id: 14,
  uuid: 14 + uuidSuffix,
  patientId: partnerPatientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimen18DaysFixture.id,
  testPanelId: null,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  orderingPhysicianId: serviceProviderFixture.id,
}

/** Date:today. status:Pending. statusForPatient:New*/
export const testResultNewFixture: Partial<TestResult> = {
  id: 21,
  uuid: 21 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
  labId: labInfoFixture.id,
  specimenId: specimen30DaysPlusFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithTestResultsNonDominantFixture.id,
  releasedOn: dateTimeUtil.now(),
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

/** Date:yesterday, status:Completed. statusForPatient:Pending */
export const testResultPendingFixture: Partial<TestResult> = {
  id: 22,
  uuid: 22 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
  labId: labInfoFixture.id,
  specimenId: specimenFixture.id,
  statusForPatient: ResultStatusForPatient.Pending,
  status: TestResultStatus.Released,
  releasedOn: dateTimeUtil.addDays(dateTimeUtil.now(), -1), // yesterday
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithTestResultsFixture.id,
}

/** statusForPatient:null. collectedOn: 1 month ago */
export const testResultEmptyStatusFromPatientFixture: Partial<TestResult> = {
  id: 23,
  uuid: 23 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
  labId: labInfoFixture.id,
  statusForPatient: null,
  specimenId: specimenFixture.id,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithTestResultsFixture.id,
}

// added this test 1 by one for patient inside test case
/** testResultKind = TestType, but testTypeId = null, but should be */
export const testResultWithWrongEmptyTestTypeFixture: Partial<TestResult> = {
  id: 25,
  uuid: 25 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  specimenId: specimenFixture.id,
  labId: labInfoSecondFixture.id,
  statusForPatient: null,
  status: TestResultStatus.NotReceived,
  orderingPhysicianId: serviceProviderFixture.id,
  testResultKind: TestResultKind.TestType,
  testTypeId: null,
  appointmentId: appointmentWithTestResultsFixture.id,
}

export const testResultCompletedAMHOneFixture: Partial<TestResult> = {
  id: 28,
  uuid: 28 + uuidSuffix,
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Completed,
  specimenId: specimenPendingFixture.id,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 76),
  reviewComment: 'test comment',
  releasedOn: dateTimeUtil.now(),
  reviewedOn: dateTimeUtil.now(),
  appointmentId: appointmentWithTestResultsFixture.id,
}

export const testResultCompletedBloodGroupScreenFixture: Partial<TestResult> = {
  id: 603,
  uuid: 603 + uuidSuffix,
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Pending,
  specimenId: specimenBGSGroupFixture.id,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 76),
  reviewComment: 'test comment',
  releasedOn: dateTimeUtil.now(),
  reviewedOn: dateTimeUtil.now(),
}

export const testResultCompletedAMHTwoFixture: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 29,
  uuid: '683fd4c8-a8f7-4c8b-b135-6043b3a236ea',
  status: TestResultStatus.Reviewed,
  finalResult: FinalResultType.Abnormal,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
  reviewComment: 'test comment',
  reviewedOn: dateTimeUtil.now(),
}

export const testResultCompletedAMHThreeFixture: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 30,
  uuid: '1ca370f1-1a8a-4391-bf46-4638570f4bf7',
  specimenId: specimenInTransitFixture.id,
  status: TestResultStatus.Reviewed,
  finalResult: FinalResultType.Abnormal,
  reviewedOn: dateTimeUtil.now(),
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
  testOrderId: testOrderFixture.id,
}

export const testResultCompletedAMHFourFixture: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 31,
  uuid: '9382b3af-bbce-487c-bc82-c97f2cbd2000',
  specimenId: specimenWithTransportOutsideFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
}

export const testResultCompletedAMHFiveFixture: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 32,
  uuid: 32 + uuidSuffix,
  status: TestResultStatus.Reviewed,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 7),
}

export const testResultPendingAMHFiveFixture: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 33,
  uuid: 33 + uuidSuffix,
  status: TestResultStatus.NotReceived,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 7),
  appointmentId: appointmentWithTestResultsFixture.id,
}

/** With a few results */
export const testResultPanelForGetDetailFixture: Partial<TestResult> = {
  id: 35,
  uuid: 35 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  testPanelId: testPanelForTestResultDetailFixture.id,
  labId: labInfoFixture.id,
  testResultKind: TestResultKind.TestPanel,
  specimenId: specimen30DaysPlusFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  releasedOn: dateTimeUtil.now(),
  appointmentId: appointmentWithTestResultsFixture.id,
}

export const testResultErrorWithoutMeasurementFixture: Partial<TestResult> = {
  id: 36,
  uuid: 36 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
  labId: labInfoSecondFixture.id,
  testResultKind: TestResultKind.TestType,
  specimenId: specimen30DaysPlusFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.NotReceived,
  orderingPhysicianId: serviceProviderFixture.id,
  releasedOn: dateTimeUtil.now(),
  appointmentId: appointmentWithTestResultsFixture.id,
}

export const testResultWithCollectionAge16Fixture: Partial<TestResult> = {
  id: 37,
  uuid: 37 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
  labId: labInfoSecondFixture.id,
  specimenId: specimen30DaysPlusFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithTestResultsFixture.id,
}

export const testResultPatientWithoutDetailAndSummaryFixture: Partial<TestResult> = {
  id: 55,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac222222',
  patientId: patientClinicEmrKimLeFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.NotReceived,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  specimenId: specimenFixture.id,
  testTypeId: testTypeFixture.id,
  comment: 'Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}
export const testResultCollectedSpecimenFixture: Partial<TestResult> = {
  id: 56,
  uuid: 56 + uuidSuffix,
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenCollectedFixture.id,
  testPanelId: null,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultWithCompletedStatusFixture: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 57,
  uuid: 57 + uuidSuffix,
  specimenId: specimenInTransitFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Abnormal,
  reviewedOn: dateTimeUtil.now(),
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 12),
}

export const testResultWillBeNotCompleteFixture: Partial<TestResult> = {
  id: 60,
  uuid: 'ae8b3805-a7a2-410a-bb44-af5e74326b30',
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.NotReceived,
  specimenId: specimenForTestNotCompleteFixture.id,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  reviewComment: 'test comment',
  releasedOn: dateTimeUtil.now(),
  reviewedOn: dateTimeUtil.now(),
}

export const testResultInconclusive: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 61,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac112019',
  specimenId: specimenWithTransportOutsideFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  status: TestResultStatus.Pending,
}

export const testResultAbnormal: Partial<TestResult> = {
  ...testResultCompletedAMHOneFixture,
  id: 193,
  uuid: 'dcc7c07f-10cc-42db-ae48-695fe180fb25',
  specimenId: specimenWithTransportOutsideFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  status: TestResultStatus.Pending,
}

export const testResultPlanTypeFixture: Partial<TestResult> = {
  id: 62,
  patientId: patientForPlansCreationFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForPlanCreationFixture.id,
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.toDate('2021-05-05'),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultPlanPanelFixture: Partial<TestResult> = {
  id: 63,
  patientId: patientForPlansCreationFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestPanel,
  specimenId: specimenForPlanCreationFixture.id,
  testPanelId: testPanelFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultPlanGroupTypeFixture: Partial<TestResult> = {
  id: 64,
  uuid: 'f42c3c8e-2bdb-4794-9327-4164319a1f43',
  patientId: patientForPlansCreationFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForPlanCreationFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultPlanGroupPanelFixture: Partial<TestResult> = {
  id: 65,
  patientId: patientForPlansCreationFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestPanel,
  specimenId: specimenForPlanCreationFixture.id,
  testPanelId: testPanelForTestResultFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const testResultPlanPanelOlderFixture: Partial<TestResult> = {
  id: 66,
  patientId: patientForPlansCreationFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestPanel,
  specimenId: specimenForPlanCreationFixture.id,
  testPanelId: testPanelFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultPlanPanelNewerFixture: Partial<TestResult> = {
  id: 67,
  patientId: patientForPlansCreationFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestPanel,
  specimenId: specimenForPlanCreationFixture.id,
  testPanelId: testPanelFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultPlanTypeEarlierFixture: Partial<TestResult> = {
  id: 68,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac112023',
  patientId: patientForPlansCreationFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForPreliminaryBloodFixture.id,
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.toDate('2022-05-05'),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithTestResultsFixture.id,
}

export const testResultBloodFixture: Partial<TestResult> = {
  id: 69,
  patientId: patientForTestResultHistory.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForPreliminaryBloodFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultRejectedFixture: Partial<TestResult> = {
  id: 70,
  uuid: '66b42c28-1b26-44e6-8696-35b74d69cd41',
  patientId: patientForProfileTestResultsFixture.id,
  status: TestResultStatus.Rejected,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForRejectedTestFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}
// Created new file for test result test-result-details.fixture.ts till id=80

export const testResultForUltrasoundFolliclesFixture: Partial<TestResult> = {
  id: 85,
  uuid: '66gg2c28-1b26-44hh-8696-35gg4d69cd41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundFollOldFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  externalAppointmentId: 'testResultForUltrasoundFolliclesExternalAppointmentId',
  externalPatientId: 'testResultForUltrasoundFolliclesExternalPatientId',
  createdAt: dateTimeUtil.now(),
}

export const testResultForEmptyObFixture: Partial<TestResult> = {
  id: 86,
  uuid: '66gg2c28-1b26-44hh-8696-35gg4d69cd43',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundFollOldFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
}

/** status=Pending */
export const testResultForGetUltrasoundDetailToPrefillFormFixture: Partial<TestResult> = {
  id: 87,
  uuid: '66gg2c28-1b26-44hh-8696-66gg4h66cj41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testResultForGetUltrasoundDetailToPrefillFormWithEmptyPlanFixture: Partial<TestResult> =
  {
    id: 89,
    uuid: '66zg2c28-1b26-44hh-8696-66gg4kk6cj41',
    patientId: patientForUltrasoundWithEmptyActivePlanFixture.id,
    status: TestResultStatus.Pending,
    testResultKind: TestResultKind.TestType,
    testTypeId: testTypeForUltrasoundFolliclesFixture.id,
    statusForPatient: ResultStatusForPatient.New,
    completedOn: null,
    labId: labInfoFixture.id,
    orderingPhysicianId: serviceProviderFixture.id,
    appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
    createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
  }

export const testResultForUltrasoundWihtoutTestTypeFolliclesFixture: Partial<TestResult> = {
  id: 90,
  uuid: 'g6gg2c28-1b26-44hh-8696-35gg4gg9cg41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: null,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundFollOldFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.now(),
}

/** Emulate testResult for ultrasound which doesn't have specimen */
export const testResultForUltrasoundPatientLatestFixture: Partial<TestResult> = {
  id: 95,
  uuid: 95 + uuidSuffix,
  patientId: patientForUltrasoundInLatestTestResultFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: dateTimeUtil.addHours(
    dateTimeUtil.removeTime(dateTimeUtil.subDays(dateTimeUtil.now(), 2)),
    9,
  ), //should show before ...- 3 days in specimet in another fixture (for the same patient)
  releasedOn: dateTimeUtil.now(),
  reviewedOn: dateTimeUtil.now(),
  finalResult: null,
  appointmentId: appointmentForUltrasoundFollOldFixture.id,
  testOrderId: testOrderFixture.id,
}

export const testResultForUltrasoundReviewedReleasedFixture: Partial<TestResult> = {
  id: 97,
  uuid: 97 + uuidSuffix,
  patientId: patientForUltrasoundFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.addMinutes(dateTimeUtil.now(), 5),
  appointmentId: appointmentForUltrasoundReviewedReleasedFixture.id,
}

export const testResultForUltrasoundMobileFixture: Partial<TestResult> = {
  id: 110,
  uuid: 110 + uuidSuffix,
  patientId: patientForTestResultAuthFixture.id,
  status: TestResultStatus.Released,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundOnMobileFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testResultUltrasoundReportCommentFixture: Partial<TestResult> = {
  id: 111,
  uuid: 111 + uuidSuffix,
  patientId: patientForPlanPartnerFixture.id,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  labId: labInfoFixture.id,
  appointmentId: appointmentForStimSheetNotIUIFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
  machineComment: 'report comment for test',
}

export const resultForSpecimenForCreateCryoVialsFixture: Partial<TestResult> = {
  id: 112,
  uuid: 112 + uuidSuffix,
  patientId: patientForGetSpecimenDetailsFixture.id,
  testTypeId: testTypeSpermCryoFixture.id,
  labId: labInfoFixture.id,
  appointmentId: appointmentForCryoCreateVials.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
  machineComment: 'Sperm Cryo',
  status: TestResultStatus.Completed,
  specimenId: specimenForCreateCryoVialsFixture.id,
  completedOn: null,
}

export const testResultForUltrasoundPatientButSimpleResultToTestProperOrderFixture: Partial<TestResult> =
  {
    id: 115,
    uuid: 115 + uuidSuffix,
    patientId: patientForUltrasoundInLatestTestResultFixture.id,
    labId: labInfoSecondFixture.id,
    status: TestResultStatus.Completed,
    specimenId: specimenForUltrasoundTestResultFixture.id,
    testResultKind: TestResultKind.TestType,
    testTypeId: testTypeForUltrasoundFolliclesFixture.id,
    orderingPhysicianId: serviceProviderFixture.id,
    completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 76),
    reviewComment: 'test comment',
    releasedOn: dateTimeUtil.now(),
    reviewedOn: dateTimeUtil.now(),
    testOrderId: testOrderForViewFixture.id,
  }

export const testResultFromMachineForDetailsFixture: Partial<TestResult> = {
  id: 120,
  uuid: '66gg2c28-1b26-44hh-8696-22gg4h66cj41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.WaitingCompletion,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
  machineComment: 'machine comment from fixture',
}

export const testResultForUltrasoundDay3Fixture: Partial<TestResult> = {
  id: 130,
  uuid: 130 + 'g2c28-1b26-44hh-8696-35gg4d69cd41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundDay3Fixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundDay3Fixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
}

export const testResultForUltrasoundDay3LessSizesFixture: Partial<TestResult> = {
  id: 131,
  uuid: 131 + 'g2c28-1b26-44hh-8696-35gg4hh9cj41',
  patientId: patientForUltrasoundDay3Fixture.id,
  status: TestResultStatus.Pending, //after creating ultrasound - will become completed
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundDay3Fixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForUltrasoundDay3LessDataFixture.id,
  externalPatientId: 'externalPatientId',
  externalAppointmentId: 'externalAppointmentId',
}

export const testResultForUltrasoundFolliclesTwoFixture: Partial<TestResult> = {
  id: 132,
  uuid: 132 + 'g2c28-1b26-44hh-8696-35gg4d69cd41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundFollFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
}

export const testResultForUltrasoundFolliclesLessSizesFixture: Partial<TestResult> = {
  id: 134,
  uuid: 134 + 'g2c28-1b26-44hh-8696-35gg4hh9cj41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending, //after creating ultrasound - will become completed
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForUltrasoundFollLessDataFixture.id,
}

export const testResultDetailsFixture: Partial<TestResult> = {
  id: 136,
  uuid: '2c48jgk4-a9c7-4b38-879f-846b8c4cb010',
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.NotReceived,
  finalResult: FinalResultType.Abnormal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenPendingFixture.id,
  testPanelId: null,
  testTypeId: testTypeSemenCultureFixture.id,
  comment: 'Comment for test result',
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  completedBy: staffUserFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  reviewComment: 'test comment',
  releasedOn: dateTimeUtil.now(),
  reviewedOn: dateTimeUtil.now(),
}

export const testResultCompletedForAddNewAttachmentsFixture: Partial<TestResult> = {
  id: 135,
  uuid: '9dc63e66-e0d6-451f-82d6-80201c40d540',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForPreliminaryBloodFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForUltrasoundSonohysterogramFixture: Partial<TestResult> = {
  id: 137,
  uuid: 137 + 'g2c28-1b26-44hh-8696-35gg4d69cd41',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundSonohysterogramFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundSonohysterogramFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
}

export const testResultForHistoryFixture: Partial<TestResult> = {
  id: 138,
  uuid: 138 + uuidSuffix,
  patientId: patientForEPPFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  completedOn: dateTimeUtil.toDate('2000-01-01'),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForHistoryOlderFixture: Partial<TestResult> = {
  id: 139,
  uuid: 139 + uuidSuffix,
  patientId: patientForEPPFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  completedOn: dateTimeUtil.toDate('1999-01-01'),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForEPPFixture: Partial<TestResult> = {
  id: 140,
  uuid: 140 + uuidSuffix,
  patientId: patientForEPPFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  completedOn: dateTimeUtil.toDate('1999-01-01'),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultEPPInfectiousFixture: Partial<TestResult> = {
  id: 141,
  uuid: '2a2391fd-a9c7-4b38-879f-846b8c4cb010',
  patientId: patientForEPPFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeSemenCultureFixture.id,
  completedOn: dateTimeUtil.toDate('1999-01-01'),
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultToBeVerbalFixture: Partial<TestResult> = {
  id: 142,
  uuid: '986ef674-8b08-420c-9dd5-a1d8f7f76bf4',
  patientId: patientForMaleIcFormFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.NotReceived,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeSemenCultureFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  specimenId: specimenForVerbalTestResultFixture.id,
  comment: 'comment for test, will be empty after save',
}

export const testResultForCreateObUltrasoundFixture: Partial<TestResult> = {
  id: 88,
  uuid: '66gg2c28-1b26-44hh-8696-66gg4h66cj42',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
}

export const testResultForCreateObUltrasoundWithoutProcessTypeFixture: Partial<TestResult> = {
  id: 92,
  uuid: 92 + uuidSuffix,
  patientId: patientForEPPFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForObUltrasoundFixture.id,
  completedOn: dateTimeUtil.toDate('1999-01-01'),
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
}

export const testResultForSubmitFixture: Partial<TestResult> = {
  id: 93,
  uuid: '816cca18-5d33-49d9-a45e-bacfe3a374e7',
  patientId: patientForEPPFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.NotReceived,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForSubmitFixture.id,
  testTypeId: testTypeForObUltrasoundFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
}

export const testResultForNotShowAppFixture: Partial<TestResult> = {
  id: 133,
  uuid: 133 + 'g2c28-1b26-44hh-8696-35gg4d69cd53',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentNotShowStatusFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
}

export const testResultOBWorkSheetFixture: Partial<TestResult> = {
  id: 145,
  uuid: 145 + uuidSuffix,
  patientId: patientForPlanPartnerFixture.id,
  testTypeId: testTypeForObUltrasoundFixture.id,
  labId: labInfoFixture.id,
  appointmentId: appointmentForOBWorksheetFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
  status: TestResultStatus.Completed,
  statusForPatient: ResultStatusForPatient.New,
}

export const testResultReviewedFixture: Partial<TestResult> = {
  id: 146,
  uuid: '3f08c5c9-8a75-41de-93a1-7504db92db08',
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Reviewed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForReviewedTestResultFixture.id,
  testPanelId: null,
  testTypeId: testTypeSemenCultureFixture.id,
  comment: 'Comment for test result',
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  completedBy: staffUserFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  reviewComment: 'test comment',
  reviewedOn: dateTimeUtil.now(),
}

export const testResultCompletedForEditResultFixture: Partial<TestResult> = {
  id: 147,
  uuid: 'e9933dec-8d7c-499f-99f5-185336b696bf',
  patientId: patientForProfileTestResultsFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenCompletedForEditTestResultFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultCompletedForEditObUltrasoundFixture: Partial<TestResult> = {
  id: 148,
  uuid: 'ea20cc19-7cc9-4e54-aa86-9edaea1415fc',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
}

export const testResultForTestTypeV2: Partial<TestResult> = {
  id: 149,
  uuid: '046b00cd-1dc9-4abd-8fec-7e6b158cc22c',
  patientId: patientForPlanTypesFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
  specimenId: specimenForPlanResultsFixture.id,
}

export const testResultForTestTypeV2Trending: Partial<TestResult> = {
  id: 150,
  uuid: 'a0fe50dd-6b9a-4fd0-a4e2-495c9f70312d',
  patientId: patientForPlanTypesFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeHCGFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
  specimenId: specimenForPlanResultsFixture.id,
}

export const testResultForTestTypeV2DisplayInModal: Partial<TestResult> = {
  id: 151,
  uuid: '7e546a38-f5fe-4fdb-9c44-afd0cf5a8580',
  patientId: patientForPlanTypesFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForObUltrasoundFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
}

export const testResultForUltrasoundDay3SuccessFixture: Partial<TestResult> = {
  id: 152,
  uuid: '74b20efa-f934-4e93-a820-95af1dc5ec07',
  patientId: patientForUltrasoundDay3Fixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundDay3Fixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  appointmentId: appointmentForUltrasoundDay3SuccessFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
}

export const testResultForTestTypeV2SecondDisplayInModal: Partial<TestResult> = {
  id: 153,
  uuid: '6c84fb90-12c4-11ec-82a8-0242ac130003',
  patientId: patientForPlanTypesFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForObUltrasoundFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
}

export const testResultPendingLifeLabB12Fixture: Partial<TestResult> = {
  id: 154,
  uuid: '7c84fb90-12c4-11ec-82a8-0242ac130004',
  patientId: patientForTestResultAuthFixture.id,
  testTypeId: testTypeLifeLabB12Fixture.id,
  labId: labInfoLifeLabsFixture.id,
  statusForPatient: ResultStatusForPatient.Pending,
  status: TestResultStatus.Pending,
  releasedOn: null,
  specimenId: specimenLifeLabB12Fixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithTestResultsFixture.id,
  testOrderId: testOrderFixture.id,
}

export const testResultPanelForStimSheetFixture: Partial<TestResult> = {
  id: 155,
  appointmentId: appointmentForStimSheetTestPanelHormoneTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  testPanelId: testPanelFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  testResultKind: TestResultKind.TestPanel,
}

export const testResultForGetOHSSUltrasoundDetailsFixture: Partial<TestResult> = {
  id: 156,
  uuid: 'f796946b-2ca4-4374-8d47-469743b13477',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundOHSSFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
  comment: 'comment testResultForGetOHSSUltrasoundDetailsFixture',
}

export const testResultForGetOHSSDetailsWithoutOHSSAssociationFixture: Partial<TestResult> = {
  id: 157,
  uuid: '3fed0645-283d-47b0-b786-ea7f34aa9294',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundOHSSFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForUltrasoundFollGetDetailToPrefillFixture.id,
}

export const testResultForSubmitOHSSUltrasoundTestResultFixture: Partial<TestResult> = {
  id: 158,
  uuid: '78a553e5-1af9-4f83-8a68-05a64f15cd75',
  patientId: patientForUltrasoundFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundOHSSFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForUltrasoundToBeDoneFixture.id,
}

export const testResultAMHTypeForFertilityIQFixture: Partial<TestResult> = {
  id: 159,
  uuid: '99955de5-1af9-4f83-3a68-05a34f15cd7l',
  patientId: patientFemaleForFertilityIQFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultAFCTypeForFertilityIQFixture: Partial<TestResult> = {
  id: 160,
  uuid: '999hqde5-3af9-4f83-3a68-35a34f15cj7l',
  patientId: patientFemaleForFertilityIQFixture.id,
  status: TestResultStatus.Reviewed,
  reviewedOn: dateTimeUtil.now(),
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundDay3Fixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultSemenAnalysisPanelForFertilityIQFixture: Partial<TestResult> = {
  id: 161,
  uuid: '888hqde5-3af9-4f83-3a68-35a34f15cj7l',
  patientId: patientMaleForFertilityIQFixture.id,
  status: TestResultStatus.Completed,
  completedOn: dateTimeUtil.now(),
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelSemenAnalysisFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultSemenAnalysisPanelForFertilityIQReleasedFixture: Partial<TestResult> = {
  id: 163,
  uuid: '8704414d-8c22-4662-a38f-108ecd55b686',
  patientId: patientMaleForFertilityIQReleasedFixture.id,
  status: TestResultStatus.Released,
  releasedOn: dateTimeUtil.now(),
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelSemenAnalysisFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultDNAFragmentationIndexTypeForFertilityIQRelesedFixture: Partial<TestResult> =
  {
    id: 164,
    uuid: '1a5c80b6-85f2-4b6c-8dca-53bc0ad45050',
    patientId: patientMaleForFertilityIQReleasedFixture.id,
    status: TestResultStatus.Released,
    releasedOn: dateTimeUtil.now(),
    testResultKind: TestResultKind.TestType,
    testTypeId: testTypeDNAFragmentationIndexFixture.id,
    statusForPatient: ResultStatusForPatient.New,
    labId: labInfoFixture.id,
    orderingPhysicianId: serviceProviderFixture.id,
  }

export const testResultAMHTypeForFertilityIQFemaleReleasedFixture: Partial<TestResult> = {
  id: 165,
  uuid: 'c13f9894-e708-4c20-a367-091c98727f2c',
  patientId: patientFemaleForFertilityIQReleasedFixture.id,
  status: TestResultStatus.Released,
  releasedOn: dateTimeUtil.now(),
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultAFCTypeForFertilityIQFemaleReleasedFixture: Partial<TestResult> = {
  id: 166,
  uuid: 'c952353d-8fe6-43af-b2e2-a9b38fc403a7',
  patientId: patientFemaleForFertilityIQReleasedFixture.id,
  status: TestResultStatus.Released,
  releasedOn: dateTimeUtil.now(),
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundDay3Fixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultSemenAnalysisForFertilityIQMaleFixture: Partial<TestResult> = {
  id: 167,
  uuid: 'ea5930c8-67ef-47fd-9c17-55ff761ccb83',
  patientId: patientReportFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelForCreateAppointmentFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultAMFForFertilityIQMaleFixture: Partial<TestResult> = {
  id: 168,
  uuid: '07574c3f-4e57-417e-a706-729f1a1fa3c3',
  patientId: patientReportFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultAMHForFertilityIQFemaleFixture: Partial<TestResult> = {
  id: 169,
  uuid: '4ac113d0-776e-48bd-841c-edb998e8e268',
  patientId: patientReportFemaleUserFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultAFCForFertilityIQFemaleFixture: Partial<TestResult> = {
  id: 170,
  uuid: '4c7ebe59-4657-4159-9f91-db60cddb2e2c',
  patientId: patientReportFemaleUserFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeAFCFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const resultForSpecimenForCreateCryoVialsV2Fixture: Partial<TestResult> = {
  id: 113,
  uuid: 113 + uuidSuffix,
  patientId: patientForGetSpecimenDetailsFixture.id,
  testTypeId: testTypeSpermCryoFixture.id,
  labId: labInfoFixture.id,
  appointmentId: appointmentForCryoCreateVials.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),
  machineComment: 'Sperm Cryo',
  status: TestResultStatus.Completed,
  specimenId: specimenForCreateCryoVialsV2Fixture.id,
  completedOn: null,
}

export const testResultNotCompletedForProfileStatusFixture: Partial<TestResult> = {
  id: 117,
  uuid: 117 + uuidSuffix,
  patientId: patientForProfileTestResultsFixture.id,
  testTypeId: testTypeGlucoseFixture.id,

  labId: labInfoFixture.id,
  appointmentId: appointmentForCryoCreateVials.id,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.toDate(dateTimeUtil.now()),

  status: TestResultStatus.NotReceived,
}

export const testResultViewStateFlagFixture: Partial<TestResult> = {
  id: 118,
  uuid: '4c7ebe59-4657-4159-9f91-db60cddb2e3c',
  patientId: patientClinicEmrKimLeFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  specimenId: specimenViewStateFlagFixture.id,
  testTypeId: testTypeFixture.id,
  comment: 'View State comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
  appointmentId: patientAppointmentWithMilestoneTestOrderFixture.id,
  testOrderId: testOrderFixture.id,
}

export const testResultForRevisionFixture: Partial<TestResult> = {
  id: 119,
  uuid: '306ee6f9-c84c-447c-b022-f1b34b74f901',
  patientId: patientForRevisionFixture.id,
  testTypeId: testTypeGlucoseFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  status: TestResultStatus.NotReceived,
}

export const testResultForEmbryoSpecimenFixture: Partial<TestResult> = {
  id: 1200,
  uuid: '326ee6f9-a84c-337c-b022-f1b34b74f901',
  patientId: patientForPlanPartnerFixture.id,
  testTypeId: testTypeGlucoseFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  status: TestResultStatus.NotReceived,
  specimenId: specimenForBiopsyFixture.id,
}

export const testResultForPGTMFixture: Partial<TestResult> = {
  id: 1201,
  uuid: '326ee6f9-a84c-122c-b022-f1b34b74f901',
  patientId: patientPlanSelectionDetailsFixture.id,
  testTypeId: testTypeGeneticTestingPGTMFixture.id,
  labId: labInfoSecondFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  status: TestResultStatus.NotReceived,
  specimenId: specimenForBiopsyInTransitFixture.id,
}

export const testResultForPGTAFixture: Partial<TestResult> = {
  id: 1202,
  uuid: '326ee6f9-a84c-122c-a023-f1b34b74f901',
  patientId: patientForPlanPartnerFixture.id,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
  labId: labInfoThirdFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  status: TestResultStatus.NotReceived,
  specimenId: specimenForBiopsyInTransitFixture.id,
}

export const testResultUltrasoundFixture: Partial<TestResult> = {
  id: 121,
  uuid: '39c35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForUltrasoundResultsDetailFixture.id,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  labId: labInfoFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  appointmentId: apptForUltrasoundResultDetailsFixture.id,
  machineComment: 'machineComment testResultUltrasoundFixture',
  comment: 'comment testResultUltrasoundFixture',
}

export const testResultForGeneticTestsObservationsFixture: Partial<TestResult> = {
  id: 122,
  uuid: '39c35102-5c7b-4a5a-23b5-94ad2faca38a',
  patientId: patientForPlanPartnerFixture.id,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
  labId: labInfoFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const testResultForForGeneticTestsSpecimenFixture: Partial<TestResult> = {
  id: 123,
  uuid: '23c35102-5c7b-4a5a-23b5-94ad2faca38a',
  patientId: patientForPlanPartnerFixture.id,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
  labId: labInfoFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  specimenId: specimenForGeneticTestsResultFixture.id,
}

export const testResultWithoutMRPFixture: Partial<TestResult> = {
  id: 124,
  uuid: '436ee6f9-a84c-122c-a023-f1b34b74f901',
  patientId: patientWithGenitourinaryHistoryFixture.id,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  labId: labInfoFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: null,
  appointmentId: apptForUltrasoundResultDetailsFixture.id,
}

export const testResultFromDynacareFixture: Partial<TestResult> = {
  id: 125,
  uuid: 'k254fb90-12c4-11ec-82a8-0242ac130004',
  patientId: patientForTestResultAuthFixture.id,
  testTypeId: testTypeForDynacareFixture.id,
  labId: labInfoLifeLabsFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Completed,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  specimenId: specimenLifeLabB12Fixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithTestResultsFixture.id,
  testOrderId: testOrderFixture.id,
}

export const testResultPendingDeactivatedFixture: Partial<TestResult> = {
  id: 126,
  uuid: '15d4987b-dc02-4d75-b780-5da5c2f29a11',
  patientId: patientForDeactivatedFixture.id,
  testTypeId: testDeactivatedTypeFixture.id,
  labId: labInfoLifeLabsFixture.id,
  statusForPatient: ResultStatusForPatient.Pending,
  status: TestResultStatus.Pending,
  comment: 'test result deactivated comment',
  specimenId: specimenForIsActiveFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: patientAppointmentWithMilestoneTestOrderFixture.id,
  testOrderId: testOrderForViewFixture.id,
}

export const testResultHighlightsFixture: Partial<TestResult> = {
  id: 127,
  uuid: '2ab069a4-72c1-44f5-8738-fc9cbf0e906a',
  patientId: patientForProfileHighlightFixture.id,
  testTypeId: testTypePatientHighlightsFixture.id,
  labId: labInfoLifeLabsFixture.id,
  statusForPatient: ResultStatusForPatient.Pending,
  status: TestResultStatus.Completed,
  comment: 'testResultHighlightsFixture',
  specimenId: specimenForIsActiveFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: patientAppointmentWithMilestoneTestOrderFixture.id,
  testOrderId: testOrderForViewFixture.id,
}

export const testResultHighlights2Fixture: Partial<TestResult> = {
  id: 128,
  uuid: 'e85f974f-afb7-44b6-b722-41f421fea2af',
  patientId: patientForProfileHighlightFixture.id,
  testTypeId: testTypePatientHighlights2Fixture.id,
  labId: labInfoLifeLabsFixture.id,
  statusForPatient: ResultStatusForPatient.Pending,
  status: TestResultStatus.Completed,
  comment: 'testResultHighlights2Fixture',
  specimenId: specimenForIsActiveFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: patientAppointmentWithMilestoneTestOrderFixture.id,
  testOrderId: testOrderForViewFixture.id,
}

export const testResultHighlightsWithTestPanelFixture: Partial<TestResult> = {
  id: 129,
  uuid: 'e66925b7-8d3e-4f5c-b683-c2d6fc0c0f01',
  patientId: patientForProfileHighlightFixture.id,
  testPanelId: testPanelHighlightsFixture.id,
  labId: labInfoLifeLabsFixture.id,
  statusForPatient: ResultStatusForPatient.Pending,
  status: TestResultStatus.Completed,
  comment: 'testResultHighlightsWithTestPanelFixture',
  specimenId: specimenForIsActiveFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: patientAppointmentWithMilestoneTestOrderFixture.id,
  testOrderId: testOrderForViewFixture.id,
}

export const testResultForObUltrasoundFixture: Partial<TestResult> = {
  id: 180,
  uuid: 180 + '35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForUltrasoundResultsDetailFixture.id,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  labId: labInfoFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  appointmentId: apptForObUltrasoundResultDetailsFixture.id,
  comment: '',
}

export const testResultForOhssUltrasoundFixture: Partial<TestResult> = {
  id: 185,
  uuid: 185 + '35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForUltrasoundResultsDetailFixture.id,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  labId: labInfoFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  status: TestResultStatus.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  appointmentId: apptForUltrasoundResultDetailsFixture.id,
}

export const testResultForEncounterFixture: Partial<TestResult> = {
  id: 186,
  uuid: 186 + '35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForEncounterTypeFixture.id,
  testTypeId: testTypeHCGFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  appointmentId: appointmentForEncounterTypeFixture.id,
  specimenId: specimenForEncountersFixture.id,
}

export const testResultForEncounterAFCFixture: Partial<TestResult> = {
  id: 187,
  uuid: 187 + '35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForEncounterTypeFixture.id,
  testTypeId: testTypeAFCFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForEncounterTypeFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
}

export const testResultForEncounterOlderAFCFixture: Partial<TestResult> = {
  id: 188,
  uuid: 188 + '35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForEncounterTypeFixture.id,
  testTypeId: testTypeAFCFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForEncounterTypeFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const testResultForEncounterSonoFixture: Partial<TestResult> = {
  id: 189,
  uuid: 189 + '35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForEncounterTypeFixture.id,
  testTypeId: testTypeForUltrasoundSonohysterogramFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  appointmentId: appointmentForEncounterTypeFixture.id,
}

export const testResultForEncounterOlderSonoFixture: Partial<TestResult> = {
  id: 190,
  uuid: 190 + '35102-5c7b-4a5a-85b5-94ad2faca38b',
  patientId: patientForEncounterTypeFixture.id,
  testTypeId: testTypeForUltrasoundSonohysterogramFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  orderingPhysicianId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  appointmentId: appointmentForEncounterTypeOlderFixture.id,
}

export const testResultToGenerateDocumentFixture: Partial<TestResult> = {
  id: 191,
  uuid: 'a0fe50ad-6b2a-3fd1-a2e2-395c9f70312d',
  patientId: patientForDocumentGenerationFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeHCGFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  specimenId: specimenToGenerateDocumentFixture.id,
}

export const testResultToGenerateDocumentLatestFixture: Partial<TestResult> = {
  id: 192,
  uuid: 'a0fe50ad-6b2a-3fd1-a2e2-395c9f70312a',
  patientId: patientForDocumentGenerationFixture.id,
  status: TestResultStatus.Completed,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeHCGFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderObUltrasoundFixture.id,
  specimenId: specimenToGenerateDocumentLatestFixture.id,
}

export const testResultForUltrasoundFolliclesForSoftDeletedPatientFixture: Partial<TestResult> = {
  id: 194,
  uuid: '66gg2c28-2b26-33hh-8696-35gg4d69cd41',
  patientId: patientToSoftDeleteFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  labId: labInfoFixture.id,
  appointmentId: appointmentUltrasoundForSoftDeletedPatientFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultSonoTypeForFertilityIQFixture: Partial<TestResult> = {
  id: 195,
  uuid: '999hqde5-3af9-4f83-3a68-35a34f15c195',
  patientId: patientFemaleForFertilityIQFixture.id,
  status: TestResultStatus.Reviewed,
  reviewedOn: dateTimeUtil.now(),
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundSonohysterogramFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultSonoTypeForFertilityIQFemaleReleasedFixture: Partial<TestResult> = {
  id: 196,
  uuid: 'c952353d-8fe6-43af-b2e2-a9b38fc40196',
  patientId: patientFemaleForFertilityIQReleasedFixture.id,
  status: TestResultStatus.Released,
  finalResult: null,
  releasedOn: dateTimeUtil.now(),
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForUltrasoundSonohysterogramFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultWithoutSpecimenFixture: Partial<TestResult> = {
  id: 197,
  uuid: 'a5c2753d-9fe6-44af-c3e3-b9b39fc40197',
  patientId: patientForProfileTestResultsFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: null, // explicitly set to null to indicate no specimen relation
  testTypeId: testTypeFixture.id,
  statusForPatient: ResultStatusForPatient.Pending,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  comment: 'Test result without specimen relation',
}
