import {testPubSubEvent} from '@functions-types'
import {
  PatientSeed,
  SpecimenSeed,
  SpecimenTestSeed,
  TestTypeSeed,
  LabInfoSeed,
  SpecimenGroupSeed,
  TestResultSeed,
  ServiceProviderSeed,
  TestOrderSeed,
  ServiceCategoryInputSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  StaffSeed,
  ThyroidProtocolResultSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  Specimen,
  SpecimenTest,
  LabInfo,
  TestType,
  SpecimenGroup,
  TestOrder,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus} from '@libs/common/enums'

import {
  SpecimenStatus,
  LabInfoType,
  TestOrderStatusEnum,
  HormoneType,
} from '@libs/data-layer/apps/clinic-test/enums'
import {v4} from 'uuid'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {handlerCreatePendingResultForSpecimen} from '@firebase-platform/functions/test-orders-and-results/src/create-results-for-specimen/handler'
import {mockedAuditMetadata} from './fixtures/audit.fixture'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {SpecimensCollectedSchema} from '@libs/common/model/proto-schemas/specimens-collected.schema'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

jest.setTimeout(30000)

jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const specimenCollectedId = 888800000
const patientId = 888800000

const specimenTestForTSHId = 99990000
const specimenTestForTPOId = 33333000

const testTypeTSHId = 886600000
const testTypeTPOId = 88770000
const labId = 888800000
const specimenGroupId = 888800000
const serviceProviderId = 888800000
const testOrderId = 888800000
const appointmentId = 888800000
const appointmentDoneId = 77770000
const serviceCategoryId = 888800000
const serviceTypeId = 888800000
const appointmentUUID = v4()
const staffUUID = v4()

export const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: 'CF_TEST_AUTH_ID_SPECIMEN',
  firstName: 'CF_TEST_NAME_SPECIMEN',
  lastName: 'CF_TEST_LAST_NAME_SPECIMEN',
  middleName: 'CF_TEST_MIDDLE_NAME_SPECIMEN',
  serviceProviderId,
}
const testOrderData: Partial<TestOrder> = {
  id: testOrderId,
  uuid: v4(),
  patientId: patientId,
  status: TestOrderStatusEnum.NotCollected,
}

const serviceProviderData: Partial<ServiceProvider> = {
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
const specimenGroupData: Partial<SpecimenGroup> = {
  id: specimenGroupId,
  title: 'title',
  color: 'color',
}
export const testTypeTSHFixture: Partial<TestType> = {
  id: testTypeTSHId,
  uuid: v4(),
  title: 'TSH',
  labId: labId,
  specimenGroupId: specimenGroupId,
  hormoneType: HormoneType.ThyroidStimulatingHormone,
}

export const testTypeTPOFixture: Partial<TestType> = {
  id: testTypeTPOId,
  uuid: v4(),
  title: 'TPO',
  labId: labId,
  specimenGroupId: specimenGroupId,
  hormoneType: HormoneType.ThyroidPeroxidase,
}

const specimenUUID = v4()
export const specimenCollectedData: Partial<Specimen> = {
  id: specimenCollectedId,
  uuid: specimenUUID,
  specimenIdentifier: 'S00000077433',
  patientId,
  serviceTypeId,
  specimenGroupId: specimenGroupId,
  status: SpecimenStatus.Collected,
  testOrderId,
  collectedOn: dateTimeUtil.now(),
}

export const specimenTestTSHData: Partial<SpecimenTest> = {
  id: specimenTestForTSHId,
  specimenId: specimenCollectedId,
  testTypeId: testTypeTSHId,
}

export const specimenTestTPOData: Partial<SpecimenTest> = {
  id: specimenTestForTPOId,
  specimenId: specimenCollectedId,
  testTypeId: testTypeTPOId,
}

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

export const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId: serviceCategoryId,
}
export const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  uuid: appointmentUUID,
  status: AppointmentStatus.Done,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
}

const appointmentDoneUUID = v4()
export const appointmentDoneData: Partial<Appointment> = {
  ...appointmentData,
  id: appointmentDoneId,
  uuid: appointmentDoneUUID,
}

export const staffForResults: Partial<Staff> = {
  id: 5424,
  uuid: staffUUID,
  authUserId: 'MockStaffForCF',
  email: 'fhealthdev+test@gmail.com',
}

