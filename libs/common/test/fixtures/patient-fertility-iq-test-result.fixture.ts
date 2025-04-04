import {PatientFertilityIQTestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  femalePatientFertilityIQForDetailsFixture,
  patientFertilityIQForDetailsFixture,
  patientFertilityIQForFemaleReleasedFixture,
  patientFertilityIQForMaleReleasedFixture,
} from './patient-fertility-iq.fixture'
import {
  testResultAFCForFertilityIQFemaleFixture,
  testResultAFCTypeForFertilityIQFemaleReleasedFixture,
  testResultAMFForFertilityIQMaleFixture,
  testResultAMHForFertilityIQFemaleFixture,
  testResultAMHTypeForFertilityIQFemaleReleasedFixture,
  testResultDNAFragmentationIndexTypeForFertilityIQRelesedFixture,
  testResultSemenAnalysisForFertilityIQMaleFixture,
  testResultSemenAnalysisPanelForFertilityIQReleasedFixture,
  testResultSonoTypeForFertilityIQFemaleReleasedFixture,
} from './test-result.fixture'

export const patientFertilityIQReleasedTestResultSemenAnalysisFixture: Partial<PatientFertilityIQTestResult> =
  {
    id: 1,
    patientFertilityIqId: patientFertilityIQForMaleReleasedFixture.id,
    testResultId: testResultSemenAnalysisPanelForFertilityIQReleasedFixture.id,
  }

export const patientFertilityIQReleasedTestResultDNAFixture: Partial<PatientFertilityIQTestResult> =
  {
    id: 2,
    patientFertilityIqId: patientFertilityIQForMaleReleasedFixture.id,
    testResultId: testResultDNAFragmentationIndexTypeForFertilityIQRelesedFixture.id,
  }

export const patientFertilityIQReleasedTestResultAMHFixture: Partial<PatientFertilityIQTestResult> =
  {
    id: 3,
    patientFertilityIqId: patientFertilityIQForFemaleReleasedFixture.id,
    testResultId: testResultAMHTypeForFertilityIQFemaleReleasedFixture.id,
  }

export const patientFertilityIQReleasedTestResultAFCFixture: Partial<PatientFertilityIQTestResult> =
  {
    id: 4,
    patientFertilityIqId: patientFertilityIQForFemaleReleasedFixture.id,
    testResultId: testResultAFCTypeForFertilityIQFemaleReleasedFixture.id,
  }

export const patientFertilityIQSemenAnalysisFixture: Partial<PatientFertilityIQTestResult> = {
  id: 5,
  patientFertilityIqId: patientFertilityIQForDetailsFixture.id,
  testResultId: testResultSemenAnalysisForFertilityIQMaleFixture.id,
}

export const patientFertilityIQAFHFixture: Partial<PatientFertilityIQTestResult> = {
  id: 6,
  patientFertilityIqId: patientFertilityIQForDetailsFixture.id,
  testResultId: testResultAMFForFertilityIQMaleFixture.id,
}

export const femalePatientFertilityIQAMHFixture: Partial<PatientFertilityIQTestResult> = {
  id: 7,
  patientFertilityIqId: femalePatientFertilityIQForDetailsFixture.id,
  testResultId: testResultAMHForFertilityIQFemaleFixture.id,
}

export const femalePatientFertilityIQAFCFixture: Partial<PatientFertilityIQTestResult> = {
  id: 8,
  patientFertilityIqId: femalePatientFertilityIQForDetailsFixture.id,
  testResultId: testResultAFCForFertilityIQFemaleFixture.id,
}

export const patientFertilityIQReleasedTestResultSonoFixture: Partial<PatientFertilityIQTestResult> =
  {
    id: 9,
    patientFertilityIqId: patientFertilityIQForFemaleReleasedFixture.id,
    testResultId: testResultSonoTypeForFertilityIQFemaleReleasedFixture.id,
  }
