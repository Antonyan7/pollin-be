import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {decode, encode} from '../proto-schema.utils'

describe('Proto schema utils', () => {
  it('shoud not throw validation error', async () => {
    const data = {
      appointmentIds: [1],
    }

    const encodedMessage = encode(data, AppointmentsCreatedSchema)

    const decodedMessage = decode(encodedMessage, AppointmentsCreatedSchema)

    expect(decodedMessage).toMatchObject(data)
  })

  it('shoud throw validation error (encode)', async () => {
    const data = {
      appointmentIds: ['data'],
    }

    expect(() => encode(data, AppointmentsCreatedSchema)).toThrow()
  })

  it('shoud throw validation error (decode)', async () => {
    const data = Buffer.from('buffer')

    expect(() => decode(data, AppointmentsCreatedSchema)).toThrow()
  })
})
