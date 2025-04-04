import {ConsentModuleRelationType} from '@libs/data-layer/apps/users/enum'
import {
  consentModuleEggQualityAnalysisFixture,
  consentModuleEndometrialAssessmentFixture,
  consentModuleFertilizationDirectiveFixture,
  consentModuleFixture,
  consentModuleFreshEmbryoTransferFixture,
  consentModuleFreshSpermTypeFixture,
  consentModuleFreshWithFrozenBackupSpermTypeFixture,
  consentModuleFrozenSpermTypeFixture,
  consentModuleGeneticTestingFixture,
} from './consent-module.fixture'
import {
  planAddonEggQualityAnalysisFixture,
  planAddonEndometrialAssessmentNotSelectedFixture,
  planAddonFixtureCaIonophoreFixture,
  planAddonForFreshPartnerWithFrozenBackupFixture,
  planAddonFreshEmbryoFixture,
  planAddonFrozenFixture,
  planAddonGeneticTestingForComponentFixture,
  planAddonIVFFreshDefaultFixture,
} from './plan-addon.fixture'
import {PlanAddonConsentModule} from '@libs/data-layer/apps/plan/entities/typeorm/plan-addon-consent-module.entity'

export const planAddonConsentModuleFixture: Partial<PlanAddonConsentModule> = {
  id: 1,
  planAddonId: planAddonEggQualityAnalysisFixture.id,
  consentModuleId: consentModuleEggQualityAnalysisFixture.id,
  sequence: 2,
  relationType: ConsentModuleRelationType.EggContributor,
}

export const planAddonConsentModuleEggQualityAnalysisFixture: Partial<PlanAddonConsentModule> = {
  id: 2,
  planAddonId: planAddonEggQualityAnalysisFixture.id,
  consentModuleId: consentModuleFixture.id,
  sequence: 1,
  relationType: ConsentModuleRelationType.EggContributor,
}

export const planAddonConsentModuleEndometrialAssessmentFixture: Partial<PlanAddonConsentModule> = {
  id: 3,
  planAddonId: planAddonEndometrialAssessmentNotSelectedFixture.id,
  consentModuleId: consentModuleEndometrialAssessmentFixture.id,
  relationType: ConsentModuleRelationType.UterusContributor,
}

export const planAddonConsentModuleFertilizationDirectiveFixture: Partial<PlanAddonConsentModule> =
  {
    id: 4,
    planAddonId: planAddonFixtureCaIonophoreFixture.id,
    consentModuleId: consentModuleFertilizationDirectiveFixture.id,
    relationType: ConsentModuleRelationType.Partners,
  }

export const planAddonConsentModuleFreshEmbryoTransferFixture: Partial<PlanAddonConsentModule> = {
  id: 5,
  planAddonId: planAddonFreshEmbryoFixture.id,
  consentModuleId: consentModuleFreshEmbryoTransferFixture.id,
}

export const planAddonConsentModuleFreshSpermTypeFixture: Partial<PlanAddonConsentModule> = {
  id: 6,
  planAddonId: planAddonIVFFreshDefaultFixture.id,
  consentModuleId: consentModuleFreshSpermTypeFixture.id,
  relationType: ConsentModuleRelationType.SpermContributor,
}

export const planAddonConsentModuleFreshWithFrozenBackupSpermTypeFixture: Partial<PlanAddonConsentModule> =
  {
    id: 7,
    planAddonId: planAddonForFreshPartnerWithFrozenBackupFixture.id,
    consentModuleId: consentModuleFreshWithFrozenBackupSpermTypeFixture.id,
    relationType: ConsentModuleRelationType.SpermContributor,
  }

export const planAddonConsentModuleFrozenSpermTypeFixture: Partial<PlanAddonConsentModule> = {
  id: 8,
  planAddonId: planAddonFrozenFixture.id,
  consentModuleId: consentModuleFrozenSpermTypeFixture.id,
  relationType: ConsentModuleRelationType.SpermContributor,
}

export const planAddonConsentModuleGeneticTestingFixture: Partial<PlanAddonConsentModule> = {
  id: 9,
  planAddonId: planAddonGeneticTestingForComponentFixture.id,
  consentModuleId: consentModuleGeneticTestingFixture.id,
}
