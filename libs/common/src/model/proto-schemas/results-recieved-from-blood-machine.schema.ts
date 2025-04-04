import {createSchema} from '@libs/common/utils/proto-schema.utils'
export enum ResultTypeFromMachine {
  Normal = 'Normal',
  Abnormal = 'Abnormal',
}

export type SpecimenTestResultsPayload = {
  specimenIdentifier: string
  hostCode: number
  result: string
  resultType: ResultTypeFromMachine
  dateReceived: string
  requestId: string
}

export const SpecimenTestResultsPayloadSchema = createSchema({
  specimenIdentifier: {
    type: 'string',
  },
  hostCode: {
    type: 'int32',
  },
  result: {
    type: 'string',
  },
  resultType: {
    type: 'string',
  },
  dateReceived: {
    type: 'string',
  },
  requestId: {
    type: 'string',
  },
})
