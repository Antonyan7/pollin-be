import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {PatientEggFreezingReport} from '@libs/data-layer/apps/clinic-test/entities/typeorm/patient-egg-freezing-report.entity'
import {
  patientPlanForPatientEggFreezingDetailReportFixture,
  patientPlanForPatientEggFreezingReportFixture,
} from './patient-plan.fixture'
import {patientFemaleForFertilityIQReleasedFixture, patientReportFixture} from './patient.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const patientEggFreezingReportFixture: Partial<PatientEggFreezingReport> = {
  id: 1,
  uuid: 1 + 'a583143-94f1-4519-b93g-33c5137a9b83',

  patientId: patientFemaleForFertilityIQReleasedFixture.id,
  patientPlanId: patientPlanForPatientEggFreezingReportFixture.id,
  releasedOn: dateTimeUtil.now(),
  eggCollectionDate: dateTimeUtil.now(),
  eggsFrozenOnDay0: 11,
  eggsFrozenOnDay1: 22,
}

export const patientEggFreezingReportGetDetailFixture: Partial<PatientEggFreezingReport> = {
  id: 2,
  uuid: 2 + 'a583143-94f1-4519-b93g-33c5137a9b83',

  patientId: patientReportFixture.id,
  patientPlanId: patientPlanForPatientEggFreezingDetailReportFixture.id,
  releasedOn: dateTimeUtil.now(),
  eggCollectionDate: dateTimeUtil.now(),
  eggsFrozenOnDay0: 4,
  eggsFrozenOnDay1: 5,
  pdfStoragePath: 'somePdfPath',
}

export const patientEggFreezingReportUpdateResultsGetDetailFixture: Partial<PatientEggFreezingReport> =
  {
    id: 3,
    uuid: 3 + 'a583143-94f1-4519-b93g-33c5137a9b83',

    patientId: patientReportFixture.id,
    patientPlanId: patientPlanForPatientEggFreezingDetailReportFixture.id,
    releasedOn: dateTimeUtil.now(),
    eggCollectionDate: dateTimeUtil.now(),
    eggsFrozenOnDay0: 4,
    eggsFrozenOnDay1: 5,
    pdfStoragePath: 'somePdfPath',
  }
