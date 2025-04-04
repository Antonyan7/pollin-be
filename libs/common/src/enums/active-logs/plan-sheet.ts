export enum PlanSheetFunctions {
  SetFirstDate = 'SetFirstDate',
  AddPlanSheetNote = 'AddPlanSheetNote',
  SignOffPlanSheetDate = 'SignOffPlanSheetDate',
  AddSheetDay = 'AddSheetDay',
  RemoveSheetDay = 'RemoveSheetDay',
  UpdateSheetNote = 'UpdateSheetNote',
  SaveNoteHistory = 'SaveNoteHistory',
  GetHistory = 'GetHistory',
  GetChecklist = 'GetChecklist',
  GetActionList = 'GetActionList',
  GetWorksheet = 'GetWorksheet',
  GetWorksheetPropertyUpdates = 'GetWorksheetPropertyUpdates',
  GetWorksheetDropdownOptions = 'GetWorksheetDropdownOptions',
  AddDays = 'AddDays',
  UpdateActionList = 'UpdateActionList',
  GetOrCreateByPlanUUID = 'GetOrCreateByPlanUUID',
  UpdateActionListItems = 'UpdateActionListItems',
  GetPatientWorksheets = 'GetPatientWorksheets',
  GetWorksheetFileDefinition = 'GetWorksheetFileDefinition',
}
export enum PlanSheetActions {
  SetFirstDateFailed = 'SetFirstDateFailed',
  AddPlanSheetNoteFailed = 'AddPlanSheetNoteFailed',
  GetPatientPlanData = 'GetPatientPlanData',
  AddPlanSheetNote = 'AddPlanSheetNote',
  SignOffStaffNotFound = 'SignOffStaffNotFound',
  SignOffPlanSheetDateFailed = 'SignOffPlanSheetDateFailed',
  AddSheetDayFailed = 'AddSheetDayFailed',
  RemoveSheetDayFailed = 'RemoveSheetDayFailed',
  UpdateSheetNoteFailed = 'UpdateSheetNoteFailed',
  NoteUpdated = 'NoteUpdated',
  SaveNoteHistoryFailed = 'SaveNoteHistoryFailed',
  HistoryCreationNotRequired = 'HistoryCreationNotRequired',
  GetHistoryFailed = 'GetHistoryFailed',
  ChecklistNotFound = 'ChecklistNotFound',
  GetWorksheetFailed = 'GetWorksheetFailed',
  GetWorksheetData = 'GetWorksheetData',
  GetWorksheetPropertyUpdates = 'GetWorksheetPropertyUpdates',
  GetWorksheetDropdownOptionsFailed = 'GetWorksheetDropdownOptionsFailed',
  AddDaysFailed = 'AddDaysFailed',
  NoDaysToAdd = 'NoDaysToAdd',
  ActionListNotFound = 'ActionListNotFound',
  GetActionListFailed = 'GetActionListFailed',
  UpdateActionListFailed = 'UpdateActionListFailed',
  CreatePatientPlanSheet = 'CreatePatientPlanSheet',
  UpdateActionListItemsFailed = 'UpdateActionListItemsFailed',
  GetPatientWorksheetsFailed = 'GetPatientWorksheetsFailed',
  GetWorksheetFileDefinitionFailed = 'GetWorksheetFileDefinitionFailed',
}

export enum StimSheetFunctions {
  GetStimSheet = 'GetStimSheet',
  GetStimSheetDropdownOptions = 'GetStimSheetDropdownOptions',
  GetPlanStimSheetPropertyUpdates = 'GetPlanStimSheetPropertyUpdates',
  GetStimSheetCycleDetails = 'GetStimSheetCycleDetails',
  UpdateStimSheetCycleDetails = 'UpdateStimSheetCycleDetails',
  SignOffStimSheetDate = 'SignOffStimSheetDate',
}
export enum StimSheetActions {
  GetStimSheetFailed = 'GetStimSheetFailed',
  AddStimSheetNoteFailed = 'AddStimSheetNoteFailed',
  GetStimSheetDropdownOptionsFailed = 'GetStimSheetDropdownOptionsFailed',
  GetStimSheetData = 'GetStimSheetData',
  GetStimSheetCycleDetails = 'GetStimSheetCycleDetails',
  UpdateStimSheetCycleDetails = 'UpdateStimSheetCycleDetails',
  GetStimSheetCycleDetailsFailed = 'GetStimSheetCycleDetailsFailed',
  UpdateStimSheetCycleDetailsFailed = 'UpdateStimSheetCycleDetailsFailed',
  PatientDoesntHaveFemaleDetail = 'PatientDoesntHaveFemaleDetail',
}

export enum OBWorksheetFunctions {
  GetWorksheet = 'GetWorksheet',
}
export enum OBWorksheetActions {
  GetWorksheetData = 'GetWorksheetData',
  GetWorkSheetFailed = 'GetWorkSheetFailed',
}

export enum HCGWorksheetFunctions {
  GetWorksheet = 'GetWorksheet',
}
export enum HCGWorksheetActions {
  GetWorksheetData = 'GetWorksheetData',
  GetWorkSheetFailed = 'GetWorkSheetFailed',
}

export enum PrimingWorksheetFunctions {
  GetChecklist = 'GetChecklist',
  SignChecklistItem = 'SignChecklistItem',
  UpsertNote = 'UpsertNote',
}
export enum PrimingWorksheetActions {
  GetChecklistFailed = 'GetChecklistFailed',
  SignChecklistItemFailed = 'SignChecklistItemFailed',
  OldPatientChecklistItemFound = 'OldPatientChecklistItemFound',
  NoNeedInNoteCreation = 'NoNeedInNoteCreation',
  NoteWasNotChanged = 'NoteWasNotChanged',
  WrongNoteMetadata = 'WrongNoteMetadata',
}

export enum EPLWorksheetFunctions {
  GetWorksheet = 'GetWorksheet',
}
export enum EPLWorksheetActions {
  GetWorksheetData = 'GetWorksheetData',
  GetWorkSheetFailed = 'GetWorkSheetFailed',
}
