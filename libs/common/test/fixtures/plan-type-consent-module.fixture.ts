import {PlanTypeConsentModule} from '@libs/data-layer/apps/plan/entities/typeorm/plan-type-consent-module.entity'
import {consentModuleFixture, consentModuleForPlanTypeFixture} from './consent-module.fixture'
import {planTypeConsentGenerationFixture} from './plan-type.fixture'
import {ConsentModuleRelationType} from '@libs/data-layer/apps/users/enum'

export const planTypeConsentModuleFixture: Partial<PlanTypeConsentModule> = {
  id: 1,
  planTypeId: planTypeConsentGenerationFixture.id,
  consentModuleId: consentModuleForPlanTypeFixture.id,
  sequence: 2,
  relationType: ConsentModuleRelationType.Patient,
}

export const planTypeConsentModuleFirstFixture: Partial<PlanTypeConsentModule> = {
  id: 2,
  planTypeId: planTypeConsentGenerationFixture.id,
  consentModuleId: consentModuleFixture.id,
  sequence: 1,
  relationType: ConsentModuleRelationType.Partners,
}
