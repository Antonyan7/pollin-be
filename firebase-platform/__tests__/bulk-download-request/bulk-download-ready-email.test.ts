import {AuthUserFixture} from '@libs/common/test/fixtures'
import {BulkDownloadRequest, Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientSeed, StaffSeed, BulkDownloadRequestSeed, EmailTemplateSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  BulkDownloadPubSubPayload,
  BulkDownloadSchema,
} from '@libs/common/model/proto-schemas/bulk-download.schema'
import {
  BulkDownloadGenerationType,
  BulkDownloadRequestStatus,
} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {mockedAuditMetadata} from '../fixtures/audit.fixture'
import {NestprojectConfigService} from '@libs/common'
import {EmailTemplateType} from '@libs/data-layer/apps/email/enums/email-type.enum'
import {EmailTemplate} from '@libs/data-layer/apps/email/entities/typeorm'
import {handlerBulkDownloadReady} from '@firebase-platform/functions/email-notification/src/bulk-download-ready/handler'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

const configService = NestprojectConfigService.getInstance()
const noReplyEmail = configService.get<string>('Nestproject_EMAIL_FROM_NO_REPLY_ADDRESS')

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@libs/common/adapters/firebase/firebase-auth.adapter')
jest.mock('@libs/common/adapters/mailgun.adapter.ts')
jest.mock('@libs/common/adapters/sendinblue.adapter.ts')
jest.mock('@google-cloud/logging-bunyan')
jest.setTimeout(10000)

export const patientData: Partial<Patient> = {
  id: 1,
  uuid: 'k12111f3-b9b4-48fe-94c9-f1b1egtthyk2',
  authUserId: 'CF_TEST_AUTH_ID_SPECIMEN',
  firstName: 'CF_TEST_NAME_SPECIMEN',
  lastName: 'CF_TEST_LAST_NAME_SPECIMEN',
  middleName: 'CF_TEST_MIDDLE_NAME_SPECIMEN',
}

const staffUserData: Partial<Staff> = {
  id: 1,
  uuid: 'c52111f3-b9b4-48fe-94c9-f1b1egtthyu1',
  firstName: 'firstName',
  lastName: 'lastName',
  authUserId: AuthUserFixture.emailVerifiedWithoutMFA.uid,
  email: 'fhealthdev+test2@gmail.com',
  active: true,
}

export const bulkDownloadRequestForMergedTypeFixture: Partial<BulkDownloadRequest> = {
  id: 1,
  uuid: 'cef1e716-df9a-4171-aae2-981b5863e794',
  patientId: patientData.id,
  staffId: staffUserData.id,
  status: BulkDownloadRequestStatus.ReadyForDownload,
  generationType: BulkDownloadGenerationType.Zip,
  fileName: 'file_name',
}

const emailTemplateFixture: Partial<EmailTemplate> = {
  id: 2312312,
  type: EmailTemplateType.PdfGenerationCompleted,
  disabled: false,
  subject: 'PdfGenerationCompleted - subject',
  body: '<%= params.documentLink %> body',
}

describe('Firebase Function: sendBulkDownloadReady', () => {
  let dataSource: DataSource
  let staffSeed: StaffSeed
  let patientSeed: PatientSeed
  let bulkDownloadRequestSeed: BulkDownloadRequestSeed
  let emailTemplateSeed: EmailTemplateSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    staffSeed = new StaffSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    bulkDownloadRequestSeed = new BulkDownloadRequestSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    await staffSeed.create(staffUserData)
    await patientSeed.create(patientData)
    await bulkDownloadRequestSeed.create(bulkDownloadRequestForMergedTypeFixture)
    await emailTemplateSeed.create(emailTemplateFixture)
  })

  it('Should send email for Bulk Download Document Generating ready', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data: BulkDownloadPubSubPayload = {
      bulkDownloadRequestId: bulkDownloadRequestForMergedTypeFixture.id,
      updatedStatus: BulkDownloadRequestStatus.ReadyForDownload,
      ...mockedAuditMetadata,
      authUserId: staffUserData.authUserId,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, BulkDownloadSchema))

    await handlerBulkDownloadReady(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: noReplyEmail},
        to: [{email: staffUserData.email}],
        subject: emailTemplateFixture.subject,
        html: expect.stringMatching(
          new RegExp(`${configService.get('LINK_PORTAL_DOMAIN')}.*/${patientData.uuid}/.* body`),
        ),
      }),
    )
    spyOnEmailSending.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await emailTemplateSeed.removeById(emailTemplateFixture.id)
    await bulkDownloadRequestSeed.removeByIds([bulkDownloadRequestForMergedTypeFixture.id])
    await patientSeed.removeByIds([patientData.id])
    await staffSeed.removeByIds([staffUserData.id])
  })
})
