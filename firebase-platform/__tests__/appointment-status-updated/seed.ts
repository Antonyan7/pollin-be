import {MilestoneToTestTypeOrPanel, Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {
  AppointmentSeed,
  MdBillingServiceCodeSeed,
  OhipClaimSeed,
  PatientMilestoneSeed,
  PatientSeed,
  PatientToServiceProviderSeed,
  ServiceCategoryInputSeed,
  ServiceCategorySeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  LabInfoSeed,
  TestTypeSeed,
  MdBillingDiagnosticCodeSeed,
  TestPanelSeed,
  TestOrderItemSeed,
  TestOrderSeed,
  MilestoneToTestTypeOrPanelSeed,
  PlanCategorySeed,
  PlanTypeSeed,
  StaffSeed,
  PatientPlanSeed,
  PatientPlanSheetSeed,
  PatientPlanStatusSeed,
  ServiceTypeToServiceCodeSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {ServiceProvider, ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment.entity'
import {AppointmentStatus} from '@libs/common/enums'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {PatientMilestoneStatus} from '@libs/services-common/enums/milestone.enum'
import {
  MdBillingServiceCode,
  MdBillingDiagnosticCode,
  ServiceTypeToServiceCode,
} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {
  TestType,
  LabInfo,
  TestPanel,
  TestOrder,
  TestOrderItem,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  LabInfoType,
  OrderGroupItemEnum,
  TestOrderStatusEnum,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  PatientPlan,
  PatientPlanSheet,
  PatientPlanStatus,
  PlanCategory,
  PlanType,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PatientStatusEnum} from '@libs/services-common/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PlanSheetType, PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const appointmentStatusUpdatedId = 97878
export const appointmentOHIPCoveredId = 97879

export const patientFixture: Partial<Patient> = {
  id: appointmentStatusUpdatedId,
  authUserId: AuthUserFixture.emailVerified.uid,
  firstName: 'Firstname',
  lastName: 'Lastname',
  status: PatientStatusEnum.PlanType,
}

export const patientClaimFixture: Partial<Patient> = {
  id: 90,
  authUserId: AuthUserFixture.ohipCoveredAppoinitments.uid,
  firstName: 'Firstname Claim',
  lastName: 'Lastname Claim',
  status: PatientStatusEnum.PlanType,
  ohipCardNumber: '1111222333',
}

export const planCategoryFixture: Partial<PlanCategory> = {
  id: 1,
}

export const patientPlanStatusFixture: Partial<PatientPlanStatus> = {
  id: 1,
  patientStatusAbbreviation: 'IVF',
  patientStatusColor: '#DDF1E4',
}

export const planTypeFixture: Partial<PlanType> = {
  id: 1,
  title: 'planTypeFixture',
  planCategoryId: planCategoryFixture.id,
  patientPlanStatusId: patientPlanStatusFixture.id,
  automaticMilestoneToReportPeriod: true,
}

export const assigneeForPayloadFixture: Partial<Staff> = {
  id: 1,
  email: 'assignee-email@fhhealth+com',
}

export const patientPlanFixture: Partial<PatientPlan> = {
  id: 1,
  patientId: patientClaimFixture.id,
  planTypeId: planTypeFixture.id,
  taskAssigneeId: assigneeForPayloadFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanSheetFixture: Partial<PatientPlanSheet> = {
  id: 1,
  type: PlanSheetType.Stimulation,
  patientPlanId: patientPlanFixture.id,
  dayOne: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
}

export const serviceProviderFixture: Partial<ServiceProvider> = {
  id: appointmentStatusUpdatedId,
  imageURL: 'serviceProviderForBookingFlowFixture',
  title: 'Dr. Carlos',
}

export const serviceCategoryFixture: ServiceCategoryInputSeed = {
  id: appointmentStatusUpdatedId,
}

export const serviceTypeFixture: Partial<ServiceType> = {
  id: appointmentStatusUpdatedId,
  serviceCategoryId: serviceCategoryFixture.id,
}

export const serviceTypeTentativeFixture: Partial<ServiceType> = {
  id: appointmentStatusUpdatedId + 2,
  serviceCategoryId: serviceCategoryFixture.id,
  isTentative: true,
}

//Service Codes
export const serviceCodeFixture: Partial<MdBillingServiceCode> = {
  id: 10,
  serviceCodeId: 100,
  serviceCode: 'A100',
}

export const serviceCodeForExternalFixture: Partial<MdBillingServiceCode> = {
  id: 11,
  serviceCodeId: 101,
  serviceCode: 'A101',
}

export const serviceCodeSecondForServiceTypeFixture: Partial<MdBillingServiceCode> = {
  id: 12,
  serviceCodeId: 200,
  serviceCode: 'A200',
}

//Diagnostic Codes
export const diagnosticCodeFixture: Partial<MdBillingDiagnosticCode> = {
  id: 1,
  diagnosticCodeId: 102,
  diagnosticCode: 'A102',
}

export const diagnosticCodeForExternalFixture: Partial<MdBillingDiagnosticCode> = {
  id: 2,
  diagnosticCodeId: 103,
  diagnosticCode: 'A103',
}

//Labs
export const internalLabInfoFixture: Partial<LabInfo> = {
  id: 1,
  name: 'Internal Laboratory Name',
  location: 'Address',
  phone: '+454545454545',
  type: LabInfoType.Internal,
}

export const labInfoFixture: Partial<LabInfo> = {
  id: 2,
  name: 'Laboratory',
  location: 'Address',
  phone: '+454545454545',
}

//TestTypes
export const internalTestTypeFixture: Partial<TestType> = {
  id: 1,
  title: 'AMH',
  abbreviation: 'amh',
  labId: internalLabInfoFixture.id,
  serviceTypeId: appointmentOHIPCoveredId,
  mdBillingServiceCodeId: serviceCodeFixture.id,
  mdBillingDiagnosticCodeId: diagnosticCodeFixture.id,
}

export const secondTestTypeFixture: Partial<TestType> = {
  id: 2,
  title: 'ng/mL',
  abbreviation: 'ng/mL',
  labId: labInfoFixture.id,
  serviceTypeId: appointmentOHIPCoveredId,
  mdBillingServiceCodeId: serviceCodeFixture.id,
  mdBillingDiagnosticCodeId: diagnosticCodeFixture.id,
}

//TestPanels
export const testPanelFixture: Partial<TestPanel> = {
  id: 1,
  title: 'testPanel',
  abbreviation: 'testPanel',
  serviceTypeId: appointmentOHIPCoveredId,
  labId: labInfoFixture.id,
}

export const internalTestPanelFixture: Partial<TestPanel> = {
  id: 2,
  title: 'internal testPanel',
  abbreviation: 'internal testPanel',
  serviceTypeId: appointmentOHIPCoveredId,
  labId: internalTestTypeFixture.id,
  mdBillingServiceCodeId: serviceCodeFixture.id,
  mdBillingDiagnosticCodeId: diagnosticCodeFixture.id,
}

//ServiceType
export const serviceTypeOhipCovered: Partial<ServiceType> = {
  id: appointmentOHIPCoveredId,
  serviceCategoryId: serviceCategoryFixture.id,
}

export const serviceTypeToServiceCodesOneOhipCovered: Partial<ServiceTypeToServiceCode> = {
  id: appointmentOHIPCoveredId,
  serviceTypeId: serviceTypeOhipCovered.id,
  mdBillingServiceCodeId: serviceCodeFixture.id,
}

export const serviceTypeToServiceCodesTwoOhipCovered: Partial<ServiceTypeToServiceCode> = {
  id: 98879,
  serviceTypeId: serviceTypeOhipCovered.id,
  mdBillingServiceCodeId: serviceCodeSecondForServiceTypeFixture.id,
}

// TestOrder
export const testOrderFixture: Partial<TestOrder> = {
  id: 1,
  uuid: '60fb89e0-e141-4555-8d01-b08b7bc24344',
  patientId: patientClaimFixture.id,
  status: TestOrderStatusEnum.Completed,
}

// TestOrderItems
export const testOrderItemFirstFixture: Partial<TestOrderItem> = {
  id: 1,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderFixture.id,
  testTypeId: internalTestTypeFixture.id,
  testPanelId: null,
}

export const testOrderItemSecondFixture: Partial<TestOrderItem> = {
  id: 2,
  type: OrderGroupItemEnum.TestPanel,
  testOrderId: testOrderFixture.id,
  testTypeId: null,
  testPanelId: internalTestPanelFixture.id,
}

//Appointments
export const appointmentFixture: Partial<Appointment> = {
  id: appointmentStatusUpdatedId,
  status: AppointmentStatus.Done,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  testOrderId: testOrderFixture.id,
  identifier: `A${appointmentStatusUpdatedId}`,
}

export const appointmentOHIPCoveredFixture: Partial<Appointment> = {
  id: appointmentOHIPCoveredId,
  status: AppointmentStatus.Done,
  patientId: patientClaimFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeOhipCovered.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  testOrderId: testOrderFixture.id,
}

export const appointmentTentativeFixture: Partial<Appointment> = {
  id: appointmentStatusUpdatedId + 2,
  status: AppointmentStatus.Done,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeTentativeFixture.id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  testOrderId: testOrderFixture.id,
  identifier: `A${appointmentStatusUpdatedId + 2}`,
}

//Patient Milestones
export const patientMilestoneFixture: Partial<PatientMilestone> = {
  id: appointmentStatusUpdatedId,
  dominantAppointmentId: appointmentFixture.id,
  patientId: patientFixture.id,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneForClaimFixture: Partial<PatientMilestone> = {
  id: 2000,
  dominantAppointmentId: appointmentOHIPCoveredId,
  patientId: patientClaimFixture.id,
  status: PatientMilestoneStatus.Upcoming,
}

export const patientMilestoneTestsFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 456,
  patientMilestoneId: patientMilestoneFixture.id,
  testTypeId: internalTestTypeFixture.id,
}

export const patientMilestoneTestTypeClaimFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 457,
  patientMilestoneId: patientMilestoneForClaimFixture.id,
  testTypeId: internalTestTypeFixture.id,
}

export const patientMilestoneTestPanelClaimFixture: Partial<MilestoneToTestTypeOrPanel> = {
  id: 458,
  patientMilestoneId: patientMilestoneForClaimFixture.id,
  testPanelId: internalTestPanelFixture.id,
}

export const createAppointmentStatusUpdatedFixtures = async (
  dataSource: DataSource,
): Promise<void> => {
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
  const milestoneTestsSeed = new MilestoneToTestTypeOrPanelSeed(dataSource)
  const serviceCodeSeed = new MdBillingServiceCodeSeed(dataSource)
  const serviceTypeToServiceCodeSeed = new ServiceTypeToServiceCodeSeed(dataSource)
  const diagnosticCodeSeed = new MdBillingDiagnosticCodeSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const testPanelSeed = new TestPanelSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const testOrderItemSeed = new TestOrderItemSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientPlanSheetSeed = new PatientPlanSheetSeed(dataSource)

  await patientSeed.createArray([patientFixture, patientClaimFixture])
  await planCategorySeed.create(planCategoryFixture)
  await patientPlanStatusSeed.create(patientPlanStatusFixture)
  await planTypeSeed.create(planTypeFixture)
  await staffSeed.create(assigneeForPayloadFixture)
  await patientPlanSeed.create(patientPlanFixture)
  await patientPlanSheetSeed.create(patientPlanSheetFixture)
  await serviceProviderSeed.createArray([serviceProviderFixture])
  await serviceCategorySeed.createArray([serviceCategoryFixture])
  await serviceCodeSeed.createArray([
    serviceCodeFixture,
    serviceCodeForExternalFixture,
    serviceCodeSecondForServiceTypeFixture,
  ])
  await diagnosticCodeSeed.createArray([diagnosticCodeFixture, diagnosticCodeForExternalFixture])
  await superTypeSeed.create(superTypeOtherFixture)
  await serviceTypeSeed.createArray([
    serviceTypeFixture,
    serviceTypeOhipCovered,
    serviceTypeTentativeFixture,
  ])
  await serviceTypeToServiceCodeSeed.createArray([
    serviceTypeToServiceCodesOneOhipCovered,
    serviceTypeToServiceCodesTwoOhipCovered,
  ])
  await labInfoSeed.createArray([internalLabInfoFixture, labInfoFixture])
  await testTypeSeed.createArray([internalTestTypeFixture, secondTestTypeFixture])
  await testPanelSeed.createArray([testPanelFixture, internalTestPanelFixture])
  await testOrderSeed.create(testOrderFixture)
  await testOrderItemSeed.createArray([testOrderItemFirstFixture, testOrderItemSecondFixture])
  await appointmentSeed.createArray([
    appointmentFixture,
    appointmentOHIPCoveredFixture,
    appointmentTentativeFixture,
  ])
  await patientMilestoneSeed.createArray([patientMilestoneFixture, patientMilestoneForClaimFixture])
  await milestoneTestsSeed.createArray([
    patientMilestoneTestsFixture,
    patientMilestoneTestTypeClaimFixture,
    patientMilestoneTestPanelClaimFixture,
  ])
}

export const destroyAppointmentStatusUpdatedFixtures = async (
  dataSource: DataSource,
): Promise<void> => {
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
  const milestoneTestsSeed = new MilestoneToTestTypeOrPanelSeed(dataSource)
  const patientToServiceProviderSeed = new PatientToServiceProviderSeed(dataSource)
  const serviceCodeSeed = new MdBillingServiceCodeSeed(dataSource)
  const serviceTypeToServiceCodeSeed = new ServiceTypeToServiceCodeSeed(dataSource)
  const diagnosticCodeSeed = new MdBillingDiagnosticCodeSeed(dataSource)
  const ohipClaimSeed = new OhipClaimSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const testPanelSeed = new TestPanelSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const testOrderItemSeed = new TestOrderItemSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientPlanSheetSeed = new PatientPlanSheetSeed(dataSource)

  await testTypeSeed.removeByIds([internalTestTypeFixture.id, secondTestTypeFixture.id])
  await testPanelSeed.removeByIds([testPanelFixture.id, internalTestPanelFixture.id])
  await labInfoSeed.removeByIds([internalLabInfoFixture.id, labInfoFixture.id])
  await patientToServiceProviderSeed.deleteByPatientId(patientFixture.id)
  await milestoneTestsSeed.removeByIds([
    patientMilestoneTestsFixture.id,
    patientMilestoneTestTypeClaimFixture.id,
    patientMilestoneTestPanelClaimFixture.id,
  ])
  await patientMilestoneSeed.removeByIds([
    patientMilestoneFixture.id,
    patientMilestoneForClaimFixture.id,
  ])
  await testOrderItemSeed.removeByIds([testOrderItemFirstFixture.id, testOrderItemSecondFixture.id])
  await testOrderSeed.removeByIds([testOrderFixture.id])
  await appointmentSeed.removeByIds([appointmentFixture.id, appointmentTentativeFixture.id])
  await serviceTypeToServiceCodeSeed.removeByIds([
    serviceTypeToServiceCodesOneOhipCovered.id,
    serviceTypeToServiceCodesTwoOhipCovered.id,
  ])
  await serviceTypeSeed.removeByIds([
    serviceTypeFixture.id,
    serviceTypeOhipCovered.id,
    serviceTypeTentativeFixture.id,
  ])
  await superTypeSeed.removeByIds([superTypeOtherFixture.id])
  await serviceCodeSeed.removeByIds([
    serviceCodeFixture.id,
    serviceCodeForExternalFixture.id,
    serviceCodeSecondForServiceTypeFixture.id,
  ])
  await diagnosticCodeSeed.removeByIds([
    diagnosticCodeFixture.id,
    diagnosticCodeForExternalFixture.id,
  ])
  await serviceCategorySeed.removeById(serviceCategoryFixture.id)
  await serviceProviderSeed.removeById(serviceProviderFixture.id)
  await patientSeed.removePatientByAuthUserId(patientFixture.authUserId)
  await patientSeed.removePatientByAuthUserId(patientClaimFixture.authUserId)
  await ohipClaimSeed.removeByAppointmentId([appointmentOHIPCoveredId])
  await patientPlanSheetSeed.removeByIds([patientPlanSheetFixture.id])
  await patientPlanSeed.removeByIds([patientPlanFixture.id])
  await staffSeed.removeByIds([assigneeForPayloadFixture.id])
  await planTypeSeed.removeByIds([planTypeFixture.id])
  await patientPlanStatusSeed.removeByIds([patientPlanStatusFixture.id])
  await planCategorySeed.removeByIds([planCategoryFixture.id])
}
