import request = require('supertest')
import {AuthUserFixture, ivfTaskSummaryForDay6Fixture} from '@libs/common/test/fixtures'
import {headers} from '@libs/common/test/utils/headers'
import {HttpStatus} from '@nestjs/common'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {
  submitInvalidCaneIdPayloadDay5,
  submitInvalidMissingFieldsFreshETPayloadDay5,
  submitInvalidMissingFieldsPayloadDay5,
} from './payloads/ivf-task-group-invalid.payload'
import {ivfTaskSummaryForOptionalMatureOocytePhotoFixture} from '@libs/common/test/fixtures'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)

describe('IVF Tasks', () => {
  const url = '/v1/ivf-tasks'
  let server

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9205, TestModuleType.ClinicPortalService)
    server = testModule.server
  })

  it('Should submit task details type Day5Check without details Freeze: Fail', async () => {
    // Create embryo and attachments
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitInvalidMissingFieldsPayloadDay5)
    expect(createRes.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should submit task details type Day5Check without details FreshET: Fail', async () => {
    // Create embryo and attachments
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitInvalidMissingFieldsFreshETPayloadDay5)
    expect(createRes.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should submit task details type Day5Check with invalid caneId Freeze: Fail', async () => {
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitInvalidCaneIdPayloadDay5)

    expect(createRes.body.status.message).toBe('Cryo cane v2 is not found')
    expect(createRes.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should submit task details type Day6Check with invalid caneId Freeze: Fail', async () => {
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({...submitInvalidCaneIdPayloadDay5, id: ivfTaskSummaryForDay6Fixture.uuid})

    expect(createRes.body.status.message).toBe('Cryo cane v2 is not found')
    expect(createRes.status).toBe(HttpStatus.BAD_REQUEST)
  })
  it('Should sign off IVF Lab Mature Oocyte Group Photo Task without photo: Success', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({id: ivfTaskSummaryForOptionalMatureOocytePhotoFixture.uuid})
    expect(res.status).toBe(HttpStatus.OK)
  })
})
