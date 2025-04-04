import {PatientPlanSpermSource} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-sperm-source.entity'
import {SpermSourceV2} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {
  patientForEncounterTypeFixture,
  patientForPlanGenerationPartnerFixture,
  patientForPlansV2CheckoutWithAddons,
  patientForPlansV2CheckoutWithTestTypesFixture,
  patientForPlansV2PartnerMaleFixture,
  patientForPlansV3PartnerMaleFixture,
  patientNotOhipFixture,
} from './patient.fixture'
import {
  patientPlanForConsentGenerationWithAllAddonsFixture,
  patientPlanForMobileComponentsDetailsV2Fixture,
  patientPlanV2ForGetGroupTaskFixture,
  patientPlanV2ToUpdateFixture,
  patientPlanV3ToUpdateFixture,
  patientPlanWith1PartnerDifferentRolesFixture,
} from './patient-plan.fixture'
import {
  planAddonForFreshPartnerWithFrozenBackupFixture,
  planAddonFreshDefaultFixture,
  planAddonFrozenFixture,
  planAddonIVFFreshDefaultFixture,
} from './plan-addon.fixture'

export const patientPlanSpermSourceToUpdate: Partial<PatientPlanSpermSource> = {
  id: 1,
  patientPlanId: patientPlanV2ToUpdateFixture.id,
  spermSource: SpermSourceV2.PartnerFresh,
  donorId: null,
  spermContributorId: patientForPlansV2PartnerMaleFixture.id,
  freshSpermTypeAddonId: planAddonFreshDefaultFixture.id,
}

export const patientPlanSpermSourceForIvf: Partial<PatientPlanSpermSource> = {
  id: 2,
  patientPlanId: patientPlanV2ForGetGroupTaskFixture.id,
  spermSource: SpermSourceV2.PartnerFresh,
  donorId: null,
  spermContributorId: patientNotOhipFixture.id,
  freshSpermTypeAddonId: planAddonIVFFreshDefaultFixture.id,
}

export const partnerFreshSpermSourceForComponentsFixture: Partial<PatientPlanSpermSource> = {
  id: 3,
  patientPlanId: patientPlanForMobileComponentsDetailsV2Fixture.id,
  spermSource: SpermSourceV2.PartnerFresh,
  donorId: null,
  spermContributorId: patientNotOhipFixture.id,
  freshSpermTypeAddonId: planAddonIVFFreshDefaultFixture.id,
}

export const partnerFrozenSpermSourceForComponentsFixture: Partial<PatientPlanSpermSource> = {
  id: 4,
  patientPlanId: patientPlanForMobileComponentsDetailsV2Fixture.id,
  spermSource: SpermSourceV2.PartnerFrozen,
  donorId: null,
  spermContributorId: patientNotOhipFixture.id,
  freshSpermTypeAddonId: planAddonIVFFreshDefaultFixture.id,
}

export const NASourceForComponentsFixture: Partial<PatientPlanSpermSource> = {
  id: 5,
  patientPlanId: patientPlanForMobileComponentsDetailsV2Fixture.id,
  spermSource: SpermSourceV2.NA,
  donorId: null,
  spermContributorId: patientNotOhipFixture.id,
  freshSpermTypeAddonId: planAddonIVFFreshDefaultFixture.id,
}

export const patientPlanSpermSourceToUpdateV3Fixture: Partial<PatientPlanSpermSource> = {
  id: 6,
  patientPlanId: patientPlanV3ToUpdateFixture.id,
  spermSource: SpermSourceV2.PartnerFresh,
  donorId: null,
  spermContributorId: patientForPlansV3PartnerMaleFixture.id,
  freshSpermTypeAddonId: planAddonFreshDefaultFixture.id,
}

export const spermSourceFreshPartnerWithFrozenBackupFixture: Partial<PatientPlanSpermSource> = {
  id: 7,
  patientPlanId: patientPlanForMobileComponentsDetailsV2Fixture.id,
  spermSource: SpermSourceV2.FreshPartnerWithFrozenBackup,
  donorId: null,
  spermContributorId: patientForPlansV3PartnerMaleFixture.id,
  freshSpermTypeAddonId: planAddonFreshDefaultFixture.id,
  freshWithFrozenBackupSpermTypeAddonId: planAddonForFreshPartnerWithFrozenBackupFixture.id,
}

export const patientPlanSpermSourceConsentPartnerFreshFixture: Partial<PatientPlanSpermSource> = {
  id: 8,
  patientPlanId: patientPlanForConsentGenerationWithAllAddonsFixture.id,
  spermSource: SpermSourceV2.PartnerFresh,
  donorId: null,
  spermContributorId: patientForPlansV2CheckoutWithAddons.id,
  freshSpermTypeAddonId: planAddonIVFFreshDefaultFixture.id,
}

export const patientPlanSpermSourceConsentPartnerFrozenFixture: Partial<PatientPlanSpermSource> = {
  id: 9,
  patientPlanId: patientPlanForConsentGenerationWithAllAddonsFixture.id,
  spermSource: SpermSourceV2.PartnerFrozen,
  donorId: null,
  spermContributorId: patientForPlansV2CheckoutWithTestTypesFixture.id,
  frozenSpermTypeAddonId: planAddonFrozenFixture.id,
}

export const patientPlanSpermSourceConsentFrozenWithBackFixture: Partial<PatientPlanSpermSource> = {
  id: 10,
  patientPlanId: patientPlanForConsentGenerationWithAllAddonsFixture.id,
  spermSource: SpermSourceV2.FreshPartnerWithFrozenBackup,
  donorId: null,
  spermContributorId: patientForEncounterTypeFixture.id,
  freshWithFrozenBackupSpermTypeAddonId: planAddonForFreshPartnerWithFrozenBackupFixture.id,
}

export const patientPlanSpermFrozenForEggContributorFixture: Partial<PatientPlanSpermSource> = {
  id: 11,
  patientPlanId: patientPlanWith1PartnerDifferentRolesFixture.id,
  spermSource: SpermSourceV2.PartnerFrozen,
  spermContributorId: patientForPlanGenerationPartnerFixture.id,
  frozenSpermTypeAddonId: planAddonFrozenFixture.id,
}
