import {ProfileTestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testPanelFixture,
  testPanelHighlightsFixture,
  testPanelSemenAnalysisFixture,
} from './test-panel.fixture'
import {
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeFixture,
  testTypeAntiSpermFixture,
  testTypeSemenCultureFixture,
  testTypeForUltrasoundFolliclesFixture,
  testTypeDNAFragmentationIndexFixture,
  testTypeGlucoseFixture,
  testTypeMotilityFixture,
  testTypeSpermVolumeFixture,
  testTypePatientHighlightsFixture,
  testTypePatientHighlights2Fixture,
} from './test-type.fixture'
import {
  testGroupFixture,
  testGroupForPlanCreationFixture,
  testGroupHighlightsFixture,
  testGroupOrderGroupHemFNestprojectTestGroupFixture,
} from '@libs/common/test/fixtures/test-group.fixture'
import {
  OldestOrRecent,
  ProfileTestResultType,
  SexAtBirth,
} from '@libs/data-layer/apps/clinic-test/enums'
import {testTypeGroupForAnyResultFixture} from './test-type-group-for-any-result.fixture'

export const profileTestResultPanelFixture: Partial<ProfileTestResult> = {
  id: 1,
  displayComment: true,
  label: 'Panel Semen Analysis',
  sequence: 1,
  sexAtBirth: SexAtBirth.Male,
  oldestOrRecent: OldestOrRecent.Recent,
  testPanelId: testPanelSemenAnalysisFixture.id,
  testTypeId: null,
}

export const profileTestResultTypeRecordOneFixture: Partial<ProfileTestResult> = {
  id: 2,
  displayComment: true,
  label: 'Type Semen Culture',
  sequence: 4,
  sexAtBirth: SexAtBirth.Male,
  oldestOrRecent: OldestOrRecent.Recent,
  testPanelId: null,
  testTypeId: testTypeSemenCultureFixture.id,
}

export const profileTestResultTypeWithoutTestResultFixture: Partial<ProfileTestResult> = {
  id: 3,
  displayComment: false,
  label: 'Type Anti-Sperm AB',
  sequence: 1,
  sexAtBirth: SexAtBirth.Male,
  oldestOrRecent: OldestOrRecent.Recent,
  testPanelId: null,
  testTypeId: testTypeAntiSpermFixture.id,
}

