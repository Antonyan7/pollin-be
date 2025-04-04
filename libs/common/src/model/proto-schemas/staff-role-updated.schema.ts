import {createSchema} from '@libs/common/utils/proto-schema.utils'

export type StaffRoleUpdatedPubSubPayload = {
  roleId: number
}

export const StaffRoleUpdatedSchema = createSchema({
  roleId: {
    type: 'int32',
  },
})
