import request = require('supertest')
import {LisAppModule} from '@apps/lis'
import {ClientHeaders} from '@libs/common/enums'
import {
  AuthUserFixture,
  labInfoDynacareFixture,
  labInfoLifeLabsFixture,
} from '@libs/common/test/fixtures'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {LabSyncDetailsDTO} from '@apps/lis/lab-sync-test-results/dto/lab-sync-test-result-status.dto'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {UnlinkedTestResultFilterEnum} from '@apps/lis/lab-sync-test-results/dto/get-lab-sync-test-results.dto'
import {UnlinkedTestResultFilter} from '@apps/lis/lab-sync-test-results/dto/get-lab-sync-test-results.dto'

const headers = {
  ...ClientHeaders,
  accept: 'application/json',
  [ClientHeaders.IdToken]: AuthUserFixture.emailVerified.idToken,
  Cookie: `session=${AuthUserFixture.emailVerified.sessionCookie}`,
}

describe('LabSyncTestResultController@status', () => {
  const url = '/v1/lab-sync-test-results'
  let server

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9058, TestModuleType.ClinicPortalService)
    server = testModule.server
  })

  it('should get lab sync test result alerts', async () => {
    const response = await request(server)
      .get(url + `/sync-status`)
      .set(headers)

    expect(response.status).toBe(200)

    const labSyncDetails = response.body.data.labSyncDetails as LabSyncDetailsDTO[]

    expect(labSyncDetails.length).toBe(2)

    const [fromDynacare, fromLifeLabs] = labSyncDetails

    expect(fromDynacare.id).toBe(labInfoDynacareFixture.uuid)
    expect(fromLifeLabs.id).toBe(labInfoLifeLabsFixture.uuid)

    expect(fromDynacare.message).toContain('Failed to sync with')
  })

  it('Should get Unlinked Test Result Filters - success', async () => {
    const result = await request(server)
      .get(url + `/filter`)
      .set(headers)

    expect(result.status).toBe(200)

    const filters: UnlinkedTestResultFilter[] = result.body.data.filters
    const statusFilters = filters.find(
      (filter) => filter.title === UnlinkedTestResultFilterEnum.Status,
    )

    expect(statusFilters).toBeTruthy()
    expect(statusFilters.options).toHaveLength(2)
    expect(statusFilters.options).toEqual(
      expect.arrayContaining([
        {
          id: LabSyncTestResultStatus.Unlinked,
          type: UnlinkedTestResultFilterEnum.Status,
          title: LabSyncTestResultStatus.Unlinked,
        },
        {
          id: LabSyncTestResultStatus.Void,
          type: UnlinkedTestResultFilterEnum.Status,
          title: LabSyncTestResultStatus.Void,
        },
      ]),
    )
  })
})
