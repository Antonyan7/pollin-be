import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {Auditable} from '@libs/common'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'

@Entity('ivf_task_to_day')
export class IvfTaskToDay extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'int', nullable: false})
  day: number

  @Column({type: 'enum', enum: IVFTaskType, nullable: false})
  task: IVFTaskType

  @Column({type: 'int', nullable: true})
  order: number

  @Column({type: 'boolean', nullable: false, default: false})
  skipAllowed: boolean

  @Column({type: 'boolean', nullable: false, default: true})
  shouldAppearOnSpawn: boolean
}
