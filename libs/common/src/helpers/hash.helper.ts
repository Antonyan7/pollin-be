import {createHmac} from 'crypto'

export const getChatwootToken = (key: string, patientUUID: string): string =>
  createHmac('sha256', key).update(patientUUID).digest('hex')
