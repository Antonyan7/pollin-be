import {
  SpecimenGroup,
  TestOrder,
  TestOrderItem,
  TestPanel,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {createSpecimenGroupToTestOrderItemsMap} from '@firebase-platform/functions/test-orders-and-results/src/common/services/specimen-blood.service'

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const testOrder = new TestOrder()
testOrder.patient = new Patient()
testOrder.patient.patientIdentifier = 'PID'

const specimenGroupForTestType = new SpecimenGroup()
specimenGroupForTestType.id = 1

const specimenGroupForTestPanel = new SpecimenGroup()
specimenGroupForTestPanel.id = 2

const testType = new TestType()
testType.specimenGroup = specimenGroupForTestType
testType.specimenGroupId = specimenGroupForTestType.id
const testOrderItemWithTestType = new TestOrderItem()
testOrderItemWithTestType.testType = testType
testOrderItemWithTestType.testOrder = testOrder

const testPanel = new TestPanel()
testPanel.specimenGroup = specimenGroupForTestPanel
testPanel.specimenGroupId = specimenGroupForTestPanel.id
const testOrderItemWithTestPanel = new TestOrderItem()
testOrderItemWithTestPanel.testPanel = testPanel
testOrderItemWithTestPanel.testOrder = testOrder

const testOrderItems: TestOrderItem[] = [testOrderItemWithTestType, testOrderItemWithTestPanel]

describe('Manage test orders for specimen helpers', () => {
  test('Should run createSpecimenGroupToTestOrderItemsMap() method and return map list', async () => {
    const specimenGroupToTestOrderItemsMap = createSpecimenGroupToTestOrderItemsMap(
      testOrder,
      testOrderItems,
    )

    expect(specimenGroupToTestOrderItemsMap).toBeDefined()
  })
})
