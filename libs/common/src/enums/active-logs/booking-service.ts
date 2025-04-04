export enum BookingIntentServiceFunctions {
  CreateBookingIntent = 'CreateBookingIntent',
  BookingIntentCreated = 'CreateBookingIntentCreated',
  UpdateBookingIntent = 'UpdateBookingIntent',
  DeleteAllPrevBookingIntent = 'DeleteAllPrevBookingIntent',
  BookingFlowDetails = 'BookingFlowDetails',
  GetAutomaticServiceProvider = 'GetAutomaticServiceProvider',
}

export enum BookingIntentServiceAction {
  GetServiceCategory = 'GetServiceCategory',
  UpdateBookingIntent = 'UpdateBookingIntent',
  BookingFlowDetailsFailed = 'BookingFlowDetailsFailed',
  BookingFlowDetails = 'BookingFlowDetails',
  UpdateBookingIntentFailed = 'UpdateBookingIntentFailed',
  GetAutomaticServiceProvider = 'GetAutomaticServiceProvider',
  AddServiceCategoryItemToBookingData = 'AddServiceCategoryItemToBookingData',
}
