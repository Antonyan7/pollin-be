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
import {IvfDish} from '@libs/data-layer/apps/clinic-ivf/entities'
import {PlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/plan-addons.entity'

@Entity('ivf_dish_to_plan_addon')
export class IvfDishToPlanAddon extends Auditable {
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
  planAddonId: number

  @Column({type: 'int'})
  ivfDishId: number

  @ManyToOne(() => PlanAddon, (planAddon) => planAddon, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'planAddonId'})
  planAddon: Relation<PlanAddon>

  @ManyToOne(() => IvfDish, (ivfDishes) => ivfDishes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'ivfDishId'})
  ivfDish: Relation<IvfDish>
}
