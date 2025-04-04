import {DataSource, Equal} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'
import {IvfDishToPlanType} from '@libs/data-layer/apps/clinic-ivf/entities'

@Injectable()
export class IvfDishToPlanTypeRepository extends BaseRepository<IvfDishToPlanType> {
  constructor(public dataSource: DataSource) {
    super(IvfDishToPlanType, dataSource.createEntityManager())
  }

  findByPlanTypeId(planTypeId: number): Promise<IvfDishToPlanType[]> {
    return this.find({
      where: {planTypeId: Equal(planTypeId)},
      relations: {ivfDish: true},
    })
  }
}
