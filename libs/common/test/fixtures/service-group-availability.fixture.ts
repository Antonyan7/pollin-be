import {ServiceGroupAvailability} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  mainServiceProviderForCareTeamFixture,
  secondaryServiceProviderForCareTeamFixture,
  serviceProviderAppointmentsFixtureId,
  serviceProviderAppointmentsLengthFixtureId,
  serviceProviderFixtureId,
  serviceProviderForAutomaticSelectionFixture,
  serviceProviderForBookingFlowFixture,
  serviceProviderForIsEditableFixtureId,
  serviceProviderForSerGroupAvailExtra1Fixture,
  serviceProviderForSerGroupAvailExtra2Fixture,
  serviceProviderForSerGroupAvailExtra3Fixture,
  serviceProviderRepeatConfigFixtureId,
  serviceProviderWhichShouldNotShowAsDisabledForCareTeamFixture,
} from './service-provider.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {schedulingSlotIdForServiceGroupAvailFixture} from './scheduling-slot.fixture'
import {ServiceGroupAvailGenerationDataInput} from '@seeds/typeorm/service-group-availability.seed'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)
const oneYearAhead: number = dateTimeUtil.getYear() + 1
const serviceGroupFixtureId: number = 1

/** Using in diff places to check which first AvailFDay will be for provider, or day/slot in calendar.
 * Don't create any fixture with earlier dateTime Than this one !
 */
export const serviceGroupAvailabilityFirstAvailDayFixture: Partial<ServiceGroupAvailability> = {
  id: 1,
  serviceGroupId: serviceGroupFixtureId,
  serviceProviderId: serviceProviderFixtureId,
  startTime: dateTimeUtil.toDate(`${oneYearAhead}-01-03T10:00:00.000Z`),
  schedulingSlotId: schedulingSlotIdForServiceGroupAvailFixture,
}

export const serviceGroupAvailability5DaysFixture: ServiceGroupAvailGenerationDataInput = {
  days: 5,
  idPrefix: 1,
  serviceGroupId: serviceGroupFixtureId,
  serviceProviderId: serviceProviderFixtureId,
  startTime: dateTimeUtil.toDate(`${oneYearAhead}-01-10T13:00:00.000Z`),
  endTimeGeneration: dateTimeUtil.toDate(`${oneYearAhead}-01-10T14:00:00.000Z`),
  schedulingSlotId: schedulingSlotIdForServiceGroupAvailFixture,
}

// for get serviceProviders list with firstAvailDay
export const serviceGroupAvailabilityProviderPage1Fixture: ServiceGroupAvailGenerationDataInput = {
  days: 1,
  idPrefix: 2,
  serviceProviderIds: [
    serviceProviderAppointmentsFixtureId,
    serviceProviderAppointmentsLengthFixtureId,
    serviceProviderRepeatConfigFixtureId,
    serviceProviderForIsEditableFixtureId,
    serviceProviderWhichShouldNotShowAsDisabledForCareTeamFixture.id,
    serviceProviderForAutomaticSelectionFixture.id,
    mainServiceProviderForCareTeamFixture.id,
    secondaryServiceProviderForCareTeamFixture.id,
    serviceProviderForBookingFlowFixture.id,
  ],
  serviceGroupId: serviceGroupFixtureId,
  startTime: dateTimeUtil.toDate(`${oneYearAhead}-01-11T13:00:00.000Z`),
  endTimeGeneration: dateTimeUtil.toDate(`${oneYearAhead}-01-11T14:00:00.000Z`),
  schedulingSlotId: schedulingSlotIdForServiceGroupAvailFixture,
}

export const serviceGroupAvailabilityProviderPage2Fixture: ServiceGroupAvailGenerationDataInput = {
  days: 1,
  idPrefix: 3,
  serviceProviderIds: [
    serviceProviderForSerGroupAvailExtra1Fixture.id,
    serviceProviderForSerGroupAvailExtra2Fixture.id,
    serviceProviderForSerGroupAvailExtra3Fixture.id,
  ],
  serviceGroupId: serviceGroupFixtureId,
  startTime: dateTimeUtil.toDate(`${oneYearAhead}-01-12T13:00:00.000Z`),
  endTimeGeneration: dateTimeUtil.toDate(`${oneYearAhead}-01-12T14:00:00.000Z`),
  schedulingSlotId: schedulingSlotIdForServiceGroupAvailFixture,
}
