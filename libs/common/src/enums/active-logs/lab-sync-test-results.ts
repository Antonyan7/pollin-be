export enum LabSyncTestResultsFunctions {
  GetLabSyncResultsList = 'GetLabSyncResultsList',
  LinkToTestResult = 'LinkToTestResult',
  VoidResult = 'VoidResult',
  GetLabSyncResultAlerts = 'GetLabSyncResultAlerts',
  GetLabLastSyncAlert = 'GetLabLastSyncAlert',
  LinkAttachment = 'LinkAttachment',
  LinkMeasurement = 'LinkMeasurement',
  GetLabSyncTestResultsListFilters = 'GetLabSyncTestResultsListFilters',
}

export enum LabSyncTestResultsActions {
  GetLabSyncResultsListFailed = 'GetLabSyncResultsListFailed',
  LinkToTestResultFailed = 'LinkToTestResultFailed',
  PdfReportPathIsNull = 'PdfReportPathIsNull',
  VoidResultFailed = 'VoidResultFailed',
  GetLabSyncResultAlertNotFound = 'GetLabSyncResultAlertNotFound',
  GetLabSyncResultAlertsFailed = 'GetLabSyncResultAlertsFailed',
  GetLabLastSyncAlertFailed = 'GetLabLastSyncAlertFailed',
  LinkAttachmentFailed = 'LinkAttachmentFailed',
  FindUniversalCode = 'FindUniversalCode',
  MeasurementLinked = 'MeasurementLinked',
  MarkedWaitingForCompletion = 'MarkedWaitingForCompletion',
  GetLabSyncTestResultsListFilters = 'GetLabSyncTestResultsListFilters',
  GetLabSyncTestResultsListFiltersFailed = 'GetLabSyncTestResultsListFiltersFailed',
}
