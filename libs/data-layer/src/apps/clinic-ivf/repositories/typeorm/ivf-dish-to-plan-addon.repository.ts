import {DataSource, Equal} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'
import {IvfDishToPlanAddon} from '@libs/data-layer/apps/clinic-ivf/entities'

@Injectable()
export class IvfDishToPlanAddonRepository extends BaseRepository<IvfDishToPlanAddon> {
  constructor(public dataSource: DataSource) {
    super(IvfDishToPlanAddon, dataSource.createEntityManager())
  }

  findByPlanAddonId(planAddonId: number): Promise<IvfDishToPlanAddon[]> {
    return this.find({
      where: {planAddonId: Equal(planAddonId)},
      relations: {ivfDish: true},
    })
  }
}
