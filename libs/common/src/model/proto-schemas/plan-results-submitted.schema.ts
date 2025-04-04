import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type TestResultsSumbittedPubSubPayload = {
  patientId: number
  testOrderCreatorId: number
} & RequestContextPubSubPayload

export const TestResultsSumbittedSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  testOrderCreatorId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
