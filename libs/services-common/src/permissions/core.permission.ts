import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

const clinicPortalNoPermission = PermissionEnum.ClinicPortalNoPermissions
export const getMobileConfigPermissions = [clinicPortalNoPermission]
export const getLibraryPermissions = [clinicPortalNoPermission]
export const getAuthPermissions = [clinicPortalNoPermission]
export const getCartPermissions = [clinicPortalNoPermission]
export const getPrivacyAndTermsPermissions = [clinicPortalNoPermission]

export const getClinicConfigPermissions = [clinicPortalNoPermission]
export const shareFeedbackPermissions = [clinicPortalNoPermission]
export const getCurrentStaffUserPermissions = [clinicPortalNoPermission]

//Tasks
export const getTasksListPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const createTaskPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const getTaskDetailsPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const reassignTaskPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const editTaskPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const updateTaskStatusPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const getTaskStatusesPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const getTaskPrioritiesPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const getTaskFiltersPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const setReadStatusPermissions: PermissionEnum[] = [PermissionEnum.TaskList]
export const getUnreadCountPermissions: PermissionEnum[] = [PermissionEnum.TaskList]

//Billing
export const ohipBillingPermissions: PermissionEnum[] = [PermissionEnum.OhipBilling]
export const billPatientPermissions: PermissionEnum[] = [PermissionEnum.BillPatient]
export const paymentEstimatesPermissions: PermissionEnum[] = [PermissionEnum.EstimatesTab]
