import {patientSubscriptionEggEmbryoFixture} from './patient'
import {
  CryoSampleType,
  CryoStatus,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/cryo.enum'
import {CryoInventoryCard} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm/cryo-inventory-card.entity'
import {DonorEligibility} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/donor-eligibility.enum'
import {CryoSampleDonor} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm/cryo-sample-donor.entity'
import {CryoSampleContainer} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm/cryo-sample-container.entity'

export const cryoSubDonorFixture: Partial<CryoSampleDonor> = {
  id: 10070,
  uuid: 'a3cc064c-5908-46df-bf74-c8aea47fc7e6',
  isDonorPresent: false,
  note: 'Note',
  donorNumber: '1',
  bank: 'Nestproject Bank',
  eligibility: DonorEligibility.Eligible,
}

export const cryoInventoryCardForEggSampleFixture: Partial<CryoInventoryCard> = {
  id: 10070,
  uuid: '243afec0-18b2-4d45-bd57-a1c7da468780',
  patientId: patientSubscriptionEggEmbryoFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2022-01-01',
  cryoDonorId: cryoSubDonorFixture.id,
}

export const cryoSubSampleContainerEarliestFixture: Partial<CryoSampleContainer> = {
  id: 1000070,
  uuid: '59913d21-f792-4c5a-b2d6-6ab00bd3de88',
  status: CryoStatus.Frozen,
  identifier: 'ID10070',
  freezeWitness: 'freezeWitness',
  freezeComment: 'freezeComment',
  freezeDate: '2020-01-01',
  thawDate: null,
  eggCount: 1,
  cryoInventoryCardId: cryoInventoryCardForEggSampleFixture.id,
  strawNumber: 1,
}

export const cryoSubSampleContainerLatestFixture: Partial<CryoSampleContainer> = {
  id: 1000071,
  uuid: '44385e80-679b-4b6a-9fd2-7523a62ddf5d',
  status: CryoStatus.Frozen,
  identifier: 'ID10071',
  freezeWitness: 'freezeWitness',
  freezeComment: 'freezeComment',
  freezeDate: '2021-01-01',
  thawDate: null,
  eggCount: 1,
  cryoInventoryCardId: cryoInventoryCardForEggSampleFixture.id,
  strawNumber: 1,
}
