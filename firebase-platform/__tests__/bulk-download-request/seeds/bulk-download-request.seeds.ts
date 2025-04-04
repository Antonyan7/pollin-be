import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {
  superTypeGroupFixture,
  superTypeOtherFixture,
} from '@libs/common/test/fixtures/super-type.fixture'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  LabInfo,
  Specimen,
  TestOrder,
  TestResult,
  TestResultMeasurement,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  HormoneType,
  LabInfoType,
  SpecimenStatus,
  TestOrderStatusEnum,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  PatientPlan,
  PatientPlanSheet,
  PlanCategory,
  PlanType,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanTypeSheet} from '@libs/data-layer/apps/plan/entities/typeorm/plan-type-sheet.entity'
import {PlanTypeGroup} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {ServiceProvider, ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  BulkDownloadRequest,
  BulkDownloadRequestItem,
  BulkDownloadRequestItemType,
  EncounterType,
  Patient,
  PatientEncounter,
  PatientStaffNote,
  StaffNoteType,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {Pharmacy} from '@libs/data-layer/apps/users/entities/typeorm/pharmacy.entity'
import {
  BulkDownloadGenerationType,
  BulkDownloadRequestStatus,
} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {PatientPrescriptionStatus} from '@libs/services-common/enums'
import {
  BulkDownloadRequestItemSeed,
  BulkDownloadRequestSeed,
  EncounterTypeSeed,
  LabInfoSeed,
  PatientEncounterSeed,
  PatientPlanSeed,
  PatientPlanSheetSeed,
  PatientPlanStatusSeed,
  PatientPrescriptionSeed,
  PatientSeed,
  PatientStaffNoteSeed,
  PharmacySeed,
  PlanCategorySeed,
  PlanTypeSeed,
  ServiceCategoryInputSeed,
  ServiceCategorySeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  SpecimenSeed,
  StaffNoteTypeSeed,
  StaffSeed,
  SuperTypeSeed,
  TestOrderSeed,
  TestResultMeasurementSeed,
  TestResultSeed,
  TestTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {v4} from 'uuid'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const id = 888800000

const specimenCollectedId = 888800000
const testTypeTSHId = 886600000
const labId = 888800000
const serviceProviderId = 888800000
const testOrderId = 888800000
const serviceCategoryId = 888800000
const serviceTypeId = 888800000

export const patientData: Partial<Patient> = {
  id,
  authUserId: 'BULK_DOWNLOAD',
  firstName: 'BULK_DOWNLOAD_FIRST',
  lastName: 'BULK_DOWNLOAD_LAST',
  serviceProviderId,
}

export const testOrderData: Partial<TestOrder> = {
  id: testOrderId,
  uuid: v4(),
  patientId: patientData.id,
  status: TestOrderStatusEnum.Completed,
}

export const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  uuid: v4(),
  title: 'title',
  imageURL: 'IMG',
  description: 'description',
  designation: 'designation',
}

export const labInfoData: Partial<LabInfo> = {
  id: labId,
  uuid: v4(),
  name: 'Laboratory Name',
  location: 'Address',
  phone: '+454545454545',
  type: LabInfoType.Internal,
}

export const testTypeTSHFixture: Partial<TestType> = {
  id: testTypeTSHId,
  uuid: v4(),
  title: 'TSH',
  labId: labId,
  hormoneType: HormoneType.ThyroidStimulatingHormone,
  superTypeId: superTypeGroupFixture.id,
}

export const planCategoryFixture: Partial<PlanCategory> = {
  id,
  title: 'Category',
}

export const planTypeFixture: Partial<PlanType> = {
  id,
  title: 'planTypeFixture',
  planCategoryId: planCategoryFixture.id,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
  patientPlanStatusId: patientPlanStatusFixture.id,
  sheets: [
    {
      id: id + 1,
      type: PlanSheetType.Stimulation,
    },
    {
      id: id + 2,
      type: PlanSheetType.Priming,
    },
    {
      id: id + 3,
      type: PlanSheetType.HCG,
    },
    {
      id: id + 4,
      type: PlanSheetType.OB,
    },
    {
      id: id + 5,
      type: PlanSheetType.EPL,
    },
  ] as PlanTypeSheet[],
}

export const patientPlanFixture: Partial<PatientPlan> = {
  id,
  patientId: patientData.id,
  planTypeId: planTypeFixture.id,
}

export const patientPlan2Fixture: Partial<PatientPlan> = {
  id: id + 1,
  patientId: patientData.id,
  planTypeId: planTypeFixture.id,
}

export const patientPlanSheetEPLFixture: Partial<PatientPlanSheet> = {
  id,
  uuid: 'kqa1es16-df9a-2172-aae2-981b5863e776',
  type: PlanSheetType.EPL,
  dayOne: '2023-02-02',
  patientPlanId: patientPlanFixture.id,
}

export const patientPlanSheetHCGFixture: Partial<PatientPlanSheet> = {
  id: id + 1,
  uuid: 'kqa1es16-df9a-2172-aae2-981b5863e775',
  type: PlanSheetType.HCG,
  dayOne: '2023-02-02',
  patientPlanId: patientPlanFixture.id,
}

export const patientPlanSheetOBFixture: Partial<PatientPlanSheet> = {
  id: id + 2,
  uuid: 'kqa1es16-df9a-2172-aae2-981b5863e774',
  type: PlanSheetType.OB,
  dayOne: '2023-02-02',
  patientPlanId: patientPlanFixture.id,
}

export const patientPlanSheetPrimingFixture: Partial<PatientPlanSheet> = {
  id: id + 3,
  uuid: 'kqa1es16-df9a-2172-aae2-981b5863e773',
  type: PlanSheetType.Priming,
  dayOne: '2023-02-02',
  patientPlanId: patientPlanFixture.id,
}

export const patientPlanSheetStimFixture: Partial<PatientPlanSheet> = {
  id: id + 4,
  uuid: 'kqa1es16-df9a-2172-aae2-981b5863e772',
  type: PlanSheetType.Stimulation,
  dayOne: '2023-02-02',
  patientPlanId: patientPlanFixture.id,
}

export const patientPlanSheetStim2Fixture: Partial<PatientPlanSheet> = {
  id: id + 5,
  uuid: 'aqa1es26-af9a-2172-aae2-981b5863e772',
  type: PlanSheetType.Stimulation,
  dayOne: '2023-02-03',
  patientPlanId: patientPlan2Fixture.id,
}

const specimenUUID = v4()
export const specimenCollectedData: Partial<Specimen> = {
  id: specimenCollectedId,
  uuid: specimenUUID,
  specimenIdentifier: 'S00000077433',
  patientId: patientData.id,
  serviceTypeId,
  status: SpecimenStatus.Collected,
  testOrderId,
  collectedOn: dateTimeUtil.now(),
}

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

export const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId: serviceCategoryId,
}

