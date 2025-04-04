import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {
  createIVFLabSeeds,
  destroyIVFLabFixtures,
  patientPlanCohortForCheckCancelledNonViableFixture,
  patientPlanCohortForCheckUpcomingNonViableFixture,
  patientPlanCohortForCheckUpcomingViableFixture,
} from './seeds'
import {PatientPlanCohortSeed} from '@seeds/typeorm'
import {checkUpcomingCohortsHandler} from '@firebase-platform/functions/ivf-lab/src/handlers/check-upcoming-cohorts'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'

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

describe('Firebase Function Service: Check upcoming cohorts', () => {
  let dataSource: DataSource

  let patientPlanCohortSeed: PatientPlanCohortSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createIVFLabSeeds(dataSource)

    patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  })

  it('should update plan ivf statuses - success', async () => {
    const patientPlanCohortForCheckUpcomingViable = await patientPlanCohortSeed.findById(
      patientPlanCohortForCheckUpcomingViableFixture.id,
    )
    const patientPlanCohortForCheckUpcomingNonViable = await patientPlanCohortSeed.findById(
      patientPlanCohortForCheckUpcomingNonViableFixture.id,
    )
    const patientPlanCohortForCheckCancelledNonViable = await patientPlanCohortSeed.findById(
      patientPlanCohortForCheckCancelledNonViableFixture.id,
    )

    expect(patientPlanCohortForCheckUpcomingViable.patientPlan.ivfLabStatus).toBe(
      IVFLabStatus.Upcoming,
    )
    expect(patientPlanCohortForCheckUpcomingNonViable.patientPlan.ivfLabStatus).toBe(
      IVFLabStatus.Upcoming,
    )
    expect(patientPlanCohortForCheckCancelledNonViable.patientPlan.ivfLabStatus).toBe(
      IVFLabStatus.Cancelled,
    )

    await checkUpcomingCohortsHandler()

    const patientPlanCohortForCheckUpcomingViableAfterUpdate = await patientPlanCohortSeed.findById(
      patientPlanCohortForCheckUpcomingViableFixture.id,
    )
    const patientPlanCohortForCheckUpcomingNonViableAfterUpdate =
      await patientPlanCohortSeed.findById(patientPlanCohortForCheckUpcomingNonViableFixture.id)
    const patientPlanCohortForCheckCancelledNonViableAfterUpdate =
      await patientPlanCohortSeed.findById(patientPlanCohortForCheckCancelledNonViableFixture.id)

    expect(patientPlanCohortForCheckUpcomingViableAfterUpdate.patientPlan.ivfLabStatus).toBe(
      IVFLabStatus.Active,
    )
    expect(patientPlanCohortForCheckUpcomingNonViableAfterUpdate.patientPlan.ivfLabStatus).toBe(
      IVFLabStatus.Upcoming,
    )
    expect(patientPlanCohortForCheckCancelledNonViableAfterUpdate.patientPlan.ivfLabStatus).toBe(
      IVFLabStatus.Cancelled,
    )
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await destroyIVFLabFixtures(dataSource)
  })
})
