import {SpecimenGroup} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

export const specimenGroupFixture: Partial<SpecimenGroup> = {
  id: 1,
}

export const specimenGrouplessFixture: Partial<SpecimenGroup> = {
  id: 2,
  title: 'Without Group',
}
