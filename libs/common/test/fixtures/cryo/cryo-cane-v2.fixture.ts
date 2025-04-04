import {CryoCaneV2} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {
  cryoCanCalculateFixture,
  cryoCanCreateStrawFixture,
  cryoCanForCryoCardIVFDetailsFixture,
  cryoCanV2Fixture,
} from './cryo-can-v2.fixture'

export const cryoCaneV2Fixture: Partial<CryoCaneV2> = {
  id: 1,
  uuid: '92b56003-e3ad-400a-8360-ffad2f241a80',
  name: 'Cryo Cane v2',
  cryoCanId: cryoCanV2Fixture.id,
  totalCapacity: 8,
  currentCapacity: 2,
}

export const cryoCaneV2ForUpdateCryoCardDetailsFixture: Partial<CryoCaneV2> = {
  id: 2,
  uuid: '66356003-e3ad-400a-8360-ffad2f241a80',
  name: 'Cryo Cane v2',
  cryoCanId: cryoCanV2Fixture.id,
  totalCapacity: 8,
  currentCapacity: 2,
}

export const cryoCaneV2FreeFixture: Partial<CryoCaneV2> = {
  id: 3,
  uuid: '5bj3303e-8f12-603o-4596-856323b76c12',
  name: 'Free Cane (Should not have container assigned)',
  cryoCanId: cryoCanV2Fixture.id,
  totalCapacity: 8,
  currentCapacity: 0,
}

export const cryoCaneCalculateCapacityFixture: Partial<CryoCaneV2> = {
  id: 4,
  uuid: 'db307d0a-2b9b-43e3-b842-f537c8fa9bba',
  name: 'CalculateCapacity',
  cryoCanId: cryoCanCalculateFixture.id,
  totalCapacity: 8,
  currentCapacity: 0,
}

export const cryoCaneCalculateCapacityThawedFixture: Partial<CryoCaneV2> = {
  id: 5,
  uuid: '4e3258d2-c2dc-440c-8b5a-0f51dba574a3',
  name: 'CalculateCapacityThawed',
  cryoCanId: cryoCanCalculateFixture.id,
  totalCapacity: 8,
  currentCapacity: 0,
}

export const cryoCaneCreateStrawFixture: Partial<CryoCaneV2> = {
  id: 6,
  uuid: 'd0ab04ef-b903-4096-9ac3-567f0424c674',
  name: 'cryoCaneCreateStraw',
  cryoCanId: cryoCanCreateStrawFixture.id,
  totalCapacity: 8,
  currentCapacity: 0,
}

export const cryoCaneCreateStrawCanIdFixture: Partial<CryoCaneV2> = {
  id: 7,
  uuid: 'd0ab04ef-b903-4096-9ac3-567f0424c675',
  name: 'cryoCaneCreateStraw',
  cryoCanId: cryoCanCalculateFixture.id,
  totalCapacity: 8,
  currentCapacity: 0,
}

export const cryoCaneForCryoCardIVFDetailsFixture: Partial<CryoCaneV2> = {
  id: 8,
  uuid: '11515b7a-e047-43d6-a1ee-704853528efe',
  name: 'cryoCaneCryoCardIVFDetails',
  cryoCanId: cryoCanForCryoCardIVFDetailsFixture.id,
  totalCapacity: 8,
  currentCapacity: 1,
}
