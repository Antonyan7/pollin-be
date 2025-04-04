import {
  medicationDetailFixture,
  medicationFixture,
  medicationForSearchTitleFixture,
} from '@libs/common/test/fixtures'
import {MedicationToMedicationCategory} from '@libs/data-layer/apps/medication/entities/typeorm'
import {
  medicationCategoryFixture,
  medicationCategoryForPlanCreationFixture,
} from './medication-category.fixture'

export const medicationToMedicationCategoryFixture: Partial<MedicationToMedicationCategory> = {
  id: 1,
  medicationCategoryId: medicationCategoryFixture.id,
  medicationId: medicationFixture.id,
  preselected: false,
}

export const medicationToMedicationCategoryForPlansFixture: Partial<MedicationToMedicationCategory> =
  {
    id: 2,
    medicationCategoryId: medicationCategoryForPlanCreationFixture.id,
    medicationId: medicationFixture.id,
    preselected: true,
  }

export const medicationDetailToMedicationCategoryForPlansFixture: Partial<MedicationToMedicationCategory> =
  {
    id: 3,
    medicationCategoryId: medicationCategoryForPlanCreationFixture.id,
    medicationId: medicationDetailFixture.id,
    preselected: false,
  }

export const medicationForSearchTitleToMedicationCategoryFixture: Partial<MedicationToMedicationCategory> =
  {
    id: 4,
    medicationCategoryId: medicationCategoryFixture.id,
    medicationId: medicationForSearchTitleFixture.id,
    preselected: false,
  }

export const medicationDetailToMedicationCategoryFixture: Partial<MedicationToMedicationCategory> =
  {
    id: 5,
    medicationCategoryId: medicationCategoryFixture.id,
    medicationId: medicationDetailFixture.id,
    preselected: false,
  }
