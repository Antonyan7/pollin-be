import request = require('supertest')
import {AuthUserFixture, patientToManuallySetCohortDateFixture} from '@libs/common/test/fixtures'
import {headers} from '@libs/common/test/utils/headers'
import {HttpStatus} from '@nestjs/common'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {
  ivfTaskSummaryForIVFTaskHistoryFixture,
  ivfTaskSummaryTaskHistoryWithoutChangesFixture,
  ivfTaskSummaryForCallPatientFixture,
} from '@libs/common/test/fixtures/ivf-task-summary.fixture'
import {
  ActionHistorySortByFieldEnum,
  HistoryLineItemText,
  HistoryTitleLabel,
} from '@libs/common/enums'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {
  ivfTaskHistoryFixtures,
  ivfTaskHistoryWithDiffFullnameFixture,
  ivfTaskHistoryForCallPatientFixture,
} from '@libs/common/test/fixtures/ivf-task-history.fixture'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {GetHistoryResponseDTO, HistoryLineItemType} from '@libs/services-common/dto/history.dto'
import {IVFTaskType, IVFTaskTypeLabel} from '@libs/data-layer/apps/clinic-ivf/enums'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get('DEFAULT_TIME_ZONE'),
)

// eslint-disable-next-line max-lines-per-function
describe('IVF Tasks', () => {
  const url = '/v1/ivf-tasks'
  let server

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9101, TestModuleType.ClinicPortalService)
    server = testModule.server
  })

  it('Should get ivf task history with pagination test - success', async () => {
    const res = await request(server)
      .post(url + '/history')
      .set(defaultHeaders)
      .send({
        taskId: ivfTaskSummaryForIVFTaskHistoryFixture.uuid,
        sortByField: ActionHistorySortByFieldEnum.Date,
        sortOrder: SortOrder.Desc,
      })

    expect(res.status).toBe(HttpStatus.OK)
    const cursor = res.body.paginationCursor
    expect(cursor).toBe('25-history-id')

    const resObj = res.body.data as GetHistoryResponseDTO
    expect(resObj.historyItems.length).toBe(25)
    expect(resObj).toMatchObject({
      patient: {
        id: patientToManuallySetCohortDateFixture.uuid,
        fullName: `${patientToManuallySetCohortDateFixture.firstName} ${patientToManuallySetCohortDateFixture.lastName}`,
      },
      title: HistoryTitleLabel.Task,
      lineItems: [
        {
          id: ivfTaskSummaryForIVFTaskHistoryFixture.uuid,
          type: HistoryLineItemType.Text,
          entity: {
            name: HistoryLineItemText.Task,
            value: IVFTaskTypeLabel[IVFTaskType.PostStripping],
          },
        },
        {
          id: patientToManuallySetCohortDateFixture.uuid,
          type: HistoryLineItemType.Patient,
          entity: {
            name: HistoryLineItemText.Patient,
            value: `${patientToManuallySetCohortDateFixture.firstName} ${patientToManuallySetCohortDateFixture.lastName}`,
          },
        },
      ],
    })

    expect(resObj.historyItems[0]).toMatchObject({
      id: '0-history-id',
      entityTitle: '0',
      changes: ivfTaskHistoryFixtures.changes,
      editedBy: {
        fullName: ivfTaskHistoryFixtures.authUserFullName,
        userType: null,
      },
    })
    expect(resObj.historyItems[10]).toMatchObject({
      id: '10-history-id',
      entityTitle: '10',
      changes: ivfTaskHistoryFixtures.changes,
      editedBy: {
        fullName: ivfTaskHistoryFixtures.authUserFullName,
        userType: null,
      },
    })
    expect(resObj.historyItems[19]).toMatchObject({
      id: '19-history-id',
      entityTitle: '19',
      changes: ivfTaskHistoryFixtures.changes,
      editedBy: {
        fullName: ivfTaskHistoryFixtures.authUserFullName,
        userType: null,
      },
    })

    const resFor2ndPage = await request(server)
      .post(url + '/history')
      .set(defaultHeaders)
      .send({
        taskId: ivfTaskSummaryForIVFTaskHistoryFixture.uuid,
        sortByField: ActionHistorySortByFieldEnum.Date,
        sortOrder: SortOrder.Desc,
        paginationCursor: cursor,
      })

    expect(resFor2ndPage.status).toBe(HttpStatus.OK)
    expect(resFor2ndPage.body.paginationCursor).toBeNull()

    const resObjFor2ndPage = resFor2ndPage.body.data as GetHistoryResponseDTO
    expect(resObjFor2ndPage.historyItems.length).toBe(6)
    expect(resObjFor2ndPage).toMatchObject({
      patient: {
        id: patientToManuallySetCohortDateFixture.uuid,
        fullName: `${patientToManuallySetCohortDateFixture.firstName} ${patientToManuallySetCohortDateFixture.lastName}`,
      },
    })

    expect(resObjFor2ndPage.historyItems[0].id).toBe(cursor)
    expect(resObjFor2ndPage.historyItems[4].id).toBe('29-history-id')
    expect(resObjFor2ndPage.historyItems[5].id).toBe(ivfTaskHistoryWithDiffFullnameFixture.id)
    expect(resObjFor2ndPage.historyItems[5].date).toBe(
      dateTimeUtil.formatUTCDateInRFC3339Tz(ivfTaskHistoryWithDiffFullnameFixture.date.toDate()),
    )
  })

  it('Should get ivf task history sorted by staff fullname - success', async () => {
    const res = await request(server)
      .post(url + '/history')
      .set(defaultHeaders)
      .send({
        taskId: ivfTaskSummaryForIVFTaskHistoryFixture.uuid,
        sortByField: ActionHistorySortByFieldEnum.EditedBy,
        sortOrder: SortOrder.Asc,
      })

    expect(res.status).toBe(HttpStatus.OK)
    const cursor = res.body.paginationCursor
    expect(cursor).toBe('24-history-id')

    const resObj = res.body.data as GetHistoryResponseDTO
    expect(resObj.historyItems.length).toBe(25)

    expect(resObj.historyItems[0]).toMatchObject({
      changes: ivfTaskHistoryWithDiffFullnameFixture.changes,
      editedBy: {
        fullName: ivfTaskHistoryWithDiffFullnameFixture.authUserFullName,
        userType: null,
      },
    })
    expect(resObj.historyItems[1]).toMatchObject({
      changes: ivfTaskHistoryFixtures.changes,
      editedBy: {
        fullName: ivfTaskHistoryFixtures.authUserFullName,
        userType: null,
      },
    })
  })

  it('Should not get ivf task history - task not found', async () => {
    const res = await request(server)
      .post(url + '/history')
      .set(defaultHeaders)
      .send({
        taskId: 'c09b83a3-72e9-2c42-adb8-36e299fca726',
        sortByField: ActionHistorySortByFieldEnum.EditedBy,
        sortOrder: SortOrder.Asc,
      })

    expect(res.status).toBe(400)
    expect(res.body.status.message).toBe(i18Messages.IVF_TASK_SUMMARY_NOT_FOUND)
  })

  it('Should get empty ivf task history - success', async () => {
    const res = await request(server)
      .post(url + '/history')
      .set(defaultHeaders)
      .send({
        taskId: ivfTaskSummaryTaskHistoryWithoutChangesFixture.uuid,
        sortByField: ActionHistorySortByFieldEnum.EditedBy,
        sortOrder: SortOrder.Asc,
      })

    expect(res.status).toBe(HttpStatus.OK)

    const resObj = res.body.data as GetHistoryResponseDTO
    expect(resObj).toMatchObject({
      patient: {
        id: patientToManuallySetCohortDateFixture.uuid,
        fullName: `${patientToManuallySetCohortDateFixture.firstName} ${patientToManuallySetCohortDateFixture.lastName}`,
      },
    })
  })
  it('Should retrieve IVF task history for CallThePatient task', async () => {
    const res = await request(server)
      .post(url + '/history')
      .set(headers(AuthUserFixture.emailVerified))
      .send({
        taskId: ivfTaskSummaryForCallPatientFixture.uuid,
        sortByField: ActionHistorySortByFieldEnum.EditedBy,
        sortOrder: SortOrder.Asc,
      })

    expect(res.status).toBe(HttpStatus.OK)
    const historyItems = res.body.data.historyItems
    expect(historyItems.length).toBeGreaterThan(0)

    const callThePatientHistoryItem = historyItems.find(
      (item) => item.entityTitle === 'Call The Patient',
    )

    expect(callThePatientHistoryItem).toBeDefined()
    expect(callThePatientHistoryItem.changes).toEqual(ivfTaskHistoryForCallPatientFixture.changes)
  })
})
