import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuthUserFixture} from './auth.fixture'
import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {AppointmentHistory} from '@libs/data-layer/apps/scheduling/entities/fireorm/appointment-history.entity'
import {appointmentFixture} from '@libs/common/test/fixtures/appointment.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const appointmentHistoryFixture: Partial<AppointmentHistory> = {
  id: '1',
  authUserFullName: 'Apc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  authUserType: HistoryUserType.SystemAdmin,
  appointmentId: appointmentFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('06-06-2011')),
  changes: [
    {
      propertyName: 'Status',
      from: '-',
      to: AppointmentStatus.CheckedIn,
    },
  ],
}
