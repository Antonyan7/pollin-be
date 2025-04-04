import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type MedicationsDiscontinuedPubSubPayload = {
  patientId: number
  patientMedicationsIds: number[]
} & RequestContextPubSubPayload

export const MedicationsDiscontinuedSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  patientMedicationsIds: {
    type: 'int32',
    rule: 'repeated',
  },
  ...RequestContextSchema,
})
