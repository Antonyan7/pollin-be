export enum AppointmentAction {
  InternalError = 'InternalError',

  CreateAppointmentFailed = 'CreateAppointmentFailed',
  HandleAppointmentCreationFailed = 'HandleAppointmentCreationFailed',
  CreateAppointmentMetadata = 'CreateAppointmentMetadata',
  GetPatientAgeGroupFailed = 'GetPatientAgeGroupFailed',
  UpdateAppointmentFailed = 'UpdateAppointmentFailed',
  GetAppointmentDetailsFailed = 'GetAppointmentDetailsFailed',
  GetAppointmentHistoryFailed = 'GetAppointmentHistoryFailed',
  GetAppointmentListFailed = 'GetAppointmentListFailed',
  CancelAppointmentFailed = 'CancelAppointmentFailed',
  GetCheckInPatientAppointmentsFailed = 'GetCheckInPatientAppointmentsFailed',
  SaveAppointmentPartnersForCheckInFailed = 'SaveAppointmentPartnersForCheckInFailed',
  MarkAppointmentsCheckedInFailed = 'MarkAppointmentsCheckedInFailed',
  AppointmentsDoesNotMatch = 'UUIDs received from client are not ready for CheckIn or not exists',
  GetAppointmentInfo = 'GetAppointmentInfo',
  ConfirmAdhocPayment = 'ConfirmAdhocPayment',
  SetCatheterTypeFailed = 'SetCatheterTypeFailed',
  AppointmentMilestoneCreated = 'AppointmentMilestoneCreated',
  UpdateMilestoneServiceTypeMilestoneNotFound = 'UpdateMilestoneServiceTypeMilestoneNotFound',
  UpdateMilestoneServiceType = 'UpdateMilestoneServiceType',
  CreateAppointment = 'CreateAppointment',
  GetAppointmentFiltersFailed = 'GetAppointmentFiltersFailed',
  GetAppointmentPartnersToLinkFailed = 'GetAppointmentPartnersToLinkFailed',
  GetUpdateAppointmentData = 'GetUpdateAppointmentData',
  CompileEjsFail = 'CompileEjsFail',
  MethodFailed = 'MethodFailed',
  PatientIntakeStatusUpdatedByAppointmentUpdate = 'PatientIntakeStatusUpdatedByAppointmentUpdate',
  ProcessBookingOrderMetadataFailed = 'ProcessBookingOrderMetadataFailed',
  NoBookingOrderMetadata = 'NoBookingOrderMetadata',
  PatientIsMarkedAs = 'PatientIsMarkedAs',
  NotNeededToUpdateAppointmentPaymentStatus = 'NotNeededToUpdateAppointmentPaymentStatus',
  UpdatingAppointmentPaymentStatusToPendingPaymentAsItHasTestWhichNeedToPay = 'UpdatingAppointmentPaymentStatusToPendingPaymentAsItHasTestWhichNeedToPay',
  ManualMeetingLinkProvided = 'ManualMeetingLinkProvided',
  AppointmentHasParentId = 'AppointmentHasParentId',
  NoMeetingIdToDelete = 'NoMeetingIdToDelete',
  RequiresMeetingCreation = 'RequiresMeetingCreation',
  RequiresMeetingUpdate = 'RequiresMeetingUpdate',
  DateIsInPast = 'DateIsInPast',
  AppointmentsCreatedHandlerData = 'AppointmentsCreatedHandlerData',
  AppointmentNotFound = 'AppointmentNotFound',
  HandleAppointmentsCreationFailed = 'HandleAppointmentsCreationFailed',
  HandleAppointmentUpdateFailed = 'HandleAppointmentUpdateFailed',
  UpdateAppointmentPriceFailed = 'UpdateAppointmentPriceFailed',
  NoTestsInsideMilestone = 'NoTestsInsideMilestone',
  AppointmentStatusChanged = 'AppointmentStatusChanged',
  CancelNotConfirmedScheduledAppointmentFailed = 'CancelNotConfirmedScheduledAppointmentFailed',
  FirestoreRecordNotFound = 'FirestoreRecordNotFound',
  AppointmentMilestoneNotFound = 'AppointmentMilestoneNotFound',
  SMSNotificationSent = 'SMSNotificationSent',
}

