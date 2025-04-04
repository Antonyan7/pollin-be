import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator'
import {LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {LabSyncTestResultListSortEnum} from '../enum/lab-sync-list.enum'
import {PaginationReqWithPageSizeOptionalAndPageDto} from '@libs/services-common/dto/pagination.dto'
import {Type} from 'class-transformer'

export enum UnlinkedTestResultFilterEnum {
  Status = 'Status',
}

export class LabSyncTestResultListFilters {
  @IsEnum(UnlinkedTestResultFilterEnum)
  type: UnlinkedTestResultFilterEnum

  @IsEnum(LabSyncTestResultStatus)
  id: LabSyncTestResultStatus
}

export class LabSyncTestResultsListRequestDTO extends PaginationReqWithPageSizeOptionalAndPageDto {
  @IsString()
  @IsOptional()
  searchString?: string

  @IsNumber()
  @IsNotEmpty()
  page: number

  @IsString()
  @IsEnum(LabSyncTestResultListSortEnum)
  @IsOptional()
  sortByField?: LabSyncTestResultListSortEnum

  @IsString()
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder

  @IsArray()
  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => LabSyncTestResultListFilters)
  filters?: LabSyncTestResultListFilters[]
}

export class LabSyncLabDTO {
  id: string
  title: string
}

export class LabSyncOhipDTO {
  number: string
  versionCode: string
}

export class LabSyncPatientDataDTO {
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  postalCode: string
}

export class LabSyncTestResultsListDTO {
  id: string
  title: string
  status: LabSyncTestResultStatus
  lab: LabSyncLabDTO
  age: number
  dateReceived: string
  ohip: LabSyncOhipDTO
  notMatchingProperties: string[]
  payment: string
  patient: LabSyncPatientDataDTO
}

export class LabSyncTestResultsListPaginatedDTO {
  testResults: LabSyncTestResultsListDTO[]
  pageSize: number
  totalItems: number
}

export class LabSyncTestResultsListResponseDTO {
  testResults: LabSyncTestResultsListDTO[]
}

export class VoidResultRequestDTO {
  @IsString()
  @IsNotEmpty()
  unlinkedTestResultId: string

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  reason: string
}

export class UnlinkedTestResultFilterOption {
  id: string
  title: string
  type: UnlinkedTestResultFilterEnum
}

export class UnlinkedTestResultFilter {
  title: string
  options: UnlinkedTestResultFilterOption[]
}

export class UnlinkedTestResultFiltersResponseDTO {
  filters: UnlinkedTestResultFilter[]
}

export const getUnlinkedTestResultFiltersType = new Map<UnlinkedTestResultFilterEnum, string>([
  [UnlinkedTestResultFilterEnum.Status, UnlinkedTestResultFilterEnum.Status],
])
