import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type AuditTrailPubSubPayload = {
  revisionId: string
  requestId?: string
  deviceId?: string
  authUserId: string
  ipAddress?: string
  authUserName?: string
  dataUpdateDateTime: string
  userAction: string
  latestData: string
  tableUpdated: string
}

export const AuditTrailSchema = createSchema({
  revisionId: {
    type: 'string',
  },
  requestId: {
    type: 'string',
  },
  deviceId: {
    type: 'string',
  },
  authUserId: {
    type: 'string',
  },
  ipAddress: {
    type: 'string',
  },
  authUserName: {
    type: 'string',
  },
  dataUpdateDateTime: {
    type: 'string',
  },
  userAction: {
    type: 'string',
  },
  latestData: {
    type: 'string',
  },
  tableUpdated: {
    type: 'string',
  },
})
