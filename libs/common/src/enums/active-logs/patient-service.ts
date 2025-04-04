export enum OtpCodeFailure {
  InvalidOrNotFound = 'InvalidOrNotFound',
}

export enum PatientOTPServiceFunctions {
  FindOtp = 'FindOtp',
  DeleteUserOtpCodes = 'DeleteUserOtpCodes',
}

export enum PatientOTPServiceActions {
  FindOtpFailed = 'FindOtpFailed',
  DeleteUserOtpCodesFailed = 'DeleteUserOtpCodesFailed',
}

export enum PatientServiceFunctions {
  VerifyOtp = 'VerifyOtp',
  SendOtp = 'SendOtp',
  SendOtpForEmailUpdate = 'SendOtpForEmailUpdate',
  VerifyUpdateEmailOtp = 'VerifyUpdateEmailOtp',
  CreatePatient = 'CreatePatient',
  GetPatientMedication = 'GetPatientMedication',
  GetPatientMedicationDetails = 'GetPatientMedicationDetails',
  GetPatientPrescriptionsStatuses = 'GetPatientPrescriptionsStatuses',
  PatientsSearch = 'PatientsSearch',
  GetPatientsBySearch = 'GetPatientsBySearch',
  GetCareProviders = 'GetCareProviders',
  UpdatePatient = 'UpdatePatient',
  UploadPhoto = 'UploadPhoto',
  GetUserPhoneNumberAndBirthDate = 'GetUserPhoneNumberAndBirthDate',
  MedicationViewed = 'MedicationViewed',
  MedicationAcknowledge = 'MedicationAcknowledge',
  CreatePatientCustomAlert = 'CreatePatientCustomAlert',
  UpdatePatientCustomAlert = 'UpdatePatientCustomAlert',
  DeletePatientCustomAlert = 'DeletePatientCustomAlert',
  CreatePatientContactForm = 'CreatePatientContactForm',
  DeleteAccountPatient = 'DeleteAccountPatient',
  GetPatientPhoto = 'GetPatientPhoto',
  UpdateIdentifier = 'UpdateIdentifier',
  GetPatientWithPartnerInvitation = 'GetPatientWithPartnerInvitation',
  GetChatToken = 'GetChatToken',
  GetChatTokenFailed = 'GetChatTokenFailed',
  GetPatientsWithAppointmentFilters = 'GetPatientsWithAppointmentFilters',
  GetFollowUpAppointments = 'GetFollowUpAppointments',
  FollowUpAppointmentSignOff = 'FollowUpAppointmentSignOff',
  CreateOrUpdateNote = 'CreateOrUpdateNote',
  GetPatientsWithAppointmentFiltersV2 = 'GetPatientsWithAppointmentFiltersV2',
  GetPatientFeedbackDetails = 'GetPatientFeedbackDetails',
  SubmitPatientFeedback = 'SubmitPatientFeedback',
  GetCheckInAppointmentsDetails = 'GetCheckInAppointmentsDetails',
  ConfirmCheckInAppointments = 'ConfirmCheckInAppointments',
  SaveAppointmentMetadata = 'SaveAppointmentMetadata',
  GetPatientHandouts = 'GetPatientHandouts',
  DismissPatientFeedback = 'DismissPatientFeedback',
  EmailExists = 'EmailExists',
  GetPatientByEmail = 'GetPatientByEmail',
}

export enum PatientRepositoryFunctions {
  GetPatient = 'GetPatient',
}

export enum PatientRepositoryActions {
  GetPatientFailed = 'GetPatientFailed',
}

export enum PatientEncounter {
  CreatePatientEncounter = 'createPatientEncounter',
  GetPatientEncounters = 'getPatientEncounters',
  UpdatePatientEncounter = 'updatePatientEncounter',
  UpdatePatientEncounterVisibility = 'UpdatePatientEncounterVisibility',
  GetEncounterTypes = 'GetEncounterTypes',
  GetEncounters = 'GetEncounters',
  AddEncounterAddendum = 'AddEncounterAddendum',
  UpdateEncounterAddendum = 'UpdateEncounterAddendum',
  RemoveEncounterAttachments = 'RemoveEncounterAttachments',
  RemoveEncounterAddendumAttachments = 'RemoveEncounterAddendumAttachments',
  SubmitAttachments = 'SubmitAttachments',
  GetEncountersTypeTemplate = 'GetEncountersTypeTemplate',
  AddCallback = 'AddCallback',
  ValidateAndReturnCallbackDetails = 'ValidateAndReturnCallbackDetails',
  UpdateEncounterCallback = 'UpdateEncounterCallback',
}

