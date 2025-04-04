import {DataSource, Equal} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'
import {IvfDish} from '@libs/data-layer/apps/clinic-ivf/entities'

@Injectable()
export class IvfDishRepository extends BaseRepository<IvfDish> {
  constructor(public dataSource: DataSource) {
    super(IvfDish, dataSource.createEntityManager())
  }

  getByUUID(uuid: string): Promise<IvfDish> {
    return this.findOne({
      where: {
        uuid: Equal(uuid),
      },
    })
  }
}
