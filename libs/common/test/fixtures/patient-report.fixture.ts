import {PatientReport} from '@libs/data-layer/apps/clinic-test/entities/typeorm/patient-report.entity'
import {
  patientEggFreezingReportGetDetailFixture,
  patientEggFreezingReportUpdateResultsGetDetailFixture,
} from './patient-egg-freezing-report.fixture'
import {
  milestoneDetailsPatientFixture,
  patientFemaleForFertilityIQReleasedFixture,
  patientMaleForFertilityIQReleasedFixture,
  patientReportFemaleUserFixture,
  patientReportFixture,
} from './patient.fixture'
import {reportTypeFixture, reportTypeForEqqFreezingFixture} from './report-type.fixture'

export const patientReportForFertilityIQMaleReleasedFixture: Partial<PatientReport> = {
  id: 1,
  uuid: '5275b5e2-d2e8-46be-a3a0-776705abef64',
  patientId: patientMaleForFertilityIQReleasedFixture.id,
  reportTypeId: reportTypeFixture.id,
  isViewed: false,
}

export const patientReportForFertilityIQFemaleReleasedFixture: Partial<PatientReport> = {
  id: 2,
  uuid: 'c7a90b16-64be-4510-bfb9-ce3d33ed0fd1',
  patientId: patientFemaleForFertilityIQReleasedFixture.id,
  reportTypeId: reportTypeFixture.id,
  isViewed: false,
}

export const patientReportsFixture: Partial<PatientReport> = {
  id: 3,
  uuid: '1464b2e1-4512-471e-b5e6-7697289e22b1',
  patientId: patientReportFixture.id,
  reportTypeId: reportTypeFixture.id,
  isViewed: false,
}

export const femalePatientReportsFixture: Partial<PatientReport> = {
  id: 4,
  uuid: 'f7d8aac9-0e53-42b2-bca1-909b3eb297aa',
  patientId: patientReportFemaleUserFixture.id,
  reportTypeId: reportTypeFixture.id,
  isViewed: false,
}

export const milestonePatientReportsFixture: Partial<PatientReport> = {
  id: 5,
  uuid: 'cc73be0a-1b89-44c2-aded-b08c982c2e59',
  patientId: milestoneDetailsPatientFixture.id,
  reportTypeId: reportTypeFixture.id,
  isViewed: false,
}

export const patientReportForEggFreezingFixture: Partial<PatientReport> = {
  id: 7,
  uuid: 7 + 'c73be0a-1b89-44c2-aded-b08c982c2e59',
  patientId: patientReportFixture.id,
  reportTypeId: reportTypeForEqqFreezingFixture.id,
  isViewed: false,
  patientEggFreezingReportId: patientEggFreezingReportGetDetailFixture.id,
}

//if delete above patientReportForEggFreezingFixture, should return this new update based on planReference
export const patientReportForEggFreezingUpdatedResultsFixture: Partial<PatientReport> = {
  id: 8,
  uuid: 8 + 'c73be0a-1b89-44c2-aded-b08c982c2e59',
  patientId: patientReportFixture.id,
  reportTypeId: reportTypeForEqqFreezingFixture.id,
  isViewed: false,
  patientEggFreezingReportId: patientEggFreezingReportUpdateResultsGetDetailFixture.id,
}
