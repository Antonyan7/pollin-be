import {CloudEvent} from 'firebase-functions/v2'
import {MessagePublishedData} from 'firebase-functions/v2/pubsub'

export {CloudEvent, MessagePublishedData}

export type PubSubMessage = {
  data: string
  attributes: Record<string, string>
}

export type PubSubEvent = {
  message: PubSubMessage
}

export const testPubSubEvent = (data: string): CloudEvent<PubSubEvent> =>
  ({
    data: {
      message: {
        data,
        attributes: {},
      },
    },
  }) as CloudEvent<PubSubEvent>
