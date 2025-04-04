import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type SendReminderToInvitePartnerPayload = {
  patientId: number
}

export const SendReminderToInvitePartnerSchema = createSchema({
  patientId: {
    type: 'int32',
  },
})
