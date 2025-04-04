import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {EmbryoGroupPhotoResponse} from '@apps/lis/ivf-tasks/dto/ivf-task-embryo-group-photo.dto'
import {DefaultValue} from '@libs/common/enums'
import {
  IVFLabDetails,
  MiiDay1CryoStraw,
  OocyteAssessments,
  OocyteFreezing,
  OocyteQualityOptions,
  OocyteQualityRatingOptions,
  SignOff,
  SourceGroupTypeEnum,
  SpermPrep,
  TaskIVF,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {BiopsyAttachments, ExpandedEmbryo} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'

class EmbryoGradeOptions {
  id: string
  title: string
}
export class CallPatientTaskResponse {
  @IsNotEmpty()
  @IsString()
  date: string | null
}

class SpermWashUnitOptionDTO {
  id: string
  title: string
}
class SpermWashConcentrationDTO {
  value: number
  unitId: string
}
export class SpermWashResponse {
  unitOptions: SpermWashUnitOptionDTO[]
  initialConcentration?: SpermWashConcentrationDTO
  initialMotility?: number
  finalConcentration?: SpermWashConcentrationDTO
  finalMotility?: number
}

export class SignOffIVFLabTaskResponseDTO {
  remainingTasksCount: number
  completionPercentage: number
  uiid: IVFTaskType
  signOff: SignOff
}

export class SignOffIVFLabTaskResponseV2DTO {
  signOff: SignOff
}
export class IcsiInjectionResponse {
  percentage: number
  isSplitEnabled: boolean
  split: number
  matureOocytesInjected: number
  spermPrep: SpermPrep
}

export class InjectionAssessmentResponse {
  oocyteQualityRatingOptions: OocyteQualityRatingOptions[]
  oocyteQualityOptions: OocyteQualityOptions[]
  oocyteQualityRatingId: string
  oocyteAssessments: OocyteAssessments
  oocyteComment: string | null
  isAnomaly: boolean
}

export class InseminationIvfResponse {
  percentage: number
  split: number
  oocytesInseminated: number
}

export class PicsiResponse {
  matureOocytesInjected: number
  immatureOocytes: number
  spermPrep: SpermPrep
}

export class MiiDay1CryoResponse {
  immatureFromDay0: number | DefaultValue
  matureOocytesToCryo: number
  oocytesDiscarded: number
  lastStrawNumber?: number
  straws: MiiDay1CryoStraw[]
}

export class OocytesCollectionResponse {
  oocytesCollected: number
  oocytesWarmed: number
  oocytesSurvived: number
  embryologistId: string
  physicianId: string
  isEditable: boolean
  eggOptions: EggOptionDTO[]
}

export class PostStrippingResponse {
  day0Date: string
  matureOocytes: number
  immatureOocytes: number
  degenOocytes: number
  abnormalOocytes: number
  isCohortSpawned: boolean
}

export class VerifyHepBcHivResponse {
  patientId: string
  patientPlanId: string
}
export class FreshTransfer {
  enabled: boolean
  embryosToTransfer: number
  assistedHatching: boolean
}
export class Day3CheckResponse {
  embryosMoreThan6Cells: number
  embryosLessThan6Cells: number
  embryosArrested: number
  embryosAverageFrag: number
  assistedHatching: boolean
  freshTransfer?: FreshTransfer
  updateDisabled: boolean
}

class OocyteGroupPhotoResponse {
  id: string
  title: string
  url: string
}

export class MatureOocyteGroupPhotoResponse {
  matureOocyteGroupPhotos: OocyteGroupPhotoResponse[]
}

export class Day5CheckResponse {
  remainingEmbryos: number
  numberOfEmbryos: number
  embryoGradeOptions: EmbryoGradeOptions[]
  embryosArrested: number
  embryosExpanded: ExpandedEmbryo[]
  lastEmbryoNumber: number
}

export class Day6CheckResponse {
  remainingEmbryos: number
  numberOfEmbryos: number
  numberOfContinuedEmbryos: number
  embryoGradeOptions: EmbryoGradeOptions[]
  embryosArrested: number
  embryosExpanded: ExpandedEmbryo[]
  lastEmbryoNumber: number
}

export class Day7CheckResponse {
  remainingEmbryos: number
  numberOfEmbryos: number
  embryosDiscarded: number
  embryosArrested?: number
  numberOfContinuedEmbryos: number
  embryoGradeOptions: EmbryoGradeOptions[]
  embryosExpanded: ExpandedEmbryo[]
  lastEmbryoNumber: number
}

export enum IVFDishResponseStatus {
  Discarded = 'Discarded',
  Active = 'Active',
}

class IvfDishResponse {
  id: string
  label: string
  status: IVFDishResponseStatus
}

class BarcodeResponse {
  id: string
  value: string
}
class DishResponse {
  dish: IvfDishResponse
  barcode: BarcodeResponse
}

export class DishInventoryResponse {
  dishes: DishResponse[]
}

export class PartnerDishInventoryResponse {
  dishes: DishResponse[]
}

export class FertilizationSourceGroupsResponse {
  typeId: SourceGroupTypeEnum
  percentage: number
  degenOrArrested: number
  '0pn': number
  '1pn': number
  '2pn': number
  '3pn': number
}

export class FertilizationCheckResponse {
  numberOfOocytes: number
  sourceGroups: FertilizationSourceGroupsResponse[]
}
export class PrintLabelResponse {
  name: string
  identifier: string
  dateOfBirth: string
}

export class JourneyWitnessResponse {
  witness?: string
}

export type IvfTaskDetailsResponse =
  | IcsiInjectionResponse
  | InjectionAssessmentResponse
  | InseminationIvfResponse
  | PicsiResponse
  | MiiDay1CryoResponse
  | VerifyHepBcHivResponse
  | Day3CheckResponse
  | OocytesCollectionResponse
  | PostStrippingResponse
  | SpermWashResponse
  | OocyteFreezing
  | MatureOocyteGroupPhotoResponse
  | EmbryoGroupPhotoResponse
  | Day5CheckResponse
  | Day6CheckResponse
  | Day7CheckResponse
  | FertilizationCheckResponse
  | PrintLabelResponse
  | FreezeEmbryoResponse
  | CallPatientTaskResponse
  | JourneyWitnessResponse
  | DishInventoryResponse
  | PartnerDishInventoryResponse
  | EggThawingResponse
  | PIDLabelResponse

export class GetIVFLabTaskGroupResponseDTO {
  title: string
  details: IVFLabDetails
  remainingTasksCount: number
  ivfTasks: TaskIVF[]
  signOff: SignOff
}
export class CryoDetailsIVFResponse {
  @IsString()
  @IsNotEmpty()
  freezeDate: string
  @IsString()
  @IsNullable()
  canId: string | null
  @IsString()
  @IsNullable()
  caneId: string | null
  @IsString()
  @IsNullable()
  freezeWitness: string | null
  @IsNullable()
  @IsString()
  comments: string | null
  @IsEnum(CryoStatus)
  @IsOptional()
  status: CryoStatus
  @IsNumber()
  @IsNullable()
  eggCount: number | null
  @IsString()
  @IsNullable()
  grade: string | null
}

export class FreezeEmbryoResponse {
  embryosToTransfer: {
    id: string
    title: string
    type: string
  }[]
  uterusContributor: {
    patientId: string
    patientName: string
  }
  oocyteSource: string
  donorId: string
  numberOfEmbryosThawed: number
  embryoOptions: {
    id: string
    title: string
    mediaLotId: string | null
    regradeId: string | null
    patientPlan: {
      id: string
      title: string
    }
    biopsy: {
      id: string
      attachments: BiopsyAttachments[]
    } | null
    comments: string
    cryoCard: {
      id: string | null
    }
    isChecked: boolean
    dispositionId: string | null
    details: CryoDetailsIVFResponse
  }[]
  physicianId: string | null
  thawTechId: string | null
  transferTechId: string | null
  catheterId: string | null
}

export class EggOptionDTO {
  id: string
  title: string
  patientPlan: {
    id: string
  } | null
  cryoCard: {
    id: string | null
  } | null
  dispositionId: string | null
  isChecked: boolean
  details: CryoDetailsIVFResponse
}

export class EggThawingResponse {
  numberOfEggsThawed: number
  eggsWarmed: number | null
  eggsSurvived: number | null
  mediaLotId: string | null
  eggOptions: EggOptionDTO[]
  thawTechId: string | null
}
export class PIDLabelResponse {
  patientIdentifier: string
  patientFullName: string
  dateOfBirth: string
}
