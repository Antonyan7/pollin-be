import {Root, Type} from 'protobufjs'
import {PubSubRequest} from '../dto/pubsub.message.dto'

interface ISchemaFields {
  [key: string]: {
    type: string
    rule?: string
  }
}

export function createSchema(fields: ISchemaFields): Type {
  const fieldsWithIds = {}
  Object.keys(fields).forEach((field, index) => {
    fieldsWithIds[field] = {
      ...fields[field],
      id: index + 1,
    }
  })

  const root = Root.fromJSON({
    nested: {
      schema: {
        fields: fieldsWithIds,
      },
    },
  })
  return root.lookupType('schema')
}

function validatePayload<T>(data: T, schemaType: Type): void {
  const validationResult = schemaType.verify(data)

  if (validationResult) {
    throw new Error(`Invalid message: ${validationResult}`)
  }
}

export function encode<T>(data: T, schemaType: Type): Buffer {
  validatePayload(data, schemaType)
  return schemaType.encode(schemaType.fromObject(data)).finish() as Buffer
}

export function decode<T>(data: Buffer, schemaType: Type): T {
  const decodedMessage = schemaType.decode(data).toJSON() as T
  validatePayload(decodedMessage, schemaType)

  return decodedMessage
}

export function encodePubSubMessage<T>(data: T, schemaType: Type): string {
  return encode<T>(data, schemaType).toString('base64')
}

/** Used for background services in test to create body for POST */
export function encodePubSubRequest<T>(data: T, schemaType: Type): PubSubRequest {
  return {
    message: {data: encodePubSubMessage(data, schemaType)},
    attributes: {},
  }
}

export function decodePubSubMessage<T>(data: string, schemaType: Type): T {
  const buffer = Buffer.from(data, 'base64')
  return decode<T>(buffer, schemaType)
}

export function decodePubSubRequest<T>(requestBody: PubSubRequest, schemaType: Type): T {
  const data = typeof requestBody === 'string' ? requestBody : requestBody.message?.data

  return decodePubSubMessage(data, schemaType)
}
