import {DishScanningLog} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {BaseHistoryRepository, DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {schemaValidation} from '@libs/common/utils/validate-schema'
import {Injectable} from '@nestjs/common'
import {CustomRepository} from 'fireorm'
import {ActionHistorySortByFieldEnum} from '@libs/common/enums'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'

@Injectable()
@CustomRepository(DishScanningLog)
export class DishScanningLogRepository extends BaseHistoryRepository<DishScanningLog> {
  constructor() {
    super(DishScanningLog)
  }

  private readonly configService = NestprojectConfigService.getInstance()
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  async updateLastLogWithErrorReason(
    patientPlanCohortId: number,
    errorReason: string,
  ): Promise<void> {
    const querySnapshot = await this.firestoreColRef
      .where('patientPlanCohortId', '==', patientPlanCohortId)
      .orderBy('date', 'desc')
      .limit(1)
      .get()

    if (querySnapshot.empty) {
      return
    }

    const doc = querySnapshot.docs[0]
    await doc.ref.update({errorReason})
  }

  async getPaginatedHistory(
    payload: {
      sortByField: ActionHistorySortByFieldEnum
      sortOrder: SortOrder
      pageSize: number
    },
    parameters: {fieldName: keyof DishScanningLog; value: string | number}[],
    cursor?: string,
  ): Promise<{items: DishScanningLog[]; nextCursor: string}> {
    const {sortByField, sortOrder, pageSize} = payload

    if (parameters.some((par) => !par?.value || !par?.fieldName)) {
      return {items: [], nextCursor: null}
    }

    const orderField = this.getFieldForSort(sortByField)
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
    const items = result.docs.map((doc) => doc.data() as DishScanningLog)

    const nextCursor = items.length > pageSize ? items.pop().id : null

    return {items, nextCursor}
  }

  private getFieldForSort(sortByField: ActionHistorySortByFieldEnum): keyof DishScanningLog {
    switch (sortByField) {
      case ActionHistorySortByFieldEnum.EditedBy:
        return 'authUserFullName'
      case ActionHistorySortByFieldEnum.Task:
        return 'day'
      case ActionHistorySortByFieldEnum.DishType:
        return 'dishLabel'
      case ActionHistorySortByFieldEnum.IdentityMatched:
        return 'identityMatch'
      case ActionHistorySortByFieldEnum.ScannedBy:
        return 'scannedBy'
      case ActionHistorySortByFieldEnum.PatientFullName:
        return 'patientFullName'
      case ActionHistorySortByFieldEnum.Date:
      default:
        return 'date'
    }
  }

  async saveMultiple(dataArray: DishScanningLog[]): Promise<void> {
    if (!dataArray?.length) {
      return
    }

    const updatedAt = this.dateTimeUtil.getFirestoreTimeStampNowDate()
    const createdAt = this.dateTimeUtil.getFirestoreTimeStampNowDate()

    const batch = this.createBatch()

    for (const data of dataArray) {
      const dishScanningLog = new DishScanningLog()
      dishScanningLog.authUserFullName = data.authUserFullName
      dishScanningLog.authUserId = data.authUserId
      dishScanningLog.date = this.dateTimeUtil.getFirestoreTimeStampNowDate()
      dishScanningLog.day = data.day
      dishScanningLog.dishLabel = data.dishLabel ?? null
      dishScanningLog.identityMatch = data.identityMatch ?? null
      dishScanningLog.identityMatchReason = data.identityMatchReason ?? null
      dishScanningLog.patientPlanCohortIvfDishId = data.patientPlanCohortIvfDishId ?? null
      dishScanningLog.patientPlanCohortGroupId = data.patientPlanCohortGroupId ?? null
      dishScanningLog.patientPlanCohortId = data.patientPlanCohortId ?? null
      dishScanningLog.patientFullName = data.patientFullName ?? null
      dishScanningLog.scannedBy = data.scannedBy
      dishScanningLog.scannedDate = data.scannedDate
      dishScanningLog.updatedBy = data.authUserId
      dishScanningLog.errorReason = data.errorReason
      dishScanningLog.updatedAt = updatedAt
      dishScanningLog.createdAt = createdAt

      await schemaValidation(dishScanningLog)
      batch.create(dishScanningLog)
    }

    await batch.commit()
  }
}
