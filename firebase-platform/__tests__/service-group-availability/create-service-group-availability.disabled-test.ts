import {ServiceGroupAvailabilityService} from '@firebase-platform/functions/service-group-availability/src/create-service-group-availability/service-group-availability.service'
import {
  createServiceGroupAvailabilityFixtures,
  destroyServiceGroupAvailabilityFixtures,
  serviceGroup2Id,
  serviceGroupId,
  serviceGroupTypesIds,
  serviceProviderId,
  serviceProviderId2,
  serviceTypeWithoutSlots,
  twoYearsAhead,
  // appointmentFixture,
} from './seed'
import {DataSource, Repository} from 'typeorm'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config'
import {SchedulingSlotSeed, ServiceGroupAvailabilitySeed, ServiceTypeSeed} from '@seeds/typeorm'
import {
  ServiceGroupToServiceType,
  SlotStatus,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  appointmentsCreatedHandler,
  // availabilityUpdatedHandler,
  // serviceGroupAvailabilityChangedHandler,
  // serviceTypeAvailabilityChangedHandler,
} from '@firebase-platform/functions/service-group-availability/src/create-service-group-availability/handlers'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
// import {AvailabilityUpdatedSchema} from '@libs/common/model/proto-schemas/availability-updated.schema'
import {testPubSubEvent} from '@functions-types'

jest.setTimeout(20000)
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

function add60Days(date: Date): Date {
  return dateTimeUtil.addDays(date, 60)
}

