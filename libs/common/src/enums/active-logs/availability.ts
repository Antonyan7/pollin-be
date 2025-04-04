export enum AvailabilityFunctions {
  GetAvailableDays = 'GetAvailableDays',
  GetAvailableDaysV2 = 'GetAvailableDaysV2',
  GetBookingIntent = 'GetBookingIntent',
  GetAvailableDaySlots = 'GetAvailableDaySlots',
  GetAvailableDaySlotsV2 = 'GetAvailableDaySlotsV2',
  GetAvailDaysForServiceGroup = 'GetAvailDaysForServiceGroup',
  FilterDaySlotsByDuration = 'FilterDaySlotsByDuration',
}

export enum AvailabilityActions {
  BookingIntentNotFound = 'GetBookingIntentNotFound',
  GetAvailableDaysFailed = 'GetAvailableDaysFailed',
  GetAvailableDaySlotsFailed = 'GetAvailableDaySlotsFailed',
  GetAvailableDaySlotsV2Failed = 'GetAvailableDaySlotsV2Failed',
  FreeSlotNotFound = 'FreeSlotNotFound',
  GetSlotsOfDay = 'GetSlotsOfDay',
  GetAvailableDays = 'GetAvailableDays',
  GetFilteredAvailableDays = 'GetFilteredAvailableDays',
  GetAvailableDaySlots = 'GetAvailableDaySlots',
  FirstAvailableDayNotFound = 'FirstAvailableDayNotFound',
  DateIsNotAllowed = 'DateIsNotAllowed',
}
