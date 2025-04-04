import {PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {planCategoryV2Fixture} from './plan-category.fixture'
import {
  patientPlanStatusDischargableFixture,
  patientPlanStatusFixture,
  patientPlanStatusForAppointmentsByDateFixture,
  patientPlanStatusV2Fixture,
} from './patient-plan-status.fixture'
import {PlanTypeGroup} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {planChecklistEmptyFixture, planIVFChecklistFixture} from './plan-checklist.fixture'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PlanTypeSheet} from '@libs/data-layer/apps/plan/entities/typeorm/plan-type-sheet.entity'
import {serviceTypeFixture} from './service-type.fixture'
import {IvfCompletionDetailsType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {planSheetActionListFixture} from './plan-sheet-action-list.fixture'

const planTypeId: number = 1
export const planTypeWithTestResultsId: number = 2
export const planTypeCompletionDetailsTypeId: number = 16
export const planTypeFixture: Partial<PlanType> = {
  id: planTypeId,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994f6',
  title: 'planTypeFixtureV2',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'shawty',
  longDescription: 'long desc',
  price: 5112,
  patientPlanStatusId: patientPlanStatusV2Fixture.id,
  heading: 'PLAN TYPE HEADING',
  planTypeGroup: PlanTypeGroup.IVF,
  alertDescription: 'alert desc',
  alertTitle: 'alert title',
  allowPushToMobile: true,
  automaticMilestoneToReportPeriod: true,
  preliminaryBloods: true,
  infectiousDiseaseScreen: true,
  ivfLabCohortStartDay: 2,
  ivfCompletionDetailsType: IvfCompletionDetailsType.EmbryoFreezing,
  sheets: [
    {
      id: 1,
      type: PlanSheetType.Stimulation,
      planSheetActionListId: planSheetActionListFixture.id,
    },
    {
      id: 2,
      type: PlanSheetType.Priming,
      planSheetActionListId: planSheetActionListFixture.id,
    },
    {
      id: 3,
      type: PlanSheetType.HCG,
      planChecklistId: planIVFChecklistFixture.id,
      planSheetActionListId: planSheetActionListFixture.id,
    },
    {
      id: 4,
      type: PlanSheetType.OB,
      planChecklistId: planIVFChecklistFixture.id,
      planSheetActionListId: planSheetActionListFixture.id,
    },
    {
      id: 5,
      type: PlanSheetType.EPL,
      planChecklistId: planIVFChecklistFixture.id,
      planSheetActionListId: planSheetActionListFixture.id,
    },
  ] as PlanTypeSheet[],
}

export const planTypewithivfCompletionDetailsTypeFixture: Partial<PlanType> = {
  id: planTypeCompletionDetailsTypeId,
  uuid: 'c12cff3b-459b-41ab-ba7d-5ff8378e66cd',
  title: 'planTypeFixtureV2',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'shawty',
  longDescription: 'long desc',
  price: 5112,
  patientPlanStatusId: patientPlanStatusV2Fixture.id,
  heading: 'PLAN TYPE HEADING',
  ivfCompletionDetailsType: IvfCompletionDetailsType.EggFreezing,
  planTypeGroup: PlanTypeGroup.IVF,
  alertDescription: 'alert desc',
  alertTitle: 'alert title',
  allowPushToMobile: true,
  automaticMilestoneToReportPeriod: true,
  preliminaryBloods: true,
  infectiousDiseaseScreen: true,
  ivfLabCohortStartDay: 2,
  sheets: [
    {
      id: 6,
      type: PlanSheetType.Stimulation,
    },
    {
      id: 7,
      type: PlanSheetType.Priming,
    },
    {
      id: 8,
      type: PlanSheetType.HCG,
      planChecklistId: planIVFChecklistFixture.id,
    },
    {
      id: 9,
      type: PlanSheetType.OB,
      planChecklistId: planIVFChecklistFixture.id,
    },
    {
      id: 10,
      type: PlanSheetType.EPL,
      planChecklistId: planIVFChecklistFixture.id,
    },
  ] as PlanTypeSheet[],
}

export const planTypeWithTestResultsFixture: Partial<PlanType> = {
  id: planTypeWithTestResultsId,
  uuid: '821878d6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeWithTestResultsFixture',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'Plan Type V2 Version with test results enabled',
  price: 5,
  patientPlanStatusId: patientPlanStatusDischargableFixture.id,
  heading: 'PLAN TYPE WITH TEST RESULTS HEADING',
}

export const planTypeWithoutOrderingFixture: Partial<PlanType> = {
  id: 3,
  uuid: '231878d6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeWithoutOrderingFixture',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 5,
  sheets: [
    {
      id: 11,
      type: PlanSheetType.Stimulation,
    },
    {
      id: 12,
      type: PlanSheetType.HCG,
    },
    {
      id: 13,
      type: PlanSheetType.OB,
    },
  ] as PlanTypeSheet[],
  planTypeGroup: PlanTypeGroup.EPP,
  serviceTypeIdToSetCohortStartDate: serviceTypeFixture.id,
}

export const planTypeFertilisationDirectiveixture: Partial<PlanType> = {
  id: 4,
  uuid: '221878c6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeFertilisationDirectiveixture',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
}

export const planTypeMedicatioDiscontinueFixture: Partial<PlanType> = {
  id: 5,
  uuid: '221878b6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeMedicatioDiscontinueFixture',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
}

export const planTypeSpermContributionFixture: Partial<PlanType> = {
  id: 6,
  uuid: '331878b6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeSpermContributionFixture',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
}

export const planTypeUterusOocyteFixture: Partial<PlanType> = {
  id: 7,
  uuid: '331878b6-df81-4fc1-b413-3088c73eebba',
  title: 'planTypeUterusOocyteFixture',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
}

export const planTypeSpermContributionLIFixture: Partial<PlanType> = {
  id: 8,
  uuid: '432878b6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeSpermContributionLI',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
}

export const planTypeLabInstructionsFixture: Partial<PlanType> = {
  id: 9,
  uuid: '422871b6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeLabInstructions',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
}

export const planTypeManualPushFixture: Partial<PlanType> = {
  id: 10,
  uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  title: 'planTypeManualPush',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  pushableMilestoneToReportPeriod: true,
  patientPlanStatusId: patientPlanStatusFixture.id,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
}

export const planTypeWithIVFCheckistFixture: Partial<PlanType> = {
  id: 11,
  uuid: 'f47ac10b-28cc-4372-a567-0e02b2c3d479',
  title: 'planTypeWithIVFCheckistFixture',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  pushableMilestoneToReportPeriod: false,
  price: 5,
  planTypeGroup: PlanTypeGroup.IUI,
  sheets: [
    {
      id: 14,
      type: PlanSheetType.HCG,
      planChecklistId: planIVFChecklistFixture.id,
    },
    {
      id: 15,
      type: PlanSheetType.Priming,
      planChecklistId: planIVFChecklistFixture.id,
    },
    {
      id: 16,
      type: PlanSheetType.OB,
      planChecklistId: null,
    },
    {
      id: 17,
      type: PlanSheetType.Stimulation,
      planChecklistId: planChecklistEmptyFixture.id,
    },
  ] as PlanTypeSheet[],
}

export const planTypeComponentsFixture: Partial<PlanType> = {
  id: 12,
  uuid: 'c2d54016-a944-4386-a1f9-f76b56e0861a',
  title: 'planTypeComponentsFixture',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'test shortDescription',
  longDescription: 'test longDescription',
  price: 12,
  patientPlanStatusId: patientPlanStatusV2Fixture.id,
  heading: 'PLAN TYPE HEADING COMPONENT',
  planTypeGroup: PlanTypeGroup.IVF,
  alertDescription: 'alert desc',
  alertTitle: 'alert title',
  allowPushToMobile: true,
  activateWithoutMobile: true,
  automaticMilestoneToReportPeriod: true,
  preliminaryBloods: true,
  infectiousDiseaseScreen: true,
  ivfLabCohortStartDay: 2,
}

export const planTypeNotTaxableFixture: Partial<PlanType> = {
  id: 13,
  title: 'NotTaxablePlanTypeFixture',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'shawty',
  price: 100,
  patientPlanStatusId: patientPlanStatusFixture.id,
  heading: 'PLAN TYPE HEADING',
  taxable: false,
}

export const planTypeWithoutPriceFixture: Partial<PlanType> = {
  id: 14,
  title: 'NotTaxablePlanTypeFixture',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'shawty',
  price: 0,
  patientPlanStatusId: patientPlanStatusFixture.id,
  heading: 'PLAN TYPE HEADING',
  taxable: false,
}

export const planTypeEPLFixture: Partial<PlanType> = {
  id: 15,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994a4',
  title: 'planTypeEPLFixture',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'shawty',
  price: 0,
  planTypeGroup: PlanTypeGroup.EPL,
  patientPlanStatusId: patientPlanStatusFixture.id,
  heading: 'PLAN TYPE HEADING',
  taxable: false,
  sheets: [
    {
      id: 18,
      type: PlanSheetType.EPL,
      planChecklistId: null,
    },
  ] as PlanTypeSheet[],
}

export const planTypeTestOrdersFixture: Partial<PlanType> = {
  id: 17,
  uuid: '411871b6-df81-4fc1-b414-3088c73eebba',
  title: 'planTypeTestOrdersFixture',
  planCategoryId: planCategoryV2Fixture.id,
  allowPushToMobile: false,
  activateWithoutMobile: true,
  price: 11,
  planTypeGroup: PlanTypeGroup.IUI,
  patientPlanStatusId: patientPlanStatusForAppointmentsByDateFixture.id,
}

export const planTypeConsentGenerationFixture: Partial<PlanType> = {
  id: 18,
  uuid: '411871a6-af83-4fc1-b414-3088c73eebba',
  title: 'planTypeConsentGenerationFixture',
  planCategoryId: planCategoryV2Fixture.id,
  price: 11,
  patientPlanStatusId: patientPlanStatusFixture.id,
  automaticMilestoneToReportPeriod: true,
}
