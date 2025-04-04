export enum IVFLabStatus {
  Active = 'Active',
  AwaitingBiopsyResults = 'AwaitingBiopsyResults',
  Upcoming = 'Upcoming',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum IVFLabStatusTitle {
  Active = 'IVF Lab Active',
  AwaitingBiopsyResults = 'Awaiting Biopsy Results',
  Upcoming = 'Upcoming',
  Completed = 'IVF Lab Completed',
  Cancelled = 'Cancelled',
}

export const nonCancellableStatuses = [IVFLabStatus.Completed, IVFLabStatus.Cancelled, null]
export const nonCompletableStatuses = [
  IVFLabStatus.Upcoming,
  IVFLabStatus.Completed,
  IVFLabStatus.Cancelled,
  null,
]

export const nonEditableStatuses = [IVFLabStatus.Completed, null]

export const dailyViewStatuses = [
  IVFLabStatus.Active,
  IVFLabStatus.AwaitingBiopsyResults,
  IVFLabStatus.Upcoming,
]
