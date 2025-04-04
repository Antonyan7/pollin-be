import {
  PlanTypeComponentEnum,
  PlanTypeComponentTitle,
} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {getFullName} from './patient.helper'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {HistoryUserType} from '../enums'
import {
  PatientPlanHistoryPayloadType,
  PlanHistoryItemComponent,
} from '@libs/data-layer/apps/plan/entities/fireorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {HistoryChange} from '../interfaces/history-change.interface'

export const generatePlanHistoryItem = ({
  changes,
  entityTitle,
  component,
  user,
  date,
  patientPlanId,
  authUserType,
}: {
  changes: HistoryChange[]
  entityTitle?: string
  component: PlanHistoryItemComponent
  user: Staff | Patient
  date: Date
  patientPlanId: number
  authUserType: HistoryUserType
}): PatientPlanHistoryPayloadType => ({
  authUserFullName: getFullName(user.firstName, user.lastName),
  authUserId: user.authUserId,
  authUserType,
  date,
  patientPlanId,
  component,
  entityTitle,
  changes,
  updatedBy: user.authUserId,
})

export const planHistoryEntityTitle = (heading: string, component: PlanTypeComponentEnum): string =>
  (heading ? `${heading} > ` : '') + (PlanTypeComponentTitle[component] ?? component)
