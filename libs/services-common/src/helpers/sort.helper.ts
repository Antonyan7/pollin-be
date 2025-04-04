import {FindOptionsOrderValue} from 'typeorm'

export enum SortOrder {
  Asc = 'Asc',
  Desc = 'Desc',
}

export enum SortOrderMapper {
  Asc = 'ASC',
  Desc = 'DESC',
}

export const ReverseSortOrder: Record<SortOrder, FindOptionsOrderValue> = {
  [SortOrder.Asc]: 'desc',
  [SortOrder.Desc]: 'asc',
}

/**
 * Helper for ORM order value
 */
export const OrderDirection: Record<SortOrder, FindOptionsOrderValue> = {
  [SortOrder.Asc]: 'asc',
  [SortOrder.Desc]: 'desc',
}
