import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type SendCryoSubscriptionSecondAttemptReminderPayload = {
  cryoSubscriptionId: number
}

export const SendCryoSubscriptionSecondAttemptReminderSchema = createSchema({
  cryoSubscriptionId: {
    type: 'int32',
  },
})
