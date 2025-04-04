import {IVFUnitOption, IVFUnitOptionType} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DataSource, Equal, In} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'

@Injectable()
export class IvfUnitOptionRepository extends BaseRepository<IVFUnitOption> {
  constructor(public dataSource: DataSource) {
    super(IVFUnitOption, dataSource.createEntityManager())
  }

  findByUUIDsAndType(uuids: string[], type: IVFUnitOptionType): Promise<IVFUnitOption[]> {
    return this.find({
      where: {uuid: In(uuids), type: Equal(type)},
      order: {sequence: 'ASC'},
      withDeleted: true,
    })
  }

  findByType(type: IVFUnitOptionType): Promise<IVFUnitOption[]> {
    return this.find({where: {type: Equal(type)}, order: {sequence: 'ASC'}})
  }
}
