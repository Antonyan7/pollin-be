import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type SpecimenIdPubSubPayload = {
  specimenId: number
} & AuditMetadataPubSubPayload

export const SpecimenIdSchema = createSchema({
  ...AuditMetadataPubSubSchema,
  specimenId: {
    type: 'int32',
  },
})
