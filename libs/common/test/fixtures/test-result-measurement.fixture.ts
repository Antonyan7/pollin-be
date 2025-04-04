/* eslint-disable max-lines */
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {TestResultMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testResultAbnormal,
  testResultAMFForFertilityIQMaleFixture,
  testResultAMHForFertilityIQFemaleFixture,
  testResultAMHOldestFixture,
  testResultAMHRecentFixture,
  testResultAMHTypeForFertilityIQFemaleReleasedFixture,
  testResultAMHTypeForFertilityIQFixture,
  testResultBloodFixture,
  testResultCollectedSpecimenFixture,
  testResultCompletedAMHFiveFixture,
  testResultCompletedAMHFourFixture,
  testResultCompletedAMHOneFixture,
  testResultCompletedAMHThreeFixture,
  testResultCompletedAMHTwoFixture,
  testResultCompletedBloodGroupScreenFixture,
  testResultCompletedForAddNewAttachmentsFixture,
  testResultCompletedForEditResultFixture,
  testResultDNAFragmentationIndexTypeForFertilityIQRelesedFixture,
  testResultEPPInfectiousFixture,
  testResultFixture,
  testResultForEncounterFixture,
  testResultForEPPFixture,
  testResultForHistoryFixture,
  testResultForHistoryOlderFixture,
  testResultForSubmitFixture,
  testResultForTestPanelSemenAnalysisOldestFixture,
  testResultForTestPanelSemenAnalysisRecentFixture,
  testResultForTestTypeV2,
  testResultForTestTypeV2Trending,
  testResultFromDynacareFixture,
  testResultHighlights2Fixture,
  testResultInconclusive,
  testResultNewFixture,
  testResultPanelForGetDetailFixture,
  testResultPanelForStimSheetFixture,
  testResultPendingFixture,
  testResultPendingLifeLabB12Fixture,
  testResultPlanGroupPanelFixture,
  testResultPlanGroupTypeFixture,
  testResultPlanPanelFixture,
  testResultPlanTypeEarlierFixture,
  testResultPlanTypeFixture,
  testResultRejectedFixture,
  testResultReviewedFixture,
  testResultSemenAnalysisForFertilityIQMaleFixture,
  testResultSemenAnalysisPanelForFertilityIQFixture,
  testResultSemenAnalysisPanelForFertilityIQReleasedFixture,
  testResultSemenCultureFixture,
  testResultToBeVerbalFixture,
  testResultUltrasoundFixture,
  testResultWillBeNotCompleteFixture,
  testResultWithCompletedStatusFixture,
  testResultWithoutSpecimenFixture,
} from './test-result.fixture'
import {
  notTaxableTestTypeAMHFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeAntiSpermFixture,
  testTypeBloodGroupScreenFixture,
  testTypeDNAFragmentationIndexFixture,
  testTypeE2Fixture,
  testTypeFixture,
  testTypeForDynacareFixture,
  testTypeForTestResultFixture,
  testTypeForUltrasoundFolliclesFixture,
  testTypeFSHFixture,
  testTypeHCGFixture,
  testTypeLHFixture,
  testTypeLifeLabB12Fixture,
  testTypeMotilityFixture,
  testTypeP4Fixture,
  testTypeSemenCultureFixture,
  testTypeSpermVolumeFixture,
  testTypeToTestPanelHCTFixture,
  testTypeToTestPanelMCHFixture,
  testTypeTSHFixture,
  testTypeVolumeFixture,
  testTypeWithDifferentServiceTypeFixture,
} from './test-type.fixture'
import {
  testResultForHCGWorkSheetFixture,
  testResultForPlanPartnerFixture,
  testResultForPrimingFixture,
  testResultForPrimingOlderFixture,
  testResultForSemenSpecimenCollectedFixture,
  testResultForStimSheetFixture,
  testResultForStimSheetLatestFixture,
  testResultForStimSheetNotCompletedFixture,
  testResultForStimSheetToReleaseFixture,
  testResultWithSameStimSheetDateFixture,
} from './test-result-details.fixture'
import {TestResultMeasurementType} from '@libs/data-layer/apps/clinic-test/enums'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const uuidSuffix: string = '-test-result-measurement-uuid'

export const testResultMeasurementVolumeRecentFixture: Partial<TestResultMeasurement> = {
  id: 1,
  uuid: 1 + uuidSuffix,
  testResultId: testResultForTestPanelSemenAnalysisRecentFixture.id,
  resultType: TestResultMeasurementType.Normal,
  result: '1.5',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  testTypeId: testTypeVolumeFixture.id,
  labComment: 'Comment from lab one',
}

