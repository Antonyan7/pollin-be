import {encode} from '@libs/common/utils/proto-schema.utils'
import {PubSub, Subscription, SubscriptionOptions, Topic} from '@google-cloud/pubsub'
import {StructuredLogger, isE2EMode, isE2eTestingBuild, isToolsEnv} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {Type} from 'protobufjs'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {whitelistedE2ETopics} from '../helpers/pubsub-e2e-topics.helper'
import {getRequestContext} from '@libs/services-common/helpers/async-hook'
import {ClientHeaders} from '@libs/common/enums'

export class PubSubAdapter<D = unknown> {
  private pubSubClient = new PubSub()
  private topicName: string
  private topic: Topic

  constructor(topicName: string) {
    this.topicName = topicName
    this.topic = this.pubSubClient.topic(topicName)
  }

  isTopicWhitelistedForE2E(): boolean {
    return whitelistedE2ETopics.includes(this.topicName)
  }

  isE2E(): boolean {
    return isE2eTestingBuild() || isE2EMode()
  }

  async publish<T = D>(data: T, attributes: Record<string, string> = {}): Promise<void> {
    if (this.isE2E() && !this.isTopicWhitelistedForE2E()) {
      StructuredLogger.warn(
        activityLogs.PubSubAdapterFunctions.Publish,
        'skippedIsE2eTestingBuild',
        {},
      )
      return
    }

    StructuredLogger.info(
      activityLogs.PubSubAdapterFunctions.Publish,
      activityLogs.PubSubAdapterActions.PubSubPublishTopicData,
      {topicName: this.topicName},
    )

    this.checkAttributes(attributes)

    const message = {
      data: Buffer.from(JSON.stringify(data)),
      attributes,
    }

    await this.topic.publishMessage(message)
  }

  async publishWithSchema<T>(
    data: T,
    schemaType: Type,
    attributes: Record<string, string> = {},
  ): Promise<boolean> {
    const functionName = activityLogs.PubSubAdapterFunctions.PublishWithSchema

    try {
      const request = getRequestContext()
      const requestContext = request
        ? {
            authUserId: request?.userId,
            deviceId: request[ClientHeaders.DeviceId],
            requestId: request[ClientHeaders.RequestId],
            ipAddress: request.ipAddress,
          }
        : null

      if (this.isE2E() && !this.isTopicWhitelistedForE2E()) {
        StructuredLogger.warn(functionName, 'skippedIsE2eTestingBuild', {})
        return true
      }

      if (isToolsEnv()) {
        StructuredLogger.warn(functionName, 'Skipped: Executed in Tools ENV', {})
        return true
      }

      StructuredLogger.info(
        functionName,
        activityLogs.PubSubAdapterActions.PubSubPublishTopicData,
        {topicName: this.topicName},
      )

      const [topicMetadata] = await this.topic.getMetadata()
      if (!topicMetadata.schemaSettings) {
        StructuredLogger.warn(functionName, activityLogs.PubSubAdapterActions.TopicSchemaNotFound, {
          topicName: this.topicName,
        })
      }

      this.checkAttributes(attributes)

      const encodedData = encode({...requestContext, ...data}, schemaType)
      if (!encodedData) {
        throw new Error('Failed to encode message with schema')
      }

      const message = {
        data: encodedData,
        attributes,
      }

      await this.topic.publishMessage(message)
      StructuredLogger.info(functionName, 'MessagePublishedSuccessfully', {
        topicName: this.topicName,
      })
      return true
    } catch (error) {
      StructuredLogger.error(
        functionName,
        activityLogs.PubSubAdapterActions.PublishingFailed,
        parseError(error),
      )
      throw error
    }
  }

  private checkAttributes(attributes: Record<string, string>): void {
    const keys = Object.keys(attributes)

    keys.forEach((key: string) => {
      const value = attributes[key]

      if (typeof value !== 'string') {
        StructuredLogger.warn(
          activityLogs.PubSubAdapterFunctions.CheckAttributes,
          activityLogs.PubSubAdapterActions.InvalidAttribute,
          {pubSubAttribute: value},
        )
        throw new Error('Invalid attributes for pubsub')
      }
    })
  }

  static async getPublishedData<T = unknown>(data: string): Promise<T> {
    return JSON.parse(Buffer.from(data, 'base64').toString())
  }

  getSubscription(name: string, options?: SubscriptionOptions): Subscription {
    return this.pubSubClient.subscription(name, options)
  }
}
