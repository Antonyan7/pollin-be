import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuthUserFixture} from './auth.fixture'
import {PatientPlanSheetHistory} from '@libs/data-layer/apps/plan/entities/fireorm'
import {
  patientNoteForHistoryListFixture,
  patientNoteForHistoryOnOtherDayFixture,
} from './patient-note.fixture'
import {patientPlanSheetForHistoryFixture} from './patient-plan-sheet.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const patientPlanSheetNoteHistoryFixtures: Partial<PatientPlanSheetHistory> = {
  id: '1',
  authUserFullName: 'Bcc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  sheetDayDate: patientNoteForHistoryListFixture.date,
  patientNoteId: patientNoteForHistoryListFixture.id,
  patientPlanSheetId: patientPlanSheetForHistoryFixture.id,

  changes: [{propertyName: 'property', from: '-', to: '2'}],
}

export const patientPlanSheetNoteHistoryForPaginationFixture: Partial<PatientPlanSheetHistory> = {
  id: '2',
  authUserFullName: 'Abc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  sheetDayDate: patientNoteForHistoryListFixture.date,
  patientNoteId: patientNoteForHistoryListFixture.id,
  patientPlanSheetId: patientPlanSheetForHistoryFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('05-05-2001')),
  changes: [{propertyName: 'property', from: '3', to: '2'}],
}

export const patientPlanSheetNoteHistoryForOtherDayFixture: Partial<PatientPlanSheetHistory> = {
  id: '3',
  authUserFullName: 'Bcc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  sheetDayDate: patientNoteForHistoryOnOtherDayFixture.date,
  patientNoteId: patientNoteForHistoryOnOtherDayFixture.id,
  patientPlanSheetId: patientPlanSheetForHistoryFixture.id,

  changes: [{propertyName: 'property', from: '-', to: '2'}],
}
