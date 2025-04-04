import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

export const getServiceProvidersV2Permissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
  PermissionEnum.BlockSchedule,
  PermissionEnum.ApplySchedule,
  PermissionEnum.SpecimenCollection,
  PermissionEnum.DiagnosticImaging,
]
export const getServiceTypesPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
  PermissionEnum.ScheduleTemplates,
  PermissionEnum.PlansTab,
]
export const getServiceTypeScheduleDatesPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
  PermissionEnum.ScheduleTemplates,
  PermissionEnum.PlansTab,
]
export const createAppointmentPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
]
export const getAppointmentDetailsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
  PermissionEnum.SpecimenCollection,
  PermissionEnum.PlansTab,
]
export const updateAppointmentPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
]
export const getPatientAppointmentsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.PlansTab,
]
export const getPatientRecentAppointmentsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.EncountersTab,
]
export const getAppointmentFiltersPermissions: PermissionEnum[] = [PermissionEnum.PatientProfileTab]
export const getFilteredAppointmentsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
]
export const getAppointmentCancellationReasonsPermissions = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
]
export const getCheckInPatientAppointmentsPermissions: PermissionEnum[] = [
  PermissionEnum.CheckIn,
  PermissionEnum.PatientListDetailsHighlights,
]
export const getServiceProvidersPermissions = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
  PermissionEnum.BlockSchedule,
  PermissionEnum.ApplySchedule,
  PermissionEnum.ScheduleTemplates,
  PermissionEnum.SpecimenCollection,
  PermissionEnum.DiagnosticImaging,
]
export const getAppointmentPaymentStatusesPermissions = [PermissionEnum.CheckIn]
export const getAppointmentStatusesPermissions: PermissionEnum[] = [
  PermissionEnum.Appointments,
  PermissionEnum.CheckIn,
  PermissionEnum.PlansTab,
]
export const getServiceProvidersAppointmentsPermissions: PermissionEnum[] = [
  PermissionEnum.Appointments,
]
export const getServiceProvidersAppointmentsForSpecimenPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenCollection,
]
export const getSpecimenAppointmentFiltersPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenCollection,
]
export const updateSpecimenCollectionAppointmentStatusPermissions: PermissionEnum[] = [
  PermissionEnum.SpecimenCollection,
]

export const getReportPermissions: PermissionEnum[] = [PermissionEnum.ToolsReports]

export const getPatientCheckedInAppointmentsViaPermissions: PermissionEnum[] = [
  PermissionEnum.CheckIn,
]

export const getServiceCategoryPermissions: PermissionEnum[] = [PermissionEnum.ToolsReports]

//Scheduling
export const getTemplatesPermissions: PermissionEnum[] = [PermissionEnum.ScheduleTemplates]
export const createTemplatePermissions: PermissionEnum[] = [PermissionEnum.ScheduleTemplates]
export const updateTemplateTemplatePermissions: PermissionEnum[] = [
  PermissionEnum.ScheduleTemplates,
  PermissionEnum.ApplySchedule,
]
export const deleteTemplatesPermissions: PermissionEnum[] = [PermissionEnum.ScheduleTemplates]
export const getTemplateDetailsPermissions: PermissionEnum[] = [
  PermissionEnum.ScheduleTemplates,
  PermissionEnum.ApplySchedule,
]
export const applySchedulingTemplatePermissions: PermissionEnum[] = [PermissionEnum.ApplySchedule]
export const applySchedulingBlockPermissions: PermissionEnum[] = [PermissionEnum.BlockSchedule]
export const timeOffBlockPermissions: PermissionEnum[] = [PermissionEnum.BlockSchedule]
