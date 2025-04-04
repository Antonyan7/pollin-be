import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type GenerateExternalTestResultRequestedPubSubPayload = {
  orderActionEncodedIdentifier: string
  appointmentId: number
} & AuditMetadataPubSubPayload

export const GenerateExternalTestResultRequestedSchema = createSchema({
  orderActionEncodedIdentifier: {
    type: 'string',
  },
  appointmentId: {
    type: 'int32',
  },
  ...AuditMetadataPubSubSchema,
})
