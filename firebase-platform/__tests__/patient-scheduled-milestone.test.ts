import {patientDateOfBirth} from './fixtures/questionnaire.fixture'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {PatientSeed, PlanTypeSeed} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {patientScheduledMilestonesHandler} from '../functions/patients/src/handlers/patient-scheduled-milestones'
import {PatientScheduledMilestoneSeed} from '@seeds/typeorm/patient-scheduled-milestone.seed'
import {PatientPlanSeed} from '@seeds/typeorm/patient-plan.seed'
import {PatientPlanStatusSeed} from '@seeds/typeorm'
import {PlanCategorySeed} from '@seeds/typeorm/plan-category.seed'
import {PatientMilestoneSeed} from '@seeds/typeorm/patient-milestone.seed'
import {PatientMilestoneType} from '@libs/services-common/enums/milestone.enum'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

jest.setTimeout(10000)
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const authUserId = 'CF_Scheduled_Milestone_Auth_User_Id'

const patientSeedData = {
  id: 83,
  authUserId: authUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}

const planCategoryData = {
  id: 3,
  uuid: 'b7b63f4f-bb93-46b2-2b15-f56506f994c4',
  title: 'planCategory',
}

const patientPlanStatusData = {
  id: 13,
  patientStatusAbbreviation: 'patientPlanStatusTestData',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 1,
}

const planTypeData: Partial<PlanType> = {
  id: 53,
  uuid: 'b8b66f4f-bb93-46b2-8b15-f51506f994kk',
  planCategoryId: planCategoryData.id,
  automaticMilestoneToReportPeriod: false,
  patientPlanStatusId: patientPlanStatusData.id,
}

const patientPlanData = {
  id: 73,
  uuid: '805dca65-18ee-47e7-89db-1d9347cc5b00',
  planTypeId: planTypeData.id,
  patientId: patientSeedData.id,
  status: PlanStatusEnum.ReadyForActivation,
}

const patientScheduledMilestoneData = {
  id: 11,
  patientPlanId: patientPlanData.id,
  date: dateTimeUtil.now(),
}

describe('Firebase Function: patient scheduled milestones', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let patientScheduledMilestoneSeed: PatientScheduledMilestoneSeed
  let patientPlanSeed: PatientPlanSeed
  let planTypeSeed: PlanTypeSeed
  let planCategorySeed: PlanCategorySeed
  let patientPlanStatusSeed: PatientPlanStatusSeed
  let patientMilestoneSeed: PatientMilestoneSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)
    planTypeSeed = new PlanTypeSeed(dataSource)
    planCategorySeed = new PlanCategorySeed(dataSource)
    patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
    patientScheduledMilestoneSeed = new PatientScheduledMilestoneSeed(dataSource)
    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)

    await patientSeed.create(patientSeedData)
    await planCategorySeed.create(planCategoryData)
    await patientPlanStatusSeed.create(patientPlanStatusData)
    await planTypeSeed.create(planTypeData)
    await patientPlanSeed.create(patientPlanData)
    await patientScheduledMilestoneSeed.create(patientScheduledMilestoneData)
  })

  test('Should push patient scheduled milestones', async () => {
    const spyPublishReportPeriodMilestonePushed = jest.spyOn(
      PubSubHelpers,
      'publishReportPeriodMilestonePushed',
    )

    await patientScheduledMilestonesHandler()
    const patientMilestones = await patientMilestoneSeed.findByPatientPlanIdAndType(
      patientPlanData.id,
      PatientMilestoneType.PlanReportPeriod,
    )
    expect(patientMilestones.length).toBeTruthy()

    expect(spyPublishReportPeriodMilestonePushed).toBeCalledWith({
      patientMilestoneId: patientMilestones[0].id,
    })

    spyPublishReportPeriodMilestonePushed.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientSeed.removePatientByAuthUserId(authUserId)
    await patientScheduledMilestoneSeed.removeById(patientScheduledMilestoneData.id)
    await patientPlanSeed.removeById(patientPlanData.id)
    await planTypeSeed.removeById(planTypeData.id)
    await patientPlanStatusSeed.removeById(patientPlanStatusData.id)
    await planCategorySeed.removeById(planCategoryData.id)
  })
})
