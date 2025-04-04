import {EmbryoType} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DataSource} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'

@Injectable()
export class EmbryoTypeRepository extends BaseRepository<EmbryoType> {
  constructor(public dataSource: DataSource) {
    super(EmbryoType, dataSource.createEntityManager())
  }
}
