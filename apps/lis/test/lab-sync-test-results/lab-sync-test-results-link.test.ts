import request = require('supertest')
import {DataSource, Equal} from 'typeorm'
import {LisAppModule} from '@apps/lis'
import {ClientHeaders, DefaultValue} from '@libs/common/enums'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {
  AuthUserFixture,
  patientForTestResultAuthFixture,
  testResultPendingLifeLabB12Fixture,
  labSyncOBRLifeLabsB12,
  patientForProfileOverviewMaleFixture,
  testResultReviewedFixture,
  patientForProfileTestResultsFixture,
  labSyncOBXLifeLabB12Unlinked,
} from '@libs/common/test/fixtures'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {
  LabSyncObservationRequestRepository,
  TestResultAttachmentRepository,
  TestResultMeasurementRepository,
  TestResultRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {testResultMeasurementLifeLabB12Fixture} from '@libs/common/test/fixtures/test-result-measurement.fixture'
import {LabSyncObservationRequestStatusHistoryRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/lab-sync-observation-request-status-history.repository'
import {LinkMethod, TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'

const headers = {
  ...ClientHeaders,
  accept: 'application/json',
  [ClientHeaders.IdToken]: AuthUserFixture.emailVerified.idToken,
  Cookie: `session=${AuthUserFixture.emailVerified.sessionCookie}`,
}

describe('LabSyncTestResultController@linkSyncTestResult', () => {
  const url = '/v1/lab-sync-test-results'
  let server
  let dataSource: DataSource
  let testResultRepository: TestResultRepository
  let testResultMeasurementRepository: TestResultMeasurementRepository
  let testResultAttachmentRepository: TestResultAttachmentRepository
  let OBRRepository: LabSyncObservationRequestRepository

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9161, TestModuleType.ClinicPortalService)
    server = testModule.server
    dataSource = testModule.appModule.get(DataSource)
    testResultRepository = new TestResultRepository(dataSource)
    testResultMeasurementRepository = new TestResultMeasurementRepository(dataSource)
    testResultAttachmentRepository = new TestResultAttachmentRepository(dataSource)
    OBRRepository = new LabSyncObservationRequestRepository(dataSource)
  })

  it('should successfully link Nestproject result with synchronized result', async () => {
    const spyHistory = jest.spyOn(
      LabSyncObservationRequestStatusHistoryRepository.prototype,
      'addActionHistory',
    )

    spyHistory.mockResolvedValue(null)

    const response = await request(server)
      .patch(url + `/link-result`)
      .set(headers)
      .send({
        patientId: patientForTestResultAuthFixture.uuid,
        pendingTestResultId: testResultPendingLifeLabB12Fixture.uuid,
        unlinkedTestResultId: labSyncOBRLifeLabsB12.uuid,
      })

    expect(response.status).toBe(200)

    const testResult = await testResultRepository.findOne({
      where: {id: testResultPendingLifeLabB12Fixture.id},
    })
    expect(testResult.status).toBe(TestResultStatus.WaitingCompletion)

    const filledMeasurement = await testResultMeasurementRepository.findOne({
      where: {uuid: Equal(testResultMeasurementLifeLabB12Fixture.uuid)},
    })
    expect(filledMeasurement.result).toBe(labSyncOBXLifeLabB12Unlinked.resultValue)
    expect(filledMeasurement.resultType).toBe('Abnormal')

    const attachment = await testResultAttachmentRepository.findOneBy({
      testResultId: testResultPendingLifeLabB12Fixture.id,
    })
    expect(attachment.notes).toBe(DefaultValue.Empty)

    expect(spyHistory).toHaveBeenCalled()

    const observation = await OBRRepository.findOne({where: {id: labSyncOBRLifeLabsB12.id}})
    expect(observation.linkMethod).toBe(LinkMethod.Manual)
  })

  it('should return Bad Request for invalid patient', async () => {
    const response = await request(server)
      .patch(url + `/link-result`)
      .set(headers)
      .send({
        patientId: 'InvalidPatientId',
        pendingTestResultId: testResultPendingLifeLabB12Fixture.uuid,
        unlinkedTestResultId: labSyncOBRLifeLabsB12.uuid,
      })

    expect(response.status).toBe(400)
    expect(response.body.status.message).toBe(i18Messages.INVALID_TEST_RESULT_LINK_PAYLOAD)
  })

  it('should return Bad Request if patient does not match with pendingTestResultId', async () => {
    const response = await request(server)
      .patch(url + `/link-result`)
      .set(headers)
      .send({
        patientId: patientForProfileOverviewMaleFixture.uuid,
        pendingTestResultId: testResultPendingLifeLabB12Fixture.uuid,
        unlinkedTestResultId: labSyncOBRLifeLabsB12.uuid,
      })

    expect(response.status).toBe(400)
    expect(response.body.status.message).toBe(i18Messages.TEST_RESULT_LINK_PATIENT_NOT_MATCH)
  })

  it('should return Bad Request if test result is Completed', async () => {
    const response = await request(server)
      .patch(url + `/link-result`)
      .set(headers)
      .send({
        patientId: patientForProfileTestResultsFixture.uuid,
        pendingTestResultId: testResultReviewedFixture.uuid,
        unlinkedTestResultId: labSyncOBRLifeLabsB12.uuid,
      })

    expect(response.status).toBe(400)
    expect(response.body.status.message).toBe(i18Messages.INVALID_STATUS_FOR_TEST_RESULT_LINKING)
  })
})
