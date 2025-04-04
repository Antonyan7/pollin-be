/* eslint-disable max-lines */
/* eslint-disable no-console */
//jest-global-setup.ts
import 'tsconfig-paths/register'
import {removeSeedData} from './remove-seeds-data'

import {
  AnswerOptionSeed,
  AppointmentSeed,
  SqlDbConnectionForSeeds,
  PatientSeed,
  QuestionnaireSeed,
  QuestionConstraintSeed,
  QuestionnaireToQuestionSeed,
  SchedulingSlotSeed,
  SchedulingTemplatePeriodSeed,
  SchedulingTemplateSeed,
  ServiceGroupSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  EncounterTypeSeed,
  PatientEncounterSeed,
  PatientEncounterAttachmentSeed,
  PatientEncounterAddendumSeed,
  StaffNoteTypeSeed,
  PatientStaffNoteSeed,
  PatientStaffNoteAttachmentSeed,
  PatientStaffNoteAddendumSeed,
  AppliedSchedulingTemplatePeriodSeed,
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
  RoleSeed,
  PermissionSeed,
  SignatureSeed,
  PatientPlanToTestTypeProcedureSeed,
  DocumentCategorySeed,
  StaffFeedbackSeed,
  MilestoneServiceTypeLimitationSeed,
  PatientToServiceProviderSeed,
  TestResultUltrasoundFinalReportSeed,
  OhipClaimToCodeSeed,
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
  PatientPlanCohortCryoSampleContainersSeed,
  CryoTankV2Seed,
  CryoCanV2Seed,
  CryoCaneV2Seed,
  IvfEmbryoGradeSeed,
  CryoSampleDonorSeed,
  CryoInventoryCardSeed,
  CryoInventoryCardExternalSampleSeed,
  CryoSampleContainerSeed,
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
  PatientFertilityIQSeed,
  PatientFertilityIQTestResultSeed,
  PatientFertilityIQFemaleSeed,
  PatientEggFreezingReportSeed,
  PriorityStatusSeed,
  PaymentReceiptDescriptionItemSeed,
  BulkDownloadRequestSeed,
  PatientFeedbackFormSeed,
  TestObservationTypeSeed,
  TestResultObservationSeed,
  PlanSheetActionSeed,
  PlanSheetActionListSeed,
  PatientPlanSheetActionSeed,
  ServiceTypeToServiceCodeSeed,
  DefaultFilterForAppointmentToServiceProviderSeed,
  DefaultFilterForAppointmentToPatientStatusSeed,
  IvfDishBarcodeSeed,
  IvfDishToIvfTaskGroupSeed,
  IvfDishToPlanTypeSeed,
  IvfDishToPlanAddonSeed,
  PatientPlanCohortIvfDishSeed,
  IvfDishSeed,
  ExternalDoctorSeed,
  SchedulingTimeOffBlockPeriodSeed,
  ConsentModuleSeed,
  PredefinedConsentPackageSeed,
  PredefinedConsentPackageToModuleSeed,
  TestResultSonoDetailSeed,
  EmailTemplateSeed,
  PatientQuestionnaireSeed,
  PatientQuestionnaireToQuestionSeed,
  ConsentModuleToQuestionSeed,
  PatientPaymentEstimateSeed,
  PatientPaymentEstimateEmailAttemptSeed,
  PatientPaymentEstimateItemSeed,
} from '@seeds/typeorm'
import {OTPCodeSeed} from '@seeds/firestore/otp-code.seed'
import {ServiceCategorySeed} from '@seeds/typeorm/service-category.seed'
import {ApplicationCodeSeed} from '@seeds/typeorm/application-code.seed'
import {QuestionSeed} from '@seeds/typeorm/question.seed'
import {BookingIntentSeed} from '@seeds/firestore/booking-intent.seed'
import {QuestionnaireIntentSeed} from '@seeds/firestore/questionnaire-intent.seed'
import {ServiceProviderToServiceTypeSeed} from '@seeds/typeorm/service-provider-to-service-type.seed'
import {PatientDetailSeed} from '@seeds/typeorm/patient-detail.seed'
import {PatientMedicationSeed} from '@seeds/typeorm/patient-medication.seed'
import {PatientPartnerSeed} from '@seeds/typeorm/patient-partner.seed'
import {MedicationSeed} from '@seeds/typeorm/medication.seed'
import {TestResultMeasurementSeed} from '@seeds/typeorm/test-result-measurement.seed'
import {ProfileTestResultSeed} from '@seeds/typeorm/profile-test-result.seed'
import {TestResultAttachmentSeed} from '@seeds/typeorm/test-result-attachment.seed'
import {TestResultSeed} from '@seeds/typeorm/test-result.seed'
import {TestTypeSeed} from '@seeds/typeorm/test-type.seed'
import {TestPanelSeed} from '@seeds/typeorm/test-panel.seed'
import {LabInfoSeed} from '@seeds/typeorm/lab-info.seed'
import {MedicationInstructionSeed} from '@seeds/typeorm/medication-instruction.seed'
import {MedicationInstructionStepSeed} from '@seeds/typeorm/medication-instruction-step.seed'
import {LabMachineSeed} from '@seeds/typeorm/lab-machine.seed'
import {SpecimenGroupSeed} from '@seeds/typeorm/specimen-group.seed'
import {AppointmentPartnerSeed} from '@seeds/typeorm/appointment-partner.seed'
import {SpecimenSeed} from '@seeds/typeorm/specimen.seed'
import {CareTeamSeed} from '@seeds/typeorm/care-team.seed'
import {ServiceProviderGroupSeed} from '@seeds/typeorm/service-provider-group.seed'
import {TransportFolderSeed} from '@seeds/typeorm/transport-folder.seed'
import {SpecimenTestSeed} from '@seeds/typeorm/specimen-test.seed'
import {SpecimenStorageLocationSeed} from '@seeds/typeorm/specimen-storage-location.seed'
import {testFirestoreConnection, testSqlConnection} from './test-connection'
import {AfterVisitSummarySeed} from '@seeds/typeorm/after-visit-summary.seed'
import {TestOrderTypeSeed} from '@seeds/typeorm/test-order-type.seed'
import {TestOrderItemSeed} from '@seeds/typeorm/test-order-item.seed'
import {TestOrderSeed} from '@seeds/typeorm/test-order.seed'
import {TestOrderCancellationReasonSeed} from '@seeds/typeorm/test-order-cancellation-reason.seed'
import {TestGroupItemSeed} from '@seeds/typeorm/test-group-item.seed'
import {TestGroupSeed} from '@seeds/typeorm/test-group.seed'
import {ServiceTypeConstraintSeed} from '@seeds/typeorm/service-type-constraint.seed'
import {PatientMilestoneSeed} from '@seeds/typeorm/patient-milestone.seed'
import {TestTypeResultOptionSeed} from '@seeds/typeorm/test-type-result-option.seed'
import {ServiceGroupToServiceTypeSeed} from '@seeds/typeorm/service-group-to-service-type.seed'
import {PatientDefaultMilestoneSeed} from '@seeds/typeorm/default-milestone.seed'
import {TestPanelToTestTypeSeed} from '@seeds/typeorm/test-panel-to-test-type.seed'
import {PatientAddressSeed} from '@seeds/typeorm/patient-address.seed'
import {PatientMilestoneToAppointmentSeed} from '@seeds/typeorm/patient-milestone-to-appointment.seed'
import {SpecimenIncompletionReasonSeed} from '@seeds/typeorm/specimen-incompletion-reason.seed'
import {PatientPreTermDeliveryHistorySeed} from '@seeds/typeorm/patient-pre-term-delivery-history.seed'
import {TaskSeed} from '@seeds/typeorm/task.seed'
import {StaffSeed} from '@seeds/typeorm/staff.seed'
import {TaskReassignmentSeed} from '@seeds/typeorm/task-reassignment.seed'
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
import {MedicationCategorySeed} from '@seeds/typeorm/medication-category.seed'
import {MedicationToMedicationCategorySeed} from '@seeds/typeorm/medication-to-medication-category.seed'
import {PlanMedicationSeed} from '@seeds/typeorm/plan-medication.seed'
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
import {CryoTankSeed} from '@seeds/typeorm/cryo-tank.seed'
import {CryoCanSeed} from '@seeds/typeorm/cryo-can.seed'
import {CryoCaneSeed} from '@seeds/typeorm/cryo-cane.seed'
import {MediaLotSeed} from '@seeds/typeorm/media-lot.seed'
import {ReagentSeed} from '@seeds/typeorm/reagent.seed'
import {CryoVialSeed} from '@seeds/typeorm/cryo-vial.seed'
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
import {IvfTaskDetailsSeed} from '@seeds/typeorm/ivf-task-details.seed'
import {PatientIntakeSnapshotSeed} from '@seeds/firestore/patient-intake-snapshot.seed'
import {LabSyncObservationRequestSeed} from '@seeds/typeorm/lab-sync-observation-request.seed'
import {LabSyncRawDataSeed} from '@seeds/typeorm/lab-sync-raw-data.seed'
import {LabSyncObservationResultSeed} from '@seeds/typeorm/lab-sync-observation-result.seed'
import {LabSyncTestResultFieldMatchSeed} from '@seeds/typeorm/lab-sync-test-result-field-match.seed'
import {AppointmentLinkedServiceProviderSeed} from '@seeds/typeorm/appointment-linked-service-provider.seed'
import {PlanLabInstructionSeed} from '@seeds/typeorm/plan-lab-instruction.seed'
import {TestOrderStaffActionHistorySeed} from '@seeds/typeorm/test-order-staff-action-history.seed'
import {PlanTypeHeadingSeed} from '@seeds/typeorm/plan-type-heading.seed'
import {TestOrderActionSeed} from '@seeds/typeorm/test-order-action.seed'
import {AppConfigSeed} from '@seeds/firestore/app-config'
import {PatientPlanChangeNotificationSeed} from '@seeds/typeorm/patient-plan-change-notification.seed'
import {PaymentMethodSeed} from '@seeds/typeorm/payment-method.seed'
import {TestTypeGroupForAnyResultSeed} from '@seeds/typeorm/test-type-group-for-any-result.seed'
import {IvfTaskHistorySeed} from '@seeds/firestore/ivf-task-history.seed'
import {PatientPlanSheetHistorySeed} from '@seeds/firestore/patient-plan-sheet-history.seed'
import {CartSeed} from '@seeds/firestore/cart-seed'
import {PlanLutealSupportItemSeed} from '@seeds/typeorm/plan-luteal-support-item.seed'
import {PatientPlanHistorySeed} from '@seeds/firestore/patient-plan-history.seed'
import {TestObservationMetadataSeed} from '@seeds/typeorm/test-observation-metadata.seed'
import {
  superTypeBloodFixture,
  superTypeDiagnosticImagingFixture,
  superTypeFixture,
  superTypeSemenFixture,
} from './fixtures/super-type.fixture'
import {
  serviceTypeBloodCycleMonitoringFixture,
  serviceTypeFixture,
  serviceTypeForUltrasoundFolliculesFixture,
  serviceTypeSemenCollectionFixture,
} from './fixtures/service-type.fixture'
import {IvfTaskSelectedEmbryoSeed} from '@seeds/typeorm/ivf-task-selected-embryo.seed'
import {IVFUnitOptionSeed} from '@seeds/typeorm/ivf-unit-option.seed'
import {AppointmentHistorySeed} from '@seeds/firestore/appointment-history.seed'
import {TestTypeRangeSeed} from '@seeds/typeorm/test-type-range.seed'
import {ReportTypeSeed} from '@seeds/typeorm/report-type.seed'
import {PatientReportSeed} from '@seeds/typeorm/patient-report.seed'
import {PlanTypePaymentReceiptDescriptionItemSeed} from '@seeds/typeorm/plan-type-payment-receipt-description-item.seed'
import {DefaultFilterForAppointmentSeed} from '@seeds/typeorm/default-filter-for-appointment.seed'
import {DefaultFilterForAppointmentToColumnSeed} from '@seeds/typeorm/default-filter-for-appointment-to-column.seed'
import {DefaultFilterForAppointmentToServiceTypeSeed} from '@seeds/typeorm/default-filter-for-appointment-to-service-type.seed'
import {PatientPlanAlertSeed} from '@seeds/typeorm/patient-plan-alert.seed'
import {TestOrderHistorySeed} from '@seeds/firestore/test-order-history.seed'
import {TestTypeNormalRangeSeed} from '@seeds/typeorm/test-type-normal-range.seed'
import {IvfDishLogSeed} from '@seeds/firestore/ivf-dish-log.seed'
import {MedicationConsentModuleSeed} from '@seeds/typeorm/medication-consent-module.seed'
import {PlanAddonConsentModuleSeed} from '@seeds/typeorm/plan-addon-consent-module.seed'
import {PlanTypeConsentModuleSeed} from '@seeds/typeorm/plan-type-consent-module.seed'
import {PatientConsentPackageSeed} from '@seeds/typeorm/patient-consent-package.seed'
import {PatientConsentModuleSeed} from '@seeds/typeorm/patient-consent-module.seed'
import {PatientConsentPackageSignatorySeed} from '@seeds/typeorm/patient-consent-package-signatory.seed'
import {IVFDispositionReasonSeed} from '@seeds/typeorm/ivf-disposition-reason.seed'
import {PatientPlanCohortEggToThawSeed} from '@seeds/typeorm'
import {PatientConsentPackageHistorySeed} from '@seeds/firestore/patient-consent-package-history.seed'
import {PatientQuestionnaireAnswerSeed} from '@seeds/typeorm/patient-questionnaire-answer.seed'
import {BillableItemSeed} from '@seeds/typeorm/billable-item.seed'
import {PlanTypeSheetTestTypeSeed} from '@seeds/typeorm/plan-type-sheet-test-type.seed'
import {PushNotificationTemplateSeed} from '@seeds/typeorm/push-notification-template.seed'