export enum PatientEncounterActions {
  CreatePatientEncounterFailed = 'CreatePatientEncounterFailed',
  UpdatePatientEncounterFailed = 'UpdatePatientEncounterFailed',
  UpdatePatientEncounterVisibilityFailed = 'UpdatePatientEncounterVisibilityFailed',
  GetEncounterTypesFailed = 'GetEncounterTypesFailed',
  GetEncountersFailed = 'GetEncountersFailed',
  UpdateEncounterAddendumFailed = 'UpdateEncounterAddendumFailed',
  AddEncounterAddendumFailed = 'AddEncounterAddendumFailed',
  GetEncounterTypes = 'GetEncounterTypes',
  FilterEncounters = 'FilterEncounters',
  GetEncounters = 'GetEncounters',
  SubmitAttachmentsFailed = 'SubmitAttachmentsFailed',
  GetEncountersTypeTemplateFailed = 'GetEncountersTypeTemplateFailed',
  SkipCallbackCreation = 'SkipCallbackCreation',
  AddCallbackFailed = 'AddCallbackFailed',
  UpdateEncounterCallbackFailed = 'UpdateEncounterCallbackFailed',
}

export enum PatientStaffNote {
  CreatePatientStaffNote = 'createPatientStaffNote',
  GetPatientStaffNotes = 'getPatientStaffNotes',
  UpdatePatientStaffNote = 'updatePatientStaffNote',
  UpdatePatientStaffNoteVisibility = 'UpdatePatientStaffNoteVisibility',
  GetStaffNoteTypes = 'GetStaffNoteTypes',
  GetStaffNotes = 'GetStaffNotes',
  AddStaffNoteAddendum = 'AddStaffNoteAddendum',
  UpdateStaffNoteAddendum = 'UpdateStaffNoteAddendum',
  RemoveStaffNoteAttachments = 'RemoveStaffNoteAttachments',
  RemoveStaffNoteAddendumAttachments = 'RemoveStaffNoteAddendumAttachments',
  SubmitAttachments = 'SubmitAttachments',
  GetStaffNotesTypeTemplate = 'GetStaffNotesTypeTemplate',
  UpdateStaffNoteCallback = 'UpdateStaffNoteCallback',
}

export enum PatientStaffNoteActions {
  CreatePatientStaffNoteFailed = 'CreatePatientStaffNoteFailed',
  UpdatePatientStaffNoteFailed = 'UpdatePatientStaffNoteFailed',
  UpdatePatientStaffNoteVisibilityFailed = 'UpdatePatientStaffNoteVisibilityFailed',
  GetStaffNoteTypesFailed = 'GetStaffNoteTypesFailed',
  GetStaffNotesFailed = 'GetStaffNotesFailed',
  UpdateStaffNoteAddendumFailed = 'UpdateStaffNoteAddendumFailed',
  AddStaffNoteAddendumFailed = 'AddStaffNoteAddendumFailed',
  GetStaffNoteTypes = 'GetStaffNoteTypes',
  FilterStaffNotes = 'FilterStaffNotes',
  GetStaffNotes = 'GetStaffNotes',
  SubmitAttachmentsFailed = 'SubmitAttachmentsFailed',
  GetStaffNotesTypeTemplateFailed = 'GetStaffNotesTypeTemplateFailed',
  UpdateStaffNoteCallbackFailed = 'UpdateStaffNoteCallbackFailed',
}

export enum ClinicPatientEmrFunctions {
  GetPatients = 'GetPatients',
  GetPatientStatuses = 'GetPatientStatuses',
  GetServiceProviders = 'GetServiceProviders',
  GetPatientEncounters = 'GetPatientEncounters',
  GetPatientEncounterDetails = 'GetPatientEncounterDetails',
  GetPatientEncounterFilters = 'GetPatientEncounterFilters',

  GetPatientStaffNotes = 'GetPatientStaffNotes',
  GetPatientStaffNoteDetails = 'GetPatientStaffNoteDetails',
  GetPatientStaffNoteFilters = 'GetPatientStaffNoteFilters',

  GetAlertStatusFiltersFindOptions = 'GetAlertStatusFiltersFindOptions',
  GetPatientDefaultFilters = 'GetPatientDefaultFilters',
  GetPatientFilters = 'GetPatientFilters',
  GetPatientByDateFiltersV2Paginated = 'GetPatientByDateFiltersV2Paginated',
  GenerateSubTitleWithoutDOB = 'GenerateSubTitleWithoutDOB',
}

