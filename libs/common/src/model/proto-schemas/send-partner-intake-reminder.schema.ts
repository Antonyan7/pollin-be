import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type SendPartnerIntakeReminderPayload = {
  patientId: number
  appointmentId: number
}

export const SendPartnerIntakeReminderSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  appointmentId: {
    type: 'int32',
  },
})
