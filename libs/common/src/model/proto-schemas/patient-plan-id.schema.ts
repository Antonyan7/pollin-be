import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PatientPlanIdPubSubPayload = {
  patientPlanId: number
} & RequestContextPubSubPayload

export const PatientPlanIdSchema = createSchema({
  patientPlanId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
