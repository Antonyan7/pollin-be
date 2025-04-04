import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type StaffFeedbackSubmittedPubSubPayload = {
  staffId: string
  staffFeedbackId: number
} & RequestContextPubSubPayload

export const StaffFeedbackSubmittedSchema = createSchema({
  staffId: {
    type: 'string',
  },
  staffFeedbackId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
