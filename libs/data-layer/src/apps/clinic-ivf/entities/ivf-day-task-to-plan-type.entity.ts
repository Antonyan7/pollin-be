import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from 'typeorm'
import {Auditable} from '@libs/common'
import {PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {IvfTaskToDay} from '@libs/data-layer/apps/clinic-ivf/entities'

@Entity('ivf_day_task_to_plan_type')
export class IvfTaskToDayToPlanType extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'int', nullable: false})
  planTypeId: number

  @Column({type: 'int', nullable: false})
  IVFTaskToDayId: number

  @ManyToOne(() => PlanType, (planType) => planType, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'planTypeId'})
  planType: Relation<PlanType>

  @ManyToOne(() => IvfTaskToDay, (ivfTaskToDay) => ivfTaskToDay, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'IVFTaskToDayId'})
  IVFTaskToDay: Relation<IvfTaskToDay>
}
