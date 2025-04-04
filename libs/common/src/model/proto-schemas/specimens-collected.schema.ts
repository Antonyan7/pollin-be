import {AuditMetadataPubSubPayload} from './audit-metadata.schema'
import {Root} from 'protobufjs'

type SpecimenPayload = {
  uuid: string
  appointmentUUID: string
}

export type SpecimensCollectedPubSubPayload = {
  specimens: SpecimenPayload[]
} & AuditMetadataPubSubPayload

export const SpecimensCollectedSchema = Root.fromJSON({
  nested: {
    message: {
      fields: {
        deviceId: {type: 'string', id: 1},
        requestId: {type: 'string', id: 2},
        ipAddress: {type: 'string', id: 3},
        authUserId: {type: 'string', id: 4},
        revisionId: {type: 'string', id: 5},
        specimens: {type: 'specimenData', id: 6, rule: 'repeated'},
      },
      nested: {
        specimenData: {
          fields: {
            uuid: {type: 'string', id: 1},
            appointmentUUID: {type: 'string', id: 2},
          },
        },
      },
    },
  },
}).lookupType('message')
