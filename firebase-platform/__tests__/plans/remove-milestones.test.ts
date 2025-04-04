import {PatientMilestoneSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createPatientPlanStatusUpdatedFixtures,
  destroyPatientPlanStatusUpdatedFixtures,
  patientMilestoneReportPeriodPastFixture,
  patientMilestoneReportPeriodUpcomingFixture,
  patientPlanFixture,
} from './seeds/plan-status-change.seeds'
import {removePlanMilestonesHandler} from '@firebase-platform/functions/plans/src/handlers/remove-plan-milestones.handler'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {PatientPlanStatusUpdatedSchema} from '@libs/common/model/proto-schemas/patient-plan-status-updated.schema'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

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
jest.setTimeout(10000)

describe('Remove milestones on plan status change', () => {
  let dataSource: DataSource

  let patientMilestoneSeed: PatientMilestoneSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createPatientPlanStatusUpdatedFixtures(dataSource)

    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
  })

  test('should not remove report period milestone - plan was not cancelled', async () => {
    const data = {
      patientPlanId: patientPlanFixture.id,
      newStatus: PlanStatusEnum.Active,
      oldStatus: PlanStatusEnum.ReadyForActivation,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PatientPlanStatusUpdatedSchema))
    await removePlanMilestonesHandler(message)

    const upcomingMilestone = await patientMilestoneSeed.findById(
      patientMilestoneReportPeriodUpcomingFixture.id,
    )
    expect(upcomingMilestone).toBeTruthy()

    const pastMilestone = await patientMilestoneSeed.findById(
      patientMilestoneReportPeriodPastFixture.id,
    )
    expect(pastMilestone).toBeTruthy()
  })

  test('should remove upcoming period milestone and dont touch past milestone - success', async () => {
    const data = {
      patientPlanId: patientPlanFixture.id,
      newStatus: PlanStatusEnum.Cancelled,
      oldStatus: PlanStatusEnum.ReadyForActivation,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PatientPlanStatusUpdatedSchema))

    await removePlanMilestonesHandler(message)

    const upcomingMilestone = await patientMilestoneSeed.findById(
      patientMilestoneReportPeriodUpcomingFixture.id,
    )
    expect(upcomingMilestone).toBeFalsy()

    const pastMilestone = await patientMilestoneSeed.findById(
      patientMilestoneReportPeriodPastFixture.id,
    )
    expect(pastMilestone).toBeTruthy()
  })

  afterAll(async () => {
    await destroyPatientPlanStatusUpdatedFixtures(dataSource)
    await dataSource.destroy()
  })
})
