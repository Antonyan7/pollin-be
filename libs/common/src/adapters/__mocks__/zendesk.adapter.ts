import {ZenDeskTicket} from '@libs/common/interfaces/zendesk-adapter.interface'

export class ZendDeskAdapter {
  createTicket(): ZenDeskTicket {
    return new ZenDeskTicket()
  }

  send(): number {
    return 1
  }
}
