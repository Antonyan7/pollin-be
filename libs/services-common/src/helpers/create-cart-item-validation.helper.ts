import {
  CartItemAppointmentModel,
  MedicationListItemModel,
  PlanModel,
  TestsCartItemModel,
} from '@libs/data-layer/apps/checkout/entities/fireorm/cart'
import {schemaValidation} from '@libs/common/utils/validate-schema'

export const validateCreateCartItemMedication = async (
  medications: MedicationListItemModel[],
): Promise<void> => {
  await Promise.all(
    medications.map((item) => {
      const medication = new MedicationListItemModel()
      medication.medicationId = item.medicationId
      medication.prescriptionId = item.prescriptionId
      medication.name = item.name
      medication.quantity = item.quantity
      medication.price = item.price
      medication.isPaymentRequired = item.isPaymentRequired
      medication.id = item.id

      return schemaValidation(medication)
    }),
  )
}

export const validateCreateCartItemAppointmentDTO = async (
  data: CartItemAppointmentModel,
): Promise<void> => {
  const appointment = new CartItemAppointmentModel()

  appointment.id = data.id
  appointment.serviceProviderId = data.serviceProviderId
  appointment.serviceCategoryItemId = data.serviceCategoryItemId
  appointment.serviceCategoryItemType = data.serviceCategoryItemType
  appointment.serviceCategoryId = data.serviceCategoryId
  appointment.date = data.date
  appointment.provider = data.provider
  appointment.slotId = data.slotId
  appointment.isPaymentRequired = data.isPaymentRequired
  await schemaValidation(appointment)
}

export const validateCreateCartItemPatientPlanDTO = async (planModel: PlanModel): Promise<void> => {
  const plan = new PlanModel()
  plan.expectedNextPeriodDate = planModel.expectedNextPeriodDate
  plan.planId = planModel.planId
  plan.isPaymentRequired = planModel.isPaymentRequired
  plan.planTypeId = planModel.planTypeId
  plan.planTypeName = planModel.planTypeName
  plan.id = planModel.id
  plan.planAddons = planModel.planAddons
  plan.testTypes = planModel.testTypes
  await schemaValidation(plan)
}

export const validateCreateCartItemBookedAppointmentDTO = async (
  data: CartItemAppointmentModel,
): Promise<void> => {
  const appointment = new CartItemAppointmentModel()
  appointment.id = data.id
  appointment.serviceProviderId = data.serviceProviderId
  appointment.serviceCategoryItemId = data.serviceCategoryItemId
  appointment.serviceCategoryItemType = data.serviceCategoryItemType
  appointment.date = data.date
  appointment.provider = data.provider
  appointment.serviceCategoryId = data.serviceCategoryId
  appointment.slotId = data.slotId
  appointment.isPaymentRequired = data.isPaymentRequired
  appointment.serviceTypeName = data.serviceTypeName
  appointment.serviceTypeId = data.serviceTypeId
  await schemaValidation(appointment)
}

export const validateCreateCartItemTestDTO = async (tests: TestsCartItemModel[]): Promise<void> => {
  await Promise.all(
    tests.map((item) => {
      const test = new TestsCartItemModel()
      test.id = item.id
      test.name = item.name
      test.price = item.price
      test.quantity = item.quantity
      test.type = item.type
      test.isPaymentRequired = item.isPaymentRequired

      return schemaValidation(test)
    }),
  )
}
