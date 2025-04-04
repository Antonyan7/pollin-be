import {PatientToServiceProvider} from '@libs/data-layer/apps/users/entities/typeorm/patient-to-service-provider.entity'
import {
  secondaryServiceProviderForCareTeamFixture,
  serviceProviderAppointmentsFixture,
  serviceProviderFixture,
  serviceProviderFixtureId,
  serviceProviderForBookingFlowFixture,
  serviceProviderToNotShowInOtherProvidersFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'
import {DateTimeUtil} from '@libs/common'

const patientForCareProvidersId: number = 28
const patientForProfileHighlightFixtureId: number = 15
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(null)
export const patientForTestResultId: number = 25

export const patientToServiceProviderFixture: Partial<PatientToServiceProvider> = {
  patientId: patientForTestResultId,
  serviceProviderId: serviceProviderFixtureId,
}

const patientToServiceProviderFromOtherCareTeamFixture: Partial<PatientToServiceProvider> = {
  patientId: patientForCareProvidersId,
  serviceProviderId: serviceProviderAppointmentsFixture.id,
}

const patientToServiceProviderFromOtherCareTeamOldFixture: Partial<PatientToServiceProvider> = {
  patientId: patientForCareProvidersId,
  serviceProviderId: secondaryServiceProviderForCareTeamFixture.id,
}

const patientToServiceProviderFromPrimaryCareTeamFixture: Partial<PatientToServiceProvider> = {
  patientId: patientForCareProvidersId,
  serviceProviderId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.addDays(dateTimeUtil.now(), -2),
  updatedAt: dateTimeUtil.addDays(dateTimeUtil.now(), -1),
}

export const patientToServiceProvidersForCareProvidersFixtures: Partial<PatientToServiceProvider>[] =
  [
    patientToServiceProviderFromOtherCareTeamFixture,
    patientToServiceProviderFromOtherCareTeamOldFixture,
    patientToServiceProviderFromPrimaryCareTeamFixture,
  ]

export const patientToServiceProviderOtherProvidersFixture: Partial<PatientToServiceProvider> = {
  patientId: patientForProfileHighlightFixtureId,
  serviceProviderId: secondaryServiceProviderForCareTeamFixture.id,
}

export const patientToServiceProviderOtherProvidersToNotShowFixture: Partial<PatientToServiceProvider> =
  {
    patientId: patientForProfileHighlightFixtureId,
    serviceProviderId: serviceProviderToNotShowInOtherProvidersFixture.id,
  }

export const patientToServiceProviderOtherProvidersDetailsFixture: Partial<PatientToServiceProvider> =
  {
    patientId: patientForProfileHighlightFixtureId,
    serviceProviderId: serviceProviderForBookingFlowFixture.id,
  }
