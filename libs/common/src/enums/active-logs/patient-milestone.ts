export enum PatientMilestoneServiceFunctions {
  CreatePatientMilestone = 'CreatePatientMilestone',
  ProcessBookingMetadata = 'ProcessBookingMetadata',
}

export enum PatientMilestoneServiceActions {
  CreatePatientMilestoneFailed = 'CreatePatientMilestoneFailed',
  GetMilestoneInfo = 'GetMilestoneInfo',
  BookingLimitationCreated = 'BookingLimitationCreated',
  ProcessBookingMetadataFailed = 'ProcessBookingMetadataFailed',
  NoBookingOrderMetadataProvided = 'NoBookingOrderMetadataProvided',
}
