import {IvfDishBarcode} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  patientPlanCohortFixture,
  patientPlanCohortForScanBarcodeFixture,
  patientPlanCohortDishScanFixture,
  patientPlanCohortDishScanNoGroupFixture,
  patientPlanCohortDishScanNotAssignedFixture,
  patientPlanCohortForPartnerBarcodeFixture,
  patientPlanCohortForDiscardFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'

export const ivfDishBarcodeFixture: Partial<IvfDishBarcode> = {
  id: 1,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa7',
  value: 'DEED00000001',
  patientPlanCohortId: patientPlanCohortFixture.id,
}

export const ivfDishBarcodeScanDish1Fixture: Partial<IvfDishBarcode> = {
  id: 2,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa8',
  value: 'DEED00000002',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
}

export const ivfDishBarcodeScanDish2Fixture: Partial<IvfDishBarcode> = {
  id: 3,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aaa9',
  value: 'DEED00000003',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
}

export const ivfDishBarcodeScanDish3Fixture: Partial<IvfDishBarcode> = {
  id: 4,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab0',
  value: 'DEED00000004',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
}

export const ivfDishBarcodeScanDish4Fixture: Partial<IvfDishBarcode> = {
  id: 5,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab1',
  value: 'DEED00000005',
  patientPlanCohortId: patientPlanCohortDishScanNoGroupFixture.id,
}

export const ivfDishBarcodeScanDishNotAssignedFixture: Partial<IvfDishBarcode> = {
  id: 6,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab2',
  value: 'DEED00000006',
  patientPlanCohortId: patientPlanCohortDishScanNotAssignedFixture.id,
}

export const ivfDishBarcodeScanDishUnmatchedPatientFixture: Partial<IvfDishBarcode> = {
  id: 7,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab3',
  value: 'DEED00000007',
  patientPlanCohortId: patientPlanCohortDishScanNotAssignedFixture.id,
}

export const ivfDishBarcodeForScan1Fixture: Partial<IvfDishBarcode> = {
  id: 8,
  uuid: '3c6d2d68-fdf2-4115-9a56-93af013e2c0e',
  value: 'D000000064',
  patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
}
export const ivfDishBarcodeForScan2Fixture: Partial<IvfDishBarcode> = {
  id: 9,
  uuid: '764b508e-f223-4c67-a011-6e739e85faa3',
  value: 'D000000065',
  patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
}
export const ivfDishBarcodeForScan3Fixture: Partial<IvfDishBarcode> = {
  id: 10,
  uuid: 'cbabacd8-182a-4f58-81ad-e25953188026',
  value: 'D000000066',
  patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
}

export const ivfDishBarcodePatientFixture: Partial<IvfDishBarcode> = {
  id: 11,
  uuid: '77aaa7a7-777a-777a-77aa-7a7a7777aab4',
  value: 'DEED00000006',
  patientPlanCohortId: patientPlanCohortFixture.id,
}

export const ivfDishBarcodeUsedFixture: Partial<IvfDishBarcode> = {
  id: 12,
  uuid: '3c6d2d68-fdf2-4115-9a56-93af013e2c0f',
  value: 'D000000067',
  patientPlanCohortId: patientPlanCohortFixture.id,
}

export const ivfDishBarcodeNotRequiredFixture: Partial<IvfDishBarcode> = {
  id: 13,
  uuid: '3c6d2d68-fdf2-4115-9a56-93af013e2c10',
  value: 'D000000068',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
}

export const ivfDishBarcodePartnerFixture: Partial<IvfDishBarcode> = {
  id: 14,
  uuid: 'dca17c31-d4cc-46e5-b9de-e4a3f0c2e61e',
  value: 'D000000069',
  patientPlanCohortId: patientPlanCohortForPartnerBarcodeFixture.id,
}

export const ivfDishBarcodeForScanDiscardedDishFixture: Partial<IvfDishBarcode> = {
  id: 15,
  uuid: '1a14c84c-bd2e-4317-9fe7-ac10dddafdfe',
  value: 'D000000070',
  patientPlanCohortId: patientPlanCohortForDiscardFixture.id,
}
