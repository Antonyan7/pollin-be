import {IvfDishToIvfTaskGroup} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DateTimeUtil} from '@libs/common'

import {
  ivfDishFixture,
  ivfDishForScanBarcode3Fixture,
  ivfDishPatientPartnerFixture,
  ivfDishPatientSubmitDishInventoryFixture,
  ivfDishScanDishDay0Fixture,
  ivfDishScanDishDay1Fixture,
  ivfDishScanDishPrepDayFixture,
  ivfDishScanDishNotAssignedFixture,
  ivfDishWitnessingChecklistFixture,
  ivfDishWitnessingForPartnerBarcodeFixture,
  ivfDishForDiscardFixture,
} from '@libs/common/test/fixtures/ivf-dish.fixture'
import {
  ivfTaskGroupForGetPatientPartnersDay2Fixture,
  patientPlanCohortGroupForScanBarcode2Fixture,
  ivfTaskGroupForGetPatientPartnersFixture,
  patientPlanCohortDishScanGroupDay0Fixture,
  patientPlanCohortDishScanGroupDay1Fixture,
  patientPlanCohortDishScanGroupPrepDayFixture,
  patientPlanCohortDishScanGroupNotAssignedFixture,
  patientPlanCohort2GroupForWitnessingChecklistFixture,
  patientPlanCohortGroupForPartnerBarcodeFixture,
  patientPlanCohortGroupForDiscardScanBarcodeFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort-ivf-task-group.fixture'
import {Config} from '@config/config.util'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const ivfDishToIvfTaskGroupFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 1,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca727',
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersDay2Fixture.id,
  ivfDishId: ivfDishFixture.id,
}

export const ivfDishToIvfTaskGroupPartnerDishInventoryFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 2,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca728',
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  ivfDishId: ivfDishPatientPartnerFixture.id,
}

export const ivfDishToIvfTaskGroupScanDishPrepDayFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 3,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca729',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortDishScanGroupPrepDayFixture.id,
  ivfDishId: ivfDishPatientPartnerFixture.id,
}

export const ivfDishToIvfTaskGroupScanDishDay0Fixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 4,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca730',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortDishScanGroupDay0Fixture.id,
  ivfDishId: ivfDishScanDishPrepDayFixture.id,
  required: true,
}

export const ivfDishToIvfTaskGroupScanDishDay0_1Fixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 5,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca731',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortDishScanGroupDay0Fixture.id,
  ivfDishId: ivfDishScanDishDay0Fixture.id,
  required: true,
}

export const ivfDishToIvfTaskGroupScanDishDay1Fixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 6,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca732',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortDishScanGroupDay1Fixture.id,
  ivfDishId: ivfDishScanDishPrepDayFixture.id,
}

export const ivfDishToIvfTaskGroupScanDishDay1_1Fixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 7,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca733',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortDishScanGroupDay1Fixture.id,
  ivfDishId: ivfDishScanDishDay0Fixture.id,
  required: false,
}

export const ivfDishToIvfTaskGroupScanDishDay1_2Fixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 8,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca734',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortDishScanGroupDay1Fixture.id,
  ivfDishId: ivfDishScanDishDay1Fixture.id,
}

export const ivfDishToIvfTaskGroupScanDishPatientFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 9,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca72a',
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupForGetPatientPartnersFixture.id,
  ivfDishId: ivfDishPatientSubmitDishInventoryFixture.id,
}

export const ivfDishToIvfTaskGroupScanDishNotAssignedFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 10,
  uuid: 'c09b83a3-72e9-4c41-bdc8-46e399fca735',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortDishScanGroupNotAssignedFixture.id,
  ivfDishId: ivfDishScanDishNotAssignedFixture.id,
}

export const ivfDishToIvfTaskGroupScanBarcodeFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 11,
  uuid: '9b9d8eed-6e5f-40ef-8d96-0083a0be2df4',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortGroupForScanBarcode2Fixture.id,
  ivfDishId: ivfDishForScanBarcode3Fixture.id,
  scannedDate: dateTimeUtil.toDate(dateTimeUtil.addDays(dateTimeUtil.now(), -2)),
}

export const ivfDishToIvfTaskGroupWitnessingChecklistFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 12,
  uuid: '9b9d8eed-6e5f-40ef-8d96-0083a0be2df5',
  patientPlanCohortIvfTaskGroupId: patientPlanCohort2GroupForWitnessingChecklistFixture.id,
  ivfDishId: ivfDishWitnessingChecklistFixture.id,
  scannedDate: dateTimeUtil.toDate(dateTimeUtil.addDays(dateTimeUtil.now(), -2)),
}

export const ivfDishToIvfTaskGroupForPartnerBarcodeFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 14,
  uuid: '2c8b8c22-446d-41a1-a05c-27ec194cfa7d',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortGroupForPartnerBarcodeFixture.id,
  ivfDishId: ivfDishWitnessingForPartnerBarcodeFixture.id,
}

export const ivfDishToIvfTaskGroupForDiscardBarcodeFixture: Partial<IvfDishToIvfTaskGroup> = {
  id: 15,
  uuid: '8ad2334c-1f2e-484a-9011-638631805444',
  patientPlanCohortIvfTaskGroupId: patientPlanCohortGroupForDiscardScanBarcodeFixture.id,
  ivfDishId: ivfDishForDiscardFixture.id,
}
