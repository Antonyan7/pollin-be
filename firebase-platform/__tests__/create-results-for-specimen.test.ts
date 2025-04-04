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
  TestResultMeasurementSeed,
  TestPanelToTestTypeSeed,
  TestPanelSeed,
  StaffSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {TestResultHistorySeed} from '@seeds/firestore/test-result-history.seed'
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
  TestPanel,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus, SystemAuthUserId} from '@libs/common/enums'

import {
  SpecimenStatus,
  LabInfoType,
  TestOrderStatusEnum,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {v4} from 'uuid'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {TestPanelToTestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {SpecimenRejectedSchema} from '@libs/common/model/proto-schemas/specimen-rejected.schema'
import {SpecimensCollectedSchema} from '@libs/common/model/proto-schemas/specimens-collected.schema'
import {
  handlerCreatePendingResultForSpecimen,
  handlerCreateRejectedResultsForSpecimen,
} from '@firebase-platform/functions/test-orders-and-results/src/create-results-for-specimen/handler'
import {mockedAuditMetadata} from './fixtures/audit.fixture'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

jest.setTimeout(10000)

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
const specimenRejectedId = 777700000
const patientId = 888800000
const specimenTestId = 888800000
const specimenTestRejectedId = 777700000
const specimenTestTestPanelId = 888800001
const testTypeId = 888800000
const testPanelId = 888800000
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
export const testTypeData: Partial<TestType> = {
  id: testTypeId,
  uuid: v4(),
  title: 'AMH',
  unit: 'ml',
  labId: labId,
  specimenGroupId: specimenGroupId,
}

export const testPanelData: Partial<TestPanel> = {
  id: testPanelId,
  uuid: v4(),
  title: 'CBC',
  abbreviation: 'cbc',
  labId: labId,
  specimenGroupId: specimenGroupId,
}
const specimenUUID = v4()
export const specimenCollectedData: Partial<Specimen> = {
  id: specimenCollectedId,
  uuid: specimenUUID,
  specimenIdentifier: 'S0000000688',
  patientId,
  serviceTypeId,
  specimenGroupId: specimenGroupId,
  status: SpecimenStatus.Collected,
  testOrderId,
}

const specimenRejectedUUID = v4()
export const specimenRejectedData: Partial<Specimen> = {
  id: specimenRejectedId,
  uuid: specimenRejectedUUID,
  specimenIdentifier: 'S0000000777',
  patientId,
  serviceTypeId,
  specimenGroupId: specimenGroupId,
  status: SpecimenStatus.Rejected,
  testOrderId,
}
export const specimenTestData: Partial<SpecimenTest> = {
  id: specimenTestId,
  specimenId: specimenCollectedId,
  testTypeId: testTypeId,
}

export const specimenTestRejectedData: Partial<SpecimenTest> = {
  id: specimenTestRejectedId,
  specimenId: specimenRejectedId,
  testTypeId: testTypeId,
}

export const specimenTestTestPanelData: Partial<SpecimenTest> = {
  id: specimenTestTestPanelId,
  specimenId: specimenCollectedId,
  testPanelId,
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
export const testPanelToTestTypeData: Partial<TestPanelToTestType> = {
  testTypeId,
  testPanelId,
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
  let testResultMeasurementSeed: TestResultMeasurementSeed
  let testPanelToTestTypeSeed: TestPanelToTestTypeSeed
  let testPanelSeed: TestPanelSeed
  let testResultId = null
  let testResultMeasurementId = null
  let staffSeed: StaffSeed = null
  let testResultHistorySeed: TestResultHistorySeed

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
    testPanelToTestTypeSeed = new TestPanelToTestTypeSeed(dataSource)
    testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
    testPanelSeed = new TestPanelSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    testResultHistorySeed = new TestResultHistorySeed()

    await serviceCategorySeed.createArray([serviceCategoryData])
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.createArray([serviceTypeData])
    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.create(patientData)
    await appointmentSeed.createArray([appointmentData, appointmentDoneData])
    await labInfoSeed.create(labInfoData)
    await specimenGroupSeed.create(specimenGroupData)
    await testTypeSeed.create(testTypeData)
    await testOrderSeed.create(testOrderData)
    await specimenSeed.create(specimenCollectedData)
    await specimenSeed.create(specimenRejectedData)
    await testPanelSeed.create(testPanelData)
    await specimenTestSeed.create(specimenTestData)
    await specimenTestSeed.create(specimenTestRejectedData)
    await specimenTestSeed.create(specimenTestTestPanelData)
    await testPanelToTestTypeSeed.create(testPanelToTestTypeData)
    await staffSeed.create(staffForResults)
  })

  test('Should create Pending test result for specimen & testResultMeasurement', async () => {
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
    const testResult = await testResultSeed.findOneByPatientId(patientId)
    expect(testResult.testOrderId).toBeTruthy()
    testResultId = testResult.id
    const testResultMeasurement = await testResultMeasurementSeed.findOneByResultAndTypeId(
      testResult.id,
      testTypeId,
    )
    testResultMeasurementId = testResultMeasurement.id
    expect(testResult).toBeTruthy()
    expect(testResultMeasurement).toBeTruthy()
    const results = await testResultSeed.findBySpecimenId(specimenCollectedId)
    expect(results.length).toBe(2)

    const specimen = await specimenSeed.getById(specimenCollectedData.id)
    expect(specimen.testResultGenerated).toBeTruthy()

    // Should not generate if invoked again or data already exists
    await handlerCreatePendingResultForSpecimen(message)
    const resultsAfterInvoke = await testResultSeed.findBySpecimenId(specimenCollectedId)
    expect(resultsAfterInvoke.length).toBe(2)

    const testResultHistory = await testResultHistorySeed.findByTestResultId(testResultId)

    expect(testResultHistory[0].changes[0].from).toBe('-')
    expect(testResultHistory[0].changes[0].to).toBe(TestResultStatus.Pending)
  })

  test('Should create Rejected test result for specimen & testResultMeasurement', async () => {
    const data = {
      specimenUUID: specimenRejectedUUID,
      appointmentUUID: appointmentDoneUUID,
      authUserId: staffForResults.authUserId,
      ...mockedAuditMetadata,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, SpecimenRejectedSchema))

    const result = await handlerCreateRejectedResultsForSpecimen(message)
    expect(result).toBeTruthy()

    const testResult = await testResultSeed.findOneBySpecimenId(specimenRejectedId)
    expect(testResult).toBeDefined()

    expect(testResult.status).toBe(TestResultStatus.Rejected)
    expect(testResult.updatedBy).toBe(SystemAuthUserId.SpecimenResultCreator)

    const testResultMeasurement = await testResultMeasurementSeed.findOneByResultAndTypeId(
      testResult.id,
      testTypeId,
    )
    expect(testResultMeasurement).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await staffSeed.removeByIds([staffForResults.id])
    await testPanelToTestTypeSeed.removeByTestTypeId(testTypeId)
    await testPanelSeed.removeByIds([testPanelId])
    await testResultMeasurementSeed.removeByIds([testResultMeasurementId])
    await testResultSeed.removeByIds([testResultId])
    await specimenSeed.removeByIds([specimenCollectedId, specimenRejectedId])
    await specimenTestSeed.removeByIds([
      specimenTestId,
      specimenTestTestPanelId,
      specimenTestRejectedData.id,
    ])
    await appointmentSeed.removeByIds([appointmentId, appointmentDoneId])
    await serviceTypeSeed.removeById(serviceTypeId)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceCategorySeed.removeById(serviceCategoryId)
    await serviceProviderSeed.removeById(serviceProviderId)
    await patientSeed.removePatientByAuthUserId(patientData.authUserId)
    await testOrderSeed.removeByIds([testOrderId])
    await labInfoSeed.removeByIds([labId])
    await testTypeSeed.removeByIds([testTypeId])
  })
})
