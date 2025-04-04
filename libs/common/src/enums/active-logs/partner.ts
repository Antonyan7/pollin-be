export enum PartnerInvitationServiceFunctions {
  Accept = 'Accept',
  ValidateInvitation = 'ValidateInvitation',
  DeleteCloudTaskToRemindToInvitePartner = 'DeleteCloudTaskToRemindToInvitePartner',
  AcceptanceMetadata = 'AcceptanceMetadata',
  GetMetadata = 'GetMetadata',
  ValidateAndSendInvitation = 'ValidateAndSendInvitation',
  GetPartnerInvitationDetails = 'GetPartnerInvitationDetails',
  CancelPartnerInvitation = 'CancelPartnerInvitation',
  ResendPartnerInvitation = 'ResendPartnerInvitation',
}

export enum PartnerInvitationServiceActions {
  CloudTaskActionFailed = 'CloudTaskActionFailed',
  ContributionValidation = 'ContributionValidation',
  ValidateInvitationFailed = 'ValidateInvitationFailed',
  AcceptanceMetadataFailed = 'AcceptanceMetadataFailed',
  AcceptanceMetadata = 'AcceptanceMetadata',
  ValidateAndSendInvitationFailed = 'ValidateAndSendInvitationFailed',
  AcceptFailed = 'AcceptFailed',
  GetMetadataFailed = 'GetMetadataFailed',
}
