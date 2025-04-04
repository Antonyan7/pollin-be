import {LabInfo} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {LabsListItemDTO} from '@apps/lis/labs/dto/labs.dto'

export const prepareLabs = (rawLabs: LabInfo[]): LabsListItemDTO[] => {
  return rawLabs.map((lab) => ({
    title: lab.name,
    id: lab.uuid,
  }))
}