export enum ClinicPatientEmrActions {
  GetPatientsFailed = 'GetPatientsFailed',
  GetServiceProvidersFailed = 'GetServiceProvidersFailed',
  GetPatientStatusesFailed = 'GetPatientStatusesFailed',

  GetPatientEncounterFailed = 'GetPatientEncounterFailed',
  GetPatientEncounterDetailsFailed = 'GetPatientEncounterDetailsFailed',
  GetPatientEncounterFiltersFailed = 'GetPatientEncounterFiltersFailed',

  GetPatientStaffNoteFailed = 'GetPatientStaffNoteFailed',
  GetPatientStaffNoteDetailsFailed = 'GetPatientStaffNoteDetailsFailed',
  GetPatientStaffNoteFiltersFailed = 'GetPatientStaffNoteFiltersFailed',

  FilterFieldNameFound = 'FilterFieldNameFound',
  GetPatientDefaultFiltersFailed = 'GetPatientDefaultFiltersFailed',
  GetPatientFiltersFailed = 'GetPatientFiltersFailed',
  InvalidAge = 'InvalidAge',
}

export enum PatientServiceActions {
  PatientsSearchFailed = 'patientsSearchFailed',
  GetPatientsBySearchFailed = 'GetPatientsBySearchFailed',
  SendOtpFailed = 'SendOtpFailed',
  CreatePatientCustomAlertFailed = 'CreatePatientCustomAlertFailed',
  UpdatePatientCustomAlertFailed = 'UpdatePatientCustomAlertFailed',
  DeletePatientCustomAlertFailed = 'DeletePatientCustomAlertFailed',
  GetPatientMedicationDetailsFailed = 'GetPatientMedicationDetailsFailed',
  SendOtpForEmailUpdateFailed = 'SendOtpForEmailUpdateFailed',
  VerifyOtpForEmailUpdateFailed = 'VerifyOtpForEmailUpdateFailed',
  CreatePatientContactForm = 'CreatePatientContactForm',
  DeleteAccountPatient = 'DeleteAccountPatient',
  CreatePatientContactFormFailed = 'CreatePatientContactFormFailed',
  DeleteAccountPatientFailed = 'DeleteAccountPatientFailed',
  GetPatientPhoto = 'GetPatientPhoto',
  GetPatientPhotoFailed = 'GetPatientPhotoFailed',
  UploadPhoto = 'UploadPhoto',
  UploadPhotoFailed = 'UploadPhotoFailed',
  UpdatePatient = 'UpdatePatient',
  UpdatePatientFailed = 'UpdatePatientFailed',
  GetCareProviders = 'GetCareProviders',
  GetCareProvidersFailed = 'GetCareProvidersFailed',
  MedicationAcknowledge = 'MedicationAcknowledge',
  MedicationAcknowledgeFailed = 'MedicationAcknowledgeFailed',
  MedicationViewed = 'MedicationViewed',
  MedicationViewedFailed = 'MedicationViewedFailed',
  GetPatientMedicationDetails = 'GetPatientMedicationDetails',
  GetPatientMedication = 'GetPatientMedication',
  GetPatientMedicationFailed = 'GetPatientMedicationFailed',
  CreatePatientFailed = 'CreatePatientFailed',
  GetPhoneNumberFailed = 'GetPhoneNumberFailed',
  GetPatientWithPartnerInvitationFailed = 'GetPatientWithPartnerInvitationFailed',
  GetPatientPrescriptionsStatusesFailed = 'GetPatientPrescriptionsStatusesFailed',
  UpdateIdentifierFailed = 'UpdateIdentifierFailed',
  GetChatTokenFailed = 'GetChatTokenFailed',
  GetPatientsWithAppointmentFiltersFailed = 'GetPatientsWithAppointmentFiltersFailed',
  GetFollowUpAppointmentsFailed = 'GetFollowUpAppointmentsFailed',
  FollowUpAppointmentSignOffFailed = 'FollowUpAppointmentSignOffFailed',
  CreateOrUpdateNoteFailed = 'CreateOrUpdateNoteFailed',
  GetPatientsWithAppointmentFiltersV2Failed = 'GetPatientsWithAppointmentFiltersV2Failed',
  GetPatientFeedbackDetails = 'GetPatientFeedbackDetails',
  GetPatientFeedbackDetailsFailed = 'GetPatientFeedbackDetailsFailed',
  SubmitPatientFeedbackFailed = 'SubmitPatientFeedbackFailed',
  GetCheckInAppointmentsDetailsFailed = 'GetCheckInAppointmentsDetailsFailed',
  ConfirmCheckInAppointmentsFailed = 'ConfirmCheckInAppointmentsFailed',
  SaveAppointmentMetadataFailed = 'SaveAppointmentMetadataFailed',
  EmailExistsFailed = 'EmailExistsFailed',
  GetPatientByEmailFailed = 'GetPatientByEmailFailed',
}

