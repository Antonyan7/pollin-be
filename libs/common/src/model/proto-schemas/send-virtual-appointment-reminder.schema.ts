import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type SendAppointmentReminderPubSubPayload = {
  patientId: number
  appointmentId: number
}

export const SendAppointmentReminderSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  appointmentId: {
    type: 'int32',
  },
})
