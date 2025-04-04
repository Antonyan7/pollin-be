import {CareTeam} from '@libs/data-layer/apps/users/entities/typeorm/care-team.entity'
import {
  mainServiceProviderForCareTeamFixture,
  secondaryServiceProviderForCareTeamFixture,
  serviceProviderAppointmentsFixture,
  serviceProviderFixture,
  serviceProviderRepeatFixture,
  serviceProviderWhichShouldNotShowAsDisabledForCareTeamFixture,
} from './service-provider.fixture'

export const careTeamFixturesForCareProviders: Partial<CareTeam>[] = [
  {
    id: 1,
    mainServiceProviderId: mainServiceProviderForCareTeamFixture.id,
    serviceProviderId: serviceProviderRepeatFixture.id,
    sequence: 2,
  },
  {
    id: 2,
    mainServiceProviderId: mainServiceProviderForCareTeamFixture.id,
    serviceProviderId: secondaryServiceProviderForCareTeamFixture.id,
    sequence: 1,
  },

  {
    id: 3,
    mainServiceProviderId: serviceProviderFixture.id,
    serviceProviderId: serviceProviderAppointmentsFixture.id,
    sequence: 1,
  },
  {
    id: 4,
    mainServiceProviderId: mainServiceProviderForCareTeamFixture.id,
    serviceProviderId: serviceProviderWhichShouldNotShowAsDisabledForCareTeamFixture.id,
    sequence: 4,
  },
]
