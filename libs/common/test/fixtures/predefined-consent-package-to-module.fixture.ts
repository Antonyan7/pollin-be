import {PredefinedConsentPackageToModule} from '@libs/data-layer/apps/users/entities/typeorm'
import {consentModuleFixture, consentModuleForTermsFixture} from './consent-module.fixture'
import {predefinedConsentPackageFixture} from './predefined-consent-package.fixture'

export const predefinedConsentPackageToModuleFixture: Partial<PredefinedConsentPackageToModule> = {
  id: 1,
  consentModuleId: consentModuleFixture.id,
  predefinedConsentPackageId: predefinedConsentPackageFixture.id,
  sequence: 1,
}

export const predefinedConsentPackageToModuleTwoFixture: Partial<PredefinedConsentPackageToModule> =
  {
    id: 2,
    consentModuleId: consentModuleForTermsFixture.id,
    predefinedConsentPackageId: predefinedConsentPackageFixture.id,
    sequence: 2,
  }
