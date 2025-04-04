import {SchedulingTemplatePeriodType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppliedSchedulingTemplatePeriod} from '@libs/data-layer/apps/scheduling/entities/typeorm/applied-template-period.entity'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {
  serviceProviderBilling,
  serviceProviderFixture,
  serviceProviderForAppointmentsLengthFixture,
  serviceProviderWithoutAppointmentsFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))
const nextYearDate: Date = dateTimeUtil.addYear(dateTimeUtil.now(), 1)
export const nextYear: number = dateTimeUtil.getYear(nextYearDate)

export const appliedStartDate: string = `${nextYear}-12-01`
export const appliedMaximumUnitsDate: string = dateTimeUtil.formatIsoDate(
  dateTimeUtil.addDays(dateTimeUtil.now(), 5),
)
export const appliedMinimumUnitsDate: string = dateTimeUtil.formatIsoDate(
  dateTimeUtil.addDays(dateTimeUtil.now(), 5),
)

const appliedTemplateWithoutAppointmentsYear: number = dateTimeUtil.getYear(
  dateTimeUtil.addYear(dateTimeUtil.now(), 12),
)
export const appliedTemplateDateWithoutAppointments: string = `${appliedTemplateWithoutAppointmentsYear}-10-11`

export const appliedSchedulingTemplatePeriodFixture: Partial<AppliedSchedulingTemplatePeriod> = {
  id: 1,
  type: SchedulingTemplatePeriodType.ServiceType,
  uuid: '242b2a24-c0c0-452b-879f-24438a1afd77',
  placeholderLabel: 'Scheduling Template Period Placeholder',
  startTime: dateTimeUtil.toDate(`${appliedStartDate}T15:00:00`),
  endTime: dateTimeUtil.toDate(`${appliedStartDate}T20:00:00`),
  serviceProviderId: serviceProviderFixture.id,
}

export const appliedSchedulingTemplatePeriodBlockFixture: Partial<AppliedSchedulingTemplatePeriod> =
  {
    id: 2,
    type: SchedulingTemplatePeriodType.Block,
    placeholderLabel: 'Scheduling Template Period Block Placeholder',
    startTime: dateTimeUtil.toDate(`${appliedStartDate}T16:00:00`),
    endTime: dateTimeUtil.toDate(`${appliedStartDate}T17:00:00`),
    serviceProviderId: serviceProviderFixture.id,
  }

export const periodsOnSameDayFixtureDay: string = `${appliedTemplateWithoutAppointmentsYear}-10-10`
export const periodsOnSameDayFixture: Partial<AppliedSchedulingTemplatePeriod>[] = [
  {
    id: 3,
    type: SchedulingTemplatePeriodType.Block,
    placeholderLabel: 'periodsOnSameDayFixture',
    startTime: dateTimeUtil.toDate(`${periodsOnSameDayFixtureDay}T13:00:00`),
    endTime: dateTimeUtil.toDate(`${periodsOnSameDayFixtureDay}T14:00:00`),
    serviceProviderId: serviceProviderWithoutAppointmentsFixture.id,
  },
  {
    id: 4,
    type: SchedulingTemplatePeriodType.Block,
    placeholderLabel: 'periodsOnSameDayFixture',
    startTime: dateTimeUtil.toDate(`${periodsOnSameDayFixtureDay}T14:00:00`),
    endTime: dateTimeUtil.toDate(`${periodsOnSameDayFixtureDay}T15:00:00`),
    serviceProviderId: serviceProviderWithoutAppointmentsFixture.id,
  },
]