export const staffForResults: Partial<Staff> = {
  id: 5424,
  uuid: v4(),
  authUserId: 'MockStaffForCF',
  email: 'fhealthdev+test@gmail.com',
}

export const encounterTypeFixture: Partial<EncounterType> = {
  id: 5424,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110010',
  title: 'encounterTypeFixture',
}

export const patientEncounterFixture: Partial<PatientEncounter> = {
  id: 5424,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110010',
  patientId: patientData.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffForResults.id,
  note: '<p>this is note</p>',
}

export const patientEncounterToShowFirstFixture: Partial<PatientEncounter> = {
  id: 5425,
  uuid: 'd6c908f2-132a-12ed-814e-0242ac110010',
  patientId: patientData.id,
  encounterTypeId: encounterTypeFixture.id,
  authorId: staffForResults.id,
  note: '<p>this is note</p>',
}

export const staffNoteTypeFixture: Partial<StaffNoteType> = {
  id: 5424,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110010',
  title: 'staffNoteFixture',
}

export const patientStaffNoteFixture: Partial<PatientStaffNote> = {
  id: 5424,
  uuid: 'd6c908f5-132d-11ed-814e-0242ac110010',
  patientId: patientData.id,
  staffNoteTypeId: staffNoteTypeFixture.id,
  authorId: staffForResults.id,
  note: '<p>this is note</p>',
}

export const pharmacyFixture: Partial<Pharmacy> = {
  id: 5424,
  name: 'Pharmacy Fixture name',
}

export const patientPrescriptionFixture: Partial<PatientPrescription> = {
  id: 5424,
  patientId: patientData.id,
  uuid: 'cba07546-a92b-424f-89ef-f3e5a309e1c1',
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.now(),
  prescriberId: staffForResults.id,
}

