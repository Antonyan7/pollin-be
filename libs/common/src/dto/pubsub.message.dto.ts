type PubSubMessage = {
  data: string
}
export type PubSubRequest = {
  message: PubSubMessage
  attributes: Record<string, string>
}
