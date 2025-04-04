import {ActionHistorySortByFieldEnum} from '@libs/common/enums'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {Timestamp} from 'firebase-admin/firestore'
import {BaseFirestoreRepository, IEntity} from 'fireorm'

interface IHistoryEntity extends IEntity {
  authUserFullName: string
  date: Timestamp
}

export class BaseHistoryRepository<T extends IHistoryEntity> extends BaseFirestoreRepository<T> {
  async getPaginatedHistory(
    payload: {
      sortByField: ActionHistorySortByFieldEnum
      sortOrder: SortOrder
      pageSize: number
    },
    parameters: {fieldName: keyof T; value: string | number}[],
    cursor?: string,
  ): Promise<{items: T[]; nextCursor: string}> {
    const {sortByField, sortOrder, pageSize} = payload

    if (parameters.some((par) => !par?.value || !par?.fieldName)) {
      return {items: [], nextCursor: null}
    }

    const orderField = this.getFieldToSort(sortByField)
    const direction = sortOrder === SortOrder.Asc ? 'asc' : 'desc'

    const cursorDoc = cursor ? await this.firestoreColRef.doc(cursor).get() : null

    let queryBuilder = parameters
      .reduce(
        (query, {fieldName, value}) => query.where(String(fieldName), '==', value),
        this.firestoreColRef,
      )
      .orderBy(String(orderField), direction)

    if (sortByField === ActionHistorySortByFieldEnum.EditedBy) {
      queryBuilder = queryBuilder.orderBy('date', 'desc')
    }

    if (cursorDoc) {
      queryBuilder = queryBuilder.startAt(cursorDoc)
    }

    const result = await queryBuilder.limit(pageSize + 1).get()
    const items = result.docs.map((doc) => doc.data() as T)

    const nextCursor = items.length > pageSize ? items.pop().id : null

    return {items, nextCursor}
  }

  private getFieldToSort(sortByField: ActionHistorySortByFieldEnum): keyof T {
    switch (sortByField) {
      case ActionHistorySortByFieldEnum.EditedBy:
        return 'authUserFullName'
      case ActionHistorySortByFieldEnum.Date:
      default:
        return 'date'
    }
  }
}
