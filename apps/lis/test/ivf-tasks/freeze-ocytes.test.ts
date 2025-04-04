import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {
  AuthUserFixture,
  ivfTaskGroupForGetPatientPartnersFixture,
  ivfTaskSummaryForFreezingOocytesFixture,
} from '@libs/common/test/fixtures'
import {HttpStatus} from '@nestjs/common'
import request = require('supertest')
import {headers} from '@libs/common/test/utils/headers'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  freezeOocytesSuccessResponsePayload,
  taskDetailsFreezingOocytesEditedStrawRequestPayload,
  taskDetailsFreezingOocytesRemoveStraw,
  taskDetailsFreezingOocytesRemoveStrawRequestPayload,
  taskDetailsFreezingOocytesUpdatedStrawRequestPayload,
  taskDetailsFreezingOocytesUpdatedToCheck,
  taskDetailsFreezingOocytesUpdatedWithoutCaneRequestPayload,
  taskDetailsFreezingOocytesWithStrawRequestPayload,
  taskDetailsFreezingOocytesWithStrawToCheck,
} from './payloads/ivf-task-group-freeze-oocytes.payload'
import {IvfTaskHistorySeed} from '@seeds/firestore/ivf-task-history.seed'
import {
  oocytesFreezingCreationUpdates,
  oocytesFreezingEditingUpdates,
} from './payloads/ivf-task-history.payload'
import {OocyteFreezing} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {IvfTaskHistory} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {IVFTaskEntityTitle} from '@libs/services-common/enums'
import {DefaultValue} from '@libs/common/enums'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)

// eslint-disable-next-line max-lines-per-function
describe('IVF Tasks Freeze', () => {
  const url = '/v1/ivf-tasks'
  let server
  let createdOocyte

  let ivfTaskHistorySeed: IvfTaskHistorySeed

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9200, TestModuleType.ClinicPortalService)
    server = testModule.server

    ivfTaskHistorySeed = new IvfTaskHistorySeed()
  })

  it('Should submit task details with freeze oocytes: Success', async () => {
    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForFreezingOocytesFixture.id)
    const removeStraw = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
      details: taskDetailsFreezingOocytesRemoveStrawRequestPayload,
      dashboardFilterDate: null,
    })
    expect(removeStraw.status).toBe(HttpStatus.OK)

    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
      details: taskDetailsFreezingOocytesWithStrawRequestPayload,
      dashboardFilterDate: null,
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(freezeOocytesSuccessResponsePayload)

    createdOocyte = res.body.data.details.straws[0].id

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryForFreezingOocytesFixture.id,
    )
    expect(historyUpdates).toMatchObject(oocytesFreezingCreationUpdates)
  })

  it('Should get task details containing freeze oocytes: Success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetPatientPartnersFixture.uuid}`)
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)

    const ivfTasks = res.body.data.ivfTasks
    const freezeOocyte = ivfTasks.find((ivfTask) => ivfTask.uiid === IVFTaskType.OocyteFreezing)

    expect(freezeOocyte).toMatchObject(taskDetailsFreezingOocytesWithStrawToCheck)
  })

  it('Should submit task details with updating one freeze oocytes, One Egg Max Count: Failed', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesUpdatedStrawRequestPayload(createdOocyte, 4),
      })

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should submit task details with updating one freeze oocytes, Total Egg Max Count: Failed', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesUpdatedStrawRequestPayload(createdOocyte, 2, 1),
        dashboardFilterDate: null,
      })

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(
      'Total sum of eggsCount should be less than mature oocytes',
    )
  })

  it('Should submit task details with updating one freeze oocytes, Oocyte Sum: Failed', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesUpdatedStrawRequestPayload(createdOocyte, 2, 12),
        dashboardFilterDate: null,
      })

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(
      'Sum of Mature, Imature and other oocyte should be less or equal to total oocytes',
    )
  })

  it('Should submit task details with updating one freeze oocytes: Success', async () => {
    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForFreezingOocytesFixture.id)

    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesUpdatedStrawRequestPayload(createdOocyte, 2),
        dashboardFilterDate: null,
      })

    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(taskDetailsFreezingOocytesUpdatedToCheck)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryForFreezingOocytesFixture.id,
    )
    expect(historyUpdates).toMatchObject(oocytesFreezingEditingUpdates)
  })

  it('Should submit task details with updating one freeze oocyte cane to null: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesUpdatedWithoutCaneRequestPayload(createdOocyte, 2),
        dashboardFilterDate: null,
      })
    expect(res.status).toBe(HttpStatus.OK)

    const resObj = res.body.data.details as OocyteFreezing
    expect(resObj.straws[0].details.caneId).toBeNull()
  })

  it('Should signOff IVF Lab Task: Success', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({id: ivfTaskSummaryForFreezingOocytesFixture.uuid})
    const data = res.body

    expect(data.status.message).toBe(`You need to freeze 7 eggs to be able to sign off.`)
    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should submit task details remove straw: Success', async () => {
    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForFreezingOocytesFixture.id)

    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
      details: taskDetailsFreezingOocytesRemoveStraw,
      dashboardFilterDate: null,
    })
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryForFreezingOocytesFixture.id,
    )
    expect(historyUpdates[0].changes[0].to).toBe(DefaultValue.Dash)
    expect(historyUpdates[0].changes[0].propertyName).toBe(IVFTaskEntityTitle.Straw)
  })

  it('Should submit task details with updating degen without straws: Success', async () => {
    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForFreezingOocytesFixture.id)

    const resResetStraws = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesEditedStrawRequestPayload(8, 2),
        dashboardFilterDate: null,
      })

    expect(resResetStraws.status).toBe(HttpStatus.OK)

    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesEditedStrawRequestPayload(0, 10),
        dashboardFilterDate: null,
      })

    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryForFreezingOocytesFixture.id,
    )

    const degenUpdate = historyUpdates.find(
      (historyUpdate: IvfTaskHistory) => historyUpdate.changes[0].propertyName === 'Degen oocytes',
    )
    expect(degenUpdate.changes[0].from).toBe('2')
    expect(degenUpdate.changes[0].to).toBe('10')

    const resRevert = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
        details: taskDetailsFreezingOocytesEditedStrawRequestPayload(8, 2),
        dashboardFilterDate: null,
      })

    expect(resRevert.status).toBe(HttpStatus.OK)
  })
})
