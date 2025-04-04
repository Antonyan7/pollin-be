export enum IntakeFormFunctions {
  GetPatientIntake = 'GetPatientIntake',
  ValidatePatientIntakeStatusByStatus = 'ValidatePatientIntakeStatusByStatus',
  UpdateIntakeForm = 'UpdateIntakeForm',
  CheckInPatientIntake = 'CheckInPatientIntake',
  UpdatePatientIntakeStatus = 'UpdatePatientIntakeStatus',

  GetPatientIntakeProgress = 'GetPatientIntakeProgress',
  GetPatientIntakeSnapshot = 'GetPatientIntakeSnapshot',
  GetUpdatedByName = 'GetUpdatedByName',
  GetPatientQuestionnaireIntent = 'GetPatientQuestionnaireIntent',
  GetLastUpdatedDateFromSnapshot = 'GetLastUpdatedDateFromSnapshot',
  GetPercentCompleted = 'GetPercentCompleted',
  GetIntakeProgressDataByIntent = 'GetIntakeProgressDataByIntent',
}

export enum IntakeFormActions {
  StartMethod = 'StartMethod',
  InternalError = 'InternalError',
  QuestionnaireNotFound = 'QuestionnaireNotFound',
  QuestionNotFoundInIntent = 'QuestionNotFoundInIntent',
  GetPatientById = 'GetPatientById',
  PatientByUUidNotFound = 'PatientByUUidNotFound',
  DeniedPatientIntakeByStatus = 'DeniedPatientIntakeByStatus',
  QuestionHasMultipleConstraintsInQuestionnaire = 'QuestionHasMultipleConstraintsInQuestionnaire',
  GetPatientByIdFailed = 'GetPatientByIdFailed',
  UpdatePatientIntakeStatus = 'UpdatePatientIntakeStatus',
  GetInitialQuestion = 'GetInitialQuestion',
  UpdateIntakeFormFailed = 'UpdateIntakeFormFailed',
  BadDataForUpdatedByInQuestionnaireIntent = 'BadDataForUpdatedByInQuestionnaireIntent',
  QuestionnaireIntentNotFound = 'QuestionnaireIntentNotFound',
  PatientIntakeSnapshotNotFound = 'PatientIntakeSnapshotNotFound',
  CurrentQuestionNotFoundInIdsOfQuestion = 'CurrentQuestionNotFoundInIdsOfQuestion',
  QuestionnaireIntentNotFoundAndItIsExpectedForCheckedInStatus = 'QuestionnaireIntentNotFoundAndItIsExpectedForCheckedInStatus',
}

export enum IntakeFormPartnerFunctions {
  GetPatientIntakePartners = 'GetPatientIntakePartners',
}

export enum IntakeFormPartnersActions {
  StartMethod = 'StartMethod',
  InternalError = 'InternalError',

  PatientByUUidNotFound = 'PatientByUUidNotFound',
}
