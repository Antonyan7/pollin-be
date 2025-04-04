import {PatientDetailMale} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientDetailMaleFixtureId,
  patientGenitourinaryHistoryDetailMaleFixtureId,
  patientMaleIcFormDetailMaleFixtureId,
} from './patient-to-patient-male-detail-variables.fixture'

export const patientDetailMaleFixture: Partial<PatientDetailMale> = {
  id: patientDetailMaleFixtureId,
  previousConception: false,
  haveBiologicalChildren: true,
  haveBiologicalChildrenWithCurrentPartner: false,
  hadSemenAnalysis: false,
  semenAnalysisIsNormal: false,
  vasectomy: false,
  vasectomyReversal: false,
  erectionDifficulties: false,
  undescendedTesticles: false,
  testicularIssues: true,
  toxins: false,
  infections: false,
  diagnosedConditions: `["diagnosedConditions"]`,
  genitalSurgery: false,
}

export const patientGenitourinaryHistoryFixture: Partial<PatientDetailMale> = {
  id: patientGenitourinaryHistoryDetailMaleFixtureId,
  previousConception: true,
  haveBiologicalChildren: true,
  haveBiologicalChildrenWithCurrentPartner: true,
  hadSemenAnalysis: true,
  semenAnalysisIsNormal: true,
  vasectomy: true,
  vasectomyReversal: true,
  erectionDifficulties: true,
  testicularIssues: true,
  infections: true,
  diagnosedConditions: `["diagnosedConditions, diagnosedConditions2"]`,
  genitalSurgery: true,
}

export const patientMaleIcFormDetailMaleFixture: Partial<PatientDetailMale> = {
  id: patientMaleIcFormDetailMaleFixtureId,
  previousConception: true,
  haveBiologicalChildren: true,
  haveBiologicalChildrenWithCurrentPartner: true,
  hadSemenAnalysis: true,
  semenAnalysisIsNormal: true,
  vasectomy: true,
  vasectomyReversal: true,
  erectionDifficulties: true,
  undescendedTesticles: true,
  testicularIssues: true,
  toxins: true,
  infections: true,
  diagnosedConditions: `["diagnosedConditions, diagnosedConditions2"]`,
  genitalSurgery: true,
}
