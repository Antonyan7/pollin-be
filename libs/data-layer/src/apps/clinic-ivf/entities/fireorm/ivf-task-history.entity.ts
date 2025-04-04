import {BaseModel} from '@libs/common'
import {Type} from 'class-transformer'
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator'
import {Timestamp} from 'firebase-admin/firestore'
import {Collection} from 'fireorm'

export type IvfTaskHistoryPayloadType = {
  authUserId: string
  authUserFullName: string
  entityTitle: string
  sourceTaskSummaryId: number
  sourceTaskEmbryoId?: number
  changes: IvfTaskHistoryChange[]

  updatedBy: string
}

export class IvfTaskHistoryChange {
  @IsString()
  propertyName: string

  @IsString()
  from: string

  @IsString()
  to: string
}

@Collection('ivf-task-history')
export class IvfTaskHistory extends BaseModel {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  authUserId: string

  @IsString()
  authUserFullName: string

  @IsNotEmpty()
  date: Timestamp

  @IsString()
  @IsOptional()
  entityTitle?: string

  @IsNumber()
  sourceTaskSummaryId: number

  @IsNumber()
  @IsOptional()
  sourceTaskEmbryoId?: number

  @IsArray()
  @ValidateNested()
  @Type(() => IvfTaskHistoryChange)
  changes?: IvfTaskHistoryChange[]
}
