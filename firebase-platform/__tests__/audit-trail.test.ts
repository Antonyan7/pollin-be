import {testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {patientDateOfBirth} from './fixtures/questionnaire.fixture'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {PatientSeed} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {AuditUserAction, AuditTrailCollection} from '@libs/services-common/enums'
import {AuditTrailSeed} from '@seeds/firestore/audit-trail.seed'
import {auditTrailHandler} from '../functions/audit-trail/src/handlers/add-audit-trail'
import {AuditTrailSchema} from '@libs/common/model/proto-schemas/audit-trail.schema'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

jest.setTimeout(10000)
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
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

const authUserId = 'CF_Audit_Trail_Auth_User_Id'

const patientSeedData = {
  authUserId: authUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}
const revisionId = '1690527917346faea330f-da02-4744-9105-c187f2d01aed'
describe('Firebase Function: audit trail', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let auditTrailSeed: AuditTrailSeed
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    auditTrailSeed = new AuditTrailSeed()

    await patientSeed.create(patientSeedData)
  })

  test('Should add audit trail', async () => {
    const patient = await patientSeed.getPatientByAuthUserId(authUserId)
    const patientLatestData = JSON.stringify(patient)
    const data = {
      revisionId,
      requestId: 'c6657608-a1dc-4896-a7dd-1b6283967c61',
      deviceId: '841632ca-9c8e-8bec-bcef-a381a6478c5b',
      authUserId: patient.authUserId,
      ipAddress: '::1',
      authUserName: `${patient.firstName} ${patient.lastName}`,
      dataUpdateDateTime: '2023-07-28T07:05:17.352Z',
      userAction: AuditUserAction.Create,
      latestData: patientLatestData,
      tableUpdated: AuditTrailCollection.PatientsRevisions,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AuditTrailSchema))

    await auditTrailHandler(message)
    const auditTrail = await auditTrailSeed.getByRevisionId(revisionId)
    expect(auditTrail.authUserId).toBe(authUserId)
  })

  test('Should add audit trail with missing fields', async () => {
    const patient = await patientSeed.getPatientByAuthUserId(authUserId)
    const revisionId = 'new revision id'
    const patientLatestData = JSON.stringify(patient)
    const data = {
      revisionId,
      authUserId: patient.authUserId,
      authUserName: `${patient.firstName} ${patient.lastName}`,
      dataUpdateDateTime: '2023-07-28T07:05:17.352Z',
      userAction: AuditUserAction.Update,
      latestData: patientLatestData,
      tableUpdated: AuditTrailCollection.PatientsRevisions,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AuditTrailSchema))

    await auditTrailHandler(message)
    const auditTrail = await auditTrailSeed.getByRevisionId(revisionId)
    expect(auditTrail.authUserId).toBe(authUserId)
  })

  test('Should fail to add audit trail', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'error')
    const patient = await patientSeed.getPatientByAuthUserId(authUserId)
    const patientLatestData = JSON.stringify(patient)
    const data = {
      authUserName: `${patient.firstName} ${patient.lastName}`,
      dataUpdateDateTime: '2023-07-28T07:05:17.352Z',
      userAction: AuditUserAction.Update,
      latestData: patientLatestData,
      tableUpdated: AuditTrailCollection.PatientsRevisions,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AuditTrailSchema))

    await auditTrailHandler(message)
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.AuditTrailFunctions.AuditTrailHandler,
      activityLogs.AuditTrailActions.AuditTrailFailed,
      {
        message:
          'Audit payload is missing authUserId Action: Update, tableUpdated: patients_revisions',
      },
    )
    spyOnLogger.mockRestore()
  })

  test('Should log warning if revisionId missing', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')
    const patient = await patientSeed.getPatientByAuthUserId(authUserId)
    const patientLatestData = JSON.stringify(patient)
    const data = {
      authUserId: patient.authUserId,
      authUserName: `${patient.firstName} ${patient.lastName}`,
      dataUpdateDateTime: '2023-07-28T07:05:17.352Z',
      userAction: AuditUserAction.Update,
      latestData: patientLatestData,
      tableUpdated: AuditTrailCollection.PatientsRevisions,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AuditTrailSchema))

    await auditTrailHandler(message)
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.AuditTrailFunctions.AuditTrailHandler,
      activityLogs.AuditTrailActions.RevisionIdWasNotProvided,
      {
        message: `Table name: ${AuditTrailCollection.PatientsRevisions}. Action: ${AuditUserAction.Update}`,
      },
    )
    spyOnLogger.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientSeed.removePatientByAuthUserId(authUserId)
    await auditTrailSeed.deleteByAuthUserId(authUserId)
  })
})
