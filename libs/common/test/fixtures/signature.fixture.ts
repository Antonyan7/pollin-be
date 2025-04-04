import {Signature} from '@libs/data-layer/apps/plan/entities/typeorm'
import {staffClinicManagerFixture, staffManagerRoleFixture} from './staff.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  patientPlanSheetForAppointmentByDateStimulationFixture,
  patientPlanSheetForCycleDetailsFixture,
  patientPlanSheetForReadyToOrderFixture,
  patientPlanSheetForStimSheetActionsFixture,
  patientPlanSheetForStimSheetFixture,
  patientPlanSheetWithSelectedDateFixture,
} from './patient-plan-sheet.fixture'
import {
  SignatureNotifyingMethod,
  SignatureSource,
  SignatureType,
} from '@libs/data-layer/apps/plan/enums/signature.enum'
import {patientPlanPrimingWorksheetFixture} from './patient-plan-sheet.fixture'
import {nextYear} from './appointment.fixture'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const signatureDoctorFixture: Partial<Signature> = {
  id: 1,
  date: '2020-02-05',
  uuid: '2f92f1fe-3149-4fe5-a289-b84aaefa45d7',
  type: SignatureType.Doctor,
  patientPlanSheetId: patientPlanSheetForStimSheetFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureForCatheterNurseFixture: Partial<Signature> = {
  id: 2,
  date: '2018-02-04',
  uuid: '2f92f1fe-3149-4fe5-a289-b84aaefa45d1',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanSheetWithSelectedDateFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  source: SignatureSource.PatientPlanSheet,
}

export const signatureForCatheterDoctorFixture: Partial<Signature> = {
  id: 3,
  date: '2018-02-04',
  uuid: '2f92f1fe-3149-4fe5-a289-b84aaefa45d2',
  type: SignatureType.Doctor,
  patientPlanSheetId: patientPlanSheetWithSelectedDateFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  source: SignatureSource.PatientPlanSheet,
}

export const signatureNurseFixture: Partial<Signature> = {
  id: 4,
  date: '2020-02-05',
  uuid: '2f92f1fe-3149-4fe5-a289-b84aaafa45d7',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanSheetForStimSheetFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
  notifyingMethod: SignatureNotifyingMethod.PatientAware,
}

export const signatureForActionsDoctorFixture: Partial<Signature> = {
  id: 5,
  date: '2020-02-05',
  uuid: '2f92f1fe-3159-4fe5-a289-b84aaefa45d7',
  type: SignatureType.Doctor,
  patientPlanSheetId: patientPlanSheetForStimSheetActionsFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureForActionsNurseFixture: Partial<Signature> = {
  id: 6,
  date: '2020-02-05',
  uuid: '2f92f1fe-3259-4fe5-a289-b84aaafa45d7',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanSheetForStimSheetActionsFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureNurseWithoutDateFixture: Partial<Signature> = {
  id: 7,
  uuid: '2f92f1fe-3249-4fe5-a289-c84aaafa45d7',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanSheetForStimSheetFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureNurseWithoutDateReadyToOrderFixture: Partial<Signature> = {
  id: 8,
  uuid: '2f92f1fe-3249-4fe6-a289-c84aaafa45d7',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanSheetForReadyToOrderFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureNurseForV2CycleDetailFixture: Partial<Signature> = {
  id: 9,
  uuid: '2f93f1fe-3249-4fe6-a289-c84aaafa45d7',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanSheetForCycleDetailsFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureAdminForGlobalSignOffFixture: Partial<Signature> = {
  id: 10,
  uuid: '2f93f1fe-3229-4fe6-a289-a24aaafa45d7',
  type: SignatureType.Admin,
  patientPlanSheetId: patientPlanSheetForStimSheetFixture.id,
  principalId: staffManagerRoleFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-02-02'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureForStimSheetAddedDayFixture: Partial<Signature> = {
  id: 11,
  uuid: '2f93a1ae-3229-4fe6-a289-a24aaafa45d7',
  type: SignatureType.Doctor,
  patientPlanSheetId: patientPlanSheetForStimSheetFixture.id,
  principalId: staffManagerRoleFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  source: SignatureSource.PatientPlanSheet,
  date: '2020-02-01',
}

export const signatureNurseForPrimingWorksheetFixture: Partial<Signature> = {
  id: 12,
  uuid: 'c9e23f20-f8b4-4fb8-bc9a-884b5e2d7f46',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanPrimingWorksheetFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureAdminWithoutDateReadyToOrderFixture: Partial<Signature> = {
  id: 13,
  uuid: 'a26b933d-9e28-4410-bf10-a2327ab29b25',
  type: SignatureType.Admin,
  patientPlanSheetId: patientPlanSheetWithSelectedDateFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  createdAt: dateTimeUtil.toDate('2023-05-05'),
  source: SignatureSource.PatientPlanSheet,
}

export const signatureForPatientsByAppDateNurseFixture: Partial<Signature> = {
  id: 14,
  uuid: 'b26b933d-9e28-4410-bf10-b2332ab29b25',
  type: SignatureType.Nurse,
  patientPlanSheetId: patientPlanSheetForAppointmentByDateStimulationFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  source: SignatureSource.PatientPlanSheet,
  date: `${nextYear}-06-17`,
}

export const signatureForPatientsByAppDateDoctorFixture: Partial<Signature> = {
  id: 15,
  uuid: 'b26b933d-2e27-4412-bf10-b2332ab29b25',
  type: SignatureType.Doctor,
  patientPlanSheetId: patientPlanSheetForAppointmentByDateStimulationFixture.id,
  principalId: staffClinicManagerFixture.id,
  signatoryId: staffManagerRoleFixture.id,
  source: SignatureSource.PatientPlanSheet,
  date: `${nextYear}-06-17`,
}