export enum PatientAlertFunctions {
  GetPatientAlerts = 'GetPatientAlerts',
  GetPatientCheckInAlerts = 'GetPatientCheckInAlerts',
}

export enum PatientAlertActions {
  PatientAlertFailure = 'PatientAlertFailure',
  GetPatientCheckInAlertsFailed = 'GetPatientCheckInAlertsFailed',
  NoAlertForPatient = 'NoAlertForPatient',
  ClosePatientAlertFailed = 'ClosePatientAlertFailed',
  ClosePatientAlert = 'ClosePatientAlert',
}

export enum PatientProfileFunctions {
  GetProfile = 'GetProfile',
  GetProfileImageURL = 'GetProfileImageURL',
  GetPatientProfileHighlight = 'GetPatientProfileHighlight',
  GetPatientProfileHighlightDetails = 'GetPatientProfileHighlightDetails',
  GetPatientProfileOverview = 'GetPatientProfileOverview',
  GetPatientContactInformation = 'GetPatientContactInformation',
  GetPatientPhoneNumber = 'GetPatientPhoneNumber',
  VerifyPatientProfilePhoto = 'VerifyPatientProfilePhoto',
  ReadFirebaseUser = 'ReadFirebaseUser',
  GetPatientPriorities = 'GetPatientPriorities',
  UpdatePatientPriority = 'UpdatePatientPriority',
  UpdateProfileDiagnosis = 'UpdateProfileDiagnosis',
  GetProfileDiagnosis = 'GetProfileDiagnosis',
}

export enum PatientProfileActions {
  GetPatientByUUIDFailed = 'GetPatientByUUIDFailed',
  UpdateProfilePharmacyFailed = 'UpdateProfilePharmacyFailed',
  CreateOrUpdateProfilePharmacyFailed = 'CreateOrUpdateProfilePharmacyFailed',
  GetProfilePharmacyFailed = 'GetProfilePharmacyFailed',
  GetProfileFailed = 'GetProfileFailed',
  UpdateProfileDiagnosisFailed = 'UpdateProfileDiagnosisFailed',
  GetProfileDiagnosisFailed = 'GetProfileDiagnosisFailed',
  GetPatientPrioritiesFailed = 'GetPatientPrioritiesFailed',
  UpdatePatientPriorityFailed = 'UpdatePatientPriorityFailed',
  GetProfileImageURLFailed = 'GetProfileImageURLFailed',
  GetPatientProfileHighlightFailed = 'GetPatientProfileHighlightFailed',
  GetPatientProfileHighlightSuccessfully = 'GetPatientProfileHighlightSuccessfully',
  GetPatientProfileHighlightDetailsFailed = 'GetPatientProfileHighlightDetailsFailed',
  GetPatientProfileHighlightDetailsSuccessfully = 'GetPatientProfileHighlightDetailsSuccessfully',
  GetPatientProfileHighlightDetailsContactInformationFailed = 'GetPatientProfileHighlightDetailsContactInformationFailed',
  GetPatientProfileHighlightDetailsDrugAllergiesFailed = 'GetPatientProfileHighlightDetailsDrugAllergiesFailed',
  GetPatientProfileHighlightDetailsFoodAllergiesFailed = 'GetPatientProfileHighlightDetailsFoodAllergiesFailed',
  GetPatientProfileOverviewFailed = 'GetPatientProfileOverviewFailed',
  GetPatientContactInformationFailed = 'GetPatientContactInformationFailed',
  GetPatientPhoneNumberFailed = 'GetPatientPhoneNumberFailed',
  VerifyPatientProfilePhotoFailed = 'VerifyPatientProfilePhotoFailed',
  VerifyPatientProfilePhotoSuccessfully = 'VerifyPatientProfilePhotoSuccessfully',
  GetPatientData = 'GetPatientData',
  GetPatientProfileOverviewDataSuccess = 'GetPatientProfileOverviewDataSuccess',
  GetPatientDoctorsData = 'GetPatientDoctorsData',
  GetReferralAttachmentsLinksSucceed = 'GetReferralAttachmentsLinksSucceed',
  ReadFirebaseUserFailed = 'ReadFirebaseUserFailed',
}

