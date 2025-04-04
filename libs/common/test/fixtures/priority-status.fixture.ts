import {PriorityStatus} from '@libs/data-layer/apps/users/entities/typeorm'

export const priorityStatusFixture: Partial<PriorityStatus> = {
  id: 1,
  uuid: 'd9ee005e-7f51-4541-87e3-e860b69f15c3',
  name: 'priorityStatusFixture',
  abbreviation: 'abbreviation',
  textColor: 'textColor',
  borderColor: 'borderColor',
  isSelectable: true,
  isPrimaryDefault: true,
  isPartnerDefault: false,
  sequence: 1,
}

export const priorityStatusSecondSequenceFixture: Partial<PriorityStatus> = {
  id: 2,
  uuid: '1a8eb014-640c-4d48-b7b2-7973f08367d6',
  name: 'priorityStatusSecondSequenceFixture',
  abbreviation: 'abbreviation',
  textColor: 'textColor',
  borderColor: 'borderColor',
  isSelectable: true,
  isPrimaryDefault: false,
  isPartnerDefault: true,
  sequence: 2,
}

export const priorityStatusUpdateFixture: Partial<PriorityStatus> = {
  id: 3,
  uuid: '44e5fddf-dfce-4d6e-8b3f-5fee01c0585d',
  name: 'priorityStatusUpdateFixture',
  abbreviation: 'abbreviation',
  textColor: 'textColor',
  borderColor: 'borderColor',
  isSelectable: true,
  isPrimaryDefault: false,
  isPartnerDefault: true,
  sequence: 3,
}