export const patientPrescriptionArchivedFixture: Partial<PatientPrescription> = {
  id: 5425,
  patientId: patientData.id,
  uuid: 'cba07546-a92c-424f-89ef-f3e5a309e1c1',
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.now(),
  prescriberId: staffForResults.id,
  status: PatientPrescriptionStatus.Archived,
}

export const testResultFixture: Partial<TestResult> = {
  id: 1,
  uuid: '59fce629-ec6c-4a3f-a363-fe856f98c88d',
  patientId: patientData.id,
  status: TestResultStatus.Completed,
  labId: labInfoData.id,
  testResultKind: TestResultKind.TestType,
  orderingPhysicianId: serviceTypeData.id,
  testTypeId: testTypeTSHFixture.id,
}

export const testResultMeasurementFixture: Partial<TestResultMeasurement> = {
  id: 1,
  uuid: '59fce629-ec6c-4a3f-a363-fe856f98c88d',
  testResultId: testResultFixture.id,
  testTypeId: testTypeTSHFixture.id,
  result: 'result',
  dateReceived: dateTimeUtil.now(),
}

export const bulkDownloadRequestForMergedTypeFixture: Partial<BulkDownloadRequest> = {
  id: 1,
  uuid: 'cef1e716-df9a-4171-aae2-981b5863e794',
  patientId: patientData.id,
  staffId: staffForResults.id,
  status: BulkDownloadRequestStatus.Pending,
  generationType: BulkDownloadGenerationType.Merge,
  fileName: 'file_name',
}

export const bulkDownloadRequestForZipTypeFixture: Partial<BulkDownloadRequest> = {
  id: 2,
  uuid: 'kqf1e716-df9a-4171-aae2-981b5863e772',
  patientId: patientData.id,
  staffId: staffForResults.id,
  status: BulkDownloadRequestStatus.Pending,
  generationType: BulkDownloadGenerationType.Zip,
  fileName: 'file_name',
}

export const bulkDownloadRequestForZipTypeToFailFixture: Partial<BulkDownloadRequest> = {
  id: 3,
  uuid: 'kqa1e116-df9a-2172-aae2-981b5863e772',
  patientId: patientData.id,
  staffId: staffForResults.id,
  status: BulkDownloadRequestStatus.Pending,
  generationType: BulkDownloadGenerationType.Zip,
  fileName: 'file_name',
}

export const bulkDownloadRequestTestResultMergedPDFFixture: Partial<BulkDownloadRequestItem> = {
  id: 1,
  bulkDownloadRequestId: bulkDownloadRequestForMergedTypeFixture.id,
  testResultId: testResultFixture.id,
  type: BulkDownloadRequestItemType.TestResult,
}

export const bulkDownloadRequestTestResultZipFixture: Partial<BulkDownloadRequestItem> = {
  id: 2,
  bulkDownloadRequestId: bulkDownloadRequestForZipTypeFixture.id,
  testResultId: testResultFixture.id,
  type: BulkDownloadRequestItemType.TestResult,
}

export const bulkDownloadRequestEncounterFixture: Partial<BulkDownloadRequestItem> = {
  id: 3,
  bulkDownloadRequestId: bulkDownloadRequestForZipTypeFixture.id,
  patientEncounterId: patientEncounterFixture.id,
  type: BulkDownloadRequestItemType.PatientEncounter,
  includeAddendums: true,
  sequence: 2,
}

export const bulkDownloadRequestPrescriptionFixture: Partial<BulkDownloadRequestItem> = {
  id: 4,
  bulkDownloadRequestId: bulkDownloadRequestForZipTypeFixture.id,
  patientPrescriptionId: patientPrescriptionFixture.id,
  type: BulkDownloadRequestItemType.PatientPrescription,
}

export const bulkDownloadRequestEncounterForZipTypeToFailFixture: Partial<BulkDownloadRequestItem> =
  {
    id: 5,
    bulkDownloadRequestId: bulkDownloadRequestForZipTypeToFailFixture.id,
    patientEncounterId: patientEncounterFixture.id,
    type: BulkDownloadRequestItemType.PatientEncounter,
  }

