export enum ServiceCategoryFunctions {
  GetServiceCategory = 'GetServiceCategory',
  GetServiceCategoryItemById = 'GetServiceCategoryItemById',
  GetServiceCategoryItemByUUID = 'GetServiceCategoryItemByUUID',
  CheckIrregularPeriod = 'CheckIrregularPeriod',
  GetServiceCategories = 'GetServiceCategories',
}
export enum ServiceCategoryActions {
  GetServiceCategoryItemByIdFailed = 'GetServiceCategoryItemByIdFailed',
  GetServiceCategoryItemServiceGroupFound = 'GetServiceCategoryItemServiceGroupFound',
  GetServiceCategoryItemServiceTypeFound = 'GetServiceCategoryItemServiceTypeFound',
  GetServiceCategoryNotFound = 'GetServiceCategoryNotFound',
  GetServiceCategory = 'GetServiceCategory',
  GetServiceCategoryFailed = 'GetServiceCategoryFailed',
  ServiceCategoryItemTypeIsNull = 'ServiceCategoryItemTypeIsNull',
  ServiceCategoryItemNotFound = 'ServiceCategoryItemNotFound',
  GetServiceCategoryItemById = 'GetServiceCategoryItemById',
  EnabledIrregularPeriodChecking = 'EnabledIrregularPeriodChecking',
  GetServiceCategoriesFailed = 'GetServiceCategoriesFailed',
}

export enum ServiceCategoryItemFunctions {
  ValidateReturnLenght = 'ValidateReturnLenght',
  GetBookingIntent = 'GetBookingIntent',
  GetServiceCategory = 'GetServiceCategory',
}

export enum ServiceCategoryItemFunctionsActions {
  ValidateReturnLenghtFailed = 'ValidateReturnLenghtFailed',
  GetBookingIntentFailed = 'GetBookingIntentFailed',
  GetServiceCategoryFailed = 'GetServiceCategory',
}
