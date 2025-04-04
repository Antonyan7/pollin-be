import request = require('supertest')
import {
  appointmentBookedStatusFixture,
  AuthUserFixture,
  ivfPatientFemaleFixture,
  patientForIVFTasks1Fixture,
  patientForPlansV3Fixture,
  patientForStimCycleDetailsFixture,
  patientPlanCohortCompletedPlanFixture,
  patientPlanCohortForCompleteFixture,
  patientPlanCohortForOrderFirstFixture,
  patientWithActivePlanForOrderSecondFixture,
  serviceTypeFixture,
} from '@libs/common/test/fixtures'
import {headers} from '@libs/common/test/utils/headers'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {DateTimeUtil} from '@libs/common'
import {
  GetIvfCohortsResponseV3DTO,
  IVFLabPatientsSortField,
} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import {
  IvfLabDayEnumLabels,
  IVFLabPatientsSortFieldV2,
  IvfPatientFilterType,
} from '@libs/services-common/enums'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {HttpStatus} from '@nestjs/common'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {patientPlanV3CompletedWithCohortFixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {
  patientProfileAlertAbnormalForSequenceFixture,
  patientProfileAlertAbnormalPartnerResultFixture,
} from '@libs/common/test/fixtures/patient-profile-alert.fixture'
import {
  profileAlertAbnormalGroupFixture,
  profileAlertAbnormalSpermFixture,
} from '@libs/common/test/fixtures/profile-alert.fixture'
import {ProfileAlertTypeTitle} from '@libs/data-layer/apps/users/enum'
import {ResponseWrapper} from '@libs/services-common/dto/response-wrapper.dto'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)
const dateTimeUtil = new DateTimeUtil()

