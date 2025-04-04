import {MailgunResponse} from '@libs/common'

export const mockedMailgunResponse: MailgunResponse = {
  message: 'Email sent',
  id: 'MailgunEmailID',
}

export class MailgunAdapter {
  async createAttachment(): Promise<unknown> {
    return Promise.resolve()
  }

  async createMessage(): Promise<unknown> {
    const message = {
      from: {email: 'fhealthdev+testFrom@gmail.com'},
      to: [{email: 'fhealthdev+testTo@gmail.com'}],
      subject: 'Mailgun Subject',
      text: 'Mailgun Content',
      html: '<h1>HTML Content<h1/>',
      params: {test: 'Mailgun'},
    }

    return message
  }

  async send(): Promise<MailgunResponse> {
    await this.createMessage()

    return mockedMailgunResponse
  }
}
