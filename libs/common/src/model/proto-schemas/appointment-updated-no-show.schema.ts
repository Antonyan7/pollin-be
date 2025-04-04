import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type AppointmentUpdatedNoShowPubSubPayload = {
  appointmentId: number
}

export const AppointmentUpdatedNoShowSchema = createSchema({
  appointmentId: {
    type: 'int32',
  },
})
