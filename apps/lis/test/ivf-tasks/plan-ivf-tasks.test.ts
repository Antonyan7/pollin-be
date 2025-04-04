import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {
  AuthUserFixture,
  patientPlanCohortIVFTaskGroup3Fixture,
  spawnedPatientPlanCohortIVFTaskGroupFixture,
} from '@libs/common/test/fixtures'
import {HttpStatus} from '@nestjs/common'
import {headers} from '@libs/common/test/utils/headers'
import request = require('supertest')
import {patientPlanForIVF2Fixture} from '@libs/common/test/fixtures/patient-plan-ivf.fixture'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  patientPlanV2CancelledIVFStateFixture,
  patientPlanV2CompletedIVFStateFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {staffEmbryologistFixture, staffUserMobileFixture} from '@libs/common/test/fixtures'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)

describe('IVF Tasks', () => {
  const url = '/v1/plan-ivf-tasks'
  let server
  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9203, TestModuleType.ClinicPortalService)
    server = testModule.server
  })
  it('Should ivf task groups: Success', async () => {
    const res = await request(server)
      .get(`${url}?patientPlanId=${patientPlanForIVF2Fixture.uuid}`)
      .set(defaultHeaders)
      .send()

    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.ivfStatus).toBe(IVFLabStatus.Active)
    expect(res.body.data.cohorts[0].isMain).toBe(true)
    expect(res.body.data.cohorts[0].taskGroups.length).toBe(1)
    expect(res.body.data.cohorts[0].taskGroups[0]).toMatchObject({
      id: patientPlanCohortIVFTaskGroup3Fixture.uuid,
      title: `IVF Lab Form - Day ${patientPlanCohortIVFTaskGroup3Fixture.day}`,
    })
    expect(res.body.data.cohorts[1].isMain).toBe(false)
    expect(res.body.data.cohorts[1].taskGroups.length).toBe(2)
    expect(res.body.data.cohorts[1].taskGroups[0]).toMatchObject({
      id: spawnedPatientPlanCohortIVFTaskGroupFixture.uuid,
      title: `IVF Lab Form - Day ${spawnedPatientPlanCohortIVFTaskGroupFixture.day}`,
    })
  })

  it('Should get ivf task groups and cancellation reason: Success', async () => {
    const res = await request(server)
      .get(`${url}?patientPlanId=${patientPlanV2CancelledIVFStateFixture.uuid}`)
      .set(defaultHeaders)
      .send()
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.ivfStatus).toBe(IVFLabStatus.Cancelled)
    expect(res.body.data.cohorts[0].taskGroups.length).toBe(0)
    expect(res.body.data.cancellationMetadata.reasonForCancellation).toBe('Reason 1')
    expect(res.body.data.cancellationMetadata.comment).toBe('Lorem ipsum')
  })

  it('Should get ivf task groups and completion meta: Success', async () => {
    const res = await request(server)
      .get(`${url}?patientPlanId=${patientPlanV2CompletedIVFStateFixture.uuid}`)
      .set(defaultHeaders)
      .send()
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.ivfStatus).toBe(IVFLabStatus.Completed)
    expect(res.body.data.cohorts[0].taskGroups.length).toBe(1)
    expect(res.body.data.completionMetadata.comment).toBe('Completed by fixture')
    expect(res.body.data.completionMetadata.ivfWitnessByStaff).toMatchObject({
      id: staffUserMobileFixture.uuid,
      fullName: getFullName(staffUserMobileFixture.firstName, staffUserMobileFixture.lastName),
    })
    expect(res.body.data.completionMetadata.embryologistFreezingByStaff).toMatchObject({
      id: staffEmbryologistFixture.uuid,
      fullName: getFullName(staffEmbryologistFixture.firstName, staffEmbryologistFixture.lastName),
    })
  })
})