/**
 * Function runs before any test suite
 */
// eslint-disable-next-line max-lines-per-function
const setup = async (): Promise<void> => {
  await testSqlConnection()
  await testFirestoreConnection()

  await removeSeedData()
  console.log('\n**** JEST create seeds data ****')
  const connection = await SqlDbConnectionForSeeds.instance()

  // Firestore seeds
  const otpSeed = new OTPCodeSeed()
  const bookingIntentSeed = new BookingIntentSeed()
  const questionnaireIntentSeed = new QuestionnaireIntentSeed()
  const patientIntakeSnapshotSeed = new PatientIntakeSnapshotSeed()
  const patientProfileSeed = new PatientProfileSeed()
  const cloudTaskSeed = new CloudTaskSeed()
  const patientMedicationHistorySeed = new PatientMedicationHistorySeed()
  const appointmentHistorySeed = new AppointmentHistorySeed()
  const ivfTaskHistorySeed = new IvfTaskHistorySeed()
  const ivfDishLogSeed = new IvfDishLogSeed()
  const patientPlanSheetHistorySeed = new PatientPlanSheetHistorySeed()
  const patientPlanHistorySeed = new PatientPlanHistorySeed()
  const cartSeed = new CartSeed()
  const testOrderHistorySeed = new TestOrderHistorySeed()
  const patientConsentPackageHistorySeed = new PatientConsentPackageHistorySeed()

  // SQL seeds

  const planChecklistItemSeed = new PlanChecklistItemSeed(connection)
  const planChecklistSeed = new PlanChecklistSeed(connection)
  const planLabInstructionSeed = new PlanLabInstructionSeed(connection)
  const careTeamSeed = new CareTeamSeed(connection)
  const answerOptionSeed = new AnswerOptionSeed(connection)
  const specimenGroupSeed = new SpecimenGroupSeed(connection)
  const labMachineSeed = new LabMachineSeed(connection)
  const specimenSeed = new SpecimenSeed(connection)
  const patientSeed = new PatientSeed(connection)
  const patientCustomAlertSeed = new PatientCustomAlertSeed(connection)
  const patientDetailSeed = new PatientDetailSeed(connection)
  const patientMedicationSeed = new PatientMedicationSeed(connection)
  const afterVisitSummarySeed = new AfterVisitSummarySeed(connection)
  const patientPartnerSeed = new PatientPartnerSeed(connection)
  const medicationSeed = new MedicationSeed(connection)
  const questionnaireSeed = new QuestionnaireSeed(connection)
  const serviceCategorySeed = new ServiceCategorySeed(connection)
  const serviceGroupSeed = new ServiceGroupSeed(connection)
  const serviceGroupAvailabilitySeed = new ServiceGroupAvailabilitySeed(connection)
  const serviceProviderSeed = new ServiceProviderSeed(connection)
  const serviceTypeSeed = new ServiceTypeSeed(connection)
  const serviceTypeConstraintSeed = new ServiceTypeConstraintSeed(connection)
  const applicationCodeSeed = new ApplicationCodeSeed(connection)
  const questionSeed = new QuestionSeed(connection)
  const schedulingSlotSeed = new SchedulingSlotSeed(connection)
  const appointmentSeed = new AppointmentSeed(connection)
  const schedulingTemplateSeed = new SchedulingTemplateSeed(connection)
  const schedulingTimeOffBlockSeed = new SchedulingTimeOffBlockSeed(connection)
  const schedulingTimeOffBlockPeriodSeed = new SchedulingTimeOffBlockPeriodSeed(connection)
  const questionnaireToQuestion = new QuestionnaireToQuestionSeed(connection)
  const questionConstraint = new QuestionConstraintSeed(connection)
  const schedulingTemplatePeriodSeed = new SchedulingTemplatePeriodSeed(connection)
  const encounterTypeSeed = new EncounterTypeSeed(connection)
  const encounterSeed = new PatientEncounterSeed(connection)
  const patientEncounterAttachmentSeed = new PatientEncounterAttachmentSeed(connection)
  const addendumSeed = new PatientEncounterAddendumSeed(connection)
  const patientEncounterAddendumAttachmentSeed = new PatientEncounterAddendumAttachmentSeed(
    connection,
  )

  const staffNoteTypeSeed = new StaffNoteTypeSeed(connection)
  const staffNoteSeed = new PatientStaffNoteSeed(connection)
  const patientStaffNoteAttachmentSeed = new PatientStaffNoteAttachmentSeed(connection)
  const staffNoteAddendumSeed = new PatientStaffNoteAddendumSeed(connection)
  const patientStaffNoteAddendumAttachmentSeed = new PatientStaffNoteAddendumAttachmentSeed(
    connection,
  )

  const appliedSchedulingTemplatePeriodSeed = new AppliedSchedulingTemplatePeriodSeed(connection)
  const introductionSeed = new IntroductionSeed(connection)
  const serviceProviderToServiceTypeSeed = new ServiceProviderToServiceTypeSeed(connection)
  const testResultSeed = new TestResultSeed(connection)
  const testTypeSeed = new TestTypeSeed(connection)
  const labInfoSeed = new LabInfoSeed(connection)
  const patientPrescriptionSeed = new PatientPrescriptionSeed(connection)
  const pharmacySeed = new PharmacySeed(connection)
  const patientScheduledMilestoneSeed = new PatientScheduledMilestoneSeed(connection)
  const testPanelSeed = new TestPanelSeed(connection)
  const testPanelToTestTypeSeed = new TestPanelToTestTypeSeed(connection)
  const testResultMeasurementSeed = new TestResultMeasurementSeed(connection)
  const testResultObUltrasoundSeed = new TestResultObUltrasoundSeed(connection)
  const testResultOvaryMeasurementSeed = new TestResultOvaryMeasurementSeed(connection)
  const testResultOvaryCystMeasurementSeed = new TestResultOvaryCystMeasurementSeed(connection)
  const testResultOHSSFluidMeasurementSeed = new TestResultOHSSFluidMeasurementSeed(connection)
  const testResultOHSSOvaryMeasurementSeed = new TestResultOHSSOvaryMeasurementSeed(connection)
  const testResultUterusMeasurementSeed = new TestResultUterusMeasurementSeed(connection)
  const testResultAttachmentSeed = new TestResultAttachmentSeed(connection)
  const testResultStatusHistorySeed = new TestResultStatusHistorySeed(connection)
  const testResultCommentSeed = new TestResultCommentSeed(connection)
  const testTypeResultOptionSeed = new TestTypeResultOptionSeed(connection)
  const profileTestResultSeed = new ProfileTestResultSeed(connection)
  const medicationInstructionSeed = new MedicationInstructionSeed(connection)
  const medicationInstructionStepSeed = new MedicationInstructionStepSeed(connection)
  const patientFullTermDeliveryHistorySeed = new PatientFullTermDeliveryHistorySeed(connection)
  const patientPreTermDeliveryHistorySeed = new PatientPreTermDeliveryHistorySeed(connection)
  const patientDetailFemaleSeed = new PatientDetailFemaleSeed(connection)
  const patientDetailMaleSeed = new PatientDetailMaleSeed(connection)
  const patientNoteSeed = new PatientNoteSeed(connection)
  const patientPastSurgerySeed = new PatientPastSurgerySeed(connection)
  const patientPlanChangeNotificationSeed = new PatientPlanChangeNotificationSeed(connection)
  const patientPreviousFertilityTreatmentSeed = new PatientPreviousFertilityTreatmentSeed(
    connection,
  )
  const patientVitaminSupplementSeed = new PatientVitaminSupplementSeed(connection)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(connection)
  const transportFolderSeed = new TransportFolderSeed(connection)
  const specimenTestSeed = new SpecimenTestSeed(connection)
  const specimenStorageLocationSeed = new SpecimenStorageLocationSeed(connection)
  const specimenIncompletionReasonSeed = new SpecimenIncompletionReasonSeed(connection)
  const testOrderCancellationReasonSeed = new TestOrderCancellationReasonSeed(connection)
  const testOrderTypeSeed = new TestOrderTypeSeed(connection)
  const testOrderSeed = new TestOrderSeed(connection)
  const testOrderItemSeed = new TestOrderItemSeed(connection)
  const testOrderStaffActionHistorySeed = new TestOrderStaffActionHistorySeed(connection)
  const testGroupItemSeed = new TestGroupItemSeed(connection)
  const testGroupSeed = new TestGroupSeed(connection)
  const testOrderActionSeed = new TestOrderActionSeed(connection)
  const patientDefaultMilestoneSeed = new PatientDefaultMilestoneSeed(connection)
  const consentModuleSeed = new ConsentModuleSeed(connection)
  const predefinedConsentPackageSeed = new PredefinedConsentPackageSeed(connection)
  const predefinedConsentPackageToModuleSeed = new PredefinedConsentPackageToModuleSeed(connection)
  const patientQuestionnaireSeed = new PatientQuestionnaireSeed(connection)
  const patientQuestionnaireAnswerSeed = new PatientQuestionnaireAnswerSeed(connection)
  const patientQuestionnaireToQuestionSeed = new PatientQuestionnaireToQuestionSeed(connection)
  const consentModuleToQuestionSeed = new ConsentModuleToQuestionSeed(connection)

  const libraryContentSeed = new LibraryContentSeed(connection)
  const patientMilestoneSeed = new PatientMilestoneSeed(connection)
  const patientAlertSeed = new PatientAlertSeed(connection)
  const serviceGroupToServiceTypeSeed = new ServiceGroupToServiceTypeSeed(connection)
  const patientAddressSeed = new PatientAddressSeed(connection)
  const patientMilestoneToAppointmentSeed = new PatientMilestoneToAppointmentSeed(connection)
  const milestoneToTestTypeOrPanelSeed = new MilestoneToTestTypeOrPanelSeed(connection)
  const taskSeed = new TaskSeed(connection)
  const roleSeed = new RoleSeed(connection)
  const permissionSeed = new PermissionSeed(connection)
  const staffSeed = new StaffSeed(connection)
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
  const medicationCategorySeed = new MedicationCategorySeed(connection)
  const medicationToMedicationCategorySeed = new MedicationToMedicationCategorySeed(connection)
  const planMedicationSeed = new PlanMedicationSeed(connection)
  const planIntitialResultSeed = new PlanInitialResultSeed(connection)
  const semenVerificationFormSeed = new SemenVerificationFormSeed(connection)
  const patientDoctorSeed = new PatientDoctorSeed(connection)
  const patientReferralSeed = new PatientReferralSeed(connection)
  const patientPushNotificationSeed = new PatientPushNotificationSeed(connection)
  const catheterTypeSeed = new CatheterTypeSeed(connection)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(connection)
  const signatureSeed = new SignatureSeed(connection)
  const patientPlanToTestTypeProcedureSeed = new PatientPlanToTestTypeProcedureSeed(connection)
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
  const mediaLotSeed = new MediaLotSeed(connection)
  const cryoSampleDonorSeed = new CryoSampleDonorSeed(connection)
  const cryoInventoryCardSeed = new CryoInventoryCardSeed(connection)
  const cryoInventoryCardExternalSampleSeed = new CryoInventoryCardExternalSampleSeed(connection)
  const cryoSampleContainerSeed = new CryoSampleContainerSeed(connection)
  const cryoDiscardReasonSeed = new CryoDiscardReasonSeed(connection)
  const reagentSeed = new ReagentSeed(connection)
  const cryoVialSeed = new CryoVialSeed(connection)
  const milestoneServiceTypeLimitationSeed = new MilestoneServiceTypeLimitationSeed(connection)
  const patientToServiceProviderSeed = new PatientToServiceProviderSeed(connection)
  const testResultUltrasoundFinalReportSeed = new TestResultUltrasoundFinalReportSeed(connection)
  const ohipClaimSeed = new OhipClaimSeed(connection)
  const ohipClaimToCodeSeed = new OhipClaimToCodeSeed(connection)
  const mdBillingDiagnosticCodeSeed = new MdBillingDiagnosticCodeSeed(connection)
  const mdBillingServiceCodeSeed = new MdBillingServiceCodeSeed(connection)
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
  const patientAdhocPaymentSeed = new PatientAdhocPaymentSeed(connection)
  const paymentOrderItemSeed = new PaymentOrderItemSeed(connection)
  const paymentOrderSeed = new PaymentOrderSeed(connection)
  const staffDefaultSeed = new StaffDefaultSeed(connection)
  const planAddonSeed = new PlanAddonSeed(connection)
  const ivfTaskToDaysSeed = new IvfTaskToDaySeed(connection)
  const ivfDayTaskToPlanTypeSeed = new IvfDayTaskToPlanTypeSeed(connection)
  const ivfTaskSummarySeed = new IvfTaskSummarySeed(connection)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(connection)
  const patientPlanCohortIvfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(connection)
  const patientPlanCohortCryoSampleContainersSeed = new PatientPlanCohortCryoSampleContainersSeed(
    connection,
  )
  const ivfDishBarcodesSeed = new IvfDishBarcodeSeed(connection)
  const ivfDishSeed = new IvfDishSeed(connection)
  const patientPlanCohortIvfDishSeed = new PatientPlanCohortIvfDishSeed(connection)
  const ivfDishToIvfTaskGroupSeed = new IvfDishToIvfTaskGroupSeed(connection)
  const ivfTaskDetailsSeed = new IvfTaskDetailsSeed(connection)
  const ivfDishToPlanTypeSeed = new IvfDishToPlanTypeSeed(connection)
  const ivfDishToPlanAddonSeed = new IvfDishToPlanAddonSeed(connection)
  const labSyncObservationRequestSeed = new LabSyncObservationRequestSeed(connection)
  const labSyncRawDataSeed = new LabSyncRawDataSeed(connection)
  const labSyncObservationResultSeed = new LabSyncObservationResultSeed(connection)
  const labSyncTestResultFieldMatchSeed = new LabSyncTestResultFieldMatchSeed(connection)
  const appointmentLinkedServiceProviderSeed = new AppointmentLinkedServiceProviderSeed(connection)
  const ivfEmbryoGradeSeed = new IvfEmbryoGradeSeed(connection)
  const ivfTaskExpendedEmbryoSeed = new IvfTaskExpendedEmbryoSeed(connection)
  const ivfTaskSelectedEmbryoSeed = new IvfTaskSelectedEmbryoSeed(connection)
  const superTypeSeed = new SuperTypeSeed(connection)
  const embryoTypeSeed = new EmbryoTypeSeed(connection)
  const ivfUnitOptionSeed = new IVFUnitOptionSeed(connection)
  const planTypeHeadingSeed = new PlanTypeHeadingSeed(connection)
  const appConfigSeed = new AppConfigSeed()
  const paymentMethodSeed = new PaymentMethodSeed(connection)
  const testTypeGroupForAnyResultSeed = new TestTypeGroupForAnyResultSeed(connection)
  const iVFCancellationReasonSeed = new IVFCancellationReasonSeed(connection)
  const thyroidProtocolResultSeed = new ThyroidProtocolResultSeed(connection)
  const planLutealSupportItemSeed = new PlanLutealSupportItemSeed(connection)
  const profileAlertSeed = new ProfileAlertSeed(connection)
  const ivfDispositionReasonSeed = new IVFDispositionReasonSeed(connection)
  const patientPlanCohortEggToThawSeed = new PatientPlanCohortEggToThawSeed(connection)
  const patientProfileAlertSeed = new PatientProfileAlertSeed(connection)
  const testObservationMetadataSeed = new TestObservationMetadataSeed(connection)
  const testTypeRangeSeed = new TestTypeRangeSeed(connection)
  const testTypeNormalRangeSeed = new TestTypeNormalRangeSeed(connection)
  const reportTypeSeed = new ReportTypeSeed(connection)
  const patientReportSeed = new PatientReportSeed(connection)
  const patientFertilityIQSeed = new PatientFertilityIQSeed(connection)
  const patientFertilityIQFemaleSeed = new PatientFertilityIQFemaleSeed(connection)
  const testResultSonoDetailSeed = new TestResultSonoDetailSeed(connection)
  const patientFertilityIQTestResultSeed = new PatientFertilityIQTestResultSeed(connection)
  const patientEggFreezingReportSeed = new PatientEggFreezingReportSeed(connection)

  const priorityStatusSeed = new PriorityStatusSeed(connection)
  const paymentReceiptDescriptionItemSeed = new PaymentReceiptDescriptionItemSeed(connection)
  const planTypePaymentReceiptDescriptionItemSeed = new PlanTypePaymentReceiptDescriptionItemSeed(
    connection,
  )
  const bulkDownloadRequestSeed = new BulkDownloadRequestSeed(connection)
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

  const patientPaymentEstimateSeed = new PatientPaymentEstimateSeed(connection)
  const patientPaymentEstimateItemSeed = new PatientPaymentEstimateItemSeed(connection)
  const patientPaymentEstimateEmailAttemptSeed = new PatientPaymentEstimateEmailAttemptSeed(
    connection,
  )

  await emailTemplateSeed.createFixtures()
  await pushNotificationTemplateSeed.createFixtures()

  await introductionSeed.createFixtures()
  // Create fixtures without Foreign Keys
  await Promise.all([
    cartSeed.createFixtures(),
    otpSeed.createFixtures(),
    questionnaireIntentSeed.createFixtures(),
    patientIntakeSnapshotSeed.createFixtures(),
    bookingIntentSeed.createFixtures(),
    questionnaireSeed.createFixtures(),
    applicationCodeSeed.createFixtures(),
    schedulingTemplateSeed.createFixtures(),
    appConfigSeed.createFixture(),
    ivfTaskHistorySeed.createFixtures(),
    ivfDishLogSeed.createFixtures(),
    patientPlanSheetHistorySeed.createFixtures(),
    patientPlanHistorySeed.createFixtures(),
    patientConsentPackageHistorySeed.createFixtures(),

    staffNoteTypeSeed.createFixtures(),

    patientProfileSeed.createFixtures(),
    cloudTaskSeed.createFixtures(),
    patientMedicationHistorySeed.createFixtures(),
    appointmentHistorySeed.createFixtures(),
    testOrderHistorySeed.createFixtures(),
    documentCategorySeed.createFixtures(),
    ivfTaskToDaysSeed.createFixtures(),
    iVFCancellationReasonSeed.createFixtures(),
    testObservationTypeSeed.createFixtures(),
    planSheetActionSeed.createFixtures(),
    ivfDispositionReasonSeed.createFixtures(),
    billableItemSeed.createFixtures(),
  ])

  // Create fixtures with FKs
  await roleSeed.createFixtures()
  await permissionSeed.createFixtures()

  await externalDoctorSeed.createFixtures()

  await Promise.all([embryoTypeSeed.createFixtures(), ivfUnitOptionSeed.createFixtures()])
  await planChecklistItemSeed.createFixtures()
  await planChecklistSeed.createFixtures()
  await planLabInstructionSeed.createFixtures()
  await serviceProviderGroupSeed.createFixtures()
  await serviceCategorySeed.createFixtures()
  await mdBillingServiceCodeSeed.createFixtures()
  await superTypeSeed.createFixtures()
  await serviceTypeSeed.createFixtures()
  // set default super type
  await serviceTypeSeed.setSuperType(serviceTypeFixture.id, superTypeFixture.id)
  await serviceTypeSeed.setSuperType(
    serviceTypeBloodCycleMonitoringFixture.id,
    superTypeBloodFixture.id,
  )
  await serviceTypeSeed.setSuperType(serviceTypeSemenCollectionFixture.id, superTypeSemenFixture.id)
  await serviceTypeSeed.setSuperType(
    serviceTypeForUltrasoundFolliculesFixture.id,
    superTypeDiagnosticImagingFixture.id,
  )

  await serviceProviderSeed.createFixtures()
  await priorityStatusSeed.createFixtures()
  await staffSeed.createFixtures()
  await appliedSchedulingTemplatePeriodSeed.createFixtures()
  await pharmacySeed.createFixtures()
  await patientDetailSeed.createFixtures()
  await patientDetailMaleSeed.createFixtures()
  await patientDetailFemaleSeed.createFixtures()
  await patientSeed.createFixtures()
  await patientPartnerSeed.createFixtures()
  await schedulingSlotSeed.createFixture()
  await afterVisitSummarySeed.createFixtures()
  await planAddonSeed.createFixtures()

  await testOrderCancellationReasonSeed.createFixtures()
  await testOrderSeed.createFixtures()

  await catheterTypeSeed.createFixtures()
  await appointmentSeed.createFixtures()
  await addonSeed.createFixtures()
  await appointmentAddonSeed.createFixtures()
  await appointmentMetadataSeed.createFixtures()
  await defaultFilterForAppointmentSeed.createFixtures()
  await defaultFilterForAppointmentToColumnSeed.createFixtures()
  await defaultFilterForAppointmentToServiceProviderSeed.createFixtures()
  await defaultFilterForAppointmentToServiceTypeSeed.createFixtures()
  await mdBillingDiagnosticCodeSeed.createFixtures()
  await mdBillingServiceCodeSeed.createFixtures()
  await ohipClaimSeed.createFixtures()
  await ohipClaimToCodeSeed.createFixtures()
  await questionnaireSeed.createFixtures()
  await serviceGroupSeed.createFixtures()
  await questionSeed.createFixtures()
  await questionnaireToQuestion.createFixtures()
  await answerOptionSeed.createFixtures()
  await questionConstraint.createFixtures()
  await schedulingTemplatePeriodSeed.createFixtures()

  await staffNoteSeed.createFixtures()
  await patientStaffNoteAttachmentSeed.createFixtures()
  await staffNoteAddendumSeed.createFixtures()
  await patientStaffNoteAddendumAttachmentSeed.createFixtures()

  await serviceProviderToServiceTypeSeed.createFixtures()
  await medicationSeed.createFixtures()
  await specimenIncompletionReasonSeed.createFixtures()

  await patientPrescriptionSeed.createFixtures()
  await patientMedicationSeed.createFixtures()
  await labMachineSeed.createFixtures()
  await specimenGroupSeed.createFixtures()
  await labInfoSeed.createFixtures()
  await transportFolderSeed.createFixtures()
  await semenVerificationFormSeed.createFixtures()

  await mediaLotSeed.createFixtures()
  await cryoTankV2Seed.createFixtures()
  await cryoCanV2Seed.createFixtures()
  await cryoCaneV2Seed.createFixtures()
  await cryoSampleDonorSeed.createFixtures()
  await specimenSeed.createFixtures()
  await reagentSeed.createFixtures()
  await cryoInventoryCardExternalSampleSeed.createFixtures()
  await cryoInventoryCardSeed.createFixtures()
  await cryoDiscardReasonSeed.createFixtures()
  await cryoSampleContainerSeed.createFixtures()

  await medicationCategorySeed.createFixtures()
  await medicationToMedicationCategorySeed.createFixtures()
  await testPanelSeed.createFixtures()
  await testTypeSeed.createFixtures()
  await testPanelToTestTypeSeed.createFixtures()
  await specimenStorageLocationSeed.createFixtures()
  await specimenTestSeed.createFixtures()
  await testResultSeed.createFixtures()
  await testResultMeasurementSeed.createFixtures()
  await testResultObUltrasoundSeed.createFixtures()
  await testResultOvaryMeasurementSeed.createFixtures()
  await testResultOvaryCystMeasurementSeed.createFixtures()
  await testResultOHSSFluidMeasurementSeed.createFixtures()
  await testResultOHSSOvaryMeasurementSeed.createFixtures()
  await testResultUterusMeasurementSeed.createFixtures()
  await testResultAttachmentSeed.createFixtures()
  await testResultStatusHistorySeed.createFixtures()
  await testResultCommentSeed.createFixtures()
  await testTypeResultOptionSeed.createFixtures()
  await medicationInstructionSeed.createFixtures()
  await medicationInstructionStepSeed.createFixtures()
  await patientPastSurgerySeed.createFixtures()
  await patientFamilyHealthProblemSeed.createFixtures()
  await patientPreviousFertilityTreatmentSeed.createFixtures()
  await patientVitaminSupplementSeed.createFixtures()
  await staffDefaultSeed.createFixtures()
  await Promise.all([
    patientFullTermDeliveryHistorySeed.createFixtures(),
    patientPreTermDeliveryHistorySeed.createFixtures(),
    patientMiscarriageHistorySeed.createFixtures(),
    patientContactFormSeed.createFixtures(),
    testResultObservationSeed.createFixtures(),
    planSheetActionListSeed.createFixtures(),
    encounterTypeSeed.createFixtures(),
  ])

  await encounterSeed.createFixtures()
  await patientEncounterAttachmentSeed.createFixtures()
  await addendumSeed.createFixtures()
  await patientEncounterAddendumAttachmentSeed.createFixtures()

  await libraryContentSeed.createFixtures()

  await careTeamSeed.createFixtures()
  await testOrderTypeSeed.createFixtures()
  await testGroupSeed.createFixtures()
  await testGroupItemSeed.createFixtures()
  await testTypeGroupForAnyResultSeed.createFixtures()
  await profileTestResultSeed.createFixtures()
  await libraryContentSeed.createFixtures()

  await testOrderItemSeed.createFixtures()
  await testOrderStaffActionHistorySeed.createFixtures()
  await paymentOrderSeed.createFixtures()
  await serviceTypeConstraintSeed.createFixtures()
  await patientDefaultMilestoneSeed.createFixtures()

  await consentModuleSeed.createFixtures()
  await predefinedConsentPackageSeed.createFixtures()
  await predefinedConsentPackageToModuleSeed.createFixtures()

  await planCategorySeed.createFixtures()
  await patientPlanStatusSeed.createFixtures()
  await planTypeSeed.createFixtures()
  await planTypeHeadingSeed.createFixtures()
  await patientPlanSeed.createFixtures()
  await patientPlanDetailSeed.createFixtures()
  await patientPlanSpermSourceSeed.createFixtures()
  await patientPlanSheetSeed.createFixtures()
  await patientPlanToTestTypeProcedureSeed.createFixtures()
  await patientPlanChangeNotificationSeed.createFixtures()
  await planTypeSheetTestTypeSeed.createFixtures()

  await patientConsentPackageSeed.createFixtures()

  await patientQuestionnaireSeed.createFixtures()
  await patientQuestionnaireAnswerSeed.createFixtures()
  await patientQuestionnaireToQuestionSeed.createFixtures()
  await consentModuleToQuestionSeed.createFixtures()

  await patientMilestoneSeed.createFixtures()
  await patientPlanAlertSeed.createFixtures()

  await patientEggFreezingReportSeed.createFixtures()

  await reportTypeSeed.createFixtures()
  await patientReportSeed.createFixtures()

  await patientAlertSeed.createFixtures()
  await patientAdhocPaymentSeed.createFixtures()
  await paymentOrderItemSeed.createFixtures()
  await paymentMethodSeed.createFixtures()
  await serviceGroupToServiceTypeSeed.createFixtures()
  await patientAddressSeed.createFixtures()
  await patientMilestoneToAppointmentSeed.createFixtures()
  await milestoneToTestTypeOrPanelSeed.createFixtures()
  await patientScheduledMilestoneSeed.createFixtures()

  await testOrderActionSeed.createFixtures()

  await patientCustomAlertSeed.createFixtures()
  await testResultUltrasoundFinalReportSeed.createFixtures()
  await taskSeed.createFixtures()
  await taskReassignmentSeed.createFixtures()
  await serviceGroupAvailabilitySeed.createFixtures()
  await patientAbortionHistorySeed.createFixtures()
  await planMedicationSeed.createFixtures()
  await patientDocumentSeed.createFixtures()
  await planIntitialResultSeed.createFixtures()
  await patientDoctorSeed.createFixtures()
  await patientReferralSeed.createFixtures()
  await patientPushNotificationSeed.createFixtures()
  await signatureSeed.createFixtures()
  await staffFeedbackSeed.createFixtures()
  await appointmentPartnerSeed.createFixtures()
  await milestoneServiceTypeLimitationSeed.createFixtures()
  await patientToServiceProviderSeed.createFixtures()
  await patientNoteSeed.createFixtures()
  await planLutealSupportItemSeed.createFixtures()

  await cryoTankSeed.createFixtures()
  await cryoCanSeed.createFixtures()
  await cryoCaneSeed.createFixtures()

  await cryoVialSeed.createFixtures()

  await ivfDayTaskToPlanTypeSeed.createFixtures()
  await patientPlanCohortSeed.createFixtures()
  await patientPlanCohortIvfTaskGroupSeed.createFixtures()
  await ivfTaskSummarySeed.createFixtures()
  await ivfDishBarcodesSeed.createFixtures()
  await ivfDishSeed.createFixtures()
  await ivfDishToIvfTaskGroupSeed.createFixtures()
  await patientPlanCohortIvfDishSeed.createFixtures()
  await ivfTaskDetailsSeed.createFixtures()

  await labSyncRawDataSeed.createFixtures()
  await labSyncTestResultFieldMatchSeed.createFixtures()
  await labSyncObservationRequestSeed.createFixtures()
  await labSyncObservationResultSeed.createFixtures()
  await appointmentLinkedServiceProviderSeed.createFixtures()
  await ivfEmbryoGradeSeed.createFixtures()
  await ivfTaskExpendedEmbryoSeed.createFixtures()
  await ivfTaskSelectedEmbryoSeed.createFixtures()

  await testTypeRangeSeed.createFixtures()
  await testTypeNormalRangeSeed.createFixtures()
  await schedulingTimeOffBlockPeriodSeed.createFixtures()

  await Promise.all([
    profileAlertSeed.createFixtures(),
    thyroidProtocolResultSeed.createFixtures(),
    schedulingTimeOffBlockSeed.createFixtures(),
    patientPlanSheetActionSeed.createFixtures(),
  ])

  await patientProfileAlertSeed.createFixtures()
  await patientPlanCohortCryoSampleContainersSeed.createFixtures()

  await testObservationMetadataSeed.createFixtures()

  await patientFertilityIQSeed.createFixtures()
  await patientFertilityIQFemaleSeed.createFixtures()
  await testResultSonoDetailSeed.createFixtures()
  await patientFertilityIQTestResultSeed.createFixtures()

  await patientFeedbackFormSeed.createFixtures()

  await paymentReceiptDescriptionItemSeed.createFixtures()
  await planTypePaymentReceiptDescriptionItemSeed.createFixtures()

  await bulkDownloadRequestSeed.createFixtures()
  await serviceTypeToServiceCodeSeed.createFixtures()
  await defaultFilterForAppointmentToPatientStatusSeed.createFixtures()
  await ivfDishToPlanTypeSeed.createFixtures()
  await ivfDishToPlanAddonSeed.createFixtures()

  await medicationConsentModuleSeed.createFixtures()
  await planAddonConsentModuleSeed.createFixtures()
  await planTypeConsentModuleSeed.createFixtures()
  await patientConsentModuleSeed.createFixtures()
  await patientConsentPackageSignatorySeed.createFixtures()
  await patientPlanCohortEggToThawSeed.createFixtures()

  await patientPaymentEstimateSeed.createFixtures()
  await patientPaymentEstimateItemSeed.createFixtures()
  await patientPaymentEstimateEmailAttemptSeed.createFixtures()

  await connection.destroy()
}

module.exports = setup
