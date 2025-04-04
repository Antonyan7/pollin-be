export enum PatientCallbackFunction {
  UpdateCallback = 'UpdateCallback',
  AddCallback = 'AddCallback',
  ValidateAndReturnCallbackDetails = 'ValidateAndReturnCallbackDetails',
}

export enum PatientCallbackAction {
  UpdateCallbackFailed = 'UpdateCallbackFailed',
  AddCallbackFailed = 'AddCallbackFailed',
  SkipCallbackCreation = 'SkipCallbackCreation',
}
