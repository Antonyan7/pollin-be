import axios from 'axios'
import {SendInBlueMessage, SendInBlueConfig} from '@libs/common/interfaces/sendinblue'
import {EmailAdapter, EmailMessage} from '@libs/common/interfaces/email-adapter.interface'
import {cleanUndefinedKeys} from '@libs/common/utils/util'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

export class SendInBlueAdapter implements EmailAdapter<SendInBlueMessage> {
  private apiKey: string
  private apiUrl: string
  private emailFromAddress: string
  private emailFromName: string
  private emailReplyAddress: string

  constructor(config: SendInBlueConfig) {
    this.apiKey = config.apiKey
    this.apiUrl = config.apiUrl
    this.emailFromAddress = config.emailFromAddress
    this.emailFromName = config.emailFromName
    this.emailReplyAddress = config.emailReplyAddress
  }

  async createMessage(payload: EmailMessage): Promise<SendInBlueMessage> {
    const messagePayload: SendInBlueMessage = {
      sender: payload.from,
      to: payload.to,
      cc: payload?.cc,
      bcc: payload?.bcc,
      replyTo: payload?.replyTo,
      subject: payload.subject,
      textContent: payload?.text,
      htmlContent: payload?.html,
      params: payload.params,
      attachment: payload.attachments,
    }

    const replyTo = payload?.replyTo?.email
      ? payload?.replyTo?.email
      : (this.emailReplyAddress ?? payload.from.email)
    messagePayload.replyTo = {
      email: replyTo,
    }

    if (payload.template) {
      messagePayload.templateId = Number(payload?.template)
    }

    if (!payload.from) {
      messagePayload.sender = {
        email: this.emailFromAddress,
        name: this.emailFromName,
      }
    }

    const message = cleanUndefinedKeys(messagePayload)

    return message
  }

  async send(message: EmailMessage): Promise<unknown> {
    const messageData = await this.createMessage(message)

    try {
      return await axios({
        url: this.apiUrl,
        method: 'POST',
        data: JSON.stringify(messageData),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
      })
    } catch (error) {
      StructuredLogger.error(
        activityLogs.SendInBlueAdapterFunctions.Send,
        activityLogs.SendInBlueAdapterActions.SendError,
        error,
      )
      throw new Error(error)
    }
  }
}
