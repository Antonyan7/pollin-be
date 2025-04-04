import {SchedulingSlot, SlotStatus} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  cartOhipCoveredSlotFixture,
  cartOhipNotCoveredSlotFixture,
  cartSlotForMultipleNotTaxableTypesFixture,
  slotForFreeServicesFixture,
  slotForServiceTypeWithZeroPromisePriceFixture,
} from '@libs/common/test/fixtures/slot-id-model.fixture'
import {
  serviceProviderAppointmentsFixtureId,
  serviceProviderFixture,
  serviceProviderForApplyIntervalsFixture,
  serviceProviderInActiveFixture,
  serviceProviderToBlockFixture,
  serviceProviderToNotBlockFixture,
  serviceProviderToNotTimeOffBlockFixture,
  serviceProviderToTimeOffBlockFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {
  serviceTypeFixture,
  serviceTypeToApplyBlockFixture,
  serviceTypeToApplyTimeOffBlockFixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithDuration40Fixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {SlotGenerationDataInput} from '@seeds/typeorm'
import {nextYear} from './applied-scheduling-template-period.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)
const twoYearsAhead: number = dateTimeUtil.getYear() + 2
const fourYearsAhead: number = dateTimeUtil.getYear() + 4

export const dateStartToApply: Date = dateTimeUtil.customDate(nextYear, 2, 2, 0, 0, 2)
export const dateEndToApply: Date = dateTimeUtil.addDays(dateStartToApply, 14)

export const schedulingSlotOhipCoveredFirstFixture: Partial<SchedulingSlot> = {
  id: 116,
  uuid: cartOhipCoveredSlotFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2043-07-07T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-07-07T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotOhipCoveredThirdFixture: Partial<SchedulingSlot> = {
  id: 118,
  uuid: cartOhipCoveredSlotFixture.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2043-07-07T12:50:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-07-07T13:10:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotOhipCoveredSecondFixture: Partial<SchedulingSlot> = {
  id: 117,
  uuid: cartOhipCoveredSlotFixture.schedulingSlotId + '1',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2043-07-07T13:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-07-07T13:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotToBlockFixture: Partial<SchedulingSlot> = {
  id: 129,
  uuid: 'schedulingSlotToBlockFixture',
  serviceProviderId: serviceProviderToBlockFixture.id,
  startTime: dateTimeUtil.toDate('2043-07-07T13:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-07-07T13:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeToApplyBlockFixture.id,
}

export const schedulingSlotToNotBlockFixture: Partial<SchedulingSlot> = {
  id: 130,
  uuid: 'schedulingSlotToNotBlockFixture',
  serviceProviderId: serviceProviderToNotBlockFixture.id,
  startTime: dateTimeUtil.toDate('2043-07-07T13:50:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-07-07T14:20:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeToApplyBlockFixture.id,
}

// FUll day
export const schedulingSlotForGroupedBySTDurationFixture: SlotGenerationDataInput = {
  prefix: 'group-by-STDuration',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-07-20T11:00:00.000Z`), //in UTC = 7 00 EST
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-07-20T13:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

//to have break in day for testing
export const schedulingSlotForGroupedBySTDurationSecondPartFixture: SlotGenerationDataInput = {
  prefix: 'group-by-STDuration2Part',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-07-20T13:10:00.000Z`), //break 10 min based on prev part above (13:10 UTC -> 9:10 EST  -> 9:00-9:10 busy)
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-07-20T22:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotForGroupedBySTDurationNoAvailSlotFixture: SlotGenerationDataInput = {
  prefix: 'group-by-STDurOneSlot',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-07-21T11:40:00.000Z`), //in UTC = 7:40 EST
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-07-21T12:20:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const firstSchedulingSlotForFreeServicesFixture: Partial<SchedulingSlot> = {
  uuid: slotForFreeServicesFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2044-07-07T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2044-07-07T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const secondSchedulingSlotForFreeServicesFixture: Partial<SchedulingSlot> = {
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2044-07-07T12:50:00.000Z'),
  endTime: dateTimeUtil.toDate('2044-07-07T13:10:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const thirdSchedulingSlotForFreeServicesFixture: Partial<SchedulingSlot> = {
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2044-07-07T13:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2044-07-07T13:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const firstSchedulingSlotForNotTaxableFixture: Partial<SchedulingSlot> = {
  uuid: cartSlotForMultipleNotTaxableTypesFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2044-07-07T13:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2044-07-07T14:10:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const secondSchedulingSlotForNotTaxableFixture: Partial<SchedulingSlot> = {
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2044-07-07T14:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2044-07-07T15:10:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const thirdSchedulingSlotForNotTaxableFixture: Partial<SchedulingSlot> = {
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2044-07-07T15:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2044-07-07T15:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotNotOhipCoveredFirstFixture: Partial<SchedulingSlot> = {
  uuid: cartOhipNotCoveredSlotFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2043-08-07T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-08-07T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotNotOhipCoveredThirdFixture: Partial<SchedulingSlot> = {
  uuid: cartOhipNotCoveredSlotFixture.schedulingSlotId + '1',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2043-08-07T12:50:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-08-07T13:20:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotNotOhipCoveredSecondFixture: Partial<SchedulingSlot> = {
  uuid: cartOhipNotCoveredSlotFixture.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2043-08-07T13:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2043-08-07T13:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotToTimeOffBlockFixture: Partial<SchedulingSlot> = {
  id: 150,
  uuid: 'schedulingSlotToTimeOffBlock',
  serviceProviderId: serviceProviderToTimeOffBlockFixture.id,
  startTime: dateTimeUtil.toDate('2045-07-07T13:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2045-07-07T13:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeToApplyTimeOffBlockFixture.id,
}

export const schedulingSlotToNotTimeOffBlockFixture: Partial<SchedulingSlot> = {
  id: 151,
  uuid: 'schedulingSlotToNotTimeOffBlock',
  serviceProviderId: serviceProviderToNotTimeOffBlockFixture.id,
  startTime: dateTimeUtil.toDate('2046-07-07T13:50:00.000Z'),
  endTime: dateTimeUtil.toDate('2046-07-07T14:20:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeToApplyTimeOffBlockFixture.id,
}

export const schedulingSlotApplyTimeOffBlockFixture: Partial<SchedulingSlot> = {
  id: 152,
  uuid: 'schedulingSlotApplyTimeOffBlock',
  serviceProviderId: serviceProviderForApplyIntervalsFixture.id,
  startTime: dateTimeUtil.subDays(dateStartToApply, 1),
  endTime: dateTimeUtil.subDays(dateStartToApply, 1),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeToApplyTimeOffBlockFixture.id,
}

export const schedulingSlotApplyShouldKeepSlotBusyFixture: SlotGenerationDataInput = {
  prefix: 'scheduleSLotKeepBusy',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-06-10T11:00:00.000Z`), //in UTC = 7 00 EST
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-06-12T22:00:00.000Z`), //in UTC = 7 00 EST
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const slotTimeOffBlockFixture: Partial<SchedulingSlot> = {
  id: 153,
  uuid: 'slotTimeOffBlockFixture',
  startTime: dateTimeUtil.toDate('2029-05-06T10:00:00.000Z'),
  endTime: dateTimeUtil.toDate('2029-05-06T10:20:00.000Z'),
  serviceProviderId: serviceProviderAppointmentsFixtureId,
  serviceTypeId: serviceTypeFixture.id,
  status: SlotStatus.TimeOffBlock,
  maxAppointmentCount: 2,
  appointmentCount: 2,
}

export const slotTimeOffBlockPeriodFixture: Partial<SchedulingSlot> = {
  id: 154,
  uuid: 'slotTimeOffBlockPeriodFixture',
  startTime: dateTimeUtil.toDate('2061-07-05T13:00:00.000Z'),
  endTime: dateTimeUtil.toDate('2061-07-05T13:30:00.000Z'),
  serviceProviderId: serviceProviderInActiveFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  status: SlotStatus.Free,
  maxAppointmentCount: 2,
  appointmentCount: 1,
}

export const schedulingSlotsToRemoveOnTemplateApplyingFixture: SlotGenerationDataInput = {
  prefix: 'to-remove-on-apply',
  days: 7,
  startDateAndTime: dateTimeUtil.subDays(dateStartToApply, 1),
  dailyEndTime: dateTimeUtil.subDays(dateTimeUtil.addMinutes(dateStartToApply, 20), 1),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
}

export const schedulingSlotForServiceTypeWithZeroPromisePriceFixture: Partial<SchedulingSlot> = {
  uuid: slotForServiceTypeWithZeroPromisePriceFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2045-07-07T13:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2045-07-07T13:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}
