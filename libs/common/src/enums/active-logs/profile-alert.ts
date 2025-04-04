export enum ProfileAlertFunctions {
  GetPatientsAlerts = 'GetPatientsAlerts',
  GetAbnormalPartnerAlerts = 'GetAbnormalPartnerAlerts',
  GetAbnormalPartnerResultAlerts = 'GetAbnormalPartnerResultAlerts',
}

export enum ProfileAlertActions {
  GetPatientsAlertsFailed = 'GetPatientsAlertsFailed',
  NoAlertsMetadataWasFound = 'NoAlertsMetadataWasFound',
  GetPartnerAbnormalResults = 'GetPartnerAbnormalResults',
  Success = 'Success',
}
