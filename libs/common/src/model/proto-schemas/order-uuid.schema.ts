import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type OrderUUIDPubSubPayload = {
  orderUUID: string
  previousOrderStatus?: TestOrderStatusEnum
} & AuditMetadataPubSubPayload

export const OrderUUIDSchema = createSchema({
  orderUUID: {
    type: 'string',
  },
  previousOrderStatus: {
    type: 'string',
  },
  ...AuditMetadataPubSubSchema,
})
