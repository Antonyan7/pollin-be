import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {DataSource} from 'typeorm'
import {
  SchedulingSlotSeed,
  ServiceCategorySeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  SlotGenerationDataInput,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {removeSchedulingSlotsInPastHandler} from '@firebase-platform/functions/cache/src/handlers/remove-past-scheduling-slots'
import {
  ServiceCategory,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {generateSlots} from '@libs/common/test/utils/slot.helper'

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

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const id = 822355

const serviceProviderFixture: Partial<ServiceProvider> = {
  id,
}

const serviceCategoryFixture: Partial<ServiceCategory> = {
  id,
}

const serviceTypeFixture: Partial<ServiceType> = {
  id,
  superTypeId: superTypeOtherFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
}

const slotsGenerationToDeleteData: SlotGenerationDataInput = {
  prefix: 'delete-slots',
  days: 4,
  startDateAndTime: dateTimeUtil.toDate(`2020-01-01T01:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`2020-01-01T02:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

const prevMonth2ndDay = dateTimeUtil.formatIsoDate(
  dateTimeUtil.setDay(dateTimeUtil.subDays(dateTimeUtil.startOfMonth(dateTimeUtil.now()), 1), 2),
)
const slotsGenerationToNotDeleteData: SlotGenerationDataInput = {
  prefix: 'not-remove-slots',
  days: 4,
  startDateAndTime: dateTimeUtil.toDate(`${prevMonth2ndDay}T01:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${prevMonth2ndDay}T02:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

describe('Firebase Function: remove-slots-in-past', () => {
  let dataSource: DataSource

  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let serviceCategorySeed: ServiceCategorySeed
  let serviceProviderSeed: ServiceProviderSeed
  let schedulingSlotSeed: SchedulingSlotSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    schedulingSlotSeed = new SchedulingSlotSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderFixture)
    await serviceCategorySeed.create(serviceCategoryFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.create(serviceTypeFixture)
    await Promise.all([
      schedulingSlotSeed.createArray(generateSlots(slotsGenerationToDeleteData)),
      schedulingSlotSeed.createArray(generateSlots(slotsGenerationToNotDeleteData)),
    ])
  })

  test('should remove scheduling slots in past', async () => {
    expect(
      await schedulingSlotSeed.countByPartOfUUID(slotsGenerationToDeleteData.prefix),
    ).toBeGreaterThan(10)
    expect(
      await schedulingSlotSeed.countByPartOfUUID(slotsGenerationToNotDeleteData.prefix),
    ).toBeGreaterThan(10)

    await removeSchedulingSlotsInPastHandler(2)

    expect(await schedulingSlotSeed.countByPartOfUUID(slotsGenerationToDeleteData.prefix)).toBe(0)
    expect(
      await schedulingSlotSeed.countByPartOfUUID(slotsGenerationToNotDeleteData.prefix),
    ).toBeGreaterThan(10)
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await schedulingSlotSeed.removeByServiceProviderIdAndServiceTypeIds(serviceProviderFixture.id, [
      serviceTypeFixture.id,
    ])
    await serviceTypeSeed.removeById(serviceTypeFixture.id)
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceCategorySeed.removeById(serviceCategoryFixture.id)
  })
})
