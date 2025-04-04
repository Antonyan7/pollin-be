import {Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn, Relation} from 'typeorm'
import {Auditable} from '@libs/common'
import {DishOwner} from '@libs/data-layer/apps/clinic-ivf/enums'
import {IvfDishToPlanType} from '@libs/data-layer/apps/clinic-ivf/entities'
import {IvfDishToPlanAddon} from '@libs/data-layer/apps/clinic-ivf/entities'
import {IvfDishToIvfTaskGroup} from '@libs/data-layer/apps/clinic-ivf/entities'
import {PatientPlanCohortIvfDish} from '@libs/data-layer/apps/clinic-ivf/entities'

@Entity('ivf_dish')
export class IvfDish extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, unique: true})
  uuid: string

  @Column({type: 'enum', enum: DishOwner})
  dishOwner: DishOwner

  @Column({type: 'varchar'})
  dishLabel: string

  @OneToMany(() => IvfDishToPlanType, (ivfDishToPlanType) => ivfDishToPlanType.ivfDish)
  ivfDishToPlanTypes: Relation<IvfDishToPlanType>[]

  @OneToMany(() => IvfDishToPlanAddon, (ivfDishToPlanAddon) => ivfDishToPlanAddon.ivfDish)
  ivfDishToPlanAddons: Relation<IvfDishToPlanAddon>[]

  @OneToMany(() => IvfDishToIvfTaskGroup, (ivfDishToIvfTaskGroup) => ivfDishToIvfTaskGroup.ivfDish)
  ivfDishToIvfTaskGroups: Relation<IvfDishToIvfTaskGroup>[]

  @OneToMany(
    () => PatientPlanCohortIvfDish,
    (patientPlanCohortIvfDish) => patientPlanCohortIvfDish.ivfDish,
  )
  patientPlanCohortIvfDish: Relation<PatientPlanCohortIvfDish>[]
}
