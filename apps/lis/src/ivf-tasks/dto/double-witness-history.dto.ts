import {ActionHistorySortByFieldEnum} from '@libs/common/enums'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {IsEnum, IsOptional, IsString, IsUUID} from 'class-validator'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'

export class DiscardDishRequestDto {
  @IsUUID()
  ivfDishId: string

  @IsUUID()
  ivfCohortId: string
}

export class GetDoubleWitnessLogRequestDTO {
  @IsNullable()
  @IsUUID()
  ivfCohortId: string

  @IsNullable()
  @IsUUID()
  taskGroupId: string

  @IsEnum(ActionHistorySortByFieldEnum)
  sortByField: ActionHistorySortByFieldEnum

  @IsEnum(SortOrder)
  sortOrder: SortOrder

  @IsString()
  @IsOptional()
  paginationCursor?: string
}

class LogItemDTO {
  id: string
  scannedBy: string
  date: string
  task: string
  dishType: string
  patientName: string | null
  identityMatched: boolean | null
  identityMatchedReason: string | null
  errorReason: string | null
}

export class GetDoubleWitnessLogResponseDTO {
  title: string
  logItems: LogItemDTO[]
}
