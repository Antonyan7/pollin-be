import {MdBillingDiagnosticCode} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'

export const mdBillingDiagnosticCodeForGetListFixture: Partial<MdBillingDiagnosticCode> = {
  id: 1,
  uuid: '731c27f3-15ef-4274-a152-2986151ace66',
  diagnosticCode: 'diagnosticCode',
  diagnosticCodeId: 1,
  diagnosticCodeSearchDescription: 'diagnosticCodeSearchDescription',
}

export const mdBillingDiagnosticCodeForSubmissionFixture: Partial<MdBillingDiagnosticCode> = {
  id: 2,
  uuid: '999c27f3-15ef-4274-a152-2986151ace21',
  diagnosticCode: 'diagnosticCode 2',
  diagnosticCodeId: 2,
  diagnosticCodeDescription: 'diagnosticCodeDescription',
  diagnosticCodeSearchDescription: 'diagnosticCodeSearchDescription',
}
