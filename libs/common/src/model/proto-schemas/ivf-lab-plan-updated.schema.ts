import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {AuditMetadataPubSubPayload, AuditMetadataPubSubSchema} from './audit-metadata.schema'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'

export type IVFLabPlanUpdatedPubSubPayload = {
  patientPlanId: number
  oldStatus: IVFLabStatus
  newStatus: IVFLabStatus
  transportFolderId: number
} & AuditMetadataPubSubPayload

export const IVFLabPlanUpdatedSchema = createSchema({
  ...AuditMetadataPubSubSchema,
  patientPlanId: {
    type: 'int32',
  },
  oldStatus: {
    type: 'string',
  },
  newStatus: {
    type: 'string',
  },
  transportFolderId: {
    type: 'int32',
  },
})
