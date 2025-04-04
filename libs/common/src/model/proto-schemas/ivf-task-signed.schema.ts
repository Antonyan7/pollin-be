import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type IvfTaskSignedPayload = {
  patientPlanCohortIvfTaskGroupId: number
} & RequestContextPubSubPayload

export const IvfTaskSignedSchema = createSchema({
  patientPlanCohortIvfTaskGroupId: {
    type: 'int32',
  },

  ...RequestContextSchema,
})
