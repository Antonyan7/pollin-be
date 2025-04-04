import {testPubSubEvent} from '@functions-types'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  createPatientCohortDateChangeSeeds,
  destroyPatientCohortDateChangeSeeds,
  partnerWithLatestNormalResult,
  partnerWithProcessTestTypeAbnormalResult,
  partnerWithTestResultMeasurementAbnormalResult,
  patientFixture,
  patientPlanCohortFixture,
  profileAlertFixtures,
  testResultForAbnormalTestWithProcessTypeFixture,
  testResultForOldAbnormalTestWithProcessTypeFixture,
  testResultMeasurementAbnormalFixture,
  testResultMeasurementNormalFixture,
  testTypeWithProcessTypeFixture,
} from './seeds/cohort-date-changed.seeds'
import {DataSource} from 'typeorm'
import {PatientProfileAlertSeed, TestResultMeasurementSeed, TestResultSeed} from '@seeds/typeorm'
import {patientProfileAlertsUpdateOnCohortStartDate} from '@firebase-platform/functions/patients/src/handlers/update-patient-profile-alerts'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {PatientPlanCohortStartDateUpdatedSchema} from '@libs/common/model/proto-schemas/patient-plan-cohort-start-date-updated.schema'
import {FinalResultType, TestResultMeasurementType} from '@libs/data-layer/apps/clinic-test/enums'
import {TestResultRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'

jest.setTimeout(20000)
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
jest.mock('@libs/common/adapters/pubsub.adapter')

describe('Firebase Function: update patient profile alerts', () => {
  let dataSource: DataSource

  let patientProfileAlertSeed: PatientProfileAlertSeed
  let testResultSeed: TestResultSeed
  let testResultMeasurementSeed: TestResultMeasurementSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientProfileAlertSeed = new PatientProfileAlertSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testResultMeasurementSeed = new TestResultMeasurementSeed(dataSource)

    await createPatientCohortDateChangeSeeds(dataSource)
  })

  it('Should create patient profile alerts - success', async () => {
    const spyOnResultFetch = jest.spyOn(TestResultRepository.prototype, 'findForPriming')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientPlanCohortId: patientPlanCohortFixture.id,
        },
        PatientPlanCohortStartDateUpdatedSchema,
      ),
    )

    await patientProfileAlertsUpdateOnCohortStartDate(message)

    expect(spyOnResultFetch).toBeCalledWith(partnerWithLatestNormalResult.id, [
      testTypeWithProcessTypeFixture.id,
    ])
    spyOnResultFetch.mockClear()

    const alerts = await patientProfileAlertSeed.findByPatientId(patientFixture.id)
    expect(alerts.length).toBe(2)
    expect(alerts).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          profileAlertId: profileAlertFixtures[0].id,
          patientId: patientFixture.id,
          partnerId: partnerWithTestResultMeasurementAbnormalResult.id,
        }),
        expect.objectContaining({
          profileAlertId: profileAlertFixtures[1].id,
          patientId: patientFixture.id,
          partnerId: partnerWithProcessTestTypeAbnormalResult.id,
        }),
      ]),
    )
  })

  it('Should update test results final results values to mirror values and update profile alerts  - success', async () => {
    await Promise.all([
      testResultMeasurementSeed.updateResultTypeById(
        testResultMeasurementAbnormalFixture.id,
        TestResultMeasurementType.Normal,
      ),
      testResultSeed.updateFinalResultById(
        testResultForAbnormalTestWithProcessTypeFixture.id,
        FinalResultType.Normal,
      ),
      testResultSeed.updateFinalResultById(
        testResultForOldAbnormalTestWithProcessTypeFixture.id,
        FinalResultType.Normal,
      ),
      testResultMeasurementSeed.updateResultTypeById(
        testResultMeasurementNormalFixture.id,
        TestResultMeasurementType.Abnormal,
      ),
    ])

    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          patientPlanCohortId: patientPlanCohortFixture.id,
        },
        PatientPlanCohortStartDateUpdatedSchema,
      ),
    )

    await patientProfileAlertsUpdateOnCohortStartDate(message)

    const alerts = await patientProfileAlertSeed.findByPatientId(patientFixture.id)
    expect(alerts.length).toBe(1)
    expect(alerts[0]).toMatchObject({
      profileAlertId: profileAlertFixtures[1].id,
      patientId: patientFixture.id,
      partnerId: partnerWithLatestNormalResult.id,
    })
  })

  afterAll(async () => {
    await patientProfileAlertSeed.removeByPatientId(patientFixture.id)
    await destroyPatientCohortDateChangeSeeds(dataSource)
    await dataSource.destroy()

    jest.clearAllMocks()
  })
})
