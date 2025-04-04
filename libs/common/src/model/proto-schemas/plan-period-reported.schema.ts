import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PlanPeriodReportedPubSubPayload = {
  patientPlanId: number
  patientId: number
} & RequestContextPubSubPayload

export const PlanPeriodReportedSchema = createSchema({
  patientPlanId: {
    type: 'int32',
  },
  patientId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