export const testResultMeasurementMotilityRecentFixture: Partial<TestResultMeasurement> = {
  id: 2,
  uuid: 2 + uuidSuffix,
  testResultId: testResultForTestPanelSemenAnalysisRecentFixture.id,
  resultType: TestResultMeasurementType.Normal,
  result: '53',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  testTypeId: testTypeMotilityFixture.id,
  labComment: 'Comment from lab two',
}

export const testResultSemenCultureMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 3,
  // should be uuid string according @IsUUID() decorator
  uuid: 'e7a27692-03af-4b45-ba62-a25f0351ded9',
  testResultId: testResultSemenCultureFixture.id,
  resultType: null,
  result: 'Undetected',
  dateReceived: null,
  testTypeId: testTypeSemenCultureFixture.id,
}

export const testResultAMHOldestMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 4,
  uuid: 'fdnr-gdfg-ggdb-sf77',
  testResultId: testResultAMHOldestFixture.id,
  resultType: TestResultMeasurementType.Normal,
  result: '1.8',
  dateReceived: dateTimeUtil.toDate('2022-11-01'),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultAMHRecentMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 5,
  uuid: '3dnr-fevrvr-g7db-sf',
  testResultId: testResultAMHRecentFixture.id,
  resultType: TestResultMeasurementType.Abnormal,
  result: '2.5',
  dateReceived: dateTimeUtil.toDate('2022-11-01'),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultAMHOneMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 7,
  uuid: 7 + uuidSuffix,
  testResultId: testResultCompletedAMHOneFixture.id,
  result: '1.4',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 76),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}
export const testResultBloodGroupScreenMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 603,
  uuid: 603 + uuidSuffix,
  testResultId: testResultCompletedBloodGroupScreenFixture.id,
  result: '1.4',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 76),
  testTypeId: testTypeBloodGroupScreenFixture.id,
}

export const testResultAMHTwoMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 8,
  uuid: '778fd4c8-a8f7-4c8b-b135-6043b3a236ea',
  testResultId: testResultCompletedAMHTwoFixture.id,
  result: '1.777',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 39),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultAMHThreeMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 9,
  uuid: '662fd4c8-a8f7-4c8b-b135-6043b3a236ea',
  testResultId: testResultCompletedAMHThreeFixture.id,
  result: '1.94',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 27),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultAMHFourMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 10,
  uuid: '2b64c1ab-3627-4fd2-b2ce-39a1bf245594',
  testResultId: testResultCompletedAMHFourFixture.id,
  result: '1.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultAMHFiveMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 11,
  uuid: 11 + uuidSuffix,
  testResultId: testResultCompletedAMHFiveFixture.id,
  result: '1.6',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultMeasurementVolumeOldestFixture: Partial<TestResultMeasurement> = {
  id: 12,
  uuid: '81bc33e7-a99d-405d-bfba-677d9661f727',
  testResultId: testResultForTestPanelSemenAnalysisOldestFixture.id,
  resultType: TestResultMeasurementType.Abnormal,
  result: '1.95',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 17),
  testTypeId: testTypeVolumeFixture.id,
}

export const testResultMeasurementMotilityOldestFixture: Partial<TestResultMeasurement> = {
  id: 13,
  uuid: '9610f7fa-6404-4522-87df-432cb82711f3',
  testResultId: testResultForTestPanelSemenAnalysisOldestFixture.id,
  resultType: TestResultMeasurementType.Abnormal,
  result: '77',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 17),
  testTypeId: testTypeMotilityFixture.id,
}

export const testResultMeasurementFortNewFixture: Partial<TestResultMeasurement> = {
  id: 20,
  uuid: 20 + uuidSuffix,
  testResultId: testResultNewFixture.id,
  resultType: TestResultMeasurementType.Normal,
  result: '85,4',
  testTypeId: testTypeForTestResultFixture.id,
  dateReceived: dateTimeUtil.now(),
}

export const testResultMeasurementForPendingFixture: Partial<TestResultMeasurement> = {
  id: 21,
  uuid: 21 + uuidSuffix,
  testResultId: testResultPendingFixture.id,
  resultType: TestResultMeasurementType.Normal,
  result: '90,3',
  testTypeId: testTypeForTestResultFixture.id,
  dateReceived: dateTimeUtil.now(),
}

