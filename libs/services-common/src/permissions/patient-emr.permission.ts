import {PermissionEnum} from '@libs/data-layer/apps/clinic-tasks/enums'

export const getServiceProvidersPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
]
export const getPatientsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.Appointments,
  PermissionEnum.CheckIn,
  PermissionEnum.TaskList,
]
export const getAlertDetailsPermissions: PermissionEnum[] = getPatientsPermissions
export const getPatientCheckInAlertsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.CheckIn,
]
export const getPatientsWithDoBPermissions: PermissionEnum[] = getPatientsPermissions
export const createPatientCustomAlertPermissions: PermissionEnum[] = getPatientsPermissions
export const updatePatientCustomAlertPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
]
export const deletePatientCustomAlertPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
]
export const getPatientStatusesPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
]

export const getPatientEncounterFiltersPermissions: PermissionEnum[] = [
  PermissionEnum.EncountersTab,
]
export const getPatientEncountersPermissions: PermissionEnum[] =
  getPatientEncounterFiltersPermissions
export const getPatientEncounterDetailsPermissions: PermissionEnum[] =
  getPatientEncounterFiltersPermissions
export const getEncounterTypesPermissions: PermissionEnum[] = getPatientEncounterFiltersPermissions
export const createPatientEncounterPermissions: PermissionEnum[] =
  getPatientEncounterFiltersPermissions
export const updateEncounterAddendumPermissions = [PermissionEnum.EncountersTab]
export const addEncounterAddendumPermissions: PermissionEnum[] =
  getPatientEncounterFiltersPermissions
export const updatePatientEncounterPermissions: PermissionEnum[] =
  getPatientEncounterFiltersPermissions
export const downloadPatientEncounterNotesPDFPermissions: PermissionEnum[] =
  getPatientEncounterFiltersPermissions
export const getEncountersTypeTemplate: PermissionEnum[] = getPatientEncounterFiltersPermissions

export const getPatientStaffNoteFiltersPermissions: PermissionEnum[] = [
  PermissionEnum.StaffNotesTab,
]
export const getPatientStaffNotesPermissions: PermissionEnum[] =
  getPatientStaffNoteFiltersPermissions
export const getPatientStaffNoteDetailsPermissions: PermissionEnum[] =
  getPatientStaffNoteFiltersPermissions
export const getStaffNoteTypesPermissions: PermissionEnum[] = getPatientStaffNoteFiltersPermissions
export const createPatientStaffNotePermissions: PermissionEnum[] =
  getPatientStaffNoteFiltersPermissions
export const updateStaffNoteAddendumPermissions = [PermissionEnum.StaffNotesTab]
export const addStaffNoteAddendumPermissions: PermissionEnum[] =
  getPatientStaffNoteFiltersPermissions
export const updatePatientStaffNotePermissions: PermissionEnum[] =
  getPatientStaffNoteFiltersPermissions
export const downloadPatientStaffNoteNotesPDFPermissions: PermissionEnum[] =
  getPatientStaffNoteFiltersPermissions
export const getStaffNotesTypeTemplate: PermissionEnum[] = getPatientStaffNoteFiltersPermissions

export const getPatientProfilePermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.CheckIn,
]
export const getProfileOverviewPermissions: PermissionEnum[] = [PermissionEnum.PatientProfileTab]
export const getPatientContactInformationPermission: PermissionEnum[] = [
  PermissionEnum.InHouseTests,
  PermissionEnum.ExternalResults,
  PermissionEnum.SpecimenCollection,
  PermissionEnum.DiagnosticImaging,
]
export const getProfileHighlightPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.CheckIn,
]
export const createPatientMilestonePermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.Appointments,
  PermissionEnum.PlansTab,
]
export const sendIntakePermissions: PermissionEnum[] = [PermissionEnum.PatientProfileTab]
export const verifyPhotoPermissions: PermissionEnum[] = [PermissionEnum.CheckIn]

export const getPrescriptionDropdownsPermissions: PermissionEnum[] = [
  PermissionEnum.MedicationsTab,
  PermissionEnum.PlansTab,
]
export const getPatientPrescriptionsStatusPermissions: PermissionEnum[] = [
  PermissionEnum.MedicationsTab,
]
export const getThyroidProtocolPermissions: PermissionEnum[] = [PermissionEnum.MedicationsTab]
export const getPatientPrescriptionsPermissions: PermissionEnum[] =
  getPatientPrescriptionsStatusPermissions
export const createPatientPrescriptionPermissions: PermissionEnum[] =
  getPatientPrescriptionsStatusPermissions
