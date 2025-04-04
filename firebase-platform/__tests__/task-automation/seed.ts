import {
  AppointmentSeed,
  AutomatedTaskSeed,
  PatientSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  TaskSeed,
  StaffSeed,
  PatientPlanSeed,
  PlanCategorySeed,
  PatientPrescriptionSeed,
  PharmacySeed,
  MdBillingServiceCodeSeed,
  ServiceProviderGroupSeed,
  CareTeamSeed,
  PlanTypeSeed,
  PlanTypeToAutomatedTaskSeed,
  PaymentOrderSeed,
  GoogleAdConversionSeed,
  PatientPlanStatusSeed,
  SuperTypeSeed,
  TestResultMeasurementSeed,
  TestResultSeed,
  TestPanelSeed,
  LabInfoSeed,
  TestTypeSeed,
} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DataSource} from 'typeorm'
import {AutomatedTaskType, TaskPriority} from '@libs/data-layer/apps/clinic-tasks/enums/task.enum'
import {AppointmentPaymentStatus} from '@libs/common/enums'
import {pharmacyFixture} from '@libs/common/test/fixtures'
import {
  PatientPrescriptionStatus,
  PrescriptionType,
  ServiceProviderPosition,
} from '@libs/services-common/enums'
import {MdBillingServiceCode} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm'
import {GoogleAdConversion} from '@libs/data-layer/apps/google-ads/entities/typeorm'
import {PaymentOrderType} from '@libs/data-layer/apps/checkout/enum/payment-order.enum'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {
  TestPanel,
  TestResultMeasurement,
  TestType,
  LabInfo,
  TestResult,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestResultMeasurementType} from '@libs/data-layer/apps/clinic-test/enums'

const id = 555111
export const googleAdConversionId = 777

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

const serviceTypeFixture = {
  id,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}

const mdBillingServiceCodeFixtureForCF: Partial<MdBillingServiceCode> = {
  id: 1,
  serviceCodeId: 1111,
  serviceCode: 'A00A1',
  serviceCodeSearchDescription: null,
}

const serviceTypeOhipRequiredFixture = {
  id: id + 1,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
  mdBillingServiceCodeId: mdBillingServiceCodeFixtureForCF.id,
  ohipReferralRequired: true,
}

const serviceProviderGroupFixture = {
  id,
  title: 'Care Navigator',
  imageURL: null,
  sequence: 1,
  position: ServiceProviderPosition.CareNavigator,
}

const serviceProviderGroupForNursesFixture = {
  id: id + 1,
  title: 'Nurse',
  imageURL: null,
  sequence: 2,
  position: ServiceProviderPosition.Nurse,
}

export const serviceProviderFixture = {
  id,
}
const serviceProviderCareNavigatorFixture = {
  id: id + 2,
  serviceProviderGroupId: serviceProviderGroupFixture.id,
}
const serviceProviderNurseFixture = {
  id: id + 3,
  serviceProviderGroupId: serviceProviderGroupForNursesFixture.id,
}

export const patientForTaskAutomationFixture = {
  id,
  uuid: '465e9e0d-49c6-4074-a2d8-1465b7a5699b',
  authUserId: 'task-automation-user',
  serviceProviderId: serviceProviderFixture.id,
}

export const patientForReferralTaskAutomationFixture = {
  id: id + 1,
  uuid: '465e9e1d-49c6-4074-a2d8-1465b7a5699b',
  authUserId: 'task-automation-referral',
}

export const patientForTaskAutomationPlanV2Fixture = {
  id: id + 3,
  uuid: '465e1e0d-49c6-4074-a2d8-1465b7a5699b',
  authUserId: 'task-automation-plan-v2-user',
  serviceProviderId: serviceProviderFixture.id,
}

export const assignorForTaskAutomationFixture = {
  id,
  email: 'automation-assignor-email',
}
export const assigneeForTaskAutomationFixture = {
  id: id + 1,
  email: 'automation-assignee-email',
}
export const assigneeForPayloadFixture = {
  id: id + 2,
  email: 'payload-assignee-email',
}
export const careNavigatorStaffFixture = {
  id: id + 3,
  email: 'care-navigator',
  serviceProviderId: serviceProviderCareNavigatorFixture.id,
}
export const nurseStaffFixture = {
  id: id + 4,
  email: 'nurse',
  serviceProviderId: serviceProviderNurseFixture.id,
}

