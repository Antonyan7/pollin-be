export enum DiagnosticImagingDropdownsEnum {
  CystType = 'CystType',
  TrilaminarEndometriumType = 'TrilaminarEndometriumType',
  FreeFluidType = 'FreeFluidType',
  ObGestationalAgeType = 'ObGestationalAgeType',
  CervixType = 'CervixType',
}

export enum TrilaminarEndometriumOptions {
  Yes = 'Yes',
  No = 'No',
  NA = 'NA',
}

export enum FreeFluidOptions {
  Yes = 'Yes',
  No = 'No',
}

export const UterusResultLabels = new Map<TrilaminarEndometriumOptions | FreeFluidOptions, string>([
  [TrilaminarEndometriumOptions.Yes, 'Yes'],
  [FreeFluidOptions.Yes, 'Yes'],

  [TrilaminarEndometriumOptions.No, 'No'],
  [FreeFluidOptions.No, 'No'],

  [TrilaminarEndometriumOptions.NA, 'N/A'],
])

export enum UltrasoundFilterType {
  Status = 'Status',
}

export enum FinalReportFilterType {
  Status = 'Status',
}

export const UltrasoundResultLabels = new Map<UltrasoundFilterType, string>([
  [UltrasoundFilterType.Status, 'Status'],
])

export const FinalReportLabels = new Map<FinalReportFilterType, string>([
  [FinalReportFilterType.Status, 'Status'],
])

export enum UltrasoundSortField {
  AppointmentDate = 'AppointmentDate',
}

export enum FinalReportSortField {
  AppointmentDate = 'AppointmentDate',
}
