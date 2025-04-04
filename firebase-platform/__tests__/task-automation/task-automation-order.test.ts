import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {handlerOrderCancelledAutomatedTask} from '@firebase-platform/functions/tasks/src/handlers'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  ServiceTypeSeed,
  TestTypeSeed,
  TestOrderItemSeed,
  TestOrderSeed,
  PatientSeed,
  AutomatedTaskSeed,
  StaffSeed,
  TaskSeed,
  AppointmentSeed,
  PaymentOrderSeed,
  PaymentOrderItemSeed,
  ServiceProviderSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {
  endometrialProcedureServiceTypeFixture,
  endometrialProcedureFixture,
  patientWithProcedureOrderFixture,
  orderForTaskFixture,
  endometrialItemFixture,
  procedureTaskAutomatedFixture,
  taskAutomatedOnCancelledPartiallyBookedOrBookedOrderFixture,
  orderCancelledForTaskFixture,
  cancelTestOrderStaffId,
  appointmentForCancelledTaskFixture,
  paymentOrderForCancelledTaskFixture,
  paymentOrderItemForCancelledTaskFixture,
  serviceProviderFixture,
} from '../fixtures/task-automation-order/task-automation-order.fixture'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {OrderUUIDSchema} from '@libs/common/model/proto-schemas/order-uuid.schema'
import {
  AutomatedTaskDescription,
  AutomatedTaskTitle,
  TaskPriority,
} from '@libs/data-layer/apps/clinic-tasks/enums'
import {TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

jest.setTimeout(15000)
jest.mock('@google-cloud/logging-bunyan')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

describe('Task Automation: Order functions', () => {
  let dataSource: DataSource

  let taskSeed: TaskSeed
  let staffSeed: StaffSeed
  let automatedTaskSeed: AutomatedTaskSeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let testTypeSeed: TestTypeSeed
  let testOrderItemSeed: TestOrderItemSeed
  let testOrderSeed: TestOrderSeed
  let patientSeed: PatientSeed
  let appointmentSeed: AppointmentSeed
  let paymentOrderSeed: PaymentOrderSeed
  let paymentOrderItemSeed: PaymentOrderItemSeed
  let serviceProviderSeed: ServiceProviderSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    taskSeed = new TaskSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    automatedTaskSeed = new AutomatedTaskSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    testOrderItemSeed = new TestOrderItemSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    paymentOrderSeed = new PaymentOrderSeed(dataSource)
    paymentOrderItemSeed = new PaymentOrderItemSeed(dataSource)

    await staffSeed.create({
      id: procedureTaskAutomatedFixture.assigneeId,
      authUserId: 'ProcedureStaff',
    })
    await staffSeed.create({
      id: taskAutomatedOnCancelledPartiallyBookedOrBookedOrderFixture.assigneeId,
      authUserId: 'CancelledTestOrderStaff',
      email: 'fhealthdev+cancelTestOrder@gmail.com',
    })
    await serviceProviderSeed.create(serviceProviderFixture)
    await automatedTaskSeed.create(procedureTaskAutomatedFixture)
    await automatedTaskSeed.create(taskAutomatedOnCancelledPartiallyBookedOrBookedOrderFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(endometrialProcedureServiceTypeFixture)
    await testTypeSeed.create(endometrialProcedureFixture)
    await patientSeed.create(patientWithProcedureOrderFixture)
    await testOrderSeed.create(orderForTaskFixture)
    await testOrderSeed.create(orderCancelledForTaskFixture)
    await testOrderItemSeed.create(endometrialItemFixture)
    await appointmentSeed.create(appointmentForCancelledTaskFixture)
    await paymentOrderSeed.create(paymentOrderForCancelledTaskFixture)
    await paymentOrderItemSeed.create(paymentOrderItemForCancelledTaskFixture)
  })

  it('should generate task if PartiallyBooked or Booked Test Order was cancelled', async () => {
    const data = {
      orderUUID: orderCancelledForTaskFixture.uuid,
      previousOrderStatus: TestOrderStatusEnum.PartiallyBooked,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, OrderUUIDSchema))

    const result = await handlerOrderCancelledAutomatedTask(message)
    expect(result).toBeTruthy()

    const task = await taskSeed.findById(result)

    expect(task.title).toBe(AutomatedTaskTitle.get(task.automatedTaskType))
    expect(task.description).toBe(AutomatedTaskDescription.get(task.automatedTaskType))
    expect(task.priority).toBe(TaskPriority.Medium)
    expect(task.assigneeId).toBe(cancelTestOrderStaffId)
  })

  it('should not generate task if Test Order had NotCollected status', async () => {
    const data = {
      orderUUID: orderCancelledForTaskFixture.uuid,
      previousOrderStatus: TestOrderStatusEnum.NotCollected,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, OrderUUIDSchema))

    const result = await handlerOrderCancelledAutomatedTask(message)
    expect(result).toBeFalsy()
  })

  afterAll(async () => {
    await automatedTaskSeed.removeByIds([
      procedureTaskAutomatedFixture.id,
      taskAutomatedOnCancelledPartiallyBookedOrBookedOrderFixture.id,
    ])

    await taskSeed.removeByAssigneeId(procedureTaskAutomatedFixture.assigneeId)
    await taskSeed.removeByAssigneeId(
      taskAutomatedOnCancelledPartiallyBookedOrBookedOrderFixture.assigneeId,
    )

    await testOrderItemSeed.removeByIds([endometrialItemFixture.id])
    await testOrderSeed.removeByIds([orderForTaskFixture.id, orderCancelledForTaskFixture.id])

    await appointmentSeed.removeByIds([appointmentForCancelledTaskFixture.id])
    await paymentOrderItemSeed.removeByIds([paymentOrderItemForCancelledTaskFixture.id])
    await paymentOrderSeed.removeByIds([paymentOrderForCancelledTaskFixture.id])

    await staffSeed.removeByIds([
      procedureTaskAutomatedFixture.assigneeId,
      taskAutomatedOnCancelledPartiallyBookedOrBookedOrderFixture.assigneeId,
    ])

    await patientSeed.removeByIds([patientWithProcedureOrderFixture.id])
    await serviceProviderSeed.removeById(serviceProviderFixture.id)
    await testTypeSeed.removeByIds([endometrialProcedureFixture.id])
    await serviceTypeSeed.removeById(endometrialProcedureServiceTypeFixture.id)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])

    jest.clearAllMocks()
  })
})
