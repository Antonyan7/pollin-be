import {
  IvfDayTaskToPlanTypeSeed,
  IvfTaskDetailsSeed,
  IvfTaskSummarySeed,
  IvfTaskToDaySeed,
  PatientPlanCohortIvfTaskGroupSeed,
  PatientPlanCohortSeed,
  PatientPlanSeed,
  PatientSeed,
  PlanCategorySeed,
  PlanTypeSeed,
  StaffSeed,
  PatientPlanStatusSeed,
  CryoSampleDonorSeed,
  CryoSampleContainerSeed,
  CryoInventoryCardSeed,
  IvfTaskExpendedEmbryoSeed,
  LabInfoSeed,
  TestTypeSeed,
  TestOrderSeed,
  TestOrderItemSeed,
  SpecimenSeed,
  TransportFolderSeed,
  TestObservationTypeSeed,
  ServiceProviderSeed,
  TestResultSeed,
} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DataSource} from 'typeorm'
import {PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  IvfTaskToDay,
  IvfTaskToDayToPlanType,
  PatientPlanCohort,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskExpandedEmbryo,
  PatientPlanCohortIvfTaskGroup,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {EmbryoState, IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {
  CryoInventoryCard,
  CryoSampleContainer,
  CryoSampleDonor,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {
  CryoSampleType,
  CryoStatus,
  DonorEligibility,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {
  LabInfo,
  TestObservationType,
  TestOrder,
  TestOrderItem,
  TestType,
  TestTypeObservationType,
  TransportFolder,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {OrderGroupItemEnum, TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

const id = 555467

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const staffFixture: Partial<Staff> = {
  id,
  email: 'staff-user-ivf-specimen',
  authUserId: 'staff-specimen-ivf',
}

export const serviceProviderFixture = {
  id,
}

export const patientForIVFFixture = {
  id,
  uuid: '465e9e0d-43c6-4074-a2d8-1465b7a5699b',
  authUserId: 'ivf-user',
  serviceProviderId: serviceProviderFixture.id,
}

export const planCategoryFixture = {
  id,
}

export const labFixture: Partial<LabInfo> = {
  id,
  uuid: '2d5bb10b-1117-4cdc-8705-63f1eecdd6d5',
  name: 'Lab for IVF',
  location: 'sadas',
  phone: '+1231',
}

export const testTypeGTFixture: Partial<TestType> = {
  id,
  uuid: 'd5483ad6-2c35-4d69-a8f9-12805b0ff0df',
  title: 'GT',
  labId: labFixture.id,
  processType: ProcessType.GeneticTesting,
}

export const testTypeNotGTFixture: Partial<TestType> = {
  id: id + 1,
  uuid: 'a5483ad6-2c35-4d69-a8f9-12805b0ff1af',
  title: 'NotGT',
  labId: labFixture.id,
}

export const observationTypeFixture: Partial<TestObservationType> = {
  id,
  internalName: 'Comments',
}

export const observationTypeOptionalFixture: Partial<TestObservationType> = {
  id: id + 1,
  optional: true,
}

export const testTypePGTAFixture: Partial<TestType> = {
  id: id + 2,
  uuid: 'd5483ad6-3c35-4d69-b8f9-12805b0ff0df',
  title: 'PGTA',
  labId: labFixture.id,
  processType: ProcessType.GeneticTesting,
  observationRelations: [
    {id, observationTypeId: observationTypeFixture.id, sequence: 1},
  ] as TestTypeObservationType[],
}

export const testTypePGTMFixture: Partial<TestType> = {
  id: id + 3,
  uuid: 'a5483ad6-3c35-4d69-b8f9-12805b0fc0db',
  title: 'PGTM',
  labId: labFixture.id,
  processType: ProcessType.GeneticTesting,
  observationRelations: [
    {id: id + 1, observationTypeId: observationTypeFixture.id, sequence: 1},
    {id: id + 2, observationTypeId: observationTypeOptionalFixture.id, sequence: 2},
  ] as TestTypeObservationType[],
}

export const planTypeFixture: Partial<PlanType> = {
  id: id + 1,
  title: 'planTypeFixture',
  planCategoryId: planCategoryFixture.id,
  ivfLabCohortStartDay: 0,
  patientPlanStatusId: patientPlanStatusFixture.id,
}

export const patientPlanToCancelCohortFixture = {
  id: id + 1,
  patientId: patientForIVFFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Completed,
}

export const patientPlanToCompleteCohortFixture = {
  id: id + 2,
  patientId: patientForIVFFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
}

export const ivfTaskToDayFixture: Partial<IvfTaskToDay> = {
  id,
  skipAllowed: false,
  task: IVFTaskType.LabelDishes,
  day: 1,
}

export const ivfTaskToDayCaIonophoreFixture: Partial<IvfTaskToDay> = {
  id: id + 1,
  skipAllowed: false,
  task: IVFTaskType.CaIonophore,
  day: 1,
}

export const ivfTaskToDayISCIFixture: Partial<IvfTaskToDay> = {
  id: id + 2,
  skipAllowed: false,
  task: IVFTaskType.IcsiInjection,
  day: 1,
}

export const ivfTaskToDayPISCIFixture: Partial<IvfTaskToDay> = {
  id: id + 4,
  skipAllowed: false,
  task: IVFTaskType.PICSI,
  day: 1,
}

export const ivfTaskToDayIcsiInjectionFixture: Partial<IvfTaskToDay> = {
  id: id + 3,
  skipAllowed: false,
  task: IVFTaskType.IcsiInjection,
  day: 0,
}

export const ivfTaskToPlanTypeFixture: Partial<IvfTaskToDayToPlanType> = {
  id,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  planTypeId: planTypeFixture.id,
}

export const ivfTaskToPlanTypeIcsiInjectionFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 3,
  IVFTaskToDayId: ivfTaskToDayIcsiInjectionFixture.id,
  planTypeId: planTypeFixture.id,
}

export const patientPlanCohortToCancelFixture: Partial<PatientPlanCohort> = {
  id,
  patientPlanId: patientPlanToCancelCohortFixture.id,
  cohortDate: '2023-02-02',
}

export const patientPlanCohortToCompleteFixture: Partial<PatientPlanCohort> = {
  id: id + 1,
  patientPlanId: patientPlanToCompleteCohortFixture.id,
  cohortDate: '2023-02-02',
}

export const ivfTaskDetailsToCompleteFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id,
  patientPlanCohortId: patientPlanCohortToCompleteFixture.id,
  updatedAt: dateTimeUtil.now(),
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}

export const ivfTaskDetailsToCancelFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: id + 1,
  patientPlanCohortId: patientPlanCohortToCancelFixture.id,
}

export const ivfTaskGroupFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id,
  patientPlanCohortId: patientPlanCohortToCancelFixture.id,
  day: 1,
  uuid: '465e9e0d-43c6-4074-a2d8-1465b7a5699b',
}

export const ivfTaskSummaryFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id,
  patientPlanCohortId: patientPlanCohortToCancelFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupFixture.id,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  signedOffById: staffFixture.id,
}

export const cryoDonorFixture: Partial<CryoSampleDonor> = {
  id,
  uuid: '8dk2204i-8f12-603o-4596-856323b76c12',
  isDonorPresent: false,
  note: 'donorNote',
  donorNumber: '123',
  bank: 'Citibank',
  eligibility: DonorEligibility.Eligible,
}

export const cryoInventoryCardFixture: Partial<CryoInventoryCard> = {
  id,
  uuid: '343afec0-18b2-4d45-bd57-a1c7da468780',
  patientId: patientForIVFFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-02-15',
  cryoDonorId: cryoDonorFixture.id,
}

export const cryoSampleContainerForCancelledFixture: Partial<CryoSampleContainer> = {
  id,
  uuid: '8134204a-8f12-603o-4596-879546b7731',
  identifier: 'A24-1211-1',
  status: CryoStatus.Frozen,
  cryoInventoryCardId: cryoInventoryCardFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForCompletedIVFFixture: Partial<CryoSampleContainer> = {
  id: id + 1,
  uuid: '8134404a-8f32-623o-4596-879546b7731',
  identifier: 'A24-1213-2',
  status: CryoStatus.Frozen,
  freezeComment: 'FreezeCOmment',
  cryoInventoryCardId: cryoInventoryCardFixture.id,
  strawNumber: 2,
}

export const cryoSampleContainerForCompletedThawedIVFFixture: Partial<CryoSampleContainer> = {
  id: id + 2,
  uuid: '2134404a-8f32-603o-4592-879546b7731',
  identifier: 'A24-1214-2',
  status: CryoStatus.Thawed,
  cryoInventoryCardId: cryoInventoryCardFixture.id,
  strawNumber: 3,
}

export const expandedEmbryoForCancelledFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> = {
  id,
  uuid: '33a122a-a401-4f29-a1dd-a76f1437502a',
  patientPlanCohortId: patientPlanCohortToCancelFixture.id,
  state: EmbryoState.Frozen,
  biopsyRequired: true,
  cryoSampleContainerId: cryoSampleContainerForCancelledFixture.id,
  embryoNumber: 1,
}

export const expandedEmbryoForCompletedFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> = {
  id: id + 1,
  uuid: '33a122a-a401-4f29-a1dd-b76f1437502b',
  patientPlanCohortId: patientPlanCohortToCompleteFixture.id,
  state: EmbryoState.Frozen,
  biopsyRequired: true,
  cryoSampleContainerId: cryoSampleContainerForCompletedIVFFixture.id,
  embryoNumber: 2,
}

export const expandedEmbryoForCompletedThawedFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: id + 2,
    uuid: '33a122a-a401-4f29-a1dd-276f1437502c',
    patientPlanCohortId: patientPlanCohortToCompleteFixture.id,
    state: EmbryoState.Frozen,
    biopsyRequired: true,
    cryoSampleContainerId: cryoSampleContainerForCompletedThawedIVFFixture.id,
    embryoNumber: 3,
  }

export const testOrderForIVFAbandonedFixture: Partial<TestOrder> = {
  id,
  uuid: 'a18aab5e-c047-4108-bc18-8af3f058f257',
  patientId: patientForIVFFixture.id,
  status: TestOrderStatusEnum.Abandoned,
  patientPlanId: patientPlanToCompleteCohortFixture.id,
}

export const testOrderForIVFFixture: Partial<TestOrder> = {
  id: id + 1,
  uuid: 'a28aab5e-c042-4108-ac18-8af3f058f257',
  patientId: patientForIVFFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  patientPlanId: patientPlanToCompleteCohortFixture.id,
}

export const testOrderForCancelledIVFFixture: Partial<TestOrder> = {
  id: id + 2,
  uuid: 'b28aab5e-c042-4108-ac18-8af3f058f257',
  patientId: patientForIVFFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  patientPlanId: patientPlanToCancelCohortFixture.id,
}

export const testOrderItemForIVFFixture: Partial<TestOrderItem> = {
  id,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForIVFFixture.id,
  testTypeId: testTypeGTFixture.id,
}

export const testOrderItemForIVFGTFixture: Partial<TestOrderItem> = {
  id: id + 111,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForIVFFixture.id,
  testTypeId: testTypePGTAFixture.id,
}

export const testOrderItemPGTMFixture: Partial<TestOrderItem> = {
  id: id + 2,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForIVFFixture.id,
  testTypeId: testTypePGTMFixture.id,
}

export const testOrderItemNotGeneticTestingFixture: Partial<TestOrderItem> = {
  id: id + 11,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForIVFFixture.id,
  testTypeId: testTypeNotGTFixture.id,
}

export const testOrderItemForCancelledIVFFixture: Partial<TestOrderItem> = {
  id: id + 1,
  type: OrderGroupItemEnum.TestType,
  testOrderId: testOrderForCancelledIVFFixture.id,
  testTypeId: testTypeGTFixture.id,
}

export const transportFolderFixture: Partial<TransportFolder> = {
  id,
  uuid: '57d56a58-625e-4e70-b9d5-87ad49a1e223',
  identifier: 'TRA1-NOV123',
  name: 'ivf transport',
  transportDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  labId: labFixture.id,
}

export async function createIVFLabSpecimenSeeds(dataSource: DataSource): Promise<void> {
  const patientSeed = new PatientSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const ivfTaskDayToPlanTypeSeed = new IvfDayTaskToPlanTypeSeed(dataSource)
  const ivfTaskToDaySeed = new IvfTaskToDaySeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const patientPlanCohortDetailsSeed = new IvfTaskDetailsSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const ivfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(dataSource)
  const ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const cryoSampleDonorSeed = new CryoSampleDonorSeed(dataSource)
  const cryoInventorySeed = new CryoInventoryCardSeed(dataSource)
  const cryoSampleContainerSeed = new CryoSampleContainerSeed(dataSource)
  const ivfTaskExpandedEmbryoSeed = new IvfTaskExpendedEmbryoSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const testOrderItemSeed = new TestOrderItemSeed(dataSource)
  const transportFolderSeed = new TransportFolderSeed(dataSource)
  const testObservationTypeSeed = new TestObservationTypeSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)

  await Promise.all([
    labInfoSeed.create(labFixture),
    testObservationTypeSeed.createArray([observationTypeFixture, observationTypeOptionalFixture]),
    serviceProviderSeed.create(serviceProviderFixture),
  ])
  await transportFolderSeed.create(transportFolderFixture)
  await cryoSampleDonorSeed.create(cryoDonorFixture)
  await patientPlanStatusSeed.create(patientPlanStatusFixture)
  await staffSeed.create(staffFixture)
  await ivfTaskToDaySeed.createArray([
    ivfTaskToDayFixture,
    ivfTaskToDayCaIonophoreFixture,
    ivfTaskToDayISCIFixture,
    ivfTaskToDayPISCIFixture,
    ivfTaskToDayIcsiInjectionFixture,
  ])
  await Promise.all([
    planCategorySeed.create(planCategoryFixture),
    testTypeSeed.createArray([
      testTypeGTFixture,
      testTypeNotGTFixture,
      testTypePGTAFixture,
      testTypePGTMFixture,
    ]),
  ])
  await patientSeed.createArray([patientForIVFFixture])
  await planTypeSeed.createArray([planTypeFixture])
  await cryoInventorySeed.create(cryoInventoryCardFixture)
  await Promise.all([
    patientPlanSeed.createArray([
      patientPlanToCancelCohortFixture,
      patientPlanToCompleteCohortFixture,
    ]),
    ivfTaskDayToPlanTypeSeed.createArray([
      ivfTaskToPlanTypeFixture,
      ivfTaskToPlanTypeIcsiInjectionFixture,
    ]),
  ])
  await patientPlanCohortSeed.createArray([
    patientPlanCohortToCancelFixture,
    patientPlanCohortToCompleteFixture,
  ])
  await patientPlanCohortDetailsSeed.createArray([
    ivfTaskDetailsToCancelFixture,
    ivfTaskDetailsToCompleteFixture,
  ])
  await Promise.all([
    ivfTaskGroupSeed.create(ivfTaskGroupFixture),
    cryoSampleContainerSeed.createArray([
      cryoSampleContainerForCancelledFixture,
      cryoSampleContainerForCompletedIVFFixture,
      cryoSampleContainerForCompletedThawedIVFFixture,
    ]),
    testOrderSeed.createArray([
      testOrderForIVFAbandonedFixture,
      testOrderForIVFFixture,
      testOrderForCancelledIVFFixture,
    ]),
  ])
  await Promise.all([
    ivfTaskSummarySeed.create(ivfTaskSummaryFixture),
    ivfTaskExpandedEmbryoSeed.createArray([
      expandedEmbryoForCancelledFixture,
      expandedEmbryoForCompletedFixture,
      expandedEmbryoForCompletedThawedFixture,
    ]),
    testOrderItemSeed.createArray([
      testOrderItemForCancelledIVFFixture,
      testOrderItemForIVFFixture,
      testOrderItemNotGeneticTestingFixture,
      testOrderItemForIVFGTFixture,
      testOrderItemPGTMFixture,
    ]),
  ])
}

