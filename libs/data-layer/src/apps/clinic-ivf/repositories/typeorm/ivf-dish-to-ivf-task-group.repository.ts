import {DataSource} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'
import {IvfDishToIvfTaskGroup} from '@libs/data-layer/apps/clinic-ivf/entities'

@Injectable()
export class IvfDishToIvfTaskGroupRepository extends BaseRepository<IvfDishToIvfTaskGroup> {
  constructor(public dataSource: DataSource) {
    super(IvfDishToIvfTaskGroup, dataSource.createEntityManager())
  }
  async getIvfDishToIvfTaskGroupsForToday(
    ivfCohortId: string,
    date: string,
  ): Promise<IvfDishToIvfTaskGroup[]> {
    return this.createQueryBuilder('ivfDishToIvfTaskGroup')
      .leftJoinAndSelect(
        'ivfDishToIvfTaskGroup.patientPlanCohortIvfTaskGroup',
        'patientPlanCohortIvfTaskGroup',
      )
      .leftJoinAndSelect('patientPlanCohortIvfTaskGroup.patientPlanCohort', 'patientPlanCohort')
      .where('patientPlanCohort.uuid = :ivfCohortId', {ivfCohortId})
      .andWhere('patientPlanCohortIvfTaskGroup.date = :date', {date})
      .getMany()
  }
}
