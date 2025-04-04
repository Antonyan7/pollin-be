import {UpdateOrderStatus} from '@firebase-platform/functions/test-orders-and-results/src/common'

const updateOrderStatus = new UpdateOrderStatus()
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')

describe('Manage test orders helper functions', () => {
  test('should return true if ordered & Completed Specimen', async () => {
    expect(
      updateOrderStatus.checkTestOrderIsReadyToBeCompleted({
        isAllSpecimenCompleted: true,
        isAllTestResultCompleted: true,
        isAllOrderActionBooked: true,
      }),
    ).toBe(true)
  })

  test('should return false if ordered & exists Not Completed Specimen', async () => {
    expect(
      updateOrderStatus.checkTestOrderIsReadyToBeCompleted({
        isAllSpecimenCompleted: false,
        isAllTestResultCompleted: false,
        isAllOrderActionBooked: true,
      }),
    ).toBe(false)
  })

  test('should return true for test order is not associated with neither specimen. Associated with Ultrasound or Result without Specimen, Order Actions are booked', async () => {
    expect(
      updateOrderStatus.checkTestOrderIsReadyToBeCompleted({
        isAllSpecimenCompleted: true,
        isAllTestResultCompleted: true,
        isAllOrderActionBooked: true,
      }),
    ).toBe(true)
  })
})