export const updatePrescriptionStatusPermissions: PermissionEnum[] =
  getPatientPrescriptionsStatusPermissions
export const archivePrescriptionStatusPermissions: PermissionEnum[] =
  getPatientPrescriptionsStatusPermissions
export const downloadPatientPrescriptionPDFPermissions: PermissionEnum[] =
  getPatientPrescriptionsStatusPermissions

export const patientPescriptionPermissions: PermissionEnum[] = [
  PermissionEnum.PlansTab,
  PermissionEnum.MedicationsTab,
]
export const updatePatientMedicationPermissions: PermissionEnum[] =
  getPatientPrescriptionsStatusPermissions
export const getMedicationDrugsPermissions: PermissionEnum[] = [
  PermissionEnum.PlansTab,
  PermissionEnum.MedicationsTab,
]

export const getMedicationCategoriesPermissions: PermissionEnum[] = [PermissionEnum.PlansTab]
export const getMedicationsPermissions: PermissionEnum[] = [
  PermissionEnum.PlansTab,
  PermissionEnum.MedicationsTab,
  PermissionEnum.PatientProfileTab,
]
export const getMedicationsAccessTokenPermissions: PermissionEnum[] = [
  PermissionEnum.PlansTab,
  PermissionEnum.MedicationsTab,
  PermissionEnum.PatientProfileTab,
]
export const checkDrugToDrugInteractionPermissions: PermissionEnum[] = [
  PermissionEnum.PlansTab,
  PermissionEnum.MedicationsTab,
  PermissionEnum.PatientProfileTab,
]
export const getPatientMedicationStatePermissions: PermissionEnum[] = [
  PermissionEnum.MedicationsTab,
]
export const getPatientMedicalBackgroundDropdownOptionsPermissions: PermissionEnum[] = [
  PermissionEnum.MedicalBackground,
  PermissionEnum.MedicationsTab,
  PermissionEnum.PatientProfileTab,
]
export const getFemalePatientFertilityHistoryPermissions: PermissionEnum[] = [
  PermissionEnum.MedicalBackground,
]
export const updateFemalePatientFertilityHistoryPermissions: PermissionEnum[] =
  getFemalePatientFertilityHistoryPermissions
export const getFemalePatientGTPAETALSPermissions: PermissionEnum[] =
  updateFemalePatientFertilityHistoryPermissions
export const updateFemalePatientGTPAETALSPermissions: PermissionEnum[] =
  getFemalePatientGTPAETALSPermissions
export const getFemalePatientMenstrualCycleHistoryPermissions: PermissionEnum[] = [
  PermissionEnum.MedicalBackground,
]
export const updateFemalePatientMenstrualCycleHistoryPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const getFemalePatientGynaecologicalHistoryPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const updateFemalePatientGynaecologicalHistoryPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const getGenitourinaryHistoryPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const updateGenitourinaryHistoryPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const getPatientContactInformationPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const updatePatientContactInformationPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const getPatientBackgroundInformationPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const updatePatientBackgroundInformationPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const getPatientGeneralHealthPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const updatePatientGeneralHealthPermissions: PermissionEnum[] =
  getFemalePatientMenstrualCycleHistoryPermissions
export const getIcFormPermissions: PermissionEnum[] = [PermissionEnum.PatientProfileTab]
export const pushPaymentAlertPermissions: PermissionEnum[] = [PermissionEnum.CheckIn]
export const getDoctorInformationPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.CheckIn,
]
export const updateDoctorInformationPermissions: PermissionEnum[] = [
  ...getDoctorInformationPermissions,
]
export const updateOhipInformationPermissions: PermissionEnum[] = [
  PermissionEnum.CheckIn,
  PermissionEnum.PatientListDetailsHighlights,
]

export const getOhipInformationPermissions: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.CheckIn,
]
export const getPatientProfileContactInformation: PermissionEnum[] = [
  PermissionEnum.PatientListDetailsHighlights,
  PermissionEnum.CheckIn,
]

export const getPatientDocumentsPermissions: PermissionEnum[] = [PermissionEnum.PatientDocumentsTab]
export const uploadPatientDocumentPermissions: PermissionEnum[] = [
  PermissionEnum.PatientDocumentsTab,
  PermissionEnum.PlansTab,
]
export const getDocumentCategories: PermissionEnum[] = [
  PermissionEnum.PatientDocumentsTab,
  PermissionEnum.PlansTab,
]
export const patientIntakePermissions: PermissionEnum[] = [PermissionEnum.PatientProfileTab]
export const externalDoctorsPermissions: PermissionEnum[] = [
  PermissionEnum.PatientProfileTab,
  PermissionEnum.PatientDocumentsTab,
]
