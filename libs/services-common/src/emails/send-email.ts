import {EmailAdapterProvider, EmailResult} from './email-provider'
import {
  compileTemplate,
  StructuredLogger,
  checkIsDisabledTemplate,
  initFireORM,
  FirebaseAdminProvider,
  NestprojectConfigService,
  EmailAttachment,
} from '@libs/common'
import {EmailMessage} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {EmailTemplateType} from '@libs/data-layer/apps/email/enums/email-type.enum'
import {EmailProviderRepository} from '@libs/common/repositories/email-provider.repository'
import {EmailTemplate} from '@libs/data-layer/apps/email/entities/typeorm'
import {In, Repository} from 'typeorm'
import {CommonAction} from '@libs/common/enums/activity-logs'

const configService = NestprojectConfigService.getInstance()

export type ParamsSendEmailCreatePatientAndAppointment = {
  providerName: string
  date: string
  firstName: string
}

FirebaseAdminProvider.init()
initFireORM()

export class SendEmail {
  constructor(
    private readonly emailTemplateRepository: Repository<EmailTemplate>,
    private readonly emailAdapterProvider = new EmailAdapterProvider(new EmailProviderRepository()),
  ) {}

  public async sendEmail(data: {
    email: string
    templateType: EmailTemplateType
    params: ejs.Data
    attachments?: EmailAttachment[]
  }): Promise<EmailResult> {
    const {email, templateType, params, attachments} = data
    StructuredLogger.info(
      activityLogs.EmailNotificationFunctions.SendMail,
      CommonAction.StartMethod,
      {
        message: `sendEmail start. EmailTemplateType: ${templateType} `,
      },
    )

    await this.emailAdapterProvider.checkDisabledProviders()
    const emailTemplates = await this.emailTemplateRepository.find({
      where: {
        type: In([templateType, EmailTemplateType.Header, EmailTemplateType.Footer]),
      },
    })

    if (checkIsDisabledTemplate(emailTemplates, templateType)) {
      return
    }

    const {html, subject} = await compileTemplate(emailTemplates, templateType, {
      params,
    }).catch((error) => {
      StructuredLogger.error(
        activityLogs.EmailNotificationFunctions.SendMail,
        activityLogs.EmailNotificationActions.CompileEjsFail,
        error,
      )
      throw new Error(error)
    })
    const emailPayload: EmailMessage = {
      from: {email: configService.get<string>('Nestproject_EMAIL_FROM_NO_REPLY_ADDRESS')},
      to: [{email}],
      subject,
      html,
      ...(attachments && {attachments}),
    }
    const result = await this.emailAdapterProvider.sendEmail(emailPayload)
    return result
  }
}
