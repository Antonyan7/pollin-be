import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type QuestionAnswerSubmittedPubsubPayload = {
  patientId: number
  answers: string[]
} & RequestContextPubSubPayload

export const QuestionAnswerSubmittedSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  answers: {
    type: 'string',
    rule: 'repeated',
  },
  ...RequestContextSchema,
})
