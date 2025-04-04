import {PlanTypeComponent, PlanTypeHeading} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  planTypeComponentsFixture,
  planTypeEPLFixture,
  planTypeFertilisationDirectiveixture,
  planTypeFixture,
  planTypeLabInstructionsFixture,
  planTypeMedicatioDiscontinueFixture,
  planTypeSpermContributionFixture,
  planTypeSpermContributionLIFixture,
  planTypeTestOrdersFixture,
  planTypeUterusOocyteFixture,
  planTypeWithoutOrderingFixture,
  planTypeWithTestResultsFixture,
} from './plan-type.fixture'
import {PlanTypeComponentEnum} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {
  testTypeAntiSpermFixture,
  testTypeFixture,
  testTypeForObUltrasoundFixture,
  testTypeForTestResultFixture,
  testTypeForUltrasoundFolliclesFixture,
  testTypeHCGFixture,
} from './test-type.fixture'
import {PlanTestResultHandlingMethod} from '@libs/services-common/enums'
import {
  medicationCategoryFixtureId,
  medicationCategoryForPlanCreationFixtureId,
} from './medication-category.fixture'

export const planTypeHeadingPatientSummaryFixture: Partial<PlanTypeHeading> = {
  uuid: '216c619f-8d03-4660-a147-c4dcee193d79',
  title: 'planTypeHeadingPatientSummaryFixture',
  planTypeId: planTypeFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '216c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.PlanAlert,
      sequence: 1,
      showOnIvfLab: true,
    },
    {
      uuid: '316c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.LinkedPlan,
      sequence: 2,
      showOnIvfLab: true,
    },
    {
      uuid: '416c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.PreviousPlansIVF,
      sequence: 3,
      showOnIvfLab: true,
    },
    {
      uuid: '516c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.GTPAETALS,
      sequence: 4,
      showOnIvfLab: true,
    },
    {
      uuid: '616c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.Protocol,
      sequence: 5,
      showOnIvfLab: true,
    },
    {
      uuid: '716c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.BodySurfaceArea,
      sequence: 6,
      showOnIvfLab: true,
    },
    {
      uuid: '816c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.DayOneOfCycle,
      sequence: 7,
      showOnIvfLab: true,
    },
    {
      uuid: '916c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.DateOfIuiOrTransfer,
      sequence: 8,
      showOnIvfLab: true,
    },
    {
      uuid: '326c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.DateOfOvulation,
      sequence: 9,
      showOnIvfLab: true,
    },
    {
      uuid: '336c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.EstimatedDateOfConfinement,
      sequence: 10,
      showOnIvfLab: true,
    },
    {
      uuid: '346c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.ObUltrasoundCareType,
      sequence: 11,
      showOnIvfLab: true,
    },
    {
      uuid: '356c619f-8d03-4660-a147-c4dcee193d79',
      type: PlanTypeComponentEnum.DiscontinueMedication,
      sequence: 12,
      showOnIvfLab: true,
    },
  ] as PlanTypeComponent[],
}

export const planTypeHeadingCycleMonitoringFixture: Partial<PlanTypeHeading> = {
  uuid: '216c619f-8a03-4660-a148-c4dcee193d79',
  title: 'planTypeHeadingCycleMonitoringFixture',
  planTypeId: planTypeFixture.id,
  sequence: 2,
  components: [
    {
      uuid: '216c619f-2d03-4660-a147-c4dcee193d71',
      type: PlanTypeComponentEnum.LastMenstrualPeriod,
      sequence: 1,
      showOnIvfLab: true,
    },
    {
      uuid: '316c619f-8d03-4660-a247-c4dcee193d72',
      type: PlanTypeComponentEnum.NumberOfFollicles,
      sequence: 2,
      showOnIvfLab: true,
    },
    {
      uuid: '416c619f-8d03-4660-a247-c4dcee193d73',
      type: PlanTypeComponentEnum.ReportedDay1,
      sequence: 3,
      showOnIvfLab: true,
    },
    {
      uuid: '516c619f-8d03-4660-a247-c4dcee193d74',
      type: PlanTypeComponentEnum.ExpectedDay1,
      sequence: 4,
      showOnIvfLab: true,
    },
  ] as PlanTypeComponent[],
}

