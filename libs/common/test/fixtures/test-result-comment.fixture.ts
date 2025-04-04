import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {TestResultComment} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {staffClinicManagerFixture, staffManagerRoleFixture} from './staff.fixture'
import {testResultForTestPanelSemenAnalysisRecentFixture} from './test-result.fixture'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const testResultComment5DaysAgoFixture: Partial<TestResultComment> = {
  id: 1,
  uuid: '33385822-5959-4122-babb-53e51602f97b',
  testResultId: testResultForTestPanelSemenAnalysisRecentFixture.id,
  content: 'Test result comment',
  staffId: staffClinicManagerFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}

export const testResultCommentLatestFixture: Partial<TestResultComment> = {
  id: 2,
  uuid: '6c9cc86a-7f56-4ffa-ad21-7cd063e96ffa',
  testResultId: testResultForTestPanelSemenAnalysisRecentFixture.id,
  content: 'Test result latest comment',
  staffId: staffManagerRoleFixture.id,
}
