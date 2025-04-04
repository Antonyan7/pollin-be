import {DateTimeUtil} from '@libs/common'
import {PlanChecklistItem} from '@libs/data-layer/apps/plan/entities/typeorm/plan-checklist-item.entity'
import {PlanChecklistItemType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'

export const planCheckllistItemDisplayFixture: Partial<PlanChecklistItem> = {
  id: 1,
  uuid: '216c619f-2d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemDisplayFixture',
  type: PlanChecklistItemType.Display,
}

export const planCheckllistItemDateFixture: Partial<PlanChecklistItem> = {
  id: 2,
  uuid: '216c619f-1d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemDateFixture',
  type: PlanChecklistItemType.Date,
}

export const planCheckllistItemFullDateFixture: Partial<PlanChecklistItem> = {
  id: 3,
  uuid: '216c619f-3d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemFullDateFixture',
  type: PlanChecklistItemType.FullDate,
}

export const planCheckllistItemSoftDeletedFixture: Partial<PlanChecklistItem> = {
  id: 4,
  uuid: '216c612f-3d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemSoftDeletedFixture',
  type: PlanChecklistItemType.FullDate,
  deletedAt: new DateTimeUtil().now(),
}
