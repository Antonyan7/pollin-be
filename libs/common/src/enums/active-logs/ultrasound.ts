export enum UltrasoundFunctions {
  CreateUltrasound = 'CreateUltrasound',
  UpdateTniIds = 'UpdateTniIds',
  GetDiagnosticImagingTestResultsStatuses = 'GetDiagnosticImagingTestResultsStatuses',
  CreateObUltrasound = 'CreateObUltrasound',
  UpdateUltrasoundResultCompletedCondition = 'UpdateUltrasoundResultCompletedCondition',
  GetObUltrasound = 'GetObUltrasound',
  GetTestResult = 'GetTestResult',
  CreateUterus = 'CreateUterus',
  CreateOvariesAndCysts = 'CreateOvariesAndCysts',
  RemoveCystsByOvaryMeasurementId = 'RemoveCystsByOvaryMeasurementId',
  CreateOrUpdateCysts = 'CreateOrUpdateCysts',
  FilterAndRemoveOvaryMeasurementCysts = 'FilterAndRemoveOvaryMeasurementCysts',
  CreateAttachments = 'CreateAttachments',
  ValidatePayload = 'ValidatePayload',
  ValidateSizesAndCountOfFollicles = 'ValidateSizesAndCountOfFollicles',
  ValidateSizesAndCountOfCysts = 'ValidateSizesAndCountOfCysts',

  GetUltrasoundDetail = 'GetUltrasoundDetail',
  GetUltrasoundFolliclesDropdownOptions = 'GetUltrasoundFolliclesDropdownOptions',

  GetDiagnosticImagingList = 'GetDiagnosticImagingList',
  GetDiagnosticImagingListFilters = 'GetDiagnosticImagingListFilters',
  ValidatePropertiesForUterus = 'ValidatePropertiesForUterus',
  ValidateOvary = 'ValidateOvary',
  ValidateFolliclesMoreThanOneCm = 'ValidateFolliclesMoreThanOneCm',

  GetOHSSUltrasoundTestResultDetails = 'GetOHSSUltrasoundTestResultDetails',
  GetOHSSOvaryMeasurementDto = 'GetOHSSOvaryMeasurementDto',
  SubmitOHSSUltrasoundTestResult = 'SubmitOHSSUltrasoundTestResult',
  SaveOHSSFluidMeasurement = 'SaveOHSSFluidMeasurement',
  SaveOHSSOvaryMeasurements = 'SaveOHSSOvaryMeasurements',

  HandlerForDicomReport = 'HandlerForDicomReport',

  HandleAppointmentCompletion = 'HandleAppointmentCompletion',
}

export enum UltrasoundActions {
  DeleteOvaryCystMeasurements = 'DeleteOvaryCystMeasurements',
  CreateOrUpdateCystMeasurements = 'CreateOrUpdateCystMeasurements',
  CreateUltrasoundFailed = 'CreateUltrasoundFailed',
  UpdateUltrasoundResultCompletedConditionFailed = 'UpdateUltrasoundResultCompletedConditionFailed',
  UpdateTniIdsFailed = 'UpdateTniIdsFailed',
  GetDiagnosticImagingTestResultsStatusesFailed = 'GetDiagnosticImagingTestResultsStatusesFailed',
  CreateObUltrasoundFailed = 'CreateObUltrasoundFailed',
  GetObUltrasoundFailed = 'GetObUltrasoundFailed',
  GetTestResultFailed = 'GetTestResultFailed',
  TestResultDoesntHaveAppointmentOrTestOrder = 'TestResultDoesntHaveAppointmentOrTestOrder',
  ValidateSizesAndCountOfFolliclesFailed = 'ValidateSizesAndCountfoFolliclesFailed',
  ValidateSizesAndCountOfCystsFailed = 'ValidateSizesAndCountfoCystsFailed',
  ValidatePayload = 'ValidatePayload',

  GetUltrasoundDetailFailed = 'GetUltrasoundDetailFailed',
  ValidateExistEntitiesAndReferences = 'ValidateExistEntitiesAndReferences',
  AppointmentNoFound = 'AppointmentNoFound',
  TestOrderThroughAppointmentNotFound = 'TestOrderThroughAppointmentNotFound',
  TestResultOvaryMeasurementsNotFound = 'TestResultOvaryMeasurementsNotFound',
  TestResultEitherRightOvaryEitherLeftOvaryNotFound = 'TestResultEitherRightOvaryEitherLeftOvaryNotFound',
  TestResulAttachmentsNotFound = 'TestResulAttachmentsNotFound',

  GetUltrasoundFolliclesDropdownOptionsFail = 'GetUltrasoundFolliclesDropdownOptionsFail',

  GetDiagnosticImagingListFailed = 'GetDiagnosticImagingListFailed',
  GetDiagnosticImagingListFiltersFailed = 'GetDiagnosticImagingListFiltersFailed',
  ValidatePropertiesForUterusFailed = 'ValidatePropertiesForUterusFailed',
  ValidateOvaryFailed = 'ValidateOvaryFailed',
  ValidateFolliclesMoreThanOneCmFailed = 'ValidateFolliclesMoreThanOneCmFailed',

  GetOHSSUltrasoundTestResultDetailsFailed = 'GetOHSSUltrasoundTestResultDetailsFailed',
  GetOHSSOvaryMeasurementDtoFailed = 'GetOHSSOvaryMeasurementDtoFailed',
  SubmitOHSSUltrasoundTestResultFailed = 'SubmitOHSSUltrasoundTestResultFailed',
  SaveOHSSFluidMeasurementFailed = 'SaveOHSSFluidMeasurementFailed',
  SaveOHSSOvaryMeasurementsFailed = 'SaveOHSSOvaryMeasurementsFailed',
  UltrasoundHistorySaveFailed = 'UltrasoundHistorySaveFailed',
  TNIIdentifierAlreadyProvided = 'TNIIdentifierAlreadyProvided',
  HandleAppointmentCompletionFailed = 'HandleAppointmentCompletionFailed',
}

export enum FinalReportFunctions {
  GetFinalReportList = 'GetFinalReportList',
  GetFinalReportFiltersListFilters = 'GetFinalReportFiltersListFilters',
  GetFinalReportDetails = 'GetFinalReportDetails',
  GetFinalReportFile = 'GetFinalReportFile',
  SubmitUltrasoundFinalReport = 'SubmitUltrasoundFinalReport',
}

export enum FinalReportActions {
  GetFinalReportListFailed = 'GetFinalReportListFailed',
  GetFinalReportFiltersListFiltersFailed = 'GetFinalReportFiltersListFiltersFailed',
  GetFinalReportDetailsFailed = 'GetFinalReportDetailsFailed',
  GetFinalReportFileFailed = 'GetFinalReportFileFailed',
  SubmitUltrasoundFinalReportFailed = 'SubmitUltrasoundFinalReportFailed',
}
