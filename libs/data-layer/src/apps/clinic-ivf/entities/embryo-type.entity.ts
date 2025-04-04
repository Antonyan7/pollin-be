import {Column, Entity, PrimaryGeneratedColumn, Generated} from 'typeorm'
import {Auditable} from '@libs/common'

@Entity('embryo_type')
export class EmbryoType extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, nullable: false, unique: true})
  uuid: string

  @Column({type: 'varchar', nullable: false})
  title: string

  @Column({type: 'int', nullable: false})
  sequence: number
}
