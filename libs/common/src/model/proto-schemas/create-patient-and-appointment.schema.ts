import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type CreatePatientAndAppointmentPayload = {
  patientUUID: string
  serviceProviderUUID: string
  date: string
} & RequestContextPubSubPayload

export const CreatePatientAndAppointmentSchema = createSchema({
  patientUUID: {
    type: 'string',
  },
  serviceProviderUUID: {
    type: 'string',
  },
  date: {
    type: 'string',
  },
  ...RequestContextSchema,
})
