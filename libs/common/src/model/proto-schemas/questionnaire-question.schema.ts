import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {RevisionStatus} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {
  AuditMetadataPubSubPayload,
  AuditMetadataPubSubSchema,
} from '@libs/common/model/proto-schemas/audit-metadata.schema'

export type AddOrRemoveQuestionHandlerPubSubPayload = {
  questionnaireID: number
  questionId: number
  action: RevisionStatus
  questionnaireToQuestionId: number
} & AuditMetadataPubSubPayload

export const AddOrRemoveQuestionSchema = createSchema({
  questionnaireID: {
    type: 'int32',
  },
  questionId: {
    type: 'int32',
  },
  action: {
    type: 'string',
  },
  questionnaireToQuestionId: {
    type: 'int32',
  },
  ...AuditMetadataPubSubSchema,
})
