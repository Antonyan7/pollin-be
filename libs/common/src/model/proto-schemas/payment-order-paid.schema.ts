import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type WireTransferPaymentOrderPaidPubSubPayload = {
  paymentOrderId: number
}

export const WireTransferPaymentOrderPaidSchema = createSchema({
  paymentOrderId: {
    type: 'int32',
  },
})
