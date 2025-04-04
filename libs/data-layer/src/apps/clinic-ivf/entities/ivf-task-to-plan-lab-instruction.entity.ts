import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from 'typeorm'
import {Auditable} from '@libs/common'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {PlanLabInstruction} from '@libs/data-layer/apps/plan/entities/typeorm'

@Entity('ivf_task_to_plan_lab_instruction')
export class IvfTaskToPlanLabInstruction extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'enum', enum: IVFTaskType, nullable: false})
  task: IVFTaskType

  @Column({type: 'int', nullable: false})
  planLabInstructionId: number

  @ManyToOne(() => PlanLabInstruction)
  @JoinColumn({name: 'planLabInstructionId'})
  planLabInstruction: Relation<PlanLabInstruction>
}