export async function destroyIVFLabSpecimenFixtures(dataSource: DataSource): Promise<void> {
  const patientSeed = new PatientSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const ivfTaskDayToPlanTypeSeed = new IvfDayTaskToPlanTypeSeed(dataSource)
  const ivfTaskToDaySeed = new IvfTaskToDaySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const cryoSampleDonorSeed = new CryoSampleDonorSeed(dataSource)
  const cryoInventoryCardSeed = new CryoInventoryCardSeed(dataSource)
  const cryoSampleContainerSeed = new CryoSampleContainerSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const testOrderItemSeed = new TestOrderItemSeed(dataSource)
  const specimenSeed = new SpecimenSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const transportFolderSeed = new TransportFolderSeed(dataSource)
  const testObservationTypeSeed = new TestObservationTypeSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)

  await testResultSeed.removeByPatientPlanIds([
    patientPlanToCancelCohortFixture.id,
    patientPlanToCompleteCohortFixture.id,
  ])
  await patientPlanCohortSeed.removeByPlanIds([patientPlanToCancelCohortFixture.id])
  await cryoSampleContainerSeed.removeByIds([
    cryoSampleContainerForCancelledFixture.id,
    cryoSampleContainerForCompletedIVFFixture.id,
    cryoSampleContainerForCompletedThawedIVFFixture.id,
  ])
  await specimenSeed.removeByPatientId(patientForIVFFixture.id)
  await testOrderItemSeed.removeByIds([
    testOrderItemForCancelledIVFFixture.id,
    testOrderItemForIVFFixture.id,
    testOrderItemNotGeneticTestingFixture.id,
    testOrderItemForIVFGTFixture.id,
    testOrderItemPGTMFixture.id,
  ])
  await Promise.all([
    ivfTaskDayToPlanTypeSeed.removeByIds([
      ivfTaskToPlanTypeFixture.id,
      ivfTaskToPlanTypeIcsiInjectionFixture.id,
    ]),
    patientPlanSeed.removeByIds([
      patientPlanToCancelCohortFixture.id,
      patientPlanToCompleteCohortFixture.id,
    ]),
  ])
  await cryoInventoryCardSeed.removeByIds([cryoInventoryCardFixture.id])
  await testOrderSeed.removeByIds([
    testOrderForIVFAbandonedFixture.id,
    testOrderForIVFFixture.id,
    testOrderForCancelledIVFFixture.id,
  ])
  await Promise.all([
    patientSeed.removeByIds([patientForIVFFixture.id]),
    testTypeSeed.removeByIds([
      testTypeGTFixture.id,
      testTypeNotGTFixture.id,
      testTypePGTAFixture.id,
      testTypePGTMFixture.id,
    ]),
  ])
  await planTypeSeed.removeByIds([planTypeFixture.id])
  await planCategorySeed.removeById(planCategoryFixture.id)
  await ivfTaskToDaySeed.removeByIds([
    ivfTaskToDayFixture.id,
    ivfTaskToDayCaIonophoreFixture.id,
    ivfTaskToDayISCIFixture.id,
    ivfTaskToDayPISCIFixture.id,
  ])
  await patientPlanStatusSeed.removeById(patientPlanStatusFixture.id)
  await cryoSampleDonorSeed.removeByIds([cryoDonorFixture.id])
  await transportFolderSeed.removeByIds([transportFolderFixture.id])
  await Promise.all([
    labInfoSeed.removeByIds([labFixture.id]),
    testObservationTypeSeed.removeByIds([
      observationTypeFixture.id,
      observationTypeOptionalFixture.id,
    ]),
    serviceProviderSeed.removeById(serviceProviderFixture.id),
  ])
  await staffSeed.removeByIds([staffFixture.id])
}
