import {patientEmailVerifiedFixture, patientWithoutGenitourinaryId} from './patient.fixture'
import {PatientCustomAlert} from '@libs/data-layer/apps/users/entities/typeorm/patient-custom-alert.entity'
import {
  staffUserFixture,
  staffWithMockedAssignorIdFixture,
} from '@libs/common/test/fixtures/staff.fixture'

export const patientGenitourinaryHistoryAlertCustomFixture: Partial<PatientCustomAlert> = {
  id: 1,
  patientId: patientWithoutGenitourinaryId,
  staffId: staffUserFixture.id,
}

export const patientCustomAlertsFixture: Partial<PatientCustomAlert> = {
  id: 2,
  patientId: patientEmailVerifiedFixture.id,
  staffId: staffWithMockedAssignorIdFixture.id,
  title: 'patientCustomAlertsTitle',
  uuid: 'cb8a8b7e-5248-4cad-be84-179dea1485fd',
  description: 'patientCustomAlertsDescription',
}
export const patientCustom10AlertsFixture: Partial<PatientCustomAlert>[] = [
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
  {
    patientId: patientEmailVerifiedFixture.id,
    staffId: staffUserFixture.id,
  },
]
