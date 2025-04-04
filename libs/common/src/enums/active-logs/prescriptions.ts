export enum PrescriptionsFunctions {
  CreatePatientMedication = 'CreatePatientMedication',
  UpdatePatientMedication = 'UpdatePatientMedication',
  GetPrescriptionFileContent = 'GetPrescriptionFileContent',
  GetPrescriptionFileDefinition = 'GetPrescriptionFileDefinition',
}

export enum PrescriptionsActions {
  CreatePatientMedicationFailed = 'CreatePatientMedicationFailed',
  UpdatePatientMedicationFailed = 'UpdatePatientMedicationFailed',
  PatientNotFound = 'PatientNotFound',
  MedicationNotFound = 'MedicationNotFound',
  StaffNotFound = 'StaffNotFound',
  GetPrescriptionFileContentFailed = 'GetPrescriptionFileContentFailed',
  GetPrescriptionFileDefinitionFailed = 'GetPrescriptionFileDefinitionFailed',
}
