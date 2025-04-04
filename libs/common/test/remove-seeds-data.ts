/* eslint-disable max-lines */
/* eslint-disable no-console */
import 'tsconfig-paths/register'
import {BookingIntentSeed} from '@seeds/firestore/booking-intent.seed'
import {OTPCodeSeed} from '@seeds/firestore/otp-code.seed'
import {QuestionnaireIntentSeed} from '@seeds/firestore/questionnaire-intent.seed'
import {
  SqlDbConnectionForSeeds,
  PatientSeed,
  QuestionnaireSeed,
  QuestionSeed,
  ServiceCategorySeed,
  ServiceGroupSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  ApplicationCodeSeed,
  PatientQuestionnaireAnswerSeedOLD,
  SchedulingTemplateSeed,
  SchedulingTemplatePeriodSeed,
  SchedulingSlotSeed,
  AppointmentSeed,
  AnswerOptionSeed,
  QuestionnaireToQuestionSeed,
  EncounterTypeSeed,
  PatientEncounterSeed,
  PatientEncounterAddendumSeed,
  StaffNoteTypeSeed,
  PatientStaffNoteSeed,
  PatientStaffNoteAddendumSeed,
  AppliedSchedulingTemplatePeriodSeed,
  ServiceProviderToServiceTypeSeed,
  IntroductionSeed,
  PatientPrescriptionSeed,
  PharmacySeed,
  PatientDetailFemaleSeed,
  PatientFullTermDeliveryHistorySeed,
  PatientAlertSeed,
  PatientAbortionHistorySeed,
  PatientContactFormSeed,
  PatientMiscarriageHistorySeed,
  PatientDoctorSeed,
  PatientReferralSeed,
  PatientPushNotificationSeed,
  PermissionSeed,
  RoleSeed,
  DocumentCategorySeed,
  StaffFeedbackSeed,
  MilestoneServiceTypeLimitationSeed,
  PatientToServiceProviderSeed,
  PatientEncounterAttachmentSeed,
  PatientStaffNoteAttachmentSeed,
  TestResultUltrasoundFinalReportSeed,
  OhipClaimToCodeSeed,
  SignatureSeed,
  AddonSeed,
  AppointmentAddonSeed,
  TestResultStatusHistorySeed,
  TestResultCommentSeed,
  PatientAdhocPaymentSeed,
  PaymentOrderItemSeed,
  PaymentOrderSeed,
  PlanTypeSeed,
  PatientPlanDetailSeed,
  StaffDefaultSeed,
  PlanAddonSeed,
  IvfTaskToDaySeed,
  IvfDayTaskToPlanTypeSeed,
  IvfTaskSummarySeed,
  PatientPlanCohortSeed,
  PatientPlanCohortIvfTaskGroupSeed,
  CryoTankV2Seed,
  CryoCanV2Seed,
  CryoCaneV2Seed,
  IvfEmbryoGradeSeed,
  CryoSampleContainerSeed,
  CryoSampleDonorSeed,
  CryoInventoryCardSeed,
  IvfTaskExpendedEmbryoSeed,
  PlanChecklistItemSeed,
  PlanChecklistSeed,
  SuperTypeSeed,
  EmbryoTypeSeed,
  IVFCancellationReasonSeed,
  TestResultOHSSFluidMeasurementSeed,
  TestResultOHSSOvaryMeasurementSeed,
  ThyroidProtocolResultSeed,
  SchedulingTimeOffBlockSeed,
  CryoDiscardReasonSeed,
  AppointmentMetadataSeed,
  ProfileAlertSeed,
  PatientProfileAlertSeed,
  PatientPlanCohortCryoSampleContainersSeed,
  PatientFertilityIQSeed,
  PatientFertilityIQTestResultSeed,
  PatientFertilityIQFemaleSeed,
  PatientEggFreezingReportSeed,
  PriorityStatusSeed,
  BulkDownloadRequestSeed,
  PatientFeedbackFormSeed,
  TestResultObservationSeed,
  TestObservationTypeSeed,
  PlanSheetActionSeed,
  PlanSheetActionListSeed,
  PatientPlanSheetActionSeed,
  ServiceTypeToServiceCodeSeed,
  DefaultFilterForAppointmentToPatientStatusSeed,
  DefaultFilterForAppointmentToServiceProviderSeed,
  BulkDownloadRequestItemSeed,
  IvfDishBarcodeSeed,
  IvfDishToIvfTaskGroupSeed,
  PatientPlanCohortIvfDishSeed,
  IvfDishSeed,
  ExternalDoctorSeed,
  IvfDishToPlanTypeSeed,
  IvfDishToPlanAddonSeed,
  SchedulingTimeOffBlockPeriodSeed,
  ConsentModuleSeed,
  PredefinedConsentPackageSeed,
  PredefinedConsentPackageToModuleSeed,
  TestResultSonoDetailSeed,
  EmailTemplateSeed,
  PatientQuestionnaireSeed,
  PatientQuestionnaireToQuestionSeed,
  ConsentModuleToQuestionSeed,
  CryoInventoryCardExternalSampleSeed,
  PatientPaymentEstimateSeed,
  PatientPaymentEstimateEmailAttemptSeed,
  PatientPaymentEstimateItemSeed,
} from '@seeds/typeorm'
import {CartSeed} from '@seeds/firestore/cart-seed'
import {PatientDetailSeed} from '@seeds/typeorm/patient-detail.seed'
import {PatientMedicationSeed} from '@seeds/typeorm/patient-medication.seed'
import {PatientPartnerSeed} from '@seeds/typeorm/patient-partner.seed'
import {MedicationSeed} from '@seeds/typeorm/medication.seed'
import {TestResultSeed} from '@seeds/typeorm/test-result.seed'
import {LabInfoSeed} from '@seeds/typeorm/lab-info.seed'
import {TestTypeSeed} from '@seeds/typeorm/test-type.seed'
import {ProfileTestResultSeed} from '@seeds/typeorm/profile-test-result.seed'
import {TestPanelSeed} from '@seeds/typeorm/test-panel.seed'
import {TestResultMeasurementSeed} from '@seeds/typeorm/test-result-measurement.seed'
import {TestResultAttachmentSeed} from '@seeds/typeorm/test-result-attachment.seed'
import {MedicationInstructionSeed} from '@seeds/typeorm/medication-instruction.seed'
import {MedicationInstructionStepSeed} from '@seeds/typeorm/medication-instruction-step.seed'
import {LabMachineSeed} from '@seeds/typeorm/lab-machine.seed'
import {SpecimenGroupSeed} from '@seeds/typeorm/specimen-group.seed'
import {SpecimenSeed} from '@seeds/typeorm/specimen.seed'
import {CareTeamSeed} from '@seeds/typeorm/care-team.seed'
import {ServiceProviderGroupSeed} from '@seeds/typeorm/service-provider-group.seed'
import {SpecimenStorageLocationSeed} from '@seeds/typeorm/specimen-storage-location.seed'
import {SpecimenTestSeed} from '@seeds/typeorm/specimen-test.seed'
import {TransportFolderSeed} from '@seeds/typeorm/transport-folder.seed'
import {AfterVisitSummarySeed} from '@seeds/typeorm/after-visit-summary.seed'
import {TestGroupItemSeed} from '@seeds/typeorm/test-group-item.seed'
import {TestGroupSeed} from '@seeds/typeorm/test-group.seed'
import {TestOrderCancellationReasonSeed} from '@seeds/typeorm/test-order-cancellation-reason.seed'
import {TestOrderItemSeed} from '@seeds/typeorm/test-order-item.seed'
import {TestOrderTypeSeed} from '@seeds/typeorm/test-order-type.seed'
import {TestOrderSeed} from '@seeds/typeorm/test-order.seed'
import {ServiceTypeConstraintSeed} from '@seeds/typeorm/service-type-constraint.seed'
import {PatientMilestoneSeed} from '@seeds/typeorm/patient-milestone.seed'
import {TestTypeResultOptionSeed} from '@seeds/typeorm/test-type-result-option.seed'
import {ServiceGroupToServiceTypeSeed} from '@seeds/typeorm/service-group-to-service-type.seed'
import {PatientDefaultMilestoneSeed} from '@seeds/typeorm/default-milestone.seed'
import {TestPanelToTestTypeSeed} from '@seeds/typeorm/test-panel-to-test-type.seed'
import {PatientAddressSeed} from '@seeds/typeorm/patient-address.seed'
import {PatientMilestoneToAppointmentSeed} from '@seeds/typeorm/patient-milestone-to-appointment.seed'
import {SpecimenIncompletionReasonSeed} from '@seeds/typeorm/specimen-incompletion-reason.seed'
import {TaskSeed} from '@seeds/typeorm/task.seed'
import {StaffSeed} from '@seeds/typeorm/staff.seed'
import {TaskReassignmentSeed} from '@seeds/typeorm/task-reassignment.seed'
import {PatientPreTermDeliveryHistorySeed} from '@seeds/typeorm/patient-pre-term-delivery-history.seed'
import {ServiceGroupAvailabilitySeed} from '@seeds/typeorm/service-group-availability.seed'
import {PatientDetailMaleSeed} from '@seeds/typeorm/patient-detail-male.seed'
import {PatientNoteSeed} from '@seeds/typeorm/patient-note.seed'
import {PatientPastSurgerySeed} from '@seeds/typeorm/patient-past-surgery.seed'
import {PatientPreviousFertilityTreatmentSeed} from '@seeds/typeorm/patient-previous-fertility-treatment.seed'
import {PatientVitaminSupplementSeed} from '@seeds/typeorm/patient-vitamin-supplement.seed'
import {PatientFamilyHealthProblemSeed} from '@seeds/typeorm/patient-family-health-problem.seed'
import {PatientCustomAlertSeed} from '@seeds/typeorm/patient-custom-alert.seed'
import {PatientProfileSeed} from '@seeds/firestore/patient-profile.seed'
import {CloudTaskSeed} from '@seeds/firestore/cloud-task.seed'
import {PlanCategorySeed} from '@seeds/typeorm/plan-category.seed'
import {PatientPlanSeed} from '@seeds/typeorm/patient-plan.seed'
import {PlanMedicationSeed} from '@seeds/typeorm/plan-medication.seed'
import {MedicationCategorySeed} from '@seeds/typeorm/medication-category.seed'
import {MedicationToMedicationCategorySeed} from '@seeds/typeorm/medication-to-medication-category.seed'
import {PatientMedicationHistorySeed} from '@seeds/firestore/patient-medication-history.seed'
import {PlanInitialResultSeed} from '@seeds/typeorm/plan-initial-result.seed'
import {MilestoneToTestTypeOrPanelSeed} from '@seeds/typeorm/milestone-to-test-type-or-panel.seed'
import {SemenVerificationFormSeed} from '@seeds/typeorm/semen-verification-form.seed'
import {CatheterTypeSeed} from '@seeds/typeorm/catheter-type.seed'
import {PatientPlanStatusSeed} from '@seeds/typeorm/patient-plan-status.seed'
import {TestResultUterusMeasurementSeed} from '@seeds/typeorm/test-result-uterus-measurement.seed'
import {TestResultOvaryMeasurementSeed} from '@seeds/typeorm/test-result-ovary-measurement.seed'
import {TestResultOvaryCystMeasurementSeed} from '@seeds/typeorm/test-result-ovary-cyst-measurement.seed'
import {PatientDocumentSeed} from '@seeds/typeorm/patient-document.seed'
import {AppointmentPartnerSeed} from '@seeds/typeorm/appointment-partner.seed'
import {CryoCanSeed} from '@seeds/typeorm/cryo-can.seed'
import {CryoCaneSeed} from '@seeds/typeorm/cryo-cane.seed'
import {CryoTankSeed} from '@seeds/typeorm/cryo-tank.seed'
import {CryoVialSeed} from '@seeds/typeorm/cryo-vial.seed'
import {MediaLotSeed} from '@seeds/typeorm/media-lot.seed'
import {ReagentSeed} from '@seeds/typeorm/reagent.seed'
import {PatientScheduledMilestoneSeed} from '@seeds/typeorm/patient-scheduled-milestone.seed'
import {PatientEncounterAddendumAttachmentSeed} from '@seeds/typeorm/patient-encounter-addendum-attachment.seed'
import {PatientStaffNoteAddendumAttachmentSeed} from '@seeds/typeorm/patient-staff-note-addendum-attachment.seed'
import {TestResultObUltrasoundSeed} from '@seeds/typeorm'
import {OhipClaimSeed} from '@seeds/typeorm/ohip-claim.seed'
import {MdBillingDiagnosticCodeSeed} from '@seeds/typeorm/mdbilling-diagnostic-code.seed'
import {MdBillingServiceCodeSeed} from '@seeds/typeorm/mdbilling-service-code.seed'
import {PatientPlanSheetSeed} from '@seeds/typeorm/patient-plan-sheet.seed'
import {PatientPlanSpermSourceSeed} from '@seeds/typeorm/patient-plan-sperm-source.seed'
import {LibraryContentSeed} from '@seeds/typeorm/library-content.seed'
import {PatientIntakeSnapshotSeed} from '@seeds/firestore/patient-intake-snapshot.seed'
import {LabSyncObservationRequestSeed} from '@seeds/typeorm/lab-sync-observation-request.seed'
import {LabSyncObservationResultSeed} from '@seeds/typeorm/lab-sync-observation-result.seed'
import {LabSyncRawDataSeed} from '@seeds/typeorm/lab-sync-raw-data.seed'
import {LabSyncTestResultFieldMatchSeed} from '@seeds/typeorm/lab-sync-test-result-field-match.seed'
import {IvfTaskDetailsSeed} from '@seeds/typeorm/ivf-task-details.seed'
import {AppointmentLinkedServiceProviderSeed} from '@seeds/typeorm/appointment-linked-service-provider.seed'
import {LabSyncObservationRequestStatusHistorySeed} from '@seeds/typeorm/lab-sync-observation-request-status-history.seed'
import {PlanLabInstructionSeed} from '@seeds/typeorm/plan-lab-instruction.seed'
import {TestOrderStaffActionHistorySeed} from '@seeds/typeorm/test-order-staff-action-history.seed'
import {TestOrderActionSeed} from '@seeds/typeorm/test-order-action.seed'
import {PatientPlanChangeNotificationSeed} from '@seeds/typeorm/patient-plan-change-notification.seed'
import {PaymentMethodSeed} from '@seeds/typeorm/payment-method.seed'
import {TestTypeGroupForAnyResultSeed} from '@seeds/typeorm/test-type-group-for-any-result.seed'
import {IvfTaskHistorySeed} from '@seeds/firestore/ivf-task-history.seed'
import {PatientPlanSheetHistorySeed} from '@seeds/firestore/patient-plan-sheet-history.seed'
import {PlanLutealSupportItemSeed} from '@seeds/typeorm/plan-luteal-support-item.seed'
import {PatientPlanHistorySeed} from '@seeds/firestore/patient-plan-history.seed'
import {IVFUnitOptionSeed} from '@seeds/typeorm/ivf-unit-option.seed'
import {AppointmentHistorySeed} from '@seeds/firestore/appointment-history.seed'
import {PatientReportSeed} from '@seeds/typeorm/patient-report.seed'
import {ReportTypeSeed} from '@seeds/typeorm/report-type.seed'
import {IvfTaskSelectedEmbryoSeed} from '@seeds/typeorm/ivf-task-selected-embryo.seed'
import {DefaultFilterForAppointmentSeed} from '@seeds/typeorm/default-filter-for-appointment.seed'
import {DefaultFilterForAppointmentToColumnSeed} from '@seeds/typeorm/default-filter-for-appointment-to-column.seed'
import {DefaultFilterForAppointmentToServiceTypeSeed} from '@seeds/typeorm/default-filter-for-appointment-to-service-type.seed'
import {PatientPlanAlertSeed} from '@seeds/typeorm/patient-plan-alert.seed'
import {TestOrderHistorySeed} from '@seeds/firestore/test-order-history.seed'
import {IvfDishLogSeed} from '@seeds/firestore/ivf-dish-log.seed'
import {MedicationConsentModuleSeed} from '@seeds/typeorm/medication-consent-module.seed'
import {PlanAddonConsentModuleSeed} from '@seeds/typeorm/plan-addon-consent-module.seed'
import {PlanTypeConsentModuleSeed} from '@seeds/typeorm/plan-type-consent-module.seed'
import {PatientConsentPackageSeed} from '@seeds/typeorm/patient-consent-package.seed'
import {PatientConsentModuleSeed} from '@seeds/typeorm/patient-consent-module.seed'
import {PatientConsentPackageSignatorySeed} from '@seeds/typeorm/patient-consent-package-signatory.seed'
import {IVFDispositionReasonSeed} from '@seeds/typeorm/ivf-disposition-reason.seed'
import {PatientPlanCohortEggToThawSeed} from '@seeds/typeorm/patient-plan-cohort-egg-to-thaw.seed'
import {PatientConsentPackageHistorySeed} from '@seeds/firestore/patient-consent-package-history.seed'
import {PatientQuestionnaireAnswerSeed} from '@seeds/typeorm/patient-questionnaire-answer.seed'
import {BillableItemSeed} from '@seeds/typeorm/billable-item.seed'
import {PlanTypeSheetTestTypeSeed} from '@seeds/typeorm/plan-type-sheet-test-type.seed'
import {PushNotificationTemplateSeed} from '@seeds/typeorm/push-notification-template.seed'

