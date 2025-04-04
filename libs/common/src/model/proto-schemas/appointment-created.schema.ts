import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'
import {HistoryUserType} from '@libs/common/enums'

export type AppointmentsCreatedPubSubPayload = {
  authUserFullName: string
  authUserType: HistoryUserType
  appointmentIds: number[]
} & AuditMetadataPubSubPayload

export const AppointmentsCreatedSchema = createSchema({
  appointmentIds: {
    type: 'int32',
    rule: 'repeated',
  },
  authUserFullName: {
    type: 'string',
  },
  authUserType: {
    type: 'string',
  },
  ...AuditMetadataPubSubSchema,
})
