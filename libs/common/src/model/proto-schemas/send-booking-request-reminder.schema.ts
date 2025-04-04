import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type SendBookingRequestReminderPayload = {
  milestoneId: number
  isScheduledExecution: boolean
} & RequestContextPubSubPayload

export const SendBookingRequestReminderSchema = createSchema({
  ...RequestContextSchema,
  milestoneId: {
    type: 'int32',
  },
  isScheduledExecution: {
    type: 'bool',
  },
})
