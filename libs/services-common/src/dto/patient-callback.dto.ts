import {IsNullable} from '@libs/common/validators/is-nullable.validator'
import {Type} from 'class-transformer'
import {IsInt, IsString, IsUUID, Max, Min, ValidateNested} from 'class-validator'

export class PatientCallbackDateDTO {
  @IsInt()
  @Min(0)
  @Max(11)
  month: number

  @IsInt()
  @Min(2000)
  year: number
}

export class PatientCallbackRequestDTO {
  @ValidateNested()
  @Type(() => PatientCallbackDateDTO)
  date: PatientCallbackDateDTO

  @IsUUID()
  assigneeId: string

  @IsNullable()
  @IsString()
  content: string | null
}

export class PatientCallbackAssigneeDTO {
  id: string
  name: string
}
export class PatientCallbackResponseDTO {
  date: PatientCallbackDateDTO
  assignee: PatientCallbackAssigneeDTO
  content: string
}
