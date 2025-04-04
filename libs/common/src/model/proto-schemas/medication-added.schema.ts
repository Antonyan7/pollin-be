import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type MedicationAddedPubSubPayload = {
  patientId: number
  patientMedicationUUID: string
} & RequestContextPubSubPayload

export const MedicationAddedSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  patientMedicationUUID: {
    type: 'string',
  },
  ...RequestContextSchema,
})
