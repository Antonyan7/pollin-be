import {PermissionSeed, RoleSeed, StaffSeed} from '@seeds/typeorm'
import {testPubSubEvent} from '@functions-types'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {Permission, Role, Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'
import {updateBucketPermissionByUserIdHandler} from '../functions/staff/src/update-bucket-permission/update-bucket-permission-by-user'
import {
  StaffUserUpdatedSchema,
  StaffUserUpdatedPubSubPayload,
} from '@libs/common/model/proto-schemas/staff-user-updated.schema'
import {updateBucketPermissionByRoleHandler} from '../functions/staff/src/update-bucket-permission/update-bucket-permission-by-role'
import {
  StaffRoleUpdatedPubSubPayload,
  StaffRoleUpdatedSchema,
} from '@libs/common/model/proto-schemas/staff-role-updated.schema'
import {BucketFolder} from '@libs/common'

jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const roleId = 989700001
const roleData: Partial<Role> = {
  id: roleId,
  name: 'BucketPermission',
}

const permissionId = 989700002
const permissionData: Partial<Permission> = {
  id: permissionId,
  roleId,
  permission: PermissionEnum.InHouseTests,
}

const permissionTwoId = 989700006
const permissionTwoData: Partial<Permission> = {
  id: permissionTwoId,
  roleId,
  permission: PermissionEnum.PatientDocumentsTab,
}

const permissionWithoutAnyBucketAcessId = 989700007
const permissionWithoutAnyBuckeData: Partial<Permission> = {
  id: permissionWithoutAnyBucketAcessId,
  roleId,
  permission: PermissionEnum.TaskList,
}

const staffId = 989700003
const authUserId = 'authUserIdBucketPermission'
const staffData: Partial<Staff> = {
  id: staffId,
  firstName: 'staffBucket',
  lastName: 'StaffBucketLast',
  roleId,
  authUserId,
  email: 'BucketPermissionEmail',
}

const authUserTwoId = 'authUserIdBucketPermissionTwo'
const staffTwoId = 989700005
const staffTwoData: Partial<Staff> = {
  id: staffTwoId,
  firstName: 'staffBucket2',
  lastName: 'StaffBucketLast2',
  roleId,
  authUserId: authUserTwoId,
  email: 'BucketPermissionEmail2',
}

let staffSeed: StaffSeed
let roleSeed: RoleSeed
let permissionSeed: PermissionSeed

describe('Firebase Function: remove-expired-otps', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    staffSeed = new StaffSeed(dataSource)
    roleSeed = new RoleSeed(dataSource)
    permissionSeed = new PermissionSeed(dataSource)

    await roleSeed.create(roleData)
    await permissionSeed.createArray([
      permissionData,
      permissionTwoData,
      permissionWithoutAnyBuckeData,
    ])
    await staffSeed.createArray([staffData, staffTwoData])
  })

  test('Should create custom claim for updated user', async () => {
    const spySetNewCustomClaimsForBucket = jest.spyOn(
      FirebaseAuthAdapter.prototype,
      'setNewCustomClaimsForBucket',
    )

    const data: StaffUserUpdatedPubSubPayload = {
      authUserId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, StaffUserUpdatedSchema))
    await updateBucketPermissionByUserIdHandler(message)

    const staff = await staffSeed.findWithRoles(staffId)

    expect(spySetNewCustomClaimsForBucket).toBeCalledWith(
      staff,
      [BucketFolder.TestResult, BucketFolder.Document, BucketFolder.Plans],
      false,
    )
    expect(spySetNewCustomClaimsForBucket).toHaveBeenCalledTimes(1)

    spySetNewCustomClaimsForBucket.mockClear()
  })

  test('Should create custom claim for 2 users by updated Role', async () => {
    const spySetNewCustomClaimsForBucket = jest.spyOn(
      FirebaseAuthAdapter.prototype,
      'setNewCustomClaimsForBucket',
    )

    const data: StaffRoleUpdatedPubSubPayload = {
      roleId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, StaffRoleUpdatedSchema))

    await updateBucketPermissionByRoleHandler(message)

    const staffOne = await staffSeed.findWithRoles(staffId)
    const staffTwo = await staffSeed.findWithRoles(staffTwoId)

    expect(spySetNewCustomClaimsForBucket).toHaveBeenNthCalledWith(
      1,
      staffOne,
      [BucketFolder.TestResult, BucketFolder.Document, BucketFolder.Plans],
      false,
    )
    expect(spySetNewCustomClaimsForBucket).toHaveBeenNthCalledWith(
      2,
      staffTwo,
      [BucketFolder.TestResult, BucketFolder.Document, BucketFolder.Plans],
      false,
    )

    expect(spySetNewCustomClaimsForBucket).toHaveBeenCalledTimes(2)

    spySetNewCustomClaimsForBucket.mockClear()
  })

  test('Should delete custom claim for updated user', async () => {
    //this test need to run with all file - it use data from prev test above

    // deleting permission for user
    await permissionSeed.removeByIds([permissionId, permissionTwoId])

    const spyDeleteCustomClaimsForBucket = jest.spyOn(
      FirebaseAuthAdapter.prototype,
      'deleteCustomClaimsForBucket',
    )

    const data: StaffUserUpdatedPubSubPayload = {
      authUserId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, StaffUserUpdatedSchema))

    await updateBucketPermissionByUserIdHandler(message)

    expect(spyDeleteCustomClaimsForBucket).toBeCalledWith(authUserId)
    expect(spyDeleteCustomClaimsForBucket).toHaveBeenCalledTimes(1)

    spyDeleteCustomClaimsForBucket.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await staffSeed.removeByIds([staffId, staffTwoId])
    await permissionSeed.removeByIds([
      permissionId,
      permissionTwoId,
      permissionWithoutAnyBucketAcessId,
    ])
    await roleSeed.removeById(roleId)
  })
})
