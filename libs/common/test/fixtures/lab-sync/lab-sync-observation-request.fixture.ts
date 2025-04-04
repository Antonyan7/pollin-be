import {LabSyncObservationRequest} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {LabSyncRawDataSuccessFixture} from './lab-sync-raw-data.fixture'
import {
  labSyncOBRLifeLabB12Match,
  labSyncOBRUnlinkedNewestMatch,
  labSyncOBRUnlinkedOldestMatch,
} from './lab-sync-test-result-field-match.fixture'
import {testTypeLifeLabB12Fixture} from '../test-type.fixture'
import {
  testResultFromDynacareFixture,
  testResultPendingLifeLabB12Fixture,
} from '../test-result.fixture'

const dateUtil = new DateTimeUtil()

export const labSyncOBRUnlinkedNewest: Partial<LabSyncObservationRequest> = {
  id: 1,
  uuid: 'aas44098-35d7-11ed-831f-0242ac110002',
  testName: 'AMH',
  universalCode: 'ABC123',
  patientFirstName: 'FirstName',
  patientLastName: 'LastName',
  patientDOB: dateUtil.now(),
  patientOHIPNumber: '1111222333',
  patientOHIPVersion: 'XX',
  patientAddress: 'Toronto Street 1',
  patientPostalCode: null,
  systemReceivedOn: dateUtil.now(),
  specimenReceivedOn: dateUtil.now(),
  status: LabSyncTestResultStatus.Unlinked,
  revisionId: 'revisionId-1',
  voidReason: null,
  labSyncTestResultFieldMatchId: labSyncOBRUnlinkedNewestMatch.id,
  labSyncRawDataId: LabSyncRawDataSuccessFixture.id,
}

export const labSyncOBRUnlinkedOldest: Partial<LabSyncObservationRequest> = {
  id: 2,
  uuid: 'bdf44098-35d7-11ed-831f-0242ac110222',
  revisionId: 'revisionId-2',
  testName: 'TSH',
  universalCode: 'FG24',
  patientFirstName: 'OldFirstname',
  patientLastName: 'Unique',
  patientDOB: dateUtil.now(),
  patientOHIPNumber: '1111222333',
  patientOHIPVersion: 'XX',
  patientAddress: 'Toronto Street 1',
  patientPostalCode: null,
  systemReceivedOn: dateUtil.subDays(dateUtil.now(), 100),
  specimenReceivedOn: dateUtil.subDays(dateUtil.now(), 100),
  status: LabSyncTestResultStatus.Void,
  voidReason: null,
  labSyncTestResultFieldMatchId: labSyncOBRUnlinkedOldestMatch.id,
  labSyncRawDataId: LabSyncRawDataSuccessFixture.id,
}

export const labSyncOBRLifeLabsB12: Partial<LabSyncObservationRequest> = {
  id: 3,
  uuid: 'cdf44098-35d7-11ed-831f-0242ac110333',
  revisionId: 'revisionId-3',
  testName: 'Vitamin B12',
  universalCode: testTypeLifeLabB12Fixture.lifeLabsCode,
  patientFirstName: 'LifeLabs B12 Link',
  patientLastName: 'LifeLabs B12 Link',
  patientDOB: dateUtil.now(),
  patientOHIPNumber: '1111222333',
  patientOHIPVersion: 'XX',
  patientAddress: 'Toronto Street 1',
  patientPostalCode: null,
  systemReceivedOn: dateUtil.subDays(dateUtil.now(), 5),
  specimenReceivedOn: dateUtil.subDays(dateUtil.now(), 5),
  status: LabSyncTestResultStatus.Unlinked,
  voidReason: null,
  labSyncTestResultFieldMatchId: labSyncOBRLifeLabB12Match.id,
  labSyncRawDataId: LabSyncRawDataSuccessFixture.id,
  pdfReportPath: 'attachment file path',
  pdfReportComment: null,
}

export const labSyncOBRUnlinkedToBeVoidFixture: Partial<LabSyncObservationRequest> = {
  id: 4,
  uuid: 'f1a4de82-ae95-475e-9e78-793b1c8e3467',
  revisionId: 'revisionId-4',
  testName: 'TSH',
  universalCode: 'FG24',
  patientFirstName: 'patientFirstname',
  patientLastName: 'patientLastname',
  patientDOB: dateUtil.now(),
  patientOHIPNumber: '1111222444',
  patientOHIPVersion: 'XX',
  patientAddress: 'Toronto Street 1',
  patientPostalCode: null,
  systemReceivedOn: dateUtil.subDays(dateUtil.now(), 3),
  specimenReceivedOn: dateUtil.subDays(dateUtil.now(), 5),
  status: LabSyncTestResultStatus.Unlinked,
  voidReason: null,
  labSyncTestResultFieldMatchId: labSyncOBRUnlinkedOldestMatch.id,
  labSyncRawDataId: LabSyncRawDataSuccessFixture.id,
}

export const labSyncOBRB12LinkedForGetLabReportDetailsFixture: Partial<LabSyncObservationRequest> =
  {
    id: 5,
    uuid: '8884de82-ae95-475e-9e78-793b1c8e3467',
    testResultId: testResultPendingLifeLabB12Fixture.id,
    revisionId: 'revisionId-5',
    testName: 'B12',
    universalCode: 'FG24',
    patientFirstName: 'patientFirstname',
    patientLastName: 'patientLastname',
    patientDOB: dateUtil.now(),
    patientOHIPNumber: '1111222444',
    patientOHIPVersion: 'XX',
    patientAddress: 'Toronto Street 1',
    patientPostalCode: null,
    systemReceivedOn: dateUtil.subDays(dateUtil.now(), 3),
    specimenReceivedOn: dateUtil.subDays(dateUtil.now(), 5),
    status: LabSyncTestResultStatus.Linked,
    labSyncTestResultFieldMatchId: labSyncOBRUnlinkedOldestMatch.id,
    labSyncRawDataId: LabSyncRawDataSuccessFixture.id,
    department: 'CHEM',
  }

export const labSyncOBRDynacareGetTestResultDetailsFixture: Partial<LabSyncObservationRequest> = {
  id: 6,
  uuid: '4884de82-ae95-475e-9e78-793b1c8e3463',
  testResultId: testResultFromDynacareFixture.id,
  revisionId: 'revisionId-5',
  testName: 'B12',
  universalCode: 'FG24',
  patientFirstName: 'patientFirstname',
  patientLastName: 'patientLastname',
  patientDOB: dateUtil.now(),
  patientOHIPNumber: '1111222444',
  patientOHIPVersion: 'XX',
  patientAddress: 'Toronto Street 1',
  patientPostalCode: null,
  systemReceivedOn: dateUtil.subDays(dateUtil.now(), 3),
  specimenReceivedOn: dateUtil.subDays(dateUtil.now(), 5),
  status: LabSyncTestResultStatus.Linked,
  labSyncTestResultFieldMatchId: labSyncOBRUnlinkedOldestMatch.id,
  labSyncRawDataId: LabSyncRawDataSuccessFixture.id,
  orderingProvider: 'Ordering Provider from Dynacare',
  department: 'CHEM',
}
