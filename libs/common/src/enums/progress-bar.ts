export enum ProgressBarEnum {
  QuestionnaireWithBookingFlow = 'QuestionnaireWithBookingFlow',
  Questionnaire = 'Questionnaire',
  ServiceCategoryItems = 'ServiceCategoryItems',
  ServiceProvider = 'ServiceProvider',
  Calendar = 'Calendar',
  Checkout = 'Checkout',
}
export const ProgressBarPercent = new Map<ProgressBarEnum, number>([
  [ProgressBarEnum.QuestionnaireWithBookingFlow, 50],
  [ProgressBarEnum.Questionnaire, 100],
  [ProgressBarEnum.ServiceCategoryItems, 25],
  [ProgressBarEnum.ServiceProvider, 50],
  [ProgressBarEnum.Calendar, 75],
  [ProgressBarEnum.Checkout, 100],
])
export enum QuestionnairePosition {
  First = 'first',
  Middle = 'middle',
  Last = 'last',
}
