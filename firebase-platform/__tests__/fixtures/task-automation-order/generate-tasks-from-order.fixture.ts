import {
  TestOrder,
  TestOrderItem,
  TestType,
  SuperType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestOrderStatusEnum, OrderGroupItemEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {Patient, CareTeam} from '@libs/data-layer/apps/users/entities/typeorm'
import {UserType, ServiceProviderPosition} from '@libs/services-common/enums'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {AutomatedTask, Staff, Task} from '@libs/data-layer/apps/clinic-tasks/entities'
import {AutomatedTaskType, TaskPriority} from '@libs/data-layer/apps/clinic-tasks/enums'
import {
  ServiceType,
  ServiceProvider,
  ServiceProviderGroup,
  Appointment,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {AppointmentStatus} from '@libs/common/enums'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const superTypeId = 60000
const serviceTypeId = 60000

export const staffFixtureInFirebase: Partial<Staff> = {
  id: 60000,
  authUserId: 'test-auth-user-id',
  uuid: '508c9f6f-6b48-4de7-8ade-abcff9456966',
  email: 'Nestproject+staff+with+billing+number@test+com',
  firstName: 'FirstStaff',
  lastName: 'LastStaff',
  active: true,
  billingNumberForMdBilling: '00001',
}

export const serviceProviderGroupFixture: Partial<ServiceProviderGroup> = {
  id: 60000,
  title: 'Care Navigator',
  sequence: 0,
  showOnPatientFiltering: true,
  position: ServiceProviderPosition.CareNavigator,
}

export const serviceProviderFixture: Partial<ServiceProvider> = {
  id: 60000,
  uuid: '9f8c49eb-b26a-41eb-89f5-92f0abd2fd46',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  videoURL: 'videoUrl',
  description: 'Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: serviceProviderGroupFixture.id,
  maxAppointmentCountPerSlot: 10,
}

export const careNavigatorFixture: Partial<Staff> = {
  id: 60001,
  uuid: 'fb53ab2c-9e03-4f7a-b2a3-74fe5635d3e2',
  email: 'Nestproject+staff+with+care+navigator@test+com',
  firstName: 'Care',
  lastName: 'Navigator',
  active: true,
  billingNumberForMdBilling: '00002',
  serviceProviderId: serviceProviderFixture.id,
}

export const careTeamFixture: Partial<CareTeam> = {
  id: 1,
  mainServiceProviderId: serviceProviderFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  sequence: 2,
}

export const patientForGenerateTaskOrderFixture: Partial<Patient> = {
  id: 60000,
  uuid: '7dd0bcd2-f8b1-4e83-a9f3-873368b69fa8',
  authUserId: 'patientWithProcedureOrderFixture',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
  serviceProviderId: serviceProviderFixture.id,
}

export const orderForGenerateTaskSuccessCaseFixture: Partial<TestOrder> = {
  id: 60000,
  uuid: 'd6fe9b22-034f-4611-badd-551d3846119c',
  patientId: patientForGenerateTaskOrderFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const orderForGenerateTaskFailCaseFixture: Partial<TestOrder> = {
  id: 60001,
  uuid: 'df04f5a6-f7e1-408e-a2eb-80cd6f55947a',
  patientId: patientForGenerateTaskOrderFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const procedureTaskAutomatedFixture: Partial<AutomatedTask> = {
  id: 60000,
  priority: TaskPriority.Critical,
  hoursOffset: 24,
  assigneeId: staffFixtureInFirebase.id,
  assignorId: staffFixtureInFirebase.id,
  type: AutomatedTaskType.DeletedTaskWithOrderAction,
}

export const automatedTaskWithResultFixture: Partial<AutomatedTask> = {
  id: 60001,
  priority: TaskPriority.Critical,
  hoursOffset: 24,
  assigneeId: staffFixtureInFirebase.id,
  assignorId: staffFixtureInFirebase.id,
  type: AutomatedTaskType.TaskWithResults,
}

export const defaultServiceTypeFixture: Partial<ServiceType> = {
  id: 60001,
  uuid: '14a2e104-099d-44a6-988b-79ed40ac05d2',
  name: 'Endometrial Biopsy',
}

export const superTypeFixture: Partial<SuperType> = {
  id: superTypeId,
  uuid: 'c72f11d7-594a-4046-a309-3f55254f4f1f',
  name: 'Blood Collection',
  specialWorkflow: ServiceTypeWorkflow.Blood,
  groupOrderActionsByWorkflow: true,
  defaultServiceTypeId: defaultServiceTypeFixture.id,
}

export const endometrialProcedureServiceTypeFixture: Partial<ServiceType> = {
  id: serviceTypeId,
  uuid: 'd83a6496-ae11-4b78-a448-c796710ceaf4',
  name: 'Endometrial Biopsy',
}

export const endometrialBiopsyFixture: Partial<TestType> = {
  id: 60000,
  uuid: '505aa883-fe10-44eb-854d-84adc94c5704',
  title: 'Endometrial Biopsy',
  unit: '',
  serviceTypeId: endometrialProcedureServiceTypeFixture.id,
  specimenGroupId: null,
  superTypeId: superTypeId,
}

export const orderItemSuccessFixture: Partial<TestOrderItem> = {
  id: 60000,
  type: OrderGroupItemEnum.TestType,
  testOrderId: orderForGenerateTaskSuccessCaseFixture.id,
  testTypeId: endometrialBiopsyFixture.id,
}

export const taskRelatedToOrder: Partial<Task> = {
  id: 444,
  uuid: '52a980f9-3270-4f3b-a015-0071d535973d',
  automatedTaskType: AutomatedTaskType.DeletedTaskWithOrderAction,
  patientId: patientForGenerateTaskOrderFixture.id,
  assigneeId: staffFixtureInFirebase.id,
  priority: TaskPriority.High,
  dueDate: dateTimeUtil.now(),
  testOrderId: orderForGenerateTaskSuccessCaseFixture.id,
}

export const appointmentRelatedToOrderFixture: Partial<Appointment> = {
  id: 222,
  patientId: patientForGenerateTaskOrderFixture.id,
  testOrderId: orderForGenerateTaskSuccessCaseFixture.id,
  status: AppointmentStatus.Booked,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: endometrialProcedureServiceTypeFixture.id,
  start: dateTimeUtil.toDate('2022-09-07 01:01:24'),
  end: dateTimeUtil.toDate('2022-09-07 01:02:24'),
  description: 'TEST_DESC',
}
