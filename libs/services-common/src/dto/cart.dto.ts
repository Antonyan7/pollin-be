import {ServiceCategoryItemType} from '@libs/data-layer/apps/scheduling/enums/service-category-item-type'

export class SlotIdModel {
  serviceProviderId?: string
  serviceCategoryItemId?: string
  serviceCategoryItemType?: ServiceCategoryItemType
  schedulingSlotId?: string
  serviceCategoryId?: number
  bookedAppointmentId?: string
  milestoneId?: number
}
