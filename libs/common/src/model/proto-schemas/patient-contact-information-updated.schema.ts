import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PatientContactInformationUpdatedPayload = {
  patientId: number
  prevFirstName?: string
  prevLastName?: string
  prevDateOfBirth?: string
} & RequestContextPubSubPayload

export const PatientContactInformationUpdatedSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  prevFirstName: {
    type: 'string',
  },
  prevLastName: {
    type: 'string',
  },
  prevDateOfBirth: {
    type: 'string',
  },

  ...RequestContextSchema,
})