export const profileTestResultForPartnerAMHResultFixture: Partial<ProfileTestResult> = {
  id: 5,
  displayComment: false,
  label: 'Label for AMH test type',
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  oldestOrRecent: OldestOrRecent.Oldest,
  testPanelId: null,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const profileTestResultTestGroupMaleFixture: Partial<ProfileTestResult> = {
  id: 6,
  displayComment: false,
  label: 'Test group M',
  sequence: 1,
  sexAtBirth: SexAtBirth.Male,
  oldestOrRecent: OldestOrRecent.Oldest,
  testPanelId: null,
  testTypeId: null,
  testGroupId: testGroupFixture.id,
}

export const profileTestResultTestGroupPlansFixture: Partial<ProfileTestResult> = {
  id: 7,
  sequence: 3,
  sexAtBirth: SexAtBirth.Female,
  testGroupId: testGroupForPlanCreationFixture.id,
  type: ProfileTestResultType.PlanPreliminaryTestResult,
}

export const profileTestResultTestTypePlansFixture: Partial<ProfileTestResult> = {
  id: 8,
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  testTypeId: testTypeFixture.id,
  type: ProfileTestResultType.PlanPreliminaryTestResult,
}

export const profileTestResultTestPanelPlansFixture: Partial<ProfileTestResult> = {
  id: 9,
  sequence: 2,
  sexAtBirth: SexAtBirth.Female,
  testPanelId: testPanelFixture.id,
  type: ProfileTestResultType.PlanPreliminaryTestResult,
}

export const profileTestResultWithoutResultsFixture: Partial<ProfileTestResult> = {
  id: 15,
  sequence: 10,
  sexAtBirth: SexAtBirth.Female,
  testTypeId: testTypeAntiSpermFixture.id,
  type: ProfileTestResultType.PlanPreliminaryTestResult,
}

export const profileTestGroupHemFFixture: Partial<ProfileTestResult> = {
  id: 16,
  sequence: 2,
  sexAtBirth: SexAtBirth.Male,
  testGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  type: ProfileTestResultType.Profile,
}

export const profileTestInfectMaleFixture: Partial<ProfileTestResult> = {
  id: 17,
  sequence: 1,
  uuid: 'b8b69f4f-bb93-46b2-8b12-f51506f994f6',
  sexAtBirth: SexAtBirth.Male,
  testTypeId: testTypeAntiSpermFixture.id,
  type: ProfileTestResultType.InfectiousDisease,
}

export const profileTestInfectMaleWithoutResultsFixture: Partial<ProfileTestResult> = {
  id: 18,
  sequence: 2,
  sexAtBirth: SexAtBirth.Male,
  uuid: 'b8b69f4f-bb93-46b3-3b12-f51506f994f6',
  testTypeId: testTypeSemenCultureFixture.id,
  type: ProfileTestResultType.InfectiousDisease,
}

export const profileTestInfectFemaleFixture: Partial<ProfileTestResult> = {
  id: 19,
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  testTypeId: testTypeSemenCultureFixture.id,
  uuid: 'b8b69f4f-bb93-46b2-2b12-f51506f994f6',
  type: ProfileTestResultType.InfectiousDisease,
}

export const profileTestPrimingSpermFixture: Partial<ProfileTestResult> = {
  id: 22,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994f6',
  sequence: 2,
  sexAtBirth: SexAtBirth.Male,
  testTypeId: testTypeSemenCultureFixture.id,
  label: 'profileTestPrimingSpermFixtureLabel',
  type: ProfileTestResultType.Priming,
}

export const profileTestPrimingUltrasoundre: Partial<ProfileTestResult> = {
  id: 23,
  sequence: 1,
  uuid: 'b8b69f4f-bc23-46b2-8b15-f51506f994f6',
  sexAtBirth: SexAtBirth.Male,
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  type: ProfileTestResultType.Priming,
}

export const profileTestPrimingTestDisplayGroupFixure: Partial<ProfileTestResult> = {
  id: 24,
  sequence: 10,
  sexAtBirth: SexAtBirth.Male,
  testTypeGroupForAnyResultId: testTypeGroupForAnyResultFixture.id,
  type: ProfileTestResultType.Priming,
}
export const profileTestInfectiousTestDisplayGroupFixure: Partial<ProfileTestResult> = {
  id: 25,
  sequence: 10,
  sexAtBirth: SexAtBirth.Male,
  testTypeGroupForAnyResultId: testTypeGroupForAnyResultFixture.id,
  type: ProfileTestResultType.InfectiousDisease,
}

export const profileTestResultAMHFertilityIQFixture: Partial<ProfileTestResult> = {
  id: 26,
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.FertilityIQ,
  testTypeId: testTypeFixture.id,
  isRequiredForFertilityIQ: false,
}

export const profileTestResultSemenAnalysisFertilityIQFixture: Partial<ProfileTestResult> = {
  id: 28,
  sequence: 1,
  sexAtBirth: SexAtBirth.Male,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.FertilityIQ,
  testPanelId: testPanelSemenAnalysisFixture.id,
  isRequiredForFertilityIQ: true,
}

export const profileTestResultDNAFragmentationIndexFertilityIQFixture: Partial<ProfileTestResult> =
  {
    id: 29,
    sequence: 2,
    sexAtBirth: SexAtBirth.Male,
    oldestOrRecent: OldestOrRecent.Recent,
    type: ProfileTestResultType.FertilityIQ,
    testTypeId: testTypeDNAFragmentationIndexFixture.id,
    isRequiredForFertilityIQ: false,
  }

export const profileTestResultForTestResultStatusOnProfileFixture: Partial<ProfileTestResult> = {
  id: 33,
  displayComment: false,
  label: 'Type Anti-Sperm AB 4334',
  sequence: 1,
  sexAtBirth: SexAtBirth.Male,
  oldestOrRecent: OldestOrRecent.Recent,
  testPanelId: null,
  testTypeId: testTypeGlucoseFixture.id,
}

export const profileTestSemenCultureFixture: Partial<ProfileTestResult> = {
  id: 34,
  uuid: 'a199c549-bf80-45e3-94aa-7b8a951217ff',
  sequence: 2,
  sexAtBirth: SexAtBirth.Male,
  testTypeId: testTypeSemenCultureFixture.id,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.FertilityIQSemenAnalysis,
}
export const profileTestSpermVolumeFixture: Partial<ProfileTestResult> = {
  id: 35,
  uuid: 'a9619767-412e-4317-a878-bac564c670cb',
  sequence: 2,
  sexAtBirth: SexAtBirth.Male,
  testTypeId: testTypeSpermVolumeFixture.id,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.FertilityIQSemenAnalysis,
}
export const profileTestSpermMotilityFixture: Partial<ProfileTestResult> = {
  id: 36,
  uuid: '6e388aad-66e8-4462-975d-134c982b121d',
  sequence: 2,
  sexAtBirth: SexAtBirth.Male,
  testTypeId: testTypeMotilityFixture.id,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.FertilityIQSemenAnalysis,
}

export const profileTestFixturePatientHighlights: Partial<ProfileTestResult> = {
  id: 37,
  uuid: '240d02c4-1d2c-497d-9bdf-bc7a73d5e917',
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  testTypeId: testTypePatientHighlightsFixture.id,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.PatientHighlights,
  displayComment: true,
}

export const profileTestFixturePatientHighlights2: Partial<ProfileTestResult> = {
  id: 38,
  uuid: '26a5db4f-a621-4c2d-ad5b-3e27bb41d044',
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  testTypeId: testTypePatientHighlights2Fixture.id,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.PatientHighlights,
  displayComment: true,
}

export const profileTestFixturePatientHighlightsWithTestPanel: Partial<ProfileTestResult> = {
  id: 39,
  uuid: '4d3cbc6d-adb6-48ed-9cdb-f7d7458348fc',
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  testPanelId: testPanelHighlightsFixture.id,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.PatientHighlights,
  displayComment: true,
}

export const profileTestFixturePatientHighlightsWithTestGroup: Partial<ProfileTestResult> = {
  id: 40,
  uuid: '6e8ef013-8be4-424a-84ad-d1216c3366fb',
  sequence: 1,
  sexAtBirth: SexAtBirth.Female,
  testGroupId: testGroupHighlightsFixture.id,
  oldestOrRecent: OldestOrRecent.Recent,
  type: ProfileTestResultType.PatientHighlights,
  displayComment: true,
}
