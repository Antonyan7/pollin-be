import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type ContactFormSubmittedPubSubPayload = {
  contactFormId: number
} & RequestContextPubSubPayload

export const ContactFormSubmittedSchema = createSchema({
  contactFormId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
