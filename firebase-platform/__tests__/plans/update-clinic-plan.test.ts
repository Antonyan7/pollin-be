import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {
  createClinicPlanFixtures,
  destroyClinicPlanFixtures,
  ivfAddonDishNew,
  ivfAddonDishOld,
  ivfTaskSummaryForFertilizationICSIFixture,
  ivfTaskSummaryForFertilizationIVFFixture,
  ivfTaskSummaryForInjectionAssignmentFertiDirectiveFixture,
  patientPlanV2ForInjectionAssignmentFixture,
  patientPlanV3ToUpdateFertilizationFixture,
} from './seeds/update-clinic-plan.seeds'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {testPubSubEvent} from '@functions-types'
import {PatientPlanUpdatedSchema} from '@libs/common/model/proto-schemas/patient-plan-updated.schema'
import {updatePlansHandler} from '@firebase-platform/functions/plans/src/handlers/update-clinic-plan.handler'
import {IvfTaskSummarySeed, PatientPlanCohortIvfDishSeed} from '@seeds/typeorm'

jest.setTimeout(10000)
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

describe('Firebase Function Service: Update clinic plan', () => {
  let dataSource: DataSource
  let ivfTaskSummarySeed: IvfTaskSummarySeed
  let patientPlanCohortIvfDishSeed: PatientPlanCohortIvfDishSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    await createClinicPlanFixtures(dataSource)
    ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
    patientPlanCohortIvfDishSeed = new PatientPlanCohortIvfDishSeed(dataSource)
  })

  it('should update clinic plan', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {patientPlanId: patientPlanV3ToUpdateFertilizationFixture.id},
        PatientPlanUpdatedSchema,
      ),
    )

    const icsiBefore = await ivfTaskSummarySeed.findOneById(
      ivfTaskSummaryForFertilizationICSIFixture.id,
    )
    const ivfBefore = await ivfTaskSummarySeed.findOneById(
      ivfTaskSummaryForFertilizationIVFFixture.id,
    )
    expect(icsiBefore.disabledAt).not.toBeNull()
    expect(ivfBefore.disabledAt).toBeNull()
    await updatePlansHandler(message)
    const icsiAfter = await ivfTaskSummarySeed.findOneById(
      ivfTaskSummaryForFertilizationICSIFixture.id,
    )
    const ivfAfter = await ivfTaskSummarySeed.findOneById(
      ivfTaskSummaryForFertilizationIVFFixture.id,
    )
    expect(icsiAfter.disabledAt).toBeNull()
    expect(ivfAfter.disabledAt).not.toBeNull()

    // expect dish of old addon to be disabled
    const oldDish = await patientPlanCohortIvfDishSeed.patientPlanCohortIvfDish.findOne({
      where: {ivfDishId: ivfAddonDishOld.id},
    })
    expect(oldDish?.disabledAt).toBeTruthy()

    // expect new dish to be created for given addon
    const newDish = await patientPlanCohortIvfDishSeed.patientPlanCohortIvfDish.findOne({
      where: {ivfDishId: ivfAddonDishNew.id},
    })
    expect(newDish).toBeTruthy()
  })

  it('should update clinic plan for disabling injection assesment', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {patientPlanId: patientPlanV2ForInjectionAssignmentFixture.id},
        PatientPlanUpdatedSchema,
      ),
    )
    const injectionAssignmentBefore = await ivfTaskSummarySeed.findOneById(
      ivfTaskSummaryForInjectionAssignmentFertiDirectiveFixture.id,
    )
    expect(injectionAssignmentBefore.disabledAt).toBeNull()

    await updatePlansHandler(message)
    const injectionAssignmentAfter = await ivfTaskSummarySeed.findOneById(
      ivfTaskSummaryForInjectionAssignmentFertiDirectiveFixture.id,
    )
    expect(injectionAssignmentAfter.disabledAt).not.toBeNull()
  })
  afterAll(async () => {
    jest.clearAllMocks()
    await destroyClinicPlanFixtures(dataSource)
  })
})
