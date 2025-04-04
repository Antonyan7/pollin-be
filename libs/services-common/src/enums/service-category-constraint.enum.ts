import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus} from '@libs/common/enums/appointment.enum'

export enum AppointmentState {
  NotBooked,
  InProgress,
  Completed,
}

export const getDominantAppointmentStateFromAppointments = (
  appointments: Appointment[],
): AppointmentState => {
  if (!appointments.length) {
    return AppointmentState.NotBooked
  }

  const states = appointments.map((appointment) => {
    switch (appointment.status) {
      case AppointmentStatus.NoShow:
      case AppointmentStatus.Cancelled:
        return AppointmentState.NotBooked

      case AppointmentStatus.Done:
        return AppointmentState.Completed

      default:
        return AppointmentState.InProgress
    }
  })

  return Math.max(...states)
}

export const ConstraintTitleByState = new Map<AppointmentState, string>([
  [AppointmentState.NotBooked, 'Initial Consultation'],
  [AppointmentState.InProgress, 'Initial Consultation Booked'],
])

export const ConstraintActionLabel = new Map<AppointmentState, string>([
  [AppointmentState.InProgress, 'Ok'],
  [AppointmentState.Completed, 'Ok'],
  [AppointmentState.NotBooked, 'Book Initial Consultation'],
])

export const ConstraintActionMessage = new Map<AppointmentState, string>([
  [
    AppointmentState.NotBooked,
    'Complete your Initial Consultation first. You can access our other appointments after.',
  ],
  [
    AppointmentState.Completed,
    'Complete your Initial Assessment first before booking a follow-up appointment.',
  ],
  [
    AppointmentState.InProgress,
    'Complete your Initial Consultation first. You can access our other appointments after.',
  ],
])

export const ConstraintServiceCategoryMessage = new Map<AppointmentState, string>([
  [
    AppointmentState.NotBooked,
    'Complete your initial consultation to get started! You can access our other appointments after.',
  ],
  [
    AppointmentState.InProgress,
    'Complete your initial consultation to get started! You can access our other appointments after.',
  ],
])
