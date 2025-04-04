import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type CancelPatientAppointmentPubSubPayload = {
  patientId: number
  appointmentId: number
}

export const CancelPatientAppointmentSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  appointmentId: {
    type: 'int32',
  },
})
