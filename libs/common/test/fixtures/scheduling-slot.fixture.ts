/* eslint-disable max-lines */
import {
  secondaryServiceProviderForCareTeamFixture,
  serviceProviderAppointmentsFixture,
  serviceProviderFixture,
  serviceProviderForAppointmentsLengthFixture,
  serviceProviderForAutomaticSelectionEarlierFixture,
  serviceProviderForAutomaticSelectionFixture,
  serviceProviderForBookingFlowFixture,
  serviceProviderForIsEditableFixture,
  serviceProviderForMobileFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {
  serviceTypeBookingIntentFixture,
  serviceTypeFixture,
  serviceTypeForAvailabilityFixture,
  serviceTypeForClinicScheduleDatesFixture,
  serviceTypeForSpecificDatesBookingFixture,
  serviceTypeWithAutomaticSelectionFixture,
  serviceTypeWithAutomaticSelectionOverlayFixture,
  serviceTypeWithDuration25Fixture,
  serviceTypeWithDuration30Fixture,
  serviceTypeWithDuration40Fixture,
  serviceTypeWithminimumHoursRequiredFixture,
  serviceTypeWithOhipBillingCodeFixture,
  serviceTypeWithOneSlotFixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {SchedulingSlot, SlotStatus} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  cartSlotForMultipleTypesFixture,
  prefixcartSlotServiceTypeDuration30Fixture,
  slotCheckouApptForServiceGroupFixture,
  slotCorrectTimeFixtureCartConfirm,
  slotDifferentCategoryItemAndCategoryItemId,
  slotForIsEditableFixture,
  slotInvalidDurationFixtureCartConfirm,
  slotServiceTypeFixture,
  slotTimeNotAvailable,
  slotValidCheckPaymentFixture,
  slotValidFixture,
  slotValidFixtureCartConfirm,
  slotValidFixtureCartConfirmFail,
  slotValidFixtureForOhipBilled,
  slotValidFixtureForOhipBilledGroupFixture,
  slotValidRevisionFixtureCartConfirm,
  slotWhenUTCTimeOnAnotherTimeThanClinicFixture,
  slotWithoutServiceCategoryIdFixture,
  validSlotPatientPriceCheckFixture,
} from '@libs/common/test/fixtures/slot-id-model.fixture'
import {DateTimeUtil} from '@libs/common'
import {SlotGenerationDataInput} from '@seeds/typeorm'
import {Config} from '@config/config.util'
import {nextYear} from '@libs/common/test/fixtures/appointment.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))
const slotsStartTime: Date = dateTimeUtil.now()
const currentIsoDate: string = dateTimeUtil.formatIsoDate()
const currentYear: number = dateTimeUtil.getYear()
const oneYearAhead: number = dateTimeUtil.getYear() + 1
const oneMonthAhead: string = dateTimeUtil.formatIsoDate(
  dateTimeUtil.addMonths(dateTimeUtil.now(), 1),
)
const twoYearsAhead: number = dateTimeUtil.getYear() + 2
const fourYearsAhead: number = dateTimeUtil.getYear() + 4
const twentyOneYersAhead: number = dateTimeUtil.getYear() + 21

export const schedulingSlotFixtureSuccess: Partial<SchedulingSlot> = {
  id: 1,
  uuid: slotValidFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate(`${oneMonthAhead}T11:20:00.000Z`),
  endTime: dateTimeUtil.toDate(`${oneMonthAhead}T12:30:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotFixtureWithoutAppointment: Partial<SchedulingSlot> = {
  id: 2,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110004',
  serviceProviderId: serviceProviderAppointmentsFixture.id,
  startTime: dateTimeUtil.toDate(`${currentIsoDate}T12:20:00.000Z`),
  endTime: dateTimeUtil.toDate(`${currentIsoDate}T12:30:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotGenerationData: SlotGenerationDataInput = {
  prefix: 'slots',
  days: 7,
  startDateAndTime: dateTimeUtil.toDate('2030-08-23T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-08-23T11:50:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotGenerationDataForServiceGroup: SlotGenerationDataInput = {
  prefix: 'slots-for-service-group',
  days: 7,
  startDateAndTime: dateTimeUtil.toDate('2030-08-23T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-08-23T11:50:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const slotGenerationSkip: SlotGenerationDataInput = {
  prefix: 'skip-slots',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-09-24T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-09-24T12:10:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  skip: 5,
}

export const slotGenerationSkipForServiceGroup: SlotGenerationDataInput = {
  prefix: 'skip-slots-s-g',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-09-24T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-09-24T12:10:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  skip: 5,
}

export const slotGenerationFor30minutes: SlotGenerationDataInput = {
  prefix: 'slots-30-min',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-12-24T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-12-24T11:00:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  skip: 5,
}

export const serviceTypeSlotFixture: Partial<SchedulingSlot> = {
  id: 5,
  uuid: slotServiceTypeFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-01-02T11:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-01-02T12:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotDifferentCategoryItemAndCategoryItemIdSlot: Partial<SchedulingSlot> = {
  id: 345345345, // WARNING do not create ServiceType with  this id
  uuid: slotDifferentCategoryItemAndCategoryItemId.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate(`${currentIsoDate}T11:20:00.000Z`),
  endTime: dateTimeUtil.toDate(`${currentIsoDate}T12:30:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}

export const schedulingSlotFixtureCartConfirm: Partial<SchedulingSlot> = {
  id: 6,
  uuid: slotValidFixtureCartConfirm.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-01-01T12:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-01-01T12:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  appointmentCount: 10,
  maxAppointmentCount: 10,
}

export const schedulingSlotFixtureCartConfirmOhipBilled: Partial<SchedulingSlot> = {
  id: 7,
  uuid: slotValidFixtureForOhipBilled.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-01-01T13:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-01-01T13:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotGenerationDataForMenstrualPeriodConstraint: SlotGenerationDataInput = {
  prefix: 'PeriodsConstraint',
  days: 10,
  startDateAndTime: dateTimeUtil.toDate('2030-11-01T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-11-01T11:50:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const slotGenerationDataForMinimumHoursRequired: SlotGenerationDataInput = {
  prefix: 'minimumHoursRequired',
  days: 4,
  startDateAndTime: slotsStartTime,
  dailyEndTime: dateTimeUtil.addMinutes(slotsStartTime, 80),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotFixtureSlotTimeNotAvailable: Partial<SchedulingSlot> = {
  id: 8,
  uuid: slotTimeNotAvailable.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-01-01T13:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-01-01T13:40:00.000Z'),
  status: SlotStatus.Busy,
  serviceTypeId: serviceTypeFixture.id,
}

export const schedulingSlotSecondFixtureCartConfirm: Partial<SchedulingSlot> = {
  id: 9,
  uuid: slotValidFixtureCartConfirm.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-01-01T12:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-01-01T12:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}
export const schedulingSlotThirdFixtureCartConfirm: Partial<SchedulingSlot> = {
  id: 10,
  uuid: slotValidFixtureCartConfirm.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-01-01T12:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-01-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotFixtureFirstSlotTimeAvailable: Partial<SchedulingSlot> = {
  id: 11,
  uuid: slotInvalidDurationFixtureCartConfirm.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-02-01T13:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-02-01T13:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
}

export const schedulingSlotFixtureSecondSlotTimeNotAvailable: Partial<SchedulingSlot> = {
  id: 12,
  uuid: 'slotInValidCartConfirmUUID1',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-02-01T13:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-02-01T13:50:00.000Z'),
  status: SlotStatus.Busy,
  serviceTypeId: serviceTypeWithDuration40Fixture.id,
}

export const schedulingSlotSecondFixtureSuccess: Partial<SchedulingSlot> = {
  id: 13,
  uuid: slotValidFixture.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate(`${currentIsoDate}T11:30:00.000Z`),
  endTime: dateTimeUtil.toDate(`${currentIsoDate}T12:40:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}

export const schedulingSlotThirdFixtureSuccess: Partial<SchedulingSlot> = {
  id: 14,
  uuid: slotValidFixture.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate(`${currentIsoDate}T11:40:00.000Z`),
  endTime: dateTimeUtil.toDate(`${currentIsoDate}T12:50:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotGenerationDataForAvailability: SlotGenerationDataInput = {
  prefix: 'availability',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-08-24T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-08-24T11:00:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const slotGenerationDataForBookingFlow: SlotGenerationDataInput = {
  prefix: 'booking-flow',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-11-10T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-11-10T11:00:00Z'),
  serviceProviderId: serviceProviderForBookingFlowFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotGenerationDataForAutomaticProvider: SlotGenerationDataInput = {
  prefix: 'automatic-provider',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-11-10T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-11-10T12:00:00Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
}

export const slotGenerationDataForAutomaticProviderEarlier: SlotGenerationDataInput = {
  prefix: 'automatic-provider-earlier',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-11-11T10:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-11-11T12:00:00Z'),
  serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionFixture.id,
}

export const slotGenerationDataForAutomaticProviderWithOverlay: SlotGenerationDataInput = {
  prefix: 'auto-pr-overlay',
  days: 3,
  startDateAndTime: dateTimeUtil.toDate('2030-11-10T14:00:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-11-10T16:00:00Z'),
  serviceProviderId: serviceProviderForAutomaticSelectionEarlierFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionOverlayFixture.id,
}

export const slotGenerationDataForAutomaticProviderEarlierWithOverlay: SlotGenerationDataInput = {
  prefix: 'auto-pr-earlier-overlay',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate('2030-11-11T14:30:00Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-11-11T16:40:00Z'),
  serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionOverlayFixture.id,
}

export const slotForOhipBilledGroupCartFixture: Partial<SchedulingSlot> = {
  id: 15,
  uuid: slotValidFixtureForOhipBilledGroupFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-01-01T13:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-01-01T13:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithOhipBillingCodeFixture.id,
}

/** Should be NOT included for day:3 EST  ( year-01-03T01:00 UTC => year-01-02T20:00 EST ) */
export const slotTimeZoneEstDay2NotIncludeList: SlotGenerationDataInput = {
  prefix: 'slotTZEstDay2NotInclude',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-03T01:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-03T01:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAvailabilityFixture.id,
}

/** Should be included to day:3 EST  ( year-01-03T15:00 UTC => year-01-03T10:00 EST ) */
export const slotTimeZoneEstDay3Slot1IncludeList: SlotGenerationDataInput = {
  prefix: 'slotTZEstDay3Slot1Include',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-03T15:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-03T15:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAvailabilityFixture.id,
}

/** Should be included to day:3 EST  ( year-01-04T02:00 UTC => year-01-03T21:00 EST ) */
export const slotTimeZoneEstDay3Slot2IncludeList: SlotGenerationDataInput = {
  prefix: 'slotTZEstDay3Slot2Include',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-04T01:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-04T01:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAvailabilityFixture.id,
}

/** Should be NOT included for day:3 EST  ( year-01-04T07:00 UTC => year-01-04T02:00 EST ) */
export const slotTimeZoneEstDay4NotIncludeList: SlotGenerationDataInput = {
  prefix: 'slotTZEstDay4NotInclude',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-04T07:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${twoYearsAhead}-01-04T07:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAvailabilityFixture.id,
}

//  END fixtures slotTimeZone filtering

export const slotGenerationDataFor25minServiceType: SlotGenerationDataInput = {
  prefix: '25min',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2050-01-05T13:30:00.000Z'),
  dailyEndTime: dateTimeUtil.toDate('2050-01-05T14:10:00.000Z'),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration25Fixture.id,
}

export const slotUTCDateDifferentFromClinicFixture: Partial<SchedulingSlot> = {
  id: 20,
  uuid: slotWhenUTCTimeOnAnotherTimeThanClinicFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2066-01-02T01:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2066-01-02T01:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}
export const schedulingSlotWithoutServiceCategoryIdFixture: Partial<SchedulingSlot> = {
  id: 21,
  uuid: slotWithoutServiceCategoryIdFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2066-01-02T01:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2066-01-02T01:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}
export const slotForIsEditableFalseFixture: Partial<SchedulingSlot> = {
  id: 22,
  uuid: slotForIsEditableFixture.schedulingSlotId,
  serviceProviderId: serviceProviderForIsEditableFixture.id,
  startTime: dateTimeUtil.toDate('2066-01-02T01:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2066-01-02T01:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}
export const slotServiceTypeCreateApptFixture: Partial<SchedulingSlot> = {
  id: 23,
  uuid: slotCheckouApptForServiceGroupFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate(`${twentyOneYersAhead}-01-02T11:20:00.000Z`),
  endTime: dateTimeUtil.toDate(`${twentyOneYersAhead}-01-02T12:30:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}
export const slots8PmEstFixture: SlotGenerationDataInput = {
  prefix: 'slots8PmEstFixture',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-01T02:10:00.000Z`), // it is prev month and prev day for EST
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-01T02:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}
export const schedulingSlotFixture: Partial<SchedulingSlot> = {
  id: 24,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac640006',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2031-08-02T11:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2031-08-02T11:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}
export const schedulingSlotServiceGroupBookingFlowFixture: Partial<SchedulingSlot> = {
  id: 25,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac644789',
  serviceProviderId: serviceProviderForBookingFlowFixture.id,
  startTime: dateTimeUtil.toDate('2031-08-02T11:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2031-08-02T11:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeFixture.id,
}
export const schedulingSlotServiceTypeBookingFlowFixture: Partial<SchedulingSlot> = {
  id: 26,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac647364',
  serviceProviderId: serviceProviderForBookingFlowFixture.id,
  startTime: dateTimeUtil.toDate('2032-10-02T11:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2032-10-02T11:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeBookingIntentFixture.id,
}
export const schedulingSlotFirstFixtureCartConfirmFail: Partial<SchedulingSlot> = {
  id: 110,
  uuid: slotValidFixtureCartConfirmFail.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2052-01-01T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2052-01-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}
export const schedulingSlotSecondFixtureCartConfirmFail: Partial<SchedulingSlot> = {
  id: 111,
  uuid: slotValidFixtureCartConfirmFail.schedulingSlotId + '1',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2052-01-01T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2052-01-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}
export const schedulingSlotThirdFixtureCartConfirmFail: Partial<SchedulingSlot> = {
  id: 112,
  uuid: slotValidFixtureCartConfirmFail.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2052-01-01T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2052-01-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}
export const schedulingSlotFirstMultipleTypesCartConfirm: Partial<SchedulingSlot> = {
  id: 113,
  uuid: cartSlotForMultipleTypesFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2053-01-01T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2053-01-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}
export const schedulingSlotSecondMultipleTypesCartConfirm: Partial<SchedulingSlot> = {
  id: 114,
  uuid: cartSlotForMultipleTypesFixture.schedulingSlotId + '1',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2053-01-01T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2053-01-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}
export const schedulingSlotThirdMultipleTypesCartConfirm: Partial<SchedulingSlot> = {
  id: 115,
  uuid: cartSlotForMultipleTypesFixture.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2053-01-01T12:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2053-01-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotIdForServiceGroupAvailFixture: number = 28
export const schedulingSlotForServiceGroupAvailFixture: Partial<SchedulingSlot> = {
  id: schedulingSlotIdForServiceGroupAvailFixture,
  uuid: 'cgc908f5-13gd-11ed-814e-0242ac647364',
  startTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-03T10:00:00.000Z`),
  endTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-03T10:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotGenerationDataForAutomaticProviderOneSlot: SlotGenerationDataInput = {
  prefix: 'auto-pr-one',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-02T12:10:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-02T12:50:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionOverlayFixture.id,
}
export const slotGenerationDataForAutomaticProviderOneSlotEarlier: SlotGenerationDataInput = {
  prefix: 'auto-pr-one-earlier',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-02T12:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-02-02T12:40:00.000Z`),
  serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
  serviceTypeId: serviceTypeWithAutomaticSelectionOverlayFixture.id,
}
export const slotForServiceTypeWithMinimumHoursRequiredFixture: SlotGenerationDataInput = {
  prefix: 'min-hour-req',
  days: 5,
  startDateAndTime: dateTimeUtil.toDate(
    `${dateTimeUtil.formatDateYMD(dateTimeUtil.now())}T12:00:00.000Z`,
  ),
  dailyEndTime: dateTimeUtil.toDate(
    `${dateTimeUtil.formatDateYMD(dateTimeUtil.now())}T13:00:00.000Z`,
  ),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithminimumHoursRequiredFixture.id,
}
export const slotForCreateAppointmentFromWebFixture: SlotGenerationDataInput = {
  prefix: 'create-appt-web',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${oneYearAhead}-05-05T14:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${oneYearAhead}-05-05T15:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotForUpdateAndLaterCancelAppointmentFromWebFixture: SlotGenerationDataInput = {
  prefix: 'update-appt-web',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${oneYearAhead}-06-05T14:00:00.000Z`), //next month
  dailyEndTime: dateTimeUtil.toDate(`${oneYearAhead}-06-05T15:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

export const slotForCartStDur30AndMaxApptCountIs2Fixture: SlotGenerationDataInput = {
  prefix: prefixcartSlotServiceTypeDuration30Fixture,
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-09-13T10:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-09-13T11:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  maxAppointmentCount: 2,
}
export const slotForCreateApptAndChangeIntoNoShowFixture: SlotGenerationDataInput = {
  prefix: 'noShow-appt-web',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(dateTimeUtil.toDate(`${oneYearAhead}-07-05T14:00:00.000Z`)),
  dailyEndTime: dateTimeUtil.toDate(dateTimeUtil.toDate(`${oneYearAhead}-07-05T15:00:00.000Z`)),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}
export const slotForWebAppCreatingAndEditWithMaxApptCountIs2Fixture: SlotGenerationDataInput = {
  prefix: '2appt-web-avail',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-11-17T12:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-11-17T16:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  maxAppointmentCount: 2,
}
export const slotForWebAppLinkedRecursesFixture: SlotGenerationDataInput = {
  prefix: '2appt-web-linked-avail',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-11-17T12:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-11-17T16:00:00.000Z`),
  serviceProviderId: serviceProviderAppointmentsFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  maxAppointmentCount: 1,
}

export const slotForWebAppLinkedRecursesSecondFixture: SlotGenerationDataInput = {
  prefix: '2appt-web-linked2-avail',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-11-17T12:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-11-17T16:00:00.000Z`),
  serviceProviderId: serviceProviderForAppointmentsLengthFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  maxAppointmentCount: 2,
}

export const slotForForMilestoneIdFixture: SlotGenerationDataInput = {
  prefix: 'milestoneId-slot',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${currentYear}-08-24T12:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${currentYear}-08-24T16:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  maxAppointmentCount: 2,
}
export const slotsForNextYearInUTCFixture: SlotGenerationDataInput = {
  prefix: 'next-year-utc',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead + 1}-01-01T01:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead + 1}-01-01T01:30:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForAvailabilityFixture.id,
}
export const slotForBookingFlowServiceTypeFixture: Partial<SchedulingSlot> = {
  id: 222,
  uuid: 'slotForBookingFlowServiceType',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate(`${fourYearsAhead}-01-02T13:20:00.000Z`),
  endTime: dateTimeUtil.toDate(`${fourYearsAhead}-01-02T13:30:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithOneSlotFixture.id,
}

export const slotsForSpecificDatesBookingFixture: SlotGenerationDataInput = {
  prefix: 'specific-dates',
  days: 12,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-25T13:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-25T13:20:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForSpecificDatesBookingFixture.id,
}

export const slotsForSpecificDatesBookingClinicFixture: SlotGenerationDataInput = {
  prefix: 'specific-dates-cl',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-25T13:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-25T13:10:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeForClinicScheduleDatesFixture.id,
}

export const schedulingSlotSpecificDateAutomaticSelectionFixture: Partial<SchedulingSlot> = {
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-25T13:10:00.000Z`),
  endTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-25T13:20:00.000Z`),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeForClinicScheduleDatesFixture.id,
}

export const slotsForSpecificDatesBookingAutomaticSelectionFixture: SlotGenerationDataInput = {
  prefix: 'specific-dates-auto',
  days: 2,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-29T13:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-03-29T13:20:00.000Z`),
  serviceProviderId: serviceProviderForAutomaticSelectionFixture.id,
  serviceTypeId: serviceTypeForClinicScheduleDatesFixture.id,
}

export const schedulingSlotPatientSexAtBirthFixture: Partial<SchedulingSlot> = {
  uuid: validSlotPatientPriceCheckFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-02-01T12:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-02-01T12:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}
export const schedulingSlotSecondPatientSexAtBirthFixture: Partial<SchedulingSlot> = {
  uuid: validSlotPatientPriceCheckFixture.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-02-01T12:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-02-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotThirdPatientSexAtBirthFixture: Partial<SchedulingSlot> = {
  uuid: validSlotPatientPriceCheckFixture.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-02-01T12:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-02-01T12:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  appointmentCount: 10,
  maxAppointmentCount: 10,
}

export const schedulingSlotCheckPaymentFixtureFixture: Partial<SchedulingSlot> = {
  uuid: slotValidCheckPaymentFixture.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-03-01T12:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-03-01T12:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotSecondCheckPaymentFixtureFixture: Partial<SchedulingSlot> = {
  uuid: slotValidCheckPaymentFixture.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-03-01T12:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-03-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotThirdCheckPaymentFixtureFixture: Partial<SchedulingSlot> = {
  uuid: slotValidCheckPaymentFixture.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-03-01T12:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-03-01T12:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  appointmentCount: 10,
  maxAppointmentCount: 10,
}

export const schedulingSlotValidRevisionFixtureCartConfirm: Partial<SchedulingSlot> = {
  uuid: slotValidRevisionFixtureCartConfirm.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-04-01T12:30:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-04-01T12:40:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotSecondValidRevisionFixtureCartConfirm: Partial<SchedulingSlot> = {
  uuid: slotValidRevisionFixtureCartConfirm.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-04-01T12:40:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-04-01T12:50:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotThirdValidRevisionFixtureCartConfirm: Partial<SchedulingSlot> = {
  uuid: slotValidRevisionFixtureCartConfirm.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-04-01T12:50:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-04-01T13:00:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  appointmentCount: 10,
  maxAppointmentCount: 10,
}

export const schedulingSlotCorrectTimeFixtureCartConfirm: Partial<SchedulingSlot> = {
  uuid: slotCorrectTimeFixtureCartConfirm.schedulingSlotId,
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-04-01T13:00:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-04-01T13:10:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  appointmentCount: 0,
}

export const schedulingSlotCorrectTimeSecondFixtureCartConfirm: Partial<SchedulingSlot> = {
  uuid: slotCorrectTimeFixtureCartConfirm.schedulingSlotId + '2',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-04-01T13:10:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-04-01T13:20:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
}

export const schedulingSlotCorrectTimeThirdFixtureCartConfirm: Partial<SchedulingSlot> = {
  uuid: slotCorrectTimeFixtureCartConfirm.schedulingSlotId + '3',
  serviceProviderId: serviceProviderFixture.id,
  startTime: dateTimeUtil.toDate('2050-04-01T13:20:00.000Z'),
  endTime: dateTimeUtil.toDate('2050-04-01T13:30:00.000Z'),
  status: SlotStatus.Free,
  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  appointmentCount: 0,
  maxAppointmentCount: 10,
}

export const slotWithBlockForCreateAndLaterCancelAppFixture: SlotGenerationDataInput = {
  prefix: 'slot-block-web',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${oneYearAhead}-07-05T14:00:00.000Z`), //next month
  dailyEndTime: dateTimeUtil.toDate(`${oneYearAhead}-07-05T15:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  status: SlotStatus.Blocked,
}

export const slotWithServiceProviderUpdate: SlotGenerationDataInput = {
  prefix: 'slotNextYearBusy',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  dailyEndTime: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  serviceProviderId: serviceProviderForBookingFlowFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  status: SlotStatus.Busy,
}

export const slotWithServiceProviderUpdateFree: SlotGenerationDataInput = {
  prefix: 'slotNextYearFree',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  dailyEndTime: dateTimeUtil.toDate(`${nextYear}-06-17T04:24:00`),
  serviceProviderId: secondaryServiceProviderForCareTeamFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  status: SlotStatus.Free,
}

export const slotForCartStDur40AndMaxApptCountIs2Fixture: SlotGenerationDataInput = {
  prefix: 2 + prefixcartSlotServiceTypeDuration30Fixture,
  days: 1,
  startDateAndTime: dateTimeUtil.toDate(`${fourYearsAhead}-09-13T10:00:00.000Z`),
  dailyEndTime: dateTimeUtil.toDate(`${fourYearsAhead}-09-13T11:00:00.000Z`),
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeWithDuration40Fixture.id, //diff ServiceType
  maxAppointmentCount: 2,
}

export const slotTimeOffBlockOverlapFixture: SlotGenerationDataInput = {
  prefix: 'overlap',
  days: 1,
  startDateAndTime: dateTimeUtil.toDate('2030-05-06T13:00:00.000Z'),
  dailyEndTime: dateTimeUtil.toDate('2030-05-06T14:00:00.000Z'),
  serviceProviderId: serviceProviderForMobileFixture.id,
  serviceTypeId: serviceTypeFixture.id, //diff ServiceType
  maxAppointmentCount: 2,
  status: SlotStatus.TimeOffBlock,
}
