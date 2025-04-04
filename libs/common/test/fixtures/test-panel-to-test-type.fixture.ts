import {TestPanelToTestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testPanelFixture,
  testPanelForOrderValidationFixture,
  testPanelForTestResultDetailFixture,
  testPanelSemenAnalysisFixture,
  testPanelUrinalysisUnderOrderSetFixture,
} from './test-panel.fixture'
import {
  testDeactivatedTypeFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeBilirubinFixture,
  testTypeForOrderValidationFixture,
  testTypeForTestResultFixture,
  testTypeGlucoseFixture,
  testTypeMotilityFixture,
  testTypeSpermVolumeFixture,
  testTypeToTestPanelHCTFixture,
  testTypeToTestPanelMCHFixture,
  testTypeVolumeFixture,
} from './test-type.fixture'

export const testPanelToTestTypeHCTForOrderGroupsFixture: Partial<TestPanelToTestType> = {
  id: 1,
  testPanelId: testPanelFixture.id,
  testTypeId: testTypeToTestPanelHCTFixture.id,
}

export const testPanelToTestTypeMCHForOrderGroupsFixture: Partial<TestPanelToTestType> = {
  id: 2,
  testPanelId: testPanelFixture.id,
  testTypeId: testTypeToTestPanelMCHFixture.id,
}

export const testPanelToTestTypeGlucoseorOrderGroupsFixture: Partial<TestPanelToTestType> = {
  id: 3,
  testPanelId: testPanelUrinalysisUnderOrderSetFixture.id,
  testTypeId: testTypeGlucoseFixture.id,
}

export const testPanelToTestTypeBilirubinForOrderGroupsFixture: Partial<TestPanelToTestType> = {
  id: 4,
  testPanelId: testPanelUrinalysisUnderOrderSetFixture.id,
  testTypeId: testTypeBilirubinFixture.id,
}

export const testPanelToValidateOrderFixture: Partial<TestPanelToTestType> = {
  id: 5,
  testPanelId: testPanelForOrderValidationFixture.id,
  testTypeId: testTypeForOrderValidationFixture.id,
}

export const testPanelSemenAnalysisToTestTypesOneFixture: Partial<TestPanelToTestType> = {
  id: 6,
  testPanelId: testPanelSemenAnalysisFixture.id,
  testTypeId: testTypeSpermVolumeFixture.id,
  sequence: 3,
}

export const testPanelTestTypesForIsActiveFixture: Partial<TestPanelToTestType> = {
  id: 7,
  testPanelId: testPanelSemenAnalysisFixture.id,
  testTypeId: testDeactivatedTypeFixture.id,
  sequence: 4,
}

export const testPanelSemenAnalysisToTestTypesFirstFixture: Partial<TestPanelToTestType> = {
  id: 8,
  testPanelId: testPanelSemenAnalysisFixture.id,
  testTypeId: testTypeVolumeFixture.id,
  sequence: 1,
}

export const testPanelSemenAnalysisToTestTypesSecondFixture: Partial<TestPanelToTestType> = {
  id: 9,
  testPanelId: testPanelSemenAnalysisFixture.id,
  testTypeId: testTypeMotilityFixture.id,
  sequence: 2,
}

export const testPanelToTestTypesForResultDetailsMobileSecondFixture: Partial<TestPanelToTestType> =
  {
    id: 10,
    testPanelId: testPanelForTestResultDetailFixture.id,
    testTypeId: testTypeForTestResultFixture.id,
    sequence: 1,
  }

export const testPanelToTestTypesForResultDetailsMobileFirstFixture: Partial<TestPanelToTestType> =
  {
    id: 11,
    testPanelId: testPanelForTestResultDetailFixture.id,
    testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
    sequence: 2,
  }