export const planTypeHeadingLabInstructionFixture: Partial<PlanTypeHeading> = {
  uuid: '216c619f-8a03-4660-a147-c4dcee193d79',
  title: 'planTypeHeadingLabInstructionFixture',
  planTypeId: planTypeFixture.id,
  sequence: 3,
  components: [
    {
      uuid: '416c619f-8d03-4660-a147-c4dcee193d73',
      type: PlanTypeComponentEnum.Procedures,
      sequence: 2,
      showOnIvfLab: true,
    },
    {
      uuid: '516c619f-8d03-4660-a147-c4dcee193d74',
      type: PlanTypeComponentEnum.ContributorOocyte,
      sequence: 3,
      showOnIvfLab: true,
    },
    {
      uuid: '516c612f-8d03-4660-a147-c4dcee193d74',
      type: PlanTypeComponentEnum.ContributorSperm,
      sequence: 4,
      showOnIvfLab: true,
    },
    {
      uuid: '616c619f-8d03-4660-a147-c4dcee193d75',
      type: PlanTypeComponentEnum.ContributorUterus,
      sequence: 5,
      showOnIvfLab: true,
    },
    {
      uuid: '716c619f-8d03-4660-a147-c4dcee193d76',
      type: PlanTypeComponentEnum.MockCycleType,
      sequence: 6,
      showOnIvfLab: true,
    },
    {
      uuid: '916c619f-8d03-4660-a147-c4dcee193d78',
      type: PlanTypeComponentEnum.EggStatus,
      sequence: 8,
      showOnIvfLab: true,
    },
    {
      uuid: '326c619f-8d03-4660-a147-c4dcee193d19',
      type: PlanTypeComponentEnum.EndometrialAssessment,
      sequence: 9,
      showOnIvfLab: true,
    },
    {
      uuid: '336c619f-8d03-4660-a147-c4dcee193d29',
      type: PlanTypeComponentEnum.FertilisationDirective,
      sequence: 10,
      showOnIvfLab: true,
    },
    {
      uuid: '346c619f-8d03-4660-a147-c4dcee193d39',
      type: PlanTypeComponentEnum.GeneticTestingV2,
      sequence: 11,
      showOnIvfLab: true,
    },
    {
      uuid: '356c619f-8d03-4660-a147-c4dcee193d49',
      type: PlanTypeComponentEnum.FreshEmbryoTransfer,
      sequence: 12,
      showOnIvfLab: true,
    },
    {
      uuid: '356c619f-8d03-4660-a147-c4dcee193d59',
      type: PlanTypeComponentEnum.FrozenEmbryoTransfer,
      sequence: 13,
      showOnIvfLab: true,
    },
    {
      uuid: '356c619f-8d03-4660-a147-c4daec293d59',
      type: PlanTypeComponentEnum.EggQualityAnalysis,
      sequence: 14,
      showOnIvfLab: true,
    },
    {
      uuid: 'ed1f6c9f-90e7-4b01-8d0d-b006bb0c28d3',
      type: PlanTypeComponentEnum.FrozenEggsToThaw,
      sequence: 15,
      showOnIvfLab: true,
    },
  ] as PlanTypeComponent[],
}

