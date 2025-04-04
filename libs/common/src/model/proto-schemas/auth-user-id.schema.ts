import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type AuthUserIdPubSubPayload = RequestContextPubSubPayload

export const AuthUserIdSchema = createSchema(RequestContextSchema)
