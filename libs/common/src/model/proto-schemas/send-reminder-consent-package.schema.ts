import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type SendConsentReminderPayload = {
  patientConsentPackageId: number
  patientId: number
  isScheduledExecution: boolean
} & RequestContextPubSubPayload

export const SendConsentReminderSchema = createSchema({
  ...RequestContextSchema,
  patientConsentPackageId: {
    type: 'int32',
  },
  patientId: {
    type: 'int32',
  },
  isScheduledExecution: {
    type: 'bool',
  },
})
