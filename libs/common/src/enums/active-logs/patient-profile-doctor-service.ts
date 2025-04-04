export enum PatientProfileDoctorFunctions {
  UpdateDoctorInformation = 'UpdateDoctorInformation',
  UpdateOhipInformation = 'UpdateOhipInformation',
  UpdateContactInformation = 'UpdateContactInformation',
  GetOhipInformation = 'GetOhipInformation',
  GetPatientProfileContactInformation = 'GetPatientProfileContactInformation',
  SaveAttachments = 'SaveAttachments',
  GetDoctorInformation = 'GetDoctorInformation',
  UpdatePatientDoctor = 'UpdatePatientDoctor',
  GetPatientByUUID = 'GetPatientByUUID',
  UpdateProfilePharmacy = 'UpdateProfilePharmacy',
  CreateOrUpdateProfilePharmacy = 'CreateOrUpdateProfilePharmacy',
  GetProfilePharmacy = 'GetProfilePharmacy',
  CreateOrUpdateProfilePharmacyV2 = 'CreateOrUpdateProfilePharmacyV2',
}

export enum PatientProfileDoctorAction {
  UpdateDoctorInformationFailed = 'UpdateDoctorInformationFailed',
  UpdateOhipInformationFailed = 'UpdateOhipInformationFailed',
  UpdateContactInformationFailed = 'UpdateContactInformationFailed',
  GetOhipInformationFailed = 'GetOhipInformationFailed',
  GetPatientProfileContactInformationFailed = 'GetPatientProfileContactInformationFailed',
  GetAttachmentInfo = 'GetAttachmentInfo',
  GetDoctorInformationFailed = 'GetDoctorInformationFailed',
  UpdateDoctor = 'UpdateDoctor',
}
