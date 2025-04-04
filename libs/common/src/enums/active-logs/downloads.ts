export enum ClinicDownloadsFunctions {
  GeneratePdfStream = 'GeneratePdfStream',
  GetTransportManifest = 'GetTransportManifest',
  AfterCreatePdfWithFileDefinition = 'AfterCreatePdfWithFileDefinition',
  GetStaffNoteFileDefinition = 'GetStaffNoteFileDefinition',
  AfterHtmlToPdfMakeFunction = 'AfterHtmlToPdfMakeFunction',
  GetPatientPrescription = 'GetPatientPrescription',
  GetPatientEncounterNotes = 'GetPatientEncounterNotes',
  GetPatientStaffNoteNotes = 'GetPatientStaffNoteNotes',
  GetEncounterNotesPDF = 'GetEncounterNotesPDF',
  GetWorksheetPDF = 'GetWorksheetPDF',
  CreateEmptyStream = 'CreateEmptyStream',
  GetStaffNoteFileContent = 'GetStaffNoteFileContent',
}

export enum ClinicDownloadsActions {
  GeneratePdfStreamFailed = 'GeneratePdfStreamFailed',
  GeneratePdfStreamSuccessfully = 'GeneratePdfStreamSuccessfully',
  GetTransportManifestFailed = 'GetTransportManifestFailed',
  GetPatientPrescriptionFailed = 'GetPatientPrescriptionFailed',
  GetEncounterNotesPDFFailed = 'GetEncounterNotesPDFFailed',
  GetWorksheetPDFFailed = 'GetWorksheetPDFFailed',
  GetStaffNoteFileDefinitionFailed = 'GetStaffNoteFileDefinitionFailed',
  CreateEmptyStreamFailed = 'CreateEmptyStreamFailed',
  GetStaffNoteFileContentFaield = 'GetStaffNoteFileContentFailed',
}