// eslint-disable-next-line max-lines-per-function
const removeSeedData = async (): Promise<void> => {
  console.log('\n**** JEST remove seeds data ****')
  const connection = await SqlDbConnectionForSeeds.instance()

  // Firestore seeds
  const otpSeed = new OTPCodeSeed()
  const bookingIntentSeed = new BookingIntentSeed()
  const questionnaireIntentSeed = new QuestionnaireIntentSeed()
  const patientIntakeSnapshotSeed = new PatientIntakeSnapshotSeed()

  const cartSeed = new CartSeed()
  const patientProfileSeed = new PatientProfileSeed()
  const cloudTaskSeed = new CloudTaskSeed()
  const patientMedicationHistorySeed = new PatientMedicationHistorySeed()
  const ivfTaskHistorySeed = new IvfTaskHistorySeed()
  const ivfDishLogSeed = new IvfDishLogSeed()
  const patientPlanSheetHistorySeed = new PatientPlanSheetHistorySeed()
  const patientPlanHistorySeed = new PatientPlanHistorySeed()
  const appointmentHistorySeed = new AppointmentHistorySeed()
  const testOrderHistorySeed = new TestOrderHistorySeed()
  const patientConsentPackageHistorySeed = new PatientConsentPackageHistorySeed()

  // SQL seeds
  const testOrderTypeSeed = new TestOrderTypeSeed(connection)
  const testOrderSeed = new TestOrderSeed(connection)
  const testOrderItemSeed = new TestOrderItemSeed(connection)
  const testOrderStaffActionHistorySeed = new TestOrderStaffActionHistorySeed(connection)
  const patientAdhocPaymentSeed = new PatientAdhocPaymentSeed(connection)
  const testGroupItemSeed = new TestGroupItemSeed(connection)
  const testGroupSeed = new TestGroupSeed(connection)
  const testOrderCancellationReasonSeed = new TestOrderCancellationReasonSeed(connection)
  const testOrderActionSeed = new TestOrderActionSeed(connection)
  const transportFolderSeed = new TransportFolderSeed(connection)
  const specimenTestSeed = new SpecimenTestSeed(connection)
  const specimenStorageLocationSeed = new SpecimenStorageLocationSeed(connection)
  const specimenIncompletionReasonSeed = new SpecimenIncompletionReasonSeed(connection)
  const specimenSeed = new SpecimenSeed(connection)
  const specimenGroupSeed = new SpecimenGroupSeed(connection)
  const labMachineSeed = new LabMachineSeed(connection)
  const labInfoSeed = new LabInfoSeed(connection)
  const testPanelToTestTypeSeed = new TestPanelToTestTypeSeed(connection)
  const testPanelSeed = new TestPanelSeed(connection)
  const testResultStatusHistorySeed = new TestResultStatusHistorySeed(connection)
  const testResultCommentSeed = new TestResultCommentSeed(connection)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(connection)
  const testResultObUltrasoundSeed = new TestResultObUltrasoundSeed(connection)
  const testResultOvaryMeasurementSeed = new TestResultOvaryMeasurementSeed(connection)
  const testResultOvaryCystMeasurementSeed = new TestResultOvaryCystMeasurementSeed(connection)
  const testResultOHSSFluidMeasurementSeed = new TestResultOHSSFluidMeasurementSeed(connection)
  const testResultOHSSOvaryMeasurementSeed = new TestResultOHSSOvaryMeasurementSeed(connection)
  const testResultUterusMeasurementSeed = new TestResultUterusMeasurementSeed(connection)
  const profileTestResultSeed = new ProfileTestResultSeed(connection)
  const testResultSeed = new TestResultSeed(connection)
  const testResultAttachmentSeed = new TestResultAttachmentSeed(connection)
  const testTypeSeed = new TestTypeSeed(connection)
  const testTypeResultOptionSeed = new TestTypeResultOptionSeed(connection)
  const answerOptionSeed = new AnswerOptionSeed(connection)
  const patientSeed = new PatientSeed(connection)
  const mdBillingDiagnosticCodeSeed = new MdBillingDiagnosticCodeSeed(connection)
  const mdBillingServiceCodeSeed = new MdBillingServiceCodeSeed(connection)
  const ohipClaimSeed = new OhipClaimSeed(connection)
  const ohipClaimToCodeSeed = new OhipClaimToCodeSeed(connection)
  const patientCustomAlertSeed = new PatientCustomAlertSeed(connection)
  const patientAlertSeed = new PatientAlertSeed(connection)
  const patientDetailSeed = new PatientDetailSeed(connection)
  const patientPartnerSeed = new PatientPartnerSeed(connection)
  const patientMedicationSeed = new PatientMedicationSeed(connection)
  const afterVisitSummarySeed = new AfterVisitSummarySeed(connection)
  const questionnaireSeed = new QuestionnaireSeed(connection)
  const serviceCategorySeed = new ServiceCategorySeed(connection)
  const serviceGroupSeed = new ServiceGroupSeed(connection)
  const serviceGroupAvailabilitySeed = new ServiceGroupAvailabilitySeed(connection)
  const serviceProviderSeed = new ServiceProviderSeed(connection)
  const serviceTypeSeed = new ServiceTypeSeed(connection)
  const serviceTypeConstraintSeed = new ServiceTypeConstraintSeed(connection)
  const applicationCodeSeed = new ApplicationCodeSeed(connection)
  const questionSeed = new QuestionSeed(connection)
  const answerSeedOld = new PatientQuestionnaireAnswerSeedOLD(connection)
  const answerSeed = new PatientQuestionnaireAnswerSeed(connection)
  const schedulingTemplateSeed = new SchedulingTemplateSeed(connection)
  const schedulingTemplatePeriodSeed = new SchedulingTemplatePeriodSeed(connection)
  const schedulingTimeOffBlockSeed = new SchedulingTimeOffBlockSeed(connection)
  const schedulingTimeOffBlockPeriodSeed = new SchedulingTimeOffBlockPeriodSeed(connection)
  const schedulingSlotSeed = new SchedulingSlotSeed(connection)
  const appointmentSeed = new AppointmentSeed(connection)
  const questionnaireToQuestion = new QuestionnaireToQuestionSeed(connection)
  const encounterTypeSeed = new EncounterTypeSeed(connection)
  const encounterSeed = new PatientEncounterSeed(connection)
  const addendumSeed = new PatientEncounterAddendumSeed(connection)
  const patientEncounterAttachmentSeed = new PatientEncounterAttachmentSeed(connection)
  const patientEncounterAddendumAttachmentSeed = new PatientEncounterAddendumAttachmentSeed(
    connection,
  )

  const staffNoteTypeSeed = new StaffNoteTypeSeed(connection)
  const staffNoteSeed = new PatientStaffNoteSeed(connection)
  const staffNoteAddendumSeed = new PatientStaffNoteAddendumSeed(connection)
  const patientStaffNoteAttachmentSeed = new PatientStaffNoteAttachmentSeed(connection)
  const patientStaffNoteAddendumAttachmentSeed = new PatientStaffNoteAddendumAttachmentSeed(
    connection,
  )

  const appliedSchedulingTemplatePeriodSeed = new AppliedSchedulingTemplatePeriodSeed(connection)
  const serviceProviderToServiceTypeSeed = new ServiceProviderToServiceTypeSeed(connection)
  const introductionSeed = new IntroductionSeed(connection)
  const medicationSeed = new MedicationSeed(connection)
  const patientPrescriptionSeed = new PatientPrescriptionSeed(connection)
  const pharmacySeed = new PharmacySeed(connection)
  const patientScheduledMilestoneSeed = new PatientScheduledMilestoneSeed(connection)
  const medicationInstructionSeed = new MedicationInstructionSeed(connection)
  const medicationInstructionStepSeed = new MedicationInstructionStepSeed(connection)
  const patientDetailMaleSeed = new PatientDetailMaleSeed(connection)
  const patientNoteSeed = new PatientNoteSeed(connection)
  const patientPastSurgerySeed = new PatientPastSurgerySeed(connection)
  const patientPlanChangeNotificationSeed = new PatientPlanChangeNotificationSeed(connection)
  const patientPreviousFertilityTreatmentSeed = new PatientPreviousFertilityTreatmentSeed(
    connection,
  )
  const patientVitaminSupplementSeed = new PatientVitaminSupplementSeed(connection)
  const patientDetailFemaleSeed = new PatientDetailFemaleSeed(connection)
  const patientFullTermDeliveryHistorySeed = new PatientFullTermDeliveryHistorySeed(connection)
  const patientPreTermDeliveryHistorySeed = new PatientPreTermDeliveryHistorySeed(connection)
  const careTeamSeed = new CareTeamSeed(connection)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(connection)
  const patientMilestoneSeed = new PatientMilestoneSeed(connection)
  const serviceGroupToServiceTypeSeed = new ServiceGroupToServiceTypeSeed(connection)
  const patientDefaultMilestoneSeed = new PatientDefaultMilestoneSeed(connection)
  const consentModuleSeed = new ConsentModuleSeed(connection)
  const predefinedConsentPackageSeed = new PredefinedConsentPackageSeed(connection)
  const predefinedConsentPackageToModuleSeed = new PredefinedConsentPackageToModuleSeed(connection)

  const patientQuestionnaireSeed = new PatientQuestionnaireSeed(connection)
  const patientQuestionnaireToQuestionSeed = new PatientQuestionnaireToQuestionSeed(connection)
  const consentModuleToQuestionSeed = new ConsentModuleToQuestionSeed(connection)

  const libraryContentSeed = new LibraryContentSeed(connection)
  const patientAddressSeed = new PatientAddressSeed(connection)
  const patientMilestoneToAppointmentSeed = new PatientMilestoneToAppointmentSeed(connection)
  const milestoneToTestTypeOrPanelSeed = new MilestoneToTestTypeOrPanelSeed(connection)
  const taskSeed = new TaskSeed(connection)
  const staffSeed = new StaffSeed(connection)
  const permissionSeed = new PermissionSeed(connection)
  const roleSeed = new RoleSeed(connection)
  const taskReassignmentSeed = new TaskReassignmentSeed(connection)
  const patientFamilyHealthProblemSeed = new PatientFamilyHealthProblemSeed(connection)
  const patientAbortionHistorySeed = new PatientAbortionHistorySeed(connection)
  const patientContactFormSeed = new PatientContactFormSeed(connection)
  const patientMiscarriageHistorySeed = new PatientMiscarriageHistorySeed(connection)
  const planCategorySeed = new PlanCategorySeed(connection)
  const planTypeSeed = new PlanTypeSeed(connection)
  const patientPlanSeed = new PatientPlanSeed(connection)
  const patientPlanDetailSeed = new PatientPlanDetailSeed(connection)
  const patientPlanSpermSourceSeed = new PatientPlanSpermSourceSeed(connection)
  const patientPlanSheetSeed = new PatientPlanSheetSeed(connection)
  const planMedicationSeed = new PlanMedicationSeed(connection)
  const medicationCategorySeed = new MedicationCategorySeed(connection)
  const medicationToMedicationCategorySeed = new MedicationToMedicationCategorySeed(connection)
  const planInitialResultSeed = new PlanInitialResultSeed(connection)
  const semenVerificationFormSeed = new SemenVerificationFormSeed(connection)
  const patientDoctorSeed = new PatientDoctorSeed(connection)
  const patientReferralSeed = new PatientReferralSeed(connection)
  const patientPushNotificationSeed = new PatientPushNotificationSeed(connection)
  const catheterTypeSeed = new CatheterTypeSeed(connection)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(connection)
  const signatureSeed = new SignatureSeed(connection)
  const documentCategorySeed = new DocumentCategorySeed(connection)
  const staffFeedbackSeed = new StaffFeedbackSeed(connection)
  const patientDocumentSeed = new PatientDocumentSeed(connection)
  const appointmentPartnerSeed = new AppointmentPartnerSeed(connection)
  const cryoTankSeed = new CryoTankSeed(connection)
  const cryoCanSeed = new CryoCanSeed(connection)
  const cryoCaneSeed = new CryoCaneSeed(connection)
  const cryoTankV2Seed = new CryoTankV2Seed(connection)
  const cryoCanV2Seed = new CryoCanV2Seed(connection)
  const cryoCaneV2Seed = new CryoCaneV2Seed(connection)
  const cryoSampleDonorSeed = new CryoSampleDonorSeed(connection)
  const cryoInventoryCardSeed = new CryoInventoryCardSeed(connection)
  const cryoInventoryCardExternalSampleSeed = new CryoInventoryCardExternalSampleSeed(connection)
  const cryoSampleContainerSeed = new CryoSampleContainerSeed(connection)
  const mediaLotSeed = new MediaLotSeed(connection)
  const reagentSeed = new ReagentSeed(connection)
  const cryoVialSeed = new CryoVialSeed(connection)
  const cryoDiscardReasonSeed = new CryoDiscardReasonSeed(connection)
  const milestoneServiceTypeLimitationSeed = new MilestoneServiceTypeLimitationSeed(connection)
  const patientToServiceProviderSeed = new PatientToServiceProviderSeed(connection)
  const testResultUltrasoundFinalReportSeed = new TestResultUltrasoundFinalReportSeed(connection)
  const addonSeed = new AddonSeed(connection)
  const appointmentAddonSeed = new AppointmentAddonSeed(connection)
  const appointmentMetadataSeed = new AppointmentMetadataSeed(connection)
  const defaultFilterForAppointmentSeed = new DefaultFilterForAppointmentSeed(connection)
  const defaultFilterForAppointmentToColumnSeed = new DefaultFilterForAppointmentToColumnSeed(
    connection,
  )
  const defaultFilterForAppointmentToPatientStatusSeed =
    new DefaultFilterForAppointmentToPatientStatusSeed(connection)
  const defaultFilterForAppointmentToServiceProviderSeed =
    new DefaultFilterForAppointmentToServiceProviderSeed(connection)
  const defaultFilterForAppointmentToServiceTypeSeed =
    new DefaultFilterForAppointmentToServiceTypeSeed(connection)
  const paymentOrderItemSeed = new PaymentOrderItemSeed(connection)
  const paymentOrderSeed = new PaymentOrderSeed(connection)
  const staffDefaultSeed = new StaffDefaultSeed(connection)
  const planAddonSeed = new PlanAddonSeed(connection)
  const ivfTaskToDaySeed = new IvfTaskToDaySeed(connection)
  const ivfDayTaskToPlanTypeSeed = new IvfDayTaskToPlanTypeSeed(connection)
  const ivfTaskSummarySeed = new IvfTaskSummarySeed(connection)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(connection)
  const patientPlanCohortIvfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(connection)
  const patientPlanCohortCryoSampleContainersSeed = new PatientPlanCohortCryoSampleContainersSeed(
    connection,
  )
  const ivfTaskDetailsSeed = new IvfTaskDetailsSeed(connection)
  const ivfDishBarcodesSeed = new IvfDishBarcodeSeed(connection)
  const ivfDishSeed = new IvfDishSeed(connection)
  const ivfDishToIvfTaskGroupSeed = new IvfDishToIvfTaskGroupSeed(connection)
  const patientPlanCohortIvfDishSeed = new PatientPlanCohortIvfDishSeed(connection)
  const ivfDishToPlanTypeSeed = new IvfDishToPlanTypeSeed(connection)
  const ivfDishToPlanAddonSeed = new IvfDishToPlanAddonSeed(connection)
  const labSyncObservationRequestSeed = new LabSyncObservationRequestSeed(connection)
  const labSyncObservationRequestStatusHistorySeed = new LabSyncObservationRequestStatusHistorySeed(
    connection,
  )
  const labSyncRawDataSeed = new LabSyncRawDataSeed(connection)
  const labSyncObservationResultSeed = new LabSyncObservationResultSeed(connection)
  const labSyncTestResultFieldMatchSeed = new LabSyncTestResultFieldMatchSeed(connection)
  const appointmentLinkedServiceProviderSeed = new AppointmentLinkedServiceProviderSeed(connection)
  const ivfEmbryoGradeSeed = new IvfEmbryoGradeSeed(connection)
  const ivfTaskExpendedEmbryoSeed = new IvfTaskExpendedEmbryoSeed(connection)
  const planLabInstructionSeed = new PlanLabInstructionSeed(connection)
  const planChecklistItemSeed = new PlanChecklistItemSeed(connection)
  const planChecklistSeed = new PlanChecklistSeed(connection)
  const superTypeSeed = new SuperTypeSeed(connection)
  const embryoTypeSeed = new EmbryoTypeSeed(connection)
  const paymentMethodSeed = new PaymentMethodSeed(connection)
  const testTypeGroupForAnyResultSeed = new TestTypeGroupForAnyResultSeed(connection)
  const iVFCancellationReasonSeed = new IVFCancellationReasonSeed(connection)
  const thyroidProtocolResultSeed = new ThyroidProtocolResultSeed(connection)
  const planLutealSupportItemSeed = new PlanLutealSupportItemSeed(connection)
  const ivfDispositionReasonSeed = new IVFDispositionReasonSeed(connection)
  const patientPlanCohortEggToThawSeed = new PatientPlanCohortEggToThawSeed(connection)

  const ivfTaskSelectedEmbryoSeed = new IvfTaskSelectedEmbryoSeed(connection)
  const priorityStatusSeed = new PriorityStatusSeed(connection)
  const ivfUnitOptionSeed = new IVFUnitOptionSeed(connection)
  const profileAlertSeed = new ProfileAlertSeed(connection)
  const patientProfileAlertSeed = new PatientProfileAlertSeed(connection)
  const reportTypeSeed = new ReportTypeSeed(connection)
  const patientReportSeed = new PatientReportSeed(connection)
  const patientFertilityIQSeed = new PatientFertilityIQSeed(connection)
  const patientFertilityIQFemaleSeed = new PatientFertilityIQFemaleSeed(connection)
  const testResultSonoDetailSeed = new TestResultSonoDetailSeed(connection)
  const patientFertilityIQTestResultSeed = new PatientFertilityIQTestResultSeed(connection)
  const patientEggFreezingReportSeed = new PatientEggFreezingReportSeed(connection)
  const bulkDownloadRequestSeed = new BulkDownloadRequestSeed(connection)
  const bulkDownloadRequestItemSeed = new BulkDownloadRequestItemSeed(connection)
  const patientFeedbackFormSeed = new PatientFeedbackFormSeed(connection)
  const testObservationTypeSeed = new TestObservationTypeSeed(connection)
  const testResultObservationSeed = new TestResultObservationSeed(connection)
  const patientPlanAlertSeed = new PatientPlanAlertSeed(connection)
  const planSheetActionSeed = new PlanSheetActionSeed(connection)
  const planSheetActionListSeed = new PlanSheetActionListSeed(connection)
  const patientPlanSheetActionSeed = new PatientPlanSheetActionSeed(connection)
  const serviceTypeToServiceCodeSeed = new ServiceTypeToServiceCodeSeed(connection)
  const externalDoctorSeed = new ExternalDoctorSeed(connection)

  const medicationConsentModuleSeed = new MedicationConsentModuleSeed(connection)
  const planAddonConsentModuleSeed = new PlanAddonConsentModuleSeed(connection)
  const planTypeConsentModuleSeed = new PlanTypeConsentModuleSeed(connection)
  const patientConsentPackageSeed = new PatientConsentPackageSeed(connection)
  const patientConsentModuleSeed = new PatientConsentModuleSeed(connection)
  const patientConsentPackageSignatorySeed = new PatientConsentPackageSignatorySeed(connection)
  const emailTemplateSeed = new EmailTemplateSeed(connection)
  const pushNotificationTemplateSeed = new PushNotificationTemplateSeed(connection)
  const billableItemSeed = new BillableItemSeed(connection)
  const planTypeSheetTestTypeSeed = new PlanTypeSheetTestTypeSeed(connection)
  const patientPaymentEstimateEmailAttemptSeed = new PatientPaymentEstimateEmailAttemptSeed(
    connection,
  )
  const patientPaymentEstimateItemSeed = new PatientPaymentEstimateItemSeed(connection)
  const patientPaymentEstimateSeed = new PatientPaymentEstimateSeed(connection)

  await patientPaymentEstimateEmailAttemptSeed.destroyFixtures()
  await patientPaymentEstimateItemSeed.destroyFixtures()
  await patientPaymentEstimateSeed.destroyFixtures()

  await planTypeSheetTestTypeSeed.destroyFixtures()
  await emailTemplateSeed.destroyFixtures()
  await pushNotificationTemplateSeed.destroyFixtures()
  await defaultFilterForAppointmentToPatientStatusSeed.destroyFixtures()

  await staffDefaultSeed.destroyFixtures()
  await bulkDownloadRequestItemSeed.destroyFixtures()
  await bulkDownloadRequestSeed.destroyFixtures()
  await patientProfileAlertSeed.destroyFixtures()
  await serviceTypeToServiceCodeSeed.destroyFixtures()

  await Promise.all([
    billableItemSeed.destroyFixtures(),
    profileAlertSeed.destroyFixtures(),
    testOrderActionSeed.destroyFixtures(),
    schedulingTimeOffBlockSeed.destroyFixtures(),
    testResultObservationSeed.destroyFixtures(),
  ])

  await schedulingTimeOffBlockPeriodSeed.destroyFixtures()
  await patientFertilityIQFemaleSeed.destroyFixtures()

  await patientDocumentSeed.destroyFixtures()
  await appointmentLinkedServiceProviderSeed.destroyFixtures()
  await patientToServiceProviderSeed.destroyFixtures()
  await milestoneServiceTypeLimitationSeed.destroyFixtures()
  await cryoVialSeed.destroyFixtures()
  await taskSeed.destroyFixtures()
  await patientScheduledMilestoneSeed.destroyFixtures()
  await taskReassignmentSeed.destroyFixtures()
  await appointmentPartnerSeed.destroyFixtures()
  await signatureSeed.destroyFixtures()
  await patientReferralSeed.destroyFixtures()
  await patientDoctorSeed.destroyFixtures()
  await planInitialResultSeed.destroyFixtures()
  await medicationToMedicationCategorySeed.destroyFixtures()
  await planMedicationSeed.destroyFixtures()
  await thyroidProtocolResultSeed.destroyFixtures()
  await serviceGroupAvailabilitySeed.destroyFixtures()
  await careTeamSeed.destroyFixtures()
  await serviceGroupSeed.destroyFixtures()
  await schedulingSlotSeed.destroyFixture()
  await patientStaffNoteAttachmentSeed.destroyFixtures()
  await staffNoteTypeSeed.destroyFixtures()
  await staffNoteSeed.destroyFixtures()
  await labSyncObservationRequestStatusHistorySeed.destroyFixtures()

  await patientFertilityIQSeed.destroyFixtures()
  await patientFertilityIQTestResultSeed.destroyFixtures()
  await testResultSonoDetailSeed.destroyFixtures()
  await patientReportSeed.destroyFixtures()
  await reportTypeSeed.destroyFixtures()
  await testOrderItemSeed.destroyFixtures()
  await patientEggFreezingReportSeed.destroyFixtures()

  await patientEncounterAddendumAttachmentSeed.destroyFixtures()
  await addendumSeed.destroyFixtures()
  await patientEncounterAttachmentSeed.destroyFixtures()
  await encounterSeed.destroyFixtures()
  await encounterTypeSeed.destroyFixtures()

  await paymentOrderItemSeed.destroyFixtures()
  await patientAdhocPaymentSeed.destroyFixtures()
  await paymentMethodSeed.destroyFixtures()
  await paymentOrderSeed.destroyFixtures()
  await patientAlertSeed.destroyFixtures()
  await profileTestResultSeed.destroyFixtures()
  await testTypeGroupForAnyResultSeed.destroyFixtures()
  await testResultSeed.destroyFixtures()
  await testPanelToTestTypeSeed.destroyFixtures()
  await testTypeSeed.destroyFixtures()
  await testPanelSeed.destroyFixtures()
  await patientCustomAlertSeed.destroyFixtures()
  await serviceProviderToServiceTypeSeed.destroyFixtures()

  await Promise.all([
    cartSeed.destroyFixtures(),
    otpSeed.destroyFixtures(),
    questionnaireIntentSeed.destroyFixtures(),
    patientIntakeSnapshotSeed.destroyFixtures(),
    bookingIntentSeed.destroyFixtures(),
    patientProfileSeed.destroyFixtures(),
    cloudTaskSeed.destroyFixtures(),
    patientMedicationHistorySeed.destroyFixtures(),
    ivfTaskHistorySeed.destroyFixtures(),
    ivfDishLogSeed.destroyFixtures(),
    patientPlanSheetHistorySeed.destroyFixtures(),
    patientPlanHistorySeed.destroyFixtures(),
    appointmentHistorySeed.destroyFixtures(),
    testObservationTypeSeed.destroyFixtures(),
    patientConsentPackageHistorySeed.destroyFixtures(),
    patientPlanSheetActionSeed.destroyFixtures(),
    testOrderHistorySeed.destroyFixtures(),
  ])

  await documentCategorySeed.destroyFixtures()
  await milestoneToTestTypeOrPanelSeed.destroyFixtures()
  await appointmentAddonSeed.destroyFixtures()
  await appointmentMetadataSeed.destroyFixtures()
  await defaultFilterForAppointmentSeed.destroyFixtures()
  await defaultFilterForAppointmentToColumnSeed.destroyFixtures()
  await defaultFilterForAppointmentToServiceProviderSeed.destroyFixtures()
  await defaultFilterForAppointmentToServiceTypeSeed.destroyFixtures()
  await addonSeed.destroyFixtures()
  await patientMilestoneToAppointmentSeed.destroyFixtures()
  await patientMilestoneSeed.destroyFixtures()

  await planTypeConsentModuleSeed.destroyFixtures()
  await planAddonConsentModuleSeed.destroyFixtures()
  await medicationConsentModuleSeed.destroyFixtures()

  await answerSeed.destroyFixtures()

  await consentModuleToQuestionSeed.destroyFixtures()
  await patientQuestionnaireToQuestionSeed.destroyFixtures()
  await patientQuestionnaireSeed.destroyFixtures()

  await patientConsentPackageSignatorySeed.destroyFixtures()
  await patientConsentModuleSeed.destroyFixtures()
  await patientConsentPackageSeed.destroyFixtures()

  await appliedSchedulingTemplatePeriodSeed.destroyFixtures()
  await answerOptionSeed.destroyFixtures()
  await answerSeedOld.destroyFixtures()

  await patientMedicationSeed.destroyFixtures()
  await patientPartnerSeed.destroyFixtures()
  await testResultUltrasoundFinalReportSeed.destroyFixtures()
  await patientPlanSeed.destroyFixtures()
  await patientPlanSheetSeed.destroyFixtures()
  await patientPlanDetailSeed.destroyFixtures()
  await patientPlanSpermSourceSeed.destroyFixtures()
  await patientPlanAlertSeed.destroyFixtures()

  await cryoSampleContainerSeed.destroyFixtures()
  await cryoDiscardReasonSeed.destroyFixtures()
  await cryoInventoryCardSeed.destroyFixtures()
  await cryoInventoryCardExternalSampleSeed.destroyFixtures()
  await cryoSampleDonorSeed.destroyFixtures()

  await labInfoSeed.destroyFixtures()

  await serviceTypeSeed.destroyFixtures()
  await superTypeSeed.destroyFixtures()
  await semenVerificationFormSeed.destroyFixtures()

  await patientSeed.destroyFixtures()
  await patientDetailSeed.destroyFixtures()
  await patientPlanStatusSeed.destroyFixtures()

  await mdBillingServiceCodeSeed.destroyFixtures()

  await testResultMeasurementSeed.destroyFixtures()
  await testResultObUltrasoundSeed.destroyFixtures()
  await testResultOvaryMeasurementSeed.destroyFixtures()
  await testResultOHSSOvaryMeasurementSeed.destroyFixtures()
  await testResultOHSSFluidMeasurementSeed.destroyFixtures()
  await testResultOvaryCystMeasurementSeed.destroyFixtures()
  await testResultUterusMeasurementSeed.destroyFixtures()
  await testResultAttachmentSeed.destroyFixtures()
  await testTypeResultOptionSeed.destroyFixtures()
  await specimenTestSeed.destroyFixtures()
  await transportFolderSeed.destroyFixtures()
  await specimenStorageLocationSeed.destroyFixtures()
  await specimenSeed.destroyFixtures()
  await specimenGroupSeed.destroyFixtures()
  await labMachineSeed.destroyFixtures()
  await testOrderStaffActionHistorySeed.destroyFixtures()
  await testOrderCancellationReasonSeed.destroyFixtures()

  await testOrderSeed.destroyFixtures()
  await testOrderTypeSeed.destroyFixtures()
  await ivfDispositionReasonSeed.destroyFixtures()
  await patientPlanCohortEggToThawSeed.destroyFixtures()
  await testGroupItemSeed.destroyFixtures()
  await testGroupSeed.destroyFixtures()

  await questionnaireSeed.destroyFixtures()
  await afterVisitSummarySeed.destroyFixtures()
  await appointmentSeed.destroyFixtures()
  await ohipClaimToCodeSeed.destroyFixtures()
  await ohipClaimSeed.destroyFixtures()
  await mdBillingDiagnosticCodeSeed.destroyFixtures()
  await mdBillingServiceCodeSeed.destroyFixtures()

  await questionSeed.destroyFixtures()
  await applicationCodeSeed.destroyFixtures()
  await schedulingTemplatePeriodSeed.destroyFixtures()
  await serviceCategorySeed.destroyFixtures()
  await questionnaireToQuestion.destroyFixtures()
  await schedulingTemplateSeed.destroyFixtures()

  await patientStaffNoteAddendumAttachmentSeed.destroyFixtures()
  await staffNoteAddendumSeed.destroyFixtures()

  await introductionSeed.destroyFixtures()
  await medicationSeed.destroyFixtures()
  await pharmacySeed.destroyFixtures()
  await patientPrescriptionSeed.destroyFixtures()
  await medicationInstructionSeed.destroyFixtures()
  await medicationInstructionStepSeed.destroyFixtures()
  await patientDetailMaleSeed.destroyFixtures()
  await patientNoteSeed.destroyFixtures()
  await patientPastSurgerySeed.destroyFixtures()
  await patientPlanChangeNotificationSeed.destroyFixtures()
  await patientFamilyHealthProblemSeed.destroyFixtures()
  await patientAbortionHistorySeed.destroyFixtures()
  await patientPreviousFertilityTreatmentSeed.destroyFixtures()
  await patientVitaminSupplementSeed.destroyFixtures()
  await patientDetailFemaleSeed.destroyFixtures()
  await Promise.all([
    patientFullTermDeliveryHistorySeed.destroyFixtures(),
    patientPreTermDeliveryHistorySeed.destroyFixtures(),
    patientMiscarriageHistorySeed.destroyFixtures(),
    patientContactFormSeed.destroyFixtures(),
    catheterTypeSeed.destroyFixtures(),
    planSheetActionListSeed.destroyFixtures(),
  ])
  await serviceTypeConstraintSeed.destroyFixtures()

  await patientDefaultMilestoneSeed.destroyFixtures()

  await consentModuleSeed.destroyFixtures()
  await predefinedConsentPackageSeed.destroyFixtures()
  await predefinedConsentPackageToModuleSeed.destroyFixtures()

  await libraryContentSeed.destroyFixtures()
  await serviceGroupToServiceTypeSeed.destroyFixtures()
  await patientAddressSeed.destroyFixtures()
  await permissionSeed.destroyFixtures()
  await roleSeed.destroyFixtures()
  await patientFeedbackFormSeed.destroyFixtures()
  await ivfDishToPlanTypeSeed.destroyFixtures()
  await ivfDishToPlanAddonSeed.destroyFixtures()
  await planTypeSeed.destroyFixtures()
  await planCategorySeed.destroyFixtures()
  await medicationCategorySeed.destroyFixtures()
  await patientPushNotificationSeed.destroyFixtures()
  await specimenIncompletionReasonSeed.destroyFixtures()
  await staffFeedbackSeed.destroyFixtures()

  await cryoTankSeed.destroyFixtures()
  await cryoCanSeed.destroyFixtures()
  await cryoCaneSeed.destroyFixtures()

  await cryoCaneV2Seed.destroyFixtures()
  await cryoCanV2Seed.destroyFixtures()
  await cryoTankV2Seed.destroyFixtures()

  await reagentSeed.destroyFixtures()

  await mediaLotSeed.destroyFixtures()
  await planAddonSeed.destroyFixtures()

  await testResultStatusHistorySeed.destroyFixtures()
  await testResultCommentSeed.destroyFixtures()
  await ivfTaskToDaySeed.destroyFixtures()
  await ivfDayTaskToPlanTypeSeed.destroyFixtures()
  await ivfTaskSummarySeed.destroyFixtures()
  await patientPlanCohortSeed.destroyFixtures()
  await patientPlanCohortIvfTaskGroupSeed.destroyFixtures()
  await patientPlanCohortCryoSampleContainersSeed.destroyFixtures()
  await ivfDishBarcodesSeed.destroyFixtures()
  await patientPlanCohortIvfDishSeed.destroyFixtures()
  await ivfDishToIvfTaskGroupSeed.destroyFixtures()
  await ivfDishSeed.destroyFixtures()
  await ivfTaskDetailsSeed.destroyFixtures()

  await labSyncObservationResultSeed.destroyFixtures()
  await labSyncObservationRequestSeed.destroyFixtures()
  await labSyncTestResultFieldMatchSeed.destroyFixtures()
  await labSyncRawDataSeed.destroyFixtures()
  await ivfEmbryoGradeSeed.destroyFixtures()
  await ivfTaskExpendedEmbryoSeed.destroyFixtures()
  await planLabInstructionSeed.destroyFixtures()
  await planChecklistSeed.destroyFixtures()
  await planChecklistItemSeed.destroyFixtures()
  await Promise.all([
    embryoTypeSeed.destroyFixtures(),
    ivfUnitOptionSeed.destroyFixtures(),
    planSheetActionSeed.destroyFixtures(),
  ])
  await iVFCancellationReasonSeed.destroyFixtures()

  await staffSeed.destroyFixtures()
  await serviceProviderSeed.destroyFixtures()
  await serviceProviderGroupSeed.destroyFixtures()
  await planLutealSupportItemSeed.destroyFixtures()
  await ivfTaskSelectedEmbryoSeed.destroyFixtures()
  await priorityStatusSeed.destroyFixtures()

  await externalDoctorSeed.destroyFixtures()

  await connection.destroy()
}

export {removeSeedData}
