import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import {Auditable} from '@libs/common'
import {PatientPlanCohort} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort.entity'
import {PatientPlanCohortIvfDish} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-ivf-dish.entity'

@Entity('ivf_dish_barcode')
export class IvfDishBarcode extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, nullable: false, unique: true})
  uuid: string

  @Column({type: 'varchar', nullable: true})
  value?: string

  @Column({type: 'int', nullable: false})
  patientPlanCohortId: number

  @Column({type: 'int', nullable: true})
  patientPlanCohortIvfDishId?: number

  @ManyToOne(() => PatientPlanCohort, (patientPlanCohort) => patientPlanCohort, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'patientPlanCohortId'})
  patientPlanCohort: Relation<PatientPlanCohort>

  @OneToOne(
    () => PatientPlanCohortIvfDish,
    (patientPlanCohortIvfDish) => patientPlanCohortIvfDish.ivfDishBarcode,
  )
  patientPlanCohortIvfDish: Relation<PatientPlanCohortIvfDish>
}
