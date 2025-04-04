export enum SemenAnalysisAnswers {
  SemenAnalysisIsNormal = 'SemenAnalysisIsNormal',
}

export enum AnalysisResult {
  Normal = 'Normal',
  Abnormal = 'Abnormal',
}

export const AnalysisResultTitles = {
  [AnalysisResult.Normal]: AnalysisResult.Normal,
  [AnalysisResult.Abnormal]: AnalysisResult.Abnormal,
}

export enum AbnormalPAPProceduresAnswersEnum {
  AbnormalPAPProceduresAnswers = 'AbnormalPAPProceduresAnswers',
}

export enum AbrormalPAPProceduresEnum {
  Biopsy = 'Biopsy',
  LEEP = 'LEEP',
  ConeBiopsy = 'ConeBiopsy',
}

export enum AbrormalPAPProceduresLabel {
  Biopsy = 'Biopsy',
  LEEP = 'LEEP',
  ConeBiopsy = 'Cone biopsy',
}

export enum DetailTestResultItem {
  OrderedBy = 'Ordered by:',
  CollectionDate = 'Collection date:',
  ReportingDate = 'Reporting date:',
}
export const rejectedSpecimenDescription =
  'Your semen sample was not suitable for testing and therefore was rejected.\n' +
  '\n' +
  'Your care team will reach out to discuss next steps.'

export const testResultDetailTitle = `Reviewed by doctor`
export const testResultDetailDescription =
  'Your test results have been reviewed by your doctor and any relevant findings will be discussed with you, if applicable, during the next visit with a member of your healthcare team.'

export const rejectedTestResultDetailTitle = 'Semen sample rejected'

export const testResultSpermCryoDetailTitle = `Information about your cryopreserved sample`
export const testResultSpermCryoDetailDescription = `We have cryopreserved your semen sample, please reach out to your care navigator if you have any questions`

export enum TestResultItemTypeEnum {
  None = 'None',
  OrderGroup = 'OrderGroup',
  TestType = 'TestType',
}

export enum TestResultHistoryTrend {
  NoTrend = 'No trend',
  ExistedTrend = 'Trends:',
}

export enum TestResultFilterEnum {
  Status = 'Status',
  Lab = 'Lab',
  TestPanel = 'TestPanel',
  TestType = 'TestType',
}

export enum TestResultFilterNamesEnum {
  Status = 'Status',
  Lab = 'Lab Destination',
  TestPanel = 'Test/Panel',
  TestType = 'Test/Panel',
}

export const getTestResultFiltersType = new Map<TestResultFilterEnum, string>([
  [TestResultFilterEnum.Status, TestResultFilterNamesEnum.Status],
  [TestResultFilterEnum.Lab, TestResultFilterNamesEnum.Lab],
  [TestResultFilterEnum.TestPanel, TestResultFilterNamesEnum.TestPanel],
  [TestResultFilterEnum.TestType, TestResultFilterNamesEnum.TestType],
])

export enum OrderResultsFilterEnum {
  Status = 'Status',
  FinalResultType = 'FinalResultType',
  TestPanel = 'TestPanel',
  TestType = 'TestType',
  TestGroup = 'TestGroup',
}

export enum OrderResultsFilterNamesEnum {
  Status = 'Status',
  FinalResultType = 'Final Result Type',
  TestPanel = 'Test Panel',
  TestType = 'Test Type',
  TestGroup = 'Test Group',
}

export const getTestOrderResultListFiltersType = new Map<OrderResultsFilterEnum, string>([
  [OrderResultsFilterEnum.Status, OrderResultsFilterNamesEnum.Status],
  [OrderResultsFilterEnum.FinalResultType, OrderResultsFilterNamesEnum.FinalResultType],
  [OrderResultsFilterEnum.TestPanel, OrderResultsFilterNamesEnum.TestPanel],
  [OrderResultsFilterEnum.TestType, OrderResultsFilterNamesEnum.TestType],
  [OrderResultsFilterEnum.TestGroup, OrderResultsFilterNamesEnum.TestGroup],
])

export enum SortByField {
  CollectionAge = 'CollectionAge',
  Status = 'Status',
  Lab = 'Lab',
  PatientName = 'PatientName',
}

export enum OrderResultSortByField {
  Status = 'Status',
  Date = 'Date',
}

export enum ExternalCollectionAgeTypeEnum {
  GreaterThan30Days = 'GreaterThan30Days',
  GreaterThan15Days = 'GreaterThan15Days',
  LessThanOrEqual15Days = 'LessThanOrEqual15Days',
}

export enum ExternalCollectionAgeStatsEnum {
  GreaterThan30Days = '30+ days',
  GreaterThan15Days = '16-30 days',
  LessThanOrEqual15Days = '1-15 days',
}

export enum TestResultUnit {
  CM = 'cm',
  BPM = 'BPM',
}

export enum LabLocationEnumDto {
  External = 'External',
  InHouse = 'InHouse',
}

export enum PrimingResultSectionType {
  InfectiousDisease = 'InfectiousDisease',
  Other = 'Other',
}

export const PrimingResultSectionLabel = {
  [PrimingResultSectionType.InfectiousDisease]: 'Infectious Disease Screen',
  [PrimingResultSectionType.Other]: 'Other Test Results',
}

export enum PrimingResultPatientLabel {
  Primary = 'Primary Patient Testing',
  FemalePartner = 'Female Partner Testing',
  MalePartner = 'Male Partner Testing',
}

export enum Sections {
  Uterus = 'Uterus',
  RightOvary = 'Right Ovary',
  LeftOvary = 'Left Ovary',
  PelvicFreeFluidCollection = 'Pelvic Free Fluid Collection',
  AbdominalFreeFluidCollection = 'Abdominal Free Fluid Collection',
  PresenceOfPleuralEffusion = 'Presence of Pleural Effusion',
}
