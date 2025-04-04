import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {Patient, PatientAddress} from '@libs/data-layer/apps/users/entities/typeorm'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const patientForLabIntegrationFixture: Partial<Patient> = {
  id: 911,
  uuid: '26a80013-3416-45ba-9c1e-8c30d69fca9d',
  firstName: 'MARY',
  lastName: 'REDROSE',
  dateOfBirth: dateTimeUtil.toDate('1987-12-30'),
  ohipCardNumber: '5555555556',
  ohipCardVersionCode: null,
}

export const patientForLabIntegrationDynacareFixture: Partial<Patient> = {
  id: 912,
  uuid: '09k80013-3416-45ba-9c1e-8c30d69fca9d',
  firstName: 'Moby',
  lastName: 'Dick',
  dateOfBirth: dateTimeUtil.toDate('1979-04-03'),
  ohipCardNumber: '2222225941',
  ohipCardVersionCode: null,
}
export const patientAddressForLabIntegrationDynacareFixture: Partial<PatientAddress> = {
  id: 1,
  patientId: patientForLabIntegrationDynacareFixture.id,
  postalCode: 'ABCDEFG',
}
