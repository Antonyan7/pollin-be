import {ZendeskAdapterTypeEnum} from '@libs/services-common/enums/zendesk-adapter-type.enum'

export type ZenDeskMessagePayload = {
  subject: string
  message: string
  firstName: string
  lastName: string
  email: string
  patientIdentifier: string
  type: ZendeskAdapterTypeEnum
}

export class ZenDeskTicket {
  comment: {
    body: string
  }
  subject: string
  requester: {
    name: string
    email: string
  }
  external_id: string
  tags?: string[]
  type: ZendeskAdapterTypeEnum
}

export interface IZenDeskAdapter {
  /**
   * Provider specific sending interface
   * @param ticket
   * @returns Zendesk ticket id
   */
  send(ticket: ZenDeskTicket): Promise<number>

  createTicket(payload: ZenDeskMessagePayload): ZenDeskTicket
}
