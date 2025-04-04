import {Readable} from 'stream'

export type EmailMessageParticipant = {
  email: string
  name?: string
}

export type EmailAttachment = {
  content?: string
  url?: string
  name: string
  stream?: Readable | Buffer
}

export type EmailAdapterConfig = {
  emailFromAddress: string
  emailFromName: string
  emailReplyAddress: string
}

export interface EmailMessage {
  from?: EmailMessageParticipant
  to?: EmailMessageParticipant[]
  cc?: EmailMessageParticipant[]
  bcc?: EmailMessageParticipant[]
  replyTo?: EmailMessageParticipant
  subject?: string
  text?: string
  html?: string
  attachments?: EmailAttachment[]
  params?: Record<string, unknown>
  template?: string | number // provider template ID or name
}

/**
 * Email adapter interface with generic message type
 */
export interface EmailAdapter<T> {
  /**
   * Provider specific sending interface
   * @param message
   */
  send(message: EmailMessage): Promise<unknown>

  /**
   * Transform message to provider specific message
   * @param payload
   */
  createMessage(payload: EmailMessage): Promise<T>
}
