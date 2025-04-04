import {ServiceProviderPosition} from '@libs/services-common/enums/service-provider.enum'
import {ServiceProviderGroup} from '@libs/data-layer/apps/scheduling/entities/typeorm/service-provider-group.entity'

export const serviceProviderGroupDoctor: Partial<ServiceProviderGroup> = {
  id: 1,
  title: 'Doctor',
  sequence: 0,
  showOnPatientFiltering: true,
  position: ServiceProviderPosition.Doctor,
}

export const serviceProviderGroupNurse: Partial<ServiceProviderGroup> = {
  id: 2,
  title: 'Nurse',
  sequence: 1,
}

export const serviceProviderGroupCareNavigator: Partial<ServiceProviderGroup> = {
  id: 3,
  title: 'Care Navigator',
  sequence: 2,
}
