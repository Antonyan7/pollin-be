import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {serviceTypeFixture, specimenFixture} from '@libs/common/test/fixtures'
import {testOrderForRegularCancelEndpoint} from '@libs/common/test/fixtures/test-order.fixture'
import {Specimen, TestOrder} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {SpecimenProcessingLocation} from '@libs/data-layer/apps/clinic-test/enums'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  patientForLabIntegrationDynacareFixture,
  patientForLabIntegrationFixture,
} from './patient.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const serviceTypeForLabIntegrationFixture: Partial<ServiceType> = {
  ...serviceTypeFixture,
  serviceCategoryId: null,
  linkedServiceTypeId: null,
}

export const testOrderForLabIntegrationFixture: Partial<TestOrder> = {
  ...testOrderForRegularCancelEndpoint,
  patientId: patientForLabIntegrationFixture.id,
}

export const specimenExternalForLabIntegrationFixture: Partial<Specimen> = {
  ...specimenFixture,
  patientId: patientForLabIntegrationFixture.id,
  serviceTypeId: serviceTypeForLabIntegrationFixture.id,
  testOrderId: testOrderForLabIntegrationFixture.id,
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  collectedOn: dateTimeUtil.toDate('2017-07-17'),
  specimenGroupId: null,
  machineId: null,
  transportFolderId: null,
}

export const specimenExternalSameCollectedOnForLabIntegrationFixture: Partial<Specimen> = {
  ...specimenExternalForLabIntegrationFixture,
  id: 10,
  uuid: '28f64e27-80b2-4a85-a50a-72f5624ba013',
  specimenIdentifier: 'S0000000122',
  // same 'collectedOn' date value to reflect similar specimens edge case for Unlinked scenario
}

export const testOrderForLabIntegrationDynacareFixture: Partial<TestOrder> = {
  ...testOrderForRegularCancelEndpoint,
  patientId: patientForLabIntegrationDynacareFixture.id,
}

export const specimenExternalForLabIntegrationDynacareFixture: Partial<Specimen> = {
  ...specimenFixture,
  patientId: patientForLabIntegrationDynacareFixture.id,
  serviceTypeId: serviceTypeForLabIntegrationFixture.id,
  testOrderId: testOrderForLabIntegrationDynacareFixture.id,
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  collectedOn: dateTimeUtil.toDate('2017-07-17'),
  specimenGroupId: null,
  machineId: null,
  transportFolderId: null,
}
