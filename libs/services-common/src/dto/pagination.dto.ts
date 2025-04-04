import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import {Type} from 'class-transformer'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'

export class PaginationRequestDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  page: number
}

export class PaginationRequestWithPageSizeDto extends PaginationRequestDto {
  @IsNullable()
  @IsNumber()
  pageSize: number | null
}

// To be replaced by PaginationRequestWithPageSizeDto after FE work done
export class PaginationReqWithPageSizeOptionalAndPageDto extends PaginationRequestDto {
  @IsNumber()
  @IsOptional()
  pageSize?: number
}

export class PaginationResponseDto {
  totalItems: number
  pageSize: number
  currentPage?: number
}

export class PaginationData<T> extends PaginationResponseDto {
  items: T
}

export class DataObject<T> {
  data: T
}

export class DataObjectPaginated<T> extends PaginationResponseDto {
  data: T
}

export class CursorPaginationRequestDto {
  @IsString()
  @IsOptional()
  paginationCursor: string
}

export class CursorPaginationData<T> {
  items: T
  paginationCursor: string
}
