export type RequestContextPubSubPayload = {
  deviceId?: string
  requestId?: string
  ipAddress?: string
  authUserId?: string
}

export const RequestContextSchema = {
  deviceId: {type: 'string'},
  requestId: {type: 'string'},
  ipAddress: {type: 'string'},
  authUserId: {type: 'string'},
}
