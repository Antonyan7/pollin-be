import request = require('supertest')
import {
  AuthUserFixture,
  FirstCancellationReasonFixture,
  ivfTaskSummaryForCompletionStatusFixture,
  SecondCancellationReasonFixture,
} from '@libs/common/test/fixtures'
import {headers} from '@libs/common/test/utils/headers'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {DateTimeUtil} from '@libs/common'
import {
  patientPlanForPrimingWorkSheetChecklistFixture,
  patientPlanToManuallySetCohortDateFixture,
  patientPlanV2ForCompleteCohortFixture,
  patientPlanV2ForCompletionForStatsIVFStateFixture,
  patientPlanV2ForCompletionIVFStateFixture,
  patientPlanV2ForCycleDetailsWithoutFollicleNumberFixture,
  patientPlanV3CancelledFixture,
  patientPlanV2ForEggFreezingFixture,
  patientPlanV2ForCancelCohortFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {HttpStatus} from '@nestjs/common'
import {PatientPlanCohortSeed, PatientPlanSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {
  cancelDashboardDayUpdates,
  completeDashboardDayUpdates,
  completionMetadata,
  filtersResponse,
  getCancelIvfPlanRequest,
} from './payloads/filters.payload'
import {IvfLabCohortDateService} from '@libs/common/services/ivf-lab/ivf-lab-cohort-date.service'
import {PubSubAdapter} from '@libs/common/adapters'
import {IVFLabPlanUpdatedSchema} from '@libs/common/model/proto-schemas/ivf-lab-plan-updated.schema'
import {
  ivfDispositionOneForFETFixture,
  ivfDispositionTwoForFETFixture,
} from '@libs/common/test/fixtures'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)
const dateTimeUtil = new DateTimeUtil()

// eslint-disable-next-line max-lines-per-function
describe('Getting IVF patient tests', () => {
  const url = '/v1/patients'
  const urlWithTasks = '/v1/ivf-tasks'
  let server

  let patientPlanCohortSeed: PatientPlanCohortSeed
  let patientPlanSeed: PatientPlanSeed
  let dataSource: DataSource

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9114, TestModuleType.ClinicPortalService)
    server = testModule.server

    dataSource = testModule.appModule.get(DataSource)
    patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)
  })

  it('should create and update cohort date - success', async () => {
    const spyOnPublishCohortStartDateChange = jest.spyOn(
      IvfLabCohortDateService.prototype,
      'publishCohortDateUpdated',
    )

    const cohortDate = dateTimeUtil.formatTzDate(dateTimeUtil.addDays(dateTimeUtil.now(), 100))
    const res = await request(server).post(`${url}/cohort-date`).set(defaultHeaders).send({
      patientPlanId: patientPlanToManuallySetCohortDateFixture.uuid,
      date: cohortDate,
    })
    expect(res.status).toBe(HttpStatus.OK)

    const patientPlanCohort = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanToManuallySetCohortDateFixture.id,
    )

    expect(spyOnPublishCohortStartDateChange).toHaveBeenCalledWith(patientPlanCohort.id)
    spyOnPublishCohortStartDateChange.mockClear()

    expect(patientPlanCohort).toMatchObject({
      spawnedFromPatientPlanCohortId: null,
      appointmentId: null,
      revisionId: expect.any(String),
      cohortDate,
      patientPlanCohortIvfTaskDetails: expect.any(Object),
    })
    expect(patientPlanCohort.ivfTaskGroups.length).toBe(9)
    expect(patientPlanCohort.ivfTaskGroups[0].revisionId).toEqual(expect.any(String))

    const newCohortDate = dateTimeUtil.formatTzDate(dateTimeUtil.addDays(dateTimeUtil.now(), 98))
    const resultFor2ndRequest = await request(server)
      .post(`${url}/cohort-date`)
      .set(defaultHeaders)
      .send({
        patientPlanId: patientPlanToManuallySetCohortDateFixture.uuid,
        date: newCohortDate,
      })
    expect(resultFor2ndRequest.status).toBe(200)

    const patientPlanCohortUpdated = await patientPlanCohortSeed.findByPatientPlanIdWithDetails(
      patientPlanToManuallySetCohortDateFixture.id,
    )
    expect(patientPlanCohortUpdated).toMatchObject({
      spawnedFromPatientPlanCohortId: null,
      appointmentId: null,
      revisionId: expect.any(String),
      cohortDate: newCohortDate,
      patientPlanCohortIvfTaskDetails: expect.any(Object),
    })
  })

  it('should not create cohort - plan doesnt have ivf tasks', async () => {
    const cohortDate = dateTimeUtil.formatTzDate(dateTimeUtil.now())
    const resultFor2ndRequest = await request(server)
      .post(`${url}/cohort-date`)
      .set(defaultHeaders)
      .send({
        patientPlanId: patientPlanForPrimingWorkSheetChecklistFixture.uuid,
        date: cohortDate,
      })
    expect(resultFor2ndRequest.status).toBe(400)
    expect(resultFor2ndRequest.body.status.message).toBe(i18Messages.PLAN_IS_NOT_IVF)
  })

  it('should not create cohort - plan was not found', async () => {
    const cohortDate = dateTimeUtil.formatTzDate(dateTimeUtil.now())
    const resultFor2ndRequest = await request(server)
      .post(`${url}/cohort-date`)
      .set(defaultHeaders)
      .send({
        patientPlanId: patientPlanV3CancelledFixture.uuid,
        date: cohortDate,
      })
    expect(resultFor2ndRequest.status).toBe(400)
    expect(resultFor2ndRequest.body.status.message).toBe(i18Messages.PATIENT_PLAN_NOT_FOUND)
  })

  it('should not create cohort - cant be created manually', async () => {
    const cohortDate = dateTimeUtil.formatTzDate(dateTimeUtil.now())
    const resultFor2ndRequest = await request(server)
      .post(`${url}/cohort-date`)
      .set(defaultHeaders)
      .send({
        patientPlanId: patientPlanV2ForCycleDetailsWithoutFollicleNumberFixture.uuid,
        date: cohortDate,
      })
    expect(resultFor2ndRequest.status).toBe(400)
    expect(resultFor2ndRequest.body.status.message).toBe(
      i18Messages.COHORT_DATE_CANT_BE_SELECTED_MANUALLY,
    )
  })
  it('should get all IVF cancellation reasons', async () => {
    const res = await request(server)
      .get(url + '/plan-cancellation-reasons')
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.reasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: FirstCancellationReasonFixture.uuid,
          title: FirstCancellationReasonFixture.reason,
        }),
        expect.objectContaining({
          id: SecondCancellationReasonFixture.uuid,
          title: SecondCancellationReasonFixture.reason,
        }),
      ]),
    )
  })
  it('should get filters of patient list', async () => {
    const res = await request(server)
      .get(url + '/filters')
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.filters).toEqual(filtersResponse)
  })
  it('should cancel IVF plan', async () => {
    const spyOnIVFLabUpdated = jest.spyOn(PubSubAdapter.prototype, 'publishWithSchema')

    const cancellationReasonsRes = await request(server)
      .get(url + '/plan-cancellation-reasons')
      .set(defaultHeaders)

    const [cancellationReason] = cancellationReasonsRes.body.data.reasons

    const res = await request(server)
      .patch(url + '/cancel-plan')
      .set(defaultHeaders)
      .send(getCancelIvfPlanRequest(cancellationReason.id))

    expect(spyOnIVFLabUpdated).toHaveBeenCalledWith(
      expect.objectContaining({
        patientPlanId: patientPlanV2ForCancelCohortFixture.id,
        oldStatus: IVFLabStatus.Active,
        newStatus: IVFLabStatus.Cancelled,
      }),
      IVFLabPlanUpdatedSchema,
    )
    spyOnIVFLabUpdated.mockClear()

    expect(res.status).toBe(HttpStatus.OK)
    const dashboardDay = res.body.data.dashboardDayUpdates[0]
    expect(dashboardDay.id).toBe(0)
    expect(dashboardDay.title).toBe('Day 0')
    expect(dashboardDay.patients[0]).toMatchObject(cancelDashboardDayUpdates)
  })

  it('should complete IVF plan any other status - success', async () => {
    const res = await request(server)
      .patch(url + '/complete-plan')
      .set(defaultHeaders)
      .send(completionMetadata)

    expect(res.status).toBe(HttpStatus.OK)
  })

  it('should not complete IVF plan - transport folder was not found', async () => {
    const res = await request(server)
      .patch(url + '/complete-plan')
      .set(defaultHeaders)
      .send({
        ...completionMetadata,
        metadata: {
          transportFolderId: '62d56a58-625e-4e70-b9d5-87ad49f1e123',
        },
      })

    expect(res.status).toBe(400)
    expect(res.body.status.message).toBe(i18Messages.TRANSPORT_FOLDER_NOT_FOUND)
  })

  it('should complete IVF plan - success', async () => {
    await patientPlanSeed.setIVFStatus(
      patientPlanV2ForCompleteCohortFixture.id,
      IVFLabStatus.AwaitingBiopsyResults,
    )

    const spyOnIVFLabUpdated = jest.spyOn(PubSubAdapter.prototype, 'publishWithSchema')

    const res = await request(server)
      .patch(url + '/complete-plan')
      .set(defaultHeaders)
      .send(completionMetadata)

    expect(spyOnIVFLabUpdated).toHaveBeenCalledWith(
      expect.objectContaining({
        patientPlanId: patientPlanV2ForCompleteCohortFixture.id,
        oldStatus: IVFLabStatus.AwaitingBiopsyResults,
        newStatus: IVFLabStatus.Completed,
      }),
      IVFLabPlanUpdatedSchema,
    )
    spyOnIVFLabUpdated.mockClear()

    expect(res.status).toBe(HttpStatus.OK)
    const dashboardDay = res.body.data.dashboardDayUpdates[0]
    expect(dashboardDay.id).toBe(null)
    expect(dashboardDay.title).toBe(null)
    expect(dashboardDay.patients[0]).toMatchObject(completeDashboardDayUpdates)
  })

  it('should block IVF plan sign off, after completion - success', async () => {
    const res = await request(server)
      .patch(`${urlWithTasks}/sign-off`)
      .set(defaultHeaders)
      .send({id: ivfTaskSummaryForCompletionStatusFixture.uuid})

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe('Editing Cohort is not allowed in this state')
  })

  it('Should get IVF plan statuses: Successfully', async () => {
    const result = await request(server)
      .get(url + '/statuses')
      .set(defaultHeaders)

    expect(result.status).toBe(HttpStatus.OK)

    const variations = result.body.data.variations

    // Checking response format
    expect(variations).toEqual(
      expect.arrayContaining([
        {
          status: expect.any(String),
          title: expect.any(String),
          actions: expect.arrayContaining([
            {
              id: expect.any(String),
              title: expect.any(String),
            },
          ]),
          label: {
            textColor: expect.any(String),
            backgroundColor: expect.any(String),
          },
        },
      ]),
    )
  })
  it('Should get IVF plan statuses with error: Successfully', async () => {
    const result = await request(server)
      .get(
        url +
          `/plan-completion-metadata?patientPlanId=${patientPlanV2ForCompletionIVFStateFixture.uuid}`,
      )
      .set(defaultHeaders)

    expect(result.status).toBe(HttpStatus.OK)
    expect(result.body.data).toMatchObject({
      type: 'EmbryoFreezing',
      details: null,
      error: {
        messages: [
          '<b>Patient For Completion (MRN: PID0000295)</b> has remaining expanded embryos which have not yet been assigned for cryopreservation or fresh transfer.',
          'You must assign all expanded embryos before setting patient’s IVF lab status to “Completed”.',
        ],
        widgetTitle: 'Expanded Embryos Remaining',
      },
    })
  })
  it('Should get IVF plan statuses with details: Successfully', async () => {
    const result = await request(server)
      .get(
        url +
          `/plan-completion-metadata?patientPlanId=${patientPlanV2ForCompletionForStatsIVFStateFixture.uuid}`,
      )
      .set(defaultHeaders)

    expect(result.status).toBe(HttpStatus.OK)

    expect(result.body.data).toMatchObject({
      type: 'EmbryoFreezing',
      details: {
        numberOfEmbryosFreezedAndBiopsy: 0,
        numberOfEmbryosFreezed: 3,
        numberOfEmbryosFreezedArrested: 0,
        numberOfEmbryosFreezedDiscarded: 1,
      },
      error: null,
    })
  })
  it('Should get IVF plan statuses with Egg Freezing details: Successfully', async () => {
    const res = await request(server)
      .get(
        url + `/plan-completion-metadata?patientPlanId=${patientPlanV2ForEggFreezingFixture.uuid}`,
      )
      .set(defaultHeaders)
    expect(res.body.data).toMatchObject({
      type: 'EggFreezing',
      details: {
        numberOfOocytesFreezedOnDay0: 6,
        numberOfOocytesFreezedOnMiiDay1: 10,
        numberOfMatureOocytes: 4,
        numberOfImmatureOocytes: 2,
        numberOfOtherOocytes: 6,
      },
      error: null,
    })
  })
  it('should get all IVF Disposition reasons', async () => {
    const res = await request(server)
      .get(url + '/plan-disposition-reasons')
      .set(defaultHeaders)

    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.reasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: ivfDispositionOneForFETFixture.uuid,
          title: ivfDispositionOneForFETFixture.reason,
        }),
        expect.objectContaining({
          id: ivfDispositionTwoForFETFixture.uuid,
          title: ivfDispositionTwoForFETFixture.reason,
        }),
      ]),
    )
  })
})
