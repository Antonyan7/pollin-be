import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PaymentEstimateEmailAttemptPubSubPayload = {
  paymentEstimateEmailAttemptId: number
} & RequestContextPubSubPayload

export const PaymentEstimateEmailAttemptSchema = createSchema({
  paymentEstimateEmailAttemptId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