export const careTeamFixture = {
  id,
  mainServiceProviderId: serviceProviderFixture.id,
  serviceProviderId: serviceProviderCareNavigatorFixture.id,
}

export const careTeamNurseFixture = {
  id: id + 1,
  mainServiceProviderId: serviceProviderFixture.id,
  serviceProviderId: serviceProviderNurseFixture.id,
}

const startDate = dateTimeUtil.addDays(dateTimeUtil.startOfDay(dateTimeUtil.now()), 23)
export const appointmentForTaskAutomationOhipRequiredPaidFixture = {
  id,
  patientId: patientForTaskAutomationFixture.id,
  start: startDate,
  serviceTypeId: serviceTypeOhipRequiredFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  paymentStatus: AppointmentPaymentStatus.Paid,
}
export const appointmentForTaskAutomationFixture = {
  id: id + 1,
  patientId: patientForTaskAutomationFixture.id,
  start: startDate,
  serviceTypeId: serviceTypeFixture.id,
  serviceProviderId: serviceProviderFixture.id,
}

export const autoTaskReferralRequired = {
  id,
  assigneeId: assigneeForTaskAutomationFixture.id,
  assignorId: assignorForTaskAutomationFixture.id,
  hoursOffset: 4,
  priority: TaskPriority.Critical,
  type: AutomatedTaskType.ReferralRequired,
}

export const autoTaskTestsAddedFixture = {
  id: id + 2,
  priority: TaskPriority.Low,
  type: AutomatedTaskType.PlanTestResultsAdded,
  hoursOffset: 2,
}

export const autoTaskPlanPaidFixture = {
  id: id + 3,
  assigneeId: assigneeForTaskAutomationFixture.id,
  assignorId: assignorForTaskAutomationFixture.id,
  priority: TaskPriority.Low,
  type: AutomatedTaskType.PlanPaid,
  hoursOffset: 2,
}

export const autoTaskFaxExternalPrescriptionFixture = {
  id: id + 4,
  assigneeId: assigneeForTaskAutomationFixture.id,
  assignorId: assignorForTaskAutomationFixture.id,
  priority: TaskPriority.Critical,
  type: AutomatedTaskType.DeletedFaxExternalPharmacyPrescription,
  hoursOffset: 24,
}

export const autoTaskUploadReferral = {
  id: id + 5,
  assigneeId: assigneeForTaskAutomationFixture.id,
  assignorId: assignorForTaskAutomationFixture.id,
  priority: TaskPriority.Critical,
  hoursOffset: 4,
  type: AutomatedTaskType.UploadReferral,
}

export const autoTaskReleaseOfInformationRequired = {
  id: id + 6,
  assigneeId: assigneeForTaskAutomationFixture.id,
  assignorId: assignorForTaskAutomationFixture.id,
  priority: TaskPriority.Critical,
  hoursOffset: 5,
  type: AutomatedTaskType.ReleaseOfInformationRequired,
}

export const autoTaskPeriodReportedFixture = {
  id: id + 8,
  assigneeId: assigneeForTaskAutomationFixture.id,
  assignorId: assignorForTaskAutomationFixture.id,
  priority: TaskPriority.Low,
  type: AutomatedTaskType.PeriodReported1stDay,
  hoursOffset: 2,
}

export const autoTaskAbnormalResultFixture = {
  id: id + 9,
  assigneeId: assigneeForTaskAutomationFixture.id,
  assignorId: assignorForTaskAutomationFixture.id,
  priority: TaskPriority.Critical,
  type: AutomatedTaskType.HighPriorityResultReview,
  hoursOffset: 2,
}

export const planCategoryFixture = {
  id,
}

export const planTypeFixture = {
  id: id + 1,
  title: 'planTypeFixture',
  planCategoryId: planCategoryFixture.id,
  patientPlanStatusId: patientPlanStatusFixture.id,
}

