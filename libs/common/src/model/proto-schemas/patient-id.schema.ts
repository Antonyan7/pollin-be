import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PatientIdPubSubPayload = {
  patientId: number
} & RequestContextPubSubPayload

export const PatientIdSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
