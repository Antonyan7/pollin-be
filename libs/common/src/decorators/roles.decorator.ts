import {SetMetadata} from '@nestjs/common'
import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

export const PermissionRoles = (
  ...permissions: PermissionEnum[]
): MethodDecorator & ClassDecorator => {
  return SetMetadata('permissions', permissions)
}
