import {OhipClaimToCode} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {
  ohipClaimForDetailFixture,
  ohipClaimForGetListFixture,
  ohipClaimForSubmissionFixture,
} from './ohip-claim.fixture'
import {
  mdBillingDiagnosticCodeForGetListFixture,
  mdBillingDiagnosticCodeForSubmissionFixture,
} from './mdbilling-diagnostic-code.fixture'
import {mdBillingServiceCodeForGetListFixture} from './mdbilling-service-code.fixture'

export const claimCodeForSubmission: Partial<OhipClaimToCode> = {
  id: 1,
  ohipClaimId: ohipClaimForSubmissionFixture.id,
  mdBillingServiceCodeId: mdBillingServiceCodeForGetListFixture.id,
  mdBillingDiagnosticCodeId: mdBillingDiagnosticCodeForSubmissionFixture.id,
  quantity: 4,
}

export const ohipClaimForGetListCodesFixture: Partial<OhipClaimToCode> = {
  id: 2,
  ohipClaimId: ohipClaimForGetListFixture.id,
  mdBillingDiagnosticCodeId: mdBillingDiagnosticCodeForGetListFixture.id,
  mdBillingServiceCodeId: mdBillingServiceCodeForGetListFixture.id,
  quantity: 1,
}

export const ohipClaimForDetailsFixture: Partial<OhipClaimToCode> = {
  id: 3,
  ohipClaimId: ohipClaimForDetailFixture.id,
  mdBillingDiagnosticCodeId: mdBillingDiagnosticCodeForGetListFixture.id,
  mdBillingServiceCodeId: mdBillingServiceCodeForGetListFixture.id,
  quantity: 3,
}
