import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'

export type AppointmentServiceProviderUpdatedPubSubPayload = {
  appointmentId: number
  oldServiceProviderId: number
  newServiceProviderId: number
} & AuditMetadataPubSubPayload

export const AppointmentServiceProviderUpdatedSchema = createSchema({
  appointmentId: {
    type: 'int32',
  },
  oldServiceProviderId: {
    type: 'int32',
  },
  newServiceProviderId: {
    type: 'int32',
  },
  ...AuditMetadataPubSubSchema,
})
