import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {PatientFertilityIQ} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  femalePatientReportsFixture,
  patientReportForFertilityIQFemaleReleasedFixture,
  patientReportForFertilityIQMaleReleasedFixture,
  patientReportsFixture,
} from './patient-report.fixture'
import {
  patientFemaleForFertilityIQReleasedFixture,
  patientMaleForFertilityIQReleasedFixture,
  patientReportFemaleUserFixture,
  patientReportFixture,
} from './patient.fixture'
import {staffWithMockedAssignorIdFixture} from './staff.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const patientFertilityIQForMaleReleasedFixture: Partial<PatientFertilityIQ> = {
  id: 1,
  uuid: 'aa583143-94f1-4519-b930-33c5137a9b83',
  patientId: patientMaleForFertilityIQReleasedFixture.id,
  patientReportId: patientReportForFertilityIQMaleReleasedFixture.id,
  releasedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  releaseNote: 'Note for released male Fertility IQ',
  releasedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientFertilityIQForFemaleReleasedFixture: Partial<PatientFertilityIQ> = {
  id: 2,
  uuid: '5eff0ef1-6830-4c88-a138-b1490a73962f',
  patientId: patientFemaleForFertilityIQReleasedFixture.id,
  patientReportId: patientReportForFertilityIQFemaleReleasedFixture.id,
  releasedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  releaseNote: 'Note for released female Fertility IQ',
  releasedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientFertilityIQForDetailsFixture: Partial<PatientFertilityIQ> = {
  id: 3,
  uuid: 'a2e35bfb-1ecb-49eb-a3bc-6b323fc53b6c',
  patientId: patientReportFixture.id,
  patientReportId: patientReportsFixture.id,
  releasedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  releaseNote: 'Note for released female Fertility IQ',
  releasedByStaffId: staffWithMockedAssignorIdFixture.id,
  pdfStoragePath: 'fertility_iq_report_url',
}

export const femalePatientFertilityIQForDetailsFixture: Partial<PatientFertilityIQ> = {
  id: 4,
  uuid: 'e273f92f-3a34-4bcc-bc21-bd244a61ee08',
  patientId: patientReportFemaleUserFixture.id,
  patientReportId: femalePatientReportsFixture.id,
  releasedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  releaseNote: 'Note for released female Fertility IQ',
  releasedByStaffId: staffWithMockedAssignorIdFixture.id,
}
