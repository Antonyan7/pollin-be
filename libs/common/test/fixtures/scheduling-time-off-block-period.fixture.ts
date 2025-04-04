import {SchedulingTimeOffBlockPeriod} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  serviceProviderAppointmentsFixtureId,
  serviceProviderBilling,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const schedulingTimeOffBlockPeriodFixture: Partial<SchedulingTimeOffBlockPeriod> = {
  id: 1,
  uuid: '7b52fcd8-22d3-11ed-84f7-0242ac110002',
  serviceProviderId: serviceProviderAppointmentsFixtureId,
  placeHolder: 'schedulingTimeOffBlockPeriodFixture',
  repeatWeeksCount: 0,
  isActiveOnSunday: false,
  isActiveOnMonday: false,
  isActiveOnTuesday: false,
  isActiveOnWednesday: false,
  isActiveOnThursday: false,
  isActiveOnFriday: false,
  isActiveOnSaturday: false,
  startDay: '2029-05-04',
  endDay: '2029-05-07',
  startTime: dateTimeUtil.toDate('2029-05-04'),
  endTime: dateTimeUtil.toDate('2029-05-04'),
}

export const schedulingTimeOffBlockPeriodSplitSlotsFixture: Partial<SchedulingTimeOffBlockPeriod> =
  {
    id: 2,
    uuid: 'b4deb2e1-c0d7-4ce2-bf71-58d064b7a187',
    serviceProviderId: serviceProviderAppointmentsFixtureId,
    placeHolder: 'schedulingTimeOffBlockPeriodSplitSlotsFixture',
    repeatWeeksCount: 0,
    isActiveOnSunday: false,
    isActiveOnMonday: false,
    isActiveOnTuesday: false,
    isActiveOnWednesday: false,
    isActiveOnThursday: false,
    isActiveOnFriday: false,
    isActiveOnSaturday: false,
    startDay: '2029-05-21',
    endDay: '2029-05-21',
    startTime: dateTimeUtil.toDate('2029-05-21'),
    endTime: dateTimeUtil.toDate('2029-05-21'),
  }

export const schedulingTimeOffBlockPeriodForAFewHoursWithoutAppliedFixture: Partial<SchedulingTimeOffBlockPeriod> =
  {
    id: 3,
    uuid: '0fa4c84d-216d-4872-a10e-aa88f6dd9a0f',
    serviceProviderId: serviceProviderBilling.id,
    placeHolder: 'schedulingTimeOffBlockPeriodForAFewHoursWithoutAppliedFixture',
    repeatWeeksCount: 0,
    isActiveOnSunday: false,
    isActiveOnMonday: false,
    isActiveOnTuesday: false,
    isActiveOnWednesday: false,
    isActiveOnThursday: false,
    isActiveOnFriday: false,
    isActiveOnSaturday: false,
    startDay: '2029-05-23',
    endDay: '2029-05-23',
    startTime: dateTimeUtil.toDate('2029-05-23'),
    endTime: dateTimeUtil.toDate('2029-05-23'),
  }

export const schedulingTimeOffBlockPeriodFullDayWhichWillBeSplittedByOtherFixture: Partial<SchedulingTimeOffBlockPeriod> =
  {
    id: 4,
    uuid: '297703e1-8cb1-4d26-ac97-05353b439d0f',
    serviceProviderId: serviceProviderBilling.id,
    placeHolder: 'schedulingTimeOffBlockPeriodFullDayWhichWillBeSplittedByOtherFixture',
    repeatWeeksCount: 0,
    isActiveOnSunday: false,
    isActiveOnMonday: false,
    isActiveOnTuesday: false,
    isActiveOnWednesday: false,
    isActiveOnThursday: false,
    isActiveOnFriday: false,
    isActiveOnSaturday: false,
    startDay: '2029-05-24',
    endDay: '2029-05-24',
    startTime: dateTimeUtil.toDate('2029-05-24'),
    endTime: dateTimeUtil.toDate('2029-05-24'),
  }

export const schedulingTimeOffBlockPeriodWhichSplitsFullDayOtherTImeOffBLockFixture: Partial<SchedulingTimeOffBlockPeriod> =
  {
    id: 5,
    uuid: '40e95734-3472-4618-a87d-d4039c3725a4',
    serviceProviderId: serviceProviderBilling.id,
    placeHolder: 'schedulingTimeOffBlockPeriodWhichSplitsFullDayOtherTImeOffBLockFixture',
    repeatWeeksCount: 0,
    isActiveOnSunday: false,
    isActiveOnMonday: false,
    isActiveOnTuesday: false,
    isActiveOnWednesday: false,
    isActiveOnThursday: false,
    isActiveOnFriday: false,
    isActiveOnSaturday: false,
    startDay: '2029-05-24',
    endDay: '2029-05-24',
    startTime: dateTimeUtil.toDate('2029-05-24'),
    endTime: dateTimeUtil.toDate('2029-05-24'),
  }
