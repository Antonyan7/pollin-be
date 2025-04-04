import {createSchema} from '@libs/common/utils/proto-schema.utils'
import {
  RequestContextPubSubPayload,
  RequestContextSchema,
} from '@libs/common/model/proto-schemas/request-context.schema'
import {HistoryUserType} from '@libs/common/enums'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

export type PatientPlanStatusUpdatedPubSubPayload = {
  authUserFullname: string
  authUserType: HistoryUserType
  date: string
  patientPlanId: number
  oldStatus: PlanStatusEnum
  newStatus: PlanStatusEnum

  authUserId: string
} & RequestContextPubSubPayload

export const PatientPlanStatusUpdatedSchema = createSchema({
  authUserFullname: {
    type: 'string',
  },
  authUserType: {
    type: 'string',
  },
  date: {
    type: 'string',
  },
  patientPlanId: {
    type: 'int32',
  },
  oldStatus: {
    type: 'string',
  },
  newStatus: {
    type: 'string',
  },
  ...RequestContextSchema,
})
