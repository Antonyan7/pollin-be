import {CloudEvent, PubSubEvent, testPubSubEvent} from '@functions-types'
import {
  ServiceTypeSeed,
  ServiceProviderSeed,
  PatientSeed,
  AppointmentSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {
  SchedulingSlotSeed,
  ServiceProviderToServiceTypeSeed,
  ServiceCategorySeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {generateSlots} from '@libs/common/test/utils/slot.helper'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {SlotGenerationDataInput} from '@seeds/typeorm'
import {
  handlerAppointmentsCreated,
  handlerServiceTypeChanged,
  handlerSlotAvailabilityBlocked,
  handlerSlotAvailabilityUpdated,
} from '@codebase/cache/handlers'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {AvailabilityUpdatedSchema} from '@libs/common/model/proto-schemas/availability-updated.schema'
import {handlerMinimumBookingLimitation} from '@codebase/cache/handlers/caching-first-available-date/minimum-booking-limitation-handler'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {CachingFirstAvailableDateErrorCodes} from '@libs/common/errors'
import {AvailableSlotsService} from '@codebase/cache/common'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {SlotStatus} from '@libs/data-layer/apps/scheduling/entities/typeorm'

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
jest.setTimeout(20000)

const serviceTypeId = 201
const serviceTypeSecondaryId = 202
const serviceTypeForPastDateId = 203
const serviceTypeFailId = 204
const serviceTypeWithoutSlotsId = 205
const serviceTypeForBusySlotsId = 206

const serviceProviderId = 201
const serviceProviderForPastDateId = 202
const serviceProviderForMinimumBookingHoursId = 203
const serviceProviderFailId = 204

const serviceCategoryId = 334

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const twoYearsAhead = dateTimeUtil.getYear() + 2
const twoDaysFromNow = dateTimeUtil.formatDateYMD(dateTimeUtil.addDays(dateTimeUtil.now(), 2))

const slotGenerationData: SlotGenerationDataInput = {
  prefix: 'slots',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T10:30:00Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T11:50:00Z`),
  serviceProviderId,
  serviceTypeId,
}
const slotGenerationForSecondaryTypeFirstHalfData: SlotGenerationDataInput = {
  prefix: 'slots-sec-1',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T10:30:00Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T11:00:00Z`),
  serviceProviderId,
  serviceTypeId: serviceTypeSecondaryId,
}
const slotGenerationForSecondaryTypeSecondHalfData: SlotGenerationDataInput = {
  prefix: 'slots-sec-2',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T11:00:00Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T11:30:00Z`),
  serviceProviderId,
  serviceTypeId: serviceTypeSecondaryId,
}
const slotGenerationForSecondaryTypeIn2DaysData: SlotGenerationDataInput = {
  prefix: 'slots-sec-min',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoDaysFromNow}T10:30:00Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoDaysFromNow}T11:50:00Z`),
  serviceProviderId,
  serviceTypeId: serviceTypeSecondaryId,
}
const slotGenerationWithPastDateData: SlotGenerationDataInput = {
  prefix: 'slotsForPastDate',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate('2021-08-23T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2021-08-23T11:50:00Z'),
  serviceProviderId: serviceProviderForPastDateId,
  serviceTypeId: serviceTypeForPastDateId,
}
const slotGenerationForMinimumBookingHoursInTwoYearsData: SlotGenerationDataInput = {
  prefix: 'slots-min-future',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T10:30:00Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T11:50:00Z`),
  serviceProviderId: serviceProviderForMinimumBookingHoursId,
  serviceTypeId: serviceTypeSecondaryId,
}
const slotGenerationForMinimumBookingHoursData: SlotGenerationDataInput = {
  prefix: 'slots-min',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoDaysFromNow}T10:30:00Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoDaysFromNow}T11:50:00Z`),
  serviceProviderId: serviceProviderForMinimumBookingHoursId,
  serviceTypeId: serviceTypeSecondaryId,
}
const slotGenerationForTypeWithBusySlotsData: SlotGenerationDataInput = {
  prefix: 'slotsForBusyDate',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T10:30:00Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-08-23T11:50:00Z`),
  serviceProviderId: serviceProviderForMinimumBookingHoursId,
  serviceTypeId: serviceTypeForBusySlotsId,
  status: SlotStatus.Busy,
}

const serviceTypeData = {
  id: serviceTypeId,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  minimumHoursRequired: 1,
  price: 100,
}
const serviceTypeSecondaryData = {
  id: serviceTypeSecondaryId,
  name: 'TEST_NAME',
  durationInMinutes: 60,
  price: 100,
}
const serviceTypeForPastDateData = {
  id: serviceTypeForPastDateId,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}
const serviceTypeWithoutSlotsData = {
  id: serviceTypeWithoutSlotsId,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}
const serviceTypeWithoBusySlots = {
  id: serviceTypeForBusySlotsId,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}

const serviceProviderToServiceTypePastDateData = {
  id: 1,
  serviceTypeId: serviceTypeSecondaryId,
  serviceProviderId,
  firstAvailableDate: dateTimeUtil.toDate('2022-3-9'),
}
const serviceProviderToServiceTypeWithMinimumHoursRequiredData = {
  id: 2,
  serviceTypeId: serviceTypeSecondaryId,
  serviceProviderId: serviceProviderForMinimumBookingHoursId,
  firstAvailableDate: dateTimeUtil.addDays(dateTimeUtil.now(), 1),
}
const serviceProviderToServiceTypeForMinimumBookingWithPastDateData = {
  id: 3,
  serviceTypeId: serviceTypeForPastDateId,
  serviceProviderId: serviceProviderForMinimumBookingHoursId,
  firstAvailableDate: dateTimeUtil.toDate('2022-3-9'),
}
const serviceProviderToServiceTypeForBusySlots = {
  id: 4,
  serviceTypeId: serviceTypeForBusySlotsId,
  serviceProviderId: serviceProviderForMinimumBookingHoursId,
  firstAvailableDate: dateTimeUtil.addDays(dateTimeUtil.now(), 1),
}

const serviceCategory = {
  id: serviceCategoryId,
}

const patientData = {
  id: 444111,
  uuid: '5804d7ae-2c83-423b-ad1d-365534768bda',
  authUserId: 'user',
}

export const appointmentForPastDateData = {
  id: 444111,
  patientId: patientData.id,
  serviceTypeId: serviceTypeForPastDateId,
  serviceProviderId: serviceProviderForPastDateId,
}

let dataSource: DataSource

let serviceProviderSeed: ServiceProviderSeed
let superTypeSeed: SuperTypeSeed
let serviceTypeSeed: ServiceTypeSeed
let schedulingSlotSeed: SchedulingSlotSeed
let serviceProviderToServiceTypeSeed: ServiceProviderToServiceTypeSeed
let serviceCategorySeed: ServiceCategorySeed
let patientSeed: PatientSeed
let appointmentSeed: AppointmentSeed

describe('Firebase Function: caching-first-available-date', () => {
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    schedulingSlotSeed = new SchedulingSlotSeed(dataSource)
    serviceProviderToServiceTypeSeed = new ServiceProviderToServiceTypeSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)

    await serviceProviderSeed.createArray([
      {
        id: serviceProviderId,
      },
      {
        id: serviceProviderForPastDateId,
      },
      {
        id: serviceProviderForMinimumBookingHoursId,
      },
    ])
    await serviceCategorySeed.create(serviceCategory)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.createArray([
      serviceTypeData,
      serviceTypeSecondaryData,
      serviceTypeForPastDateData,
      serviceTypeWithoutSlotsData,
      serviceTypeWithoBusySlots,
    ])

    await schedulingSlotSeed.createArray([
      ...generateSlots(slotGenerationData),

      //To check sorting by startTime - we're creating first slots for 11:00-11:30 and then for 10:30-11:00
      ...generateSlots(slotGenerationForSecondaryTypeSecondHalfData),
      ...generateSlots(slotGenerationForSecondaryTypeFirstHalfData),

      ...generateSlots(slotGenerationWithPastDateData),
      ...generateSlots(slotGenerationForMinimumBookingHoursData),
      ...generateSlots(slotGenerationForMinimumBookingHoursInTwoYearsData),
      ...generateSlots(slotGenerationForSecondaryTypeIn2DaysData),
      ...generateSlots(slotGenerationForTypeWithBusySlotsData),
    ])

    await serviceProviderToServiceTypeSeed.createArray([
      serviceProviderToServiceTypePastDateData,
      serviceProviderToServiceTypeForMinimumBookingWithPastDateData,
      serviceProviderToServiceTypeWithMinimumHoursRequiredData,
      serviceProviderToServiceTypeForBusySlots,
    ])

    await patientSeed.create(patientData)
    await appointmentSeed.create(appointmentForPastDateData)
  })

  it('should end executing prematurely - service provider not found and service type not found', async () => {
    let data = {
      serviceProviderId: serviceProviderFailId,
      serviceTypeIds: [serviceTypeId],
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    let errorCode = await handlerSlotAvailabilityUpdated(message)
    expect(errorCode).toBe(CachingFirstAvailableDateErrorCodes.ServiceProviderNotFound)

    data = {
      serviceProviderId: serviceProviderId,
      serviceTypeIds: [serviceTypeFailId],
    }

    const pubSubEventTwo = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    errorCode = await handlerSlotAvailabilityUpdated(pubSubEventTwo)
    expect(errorCode).toBe(CachingFirstAvailableDateErrorCodes.ServiceTypesNotFound)
  })

  it(`should create first available day for the first type and recreate for the second - availability updated handler`, async () => {
    const data = {
      serviceProviderId,
      serviceTypeIds: [serviceTypeId, serviceTypeSecondaryId],
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    await handlerSlotAvailabilityUpdated(message)

    const [availabilityForServiceType] =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeId,
      )
    expect(availabilityForServiceType.firstAvailableDate).toBe(`${twoYearsAhead}-08-23`)

    const [availabilityForSecondaryServiceType] =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeSecondaryId,
      )
    expect(availabilityForSecondaryServiceType.firstAvailableDate).toBe(twoDaysFromNow)
  })

  it(`should recreate service type availability for service type - service type changed handler`, async () => {
    const data = {
      id: serviceTypeId,
    }

    const spyGetIntervalsMethod = jest.spyOn(
      AvailableSlotsService.prototype,
      'getMonthsAndStartDate',
    )

    await serviceProviderToServiceTypeSeed.create({
      serviceTypeId: serviceTypeId,
      serviceProviderId: serviceProviderForPastDateId,
      firstAvailableDate: dateTimeUtil.toDate('2022-12-22'),
    })

    const message = testPubSubEvent(Buffer.from(JSON.stringify(data)).toString('base64'))

    await handlerServiceTypeChanged(message)

    expect(spyGetIntervalsMethod).toBeCalledTimes(2) //2 service providers * 1 service type
    spyGetIntervalsMethod.mockClear()

    const [availabilityForServiceType] =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeId,
      )
    expect(availabilityForServiceType.firstAvailableDate).toBe(`${twoYearsAhead}-08-23`)

    const availabilityForServiceTypeWithoutSlots =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderForPastDateId,
        serviceTypeId,
      )
    expect(availabilityForServiceTypeWithoutSlots.length).toBe(0) //we don't have slot, this availability should be removed
  })

  it(`should recreate all service type availability - service type changed handler`, async () => {
    const spyGetIntervalsMethod = jest.spyOn(
      AvailableSlotsService.prototype,
      'getMonthsAndStartDate',
    )

    await handlerServiceTypeChanged({} as CloudEvent<PubSubEvent>)

    expect(spyGetIntervalsMethod).toBeCalledTimes(8) //2 service providers * 4 service types
    spyGetIntervalsMethod.mockClear()

    const [availabilityForServiceType] =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeId,
      )
    expect(availabilityForServiceType.firstAvailableDate).toBe(`${twoYearsAhead}-08-23`)

    const [availabilityForServiceTypeWithBusySlots] =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderForMinimumBookingHoursId,
        serviceTypeForBusySlotsId,
      )
    expect(availabilityForServiceTypeWithBusySlots.firstAvailableDate).toBeNull()
  })

  it('should recreate first available day for secondary sevice type with minumumHoursRequired = 100 - availability updated handler', async () => {
    const data = {
      serviceProviderId,
      serviceTypeIds: [serviceTypeId, serviceTypeSecondaryId],
    }

    await serviceTypeSeed.updateMinimumHoursRequiredInMinutes(serviceTypeSecondaryId, 100)
    const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))

    await handlerSlotAvailabilityUpdated(message)

    const [availabilityForServiceType] =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeId,
      )
    expect(availabilityForServiceType.firstAvailableDate).toBe(`${twoYearsAhead}-08-23`)

    const [availabilityForSecondaryServiceType] =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeSecondaryId,
      )
    //We have slots in 2 days but minimum hours required = 100 so we take closest slots in 2 years
    expect(availabilityForSecondaryServiceType.firstAvailableDate).toBe(`${twoYearsAhead}-08-23`)
  })

  it('should remove first available day for service type with slots only in past - appointment created handler', async () => {
    const data = {
      appointmentIds: [appointmentForPastDateData.id],
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    await handlerAppointmentsCreated(message)

    const availability =
      await serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderForPastDateId,
        serviceTypeForPastDateId,
      )
    expect(availability.length).toBe(0)
  })

  it('should remove first available day for both types - availability blocked handler', async () => {
    const data = {
      //No service type ids were passed
      //execute for all service types in service_provider_to_service_type_availability table related to serviceProviderId
      serviceProviderId,
    }

    await schedulingSlotSeed.removeByServiceProviderIdAndServiceTypeIds(serviceProviderId, [
      serviceTypeId,
      serviceTypeSecondaryId,
    ])

    const message = testPubSubEvent(encodePubSubMessage(data, AvailabilityUpdatedSchema))
    await handlerSlotAvailabilityBlocked(message)

    const [serviceTypeAvailability, secondaryServiceTypeAvailability] = await Promise.all([
      serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeId,
      ),
      serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderId,
        serviceTypeSecondaryId,
      ),
    ])

    expect(serviceTypeAvailability.length).toBe(0)
    expect(secondaryServiceTypeAvailability.length).toBe(0)
  })

  test(`1. Caching first available date minimum booking limitation successfully
        2. Should delete old firstAvailDates
        3. Should create serviceProviderToServiceType wth firstAvailableDay = null`, async () => {
    await serviceProviderToServiceTypeSeed.updateFirstAvailableDay(
      serviceProviderToServiceTypeForBusySlots.id,
      '2022-02-02',
    )

    await handlerMinimumBookingLimitation()

    const [
      [serviceTypeSecondaryAvailability],
      serviceTypeInPastAvailability,
      [serviceTypeAvailiabilityWithoutDate],
    ] = await Promise.all([
      serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderForMinimumBookingHoursId,
        serviceTypeSecondaryId,
      ),
      serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderForMinimumBookingHoursId,
        serviceTypeForPastDateId,
      ),
      serviceProviderToServiceTypeSeed.findByServiceProviderIdAndServiceTypeId(
        serviceProviderForMinimumBookingHoursId,
        serviceTypeForBusySlotsId,
      ),
    ])

    // 1. should create first available date in two years
    // we have slots after tommorow and in 2 years. But service type has minimumHoursRequired = 100 so we take slots in 2 years.
    expect(serviceTypeSecondaryAvailability.firstAvailableDate).toBe(`${twoYearsAhead}-08-23`)
    expect(serviceTypeAvailiabilityWithoutDate.firstAvailableDate).toBeNull()

    // 2. should delete all firstAvailDate in past time
    expect(serviceTypeInPastAvailability.length).toBe(0)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await schedulingSlotSeed.removeByServiceProviderIds([
      serviceProviderId,
      serviceProviderForPastDateId,
      serviceProviderForMinimumBookingHoursId,
    ])
    await serviceProviderToServiceTypeSeed.removeByProviderIds([
      serviceProviderId,
      serviceProviderForPastDateId,
      serviceProviderForMinimumBookingHoursId,
    ])
    await serviceTypeSeed.removeByIds([
      serviceTypeId,
      serviceTypeSecondaryId,
      serviceTypeForPastDateId,
      serviceTypeForBusySlotsId,
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await Promise.all([
      serviceProviderSeed.removeByIds([serviceProviderId, serviceProviderForPastDateId]),
      serviceCategorySeed.removeById(serviceCategoryId),
    ])
  })
})
