import {SchedulingTimeOffBlock} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  serviceProviderAppointmentsFixtureId,
  serviceProviderBilling,
  serviceProviderForMobileFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  schedulingTimeOffBlockPeriodFixture,
  schedulingTimeOffBlockPeriodForAFewHoursWithoutAppliedFixture,
  schedulingTimeOffBlockPeriodFullDayWhichWillBeSplittedByOtherFixture,
  schedulingTimeOffBlockPeriodSplitSlotsFixture,
  schedulingTimeOffBlockPeriodWhichSplitsFullDayOtherTImeOffBLockFixture,
} from '@libs/common/test/fixtures/scheduling-time-off-block-period.fixture'
const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
export const schedulingTimeOffSlotsStartTime: Date = dateTimeUtil.toDate('2029-05-09T15:00:00.000Z')

export const schedulingTimeOffBlockFixture: Partial<SchedulingTimeOffBlock> = {
  id: 1,
  uuid: '7b52fcd8-22d3-11ed-84f7-0242ac110002',
  startDate: dateTimeUtil.toDate('2029-05-04'),
  endDate: dateTimeUtil.toDate('2029-05-07'),
  serviceProviderId: serviceProviderAppointmentsFixtureId,
  schedulingTimeOffBlockPeriodId: schedulingTimeOffBlockPeriodFixture.id,
}

export const schedulingTimeOffBlockAppointmentFixture: Partial<SchedulingTimeOffBlock> = {
  id: 2,
  uuid: '7b52fcd8-22d3-11ed-84f7-0242ac110003',
  startDate: dateTimeUtil.toDate('2029-05-04'),
  endDate: dateTimeUtil.toDate('2029-05-07'),
  serviceProviderId: serviceProviderAppointmentsFixtureId,
  schedulingTimeOffBlockPeriodId: schedulingTimeOffBlockPeriodFixture.id,
}

export const schedulingTimeOffBlockPastFixture: Partial<SchedulingTimeOffBlock> = {
  id: 3,
  uuid: 'a5d49ca9-caf2-4e10-a4ab-96dc5c370186',
  startDate: dateTimeUtil.toDate('2023-05-04'),
  endDate: dateTimeUtil.toDate('2023-05-07'),
  serviceProviderId: serviceProviderAppointmentsFixtureId,
  schedulingTimeOffBlockPeriodId: schedulingTimeOffBlockPeriodFixture.id,
}

export const schedulingTimeOffBlockSplitSlotsFixture: Partial<SchedulingTimeOffBlock> = {
  id: 4,
  uuid: '29f7262a-72f6-4586-959b-c220b3ac319d',
  startDate: schedulingTimeOffSlotsStartTime,
  endDate: dateTimeUtil.toDate('2029-05-21T17:00:00.000Z'),
  serviceProviderId: serviceProviderBilling.id,
  schedulingTimeOffBlockPeriodId: schedulingTimeOffBlockPeriodSplitSlotsFixture.id,
}

export const schedulingTimeOffBlockForAFewHoursWithoutAppliedTemplateFixture: Partial<SchedulingTimeOffBlock> =
  {
    id: 5,
    uuid: 5 + '9f7262a-72f6-4586-959b-c220b3ac319d',
    startDate: dateTimeUtil.toDate('2029-05-23T12:00:00.000Z'),
    endDate: dateTimeUtil.toDate('2029-05-23T21:00:00.000Z'),
    serviceProviderId: serviceProviderBilling.id,
    schedulingTimeOffBlockPeriodId:
      schedulingTimeOffBlockPeriodForAFewHoursWithoutAppliedFixture.id,
  }

export const schedulingTimeOffBlockFullDayWhichWillBeSplittedByOtherTimeOffBlockFixture: Partial<SchedulingTimeOffBlock> =
  {
    id: 6,
    uuid: 6 + '9f7262a-72f6-4586-959b-c220b3ac319d',
    startDate: dateTimeUtil.toDate('2029-05-24T11:00:00.000Z'),
    endDate: dateTimeUtil.toDate('2029-05-24T22:00:00.000Z'),
    serviceProviderId: serviceProviderBilling.id,
    schedulingTimeOffBlockPeriodId:
      schedulingTimeOffBlockPeriodFullDayWhichWillBeSplittedByOtherFixture.id,
  }
export const schedulingTimeOffBlockWhichSplitsFullDayOtherTImeOffBLockFixture: Partial<SchedulingTimeOffBlock> =
  {
    id: 7,
    uuid: 7 + '9f7262a-72f6-4586-959b-c220b3ac319d',
    startDate: dateTimeUtil.toDate('2029-05-24T15:00:00.000Z'),
    endDate: dateTimeUtil.toDate('2029-05-24T17:00:00.000Z'),
    serviceProviderId: serviceProviderBilling.id,
    schedulingTimeOffBlockPeriodId:
      schedulingTimeOffBlockPeriodWhichSplitsFullDayOtherTImeOffBLockFixture.id,
  }

export const schedulingTimeOffBlockFirstOverlapFixture: Partial<SchedulingTimeOffBlock> = {
  id: 8,
  uuid: 8 + '9f7262a-72f6-4586-959b-c220b3ac319d',
  startDate: dateTimeUtil.toDate('2030-05-06T13:00:00.000Z'),
  endDate: dateTimeUtil.toDate('2030-05-06T13:40:00.000Z'),
  serviceProviderId: serviceProviderForMobileFixture.id,
  schedulingTimeOffBlockPeriodId: schedulingTimeOffBlockPeriodFixture.id,
}

export const schedulingTimeOffBlockSecondFixture: Partial<SchedulingTimeOffBlock> = {
  id: 9,
  uuid: 9 + '9f7262a-72f6-4586-959b-c220b3ac319d',
  startDate: dateTimeUtil.toDate('2030-05-06T13:30:00.000Z'),
  endDate: dateTimeUtil.toDate('2030-05-06T14:00:00.000Z'),
  serviceProviderId: serviceProviderForMobileFixture.id,
  schedulingTimeOffBlockPeriodId: schedulingTimeOffBlockPeriodFixture.id,
}
