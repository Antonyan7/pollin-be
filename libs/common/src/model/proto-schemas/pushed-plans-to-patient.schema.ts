import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PushedPlansToPatientPubSubPayload = {
  patientId: number
  patientPlanIds: number[]
} & RequestContextPubSubPayload

export const PushedPlansToPatientSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  patientPlanIds: {
    type: 'int32',
    rule: 'repeated',
  },
  ...RequestContextSchema,
})
