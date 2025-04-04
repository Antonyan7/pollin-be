import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

const clinicPortalNoPermission = PermissionEnum.ClinicPortalNoPermissions
export const getPatientQuestionairePermissions = [clinicPortalNoPermission]
export const getPatientPlanPermissions = [clinicPortalNoPermission]
export const getPartnerInvitationPermissions = [clinicPortalNoPermission]
export const getPatientPermissions = [clinicPortalNoPermission]
export const getPatientMilestonesPermissions = [clinicPortalNoPermission]
export const getServiceCategoryPermissions = [clinicPortalNoPermission]
export const getServiceCategoryItemPermissions = [clinicPortalNoPermission]
export const getServiceProviderPermissions = [clinicPortalNoPermission]
export const getBookingPermissions = [clinicPortalNoPermission]
export const getAvailabilityPermissions = [clinicPortalNoPermission]

export const getPatientPlansStatusesPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const getOutComesPermissions: PermissionEnum[] = getPatientPlansStatusesPermissions
export const getCategoriesPlanTypesPermissions: PermissionEnum[] =
  getPatientPlansStatusesPermissions
export const createPatientPlanPermissions: PermissionEnum[] = getPatientPlansStatusesPermissions
export const getPatientPlansListPermissions = getPatientPlansStatusesPermissions
export const pushPeriodReportingMilestonePermissions = getPatientPlansStatusesPermissions
export const getPatientPlansReadyToOrderPermissions: PermissionEnum[] =
  getPatientPlansStatusesPermissions
export const getPatientPlanDetailsWebPermissions: PermissionEnum[] =
  getPatientPlansStatusesPermissions
export const pushPlansToPatientPermissions: PermissionEnum[] = getPatientPlansStatusesPermissions
export const updateStatusToCancelledPermissions: PermissionEnum[] =
  getPatientPlansStatusesPermissions
export const updateStatusToActivePermissions: PermissionEnum[] = getPatientPlansStatusesPermissions
export const updateStatusToCompletedPermissions: PermissionEnum[] =
  getPatientPlansStatusesPermissions
export const getPatientPlanDropdownPermissions: PermissionEnum[] =
  getPatientPlansStatusesPermissions
export const getPatientLinkablePlans: PermissionEnum[] = [PermissionEnum.PlansTab]

export const setStimSheetFirstDate: PermissionEnum[] = [PermissionEnum.PlansTab]
export const getStimSheet: PermissionEnum[] = setStimSheetFirstDate
export const getStimSheetCycleDetails: PermissionEnum[] = [PermissionEnum.PlansTab]
export const updateStimSheetCycleDetails: PermissionEnum[] = [PermissionEnum.PlansTab]
export const addStimSheetNote: PermissionEnum[] = setStimSheetFirstDate
export const dropdownOptionsStimSheet: PermissionEnum[] = setStimSheetFirstDate
export const setCatheterType: PermissionEnum[] = setStimSheetFirstDate
export const signOffPermissions: PermissionEnum[] = setStimSheetFirstDate

export const stimSheetPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const obWorkSheetPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const hcgWorkSheetPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const primingWorkSheetPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const eplWorkSheetPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]

export const planTypesPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const plansPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]

export const worksheetPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const patientPlansSearchPermissions: PermissionEnum[] = [
  PermissionEnum.PlansTab,
  PermissionEnum.ConsentsTab,
]

export const consentsPermissions = [PermissionEnum.ConsentsTab]
