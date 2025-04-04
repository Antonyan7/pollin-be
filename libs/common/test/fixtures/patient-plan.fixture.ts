/* eslint-disable max-lines */
import {
  PatientPlan,
  PatientPlanEmbryoTypeTransferInstruction,
  PatientPlanLabInstruction,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanCancelledBy, PlanOutcome} from '@libs/services-common/enums/plan.enum'
import {
  cartPatientFixture,
  patientAppointmentFixture,
  patientEmailVerifiedFixture,
  patientForFemaleIcFormFixture,
  patientForPlanPartnerFixture,
  patientForPlans,
  patientForPlansCreationFixture,
  patientForProfileTestResultsFixture,
  patientForUltrasoundFixture,
  patientForUltrasoundSighOffFixture,
  patientPlanSelectionDetailsFixture,
  patientForQuestionnaireFixture,
  patientToPushPlanMilestoneFixture,
  patientPlanCartFixture,
  patientForEPPFixture,
  patientForNotTaxableServicesFixture,
  patientToUpdatePlansFixture,
  patientForPlanTypesFixture,
  patientForPlansV2Fixture,
  patientForProfileHighlightFixture,
  patientForUltrasoundDay3Fixture,
  patientToPushPlanMilestoneV2Fixture,
  patientFixtureForPlanV2CartFixture,
  patientForPlanMilestonesFixture,
  patientClinicEmrJohnSFixture,
  patientWithSinglePlanFixture,
  patientWithActivePlanForOrderSecondFixture,
  patientWithActivePlanForOrderFirstFixture,
  patientForStimCycleDetailsFixture,
  ivfPatientFemaleFixture,
  patientForPlansV2CheckoutWithAddons,
  patientForPlansV2CheckoutWithTestTypesFixture,
  patientForPrimingWorksheetFixture,
  patientForPlansV3Fixture,
  patientForV2ConfirmFixture,
  patientToManuallySetCohortDateFixture,
  patientForV2ConfirmOHIPCoveredFixture,
  ivfPatientForCompletionFixture,
  patientForV2ConfirmFailFixture,
  patientCartConfirmWithUpdatedPricesNoOhipFixture,
  patientForPlansEPLFixture,
  patientForV2WireTransferFixture,
  ivfPatientForCompletionEggFreezingFixture,
  patientWireTransferV2Fixture,
  patientWithSinglePlanOrderablePlanFixture,
  patientForV2ConfirmSuccessFixture,
  patientForAppointmentByDateFixture,
  patientForWorksheetListFixture,
  patientClinicEmrKimLeFixture,
  patientFemaleForFertilityIQReleasedFixture,
  patientReportFixture,
  patientForDocumentGenerationFixture,
  patientForConsentMobileFixture,
  patientClinicEmrKimberlySId,
  patientForPlanGenerationFixture,
  patientForDeletingStrawFutureFixture,
  patientForLinkedBillsFixture,
  patientForMiiDay1CryoMaxDeletionFieldValidationFixture,
  patientForPlansBackgroundFixture,
  patientChangeStatusFixture,
  patientForLinkedItemAdhocCheckoutFixture,
  patientForStrawSelectionVisibilityFixture,
  ivfPatientFemaleStrawNumberFixture,
  patientForStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {DateTimeUtil} from '@libs/common'
import {
  staffClinicManagerFixture,
  staffEmbryologistFixture,
  staffUserMobileFixture,
} from './staff.fixture'
import {
  planTypeComponentsFixture,
  planTypeConsentGenerationFixture,
  planTypeEPLFixture,
  planTypeFixture,
  planTypeManualPushFixture,
  planTypeNotTaxableFixture,
  planTypeTestOrdersFixture,
  planTypeWithIVFCheckistFixture,
  planTypewithivfCompletionDetailsTypeFixture,
  planTypeWithoutOrderingFixture,
  planTypeWithoutPriceFixture,
  planTypeWithTestResultsFixture,
} from './plan-type.fixture'
import {
  planAddonBiopsyFixture,
  planAddonComponentFertilisationDirectiveFixture,
  planAddonComponentHistologyFixture,
  planAddonEggQualityAnalysisFixture,
  planAddonEndometrialAssessmentFixture,
  planAddonEndometrialAssessmentNotSelectedFixture,
  planAddonFertilisationDirectiveFixture,
  planAddonFertilisationGetGroupTaskFixture,
  planAddonFixture,
  planAddonFixtureCaIonophoreFixture,
  planAddonFixtureIcsiInjectionFixture,
  planAddonFixturePICSIFixture,
  planAddonFreshEmbryoFixture,
  planAddonGeneticTestingFixture,
  planAddonGeneticTestingForComponentFixture,
  planAddonGeneticTestingSecondItemForComponentFixture,
  planAddonGeneticTestingSecondOrderFixture,
} from './plan-addon.fixture'
import {PlanSheetType, PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {embryoTypeFixture} from './embryo-type.fixture'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {planInstructionFreezeEggFixture} from './plan-lab-instruction.fixture'
import {
  PlanAddonType,
  PlanLabInstructionType,
} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientPlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-addon.entity'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const invalidPatientPlanUUid: string = '69760745-de86-45cd-808f-f3980a043744'

export const patientPlanFixture: Partial<PatientPlan> = {
  id: 1,
  uuid: '69760745-de86-45cd-808f-f3980a0437b7',
  patientId: patientEmailVerifiedFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  outcome: PlanOutcome.Pregnancy,
  taskAssigneeId: staffClinicManagerFixture.id,
}

export const patientPlanCancelledFixture: Partial<PatientPlan> = {
  id: 2,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f01506f913f0',
  planTypeId: planTypeFixture.id,
  patientId: patientPlanSelectionDetailsFixture.id,
  status: PlanStatusEnum.Cancelled,
  cancelledBy: PlanCancelledBy.Patient,
}

export const patientPlanMobileFixture: Partial<PatientPlan> = {
  id: 3,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994f1',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
  status: PlanStatusEnum.Ordered,
}

//use only in seed, not create in fixture
export const patientPlanActiveFixture: Partial<PatientPlan> = {
  id: 4,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994t7',
  planTypeId: planTypeFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lockedPrice: '1000.00',
}

export const patientPlanToPushToPatientFixture: Partial<PatientPlan> = {
  id: 5,
  totalAmount: '500.00',
  uuid: '805dca65-18ee-45e7-88db-3d9547cc4b02',
  planTypeId: planTypeFixture.id,
  patientId: patientToPushPlanMilestoneFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanToPushToPatientReadyToOrderFixture: Partial<PatientPlan> = {
  id: 6,
  uuid: '805dca65-18ee-45e7-88db-3d9547cc4b20',
  planTypeId: planTypeFixture.id,
  patientId: patientToPushPlanMilestoneFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanToPushToPatientPaidFixture: Partial<PatientPlan> = {
  id: 7,
  uuid: '805dca65-18ee-45e7-88db-3d9547cc4b00',
  planTypeId: planTypeFixture.id,
  patientId: patientToPushPlanMilestoneFixture.id,
  status: PlanStatusEnum.ReadyForActivation,
}

export const patientPlanForMultiplePlansMilestoneFixture: Partial<PatientPlan> = {
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994aa',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanForDetailsAlertFixture: Partial<PatientPlan> = {
  id: 9,
  uuid: '814dca65-18ef-49e7-87db-1d1547cc2b31',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanForOrderedFixture: Partial<PatientPlan> = {
  id: 10,
  uuid: '814dca65-18ef-49e7-87db-1d1547cc2b58',
  planTypeId: planTypeNotTaxableFixture.id,
  patientId: cartPatientFixture.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanForReadyToOrderFixture: Partial<PatientPlan> = {
  id: 11,
  lockedPrice: '456',
  uuid: '814dca65-18ef-49e7-87db-1d1547cc2b22',
  planTypeId: planTypeFixture.id,
  patientId: cartPatientFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanWithTestOrderFixture: Partial<PatientPlan> = {
  id: 12,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994h8',
  planTypeId: planTypeFixture.id,
  patientId: patientPlanSelectionDetailsFixture.id,
  status: PlanStatusEnum.Ordered,
  lockedPrice: '1000.00',
}

export const patientPlanAppointmentPatientFixture: Partial<PatientPlan> = {
  id: 13,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994t3',
  planTypeId: planTypeFixture.id,
  patientId: patientAppointmentFixture.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanToNotReportPeriodFixture: Partial<PatientPlan> = {
  id: 15,
  lockedPrice: '11',
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994cc',
  planTypeId: planTypeWithTestResultsFixture.id,
  patientId: patientPlanCartFixture.id,
  status: PlanStatusEnum.Ordered,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForDiseaseScreenFixture: Partial<PatientPlan> = {
  id: 16,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994c3',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansCreationFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanToChangeStatusFixture: Partial<PatientPlan> = {
  id: 17,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994c4',
  activatedOn: dateTimeUtil.now(),
  planTypeId: planTypeFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanForProfileTestResultsFixture: Partial<PatientPlan> = {
  id: 18,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f993b4',
  planTypeId: planTypeFixture.id,
  patientId: patientForProfileTestResultsFixture.id,
  taskAssigneeId: staffClinicManagerFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanForPastMilestoneFixture: Partial<PatientPlan> = {
  id: 19,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f993f9',
  planTypeId: planTypeFixture.id,
  patientId: patientForProfileTestResultsFixture.id,
  taskAssigneeId: staffClinicManagerFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanForStimSheetFixture: Partial<PatientPlan> = {
  id: 20,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  defaultSheetType: PlanSheetType.Stimulation,
}

export const patientPlanCompletedFixture: Partial<PatientPlan> = {
  id: 21,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994a9',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.Completed,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanWithSelectedDateFixture: Partial<PatientPlan> = {
  id: 22,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51505f994a1',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanActiveForUltrasoundFixture: Partial<PatientPlan> = {
  id: 25,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506ggg4a9',
  planTypeId: planTypeFixture.id,
  patientId: patientForUltrasoundFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanPlanTypeStatusPatient: Partial<PatientPlan> = {
  id: 26,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506ggg4h5',
  planTypeId: planTypeFixture.id,
  patientId: patientForFemaleIcFormFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  isPaid: true,
}

export const patientPlanSecondOrderPatientFixture: Partial<PatientPlan> = {
  id: 27,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994kk',
  planTypeId: planTypeManualPushFixture.id,
  patientId: cartPatientFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanThirdOrderPatientFixture: Partial<PatientPlan> = {
  id: 28,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11506f994dd',
  planTypeId: planTypeFixture.id,
  patientId: patientForQuestionnaireFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanForStimSheetActionsFixture: Partial<PatientPlan> = {
  id: 29,
  uuid: 'b1b69f4f-bb93-46b6-8b15-f11503f994dd',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanReadyToOrderFixture: Partial<PatientPlan> = {
  id: 30,
  uuid: '69760745-de86-45cd-808f-f3980a0437p9',
  patientId: patientForPlansCreationFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  outcome: PlanOutcome.Pregnancy,
  taskAssigneeId: staffClinicManagerFixture.id,
}

export const patientPlanForStimSheetUltrasoundSighOfFixture: Partial<PatientPlan> = {
  id: 31,
  uuid: 'b1319f4f-bb93-46b6-8b15-f11531f994dd',
  planTypeId: planTypeFixture.id,
  patientId: patientForUltrasoundSighOffFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanLinkableFixture: Partial<PatientPlan> = {
  id: 32,
  uuid: 'b1319f4f-bb93-46b6-8b15-f11513f994dd',
  planTypeId: planTypeFixture.id,
  patientId: patientForEPPFixture.id,
  taskAssigneeId: staffClinicManagerFixture.id,
  status: PlanStatusEnum.Completed,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}

export const patientPlanLinkableWithDay1OfCycleFixture: Partial<PatientPlan> = {
  id: 34,
  uuid: 'b1319f4f-cc93-46b6-8b15-f11513f994dd',
  planTypeId: planTypeFixture.id,
  patientId: patientForEPPFixture.id,
  status: PlanStatusEnum.Active,
  taskAssigneeId: staffClinicManagerFixture.id,
}

export const patientPlanForNotTaxableFixture: Partial<PatientPlan> = {
  id: 35,
  lockedPrice: '131.13',
  uuid: 'afc1a180-e466-4488-9077-957f2262aa11',
  patientId: patientForNotTaxableServicesFixture.id,
  planTypeId: planTypeNotTaxableFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  outcome: PlanOutcome.Pregnancy,
  taskAssigneeId: staffClinicManagerFixture.id,
}

export const patientPlanForOBWorksheetFixture: Partial<PatientPlan> = {
  id: 36,
  uuid: 'b2b69f4f-bb93-46b2-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  defaultSheetType: PlanSheetType.OB,
}

export const patientPlanForHCGWorksheetFixture: Partial<PatientPlan> = {
  id: 37,
  uuid: 'b2b69f4f-cc93-46b2-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  defaultSheetType: PlanSheetType.HCG,
}

export const patientPlanToUpdateFixture: Partial<PatientPlan> = {
  id: 38,
  uuid: 'b2b62f4f-cc93-46b1-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientToUpdatePlansFixture.id,
  status: PlanStatusEnum.ReadyForActivation,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanForPlanTypesV2OlderFixture: Partial<PatientPlan> = {
  id: 39,
  uuid: 'b2b62f4a-cc93-46b1-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanTypesFixture.id,
  status: PlanStatusEnum.Completed,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 20),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  ivfLabStatus: IVFLabStatus.Completed,
}

export const patientPlanForPlanTypesV2Fixture: Partial<PatientPlan> = {
  id: 40,
  uuid: 'b2b62f4c-cc93-46b1-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanTypesFixture.id,
  status: PlanStatusEnum.Completed,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  ivfLabStatus: IVFLabStatus.Completed,
}

export const patientPlanV2ToUpdateFixture: Partial<PatientPlan> = {
  id: 41,
  uuid: 'b2b62f4c-cc93-46b1-2b12-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV2Fixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
  addons: [
    {
      planAddonId: planAddonFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForHighlightsFixture: Partial<PatientPlan> = {
  id: 43,
  uuid: 'c186e74f-99cf-4868-9ee7-71ab042ec57b',
  planTypeId: planTypeFixture.id,
  patientId: patientForProfileHighlightFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanForUltrasoundDay3Fixture: Partial<PatientPlan> = {
  id: 44,
  uuid: '16398fc6-dad1-4857-9033-b5279478f41e',
  planTypeId: planTypeFixture.id,
  patientId: patientForUltrasoundDay3Fixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
}

export const patientPlanReadyToOrderV2Fixture: Partial<PatientPlan> = {
  id: 45,
  uuid: '69720745-de86-45cd-808f-f3980a0437b7',
  patientId: patientEmailVerifiedFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  lastStatusUpdateDate: dateTimeUtil.toDate('2020-03-08T13:00:00'),
}

export const patientPlanToReportPeriodV2Fixture: Partial<PatientPlan> = {
  id: 47,
  uuid: 'c1b69f4f-bb93-46b6-8b15-f11506f994b6',
  planTypeId: planTypeFixture.id,
  patientId: patientToPushPlanMilestoneV2Fixture.id,
}

export const patientPlanForMobileDetailsV2Fixture: Partial<PatientPlan> = {
  id: 48,
  lockedPrice: '5111',
  uuid: '814dca65-18ef-49e8-87db-131547cc2b31',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanV2ForCartFixture: Partial<PatientPlan> = {
  id: 49,
  lockedPrice: '100',
  uuid: '814dca65-38ef-49e8-82db-131547cc2b31',
  planTypeId: planTypeFixture.id,
  patientId: patientFixtureForPlanV2CartFixture.id,
  status: PlanStatusEnum.Ordered,
  lastStatusUpdateDate: dateTimeUtil.now(),
}

export const patientPlanV2ForCartWithoutCycleDaysFixture: Partial<PatientPlan> = {
  id: 50,
  uuid: '814dca65-48ef-49e8-83db-131547cc2b31',
  planTypeId: planTypeWithoutOrderingFixture.id,
  patientId: patientFixtureForPlanV2CartFixture.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanV2SelectionFlowDetailsFixture: Partial<PatientPlan> = {
  id: 51,
  uuid: 'b1b69f3f-bb93-46b6-8b15-f11506f994h8',
  planTypeId: planTypeFixture.id,
  patientId: patientPlanSelectionDetailsFixture.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanOrderedForMilestoneFixture: Partial<PatientPlan> = {
  id: 52,
  uuid: 'b1b69f3f-cc93-46b6-8b15-f11506f994h8',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanMilestonesFixture.id,
  status: PlanStatusEnum.Ordered,
}

export const patientPlanCompletedForMilestoneFixture: Partial<PatientPlan> = {
  id: 53,
  uuid: 'c1b69f3f-cc93-46b6-8b15-f11506f994c8',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanMilestonesFixture.id,
  status: PlanStatusEnum.Completed,
}

export const patientPlanForPatientStatusFixture: Partial<PatientPlan> = {
  id: 54,
  uuid: 'c2b39f3f-cc93-46b6-8b15-f11506f994c8',
  planTypeId: planTypeFixture.id,
  patientId: patientClinicEmrJohnSFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanForSheetFixture: Partial<PatientPlan> = {
  id: 55,
  uuid: '814dca65-18ef-49e7-87db-1d1547cc2b23',
  planTypeId: planTypeFixture.id,
  patientId: cartPatientFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanV2CancelledFixture: Partial<PatientPlan> = {
  id: 56,
  uuid: 'a1b19f3f-cc93-46b6-8b15-f11506f994c8',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV2Fixture.id,
  status: PlanStatusEnum.Cancelled,
  taskAssigneeId: staffClinicManagerFixture.id,
  cancelledBy: PlanCancelledBy.Doctor,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanV2CompletedFixture: Partial<PatientPlan> = {
  id: 57,
  uuid: 'a1b29f3f-cc93-46b6-8b15-f11506f994c8',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV2Fixture.id,
  status: PlanStatusEnum.Completed,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV2ReadyToOrderFixture: Partial<PatientPlan> = {
  id: 58,
  uuid: 'b1b69f4f-bc93-46c6-8b15-f11506f994c4',
  planTypeId: planTypeFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanV2ReadyToOrderToActivateFixture: Partial<PatientPlan> = {
  id: 59,
  uuid: 'b1b69f4f-bb93-46c6-8b15-f11506f994c4',
  planTypeId: planTypeWithoutOrderingFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanToActivateWithoutPushingFixture: Partial<PatientPlan> = {
  id: 60,
  uuid: 'b2b62f4c-cc92-46b1-8b15-f51506f994b2',
  planTypeId: planTypeWithoutOrderingFixture.id,
  patientId: patientForPlanTypesFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV2NotOrderableFixture: Partial<PatientPlan> = {
  id: 61,
  uuid: 'b2b62a4c-cc92-46b1-8b15-f51506f994b2',
  planTypeId: planTypeWithoutOrderingFixture.id,
  patientId: patientWithSinglePlanFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanV1ForOrderFirstFixture: Partial<PatientPlan> = {
  id: 62,
  uuid: 'b2b62a2c-cc92-46b1-8b15-f51506f994b2',
  planTypeId: planTypeNotTaxableFixture.id,
  patientId: patientWithActivePlanForOrderFirstFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanV2ForOrderFirstFixture: Partial<PatientPlan> = {
  id: 64,
  uuid: 'b2b62a6c-cc92-46b1-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientWithActivePlanForOrderSecondFixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV2ForCycleDetailsFixture: Partial<PatientPlan> = {
  id: 65,
  uuid: 'c2b62a6c-ac92-46b1-8b15-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForStimCycleDetailsFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanV2ForCycleDetailsWithoutFollicleNumberFixture: Partial<PatientPlan> = {
  id: 66,
  uuid: 'c2b62a6c-cb92-46b1-8b15-f51506f994b2',
  planTypeId: planTypeWithoutOrderingFixture.id,
  patientId: patientForStimCycleDetailsFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanV2ForGetGroupTaskFixture: Partial<PatientPlan> = {
  id: 68,
  uuid: '90de5279-f42d-4ffb-ac52-f533c0417497',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
  addons: [
    {
      planAddonId: planAddonFertilisationGetGroupTaskFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForDay3Fixture: Partial<PatientPlan> = {
  id: 113,
  uuid: 'f9aa34b0-b072-4fbb-acda-121e98328d13',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV2ForGetGroupTaskForCheckingMaxCountFixture: Partial<PatientPlan> = {
  id: 103,
  uuid: 'ca9713a6-2a07-49e8-a833-10a420f53fbc',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
  addons: [
    {
      planAddonId: planAddonFixtureIcsiInjectionFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForMobileDetailsV2WithAddonsFixture: Partial<PatientPlan> = {
  id: 69,
  uuid: '823dca65-18ef-49e8-87db-131547cc2b31',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
  lockedPrice: '952.42',
  status: PlanStatusEnum.Ordered,
  ivfLabStatus: IVFLabStatus.Active,
  addons: [
    {
      planAddonId: planAddonGeneticTestingFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '1.11',
    },
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFertilisationDirectiveFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '2.45',
    },
    {
      planAddonId: planAddonEggQualityAnalysisFixture.id,
      type: PlanAddonType.EggQualityAnalysis,
      lockedPrice: '3.6',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '4.8',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForPlanCartV2WithAddonsFixture: Partial<PatientPlan> = {
  id: 70,
  uuid: '823dca65-18ef-29e8-17db-131547cc2b31',
  lockedPrice: '942.12',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV2CheckoutWithAddons.id,
  status: PlanStatusEnum.Ordered,
  addons: [
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonGeneticTestingFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '65.12',
    },
    {
      planAddonId: planAddonEggQualityAnalysisFixture.id,
      type: PlanAddonType.EggQualityAnalysis,
      lockedPrice: '51.23',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '9.18',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanV2WithExpectedDayFixture: Partial<PatientPlan> = {
  id: 71,
  lockedPrice: '2228',
  uuid: '69260745-de82-45cd-802f-f3980a0437b7',
  patientId: patientEmailVerifiedFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Ordered,
  outcome: PlanOutcome.Pregnancy,
  taskAssigneeId: staffClinicManagerFixture.id,
}

export const patientPlanForPlanCartV2WithTestTypesFixture: Partial<PatientPlan> = {
  id: 75,
  uuid: '223dca65-18ef-29e8-17db-131547cc2b31',
  lockedPrice: '1111',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV2CheckoutWithTestTypesFixture.id,
  status: PlanStatusEnum.Ordered,
  addons: [
    {
      planAddonId: planAddonGeneticTestingFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '1',
    },
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '2',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '3',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanLinkableCancelledFixture: Partial<PatientPlan> = {
  id: 76,
  uuid: 'c1319f4f-bb93-46b6-8b16-f11513f994dd',
  planTypeId: planTypeFixture.id,
  patientId: patientForEPPFixture.id,
  taskAssigneeId: staffClinicManagerFixture.id,
  status: PlanStatusEnum.Cancelled,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}

export const patientPlanManualPushFixture: Partial<PatientPlan> = {
  id: 77,
  uuid: '3c8d7911-0a6d-4d81-9c12-fb96f20d6a0f',
  planTypeId: planTypeManualPushFixture.id,
  patientId: patientForEPPFixture.id,
  taskAssigneeId: staffClinicManagerFixture.id,
  status: PlanStatusEnum.Ordered,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  addons: [
    {
      planAddonId: planAddonGeneticTestingFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForPrimingWorkSheetFixture: Partial<PatientPlan> = {
  id: 78,
  uuid: '90bf2621-5443-4cab-b16a-2956e92fb53e',
  planTypeId: planTypeWithIVFCheckistFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanForPrimingWorkSheetChecklistFixture: Partial<PatientPlan> = {
  id: 79,
  uuid: '91bf2321-5443-4cab-b16a-2956e92fb53e',
  planTypeId: planTypeWithIVFCheckistFixture.id,
  patientId: patientForPrimingWorksheetFixture.id,
  status: PlanStatusEnum.Active,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  defaultSheetType: PlanSheetType.Stimulation,
  ivfLabStatus: IVFLabStatus.Completed,
}

export const patientPlanForMobileComponentsDetailsV2Fixture: Partial<PatientPlan> = {
  id: 80,
  uuid: 'b526354e-3b2e-4298-a0ad-65400c766900',
  planTypeId: planTypeComponentsFixture.id,
  patientId: patientForPlans.id,
  status: PlanStatusEnum.Ordered,
  addons: [
    {
      planAddonId: planAddonGeneticTestingForComponentFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonGeneticTestingSecondItemForComponentFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonComponentHistologyFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonBiopsyFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonComponentFertilisationDirectiveFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonEggQualityAnalysisFixture.id,
      type: PlanAddonType.EggQualityAnalysis,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanV3ToUpdateFixture: Partial<PatientPlan> = {
  id: 81,
  uuid: 'b2b62f4c-aa93-56b1-2b12-f51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  embryoTypeInstructions: [
    {
      embryoTypeId: embryoTypeFixture.id,
      sequence: 1,
    },
  ] as PatientPlanEmbryoTypeTransferInstruction[],
  labInstructions: [
    {
      planLabInstructionId: planInstructionFreezeEggFixture.id,
      type: PlanLabInstructionType.EggFreeze,
    },
  ] as PatientPlanLabInstruction[],
  addons: [
    {
      planAddonId: planAddonBiopsyFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV3CancelledFixture: Partial<PatientPlan> = {
  id: 82,
  uuid: 'a1b19f3f-cc93-56b6-8b15-f11506f994c8',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Cancelled,
  taskAssigneeId: staffClinicManagerFixture.id,
  cancelledBy: PlanCancelledBy.Doctor,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPlanV3CompletedFixture: Partial<PatientPlan> = {
  id: 83,
  uuid: 'b1b29f3f-cc93-46b6-5b15-f11506f994c8',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Completed,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanSplitPaymentFixture: Partial<PatientPlan> = {
  id: 84,
  uuid: 'a864680d-fb91-49dd-ba15-35203745c706',
  planTypeId: planTypeFixture.id,
  patientId: patientForV2ConfirmFixture.id,
  status: PlanStatusEnum.Ordered,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
}

export const patientPlanToChangeStatusDischargableFixture: Partial<PatientPlan> = {
  id: 85,
  uuid: 'a1b59f4f-bb93-46b6-4b15-f11506f994c4',
  activatedOn: dateTimeUtil.now(),
  planTypeId: planTypeWithTestResultsFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanToManuallySetCohortDateFixture: Partial<PatientPlan> = {
  id: 86,
  uuid: 'a214680d-fa91-49dd-ba15-35203745c706',
  planTypeId: planTypeFixture.id,
  patientId: patientToManuallySetCohortDateFixture.id,
  status: PlanStatusEnum.Active,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  addons: [
    {
      planAddonId: planAddonFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanWithLinkedInventoryCardFixture: Partial<PatientPlan> = {
  id: 87,
  uuid: 'd7d5f28d-cc11-4a71-92c6-ac9736c0aa08',
  planTypeId: planTypeFixture.id,
  patientId: patientToManuallySetCohortDateFixture.id,
  status: PlanStatusEnum.Active,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  embryoCryoInventoryCardId: 13,
  addons: [
    {
      planAddonId: planAddonFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForIVFTaskHistoryFixture: Partial<PatientPlan> = {
  id: 88,
  uuid: 'a1d5f28d-ac21-4a71-92c6-ac9736c0aa08',
  planTypeId: planTypeFixture.id,
  patientId: patientToManuallySetCohortDateFixture.id,
  status: PlanStatusEnum.Cancelled,
  outcome: PlanOutcome.BioChemical,
  ivfLabStatus: IVFLabStatus.Active,
  addons: [
    {
      planAddonId: planAddonFixturePICSIFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanV2ForCancelCohortFixture: Partial<PatientPlan> = {
  id: 89,
  uuid: 'fad6ce24-2f8c-408e-960c-fd0bdab9a05c',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV2ForAwaitingForBiopsyFixture: Partial<PatientPlan> = {
  id: 90,
  uuid: 'f1e2d3c4-b5a6-7890-1234-56789abcdef0',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.AwaitingBiopsyResults,
}

export const patientPlanV3ReadyToOrderFixture: Partial<PatientPlan> = {
  id: 91,
  uuid: 'b1b29f3f-cc93-46b6-5b15-a21306f994c8',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
}

export const patientOhipCoveredPlanSplitPaymentFixture: Partial<PatientPlan> = {
  id: 92,
  lockedPrice: '0.00',
  uuid: '3571b680-af23-48e1-83e2-5a578cbdd72a',
  planTypeId: planTypeWithoutPriceFixture.id,
  patientId: patientForV2ConfirmOHIPCoveredFixture.id,
  status: PlanStatusEnum.Ordered,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
}

export const patientPlanV2CancelledIVFStateFixture: Partial<PatientPlan> = {
  id: 93,
  uuid: '8da6be65-b2c5-48b8-af30-05dc99877e04',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Cancelled,
}

export const patientPlanV2ForCompletionIVFStateFixture: Partial<PatientPlan> = {
  id: 94,
  uuid: '25f1fef6-1861-47fb-aadb-cb05c0a792cf',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientForCompletionFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Upcoming,
}

export const patientPlanV2ForCompletionWithoutEmbryoTaskIVFStateFixture: Partial<PatientPlan> = {
  id: 95,
  uuid: 'd3bd8656-6397-490d-ae83-80570ec2376c',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientForCompletionFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Upcoming,
}

export const patientPlanV2ForCompletionForStatsIVFStateFixture: Partial<PatientPlan> = {
  id: 96,
  uuid: '45c48f79-c83a-4ea6-9bd0-5fadbab4c1b5',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientForCompletionFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Upcoming,
}

export const patientPlanSplitPaymentFailFixture: Partial<PatientPlan> = {
  id: 97,
  lockedPrice: '5112.00',
  uuid: 'bb4a049-0f28-4d4b-9438-58bebbc9adcf',
  planTypeId: planTypeFixture.id,
  patientId: patientForV2ConfirmFailFixture.id,
  status: PlanStatusEnum.Ordered,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
}
export const patientPlanV2ForEggFreezingFixture: Partial<PatientPlan> = {
  id: 108,
  uuid: 'b95f0327-ea6c-4c19-bdf5-9deb4d088bcf',
  planTypeId: planTypewithivfCompletionDetailsTypeFixture.id,
  patientId: ivfPatientForCompletionEggFreezingFixture.id,
  status: PlanStatusEnum.Completed,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Completed,
}

export const patientPlanV2ForCompleteCohortFixture: Partial<PatientPlan> = {
  id: 98,
  uuid: '39b81fc7-2978-45a7-aff4-8267e26c0d73',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV2ForCancelFromPlanFixture: Partial<PatientPlan> = {
  id: 99,
  uuid: '957d6ba6-289c-49a8-8262-5d741f4ea42c',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Completed,
}

export const patientPlanV2CompletedIVFStateFixture: Partial<PatientPlan> = {
  id: 100,
  uuid: '253fca43-a2e7-4370-985b-ebf72c178443',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Completed,
  ivfWitnessByStaffId: staffUserMobileFixture.id,
  embryologistFreezingByStaffId: staffEmbryologistFixture.id,
}

export const patientPlanForEPLWorksheetFixture: Partial<PatientPlan> = {
  id: 101,
  uuid: 'b2b69f4f-cc93-46b2-2b15-a51506f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  defaultSheetType: PlanSheetType.EPL,
}

export const patientPlanCartConfirmWithUpdatedPricesNoOhipFixture: Partial<PatientPlan> = {
  id: 102,
  lockedPrice: '5112',
  uuid: '7460a6ab-0b8a-4f93-ae27-b08be71bf81f',
  planTypeId: planTypeFixture.id,
  patientId: patientCartConfirmWithUpdatedPricesNoOhipFixture.id,
  status: PlanStatusEnum.Ordered,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  addons: [
    {
      planAddonId: planAddonEndometrialAssessmentNotSelectedFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '17',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanV3ToUpdateFertilizationFixture: Partial<PatientPlan> = {
  id: 104,
  uuid: 'b2b62f4c-aa93-56b1-2b12-f51506f994b3',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  addons: [
    {
      planAddonId: planAddonFixtureIcsiInjectionFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}
export const patientPlanV3CompletedWithCohortFixture: Partial<PatientPlan> = {
  id: 105,
  uuid: '5e5d7eca-1056-4f97-806b-deca52139aaf',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Completed,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  ivfLabStatus: IVFLabStatus.Completed,
}

export const patientPlanEPLFixture: Partial<PatientPlan> = {
  id: 106,
  uuid: 'b2b62f4c-aa93-56b1-2b12-251506f994b3',
  planTypeId: planTypeEPLFixture.id,
  patientId: patientForPlansEPLFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
}

export const patientPlanWireTransferFixture: Partial<PatientPlan> = {
  id: 107,
  lockedPrice: '5000',
  uuid: '3670f7e0-c612-4f65-abcd-4e752b1694d8',
  planTypeId: planTypeFixture.id,
  patientId: patientForV2WireTransferFixture.id,
  status: PlanStatusEnum.Ordered,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
}

export const patientPlanWireTransferForMilestoneFixture: Partial<PatientPlan> = {
  id: 109,
  uuid: '0adb9701-4915-4557-b5af-3abba56e0f1d',
  planTypeId: planTypeFixture.id,
  patientId: patientWireTransferV2Fixture.id,
  taskAssigneeId: staffClinicManagerFixture.id,
  status: PlanStatusEnum.PendingWireTransfer,
}

export const patientPlanToOrderWithMedicationsFixture: Partial<PatientPlan> = {
  id: 110,
  uuid: '0adb9701-2915-4357-b5af-3abba56e0f1d',
  planTypeId: planTypeComponentsFixture.id,
  patientId: patientWithSinglePlanOrderablePlanFixture.id,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  outcome: PlanOutcome.Pregnancy,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanSplitPaymentSuccessFixture: Partial<PatientPlan> = {
  id: 111,
  lockedPrice: '5112',
  uuid: 'eaf04db0-d744-49e1-8c4f-b47db965e081',
  planTypeId: planTypeFixture.id,
  patientId: patientForV2ConfirmSuccessFixture.id,
  status: PlanStatusEnum.Ordered,
  taskAssigneeId: staffClinicManagerFixture.id,
  outcome: PlanOutcome.BioChemical,
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  addons: [
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '17',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanToUpdatePeriodFixture: Partial<PatientPlan> = {
  id: 112,
  uuid: 'a4b69f4f-bb93-46b6-8b15-f11506f994b6',
  planTypeId: planTypeFixture.id,
  patientId: patientToPushPlanMilestoneV2Fixture.id,
}

export const patientPlanForAppointmentByDateV2Fixture: Partial<PatientPlan> = {
  id: 115,
  uuid: 115 + '69f4f-bb93-46b6-8b15-f11506f994b6',
  planTypeId: planTypeTestOrdersFixture.id,
  status: PlanStatusEnum.Active,
  patientId: patientForAppointmentByDateFixture.id,
  defaultSheetType: PlanSheetType.Stimulation,
}

export const patientPlanWithoutSheetsFixture: Partial<PatientPlan> = {
  id: 116,
  uuid: '69760745-de86-45cd-808f-f3980a0437b2',
  patientId: patientEmailVerifiedFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  outcome: PlanOutcome.Pregnancy,
  taskAssigneeId: staffClinicManagerFixture.id,
}

export const patientPlanForV2Fixture: Partial<PatientPlan> = {
  id: 117,
  uuid: '6867ddff-1be8-4a55-97ab-903c470d78a1',
  planTypeId: planTypeWithTestResultsFixture.id,
  patientId: patientPlanCartFixture.id,
  status: PlanStatusEnum.Ordered,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForAlertFixture: Partial<PatientPlan> = {
  id: 118,
  uuid: '69760745-de86-66cd-802f-f3980a0437b7',
  patientId: patientEmailVerifiedFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
}

export const patientPlanForMilestoneReportPeriodFixture: Partial<PatientPlan> = {
  id: 120,
  uuid: 120 + '69f4f-bb93-46b6-8b15-f11506f994b6',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlans.id,
}

export const patientPlanForWorksheetListFixture: Partial<PatientPlan> = {
  id: 121,
  uuid: 121 + '69f4f-bb93-46b6-8b15-f11506f994b6',
  planTypeId: planTypeFixture.id,
  patientId: patientForWorksheetListFixture.id,
  status: PlanStatusEnum.Cancelled,
}

export const patientPlanForReportDay1Fixture: Partial<PatientPlan> = {
  id: 123,
  uuid: 123 + '69f4f-bb93-46b6-8b15-f11506f994b6',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Cancelled,
}

export const patientPlanForPartnerBarcodeFixture: Partial<PatientPlan> = {
  id: 124,
  uuid: 124 + '5f39c936-4588-4f19-a5ba-4e157bb1e',
  planTypeId: planTypeFixture.id,
  patientId: patientClinicEmrKimLeFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanForPatientEggFreezingReportFixture: Partial<PatientPlan> = {
  id: 128,
  uuid: 128 + '5f39c936-4588-4f19-a5ba-4e157bb1e',
  planTypeId: planTypeFixture.id,
  patientId: patientFemaleForFertilityIQReleasedFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanForOocyteCollectionFixture: Partial<PatientPlan> = {
  id: 125,
  uuid: 125 + '5f39c936-4588-4f19-a5ba-4e157bb1e',
  planTypeId: planTypeFixture.id,
  patientId: patientClinicEmrKimLeFixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForPatientEggFreezingDetailReportFixture: Partial<PatientPlan> = {
  id: 130,
  uuid: 130 + '5f39c936-4588-4f19-a5ba-4e157bb1e',
  planTypeId: planTypeFixture.id,
  patientId: patientReportFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanToGenerateDocumentFixture: Partial<PatientPlan> = {
  id: 131,
  uuid: 'b2b62f4c-cc92-46b1-8b15-a51503f994b2',
  planTypeId: planTypeWithoutOrderingFixture.id,
  patientId: patientForDocumentGenerationFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanToChangeEggAnalysisFixture: Partial<PatientPlan> = {
  id: 132,
  uuid: 'b2b22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  addons: [
    {
      planAddonId: planAddonEggQualityAnalysisFixture.id,
      type: PlanAddonType.EggQualityAnalysis,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForConsentMobileFixture: Partial<PatientPlan> = {
  id: 135,
  uuid: 135 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForConsentMobileFixture.id,
  status: PlanStatusEnum.Active,
  lastStatusUpdateDate: dateTimeUtil.toDate('2020-03-08T13:00:00'),
}

export const patientPlanForConsentMobileCanceledAfterActivatedFixture: Partial<PatientPlan> = {
  id: 137,
  uuid: 137 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForConsentMobileFixture.id,
  status: PlanStatusEnum.Cancelled,
  activatedOn: dateTimeUtil.toDate('2020-03-08T13:00:00'),
}

export const patientPlanForEggInventoryCardFixture: Partial<PatientPlan> = {
  id: 138,
  uuid: 138 + '22f2c-cc12-46b1-8b15-a51503f994b3',
  planTypeId: planTypeFixture.id,
  patientId: patientToManuallySetCohortDateFixture.id,
  status: PlanStatusEnum.Completed,
  activatedOn: dateTimeUtil.toDate('2020-03-08T13:00:00'),
  eggCryoInventoryCardId: 14,
  lastStatusUpdateDate: dateTimeUtil.toDate('2020-03-08T13:00:00'),
}

export const patientPlanForEggThawFixture: Partial<PatientPlan> = {
  id: 139,
  uuid: 139 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientClinicEmrKimberlySId,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.toDate('2020-03-08T13:00:00'),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForConsentGenerationWithAllAddonsFixture: Partial<PatientPlan> = {
  id: 140,
  uuid: 140 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeConsentGenerationFixture.id,
  patientId: patientForPlanGenerationFixture.id,
  status: PlanStatusEnum.Active,
  addons: [
    {
      planAddonId: planAddonGeneticTestingForComponentFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonGeneticTestingSecondOrderFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonEndometrialAssessmentNotSelectedFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFixtureCaIonophoreFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonEggQualityAnalysisFixture.id,
      type: PlanAddonType.EggQualityAnalysis,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanWithoutPatientConsentModulesFixture: Partial<PatientPlan> = {
  id: 141,
  uuid: 141 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanGenerationFixture.id,
  status: PlanStatusEnum.ReadyForActivation,
  addons: [
    {
      planAddonId: planAddonFixtureCaIonophoreFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanWith1PartnerDifferentRolesFixture: Partial<PatientPlan> = {
  id: 142,
  uuid: 142 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanGenerationFixture.id,
  status: PlanStatusEnum.ReadyForActivation,
  addons: [
    {
      planAddonId: planAddonEndometrialAssessmentNotSelectedFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonFixtureCaIonophoreFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonEggQualityAnalysisFixture.id,
      type: PlanAddonType.EggQualityAnalysis,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForStrawDeletionFixture: Partial<PatientPlan> = {
  id: 143,
  uuid: 143 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForDeletingStrawFutureFixture.id,
  status: PlanStatusEnum.ReadyForActivation,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanV2ForMiiDay1CryoFixture: Partial<PatientPlan> = {
  id: 144,
  uuid: 'eab70c3c-02fd-41a4-b6d8-c57f5c896e3e',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
}
export const patientPlanV2ForMiiDay1CryoMaxDiscardedValidationFixture: Partial<PatientPlan> = {
  id: 145,
  uuid: 'f9be9139-8144-4f06-8f1a-b75a0de23278',
  planTypeId: planTypeFixture.id,
  patientId: patientForMiiDay1CryoMaxDeletionFieldValidationFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanBiopsyInTransitFixture: Partial<PatientPlan> = {
  id: 1450,
  uuid: 'fab70c3c-02fd-41a4-b6d8-c57f5c896e3f',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlanPartnerFixture.id,
  status: PlanStatusEnum.Completed,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanWithLinkedBillsFixture: Partial<PatientPlan> = {
  id: 160,
  uuid: 160 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForLinkedBillsFixture.id,
  totalAmount: '1000.22',
  status: PlanStatusEnum.ReadyToOrder,
  createdAt: dateTimeUtil.toDate('2020-03-08T13:00:00'),
}

export const patientPlanWithoutLinkedBillsFixture: Partial<PatientPlan> = {
  id: 146,
  uuid: 146 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForLinkedBillsFixture.id,
  totalAmount: '999.11',
  status: PlanStatusEnum.ReadyToOrder,
  lastStatusUpdateDate: dateTimeUtil.toDate('2020-03-13T13:00:00'),
  createdAt: dateTimeUtil.toDate('2020-03-13T13:00:00'),
}

export const patientPlanWithAllBillsCreatedFixture: Partial<PatientPlan> = {
  id: 147,
  uuid: 147 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeWithoutOrderingFixture.id,
  patientId: patientForLinkedBillsFixture.id,
  totalAmount: '555.55',
  status: PlanStatusEnum.Ordered,
  createdAt: dateTimeUtil.toDate('2020-03-10T13:00:00'),
}

export const patientPlanWithoutTotalAmountFixture: Partial<PatientPlan> = {
  id: 148,
  uuid: 148 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForLinkedBillsFixture.id,
  status: PlanStatusEnum.ReadyToOrder,
  createdAt: dateTimeUtil.toDate('2020-03-11T13:00:00'),
}

export const patientPlanForPlansBackgroundPriceFixture: Partial<PatientPlan> = {
  id: 149,
  lockedPrice: '742.21',
  uuid: 149 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansBackgroundFixture.id,
  status: PlanStatusEnum.Ordered,
  addons: [
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '111.11',
    },
    {
      planAddonId: planAddonGeneticTestingFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '222.22',
    },
    {
      planAddonId: planAddonFreshEmbryoFixture.id,
      type: PlanAddonType.FreshEmbryoTransfer,
      lockedPrice: '444.44',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanAdhocCheckoutFixture: Partial<PatientPlan> = {
  id: 150,
  uuid: 150 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  status: PlanStatusEnum.Ordered,
  createdAt: dateTimeUtil.toDate('2020-03-11T13:00:00'),
  totalAmount: '1000.00',
  addons: [
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonGeneticTestingFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForEggThawStrawSelectionVisibilityFixture: Partial<PatientPlan> = {
  id: 151,
  uuid: 151 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForStrawSelectionVisibilityFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.toDate('2020-03-08T13:00:00'),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanToChangePatientStatusFixture: Partial<PatientPlan> = {
  id: 152,
  uuid: 'ad2e1d23-6184-4651-8478-40d9ab13e3a1',
  activatedOn: dateTimeUtil.now(),
  planTypeId: planTypeWithTestResultsFixture.id,
  patientId: patientChangeStatusFixture.id,
  status: PlanStatusEnum.Completed,
}

export const patientPlanV2ForStrawNumberFixture: Partial<PatientPlan> = {
  id: 153,
  uuid: 'f4ecdfb2-5249-48fb-b633-0a94db9e5495',
  planTypeId: planTypeFixture.id,
  patientId: ivfPatientFemaleStrawNumberFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForMilestoneUpdateFixture: Partial<PatientPlan> = {
  id: 155,
  uuid: 155 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeConsentGenerationFixture.id,
  patientId: patientForPlansBackgroundFixture.id,
  status: PlanStatusEnum.ReadyForActivation,
  addons: [
    {
      planAddonId: planAddonEndometrialAssessmentFixture.id,
      type: PlanAddonType.EndometrialAssessment,
      lockedPrice: '0',
    },
    {
      planAddonId: planAddonGeneticTestingFixture.id,
      type: PlanAddonType.GeneticTesting,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForStrawSelectionOocyteCollectionFixture: Partial<PatientPlan> = {
  id: 156,
  uuid: 156 + '22f2c-cc12-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientForStrawSelectionOocyteCollectionFixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.toDate('2020-03-08T13:00:00'),
  ivfLabStatus: IVFLabStatus.Active,
}
