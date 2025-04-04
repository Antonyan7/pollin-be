import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type SendPartnerReminderPayload = {
  invitationId: string
}

export const SendPartnerReminderSchema = createSchema({
  invitationId: {
    type: 'string',
  },
})
