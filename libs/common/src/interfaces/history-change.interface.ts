import {IsString} from 'class-validator'
import {IsNullable} from '../validators/is-nullable.validator'

export interface IHistoryChange {
  propertyName: string
  from: string
  to: string
}

export class HistoryChange implements IHistoryChange {
  @IsString()
  propertyName: string

  @IsString()
  @IsNullable()
  from: string | null

  @IsString()
  @IsNullable()
  to: string | null
}
