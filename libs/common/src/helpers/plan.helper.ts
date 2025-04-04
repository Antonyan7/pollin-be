import {PlanType} from '@libs/data-layer/apps/plan/entities/typeorm/plan-type.entity'
import {PatientPlan, PatientPlanSheet} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanSheetType, PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {getCartItemPrice} from '@libs/services-common/helpers/cart.helper'
import {
  PatientPlanStatusUpdatedPubSubPayload,
  PatientPlanStatusUpdatedSchema,
} from '../model/proto-schemas/patient-plan-status-updated.schema'
import {NestprojectConfigService} from '../services'
import {PubSubAdapter} from '../adapters'
import {getAuditTrailRequestMetadata} from '@libs/services-common/helpers/async-hook'
import {PlanAddonType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientPlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-addon.entity'

export function findSheetByType(
  patientPlan: PatientPlan,
  typeToFind: PlanSheetType,
): PatientPlanSheet {
  return patientPlan?.sheets.find(({type}) => type === typeToFind)
}

export function getPlanType(patientPlan: PatientPlan): PlanType {
  return patientPlan?.planType
}

export function getPatientPlanAddonsByType(
  patientPlan: PatientPlan,
  type: PlanAddonType,
): PatientPlanAddon[] {
  return patientPlan.addons.filter((addon) => addon.type === type)
}

export function getFirstPatientPlanAddonByType(
  patientPlan: PatientPlan,
  type: PlanAddonType,
): PatientPlanAddon {
  return patientPlan.addons.find((addon) => addon.type === type)
}

export const getPlanAddonPriceLabel = (price: number, includedLabel: string): string => {
  return price > 0 ? getCartItemPrice(price) : includedLabel
}

export const publishPatientPlanStatusUpdated = async (
  payload: PatientPlanStatusUpdatedPubSubPayload,
): Promise<void> => {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_PLAN_STATUS_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<PatientPlanStatusUpdatedPubSubPayload>(
    {...payload, ...reqMetadata},
    PatientPlanStatusUpdatedSchema,
  )
}

const getUpdatedPlanStatus = (
  draftItemsCount: number,
  oldStatus: PlanStatusEnum,
): PlanStatusEnum => {
  if (oldStatus && ![PlanStatusEnum.Draft, PlanStatusEnum.ReadyToOrder].includes(oldStatus)) {
    return oldStatus
  }

  return draftItemsCount ? PlanStatusEnum.Draft : PlanStatusEnum.ReadyToOrder
}

const PlanHelpers = {
  findSheetByType,
  getPlanType,
  getPlanAddonPriceLabel,
  publishPatientPlanStatusUpdated,
  getUpdatedPlanStatus,
}

export default PlanHelpers