export const testResultMeasurementForTestPanelDetailFixture1: Partial<TestResultMeasurement> = {
  id: 22,
  uuid: 22 + uuidSuffix,
  testResultId: testResultPanelForGetDetailFixture.id,
  resultType: TestResultMeasurementType.Normal,
  result: '12,3',
  dateReceived: dateTimeUtil.now(),
  testTypeId: testTypeForTestResultFixture.id,
}

export const testResultMeasurementForTestPanelDetailFixture2: Partial<TestResultMeasurement> = {
  id: 23,
  uuid: 23 + uuidSuffix,
  testResultId: testResultPanelForGetDetailFixture.id,
  resultType: TestResultMeasurementType.Abnormal,
  result: '34,5',
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultMeasurementForTestTypeFixture: Partial<TestResultMeasurement> = {
  id: 24,
  uuid: '2b64c1ab-3627-4fd2-b2ce-39a1bf555577',
  testResultId: testResultFixture.id,
  result: '1.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeFixture.id,
}

export const testResultCollectedMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 25,
  uuid: '2b64c1ab-3627-4fd2-b2ce-39a1bf555512',
  testResultId: testResultCollectedSpecimenFixture.id,
  result: '2.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultStatusCollectedMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 26,
  uuid: '2b64c1ab-3627-4fd2-b2ce-39a1bf555513',
  testResultId: testResultWithCompletedStatusFixture.id,
  result: '2.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const testResultMeasurementWillHaveResultTypeTestNotCompleteFixture: Partial<TestResultMeasurement> =
  {
    id: 27,
    uuid: '2dd82c27-3e5b-4ac5-98c7-44480ac63789',
    testResultId: testResultWillBeNotCompleteFixture.id,
    result: '100',
    dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
    testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  }

export const testResultMeasurementInconclusive: Partial<TestResultMeasurement> = {
  id: 28,
  uuid: '2b64c1ab-3627-4fd2-b2ce-39a1bf555578',
  testResultId: testResultInconclusive.id,
  result: '1.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeFixture.id,
  resultType: TestResultMeasurementType.Normal,
}

export const testResultMeasurementInconclusiveAnotherOne: Partial<TestResultMeasurement> = {
  id: 29,
  uuid: '2b64c1ab-3627-4fd2-b2ce-39a1bf555579',
  testResultId: testResultInconclusive.id,
  result: '1.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeFixture.id,
  resultType: TestResultMeasurementType.Normal,
}

export const testResultMeasurementPlanTypeFixture: Partial<TestResultMeasurement> = {
  id: 30,
  testResultId: testResultPlanTypeFixture.id,
  result: '1.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeFixture.id,
}

export const testResultMeasurementPlanPanelFixture: Partial<TestResultMeasurement> = {
  id: 31,
  testResultId: testResultPlanPanelFixture.id,
  result: '2.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeToTestPanelHCTFixture.id,
}

export const testResultMeasurementPlanGroupTypeFixture: Partial<TestResultMeasurement> = {
  id: 32,
  testResultId: testResultPlanGroupTypeFixture.id,
  result: '3.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeForTestResultFixture.id,
}

export const testResultMeasurementPlanGroupPanelFixture: Partial<TestResultMeasurement> = {
  id: 33,
  testResultId: testResultPlanGroupPanelFixture.id,
  result: '4.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeToTestPanelMCHFixture.id,
}

export const testResultMeasurementPlanTypeEarlierFixture: Partial<TestResultMeasurement> = {
  id: 34,
  testResultId: testResultPlanTypeEarlierFixture.id,
  result: '4.44',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  testTypeId: testTypeFixture.id,
}

export const testResultMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 35,
  testResultId: testResultBloodFixture.id,
  result: '4.44',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  testTypeId: testTypeBloodGroupScreenFixture.id,
}

export const testResultMeasurementForRejectedResultFixture: Partial<TestResultMeasurement> = {
  id: 36,
  testResultId: testResultRejectedFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
}

export const testResultMeasurementForPlanPartnerFixture: Partial<TestResultMeasurement> = {
  id: 37,
  testResultId: testResultForPlanPartnerFixture.id,
  testTypeId: testTypeAntiSpermFixture.id,
  result: '4.44',
}

export const testResultMeasurementE2WithSameStimSheetDateFixture: Partial<TestResultMeasurement> = {
  id: 38,
  testResultId: testResultWithSameStimSheetDateFixture.id,
  testTypeId: testTypeE2Fixture.id,
  result: '1010',
}

