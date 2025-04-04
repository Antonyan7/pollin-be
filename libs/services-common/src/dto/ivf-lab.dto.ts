import {IvfLabDayEnum} from '@libs/services-common/enums'
import {IsISO8601} from 'class-validator'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'

export type DayGroupCounts = Record<IvfLabDayEnum, number>

export class DateFilter {
  @IsISO8601()
  @IsNullable()
  startDate?: string | null

  @IsISO8601()
  @IsNullable()
  endDate?: string | null
}
