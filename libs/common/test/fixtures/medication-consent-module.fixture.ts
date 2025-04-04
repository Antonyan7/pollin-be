import {MedicationConsentModule} from '@libs/data-layer/apps/medication/entities/typeorm/medication-consent-module.entity'

import {medicationForConsentFixture} from './medication.fixture'
import {consentModuleFixture, consentModuleForMedicationFixture} from './consent-module.fixture'

export const medicationConsentModuleFixture: Partial<MedicationConsentModule> = {
  id: 1,
  medicationId: medicationForConsentFixture.id,
  consentModuleId: consentModuleFixture.id,
  sequence: 1,
}

export const medicationConsentModuleWithSpecificModuleFixture: Partial<MedicationConsentModule> = {
  id: 2,
  medicationId: medicationForConsentFixture.id,
  consentModuleId: consentModuleForMedicationFixture.id,
  sequence: 2,
}
