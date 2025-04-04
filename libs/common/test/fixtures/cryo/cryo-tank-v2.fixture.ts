import {CryoTankV2} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'

export const cryoTankV2Fixture: Partial<CryoTankV2> = {
  id: 1,
  uuid: '3c95e94c-0e03-456f-a7f0-05b229c82af8',
  name: 'Cryo Tank v2',
  label: 'Cryo Tank v2',
  totalCapacity: 10,
  currentCapacity: 4,
  sequence: 1,
}

export const cryoTankCalculateFixture: Partial<CryoTankV2> = {
  id: 2,
  uuid: '9ee762d0-4e2e-4677-a8cd-0714f1b553a8',
  name: 'CryoTankCalculateFixture',
  label: 'CryoTankCalculateFixture',
  totalCapacity: 10,
  currentCapacity: 0,
  sequence: 2,
}

export const cryoTankCreateFixtureFixture: Partial<CryoTankV2> = {
  id: 3,
  uuid: 'f97e59aa-d0f9-44d7-bf8e-8c3cb839ed8c',
  name: 'cryoTankCreateFixtureFixture',
  label: 'cryoTankCreateFixtureFixture',
  totalCapacity: 10,
  currentCapacity: 0,
  sequence: 3,
}
export const cryoTankForCanCreateFixture: Partial<CryoTankV2> = {
  id: 4,
  uuid: 'adc0c732-ec53-40bd-8b3d-70504dfa9d1a',
  name: 'cryoTankCreateFixtureFixture',
  label: 'cryoTankCreateFixtureFixture',
  totalCapacity: 10,
  currentCapacity: 0,
  sequence: 4,
}

export const cryoTankForCryoCardIVFDetailsFixture: Partial<CryoTankV2> = {
  id: 5,
  uuid: 'f77b5e96-fa28-4006-83d5-fff64f6450ba',
  name: 'CryoTankForCryoCardIVFDetails',
  label: 'CryoTankForCryoCardIVFDetails',
  totalCapacity: 10,
  currentCapacity: 0,
  sequence: 5,
}
