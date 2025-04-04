import {BaseModel} from '@libs/common'
import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import {Timestamp} from 'firebase-admin/firestore'
import {Collection} from 'fireorm'

export enum IdentityMatchReasons {
  MismatchedWrongPartner = 'wrong partner',
  MismatchedWrongDish = 'wrong dish',
  MismatchedUnassignedBarcode = 'unassigned barcode',
  MismatchedWrongPatient = 'wrong patient',
  MismatchedWrongPID = 'wrong PID',
  DiscardedDish = 'discarded dish',
  Discarded = 'discarded',
}

@Collection('dish-scanning-log')
export class DishScanningLog extends BaseModel {
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
  day: string

  @IsNumber()
  patientPlanCohortGroupId: number

  @IsNumber()
  patientPlanCohortId: number

  @IsOptional()
  @IsString()
  dishLabel: string

  @IsOptional()
  @IsString()
  patientFullName: string

  @IsOptional()
  @IsBoolean()
  identityMatch: boolean

  @IsOptional()
  @IsEnum(IdentityMatchReasons)
  identityMatchReason?: IdentityMatchReasons

  @IsNotEmpty()
  scannedDate: Timestamp

  @IsString()
  scannedBy: string

  @IsOptional()
  @IsNumber()
  patientPlanCohortIvfDishId: number

  @IsOptional()
  @IsString()
  errorReason: string
}
