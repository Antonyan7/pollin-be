export enum JourneyType {
  InitialConsultationAppointment = 'InitialConsultationAppointment',
  PatientIntakeMale = 'PatientIntakeMale',
  PatientIntakeFemale = 'PatientIntakeFemale',
  ShowAppointments = 'ShowAppointments',
  PartnerIntake = 'PartnerIntake',
}

//it is unique - so it can be just in 1 serviceCategory on db at once
export enum MilestoneStep {
  InitialConsultation = 'InitialConsultation',
  FollowUp = 'FollowUp',
}