export const planTypeHeadingAdditionalInfoFixture: Partial<PlanTypeHeading> = {
  uuid: '216c619f-8b03-4660-a147-c4dcee193d79',
  title: 'planTypeHeadingAdditionalInfoFixture',
  planTypeId: planTypeFixture.id,
  sequence: 4,
  components: [
    {
      uuid: '216c619f-1d03-4660-a147-c4dcee193d71',
      type: PlanTypeComponentEnum.AdditionalPlanInfo,
      sequence: 1,
      showOnIvfLab: true,
    },
    {
      uuid: '216c619f-1d03-5260-a147-c4dcee193d71',
      type: PlanTypeComponentEnum.MedicationsByCategories,
      sequence: 2,
      showOnIvfLab: true,
      medicationCategories: [
        {
          planTypeId: planTypeFixture.id,
          medicationCategoryId: medicationCategoryForPlanCreationFixtureId,
          sequence: 1,
        },
        {
          planTypeId: planTypeFixture.id,
          medicationCategoryId: medicationCategoryFixtureId,
          sequence: 2,
        },
        {
          planTypeId: planTypeFixture.id,
          medicationCategoryId: null,
          sequence: 3,
        },
      ],
    },
    {
      uuid: '216c619f-1d03-5260-c147-c4dcee193d71',
      type: PlanTypeComponentEnum.MedicationsByCategories,
      sequence: 3,
      medicationCategories: [],
    },
  ] as PlanTypeComponent[],
}

export const planTypeFertilisationDirectiveHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '316c619f-8b03-4660-a147-c4dcee193d79',
  title: 'planTypeFertilisationDirectiveHeadingFixture',
  planTypeId: planTypeFertilisationDirectiveixture.id,
  sequence: 1,
  components: [
    {
      uuid: '216c619f-1d21-4660-a147-c4dcee193d71',
      type: PlanTypeComponentEnum.FertilisationDirective,
      sequence: 1,
    },
  ] as PlanTypeComponent[],
}

export const planTypeMedicatioDiscontinueHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '316c619f-8b03-4660-a147-b2dcee193d79',
  title: 'planTypeFertilisationDirectiveHeadingFixture',
  planTypeId: planTypeMedicatioDiscontinueFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '216c619f-1d21-4660-a132-c4dcee193d71',
      type: PlanTypeComponentEnum.DiscontinueMedication,
      sequence: 1,
    },
  ] as PlanTypeComponent[],
}

export const planTypeSpermContributionHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '316c319f-2b03-4660-a147-b2dcee193d72',
  title: 'planTypeSpermContributionHeadingFixture',
  planTypeId: planTypeSpermContributionFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '216c619f-1d21-4660-a132-b3dcee193d71',
      type: PlanTypeComponentEnum.ContributorSperm,
      sequence: 1,
    },
  ] as PlanTypeComponent[],
}

export const planTypeUterusOocyteHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '316c239a-2b03-4660-a147-b2dcee193d72',
  title: 'planTypeUterusOocyteHeadingFixture',
  planTypeId: planTypeUterusOocyteFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619a-1d21-4660-a132-b3dcee193d71',
      type: PlanTypeComponentEnum.ContributorUterus,
      sequence: 1,
    },
    {
      uuid: '236c619a-1d21-4660-a132-b3dcee193d71',
      type: PlanTypeComponentEnum.ContributorOocyte,
      sequence: 2,
    },
  ] as PlanTypeComponent[],
}

export const planTypeSpermContributionLIHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '316c239b-1b04-4660-a147-b2dcee193d72',
  title: 'planTypeSpermContributionLIHeadingFixture',
  planTypeId: planTypeSpermContributionLIFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619a-1d21-4660-a231-c3dcee193d71',
      type: PlanTypeComponentEnum.ContributorSpermLI,
      sequence: 1,
    },
  ] as PlanTypeComponent[],
}

