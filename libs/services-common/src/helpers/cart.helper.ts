import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {
  CartItemAppointmentModel,
  MedicationListItemModel,
  PlanModel,
  TestsCartItemModel,
  TestsCartItemTestsType,
} from '@libs/data-layer/apps/checkout/entities/fireorm/cart'
import {CreateCartItemDto} from '@apps/core/cart/dto/cart.dto'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceCategoryItemType} from '@libs/data-layer/apps/scheduling/enums/service-category-item-type'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {
  validateCreateCartItemAppointmentDTO,
  validateCreateCartItemBookedAppointmentDTO,
  validateCreateCartItemMedication,
  validateCreateCartItemPatientPlanDTO,
  validateCreateCartItemTestDTO,
} from '@libs/services-common/helpers/create-cart-item-validation.helper'
import {
  handleNullableNumberValues,
  handleOptionalNumberValues,
  handleOptionalStringValues,
} from '@libs/common'
import {getPlanType} from '@libs/common/helpers/plan.helper'
import {isPaymentRequiredForMedicationAndPlan} from './check-is-payment-required.helper'
import {getPatientPlanTestTypes, getPlanAndAddonsTotal} from './plan-price.helper'

export const getPatientPrescriptionMedicationsPrice = (
  patientMedications: {
    lockedPrice: string
    quantity: number
  }[],
): number => {
  if (!patientMedications.length) {
    return 0
  }

  return patientMedications.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.lockedPrice) * Number(currentValue.quantity ?? 0)
  }, 0)
}

export const getTestsTotalPrice = (milestone: PatientMilestone): number =>
  milestone.milestoneToTestTypesOrPanels.reduce(
    (acc, {lockedPrice}) => acc + Number(lockedPrice),
    0,
  )

export const getTestCartItemTitle = (tests: TestsCartItemModel[]): string => {
  return `Tests: ${tests.length}`
}

export const getPatientPrescriptionMedicationsCount = (
  prescriptions: PatientPrescription,
): string => {
  return `Medications: ${prescriptions.patientMedications.length}`
}

export const createCartItemMedicationsDTO = async (
  prescription: PatientPrescription,
  price: number,
): Promise<MedicationListItemModel[]> => {
  const medications = prescription.patientMedications.map((patientMedication) => ({
    id: patientMedication.id,
    medicationId: patientMedication.medicationId,
    prescriptionId: patientMedication.prescriptionId,
    name: patientMedication.name,
    form: patientMedication.form || patientMedication.medication?.form,
    strength: patientMedication?.strength || patientMedication.medication?.strength,
    quantity: Number(patientMedication.quantity),
    price: Number(patientMedication.lockedPrice),
    isPaymentRequired: isPaymentRequiredForMedicationAndPlan(price),
  }))
  await validateCreateCartItemMedication(medications)
  return medications
}
export const createCartItemPatientPlanDTO = async ({
  patientPlan,
  expectedNextPeriodDate,
  planTestConfigurations,
}: CreateCartItemDto): Promise<PlanModel> => {
  const planType = getPlanType(patientPlan)

  const testTypeIdToTestConfigurationId = new Map(
    planTestConfigurations.map((configuration) => [configuration.testTypeId, configuration.id]),
  )

  const testTypes = getPatientPlanTestTypes(patientPlan)
  const {total} = getPlanAndAddonsTotal(patientPlan, testTypes, 0)

  const planCartItem: PlanModel = {
    id: patientPlan.id,
    expectedNextPeriodDate: handleOptionalStringValues(expectedNextPeriodDate),
    planId: patientPlan.uuid,
    isPaymentRequired: total > 0,
    planTypeId: handleOptionalNumberValues(patientPlan.planType?.id),
    planTypeName: planType.title,
    planAddons: patientPlan.addons?.map(({planAddon, lockedPrice}) => ({
      id: planAddon.id,
      title: planAddon.title,
      price: Number(lockedPrice),
      taxable: planAddon.taxable,
    })),
    testTypes: testTypes.map((testType) => ({
      id: testType.id,
      name: testType.title,
      price: Number(testType.price),
      quantity: 1,
      type: TestsCartItemTestsType.TestType,
      isPaymentRequired: true,
      configurationId: handleNullableNumberValues(testTypeIdToTestConfigurationId.get(testType.id)),
    })),
  }

  await validateCreateCartItemPatientPlanDTO(planCartItem)

  return planCartItem
}

export const createCartItemAppointmentDTO = async (
  data: CreateCartItemDto,
): Promise<CartItemAppointmentModel> => {
  const appointment = {
    serviceProviderId: data.serviceProvider.id,
    serviceCategoryItemId: data.serviceCategoryItem.uuid,
    serviceCategoryItemType: data.serviceCategoryItem.type,
    serviceCategoryId: data.serviceCategory?.id ?? null,
    date: data.slot.startTime,
    provider: data.serviceProvider.title,
    slotId: data.slot.uuid,
    isPaymentRequired: data.isPaymentRequired,
  }
  await validateCreateCartItemAppointmentDTO(appointment)
  return appointment
}

export const createCartItemBookedAppointmentDTO = async (
  bookedAppointment: Appointment,
  isPaymentRequired: boolean,
): Promise<CartItemAppointmentModel> => {
  const appointment = {
    id: bookedAppointment.id,
    serviceProviderId: bookedAppointment.serviceProviderId,
    serviceCategoryItemId: bookedAppointment.serviceType.uuid,
    serviceCategoryItemType: ServiceCategoryItemType.ServiceType,
    date: bookedAppointment.start,
    provider: bookedAppointment.serviceProvider.title,
    isPaymentRequired: isPaymentRequired,
    serviceTypeName: bookedAppointment.serviceType.name,
    serviceTypeId: bookedAppointment.serviceType.id,
  }
  await validateCreateCartItemBookedAppointmentDTO(appointment)
  return appointment
}

export const createCartItemTestDTO = async (
  data: CreateCartItemDto,
): Promise<TestsCartItemModel[]> => {
  const {milestone, cart} = data
  const tests = milestone.milestoneToTestTypesOrPanels
    .map((item) => {
      const result = []
      if (item?.testType) {
        result.push({
          id: item.testType.id,
          name: item.testType.title,
          price: Number(item.lockedPrice),
          quantity: 1,
          type: TestsCartItemTestsType.TestType,
          isPaymentRequired: !(cart.patientHasOhip && item.testType?.mdBillingServiceCodeId),
        })
      }
      if (item.testPanel) {
        result.push({
          id: item.testPanel.id,
          name: item.testPanel.title,
          price: Number(item.lockedPrice),
          quantity: 1,
          type: TestsCartItemTestsType.TestPanel,
          isPaymentRequired: !(cart.patientHasOhip && item.testPanel?.mdBillingServiceCodeId),
        })
      }
      return result
    })
    .flat()

  await validateCreateCartItemTestDTO(tests)
  return tests
}

export const getCartItemPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(price)
}

export const getPaymentValues = (
  subTotal: number,
  tax: number,
  isTaxable = true,
): {additionalTax: number; total: number} => {
  const additionalTax = isTaxable ? Math.ceil(Number(subTotal) * tax) / 100 : 0
  const total = additionalTax + Math.ceil(Number(subTotal) * 100) / 100
  return {additionalTax, total}
}
