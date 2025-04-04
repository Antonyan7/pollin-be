export interface MailgunResponse {
  id: string
  message: string
}

export interface SendinblueResponse {
  status: number
  data: {
    messageId: string
  }
}

export enum Providers {
  Mailgun = 'mailgun',
  Sendinblue = 'sendinblue',
}
