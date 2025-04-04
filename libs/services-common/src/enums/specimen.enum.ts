import {
  SemenSpecimenCollectionContainer,
  SemenSpecimenCollectionContainerLabel,
  SemenSpecimenCollectionMethod,
  SemenSpecimenCollectionPurpose,
  SemenSpecimenCollectionPurposeLabel,
} from '@libs/data-layer/apps/clinic-test/enums'

export enum SpecimenFilterEnum {
  Status = 'Status',
  Machine = 'Machine',
  TestPanel = 'TestPanel',
  TestType = 'TestType',
}

export enum SpecimenFilterNamesEnum {
  Status = 'Status',
  Machine = 'Machine',
  TestPanel = 'Test/Panel',
  TestType = 'Test/Panel',
}

export const getSpecimenFiltersType = new Map<SpecimenFilterEnum, string>([
  [SpecimenFilterEnum.Status, SpecimenFilterNamesEnum.Status],
  [SpecimenFilterEnum.Machine, SpecimenFilterNamesEnum.Machine],
  [SpecimenFilterEnum.TestPanel, SpecimenFilterNamesEnum.TestPanel],
  [SpecimenFilterEnum.TestType, SpecimenFilterNamesEnum.TestType],
])

export enum SpecimenSortByField {
  PatientName = 'PatientName',
  CollectionAge = 'CollectionAge',
  LabDestination = 'LabDestination',
}

export enum SemenFormDropdownTypeEnum {
  CollectionMethod = 'CollectionMethod',
  CollectionContainer = 'CollectionContainer',
  CollectionReason = 'CollectionReason',
}

export const getSemenFormDropdownOptionsEnumList = new Map<
  SemenFormDropdownTypeEnum,
  Record<string, string>
>([
  [SemenFormDropdownTypeEnum.CollectionReason, SemenSpecimenCollectionPurpose],
  [SemenFormDropdownTypeEnum.CollectionMethod, SemenSpecimenCollectionMethod],
  [SemenFormDropdownTypeEnum.CollectionContainer, SemenSpecimenCollectionContainer],
])

export const getSemenFormDropdownOptionsEnumLabelList = new Map<
  SemenFormDropdownTypeEnum,
  Record<string, string>
>([
  [SemenFormDropdownTypeEnum.CollectionReason, SemenSpecimenCollectionPurposeLabel],
  [SemenFormDropdownTypeEnum.CollectionMethod, SemenSpecimenCollectionMethod],
  [SemenFormDropdownTypeEnum.CollectionContainer, SemenSpecimenCollectionContainerLabel],
])

export enum ActionOnSpecimenTypeEnum {
  RetestRequired = 'RetestRequired',
  RecollectRequired = 'RecollectRequired',
}

export enum SpecimenBulkActionEnum {
  Retest = 'Retest',
  Recollect = 'Recollect',
  InProgress = 'InProgress',
  InputTestResults = 'InputTestResults',
}

export enum SpecimenTrackingBulkActionEnum {
  MoveToAnotherTransport = 'MoveToAnotherTransport',
  MoveToTransport = 'MoveToTransport',
  MoveInHouse = 'MoveInHouse',
  MoveBackToSpecimenTracking = 'MoveBackToSpecimenTracking',
  PrintRequisition = 'PrintRequisition',
  RePrintBarcode = 'RePrintBarcode',
}

export const getSpecimenBulkActionTitle = new Map<SpecimenBulkActionEnum, string>([
  [SpecimenBulkActionEnum.Retest, 'Mark as Retest Required'],
  [SpecimenBulkActionEnum.Recollect, 'Mark as Recollect Required'],
  [SpecimenBulkActionEnum.InProgress, 'Mark as In-Progress'],
  [SpecimenBulkActionEnum.InputTestResults, 'Input Test Results'],
])

export const getSpecimenTrackingBulkActionTitle = new Map<SpecimenTrackingBulkActionEnum, string>([
  [SpecimenTrackingBulkActionEnum.MoveToAnotherTransport, 'Move to Another Transport Folder'],
  [SpecimenTrackingBulkActionEnum.MoveToTransport, 'Add to New/Existing Transport'],
  [SpecimenTrackingBulkActionEnum.MoveInHouse, 'Receive In-House'],
  [SpecimenTrackingBulkActionEnum.MoveBackToSpecimenTracking, 'Move back to All Tests'],
  [SpecimenTrackingBulkActionEnum.PrintRequisition, 'Print Requisition Sheet'],
  [SpecimenTrackingBulkActionEnum.RePrintBarcode, 'Re-Print Barcode'],
])

export enum SortByFieldFieldForTransportFolderSpecimensList {
  PatientName = 'PatientName',
}

export enum InHouseCollectionAgeTypeEnum {
  GreaterThan14Days = 'GreaterThan14Days',
  GreaterThan7Days = 'GreaterThan7Days',
  LessThanOrEqual7Days = 'LessThanOrEqual7Days',
}

export enum InHouseCollectionAgeLabelEnum {
  GreaterThan14Days = '14+ days',
  GreaterThan7Days = '8-14 days',
  LessThanOrEqual7Days = '1-7 days',
}
