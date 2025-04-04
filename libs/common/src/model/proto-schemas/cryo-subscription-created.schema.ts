import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type CryoSubscriptionCreatedPayload = {
  cryoSubscriptionId: number
} & RequestContextPubSubPayload

export const CryoSubscriptionCreatedSchema = createSchema({
  cryoSubscriptionId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
