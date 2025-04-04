import {DateTimeUtil} from '@libs/common'
import {PatientMedicationHistory} from '@libs/data-layer/apps/medication/entities/fireorm/patient-medication-history.entity'
import {medicationFixture} from './medication.fixture'
import {patientMedicationFixture} from './patient-medication.fixture'
import {patientPrescriptionFixture} from './patient-prescription.fixture'
import {patientEmailVerifiedFixture} from './patient.fixture'
import {staffWithMockedAssignorIdFixture} from './staff.fixture'
import {PatientMedicationRouteEnum} from '@libs/services-common/enums/medication.enum'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientMedicationHistoryFixture: Partial<PatientMedicationHistory> = {
  id: '1-patient-medication-history',
  patientMedicationId: patientMedicationFixture.id,
  medicationId: medicationFixture.id,
  drugBankId: null,
  patientId: patientEmailVerifiedFixture.id,
  prescriptionId: patientPrescriptionFixture.id,
  name: 'medication history',
  dosage: '2 mg',
  frequency: '2 times',
  quantity: '3',
  startDate: dateTimeUtil.formatIsoDate(dateTimeUtil.subDays(dateTimeUtil.now(), 3)),
  endDate: dateTimeUtil.formatIsoDate(dateTimeUtil.addDays(dateTimeUtil.now(), 3)),
  medicationTime: '06:00PM',
  route: PatientMedicationRouteEnum.Intramuscular.toString(),
  form: 'Tablet',
  updatedBy: staffWithMockedAssignorIdFixture.uuid,
  version: 1,
  acknowledgedOn: null,
  isAcknowledged: false,
}

export const patientMedicationSecondHistoryFixture: Partial<PatientMedicationHistory> = {
  id: '2-patient-medication-history',
  patientMedicationId: patientMedicationFixture.id,
  medicationId: medicationFixture.id,
  drugBankId: null,
  patientId: patientEmailVerifiedFixture.id,
  prescriptionId: patientPrescriptionFixture.id,
  name: 'medication history',
  dosage: '3 mg',
  frequency: '3 times',
  quantity: '3',
  startDate: dateTimeUtil.formatIsoDate(dateTimeUtil.subDays(dateTimeUtil.now(), 6)),
  endDate: dateTimeUtil.formatIsoDate(dateTimeUtil.addDays(dateTimeUtil.now(), 10)),
  medicationTime: '06:30PM',
  route: PatientMedicationRouteEnum.Intramuscular.toString(),
  form: 'Tablet',
  updatedBy: staffWithMockedAssignorIdFixture.uuid,
  version: 1,
  acknowledgedOn: null,
  isAcknowledged: false,
}
