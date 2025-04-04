import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type StripeCryoSubscriptionEventProcessedPayload = {
  cryoSubscriptionId: number
  actionType: string
  paymentOrderId?: number
} & AuditMetadataPubSubPayload

export const StripeCryoSubscriptionEventProcessedSchema = createSchema({
  ...AuditMetadataPubSubSchema,
  cryoSubscriptionId: {
    type: 'int32',
  },
  // CryoSubscriptionEventActionType
  actionType: {
    type: 'string',
  },
  paymentOrderId: {
    type: 'int32',
  },
})
