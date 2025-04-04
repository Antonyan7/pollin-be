export enum ServiceProviderServiceFunctions {
  GetServiceProvider = 'GetServiceProvider',
  GetGroupedServiceProviders = 'GetGroupedServiceProviders',
  GetServiceProvidersDetails = 'GetServiceProvidersDetails',
  GetServiceProvidersAppointments = 'GetServiceProvidersAppointments',
  GetSpecimenAppointments = 'GetSpecimenAppointments',
  InsertTemplateSlotsAndTimeOffBlocksIntoSlotResponse = 'InsertTemplateSlotsAndTimeOffBlocksIntoSlotResponse',
  CreateVirtualSlots = 'CreateVirtualSlots',
  ReplaceTemplateSlotsByTimeOffBlockSlots = 'ReplaceTemplateSlotsByTimeOffBlockSlots',
  InsertVirtualSlotsIntoSlotsResponse = 'InsertVirtualSlotsIntoSlotsResponse',
  GetPaginatedServiceProviders = 'GetPaginatedServiceProviders',
  GetPaginatedServiceProvidersV2 = 'GetPaginatedServiceProvidersV2',
}

export enum ServiceProviderServiceActions {
  GetGroupedServiceProvidersFailed = 'GetGroupedServiceProvidersFailed',
  GetServiceProvidersDetailsFailed = 'GetServiceProvidersDetailsFailed',
  GetServiceProvidersDetails = 'GetServiceProvidersDetails',
  ServiceProviderNotFound = 'ServiceProviderNotFound',
  GetAppliedTemplatePeriods = 'GetAppliedTemplatePeriods',
  GetServiceProvidersList = 'GetServiceProvidersList',
  InternalError = 'InternalError',
  GetSpecimenAppointmentsFailed = 'GetSpecimenAppointmentsFailed',
  GetServiceProvidersSlotsFailed = 'GetServiceProvidersSlotsFailed',
  GetPaginatedServiceProviders = 'GetPaginatedServiceProviders',
  GetPaginatedServiceProvidersFailed = 'GetPaginatedServiceProvidersFailed',
  GetPaginatedServiceProvidersV2Failed = 'GetPaginatedServiceProvidersV2Failed',
}
