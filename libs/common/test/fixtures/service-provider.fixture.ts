import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  serviceProviderGroupCareNavigator,
  serviceProviderGroupDoctor,
  serviceProviderGroupNurse,
} from './service-provider-group.fixture'
export const serviceProviderFixtureId: number = 1
export const serviceProviderV2FixtureId: number = 11

export const serviceProviderAppointmentsFixtureId: number = 2
export const serviceProviderAppointmentsLengthFixtureId: number = 3
export const serviceProviderRepeatConfigFixtureId: number = 4
export const serviceProviderForIsEditableFixtureId: number = 8
export const serviceProviderForIsEditableFixtureUuid: string =
  'c6c908f5-132d-11ed-814e-0242ac770006'

export const invalidServiceProviderUUID: string = '404c11ae-eca3-463a-9448-a0f0ea7cc404'

export const serviceProviderFixture: Partial<ServiceProvider> = {
  id: serviceProviderFixtureId,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110002',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  videoURL: 'videoUrl',
  description: 'Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
  maxAppointmentCountPerSlot: 10,
  displayServiceProviderNameOnCheckout: true,
  externalZoomUserId: 'zoom email',
}

export const serviceProviderV2Fixture: Partial<ServiceProvider> = {
  id: serviceProviderV2FixtureId,
  uuid: 'c8478582-9309-4333-b2cc-56b605844bd7',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  videoURL: 'videoUrl',
  description: 'Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
  maxAppointmentCountPerSlot: 10,
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderAppointmentsFixture: Partial<ServiceProvider> = {
  id: serviceProviderAppointmentsFixtureId,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110005',
  title: 'Provider Fixture 2',
  imageURL: 'IMG 2',
  description: 'Provider Description Fixture',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderForAppointmentsLengthFixture: Partial<ServiceProvider> = {
  id: serviceProviderAppointmentsLengthFixtureId,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110007',
  title: 'Dr. John Doe22',
  imageURL: 'IMG 3',
  description: 'Provider Description Fixture 3',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderRepeatFixture: Partial<ServiceProvider> = {
  id: serviceProviderRepeatConfigFixtureId,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac770002',
  title: 'Dr. John Repeat Doe',
  imageURL: 'serviceProviderRepeatImage',
  description: 'Repeat Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: serviceProviderGroupNurse.id,
  displayServiceProviderNameOnCheckout: true,
}

export const mainServiceProviderForCareTeamFixture: Partial<ServiceProvider> = {
  id: 5,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac770003',
  imageURL: 'mainServiceProviderForCareTeamImage',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
  displayServiceProviderNameOnCheckout: true,
}

export const secondaryServiceProviderForCareTeamFixture: Partial<ServiceProvider> = {
  id: 6,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac770004',
  title: 'secondaryServiceProviderForCareTeam',
  imageURL: 'secondaryServiceProviderForCareTeamImage',
  serviceProviderGroupId: serviceProviderGroupCareNavigator.id,
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderForBookingFlowFixture: Partial<ServiceProvider> = {
  id: 7,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac770005',
  title: 'serviceProviderForBookingFlow',
  imageURL: 'serviceProviderForBookingFlowFixture',
  serviceProviderGroupId: serviceProviderGroupCareNavigator.id,
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderForIsEditableFixture: Partial<ServiceProvider> = {
  id: serviceProviderForIsEditableFixtureId,
  uuid: serviceProviderForIsEditableFixtureUuid,
  imageURL: 'serviceProviderForBookingFlowFixture',
  title: 'Dr. John Doe',
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderWhichShouldNotShowAsDisabledForCareTeamFixture: Partial<ServiceProvider> =
  {
    id: 9,
    uuid: '55c908f5-132d-11ed-819e-0262ac770004',
    title: 'Dr. John',
    imageURL: 'IMG',
    videoURL: 'videoUrl',
    description: 'Provider Description Fixture',
    designation: 'MD',
    serviceProviderGroupId: serviceProviderGroupDoctor.id,
    showInPrimaryCareTeam: false,
    displayServiceProviderNameOnCheckout: true,
  }

export const serviceProviderForAutomaticSelectionFixture: Partial<ServiceProvider> = {
  id: 10,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac770010',
  imageURL: 'serviceProviderForAutomaticSelection',
}

export const serviceProviderForSerGroupAvailExtra1Fixture: Partial<ServiceProvider> = {
  id: 13,
}

export const serviceProviderForSerGroupAvailExtra2Fixture: Partial<ServiceProvider> = {
  id: 14,
}
export const serviceProviderForSerGroupAvailExtra3Fixture: Partial<ServiceProvider> = {
  id: 15,
}

export const serviceProviderForSerGroupAvailAutoProviderSelectionFixture: Partial<ServiceProvider> =
  {
    id: 16,
    title: '',
  }

export const serviceProviderSemenCollectionFixture: Partial<ServiceProvider> = {
  id: 17,
  uuid: 'a9891117-8ab4-4b55-b266-171bc1993d33',
  title: 'Semen Collection',
}

export const serviceProviderToBlockFixture: Partial<ServiceProvider> = {
  id: 18,
  uuid: 'a9891117-8ab4-4b55-c266-171bc1993d33',
}

export const serviceProviderToNotBlockFixture: Partial<ServiceProvider> = {
  id: 19,
  uuid: 'a9891117-8ab4-4b55-d266-171bc1993d33',
}

export const serviceProviderToNotShowInOtherProvidersFixture: Partial<ServiceProvider> = {
  id: 20,
  uuid: 'a2091117-8ab4-4b55-d266-171bc1993d33',
  showInOtherCareTeam: false,
}

export const serviceProviderObUltrasoundFixture: Partial<ServiceProvider> = {
  id: 21,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110003',
  title: 'Dr. John Doe ObUltrasound',
  imageURL: 'IMG',
  videoURL: 'videoUrl',
  description: 'Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
  maxAppointmentCountPerSlot: 10,
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderBilling: Partial<ServiceProvider> = {
  id: 22,
  uuid: 'a2091117-8ab4-4b55-d266-qqqqc1993d33',
  title: 'Billing Provider',
  displayServiceProviderNameOnCheckout: true,
}

export const serviceProviderForMobileFixture: Partial<ServiceProvider> = {
  id: 23,
  uuid: 23 + 'a9891117-8ab4-4b55-c266',
}

export const serviceProviderToTimeOffBlockFixture: Partial<ServiceProvider> = {
  id: 24,
  uuid: '7797e1f2-5852-4a50-88af-f39c1365251c',
}

export const serviceProviderToNotTimeOffBlockFixture: Partial<ServiceProvider> = {
  id: 25,
  uuid: 'a6e3bbc1-6fad-414f-aa2f-006fc2ef84c9',
}

export const serviceProviderInActiveFixture: Partial<ServiceProvider> = {
  id: 26,
  uuid: '652fd1a4-2806-48cd-bfc9-5c299dab1537',
  isActive: false,
}

export const serviceProviderNotActiveFixture: Partial<ServiceProvider> = {
  id: 27,
  uuid: 'a6ekkbc1-6fad-414f-aa2f-006fc2e224c9',
  title: 'Not Active',
  isActive: false,
}

export const serviceProviderWithoutAppointmentsFixture: Partial<ServiceProvider> = {
  id: 28,
  uuid: 'a6c208f5-132d-11ed-814e-0242ac770005',
  title: 'serviceProviderWithoutAppointmentsFixture',
  imageURL: 'serviceProviderWithoutAppointmentsFixture',
  serviceProviderGroupId: serviceProviderGroupCareNavigator.id,
}

export const serviceProviderForSearchFixture: Partial<ServiceProvider> = {
  id: 29,
  uuid: 'c6c208f1-132a-33ed-814e-0242ac770003',
  title: 'NOT ACserviceProvider',
  serviceProviderGroupId: serviceProviderGroupDoctor.id,
}

export const serviceProviderForAutomaticSelectionEarlierFixture: Partial<ServiceProvider> = {
  id: 30,
  uuid: 'c6c928a5-132d-11ed-814e-0242ac770010',
}

export const serviceProviderForApplyIntervalsFixture: Partial<ServiceProvider> = {
  id: 31,
  uuid: 'a6c228a5-132d-11ed-814e-0242ac770010',
  maxAppointmentCountPerSlot: 2,
}

export const serviceProviderWithCareTeamEmailFixture: Partial<ServiceProvider> = {
  id: 32,
  uuid: '12768068-72d7-4fdc-b290-8b68b1f58f0d',
  maxAppointmentCountPerSlot: 2,
}
