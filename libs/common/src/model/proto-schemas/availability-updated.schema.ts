import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type AvailabilityUpdatedPubSubPayload = {
  serviceProviderId: number
  startDate: string
  endDate: string
  serviceTypeIds?: number[]
} & RequestContextPubSubPayload

export const AvailabilityUpdatedSchema = createSchema({
  serviceProviderId: {
    type: 'int32',
  },
  startDate: {
    type: 'string',
  },
  endDate: {
    type: 'string',
  },
  serviceTypeIds: {
    type: 'int32',
    rule: 'repeated',
  },
  ...RequestContextSchema,
})
