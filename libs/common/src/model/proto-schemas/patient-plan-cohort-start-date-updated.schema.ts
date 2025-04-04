import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PatientPlanCohortStartDateUpdatedPubSubPayload = {
  patientPlanCohortId: number
} & RequestContextPubSubPayload

export const PatientPlanCohortStartDateUpdatedSchema = createSchema({
  patientPlanCohortId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
