import request = require('supertest')
import {AuthUserFixture, staffEmbryologistFixture} from '@libs/common/test/fixtures'
import {headers} from '@libs/common/test/utils/headers'
import {HttpStatus} from '@nestjs/common'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {
  ivfTaskSummaryHistoryDay3CheckFixture,
  ivfTaskSummaryHistoryDay7CheckFixture,
  ivfTaskSummaryHistoryFertilizationCheckFixture,
  ivfTaskSummaryInjectionAssessmentFixture,
  ivfTaskSummaryTaskHistoryEmbryoGroupPhotoFixture,
  ivfTaskSummaryTaskHistoryIcsiInjectionFixture,
  ivfTaskSummaryTaskHistoryMiiDay1Fixture,
  ivfTaskSummaryTaskHistoryOocyteCollectionFixture,
  ivfTaskSummaryTaskHistoryOocyteGroupPhotoFixture,
  ivfTaskSummaryTaskHistoryOocytesInseminationnFixture,
  ivfTaskSummaryTaskHistoryPicsiFixture,
  ivfTaskSummaryTaskHistoryPostStrippingFixture,
  ivfTaskSummaryTaskHistorySpermWashFixture,
  ivfTaskSummaryForCallPatientFixture,
  ivfTaskSummarySetupWorksheetFixture,
  ivfTaskSummaryVerifyHepBcHivFixture,
} from '@libs/common/test/fixtures/ivf-task-summary.fixture'
import {IvfTaskHistorySeed} from '@seeds/firestore/ivf-task-history.seed'
import {
  day3CheckHistoryPayload,
  day7CheckHistoryPayload,
  embryoGroupPhotoHistoryPayload,
  fertilizationCheckHistoryChangeToDashesPayload,
  fertilizationCheckHistoryPayload,
  icsiInjectionHistoryPayload,
  injectionAssessmentPayload,
  miiDay1HistoryPayload,
  miiDay1UpdateHistoryPayload,
  newInjectionAssessmentComment,
  oocyteGroupPhotosHistoryPayload,
  oocytesCollectionHistoryPayload,
  oocytesInseminationHistoryPayload,
  picsiHistoryPayload,
  postStrippingHistoryPayload,
  spermWashHistoryPayload,
  callPatientHistoryPayload,
  setupWorksheetHistoryPayload,
  ivfSetupWorksheetNote,
  ivfVerifyHepBcHivNote,
  ivfVerifyHepBcHivHistoryPayload,
  day3CheckHistoryWithFreshTransferPayload,
} from './payloads/ivf-task-history.payload'
import {IVFTaskEntityTitle} from '@libs/services-common/enums'
import {DefaultValue} from '@libs/common/enums'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)

