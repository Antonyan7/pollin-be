import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type TestOrderMilestonesCreatedPubSubPayload = {
  patientMilestonesIds: number[]
} & RequestContextPubSubPayload

export const TestOrderMilestonesCreatedSchema = createSchema({
  patientMilestonesIds: {
    type: 'int32',
    rule: 'repeated',
  },
  ...RequestContextSchema,
})
