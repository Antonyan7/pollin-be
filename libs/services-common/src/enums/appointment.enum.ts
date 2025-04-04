import {AppointmentPaymentStatus, AppointmentStatus} from '@libs/common/enums'

export const getAppointmentStatusTitle = new Map<AppointmentStatus, string>([
  [AppointmentStatus.CheckedIn, 'Checked In/In Waiting Room'],
  [AppointmentStatus.NoShow, 'No Show'],
  [AppointmentStatus.RunningLate, 'Running Late'],
  [AppointmentStatus.Confirmed, 'Confirmed'],
  [AppointmentStatus.InProgress, 'In Progress'],
  [AppointmentStatus.Done, 'Done'],
  [AppointmentStatus.Booked, 'Booked'],
  [AppointmentStatus.Cancelled, 'Cancelled'],
])

export const getAppointmentStatusColor = new Map<AppointmentStatus, string>([
  [AppointmentStatus.CheckedIn, '#F8B5D1'],
  [AppointmentStatus.NoShow, '#CAB8FF'],
  [AppointmentStatus.RunningLate, '#F5F88D'],
  [AppointmentStatus.Confirmed, '#A9EBB0'],
  [AppointmentStatus.InProgress, '#F8DA8D'],
  [AppointmentStatus.Done, '#A7D6EA'],
  [AppointmentStatus.Cancelled, '#FFA4A4'],
])
export const getAppointmentPaymentStatusTitle = new Map<AppointmentPaymentStatus, string>([
  [AppointmentPaymentStatus.PendingPayment, 'Pending Payment'],
  [AppointmentPaymentStatus.CoveredByOHIP, 'Covered by OHIP'],
  [AppointmentPaymentStatus.Paid, 'Paid'],
  [AppointmentPaymentStatus.FreeService, 'Free Service'],
])

export const appointmentDefaultPaymentStatusTitleColor = '#757575'
export const appointmentPendingPaymentStatusTitleColor = '#A81804'

export const appointmentStatusesToCheckIn = [
  AppointmentStatus.Booked,
  AppointmentStatus.Confirmed,
  AppointmentStatus.RunningLate,
]
export enum AppointmentFilter {
  Upcoming = 'Upcoming',
  Past = 'Past',
}

export enum AppointmentFilterTitle {
  AppointmentRecency = 'Appointment Recency',
  ServiceType = 'Appointment Type',
  Upcoming = 'Upcoming Appointments',
  Past = 'Past Appointments',
}
export enum ProfileAppointmentsFilterType {
  PastOrUpcoming = 'PastOrUpcoming',
  ServiceType = 'ServiceType',
}
export enum SpecimenAppointmentFilterType {
  Status = 'Status',
}
export enum SpecimenAppointmentFilterTitle {
  Status = 'Status',
}

export enum AppointmentSortField {
  Type = 'Type',
  Date = 'Date',
  Status = 'Status',
}

export const AppointmentSortByFieldValues = {
  [AppointmentSortField.Date]: 'appointment.start',
  [AppointmentSortField.Status]: 'appointment.status',
  [AppointmentSortField.Type]: 'serviceType.name',
}

export enum AppointmentSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum AppointmentCancellationReasonsEnum {
  PersonalEmergency = 'PersonalEmergency',
  WorkConflict = 'WorkConflict',
  Illness = 'Illness',
  NoLongerRequired = 'NoLongerRequired',
  Other = 'Other',
  NoOhip = 'NoOhip',
}

export enum AppointmentCancellationReasonsNamesEnum {
  PersonalEmergency = 'Personal Emergency',
  WorkConflict = 'Work Conflict',
  Illness = 'Illness',
  NoLongerRequired = 'No longer require this appointment',
  NoOhip = 'No OHIP',
}

export const getAppointmentCancellationReason = new Map<AppointmentCancellationReasonsEnum, string>(
  [
    [
      AppointmentCancellationReasonsEnum.PersonalEmergency,
      AppointmentCancellationReasonsNamesEnum.PersonalEmergency,
    ],
    [
      AppointmentCancellationReasonsEnum.WorkConflict,
      AppointmentCancellationReasonsNamesEnum.WorkConflict,
    ],
    [AppointmentCancellationReasonsEnum.Illness, AppointmentCancellationReasonsNamesEnum.Illness],
    [
      AppointmentCancellationReasonsEnum.NoLongerRequired,
      AppointmentCancellationReasonsNamesEnum.NoLongerRequired,
    ],
    [AppointmentCancellationReasonsEnum.NoOhip, AppointmentCancellationReasonsNamesEnum.NoOhip],
  ],
)

export enum RecentAppointmentFilterType {
  EncounterTab = 'EncounterTab',
  StaffNoteTab = 'StaffNoteTab',
}
