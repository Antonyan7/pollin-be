import {ServiceGroupAvailabilitySeed} from '@seeds/typeorm/service-group-availability.seed'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {generateSlots} from '@libs/common/test/utils/slot.helper'
import {
  SchedulingSlot,
  ServiceGroupToServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  AppointmentSeed,
  PatientSeed,
  SchedulingSlotSeed,
  ServiceCategorySeed,
  ServiceGroupSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'

export const serviceProviderId = 444111
export const serviceProviderId2 = 444112
export const serviceProviderLabId = 444113
const serviceTypeId = 444111

export const serviceGroupId = 444111
export const serviceGroup2Id = 444121
const serviceCategoryId = 444111

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)
export const twoYearsAhead: number = dateTimeUtil.getYear() + 2

export const serviceGroupTypesIds = [444112, 444113, 444114]

export const serviceTypeDominant = {
  id: serviceTypeId,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}

const serviceType1 = {
  id: serviceGroupTypesIds[0],
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
  providerAutomaticSelection: true,
}
const serviceType2 = {
  id: serviceGroupTypesIds[1],
  name: 'TEST_NAME2',
  durationInMinutes: 30,
  price: 150,
  providerAutomaticSelection: true,
}
const serviceType3 = {
  id: serviceGroupTypesIds[2],
  name: 'TEST_NAME3',
  durationInMinutes: 20,
  price: 150,
  providerAutomaticSelection: false,
}
export const serviceTypeWithoutSlots = {
  id: 444120,
  name: 'TEST_NAME4',
  durationInMinutes: 20,
  price: 150,
  providerAutomaticSelection: true,
}

const serviceCategory = {
  id: serviceCategoryId,
}

const serviceGroup = {
  id: serviceGroupId,
  title: 'Service Group',
  durationInMinutes: 30,
  dominantServiceTypeId: serviceTypeDominant.id,
  serviceCategoryId: serviceCategoryId,
  internal: false,
  irregularPeriodsAllowed: false,
  serviceGroupToServiceType: [
    {
      serviceGroupId,
      serviceTypeId: serviceTypeDominant.id,
      sequence: 1,
    },
    {
      serviceGroupId,
      serviceTypeId: serviceType1.id,
      sequence: 2,
    },
    {
      serviceGroupId,
      serviceTypeId: serviceType2.id,
      sequence: 3,
    },
    {
      serviceGroupId,
      serviceTypeId: serviceType3.id,
      sequence: 4,
    },
  ] as ServiceGroupToServiceType[],
}
const serviceGroup2 = {
  id: serviceGroup2Id,
  title: 'Service Group',
  durationInMinutes: 30,
  dominantServiceTypeId: serviceTypeId,
  serviceCategoryId: serviceCategoryId,
  internal: false,
  irregularPeriodsAllowed: false,
  serviceGroupToServiceType: [
    {
      serviceGroupId: serviceGroup2Id,
      serviceTypeId: serviceTypeDominant.id,
      sequence: 1,
    },
    {
      serviceGroupId: serviceGroup2Id,
      serviceTypeId: serviceType3.id,
      sequence: 2,
    },
  ] as ServiceGroupToServiceType[],
}

export const schedulingSlotForSecondDay: Partial<SchedulingSlot> = {
  id: 444111,
  serviceProviderId: serviceProviderLabId,
  serviceTypeId: serviceType3.id,
  startTime: dateTimeUtil.addDays(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:30:00.000Z`), 60),
  endTime: dateTimeUtil.addDays(dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:40:00.000Z`), 60),
}

const serviceGroupAvailabilitySlotsFixture = {
  prefix: 'service-group-availability',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:30:00.000Z`),
  serviceProviderId,
  serviceTypeId,
  daysBetween: 60,
}
const serviceGroupAvailabilitySlots2Fixture = {
  prefix: 'servicegroup-availability1',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:30:00.000Z`),
  serviceProviderId: serviceProviderLabId,
  serviceTypeId: serviceGroupTypesIds[0],
  daysBetween: 60,
}
const serviceGroupAvailabilitySlots3Fixture = {
  prefix: 'servicegroup-availability2',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:30:00.000Z`),
  serviceProviderId: serviceProviderLabId,
  serviceTypeId: serviceGroupTypesIds[1],
  daysBetween: 60,
}
const serviceGroupAvailabilitySlots4Fixture = {
  prefix: 'servicegroup-availability3',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:30:00.000Z`),
  serviceProviderId: serviceProviderLabId,
  serviceTypeId: serviceGroupTypesIds[2],
  daysBetween: 60,
}

