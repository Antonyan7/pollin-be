import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type VerifyUpdateEmailPubSubPayload = {
  email: string
} & RequestContextPubSubPayload

export const VerifyUpdateEmailSchema = createSchema({
  authUserId: {
    type: 'string',
  },
  email: {
    type: 'string',
  },
  ...RequestContextSchema,
})
