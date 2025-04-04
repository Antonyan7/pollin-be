import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestResultKind, TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {labInfoDynacareFixture, labInfoLifeLabsFixture} from './lab-info.fixture'
import {
  patientForLabIntegrationDynacareFixture,
  patientForLabIntegrationFixture,
} from './patient.fixture'
import {
  specimenExternalForLabIntegrationFixture,
  specimenExternalSameCollectedOnForLabIntegrationFixture,
} from './specimen-related-fixtures'
import {
  testTypeForLabIntegrationDynacareFixture,
  testTypeForLabIntegrationFixture,
} from './test-type.fixture'
import {testPanelForPartialLipidAssessment} from './test-panel.fixture'

export const serviceProviderForTestResultForLabIntegration: Partial<ServiceProvider> = {
  id: 333,
  uuid: '286d157a-8205-4067-aef1-c4cc3728d11a',
  description: 'description',
}

export const testResultForLifeLabsToBeWaitingForCompletionFixture: Partial<TestResult> = {
  id: 881,
  uuid: '836835bf-5374-41d8-bdaa-7bbeb64a736f',
  patientId: patientForLabIntegrationFixture.id,
  labId: labInfoLifeLabsFixture.id,
  status: TestResultStatus.NotReceived,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForLabIntegrationFixture.id,
  orderingPhysicianId: serviceProviderForTestResultForLabIntegration.id,
  specimenId: specimenExternalForLabIntegrationFixture.id,
}

export const testResultForLifeLabsStatusNotUpdatedFixture: Partial<TestResult> = {
  id: 882,
  uuid: '776835bf-5374-41d8-bdaa-7bbeb64a7343',
  patientId: patientForLabIntegrationFixture.id,
  labId: labInfoLifeLabsFixture.id,
  status: TestResultStatus.NotReceived,
  testResultKind: TestResultKind.TestType,
  testPanelId: testPanelForPartialLipidAssessment.id,
  orderingPhysicianId: serviceProviderForTestResultForLabIntegration.id,
  specimenId: specimenExternalForLabIntegrationFixture.id,
}

export const testResultForLifeLabsUnlinkedCaseFixture: Partial<TestResult> = {
  ...testResultForLifeLabsToBeWaitingForCompletionFixture,
  id: 883,
  uuid: '116835bf-5674-41d8-bdaa-33beb64a7377',
  specimenId: specimenExternalSameCollectedOnForLabIntegrationFixture.id,
}

export const testResultForDynacareToBeWaitingForCompletionFixture: Partial<TestResult> = {
  id: 884,
  uuid: '836835bf-5374-41d8-bdaa-7bbeb64a736f',
  patientId: patientForLabIntegrationDynacareFixture.id,
  labId: labInfoDynacareFixture.id,
  status: TestResultStatus.NotReceived,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeForLabIntegrationDynacareFixture.id,
  orderingPhysicianId: serviceProviderForTestResultForLabIntegration.id,
  specimenId: specimenExternalForLabIntegrationFixture.id,
}
