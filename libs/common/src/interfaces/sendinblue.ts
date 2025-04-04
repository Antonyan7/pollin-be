import {
  EmailAdapterConfig,
  EmailAttachment,
  EmailMessageParticipant,
} from '@libs/common/interfaces/email-adapter.interface'

export interface SendInBlueMessage {
  sender: EmailMessageParticipant
  to: EmailMessageParticipant[]
  cc: EmailMessageParticipant[]
  bcc: EmailMessageParticipant[]
  replyTo?: EmailMessageParticipant
  subject: string
  templateId?: number
  textContent?: string
  htmlContent?: string
  params?: Record<string, unknown>
  attachment?: EmailAttachment[]
}

export type SendInBlueConfig = EmailAdapterConfig & {
  apiKey: string
  apiUrl: string
}
