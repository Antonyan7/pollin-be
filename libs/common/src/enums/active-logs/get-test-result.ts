export enum MobileTestResultsFunction {
  GetTestResults = 'GetTestResults',
}

export enum MobileTestResultsAction {
  CantFindPatient = 'CantFindPatient',
  ValidateTestKindToTestTypeOrTestPanel = 'ValidateTestKindToTestTypeOrTestPanel',
  GetTitle = 'GetTitle',
  GetPractitioner = 'GetPractitioner',
  GetDateLabel = 'GetDateLabel',
  GetDateLabelFailed = 'GetDateLabelFailed',
  GetTestResults = 'GetTestResults',
}

export enum MobileTestResultDetailFunction {
  GetTestResultDetail = 'GetTestResultDetail',
  GetTestDetailRangeResponse = 'GetTestDetailRangeResponse',
}

export enum MobileTestResultDetailAction {
  GetPractitioner = 'GetPractitioner',
  GetPractitionerFailed = 'GetPractitionerFailed',
  NotFoundTestResult = 'NotFoundTestResult',
  GetResults = 'GetResults',
  GetResultsFailed = 'GetResultsFailed',
  GetTestResultDetail = 'GetTestResultDetail',
  NotFoundObservationMetadata = 'NotFoundObservationMetadata',
}

export enum TestResultViewedFunction {
  TestResultViewed = 'TestResultViewed',
}

export enum TestResultViewedAction {
  TestResultViewed = 'TestResultViewed',
}
