import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PatientUUIDPubSubPayload = {
  patientUUID: string
} & RequestContextPubSubPayload

export const PatientUUIDSchema = createSchema({
  patientUUID: {
    type: 'string',
  },
  ...RequestContextSchema,
})
