import {TestResultStatusHistory} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-result-status-history.entity'
import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {staffClinicManagerFixture} from './staff.fixture'
import {testResultForTestPanelSemenAnalysisRecentFixture} from './test-result.fixture'

export const testResultStatusHistoryForGetTestResultDetailsFixture: Partial<TestResultStatusHistory> =
  {
    id: 1,
    uuid: 'b2585822-5959-4122-babb-53e51602f97b',
    testResultId: testResultForTestPanelSemenAnalysisRecentFixture.id,
    status: TestResultStatus.Completed,
    staffUserId: staffClinicManagerFixture.id,
  }
