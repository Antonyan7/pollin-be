import {PubSub, Topic} from '@google-cloud/pubsub'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'

export class PubSubAdapter {
  private pubSubClient = new PubSub()
  private topicName: string
  private topic: Topic

  constructor(topicName: string) {
    this.topicName = topicName
    this.topic = this.pubSubClient.topic(topicName)
  }
  async publish<T = unknown>(data: T, attributes: Record<string, string> = {}): Promise<void> {
    StructuredLogger.info(
      activityLogs.PubSubAdapterFunctions.Publish,
      activityLogs.PubSubAdapterActions.PubSubPublishTopicData,
      {
        topicName: this.topicName,
      },
    )

    this.checkAttributes(attributes)

    const message = {
      data: Buffer.from(JSON.stringify(data)),
      attributes,
    }

    this.topic.publishMessage(message)
  }

  private checkAttributes(attributes: Record<string, string>): void {
    const keys = Object.keys(attributes)

    keys.forEach((key: string) => {
      const value = attributes[key]

      if (typeof value !== 'string') {
        throw new Error(
          `PubSubAdapter: {${key}: ${JSON.stringify(value)}} is not a valid attribute`,
        )
      }
    })
  }

  static async getPublishedData<T = unknown>(data: string): Promise<T> {
    return JSON.parse(Buffer.from(data, 'base64').toString())
  }
}