export const bulkDownloadRequestWorksheetFixture: Partial<BulkDownloadRequestItem> = {
  id: 6,
  bulkDownloadRequestId: bulkDownloadRequestForZipTypeFixture.id,
  patientPlanSheetId: patientPlanSheetEPLFixture.id,
  type: BulkDownloadRequestItemType.PatientPlanSheet,
}

export const bulkDownloadRequestStaffNoteFixture: Partial<BulkDownloadRequestItem> = {
  id: 7,
  bulkDownloadRequestId: bulkDownloadRequestForZipTypeFixture.id,
  patientStaffNoteId: patientStaffNoteFixture.id,
  type: BulkDownloadRequestItemType.PatientStaffNote,
}

export const bulkDownloadRequestEncounterFirstFixture: Partial<BulkDownloadRequestItem> = {
  id: 8,
  bulkDownloadRequestId: bulkDownloadRequestForZipTypeFixture.id,
  patientEncounterId: patientEncounterToShowFirstFixture.id,
  type: BulkDownloadRequestItemType.PatientEncounter,
  includeAddendums: true,
  sequence: 1,
}

export const createBulkDownloadRequestSeeds = async (dataSource: DataSource): Promise<void> => {
  const specimenSeed = new SpecimenSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
  const bulkDownloadRequestSeed = new BulkDownloadRequestSeed(dataSource)
  const bulkDownloadRequestTestResultSeed = new BulkDownloadRequestItemSeed(dataSource)
  const patientEncounterSeed = new PatientEncounterSeed(dataSource)
  const encounterTypeSeed = new EncounterTypeSeed(dataSource)
  const pharmacySeed = new PharmacySeed(dataSource)
  const patientPrescriptionSeed = new PatientPrescriptionSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientPlanSheetSeed = new PatientPlanSheetSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const staffNoteTypeSeed = new StaffNoteTypeSeed(dataSource)
  const patientStaffNoteSeed = new PatientStaffNoteSeed(dataSource)

  await serviceCategorySeed.createArray([serviceCategoryData])
  await patientPlanStatusSeed.createArray([patientPlanStatusFixture])
  await planCategorySeed.createArray([planCategoryFixture])
  await planTypeSeed.createArray([planTypeFixture])
  await superTypeSeed.createArray([superTypeOtherFixture, superTypeGroupFixture])
  await serviceTypeSeed.createArray([serviceTypeData])
  await serviceProviderSeed.create(serviceProviderData)
  await patientSeed.create(patientData)
  await labInfoSeed.create(labInfoData)
  await testTypeSeed.create(testTypeTSHFixture)
  await testOrderSeed.create(testOrderData)
  await specimenSeed.create(specimenCollectedData)
  await staffSeed.create(staffForResults)
  await staffNoteTypeSeed.create(staffNoteTypeFixture)
  await testResultSeed.create(testResultFixture)
  await testResultMeasurementSeed.create(testResultMeasurementFixture)
  await bulkDownloadRequestSeed.createArray([
    bulkDownloadRequestForMergedTypeFixture,
    bulkDownloadRequestForZipTypeToFailFixture,
    bulkDownloadRequestForZipTypeFixture,
  ])
  await pharmacySeed.create(pharmacyFixture)
  await patientPrescriptionSeed.createArray([
    patientPrescriptionFixture,
    patientPrescriptionArchivedFixture,
  ])
  await encounterTypeSeed.create(encounterTypeFixture)
  await patientStaffNoteSeed.create(patientStaffNoteFixture)
  await patientEncounterSeed.createArray([
    patientEncounterFixture,
    patientEncounterToShowFirstFixture,
  ])
  await patientPlanSeed.createArray([patientPlanFixture, patientPlan2Fixture])
  await patientPlanSheetSeed.createArray([
    patientPlanSheetEPLFixture,
    patientPlanSheetHCGFixture,
    patientPlanSheetOBFixture,
    patientPlanSheetPrimingFixture,
    patientPlanSheetStimFixture,
    patientPlanSheetStim2Fixture,
  ])
  await bulkDownloadRequestTestResultSeed.createArray([
    bulkDownloadRequestTestResultMergedPDFFixture,
    bulkDownloadRequestEncounterFixture,
    bulkDownloadRequestTestResultZipFixture,
    bulkDownloadRequestEncounterForZipTypeToFailFixture,
    bulkDownloadRequestPrescriptionFixture,
    bulkDownloadRequestWorksheetFixture,
    bulkDownloadRequestStaffNoteFixture,
    bulkDownloadRequestEncounterFirstFixture,
  ])
}