export const testResultMeasurementE2Fixture: Partial<TestResultMeasurement> = {
  id: 39,
  testResultId: testResultForStimSheetFixture.id,
  testTypeId: testTypeE2Fixture.id,
  result: '39',
}

export const testResultMeasurementP4Fixture: Partial<TestResultMeasurement> = {
  id: 40,
  testResultId: testResultForStimSheetToReleaseFixture.id,
  testTypeId: testTypeP4Fixture.id,
  result: '40',
}

export const testResultMeasurementLHFixture: Partial<TestResultMeasurement> = {
  id: 41,
  testResultId: testResultForStimSheetToReleaseFixture.id,
  testTypeId: testTypeLHFixture.id,
  result: '41',
}

export const testResultMeasurementFSHFixture: Partial<TestResultMeasurement> = {
  id: 42,
  testResultId: testResultForStimSheetFixture.id,
  testTypeId: testTypeFSHFixture.id,
  result: '42',
}

export const testResultMeasurementForAddNewAttachmentsFixture: Partial<TestResultMeasurement> = {
  id: 43,
  uuid: 'ee4b1f3a-756d-49ce-a385-f74b971c0138',
  testResultId: testResultCompletedForAddNewAttachmentsFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  result: '43',
}

export const testResultMeasurementForHistoryFixture: Partial<TestResultMeasurement> = {
  id: 44,
  testResultId: testResultForHistoryFixture.id,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  result: '87',
}

export const testResultMeasurementForHistoryOlderFixture: Partial<TestResultMeasurement> = {
  id: 45,
  testResultId: testResultForHistoryOlderFixture.id,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  result: '88',
}

export const testResultMeasurementForEPPFixture: Partial<TestResultMeasurement> = {
  id: 46,
  testResultId: testResultForEPPFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  result: '98',
}

export const testResultMeasurementEPPInfectiousFixture: Partial<TestResultMeasurement> = {
  id: 47,
  testResultId: testResultEPPInfectiousFixture.id,
  testTypeId: testTypeSemenCultureFixture.id,
  result: '113',
}

export const testResultMeasurementForVerbalTestResultFixture: Partial<TestResultMeasurement> = {
  id: 48,
  uuid: 'fffb1f3a-756d-49ce-a385-f74b971c0177',
  testResultId: testResultToBeVerbalFixture.id,
  testTypeId: testTypeSemenCultureFixture.id,
  result: null,
}

export const testResultMeasurementFoSubmitFixture: Partial<TestResultMeasurement> = {
  id: 49,
  uuid: '9994c1ab-3627-4fd2-b2ce-39a1bf555533',
  testResultId: testResultForSubmitFixture.id,
  result: 'xx',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeFixture.id,
}

export const testResultMeasurementTSHFixture: Partial<TestResultMeasurement> = {
  id: 50,
  testResultId: testResultForStimSheetFixture.id,
  testTypeId: testTypeTSHFixture.id,
  result: '12',
}

export const testResultMeasurementTSHForHCGFixture: Partial<TestResultMeasurement> = {
  id: 51,
  testResultId: testResultForHCGWorkSheetFixture.id,
  testTypeId: testTypeTSHFixture.id,
  result: '16',
}

export const testResultMeasurementHCGFixture: Partial<TestResultMeasurement> = {
  id: 52,
  testResultId: testResultForHCGWorkSheetFixture.id,
  testTypeId: testTypeHCGFixture.id,
  result: '13',
}

export const testResultMeasurementReviewedFixture: Partial<TestResultMeasurement> = {
  id: 53,
  uuid: 'b795d54c-1dcb-44ad-974e-905b8b834930',
  testResultId: testResultReviewedFixture.id,
  result: '15',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 39),
  testTypeId: testTypeSemenCultureFixture.id,
  resultType: TestResultMeasurementType.Normal,
}

export const testResultMeasurementForCompletedTestResultEditFixture: Partial<TestResultMeasurement> =
  {
    id: 54,
    uuid: '28ee2e69-dd14-44ca-8afc-a6902da64d75',
    testResultId: testResultCompletedForEditResultFixture.id,
    result: '44',
    dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
    testTypeId: testTypeBloodGroupScreenFixture.id,
    resultType: TestResultMeasurementType.Normal,
  }

