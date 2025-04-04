import {ServiceCategoryItemType} from '@libs/data-layer/apps/scheduling/enums/service-category-item-type'

export enum BookingType {
  ServiceCategoryBooking = 'ServiceCategoryBooking',
  ServiceGroupBooking = 'ServiceGroupBooking',
  ServiceTypeBooking = 'ServiceTypeBooking',
  PatientMilestoneBooking = 'PatientMilestoneBooking',
  ServiceTypeWithTests = 'ServiceTypeWithTests',
}

export const serviceCategoryItemTypeByBookingType = new Map([
  [BookingType.ServiceGroupBooking, ServiceCategoryItemType.ServiceGroup],
  [BookingType.ServiceTypeBooking, ServiceCategoryItemType.ServiceType],
  [BookingType.ServiceTypeWithTests, ServiceCategoryItemType.ServiceType],
])