export enum PatientMilestoneFunctions {
  GetPatientMilestone = 'GetPatientMilestone',
  GetPatientMilestonesByPatientAuthUserId = 'GetPatientMilestonesByPatientAuthUserId',
  GetPatientMilestoneAfterVisitSummary = 'GetPatientMilestoneAfterVisitSummary',
  GetMilestoneDetails = 'GetMilestoneDetails',
  ConfirmMilestone = 'ConfirmMilestone',
  GetMilestoneRequiredAction = 'GetMilestoneRequiredAction',
  GetUserMilestonesAlerts = 'GetUserMilestonesAlerts',
  ClosePatientAlert = 'ClosePatientAlert',
  GetAppointmentCheckoutAlertResponse = 'GetAppointmentCheckoutAlertResponse',
  RequiredActionMilestoneHidedForTentativeApp = 'RequiredActionMilestoneHidedForTentativeApp',
  DeleteDefaultMilestones = 'DeleteDefaultMilestones',
  CreateForConsentPackage = 'CreateForConsentPackage',
  UpdateMilestoneToPast = 'UpdateMilestoneToPast',
}

export enum PatientMilestoneActions {
  GetPatientMilestoneData = 'GetPatientMilestoneData',
  GetPatientMilestoneListFailed = 'GetPatientMilestoneListFailed',
  GetPlansData = 'GetPlansData',
  ConfirmMilestoneFailed = 'ConfirmMilestoneFailed',
  GetMilestoneRequiredActionFailed = 'GetMilestoneRequiredActionFailed',
  GetMilestoneRequiredAction = 'GetMilestoneRequiredAction',
  ConfirmMilestone = 'ConfirmMilestone',
  GetMilestoneDetailsFailed = 'GetMilestoneDetailsFailed',
  GetMilestoneDetails = 'GetMilestoneDetails',
  GetPatientMilestoneAfterVisitSummary = 'GetPatientMilestoneAfterVisitSummary',
  GetPatientMilestoneAfterVisitSummaryFailed = 'GetPatientMilestoneAfterVisitSummaryFailed',
  GetUserMilestonesAlerts = 'GetUserMilestonesAlerts',
  GetUserMilestonesAlertsFailed = 'GetUserMilestonesAlertsFailed',
  GetPatientMilestonesByPatientAuthUserId = 'GetPatientMilestonesByPatientAuthUserId',
  CreateForConsentPackageDisabled = 'CreateForConsentPackageDisabled',
}

export enum PatientNotificationFunctions {
  SendIntakeReminder = 'SendIntakeReminder',
}

export enum PatientNotificationActions {
  SendIntakeReminderFailed = 'SendIntakeReminderFailed',
  SendingIntakeReminder = 'SendingIntakeReminder',
}

export enum GetMilestoneRequiredActionFunctions {
  GetMilestoneRequiredAction = 'GetMilestoneRequiredAction',
}
export enum GetMilestoneRequiredActionActions {
  GetMilestoneRequiredAction = 'GetMilestoneRequiredAction',
}

export enum PatientPushNotificationFunctions {
  UpdateRegistrationToken = 'UpdateRegistrationToken',
  UpdatePushNotificationPreference = 'UpdatePushNotificationPreference',
}

export enum PatientPushNotificationActions {
  UpdateRegistrationTokenFailed = 'UpdateRegistrationTokenFailed',
  UpdateRegistrationToken = 'UpdateRegistrationToken',
  UpdatePushNotificationPreferenceFailed = 'UpdatePushNotificationPreferenceFailed',
  UpdatePushNotificationPreference = 'UpdatePushNotificationPreference',
}

export enum PatientPaymentsFunctions {
  GetPaymentHistory = 'GetPaymentHistory',
  GetPaymentHistoryV2 = 'GetPaymentHistoryV2',
  DownloadPaymentReceipt = 'DownloadPaymentReceipt',
}

export enum PatientPaymentsActions {
  GetPaymentHistory = 'GetPaymentHistory',
  GetPaymentHistoryV2 = 'GetPaymentHistoryV2',
  GetPaymentHistoryFailed = 'GetPaymentHistoryFailed',
  GetPaymentHistoryV2Failed = 'GetPaymentHistoryV2Failed',
  DownloadPaymentReceipt = 'DownloadPaymentReceipt',
  DownloadPaymentReceiptFailed = 'DownloadPaymentReceiptFailed',
}

export enum DefaultFiltersForAppointmentFunctions {
  GetDefaultFiltersForAppointment = 'GetDefaultFiltersForAppointment',
}

export enum DefaultFiltersForAppointmentActions {
  GetDefaultFiltersForAppointmentFailed = 'GetDefaultFiltersForAppointmentFailed',
}
