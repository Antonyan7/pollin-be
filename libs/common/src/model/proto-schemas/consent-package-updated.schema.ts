import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type ConsentPackageUpdatedPayload = {
  patientConsentPackageId: number
} & RequestContextPubSubPayload

export const ConsentPackageUpdatedSchema = createSchema({
  ...RequestContextSchema,
  patientConsentPackageId: {
    type: 'int32',
  },
})
