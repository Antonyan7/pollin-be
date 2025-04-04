import {
  LabSyncTestResultStatus,
  LabSyncTestResultStatusLabel,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  UnlinkedTestResultFilter,
  UnlinkedTestResultFilterEnum,
} from '../dto/get-lab-sync-test-results.dto'

export const getLabSyncStatusFilters = (): UnlinkedTestResultFilter => {
  const statusOptions = [
    {
      id: LabSyncTestResultStatus.Unlinked,
      type: UnlinkedTestResultFilterEnum.Status,
      title: LabSyncTestResultStatusLabel.Unlinked,
    },
    {
      id: LabSyncTestResultStatus.Void,
      type: UnlinkedTestResultFilterEnum.Status,
      title: LabSyncTestResultStatusLabel.Void,
    },
  ]
  return {
    title: UnlinkedTestResultFilterEnum.Status,
    options: statusOptions,
  }
}
