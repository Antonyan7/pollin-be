import {PatientNoteTypeEnum} from '@libs/services-common/enums/patient-note.enum'
import {IsBoolean, IsOptional, IsString} from 'class-validator'

export type CreatePatientNoteType = Record<PatientNoteTypeEnum, string>

export class FieldWithNote {
  @IsOptional()
  @IsString()
  note?: string

  @IsOptional()
  @IsBoolean()
  isEditable?: boolean
}
