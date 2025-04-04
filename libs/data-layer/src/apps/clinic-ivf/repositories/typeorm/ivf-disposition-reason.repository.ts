import {IVFDispositionReason} from '@libs/data-layer/apps/clinic-ivf/entities'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'
import {DataSource} from 'typeorm'

@Injectable()
export class IVFDispositionReasonRepository extends BaseRepository<IVFDispositionReason> {
  constructor(public dataSource: DataSource) {
    super(IVFDispositionReason, dataSource.createEntityManager())
  }
}