jest.mock('@google-cloud/logging-bunyan')

describe('Firebase Function: create-results-for-specimen', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let specimenSeed: SpecimenSeed
  let specimenTestSeed: SpecimenTestSeed
  let labInfoSeed: LabInfoSeed
  let testTypeSeed: TestTypeSeed
  let specimenGroupSeed: SpecimenGroupSeed
  let serviceProviderSeed: ServiceProviderSeed
  let testResultSeed: TestResultSeed
  let testOrderSeed: TestOrderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed

  let staffSeed: StaffSeed = null
  let thyroidProtocolResultSeed: ThyroidProtocolResultSeed

  let thyroidProtocolResultId = null
  let testResultForTSHId = null
  let testResultForTPOId = null

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    specimenSeed = new SpecimenSeed(dataSource)
    specimenTestSeed = new SpecimenTestSeed(dataSource)
    labInfoSeed = new LabInfoSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    specimenGroupSeed = new SpecimenGroupSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    thyroidProtocolResultSeed = new ThyroidProtocolResultSeed(dataSource)

    await serviceCategorySeed.createArray([serviceCategoryData])
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.createArray([serviceTypeData])
    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.create(patientData)
    await appointmentSeed.createArray([appointmentData, appointmentDoneData])
    await labInfoSeed.create(labInfoData)
    await specimenGroupSeed.create(specimenGroupData)

    await testTypeSeed.create(testTypeTSHFixture)
    await testTypeSeed.create(testTypeTPOFixture)

    await testOrderSeed.create(testOrderData)
    await specimenSeed.create(specimenCollectedData)

    await specimenTestSeed.create(specimenTestTSHData)
    await specimenTestSeed.create(specimenTestTPOData)

    await staffSeed.create(staffForResults)
  })

  test('Should create Pending test result for Thyroid Protocol for specimen & testResultMeasurement', async () => {
    const data = {
      specimens: [
        {
          uuid: specimenUUID,
          appointmentUUID,
        },
      ],
      ...mockedAuditMetadata,
      authUserId: staffForResults.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, SpecimensCollectedSchema))

    const result = handlerCreatePendingResultForSpecimen(message)
    await expect(result).resolves.not.toThrow()

    const testResultForTSH = await testResultSeed.findOneByPatientIdAndTestTypeHormoneType(
      patientId,
      HormoneType.ThyroidStimulatingHormone,
    )

    testResultForTSHId = testResultForTSH.id

    const testResultForTPO = await testResultSeed.findOneByPatientIdAndTestTypeHormoneType(
      patientId,
      HormoneType.ThyroidPeroxidase,
    )

    testResultForTPOId = testResultForTPO.id

    const thyroidProtocolResult = await thyroidProtocolResultSeed.findOneByPatientIdAndDate(
      patientId,
      dateTimeUtil.formatDateYMD(dateTimeUtil.toDate(specimenCollectedData.collectedOn)),
    )

    thyroidProtocolResultId = thyroidProtocolResult.id

    expect(thyroidProtocolResult.tshTestResultId).toBe(testResultForTSH.id)
    expect(thyroidProtocolResult.tpoTestResultId).toBe(testResultForTPO.id)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await staffSeed.removeByIds([staffForResults.id])
    await thyroidProtocolResultSeed.removeByIds([thyroidProtocolResultId])
    await testResultSeed.removeByIds([testResultForTSHId, testResultForTPOId])
    await specimenSeed.removeByIds([specimenCollectedId])
    await specimenTestSeed.removeByIds([specimenTestForTSHId, specimenTestForTPOId])
    await appointmentSeed.removeByIds([appointmentId, appointmentDoneId])
    await serviceTypeSeed.removeById(serviceTypeId)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceCategorySeed.removeById(serviceCategoryId)
    await serviceProviderSeed.removeById(serviceProviderId)
    await patientSeed.removePatientByAuthUserId(patientData.authUserId)
    await testOrderSeed.removeByIds([testOrderId])
    await labInfoSeed.removeByIds([labId])
    await testTypeSeed.removeByIds([testTypeTSHId, testTypeTPOId])

    await dataSource.destroy()
  })
})