export const testResultMeasurementForTestTypeV2Fixture: Partial<TestResultMeasurement> = {
  id: 55,
  uuid: '0c59c8a7-54b8-412b-b014-13c07c7b76d8',
  testResultId: testResultForTestTypeV2.id,
  result: '45',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  testTypeId: testTypeFixture.id,
  resultType: TestResultMeasurementType.Normal,
}

export const testResultMeasurementForTestTypeV2TrendingFixture: Partial<TestResultMeasurement> = {
  id: 56,
  uuid: 'a3a22f2c-fc39-4044-9fec-ffc1d75321f3',
  testResultId: testResultForTestTypeV2Trending.id,
  result: '88',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  testTypeId: testTypeHCGFixture.id,
  resultType: TestResultMeasurementType.Normal,
}

export const testResultMeasurementE2LatestFixture: Partial<TestResultMeasurement> = {
  id: 58,
  testResultId: testResultForStimSheetLatestFixture.id,
  testTypeId: testTypeE2Fixture.id,
  result: '38',
}

export const testResultMeasurementLifeLabB12Fixture: Partial<TestResultMeasurement> = {
  id: 59,
  uuid: 'b4a22f2c-fc39-4044-9fec-ffc1d75321f4',
  testResultId: testResultPendingLifeLabB12Fixture.id,
  testTypeId: testTypeLifeLabB12Fixture.id,
  result: null,
}

export const testResultMeasurementPanelLHFixture: Partial<TestResultMeasurement> = {
  id: 60,
  testResultId: testResultPanelForStimSheetFixture.id,
  testTypeId: testTypeLHFixture.id,
  result: '41',
}

export const testResultMeasurementSpermPrimingFixture: Partial<TestResultMeasurement> = {
  id: 61,
  testResultId: testResultForPrimingFixture.id,
  testTypeId: testTypeSemenCultureFixture.id,
  result: '02',
}

export const testResultMeasuremenForDisplayGroupFixture: Partial<TestResultMeasurement> = {
  id: 62,
  testResultId: testResultForPrimingOlderFixture.id,
  testTypeId: notTaxableTestTypeAMHFixture.id,
  result: '127',
}

export const testResultMeasurementP4ForEPLFixture: Partial<TestResultMeasurement> = {
  id: 63,
  testResultId: testResultForHCGWorkSheetFixture.id,
  testTypeId: testTypeP4Fixture.id,
  result: '98',
}

export const testResultMeasurementAMHTypeForFertilityIQFixture: Partial<TestResultMeasurement> = {
  id: 64,
  uuid: '1e5ac4a4-e8b9-4e91-b48b-c41a530559f9',
  testResultId: testResultAMHTypeForFertilityIQFixture.id,
  testTypeId: testTypeFixture.id,
  result: '30',
}

export const testResultMeasurementSemenAnalysisPanelForFertilityIQFixture: Partial<TestResultMeasurement> =
  {
    id: 65,
    uuid: 'ow3ac4a4-e8b9-4e91-b48b-js1a53055933',
    testResultId: testResultSemenAnalysisPanelForFertilityIQFixture.id,
    testTypeId: testTypeSpermVolumeFixture.id,
    result: '0.3',
    resultType: TestResultMeasurementType.Abnormal,
  }

export const testResultMeasurementSemenAnalysisPanelForFertilityIQReleasedFixture: Partial<TestResultMeasurement> =
  {
    id: 67,
    uuid: '2f129ae6-1699-497b-85eb-d1f550890360',
    testResultId: testResultSemenAnalysisPanelForFertilityIQReleasedFixture.id,
    testTypeId: testTypeSpermVolumeFixture.id,
    result: '0.9',
    resultType: TestResultMeasurementType.Normal,
  }

export const testResultMeasurementDNATypeForFertilityIQReleasedFixture: Partial<TestResultMeasurement> =
  {
    id: 68,
    uuid: '06044022-38a7-469e-a660-453403b12809',
    testResultId: testResultDNAFragmentationIndexTypeForFertilityIQRelesedFixture.id,
    testTypeId: testTypeDNAFragmentationIndexFixture.id,
    result: '10',
    resultType: TestResultMeasurementType.Abnormal,
  }

export const testResultMeasurementAMHTypeForFertilityIQFemaleReleasedFixture: Partial<TestResultMeasurement> =
  {
    id: 69,
    uuid: '0c8357d9-0987-4347-a567-1bc40a1dc851',
    testResultId: testResultAMHTypeForFertilityIQFemaleReleasedFixture.id,
    testTypeId: testTypeFixture.id,
    result: '50',
    resultType: TestResultMeasurementType.Abnormal,
  }

