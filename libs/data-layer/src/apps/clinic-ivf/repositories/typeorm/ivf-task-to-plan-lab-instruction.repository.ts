import {IvfTaskToPlanLabInstruction} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DataSource, Equal, In} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'

@Injectable()
export class IvfTaskToPlanLabInstructionRepository extends BaseRepository<IvfTaskToPlanLabInstruction> {
  constructor(public dataSource: DataSource) {
    super(IvfTaskToPlanLabInstruction, dataSource.createEntityManager())
  }

  async findOneByUUID(id: number): Promise<IvfTaskToPlanLabInstruction> {
    return this.findOne({where: {id: Equal(id)}})
  }

  async findManyByUUIDs(ids: number[]): Promise<IvfTaskToPlanLabInstruction[]> {
    return this.find({where: {id: In(ids)}})
  }
}
