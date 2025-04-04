import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type SendNotificationToConfirmAppointmentPubSubPayload = {
  patientId: number
  appointmentId: number
}

export const SendNotificationToConfirmAppointmentSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  appointmentId: {
    type: 'int32',
  },
})