export const removeBulkDownloadRequestSeeds = async (dataSource: DataSource): Promise<void> => {
  const specimenSeed = new SpecimenSeed(dataSource)
  const labInfoSeed = new LabInfoSeed(dataSource)
  const testOrderSeed = new TestOrderSeed(dataSource)
  const testTypeSeed = new TestTypeSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const testResultSeed = new TestResultSeed(dataSource)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
  const bulkDownloadRequestSeed = new BulkDownloadRequestSeed(dataSource)
  const bulkDownloadRequestTestResultSeed = new BulkDownloadRequestItemSeed(dataSource)
  const patientEncounterSeed = new PatientEncounterSeed(dataSource)
  const encounterTypeSeed = new EncounterTypeSeed(dataSource)
  const pharmacySeed = new PharmacySeed(dataSource)
  const patientPrescriptionSeed = new PatientPrescriptionSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientPlanSheetSeed = new PatientPlanSheetSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const staffNoteTypeSeed = new StaffNoteTypeSeed(dataSource)
  const patientStaffNoteSeed = new PatientStaffNoteSeed(dataSource)

  await bulkDownloadRequestTestResultSeed.removeByIds([
    bulkDownloadRequestTestResultMergedPDFFixture.id,
    bulkDownloadRequestTestResultZipFixture.id,
    bulkDownloadRequestEncounterFixture.id,
    bulkDownloadRequestEncounterForZipTypeToFailFixture.id,
    bulkDownloadRequestWorksheetFixture.id,
    bulkDownloadRequestStaffNoteFixture.id,
    bulkDownloadRequestEncounterFirstFixture.id,
  ])
  await patientPlanSheetSeed.removeByIds([
    patientPlanSheetEPLFixture.id,
    patientPlanSheetHCGFixture.id,
    patientPlanSheetOBFixture.id,
    patientPlanSheetPrimingFixture.id,
    patientPlanSheetStimFixture.id,
    patientPlanSheetStim2Fixture.id,
  ])
  await patientPlanSeed.removeByIds([patientPlanFixture.id, patientPlan2Fixture.id])
  await bulkDownloadRequestSeed.removeByIds([
    bulkDownloadRequestForMergedTypeFixture.id,
    bulkDownloadRequestForZipTypeFixture.id,
    bulkDownloadRequestForZipTypeToFailFixture.id,
  ])
  await patientPrescriptionSeed.removeByIds([
    patientPrescriptionFixture.id,
    patientPrescriptionArchivedFixture.id,
  ])
  await pharmacySeed.removePharmacyByIds([pharmacyFixture.id])
  await patientEncounterSeed.removeByIds([
    patientEncounterFixture.id,
    patientEncounterToShowFirstFixture.id,
  ])
  await patientStaffNoteSeed.removeById(patientStaffNoteFixture.id)
  await encounterTypeSeed.removeById(encounterTypeFixture.id)
  await staffNoteTypeSeed.removeById(staffNoteTypeFixture.id)
  await testResultMeasurementSeed.removeByIds([testResultMeasurementFixture.id])
  await testResultSeed.removeByIds([testResultFixture.id])
  await staffSeed.removeByIds([staffForResults.id])
  await testResultSeed.removeByIds([])
  await specimenSeed.removeByIds([specimenCollectedData.id])
  await serviceTypeSeed.removeById(serviceTypeData.id)
  await serviceCategorySeed.removeById(serviceCategoryData.id)
  await serviceProviderSeed.removeById(serviceProviderData.id)
  await patientSeed.removePatientByAuthUserId(patientData.authUserId)
  await testOrderSeed.removeByIds([testOrderData.id])
  await labInfoSeed.removeByIds([labInfoData.id])
  await testTypeSeed.removeByIds([testTypeTSHFixture.id])
  await superTypeSeed.removeByIds([superTypeOtherFixture.id, superTypeGroupFixture.id])
  await planTypeSeed.removeByIds([planTypeFixture.id])
  await planCategorySeed.removeByIds([planCategoryFixture.id])
  await patientPlanStatusSeed.removeByIds([patientPlanStatusFixture.id])
}
