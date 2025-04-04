/**
 * Metadata published by PubSub client in order to trace audit into Cloud Functions.
 * Common type for audit metadata publishing
 */
export type AuditMetadataPubSubPayload = {
  deviceId: string
  requestId: string
  ipAddress: string
  authUserId: string
  revisionId?: string
}

/**
 * Common schema for audit metadata publishing
 */
export const AuditMetadataPubSubSchema = {
  deviceId: {type: 'string'},
  requestId: {type: 'string'},
  ipAddress: {type: 'string'},
  authUserId: {type: 'string'},
  revisionId: {type: 'string'},
}
