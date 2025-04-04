import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

export abstract class Auditable {
  @CreateDateColumn({nullable: false})
  createdAt: Date

  @UpdateDateColumn({nullable: false})
  updatedAt: Date

  @Column({nullable: true, default: null})
  updatedBy?: string

  @Column({type: 'int', nullable: true, default: null})
  updatedByDataManagerId?: string

  @Column({type: 'int', nullable: true, default: null})
  updatedByStaffId?: number

  @DeleteDateColumn({nullable: true})
  deletedAt?: Date

  @ManyToOne('Staff')
  @JoinColumn({name: 'updatedByStaffId'})
  updatedByStaff?: Relation<Staff>
}
