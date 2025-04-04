import {ActionHistorySortByFieldEnum} from '@libs/common/enums'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {IsEnum, IsOptional, IsString, IsUUID} from 'class-validator'

export class GetIVFTaskHistoryRequestDTO {
  @IsUUID()
  taskId: string

  @IsEnum(ActionHistorySortByFieldEnum)
  sortByField: ActionHistorySortByFieldEnum

  @IsEnum(SortOrder)
  sortOrder: SortOrder

  @IsString()
  @IsOptional()
  paginationCursor?: string
}
