import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {RequestContextPubSubPayload} from './request-context.schema'

export type FertilityIQReleasedPubSubPayload = {
  patientUUID: string
  patientReportUUID: string
} & RequestContextPubSubPayload

export const FertilityIQReleasedSchema = createSchema({
  patientUUID: {
    type: 'string',
  },
  patientReportUUID: {
    type: 'string',
  },
})
