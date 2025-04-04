import {PlanChecklist} from '@libs/data-layer/apps/plan/entities/typeorm/plan-checklist.entity'
import {
  planCheckllistItemDateFixture,
  planCheckllistItemDisplayFixture,
  planCheckllistItemFullDateFixture,
  planCheckllistItemSoftDeletedFixture,
} from './plan-checklist-item.fixture'
import {PlanChecklistToItem} from '@libs/data-layer/apps/plan/entities/typeorm/plan-checklist-to-item.entity'

export const planIVFChecklistFixture: Partial<PlanChecklist> = {
  id: 1,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d79',
  internalName: 'planIVFChecklistFixture',
  itemsRelations: [
    {
      planChecklistItemId: planCheckllistItemDisplayFixture.id,
      sequence: 2,
    },
    {
      planChecklistItemId: planCheckllistItemDateFixture.id,
      sequence: 1,
    },
    {
      planChecklistItemId: planCheckllistItemFullDateFixture.id,
      sequence: 3,
    },
    {
      planChecklistItemId: planCheckllistItemSoftDeletedFixture.id,
      sequence: 4,
    },
  ] as PlanChecklistToItem[],
}

export const planChecklistEmptyFixture: Partial<PlanChecklist> = {
  id: 2,
  uuid: '312c619f-8d03-4660-a147-c4dcee193d79',
  internalName: 'planChecklistEmptyFixture',
  itemsRelations: [],
}
