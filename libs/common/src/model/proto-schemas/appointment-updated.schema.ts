import {AppointmentStatus, HistoryUserType} from '@libs/common/enums'
import {AuditMetadataPubSubPayload} from './audit-metadata.schema'
import {Root} from 'protobufjs'

export type AppointmentPayload = {
  status?: AppointmentStatus
  serviceProviderId?: number
  date?: string
  serviceTypeId?: string
}

export type PartialAppointmentPayload = {
  oldAppointment: AppointmentPayload
  newAppointment: AppointmentPayload
  authUserFullName: string
  authUserType: HistoryUserType
}

export type AppointmentUpdatedPubSubPayload = {
  appointmentId: number
  oldAppointment: AppointmentPayload
  newAppointment: AppointmentPayload
  authUserFullName: string
  authUserType: HistoryUserType
} & AuditMetadataPubSubPayload

const root = Root.fromJSON({
  nested: {
    appointment: {
      fields: {
        appointmentId: {type: 'int32', id: 1},
        oldAppointment: {type: 'appointmentData', id: 7},
        newAppointment: {type: 'appointmentData', id: 8},
        authUserFullName: {type: 'string', id: 9},
        authUserType: {type: 'string', id: 10},
        deviceId: {type: 'string', id: 11},
        requestId: {type: 'string', id: 12},
        ipAddress: {type: 'string', id: 13},
        authUserId: {type: 'string', id: 14},
        revisionId: {type: 'string', id: 15},
      },
      nested: {
        appointmentData: {
          fields: {
            status: {type: 'string', id: 1},
            serviceProviderId: {type: 'int32', id: 2},
            date: {type: 'string', id: 3},
            serviceTypeId: {type: 'string', id: 4},
          },
        },
      },
    },
  },
})

export const AppointmentUpdatedSchema = root.lookupType('appointment')
