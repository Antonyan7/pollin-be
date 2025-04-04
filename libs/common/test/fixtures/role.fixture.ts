import {Role} from '@libs/data-layer/apps/clinic-tasks/entities'
import {RoleType} from '@libs/data-layer/apps/clinic-tasks/enums/role.enum'

export const roleFixture: Partial<Role> = {
  id: 1,
  name: 'Plans tab',
}

export const roleEmbryologistFixture: Partial<Role> = {
  id: 2,
  name: 'Embryologist',
  type: RoleType.Embryologist,
}
export const rolePhysicianFixture: Partial<Role> = {
  id: 3,
  name: 'Physician',
  type: RoleType.Physician,
}
