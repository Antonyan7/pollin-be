import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PartnerInvitationCreatedPubSubPayload = {
  invitationId: string
  reuseExistOtp?: boolean
} & RequestContextPubSubPayload

export const PartnerInvitationCreatedSchema = createSchema({
  invitationId: {
    type: 'string',
  },
  reuseExistOtp: {type: 'bool'},
  ...RequestContextSchema,
})
