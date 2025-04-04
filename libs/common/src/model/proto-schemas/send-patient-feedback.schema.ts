import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload} from '@libs/common/model/proto-schemas/audit-metadata.schema'

export type SendFeedbackToClinicTeamPayload = {
  patientFeedbackId: number
  authUserId: string
} & AuditMetadataPubSubPayload

export const SendFeedbackToClinicTeamPayloadSchema = createSchema({
  patientFeedbackId: {
    type: 'int32',
  },
  authUserId: {
    type: 'string',
  },
})
