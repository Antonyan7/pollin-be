import {Column, Entity, Generated, PrimaryGeneratedColumn} from 'typeorm'
import {Auditable} from '@libs/common'

@Entity('ivf_cancellation_reason')
export class IVFCancellationReason extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, nullable: false, unique: true})
  uuid: string

  @Column({type: 'varchar'})
  reason: string
}
