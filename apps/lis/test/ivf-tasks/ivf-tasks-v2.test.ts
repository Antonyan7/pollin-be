import request = require('supertest')
import {headers} from '@libs/common/test/utils/headers'
import {HttpStatus} from '@nestjs/common'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {DataSource} from 'typeorm'
import {PatientPlanCohortIvfTaskGroupSeed} from '@seeds/typeorm'
import {AuthUserFixture, ivfTaskGroupForMiiDay1CryoFixture} from '@libs/common/test/fixtures'
import {
  ivfTaskGroupForV2Fixture,
  patientPlanCohortIvfTaskGroupOocyteCollectionFixture,
  patientPlanCohortIvfTaskGroupOocyteCollectionWithoutWarmedFixture,
  patientPlanCohortIvfTaskGroupWithOocytesCollectedZeroFixture,
} from '@libs/common/test/fixtures'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'

import * as i18Messages from '@libs/common/i18n/en/message.json'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)

describe('IVF Tasks', () => {
  const url = '/v2/ivf-tasks'
  const url2 = '/v1/ivf-tasks'
  let server
  let ivfTaskGroupSeed: PatientPlanCohortIvfTaskGroupSeed
  let dataSource: DataSource

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9200, TestModuleType.ClinicPortalService)
    dataSource = testModule.appModule.get(DataSource)
    ivfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(dataSource)

    server = testModule.server
  })

  it('Should signOff IVF Day: Success', async () => {
    const spyPublishIvfTaskSigned = jest.spyOn(PubSubHelpers, 'publishIvfTaskSigned')

    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({taskGroupId: ivfTaskGroupForV2Fixture.uuid})
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.signOff.isDone).toBe(true)
    expect(res.body.data.signOff.initials).toBe('UW')
    const group = await ivfTaskGroupSeed.findOneById(ivfTaskGroupForV2Fixture.id)
    expect(group.signedOffDate).toBeTruthy()
    expect(group.signedOffById).toBeTruthy()

    expect(spyPublishIvfTaskSigned).toHaveBeenCalledWith(ivfTaskGroupForV2Fixture.id)
    spyPublishIvfTaskSigned.mockClear()
  })

  it('Should get IVF lab task group: Success', async () => {
    const res = await request(server)
      .get(`${url2}?ivfTaskGroupId=${ivfTaskGroupForV2Fixture.uuid}`)
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.signOff).toBeDefined()
    expect(res.body.data.signOff.isDone).toBe(true)
    expect(res.body.data.signOff.initials).toBe('UW')
  })

  it('Should not signOff IVF Day: Already signed off', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({taskGroupId: ivfTaskGroupForV2Fixture.uuid})

    expect(res.status).toBe(400)
  })
  it('Should signOff IVF Day with zero Oocyte Collected field: Success', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({taskGroupId: patientPlanCohortIvfTaskGroupOocyteCollectionFixture.uuid})
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should not signOff IVF Day with Oocyte Collected field but not oocyte warmed: Fail', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({taskGroupId: patientPlanCohortIvfTaskGroupOocyteCollectionWithoutWarmedFixture.uuid})
    expect(res.status).toBe(400)
    expect(res.body.status.message).toBe(i18Messages.SIGN_OFF_VALIDATION_ERROR)
  })

  it('Should allow signOff for IVF Day  when Oocytes Collected is 0 and other fields are empty: Success', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({taskGroupId: patientPlanCohortIvfTaskGroupWithOocytesCollectedZeroFixture.uuid})
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should not allow signOff for IVF Day Mature cryo validation: Success', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({taskGroupId: ivfTaskGroupForMiiDay1CryoFixture.uuid})
    expect(res.body.status.message).toBe(
      i18Messages.ALL_MATURE_OOCYTES_MUST_BE_ASSIGNED_TO_STRAWS_BEFORE_SIGNOFF,
    )
  })
})
