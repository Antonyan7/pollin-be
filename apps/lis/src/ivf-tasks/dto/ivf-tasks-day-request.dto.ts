import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  ValidateNested,
} from 'class-validator'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'
import {Day3EmbryosAverageFrag} from '@libs/data-layer/apps/clinic-ivf/enums'
import {Type} from 'class-transformer'
import {IvfEmbryoActions} from '@libs/services-common/enums'
import {NestprojectConfigService} from '@libs/common'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'

const configService = NestprojectConfigService.getInstance()

export class BiopsyAttachments {
  @IsString()
  @IsNullable()
  id: string
  @IsString()
  @IsNullable()
  url: string
  @IsString()
  @IsNullable()
  title: string
  @IsString()
  @IsOptional()
  originalFileName?: string
}
export class FreshTransfer {
  @IsBoolean()
  enabled: boolean

  @IsNumber()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  @IsNullable()
  embryosToTransfer: number

  @IsBoolean()
  @IsNullable()
  assistedHatching: boolean
}

export class Day3CheckRequest {
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  embryosMoreThan6Cells: number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  embryosLessThan6Cells: number
  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  embryosArrested: number
  @IsNullable()
  @IsEnum(Day3EmbryosAverageFrag)
  embryosAverageFrag: Day3EmbryosAverageFrag // from 1-4
  @IsBoolean()
  @IsOptional()
  assistedHatching?: boolean

  @IsOptional()
  @Type(() => FreshTransfer)
  freshTransfer?: FreshTransfer
}

export type EmbryoDetails = ExpandedEmbryoDetailsFreshET | ExpandedEmbryoDetailsFreeze
export class ExpandedEmbryoDetailsFreshET {
  @IsBoolean()
  @IsNotEmpty()
  assistedHatching: boolean

  @IsUUID()
  @IsNotEmpty()
  physicianId: string
}
export class Biopsy {
  @IsString()
  @IsNullable()
  id: string
  @IsNullable()
  @ValidateNested({each: true})
  @Type(() => BiopsyAttachments)
  attachments: BiopsyAttachments[]
}
export class ExpandedEmbryoDetailsFreeze {
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
}

export class ExpandedEmbryo {
  @IsString()
  @IsNullable()
  id: string
  @IsString()
  @IsNullable()
  title: string // only for response
  @IsInt()
  @IsOptional()
  embryoNumber?: number
  @IsString()
  @IsNullable()
  identifier: string // only for response
  @IsEnum(IvfEmbryoActions)
  @IsNotEmpty()
  actionType: IvfEmbryoActions
  @IsString()
  @IsNotEmpty()
  gradeId: string
  @Type(() => Biopsy)
  @IsNullable()
  biopsy: Biopsy | null
  @Type(() => ExpandedEmbryoDetailsFreshET)
  @IsNotEmpty()
  details: EmbryoDetails
  @IsOptional()
  @IsUUID()
  cryoCardId?: string // only for response
  @IsUUID()
  @IsNullable()
  embryologistId: string
}
export class Day7CheckRequest {
  //TODO: depreciated field will be removed by TEAMB-12766
  @IsNumber()
  @IsOptional()
  embryosArrested?: number

  @IsNumber()
  @IsNullable()
  @Max(configService.get<number>('MAX_IVF_FIELD_INTEGER'))
  embryosDiscarded: number

  @ValidateNested({each: true})
  @Type(() => ExpandedEmbryo)
  embryosExpanded: ExpandedEmbryo[]
}

export class IvfDishResponse {
  @IsString()
  id: string
}

export class BarcodeResponse {
  @IsString()
  value: string
}

export class DishRequest {
  @Type(() => IvfDishResponse)
  dish: IvfDishResponse

  @Type(() => BarcodeResponse)
  barcode: BarcodeResponse
}

export class DishInventoryRequest {
  @ValidateNested({each: true})
  @Type(() => DishRequest)
  dishes: DishRequest[]
}

export class PartnerDishInventoryRequest {
  @ValidateNested({each: true})
  @Type(() => DishRequest)
  dishes: DishRequest[]
}

export class Day5CheckRequest {
  @IsNumber()
  @IsNullable()
  embryosArrested: number
  @ValidateNested({each: true})
  @Type(() => ExpandedEmbryo)
  embryosExpanded: ExpandedEmbryo[]
}
