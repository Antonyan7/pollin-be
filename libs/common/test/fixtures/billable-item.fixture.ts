import {BillableItem} from '@libs/data-layer/apps/core/entities/typeorm/billable-item.entity'

export const billableItemFixture: Partial<BillableItem> = {
  id: 1,
  uuid: '550e8400-e29b-41d4-a716-446655440000',
  title: 'billableItemFixtureTitle',
}

export const billableItemFirstFixture: Partial<BillableItem> = {
  id: 2,
  uuid: '67e55044-10b1-426f-9247-bb680e5fe0c8',
  title: 'a',
}
