import {IvfEmbryoGrade} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DataSource, Equal, In} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'

@Injectable()
export class IvfEmbryoGradeRepository extends BaseRepository<IvfEmbryoGrade> {
  constructor(public dataSource: DataSource) {
    super(IvfEmbryoGrade, dataSource.createEntityManager())
  }

  async findOneByUUID(uuid: string): Promise<IvfEmbryoGrade> {
    return this.findOne({where: {uuid: Equal(uuid)}})
  }

  async findManyByUUIDs(uuids: string[]): Promise<IvfEmbryoGrade[]> {
    return this.find({where: {uuid: In(uuids)}})
  }
}
