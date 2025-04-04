import {Readable} from 'stream'
import {EmailAdapterConfig} from '@libs/common/interfaces/email-adapter.interface'

export type AttachmentDataType = string | Readable | Buffer

export type MailgunAttachment = {
  data: AttachmentDataType
  filename: string
}

export type MailgunMessage = {
  from: string // Bob <bob@host.com>
  to: string // 'Bob <bob@host.com>, David <david@host.com>'
  cc?: string
  bcc?: string
  subject: string
  text?: string
  html?: string
  attachment?: MailgunAttachment[]
}

export type MailgunConfig = EmailAdapterConfig & {
  username: string
  key: string
  domainName: string
}
