import {PatientPlanCohortIvfDish} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfDishFixture,
  ivfDishPatientPartnerFixture,
  ivfDishForScanBarcode1Fixture,
  ivfDishForScanBarcode2Fixture,
  ivfDishForScanBarcode3Fixture,
  ivfDishScanDishNotAssignedFixture,
  ivfDishScanDishDay0Fixture,
  ivfDishScanDishDay1Fixture,
  ivfDishScanDishPrepDayFixture,
  ivfDishPatientSubmitDishInventoryFixture,
  ivfDishForPartnerFixture,
  ivfDishWitnessingChecklistFixture,
  ivfDishWitnessingForPartnerBarcodeFixture,
  ivfDishForDiscardFixture,
} from '@libs/common/test/fixtures/ivf-dish.fixture'
import {
  patientPlanCohortDishScanFixture,
  patientPlanCohortDishScanNoGroupFixture,
  patientPlanCohortFixture,
  patientPlanCohortForScanBarcodeFixture,
  patientPlanCohortDishScanNotAssignedFixture,
  patientPlanCohort2ForWitnessingChecklistFixture,
  patientPlanCohortForPartnerBarcodeFixture,
  patientPlanCohortForDiscardFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {
  ivfDishBarcodeScanDish1Fixture,
  ivfDishBarcodeScanDish2Fixture,
  ivfDishBarcodeScanDish3Fixture,
  ivfDishBarcodeScanDish4Fixture,
  ivfDishBarcodeForScan1Fixture,
  ivfDishBarcodeForScan2Fixture,
  ivfDishBarcodeForScan3Fixture,
  ivfDishBarcodeScanDishUnmatchedPatientFixture,
  ivfDishBarcodePatientFixture,
  ivfDishBarcodeUsedFixture,
  ivfDishBarcodePartnerFixture,
  ivfDishBarcodeNotRequiredFixture,
  ivfDishBarcodeForScanDiscardedDishFixture,
} from '@libs/common/test/fixtures/ivf-dish-barcode.fixture'

export const patientPlanCohortIvfDishFixture: Partial<PatientPlanCohortIvfDish> = {
  id: 1,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca727',
  patientPlanCohortId: patientPlanCohortFixture.id,
  ivfDishId: ivfDishFixture.id,
}

export const patientPlanCohortIvfDishBarcodeAlreadyUsedFixture: Partial<PatientPlanCohortIvfDish> =
  {
    id: 12,
    uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca734',
    patientPlanCohortId: patientPlanCohortFixture.id,
    ivfDishId: ivfDishForPartnerFixture.id,
    ivfDishBarcodeId: ivfDishBarcodeUsedFixture.id,
  }

export const patientPlanCohortForScanBarcode1Fixture: Partial<PatientPlanCohortIvfDish> = {
  id: 10,
  uuid: 'cdd6d3b3-b040-4b02-a60b-9aec9397abbf',
  patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
  ivfDishId: ivfDishForScanBarcode1Fixture.id,
  ivfDishBarcodeId: ivfDishBarcodeForScan1Fixture.id,
}
export const patientPlanCohortForScanBarcode2Fixture: Partial<PatientPlanCohortIvfDish> = {
  id: 7,
  uuid: 'fb034e7a-b0c1-4f91-9f4e-208cb8cf2ebc',
  patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
  ivfDishId: ivfDishForScanBarcode2Fixture.id,
  ivfDishBarcodeId: ivfDishBarcodeForScan2Fixture.id,
}
export const patientPlanCohortForScanBarcode3Fixture: Partial<PatientPlanCohortIvfDish> = {
  id: 8,
  uuid: '131d2987-3f1a-4a28-9793-13a0d1dabc51',
  patientPlanCohortId: patientPlanCohortForScanBarcodeFixture.id,
  ivfDishId: ivfDishForScanBarcode3Fixture.id,
  ivfDishBarcodeId: ivfDishBarcodeForScan3Fixture.id,
}

export const patientPlanCohortIvfDishPartnerFixture: Partial<PatientPlanCohortIvfDish> = {
  id: 2,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca728',
  patientPlanCohortId: patientPlanCohortFixture.id,
  ivfDishId: ivfDishPatientPartnerFixture.id,
}

export const patientPlanCohortIvfDishScanDish1Fixture: Partial<PatientPlanCohortIvfDish> = {
  id: 3,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca729',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
  ivfDishId: ivfDishScanDishPrepDayFixture.id,
  ivfDishBarcodeId: ivfDishBarcodeScanDish1Fixture.id,
}

export const patientPlanCohortIvfDishScanDish2Fixture: Partial<PatientPlanCohortIvfDish> = {
  id: 4,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca730',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
  ivfDishId: ivfDishScanDishDay0Fixture.id,
  ivfDishBarcodeId: ivfDishBarcodeScanDish2Fixture.id,
}

export const patientPlanCohortIvfDishScanDish3Fixture: Partial<PatientPlanCohortIvfDish> = {
  id: 5,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca731',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
  ivfDishId: ivfDishScanDishDay1Fixture.id,
  ivfDishBarcodeId: ivfDishBarcodeScanDish3Fixture.id,
}

export const patientPlanCohortIvfDishScanDishGroupNotFoundFixture: Partial<PatientPlanCohortIvfDish> =
  {
    id: 6,
    uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca732',
    patientPlanCohortId: patientPlanCohortDishScanNoGroupFixture.id,
    ivfDishId: ivfDishScanDishDay1Fixture.id,
    ivfDishBarcodeId: ivfDishBarcodeScanDish4Fixture.id,
  }

export const patientPlanCohortIvfDishScanNotAssignedFixture: Partial<PatientPlanCohortIvfDish> = {
  id: 9,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca733',
  patientPlanCohortId: patientPlanCohortDishScanNotAssignedFixture.id,
  ivfDishId: ivfDishScanDishNotAssignedFixture.id,
  ivfDishBarcodeId: ivfDishBarcodeScanDishUnmatchedPatientFixture.id,
}

export const patientPlanCohortIvfDishPatientFixture: Partial<PatientPlanCohortIvfDish> = {
  id: 11,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca72a',
  patientPlanCohortId: patientPlanCohortFixture.id,
  ivfDishId: ivfDishPatientSubmitDishInventoryFixture.id,
  ivfDishBarcodeId: ivfDishBarcodePatientFixture.id,
}

export const patientPlanCohortIvfDishWitnessingChecklistFixture: Partial<PatientPlanCohortIvfDish> =
  {
    id: 13,
    uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca72b',
    patientPlanCohortId: patientPlanCohort2ForWitnessingChecklistFixture.id,
    ivfDishId: ivfDishWitnessingChecklistFixture.id,
  }

export const patientPlanCohortIvfDishForPartnerBarcodeFixture: Partial<PatientPlanCohortIvfDish> = {
  id: 14,
  uuid: '1ffd3f16-379a-4922-b27a-6a697b17b652',
  patientPlanCohortId: patientPlanCohortForPartnerBarcodeFixture.id,
  ivfDishId: ivfDishWitnessingForPartnerBarcodeFixture.id,
  ivfDishBarcodeId: ivfDishBarcodePartnerFixture.id,
}

export const patientPlanCohortIvfDishNotRequiredFixture: Partial<PatientPlanCohortIvfDish> = {
  id: 15,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca72c',
  patientPlanCohortId: patientPlanCohortDishScanFixture.id,
  ivfDishId: ivfDishPatientSubmitDishInventoryFixture.id,
  ivfDishBarcodeId: ivfDishBarcodeNotRequiredFixture.id,
}

export const patientPlanCohortIvfDishForDiscardFixture: Partial<PatientPlanCohortIvfDish> = {
  id: 16,
  uuid: '3666eaf8-6bca-4124-9b9f-1327b80d8fc8',
  patientPlanCohortId: patientPlanCohortForDiscardFixture.id,
  ivfDishId: ivfDishForDiscardFixture.id,
  ivfDishBarcodeId: ivfDishBarcodeForScanDiscardedDishFixture.id,
}
