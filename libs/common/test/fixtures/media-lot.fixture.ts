import {MediaLot} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'

export const activeMediaLotFixture: Partial<MediaLot> = {
  id: 1,
  uuid: '90892116-e9eb-4b86-99a9-8eb00a9dc026',
  lotNumber: 'C29912',
  active: true,
}

export const activeMediaLotForDetailsFixture: Partial<MediaLot> = {
  id: 2,
  uuid: '7ff78043-a6e9-4976-99c4-ae69dc2fabb3',
  lotNumber: 'C29913',
  active: true,
}

export const activeMediaLotForCreateDetailsFixture: Partial<MediaLot> = {
  id: 3,
  uuid: '2df5672e-5f82-401a-9390-367990f91d86',
  lotNumber: 'C29913',
  active: true,
}

export const activeMediaLotForCreateCryoCardFixture: Partial<MediaLot> = {
  id: 4,
  uuid: '4bj3303e-8f12-603o-4596-488427b76c12',
  lotNumber: 'C29914',
  active: true,
}

export const mediaLotForUpdateCryoCardDetailsFixture: Partial<MediaLot> = {
  id: 5,
  uuid: '33d3303e-8f12-603o-4596-488427b76c99',
  lotNumber: 'C2994',
  active: true,
}
