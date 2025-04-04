import {removePastServiceGroupAvailabilityHandler} from '@codebase/cache/handlers'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {DataSource} from 'typeorm'
import {ServiceType, SlotStatus} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {v4} from 'uuid'

import {
  ServiceGroupSeed,
  ServiceCategorySeed,
  ServiceGroupAvailabilitySeed,
  ServiceTypeSeed,
  ServiceProviderSeed,
  SchedulingSlotSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const serviceGroupAvailabilityId = 889955
const serviceGroupId = 889955
const serviceCategoryId = 889955
const serviceTypeId = 889955
const serviceProviderId = 889955
const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const serviceCategory = {
  id: serviceCategoryId,
}

const slotGenerationData = {
  id: 889955,
  uuid: v4(),
  status: SlotStatus.Free,
  days: 2,
  startTime: dateTimeUtil.toDate('2030-08-23T10:30:00Z'),
  endTime: dateTimeUtil.toDate('2030-09-23T11:50:00Z'),
  serviceProviderId,
  serviceTypeId,
}
const serviceGroup = {
  id: serviceGroupId,
  title: 'Service Group',
  durationInMinutes: 30,
  dominantServiceTypeId: serviceTypeId,
  serviceCategoryId: serviceCategoryId,
  internal: false,
  irregularPeriodsAllowed: false,
}

const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  superTypeId: superTypeOtherFixture.id,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}

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
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')

let serviceGroupAvailabilitySeed: ServiceGroupAvailabilitySeed
let superTypeSeed: SuperTypeSeed
let serviceTypeSeed: ServiceTypeSeed
let serviceGroupSeed: ServiceGroupSeed
let serviceCategorySeed: ServiceCategorySeed
let serviceProviderSeed: ServiceProviderSeed
let schedulingSlotSeed: SchedulingSlotSeed

describe('Firebase Function: appointment-created', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    serviceGroupAvailabilitySeed = new ServiceGroupAvailabilitySeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    serviceGroupSeed = new ServiceGroupSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    schedulingSlotSeed = new SchedulingSlotSeed(dataSource)

    await serviceProviderSeed.create({
      id: serviceProviderId,
    })
    await serviceCategorySeed.create(serviceCategory)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeData)
    await schedulingSlotSeed.create(slotGenerationData)

    await serviceGroupSeed.create(serviceGroup)
    await serviceGroupAvailabilitySeed.create({
      id: serviceGroupAvailabilityId,
      serviceGroupId: serviceGroupId,
      serviceProviderId: serviceProviderId,
      startTime: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
      schedulingSlotId: slotGenerationData.id,
    })
  })

  test('should remove all past service group availability', async () => {
    const result = removePastServiceGroupAvailabilityHandler()
    await expect(result).resolves.not.toThrow()

    const serviceGroupAvailability = await serviceGroupAvailabilitySeed.findOneById(
      serviceGroupAvailabilityId,
    )
    expect(serviceGroupAvailability).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await serviceGroupAvailabilitySeed.removeById(serviceGroupAvailabilityId)
    await serviceGroupSeed.removeById(serviceGroupId)
    await schedulingSlotSeed.removeById(slotGenerationData.id)
    await serviceTypeSeed.removeById(serviceTypeId)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceCategorySeed.removeById(serviceCategoryId)
  })
})
