export enum DocumentsFunctions {
  CreatePatientDocument = 'CreatePatientDocument',
  UpdatePatientDocument = 'UpdatePatientDocument',
  DeletePatientDocument = 'DeletePatientDocument',
  CreatePatientPlanDocument = 'CreatePatientPlanDocument',
  GetPatientPlanDocuments = 'GetPatientPlanDocuments',
  GetPatientDocuments = 'GetPatientDocuments',
  GetDocumentCategories = 'GetDocumentCategories',
  UpdatePatientPlanDocument = 'UpdatePatientPlanDocument',
  DeletePatientPlanDocument = 'DeletePatientPlanDocument',
  GetPatientGeneratedDocuments = 'GetPatientGeneratedDocuments',
  DeletePatientGeneratedDocument = 'DeletePatientGeneratedDocument',
  MarkAsFaxedPatientGeneratedDocument = 'MarkAsFaxedPatientGeneratedDocument',
  PublishBulkGenerationRequest = 'PublishBulkGenerationRequest',
  GenerateDetailsDocument = 'GenerateDetailsDocument',
  DownloadGeneratedDocument = 'DownloadGeneratedDocument',
  RegenerateBulkRequestDocument = 'RegenerateBulkRequestDocument',
  GetCoverLetterData = 'GetCoverLetterData',
}

export enum DocumentsActions {
  CreatePatientDocumentFailed = 'CreatePatientDocumentFailed',
  DeletePatientDocumentFailed = 'DeletePatientDocumentFailed',
  GetPatientDocumentsFailed = 'GetPatientDocumentsFailed',
  GetDocumentCategoriesFailed = 'GetDocumentCategoriesFailed',
  UpdatePatientDocumentFailed = 'UpdatePatientDocumentFailed',
  PatientDocumentNotFound = 'PatientDocumentNotFound',
  DocumentCategoryNotFound = 'DocumentCategoryNotFound',
  MissmatchBetweenDocumentAndCategoryType = 'MissmatchBetweenDocumentAndCategoryType',
  UpdatePatientPlanDocumentFailed = 'UpdatePatientPlanDocumentFailed',
  DeletePatientPlanDocumentFailed = 'DeletePatientPlanDocumentFailed',
  GetPatientGeneratedDocumentsFailed = 'GetPatientGeneratedDocumentsFailed',
  DeletePatientGeneratedDocumentFailed = 'DeletePatientGeneratedDocumentFailed',
  PublishBulkGenerationRequestFailed = 'PublishBulkGenerationRequestFailed',
  GenerateDetailsDocumentFailed = 'GenerateDetailsDocumentFailed',
  DownloadGeneratedDocumentFailed = 'DownloadGeneratedDocumentFailed',
  GetCoverLetterDataFailed = 'GetCoverLetterDataFailed',
  RegenerateDocumentInitiated = 'RegenerateDocumentInitiated',
  RegenerateBulkRequestDocumentFailed = 'RegenerateBulkRequestDocumentFailed',
  MarkAsFaxedPatientGeneratedDocumentFailed = 'MarkAsFaxedPatientGeneratedDocumentFailed',
  NoItemsSelected = 'NoItemsSelected',
}

export enum DocumentsFunctionsV2 {
  CreatePatientDocument = 'CreatePatientDocument',
}

export enum DocumentsActionsV2 {
  CreatePatientDocumentFailed = 'CreatePatientDocumentFailed',
  PatientNotFound = 'PatientNotFound',
  DocumentCategoryNotFound = 'DocumentCategoryNotFound',
}
