import {Column, Entity, PrimaryGeneratedColumn, Generated, OneToMany, Relation} from 'typeorm'
import {Auditable} from '@libs/common'
import {PatientPlanCohortIvfTaskExpandedEmbryo} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-ivf-task-expanded-embryo.entity'
import {CryoSampleContainer} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm/cryo-sample-container.entity'

@Entity('ivf_embryo_grade')
export class IvfEmbryoGrade extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, nullable: false, unique: true})
  uuid: string

  @Column({type: 'varchar', nullable: true})
  title: string

  @OneToMany(
    () => PatientPlanCohortIvfTaskExpandedEmbryo,
    (patientPlanCohortIvfTaskExpandedEmbryo) =>
      patientPlanCohortIvfTaskExpandedEmbryo.ivfEmbryoGrade,
  )
  patientPlanCohortIvfTaskExpandedEmbryos: Relation<PatientPlanCohortIvfTaskExpandedEmbryo>[]

  @OneToMany(
    () => CryoSampleContainer,
    (cryoSampleContainer) => cryoSampleContainer.frozenEmbryoGrade,
  )
  cryoSampleContainers: Relation<CryoSampleContainer>[]
}
