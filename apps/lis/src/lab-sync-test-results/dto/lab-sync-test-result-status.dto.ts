import {LabSyncStatus, LabSyncTestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'

export class LabSyncTestResultStatusAction {
  id: string
  title: string
}

export class LabSyncTestResultVariation {
  status: LabSyncTestResultStatus
  title: string
  actions: LabSyncTestResultStatusAction[]
}

export class LabSyncStatusesResponseDTO {
  variations: LabSyncTestResultVariation[]
}

export enum LabSyncStatusEnumDTO {
  Succeed = 'Succeed',
  Failed = 'Failed',
}

export const labSyncStatusEnumMap = new Map<LabSyncStatus, LabSyncStatusEnumDTO>([
  [LabSyncStatus.Success, LabSyncStatusEnumDTO.Succeed],
  [LabSyncStatus.Pending, LabSyncStatusEnumDTO.Succeed],
  [LabSyncStatus.Failed, LabSyncStatusEnumDTO.Failed],
])

export class LabSyncDetailsDTO {
  id: string
  message: string
  status: LabSyncStatusEnumDTO
}

export class GetLabSyncTestResultAlertsResponseDTO {
  labSyncDetails: LabSyncDetailsDTO[]
}
