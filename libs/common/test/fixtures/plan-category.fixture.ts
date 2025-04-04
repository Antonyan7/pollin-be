import {PlanCategory} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanTemplateType} from '@libs/data-layer/apps/plan/enums/plan-category.enum'

export const planCategoryFixture: Partial<PlanCategory> = {
  id: 1,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994c4',
  title: 'planCategory',
}

export const planCategoryEPPFixture: Partial<PlanCategory> = {
  id: 2,
  uuid: 'b9c69f4f-bb93-46b2-8b15-f51506f994c4',
  title: 'EPP',
  template: PlanTemplateType.EPP,
}

export const planCategoryV2Fixture: Partial<PlanCategory> = {
  id: 3,
  uuid: 'b9c69f5f-bb93-46b2-8b15-f51506f994c4',
  title: 'Category',
}

export const planCategoryV2WithoutTypesFixture: Partial<PlanCategory> = {
  id: 4,
  uuid: 'b9c29f5f-bb93-46b2-8b15-f51506f994c4',
  title: 'Without types',
}
