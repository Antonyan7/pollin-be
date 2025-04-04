import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {
  IvfCohortFilters,
  IVFLabPatientsSortFieldV2,
  IvfPatientFilterTitle,
  IVFPlanAction,
  IVFPlanStatus,
} from '@libs/services-common/enums'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'
import {Type} from 'class-transformer'
import {ProfileAlertDTO} from '@libs/services-common/dto/profile-alert.dto'
import {DateFilter} from '@libs/services-common/dto/ivf-lab.dto'

// This class is used v1 and v2 plan list endpoints
class IvfPatientPlan {
  id: string
  planTypeName: string
  hasStimSheet: boolean
}

export class IvfCohortDateResponse {
  date: string | null
  label: string
}

export class IvfCohortDateV2Response {
  date: string | null
  label: string
  isEditable: boolean
  lastCohortUpdateDate: string | null
}

export class IvfCohortStartDateV3Response {
  date: string | null
  label: string
  isEditable: boolean
  lastCohortUpdateDate: string | null
}

class IvfProcedures {
  id: string
  title: string
  date: string
}

export class IvfPatients {
  id: string
  identifier: string
  fullName: string
  startDateSelectionEnabled: boolean
  avatarURL: string
  subString: string
  plan: IvfPatientPlan
  cohortStartDate: IvfCohortDateResponse
  procedures: IvfProcedures[]
}

export class IvfPatientsV2 {
  id: string
  identifier: string
  fullName: string
  avatarURL: string
  subString: string
  plan: IvfPatientPlan
  cohortStartDate: IvfCohortDateV2Response
  procedures: IvfProcedures[]
  ivfStatus: IVFLabStatus
}

export class IvfPatientsV3 {
  id: string
  identifier: string
  fullName: string
  avatarURL: string
  subString: string
  alerts: ProfileAlertDTO[]
}

export class IvfCohortV3 {
  id: string
  patient: IvfPatientsV3
  plan: IvfPatientPlan
  cohortStartDate?: IvfCohortStartDateV3Response | null
  procedures: IvfProcedures[]
  ivfStatus: IVFLabStatus
}

export class GetIvfPatientsResponseDTO {
  patients: IvfPatients[]
}

export class GetIvfCohortsResponseV3DTO {
  cohorts: IvfCohortV3[]
}

export enum IVFLabPatientsSortField {
  CohortStartDate = 'CohortStartDate',
}

export class IVFPlanVariationResponse {
  variations: IVFPlanStatusDTO[]
}

export class IVFPlanStatusDTO {
  status: IVFPlanStatus
  title: string
  actions: IVFPlanActionDTO[]
  label: IVFPlanStatusLabelDTO
}

export class IVFPlanActionDTO {
  id: IVFPlanAction
  title: string
}

export class IVFPlanStatusLabelDTO {
  textColor: string
  backgroundColor: string
}

export class GetIvfCohortsRequestV3DTO {
  @IsNumber()
  page: string

  @IsNullable()
  @IsNumber()
  pageSize: number | null

  @IsString()
  @IsNullable()
  searchString?: string | null

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => IvfCohortFilters)
  filters?: IvfCohortFilters[]

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilter)
  dateFilter?: DateFilter

  @IsEnum(IVFLabPatientsSortFieldV2)
  @IsOptional()
  sortByField?: IVFLabPatientsSortFieldV2

  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder
}

export class SetCohortDateRequestDTO {
  @IsISO8601()
  @Length(10, 10)
  date: string

  @IsUUID()
  patientPlanId: string
}

export class GetPlanCancellationReasonsResponseDTO {
  reasons: PlanCancellationReasonDto[]
}

export class PlanCancellationReasonDto {
  id: string
  title: string
}

export class PlanFiltersOptionsDto {
  id: string
  type: string
  title: string
}

export class PlanFiltersDto {
  title: IvfPatientFilterTitle
  options: PlanFiltersOptionsDto[]
}

export class PlanFiltersResponseDto {
  filters: PlanFiltersDto[]
}

export class FreezeMetaDataPayload {
  numberOfEmbryosFreezedAndBiopsy: number
  numberOfEmbryosFreezed: number
  numberOfEmbryosFreezedArrested: number
  numberOfEmbryosFreezedDiscarded: number
}

export class EmbryoFreezingMetaDataResponseDto {
  type: CompletionMetaDataTypes
  details?: FreezeMetaDataPayload
  error: {
    widgetTitle: CompletionMetaDataErrorTitles
    messages: string[]
  }
}
export class EggFreezeMetaDataPayload {
  numberOfOocytesFreezedOnDay0: number
  numberOfOocytesFreezedOnMiiDay1: number
  numberOfMatureOocytes: number
  numberOfImmatureOocytes: number
  numberOfOtherOocytes: number
}

export class EggFreezeMetaDataResponseDto {
  type: CompletionMetaDataTypes
  details?: EggFreezeMetaDataPayload
  error: {
    widgetTitle: CompletionMetaDataErrorTitles
    messages: string[]
  }
}
export enum CompletionMetaDataTypes {
  EmbryoFreezing = 'EmbryoFreezing',
  EggFreezing = 'EggFreezing',
  FrozenEmbryoTransfer = 'FrozenEmbryoTransfer',
  EggThaw = 'EggThaw',
}

export enum CompletionMetaDataErrorTitles {
  ExpandedEmbryosRemaining = 'Expanded Embryos Remaining',
}

export enum CompletionMetaDataErrorMessages {
  UnassignedRemainingEmbryos = 'has remaining expanded embryos which have not yet been assigned for cryopreservation or fresh transfer.',
  YouMustAssignAllBeforeCompletion = 'You must assign all expanded embryos before setting patient’s IVF lab status to “Completed”.',
}

export class CancelPlanRequestDTO {
  @IsISO8601()
  @IsOptional()
  dashboardFilterDate: string

  @IsUUID()
  patientPlanId: string

  @IsNullable()
  @IsString()
  comments: string | null

  @IsNullable()
  @IsString()
  reason: string | null
}

class EmbryoFreezingCompletionRequestMetadata {
  @IsNullable()
  @IsUUID()
  transportFolderId: string
}

export class CompletePlanRequestDTO {
  @IsISO8601()
  @IsOptional()
  dashboardFilterDate: string

  @IsUUID()
  patientPlanId: string

  @IsNullable()
  @IsString()
  comments: string | null

  @IsOptional()
  @ValidateNested()
  @Type(() => EmbryoFreezingCompletionRequestMetadata)
  metadata: EmbryoFreezingCompletionRequestMetadata
}

export class GetCompletionMetadata {
  @IsUUID()
  patientPlanId: string
}
export class PlanDispositionReasonDto {
  @IsUUID()
  @IsString()
  id: string

  @IsString()
  title: string
}

export class GetPlanDispositionReasonsResponseDTO {
  reasons: PlanDispositionReasonDto[]
}
