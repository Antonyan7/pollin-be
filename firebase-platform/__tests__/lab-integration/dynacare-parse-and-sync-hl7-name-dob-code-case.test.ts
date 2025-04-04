import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  LabInfoSeed,
  LabSyncRawDataSeed,
  PatientSeed,
  ServiceProviderSeed,
  TestResultMeasurementSeed,
  TestResultSeed,
  TestTypeSeed,
  LabSyncObservationRequestSeed,
  ServiceTypeSeed,
  TestOrderSeed,
  SpecimenSeed,
  SuperTypeSeed,
  PatientAddressSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {handlerParseAndSyncLabHL7} from '@codebase/test-orders-and-results/hl7-parsing-and-sync/handler'
import {labInfoDynacareFixture} from '../fixtures/lab-integration/lab-info.fixture'
import {labSyncRawDataFromDynacarePendingFixture} from '../fixtures/lab-integration/lab-sync-raw-data.fixture'
import * as fs from 'fs/promises'
import {
  patientAddressForLabIntegrationDynacareFixture,
  patientForLabIntegrationDynacareFixture,
} from '../fixtures/lab-integration/patient.fixture'
import {
  serviceProviderForTestResultForLabIntegration,
  testResultForDynacareToBeWaitingForCompletionFixture,
} from '../fixtures/lab-integration/test-result.fixture'
import {testResultMeasurementForLabIntegrationDynacareFixture} from '../fixtures/lab-integration/test-result-measurement.fixture'
import {testTypeForLabIntegrationDynacareFixture} from '../fixtures/lab-integration/test-type.fixture'
import {
  LabSyncStatus,
  LabSyncTestResultStatus,
  LinkMethod,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  serviceTypeForLabIntegrationFixture,
  specimenExternalForLabIntegrationDynacareFixture,
  testOrderForLabIntegrationDynacareFixture,
} from '../fixtures/lab-integration/specimen-related-fixtures'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

jest.mock('../../../libs/common/src/adapters/dynacare.adapter')
jest.mock('../../../libs/common/src/adapters/firebase/firebase-storage-adapter.ts')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('../../../libs/common/src/adapters/pubsub.adapter.ts')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.setTimeout(30000)

describe('Dynacare Integration: parse and sync hl7 file', () => {
  let dataSource: DataSource

  let patientSeed: PatientSeed
  let patientAddressSeed: PatientAddressSeed
  let serviceProviderSeed: ServiceProviderSeed
  let testTypeSeed: TestTypeSeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let testOrderSeed: TestOrderSeed
  let specimenSeed: SpecimenSeed
  let testResultSeed: TestResultSeed
  let testResultMeasurementSeed: TestResultMeasurementSeed
  let labInfoSeed: LabInfoSeed
  let labSyncRawDataSeed: LabSyncRawDataSeed
  let labSyncObservationRequestSeed: LabSyncObservationRequestSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    patientAddressSeed = new PatientAddressSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    specimenSeed = new SpecimenSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
    labInfoSeed = new LabInfoSeed(dataSource)
    labSyncRawDataSeed = new LabSyncRawDataSeed(dataSource)
    labSyncObservationRequestSeed = new LabSyncObservationRequestSeed(dataSource)

    await patientSeed.create(patientForLabIntegrationDynacareFixture)
    await patientAddressSeed.create(patientAddressForLabIntegrationDynacareFixture)

    await serviceProviderSeed.create(serviceProviderForTestResultForLabIntegration)
    await labInfoSeed.create(labInfoDynacareFixture)
    await testTypeSeed.create(testTypeForLabIntegrationDynacareFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeForLabIntegrationFixture)
    await testOrderSeed.create(testOrderForLabIntegrationDynacareFixture)
    await specimenSeed.create(specimenExternalForLabIntegrationDynacareFixture)

    await testResultSeed.create(testResultForDynacareToBeWaitingForCompletionFixture)

    await testResultMeasurementSeed.create(testResultMeasurementForLabIntegrationDynacareFixture)

    await labSyncRawDataSeed.create(labSyncRawDataFromDynacarePendingFixture)
  })

  // no OHIP code, FirstName and LastName DOD and Postal Code are matched with patient fixtures
  test('should parse & sync raw data: OBR - Linked, Result - WaitingCompletion. Case: Name+DOB+PostalCode+Test', async () => {
    const file = await fs.readFile(__dirname + '/dynacare/dynacare-cbc-name-dob-code.hl7')

    const fileString = Buffer.from(file).toString()

    const spyFirebaseStorageAdapter = jest.spyOn(
      FirebaseStorageAdapter.prototype,
      'downloadFileByName',
    )
    spyFirebaseStorageAdapter.mockResolvedValue(fileString)

    await handlerParseAndSyncLabHL7()

    const testResult = await testResultSeed.findOneByUuid(
      testResultForDynacareToBeWaitingForCompletionFixture.uuid,
    )

    expect(testResult.status).toBe(TestResultStatus.WaitingCompletion)

    const measurements = await testResultMeasurementSeed.findByTestResultId(testResult.id)

    const everyFilled = measurements.every((item) => item.result)

    expect(everyFilled).toBeTruthy()

    const labSyncObservationRequest =
      await labSyncObservationRequestSeed.findOneWithOBXsByTestResultId(testResult.id)

    expect(labSyncObservationRequest.status).toBe(LabSyncTestResultStatus.Linked)

    expect(labSyncObservationRequest.fillerOrderNumber).toBeTruthy()

    const labSyncRawDataUpdated = await labSyncRawDataSeed.findOneById(
      labSyncRawDataFromDynacarePendingFixture.id,
    )

    expect(labSyncRawDataUpdated.status).toBe(LabSyncStatus.Success)
    expect(labSyncObservationRequest.linkMethod).toBe(LinkMethod.Sync)

    spyFirebaseStorageAdapter.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await labSyncRawDataSeed.removeByIds([labSyncRawDataFromDynacarePendingFixture.id])

    await testResultMeasurementSeed.removeByIds([
      testResultMeasurementForLabIntegrationDynacareFixture.id,
    ])
    await testResultSeed.removeByIds([testResultForDynacareToBeWaitingForCompletionFixture.id])
    await specimenSeed.removeByIds([specimenExternalForLabIntegrationDynacareFixture.id])
    await testOrderSeed.removeByIds([testOrderForLabIntegrationDynacareFixture.id])
    await serviceTypeSeed.removeByIds([serviceTypeForLabIntegrationFixture.id])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await testTypeSeed.removeByIds([testTypeForLabIntegrationDynacareFixture.id])
    await labInfoSeed.removeByIds([labInfoDynacareFixture.id])
    await serviceProviderSeed.removeByIds([serviceProviderForTestResultForLabIntegration.id])
    await patientAddressSeed.removeByIds([patientAddressForLabIntegrationDynacareFixture.id])
    await patientSeed.removeByIds([patientForLabIntegrationDynacareFixture.id])
  })
})
