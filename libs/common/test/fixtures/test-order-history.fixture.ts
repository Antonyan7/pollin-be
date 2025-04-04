import {AuthUserFixture} from './auth.fixture'
import {HistoryUserType} from '@libs/common/enums'
import {
  TestOrderHistory,
  TestOrderHistoryComponentEnum,
} from '@libs/data-layer/apps/clinic-test/entities/fireorm'
import {testOrderForCreateAppointmentFixture} from './test-order.fixture'
import {TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {DateTimeUtil} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const orderHistoryFixture: Partial<TestOrderHistory> = {
  id: '111',
  authUserFullName: 'Order Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  authUserType: HistoryUserType.System,
  testOrderId: testOrderForCreateAppointmentFixture.id,
  action: 'Status Updated',
  component: TestOrderHistoryComponentEnum.Status,
  date: dateTimeUtil.getFirestoreTimeStampNowDate(),
  changes: [
    {
      propertyName: 'Status',
      from: '-',
      to: TestOrderStatusEnum.NotCollected,
    },
  ],
  updatedBy: AuthUserFixture.emailVerified.uid,
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
}
