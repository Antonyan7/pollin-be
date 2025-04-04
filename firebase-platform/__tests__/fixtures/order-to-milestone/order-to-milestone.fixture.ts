import {
  serviceTypeSwabCollectionFixture,
  serviceTypeUrineCollectionFixture,
} from '@libs/common/test/fixtures'
import {
  LabInfo,
  TestOrder,
  TestOrderItem,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {
  PatientMilestoneStatus,
  PatientMilestoneType,
} from '@libs/services-common/enums/milestone.enum'
import {UserType} from '@libs/services-common/enums/patient.enum'
import {
  OrderGroupItemEnum,
  TestOrderStatusEnum,
  SexAtBirth,
} from '@libs/data-layer/apps/clinic-test/enums'

// Patient entities
export const patientWithOrderFixture: Partial<Patient> = {
  id: 50011,
  uuid: '4ea0ed7d-82b5-11ed-b47d-45010aa2000d',
  authUserId: 'patientWithOrderFixture',
  userType: UserType.Patient,
  sexAtBirth: SexAtBirth.Female,
}

// LabInfo entities
export const externalLabFixture: Partial<LabInfo> = {
  id: 1006,
  uuid: '6c8e319b-6e62-4d63-ba08-6c7869759937',
  name: 'External Name',
  location: 'Address',
  phone: '+454545451006',
}

// TestType entities
export const cervicalSwabFixture: Partial<TestType> = {
  id: 50034,
  uuid: '3610a761-e367-49f0-97b9-80dae5d7c8eb',
  title: 'Cervical Swab',
  abbreviation: 'CVSW',
  unit: 'mg',
  labId: externalLabFixture.id,
  serviceTypeId: serviceTypeSwabCollectionFixture.id,
  specimenGroupId: null,
}

export const testTypeUrineFixture: Partial<TestType> = {
  id: 50035,
  uuid: '444908f5-132d-11ed-814e-0242ac777777',
  title: 'Urine Analysis',
  unit: 'ml',
  labId: externalLabFixture.id,
  serviceTypeId: serviceTypeUrineCollectionFixture.id,
  specimenGroupId: null,
}

// TestOrder entities
export const orderForMilestonesFixture: Partial<TestOrder> = {
  id: 50013,
  uuid: 'e1e65037-69e7-44df-9ae8-e35b443fe015',
  patientId: patientWithOrderFixture.id,
  status: TestOrderStatusEnum.Cancelled,
}

export const orderCanceledWithMilestonesFixture: Partial<TestOrder> = {
  id: 60000,
  uuid: 'ae6350f7-20c9-4f98-a406-86f48b390686',
  patientId: patientWithOrderFixture.id,
  status: TestOrderStatusEnum.Cancelled,
}

export const orderUpdatedToGenerateNewMilestonesFixture: Partial<TestOrder> = {
  id: 60001,
  uuid: 'aaf02d1b-3897-4a3d-8882-0c94f77b4dd8',
  patientId: patientWithOrderFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

// TestOrderItem entities
export const urineItemFixture: Partial<TestOrderItem> = {
  id: 50001,
  type: OrderGroupItemEnum.TestType,
  testOrderId: orderForMilestonesFixture.id,
  testTypeId: testTypeUrineFixture.id,
}

export const swabItemFixture: Partial<TestOrderItem> = {
  id: 50002,
  type: OrderGroupItemEnum.TestType,
  testOrderId: orderForMilestonesFixture.id,
  testTypeId: cervicalSwabFixture.id,
}

export const urineItemForMilestoneGenerationFixture: Partial<TestOrderItem> = {
  id: 50003,
  type: OrderGroupItemEnum.TestType,
  testOrderId: orderUpdatedToGenerateNewMilestonesFixture.id,
  testTypeId: testTypeUrineFixture.id,
}

export const swabItemForMilestoneGenerationFixture: Partial<TestOrderItem> = {
  id: 50004,
  type: OrderGroupItemEnum.TestType,
  testOrderId: orderUpdatedToGenerateNewMilestonesFixture.id,
  testTypeId: cervicalSwabFixture.id,
}

// PatientMilestone entities
export const patientMilestoneServiceTypeToBeRemovedFixture: Partial<PatientMilestone> = {
  id: 80000,
  patientId: patientWithOrderFixture.id,
  testOrderId: orderCanceledWithMilestonesFixture.id,
  status: PatientMilestoneStatus.Upcoming,
  type: PatientMilestoneType.ServiceType,
}

export const patientMilestoneServiceTypeWithTestsToBeRemovedFixture: Partial<PatientMilestone> = {
  id: 80001,
  patientId: patientWithOrderFixture.id,
  testOrderId: orderCanceledWithMilestonesFixture.id,
  status: PatientMilestoneStatus.Upcoming,
  type: PatientMilestoneType.ServiceTypeWithTests,
}

export const patientMilestoneWillBeRemovedAfterOrderUpdateFixture: Partial<PatientMilestone> = {
  id: 80002,
  patientId: patientWithOrderFixture.id,
  testOrderId: orderUpdatedToGenerateNewMilestonesFixture.id,
  status: PatientMilestoneStatus.Upcoming,
  type: PatientMilestoneType.ServiceType,
}
