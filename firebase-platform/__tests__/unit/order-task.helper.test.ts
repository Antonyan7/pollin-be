import * as OrderDataAccessModule from '@codebase/tasks/common/order/order-data-access'
import {getAssigneeId} from '@codebase/tasks/common/order/order-task.helper'

jest.mock('@codebase/tasks/common/order/order-data-access', () => ({
  __esModule: true,
  ...jest.requireActual('@codebase/tasks/common/order/order-data-access'),
}))

describe('Order Task helper: getAssigneeId', () => {
  it('should return null if patient does not have care navigator assigned', async () => {
    const spyHelper = jest.spyOn(OrderDataAccessModule, 'getCareNavigator')
    spyHelper.mockResolvedValue(null)
    const result = await getAssigneeId(1)

    expect(result).toBe(null)
  })
})
