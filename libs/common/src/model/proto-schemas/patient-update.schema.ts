import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'
import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type PatientUpdatePubSubPayload = {
  patientId: number
} & RequestContextPubSubPayload

export const PatientUpdateSchema = createSchema({
  patientId: {
    type: 'int32',
  },

  ...RequestContextSchema,
})
