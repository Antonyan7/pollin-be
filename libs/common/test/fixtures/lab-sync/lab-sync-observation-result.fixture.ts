import {LabSyncObservationResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  labSyncOBRB12LinkedForGetLabReportDetailsFixture,
  labSyncOBRDynacareGetTestResultDetailsFixture,
  labSyncOBRLifeLabsB12,
  labSyncOBRUnlinkedNewest,
} from './lab-sync-observation-request.fixture'
import {testTypeForDynacareFixture, testTypeLifeLabB12Fixture} from '../test-type.fixture'
import {testResultMeasurementForDynacareFixture} from '../test-result-measurement.fixture'

export const labSyncOBRUnlinkedNewestOBX: Partial<LabSyncObservationResult> = {
  id: 1,
  uuid: 'vbn44098-35d7-11ed-831f-0242ac110222',
  testName: 'AMH',
  labComment: 'Lab Comment',
  universalCode: 'UNI1',
  resultValue: '10',
  resultStatus: 'F',
  unit: ' x mg/L',
  refRange: '1 - 20',
  abnormalFlags: 'N',
  testResultMeasurementId: null,
  labSyncObservationRequestId: labSyncOBRUnlinkedNewest.id,
}

export const labSyncOBXLifeLabB12Unlinked: Partial<LabSyncObservationResult> = {
  id: 2,
  uuid: 'abn44098-35d7-11ed-831f-0242ac110333',
  testName: 'Vitamin B12',
  labComment: 'Measurement of B12',
  universalCode: testTypeLifeLabB12Fixture.lifeLabsCode,
  resultValue: '10',
  resultStatus: 'F',
  unit: ' x mg/L',
  refRange: '1 - 20',
  abnormalFlags: 'LL',
  testResultMeasurementId: null,
  labSyncObservationRequestId: labSyncOBRLifeLabsB12.id,
}

export const labSyncOBXB12LinkedForGetLabReportDetailsFixture: Partial<LabSyncObservationResult> = {
  id: 3,
  uuid: 'j1n44098-35d7-11ed-831f-0242ac110333',
  labSyncObservationRequestId: labSyncOBRB12LinkedForGetLabReportDetailsFixture.id,
  testName: 'Vitamin B12',
  labComment: 'Measurement of B12',
  universalCode: testTypeLifeLabB12Fixture.lifeLabsCode,
  resultValue: '10',
  resultStatus: 'F',
  unit: ' x mg/L',
  refRange: '1 - 20',
  abnormalFlags: 'N',
  testResultMeasurementId: null,
}

export const labSyncOBXDynacareGetTestResultDetailsFixture: Partial<LabSyncObservationResult> = {
  id: 4,
  uuid: 'k2n44098-35d7-11ed-831f-0242ac110111',
  labSyncObservationRequestId: labSyncOBRDynacareGetTestResultDetailsFixture.id,
  testResultMeasurementId: testResultMeasurementForDynacareFixture.id,
  testName: 'Dynacare test name',
  labComment: 'Measurement comment',
  universalCode: testTypeForDynacareFixture.dynacareCode,
  resultValue: '10',
  resultStatus: 'F',
  unit: ' x mg/L',
  refRange: '1 - 20',
  abnormalFlags: 'N',
}
