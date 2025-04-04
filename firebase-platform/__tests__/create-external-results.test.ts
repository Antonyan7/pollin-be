import {DataSource, In} from 'typeorm'
import {v4} from 'uuid'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  PatientSeed,
  TestTypeSeed,
  LabInfoSeed,
  TestResultSeed,
  ServiceProviderSeed,
  TestOrderSeed,
  TestOrderItemSeed,
  SuperTypeSeed,
  TestOrderActionSeed,
  TestPanelSeed,
  StaffSeed,
  TestResultMeasurementSeed,
} from '@seeds/typeorm'
import {
  TestType,
  TestOrder,
  TestOrderItem,
  SuperType,
  TestOrderAction,
  TestPanel,
  LabInfo,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  TestOrderStatusEnum,
  TestResultsGenerationStatusEnum,
} from '@libs/data-layer/apps/clinic-test/enums'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {ExternalTestResultCreator} from '@firebase-platform/functions/test-orders-and-results/src/common/external-test-result-creator'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities/staff.entity'

jest.setTimeout(15000)

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')

const patientId = 999901
const testTypeId = 999902
const testPanelId = 999903
const labId = 999904
const serviceProviderId = 999905
const testOrderId = 999906
const testOrderItemId = 999907
const superTypeId = 999908
const testOrderActionId = 999909
const staffId = 999910

export const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: 'CF_TEST_AUTH_ID_EXTERNAL',
  firstName: 'CF_TEST_NAME_EXTERNAL',
  lastName: 'CF_TEST_LAST_NAME_EXTERNAL',
  middleName: 'CF_TEST_MIDDLE_NAME_EXTERNAL',
  serviceProviderId,
}

export const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  uuid: v4(),
  title: 'Dr. External',
  imageURL: 'IMG',
  description: 'External Test Provider',
  designation: 'MD',
}

