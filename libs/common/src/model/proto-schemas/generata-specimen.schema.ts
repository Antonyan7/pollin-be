import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type GenerateSpecimenPubSubPayload = {
  appointmentId: number
} & AuditMetadataPubSubPayload

export const GenerateSpecimenSchema = createSchema({
  appointmentId: {
    type: 'int32',
  },
  ...AuditMetadataPubSubSchema,
})
