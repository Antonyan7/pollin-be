export enum PubSubAdapterFunctions {
  Publish = 'Publish',
  CheckAttributes = 'CheckAttributes',
  PublishWithSchema = 'PublishWithSchema',
}

export enum PubSubAdapterActions {
  PubSubPublishTopicData = 'PubSubPublishTopicData',
  InvalidAttribute = 'InvalidAttribute',
  TopicSchemaNotFound = 'TopicSchemaNotFound',
  PublishingFailed = 'PublishingFailed',
}
