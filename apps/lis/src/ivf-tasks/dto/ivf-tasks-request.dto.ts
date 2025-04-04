import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
  ValidateIf,
} from 'class-validator'
import {Type} from 'class-transformer'
import {
  CryoType,
  IVFLabStatus,
  IVFTaskType,
  OocyteQuality,
} from '@libs/data-layer/apps/clinic-ivf/enums'
import {SpermSourceLabel} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'
import {EmbryoGroupPhotoRequest} from '@apps/lis/ivf-tasks/dto/ivf-task-embryo-group-photo.dto'
import {IvfTaskDetailsResponse} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {FieldWithNote} from '@libs/services-common/dto/patient-note.dto'
import {ProfileAlertDTO} from '@libs/services-common/dto/profile-alert.dto'
import {NestprojectConfigService} from '@libs/common'
import {
  Day3CheckRequest,
  Day7CheckRequest,
  Day5CheckRequest,
  ExpandedEmbryoDetailsFreeze,
  DishInventoryRequest,
  PartnerDishInventoryRequest,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {IvfDaysDTO} from '@apps/lis/daily-view/dto/daily-view.dto'
import {
  PatientPlanCohort,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

const configService = NestprojectConfigService.getInstance()

export class SignOffIVFLabTaskRequestDTO {
  @IsString()
  /**@SummaryId */
  id: string
}
export class ContributorSpermSource {
  source: SpermSourceLabel
  /** Yes if `sperm.source` is `Donor` */
  donorId?: string
  /** Yes if `sperm.source` is `Donor`, date only value */
  dateOfArrival?: string
  /** Yes if `sperm.source` is not `Donor`, patientId/partnerId */
  contributorId?: string
  /** Yes if `sperm.source` is not `Donor`, id from sourceVariations.spermTypes */
  spermType?: string
}

export class SignOff {
  isDone: boolean
  initials: string
  details: string
}

export class IVFPatientDetails {
  id: string
  identifier: string
  title: string
  contributionTitle: string
  alerts: ProfileAlertDTO[]
}

export class IVFLABPatientPlan {
  id: string
  title: string
  hasStimSheet: boolean
  ivfStatus: IVFLabStatus
}

export class IVFLabDetails {
  patient: IVFPatientDetails
  partners: IVFPatientDetails[]
  spermSources: ContributorSpermSource[]
  patientPlan: IVFLABPatientPlan
  date: string
}

export class Sources {
  source: SpermSourceLabel
  donorId?: string
  dateOfArrival?: string
  contributorId?: string
  spermType?: string
}
export class SpermPrep {
  sources: Sources[]
}
export class OocyteQualityRatingOptions {
  id: string
  title: string
}
export class OocyteQualityOptions {
  id: string
  title: string
}

export class FilterAttachmentDTO {
  embryoId: number
  id: string
  url: string
  title: string
}

export enum SourceGroupTypeEnum {
  IVF = 'IVF',
  ICSI = 'ICSI',
  PICSI = 'PICSI',
}

export class TaskIVF extends FieldWithNote {
  id: string
  uiid: IVFTaskType
  lastUpdateDetails: string
  disabledIvfTaskGroupIds?: string[]
  dashboardDayUpdate?: IvfDaysDTO
  details: IvfTaskDetailsResponse
}

export class IvfTaskFilter extends TaskIVF {
  order: number
}

export class GetIVFLabTaskGroupRequestDTO {
  @IsNotEmpty()
  ivfTaskGroupId: string
}

export class OocyteAssessment {
  @IsBoolean()
  @IsNullable()
  isEnabled?: boolean
  @IsNullable()
  @IsNumber()
  @Min(1)
  @Max(3)
  qualityRating?: number
}

export class OocyteAssessments {
  @ValidateNested()
  @Type(() => OocyteAssessment)
  coc: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  ser: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  granular: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  fragPBs: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  pvs: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  pvd: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  vacuoles: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  misshaped: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  abnormalZone: OocyteAssessment
  @ValidateNested()
  @Type(() => OocyteAssessment)
  abnMembraneBreak: OocyteAssessment
}

export class InjectionAssessmentRequest {
  @IsEnum(OocyteQuality)
  @IsNullable()
  oocyteQualityRatingId: OocyteQuality
  @ValidateNested()
  @Type(() => OocyteAssessments)
  oocyteAssessments: OocyteAssessments
  @IsString()
  @IsNullable()
  oocyteComment: string
  @IsBoolean()
  @IsNullable()
  isAnomaly: boolean
}

export class InseminationIvfRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  oocytesInseminated: number
}

export class PicsiRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  matureOocytesInjected: number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  immatureOocytes: number
}

export class IcsiInjectionRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  split: number // Yes, if isSplitEnabled is true
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  matureOocytesInjected: number
}

export class MiiDay1CryoStraw {
  @IsString()
  @IsOptional()
  id: string
  @IsString()
  @IsOptional()
  title?: string
  @IsNumber()
  @IsOptional()
  strawNumber?: number
  @IsNumber()
  @Min(1)
  @Max(3)
  numberOfEggs: number
  @IsString()
  @IsOptional()
  identifier?: string // only for response
  @Type(() => ExpandedEmbryoDetailsFreeze)
  @IsNotEmpty()
  details: ExpandedEmbryoDetailsFreeze
}

export class MiiDay1CryoRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  matureOocytesToCryo: number

  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  oocytesDiscarded: number

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => MiiDay1CryoStraw)
  straws: MiiDay1CryoStraw[]
}

