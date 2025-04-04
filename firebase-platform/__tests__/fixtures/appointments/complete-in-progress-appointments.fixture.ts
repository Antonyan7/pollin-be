import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {AppointmentStatus} from '@libs/common/enums'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'
import {SuperType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const patientId = 101
const authUserId = 'CF_TEST_AUTH_ID'
const firstName1 = 'CF_TEST_NAME'
const lastName1 = 'CF_TEST_LAST_NAME'
const middleName = 'CF_TEST_MIDDLE_NAME'
const serviceProviderId = 10
const serviceTypeId = 10
const serviceWithoutWorkflowAppointmentsFixtureId = 20

export const arrivedAppointmentStatus = '78sa0df-43dsg3-4t3hf34h'
export const inProgressAppointmentStatusId = '78sa0df-43dsg3-4t3hf34f'
export const secondInProgressAppointmentStatusId = '78sa0df-43dsg3-4t3hf34g'
export const appointmentWithoutWorkflowId = '881fe65a-6eba-11ef-9c13-0242ac120002'

export const patientFixtureForCompleteInProgressAppointmentsFixture: Partial<Patient> = {
  id: patientId,
  authUserId: authUserId,
  firstName: firstName1,
  lastName: lastName1,
  middleName: middleName,
}

export const serviceProviderForCompleteInProgressAppointmentsFixture: Partial<ServiceProvider> = {
  id: serviceProviderId,
}

export const serviceTypeForAppointmentUpdatesFixture: Partial<ServiceType> = {
  id: 33,
  name: 'TEST_NAME_TO_UPDATE',
  uuid: 'followUpServiceTypeFixture',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'FLP',
  color: '#F8B5C9',
}

export const followUpServiceTypeFixture: Partial<ServiceType> = {
  id: 34,
  name: 'followUpServiceTypeFixture',
  uuid: 'serviceTypeUpdatedUUID',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
}

export const superTypeForCompleteInProgressAppointmentsFixture: Partial<SuperType> = {
  id: 22,
  uuid: '0802715b-0da0-466a-8149-86a266e24b0e',
  name: 'superTypeFixture',
  specialWorkflow: ServiceTypeWorkflow.Procedure,
  groupOrderActionsByWorkflow: true,
}

export const superTypeWithoutWorkflowAppointmentsFixture: Partial<SuperType> = {
  id: 23,
  uuid: '881fe65a-6eba-11ef-9c13-0242ac120003',
  name: 'superTypeWithoutWorkflowAppointmentsFixture',
  specialWorkflow: null,
  groupOrderActionsByWorkflow: true,
}

export const serviceTypeForCompleteInProgressAppointmentsFixture: Partial<ServiceType> = {
  id: serviceTypeId,
  name: 'TEST_NAME',
  superTypeId: superTypeForCompleteInProgressAppointmentsFixture.id,
  durationInMinutes: 10,
  price: 100,
}

export const serviceWithoutWorkflowAppointmentsFixture: Partial<ServiceType> = {
  id: serviceWithoutWorkflowAppointmentsFixtureId,
  name: 'serviceWithoutWorkflowAppointmentsFixture',
  superTypeId: superTypeWithoutWorkflowAppointmentsFixture.id,
  durationInMinutes: 10,
  price: 100,
}

export const appointmentsForCompleteInProgressAppointmentsFixtures: Partial<Appointment>[] = [
  {
    id: 222,
    patientId: patientFixtureForCompleteInProgressAppointmentsFixture.id,
    uuid: inProgressAppointmentStatusId,
    status: AppointmentStatus.InProgress,
    serviceProviderId: serviceProviderForCompleteInProgressAppointmentsFixture.id,
    serviceTypeId: serviceTypeForAppointmentUpdatesFixture.id,
    start: dateTimeUtil.toDate('2022-09-07 01:01:24'),
    end: dateTimeUtil.toDate('2022-09-07 01:02:24'),
    description: 'TEST_DESC',
    patient: patientFixtureForCompleteInProgressAppointmentsFixture as Patient,
    serviceType: serviceTypeForCompleteInProgressAppointmentsFixture as ServiceType,
  },
  {
    id: 333,
    patientId: patientFixtureForCompleteInProgressAppointmentsFixture.id,
    uuid: secondInProgressAppointmentStatusId,
    status: AppointmentStatus.InProgress,
    serviceProviderId: serviceProviderForCompleteInProgressAppointmentsFixture.id,
    serviceTypeId: serviceTypeId,
    start: dateTimeUtil.toDate('2022-09-15 01:01:24'),
    end: dateTimeUtil.toDate('2022-09-16 01:02:24'),
    description: 'TEST_DESC',
    patient: patientFixtureForCompleteInProgressAppointmentsFixture as Patient,
    serviceType: serviceTypeForCompleteInProgressAppointmentsFixture as ServiceType,
  },
  {
    id: 444,
    patientId: patientFixtureForCompleteInProgressAppointmentsFixture.id,
    uuid: arrivedAppointmentStatus,
    status: AppointmentStatus.CheckedIn,
    serviceProviderId: serviceProviderForCompleteInProgressAppointmentsFixture.id,
    serviceTypeId: serviceTypeId,
    start: dateTimeUtil.toDate('2022-09-04 01:01:24'),
    end: dateTimeUtil.toDate('2022-09-05 01:02:24'),
    description: 'TEST_DESC',
    patient: patientFixtureForCompleteInProgressAppointmentsFixture as Patient,
    serviceType: serviceTypeForCompleteInProgressAppointmentsFixture as ServiceType,
  },
  {
    id: 555,
    patientId: patientFixtureForCompleteInProgressAppointmentsFixture.id,
    uuid: appointmentWithoutWorkflowId,
    status: AppointmentStatus.InProgress,
    serviceProviderId: serviceProviderForCompleteInProgressAppointmentsFixture.id,
    serviceTypeId: serviceWithoutWorkflowAppointmentsFixtureId,
    start: dateTimeUtil.toDate('2022-09-04 01:01:24'),
    end: dateTimeUtil.toDate('2022-09-05 01:02:24'),
    description:
      'should close even if it is not associated with super type that has special workflow',
    patient: patientFixtureForCompleteInProgressAppointmentsFixture as Patient,
  },
]

export const notInProgressAppointmentsForCompleteInProgressAppointmentsFixtures: Partial<Appointment>[] =
  [
    {
      patientId: patientFixtureForCompleteInProgressAppointmentsFixture.id,
      id: 555,
      uuid: '85b618de-e0d5-457a-85d4-b8ef9a7cfdb2',
      status: AppointmentStatus.Confirmed,
      serviceProviderId: serviceProviderForCompleteInProgressAppointmentsFixture.id,
      serviceTypeId: serviceTypeId,
      start: dateTimeUtil.toDate('2022-09-07 01:01:24'),
      end: dateTimeUtil.toDate('2022-09-07 01:02:24'),
      description: 'TEST_DESC',
      patient: patientFixtureForCompleteInProgressAppointmentsFixture as Patient,
      serviceType: serviceTypeForCompleteInProgressAppointmentsFixture as ServiceType,
    },
    {
      patientId: patientFixtureForCompleteInProgressAppointmentsFixture.id,
      id: 666,
      uuid: '1280d2e8-c40b-4a72-8574-8874c86d8409',
      status: AppointmentStatus.CheckedIn,
      serviceProviderId: serviceProviderForCompleteInProgressAppointmentsFixture.id,
      serviceTypeId: serviceTypeId,
      start: dateTimeUtil.toDate('2022-09-15 01:01:24'),
      end: dateTimeUtil.toDate('2022-09-16 01:02:24'),
      description: 'TEST_DESC',
      patient: patientFixtureForCompleteInProgressAppointmentsFixture as Patient,
      serviceType: serviceTypeForCompleteInProgressAppointmentsFixture as ServiceType,
    },
  ]
