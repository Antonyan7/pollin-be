import {TestResultMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testResultForDynacareToBeWaitingForCompletionFixture,
  testResultForLifeLabsStatusNotUpdatedFixture,
  testResultForLifeLabsToBeWaitingForCompletionFixture,
  testResultForLifeLabsUnlinkedCaseFixture,
} from './test-result.fixture'
import {
  testTypeForLabIntegrationDynacareFixture,
  testTypeForLabIntegrationFixture,
  testTypeOneForLabIntegrationFixture,
  testTypeWithoutIntegrationCodeForLabIntegrationFixture,
} from './test-type.fixture'

export const testResultMeasurementForLabIntegrationFixture: Partial<TestResultMeasurement> = {
  id: 451,
  uuid: '4b9c8a4e-db10-4ce7-a9ef-a5ae21d7505e',
  testResultId: testResultForLifeLabsToBeWaitingForCompletionFixture.id,
  testTypeId: testTypeForLabIntegrationFixture.id,
}

export const testResultMeasurementOneForLinkedAndStatusForLabIntegrationFixture: Partial<TestResultMeasurement> =
  {
    id: 551,
    uuid: '339c8a4e-db10-4ce7-a9ef-a5ae21d7505e',
    testResultId: testResultForLifeLabsStatusNotUpdatedFixture.id,
    testTypeId: testTypeOneForLabIntegrationFixture.id,
  }

export const testResultMeasurementTwoForLinkedAndStatusForLabIntegrationFixture: Partial<TestResultMeasurement> =
  {
    id: 552,
    uuid: '009c8a4e-db10-4ce7-a9ef-a5ae21d7505e',
    testResultId: testResultForLifeLabsStatusNotUpdatedFixture.id,
    testTypeId: testTypeWithoutIntegrationCodeForLabIntegrationFixture.id,
  }

export const testResultMeasurementLifeLabsUnlinkedCaseFixture: Partial<TestResultMeasurement> = {
  id: 661,
  uuid: '779c8a4e-db10-4ce7-a9ef-a5ae21d7505e',
  testResultId: testResultForLifeLabsUnlinkedCaseFixture.id,
  testTypeId: testTypeForLabIntegrationFixture.id,
}

export const testResultMeasurementForLabIntegrationDynacareFixture: Partial<TestResultMeasurement> =
  {
    id: 771,
    uuid: 'kk9c8a4e-db10-4ce7-a9ef-a5ae21d7505e',
    testResultId: testResultForDynacareToBeWaitingForCompletionFixture.id,
    testTypeId: testTypeForLabIntegrationDynacareFixture.id,
  }
