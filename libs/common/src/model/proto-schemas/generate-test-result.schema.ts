import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type GenerateTestResultPubSubPayload = {
  appointmentId: number
} & AuditMetadataPubSubPayload

export const GenerateTestResultSchema = createSchema({
  appointmentId: {
    type: 'int32',
  },
  ...AuditMetadataPubSubSchema,
})
