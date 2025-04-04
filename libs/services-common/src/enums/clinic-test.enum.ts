import {
  FinalReportStatus,
  FinalResultType,
  GestationalAgeEnum,
  OrderGroupItemEnum,
  SpecimenStatus,
  TestOrderStatusEnum,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'

export const getFinalResultTypeNames = new Map<FinalResultType, string>([
  [FinalResultType.Normal, 'Normal'],
  [FinalResultType.Abnormal, 'Abnormal'],
  [FinalResultType.TestNotComplete, 'Test Not Completed'],
  [FinalResultType.Inconclusive, 'Inconclusive'],
  [FinalResultType.Indeterminate, 'Indeterminate'],
  [FinalResultType.NotApplicable, 'Not Applicable'],
  [FinalResultType.SeeDetails, 'See Details'],
])
export const getTestFinalResultTypesLabelTextColor = new Map<FinalResultType, string>([
  [FinalResultType.Normal, '#02922A'],
  [FinalResultType.Abnormal, '#D7442F'],
])
export const getTestFinalResultTypesLabelBackgroundColor = new Map<FinalResultType, string>([
  [FinalResultType.Normal, '#E2F3E4'],
  [FinalResultType.Abnormal, '#F6EAE6'],
])

export const IncompleteStatuses: Array<TestResultStatus> = [
  TestResultStatus.Pending,
  TestResultStatus.NotReceived,
]

export const incompleteTestResultStatuses = [
  TestResultStatus.NotReceived,
  TestResultStatus.Pending,
  TestResultStatus.Verbal,
]

export const NotEditableStatuses: Array<TestResultStatus> = [
  TestResultStatus.AutomaticallyReviewed,
  TestResultStatus.Reviewed,
  TestResultStatus.Released,
]

export const CompleteStatuses: Array<TestResultStatus> = [
  TestResultStatus.Completed,
  TestResultStatus.AutomaticallyReviewed,
  TestResultStatus.Reviewed,
  TestResultStatus.Released,
]

export enum TestResultStatusName {
  Pending = 'Pending',
  WaitingCompletion = 'Waiting Completion',
  NotReceived = 'Not Received',
  Completed = 'Completed',
  Reviewed = 'Reviewed',
  AutomaticallyReviewed = 'Automatically Reviewed',
  Released = 'Released',
  Rejected = 'Rejected',
  Verbal = 'Verbal',
}

export enum DiagnosticImagingTestResultStatusActionsEnum {
  AddTniIds = 'Add TNI IDs',
  OverflowMenuDisabled = 'Overflow menu disabled',
}
export const diagnosticImagingStatusesActionId: {[value: string]: string} = {}
Object.keys(DiagnosticImagingTestResultStatusActionsEnum).forEach((key: string) => {
  const reverseKey = `${DiagnosticImagingTestResultStatusActionsEnum[key]}`
  diagnosticImagingStatusesActionId[reverseKey] = key
})
export const getDiagnosticImagingStatusesActionId = new Map<TestResultStatusName, string>([
  [
    TestResultStatusName.Pending,
    diagnosticImagingStatusesActionId[DiagnosticImagingTestResultStatusActionsEnum.AddTniIds],
  ],
  [
    TestResultStatusName.WaitingCompletion,
    diagnosticImagingStatusesActionId[DiagnosticImagingTestResultStatusActionsEnum.AddTniIds],
  ],
  [
    TestResultStatusName.Completed,
    diagnosticImagingStatusesActionId[DiagnosticImagingTestResultStatusActionsEnum.AddTniIds],
  ],
  [
    TestResultStatusName.Reviewed,
    diagnosticImagingStatusesActionId[
      DiagnosticImagingTestResultStatusActionsEnum.OverflowMenuDisabled
    ],
  ],
  [
    TestResultStatusName.Released,
    diagnosticImagingStatusesActionId[
      DiagnosticImagingTestResultStatusActionsEnum.OverflowMenuDisabled
    ],
  ],
])

export const getDiagnosticImagingStatusesActionTitle = new Map<
  TestResultStatusName,
  DiagnosticImagingTestResultStatusActionsEnum
>([
  [TestResultStatusName.Pending, DiagnosticImagingTestResultStatusActionsEnum.AddTniIds],
  [TestResultStatusName.WaitingCompletion, DiagnosticImagingTestResultStatusActionsEnum.AddTniIds],
  [TestResultStatusName.Completed, DiagnosticImagingTestResultStatusActionsEnum.AddTniIds],
  [
    TestResultStatusName.Reviewed,
    DiagnosticImagingTestResultStatusActionsEnum.OverflowMenuDisabled,
  ],
  [
    TestResultStatusName.Released,
    DiagnosticImagingTestResultStatusActionsEnum.OverflowMenuDisabled,
  ],
])

export enum TestResultFinalStatusActionsEnum {
  Review = 'Review',
  Release = 'Release',
  Edit = 'Edit',
  Download = 'Download',
}

export enum TestResultFinalStatusActionsEnumTitle {
  Review = 'Mark as Reviewed',
  Release = 'Release to Patient',
  Edit = 'Edit Result',
  Download = 'Download',
}

export const getTestResultStatusTitle = new Map<TestResultStatus | string, TestResultStatusName>([
  [TestResultStatus.Pending, TestResultStatusName.Pending],
  [TestResultStatus.WaitingCompletion, TestResultStatusName.WaitingCompletion],
  [TestResultStatus.NotReceived, TestResultStatusName.NotReceived],
  [TestResultStatus.Completed, TestResultStatusName.Completed],
  [TestResultStatus.Reviewed, TestResultStatusName.Reviewed],
  [TestResultStatus.AutomaticallyReviewed, TestResultStatusName.AutomaticallyReviewed],
  [TestResultStatus.Released, TestResultStatusName.Released],
  [TestResultStatus.Rejected, TestResultStatusName.Rejected],
  [TestResultStatus.Verbal, TestResultStatusName.Verbal],
])

export const getFinalReportStatusTitle = new Map<FinalReportStatus, TestResultStatusName>([
  [FinalReportStatus.Pending, TestResultStatusName.Pending],
  [FinalReportStatus.Completed, TestResultStatusName.Completed],
])

export enum OrdersActions {
  ViewAndEdit = 'ViewAndEdit',
  View = 'View',
  Download = 'Download',
  Cancel = 'Cancel',
}

export enum OrdersActionsTitles {
  ViewAndEdit = 'View & Edit Order',
  View = 'View Order',
  Download = 'Download Requisition(s)',
  Cancel = 'Cancel Order',
}

export const testOrderStatusesForCancelation = [
  TestOrderStatusEnum.NotCollected,
  TestOrderStatusEnum.PartiallyBooked,
  TestOrderStatusEnum.Booked,
]

export const testOrderPossibleActionIds = new Map<TestOrderStatusEnum, OrdersActions[]>([
  [TestOrderStatusEnum.NotCollected, [OrdersActions.Cancel]],
  [TestOrderStatusEnum.PartiallyBooked, [OrdersActions.View, OrdersActions.Cancel]],
  [TestOrderStatusEnum.Booked, [OrdersActions.View, OrdersActions.Cancel]],
  [TestOrderStatusEnum.Collecting, [OrdersActions.View]],
  [TestOrderStatusEnum.AwaitingResults, [OrdersActions.View]],
  [TestOrderStatusEnum.Completed, [OrdersActions.View]],
  [TestOrderStatusEnum.Cancelled, [OrdersActions.View]],
  [TestOrderStatusEnum.Abandoned, [OrdersActions.View]],
])

export const testOrderPossibleActionTitles = new Map<OrdersActions, OrdersActionsTitles>([
  [OrdersActions.View, OrdersActionsTitles.View],
  [OrdersActions.ViewAndEdit, OrdersActionsTitles.ViewAndEdit],
  [OrdersActions.Cancel, OrdersActionsTitles.Cancel],
])

export enum TransportFolderTitle {
  ReadyForTransport = 'Ready for transport',
  InTransit = 'In-Transit',
}

export enum TransportFolderBulkAction {
  MarkInTransit = 'MarkInTransit',
}

export enum TransportFolderBulkActionTitle {
  MarkInTransit = 'Mark as In-Transit',
}

export enum SpecimenStatusName {
  NotCollected = 'Not Collected',
  Collected = 'Collected',
  InProgress = 'In-Progress',
  Completed = 'Completed',
  ReadyForTransport = 'Ready for Transport',
  InTransit = 'In-Transit',
  ReceivedInLab = 'Received in Lab',
  RetestRequired = 'Retest Required',
  RecollectRequired = 'Recollect Required',
  WaitingForCompletion = 'Waiting for completion',
}

export const getSpecimenStatusTitle = new Map<SpecimenStatus, SpecimenStatusName>([
  [SpecimenStatus.NotCollected, SpecimenStatusName.NotCollected],
  [SpecimenStatus.Collected, SpecimenStatusName.Collected],
  [SpecimenStatus.InProgress, SpecimenStatusName.InProgress],
  [SpecimenStatus.ReceivedInLab, SpecimenStatusName.ReceivedInLab],
  [SpecimenStatus.Completed, SpecimenStatusName.Completed],
  [SpecimenStatus.ReadyForTransport, SpecimenStatusName.ReadyForTransport],
  [SpecimenStatus.InTransit, SpecimenStatusName.InTransit],
  [SpecimenStatus.RetestRequired, SpecimenStatusName.RetestRequired],
  [SpecimenStatus.RecollectRequired, SpecimenStatusName.RecollectRequired],
  [SpecimenStatus.WaitingForCompletion, SpecimenStatusName.WaitingForCompletion],
])

export const getTestOrderStatusTitle = new Map<TestOrderStatusEnum, string>([
  [TestOrderStatusEnum.NotCollected, 'Not Collected'],
  [TestOrderStatusEnum.PartiallyBooked, 'Partially Booked'],
  [TestOrderStatusEnum.Booked, 'Booked'],
  [TestOrderStatusEnum.Collecting, 'Collecting'],
  [TestOrderStatusEnum.AwaitingResults, 'Awaiting Results'],
  [TestOrderStatusEnum.Completed, 'Completed'],
  [TestOrderStatusEnum.Cancelled, 'Cancelled'],
  [TestOrderStatusEnum.Abandoned, 'Abandoned'],
])

export const getTestOrderStatusTextColor = new Map<TestOrderStatusEnum, string>([
  [TestOrderStatusEnum.NotCollected, '#EA8F00'],
  [TestOrderStatusEnum.PartiallyBooked, '#616161'],
  [TestOrderStatusEnum.Booked, '#C54184'],
  [TestOrderStatusEnum.Collecting, '#323297'],
  [TestOrderStatusEnum.AwaitingResults, '#005490'],
  [TestOrderStatusEnum.Completed, '#02922A'],
  [TestOrderStatusEnum.Cancelled, '#A81804'],
  [TestOrderStatusEnum.Abandoned, '#D7442F'],
])

export const getTestOrderStatusBackgroundColor = new Map<TestOrderStatusEnum, string>([
  [TestOrderStatusEnum.NotCollected, '#FAF3E2'],
  [TestOrderStatusEnum.PartiallyBooked, '#EEEEEE'],
  [TestOrderStatusEnum.Booked, '#F8E1EA'],
  [TestOrderStatusEnum.Collecting, '#EDE7F6'],
  [TestOrderStatusEnum.AwaitingResults, '#E3F2FD'],
  [TestOrderStatusEnum.Completed, '#E2F3E4'],
  [TestOrderStatusEnum.Cancelled, '#F6EAE6'],
  [TestOrderStatusEnum.Abandoned, '#FFE4E0'],
])

export enum OrderGroupItemNameEnum {
  TestType = 'TestType',
  TestPanel = 'Panel',
  /** @deprecated */
  TaskTemplate = 'TaskTemplate',
  OrderGroup = 'Nestproject Blood Test Group',
  LibraryContent = 'Handout',
}

export const getOrderGroupItemLabel = new Map<OrderGroupItemEnum, OrderGroupItemNameEnum>([
  [OrderGroupItemEnum.TestType, OrderGroupItemNameEnum.TestType],
  [OrderGroupItemEnum.TestPanel, OrderGroupItemNameEnum.TestPanel],
  [OrderGroupItemEnum.OrderGroup, OrderGroupItemNameEnum.OrderGroup],
  [OrderGroupItemEnum.LibraryContent, OrderGroupItemNameEnum.LibraryContent],
])

export enum OrderListSortField {
  Status = 'Status',
  Date = 'Date',
}

export const DEDUPLICATION_MESSAGE_TITLE = 'Duplicate Selection Error'
export const DEDUPLICATION_MESSAGE_SUBTITLE =
  'We have removed the following duplicate selections that were made'

export enum GestationalAgeLabel {
  DLMP = 'DLMP',
  EDD = 'EDD',
}

export const gestationalAgeToLabel = new Map<GestationalAgeEnum, GestationalAgeLabel>([
  [GestationalAgeEnum.DLMP, GestationalAgeLabel.DLMP],
  [GestationalAgeEnum.EDD, GestationalAgeLabel.EDD],
])

export enum WorksheetTestResultTypeEnum {
  General = 'General',
  Hormone = 'Hormone',
  TCM = 'TCM',
}

export const ThyroidWorksheetTestResultActions = {
  [TestResultStatus.Completed]: [
    TestResultFinalStatusActionsEnum.Review,
    TestResultFinalStatusActionsEnum.Release,
  ],
  [TestResultStatus.Reviewed]: [TestResultFinalStatusActionsEnum.Release],
  [TestResultStatus.AutomaticallyReviewed]: [TestResultFinalStatusActionsEnum.Release],
}

export const NotDownloadableProcessTypes: Array<ProcessType> = [
  ProcessType.GeneticTesting,
  ProcessType.UltrasoundSonohysterogram,
]

export const UltrasoundProcessTypes: Array<ProcessType> = [
  ProcessType.UltrasoundDay3,
  ProcessType.UltrasoundFolliclesMonitoring,
  ProcessType.UltrasoundOHSS,
  ProcessType.UltrasoundObstetric,
  ProcessType.UltrasoundSonohysterogram,
]

export const ExternalTestResultStatuses: Array<TestResultStatus> = [
  TestResultStatus.NotReceived,
  TestResultStatus.Pending,
  TestResultStatus.Verbal,
  TestResultStatus.Completed,
  TestResultStatus.WaitingCompletion,
]
