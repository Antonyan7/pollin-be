export enum BookingMetadataServiceFunctions {
  ValidateOrderMetadata = 'ValidateOrderMetadata',
  SaveMilestoneToTestTypeOrPanel = 'SaveMilestoneToTestTypeOrPanel',
  AssociatePatientMilestoneWithTestOrder = 'AssociatePatientMilestoneWithTestOrder',
  AssociateAppointmentWithTestOrder = 'AssociateAppointmentWithTestOrder',
  CreateTestOrderAction = 'CreateTestOrderAction',
}

export enum BookingMetadataServiceActions {
  NoBookingOrderMetadataProvided = 'NoBookingOrderMetadataProvided',
  SaveMilestoneToTestTypeOrPanelFailed = 'SaveMilestoneToTestTypeOrPanelFailed',
  AssociatePatientMilestoneWithTestOrderFailed = 'AssociatePatientMilestoneWithTestOrderFailed',
  AssociateAppointmentWithTestOrderFailed = 'AssociateAppointmentWithTestOrderFailed',
  CreateTestOrderActionFailed = 'CreateTestOrderAction',
  TestTypeOrPanelNotFound = 'TestTypeOrPanelNotFound',
}
