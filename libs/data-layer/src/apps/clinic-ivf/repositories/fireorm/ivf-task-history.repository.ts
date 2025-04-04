import {BaseHistoryRepository, DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {schemaValidation} from '@libs/common/utils/validate-schema'
import {
  IvfTaskHistory,
  IvfTaskHistoryPayloadType,
} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {Injectable} from '@nestjs/common'
import {CustomRepository} from 'fireorm'

@Injectable()
@CustomRepository(IvfTaskHistory)
export class IvfTaskHistoryRepository extends BaseHistoryRepository<IvfTaskHistory> {
  constructor() {
    super(IvfTaskHistory)
  }

  private readonly configService = NestprojectConfigService.getInstance()
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  async saveMultiple(dataArray: IvfTaskHistoryPayloadType[]): Promise<void> {
    if (!dataArray?.length) {
      return
    }

    const updatedAt = this.dateTimeUtil.getFirestoreTimeStampNowDate()
    const createdAt = this.dateTimeUtil.getFirestoreTimeStampNowDate()

    const batch = this.createBatch()

    for (const data of dataArray) {
      const history = new IvfTaskHistory()
      history.authUserFullName = data.authUserFullName
      history.authUserId = data.authUserId
      history.date = this.dateTimeUtil.getFirestoreTimeStampNowDate()
      history.entityTitle = data.entityTitle ?? null
      history.sourceTaskEmbryoId = data.sourceTaskEmbryoId ?? null
      history.sourceTaskSummaryId = data.sourceTaskSummaryId
      history.changes = data.changes

      history.updatedBy = data.authUserId
      history.updatedAt = updatedAt
      history.createdAt = createdAt

      await schemaValidation(history)

      batch.create(history)
    }

    await batch.commit()
  }
}
