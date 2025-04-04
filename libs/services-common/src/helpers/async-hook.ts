import {AsyncLocalStorage} from 'async_hooks'
import {ClientHeaders} from '@libs/common/enums'
import {AuditTrailRequestMetadata} from '@libs/common/model/proto-schemas/questionnare-submitted.schema'

export type RequestMetadata = {
  [ClientHeaders.DeviceId]: string
  [ClientHeaders.RequestId]: string
  [ClientHeaders.Lang]: string
  userId?: string
  ipAddress: string
}

export const asyncStorage = new AsyncLocalStorage<RequestMetadata>()

export const createRequestContext = (data: RequestMetadata): RequestMetadata => {
  return {...data}
}

export const getRequestContext = (): RequestMetadata => {
  return asyncStorage.getStore()
}

export const getAuditTrailRequestMetadata = (): AuditTrailRequestMetadata => {
  const request = getRequestContext()
  const deviceId = request?.[ClientHeaders.DeviceId]
  const requestId = request?.[ClientHeaders.RequestId]
  const ipAddress = request?.ipAddress

  return {requestId, ipAddress, deviceId}
}
