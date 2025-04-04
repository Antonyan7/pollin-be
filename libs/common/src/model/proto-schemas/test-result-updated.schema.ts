import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type TestResultUpdatedPubSubPayload = {
  testResultId: number
  testResultPrevStatus: TestResultStatus
  testResultNewStatus: TestResultStatus
} & RequestContextPubSubPayload

export const TestResultUpdatedSchema = createSchema({
  testResultId: {
    type: 'int32',
  },
  testResultPrevStatus: {
    type: 'string',
  },
  testResultNewStatus: {
    type: 'string',
  },
  ...RequestContextSchema,
})
