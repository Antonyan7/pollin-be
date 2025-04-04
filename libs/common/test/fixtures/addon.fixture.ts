import {Addon} from '@libs/data-layer/apps/scheduling/entities/typeorm/addon.entity'

export const extendedDurationFixture: Partial<Addon> = {
  id: 1,
  uuid: '213c854e-cca4-45dc-b5d1-4b1c09cda1c9',
  name: 'Extended Duration',
}

export const virtualAppointmentFixture: Partial<Addon> = {
  id: 2,
  uuid: '7f6b9413-4752-4ab2-92b2-38f99eb6e6b4',
  name: 'Virtual Appointment',
}

export const secondOpinionFixture: Partial<Addon> = {
  id: 3,
  uuid: 'e83ed44e-c2aa-4d3d-b694-30b5b110f35f',
  name: 'Second Opinion',
}

export const partnerPresentFixture: Partial<Addon> = {
  id: 4,
  uuid: 'd706a7e3-bf77-4314-8a14-a752a7a33576',
  name: 'Partner(s) Present',
}
