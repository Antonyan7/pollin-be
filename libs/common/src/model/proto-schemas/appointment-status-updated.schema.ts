import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type AppointmentStatusUpdatedPubSubPayload = {
  authUserFullName: string
  authUserType: HistoryUserType
  appointmentId: number
  appointmentNewStatus: AppointmentStatus
  appointmentOldStatus: AppointmentStatus
} & AuditMetadataPubSubPayload

export const AppointmentStatusUpdatedSchema = createSchema({
  appointmentId: {
    type: 'int32',
  },
  appointmentNewStatus: {
    type: 'string',
  },
  appointmentOldStatus: {
    type: 'string',
  },
  authUserFullName: {
    type: 'string',
  },
  authUserType: {
    type: 'string',
  },
  ...AuditMetadataPubSubSchema,
})
