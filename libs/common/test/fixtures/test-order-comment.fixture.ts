import {TestOrderComment} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {testOrderFixture} from '@libs/common/test/fixtures/test-order.fixture'
import {staffClinicManagerFixture} from '@libs/common/test/fixtures/staff.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const testOrderCommentFixture: Partial<TestOrderComment> = {
  id: 1,
  uuid: '8cfb78d2-8272-4fca-b1df-202ed550b11f',
  content: 'testOrderCommentFixture',
  testOrderId: testOrderFixture.id,
  staffId: staffClinicManagerFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}
