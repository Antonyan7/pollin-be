import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  LabInfoSeed,
  LabSyncRawDataSeed,
  PatientSeed,
  ServiceProviderSeed,
  TestResultMeasurementSeed,
  TestResultSeed,
  TestTypeSeed,
  ServiceTypeSeed,
  TestOrderSeed,
  SpecimenSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {handlerParseAndSyncLabHL7} from '@codebase/test-orders-and-results/hl7-parsing-and-sync/handler'
import {labInfoLifeLabsFixture} from '../fixtures/lab-integration/lab-info.fixture'
import {labSyncRawDataFromLifeLabsPendingFixture} from '../fixtures/lab-integration/lab-sync-raw-data.fixture'
import * as fs from 'fs/promises'
import {patientForLabIntegrationFixture} from '../fixtures/lab-integration/patient.fixture'
import {
  serviceProviderForTestResultForLabIntegration,
  testResultForLifeLabsToBeWaitingForCompletionFixture,
} from '../fixtures/lab-integration/test-result.fixture'
import {testResultMeasurementForLabIntegrationFixture} from '../fixtures/lab-integration/test-result-measurement.fixture'
import {testTypeForLabIntegrationFixture} from '../fixtures/lab-integration/test-type.fixture'
import {LabSyncStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {
  serviceTypeForLabIntegrationFixture,
  specimenExternalForLabIntegrationFixture,
  testOrderForLabIntegrationFixture,
} from '../fixtures/lab-integration/specimen-related-fixtures'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

jest.mock('../../../libs/common/src/adapters/dynacare.adapter')
jest.mock('../../../libs/common/src/adapters/firebase/firebase-storage-adapter.ts')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.setTimeout(15000)

describe('LifeLabs Integration: parse and sync lab xml file', () => {
  let dataSource: DataSource

  let patientSeed: PatientSeed
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

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    specimenSeed = new SpecimenSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)
    labInfoSeed = new LabInfoSeed(dataSource)
    labSyncRawDataSeed = new LabSyncRawDataSeed(dataSource)

    await patientSeed.create(patientForLabIntegrationFixture)
    await serviceProviderSeed.create(serviceProviderForTestResultForLabIntegration)
    await labInfoSeed.create(labInfoLifeLabsFixture)

    await testTypeSeed.create(testTypeForLabIntegrationFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeForLabIntegrationFixture)
    await testOrderSeed.create(testOrderForLabIntegrationFixture)
    await specimenSeed.create(specimenExternalForLabIntegrationFixture)

    await testResultSeed.create(testResultForLifeLabsToBeWaitingForCompletionFixture)

    await testResultMeasurementSeed.create(testResultMeasurementForLabIntegrationFixture)

    await labSyncRawDataSeed.create(labSyncRawDataFromLifeLabsPendingFixture)
    await labSyncRawDataSeed.create(labSyncRawDataFromLifeLabsPendingFixture)
  })

  test('should parse & sync raw data: LabSyncRawData status: Failed', async () => {
    const file = await fs.readFile(
      __dirname + '/lifelabs/lifelabs-multiple-messages-markup-error.xml',
    )

    const fileString = Buffer.from(file).toString()

    const spyFirebaseStorageAdapter = jest.spyOn(
      FirebaseStorageAdapter.prototype,
      'downloadFileByName',
    )
    spyFirebaseStorageAdapter.mockResolvedValue(fileString)

    await handlerParseAndSyncLabHL7()

    const labSyncRawDataUpdated = await labSyncRawDataSeed.findOneById(
      labSyncRawDataFromLifeLabsPendingFixture.id,
    )
    expect(labSyncRawDataUpdated.status).toBe(LabSyncStatus.Failed)
    expect(labSyncRawDataUpdated.systemMessage).toBeTruthy()

    spyFirebaseStorageAdapter.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await labSyncRawDataSeed.removeByIds([labSyncRawDataFromLifeLabsPendingFixture.id])

    await testResultMeasurementSeed.removeByIds([testResultMeasurementForLabIntegrationFixture.id])
    await testResultSeed.removeByIds([testResultForLifeLabsToBeWaitingForCompletionFixture.id])
    await specimenSeed.removeByIds([specimenExternalForLabIntegrationFixture.id])
    await testOrderSeed.removeByIds([testOrderForLabIntegrationFixture.id])
    await serviceTypeSeed.removeByIds([serviceTypeForLabIntegrationFixture.id])
    await testTypeSeed.removeByIds([testTypeForLabIntegrationFixture.id])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await labInfoSeed.removeByIds([labInfoLifeLabsFixture.id])
    await serviceProviderSeed.removeByIds([serviceProviderForTestResultForLabIntegration.id])
    await patientSeed.removeByIds([patientForLabIntegrationFixture.id])
  })
})
