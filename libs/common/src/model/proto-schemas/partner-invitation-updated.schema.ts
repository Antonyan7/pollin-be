import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PartnerInvitationUpdatePubSubPayload = {
  invitationId: number
} & RequestContextPubSubPayload

export const PartnerInvitationUpdatedSchema = createSchema({
  invitationId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
