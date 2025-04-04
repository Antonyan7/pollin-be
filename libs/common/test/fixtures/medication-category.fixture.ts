import {MedicationCategory} from '@libs/data-layer/apps/medication/entities/typeorm'

export const medicationCategoryFixtureId: number = 1
export const medicationCategoryForPlanCreationFixtureId: number = 2

export const medicationCategoryFixture: Partial<MedicationCategory> = {
  id: medicationCategoryFixtureId,
  uuid: '0ecd7311-7526-4e1d-9190-d73645151623',
  title: 'medicationCategoryTitle',
  sequence: 1,
}

export const medicationCategoryForPlanCreationFixture: Partial<MedicationCategory> = {
  id: medicationCategoryForPlanCreationFixtureId,
  uuid: '0ecd7311-7526-4e1d-9190-d73645151624',
  title: 'medicationCategoryForPlanCreationFixture',
}
