import {NestprojectConfigService} from '@libs/common'
import {
  IZenDeskAdapter,
  ZenDeskMessagePayload,
  ZenDeskTicket,
} from '../interfaces/zendesk-adapter.interface'
import axios from 'axios'
import {writeExtendedLogForAxiosException} from './common/error-helpers'
import * as activityLogs from '@libs/common/enums/activity-logs'

// declared to have shorted Logging in service
const logFunc = activityLogs.ZendDeskAdapterFunctions
const logAct = activityLogs.ZendDeskAdapterActions

export class ZendDeskAdapter implements IZenDeskAdapter {
  private apiKey: string
  private apiUrl: string
  private ticketTag: string

  constructor(private configService = NestprojectConfigService.getInstance()) {
    this.apiKey = this.configService.get<string>('ZENDESK_BASIC_AUTH_TOKEN')
    this.apiUrl = this.configService.get<string>('ZENDESK_API_URL')
    this.ticketTag = this.configService.get<string>('ZENDESK_TAG')
  }

  createTicket(payload: ZenDeskMessagePayload): ZenDeskTicket {
    const {message, subject, firstName, lastName, email, patientIdentifier, type} = payload

    return {
      comment: {
        body: message,
      },
      subject,
      requester: {
        name: `${firstName} ${lastName}`,
        email,
      },
      external_id: patientIdentifier,
      tags: [this.ticketTag],
      type,
    }
  }

  async send(ticket: ZenDeskTicket): Promise<number> {
    try {
      const response = await axios({
        url: this.apiUrl,
        method: 'POST',
        data: JSON.stringify({ticket}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${this.apiKey}`,
        },
      })

      return response.data.ticket.id
    } catch (error) {
      writeExtendedLogForAxiosException({
        logFunc: logFunc.Send,
        logAct: logAct.SendFailed,

        error,
        payloadAsString: '',
      })

      throw new Error(`Couldn't send ZenDesk ticket, error: ` + error)
    }
  }
}