export const testResultMeasurementSemenVolumeFixture: Partial<TestResultMeasurement> = {
  id: 70,
  testResultId: testResultSemenAnalysisForFertilityIQMaleFixture.id,
  testTypeId: testTypeSemenCultureFixture.id,
  result: '113',
}

export const testResultMeasurementSpermCountFixture: Partial<TestResultMeasurement> = {
  id: 71,
  testResultId: testResultSemenAnalysisForFertilityIQMaleFixture.id,
  testTypeId: testTypeSpermVolumeFixture.id,
  result: '113',
}

export const testResultMeasurementAMHFixture: Partial<TestResultMeasurement> = {
  id: 72,
  testResultId: testResultAMFForFertilityIQMaleFixture.id,
  testTypeId: testTypeFixture.id,
  result: '113',
}

export const testResultMeasurementAMHFemalePatientFixture: Partial<TestResultMeasurement> = {
  id: 74,
  testResultId: testResultAMHForFertilityIQFemaleFixture.id,
  testTypeId: testTypeFixture.id,
  result: '115',
}

export const testResultMeasurementSpermAdditionalTestTypeFixture: Partial<TestResultMeasurement> = {
  id: 75,
  testResultId: testResultSemenAnalysisForFertilityIQMaleFixture.id,
  testTypeId: testTypeWithDifferentServiceTypeFixture.id,
  result: '113',
}

export const UltrasoundTestResultMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 76,
  testResultId: testResultUltrasoundFixture.id,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  result: '113',
}

export const testResultMeasurementForDynacareFixture: Partial<TestResultMeasurement> = {
  id: 77,
  testResultId: testResultFromDynacareFixture.id,
  testTypeId: testTypeForDynacareFixture.id,
  result: '111',
}

export const testResultMeasurementHighlightsFixture: Partial<TestResultMeasurement> = {
  id: 78,
  testResultId: testResultHighlights2Fixture.id,
  testTypeId: testTypeForDynacareFixture.id,
  result: '116',
}

export const testResultMeasurementEncounterFixture: Partial<TestResultMeasurement> = {
  id: 79,
  testResultId: testResultForEncounterFixture.id,
  testTypeId: testTypeHCGFixture.id,
  result: '53',
}

export const testResultMeasurementAbnormal: Partial<TestResultMeasurement> = {
  id: 80,
  uuid: '897a0623-ae58-4951-a106-c01c1bab5312',
  testResultId: testResultAbnormal.id,
  result: '1.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeFixture.id,
  resultType: TestResultMeasurementType.Normal,
}

export const testResultMeasurementAbnormalAnotherOne: Partial<TestResultMeasurement> = {
  id: 81,
  uuid: 'ca16147e-1475-4fb0-bfb8-fbcaa52dba84',
  testResultId: testResultAbnormal.id,
  result: '1.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeFixture.id,
  resultType: TestResultMeasurementType.Normal,
}

export const testResultMeasurementNotCompletedFixture: Partial<TestResultMeasurement> = {
  id: 82,
  testResultId: testResultForStimSheetNotCompletedFixture.id,
  testTypeId: testTypeE2Fixture.id,
  result: '38',
}

export const testResultMeasurementWithRocheMachineTypeFixture: Partial<TestResultMeasurement> = {
  id: 83,
  testResultId: testResultForSemenSpecimenCollectedFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  result: '0.036',
}

export const testResultMeasurementStimSheetCustomTestTypeLatestFixture: Partial<TestResultMeasurement> =
  {
    id: 84,
    testResultId: testResultForStimSheetLatestFixture.id,
    testTypeId: testTypeFixture.id,
    result: '47',
  }

export const testResultMeasurementStimSheetCustomTestTypeFixture: Partial<TestResultMeasurement> = {
  id: 85,
  testResultId: testResultForStimSheetFixture.id,
  testTypeId: testTypeFixture.id,
  result: '42',
}

export const testResultMeasurementForTestWithoutSpecimenFixture: Partial<TestResultMeasurement> = {
  id: 86,
  uuid: '7862c53e-9af7-41ef-bd88-f043b3a2398a',
  testResultId: testResultWithoutSpecimenFixture.id,
  resultType: TestResultMeasurementType.Normal,
  result: '1.45',
  dateReceived: dateTimeUtil.toDate('2023-10-15'),
  testTypeId: testTypeFixture.id,
}
