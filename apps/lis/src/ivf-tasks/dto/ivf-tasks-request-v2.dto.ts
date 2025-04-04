import {IsString} from 'class-validator'
import {ExpandedEmbryo} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {
  IvfEmbryoGrade,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {CryoInventoryCard} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

export class SignOffIVFLabTaskRequestV2DTO {
  @IsString()
  taskGroupId: string
}

export interface UpdateEmbryo {
  embryo: ExpandedEmbryo
  grade: IvfEmbryoGrade
  day: number
  inventoryCard: CryoInventoryCard
  staff: Staff
  summary: PatientPlanCohortIvfTaskSummary
  straws: {count: number}
  embryologistId: number
}
