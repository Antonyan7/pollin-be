export enum IVFPlanStatus {
  Active = 'Active',
  Upcoming = 'Upcoming',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  AwaitingBiopsyResults = 'AwaitingBiopsyResults',
}

export enum IVFPlanStatusLabel {
  Active = 'IVF Lab Active',
  Upcoming = 'Upcoming',
  Completed = 'IVF Lab Completed',
  Cancelled = 'Cancelled',
  AwaitingBiopsyResults = 'Awaiting Biopsy Results',
}

export const IVFPlanStatusMap = new Map<IVFPlanStatus, IVFPlanStatusLabel>([
  [IVFPlanStatus.Active, IVFPlanStatusLabel.Active],
  [IVFPlanStatus.Upcoming, IVFPlanStatusLabel.Upcoming],
  [IVFPlanStatus.Completed, IVFPlanStatusLabel.Completed],
  [IVFPlanStatus.Cancelled, IVFPlanStatusLabel.Cancelled],
  [IVFPlanStatus.AwaitingBiopsyResults, IVFPlanStatusLabel.AwaitingBiopsyResults],
])

export enum IVFPlanAction {
  MarkAsCompleted = 'MarkAsCompleted',
  MarkAsCancelled = 'MarkAsCancelled',
  ViewIvfReport = 'ViewIvfReport',
  ViewStimulationSheet = 'ViewStimulationSheet',
}

export enum IVFPlanActionTitle {
  MarkAsCompleted = 'Set IVF lab status to “Completed”',
  MarkAsCancelled = 'Set IVF lab status to “Cancelled”',
  ViewIvfReport = 'View IVF Report',
  ViewStimulationSheet = 'View stim sheet',
}

export const IVFPlanActionMap = new Map<IVFPlanAction, IVFPlanActionTitle>([
  [IVFPlanAction.MarkAsCompleted, IVFPlanActionTitle.MarkAsCompleted],
  [IVFPlanAction.MarkAsCancelled, IVFPlanActionTitle.MarkAsCancelled],
  [IVFPlanAction.ViewIvfReport, IVFPlanActionTitle.ViewIvfReport],
  [IVFPlanAction.ViewStimulationSheet, IVFPlanActionTitle.ViewStimulationSheet],
])

export const IVFPlanStatusTextColorMap = new Map<IVFPlanStatus, string>([
  [IVFPlanStatus.Active, '#202E27'],
  [IVFPlanStatus.Upcoming, '#202E27'],
  [IVFPlanStatus.Completed, '#202E27'],
  [IVFPlanStatus.Cancelled, '#202E27'],
  [IVFPlanStatus.AwaitingBiopsyResults, '#202E27'],
])

export const IVFPlanStatusBackgroundColorMap = new Map<IVFPlanStatus, string>([
  [IVFPlanStatus.Active, '#A9EBB0'],
  [IVFPlanStatus.Upcoming, '#A7D6EA'],
  [IVFPlanStatus.Completed, '#F8B5D1'],
  [IVFPlanStatus.Cancelled, '#EEEEEE'],
  [IVFPlanStatus.AwaitingBiopsyResults, '#F8DA8D'],
])