export class OocytesCollectionRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  oocytesCollected: number

  @ValidateIf((o) => o.oocytesCollected > 0)
  @IsNumber()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  oocytesWarmed: number

  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  oocytesSurvived: number

  @IsUUID()
  @IsNullable()
  embryologistId: string

  @IsUUID()
  @IsNotEmpty()
  physicianId: string

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => SelectedEgg)
  selectedEggs: SelectedEgg[]
}

export class PostStrippingRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  matureOocytes: number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  immatureOocytes: number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  degenOocytes: number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  abnormalOocytes: number
}

export class OocyteStraw {
  @IsString()
  @IsOptional()
  id: string
  @IsString()
  @IsOptional()
  title?: string // only for response
  @IsNumber()
  @Min(1)
  @Max(3)
  numberOfEggs: number
  @IsNumber()
  @IsOptional()
  strawNumber?: number
  @IsString()
  @IsOptional()
  identifier?: string // only for response
  @Type(() => ExpandedEmbryoDetailsFreeze)
  @IsNotEmpty()
  details: ExpandedEmbryoDetailsFreeze
}

export class OocyteFreezing extends PostStrippingRequest {
  @IsString()
  @IsOptional()
  totalOocyteCollected?: number // only for response
  @IsNumber()
  @IsOptional()
  lastStrawNumber?: number
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OocyteStraw)
  straws: OocyteStraw[]
}
export class CallPatientTaskRequest {
  @IsNotEmpty()
  @IsISO8601()
  date: string | null
}

class SpermWashConcentrationDTO {
  @IsNumber({maxDecimalPlaces: 7})
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  value: number

  @IsUUID()
  @IsNullable()
  unitId: string
}
export class SpermWashRequest {
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNullable()
  initialMotility: number
  @IsNullable()
  @ValidateNested()
  @Type(() => SpermWashConcentrationDTO)
  initialConcentration: SpermWashConcentrationDTO
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNullable()
  finalMotility: number
  @IsNullable()
  @ValidateNested()
  @Type(() => SpermWashConcentrationDTO)
  finalConcentration: SpermWashConcentrationDTO
}

class OocyteGroupPhotoRequest {
  @IsNullable()
  @IsUUID()
  id: string
  @IsString()
  @IsNotEmpty()
  title: string
  @IsString()
  @IsNotEmpty()
  url: string

  @IsString()
  @IsOptional()
  originalFileName?: string
}
export class MatureOocyteGroupPhotoRequest {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OocyteGroupPhotoRequest)
  matureOocyteGroupPhotos: OocyteGroupPhotoRequest[]
}

export class FertilizationSourceGroups {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  degenOrArrested: number
  @IsNotEmpty()
  @IsEnum(SourceGroupTypeEnum)
  typeId: SourceGroupTypeEnum
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  '0pn': number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  '1pn': number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  '2pn': number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  '3pn': number
}

export class FertilizationCheckRequest {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => FertilizationSourceGroups)
  sourceGroups: FertilizationSourceGroups[]
}

export class FreezeEmbryoRequest {
  @IsNumber()
  @Min(0)
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  numberOfEmbryosThawed: number

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => SelectedEmbryo)
  selectedEmbryos: SelectedEmbryo[]

  @IsUUID()
  @IsNotEmpty()
  physicianId: string

  @IsUUID()
  @IsNotEmpty()
  transferTechId: string

  @IsUUID()
  @IsNotEmpty()
  thawTechId: string

  @IsUUID()
  @IsNotEmpty()
  catheterId: string
}

export class SelectedEmbryo {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  dispositionId: string

  @IsUUID()
  @IsNullable()
  regradeId: string

  @IsUUID()
  @IsNullable()
  mediaLotId: string
}

export class JourneyWitnessRequest {
  @IsNullable()
  @Length(0, 1000)
  witness?: string
}

export type TaskDetails = InjectionAssessmentRequest &
  EmbryoGroupPhotoRequest &
  InseminationIvfRequest &
  PicsiRequest &
  IcsiInjectionRequest &
  Day3CheckRequest &
  MiiDay1CryoRequest &
  OocytesCollectionRequest &
  PostStrippingRequest &
  SpermWashRequest &
  OocyteFreezing &
  MatureOocyteGroupPhotoRequest &
  Day5CheckRequest &
  Day7CheckRequest &
  FertilizationCheckRequest &
  FreezeEmbryoRequest &
  CallPatientTaskRequest &
  JourneyWitnessRequest &
  DishInventoryRequest &
  PartnerDishInventoryRequest &
  EggThawRequest

export class SubmitTaskDetailsRequestDTO extends FieldWithNote {
  @IsString()
  id: string

  @IsOptional()
  @IsISO8601()
  dashboardFilterDate: string

  @IsNullable()
  details: TaskDetails
}
export class EggThawRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  eggsWarmed: number

  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  eggsSurvived: number

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => SelectedEgg)
  selectedEggs: SelectedEgg[]

  @IsUUID()
  @IsNotEmpty()
  thawTechId: string

  @IsUUID()
  @IsNotEmpty()
  mediaLotId: string
}

class SelectedEgg {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  dispositionId: string
}

export class ProcessOocytesDTO {
  patientPlanCohort: PatientPlanCohort
  oocyteStraws: OocyteStraw[]
  authUserId: string
  cryoType: CryoType
  summary: PatientPlanCohortIvfTaskSummary
  staff: Staff
}
