import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type StaffUserUpdatedPubSubPayload = {
  authUserId: string
}

export const StaffUserUpdatedSchema = createSchema({
  authUserId: {
    type: 'string',
  },
})
