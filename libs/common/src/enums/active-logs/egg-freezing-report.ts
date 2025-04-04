export enum PatientEggFreezingReportFunctions {
  CreateEggFreezingReportOnIvfTaskSigned = 'CreateEggFreezingReportOnIvfTaskSigned',
  UploadEggFreezingDocumentToStorage = 'UploadEggFreezingDocumentToStorage',
  CreatedAndSaveEggFreezingPdf = 'CreatedAndSaveEggFreezingPdf',
  CreateEggFreezingPDF = 'CreateEggFreezingPDF',
  DeleteEggFreezingDocumentFromStorage = 'DeleteEggFreezingDocumentFromStorage',
}

export enum PatientEggFreezingReportActions {
  InternalError = 'InternalError',
  StartMethod = 'StartMethod',
  Info = 'Info',
  DataIssue = 'DataIssue',
}
