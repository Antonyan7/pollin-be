import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {OrderUUIDSchema} from '@libs/common/model/proto-schemas/order-uuid.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  TestOrderSeed,
  PatientSeed,
  PatientMilestoneSeed,
  TestOrderItemSeed,
  TestTypeSeed,
  LabInfoSeed,
  ServiceTypeSeed,
  ServiceCategorySeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {
  cervicalSwabFixture,
  externalLabFixture,
  orderCanceledWithMilestonesFixture,
  orderUpdatedToGenerateNewMilestonesFixture,
  patientMilestoneServiceTypeToBeRemovedFixture,
  patientMilestoneServiceTypeWithTestsToBeRemovedFixture,
  patientMilestoneWillBeRemovedAfterOrderUpdateFixture,
  patientWithOrderFixture,
  swabItemForMilestoneGenerationFixture,
  testTypeUrineFixture,
  urineItemForMilestoneGenerationFixture,
} from '../fixtures/order-to-milestone/order-to-milestone.fixture'
import {
  serviceCategoryBloodCycleMonitoringFixture,
  serviceTypeSwabCollectionFixture,
  serviceTypeUrineCollectionFixture,
} from '@libs/common/test/fixtures'
import {mockedAuditMetadata} from '../fixtures/audit.fixture'
import {Config} from '@config/config.util'
import {handlerOrderUpdatedVoidMilestones} from '@firebase-platform/functions/test-orders-and-results/src/order-status/handler'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

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
jest.mock('../../../libs/common/src/adapters/pubsub.adapter.ts')

describe('Test Order status change', () => {
  let dataSource: DataSource

  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let labInfoSeed: LabInfoSeed
  let testTypeSeed: TestTypeSeed
  let testOrderSeed: TestOrderSeed
  let testOrderItemSeed: TestOrderItemSeed
  let patientSeed: PatientSeed
  let patientMilestoneSeed: PatientMilestoneSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    labInfoSeed = new LabInfoSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    testOrderItemSeed = new TestOrderItemSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)

    await labInfoSeed.create(externalLabFixture)
    await patientSeed.create(patientWithOrderFixture)
    await serviceCategorySeed.create(serviceCategoryBloodCycleMonitoringFixture)

    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeSwabCollectionFixture)
    await serviceTypeSeed.create(serviceTypeUrineCollectionFixture)

    await testTypeSeed.create(cervicalSwabFixture)
    await testTypeSeed.create(testTypeUrineFixture)

    await testOrderSeed.create(orderCanceledWithMilestonesFixture)
    await testOrderSeed.create(orderUpdatedToGenerateNewMilestonesFixture)

    await testOrderItemSeed.create(urineItemForMilestoneGenerationFixture)
    await testOrderItemSeed.create(swabItemForMilestoneGenerationFixture)

    await Promise.all([
      patientMilestoneSeed.create(patientMilestoneServiceTypeToBeRemovedFixture),
      patientMilestoneSeed.create(patientMilestoneServiceTypeWithTestsToBeRemovedFixture),
      patientMilestoneSeed.create(patientMilestoneWillBeRemovedAfterOrderUpdateFixture), // will be removed during test pass
    ])
  })

  test('Should delete milestones on test order cancellation', async () => {
    const data = {
      orderUUID: orderCanceledWithMilestonesFixture.uuid,
      ...mockedAuditMetadata,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, OrderUUIDSchema))

    const orderBefore = await testOrderSeed.findWithMilestonesById(data.orderUUID)
    expect(orderBefore.patientMilestones.length).toBe(2)

    const configSpy = jest.spyOn(Config, 'getBool')
    configSpy.mockReturnValueOnce(false)
    await handlerOrderUpdatedVoidMilestones(message)
    configSpy.mockClear()

    const orderAfter = await testOrderSeed.findWithMilestonesById(data.orderUUID)
    expect(orderAfter.patientMilestones.length).toBe(0)
    expect(orderAfter.testOrderActions.length).toBe(0)
  })

  afterAll(async () => {
    await Promise.all([
      urineItemForMilestoneGenerationFixture.id,
      swabItemForMilestoneGenerationFixture.id,
    ])
    await testOrderSeed.removeByIds([
      orderCanceledWithMilestonesFixture.id,
      orderUpdatedToGenerateNewMilestonesFixture.id,
    ])

    await patientMilestoneSeed.removeByIds([
      patientMilestoneServiceTypeToBeRemovedFixture.id,
      patientMilestoneServiceTypeWithTestsToBeRemovedFixture.id,
    ])

    await testTypeSeed.removeByIds([cervicalSwabFixture.id, testTypeUrineFixture.id])
    await serviceTypeSeed.removeByIds([
      serviceTypeSwabCollectionFixture.id,
      serviceTypeUrineCollectionFixture.id,
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceCategorySeed.removeByIds([serviceCategoryBloodCycleMonitoringFixture.id])
    await patientSeed.removeByIds([patientWithOrderFixture.id])
    await labInfoSeed.removeByIds([externalLabFixture.id])

    jest.clearAllMocks()
    await dataSource.destroy()
  })
})