describe('Firebase Function: create service group availability', () => {
  let dataSource: DataSource
  let serviceGroupAvailabilitySeed: ServiceGroupAvailabilitySeed
  let schedulingSlotSeed: SchedulingSlotSeed
  let serviceGroupToServiceTypeRepository: Repository<ServiceGroupToServiceType>
  let serviceTypeSeed: ServiceTypeSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    serviceGroupAvailabilitySeed = new ServiceGroupAvailabilitySeed(dataSource)
    schedulingSlotSeed = new SchedulingSlotSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)

    serviceGroupToServiceTypeRepository = dataSource.getRepository(ServiceGroupToServiceType)

    await createServiceGroupAvailabilityFixtures(dataSource)
  })

  //First and third service types of service group are from main provider slots - others from random providers
  test('create service group availability - 2 service types with automatic selection = false - apply template/block', async () => {
    // const data = {
    //   serviceTypeIds: [serviceGroupTypesIds[2]],
    //   startDate: `${twoYearsAhead}-01-02T13:00:00.000`,
    //   endDate: `${twoYearsAhead}-01-02T14:00:00.000`,
    // }

    // const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    // const result = availabilityUpdatedHandler(message)
    // await expect(result).resolves.not.toThrow()

    let serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId,
      )
    expect(serviceGroupAvailability.length).toBe(1)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`),
    )

    //No slots for 2nd provider because 2nd doesn't have slots for 3rd service type
    serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
      serviceGroupId,
      serviceProviderId2,
    )
    expect(serviceGroupAvailability.length).toBe(0)
  })

  //First service type of service group is from main provider slots - others from random providers
  test('create service group availability for first day (all slots are free) - apply template', async () => {
    // const data = {
    //   serviceTypeIds: [serviceGroupTypesIds[2]],
    //   //We're using this dates just to find days to calculate availability
    //   startDate: `${twoYearsAhead}-01-02T13:00:00.000`,
    //   endDate: `${twoYearsAhead}-01-02T14:00:00.000`,
    // }
    await serviceTypeSeed.updateProviderSelection(serviceGroupTypesIds[2], true)

    // const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    //There are slots from 11:20:00 to 13:30:00
    // const result = availabilityUpdatedHandler(message)
    // await expect(result).resolves.not.toThrow()

    //Service group has total 90 minutes duration, second service type of service group has slots only after 12:00
    let serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId,
      )
    expect(serviceGroupAvailability.length).toBe(3)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`),
    )
    expect(serviceGroupAvailability[2].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:00:00.000Z`),
    )

    //Service group has total 40 minutes duration, second service type of service group has slots only after 12:00
    serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
      serviceGroup2Id,
      serviceProviderId,
    )
    expect(serviceGroupAvailability.length).toBe(10)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
    )
    expect(serviceGroupAvailability[9].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:50:00.000Z`),
    )
  })

  test('create service group availability for first day (all slots are free) - block template', async () => {
    // const data = {
    //   serviceProviderId: serviceProviderId,
    //   startDate: `${twoYearsAhead}-01-02T13:00:00.000`,
    //   endDate: `${twoYearsAhead}-01-02T14:00:00.000`,
    // }
    // const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    //There are slots from 11:20:00 to 13:30:00
    // const result = availabilityUpdatedHandler(message)
    // await expect(result).resolves.not.toThrow()

    //Service group has total 90 minutes duration, second service type of service group has slots only after 12:00
    let serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId,
      )
    expect(serviceGroupAvailability.length).toBe(3)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`),
    )
    expect(serviceGroupAvailability[2].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:00:00.000Z`),
    )

    //Service group has total 40 minutes duration, second service type of service group has slots only after 12:00
    serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
      serviceGroup2Id,
      serviceProviderId,
    )
    expect(serviceGroupAvailability.length).toBe(10)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
    )
    expect(serviceGroupAvailability[9].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:50:00.000Z`),
    )
  })

  //First service type of service group is from main provider slots - others from random providers
  test(`recreate service group availability for first day (delete old records) (with busy slots) - apply template/block`, async () => {
    // const data = {
    //   serviceProviderId,
    //   serviceTypeIds: [serviceGroupTypesIds[2]],
    //   startDate: `${twoYearsAhead}-01-02T13:00:00.000`,
    //   endDate: `${twoYearsAhead}-01-02T14:00:00.000`,
    // }

    await schedulingSlotSeed.updateByServiceTypeAndStartTime(
      serviceGroupTypesIds[2],
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:00:00.000Z`),
      {status: SlotStatus.Busy},
    )

    // const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    //There are slots from 11:20:00 to 13:30:00
    // const result = availabilityUpdatedHandler(message)
    // await expect(result).resolves.not.toThrow()

    /*Last service type of service group has no free slot on 13:00 so first slot will be available on 12:00
      Since we have slots only till 13:30 - 12:00 + 0:20 + 0:20 + 0:30 + 0:20 = 13:30 */
    let serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId,
      )
    expect(serviceGroupAvailability.length).toBe(1)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:00:00.000Z`),
    )

    serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
      serviceGroup2Id,
      serviceProviderId,
    )
    expect(serviceGroupAvailability.length).toBe(8)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
    )
    expect(serviceGroupAvailability[7].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:50:00.000Z`),
    )
  })

  //First service type of service group is from main provider slots - others from random providers
  test('create service group availability for second day by slotId - appointment created event', async () => {
    // const data = {
    //   appointmentIds: [appointmentFixture.id],
    // }

    // const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    //There are slots from 11:20 to 13:40 on the second day
    // const result = appointmentsCreatedHandler(message)
    // await expect(result).resolves.not.toThrow()

    let serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId,
      )

    //1 left from previous day + 4 from this day
    expect(serviceGroupAvailability.length).toBe(5)
    expect(serviceGroupAvailability[4].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:10:00.000Z`)),
    )

    serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
      serviceGroup2Id,
      serviceProviderId,
    )
    //8 left from previous day + 11 from this day
    expect(serviceGroupAvailability.length).toBe(19)
    expect(serviceGroupAvailability[18].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:00:00.000Z`)),
    )
  })

  test('should throw error - appointment were not found - appointment created event', async () => {
    const data = {
      appointmentIds: [1234],
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    const result = appointmentsCreatedHandler(message)
    await expect(result).rejects.toThrow()
  })

  //First service type of service group is from main provider slots - others from random providers
  test(`recreate group availability for 2 days for 1 group for 2 providers
        serviceType was changed from Django`, async () => {
    // const data = {
    //   id: serviceGroupTypesIds[0],
    // }

    const spyOnGettingSlotsFunction = jest.spyOn(
      ServiceGroupAvailabilityService.prototype,
      'getServiceTypesWithSlots',
    )

    //update duration of service type related to one service group
    await serviceTypeSeed.updateDurationInMinutes(serviceGroupTypesIds[0], 40)

    // const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    // const result = serviceTypeAvailabilityChangedHandler(message)
    // await expect(result).resolves.not.toThrow()

    let serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId,
      )
    //Removes all previous slots and creates new with service group duration = 100 minutes for two days
    expect(serviceGroupAvailability.length).toBe(3)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`),
    )
    expect(serviceGroupAvailability[1].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`)),
    )
    expect(serviceGroupAvailability[2].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:50:00.000Z`)),
    )

    serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
      serviceGroup2Id,
      serviceProviderId,
    )

    //This service group availability shoudn't change from prev test - service type is not a part of that group
    expect(serviceGroupAvailability.length).toBe(19)
    expect(serviceGroupAvailability[18].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:00:00.000Z`)),
    )

    const serviceGroupAvailabilityForProvider2 =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId2,
      )

    //Generates service group availability for second provider on service type change
    expect(serviceGroupAvailabilityForProvider2.length).toBe(3)
    expect(serviceGroupAvailabilityForProvider2[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`),
    )
    expect(serviceGroupAvailabilityForProvider2[1].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`)),
    )
    expect(serviceGroupAvailabilityForProvider2[2].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:50:00.000Z`)),
    )

    expect(spyOnGettingSlotsFunction).toBeCalledTimes(6)
    spyOnGettingSlotsFunction.mockClear()
  })

  //First service type of service group is from main provider slots - others from random providers
  // test(`recreate group availability for 2 days for 2 groups after service type duration was changed
  // serviceType was changed from Django`, async () => {
  //   const data = {
  //     id: serviceGroupTypesIds[2],
  //   }

  //   //update duration of service type related to both service groups (20 minutes -> 10 minutes)
  //   await serviceTypeSeed.updateDurationInMinutes(serviceGroupTypesIds[2], 10)

  //   const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

  //   const result = serviceTypeAvailabilityChangedHandler(message)
  //   await expect(result).resolves.not.toThrow()

  //   let serviceGroupAvailability =
  //     await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
  //       serviceGroupId,
  //       serviceProviderId,
  //     )
  //   //Removes all previous slots and creates new with service group duration = 90 minutes for two days
  //   //We have only 5 available slots here because we have busy slot in the middle for second service type in sequence
  //   expect(serviceGroupAvailability.length).toBe(5)
  //   expect(serviceGroupAvailability[0].startTime).toEqual(
  //     dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`),
  //   )
  //   expect(serviceGroupAvailability[4].startTime).toEqual(
  //     add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:00:00.000Z`)),
  //   )

  //   serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
  //     serviceGroup2Id,
  //     serviceProviderId,
  //   )

  //   //Removes all previous slots and creates new with service group duration = 90 minutes for two days
  //   expect(serviceGroupAvailability.length).toBe(22)
  //   expect(serviceGroupAvailability[0].startTime).toEqual(
  //     dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
  //   )
  //   expect(serviceGroupAvailability[21].startTime).toEqual(
  //     add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:10:00.000Z`)),
  //   )
  // })

  //First service type of service group is from main provider slots - others from random providers
  test(`recreate group availability for 2 days and 1 provider for 1 group
        service group was changed from Django`, async () => {
    // const data = {
    //   id: serviceGroup2Id,
    // }

    await serviceGroupToServiceTypeRepository.save({
      serviceGroupId: serviceGroup2Id,
      serviceTypeId: serviceGroupTypesIds[1],
      sequence: 5,
    })

    // const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    // const result = serviceGroupAvailabilityChangedHandler(message)
    // await expect(result).resolves.not.toThrow()

    let serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroupId,
        serviceProviderId,
      )
    //First service group availability shouldn't change from previous test
    expect(serviceGroupAvailability.length).toBe(5)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:40:00.000Z`),
    )
    expect(serviceGroupAvailability[4].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:00:00.000Z`)),
    )

    serviceGroupAvailability = await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
      serviceGroup2Id,
      serviceProviderId,
    )

    //Removes all previous slots and creates new with service group duration = 70 minutes for two days
    expect(serviceGroupAvailability.length).toBe(16)
    expect(serviceGroupAvailability[0].startTime).toEqual(
      dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
    )
    expect(serviceGroupAvailability[15].startTime).toEqual(
      add60Days(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:30:00.000Z`)),
    )
  })

  test(`remove all service group availability because one of the service types doesnt have slots`, async () => {
    // const data = {
    //   serviceProviderId,
    //   serviceTypeIds: [serviceGroupTypesIds[2]],
    //   startDate: `${twoYearsAhead}-01-02T13:00:00.000`,
    //   endDate: `${twoYearsAhead}-05-02T14:00:00.000`,
    // }

    //Add service type to second service group with no slots
    await serviceGroupToServiceTypeRepository.save({
      serviceGroupId: serviceGroup2Id,
      serviceTypeId: serviceTypeWithoutSlots.id,
      sequence: 10,
    })

    // const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    // const result = availabilityUpdatedHandler(message)
    // await expect(result).resolves.not.toThrow()

    const serviceGroupAvailability =
      await serviceGroupAvailabilitySeed.findByServiceGroupIdAndProviderId(
        serviceGroup2Id,
        serviceProviderId,
      )
    expect(serviceGroupAvailability.length).toBe(0)
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await destroyServiceGroupAvailabilityFixtures(dataSource)
  })
})
