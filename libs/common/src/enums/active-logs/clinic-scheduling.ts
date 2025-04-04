export enum ClinicSchedulingTemplatesFunctions {
  CreateSchedulingTemplate = 'CreateSchedulingTemplate',
  GetSchedulingTemplates = 'GetSchedulingTemplates',
  GetSchedulingTemplateList = 'GetSchedulingTemplateList',
  ApplyTemplate = 'ApplyTemplate',
  DuplicateTemplate = 'DuplicateTemplate',
  IsRepeatWeekDay = 'isRepeatWeekDay',
  DeleteSchedulingTemplates = 'DeleteSchedulingTemplates',
  UpdateSchedulingTemplate = 'UpdateSchedulingTemplate',
  OverridePeriods = 'OverridePeriods',
  RestorePrevTimeOffBlocks = 'RestorePrevTimeOffBlocks',
  BringSlotAppCountAndBusyStatusBack = 'BringSlotAppCountAndBusyStatusBack',
}

export enum ClinicSchedulingTemplatesActions {
  CreateSchedulingTemplateFailed = 'CreateSchedulingTemplateFailed',
  CreateSchedulingTemplateSuccessfully = 'CreateSchedulingTemplateSuccessfully',
  GetSchedulingTemplatesFailed = 'GetSchedulingTemplatesFailed',
  GetSchedulingTemplateListFailed = 'GetSchedulingTemplateListFailed',
  DeleteSchedulingTemplatesSuccessfully = 'DeleteSchedulingTemplatesSuccessfully',
  DeleteSchedulingTemplatesFailed = 'DeleteSchedulingTemplatesFailed',
  ApplyTemplateFailed = 'ApplyTemplateFailed',
  DuplicateTemplateFailed = 'DuplicateTemplateFailed',
  ApplyTemplateInfo = 'ApplyTemplateInfo',
  CalculateRepeatWeeksIntervalForRepeatConfig = 'CalculateRepeatWeeksIntervalForRepeatConfig',
  AppliedSuccessfully = 'AppliedSuccessfully',
  UpdateSchedulingTemplateFailed = 'UpdateSchedulingTemplateFailed',
  UpdateSchedulingTemplateSuccessfully = 'UpdateSchedulingTemplateSuccessfully',
  CalculateDaysForOverride = 'CalculateDaysForOverride',
  PeriodsOverridenSuccesfully = 'PeriodsOverridenSuccesfully',
  GetSchedulingTemplates = 'GetSchedulingTemplates',
  CreateTemplateValidationFailed = 'CreateTemplateValidationFailed',
  Start = 'MethodStarts',
}

export enum ClinicSchedulingTimePeriodsFunctions {
  DeleteSchedulingTimePeriods = 'DeleteSchedulingTimePeriods',
}

export enum ClinicSchedulingTimePeriodsActions {
  DeleteSchedulingTimePeriodsSuccessfully = 'DeleteSchedulingTimePeriodsSuccessfully',
  DeleteSchedulingTimePeriodsFailed = 'DeleteSchedulingTimePeriodsFailed',
}

export enum ClinicSchedulingTemplateDetailsFunctions {
  GetSchedulingTemplateDetails = 'GetSchedulingTemplateDetails',
}

export enum ClinicSchedulingTemplateDetailsActions {
  GetSchedulingTemplateDetailsFailed = 'GetSchedulingTemplateDetailsFailed',
  GetTemplatePeriodsData = 'GetTemplatePeriodsData',
}

export enum ClinicSchedulingBlockFunctions {
  ApplyBlock = 'ApplyBlock',
  ChangeStateSchedulingSlotByDate = 'ChangeStateSchedulingSlotByDate',
}

export enum ClinicSchedulingBlockActions {
  ApplyBlockFailed = 'ApplyBlockFailed',
  SlotStatusUpdatedSuccessfully = 'SlotStatusUpdatedSuccessfully',
  BlockCreated = 'BlockCreated',
  ChangeStateSchedulingSlotByDate = 'ChangeStateSchedulingSlotByDate',
}

export enum SchedulingTimeOffBlockFunctions {
  GetTimeOffBlockListFilters = 'GetTimeOffBlockListFilters',
  CreateTimeOffBlock = 'CreateTimeOffBlock',
  GetTimeOffBlockList = 'GetTimeOffBlockList',
  DeleteTimeOffBlock = 'DeleteTimeOffBlock',
  EditTimeOffBlock = 'EditTimeOffBlock',
  GetTimeOffBlockByUUid = 'GetTimeOffBlockByUUid',
  GetTimeOffBlockPeriodByUUid = 'GetTimeOffBlockPeriodByUUid',
}

export enum SchedulingTimeOffBlockActions {
  GetTimeOffBlockListFiltersFailed = 'GetTimeOffBlockListFiltersFailed',
  CreateTimeOffBlockFailed = 'CreateTimeOffBlockFailed',
  CreateTimeOffBlock = 'CreateTimeOffBlock',
  ServiceProviderNotFound = 'ServiceProviderNotFound',
  GetTimeOffBlockListFailed = 'GetTimeOffBlockListFailed',
  GetTimeOffBlockList = 'GetTimeOffBlockList',
  DeleteTimeOffBlock = 'DeleteTimeOffBlock',
  EditTimeOffBlock = 'EditTimeOffBlock',
  DeleteTimeOffBlockFailed = 'DeleteTimeOffBlockFailed',
  EditTimeOffBlockFailed = 'EditTimeOffBlockFailed',
  SchedulingTimeOffBlockNotFound = 'SchedulingTimeOffBlockNotFound',
  SchedulingTimeOffBlockPeriodNotFound = 'SchedulingTimeOffBlockPeriodNotFound',
}

export enum SchedulingSlotFunctions {
  UpdateCountAndStatusForSlotsAndGetFirstSlot = 'UpdateCountAndStatusForSlotsAndGetFirstSlot',
  ParameterToUpdateStatusAndCountForSchedulingSLot = 'ParameterToUpdateStatusAndCountForSchedulingSLot',
}

export enum SchedulingSlotActions {
  StartingMethod = 'StartingMethod',
  SlotStatusUpdatingToBusy = 'SlotStatusUpdatingToBusy',
}
