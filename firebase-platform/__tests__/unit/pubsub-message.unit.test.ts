import {encode, decode} from '@libs/common/utils/proto-schema.utils'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'

test('success to decode pub-sub message with correct priority', () => {
  const requestContext = {authUserId: 'requestContextAuthUserId'}
  const data = {authUserId: 'dataAuthUserId'}
  const encoded = encode({...requestContext, ...data}, AppointmentsCreatedSchema)
  const decoded = decode(encoded, AppointmentsCreatedSchema)

  expect(decoded.authUserId).toBe(data.authUserId)
  expect(decoded.authUserId).not.toBe(requestContext.authUserId)
})
