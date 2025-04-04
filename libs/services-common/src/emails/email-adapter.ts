import {SendInBlueAdapter} from '@libs/common/adapters'
import {MailgunAdapter} from '@libs/common/adapters'
import {NestprojectConfigService} from '@libs/common'

const configService = NestprojectConfigService.getInstance()

const commonConfig = {
  emailFromAddress: configService.get<string>('Nestproject_EMAIL_FROM_ADDRESS'),
  emailFromName: configService.get<string>('Nestproject_EMAIL_FROM_NAME'),
  emailReplyAddress: configService.get<string>('Nestproject_EMAIL_REPLY_ADDRESS'),
}

const sendInBlueConfig = {
  apiKey: configService.get<string>('SENDINBLUE_API_KEY'),
  apiUrl: configService.get<string>('SENDINBLUE_API_URL'),
  ...commonConfig,
}

const mailgunConfig = {
  username: configService.get<string>('MAILGUN_API_USERNAME'),
  key: configService.get<string>('MAILGUN_API_KEY'),
  domainName: configService.get<string>('MAILGUN_API_DOMAIN_NAME'),
  ...commonConfig,
}

export const emailAdapters = {
  sendinblue: new SendInBlueAdapter(sendInBlueConfig),
  mailgun: new MailgunAdapter(mailgunConfig),
}
