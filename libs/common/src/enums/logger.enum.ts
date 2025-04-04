import {OvaryLocation, SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {PlanCancelledBy} from '@libs/services-common/enums'
import {ValidationError} from '@nestjs/common'
import {TenantAwareAuth} from 'firebase-admin/auth'
import {DrugBankAdapterData} from '../adapters'
import Stripe from 'stripe'
import {PatientDocumentType} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {CryoSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

//Do not include field which can contain plain personal identification ( e.g. email, name, phoneNumber )
export interface IOpenInformation {
  id?: number
  uuid?: string
  count?: number
  regenerate?: boolean
  otpId?: string
  addonId?: number
  paymentOrderIds?: number[]
  tankIds?: number[]
  summaryId?: number
  patientFeedbackId?: number
  attempt?: number

  patientIdentifier?: string
  actionType?: string
  milestoneId?: number
  paymentOrderItemId?: number
  paymentOrderItemsWithMultipleAppointments?: {
    paymentOrderItemId: number
    appointmentIds: number[]
  }
  resultUUID?: string
  patientUUID?: string
  modulesUUIDs?: string[]
  status?: string
  patientPlanAlertUUID?: string
  requiredActionUUID?: string
  testResultStatus?: string
  responseStatus?: number
  templateUUID?: string
  resourceUUID?: string
  start?: string | Date
  end?: string | Date
  placeholder?: string
  repeats?: number
  complete?: boolean
  onlyCompleted?: boolean
  periodsUUIDs?: string[]
  templateUUIDs?: string[]
  paymentEstimateUUID?: string
  alertUUID?: string
  idToken?: string
  token?: string
  appCheckToken?: string
  milestoneUUID?: string
  patientMilestonesIds?: number[]
  patientMilestonesUUIDs?: string[]
  partnerInvitationUUID?: string
  providerUUID?: string
  photoKey?: string
  patientMedicationUUID?: string
  prescriptionUUID?: string
  patientAdhocPaymentUUID?: string
  missingAppointment?: string
  allContributions?: string[]
  patientContribution?: string
  partnerInvitationId?: string
  measurementId?: number
  measurementIds?: number[]
  patientProfileAlertsIds?: number[]
  attemptId?: number

  serviceCategoryItemUUID?: string
  serviceCategoryItemId?: number
  bookingIntentServiceCategoryItemId?: string
  serviceCategoryItemType?: string
  serviceProviderUUID?: string
  serviceTypeUUID?: string
  serviceCategoryUUID?: string
  bookingType?: string
  bookingItemUUID?: string

  staffUUID?: string
  staffAuthUserId?: string
  taskUUID?: string
  taskUUIDs?: string[]
  authorUUID?: string
  assigneeUUID?: string
  dueDate?: string
  date?: string | Date
  dates?: string[]
  newStatus?: string
  priority?: string
  isRead?: boolean
  lasIntakeReminderSentOn?: Date
  staffFeedbackId?: number

  month?: number
  year?: number

  appointmentUUID?: string
  specimenId?: number
  specimenUUID?: string
  OBRObservationDate?: Date
  catheterTypeUUID?: string
  uncomplicatedProcedure?: boolean
  encounterUUID?: string
  encounterTypeUUID?: string
  addendumUUID?: string
  addendumId?: number
  encountersType?: string
  encounterAuthorsIds?: number[]
  authorsIds?: number[]
  encounterTypesIds?: number[]
  encountersIds?: number[]
  includeAddendums?: boolean

  staffNoteUUID?: string
  staffNoteUUIDs?: string[]
  staffNoteTypeUUID?: string
  staffNotesType?: string
  staffNoteAuthorsIds?: number[]
  staffNoteTypesIds?: number[]
  staffNotesIds?: number[]

  patientAlertUUID?: string
  accepted?: boolean
  attachmentsUUIDs?: string[]
  specimenUUIDs?: string[]
  attachmentUUID?: string
  testResultUUID?: string
  testResultUUIDs?: string[]
  testResultIds?: number[]

  bulkDownloadRequestItems?: {itemUUID: string; type: string}[]

  unlinkedTestResultUUID?: string

  profileTestResultsIds?: number[]
  hasFamilyDoctor?: boolean
  hasReferringDoctor?: boolean
  internalDrugUUID?: string
  drugBankId?: string
  prescriptionType?: string
  url?: string
  categoryUUID?: string
  machineUUID?: string
  transportFolderUUID?: string
  transportFolderId?: number
  reasonUUID?: string
  labId?: number
  labUUID?: string
  orderUUID?: string
  superTypeUUID?: string
  orderTypesUUIDs?: string[]
  cryoUUID?: string
  cryoCardUUID?: string
  reportUUID?: string
  photoStatus?: string
  cartId?: string
  dateOfBirth?: string
  ohipNumber?: string
  ohipVersionCode?: string

  highlightUIID?: string
  questionnaireUUID?: string
  questionnaireIntentId?: string
  questionsUUIDs?: string[]
  currentQuestionUUID?: string
  questionId?: number
  questionPatientInfoMapCode?: string

  patientNoteUUID?: string
  patientPlanUUID?: string
  patientPlanDetailId?: number
  patientPlansUUIDs?: string[]
  encountersUUIDs?: string[]
  patientPlanSheetUUIDs?: string[]
  prescriptionsUUIDs?: string[]

  stimSheetAppointmentUUIDs?: string[]
  reassigningHistoryUUIDs?: string[]
  slotModelId?: string
  planTypeId?: number
  planTypeUUID?: string
  planAssigneeUUID?: string
  assignorUUID?: string
  staffUserUUID?: string
  staffUsersIds?: number[]
  signatoryUUID?: string
  signatorUUID?: string
  principalUUID?: string
  role?: string
  missingMedicationsUUIDs?: string[]

  isDoctor?: boolean
  isVerbal?: boolean

  errorInfo?: {message: string | Error; stack?: string}
  message?: string
  exceptionStack?: string
  exception?: Error
  inputs?: string[]
  options?: Record<string, string>
  envLoadResult?: string
  tenantAwareAuth?: TenantAwareAuth
  isEnabledCustomIdToken?: string
  clientLanguage?: string
  validationErrors?: ValidationError[]
  reason?: string
  fileUrl?: string
  fileUrls?: string[]

  datesToCount?: Record<string, number>

  patientPlanDetailPropertiesChanged?: string[]
  spermSources?: string[]
  filesToDelete?: string[]
  endometrialAssessmentIds?: string[]
  geneticTestingIds?: string[]
  testOrderTypesIds?: number[]

  draftItemsCount?: number

  drugBankResponse?: DrugBankAdapterData<unknown>

  paymentMethodId?: string
  paymentIntent?: Stripe.PaymentIntent
  patientId?: number
  contactId?: number | string
  conversationId?: number | string
  messageId?: number | string
  patientIds?: number[]
  authUserId?: string
  questionnaireIntentRevision?: number
  questionnaireRevision?: number
  bookingIntentId?: string
  bookingIntentIds?: string[]
  bookingIntentServiceCategoryRevision?: number
  serviceCategoryRevision?: number
  bookingIntentServiceCategoryItemRevision?: number
  serviceGroupRevision?: number
  serviceTypeRevision?: number
  slotId?: number
  bookedAppointmentId?: number
  serviceCategoryId?: number
  patientMilestoneId?: number
  patientMilestoneUUID?: string
  stripeCustomerId?: string
  setupIntentId?: string
  idempotencyId?: string
  duration?: number
  meetingId?: string
  startDate?: Date
  serviceProviderId?: number
  serviceTypeId?: number
  serviceTypesToProviders?: number[]
  taskRelatedServiceTypeId?: number
  taskReassignmentId?: number
  taskRelatedPatientId?: number
  appointmentId?: number
  appointmentIds?: number[]
  orderingPhysicianId?: number
  filters?: string
  appointmentsIds?: number[]
  appliedTemplatePeriodsIds?: number[]
  deletedServiceTypeIds?: number[]

  isTentative?: boolean

  appointmentUUIDs?: string[]
  appointmentsToUpdateUUIDs?: string[]
  appointmentsUUIDsToBeUpdatedDb?: string[]
  specimensIds?: number[]
  providerIds?: number[]
  pastAppointmentsIds?: number[]
  foundMedicationIds?: number[]
  patientPlansIds?: number[]
  activePlansIds?: number[]
  planMedicationsIds?: number[]
  foundMedicationsIdsToDiscontinue?: number[]
  inputMedicationIds?: number[]
  patientPlanId?: number
  upcomingAppointmentsIds?: number[]
  serviceTypesIds?: number[]
  limitationId?: number
  testResultId?: number
  patientPrescriptionId?: number
  age?: number
  patientPlanStatus?: PlanStatusEnum
  partnerUUID?: string
  sheetId?: number
  ovaryLocation?: OvaryLocation
  component?: string
  activateWithoutMobile?: boolean
  currentDates?: string[]
  totalAmount?: string

  paymentStatus?: string
  paymentOrderUUID?: string
  paymentOrderItemsWithMultiplePatientPlans?: {
    paymentOrderItemId: number
    patientPlanIds: number[]
  }

  testResultReleasedOn?: Date
  testResultCompletedOn?: Date
  ovaryMeasurementId?: string
  ovaryMeasurementCystsIds?: number[]
  code?: string
  missingFields?: string[]

  cystCount?: number
  cystSizesLength?: number
  ovaryFolliclesCount?: number
  ovaryFolliclesSizesLength?: number

  fieldName?: string
  type?: string
  serviceProviderPosition?: string
  itemsUUIDs?: string[]

  contactFormId?: number
  icFormUUID?: string
  semenFormId?: number
  sexAtBirth?: SexAtBirth
  patientNotesIds?: number[]
  treatmentsToBeRemovedUUIDs?: string[]
  treatmentsToBeUpdatedUUIDs?: string[]
  treatmentsToBeCreatedUUIDs?: string[]
  orderUUIDs?: string[]
  orderIds?: number[]
  medicationCategoriesIds?: number[]
  attachmentRequestUUIDs?: string[]
  discontinuedMedicationsUUIDs?: string[]
  notesIdsToRemove?: number[]
  notesIdsToUpdate?: number[]
  proceduresIdsToRemove?: number[]
  procedureTestTypesToCreate?: number[]
  addonsIdsToRemove?: number[]
  addonIdsToCreate?: number[]
  spermSourcesIdsToRemove?: number[]
  spermSourcesIdsToUpdate?: number[]
  spermSourcesTypesToCreate?: string[]
  lutealSupportItemsIdsToRemove?: number[]
  lutealSupportItemsIdsToUpdate?: number[]
  lutealSupportItemsIdsToCreate?: string[]
  planMedicationsIdsToRemove?: number[]
  medicationIdsToCreate?: number[]
  labInstructionsIdsToRemove?: number[]
  labInstructionIdsToCreate?: number[]
  embryoTypeInstructionsIdsToRemove?: number[]
  embryoTypeInstructionIdsToCreate?: number[]
  notesTypesToSave?: string[]
  patientNotesTypes?: string[]
  testResultDates?: string[]
  medicationDates?: string[]
  ultrasoundResultsIds?: number[]
  rawMachinesIds?: number[]
  rawExternalLabsIds?: number[]
  groupsIds?: number[]
  labMachinesIds?: number[]
  testTypesIds?: number[]
  testPanelsIds?: number[]
  groupsUUIDs?: string[]
  processedGroupsIds?: string[]
  orderItemsIds?: number[]
  testOrderId?: number
  testOrderUUID?: string
  orderStatus?: string
  cryoTankIds?: number[]
  cryoCanIds?: number[]
  cryoStrawUUID?: string
  mediaLotIds?: number[]
  reagentIds?: number[]
  reagentUUID?: string
  reagentType?: CryoSampleType
  labInfosIds?: number[]
  location?: string
  proceduresIds?: number[]
  strawUUIDsToDelete?: string[]

  doctorsIds?: number[]
  referralsIds?: number[]
  uniquePartnerUUIDs?: string[]
  foundPartnerUUIDs?: string[]

  patientConsentPackageUUID?: string
  patientConsentPackageId?: number
  uniqueConsentModuleIds?: number[]
  signatoriesToRelations?: Map<number, string[]>
  relationTypes?: string[]

  labSyncRawDataId?: number
  labSyncObservationResultUUID?: string
  obrUniversalCode?: string
  testTypeUniversalCodes?: string[]
  testTypeConfigurationUUIDs?: string[]
  testTypeConfigurationId?: number
  measurementsTestTypeUniversalCodes?: string[]

  medications?: {
    internalDrugUUID?: string
    drugBankId?: string
  }[]
  appointments?: {
    uuid?: string
    partnersUUIDs?: string[]
  }[]
  testResults?: {
    uuid?: string
    itemsUUIDs?: string[]
    attachmentsUUIDs?: string[]
  }[]
  collections?: {
    specimenUUID?: string
    storageLocationUUID?: string
  }[]

  slots?: {
    dateOfSlot?: string
    serviceProviderId?: number
  }[]
  slotsOfDay?: string[]
  invalidPeriodsStamps?: string[]

  inputCategoryMedicationIds?: {
    internalDrugId: string
    categoryId: string
  }[]
  inputInternalMedicationIds?: {
    internalDrugId: string
    categoryId: string
  }[]
  inputDrugBankMedicationsIds?: {
    internalDrugId: string
    categoryId: string
  }[]
  infectiousDiseaseScreen?: {
    patientId: number
    resultsIds: number[]
  }[]
  latestTestResultsIds?: {id: number; hasMultiple: boolean}[]

  testResultKind?: string
  testTypeId?: number
  testPanelId?: number
  testTypeUUID?: string
  testTypeUUIDs?: string[]
  foundTestTypeUUIDs?: string[]
  testTypeToCount?: Map<number, number>
  cancelledBy?: PlanCancelledBy
  testTypeIds?: number[]
  testPanelIds?: number[]
  foundTestTypeIds?: number[]
  foundTestPanelIds?: number[]

  queueName?: string
  taskName?: string
  taskPath?: string
  topicName?: string
  pubSubAttribute?: string
  filePath?: string
  bucketName?: string

  maxScheduleLimitDays?: number
  isScheduledExecution?: boolean

  page?: number
  sortByField?: string
  sortOrder?: string

  ids?: number[]

  deviceId?: string
  requestId?: string
  userAction?: string
  tableUpdated?: string
  errMsg?: string
  groupTitle?: string
  axiosError?: string

  cryoInventoryCardUUID?: string
  cryoSampleContainerUUID?: string

  patientBillUUID?: string

  documentUUID?: string
  documentType?: PatientDocumentType
  documentCategoryType?: PatientDocumentType

  lastAppointmentCreatedDateTime?: Date
  lastPrescriptionPaidDateTime?: Date
  lastPlanStatusUpdateDateTime?: Date

  setupIntentsLength?: number
  splitPaymentMaxMethods?: number
  cartItemBookedAppointmentId?: number
  appointmentPaymentStatus?: string

  // The format of webhook data is not documented, so it is typed as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applicationErrorWebhookData?: any

  thyroidProtocolResultNoteUUID?: string

  timeOffBlockUUID?: string

  timeOffBlockPeriodUUID?: string

  patientIntakeStatus?: string

  newChatRevisionId?: string
  notificationTimestamp?: string
  currentTimestamp?: string

  offset?: number
  chunkSize?: number

  bulkDownloadRequestUUID?: string

  externalDoctorUUID?: string

  patientFertilityIqUUID?: string

  hasSameSexPartner?: boolean

  currentStaffUUID?: string
}
