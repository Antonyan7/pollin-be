import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'

export type GoogleAdsConversionPayload = {
  patientId: number
  dateTime: string
  conversion: 'plan-paid' | 'high-priority-patient'
  conversionValue: number
  patientPlanId?: number
  priorityStatusId?: number
} & RequestContextPubSubPayload

export const GoogleAdsConversionSchema = createSchema({
  patientId: {
    type: 'int32',
  },
  dateTime: {
    type: 'string',
  },
  conversion: {
    type: 'string',
  },
  conversionValue: {
    type: 'float',
  },
  patientPlanId: {
    type: 'int32',
  },
  priorityStatusId: {
    type: 'int32',
  },
  ...RequestContextSchema,
})
