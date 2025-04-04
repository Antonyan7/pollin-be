import request = require('supertest')
import {LisAppModule} from '@apps/lis'
import {ClientHeaders} from '@libs/common/enums'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {voidResultRequestPayload} from '../util/lab-sync-test-results-payloads'
import {DataSource, Equal} from 'typeorm'
import {LabSyncObservationRequestRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'

const headers = {
  ...ClientHeaders,
  accept: 'application/json',
  [ClientHeaders.IdToken]: AuthUserFixture.emailVerified.idToken,
  Cookie: `session=${AuthUserFixture.emailVerified.sessionCookie}`,
}

describe('LabSyncTestResultController', () => {
  const url = '/v1/lab-sync-test-results'
  let server
  let dataSource: DataSource
  let labSyncObservationRequestRepository: LabSyncObservationRequestRepository

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9562, TestModuleType.ClinicPortalService)
    server = testModule.server
    dataSource = testModule.appModule.get(DataSource)
    labSyncObservationRequestRepository = new LabSyncObservationRequestRepository(dataSource)
  })

  it('Should void unlinked test result', async () => {
    const response = await request(server)
      .patch(url + `/void-result`)
      .set(headers)
      .send(voidResultRequestPayload)

    expect(response.status).toBe(200)

    const result = await labSyncObservationRequestRepository.findOneBy({
      uuid: Equal(voidResultRequestPayload.unlinkedTestResultId),
    })

    expect(result.status).toBe(LabSyncTestResultStatus.Void)
    expect(result.voidReason).toBe(voidResultRequestPayload.reason)
  })
})
