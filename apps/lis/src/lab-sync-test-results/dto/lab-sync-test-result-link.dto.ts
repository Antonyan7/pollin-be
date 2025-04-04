import {IsNotEmpty, IsString} from 'class-validator'

export class LabSyncLinkRequestDTO {
  @IsString()
  @IsNotEmpty()
  patientId: string

  @IsString()
  @IsNotEmpty()
  pendingTestResultId: string

  @IsString()
  @IsNotEmpty()
  unlinkedTestResultId: string
}