export const planTypeLabInstructionsHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '316c239b-1b04-4660-a147-b2acee294d72',
  title: 'planTypeLabInstructionsHeadingFixture',
  planTypeId: planTypeLabInstructionsFixture.id,
  sequence: 1,
  components: [
    {
      sequence: 1,
      uuid: '416c239b-1b04-4660-a147-b2acaa294d32',
      type: PlanTypeComponentEnum.EmbryoTransferAndCryoInstructions,
    },
    {
      sequence: 2,
      uuid: '316c239b-1b04-4660-a147-b2acaa294d32',
      type: PlanTypeComponentEnum.EggFreezeInstructions,
    },
    {
      sequence: 3,
      uuid: '216c239b-1b04-4660-a147-b2acaa294d32',
      type: PlanTypeComponentEnum.FrozenEmbryoTransferInstructions,
    },
    {
      sequence: 4,
      uuid: '116c239b-1b04-4660-a147-b2acaa294d32',
      type: PlanTypeComponentEnum.IVFRetrievalOrderInstructions,
    },
  ] as PlanTypeComponent[],
}

export const planTypeHeadingWithTestResultsFixture: Partial<PlanTypeHeading> = {
  uuid: '323c239b-1b04-4660-a147-b2dcee193d72',
  title: 'planTypeHeadingWithTestResultsFixture',
  planTypeId: planTypeWithTestResultsFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619b-3d21-4660-a231-c3dcee193d71',
      type: PlanTypeComponentEnum.TestResults,
      sequence: 1,
      showOnIvfLab: true,
      testTypes: [
        {
          testTypeId: testTypeFixture.id,
          sequence: 1,
        },
        {
          testTypeId: testTypeHCGFixture.id,
          handling: PlanTestResultHandlingMethod.TrendingHistory,
          sequence: 2,
        },
      ],
    },
    {
      uuid: '226c619c-2d21-4660-a231-c3dcee293d71',
      type: PlanTypeComponentEnum.TestResults,
      sequence: 2,
      testTypes: [
        {
          testTypeId: testTypeForObUltrasoundFixture.id,
          handling: PlanTestResultHandlingMethod.DisplayInModal,
          sequence: 1,
        },
      ],
    },
    {
      uuid: '226c619c-2d22-5660-a231-c3dcee193d71',
      type: PlanTypeComponentEnum.TestResults,
      sequence: 3,
      testTypes: [],
    },
  ] as PlanTypeComponent[],
}

export const planTypeHeadingWithMalePartnerResultsFixture: Partial<PlanTypeHeading> = {
  uuid: '323c239b-2b03-2660-a147-b2dcee193d72',
  title: 'planTypeHeadingWithMalePartnerResultsFixture',
  planTypeId: planTypeWithTestResultsFixture.id,
  sequence: 2,
  components: [
    {
      uuid: '322a619b-3d21-4660-a231-c3dcee193d71',
      type: PlanTypeComponentEnum.MalePartnerResults,
      sequence: 1,
      testTypes: [
        {
          testTypeId: testTypeAntiSpermFixture.id,
          handling: PlanTestResultHandlingMethod.TrendingHistory,
          sequence: 1,
        },
        {
          testTypeId: testTypeForTestResultFixture.id,
          handling: PlanTestResultHandlingMethod.TrendingHistory,
          sequence: 2,
        },
      ],
    },
    {
      uuid: '322a619c-2d21-4660-a231-c3dcee293d71',
      type: PlanTypeComponentEnum.MalePartnerResults,
      sequence: 2,
      testTypes: [
        {
          testTypeId: testTypeForUltrasoundFolliclesFixture.id,
          handling: PlanTestResultHandlingMethod.DisplayInModal,
          sequence: 1,
        },
      ],
    },
    {
      uuid: '322a619c-2d22-5660-a231-c3dcee193d71',
      type: PlanTypeComponentEnum.MalePartnerResults,
      sequence: 3,
      testTypes: [],
    },
  ] as PlanTypeComponent[],
}

export const planTypeWithoutOrderingMedicationHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '323c239b-1b03-4660-a147-b2dcee193d72',
  title: 'planTypeWithoutOrderingMedicationHeadingFixture',
  planTypeId: planTypeWithoutOrderingFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619b-3d21-4660-a121-c3dcee193d71',
      type: PlanTypeComponentEnum.MedicationsByCategories,
      sequence: 1,
      medicationCategories: [
        {
          planTypeId: planTypeWithoutOrderingFixture.id,
          medicationCategoryId: medicationCategoryForPlanCreationFixtureId,
          sequence: 1,
        },
      ],
    },
    {
      uuid: '226c619c-2d21-4660-a121-c3dcee293d71',
      type: PlanTypeComponentEnum.MedicationsByCategories,
      sequence: 2,
      medicationCategories: [
        {
          planTypeId: planTypeWithoutOrderingFixture.id,
          medicationCategoryId: medicationCategoryFixtureId,
          sequence: 1,
        },
        {
          planTypeId: planTypeWithoutOrderingFixture.id,
          medicationCategoryId: null,
          sequence: 2,
        },
      ],
    },
  ] as PlanTypeComponent[],
}

export const planTypeForMobileComponentsHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '313c239b-2c01-4660-a147-b2dcee193d72',
  title: 'planTypeForMobileComponentsHeadingFixture',
  planTypeId: planTypeComponentsFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619b-3d21-4660-a121-c3dcee193c11',
      type: PlanTypeComponentEnum.GeneticTestingV2,
      sequence: 1,
      showOnMobile: true,
    },
    {
      uuid: '226c619c-2d21-4660-a121-c3dcee293c21',
      type: PlanTypeComponentEnum.NumberOfFollicles,
      sequence: 2,
      showOnMobile: true,
    },
    {
      uuid: '226c619c-2d21-4660-a121-c3dcee293c31',
      type: PlanTypeComponentEnum.EndometrialAssessment,
      sequence: 3,
      showOnMobile: true,
    },
    {
      uuid: '226c619c-2d21-4660-a121-c3dee293dc41',
      type: PlanTypeComponentEnum.FertilisationDirective,
      sequence: 4,
      showOnMobile: true,
    },
    {
      uuid: '226c629c-2d23-4560-a123-c3dee293dc42',
      type: PlanTypeComponentEnum.EggQualityAnalysis,
      sequence: 5,
      showOnMobile: true,
    },
  ] as PlanTypeComponent[],
}

export const planTypeForMobileSpermContributionHeadingFixture: Partial<PlanTypeHeading> = {
  uuid: '313c219b-3c02-4660-a147-b2dcee193d72',
  title: 'planTypeForMobileSpermContributionHeadingFixture',
  planTypeId: planTypeComponentsFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619b-3d21-4660-a121-c3daeb193c11',
      type: PlanTypeComponentEnum.ContributorSperm,
      sequence: 1,
      showOnMobile: true,
    },
  ] as PlanTypeComponent[],
}

export const planTypeHeadingEPLFixture: Partial<PlanTypeHeading> = {
  uuid: '313c219c-3c02-4660-a147-a2dcee193d72',
  title: 'planTypeHeadingEPLFixture',
  planTypeId: planTypeEPLFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619b-3d21-4660-a133-c3daeb193c11',
      type: PlanTypeComponentEnum.RhogamOrWinRhoRequired,
      sequence: 1,
    },
    {
      uuid: '226c619b-3d21-4660-a132-c3daeb193c11',
      type: PlanTypeComponentEnum.SpontaneousBleeding,
      sequence: 2,
    },
    {
      uuid: '226c619b-3d21-4620-a132-a3daeb193c11',
      type: PlanTypeComponentEnum.LutealSupport,
      sequence: 3,
    },
  ] as PlanTypeComponent[],
}

export const planTypeHeadingTestOrdersFixture: Partial<PlanTypeHeading> = {
  uuid: '313c219b-1a03-4660-a147-a2dcee193d23',
  title: 'planTypeHeadingTestOrdersFixture',
  planTypeId: planTypeTestOrdersFixture.id,
  sequence: 1,
  components: [
    {
      uuid: '226c619b-3d21-4660-a133-a3daeb121c54',
      type: PlanTypeComponentEnum.TestOrders,
      sequence: 1,
      showOnIvfLab: true,
    },
  ] as PlanTypeComponent[],
}
