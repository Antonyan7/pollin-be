import {Permission} from '@libs/data-layer/apps/clinic-tasks/entities'
import {roleFixture} from '@libs/common/test/fixtures/role.fixture'
import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

export const plansTabPermissionFixture: Partial<Permission> = {
  id: 1,
  roleId: roleFixture.id,
  permission: PermissionEnum.PlansTab,
}
export const checkInPermissionFixture: Partial<Permission> = {
  id: 2,
  roleId: roleFixture.id,
  permission: PermissionEnum.CheckIn,
}
export const tasksListPermissionFixture: Partial<Permission> = {
  id: 3,
  roleId: roleFixture.id,
  permission: PermissionEnum.TaskList,
}
export const patientListDetailsHighlightsPermissionFixture: Partial<Permission> = {
  id: 4,
  roleId: roleFixture.id,
  permission: PermissionEnum.PatientListDetailsHighlights,
}
export const patientProfileTabPermissionFixture: Partial<Permission> = {
  id: 5,
  roleId: roleFixture.id,
  permission: PermissionEnum.PatientProfileTab,
}
export const medicalBackgroundPermissionFixture: Partial<Permission> = {
  id: 6,
  roleId: roleFixture.id,
  permission: PermissionEnum.MedicalBackground,
}
export const encountersTabPermissionFixture: Partial<Permission> = {
  id: 7,
  roleId: roleFixture.id,
  permission: PermissionEnum.EncountersTab,
}
export const medicationsTabPermissionFixture: Partial<Permission> = {
  id: 8,
  roleId: roleFixture.id,
  permission: PermissionEnum.MedicationsTab,
}
export const resultsTabPermissionFixture: Partial<Permission> = {
  id: 9,
  roleId: roleFixture.id,
  permission: PermissionEnum.ResultsTab,
}
export const consentsTabPermissionFixture: Partial<Permission> = {
  id: 10,
  roleId: roleFixture.id,
  permission: PermissionEnum.ConsentsTab,
}
export const referralsTabPermissionFixture: Partial<Permission> = {
  id: 11,
  roleId: roleFixture.id,
  permission: PermissionEnum.ReferralsTab,
}
export const appointmentsPermissionFixture: Partial<Permission> = {
  id: 12,
  roleId: roleFixture.id,
  permission: PermissionEnum.Appointments,
}
export const scheduleTemplatesPermissionFixture: Partial<Permission> = {
  id: 13,
  roleId: roleFixture.id,
  permission: PermissionEnum.ScheduleTemplates,
}
export const applySchedulePermissionFixture: Partial<Permission> = {
  id: 14,
  roleId: roleFixture.id,
  permission: PermissionEnum.ApplySchedule,
}
export const blockSchedulePermissionFixture: Partial<Permission> = {
  id: 15,
  roleId: roleFixture.id,
  permission: PermissionEnum.BlockSchedule,
}
export const inHouseTestsPermissionFixture: Partial<Permission> = {
  id: 16,
  roleId: roleFixture.id,
  permission: PermissionEnum.InHouseTests,
}
export const externalResultsPermissionFixture: Partial<Permission> = {
  id: 17,
  roleId: roleFixture.id,
  permission: PermissionEnum.ExternalResults,
}
export const specimenCollectionPermissionFixture: Partial<Permission> = {
  id: 18,
  roleId: roleFixture.id,
  permission: PermissionEnum.SpecimenCollection,
}
export const specimenTrackingPermissionFixture: Partial<Permission> = {
  id: 19,
  roleId: roleFixture.id,
  permission: PermissionEnum.SpecimenTracking,
}
export const patientDocumentsPermissionFixture: Partial<Permission> = {
  id: 20,
  roleId: roleFixture.id,
  permission: PermissionEnum.PatientDocumentsTab,
}
export const spermCryoPermissionFixture: Partial<Permission> = {
  id: 21,
  roleId: roleFixture.id,
  permission: PermissionEnum.SpermCryo,
}
export const ordersTabPermissionFixture: Partial<Permission> = {
  id: 22,
  roleId: roleFixture.id,
  permission: PermissionEnum.OrdersTab,
}

export const permissionDiagnosticImagingFixture: Partial<Permission> = {
  id: 23,
  roleId: roleFixture.id,
  permission: PermissionEnum.DiagnosticImaging,
}

export const permissionbillingFixture: Partial<Permission> = {
  id: 24,
  roleId: roleFixture.id,
  permission: PermissionEnum.OhipBilling,
}

export const permissionBillPatientFixture: Partial<Permission> = {
  id: 25,
  roleId: roleFixture.id,
  permission: PermissionEnum.BillPatient,
}

export const permissionStaffNotePatientFixture: Partial<Permission> = {
  id: 27,
  roleId: roleFixture.id,
  permission: PermissionEnum.StaffNotesTab,
}

export const permissionIVFLabFixture: Partial<Permission> = {
  id: 28,
  roleId: roleFixture.id,
  permission: PermissionEnum.IVFLab,
}

export const permissionCryoCardFixture: Partial<Permission> = {
  id: 29,
  roleId: roleFixture.id,
  permission: PermissionEnum.LabCryoPreservation,
}

export const permissionReportFixture: Partial<Permission> = {
  id: 31,
  roleId: roleFixture.id,
  permission: PermissionEnum.ToolsReports,
}

export const permissionDownloadFixture: Partial<Permission> = {
  id: 32,
  roleId: roleFixture.id,
  permission: PermissionEnum.Download,
}

export const permissionLabIntegrationDebugFixture: Partial<Permission> = {
  id: 33,
  roleId: roleFixture.id,
  permission: PermissionEnum.LabIntegrationDebug,
}

export const permissionEstimatesTabFixture: Partial<Permission> = {
  id: 34,
  roleId: roleFixture.id,
  permission: PermissionEnum.EstimatesTab,
}
