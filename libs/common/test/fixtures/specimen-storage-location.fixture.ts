import {SpecimenStorageLocation} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

export const specimenStorageLocationFixture: Partial<SpecimenStorageLocation> = {
  id: 1,
  uuid: '33dd38e0-7278-4570-a10e-d80767c50545',
  title: 'Specimen Storage Location title',
}

export const specimenStorageLocationForSpecimenUpdateFixture: Partial<SpecimenStorageLocation> = {
  id: 2,
  uuid: '0b6521a1-77dd-11ed-b47d-42010aa2000d',
  title: 'Specimen Storage Location title 2',
}
