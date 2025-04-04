import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {BadRequestException} from '@libs/services-common/exceptions'
import {CHECKOUT_PLAN_ITEM_CHANGED} from '@libs/common/i18n/en/message.json'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {getPaymentValues} from '@libs/services-common/helpers/cart.helper'
import {TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {PlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/plan-addons.entity'

export const getPatientPlanTestTypes = (patientPlan: PatientPlan): TestType[] => {
  return (
    patientPlan.testOrders
      ?.find(({status}) => status !== TestOrderStatusEnum.Abandoned)
      ?.testOrderItems?.map((item) => item?.testType)
      ?.filter((testType) => testType?.processType === ProcessType.GeneticTesting) ?? []
  )
}

export const getAddonPrice = (addon: PlanAddon): number => {
  const price = Number(addon.price)
  return isNaN(price) ? 0 : price
}

const calculateTotals = (
  tax: number,
  items: {
    planType: {price: number; taxable: boolean}
    addons: {price: number; taxable: boolean}[]
    testTypes: {id: number; price: number; taxable?: boolean}[]
    testTypeIdToTaxable?: Map<number, boolean>
  },
): {subTotal: number; total: number; additionalTax: number} => {
  let subTotal = 0
  let additionalTax = 0
  const {planType, addons, testTypes, testTypeIdToTaxable} = items

  if (planType.price) {
    const {additionalTax: planTypeTax} = getPaymentValues(
      Number(planType.price),
      tax,
      planType.taxable,
    )

    subTotal += Number(planType.price)
    additionalTax += planTypeTax
  }

  addons.forEach(({price, taxable}) => {
    const addonPrice = Number(price)

    const {additionalTax: planAddonTax} = getPaymentValues(addonPrice, tax, taxable)

    subTotal += addonPrice
    additionalTax += planAddonTax
  })

  testTypes.forEach((testType) => {
    const testTypePrice = Number(testType.price)

    const taxable = testTypeIdToTaxable ? testTypeIdToTaxable.get(testType.id) : testType.taxable
    if (taxable === undefined || taxable === null) {
      StructuredLogger.error(
        activityLogs.CartServiceFunctions.GetPlanAndAddonsTotal,
        activityLogs.CartServiceActions.TestTypeMetadataNotFound,
        {testTypeId: testType.id},
      )

      throw new BadRequestException(CHECKOUT_PLAN_ITEM_CHANGED)
    }

    const {additionalTax: testTypeTax} = getPaymentValues(testTypePrice, tax, taxable)

    subTotal += testTypePrice
    additionalTax += testTypeTax
  })

  return {subTotal, total: subTotal + additionalTax, additionalTax}
}

export const getPlanAndAddonsTotal = (
  patientPlan: PatientPlan,
  testTypes: TestType[],
  tax: number,
): {subTotal: number; total: number; additionalTax: number} => {
  const addons = patientPlan.addons.map(({lockedPrice, planAddon}) => ({
    price: Number(lockedPrice),
    taxable: planAddon.taxable,
  }))

  return calculateTotals(tax, {
    addons,
    testTypes,
    planType: {price: Number(patientPlan.lockedPrice), taxable: patientPlan.planType.taxable},
  })
}

export const getCartPlanAndAddonsTotal = (
  patientPlan: PatientPlan,
  tax: number,
  cartValues: {
    testTypes: {id: number; price: number}[]
    addons: {id: number; price: number; taxable: boolean}[]
    planType: {price: number; taxable: boolean}
  },
): {subTotal: number; total: number; additionalTax: number} => {
  const {testTypes, addons, planType} = cartValues

  const testTypeIdToTaxable = new Map(
    getPatientPlanTestTypes(patientPlan).map((testType) => [testType.id, testType.taxable]),
  )

  return calculateTotals(tax, {addons, testTypes, testTypeIdToTaxable, planType})
}
