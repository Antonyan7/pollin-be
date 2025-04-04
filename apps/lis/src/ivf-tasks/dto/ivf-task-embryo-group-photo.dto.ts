import {IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'
import {IsNullable} from '@libs/common/validators/is-nullable.validator'

class EmbryoGroupPhotoItemResponse {
  id: string
  title: string
  url: string
}

class EmbryoGroupPhoto {
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

export class EmbryoGroupPhotoRequest {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => EmbryoGroupPhoto)
  embryoGroupPhotos: EmbryoGroupPhoto[]
}

export class EmbryoGroupPhotoResponse {
  embryoGroupPhotos: EmbryoGroupPhotoItemResponse[]
}
