import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type BulkDownloadPubSubPayload = {
  bulkDownloadRequestId: number
  updatedStatus: string
} & AuditMetadataPubSubPayload

export const BulkDownloadSchema = createSchema({
  bulkDownloadRequestId: {
    type: 'int32',
  },
  updatedStatus: {
    type: 'string',
  },
  ...AuditMetadataPubSubSchema,
})
