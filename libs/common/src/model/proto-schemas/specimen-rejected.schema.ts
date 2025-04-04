import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type SpecimenRejectedPubSubPayload = {
  specimenUUID: string
  appointmentUUID?: string
} & AuditMetadataPubSubPayload

export const SpecimenRejectedSchema = createSchema({
  specimenUUID: {
    type: 'string',
  },
  appointmentUUID: {
    type: 'string',
  },
  ...AuditMetadataPubSubSchema,
})
