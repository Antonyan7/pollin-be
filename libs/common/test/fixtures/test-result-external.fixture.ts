import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {labInfoSecondFixture} from './lab-info.fixture'
import {
  patientClinicEmrKimLeFixture,
  patientPartnerForProfileWithInvalidHighlightFixture,
} from './patient.fixture'
import {serviceProviderFixture} from './service-provider.fixture'
import {specimenInTransitWithTransportOutsideFixture} from './specimen.fixture'
import {testPanelFixture, testPanelSpermCryoProcessTypeFixture} from './test-panel.fixture'
import {testTypeFixture} from './test-type.fixture'
import {
  FinalResultType,
  ResultStatusForPatient,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'

export const testResultExternalFixture: Partial<TestResult> = {
  id: 100,
  uuid: 'cb1b68f7-0434-42d9-9b76-628dee420a0d',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.NotReceived,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  specimenId: specimenInTransitWithTransportOutsideFixture.id,
  testTypeId: testTypeFixture.id,
  comment: 'Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}

export const testResultPanelExternalFixture: Partial<TestResult> = {
  id: 101,
  uuid: '649683da-d3b1-42b2-93e1-26038999d48d',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  specimenId: specimenInTransitWithTransportOutsideFixture.id,
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelFixture.id,
  comment: 'Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}

export const testResultPatientWithoutDetailAndSummaryFixture: Partial<TestResult> = {
  id: 103,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac222222',
  patientId: patientClinicEmrKimLeFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.NotReceived,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  specimenId: specimenInTransitWithTransportOutsideFixture.id,
  testTypeId: testTypeFixture.id,
  comment: 'Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}

export const testResultExternalCompletedFixture: Partial<TestResult> = {
  id: 104,
  uuid: 'cfa14fdf-9e47-450c-b164-2c97b972a6b4',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  specimenId: specimenInTransitWithTransportOutsideFixture.id,
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelFixture.id,
  comment: 'Test result Completed for External list',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}

export const testResultExternalCompletedWithSpecimenCompletedFixture: Partial<TestResult> = {
  id: 105,
  uuid: 'aaa14fdf-9e47-450c-b164-2c97b972a111',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  specimenId: specimenInTransitWithTransportOutsideFixture.id,
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelFixture.id,
  comment: 'Test result Completed with Completed Specimen: Should appear in external list',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}

export const testResultWithSpermCryoProcessTypeFixture: Partial<TestResult> = {
  id: 106,
  uuid: '646r3da-d3b1-42b2-93e1-26038999d4gd',
  patientId: patientPartnerForProfileWithInvalidHighlightFixture.id,
  labId: labInfoSecondFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  specimenId: specimenInTransitWithTransportOutsideFixture.id,
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelSpermCryoProcessTypeFixture.id,
  comment: 'Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
}