export const threeDayBlockFixtureDay: string = `${nextYear}-11-11`
export const threeDayBlockFixtureStartDate: Date = dateTimeUtil.toDate(
  `${threeDayBlockFixtureDay}T12:00:00`,
)
const threeDayBlockFixtureEndDate: Date = dateTimeUtil.toDate(`${threeDayBlockFixtureDay}T23:00:00`)
export const threeDayBlockFixtures: Partial<AppliedSchedulingTemplatePeriod>[] = [
  {
    id: 5,
    type: SchedulingTemplatePeriodType.Block,
    placeholderLabel: 'First Day Block',
    startTime: threeDayBlockFixtureStartDate,
    endTime: threeDayBlockFixtureEndDate,
    serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  },
  {
    id: 6,
    type: SchedulingTemplatePeriodType.Block,
    placeholderLabel: 'Second day Block',
    startTime: dateTimeUtil.addHours(dateTimeUtil.now(), 12),
    endTime: dateTimeUtil.addDays(threeDayBlockFixtureEndDate, 1),
    serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  },
  {
    id: 7,
    type: SchedulingTemplatePeriodType.Block,
    placeholderLabel: 'Third day Block',
    startTime: dateTimeUtil.addDays(threeDayBlockFixtureStartDate, 2),
    endTime: dateTimeUtil.addDays(threeDayBlockFixtureEndDate, 2),
    serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  },
]

export const schedulingSplitTimeOffBlockFixture: Partial<AppliedSchedulingTemplatePeriod> = {
  id: 8,
  type: SchedulingTemplatePeriodType.ServiceType,
  uuid: '242b2a24-c0c0-452b-879f-24438a1afd88',
  placeholderLabel: 'schedulingSplitTimeOffBlockFixture',
  startTime: dateTimeUtil.toDate('2029-05-21T07:00:00.000Z'),
  endTime: dateTimeUtil.toDate('2029-05-21T18:00:00.000Z'),
  serviceProviderId: serviceProviderBilling.id,
}

export const schedulingServiceTypeTimeOffBlockFixture: Partial<AppliedSchedulingTemplatePeriod> = {
  id: 9,
  type: SchedulingTemplatePeriodType.ServiceType,
  uuid: '252b2a24-c0c0-452b-879f-32238a1afd88',
  placeholderLabel: 'schedulingServiceTypeTimeOffBlockFixture',
  startTime: dateTimeUtil.toDate('2029-05-09T15:00:00.000Z'),
  endTime: dateTimeUtil.toDate('2029-05-09T20:00:00.000Z'),
  serviceProviderId: serviceProviderBilling.id,
}

export const schedulingExtraPeriodForSameDayFixture: Partial<AppliedSchedulingTemplatePeriod> = {
  id: 10,
  type: SchedulingTemplatePeriodType.Block,
  uuid: '252b2a24-c0c0-452b-879f-24438a1afd88',
  placeholderLabel: 'schedulingExtraPeriodForSameDayFixture',
  startTime: dateTimeUtil.toDate('2029-05-09T05:00:00.000Z'),
  endTime: dateTimeUtil.toDate('2029-05-09T22:00:00.000Z'),
  serviceProviderId: serviceProviderBilling.id,
}

export const appliedSchedulingTemplateServiceTypeWithoutAppointmentsFixture: Partial<AppliedSchedulingTemplatePeriod> =
  {
    id: 11,
    type: SchedulingTemplatePeriodType.ServiceType,
    uuid: '242b3a23-a1c0-452b-879f-24438a1afd77',
    placeholderLabel: 'appliedSchedulingTemplateServiceTypeFixture',
    startTime: dateTimeUtil.toDate(`${appliedTemplateDateWithoutAppointments}T15:00:00`),
    endTime: dateTimeUtil.toDate(`${appliedTemplateDateWithoutAppointments}T20:00:00`),
    serviceProviderId: serviceProviderWithoutAppointmentsFixture.id,
  }

export const appliedSchedulingTemplateBlockWithoutAppointmentsFixture: Partial<AppliedSchedulingTemplatePeriod> =
  {
    id: 12,
    type: SchedulingTemplatePeriodType.Block,
    uuid: '242b3a24-b1c1-452b-879f-24438a1afd77',
    placeholderLabel: 'appliedSchedulingTemplateBlockFixture',
    startTime: dateTimeUtil.toDate(`${appliedTemplateDateWithoutAppointments}T13:00:00`),
    endTime: dateTimeUtil.toDate(`${appliedTemplateDateWithoutAppointments}T15:00:00`),
    serviceProviderId: serviceProviderWithoutAppointmentsFixture.id,
  }
