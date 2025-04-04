import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type SpecimenUUIDPubSubPayload = {
  specimenUUID: string
} & AuditMetadataPubSubPayload

export const SpecimenUUIDSchema = createSchema({
  specimenUUID: {
    type: 'string',
  },
  ...AuditMetadataPubSubSchema,
})
