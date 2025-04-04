import {IVFCancellationReason} from '@libs/data-layer/apps/clinic-ivf/entities'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'
import {DataSource} from 'typeorm'

@Injectable()
export class IVFCancellationReasonRepository extends BaseRepository<IVFCancellationReason> {
  constructor(public dataSource: DataSource) {
    super(IVFCancellationReason, dataSource.createEntityManager())
  }
}
