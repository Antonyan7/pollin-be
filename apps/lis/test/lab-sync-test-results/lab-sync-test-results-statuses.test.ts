import request = require('supertest')
import {LisAppModule} from '@apps/lis'
import {ClientHeaders} from '@libs/common/enums'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'

const headers = {
  ...ClientHeaders,
  accept: 'application/json',
  [ClientHeaders.IdToken]: AuthUserFixture.emailVerified.idToken,
  Cookie: `session=${AuthUserFixture.emailVerified.sessionCookie}`,
}

describe('LabSyncTestResultController@getStatuses', () => {
  const url = '/v1/lab-sync-test-results'
  let server

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9138, TestModuleType.ClinicPortalService)
    server = testModule.server
  })

  it('should return status variations for Lab Sync Test Results', async () => {
    const response = await request(server)
      .get(url + `/statuses`)
      .set(headers)

    expect(response.status).toBe(200)
    expect(response.body.data.variations[0].status).toBe(LabSyncTestResultStatus.Unlinked)
    expect(response.body.data.variations[0].actions.length).toBeGreaterThan(2)

    expect(response.body.data.variations[1].status).toBe(LabSyncTestResultStatus.Void)
    expect(response.body.data.variations[1].actions.length).toBe(0)
  })
})
