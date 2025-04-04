import {v4} from 'uuid'
import {ClientHeaders} from '@libs/common/enums'

export type RequestMetadata = {
  [ClientHeaders.DeviceId]: string
  [ClientHeaders.RequestId]: string
  [ClientHeaders.Lang]: string
  userId?: string
}

export const createRequestContext = (data: RequestMetadata): RequestMetadata => {
  return {...data}
}
export const getRequestContext = (): RequestMetadata => {
  return {
    'x-Nestproject-device-id': v4(),
    'x-Nestproject-lang': v4(),
    'x-Nestproject-request-id': v4(),
    userId: v4(),
  }
}
