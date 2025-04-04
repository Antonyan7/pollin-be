import {PlanMedication} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  patientEmailVerifiedFixture,
  patientForPlanGenerationFixture,
  patientForPlans,
  patientForPlansV3Fixture,
  patientWithSinglePlanOrderablePlanFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {
  medicationDetailFixture,
  medicationFixture,
  medicationForConsentFixture,
} from '@libs/common/test/fixtures/medication.fixture'
import {
  patientPlanFixture,
  patientPlanForConsentGenerationWithAllAddonsFixture,
  patientPlanForDetailsAlertFixture,
  patientPlanForMobileDetailsV2Fixture,
  patientPlanThirdOrderPatientFixture,
  patientPlanToOrderWithMedicationsFixture,
  patientPlanV3CompletedFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
import {medicationCategoryFixture} from '@libs/common/test/fixtures/medication-category.fixture'
import {PatientMedicationRouteEnum} from '@libs/services-common/enums/medication.enum'

export const planMedicationFixture: Partial<PlanMedication> = {
  id: 1,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994c4',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanFixture.id,
  medicationCategoryId: medicationCategoryFixture.id,
}
export const planMedicationForStimSheetFixture: Partial<PlanMedication> = {
  id: 2,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994c5',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanThirdOrderPatientFixture.id,
  medicationCategoryId: medicationCategoryFixture.id,
  dosage: 'planMedicationDosage',
}

export const planMedicationForOrderedFixture: Partial<PlanMedication> = {
  id: 3,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994c7',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanForDetailsAlertFixture.id,
  medicationCategoryId: medicationCategoryFixture.id,
  dosage: 'planMedicationDosage',
}
export const planMedicationWithoutCategoryFixture: Partial<PlanMedication> = {
  id: 4,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994c3',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanFixture.id,
  dosage: null,
}

export const planMedicationWithoutMedicationFixture: Partial<PlanMedication> = {
  id: 5,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994k9',
  patientId: patientEmailVerifiedFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanFixture.id,
  dosage: 'planMedicationWithoutMedication',
  name: 'planMedicationWithoutMedication',
}

export const planMedicationForStimSheetWithoutDosageFixture: Partial<PlanMedication> = {
  id: 6,
  uuid: 'b8b29f4f-bb93-46b2-8b15-f51506f994c5',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationDetailFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanThirdOrderPatientFixture.id,
  medicationCategoryId: medicationCategoryFixture.id,
  dosage: null,
}

export const planMedicationForOrderedV2Fixture: Partial<PlanMedication> = {
  id: 7,
  uuid: 'b8b69f4a-bb93-46b2-8b15-f51506f994c7',
  patientId: patientForPlans.id,
  medicationId: medicationFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanForMobileDetailsV2Fixture.id,
  medicationCategoryId: medicationCategoryFixture.id,
  dosage: 'planMedicationDosagsse',
}

export const planMedicationWithoutDosageFixture: Partial<PlanMedication> = {
  id: 10,
  uuid: 'b8b69f4a-cc93-46b2-8b15-f51506f994c7',
  patientId: patientForPlans.id,
  medicationId: medicationFixture.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanForMobileDetailsV2Fixture.id,
  medicationCategoryId: medicationCategoryFixture.id,
  dosage: null,
}

export const planMedicationWithoutMedicationWithDosageFixture: Partial<PlanMedication> = {
  id: 11,
  uuid: 'b8b68f4a-cc93-46b2-8b15-f51506f994c7',
  patientId: patientForPlans.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanForMobileDetailsV2Fixture.id,
  name: 'planMedicationWithoutMedicationWithDosageName',
  medicationCategoryId: medicationCategoryFixture.id,
  dosage: 'planMedicationWithouMedicationWithDosage',
}

export const planMedicationWithoutMedicationAndDosageFixture: Partial<PlanMedication> = {
  id: 12,
  uuid: 'b8c49f4a-cc93-46b2-8b15-f51506f994c7',
  patientId: patientForPlans.id,
  route: PatientMedicationRouteEnum.Buccal,
  patientPlanId: patientPlanForMobileDetailsV2Fixture.id,
  name: 'planMedicationWithoutMedicationAndDosageName',
  medicationCategoryId: medicationCategoryFixture.id,
  dosage: null,
}

export const planMedicationForPlanListWithDrugbankFixture: Partial<PlanMedication> = {
  id: 13,
  uuid: 'b2c49f4a-cc93-46b2-8b15-f51506f994c7',
  patientId: patientWithSinglePlanOrderablePlanFixture.id,
  patientPlanId: patientPlanToOrderWithMedicationsFixture.id,
  name: 'planMedicationForPlanListWithDrugbankFixture',
  drugBankId: 'drugBankId123',
  medicationCategoryId: null,
}

export const planMedicationForPlanListWithCategoryFixture: Partial<PlanMedication> = {
  id: 14,
  uuid: 'b2c29f4a-cc93-46b2-8b15-f51506f994c7',
  patientId: patientWithSinglePlanOrderablePlanFixture.id,
  patientPlanId: patientPlanToOrderWithMedicationsFixture.id,
  name: null,
  medicationId: medicationFixture.id,
  drugBankId: null,
  medicationCategoryId: medicationCategoryFixture.id,
}

export const planMedicationForPlanListWithoutCategoryFixture: Partial<PlanMedication> = {
  id: 15,
  uuid: 'b2c39f4a-ac92-46b2-8b15-f51506f994c7',
  patientId: patientWithSinglePlanOrderablePlanFixture.id,
  patientPlanId: patientPlanToOrderWithMedicationsFixture.id,
  name: null,
  medicationId: medicationFixture.id,
  drugBankId: null,
  medicationCategoryId: null,
}

export const planMedicationForOrderCheckSecondFixture: Partial<PlanMedication> = {
  id: 16,
  uuid: 'b2c39f4a-aa94-46b2-8b15-f51506f994a2',
  patientId: patientForPlansV3Fixture.id,
  patientPlanId: patientPlanV3CompletedFixture.id,
  drugBankId: '123121',
  sequence: 2,
}

export const planMedicationForOrderCheckFirstFixture: Partial<PlanMedication> = {
  id: 17,
  uuid: 'b2c39f4a-ab93-46b2-8b15-f51506f994a2',
  patientId: patientForPlansV3Fixture.id,
  patientPlanId: patientPlanV3CompletedFixture.id,
  drugBankId: '12312',
  sequence: 1,
}

export const planMedicationForConsentFixture: Partial<PlanMedication> = {
  id: 18,
  uuid: 'a2c39f3a-aa93-46b2-8b15-f51506f994a2',
  patientId: patientForPlansV3Fixture.id,
  patientPlanId: patientPlanForConsentGenerationWithAllAddonsFixture.id,
  medicationId: medicationForConsentFixture.id,
  drugBankId: '12312',
  sequence: 1,
}

export const planMedicationForConsentWithoutMedicationIdFixture: Partial<PlanMedication> = {
  id: 19,
  uuid: 'b2c39f4a-ab93-46b3-2b11-f51506f994a2',
  patientId: patientForPlanGenerationFixture.id,
  patientPlanId: patientPlanForConsentGenerationWithAllAddonsFixture.id,
  drugBankId: '12312',
  sequence: 2,
}
