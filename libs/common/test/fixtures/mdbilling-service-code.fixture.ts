import {MdBillingServiceCode} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'

export const mdBillingServiceCodeForGetListFixture: Partial<MdBillingServiceCode> = {
  id: 1,
  uuid: 'a501067a-ed0c-4c69-965c-63c3d24de66b',
  serviceCodeId: 1,
  serviceCode: 'serviceCode',
  serviceCodeSearchDescription: 'serviceCodeSearchDescription',
}

export const mdbillingServiceCodeFixture: Partial<MdBillingServiceCode> = {
  id: 2,
  uuid: '4461067a-ed0c-4c69-965c-63c3d24de66b',
  serviceCodeId: 2,
  serviceCode: 'A00A1_service_code',
  serviceCodeSearchDescription: 'service code search description',
  defaultDiagnosticCodeId: null,
}

export const mdBillingServiceCodeFixture: Partial<MdBillingServiceCode> = {
  id: 3,
  uuid: '8811067a-ed0c-4c69-965c-63c3d24de66b',
  serviceCodeId: 3,
  serviceCode: 'A00A3_service_code',
  serviceCodeSearchDescription: 'service code search description',
  defaultDiagnosticCodeId: null,
}
