import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type PrescriptionUpdatedPayload = {
  prescriptionId: number
} & AuditMetadataPubSubPayload

export const PrescriptionUpdatedSchema = createSchema({
  prescriptionId: {
    type: 'int32',
  },
  ...AuditMetadataPubSubSchema,
})
