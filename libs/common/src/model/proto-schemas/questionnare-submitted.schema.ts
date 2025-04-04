import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type AuditTrailRequestMetadata = {
  deviceId: string
  requestId: string
  ipAddress: string
}

export type AuditTrailData = {
  authUserId: string
  revisionId: string
  requestId: string
  ipAddress: string
  deviceId: string
}

export type QuestionnaireSubmittedPubSubPayload = {
  questionnaireIntentId: string
  patientIntakeFinalizedByClinicStaff?: boolean
  patientIntakeFinishedByPatient?: boolean

  //Used for removing patient alert about data processing on account tab
  containsMobilePatientProfileQuestions?: boolean
} & AuditMetadataPubSubPayload

export const QuestionnaireSubmittedSchema = createSchema({
  questionnaireIntentId: {type: 'string'},
  containsMobilePatientProfileQuestions: {type: 'bool'},
  patientIntakeFinalizedByClinicStaff: {type: 'bool'},
  patientIntakeFinishedByPatient: {type: 'bool'},
  ...AuditMetadataPubSubSchema,
})
