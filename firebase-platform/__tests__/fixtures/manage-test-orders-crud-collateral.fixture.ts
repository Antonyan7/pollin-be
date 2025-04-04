import {DateTimeUtil} from '@libs/common'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {
  LabInfo,
  LabMachine,
  Specimen,
  SpecimenGroup,
  SuperType,
  TestOrder,
  TestOrderItem,
  TestPanel,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  Appointment,
  ServiceProvider,
  ServiceProviderGroup,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {NotificationState, UserType} from '@libs/services-common/enums/patient.enum'
import {OrderGroupItemEnum, TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'

const dateUtil = new DateTimeUtil()

// service types
export const serviceTypeFixture: Partial<ServiceType> = {
  id: 10092,
  uuid: 'uuid-222-333-444-555',
  name: 'Name',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
  // superTypeId: superTypeBlood.id,
}

export const serviceTypeSemenFixture: Partial<ServiceType> = {
  id: 10093,
  uuid: 'ea2d3fc4-ac5c-4d6b-b0e5-e906857c23da',
  name: 'Semen Service type',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
  // superTypeId: superTypeSemen.id,
}

export const serviceTypeSwabFixture: Partial<ServiceType> = {
  id: 10094,
  uuid: '9c9c2519-0105-47ce-ac7a-cd9f0f1a8b90',
  name: 'Swab Service type',
  durationInMinutes: 10,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
  // superTypeId: superTypeSwab.id,
}

export const serviceTypeUrineFixture: Partial<ServiceType> = {
  id: 10095,
  uuid: '7c7157ab-7408-413c-97b8-78a9f4e249bc',
  name: 'Urine Service type',
  durationInMinutes: 10,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
  // superTypeId: superTypeSwab.id,
}

// Cycle Monitoring service
export const serviceTypeCMBloodFixture: Partial<ServiceType> = {
  id: 10096,
  uuid: '117157ab-1108-413c-97b8-78a9f4e24911',
  name: 'CM Blood Service type',
  durationInMinutes: 10,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

export const serviceTypeSemenDropoffFixture: Partial<ServiceType> = {
  id: 10097,
  uuid: '227157ab-1108-413c-97b8-78a9f4e24922',
  name: 'Semen Dropoff Service type',
  durationInMinutes: 10,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

export const serviceTypeBiopsyFixture: Partial<ServiceType> = {
  id: 10098,
  uuid: 'e2694fc2-96b4-4dde-972b-2f3f35b9bfab',
  name: 'Biopsy Service type',
  durationInMinutes: 10,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

export const superTypeBlood: Partial<SuperType> = {
  id: 100,
  uuid: 'bl2d3fc4-ac5c-4d6b-b0e5-e906857c23d1',
  name: 'Blood Super Type',
  specialWorkflow: ServiceTypeWorkflow.Blood,
}

export const superTypeUrine: Partial<SuperType> = {
  id: 101,
  uuid: 'ur2d3fc4-ac5c-4d6b-b0e5-e906857c23d2',
  name: 'Urine Super Type',
  specialWorkflow: ServiceTypeWorkflow.Urine,
}

export const superTypeSemen: Partial<SuperType> = {
  id: 102,
  uuid: 'sm2d3fc4-ac5c-4d6b-b0e5-e906857c23d3',
  name: 'Semen Super Type',
  specialWorkflow: ServiceTypeWorkflow.Semen,
}

export const superTypeSwab: Partial<SuperType> = {
  id: 103,
  uuid: 'sw2d3fc4-ac5c-4d6b-b0e5-e906857c23d4',
  name: 'Swab Super Type',
  specialWorkflow: ServiceTypeWorkflow.Swab,
}

export const superTypeBiopsy: Partial<SuperType> = {
  id: 104,
  uuid: '1319c684-e8d6-401f-a3df-de067592569a',
  name: 'Biopsy Super Type',
  specialWorkflow: ServiceTypeWorkflow.Biopsy,
}

export const specimenGroupFixture: Partial<SpecimenGroup> = {
  id: 1007,
}

export const labInfoFixture: Partial<LabInfo> = {
  id: 1006,
  uuid: '6d5bb10b-1117-4cdc-8705-63f1eecd1006',
  name: 'MTO Laboratory Name',
  location: 'Address MTO',
  phone: '+454545451006',
}

export const serviceProviderGroupDoctor: Partial<ServiceProviderGroup> = {
  id: 1011,
  title: 'Doctor',
  sequence: 1,
}

export const serviceProviderFixture: Partial<ServiceProvider> = {
  id: 1010,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110002',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  description: 'Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
}

export const patientFixture: Partial<Patient> = {
  id: 1009,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1009',
  authUserId: AuthUserFixture.spermCryoPartner.uid,
  firstName: 'EmailVerified',
  lastName: 'EmailVerified',
  middleName: 'EmailVerified',
  stripeCustomerId: 'stripeCustomerId',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
}
export const labMachineFixture: Partial<LabMachine> = {
  id: 1012,
  uuid: 'labMachi-132d-11ed-814e-0242ac111012',
  name: 'MTO First lab machine name',
}

export const testOrderFixture: Partial<TestOrder> = {
  id: 1011,
  uuid: 'testOrder132d-11ed-811e-0242ac121005',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderWithOrderActionFixture: Partial<TestOrder> = {
  id: 1015,
  uuid: 'testOrder142d-11ed-811e-0242ac121006',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testPanelFixture: Partial<TestPanel> = {
  id: 1003,
  title: 'MTO Test Panel Title (Blood)',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 100,
  serviceTypeId: serviceTypeFixture.id,
  superTypeId: superTypeBlood.id,
}

export const testTypeSemenFixture: Partial<TestType> = {
  id: 3000,
  uuid: '15cb9192-6ec9-4760-bdf6-6bf0b17a6c83',
  title: 'Semen test type title',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 200,
  serviceTypeId: serviceTypeSemenFixture.id,
  superTypeId: superTypeSemen.id,
}

export const testTypeSwabFixture: Partial<TestType> = {
  id: 3001,
  uuid: '9664329e-c9ba-454d-849f-0359bd07d21a',
  title: 'Swab test type title',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 50,
  serviceTypeId: serviceTypeSwabFixture.id,
  superTypeId: superTypeSwab.id,
}

export const testPanelUrineFixture: Partial<TestPanel> = {
  id: 3002,
  uuid: '09905b87-94c5-428d-9cc3-b4decd00dbf0',
  title: 'Urine test panel title',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 70,
  serviceTypeId: serviceTypeUrineFixture.id,
  superTypeId: superTypeUrine.id,
}

export const testTypeCMBloodFixture: Partial<TestType> = {
  id: 3003,
  uuid: '1164329e-c9ba-454d-849f-0359bd07d211',
  title: 'CM Estradiol',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 50,
  serviceTypeId: serviceTypeCMBloodFixture.id,
}

export const testTypeSemenDropoffFixture: Partial<TestType> = {
  id: 3004,
  uuid: '2264329e-c9ba-454d-849f-0359bd07d222',
  title: 'Semen Dropoff',
  labId: labInfoFixture.id,
  specimenGroupId: null,
  price: 50,
  serviceTypeId: serviceTypeSemenDropoffFixture.id,
}

export const testTypeCervicalSwabFixture: Partial<TestType> = {
  id: 3005,
  uuid: '9664329e-c9ba-454d-849f-0359bd07d223',
  title: 'Cervical Swab',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 150,
  serviceTypeId: serviceTypeSwabFixture.id,
  superTypeId: superTypeSwab.id,
}

export const testPanelBiopsyFixture: Partial<TestPanel> = {
  id: 3006,
  uuid: '6d604e31-3847-4c64-ad58-554638e68ca8',
  title: 'Biopsy test panel title',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 70,
  serviceTypeId: serviceTypeBiopsyFixture.id,
  superTypeId: superTypeBiopsy.id,
}

export const testOrderItemFixture: Partial<TestOrderItem> = {
  id: 1004,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderFixture.id,
  testPanelId: testPanelFixture.id,
}

export const testOrderItemForSemenFixture: Partial<TestOrderItem> = {
  id: 1005,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeSemenFixture.id,
}

export const testOrderItemForSwabFixture: Partial<TestOrderItem> = {
  id: 1006,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeSwabFixture.id,
}

export const testOrderItemForUrineFixture: Partial<TestOrderItem> = {
  id: 1007,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderFixture.id,
  testPanelId: testPanelUrineFixture.id,
}

export const testOrderItemForCervicalSwabFixture: Partial<TestOrderItem> = {
  id: 1008,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeCervicalSwabFixture.id,
}

export const testOrderToCancelFixture: Partial<TestOrder> = {
  id: 2141,
  uuid: 'testOrder112d-11ed-811e-7241ac121005',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const specimenOfTestOrderCancelFixture: Partial<Specimen> = {
  id: 2142,
  uuid: 'tSpecimen112d-11ed-811e-7241ac121005',
  patientId: patientFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  testOrderId: testOrderToCancelFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const patientForProcedureFixture: Partial<Patient> = {
  id: 1010,
  uuid: '0c5bc88d-101a-419f-8908-883915198af5',
  authUserId: AuthUserFixture.acknowledgedMedications.uid,
  firstName: 'EmailVerified',
  lastName: 'EmailVerified',
  middleName: 'EmailVerified',
  stripeCustomerId: 'procedureStripeCustomerId',
  serviceProviderId: serviceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
}

export const testPanelProcedureFixture: Partial<TestPanel> = {
  id: 1005,
  title: 'MTO Test Panel Title',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 100,
  serviceTypeId: serviceTypeFixture.id,
}

export const testOrderProcedureFixture: Partial<TestOrder> = {
  id: 10099,
  uuid: '8066f289-1c4b-412d-ba5a-1e368dfc4b70',
  patientId: patientForProcedureFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderItemProcedureFixture: Partial<TestOrderItem> = {
  id: 1008,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderProcedureFixture.id,
  testPanelId: testPanelProcedureFixture.id,
}
// Cycle monitoring
export const testOrderItemCMBloodFixture: Partial<TestOrderItem> = {
  id: 1009,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeCMBloodFixture.id,
}

// Semen Dropoff
export const testOrderItemDropoffSemenFixture: Partial<TestOrderItem> = {
  id: 1010,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: testTypeSemenDropoffFixture.id,
}

// With Super Type
export const testOrderItemOrderActionBloodFixture: Partial<TestOrderItem> = {
  id: 1101,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderWithOrderActionFixture.id,
  testPanelId: testPanelFixture.id,
}

export const testOrderItemOrderActionSemenFixture: Partial<TestOrderItem> = {
  id: 1102,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderWithOrderActionFixture.id,
  testTypeId: testTypeSemenFixture.id,
}

export const testOrderItemOrderActionSwabFixture: Partial<TestOrderItem> = {
  id: 1103,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderWithOrderActionFixture.id,
  testTypeId: testTypeSwabFixture.id,
}

export const testOrderItemOrderActionUrineFixture: Partial<TestOrderItem> = {
  id: 1104,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderWithOrderActionFixture.id,
  testPanelId: testPanelUrineFixture.id,
}

export const testOrderItemOrderActionBiopsyFixture: Partial<TestOrderItem> = {
  id: 1105,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderWithOrderActionFixture.id,
  testPanelId: testPanelBiopsyFixture.id,
}

export const appointmentBloodFixture: Partial<Appointment> = {
  id: 1000,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateUtil.now(),
  end: dateUtil.addHours(dateUtil.now(), 1),
  testOrderId: testOrderWithOrderActionFixture.id,
}

export const appointmentUrineFixture: Partial<Appointment> = {
  id: 1001,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeUrineFixture.id,
  start: dateUtil.now(),
  end: dateUtil.addHours(dateUtil.now(), 1),
  testOrderId: testOrderWithOrderActionFixture.id,
}

export const appointmentSemenFixture: Partial<Appointment> = {
  id: 1002,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSemenFixture.id,
  start: dateUtil.now(),
  end: dateUtil.addHours(dateUtil.now(), 1),
  testOrderId: testOrderWithOrderActionFixture.id,
}

export const appointmentSwabFixture: Partial<Appointment> = {
  id: 1003,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeSwabFixture.id,
  start: dateUtil.now(),
  end: dateUtil.addHours(dateUtil.now(), 1),
  testOrderId: testOrderWithOrderActionFixture.id,
}

export const appointmentBiopsyFixture: Partial<Appointment> = {
  id: 1004,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeBiopsyFixture.id,
  start: dateUtil.now(),
  end: dateUtil.addHours(dateUtil.now(), 1),
  testOrderId: testOrderWithOrderActionFixture.id,
}

export const appointmentOrderFixture: Partial<Appointment> = {
  id: 1005,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateUtil.now(),
  end: dateUtil.addHours(dateUtil.now(), 1),
  testOrderId: testOrderWithOrderActionFixture.id,
}
