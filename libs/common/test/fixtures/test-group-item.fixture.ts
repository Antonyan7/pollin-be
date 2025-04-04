import {TestGroupItem} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  groupWithOneOnlyTestTypeFixture,
  individualGroupFixture,
  notActiveTestGroupFixture,
  parentTestGroupFixture,
  testGroupFixture,
  testGroupForGeneticTestingAlternativeFixture,
  testGroupForGeneticTestingFixture,
  testGroupForLibraryContentFixture,
  testGroupForOrderViewFixture,
  testGroupForPlanCreationFixture,
  testGroupOrderForLibraryTypeFixture,
  testGroupOrderGroupHemFNestprojectTestGroupFixture,
  testGroupOrderSetOneDayWorkupFixture,
  testResultFilteringByTestGroupFixture,
} from './test-group.fixture'
import {
  testPanelFixture,
  testPanelForOrderValidationFixture,
  testPanelForTestResultFixture,
  testPanelUrinalysisUnderOrderSetFixture,
} from './test-panel.fixture'
import {
  individualTestTypeAnalogFixture,
  testDeactivatedTypeFixture,
  testTypeAFCFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeAnalogFixture,
  testTypeBloodGroupScreenFixture,
  testTypeFixture,
  testTypeForOrderValidationFixture,
  testTypeForTestResultFixture,
  testTypeGeneticTestingPGTAFixture,
  testTypeGeneticTestingPGTMFixture,
  testTypeGeneticTestingToNotSelectFixture,
  testTypeHbElectrophoresisFixture,
  testTypeLifeLabB12Fixture,
} from './test-type.fixture'
import {OrderGroupItemEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {libraryContentMediaResourceFixture} from './library-content.fixture'

export const testGroupItemFixture: Partial<TestGroupItem> = {
  id: 1,
  type: OrderGroupItemEnum.OrderGroup,
  parentTestGroupId: parentTestGroupFixture.id,
  testGroupId: testGroupFixture.id,
}

export const testGroupItemCBCUnderGroupTestPanelFixture: Partial<TestGroupItem> = {
  id: 2,
  type: OrderGroupItemEnum.TestPanel,
  parentTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  testPanelId: testPanelFixture.id,
}

export const testGroupItemUnderOrderSetTestPanelFixture: Partial<TestGroupItem> = {
  id: 3,
  type: OrderGroupItemEnum.TestPanel,
  parentTestGroupId: testGroupOrderSetOneDayWorkupFixture.id,
  testPanelId: testPanelUrinalysisUnderOrderSetFixture.id,
}

export const testGroupItemTestTypeFixture: Partial<TestGroupItem> = {
  id: 4,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupOrderSetOneDayWorkupFixture.id,
  testTypeId: testTypeFixture.id,
}

export const testGroupItemOrderGroupFixture: Partial<TestGroupItem> = {
  id: 5,
  type: OrderGroupItemEnum.OrderGroup,
  parentTestGroupId: testGroupOrderSetOneDayWorkupFixture.id,
  testGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testGroupItemTestTypeBloodGroupScreenFixture: Partial<TestGroupItem> = {
  id: 6,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
}

export const testGroupItemTestTypeHbElectrophoresisFixture: Partial<TestGroupItem> = {
  id: 7,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  testTypeId: testTypeHbElectrophoresisFixture.id,
}

export const testPanelItemValidateOrderGroupFixture: Partial<TestGroupItem> = {
  id: 8,
  type: OrderGroupItemEnum.TestPanel,
  parentTestGroupId: testGroupOrderSetOneDayWorkupFixture.id,
  testPanelId: testPanelForOrderValidationFixture.id,
}
export const testTypeItemValidateOrderGroupFixture: Partial<TestGroupItem> = {
  id: 9,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupOrderSetOneDayWorkupFixture.id,
  testTypeId: testTypeForOrderValidationFixture.id,
}
export const testTypeInHigherPriorityValidateOrderGroupFixture: Partial<TestGroupItem> = {
  id: 10,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: parentTestGroupFixture.id,
  testTypeId: testTypeForOrderValidationFixture.id,
}

export const testTypeGroupValidateOrderGroupFixture: Partial<TestGroupItem> = {
  id: 11,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  testTypeId: testTypeForOrderValidationFixture.id,
}

export const testTypeGroupOnlyTypeFixture: Partial<TestGroupItem> = {
  id: 12,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: groupWithOneOnlyTestTypeFixture.id,
  testTypeId: testTypeAnalogFixture.id,
}

export const indTestTypeGroupOnlyTypeFixture: Partial<TestGroupItem> = {
  id: 13,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: individualGroupFixture.id,
  testTypeId: individualTestTypeAnalogFixture.id,
}

export const testGroupItemTypeFixture: Partial<TestGroupItem> = {
  id: 14,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupForPlanCreationFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
}

export const testGroupItemPanelFixture: Partial<TestGroupItem> = {
  id: 15,
  type: OrderGroupItemEnum.TestPanel,
  parentTestGroupId: testGroupForPlanCreationFixture.id,
  testPanelId: testPanelForTestResultFixture.id,
}

export const testGroupItemOrderViewFixture: Partial<TestGroupItem> = {
  id: 16,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupForOrderViewFixture.id,
  testTypeId: testTypeLifeLabB12Fixture.id,
}

export const testGroupItemPanelOrderViewFixture: Partial<TestGroupItem> = {
  id: 17,
  type: OrderGroupItemEnum.TestPanel,
  parentTestGroupId: testGroupForOrderViewFixture.id,
  testPanelId: testPanelFixture.id,
}

export const testGroupItemGeneticTestingFixture: Partial<TestGroupItem> = {
  id: 18,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupForGeneticTestingFixture.id,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
}

export const testGroupItemGeneticTestingAlternativeFixture: Partial<TestGroupItem> = {
  id: 19,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupForGeneticTestingAlternativeFixture.id,
  testTypeId: testTypeGeneticTestingPGTMFixture.id,
}

export const testGroupItemNotGeneticTestingFixture: Partial<TestGroupItem> = {
  id: 20,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupForGeneticTestingFixture.id,
  testTypeId: testTypeAFCFixture.id,
}

export const testGroupItemGeneticTestingPanelFixture: Partial<TestGroupItem> = {
  id: 21,
  type: OrderGroupItemEnum.TestPanel,
  parentTestGroupId: testGroupForGeneticTestingFixture.id,
  testPanelId: testPanelFixture.id,
}

export const testGroupItemGeneticTestingToNotSelectFixture: Partial<TestGroupItem> = {
  id: 22,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupForGeneticTestingFixture.id,
  testTypeId: testTypeGeneticTestingToNotSelectFixture.id,
}

export const testGroupItemGeneticTestingAlternativePGTAFixture: Partial<TestGroupItem> = {
  id: 23,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testGroupForGeneticTestingAlternativeFixture.id,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
}

export const testGroupItemNotActiveFixture: Partial<TestGroupItem> = {
  id: 24,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: notActiveTestGroupFixture.id,
  testTypeId: testDeactivatedTypeFixture.id,
}

export const testGroupItemForLibraryContentFixture: Partial<TestGroupItem> = {
  id: 27,
  type: OrderGroupItemEnum.LibraryContent,
  parentTestGroupId: testGroupForLibraryContentFixture.id,
  libraryContentId: libraryContentMediaResourceFixture.id,
}

export const testGroupItemChildForLibraryContentForValidateOrderFixture: Partial<TestGroupItem> = {
  id: 29,
  type: OrderGroupItemEnum.LibraryContent,
  parentTestGroupId: testGroupOrderForLibraryTypeFixture.id,
  libraryContentId: libraryContentMediaResourceFixture.id,
}

export const testGroupForTestResultGroupFilteringFixture: Partial<TestGroupItem> = {
  id: 30,
  type: OrderGroupItemEnum.TestType,
  parentTestGroupId: testResultFilteringByTestGroupFixture.id,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}