const serviceGroupAvailabilitySlotsForSecondTypeWithoutAutomaticSelectionFixture = {
  prefix: 'sg-avail-without-automatic',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T12:40:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:10:00.000Z`),
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceGroupTypesIds[2],
  daysBetween: 60,
}

const serviceGroupAvailabilitySlotsProvider2Fixture = {
  prefix: 'group-availability-2',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T11:20:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-02T13:30:00.000Z`),
  serviceProviderId: serviceProviderId2,
  serviceTypeId: serviceTypeId,
  daysBetween: 60,
}

const patientFixture = {
  id: 444111,
  uuid: '5804d7ae-2c83-423b-ad1d-365534768bda',
  authUserId: 'user',
}

export const appointmentFixture = {
  id: 444111,
  patientId: patientFixture.id,
  start: schedulingSlotForSecondDay.startTime,
  serviceTypeId: schedulingSlotForSecondDay.serviceTypeId,
  serviceProviderId,
}

export async function createServiceGroupAvailabilityFixtures(
  dataSource: DataSource,
): Promise<void> {
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const schedulingSlotSeed = new SchedulingSlotSeed(dataSource)
  const serviceGroupSeed = new ServiceGroupSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)

  await serviceProviderSeed.createArray([
    {
      id: serviceProviderId,
    },
    {
      id: serviceProviderId2,
    },
    {
      id: serviceProviderLabId,
    },
  ])
  await serviceCategorySeed.create(serviceCategory)
  await serviceTypeSeed.createArray([
    serviceTypeDominant,
    serviceType1,
    serviceType2,
    serviceType3,
    serviceTypeWithoutSlots,
  ])
  await Promise.all([
    serviceGroupSeed.create(serviceGroup),
    serviceGroupSeed.create(serviceGroup2),
    patientSeed.create(patientFixture),
  ])
  await Promise.all([
    schedulingSlotSeed.create(schedulingSlotForSecondDay),
    schedulingSlotSeed.createArray([...generateSlots(serviceGroupAvailabilitySlotsFixture)]),
    schedulingSlotSeed.createArray([...generateSlots(serviceGroupAvailabilitySlots2Fixture)]),
    schedulingSlotSeed.createArray([...generateSlots(serviceGroupAvailabilitySlots3Fixture)]),
    schedulingSlotSeed.createArray([...generateSlots(serviceGroupAvailabilitySlots4Fixture)]),
    schedulingSlotSeed.createArray([
      ...generateSlots(serviceGroupAvailabilitySlotsForSecondTypeWithoutAutomaticSelectionFixture),
    ]),
    schedulingSlotSeed.createArray([
      ...generateSlots(serviceGroupAvailabilitySlotsProvider2Fixture),
    ]),
  ])
  await appointmentSeed.create(appointmentFixture)
}

export async function destroyServiceGroupAvailabilityFixtures(
  dataSource: DataSource,
): Promise<void> {
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const schedulingSlotSeed = new SchedulingSlotSeed(dataSource)
  const serviceGroupSeed = new ServiceGroupSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const serviceGroupAvailabilitySeed = new ServiceGroupAvailabilitySeed(dataSource)

  await serviceGroupAvailabilitySeed.removeByServiceGroupId(serviceGroupId)
  await serviceGroupAvailabilitySeed.removeByServiceGroupId(serviceGroup2Id)
  await schedulingSlotSeed.removeByServiceProviderId(serviceProviderId)
  await schedulingSlotSeed.removeByServiceProviderId(serviceProviderId2)
  await schedulingSlotSeed.removeByServiceProviderId(serviceProviderLabId)
  await serviceGroupSeed.removeByIds([serviceGroupId, serviceGroup2Id])
  await serviceTypeSeed.removeByIds([
    ...serviceGroupTypesIds,
    serviceTypeDominant.id,
    serviceTypeWithoutSlots.id,
  ])
  await Promise.all([
    serviceProviderSeed.removeByIds([serviceProviderId, serviceProviderId2, serviceProviderLabId]),
    serviceTypeSeed.removeById(serviceTypeId),
    serviceCategorySeed.removeById(serviceCategoryId),
  ])
}
