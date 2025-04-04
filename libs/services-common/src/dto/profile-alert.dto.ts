import {ProfileAlertType} from '@libs/data-layer/apps/users/enum'

export class ProfileAlertDTO {
  id: string
  typeId: ProfileAlertType
  typeTitle: string
  message: string
}
