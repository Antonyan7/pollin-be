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
import {IvfDish, PatientPlanCohortIvfTaskGroup} from '@libs/data-layer/apps/clinic-ivf/entities'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
@Entity('ivf_dish_to_ivf_task_group')
export class IvfDishToIvfTaskGroup extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, unique: true})
  uuid: string

  @Column({type: 'int'})
  patientPlanCohortIvfTaskGroupId: number

  @Column({type: 'int'})
  ivfDishId: number

  @Column({type: 'int', nullable: true})
  scannedById?: number

  @Column({type: 'datetime', nullable: true})
  scannedDate?: Date

  @Column({type: 'boolean', nullable: true})
  required: boolean

  @ManyToOne(() => Staff, (staff) => staff, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'scannedById'})
  scannedByStaffUser: Relation<Staff>

  @Column({type: 'datetime', nullable: true})
  disabledAt?: Date

  @ManyToOne(
    () => PatientPlanCohortIvfTaskGroup,
    (patientPlanCohortIvfTaskGroup) => patientPlanCohortIvfTaskGroup,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({name: 'patientPlanCohortIvfTaskGroupId'})
  patientPlanCohortIvfTaskGroup: Relation<PatientPlanCohortIvfTaskGroup>

  @ManyToOne(() => IvfDish, (ivfDishes) => ivfDishes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'ivfDishId'})
  ivfDish: Relation<IvfDish>
}