export const testOrderData: Partial<TestOrder> = {
  id: testOrderId,
  uuid: v4(),
  patientId: patientId,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderItemData: Partial<TestOrderItem> = {
  id: testOrderItemId,
  testOrderId: testOrderId,
  testTypeId: testTypeId,
}

export const labInfoData: Partial<LabInfo> = {
  id: labId,
  uuid: v4(),
  name: 'External Lab',
  location: 'External Address',
  phone: '+123456789',
}

export const testTypeData: Partial<TestType> = {
  id: testTypeId,
  uuid: v4(),
  title: 'Blood Test Type',
  unit: 'mg/L',
  labId: labId,
}

export const testPanelData: Partial<TestPanel> = {
  id: testPanelId,
  uuid: v4(),
  title: 'Blood Panel',
  labId: labId,
}

export const superTypeData: Partial<SuperType> = {
  id: superTypeId,
  name: 'Blood Test',
  groupOrderActionsByWorkflow: false,
  specialWorkflow: ServiceTypeWorkflow.Blood,
}

export const staffData: Partial<Staff> = {
  id: staffId,
  authUserId: 'STAFF_AUTH_ID',
  firstName: 'Staff',
  lastName: 'User',
  email: 'fhealthdev+staff@gmail.com',
}

describe('Utilize ExternalTestResultCreator to generation results for external test', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let labInfoSeed: LabInfoSeed
  let testTypeSeed: TestTypeSeed
  let testPanelSeed: TestPanelSeed
  let serviceProviderSeed: ServiceProviderSeed
  let testResultSeed: TestResultSeed
  let testOrderSeed: TestOrderSeed
  let testOrderItemSeed: TestOrderItemSeed
  let superTypeSeed: SuperTypeSeed
  let testOrderActionSeed: TestOrderActionSeed
  let staffSeed: StaffSeed
  let testResultMeasurementSeed: TestResultMeasurementSeed
  let testOrderAction: TestOrderAction
  let externalTestResultCreator: ExternalTestResultCreator
  let createdTestResultIds: number[] = []

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    labInfoSeed = new LabInfoSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    testPanelSeed = new TestPanelSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    testOrderItemSeed = new TestOrderItemSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    testOrderActionSeed = new TestOrderActionSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.create(patientData)
    await superTypeSeed.create(superTypeData)

    await labInfoSeed.create(labInfoData)
    await testTypeSeed.create(testTypeData)
    await testTypeSeed.setSuperType(testTypeData.id, superTypeData.id)

    await testPanelSeed.create(testPanelData)
    await testPanelSeed.setSuperType(testPanelData.id, superTypeData.id)

    await testOrderSeed.create(testOrderData)
    await testOrderItemSeed.create(testOrderItemData)
    await staffSeed.create(staffData)

    const identifierPayload = {
      testOrderId: testOrderId,
      testTypeIds: [testTypeId],
      testPanelIds: [testPanelId],
    }

    const encodedIdentifier = Buffer.from(JSON.stringify(identifierPayload)).toString('base64')

    const testOrderActionData: Partial<TestOrderAction> = {
      id: testOrderActionId,
      testOrderId: testOrderId,
      encodedIdentifier: encodedIdentifier,
      testResultGenerationStatus: null,
    }

    await testOrderActionSeed.create(testOrderActionData)
    testOrderAction = await testOrderActionSeed.repository.findOneBy({id: testOrderActionId})

    externalTestResultCreator = new ExternalTestResultCreator()
    await externalTestResultCreator.initialize()
  })

  it('should create external results', async () => {
    // Prepare audit metadata
    const auditMetadata = {
      authUserId: staffData.authUserId,
      ipAddress: '127.0.0.1',
      deviceId: '1234567890',
      requestId: '1234567890',
    }

    // Execute the creator
    await externalTestResultCreator.create({
      orderActionEncodedIdentifier: testOrderAction.encodedIdentifier,
      auditMetadata,
    })

    // Verify test results were created
    const testResults = await testResultSeed.repository.find({
      where: {
        testOrderId: testOrderId,
      },
    })
    expect(testResults.length).toBeGreaterThan(0)

    // Store created IDs for cleanup
    createdTestResultIds = testResults.map((result) => result.id)

    // Verify at least one result for test type and one for test panel
    const testTypeResult = testResults.find((result) => result.testTypeId === testTypeId)
    const testPanelResult = testResults.find((result) => result.testPanelId === testPanelId)

    expect(testTypeResult).toBeTruthy()
    expect(testPanelResult).toBeTruthy()

    // Check if measurements were created for blood test type
    const measurements = await testResultMeasurementSeed.testResultMeasurementRepository.find({
      where: {
        testResultId: In(createdTestResultIds),
      },
    })
    expect(measurements.length).toBeGreaterThan(0)

    const updatedAction = await testOrderActionSeed.repository.findOne({
      where: {testOrderId: testOrderId},
    })
    expect(updatedAction.testResultGenerationStatus).toBe(TestResultsGenerationStatusEnum.Success)
    expect(updatedAction.lastTestResultGenerationOn).toBeTruthy()
  })

  afterAll(async () => {
    if (createdTestResultIds.length > 0) {
      await testResultSeed.removeByIds(createdTestResultIds)
    }

    await testOrderActionSeed.removeByIds([testOrderActionId])
    await testOrderItemSeed.removeByIds([testOrderItemId])
    await testOrderSeed.removeByIds([testOrderId])

    await testTypeSeed.setSuperType(testTypeData.id, null)
    await testPanelSeed.setSuperType(testPanelData.id, null)

    await testTypeSeed.removeByIds([testTypeId])
    await testPanelSeed.removeByIds([testPanelId])
    await superTypeSeed.removeByIds([superTypeId])
    await labInfoSeed.removeByIds([labId])
    await patientSeed.removePatientByAuthUserId(patientData.authUserId)
    await serviceProviderSeed.removeById(serviceProviderId)
    await staffSeed.removeByIds([staffId])
  })
})
