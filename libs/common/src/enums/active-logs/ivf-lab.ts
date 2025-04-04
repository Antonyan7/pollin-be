export enum IvfPatientsFunctions {
  UpdatePatientPlanCohortWithStaff = 'UpdatePatientPlanCohortWithStaff',
  GetPatientsWithIVFPlan = 'GetPatientsWithIVFPlan',
  SetCohortDate = 'SetCohortDate',
  GetPlanCancellationReasons = 'GetPlanCancellationReasons',
  GetPlanFilters = 'GetPlanFilters',
  GetCompletionMetadata = 'GetCompletionMetadata',
  GetPatientPlan = 'GetPatientPlan',
  CreatePlanEbmryoSpecimens = 'CreatePlanEbmryoSpecimens',
  GetPlanDispositionReasons = 'GetPlanDispositionReasons',
}
export enum DoubleWitnessFunctions {
  ManualWitness = 'ManualWitness',
  ScanBarcode = 'ScanBarcode',
  ResetScanDish = 'ResetScanDish',
  AddErrorReason = 'AddErrorReason',
}
export enum DoubleWitnessActions {
  ManualWitnessFailed = 'ManualWitnessFailed',
  ScanBarcodeFailed = 'ScanBarcodeFailed',
  ResetScanDishFailed = 'ResetScanDishFailed',
  AddErrorReasonFailed = 'AddErrorReasonFailed',
}

export enum IvfPatientsActions {
  UpdatePatientPlanCohortWithStaffFailed = 'UpdatePatientPlanCohortWithStaffFailed',
  GetPatientsWithIVFPlanFailed = 'GetPatientsWithIVFPlanFailed',
  SetCohortDateFailed = 'SetCohortDateFailed',
  RetrievingCancellationReasonsFailed = 'RetrievingCancellationReasonsFailed',
  GetPlanFiltersFailed = 'GetPlanFiltersFailed',
  GetCompletionMetadataFailed = 'GetPlanFiltersFailed',
  GetPatientPlanFailed = 'GetPatientPlanFailed',
  CreatePlanEbmryoSpecimensFailed = 'CreatePlanEbmryoSpecimensFailed',
  RetrievingPlanDispositionReasonsFailed = 'RetrievingPlanDispositionReasonsFailed',
}

export enum IvfPatientsHelperFunctions {
  GetIvfPatientsDTO = 'GetIvfPatientsDTO',
  SaveOocytesGroupPhotos = 'SaveOocytesGroupPhotos',
  GetEmbryologist = 'GetEmbryologist',
}

export enum IvfPlanTaskGroupFunctions {
  GetIvfPatientsDTO = 'GetIvfPatientsDTO',
}

export enum IvfPlanTaskGroupActions {
  AdditionalEmbryoAfterCompletion = 'AdditionalEmbryoAfterCompletion',
}

export enum IvfPatientsHelperActions {
  MoreThanOneOriginalCohort = 'MoreThanOneOriginalCohort',
  MoreThanOneActive = 'MoreThanOneActive',
  NoActive = 'NoActive',
  NoDocumentCategory = 'NoDocumentCategory',
  EmbryologistWasNotChanged = 'EmbryologistWasNotChanged',
}

export enum IvfTasksFunctions {
  GetNewUpdatesCount = 'GetNewUpdatesCount',
  GetIVFLabTaskGroup = 'GetIVFLabTaskGroup',
  SignOffIVFLabTask = 'SignOffIVFLabTask',
  SignOffIVFDay = 'SignOffIVFDay',
  SubmitTaskDetails = 'SubmitTaskDetails',
  GetGrades = 'GetGrades',
  ProcessEmbryoAndAttachments = 'ProcessEmbryoAndAttachments',
  GetIvfTasks = 'GetIvfTasks',
  SetCohortStartDate = 'SetCohortStartDate',
  SavePostStripping = 'SavePostStripping',
  GetPlanUpdates = 'GetPlanUpdates',
  SaveHistory = 'SaveHistory',
  GetHistory = 'GetHistory',
  ScanDish = 'ScanDish',
  ProcessOocytes = 'ProcessOocytes',
  ProcessStraws = 'ProcessStraws',
  UpsertNote = 'UpsertNote',
  ValidateRequiredFieldsForSignOffDay = 'ValidateRequiredFieldsForSignOffDay',
}

export enum IvfTasksActions {
  GetNewUpdatesCountFailed = 'GetNewUpdatesCountFailed',
  GetIVFLabTaskGroupFailed = 'GetIVFLabTaskGroupFailed',
  GetIVFLabTasksFailed = 'GetIVFLabTasksFailed',
  SignOffIVFLabTaskFailed = 'SignOffIVFLabTaskFailed',
  SignOffIVFDayFailed = 'SignOffIVFDayFailed',
  SubmitTaskDetailsFailed = 'SubmitTaskDetailsFailed',
  GetGradesFailed = 'GetGradesFailed',
  ProcessEmbryoAndAttachmentsFailed = 'ProcessEmbryoAndAttachmentsFailed',
  GetIvfTasksFailed = 'GetIvfTasksFailed',
  UpdateCohortDate = 'UpdateCohortDate',
  CreateTaskGroupAndSummary = 'CreateTaskGroupAndSummary',
  GetPlanFailed = 'GetPlanFailed',
  SaveHistoryFailed = 'SaveHistoryFailed',
  GetHistoryFailed = 'GetHistoryFailed',
  ScanDishFailed = 'ScanDishFailed',
  StrawCantBeRemoved = 'StrawCantBeRemoved',
  NoNeedInNoteCreation = 'NoNeedInNoteCreation',
  UnsupportedNoteTaskType = 'UnsupportedNoteTaskType',
  NoteWasNotChanged = 'NoteWasNotChanged',
  WrongNoteMetadata = 'WrongNoteMetadata',
  ValidateDayPropsFailed = 'ValidateDayPropsFailed',
  ValidateDetailsPropsFailed = 'ValidateDetailsPropsFailed',
  ValidateOocyteCollectedEligibility = 'ValidateOocyteCollectedEligibility',
}

export enum DailyViewFunctions {
  GetIvfPatientsFromCohortDTO = 'GetIvfPatientsFromCohortDTO',
}

export enum DailyViewActions {
  NotMatchedDayReturnedFromDB = 'NotMatchedDayReturnedFromDB',
}