// eslint-disable-next-line max-lines-per-function
describe('Getting IVF patient v3 tests', () => {
  const url = '/v3/patients'
  let server

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9114, TestModuleType.ClinicPortalService)
    server = testModule.server
  })

  it('should get patients with IVF: Success', async () => {
    const currentPage = 1
    const res = await request(server).post(`${url}/list`).set(defaultHeaders).send({
      page: currentPage,
      sortByField: IVFLabPatientsSortField.CohortStartDate,
      sortOrder: SortOrder.Desc,
      searchString: null,
      pageSize: null,
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.pageSize).toBe(25)
    expect(res.body.currentPage).toBe(currentPage)
    expect(res.body.totalItems).toBeGreaterThanOrEqual(res.body.data.cohorts.length)

    const resObj = res.body.data as GetIvfCohortsResponseV3DTO

    //Checking sorting with cohortStartDate
    expect(resObj.cohorts[0].cohortStartDate.date).toBeTruthy()
    expect(resObj.cohorts[0].cohortStartDate.lastCohortUpdateDate).toBeDefined()

    const patientWithCohortDate = resObj.cohorts.find(
      ({patient}) => patient.id === patientWithActivePlanForOrderSecondFixture.uuid,
    )
    expect(patientWithCohortDate).toMatchObject({
      id: patientPlanCohortForOrderFirstFixture.uuid,
      cohortStartDate: expect.objectContaining({
        label: IvfLabDayEnumLabels.DayTwo,
        date: dateTimeUtil.formatDateYMD(
          dateTimeUtil.addDays(
            dateTimeUtil.toDate(patientPlanCohortForOrderFirstFixture.cohortDate),
            2,
          ),
        ),
        isEditable: true,
      }),
      patient: expect.objectContaining({
        alerts: [
          {
            id: patientProfileAlertAbnormalForSequenceFixture.uuid,
            typeId: profileAlertAbnormalSpermFixture.type,
            typeTitle: ProfileAlertTypeTitle[profileAlertAbnormalSpermFixture.type],
            message: `${profileAlertAbnormalSpermFixture.text} for ${patientForIVFTasks1Fixture.firstName} ${patientForIVFTasks1Fixture.lastName} (partner)`,
          },
          {
            id: patientProfileAlertAbnormalPartnerResultFixture.uuid,
            typeId: profileAlertAbnormalGroupFixture.type,
            typeTitle: ProfileAlertTypeTitle[profileAlertAbnormalGroupFixture.type],
            message: `${profileAlertAbnormalGroupFixture.text} for ${patientForStimCycleDetailsFixture.firstName} ${patientForStimCycleDetailsFixture.lastName} (partner)`,
          },
        ],
      }),
      procedures: [
        {
          id: appointmentBookedStatusFixture.uuid,
          title: serviceTypeFixture.name,
          date: dateTimeUtil.formatUTCDateInRFC3339Tz(appointmentBookedStatusFixture.start),
        },
      ],
    })

    const patientWithCompletedPlan = resObj.cohorts.find(
      ({id}) => id === patientPlanCohortCompletedPlanFixture.uuid,
    )

    expect(patientWithCompletedPlan.plan.id).toBe(patientPlanV3CompletedWithCohortFixture.uuid)
  })

  it('should get patients with IVF and check sorting by field: Success', async () => {
    const currentPage = 1
    const resSortedByCohort = await request(server).post(`${url}/list`).set(defaultHeaders).send({
      page: currentPage,
      pageSize: 10,
      sortByField: IVFLabPatientsSortFieldV2.CohortStartDate,
      sortOrder: SortOrder.Desc,
      searchString: null,
    })

    expect(resSortedByCohort.body.pageSize).toBe(10)
    expect(resSortedByCohort.body.data.cohorts[1].patient.fullName).toBe(
      `${patientForPlansV3Fixture.firstName} ${patientForPlansV3Fixture.lastName}`,
    )
  })

  it('should get patients with IVF and search: Success', async () => {
    const currentPage = 1
    const resWithSearch = await request(server).post(`${url}/list`).set(defaultHeaders).send({
      page: currentPage,
      sortByField: IVFLabPatientsSortFieldV2.CohortStartDate,
      sortOrder: SortOrder.Desc,
      searchString: 'Last Name - 1213',
      pageSize: null,
    })

    expect(resWithSearch.body.data.cohorts[0].patient.fullName).toBe(
      `${patientForIVFTasks1Fixture.firstName} ${patientForIVFTasks1Fixture.lastName}`,
    )
  })

  it('should get patients with IVF and filters: Success', async () => {
    const currentPage = 1
    const resWithSearch = await request(server)
      .post(`${url}/list`)
      .set(defaultHeaders)
      .send({
        page: currentPage,
        sortByField: IVFLabPatientsSortFieldV2.CohortStartDate,
        sortOrder: SortOrder.Desc,
        searchString: null,
        dateFilter: {startDate: null, endDate: null},
        filters: [
          {
            id: IVFLabStatus.AwaitingBiopsyResults,
            type: IvfPatientFilterType.Status,
          },
        ],
        pageSize: null,
      })

    expect(resWithSearch.body.data.cohorts[0].patient.fullName).toBe(
      `${ivfPatientFemaleFixture.firstName} ${ivfPatientFemaleFixture.lastName}`,
    )
  })

  it('should get patients with IVF and start and end dates: Success', async () => {
    const now = dateTimeUtil.now()
    const startDate = dateTimeUtil.formatDateYMD(dateTimeUtil.addMonths(now, -1))
    const endDate = dateTimeUtil.formatDateYMD(dateTimeUtil.addMonths(now, 1))
    const res: {body: ResponseWrapper<GetIvfCohortsResponseV3DTO>} = await request(server)
      .post(`${url}/list`)
      .set(defaultHeaders)
      .send({
        page: 1,
        sortByField: IVFLabPatientsSortFieldV2.CohortStartDate,
        sortOrder: SortOrder.Desc,
        searchString: null,
        dateFilter: {startDate, endDate},
        pageSize: null,
      })

    const cohortForComplete = res.body.data.cohorts.find(
      (cohort) => cohort.id === patientPlanCohortForCompleteFixture.uuid,
    )
    expect(cohortForComplete).toBeTruthy()
  })

  it('should get patients with IVF and end date (-5 years): Success', async () => {
    const endDate = dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), -5))
    const res: {body: ResponseWrapper<GetIvfCohortsResponseV3DTO>} = await request(server)
      .post(`${url}/list`)
      .set(defaultHeaders)
      .send({
        page: 1,
        sortByField: IVFLabPatientsSortFieldV2.CohortStartDate,
        sortOrder: SortOrder.Desc,
        searchString: null,
        dateFilter: {startDate: null, endDate},
        pageSize: null,
      })
    const cohortStartDates = res.body.data.cohorts.map((cohort) => cohort.cohortStartDate.date)
    expect(cohortStartDates.length).toBeGreaterThanOrEqual(1)
    const endDateTimestamp = Number(dateTimeUtil.parseISO(endDate))
    cohortStartDates.forEach((date) => {
      const timestamp = Number(dateTimeUtil.parseISO(date))
      expect(timestamp).toBeLessThanOrEqual(endDateTimestamp)
    })
  })

  it('should get patients with IVF and start date (+5 years): Success', async () => {
    const startDate = dateTimeUtil.formatDateYMD(dateTimeUtil.addYear(dateTimeUtil.now(), 5))
    const res: {body: ResponseWrapper<GetIvfCohortsResponseV3DTO>} = await request(server)
      .post(`${url}/list`)
      .set(defaultHeaders)
      .send({
        page: 1,
        sortByField: IVFLabPatientsSortFieldV2.CohortStartDate,
        sortOrder: SortOrder.Desc,
        searchString: null,
        dateFilter: {startDate, endDate: null},
        pageSize: null,
      })
    const cohortStartDates = res.body.data.cohorts.map((cohort) => cohort.cohortStartDate.date)
    expect(cohortStartDates.length).toBeGreaterThanOrEqual(1)
    const startDateTimestamp = Number(dateTimeUtil.parseISO(startDate))
    cohortStartDates.forEach((date) => {
      const timestamp = Number(dateTimeUtil.parseISO(date))
      expect(timestamp).toBeGreaterThanOrEqual(startDateTimestamp)
    })
  })
})
