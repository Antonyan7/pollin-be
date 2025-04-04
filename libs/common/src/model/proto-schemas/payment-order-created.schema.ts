import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PaymentOrderCreatedPubSubPayload = {
  paymentOrderUUID: string
} & RequestContextPubSubPayload

export const PaymentOrderCreatedSchema = createSchema({
  paymentOrderUUID: {
    type: 'string',
  },
  ...RequestContextSchema,
})
