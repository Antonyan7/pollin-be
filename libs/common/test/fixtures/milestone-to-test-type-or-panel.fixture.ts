import {MilestoneToTestTypeOrPanel} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientMilestoneForAppointmentsBackgroundPanelFixture,
  patientMilestoneForAppointmentsBackgroundTestTypeFixture,
  patientMilestoneForAppWithTestWithPriceForCheckoutFixture,
  patientMilestoneForIsActiveViewStateFixture,
  patientMilestoneForPatAppTestResultsFixture,
  patientMilestoneForPatientUpdateOhipFixture,
  patientMilestoneForPatientUpdateOhipWithTestWithPriceFixture,
  patientMilestoneForPendingPaymentListWithTestsFixture,
  patientMilestoneForStimSheetCancelledFixture,
  patientMilestoneForStimSheetFixture,
  patientMilestoneTestOrderForViewStateFixture,
  patientPastMilestoneForSemenCollectionsFixture,
} from './patient-milestone.fixture'
import {
  milestoneForListFixtureId,
  patientMilestoneForOhipTestsFixtureId,
  patientMilestoneForTestsFixtureId,
  patientMilestoneForTestsNotTaxableFixtureId,
} from '@libs/common/test/fixtures/patient-milestone-variables.fixture'
import {
  notTaxableTestTypeAMHFixture,
  testDeactivatedTypeFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeE2Fixture,
  testTypeFixture,
  testTypeForUltrasoundFolliclesFixture,
  testTypeFreeFixture,
  testTypeLifeLabB12Fixture,
  testTypeP4Fixture,
  testTypeSemenCultureFixture,
  testTypeVolumeFixture,
} from '@libs/common/test/fixtures/test-type.fixture'
import {testPanelFixture} from '@libs/common/test/fixtures/test-panel.fixture'
import {testPanelForOrderValidationFixture} from '@libs/common/test/fixtures/test-panel.fixture'

export const milestoneToTestTypeOrPanelFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 1,
  patientMilestoneId: patientPastMilestoneForSemenCollectionsFixture.id,
}

export const milestoneToTestTypeOrPanelForTestsFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 2,
  patientMilestoneId: patientMilestoneForTestsFixtureId,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  lockedPrice: '23.00',
}

export const milestoneToTestTypeOhipTestsFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 3,
  patientMilestoneId: patientMilestoneForOhipTestsFixtureId,
  testTypeId: testTypeSemenCultureFixture.id,
  lockedPrice: '22.00',
}

export const milestoneToTestTypeOhipSecondTestsFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 4,
  patientMilestoneId: patientMilestoneForOhipTestsFixtureId,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  lockedPrice: '33.00',
}

export const milestoneToTestTypeForNotTaxableTestsFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 5,
  patientMilestoneId: patientMilestoneForTestsNotTaxableFixtureId,
  testTypeId: notTaxableTestTypeAMHFixture.id,
  lockedPrice: '30.00',
}

export const milestoneToTestTypeForTaxableTestsFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 6,
  patientMilestoneId: patientMilestoneForTestsNotTaxableFixtureId,
  testTypeId: testTypeVolumeFixture.id,
  lockedPrice: '11.00',
}

export const milestoneToTestPanelForOrderViewFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 7,
  patientMilestoneId: milestoneForListFixtureId,
  testPanelId: testPanelForOrderValidationFixture.id,
}

export const milestoneToTestTypeForPatAppTestResultsTestTypeOneFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 8,
    patientMilestoneId: patientMilestoneForPatAppTestResultsFixture.id,
    testTypeId: testTypeFixture.id,
  }

export const milestoneToTestTypeForPatAppTestResultsTestTypeTwoFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 9,
    patientMilestoneId: patientMilestoneForPatAppTestResultsFixture.id,
    testTypeId: testTypeE2Fixture.id,
  }

export const milestoneToTestTypeForPatAppTestResultsTestPanelFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 10,
    patientMilestoneId: patientMilestoneForPatAppTestResultsFixture.id,
    testPanelId: testPanelFixture.id,
  }

