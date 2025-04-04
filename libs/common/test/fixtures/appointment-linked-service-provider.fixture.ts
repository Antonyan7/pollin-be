import {AppointmentLinkedServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  appointmentForKeepSLotBusyWithLinkedProviderFixture,
  appointmentForProcedureServiceTypeFixture,
  appointmentForSlotFixture,
  appointmentForSpecimenCollectionServiceTypeFixture,
} from '@libs/common/test/fixtures/appointment.fixture'
import {
  serviceProviderFixture,
  serviceProviderRepeatFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'

export const appointmentToServiceProviderFixture: Partial<AppointmentLinkedServiceProvider> = {
  appointmentId: appointmentForSlotFixture.id,
  serviceProviderId: serviceProviderRepeatFixture.id,
}

export const appointmentForSpecimenToServiceProviderFixture: Partial<AppointmentLinkedServiceProvider> =
  {
    appointmentId: appointmentForSpecimenCollectionServiceTypeFixture.id,
    serviceProviderId: serviceProviderRepeatFixture.id,
  }

export const appointmentForProcedureToServiceProviderFixture: Partial<AppointmentLinkedServiceProvider> =
  {
    appointmentId: appointmentForProcedureServiceTypeFixture.id,
    serviceProviderId: serviceProviderRepeatFixture.id,
  }
export const appLinkedProviderForKeepSlotBusyFixture: Partial<AppointmentLinkedServiceProvider> = {
  appointmentId: appointmentForKeepSLotBusyWithLinkedProviderFixture.id,
  serviceProviderId: serviceProviderFixture.id,
}
