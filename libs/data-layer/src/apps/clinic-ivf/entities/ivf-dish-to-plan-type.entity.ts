import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import {Auditable} from '@libs/common'
import {PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {IvfDish} from '@libs/data-layer/apps/clinic-ivf/entities'

@Entity('ivf_dish_to_plan_type')
export class IvfDishToPlanType extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, unique: true})
  uuid: string

  @Column({type: 'int'})
  day: number

  @Column({type: 'boolean'})
  required: boolean

  @Column({type: 'int'})
  planTypeId: number

  @Column({type: 'int'})
  ivfDishId: number

  @ManyToOne(() => PlanType, (planType) => planType, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'planTypeId'})
  planType: Relation<PlanType>

  @ManyToOne(() => IvfDish, (ivfDishes) => ivfDishes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'ivfDishId'})
  ivfDish: Relation<IvfDish>
}
