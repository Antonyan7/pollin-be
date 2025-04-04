export enum ServiceGroupFunctions {
  GetServiceGroupDetails = 'GetServiceGroupDetails',
  GetServiceGroups = 'GetServiceGroups',
  ServiceGroupAvailabilityChangedHandler = 'ServiceGroupAvailabilityChangedHandler',
  CreateServiceGroupAvailability = 'CreateServiceGroupAvailability',
  CreateServiceGroupAvailabilityForProvider = 'CreateServiceGroupAvailabilityForProvider',
}

export enum ServiceGroupAction {
  GetServiceGroupDetailsFailed = 'GetServiceGroupDetailsFailed',
  ServiceGroupAvailabilityChangedHandler = 'ServiceGroupAvailabilityChangedHandler',
  CreateServiceGroupAvailabilityData = 'CreateServiceGroupAvailabilityData',
  NoServiceGroups = 'NoServiceGroups',
  ServiceProvider = 'ServiceProvider',
  ServiceTypeIdsToProcess = 'ServiceTypeIdsToProcess',
  ServiceGroupIdsToProcess = 'ServiceGroupIdsToProcess',
  Interval = 'Interval',
  MemoryUsage = 'MemoryUsage',
  SlotsNotFound = 'SlotsNotFound',
  MemoryUsageAfter = 'MemoryUsageAfter',
  MemoryUsageAfterRelease = 'MemoryUsageAfterRelease',
  CreateServiceGroupAvailabilityFailed = 'CreateServiceGroupAvailabilityFailed',
  MemoryUsageAfterCalc = 'MemoryUsageAfterCalc',
  DeletedServiceGroupSlots = 'DeletedServiceGroupSlots',
  CreateServiceGroupAvailabilityForProviderFailed = 'CreateServiceGroupAvailabilityForProviderFailed',
}
