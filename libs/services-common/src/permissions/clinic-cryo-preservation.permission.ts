import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

export const cryoCardsPermissions: PermissionEnum[] = [PermissionEnum.LabCryoPreservation]

export const cryoCardsAndPlansPermissions: PermissionEnum[] = [
  PermissionEnum.LabCryoPreservation,
  PermissionEnum.PlansTab,
]