export const milestoneToTestTypeForPatAppTestResultsTestTYpeWithoutGroupFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 11,
    patientMilestoneId: patientMilestoneForPatAppTestResultsFixture.id,
    testTypeId: testTypeForUltrasoundFolliclesFixture.id,
  }

export const milestoneToTestTypeForPatUpdateOhipFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 13,
  patientMilestoneId: patientMilestoneForPatientUpdateOhipFixture.id,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
}

export const milestoneToTestTypeForPatUpdateOhipWithTestWithPriceFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 14,
    patientMilestoneId: patientMilestoneForPatientUpdateOhipWithTestWithPriceFixture.id,
    testTypeId: testTypeFixture.id,
    lockedPrice: String(testTypeFixture.price),
  }

export const milestoneToTestTypeForPatWithTestWithPriceForCheckoutFixure: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 15,
    patientMilestoneId: patientMilestoneForAppWithTestWithPriceForCheckoutFixture.id,
    testTypeId: testTypeFixture.id,
  }

export const milestoneToTestTypeForPendingPaymentForFreeFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 17,
    patientMilestoneId: patientMilestoneForPendingPaymentListWithTestsFixture.id,
    testTypeId: testTypeFreeFixture.id,
    lockedPrice: '0.00',
  }

export const milestoneToTestTypeForPendingPaymentForPriceAndNotCoveredFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 18,
    patientMilestoneId: patientMilestoneForPendingPaymentListWithTestsFixture.id,
    testTypeId: notTaxableTestTypeAMHFixture.id,
    lockedPrice: '10.00',
  }

export const milestoneToTestTypeForPendingPaymentForCoveredFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 19,
    patientMilestoneId: patientMilestoneForPendingPaymentListWithTestsFixture.id,
    testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
    lockedPrice: '3.00',
  }

export const milestoneToTestTypeForPanelForPendingPaymentFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 20,
    patientMilestoneId: patientMilestoneForPendingPaymentListWithTestsFixture.id,
    testPanelId: testPanelFixture.id,
    lockedPrice: '20.00',
  }

export const milestoneToTestTypeForPanelForViewStateMilestonTestsFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 21,
    patientMilestoneId: patientMilestoneTestOrderForViewStateFixture.id,
    testTypeId: testTypeLifeLabB12Fixture.id,
  }

export const milestoneToTestTypeForPanelForIsActiveViewStateTestsFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 22,
    patientMilestoneId: patientMilestoneForIsActiveViewStateFixture.id,
    testTypeId: testDeactivatedTypeFixture.id,
  }

export const milestoneToTestTypeForTestTypeForAppointmentsBackgroundNotTaxableFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 23,
    patientMilestoneId: patientMilestoneForAppointmentsBackgroundTestTypeFixture.id,
    testTypeId: notTaxableTestTypeAMHFixture.id,
    lockedPrice: '3.5',
  }

export const milestoneToTestTypeForTestTypeForAppointmentsBackgroundTaxableFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 24,
    patientMilestoneId: patientMilestoneForAppointmentsBackgroundTestTypeFixture.id,
    testTypeId: testTypeFixture.id,
    lockedPrice: '10.02',
  }

export const milestoneToTestTypeForPanelForAppointmentsBackgroundFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 25,
    patientMilestoneId: patientMilestoneForAppointmentsBackgroundPanelFixture.id,
    testPanelId: testPanelFixture.id,
    lockedPrice: '20.05',
  }

export const milestoneToTestTypeStimSheetToShowFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 26,
  patientMilestoneId: patientMilestoneForStimSheetFixture.id,
  testTypeId: testTypeFixture.id,
}

export const milestoneToTestTypeStimSheetToNotShowFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 27,
  patientMilestoneId: patientMilestoneForStimSheetFixture.id,
  testTypeId: testTypeP4Fixture.id,
}

export const milestoneToTestTypeStimSheetToShowE2Fixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 28,
  patientMilestoneId: patientMilestoneForStimSheetFixture.id,
  testTypeId: testTypeE2Fixture.id,
}

export const milestoneToTestTypeStimSheetToShowCancelledFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 29,
    patientMilestoneId: patientMilestoneForStimSheetCancelledFixture.id,
    testTypeId: testTypeE2Fixture.id,
  }
