import {Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn, Relation} from 'typeorm'
import {Auditable} from '@libs/common'
import {PatientPlanCohortEggToThaw} from '@libs/data-layer/apps/clinic-ivf/entities'
import {PatientPlanCohortFrozenEmbryoTransfer} from '@libs/data-layer/apps/clinic-ivf/entities'

@Entity('ivf_disposition_reason')
export class IVFDispositionReason extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, nullable: false, unique: true})
  uuid: string

  @Column({type: 'varchar', nullable: false})
  reason: string

  @OneToMany(
    () => PatientPlanCohortEggToThaw,
    (patientPlanCohortEggToThaw) => patientPlanCohortEggToThaw.ivfDispositionReason,
  )
  patientPlanCohortEggToThaws: Relation<PatientPlanCohortEggToThaw>[]

  @OneToMany(
    () => PatientPlanCohortFrozenEmbryoTransfer,
    (patientPlanCohortFrozenEmbryoTransfer) =>
      patientPlanCohortFrozenEmbryoTransfer.ivfDispositionReason,
  )
  patientPlanCohortFrozenEmbryoTransfer: Relation<PatientPlanCohortFrozenEmbryoTransfer>[]
}
