import {Appointment, ServiceCategory} from '@libs/data-layer/apps/scheduling/entities/typeorm'

export class ServiceCategoryWithAppointmentsDto {
  serviceCategory: ServiceCategory
  appointments: Appointment[]
}