export enum AppointmentFunction {
  CreateAppointment = 'CreateAppointment',
  HandleAppointmentCreation = 'HandleAppointmentCreation',
  GetPatientAgeGroup = 'GetPatientAgeGroup',
  UpdateMilestoneServiceType = 'UpdateMilestoneServiceType',
  ValidateServiceTypeAndTestOrderItems = 'ValidateServiceTypeAndTestOrderItems',
  ValidateTestOrderItemsAndPatientData = 'ValidateTestOrderItemsAndPatientData',
  ValidateServiceProviderInServiceType = 'ValidateServiceProviderInServiceType',
  GetAppointmentDetails = 'GetAppointmentDetails',
  GetAppointmentHistory = 'GetAppointmentHistory',
  GetAppointmentPartnersToLink = 'GetAppointmentPartnersToLink',
  GetAppointmentList = 'GetAppointmentList',
  UpdateAppointment = 'UpdateAppointment',
  CreateAppointmentMetadata = 'CreateAppointmentMetadata',
  CancelAppointment = 'CancelAppointment',
  GetCheckInPatientAppointments = 'GetCheckInPatientAppointments',
  MarkAppointmentsCheckedIn = 'MarkAppointmentsCheckedIn',
  SetCatheterType = 'SetCatheterType',
  CreateAppointmentAndPublishEvent = 'CreateAppointmentAndPublishEvent',
  SendEmailWhenSlotHasMoreThanOne = 'SendEmailWhenSlotHasMoreThanOne',
  CreateMilestone = 'CreateMilestone',
  GetPatientProfileAppointments = 'GetPatientProfileAppointments',
  GetAppointmentFilters = 'GetAppointmentFilters',
  AppointmentUpdateIdentifier = 'AppointmentUpdateIdentifier',
  SaveAppointmentPartnersForCheckIn = 'SaveAppointmentPartnersForCheckIn',
  ProcessBookingOrderMetadata = 'ProcessBookingOrderMetadata',
  UpdatePatientStatus = 'UpdatePatientStatus',
  UpdateAppointmentPaymentStatusIfHasPaidTest = 'UpdateAppointmentPaymentStatusIfHasPaidTest',
  UpdateAppointmentSpecimens = 'UpdateAppointmentSpecimens',
  UpdateAppointmentsStatus = 'UpdateAppointmentsStatus',
  UpdatePatientMrp = 'UpdatePatientMrp',
  HandleMeeting = 'HandleMeeting',
  RemoveMeetingIfExists = 'RemoveMeetingIfExists',
  CreateMeeting = 'CreateMeeting',
  UpdateMeeting = 'UpdateMeeting',
  AppointmentsCreatedHandler = 'AppointmentsCreatedHandler',
  HandleAppointmentUpdate = 'HandleAppointmentUpdate',
  HandleAppointmentsCreation = 'HandleAppointmentsCreation',
  UpdateAppointmentPrice = 'UpdateAppointmentPrice',
  CancelNotConfirmedScheduledAppointment = 'CancelNotConfirmedScheduledAppointment',
  SendNotificationToConfirmAppointment = 'SendNotificationToConfirmAppointment',
  ScheduleAppointmentSmsNotification = 'ScheduleAppointmentSmsNotification',
  GetPatientConversationId = 'GetPatientConversationId',
  ScheduleAppointmentCancellation = 'ScheduleAppointmentCancellation',
}

export enum ProfileAppointmentAction {
  GetProfileAppointmentsFailed = 'GetProfileAppointmentsFailed',
  GetProfileRecentAppointmentsFailed = 'GetProfileRecentAppointmentsFailed',
  AppointmentUpdateIdentifierFailed = 'AppointmentUpdateIdentifierFailed',
}

export enum ProfileAppointmentFunction {
  GetPatientAppointments = 'GetPatientAppointments',
  GetPatientRecentAppointments = 'GetPatientRecentAppointments',
}
