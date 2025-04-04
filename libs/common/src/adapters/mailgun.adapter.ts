import Mailgun from 'mailgun.js'
import axios from 'axios'
import formData from 'form-data'
import {
  EmailAdapter,
  EmailAttachment,
  EmailMessage,
  EmailMessageParticipant,
} from '@libs/common/interfaces/email-adapter.interface'
import {
  AttachmentDataType,
  MailgunMessage,
  MailgunAttachment,
  MailgunConfig,
} from '@libs/common/interfaces/mailgun'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {DefaultValue} from '../enums'

export class MailgunAdapter implements EmailAdapter<unknown> {
  private mailgun

  private username: string
  private key: string
  private domainName: string
  private emailFromAddress: string
  private emailFromName: string

  constructor(config: MailgunConfig) {
    this.username = config.username
    this.key = config.key
    this.domainName = config.domainName
    this.emailFromAddress = config.emailFromAddress
    this.emailFromName = config.emailFromName

    this.mailgun = new Mailgun(formData).client({username: this.username, key: this.key})
  }

  formatParticipants(participants: EmailMessageParticipant[]): string {
    return participants
      .map((participant) => {
        const name = participant.name ?? DefaultValue.Empty

        if (name) {
          return `${name}<${participant.email}>`
        }

        return participant.email
      })
      .join(',')
  }

  async createAttachment(attachments: EmailAttachment[]): Promise<MailgunAttachment[]> {
    const attachDto = (filename: string, data: AttachmentDataType): MailgunAttachment => ({
      filename,
      data,
    })

    const attachProcess = attachments.map(async (attachment) => {
      if (attachment?.stream) {
        return attachDto(attachment.name, attachment.stream)
      }

      if (attachment?.url) {
        const response = await axios.get(attachment.url, {responseType: 'stream'})
        return attachDto(attachment.name, response.data)
      }

      return {data: attachment.content, filename: attachment.name}
    })

    return Promise.all(attachProcess)
  }

  async createMessage(data: EmailMessage): Promise<MailgunMessage> {
    const message: MailgunMessage = {
      from: this.formatParticipants([data.from]),
      to: this.formatParticipants(data.to),
      subject: data.subject,
      text: data?.text,
      html: data?.html,
    }

    if (data?.cc) {
      message.cc = this.formatParticipants(data.cc)
    }

    if (data.replyTo?.email) {
      message['h:Reply-To'] = data.replyTo.email
    }

    if (data?.bcc) {
      message.bcc = this.formatParticipants(data?.bcc)
    }

    if (data?.attachments) {
      try {
        message.attachment = await this.createAttachment(data.attachments)
      } catch (error) {
        StructuredLogger.error(
          activityLogs.MailgunAdapterFunctions.CreateMessage,
          activityLogs.MailgunAdapterActions.AttachmentFailure,
          error,
        )
      }
    }

    if (!data?.from) {
      message.from = this.formatParticipants([
        {name: this.emailFromName, email: this.emailFromAddress},
      ])
    }

    return message
  }

  async send(message: EmailMessage): Promise<unknown> {
    const messageData = await this.createMessage(message)

    try {
      const response = await this.mailgun.messages.create(this.domainName, messageData)

      return response
    } catch (error) {
      StructuredLogger.error(
        activityLogs.MailgunAdapterFunctions.Send,
        activityLogs.MailgunAdapterActions.SendError,
        error,
      )
      throw new Error(error)
    }
  }
}
