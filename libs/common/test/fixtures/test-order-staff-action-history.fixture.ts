import {TestOrderStaffActionEnum} from '@libs/data-layer/apps/clinic-test/enums'
import {testOrderFixture} from '@libs/common/test/fixtures/test-order.fixture'
import {TestOrderStaffActionHistory} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-order-staff-action-history.entity'
import {staffUserFixture} from '@libs/common/test/fixtures/staff.fixture'

export const testOrderStaffActionHistoryFixture: Partial<TestOrderStaffActionHistory> = {
  id: 1,
  uuid: 'c6a2b105-9e3f-4d6c-8e5e-2cbaeaf34d8f',
  staffId: staffUserFixture.id,
  testOrderId: testOrderFixture.id,
  message: 'message',
  action: TestOrderStaffActionEnum.Create,
}
