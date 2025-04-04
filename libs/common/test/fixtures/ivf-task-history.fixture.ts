import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuthUserFixture} from './auth.fixture'
import {IvfTaskHistory} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {
  ivfTaskSummaryForIVFTaskHistoryFixture,
  ivfTaskSummaryForCallPatientFixture,
} from './ivf-task-summary.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const ivfTaskHistoryFixtures: Partial<IvfTaskHistory> = {
  id: '1',
  authUserFullName: 'Bcc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  sourceTaskSummaryId: ivfTaskSummaryForIVFTaskHistoryFixture.id,
  changes: [{propertyName: 'property', from: '-', to: '2'}],
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
}

export const ivfTaskHistoryWithDiffFullnameFixture: Partial<IvfTaskHistory> = {
  id: '2',
  authUserFullName: 'Abc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  sourceTaskSummaryId: ivfTaskSummaryForIVFTaskHistoryFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('05-05-2001')),
  changes: [{propertyName: 'property', from: '3', to: '2'}],
  entityTitle: 'Oldest one',
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
}

export const ivfTaskHistoryForCallPatientFixture: Partial<IvfTaskHistory> = {
  id: '3',
  authUserFullName: 'Staff User for CallThePatient',
  authUserId: AuthUserFixture.emailVerified.uid,
  sourceTaskSummaryId: ivfTaskSummaryForCallPatientFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('2023-07-17')),
  changes: [{propertyName: 'property', from: 'Initial', to: 'Final'}],
  entityTitle: 'Call The Patient',
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
}
