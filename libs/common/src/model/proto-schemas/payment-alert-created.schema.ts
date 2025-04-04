import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type PaymentAlertCreatedPubSubPayload = {
  patientAlertId: number
} & RequestContextPubSubPayload

export const PaymentAlertCreatedSchema = createSchema({
  patientAlertId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
