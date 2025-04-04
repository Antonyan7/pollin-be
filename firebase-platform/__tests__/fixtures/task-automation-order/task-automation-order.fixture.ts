import {AutomatedTaskType, TaskPriority} from '@libs/data-layer/apps/clinic-tasks/enums/task.enum'
import {
  TestType,
  TestOrder,
  TestOrderItem,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {UserType} from '@libs/services-common/enums/patient.enum'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  SexAtBirth,
  TestOrderStatusEnum,
  OrderGroupItemEnum,
} from '@libs/data-layer/apps/clinic-test/enums'
import {AutomatedTask} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PaymentOrder, PaymentOrderItem} from '@libs/data-layer/apps/checkout/entities/typeorm'
import {PaymentOrderType} from '@libs/data-layer/apps/checkout/enum/payment-order.enum'

export const procedureStaffId = 245
export const cancelTestOrderStaffId = 321

export const serviceProviderFixture: Partial<ServiceProvider> = {
  id: 9999,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110002',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  description: 'Provider Description Fixture',
  designation: 'MD',
}

export const endometrialProcedureServiceTypeFixture: Partial<ServiceType> = {
  id: 46,
  uuid: 'c3011c87-0089-4419-9b10-c92b7a6a8c0e',
  name: 'Endometrial Biopsy',
}

export const patientWithProcedureOrderFixture: Partial<Patient> = {
  id: 50022,
  serviceProviderId: serviceProviderFixture.id,
  uuid: 'da3fa979-7db7-4f7e-b572-855c5c3af515',
  authUserId: 'patientWithProcedureOrderFixture',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

export const endometrialProcedureFixture: Partial<TestType> = {
  id: 50045,
  uuid: '505aa883-fe10-44eb-854d-84adc94c5704',
  title: 'Endometrial Biopsy',
  unit: '',
  serviceTypeId: endometrialProcedureServiceTypeFixture.id,
  specimenGroupId: null,
}

export const orderForTaskFixture: Partial<TestOrder> = {
  id: 50017,
  uuid: '30251269-1910-4aae-b2a3-6b6fa5be2807',
  patientId: patientWithProcedureOrderFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const endometrialItemFixture: Partial<TestOrderItem> = {
  id: 50076,
  type: OrderGroupItemEnum.TestType,
  testOrderId: orderForTaskFixture.id,
  testTypeId: endometrialProcedureFixture.id,
}

export const procedureTaskAutomatedFixture: Partial<AutomatedTask> = {
  id: 553,
  priority: TaskPriority.Critical,
  assigneeId: procedureStaffId,
  assignorId: procedureStaffId,
  hoursOffset: 24,
  type: AutomatedTaskType.ProcedureOrdered,
}

export const orderCancelledForTaskFixture: Partial<TestOrder> = {
  id: 50018,
  uuid: '44451269-1910-4aae-b2a3-6b6fa5be2333',
  patientId: patientWithProcedureOrderFixture.id,
  staffUserId: cancelTestOrderStaffId,
  status: TestOrderStatusEnum.Cancelled,
}

export const taskAutomatedOnCancelledPartiallyBookedOrBookedOrderFixture: Partial<AutomatedTask> = {
  id: 554,
  type: AutomatedTaskType.OrderCancelledRefundRequired,
  priority: TaskPriority.Medium,
  assigneeId: cancelTestOrderStaffId,
  assignorId: cancelTestOrderStaffId,
  hoursOffset: 72,
}

export const appointmentForCancelledTaskFixture: Partial<Appointment> = {
  id: 1001,
  patientId: patientWithProcedureOrderFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: endometrialProcedureServiceTypeFixture.id,
  testOrderId: orderCancelledForTaskFixture.id,
}

export const paymentOrderForCancelledTaskFixture: Partial<PaymentOrder> = {
  id: 2001,
  uuid: 'payment-order-uuid',
  patientId: patientWithProcedureOrderFixture.id,
  status: 'requires_capture',
  paymentMethod: PaymentOrderType.Card,
  paymentCardBrand: 'Visa',
  paymentCardLast4: '1111',
  receiptNumber: '123',
  tax: 10,
  subTotal: 10,
  total: 20,
}

export const paymentOrderItemForCancelledTaskFixture: Partial<PaymentOrderItem> = {
  id: 3001,
  paymentOrderId: paymentOrderForCancelledTaskFixture.id,
  appointmentId: appointmentForCancelledTaskFixture.id,
  price: 120,
}
