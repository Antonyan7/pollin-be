import {TestOrderAction} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  patientMilestoneForOrderActionsFixture,
  patientMilestoneServiceTypeWithTestsForOrderActionsFixture,
  patientMilestoneTestOrderForViewStateFixture,
} from './patient-milestone.fixture'
import {testOrderFixture, testOrderForOrderActionsFixture} from './test-order.fixture'
import {TestResultsGenerationStatusEnum} from '@libs/data-layer/apps/clinic-test/enums/test-order.enum'
import {DateTimeUtil} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const testOrderActionForGroupFixture: Partial<TestOrderAction> = {
  id: 1,
  encodedIdentifier: 'eyJ0ZXN0T3JkZXJJZCI6MzMsInRlc3RUeXBlSWRzIjpbNTddLCJ0ZXN0UGFuZWxJZHMiOltdfQ==',
  testOrderId: testOrderForOrderActionsFixture.id,
  milestoneId: patientMilestoneServiceTypeWithTestsForOrderActionsFixture.id,
}

export const testOrderActionForSingleItemFixture: Partial<TestOrderAction> = {
  id: 2,
  encodedIdentifier: 'eyJ0ZXN0T3JkZXJJZCI6MzMsInRlc3RUeXBlSWRzIjpbNTZdLCJ0ZXN0UGFuZWxJZHMiOltdfQ==',
  testOrderId: testOrderForOrderActionsFixture.id,
  milestoneId: patientMilestoneForOrderActionsFixture.id,
}

export const testOrderActionForViewStateFixture: Partial<TestOrderAction> = {
  id: 3,
  encodedIdentifier: 'eyJ0ZXN0T3JkZXJJZCI6MSwidGVzdFR5cGVJZHMiOls1OF0sInRlc3RQYW5lbElkcyI6WzExXX0=',
  testOrderId: testOrderFixture.id,
  milestoneId: patientMilestoneTestOrderForViewStateFixture.id,
  testResultGenerationStatus: TestResultsGenerationStatusEnum.Success,
  lastTestResultGenerationOn: dateTimeUtil.now(),
}
