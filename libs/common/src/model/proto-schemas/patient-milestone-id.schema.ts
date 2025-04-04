import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PatientMilestoneIdPubSubPayload = {
  patientMilestoneId: number
} & RequestContextPubSubPayload

export const PatientMilestoneIdSchema = createSchema({
  patientMilestoneId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
