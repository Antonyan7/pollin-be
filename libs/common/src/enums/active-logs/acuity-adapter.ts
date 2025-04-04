export enum AcuityAdapterFunctions {
  GetApiKey = 'GetApiKey',
  GetAppointmentByIdFromAcuityService = 'GetAppointmentByIdFromAcuityService',
  ValidateAcuitySignature = 'ValidateAcuitySignature',
  CustomFieldsToAppoinment = 'customFieldsToAppoinment',
  RescheduleAppoinmentService = 'rescheduleAppoinmentService',
  CancelAppointmentOnAcuityService = 'cancelAppointmentOnAcuityService',
  UpdateAppointmentOnAcuityService = 'updateAppointmentOnAcuityService',
  CreateAppointmentOnAcuityService = 'createAppointmentOnAcuityService',
  GetAppointmentsOnAcuityService = 'getAppointmentsOnAcuityService',
  RenameKeysToId = 'renameKeysToId',
  DelayForRetry = 'DelayForRetry',
}

export enum AcuityAdapterActions {
  InternalError = 'InternalError',
  StartMethod = 'StartMethod',
  AppointmentCreated = 'AppointmentCreated',
  AcuitySecretUserIdOrPasswordNotFound = 'AcuitySecretUserIdOrPasswordNotFound',
  Retry = 'Retry',
  SortedHashNotPassedTryingNotSortedHash = 'SortedHashNotPassedTryingNotSortedHash',
  NotSortedHashPassedValidation = 'NotSortedHashPassedValidation',
  NotSortedHashFailedValidation = 'NotSortedHashFailedValidation',
  ValidateAcuitySignatureFalse = 'ValidateAcuitySignatureFalse',
  FeatureAcuityWebhookValidateSignatureDisabled = 'FeatureAcuityWebhookValidateSignatureDisabled',
  AcuityAppointmentNotFoundById = 'AcuityAppointmentNotFoundById',
  SyncFailedFromClinicPortalToAcuity = 'SyncFailedFromClinicPortalToAcuity',
}

export enum AcuityWebhookServiceFunctions {
  CreatePatientAndAppointmentByAcuity = 'createPatientAndAppointmentByAcuity',
  ValidateAppStartDate = 'validateAppStartDate',
  GetServiceProviderAndServiceType = 'getServiceProviderAndServiceType',
  AcuityWebhookService = 'AcuityWebhookService',
  CreatePatientService = 'CreatePatientService',
  CreateGoogleAdService = 'CreateGoogleAdService',
  CreateAppointmentService = 'CreateAppointmentService',
  CloudTaskReminderService = 'CloudTaskReminderService',
  GetQuestionnaireForPatientIntake = 'getQuestionnaireForPatientIntake',
  CreateFirebaseUser = 'CreateFirebaseUser',
  ParseSexAtBirth = 'parseSexAtBirth',
  SendEmailPatient = 'SendEmailPatient',
  AddTemplateHeaderAndFooter = 'AddTemplateHeaderAndFooter',
  SendEmailPatientInfoMatchesButHeHasIc = 'SendEmailPatientInfoMatchesButHeHasIc',
  CreateAppointmentMetadata = 'CreateAppointmentMetadata',
  CheckIfOverlapBlockSendEmail = 'CheckIfOverlapBlockSendEmail',
}

export enum AcuityWebhookServiceActions {
  StartMethod = 'StartMethod',
  Info = 'info',
  Failed = 'Failed',

