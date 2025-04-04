import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type AppointmentRescheduledPubSubPayload = {
  appointmentId: number
  appointmentOldDate: string
  appointmentNewDate: string
  appointmentOldTypeName: string
  appointmentNewTypeName: string
} & AuditMetadataPubSubPayload

export const AppointmentRescheduledSchema = createSchema({
  appointmentId: {
    type: 'int32',
  },
  appointmentOldDate: {
    type: 'string',
  },
  appointmentNewDate: {
    type: 'string',
  },
  appointmentOldTypeName: {
    type: 'string',
  },
  appointmentNewTypeName: {
    type: 'string',
  },
  ...AuditMetadataPubSubSchema,
})
