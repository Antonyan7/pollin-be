import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

export const getProfileTestResultsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.PatientProfileTab,
]
export const getLatestTestResultsPermissions: PermissionEnum[] = [PermissionEnum.PatientProfileTab]
export const getPatientAppointmentTestResults: PermissionEnum[] = [PermissionEnum.PatientProfileTab]

export const getPreliminaryBloodsPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const getPlanInformationPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const getInfectiousDiseaseScreenPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const getTestResultsHistoryPermissions: PermissionEnum[] = [PermissionEnum.PatientProfileTab]
export const getTestResultStatsPermissions: PermissionEnum[] = [
  PermissionEnum.ResultsTab,
  PermissionEnum.ExternalResults,
]
export const getTestResultFiltersPermissions: PermissionEnum[] = [
  PermissionEnum.ResultsTab,
  PermissionEnum.DiagnosticImaging,
]
export const getTestResultsListPermissions: PermissionEnum[] = getTestResultStatsPermissions
export const getTestResultsDetailsPermissions: PermissionEnum[] = [
  PermissionEnum.ResultsTab,
  PermissionEnum.InHouseTests,
  PermissionEnum.ExternalResults,
  PermissionEnum.DiagnosticImaging,
]
export const updateTestResultsPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.ExternalResults,
]
export const removeTestResultAttachmentPermissions: PermissionEnum[] =
  getTestResultFiltersPermissions
export const markTestAsReviewedPermissions: PermissionEnum[] = [PermissionEnum.ResultsTab]
export const markTestAsReleasedPermissions: PermissionEnum[] = getTestResultFiltersPermissions
export const getTestFinalResultTypesPermissions = [PermissionEnum.ResultsTab]
export const downloadTestResultAttachmentPermissions = [PermissionEnum.ResultsTab]
export const getOrderResultListFiltersPermissions: PermissionEnum[] =
  getTestResultFiltersPermissions
export const getOrderResultsListForPatientPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
]
export const getTestResultStatusesPermissions: PermissionEnum[] = [
  PermissionEnum.ResultsTab,
  PermissionEnum.DiagnosticImaging,
]
export const getOrderStatusListPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const getOrderListPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const getOrderGroupsListPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const validateOrderPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const createOrderPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const getOrderPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const getOrderTypesPermissions = [PermissionEnum.OrdersTab]
export const updateOrderPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const cancelOrderPermissions: PermissionEnum[] = [PermissionEnum.OrdersTab]
export const getOrderCancellationReasonListPermissions = [PermissionEnum.OrdersTab]
export const getSpecimensStatsPermissions: PermissionEnum[] = [PermissionEnum.InHouseTests]
export const spermCryoPermissions: PermissionEnum[] = [PermissionEnum.SpermCryo]
export const getSpecimenFiltersStatsPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.ExternalResults,
]
export const getSpecimensListPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.ExternalResults,
]
export const getCollectedListPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenTracking,
]
export const getSpecimensRetestOrRecollectReasonsPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
]
export const getListOfLabMachinesPermissions: PermissionEnum[] = [PermissionEnum.InHouseTests]
export const getSpecimenActionsListPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenTracking,
  PermissionEnum.ResultsTab,
]
export const getSpecimensForAppointmentPermissions = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenCollection,
]
export const submitSemenSpecimensCollectionsPermissions = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenCollection,
]
export const rejectSemenSpecimensCollectionsPermissions = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenCollection,
]
export const getSemenCollectionFormDropdownOptionsPermissions = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenCollection,
]
export const applyMoveToAllTestsActionPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenTracking,
]
export const applyMoveToInHouseTestsActionPermissions: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.SpecimenTracking,
]
export const applyRetestActionPermissions: PermissionEnum[] = [PermissionEnum.InHouseTests]
export const applyRecollectActionPermissions: PermissionEnum[] = [PermissionEnum.InHouseTests]
export const updateSpecimensMachinePermissions: PermissionEnum[] = [PermissionEnum.InHouseTests]
export const getSpecimenFiltersPermissions: PermissionEnum[] = [PermissionEnum.SpecimenCollection]
export const submitSpecimensCollectionPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenCollection,
]
export const getTransportFolderListPermissions: PermissionEnum[] = [PermissionEnum.SpecimenTracking]
export const moveTransportFolderToInTransitPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenTracking,
]
export const createTransportFolderPermissions: PermissionEnum[] = [PermissionEnum.SpecimenTracking]
export const getTransportActionsListPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenTracking,
]
export const addSpecimenToTransportFolderPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenTracking,
]
export const getSpecimensInTransportFolderPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenTracking,
]
export const getListOfLabsPermissions: PermissionEnum[] = [PermissionEnum.SpecimenTracking]

export const createAndGetUltrasoundPermissions: PermissionEnum[] = [
  PermissionEnum.ResultsTab,
  PermissionEnum.InHouseTests,
  PermissionEnum.ExternalResults,
  PermissionEnum.DiagnosticImaging,
]
export const createUltrasoundDropDownOptionsPermissions: PermissionEnum[] = [
  PermissionEnum.ResultsTab,
  PermissionEnum.DiagnosticImaging,
]

export const getDiagnosticImagingListDTOPermissions: PermissionEnum[] = [
  PermissionEnum.DiagnosticImaging,
]

export const getDiagnosticImagingListFiltersPermissions: PermissionEnum[] = [
  PermissionEnum.DiagnosticImaging,
]

export const getTransportManifestFilePermission: PermissionEnum[] = [
  PermissionEnum.SpecimenTracking,
]

export const getUltrasoundFinalReportDetailsPermissions: PermissionEnum[] = [
  PermissionEnum.DiagnosticImaging,
]

export const createObUltrasoundPermissions: PermissionEnum[] = [PermissionEnum.DiagnosticImaging]
export const getObUltrasoundPermissions: PermissionEnum[] = [
  PermissionEnum.OrdersTab,
  PermissionEnum.ResultsTab,
  PermissionEnum.InHouseTests,
  PermissionEnum.ExternalResults,
  PermissionEnum.DiagnosticImaging,
]
export const geneticTestsPermissions: PermissionEnum[] = [
  PermissionEnum.GeneticTests,
  PermissionEnum.OrdersTab,
  PermissionEnum.ResultsTab,
]
