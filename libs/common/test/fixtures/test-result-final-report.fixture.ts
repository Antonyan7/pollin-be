import {TestResultUltrasoundFinalReport} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {FinalReportStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {patientEmailVerifiedFixture, patientForUltrasoundFixture} from './patient.fixture'
import {
  mockedUltrasoundReportFile,
  mockedUltrasoundReportFileCorrupted,
} from '@libs/common/adapters/firebase/__mocks__/firebase-storage-adapter'
import {testResultFixture, testResultPanelFixture} from './test-result.fixture'

const uuidSuffix: string = '-test-result-final-uuid'

//to test filtering
export const finalReportCommonFirstName: string = 'CommonFinalReportFirstName'
export const finalReportCommonLastName: string = 'CommonFinalReportLastName'

export const finalReportFixture: Partial<TestResultUltrasoundFinalReport> = {
  id: 1,
  uuid: '62db4178-9f20-43a1-9e21-a39ee1e9a24c',
  patientFirstName: patientForUltrasoundFixture.firstName.toUpperCase(),
  patientLastName: patientForUltrasoundFixture.lastName,
  patientDateOfBirth: '1994-01-01',
  appointmentDate: '2023-01-02',
  patientAddress: 'FinalReportFinalAddress',
  patientPhone: null,
  name: 'FinalReport testName',
  ohip: null,
  testResultId: testResultFixture.id,
  hl7FileName: mockedUltrasoundReportFileCorrupted,
}

export const finalReportCompletedFixture: Partial<TestResultUltrasoundFinalReport> = {
  id: 2,
  uuid: '62db4178-9f20-43a1-9e21-a39ee1e9a24b',
  appointmentDate: '2024-12-12',
  patientFirstName: finalReportCommonFirstName,
  patientLastName: finalReportCommonLastName,
  ohip: 'OHIP',
  status: FinalReportStatus.Completed,
  hl7FileName: mockedUltrasoundReportFile,
  testResultId: testResultPanelFixture.id,
  name: 'finalReportCompleted',
}

export const finalReportCompletedLatestFixture: Partial<TestResultUltrasoundFinalReport> = {
  id: 3,
  uuid: '63dc4178-9f20-43a1-9e21-a39ee1e9a24b',
  appointmentDate: '2030-12-12',
  patientFirstName: finalReportCommonFirstName,
  patientLastName: finalReportCommonLastName,
  status: FinalReportStatus.Completed,
  hl7FileName: 'wrongFileName',
}

export const finalReportCompletedWithDiffNameFixture: Partial<TestResultUltrasoundFinalReport> = {
  id: 4,
  uuid: 4 + uuidSuffix,
  appointmentDate: '2023-01-01',
  status: FinalReportStatus.Completed,
}

export const finalReportPendingWithOHIPFixture: Partial<TestResultUltrasoundFinalReport> = {
  id: 5,
  uuid: '62db4178-1f20-43a1-9e21-a39ee1e9a24c',
  patientFirstName: patientEmailVerifiedFixture.firstName,
  patientLastName: patientEmailVerifiedFixture.lastName,
  patientDateOfBirth: '2000-01-01',
  appointmentDate: '2023-01-02',
  patientAddress: 'FinalReportFinalAddress',
  patientPhone: '(444) 444-3333',
  name: 'FinalReport testName',
  ohip: '0000-111-222 GM',
  hl7FileName: mockedUltrasoundReportFileCorrupted,
}

export const finalReportWithTaskFixture: Partial<TestResultUltrasoundFinalReport> = {
  id: 6,
  uuid: 'd3053ef7-fc2c-4547-8d3e-23fd519d124a',
  patientFirstName: patientForUltrasoundFixture.firstName.toUpperCase(),
  patientLastName: patientForUltrasoundFixture.lastName,
  patientDateOfBirth: '2002-02-02',
  appointmentDate: '2024-11-02',
  patientAddress: 'FinalReportWithTaskAddress',
  patientPhone: null,
  name: 'finalReportWithTask testName',
  ohip: null,
  hl7FileName: mockedUltrasoundReportFileCorrupted,
}
