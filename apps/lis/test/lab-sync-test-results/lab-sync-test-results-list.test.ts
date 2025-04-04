import request = require('supertest')
import {LisAppModule} from '@apps/lis'
import {LabSyncTestResultListSortEnum} from '@apps/lis/lab-sync-test-results/enum/lab-sync-list.enum'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {ClientHeaders} from '@libs/common/enums'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {UnlinkedTestResultFilterEnum} from '@apps/lis/lab-sync-test-results/dto/get-lab-sync-test-results.dto'

const dateUtil = new DateTimeUtil()

const headers = {
  ...ClientHeaders,
  accept: 'application/json',
  [ClientHeaders.IdToken]: AuthUserFixture.emailVerified.idToken,
  Cookie: `session=${AuthUserFixture.emailVerified.sessionCookie}`,
}

describe('LabSyncTestResultController@getList', () => {
  const url = '/v1/lab-sync-test-results'
  let server

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9058, TestModuleType.ClinicPortalService)
    server = testModule.server
  })

  it('should return Unlinked and Voided results', async () => {
    const response = await request(server)
      .post(url + `/list`)
      .set(headers)
      .send({page: 1, pageSize: 15})

    expect(response.status).toBe(200)
    expect(response.body.pageSize).toBe(15)
    expect(
      response.body.data.testResults.some(
        (result) => result.status === LabSyncTestResultStatus.Linked,
      ),
    ).toBe(false)
  })

  it('should return search result', async () => {
    const response = await request(server)
      .post(url + `/list`)
      .set(headers)
      .send({page: 1, searchString: 'Uniq'})

    expect(response.status).toBe(200)
    expect(response.body.data.testResults.length).toBe(1)
  })

  it('should accept sorting list based on Date Received Desc', async () => {
    const response = await request(server)
      .post(url + `/list`)
      .set(headers)
      .send({
        page: 1,
        sortByField: LabSyncTestResultListSortEnum.DateReceived,
        sortOrder: SortOrder.Desc,
      })

    expect(response.status).toBe(200)
    const firstItem = dateUtil.toDate(response.body.data.testResults[0].dateReceived)
    const secondItem = dateUtil.toDate(response.body.data.testResults[1].dateReceived)
    expect(dateUtil.isAfter(firstItem, secondItem)).toBe(true)
  })

  it('should accept sorting list based on Collection Age Desc', async () => {
    const response = await request(server)
      .post(url + `/list`)
      .set(headers)
      .send({
        page: 1,
        sortByField: LabSyncTestResultListSortEnum.CollectionAge,
        sortOrder: SortOrder.Desc,
      })

    expect(response.status).toBe(200)
    const firstItem = response.body.data.testResults[0].age
    const secondItem = response.body.data.testResults[1].age
    expect(firstItem).toBeGreaterThan(secondItem)
  })

  it('should return Unlinked results only', async () => {
    const response = await request(server)
      .post(url + `/list`)
      .set(headers)
      .send({
        page: 1,
        pageSize: 15,
        filters: [
          {type: UnlinkedTestResultFilterEnum.Status, id: LabSyncTestResultStatus.Unlinked},
        ],
      })

    expect(response.status).toBe(200)

    expect(
      response.body.data.testResults.some(
        (result) => result.status === LabSyncTestResultStatus.Unlinked,
      ),
    ).toBeTruthy()

    expect(
      response.body.data.testResults.some(
        (result) => result.status === LabSyncTestResultStatus.Void,
      ),
    ).toBeFalsy()
  })

  it('should return Voided results only', async () => {
    const response = await request(server)
      .post(url + `/list`)
      .set(headers)
      .send({
        page: 1,
        pageSize: 15,
        filters: [{type: UnlinkedTestResultFilterEnum.Status, id: LabSyncTestResultStatus.Void}],
      })

    expect(response.status).toBe(200)
    expect(
      response.body.data.testResults.some(
        (result) => result.status === LabSyncTestResultStatus.Void,
      ),
    ).toBeTruthy()
  })
})
