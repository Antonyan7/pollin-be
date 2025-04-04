import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {
  createIVFLabSpecimenSeeds,
  destroyIVFLabSpecimenFixtures,
  patientPlanToCancelCohortFixture,
  patientPlanToCompleteCohortFixture,
  staffFixture,
  patientForIVFFixture,
  cryoSampleContainerForCompletedThawedIVFFixture,
  cryoSampleContainerForCompletedIVFFixture,
  transportFolderFixture,
  cryoSampleContainerForCancelledFixture,
  testTypeGTFixture,
  testTypePGTAFixture,
  testTypePGTMFixture,
  labFixture,
  observationTypeFixture,
  observationTypeOptionalFixture,
  testOrderForIVFFixture,
} from './seeds'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {testPubSubEvent} from '@functions-types'
import {CryoSampleContainerSeed, SpecimenSeed, TestOrderSeed, TestResultSeed} from '@seeds/typeorm'
import {
  IVFLabPlanUpdatedPubSubPayload,
  IVFLabPlanUpdatedSchema,
} from '@libs/common/model/proto-schemas/ivf-lab-plan-updated.schema'
import {handlerGenerateSpecimensForLabIVF} from '@firebase-platform/functions/test-orders-and-results/src/ivf/ivf-specimen-generation.handler'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {NestprojectConfigService} from '@libs/common'
import {
  SpecimenProcessingLocation,
  SpecimenStatus,
  TestOrderStatusEnum,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {PubSubAdapter} from '@libs/common/adapters'
import {
  SpecimensCollectedPubSubPayload,
  SpecimensCollectedSchema,
} from '@libs/common/model/proto-schemas/specimens-collected.schema'
import {handlerGenerateTestResultAndObservationsForSpecimens} from '@firebase-platform/functions/test-orders-and-results/src/create-results-observations-for-specimen/handler'
import {TestResultHistorySeed} from '@seeds/firestore/test-result-history.seed'
import {ResultPropertyName} from '@libs/data-layer/apps/clinic-test/entities/fireorm'

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
jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')

describe('Firebase Function Service: IVF specimen & results generation', () => {
  let dataSource: DataSource

  let specimenSeed: SpecimenSeed
  let cryoSampleContainerSeed: CryoSampleContainerSeed
  let testResultSeed: TestResultSeed
  let testResultHistorySeed: TestResultHistorySeed
  let testOrderSeed: TestOrderSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    await createIVFLabSpecimenSeeds(dataSource)

    specimenSeed = new SpecimenSeed(dataSource)
    cryoSampleContainerSeed = new CryoSampleContainerSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testResultHistorySeed = new TestResultHistorySeed()
    testOrderSeed = new TestOrderSeed(dataSource)
  })

  it('should not create specimens for cancelled plan', async () => {
    const payload: Partial<IVFLabPlanUpdatedPubSubPayload> = {
      patientPlanId: patientPlanToCancelCohortFixture.id,
      oldStatus: IVFLabStatus.Active,
      newStatus: IVFLabStatus.Cancelled,
      authUserId: staffFixture.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(payload, IVFLabPlanUpdatedSchema))

    await handlerGenerateSpecimensForLabIVF(message)

    const specimens = await specimenSeed.getByPatientId(patientPlanToCancelCohortFixture.patientId)
    expect(specimens.length).toBe(0)
  })

  it('should generate specimens', async () => {
    const spyOnPublish = jest.spyOn(PubSubAdapter.prototype, 'publishWithSchema')

    const payload: Partial<IVFLabPlanUpdatedPubSubPayload> = {
      patientPlanId: patientPlanToCompleteCohortFixture.id,
      oldStatus: IVFLabStatus.Active,
      newStatus: IVFLabStatus.Completed,
      authUserId: staffFixture.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(payload, IVFLabPlanUpdatedSchema))

    await handlerGenerateSpecimensForLabIVF(message)

    const specimens = await specimenSeed.findByPatientIdWithTests(
      patientPlanToCancelCohortFixture.patientId,
    )

    expect(specimens.length).toBe(1)
    const specimen = specimens[0]
    expect(specimen).toMatchObject({
      patientId: patientForIVFFixture.id,
      specimenIdentifier: expect.stringContaining(
        NestprojectConfigService.getInstance().get('SPECIMEN_ID_PREFIX'),
      ),
      serviceTypeId: null,
      testResultGenerated: false,
      staffUserId: staffFixture.id,
      machineId: null,
      processingLocation: null,
      transportFolderId: null,
      storageLocationId: null,
      collectedOn: expect.any(Date),
      status: SpecimenStatus.Collected,
      revisionId: expect.any(String),
    })
    expect(specimen.specimenTests.length).toBe(3)
    expect(specimen.specimenTests).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          testTypeId: testTypeGTFixture.id,
        }),
        expect.objectContaining({
          testTypeId: testTypePGTAFixture.id,
        }),
        expect.objectContaining({
          testTypeId: testTypePGTMFixture.id,
        }),
      ]),
    )

    const [containerWithoutSpecimen, updatedContainer] = await Promise.all([
      cryoSampleContainerSeed.findByIdentifier(
        cryoSampleContainerForCompletedThawedIVFFixture.identifier,
      ),
      cryoSampleContainerSeed.findByIdentifier(
        cryoSampleContainerForCompletedIVFFixture.identifier,
      ),
    ])

    expect(containerWithoutSpecimen.specimenId).toBeNull()
    expect(updatedContainer.specimenId).toBeTruthy()

    expect(spyOnPublish).toHaveBeenCalledWith(
      expect.objectContaining({
        specimens: [
          {
            uuid: specimen.uuid,
            appointmentUUID: null,
          },
        ],
      }),
      SpecimensCollectedSchema,
    )

    const testOrder = await testOrderSeed.findById(testOrderForIVFFixture.id)
    expect(testOrder.status).toBe(TestOrderStatusEnum.AwaitingResults)
  })

  it('should create specimen test results & observations', async () => {
    const specimens = await specimenSeed.findByPatientIdWithTests(
      patientPlanToCompleteCohortFixture.patientId,
    )
    const payload: Partial<SpecimensCollectedPubSubPayload> = {
      specimens: [{uuid: specimens[0].uuid, appointmentUUID: null}],
    }
    const message = testPubSubEvent(encodePubSubMessage(payload, SpecimensCollectedSchema))

    await handlerGenerateTestResultAndObservationsForSpecimens(message)

    const testResults = await testResultSeed.findWithObservationsByPatientPlanId(
      patientPlanToCompleteCohortFixture.id,
    )

    expect(testResults.length).toBe(2)
    expect(testResults).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          labId: labFixture.id,
          testTypeId: testTypePGTAFixture.id,
          testResultKind: TestResultKind.TestType,
          patientId: patientForIVFFixture.id,
          specimenId: specimens[0].id,
          orderingPhysicianId: patientForIVFFixture.serviceProviderId,
          observations: [
            expect.objectContaining({
              observationTypeId: observationTypeFixture.id,
              specimenId: specimens[0].id,
            }),
          ],
        }),
        expect.objectContaining({
          labId: labFixture.id,
          testTypeId: testTypePGTMFixture.id,
          testResultKind: TestResultKind.TestType,
          patientId: patientForIVFFixture.id,
          specimenId: specimens[0].id,
          orderingPhysicianId: patientForIVFFixture.serviceProviderId,
          observations: expect.arrayContaining([
            expect.objectContaining({
              observationTypeId: observationTypeFixture.id,
              specimenId: specimens[0].id,
            }),
            expect.objectContaining({
              observationTypeId: observationTypeOptionalFixture.id,
              specimenId: specimens[0].id,
            }),
          ]),
        }),
      ]),
    )

    const updatedSpecimens = await specimenSeed.findByPatientIdWithTests(
      patientPlanToCompleteCohortFixture.patientId,
    )
    expect(updatedSpecimens[0].testResultGenerated).toBeTruthy()

    const historyRecords = await testResultHistorySeed.findByTestResultId(testResults[0].id)

    const [historyItem] = historyRecords
    expect(historyItem.changes).toMatchObject([
      {
        propertyName: ResultPropertyName.Status,
        from: '-',
        to: TestResultStatus.Pending,
      },
    ])

    /**Same message */
    await handlerGenerateTestResultAndObservationsForSpecimens(message)
    const resultsAfter2ndRequest = await testResultSeed.findWithObservationsByPatientPlanId(
      patientPlanToCompleteCohortFixture.id,
    )
    expect(resultsAfter2ndRequest[0].observations[0].valueString).toBe(
      cryoSampleContainerForCompletedIVFFixture.freezeComment,
    )
    /**Doesn't change */
    expect(resultsAfter2ndRequest.length).toBe(2)
  })

  it('should create specimens and put into transport folder', async () => {
    const payload: Partial<IVFLabPlanUpdatedPubSubPayload> = {
      patientPlanId: patientPlanToCancelCohortFixture.id,
      oldStatus: IVFLabStatus.Active,
      transportFolderId: transportFolderFixture.id,
      newStatus: IVFLabStatus.Completed,
      authUserId: staffFixture.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(payload, IVFLabPlanUpdatedSchema))

    await handlerGenerateSpecimensForLabIVF(message)

    const specimens = await specimenSeed.getByPatientId(patientPlanToCancelCohortFixture.patientId)

    expect(specimens.length).toBeGreaterThanOrEqual(1)
    expect(specimens).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          patientId: patientForIVFFixture.id,
          specimenIdentifier: expect.stringContaining(
            NestprojectConfigService.getInstance().get('SPECIMEN_ID_PREFIX'),
          ),
          testResultGenerated: false,
          staffUserId: staffFixture.id,
          processingLocation: SpecimenProcessingLocation.TransportOutside,
          transportFolderId: transportFolderFixture.id,
          storageLocationId: null,
          collectedOn: expect.any(Date),
          status: SpecimenStatus.ReadyForTransport,
          revisionId: expect.any(String),
        }),
      ]),
    )

    const updatedContainer = await cryoSampleContainerSeed.findByIdentifier(
      cryoSampleContainerForCancelledFixture.identifier,
    )
    expect(updatedContainer.specimenId).toBeTruthy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await destroyIVFLabSpecimenFixtures(dataSource)
  })
})