export const planTypeWithoutAutomatedTasksFixture = {
  id: id + 2,
  title: 'planTypeWithoutAutomatedTasksFixture',
  planCategoryId: planCategoryFixture.id,
}

export const planTypeToPlanPaidAutomatedTaskFixture = {
  planTypeId: planTypeFixture.id,
  automatedTaskId: autoTaskPlanPaidFixture.id,
}

export const planTypeToPlanTestsAddedAutomatedTaskFixture = {
  planTypeId: planTypeFixture.id,
  automatedTaskId: autoTaskTestsAddedFixture.id,
}

export const planTypeToPeriodReportedAutomatedTaskFixture = {
  planTypeId: planTypeFixture.id,
  automatedTaskId: autoTaskPeriodReportedFixture.id,
}
export const planTypeToAbnormalResultAutomatedTaskFixture = {
  planTypeId: planTypeFixture.id,
  automatedTaskId: autoTaskAbnormalResultFixture.id,
}

export const patientPlanFixture = {
  id,
  patientId: patientForTaskAutomationFixture.id,
  planTypeId: planTypeFixture.id,
  taskAssigneeId: assigneeForPayloadFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanV2Fixture = {
  id: id + 1,
  patientId: patientForTaskAutomationPlanV2Fixture.id,
  planTypeId: planTypeFixture.id,
  taskAssigneeId: assigneeForPayloadFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanV2WithoutAutomatedTasksFixture = {
  id: id + 2,
  patientId: patientForTaskAutomationPlanV2Fixture.id,
  planTypeId: planTypeWithoutAutomatedTasksFixture.id,
  taskAssigneeId: assigneeForPayloadFixture.id,
  status: PlanStatusEnum.ReadyForActivation,
}

export const patientExternalPrescription = {
  id: 9987,
  patientId: patientForTaskAutomationFixture.id,
  uuid: 'cba07546-c96b-424f-89ef-f3e5a309e1c1',
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.now(),
  status: PatientPrescriptionStatus.Prescribed,
  type: PrescriptionType.External,
  faxPrescriptionTaskId: null,
}

export const paymentOrderGoogleAd: Partial<PaymentOrder> = {
  id: 999,
  uuid: '84f2c626-4f0a-4ac2-af39-0ef1cc22f28u',
  patientId: patientForTaskAutomationFixture.id,
  stripePaymentIntentId: 'stripePaymentIntentId',
  status: 'requires_capture',
  paymentMethod: PaymentOrderType.Card,
  paymentCardBrand: 'Visa',
  paymentCardLast4: '1111',
  tax: 10,
  subTotal: 10,
  total: 20,
  receiptNumber: 'receiptNumber',
}

const googleAdConversionData: Partial<GoogleAdConversion> = {
  id: googleAdConversionId,
  acuityId: 444555999,
  googleClickId: 'googleClickId',
  patientId: id,
}

export const testPanelAbnormalResultFixture: Partial<TestPanel> = {
  id: id + 1,
  uuid: '107a34c1-1af9-4818-8388-c19ab7526a55',
  generateTaskForAbnormalResult: true,
}

export const labInfoAbnormalFixture: Partial<LabInfo> = {
  id: id + 2,
  uuid: '3590e3bd-66d8-410d-81e3-b3c3df3d56d1',
  name: 'Second Laboratory Name 2',
  location: '2637 Yonge St Toronto, ON M4P 2J6',
  phone: '+454545454546',
}
export const testResultAbnormalFixture: Partial<TestResult> = {
  id: id + 3,
  uuid: '27f97b0f-3364-44ca-a533-8955eb4534ff',
  patientId: patientForTaskAutomationFixture.id,
  labId: labInfoAbnormalFixture.id,
  testPanelId: testPanelAbnormalResultFixture.id,
}
export const testTypeAbnormalFixture: Partial<TestType> = {
  id: id + 4,
  uuid: 'a163f9fc-ecc9-4599-8733-4a79b0b9b5c1',
  title: 'HCT',
  unit: 'testUnit/test unit',
  labId: labInfoAbnormalFixture.id,
}

export const testResultMeasurementAbnormalFixture: Partial<TestResultMeasurement> = {
  id: id + 5,
  testResultId: testResultAbnormalFixture.id,
  result: '2.79',
  dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 15),
  testTypeId: testTypeAbnormalFixture.id,
  resultType: TestResultMeasurementType.Abnormal,
}

export async function createTaskAutomationFixtures(dataSource: DataSource): Promise<void> {
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const mdbillingServiceCodeSeed: MdBillingServiceCodeSeed = new MdBillingServiceCodeSeed(
    dataSource,
  )
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const paymentOrderSeed = new PaymentOrderSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const automatedTaskSeed = new AutomatedTaskSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const planTypeToAutomatedTaskSeed = new PlanTypeToAutomatedTaskSeed(dataSource)
  const pharmacySeed = new PharmacySeed(dataSource)
  const prescriptionSeed = new PatientPrescriptionSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(dataSource)
  const careTeamSeed = new CareTeamSeed(dataSource)
  const googleAdConversionSeed = new GoogleAdConversionSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const testPanelSeed = new TestPanelSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)

  await patientPlanStatusSeed.create(patientPlanStatusFixture)

  await pharmacySeed.create(pharmacyFixture)
  await Promise.all([
    planCategorySeed.create(planCategoryFixture),
    serviceProviderGroupSeed.createArray([
      serviceProviderGroupFixture,
      serviceProviderGroupForNursesFixture,
    ]),
  ])
  await mdbillingServiceCodeSeed.create(mdBillingServiceCodeFixtureForCF)
  await serviceProviderSeed.createArray([
    serviceProviderFixture,
    serviceProviderCareNavigatorFixture,
    serviceProviderNurseFixture,
  ])
  await superTypeSeed.create(superTypeOtherFixture)
  await Promise.all([
    serviceTypeSeed.createArray([serviceTypeFixture, serviceTypeOhipRequiredFixture]),
    patientSeed.createArray([
      patientForTaskAutomationFixture,
      patientForReferralTaskAutomationFixture,
      patientForTaskAutomationPlanV2Fixture,
    ]),
    staffSeed.createArray([
      assigneeForTaskAutomationFixture,
      assignorForTaskAutomationFixture,
      assigneeForPayloadFixture,
      careNavigatorStaffFixture,
      nurseStaffFixture,
    ]),
    planTypeSeed.createArray([planTypeFixture, planTypeWithoutAutomatedTasksFixture]),
  ])
  await Promise.all([
    appointmentSeed.createArray([
      appointmentForTaskAutomationOhipRequiredPaidFixture,
      appointmentForTaskAutomationFixture,
    ]),
    automatedTaskSeed.createArray([
      autoTaskReferralRequired,
      autoTaskTestsAddedFixture,
      autoTaskPlanPaidFixture,
      autoTaskFaxExternalPrescriptionFixture,
      autoTaskUploadReferral,
      autoTaskReleaseOfInformationRequired,
      autoTaskPeriodReportedFixture,
      autoTaskAbnormalResultFixture,
    ]),
    patientPlanSeed.createArray([
      patientPlanFixture,
      patientPlanV2Fixture,
      patientPlanV2WithoutAutomatedTasksFixture,
    ]),
    careTeamSeed.create(careTeamFixture),
    careTeamSeed.create(careTeamNurseFixture),
  ])
  await prescriptionSeed.create(patientExternalPrescription)
  await planTypeToAutomatedTaskSeed.createArray([
    planTypeToPlanPaidAutomatedTaskFixture,
    planTypeToPlanTestsAddedAutomatedTaskFixture,
    planTypeToPeriodReportedAutomatedTaskFixture,
    planTypeToAbnormalResultAutomatedTaskFixture,
  ])

  await labInfoSeed.create(labInfoAbnormalFixture)
  await testPanelSeed.create(testPanelAbnormalResultFixture)
  await testTypeSeed.create(testTypeAbnormalFixture)
  await testResultSeed.create(testResultAbnormalFixture)
  await testResultMeasurementSeed.create(testResultMeasurementAbnormalFixture)

  await paymentOrderSeed.create(paymentOrderGoogleAd)
  await googleAdConversionSeed.create(googleAdConversionData)
}

