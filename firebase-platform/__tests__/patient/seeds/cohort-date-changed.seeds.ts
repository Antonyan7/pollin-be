import {
  AppointmentSeed,
  LabInfoSeed,
  PatientPartnerSeed,
  PatientPlanCohortSeed,
  PatientPlanSeed,
  PatientSeed,
  PlanCategorySeed,
  PlanTypeSeed,
  ProfileAlertSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  SpecimenSeed,
  TestOrderSeed,
  TestResultMeasurementSeed,
  TestResultSeed,
  TestTypeSeed,
  TestTypeGroupForAnyResultSeed,
  PatientPlanStatusSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DataSource} from 'typeorm'
import {PatientPlan, PlanCategory, PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PatientPlanCohort} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  LabInfo,
  Specimen,
  TestOrder,
  TestResult,
  TestResultMeasurement,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  FinalResultType,
  LabInfoType,
  SpecimenStatus,
  TestOrderStatusEnum,
  TestResultMeasurementType,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {Patient, PatientPartner, ProfileAlert} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {PartnerStatusEnum, ProfileAlertType} from '@libs/data-layer/apps/users/enum'
import {TestTypeGroupForAnyResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type-group-for-any-result.entity'
import {TestTypeGroupForAnyResultTestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type-group-for-any-result-test-type.entity'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

const id = 511165

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

const serviceProviderFixture: Partial<ServiceProvider> = {
  id,
}

const serviceTypeForIVFFixture: Partial<ServiceType> = {
  id,
  name: 'serviceTypeForIVFFixture',
  durationInMinutes: 20,
  price: 100,
}

const testTypeForIVFFixture: Partial<TestType> = {
  id,
  title: 'testTypeForIVFFixture',
}

export const testTypeWithProcessTypeFixture: Partial<TestType> = {
  id: id + 1,
  title: 'testTypeWithProcessTypeFixture',
  processType: ProcessType.UltrasoundOHSS,
}

const testTypeForGroupFixture: Partial<TestType> = {
  id: id + 2,
  title: 'testTypeForGroupFixture',
}

const testTypeGroupForAnyResultFixture: Partial<TestTypeGroupForAnyResult> = {
  id,
  internalName: 'test display group AMH',
  testTypesRelations: [
    {id, testTypeId: testTypeWithProcessTypeFixture.id},
    {id: id + 1, testTypeId: testTypeForGroupFixture.id},
  ] as TestTypeGroupForAnyResultTestType[],
}

export const patientFixture: Partial<Patient> = {
  id,
  uuid: '465e9e0d-43c6-4074-a2d8-1465b7a5699b',
  authUserId: 'ivf-user',
}

export const partnerWithProcessTestTypeAbnormalResult: Partial<Patient> = {
  id: id + 1,
  uuid: '465e9e0d-23c6-4074-b2d8-1465b7a5699b',
  authUserId: 'partnerWithProcessTestTypeAbnormalResult',
}

export const partnerWithTestResultMeasurementAbnormalResult: Partial<Patient> = {
  id: id + 2,
  uuid: '465e9e0d-42c6-4074-a3d8-1465b7a5699b',
  authUserId: 'partnerWithTestResultMeasurementAbnormalResult',
}

export const partnerWithLatestNormalResult: Partial<Patient> = {
  id: id + 3,
  uuid: '465e9e0d-33c6-4574-a3d8-1465b7a5699b',
  authUserId: 'partnerWithLatestNormalResult',
}

const planCategoryFixture: Partial<PlanCategory> = {
  id,
}

const planTypeFixture: Partial<PlanType> = {
  id,
  title: 'planTypeFixture',
  planCategoryId: planCategoryFixture.id,
  serviceTypeIdToSetCohortStartDate: null,
  ivfLabCohortStartDay: 5,
  patientPlanStatusId: patientPlanStatusFixture.id,
}

const patientPlanForIVFFixture: Partial<PatientPlan> = {
  id,
  patientId: patientFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanCohortFixture: Partial<PatientPlanCohort> = {
  id,
  patientPlanId: patientPlanForIVFFixture.id,
  cohortDate: '2023-02-02',
}

const labInfoData: Partial<LabInfo> = {
  id,
  name: 'Laboratory Name',
  location: 'Address',
  phone: '+454545454545',
  type: LabInfoType.Internal,
}

const appointmentFixture: Partial<Appointment> = {
  id,
  patientId: patientFixture.id,
  start: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  serviceTypeId: serviceTypeForIVFFixture.id,
  serviceProviderId: serviceProviderFixture.id,
}

const testOrderFixture: Partial<TestOrder> = {
  id,
  patientId: patientFixture.id,
  status: TestOrderStatusEnum.Collecting,
}

const specimenFixture: Partial<Specimen> = {
  id,
  specimenIdentifier: 'S00000077433',
  patientId: patientFixture.id,
  serviceTypeId: serviceTypeForIVFFixture.id,
  status: SpecimenStatus.Collected,
  testOrderId: testOrderFixture.id,
  collectedOn: dateTimeUtil.now(),
}

export const testResultForAbnormalTestResultMeasurementFixture: Partial<TestResult> = {
  id,
  labId: labInfoData.id,
  patientId: partnerWithTestResultMeasurementAbnormalResult.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  specimenId: specimenFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForAbnormalTestWithProcessTypeFixture: Partial<TestResult> = {
  id: id + 1,
  labId: labInfoData.id,
  patientId: partnerWithProcessTestTypeAbnormalResult.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Abnormal,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentFixture.id,
  testTypeId: testTypeWithProcessTypeFixture.id,
}

export const testResultForOldAbnormalTestWithProcessTypeFixture: Partial<TestResult> = {
  id: id + 2,
  labId: labInfoData.id,
  patientId: partnerWithLatestNormalResult.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Abnormal,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentFixture.id,
  testTypeId: testTypeWithProcessTypeFixture.id,
}

export const testResultForLatestNormalTestResultFixture: Partial<TestResult> = {
  id: id + 3,
  labId: labInfoData.id,
  patientId: partnerWithLatestNormalResult.id,
  status: TestResultStatus.Completed,
  specimenId: specimenFixture.id,
  finalResult: FinalResultType.Abnormal,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultMeasurementAbnormalFixture: Partial<TestResultMeasurement> = {
  id,
  testResultId: testResultForAbnormalTestResultMeasurementFixture.id,
  testTypeId: testTypeForIVFFixture.id,
  result: '2',
  resultType: TestResultMeasurementType.Abnormal,
}

export const testResultMeasurementNormalFixture: Partial<TestResultMeasurement> = {
  id: id + 1,
  testResultId: testResultForLatestNormalTestResultFixture.id,
  testTypeId: testTypeForGroupFixture.id,
  result: '3',
  resultType: TestResultMeasurementType.Normal,
}

const partnerLinksFixtures: Partial<PatientPartner>[] = [
  {
    id,
    patientId: patientFixture.id,
    partnerId: partnerWithProcessTestTypeAbnormalResult.id,
    status: PartnerStatusEnum.Accepted,
  },
  {
    id: id + 1,
    patientId: partnerWithTestResultMeasurementAbnormalResult.id,
    partnerId: patientFixture.id,
    status: PartnerStatusEnum.Accepted,
  },
  {
    id: id + 2,
    patientId: patientFixture.id,
    partnerId: partnerWithLatestNormalResult.id,
    status: PartnerStatusEnum.Accepted,
  },
]

export const profileAlertFixtures: Partial<ProfileAlert>[] = [
  {
    id,
    text: 'text1',
    sequence: 0,
    type: ProfileAlertType.AbnormalPartnerResult,
    testTypeId: testTypeForIVFFixture.id,
  },
  {
    id: id + 1,
    text: 'text1',
    sequence: 0,
    type: ProfileAlertType.AbnormalPartnerResult,
    testTypeGroupForAnyResultId: testTypeGroupForAnyResultFixture.id,
  },
]

export async function createPatientCohortDateChangeSeeds(dataSource: DataSource): Promise<void> {
  const testTypeSeed = new TestTypeSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const specimenSeed = new SpecimenSeed(dataSource)
  const patientPartnerSeed = new PatientPartnerSeed(dataSource)
  const testTypeGroupForAnyResultSeed = new TestTypeGroupForAnyResultSeed(dataSource)
  const profileAlertSeed = new ProfileAlertSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)

  await patientPlanStatusSeed.create(patientPlanStatusFixture)

  await planCategorySeed.create(planCategoryFixture)
  await superTypeSeed.create(superTypeOtherFixture)
  await Promise.all([
    labInfoSeed.create(labInfoData),
    testTypeSeed.createArray([
      testTypeForIVFFixture,
      testTypeWithProcessTypeFixture,
      testTypeForGroupFixture,
    ]),
    patientSeed.createArray([
      patientFixture,
      partnerWithProcessTestTypeAbnormalResult,
      partnerWithTestResultMeasurementAbnormalResult,
      partnerWithLatestNormalResult,
    ]),
    planTypeSeed.createArray([planTypeFixture]),
    serviceProviderSeed.create(serviceProviderFixture),
    serviceTypeSeed.create(serviceTypeForIVFFixture),
  ])
  await Promise.all([
    patientPlanSeed.createArray([patientPlanForIVFFixture]),
    testTypeGroupForAnyResultSeed.create(testTypeGroupForAnyResultFixture),
    testOrderSeed.createArray([testOrderFixture]),
    patientPartnerSeed.createArray(partnerLinksFixtures),
    appointmentSeed.createArray([appointmentFixture]),
  ])
  await specimenSeed.create(specimenFixture)
  await testResultSeed.createArray([
    testResultForAbnormalTestResultMeasurementFixture,
    testResultForAbnormalTestWithProcessTypeFixture,
    testResultForOldAbnormalTestWithProcessTypeFixture,
    testResultForLatestNormalTestResultFixture,
  ])
  await Promise.all([
    patientPlanCohortSeed.createArray([patientPlanCohortFixture]),
    testResultMeasurementSeed.createArray([
      testResultMeasurementAbnormalFixture,
      testResultMeasurementNormalFixture,
    ]),
    profileAlertSeed.createArray(profileAlertFixtures),
  ])
}

export async function destroyPatientCohortDateChangeSeeds(dataSource: DataSource): Promise<void> {
  const testTypeSeed = new TestTypeSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const specimenSeed = new SpecimenSeed(dataSource)
  const testTypeGroupForAnyResultSeed = new TestTypeGroupForAnyResultSeed(dataSource)
  const patientPartnerSeed = new PatientPartnerSeed(dataSource)
  const profileAlertSeed = new ProfileAlertSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)

  await Promise.all([
    patientPlanCohortSeed.removeByIds([patientPlanCohortFixture.id]),
    testResultMeasurementSeed.removeByIds([
      testResultMeasurementAbnormalFixture.id,
      testResultMeasurementNormalFixture.id,
    ]),
    profileAlertSeed.removeByIds(profileAlertFixtures.map(({id}) => id)),
  ])
  await testResultSeed.removeByIds([
    testResultForAbnormalTestResultMeasurementFixture.id,
    testResultForAbnormalTestWithProcessTypeFixture.id,
    testResultForOldAbnormalTestWithProcessTypeFixture.id,
    testResultForLatestNormalTestResultFixture.id,
  ])
  await specimenSeed.removeByIds([specimenFixture.id])
  await Promise.all([
    testOrderSeed.removeByIds([testOrderFixture.id]),
    patientPlanSeed.removeByIds([patientPlanForIVFFixture.id]),
    testTypeGroupForAnyResultSeed.removeByIds([testTypeGroupForAnyResultFixture.id]),
    testResultSeed.removeByIds([
      testResultForAbnormalTestResultMeasurementFixture.id,
      testResultForAbnormalTestWithProcessTypeFixture.id,
      testResultForOldAbnormalTestWithProcessTypeFixture.id,
      testResultForLatestNormalTestResultFixture.id,
    ]),
    patientPartnerSeed.removePatientPartnerByIds(partnerLinksFixtures.map(({id}) => id)),
    appointmentSeed.removeByIds([appointmentFixture.id]),
  ])
  await Promise.all([
    testTypeSeed.removeByIds([
      testTypeForIVFFixture.id,
      testTypeWithProcessTypeFixture.id,
      testTypeForGroupFixture.id,
    ]),
    labInfoSeed.removeByIds([labInfoData.id]),
    patientSeed.removeByIds([
      patientFixture.id,
      partnerWithProcessTestTypeAbnormalResult.id,
      partnerWithTestResultMeasurementAbnormalResult.id,
      partnerWithLatestNormalResult.id,
    ]),
    planTypeSeed.removeByIds([planTypeFixture.id]),
    serviceProviderSeed.removeById(serviceProviderFixture.id),
    serviceTypeSeed.removeById(serviceTypeForIVFFixture.id),
  ])
  await superTypeSeed.removeByIds([superTypeOtherFixture.id])
  await planCategorySeed.removeById(planCategoryFixture.id)
  await patientPlanStatusSeed.removeById(patientPlanStatusFixture.id)
}
