import {IsNotEmpty} from 'class-validator'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  CompletionMetaDataTypes,
  EggFreezeMetaDataPayload,
  FreezeMetaDataPayload,
} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'

export class GetPlanIVFLabTaskGroupsRequestDTO {
  @IsNotEmpty()
  patientPlanId: string
}

export class PlanIVFLabTaskGroup {
  id: string
  title: string
}

class PlanIvfTaskCohorts {
  id: string
  isMain: boolean
  cancellationMetadata?: {
    reasonForCancellation: string | null
    comment: string | null
  }
  taskGroups: PlanIVFLabTaskGroup[]
}
class IvfStaff {
  id: string
  fullName: string
}
export class GetPlanIVFLabTaskGroupsResponseDTO {
  ivfStatus: IVFLabStatus
  cancellationMetadata?: {
    reasonForCancellation: string | null
    comment: string | null
  }
  completionMetadata?: {
    type: CompletionMetaDataTypes
    details: EggFreezeMetaDataPayload | FreezeMetaDataPayload
    comment: string | null
    witness?: string
    ivfWitnessByStaff?: IvfStaff
    embryologistFreezingByStaff?: IvfStaff
  }
  cohorts: PlanIvfTaskCohorts[]
}