export async function destroyTaskAutomationFixtures(dataSource: DataSource): Promise<void> {
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const mdbillingServiceCodeSeed: MdBillingServiceCodeSeed = new MdBillingServiceCodeSeed(
    dataSource,
  )
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const automatedTaskSeed = new AutomatedTaskSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const taskSeed = new TaskSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const pharmacySeed = new PharmacySeed(dataSource)
  const prescriptionSeed = new PatientPrescriptionSeed(dataSource)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(dataSource)
  const paymentOrderSeed = new PaymentOrderSeed(dataSource)
  const googleAdConversionSeed = new GoogleAdConversionSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const testPanelSeed = new TestPanelSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
  const careTeamSeed = new CareTeamSeed(dataSource)
  const planTypeToAutomatedTaskSeed = new PlanTypeToAutomatedTaskSeed(dataSource)

  await testTypeSeed.removeByIds([testTypeAbnormalFixture.id])
  await testResultMeasurementSeed.removeByIds([testResultMeasurementAbnormalFixture.id])

  await googleAdConversionSeed.removeById(googleAdConversionData.id)
  await paymentOrderSeed.removePaymentOrderByPatientId(patientForTaskAutomationFixture.id)

  await prescriptionSeed.removeByIds([patientExternalPrescription.id])
  await planTypeToAutomatedTaskSeed.removeByPlanTypeId(planTypeFixture.id)

  await taskSeed.removeByAssigneeId(assigneeForTaskAutomationFixture.id)

  await Promise.all([
    appointmentSeed.removeByPatientId(patientForTaskAutomationFixture.id),
    staffSeed.removeByIds([
      assigneeForTaskAutomationFixture.id,
      assignorForTaskAutomationFixture.id,
      careNavigatorStaffFixture.id,
      nurseStaffFixture.id,
    ]),
    patientPlanSeed.removeByIds([
      patientPlanFixture.id,
      patientPlanV2Fixture.id,
      patientPlanV2WithoutAutomatedTasksFixture.id,
    ]),
  ])
  await careTeamSeed.removeByIds([careTeamFixture.id, careTeamNurseFixture.id])
  await automatedTaskSeed.removeByIds([
    autoTaskReferralRequired.id,
    autoTaskTestsAddedFixture.id,
    autoTaskPlanPaidFixture.id,
    autoTaskFaxExternalPrescriptionFixture.id,
    autoTaskUploadReferral.id,
    autoTaskReleaseOfInformationRequired.id,
    autoTaskPeriodReportedFixture.id,
    autoTaskAbnormalResultFixture.id,
  ])
  await Promise.all([
    patientSeed.removeByIds([
      patientForTaskAutomationFixture.id,
      patientForReferralTaskAutomationFixture.id,
      patientForTaskAutomationPlanV2Fixture.id,
    ]),
    serviceTypeSeed.removeByIds([serviceTypeFixture.id, serviceTypeOhipRequiredFixture.id]),
    planTypeSeed.removeByIds([planTypeFixture.id, planTypeWithoutAutomatedTasksFixture.id]),
  ])
  await superTypeSeed.removeByIds([superTypeOtherFixture.id])
  await serviceProviderSeed.removeByIds([
    serviceProviderFixture.id,
    serviceProviderCareNavigatorFixture.id,
    serviceProviderNurseFixture.id,
  ])
  await mdbillingServiceCodeSeed.removeByIds([mdBillingServiceCodeFixtureForCF.id])
  await planCategorySeed.removeById(planCategoryFixture.id)
  await Promise.all([
    pharmacySeed.removePharmacyByIds([pharmacyFixture.id]),
    serviceProviderGroupSeed.removeByIds([
      serviceProviderGroupFixture.id,
      serviceProviderGroupForNursesFixture.id,
    ]),
  ])
  await patientPlanStatusSeed.removeById(patientPlanStatusFixture.id)

  await testResultSeed.removeByIds([testResultAbnormalFixture.id])

  await labInfoSeed.removeByIds([labInfoAbnormalFixture.id])
  await testPanelSeed.removeByIds([testPanelAbnormalResultFixture.id])
}
