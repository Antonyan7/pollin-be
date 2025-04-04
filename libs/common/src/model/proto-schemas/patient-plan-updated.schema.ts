import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PatientPlanUpdatedPubSubPayload = {
  patientPlanId: number
} & RequestContextPubSubPayload

export const PatientPlanUpdatedSchema = createSchema({
  ...RequestContextSchema,
  patientPlanId: {
    type: 'int32',
  },
})
