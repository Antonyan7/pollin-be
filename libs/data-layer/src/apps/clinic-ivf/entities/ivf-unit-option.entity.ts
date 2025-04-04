import {Column, Entity, PrimaryGeneratedColumn, Generated} from 'typeorm'
import {Auditable} from '@libs/common'

export enum IVFUnitOptionType {
  SpermWashConcentration = 'SpermWashConcentration',
}

@Entity('ivf_unit_option')
export class IVFUnitOption extends Auditable {
  @PrimaryGeneratedColumn()
  id: number

  @Generated('uuid')
  @Column({type: 'varchar', length: 36, nullable: false, unique: true})
  uuid: string

  @Column({type: 'varchar', nullable: false})
  title: string

  @Column({type: 'enum', enum: IVFUnitOptionType, nullable: false})
  type: IVFUnitOptionType

  @Column({type: 'int', nullable: false})
  sequence: number
}
