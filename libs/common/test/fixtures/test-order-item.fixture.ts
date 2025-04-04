import {TestOrderItem} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testOrderFixture,
  testOrderForCreateAppointmentFixture,
  testOrderToUpdate,
  testOrderSpermCryoFixture,
  testOrderForClaimDetailsFixture,
  testOrderForPatAppTestResultsFixture,
  testOrderForOrderActionsFixture,
  testOrderForPatientUpdateOhipFixture,
  testOrderForPatientUpdateOhipWithTestWithPriceFixture,
  testOrderForAppWithTestWithPriceForCheckoutFixture,
  testOrderPendingPaymentListFixture,
  testOrderForProfileStatusFixture,
  testOrderForProfileStatusForDiffPatientFixture,
  testOrderForPlanFixture,
  testOrderForMobilePlanFixture,
  testOrderForCheckoutFixture,
  testOrderForViewFixture,
  testOrderForLibraryContentWithTestOrderFixture,
  testOrderForPlansBackgroundPriceFixture,
  testOrderForExternalBloodTestFixture,
} from './test-order.fixture'
import {
  testPanelFixture,
  testPanelForCreateAppointmentFixture,
  testPanelForOrderValidationFixture,
} from '@libs/common/test/fixtures/test-panel.fixture'
import {
  individualTestTypeAnalogFixture,
  notTaxableTestTypeAMHFixture,
  testDeactivatedTypeFixture,
  testTypeAFCFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeAntiSpermFixture,
  testTypeE2Fixture,
  testTypeForCreateAppointmentFixture,
  testTypeForUltrasoundFolliclesFixture,
  testTypeFreeFixture,
  testTypeGeneticTestingPGTAFixture,
  testTypeGeneticTestingPGTMFixture,
  testTypeHCGFixture,
  testTypeLifeLabB12Fixture,
  testTypeProcedureFixture,
  testTypeSpermCryoFixture,
  testTypeWithDifferentServiceTypeFixture,
  testTypeBloodGroupScreenFixture,
} from '@libs/common/test/fixtures/test-type.fixture'
import {OrderGroupItemEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {
  individualGroupFixture,
  notActiveTestGroupFixture,
  testGroupFixture,
  testGroupForGeneticTestingAlternativeFixture,
  testGroupForGeneticTestingFixture,
  testGroupForOrderActionsFixture,
  testGroupForOrderViewFixture,
  testGroupOrderGroupHemFNestprojectTestGroupFixture,
  testGroupOrderSetOneDayWorkupFixture,
} from '@libs/common/test/fixtures/test-group.fixture'
import {testTypeFixture} from '.'
import {libraryContentMediaResourceFixture} from './library-content.fixture'

export const testOrderItemFixture: Partial<TestOrderItem> = {
  id: 1,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderFixture.id,
  testPanelId: testPanelForOrderValidationFixture.id,
}

export const testOrderToUpdateItemFixture: Partial<TestOrderItem> = {
  id: 2,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderToUpdate.id,
  testTypeId: null,
  testPanelId: testPanelFixture.id,
}

export const testOrderItemForTaskFixture: Partial<TestOrderItem> = {
  id: 3,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForCreateAppointmentFixture.id,
  testTypeId: testTypeForCreateAppointmentFixture.id,
  testPanelId: null,
}

export const testOrderItemForWithDifferentTestTypeFixture: Partial<TestOrderItem> = {
  id: 4,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForCreateAppointmentFixture.id,
  testTypeId: testTypeWithDifferentServiceTypeFixture.id,
  testPanelId: null,
}

export const testOrderItemForWithDifferentTestPanelFixture: Partial<TestOrderItem> = {
  id: 5,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderForCreateAppointmentFixture.id,
  testTypeId: null,
  testPanelId: testPanelForCreateAppointmentFixture.id,
}

export const testOrderItemForSpermCryo: Partial<TestOrderItem> = {
  id: 6,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderSpermCryoFixture.id,
  testTypeId: testTypeSpermCryoFixture.id,
  testPanelId: null,
}

export const testOrderItemForClaimDetailsTestTypeFixture: Partial<TestOrderItem> = {
  id: 7,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForClaimDetailsFixture.id,
  rootTestGroupId: individualGroupFixture.id,
  testTypeId: individualTestTypeAnalogFixture.id,
  testPanelId: null,
}

export const testOrderItemForClaimDetailsTestPanelFixture: Partial<TestOrderItem> = {
  id: 8,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderForClaimDetailsFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  testTypeId: null,
  testPanelId: testPanelForCreateAppointmentFixture.id,
}

export const testOrderItemTestOrderFixture: Partial<TestOrderItem> = {
  id: 9,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeLifeLabB12Fixture.id,
  rootTestGroupId: testGroupForOrderViewFixture.id,
}

export const testOrderItemForPatAppTestResultsTestTypeOneFixture: Partial<TestOrderItem> = {
  id: 10,
  testOrderId: testOrderForPatAppTestResultsFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemForPatAppTestResultsTestTypeTwoFixture: Partial<TestOrderItem> = {
  id: 11,
  testOrderId: testOrderForPatAppTestResultsFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeE2Fixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemForPatAppTestResultsTestPanelFixture: Partial<TestOrderItem> = {
  id: 12,
  testOrderId: testOrderForPatAppTestResultsFixture.id,
  type: OrderGroupItemEnum.TestPanel,
  testPanelId: testPanelFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemForPatAppTestResultsTestTypeWithoutGroupFixture: Partial<TestOrderItem> =
  {
    id: 13,
    testOrderId: testOrderForPatAppTestResultsFixture.id,
    type: OrderGroupItemEnum.TestType,
    testTypeId: testTypeForUltrasoundFolliclesFixture.id,
    testGroupId: null,
    rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  }

export const testOrderItemGroupSuperTypeFixture: Partial<TestOrderItem> = {
  id: 14,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeProcedureFixture.id,
  rootTestGroupId: testGroupForOrderViewFixture.id,
  testGroupId: testGroupFixture.id,
}

export const testOrderItemHCGTestTypeFixture: Partial<TestOrderItem> = {
  id: 15,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeHCGFixture.id,
  rootTestGroupId: testGroupForOrderViewFixture.id,
  testGroupId: testGroupOrderSetOneDayWorkupFixture.id,
}

export const testOrderItemOneForOrderActionsFixture: Partial<TestOrderItem> = {
  id: 16,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForOrderActionsFixture.id,
  testTypeId: testTypeProcedureFixture.id,
  rootTestGroupId: testGroupForOrderActionsFixture.id,
}

export const testOrderItemTwoForOrderActionsFixture: Partial<TestOrderItem> = {
  id: 17,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForOrderActionsFixture.id,
  testTypeId: testTypeHCGFixture.id,
  rootTestGroupId: testGroupForOrderActionsFixture.id,
}

export const testOrderItemTestOrderViewPanelFixture: Partial<TestOrderItem> = {
  id: 18,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderFixture.id,
  testPanelId: testPanelFixture.id,
  rootTestGroupId: testGroupForOrderViewFixture.id,
}

export const testOrderItemForPatUpdateOhipFixture: Partial<TestOrderItem> = {
  id: 20,
  testOrderId: testOrderForPatientUpdateOhipFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemForPatUpdateOhipWithTestWIthPriceFixture: Partial<TestOrderItem> = {
  id: 21,
  testOrderId: testOrderForPatientUpdateOhipWithTestWithPriceFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemForAppWithTestWithPriceForCheckoutFixture: Partial<TestOrderItem> = {
  id: 22,
  testOrderId: testOrderForAppWithTestWithPriceForCheckoutFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemFreeTestForPendingPaymentListFixture: Partial<TestOrderItem> = {
  id: 24,
  testOrderId: testOrderPendingPaymentListFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeFreeFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemWithPriceAndNotCoveredForPendingPaymentListFixture: Partial<TestOrderItem> =
  {
    id: 25,
    testOrderId: testOrderPendingPaymentListFixture.id,
    type: OrderGroupItemEnum.TestType,
    testTypeId: notTaxableTestTypeAMHFixture.id,
    testGroupId: testGroupFixture.id,
    rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  }

export const testOrderItemWithPriceAndCoveredForPendingPaymentListFixture: Partial<TestOrderItem> =
  {
    id: 26,
    testOrderId: testOrderPendingPaymentListFixture.id,
    type: OrderGroupItemEnum.TestType,
    testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
    testGroupId: testGroupFixture.id,
    rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
  }

export const testOrderItemForPanelWithPriceFOrPendingPaymentFixture: Partial<TestOrderItem> = {
  id: 27,
  testOrderId: testOrderPendingPaymentListFixture.id,
  type: OrderGroupItemEnum.TestPanel,
  testPanelId: testPanelFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemForProfileStatusFixture: Partial<TestOrderItem> = {
  id: 30,
  testOrderId: testOrderForProfileStatusFixture.id,
  type: OrderGroupItemEnum.TestPanel,
  testTypeId: testTypeAntiSpermFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

//should not get status for this testOrderItem as it related to other patient
export const testOrderItemForProfileStatusForDiffPatientFixture: Partial<TestOrderItem> = {
  id: 32,
  testOrderId: testOrderForProfileStatusForDiffPatientFixture.id,
  type: OrderGroupItemEnum.TestPanel,
  testTypeId: testTypeAntiSpermFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}

export const testOrderItemForPlanOrderFixture: Partial<TestOrderItem> = {
  id: 33,
  testOrderId: testOrderForPlanFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
  rootTestGroupId: testGroupForGeneticTestingFixture.id,
}

export const testOrderItemForMobilePlanWithConfigurationFixture: Partial<TestOrderItem> = {
  id: 34,
  testOrderId: testOrderForMobilePlanFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
  rootTestGroupId: testGroupForGeneticTestingFixture.id,
}

export const testOrderItemForMobilePlanWithoutConfigurationFixture: Partial<TestOrderItem> = {
  id: 35,
  testOrderId: testOrderForMobilePlanFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeGeneticTestingPGTMFixture.id,
  rootTestGroupId: testGroupForGeneticTestingAlternativeFixture.id,
}

export const testOrderItemForMobilePlanTaxableFixture: Partial<TestOrderItem> = {
  id: 36,
  testOrderId: testOrderForCheckoutFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
  rootTestGroupId: testGroupForGeneticTestingFixture.id,
}

export const testOrderItemForMobilePlanNotTaxableFixture: Partial<TestOrderItem> = {
  id: 37,
  testOrderId: testOrderForCheckoutFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeGeneticTestingPGTMFixture.id,
  rootTestGroupId: testGroupForGeneticTestingAlternativeFixture.id,
}

export const testOrderItemForMobilePlanNotGeneticFixture: Partial<TestOrderItem> = {
  id: 38,
  testOrderId: testOrderForCheckoutFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeAFCFixture.id,
  rootTestGroupId: testGroupForGeneticTestingFixture.id,
}

export const testOrderItemForNotActiveFixture: Partial<TestOrderItem> = {
  id: 39,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForViewFixture.id,
  testTypeId: testDeactivatedTypeFixture.id,
  rootTestGroupId: notActiveTestGroupFixture.id,
  testGroupId: testGroupForOrderViewFixture.id,
}

export const testOrderItemForLibraryContentWithTestOrderFixture: Partial<TestOrderItem> = {
  id: 41,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForLibraryContentWithTestOrderFixture.id,
  libraryContentId: libraryContentMediaResourceFixture.id,
}

export const testOrderItemForPlansBackgroundPriceFixture: Partial<TestOrderItem> = {
  id: 42,
  testOrderId: testOrderForPlansBackgroundPriceFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeGeneticTestingPGTAFixture.id,
  rootTestGroupId: testGroupForGeneticTestingFixture.id,
}

export const testOrderItemForPlansBackgroundPriceNotTaxableFixture: Partial<TestOrderItem> = {
  id: 43,
  testOrderId: testOrderForPlansBackgroundPriceFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeGeneticTestingPGTMFixture.id,
  rootTestGroupId: testGroupForGeneticTestingAlternativeFixture.id,
}

export const testOrderItemForPlansBackgroundPriceNotGeneticFixture: Partial<TestOrderItem> = {
  id: 44,
  testOrderId: testOrderForPlansBackgroundPriceFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeAFCFixture.id,
  rootTestGroupId: testGroupForGeneticTestingFixture.id,
}

export const testOrderItemForExternalBloodTestFixture: Partial<TestOrderItem> = {
  id: 45,
  testOrderId: testOrderForExternalBloodTestFixture.id,
  type: OrderGroupItemEnum.TestType,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  testGroupId: testGroupFixture.id,
  rootTestGroupId: testGroupOrderGroupHemFNestprojectTestGroupFixture.id,
}
