import {CryoCanV2} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {
  cryoTankCalculateFixture,
  cryoTankCreateFixtureFixture,
  cryoTankForCanCreateFixture,
  cryoTankForCryoCardIVFDetailsFixture,
  cryoTankV2Fixture,
} from './cryo-tank-v2.fixture'

export const cryoCanV2Fixture: Partial<CryoCanV2> = {
  id: 1,
  uuid: '500d648b-7df0-425d-a0d3-b0f62f3c2bbc',
  name: 'Cryo Can',
  cryoTankId: cryoTankV2Fixture.id,
  totalCapacity: 20,
  currentCapacity: 2,
}

export const cryoCanCalculateFixture: Partial<CryoCanV2> = {
  id: 2,
  uuid: '027ab87c-333c-45e3-81c0-ca65ee34e597',
  name: 'Cryo Can Calculate',
  cryoTankId: cryoTankCalculateFixture.id,
  totalCapacity: 20,
  currentCapacity: 0,
}

export const cryoCanCreateStrawFixture: Partial<CryoCanV2> = {
  id: 3,
  uuid: 'acce4b46-2927-4c8a-a75f-7be6c6f8961a',
  name: 'Cryo Can Create Straw',
  cryoTankId: cryoTankCreateFixtureFixture.id,
  totalCapacity: 20,
  currentCapacity: 0,
}
export const cryoCanV2StrawFixture: Partial<CryoCanV2> = {
  id: 4,
  uuid: '5fb548b2-cc41-4587-9e8d-6b964fa6cce9',
  name: 'Cryo Can Create Straw',
  cryoTankId: cryoTankForCanCreateFixture.id,
  totalCapacity: 20,
  currentCapacity: 0,
}

export const cryoCanForCryoCardIVFDetailsFixture: Partial<CryoCanV2> = {
  id: 5,
  uuid: 'b49636df-b814-4e14-846a-a12620026c47',
  name: 'ForCryoCardIVFDetails',
  cryoTankId: cryoTankForCryoCardIVFDetailsFixture.id,
  totalCapacity: 20,
  currentCapacity: 0,
}