  PatientAlreadyExistAndHasInitialConsApp = 'PatientAlreadyExistAndHasInitialConsApp',
  PatientWIthEmailFoundButPatientInfoNotMatching = 'PatientWIthEmailFOundButPatientInfoNotMatching',
  AcuityAppointmentDateIsInBadFormat = 'AcuityAppointmentDateIsInBadFormat',
  AcuityAppointmentStartDateInBadFormat = 'AcuityAppointmentStartDateInBadFormat',
  ServiceProviderNotFoundByServiceProviderToServiceTypes = 'ServiceProviderNotFoundByServiceProviderToServiceTypes',
  ServiceTypeNotFoundByExternalServiceTypeIDForAcuity = 'ServiceTypeNotFoundByExternalServiceTypeIDForAcuity',
  ServiceProviderNotFoundByExternalServiceProviderIDForAcuity = 'ServiceProviderNotFoundByExternalServiceProviderIDForAcuity',
  AppointmentAlreadyExistOnOurEndWithExternalAcuityAppId = 'AppointmentAlreadyExistOnOurEndWithExternalAcuityAppId',
  NotFoundQuestionnaireForPatientIntakeBySexAtBirth = 'NotFoundQuestionnaireForPatientIntakeBySexAtBirth',
  CheckFeatureFlag = 'CheckFeatureFlag',
  SexAtBirthFromAcuitySyncIsNullOrEmpty = 'SexAtBirthFromAcuitySyncIsNullOrEmpty',
  SexAtBirthFromAcuitySyncNotAbleToParse = 'SexAtBirthFromAcuitySyncNotAbleToParse',
  CompileEjsFail = 'CompileEjsFail',
  EmailTemplateNotFoundDataIssue = 'EmailTemplateNotFoundDataIssue',
  EmailUsedOnFirebaseButNotExistOnMySql = 'EmailUsedOnFirebaseButNotExistOnMySql',
  CreatePatientAndAppointmentByAcuityFailed = 'CreatePatientAndAppointmentByAcuityFailed',
  UpdateGoogleAdConversionsFailed = 'UpdateGoogleAdConversionsFailed',
}

export enum RescheduleAndUpdateStatusAcuityAppointmentFunctions {
  HandlerAppointmentRescheduled = 'handlerAppointmentRescheduled',
  HandlerAppointmentStatusUpdated = 'handlerAppointmentStatusUpdated',
}

export enum RescheduleAndUpdateStatusAcuityAppointmentActions {
  InternalError = 'InternalError',
  StartMethod = 'StartMethod',
  Info = 'info',
  Success = 'success',

  AppointmentWasntCreatedFromAcuitySkipUpdate = 'AppointmentWasntCreatedFromAcuitySkipUpdate',
  AppointmentTimeWasNotChanged = 'AppointmentTimeWasNotChanged',
  AppointmentNotFound = 'AppointmentNotFound',
  HandlerAppointmentStatusUpdated = 'handlerAppointmentStatusUpdated',

  SyncFailedFromClinicPortalToAcuity = 'SyncFailedFromClinicPortalToAcuity',
}

export enum AppointmentServiceProviderUpdatedFunctions {
  GetServiceProviderDb = 'GetServiceProviderDb',
  GetAppointmentDb = 'GetAppointmentDb',
  HandlerAppointmentServiceProviderUpdated = 'HandlerAppointmentServiceProviderUpdated',
}

export enum AppointmentServiceProviderUpdatedActions {
  ServiceProviderNotFound = 'ServiceProviderNotFound',
  ExternalProviderIDNotFound = 'ExternalProviderIDNotFound',
  AppointmentNotFound = 'AppointmentNotFound',
  Info = 'info',
}

export enum HandlerPatientContactInformationUpdatedFunctions {
  HandlerPatientContactInformationUpdated = 'handlerPatientContactInformationUpdated',
  GetPatientAppointmentsWhichCreatedByAcuity = 'getPatientAppointmentsWhichCreatedByAcuity',
  ValidatePatientExistAndAnyContactInformationWasChanged = 'validatePatientExistAndAnyCOntactInformationWasChanged',
}

export enum HandlerPatientContactInformationUpdatedActions {
  InternalError = 'InternalError',
  StartMethod = 'StartMethod',
  Info = 'info',
  Success = 'success',

  PatientDoesntHaveAppointmentsToUpdateOnAcuity = 'PatientDoesntHaveAppointmentsToUpdateOnAcuity',
  PatientNotFound = 'PatientNotFound',
  NoAnyUpdatedPatientContactInformation = 'NoAnyUpdatedPatientContactInformation',
  SyncFailedFromClinicPortalToAcuity = 'SyncFailedFromClinicPortalToAcuity',
}
