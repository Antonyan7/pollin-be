import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PlanPaidPubSubPayload = {
  patientPlanId: number
  paymentOrderId?: number
  paymentAmount?: number
  patientId: number
  dateTime: string
} & RequestContextPubSubPayload

export const PlanPaidSchema = createSchema({
  patientPlanId: {
    type: 'int32',
  },
  paymentOrderId: {
    type: 'int32',
  },
  paymentAmount: {
    type: 'float',
  },
  patientId: {
    type: 'int32',
  },
  dateTime: {
    type: 'string',
  },
  ...RequestContextSchema,
})