// eslint-disable-next-line max-lines-per-function
describe('IVF Tasks', () => {
  const url = '/v1/ivf-tasks'
  let server

  let ivfTaskHistorySeed: IvfTaskHistorySeed

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9243, TestModuleType.ClinicPortalService)
    server = testModule.server

    ivfTaskHistorySeed = new IvfTaskHistorySeed()
  })

  it('Should update task details type OocytesCollection: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(oocytesCollectionHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    expect(res.body.data.details).toMatchObject({
      oocytesCollected: 1,
      oocytesWarmed: 2,
      oocytesSurvived: 3,
      embryologistId: staffEmbryologistFixture.uuid,
    })

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryOocyteCollectionFixture.id,
    )
    expect(historyUpdates).toMatchObject(oocytesCollectionHistoryPayload.updates)
  })

  it('Should update task details type SpermWash: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(spermWashHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistorySpermWashFixture.id,
    )
    expect(historyUpdates).toMatchObject(spermWashHistoryPayload.updates)
  })

  it('Should update task details type Post Stripping: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(postStrippingHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryPostStrippingFixture.id,
    )
    expect(historyUpdates).toMatchObject(postStrippingHistoryPayload.updates)
  })

  it('Should update task details type OocyteGroupPhoto: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(oocyteGroupPhotosHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryOocyteGroupPhotoFixture.id,
    )
    expect(historyUpdates).toMatchObject(oocyteGroupPhotosHistoryPayload.updates)
  })

  it('Should update task details type ICSI injection: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(icsiInjectionHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryIcsiInjectionFixture.id,
    )
    expect(historyUpdates).toMatchObject(icsiInjectionHistoryPayload.updates)
  })

  it('Should update task details type IVF Insemenation: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(oocytesInseminationHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryOocytesInseminationnFixture.id,
    )
    expect(historyUpdates).toMatchObject(oocytesInseminationHistoryPayload.updates)
  })

  it('Should update task details type PICSI: Success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send(picsiHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryPicsiFixture.id,
    )
    expect(historyUpdates).toMatchObject(picsiHistoryPayload.updates)
  })

  it('Should update task details type MII Day 1: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(miiDay1HistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const strawUUID = res.body.data.details.straws[0].id

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryMiiDay1Fixture.id,
    )
    expect(historyUpdates).toMatchObject(miiDay1HistoryPayload.updates)

    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryTaskHistoryMiiDay1Fixture.id)
    const updatePayload = miiDay1UpdateHistoryPayload(strawUUID)
    const updateResult = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(updatePayload.request)
    expect(updateResult.status).toBe(HttpStatus.OK)

    const historyAfterUpdate = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryMiiDay1Fixture.id,
    )
    expect(historyAfterUpdate).toMatchObject(updatePayload.updates)
  })

  it('Should update task details type Embryo Group Photo: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(embryoGroupPhotoHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryTaskHistoryEmbryoGroupPhotoFixture.id,
    )
    expect(historyUpdates).toMatchObject(embryoGroupPhotoHistoryPayload.updates)
  })

  it('Should update task details type Injection Assessment: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(injectionAssessmentPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryInjectionAssessmentFixture.id,
    )
    expect(historyUpdates).toMatchObject(injectionAssessmentPayload.updates)

    const newComment = 'comment 2'

    const requestWithNewComment = {...injectionAssessmentPayload.request}
    requestWithNewComment.details.oocyteComment = newComment

    const resultForCommentUpdate = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(requestWithNewComment)
    expect(resultForCommentUpdate.status).toBe(HttpStatus.OK)

    const historyUpdatesAfterCommentUpdate = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryInjectionAssessmentFixture.id,
    )
    expect(historyUpdatesAfterCommentUpdate.length).toBe(historyUpdates.length + 1)

    const historyForComment = historyUpdatesAfterCommentUpdate.find(
      (history) =>
        history.changes[0].propertyName === IVFTaskEntityTitle.OocyteComments &&
        history.changes[0].from === newInjectionAssessmentComment,
    )

    expect(historyForComment).toMatchObject({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocyteComments,
          from: newInjectionAssessmentComment,
          to: newComment,
        },
      ],
    })
  })
  it('Should correctly transform boolean values to Yes/No for assisted hatching in Day 3 Check history updates', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(day3CheckHistoryWithFreshTransferPayload.request)

    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryHistoryDay3CheckFixture.id,
    )

    expect(historyUpdates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          changes: [
            {
              propertyName: IVFTaskEntityTitle.FreshTransfer,
              from: DefaultValue.Dash,
              to: DefaultValue.Yes,
            },
          ],
        }),
      ]),
    )
  })

  it('Should update task details type Day 3 Check: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(day3CheckHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryHistoryDay3CheckFixture.id,
    )
    expect(historyUpdates).toMatchObject(day3CheckHistoryPayload.updates)
  })

  it('Should update task details type Day 7 Check: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(day7CheckHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryHistoryDay7CheckFixture.id,
    )

    expect(historyUpdates).toMatchObject(day7CheckHistoryPayload.updates)
  })

  it('Should update task details with Fertilization check: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(fertilizationCheckHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryHistoryFertilizationCheckFixture.id,
    )
    expect(historyUpdates).toMatchObject(fertilizationCheckHistoryPayload.updates)

    await ivfTaskHistorySeed.deleteByTaskSummaryId(
      ivfTaskSummaryHistoryFertilizationCheckFixture.id,
    )

    const updateRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(fertilizationCheckHistoryChangeToDashesPayload.request)
    expect(updateRes.status).toBe(HttpStatus.OK)

    const historyUpdatesAfterUpdate = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryHistoryFertilizationCheckFixture.id,
    )
    expect(historyUpdatesAfterUpdate).toMatchObject(
      fertilizationCheckHistoryChangeToDashesPayload.updates,
    )
  })
  it('Should update task details type CallThePatient: Success', async () => {
    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForCallPatientFixture.id)

    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(callPatientHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryForCallPatientFixture.id,
    )
    expect(historyUpdates).toMatchObject(callPatientHistoryPayload.updates)
  })

  it('Should update task details type SetupWorksheet: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(setupWorksheetHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.note).toBe(ivfSetupWorksheetNote)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummarySetupWorksheetFixture.id,
    )
    expect(historyUpdates).toMatchObject(setupWorksheetHistoryPayload.updates)
  })

  it('Should update task details type VerifyHepBcHiv: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(ivfVerifyHepBcHivHistoryPayload.request)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.note).toBe(ivfVerifyHepBcHivNote)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryVerifyHepBcHivFixture.id,
    )
    expect(historyUpdates).toMatchObject(ivfVerifyHepBcHivHistoryPayload.updates)
  })
})
