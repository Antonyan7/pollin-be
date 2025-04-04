export enum ThyroidProtocolWorksheetFunctions {
  AddDays = 'AddDays',
  RemoveDay = 'RemoveDay',
  SignOff = 'SignOff',
  AddNote = 'AddNote',
  UpdateNote = 'UpdateNote',
  SaveThyroidProtocolHistory = 'SaveThyroidProtocolHistory',
  GetWorksheet = 'GetWorksheet',
}

export enum ThyroidProtocolWorksheetActions {
  AddDaysFailed = 'AddDaysFailed',
  RemoveDayFailed = 'RemoveDayFailed',
  PatientNotFound = 'PatientNotFound',
  AddNoteFailed = 'AddNoteFailed',
  UpdateNoteFailed = 'UpdateNoteFailed',
  SignOffFailed = 'SignOffFailed',
  SaveThyroidProtocolHistoryFailed = 'SaveThyroidProtocolHistoryFailed',
  SignOffStaffNotFound = 'SignOffStaffNotFound',
  GetWorksheetFailed = 'GetWorksheetFailed',
  NoDaysToAdd = 'NoDaysToAdd',
}

export enum ThyroidProtocolHistoryServiceFunctions {
  GetTestResultHistory = 'GetTestResultHistory',
  SaveHistory = 'SaveHistory',
  SaveTestResultHistory = 'SaveTestResultHistory',
}

export enum ThyroidProtocolHistoryServiceActions {
  GetTestResultHistoryFailed = 'GetTestResultHistoryFailed',
  SaveHistoryFailed = 'SaveHistoryFailed',
}

export enum ThyroidProtocolHistoryGeneratorServiceFunctions {
  GenerateDiffs = 'GenerateDiffs',
  GenerateDifference = 'GenerateDifference',
}

export enum ThyroidProtocolHistoryGeneratorServiceActions {
  GenerateDiffsFailed = 'GenerateDiffsFailed',
  NoChangesAppliedToThyroidProtocolResult = 'NoChangesAppliedToThyroidProtocolResult',
  GenerateDifferenceFailed = 'GenerateDifferenceFailed',
}
