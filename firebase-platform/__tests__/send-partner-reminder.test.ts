import {StructuredLogger} from '@libs/common'
import {CloudTaskSeed} from '@seeds/firestore/cloud-task.seed'
import {handlerSendPartnerReminder} from '../functions/email-notification/src/send-partner-reminder/handler'
import {SendPartnerReminderSchema} from '@libs/common/model/proto-schemas/send-partner-reminder.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {DateTimeUtil, EmailProvider} from '@libs/common'
import {Config} from '@config/config.util'
import {CloudTaskType} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {PatientPartnerSeed, PatientSeed} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {NestprojectConfigService} from '@libs/common'
import {OTPCodeType} from '@libs/data-layer/apps/users/entities/fireorm/otp-codes'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {partnerLinkingCodeTemplateFixture} from './fixtures/email-template.fixture'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

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
const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

let cloudTaskSeed: CloudTaskSeed
let dataSource: DataSource
let patientSeed: PatientSeed
let patientPartnerSeed: PatientPartnerSeed

const reminderId = 'send-partner-reminder'
const invitationId = 'send-partner-reminder-invitation'
const patientId = 1

const auditable = {
  createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  updatedBy: 'TEST',
}

describe('Firebase Function: send-partner-reminder', () => {
  let spyEmailAdapterProvider: jest.SpyInstance<Promise<EmailProvider[]>, []>
  let emailTemplateSeed: EmailTemplateSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    cloudTaskSeed = new CloudTaskSeed()
    patientSeed = new PatientSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    const patient = await patientSeed.create({
      id: patientId,
      authUserId: 'CF_TEST_AUTH_ID_INTAKE',
      firstName: 'CF_TEST_FIRST_NAME',
      lastName: 'CF_TEST_FIRST_NAME',
    })
    patientPartnerSeed = new PatientPartnerSeed(dataSource)
    await emailTemplateSeed.createArray([partnerLinkingCodeTemplateFixture])
    await Promise.all([
      cloudTaskSeed.create({
        id: reminderId,
        partnerInvitationId: invitationId,
        patientId,
        cloudTaskId: 'cloudTaskId',
        type: CloudTaskType.PartnerInvitationEmailReminder,
      }),
      patientPartnerSeed.create({
        id: 1,
        uuid: invitationId,
        patientId: patient.id,
      }),
    ])

    spyEmailAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyEmailAdapterProvider.mockResolvedValue([
      {id: 'sendinblue', name: 'sendinblue', active: true, disabled: false, ...auditable},
    ])
  })

  it('should not delete partner reminder from Firestore (inviterId is wrong)', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'warn')
    const result = handlerSendPartnerReminder(
      encodePubSubMessage({invitationId: 'wrongId'}, SendPartnerReminderSchema),
    )
    await expect(result).resolves.not.toThrow()
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.EmailNotificationFunctions.HandlerSendPartnerReminder,
      activityLogs.EmailNotificationActions.CouldntFindRequiredInvitationOrReminder,
      {
        message:
          "Couldn't find required invitation or reminder: partnerInvitationId: undefined, partnerReminderId: undefined",
      },
    )
    spyOnLogger.mockRestore()
    const reminder = await cloudTaskSeed.findById(reminderId)
    expect(reminder).toBeTruthy()
  })

  it('should delete partner reminder from Firestore (inviterId is wrong) - should set null into partnerInvitationEmailCloudTaskId', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'info')
    const result = handlerSendPartnerReminder(
      encodePubSubMessage({invitationId}, SendPartnerReminderSchema),
    )
    await expect(result).resolves.not.toThrow()
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.EmailNotificationFunctions.SendEmailWithOtp,
      activityLogs.EmailNotificationActions.SendEmailWithOtpData,
      {
        authUserId: null,
        message: `OTPCodeEmailHandler, authUserId: ${null}, topicNameInConfig: ${configService.get<string>(
          'TOPIC_PARTNER_INVITATION_CREATED',
        )}. otpCodeType: ${OTPCodeType.PartnerCreated}`,
      },
    )
    spyOnLogger.mockRestore()
    const reminder = await cloudTaskSeed.findById(reminderId)
    expect(reminder).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await Promise.all([
      cloudTaskSeed.deleteById(reminderId),
      patientSeed.removeByIds([patientId]),
      patientPartnerSeed.removePatientPartnerByUUIDs([invitationId]),
    ])
    await emailTemplateSeed.deleteByIds([partnerLinkingCodeTemplateFixture.id])
  })
})
