import {PatientConsentModule} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientConsentPackageFixture,
  patientConsentPackageForMobileUpcomingFixture,
  patientConsentPackageWith2ModulesAndPartnerFixture,
} from './patient-consent-package.fixture'
import {
  consentModuleFixture,
  consentModuleForTermsFixture,
  consentModuleToSendFixture,
} from './consent-module.fixture'

export const patientConsentModuleFixture: Partial<PatientConsentModule> = {
  id: 1,
  uuid: '1651cf57-2a3f-47d0-8790-c776fa1e1313',
  patientConsentPackageId: patientConsentPackageFixture.id,
  consentModuleId: consentModuleFixture.id,
  sequence: 2,
}

export const patientConsentModuleForUpcomingMilestoneMobileFixture: Partial<PatientConsentModule> =
  {
    id: 2,
    uuid: 2 + '651cf57-2a3f-47d0-8790-c776fa1e1313',
    patientConsentPackageId: patientConsentPackageForMobileUpcomingFixture.id,
    consentModuleId: consentModuleFixture.id,
  }

export const patientConsentModuleForMobileListOneFixture: Partial<PatientConsentModule> = {
  id: 3,
  uuid: 3 + '651cf57-2a3f-47d0-8790-c776fa1e1313',
  patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
  consentModuleId: consentModuleFixture.id,
  sequence: 2,
}

export const patientConsentModuleForMobileListTwoFixture: Partial<PatientConsentModule> = {
  id: 4,
  uuid: 4 + '651cf57-2a3f-47d0-8790-c776fa1e1313',
  patientConsentPackageId: patientConsentPackageWith2ModulesAndPartnerFixture.id,
  consentModuleId: consentModuleForTermsFixture.id,
  sequence: 1,
}

export const patientConsentModuleForSequenceFixture: Partial<PatientConsentModule> = {
  id: 5,
  uuid: 5 + '651cf57-2a3f-47d0-8790-c776fa1e1313',
  patientConsentPackageId: patientConsentPackageFixture.id,
  consentModuleId: consentModuleToSendFixture.id,
  sequence: 1,
}
