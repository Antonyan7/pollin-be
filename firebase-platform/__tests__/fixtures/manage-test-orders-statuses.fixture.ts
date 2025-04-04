/* eslint-disable max-lines */
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {
  LabInfo,
  LabMachine,
  Specimen,
  SpecimenGroup,
  TestOrder,
  TestOrderItem,
  TestPanel,
  TestResult,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  Appointment,
  ServiceProvider,
  ServiceProviderGroup,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {
  MilestoneToTestTypeOrPanel,
  Patient,
  PatientMilestoneToAppointment,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {
  FinalResultType,
  HormoneType,
  OrderGroupItemEnum,
  ResultStatusForPatient,
  SpecimenProcessingLocation,
  SpecimenStatus,
  TestOrderStatusEnum,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  PatientMilestoneStatus,
  PatientMilestoneType,
} from '@libs/services-common/enums/milestone.enum'
import {NotificationState, UserType} from '@libs/services-common/enums/patient.enum'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const serviceTypeFixture: Partial<ServiceType> = {
  id: 10088,
  uuid: 'uuid-222-333-444-777',
  name: 'Name',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

export const serviceTypeProcedureFixture: Partial<ServiceType> = {
  id: 10096,
  uuid: '5b82d703-404a-405c-97f0-8f9f664135ff',
  name: 'Procedure',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

export const serviceTypeForProcedureFixture: Partial<ServiceType> = {
  id: 10097,
  uuid: '7772d703-404a-405c-97f0-8f9f66413777',
  name: 'Procedure service type',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

export const serviceTypeForProcedureBookedFixture: Partial<ServiceType> = {
  id: 10098,
  uuid: '8882d703-404a-405c-97f0-8f9f66413888',
  name: 'Procedure service type',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

export const serviceTypeForUltrasoundFixture: Partial<ServiceType> = {
  id: 10099,
  uuid: '9882d703-404a-405c-97f0-8f9f66413999',
  name: 'Ultrasound service type',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'milestoneSummary',
  longDescription: 'longDescription',
  shortDescription: 'shortDescription',
}

// Panel related
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
  authUserId: AuthUserFixture.taskReassign.uid,
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

export const testOrderNotCollectedFixture: Partial<TestOrder> = {
  id: 1004,
  uuid: 'testOrder199d-11ed-811e-0242ac121005',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.Booked,
}
export const testOrderFixture: Partial<TestOrder> = {
  id: 1005,
  uuid: 'testOrder132d-11ed-811e-0242ac121005',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

// for Reject Specimen flow
export const testOrderWillBeCompletedFixture: Partial<TestOrder> = {
  id: 1006,
  uuid: 'acc1252d-fdd7-4f5b-941d-0e9bb68a2fb8',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
}

// for Reject Specimen flow
export const testOrderWillNotBecomeCompletedFixture: Partial<TestOrder> = {
  id: 1007,
  uuid: '7771252d-fdd7-4f5b-941d-0e9bb68a2fb8',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
}

// for Reject Specimen flow
export const testOrderWillBecomeAwaitingResultsFixture: Partial<TestOrder> = {
  id: 1008,
  uuid: '3771252d-fdd7-4faa-941d-0e9bb68a2fb8',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

// for Ultrasound result
export const testOrderUltrasoundFixture: Partial<TestOrder> = {
  id: 1009,
  uuid: '4771252d-fdd7-4faa-941d-0e9bb68a2fb9',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
}

export const specimenFixture: Partial<Specimen> = {
  id: 1001,
  uuid: 'testOrder132d-11ed-811e-0242sp321005',
  specimenIdentifier: 'S0000001001',
  patientId: patientFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Completed,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

// for Reject Specimen flow
export const specimenRejectedFixture: Partial<Specimen> = {
  id: 1002,
  uuid: '51c0184f-b682-4dd2-8e14-71cb6b93afed',
  specimenIdentifier: 'S0000001002',
  patientId: patientFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Rejected,
  rejectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderWillBeCompletedFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

// for Reject Specimen flow
export const specimenRejectedForRejectedFlowFixture: Partial<Specimen> = {
  id: 1003,
  uuid: '51c0184f-b682-4dd2-8e14-71cb6b93af77',
  specimenIdentifier: 'S0000001003',
  patientId: patientFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Rejected,
  rejectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderWillNotBecomeCompletedFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

// for Reject Specimen flow
export const specimenInProgressForRejectionFlowFixture: Partial<Specimen> = {
  id: 1004,
  uuid: '77c0184f-b682-4dd2-8e14-71cb6b93afed',
  specimenIdentifier: 'S0000001004',
  patientId: patientFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.InProgress,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderWillNotBecomeCompletedFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const specimenRejectedForRejectionFlowFixture: Partial<Specimen> = {
  id: 1005,
  uuid: '33c0184f-b682-4dd2-8e14-71cb6b93afed',
  specimenIdentifier: 'S0000001005',
  patientId: patientFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Rejected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderWillBecomeAwaitingResultsFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const specimenCollectedForRejectionFlowFixture: Partial<Specimen> = {
  id: 1006,
  uuid: '111c0184f-b682-4dd2-8e14-71cb6b93afe',
  specimenIdentifier: 'S0000001006',
  patientId: patientFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  machineId: labMachineFixture.id,
  status: SpecimenStatus.Collected,
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testOrderWillBecomeAwaitingResultsFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const testPanelFixtureFirebase: Partial<TestPanel> = {
  id: 1003,
  uuid: 'testPanelFixtureUUID',
  title: 'MTO Test Panel Title',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testPanelForProcedureFixture: Partial<TestPanel> = {
  id: 1004,
  title: 'Procedure Test Panel Title',
  labId: labInfoFixture.id,
  serviceTypeId: serviceTypeProcedureFixture.id,
}

export const testPanelWithProcedureFixture: Partial<TestPanel> = {
  id: 1005,
  title: 'Procedure Test Panel',
  labId: labInfoFixture.id,
  serviceTypeId: serviceTypeForProcedureFixture.id,
}

export const testPanelWithProcedureForBookedFixture: Partial<TestPanel> = {
  id: 1006,
  title: 'Procedure Test Panel for booked',
  labId: labInfoFixture.id,
  serviceTypeId: serviceTypeForProcedureBookedFixture.id,
}

export const testTypeUltrasoundFixture: Partial<TestType> = {
  id: 1007,
  title: 'Ultrasound test type',
  labId: labInfoFixture.id,
  serviceTypeId: serviceTypeForUltrasoundFixture.id,
  processType: ProcessType.UltrasoundDay3,
}

export const testResultFixture: Partial<TestResult> = {
  id: 1002,
  patientId: patientFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  specimenId: specimenFixture.id,
  testResultKind: TestResultKind.TestPanel,
  testPanelId: testPanelFixtureFirebase.id,
  comment: 'MTO Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
  testOrderId: testOrderFixture.id,
}

export const testOrderItemFixture: Partial<TestOrderItem> = {
  id: 3000,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderFixture.id,
  testPanelId: testPanelFixtureFirebase.id,
}
// test type related

export const testTypeSpecimenGroupFixture: Partial<SpecimenGroup> = {
  id: 2007,
}
export const testTypeLabInfoFixture: Partial<LabInfo> = {
  id: 2006,
  uuid: '6d5bg20b-1117-4cdc-8705-63f1eecd1006',
  name: 'test type MTO Laboratory Name',
  location: 'test type Address MTO',
  phone: '+454545441015',
}

export const testTypeServiceProviderGroupDoctor: Partial<ServiceProviderGroup> = {
  id: 2011,
  title: 'test type Doctor',
  sequence: 2,
}
export const testTypeServiceProviderFixture: Partial<ServiceProvider> = {
  id: 2010,
  uuid: 'c6c908f5-132d-11ed-814e-0242az110107',
  title: 'test type Dr. John Doe',
  imageURL: 'TT_IMG',
  description: 'test type Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: testTypeServiceProviderGroupDoctor.id,
}
export const testTypePatientFixture: Partial<Patient> = {
  id: 2009,
  uuid: '1651cf57-2a3f-47d0-8791-k773fa1z1009',
  authUserId: AuthUserFixture.emailVerifiedOther.uid,
  firstName: 'test type EmailVerified',
  lastName: 'test type EmailVerified',
  middleName: 'test type EmailVerified',
  stripeCustomerId: 'TTStripeCustomerId',
  serviceProviderId: testTypeServiceProviderFixture.id,
  userType: UserType.Patient,
  notificationState: NotificationState.InvitePartners,
}
export const testTypeLabMachineFixture: Partial<LabMachine> = {
  id: 2012,
  uuid: 'laTTachi-132d-11ed-814e-0242ac111012',
  name: 'TT MTO First lab machine name',
}

export const testTypeTestOrderFixture: Partial<TestOrder> = {
  id: 2005,
  uuid: 'testOrder132d-11ed-811e-0243jk121005',
  patientId: testTypePatientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testTypeSpecimenFixture: Partial<Specimen> = {
  id: 2001,
  uuid: 'testSpFix132d-11ed-811e-0242tt121005',
  specimenIdentifier: 'S0000001481',
  patientId: testTypePatientFixture.id,
  specimenGroupId: testTypeSpecimenGroupFixture.id,
  machineId: testTypeLabMachineFixture.id,
  status: SpecimenStatus.NotCollected,
  collectedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  processingLocation: SpecimenProcessingLocation.InHouse,
  testOrderId: testTypeTestOrderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const testTypeFixtureFirebase: Partial<TestType> = {
  id: 2003,
  title: 'tt MTO Test Type Title',
  uuid: 'some-uuid-cuz0',
  labId: testTypeLabInfoFixture.id,
  specimenGroupId: testTypeSpecimenGroupFixture.id,
  hormoneType: HormoneType.Progesterone,
}

export const testTypeTestResultFixture: Partial<TestResult> = {
  id: 2002,
  patientId: testTypePatientFixture.id,
  labId: testTypeLabInfoFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  specimenId: testTypeSpecimenFixture.id,
  testResultKind: TestResultKind.TestType,
  testTypeId: testTypeFixtureFirebase.id,
  comment: 'MTO Test Result comment test type',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: testTypeServiceProviderFixture.id,
  completedOn: null,
}

export const testTypeTestOrderItemFixture: Partial<TestOrderItem> = {
  id: 3001,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testTypeTestOrderFixture.id,
  testTypeId: testTypeFixtureFirebase.id,
}

export const testOrderToBePartiallyBookedFixture: Partial<TestOrder> = {
  id: 8000,
  uuid: '1b4d0b05-784f-45b9-b6ff-ebef2c8d3b6d',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderToBeBookedFixture: Partial<TestOrder> = {
  id: 8001,
  uuid: '74067259-a958-4754-af6f-3cea921c3661',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderToBePartiallyBookedForProceduresFixture: Partial<TestOrder> = {
  id: 8002,
  uuid: '6ca5311f-8979-4638-9ddf-eecc1e88fbeb',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderToBeBookedForProceduresFixture: Partial<TestOrder> = {
  id: 8003,
  uuid: '7775311f-8979-4638-9ddf-eecc1e88fbeb',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderToBeCompletedForProceduresAppointmentsDoneFixture: Partial<TestOrder> = {
  id: 8004,
  uuid: '6f44cb3b-8685-4d05-90bb-7b13e83cbcdb',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
}

export const testOrderToBeNotUpdatedForProceduresAppointmentsNotDoneFixture: Partial<TestOrder> = {
  id: 8005,
  uuid: 'c9738fe1-3982-423e-b5bb-0d3c1f45a971',
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
}

export const appointmentBookedForCancelNoShowFixture: Partial<Appointment> = {
  id: 6999,
  uuid: 'c9838fe1-3982-423e-b5bb-0d3c1f45a972',
  patientId: patientFixture.id,
  status: AppointmentStatus.Booked,
  serviceTypeId: serviceTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderNotCollectedFixture.id,
}

export const appointmentStatusCancelledFixture: Partial<Appointment> = {
  id: 7000,
  uuid: 'a3d25444-93eb-4108-87cf-95ed32529108',
  patientId: patientFixture.id,
  status: AppointmentStatus.Cancelled,
  serviceTypeId: serviceTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderNotCollectedFixture.id,
}
export const appointmentStatusNoShowFixture: Partial<Appointment> = {
  id: 7001,
  uuid: 'a3d25222-93eb-4108-87cf-95ed32529108',
  patientId: patientFixture.id,
  status: AppointmentStatus.NoShow,
  serviceTypeId: serviceTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderNotCollectedFixture.id,
}

export const appointmentFixture: Partial<Appointment> = {
  id: 7002,
  uuid: 'a3d25101-93eb-4108-87cf-95ed32529108',
  patientId: patientFixture.id,
  status: AppointmentStatus.Booked,
  serviceTypeId: serviceTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBePartiallyBookedFixture.id,
}

export const appointmentForSwabCollectionFixture: Partial<Appointment> = {
  id: 7003,
  uuid: 'f3e19523-2c6a-4cdd-b92f-9de5de66f55b',
  patientId: patientFixture.id,
  status: AppointmentStatus.Booked,
  serviceTypeId: serviceTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBeBookedFixture.id,
}

export const appointmentForRelationToMilestoneFixture: Partial<Appointment> = {
  id: 7004,
  uuid: 'f3e19523-2c6a-4cdd-b92f-9de5de66f777',
  patientId: patientFixture.id,
  status: AppointmentStatus.Booked,
  serviceTypeId: serviceTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBeBookedFixture.id,
}

export const appointmentForProcedurePartiallyBookedFixture: Partial<Appointment> = {
  id: 7005,
  uuid: '2f1ac8ed-0ddd-4c9e-b4a7-67401fcee5bc',
  patientId: patientFixture.id,
  status: AppointmentStatus.Booked,
  serviceTypeId: serviceTypeProcedureFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBePartiallyBookedForProceduresFixture.id,
}

export const appointmentForProcedureBookedFixture: Partial<Appointment> = {
  id: 7006,
  uuid: 'fg2ac8ed-0ddd-4c9e-b4a7-67401fcee5bc',
  patientId: patientFixture.id,
  status: AppointmentStatus.Booked,
  serviceTypeId: serviceTypeForProcedureBookedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBeBookedForProceduresFixture.id,
}

export const appointmentForProcedureDoneFixture: Partial<Appointment> = {
  id: 7007,
  uuid: '501ce919-4f4f-42e0-9216-48287d1b9de6',
  patientId: patientFixture.id,
  status: AppointmentStatus.Done,
  serviceTypeId: serviceTypeForProcedureBookedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBeCompletedForProceduresAppointmentsDoneFixture.id,
}

export const appointmentProcedureDoneFixture: Partial<Appointment> = {
  id: 7008,
  uuid: '8bfaaa0e-c524-4ca1-8f1c-60c01a36da20',
  patientId: patientFixture.id,
  status: AppointmentStatus.Done,
  serviceTypeId: serviceTypeForProcedureBookedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBeCompletedForProceduresAppointmentsDoneFixture.id,
}

export const appointmentProcedureNotDoneFixture: Partial<Appointment> = {
  id: 7009,
  uuid: '619f95ee-2fc1-454f-9497-eaf47849be0b',
  patientId: patientFixture.id,
  status: AppointmentStatus.Booked,
  serviceTypeId: serviceTypeForProcedureBookedFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderToBeNotUpdatedForProceduresAppointmentsNotDoneFixture.id,
}

export const appointmentUltrasoundFixture: Partial<Appointment> = {
  id: 7010,
  uuid: '719f95ee-2fc1-454f-9497-eaf47849be1c',
  patientId: patientFixture.id,
  status: AppointmentStatus.Done,
  serviceTypeId: serviceTypeForUltrasoundFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  testOrderId: testOrderUltrasoundFixture.id,
}

// for PartiallyBooked order
export const patientMilestonePastFixture: Partial<PatientMilestone> = {
  id: 7020,
  uuid: '3a995f6a-6c4d-4ba7-91a2-99726dca8e86',
  patientId: patientFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Past,
  isDisabled: false,
  testOrderId: testOrderToBePartiallyBookedFixture.id,
  dominantAppointmentId: appointmentFixture.id,
}

export const patientMilestoneForPartiallyBookedApptFixture: Partial<PatientMilestone> = {
  id: 7021,
  uuid: '3a995f6a-6c4d-4ba7-91a2-99726dca8777',
  patientId: patientFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Past,
  isDisabled: false,
  testOrderId: testOrderToBePartiallyBookedFixture.id,
}

// for Booked order
export const patientMilestoneUpcomingFixture: Partial<PatientMilestone> = {
  id: 7022,
  uuid: '36dcd8cf-535e-435f-8cd6-31eebedc7ecb',
  patientId: patientFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  isDisabled: false,
  dominantAppointmentId: appointmentForRelationToMilestoneFixture.id,
  testOrderId: testOrderToBeBookedFixture.id,
}

export const patientMilestoneFixture: Partial<PatientMilestone> = {
  id: 7023,
  uuid: 'efdb6037-c7cf-4f71-bfb8-343779e8b024',
  patientId: patientFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Upcoming,
  isDisabled: false,
  dominantAppointmentId: appointmentForRelationToMilestoneFixture.id,
  testOrderId: testOrderToBeBookedFixture.id,
}

export const patientMilestoneWorksheetUltrasoundFixture: Partial<PatientMilestone> = {
  id: 7024,
  uuid: '3a995f6b-2c4d-4ba3-91a2-99726dca8e86',
  patientId: patientFixture.id,
  type: PatientMilestoneType.ServiceType,
  status: PatientMilestoneStatus.Past,
  isDisabled: false,
  dominantAppointmentId: appointmentUltrasoundFixture.id,
}

export const patientMilestoneToAppointmentOneFixture: Partial<PatientMilestoneToAppointment> = {
  id: 7050,
  appointmentId: appointmentFixture.id,
  patientMilestoneId: patientMilestonePastFixture.id,
}

export const patientMilestoneToAppointmentTwoFixture: Partial<PatientMilestoneToAppointment> = {
  id: 7051,
  appointmentId: appointmentForSwabCollectionFixture.id,
  patientMilestoneId: patientMilestoneUpcomingFixture.id,
}

export const patientMilestoneToAppointmentThreeFixture: Partial<PatientMilestoneToAppointment> = {
  id: 7052,
  appointmentId: appointmentForRelationToMilestoneFixture.id,
  patientMilestoneId: patientMilestoneFixture.id,
}

export const orderItemProcedureFixture: Partial<TestOrderItem> = {
  id: 3002,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderToBePartiallyBookedForProceduresFixture.id,
  testPanelId: testPanelForProcedureFixture.id,
}

// there's no appointment booked for this order item
export const orderItemProcedureWithoutAppointmentFixture: Partial<TestOrderItem> = {
  id: 3003,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderToBePartiallyBookedForProceduresFixture.id,
  testPanelId: testPanelWithProcedureFixture.id,
}

export const orderItemProcedureBookedWithApptFixture: Partial<TestOrderItem> = {
  id: 3004,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderToBeBookedForProceduresFixture.id,
  testPanelId: testPanelWithProcedureForBookedFixture.id,
}

export const testOrderItemToBeNotUpdatedForProceduresAppointmentsNotDoneFixture: Partial<TestOrderItem> =
  {
    id: 3005,
    type: OrderGroupItemEnum.TestType,
    testOrderId: testOrderToBeNotUpdatedForProceduresAppointmentsNotDoneFixture.id,
    testTypeId: null,
    testPanelId: testPanelForProcedureFixture.id,
  }

export const testOrderItemToBeCompletedForProceduresAppointmentsDoneFixture: Partial<TestOrderItem> =
  {
    id: 3006,
    type: OrderGroupItemEnum.TestType,
    testOrderId: testOrderToBeCompletedForProceduresAppointmentsDoneFixture.id,
    testTypeId: null,
    testPanelId: testPanelForProcedureFixture.id,
  }

export const testOrderItemToForUltrasoundOrderFixture: Partial<TestOrderItem> = {
  id: 3007,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderUltrasoundFixture.id,
  testTypeId: testTypeUltrasoundFixture.id,
  testPanelId: null,
}

export const testResultUltrasoundFixture: Partial<TestResult> = {
  id: 1003,
  patientId: patientFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  specimenId: null,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  testTypeId: testTypeUltrasoundFixture.id,
  comment: 'Ultrasound for order',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: null,
  appointmentId: appointmentUltrasoundFixture.id,
  testOrderId: testOrderUltrasoundFixture.id,
}

export const milestoneToWorkseetHormoneTestTypeFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 1001,
  patientMilestoneId: patientMilestonePastFixture.id,
  testTypeId: testTypeFixtureFirebase.id,
}

export const milestoneToWorkseetUltrasoundTypeFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 1002,
  patientMilestoneId: patientMilestoneWorksheetUltrasoundFixture.id,
  testTypeId: testTypeUltrasoundFixture.id,
}

export const milestoneToTestTypeForWorksheetPendingResultsFixture: Partial<MilestoneToTestTypeOrPanel> =
  {
    id: 1003,
    patientMilestoneId: patientMilestoneWorksheetUltrasoundFixture.id,
    testTypeId: testTypeFixtureFirebase.id,
  }
