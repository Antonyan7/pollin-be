import {Reagent} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {CryoSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'

export const reagentFixture: Partial<Reagent> = {
  id: 1,
  uuid: 'bfefe405-d54f-4794-ae01-a1a73fda8d77',
  name: 'Ethylene Glycol (EG)',
  type: CryoSampleType.Sperm,
}

export const reagentDMSOFixture: Partial<Reagent> = {
  id: 2,
  uuid: '4c054df0-5383-4a4b-af78-5cade8d6dfd8',
  name: 'DMSO',
  type: CryoSampleType.Sperm,
}

export const reagentForEggFixture: Partial<Reagent> = {
  id: 4,
  uuid: '4c054df0-5383-0a4b-af78-5cade8d6dfd8',
  name: 'reagentForEggFixture',
  type: CryoSampleType.Egg,
}

export const reagentForUpdateCryoCardDetailsEggFixture: Partial<Reagent> = {
  id: 5,
  uuid: '88854df0-5383-1a4b-af78-5cade8d6df32',
  name: 'reagentForUpdateCryoCardDetailsEggFixture',
  type: CryoSampleType.Egg,
}

export const reagentForEmbryoFixture: Partial<Reagent> = {
  id: 6,
  uuid: '88854df0-5383-2a4b-af78-5cade8d6df32',
  name: 'reagentForEmbryoFixture',
  type: CryoSampleType.Embryo,
}
