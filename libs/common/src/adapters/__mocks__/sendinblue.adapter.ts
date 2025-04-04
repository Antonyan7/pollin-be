import {SendinblueResponse} from '@libs/common'

export class SendInBlueAdapter {
  async createAttachment(): Promise<unknown> {
    return Promise.resolve()
  }

  async createMessage(): Promise<unknown> {
    const message = {
      from: {email: 'fhealthdev+fromTest@gmail.com'},
      to: [{email: 'fhealthdev+toTest@gmail.com'}],
      subject: 'SendInBlue Subject',
      text: 'SendInBlue Content',
      html: '<h1>HTML Content<h1/>',
      params: {test: 'SendInBlue'},
    }

    return message
  }

  async send(): Promise<SendinblueResponse> {
    await this.createMessage()

    return {
      status: 200,
      data: {
        messageId: 'SendInBlueEmailSent',
      },
    }
  }
}
