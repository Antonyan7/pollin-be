/* eslint-disable max-lines */

import {TypeOrmModule} from '@nestjs/typeorm'
import {AnswerOptionRepository} from '@libs/data-layer/apps/questionnaires/repositories/typeorm/answer-options.repository'
import {PatientQuestionnaireAnswerRepository} from '@libs/data-layer/apps/questionnaires/repositories/typeorm/patient-questionnaire-answer.repository'
import {QuestionRepository} from '@libs/data-layer/apps/questionnaires/repositories/typeorm/question.repository'
import {QuestionnaireToQuestionRepository} from '@libs/data-layer/apps/questionnaires/repositories/typeorm/questionnaire-to-question.repository'
import {QuestionnaireRepository} from '@libs/data-layer/apps/questionnaires/repositories/typeorm/questionnaire.repository'
import {
  AddonRepository,
  AppliedTemplatePeriodRepository,
  AppointmentAddonRepository,
  AppointmentMetadataRepository,
  DefaultFilterForAppointmentToPatientStatusRepository,
  DefaultFilterForAppointmentToServiceProviderRepository,
  SchedulingSlotRepository,
  SchedulingTemplatePeriodRepository,
  SchedulingTemplateRepository,
  SchedulingTimeOffBlockPeriodRepository,
  ServiceCategoryRepository,
  ServiceGroupRepository,
  ServiceProviderRepository,
} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient.repository'
import {AppointmentRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/appointment.repository'
import {QuestionConstraintRepository} from '@libs/data-layer/apps/questionnaires/repositories/typeorm/question-constraint.repository'
import {ApplicationCodeRepository} from '@libs/data-layer/apps/questionnaires/repositories/typeorm/application-code.repositorty'
import {PaymentOrderItemRepository} from '@libs/data-layer/apps/checkout/repositories/typeorm/payment-order-item.repository'
import {PaymentOrderRepository} from '@libs/data-layer/apps/checkout/repositories/typeorm/payment-order.repository'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm/patient.entity'
import {PatientQuestionnaireAnswer} from '@libs/data-layer/apps/questionnaires/entities/typeorm/patient-questionnaire-answer.entity'
import {
  AppointmentMetadata,
  CatheterType,
  DefaultFilterForAppointmentToPatientStatus,
  DefaultFilterForAppointmentToServiceProvider,
  Introduction,
  SchedulingSlot,
  SchedulingTemplate,
  SchedulingTemplatePeriod,
  SchedulingTimeOffBlock,
  SchedulingTimeOffBlockPeriod,
  ServiceCategory,
  ServiceGroup,
  ServiceGroupToApplicationCode,
  ServiceGroupToServiceType,
  ServiceProvider,
  ServiceProviderToServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AnswerOption} from '@libs/data-layer/apps/questionnaires/entities/typeorm/answer-options.entity'
import {Question} from '@libs/data-layer/apps/questionnaires/entities/typeorm/question.entity'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire.entity'
import {QuestionConstraint} from '@libs/data-layer/apps/questionnaires/entities/typeorm/question-constraint.entity'
import {ApplicationCode} from '@libs/data-layer/apps/questionnaires/entities/typeorm/application-code.entity'
import {QuestionnaireToQuestion} from '@libs/data-layer/apps/questionnaires/entities/typeorm/questionnaire-to-question.entity'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment.entity'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/service-type.entity'
import {ServiceTypeRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/service-type.repository'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order.entity'
import {PaymentOrderItem} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order-item.entity'
import {PatientEncounterRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-encounter.repository'
import {EncounterTypeRepository} from '@libs/data-layer/apps/users/repositories/typeorm/encounter-type.repository'
import {PatientEncounterAddendumRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-encounter-addendum.repository'

import {PatientStaffNoteRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-staff-note.repository'
import {StaffNoteTypeRepository} from '@libs/data-layer/apps/users/repositories/typeorm/staff-note-type.repository'
import {PatientStaffNoteAddendumRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-staff-note-addendum.repository'

import {
  PatientEncounterAddendum,
  PatientEncounter,
  PatientStaffNoteAddendum,
  PatientStaffNote,
  StaffNoteType,
  PatientAlert,
  PatientDetail,
  PatientMedication,
  PatientDetailFemale,
  PatientPreTermDeliveryHistory,
  PatientFullTermDeliveryHistory,
  PatientMiscarriageHistory,
  PatientEctopicPregnancyHistory,
  PatientAbortionHistory,
  PatientPastSurgery,
  PatientDetailMale,
  PatientPreviousFertilityTreatment,
  PatientVitaminSupplement,
  PatientNote,
  PatientContactForm,
  PatientDoctor,
  PatientReferral,
  PatientPushNotification,
  PatientDocument,
  DocumentCategory,
  MilestoneServiceTypeLimitation,
  PatientEncounterAttachment,
  PatientEncounterAddendumAttachment,
  PatientStaffNoteAttachment,
  PatientStaffNoteAddendumAttachment,
  PatientPlanDiscontinuedMedication,
  PatientAdhocPayment,
  EncounterType,
  ProfileAlert,
  PatientProfileAlert,
  BulkDownloadRequestItem,
  BulkDownloadRequest,
  PatientFeedbackForm,
  PatientCryoSubscription,
  PatientCryoSubscriptionEvent,
  ConsentModule,
  PredefinedConsentPackage,
  PatientConsentPackage,
  PatientConsentModule,
  PatientConsentPackageSignatory,
  PatientQuestionnaire,
  PatientQuestionnaireToQuestion,
  ConsentModuleToQuestion,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPartner} from '@libs/data-layer/apps/users/entities/typeorm/patient-partner.entity'
import {PatientPartnerRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-partner.repository'
import {AppliedSchedulingTemplatePeriod} from '@libs/data-layer/apps/scheduling/entities/typeorm/applied-template-period.entity'
import {ServiceTypeConstraint} from '@libs/data-layer/apps/scheduling/entities/typeorm/service-type-constraint.entity'
import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-result.entity'
import {LabInfo} from '@libs/data-layer/apps/clinic-test/entities/typeorm/lab-info.entity'
import {ProfileTestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm/profile-test-result.entity'
import {TestPanel} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-panel.entity'
import {TestPanelToTestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-panel-to-test-type.entity'
import {TestResultAttachment} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-result-attachment.entity'
import {TestResultMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-result-measurement.entity'
import {TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type.entity'
import {CareTeam} from '@libs/data-layer/apps/users/entities/typeorm/care-team.entity'
import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {Pharmacy} from '@libs/data-layer/apps/users/entities/typeorm/pharmacy.entity'
import {ServiceProviderGroup} from '@libs/data-layer/apps/scheduling/entities/typeorm/service-provider-group.entity'
import {Medication} from '@libs/data-layer/apps/medication/entities/typeorm/medication.entity'
import {MedicationInstruction} from '@libs/data-layer/apps/medication/entities/typeorm/medication-instruction.entity'
import {PatientToServiceProvider} from '@libs/data-layer/apps/users/entities/typeorm/patient-to-service-provider.entity'
import {ProfileTestResultRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/profile-test-result.repository'
import {TestPanelRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-panel.repository'
import {TestTypeRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-type.repository'
import {LabInfoRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/lab-info.repository'
import {TestResultRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-result.repository'
import {PatientPrescriptionRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-prescription.repository'
import {IvfDishBarcode} from '@libs/data-layer/apps/clinic-ivf/entities/ivf-dish-barcode.entity'
import {
  MedicationCategoryRepository,
  MedicationRepository,
  MedicationToMedicationCategoryRepository,
} from '@libs/data-layer/apps/medication/repositories'
import {
  MedicationCategory,
  MedicationInstructionStep,
  MedicationPredifinedDosage,
  MedicationToMedicationCategory,
} from '@libs/data-layer/apps/medication/entities/typeorm'
import {
  LabMachineRepository,
  SpecimenGroupRepository,
  SpecimenRepository,
  TestResultMeasurementRepository,
  SpecimenTestRepository,
  SpecimenStorageLocationRepository,
  TransportFolderRepository,
  TestGroupRepository,
  TestGroupItemRepository,
  TestOrderCancellationReasonRepository,
  TestOrderItemRepository,
  TestOrderRepository,
  TestOrderTypeRepository,
  SemenVerificationFormRepository,
  TestResultOvaryMeasurementRepository,
  TestResultOvaryCystMeasurementRepository,
  TestResultUltrasoundFinalReportRepository,
  TestResultObUltrasoundRepository,
  TestResultStatusHistoryRepository,
  TestOrderStatusHistoryRepository,
  TestResultCommentRepository,
  TestOrderActionRepository,
  SuperTypeRepository,
  LabSyncRawDataRepository,
  LabSyncTestResultFieldMatchRepository,
  LabSyncObservationRequestRepository,
  LabSyncObservationResultRepository,
  TestResultOHSSOvaryMeasurementRepository,
  TestResultOHSSFluidMeasurementRepository,
  ThyroidProtocolResultRepository,
  ThyroidProtocolResultNoteRepository,
  TestTypeConfigurationRepository,
  TestResultObservationRepository,
  PatientEggFreezingReportRepository,
  TestResultSonoDetailRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {TestResultAttachmentRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-result-attachment.repository'
import {
  LabMachine,
  Specimen,
  SpecimenGroup,
  SpecimenStorageLocation,
  SpecimenTest,
  TestGroup,
  TestGroupItem,
  TestOrder,
  TestOrderCancellationReason,
  TestOrderItem,
  TestOrderType,
  TransportFolder,
  TestTypeResultOption,
  SemenVerificationForm,
  TestResultOvaryMeasurement,
  TestResultOvaryCystMeasurement,
  TestResultObUltrasound,
  TestOrderStatusHistory,
  TestResultComment,
  TestOrderAction,
  SuperType,
  LabSyncRawData,
  LabSyncTestResultFieldMatch,
  LabSyncObservationRequest,
  LabSyncObservationResult,
  LabSyncObservationRequestStatusHistory,
  TestResultOHSSOvaryMeasurement,
  TestResultOHSSFluidMeasurement,
  ThyroidProtocolResult,
  ThyroidProtocolResultNote,
  PatientFertilityIQ,
  PatientFertilityIQFemale,
  PatientFertilityIQTestResult,
  TestTypeConfiguration,
  TestObservationType,
  TestTypeObservationType,
  TestResultObservation,
  PatientEggFreezingReport,
  TestResultSonoDetail,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  CryoCan,
  CryoCane,
  CryoTank,
  CryoVial,
  MediaLot,
  Reagent,
  CryoTankV2,
  CryoCanV2,
  CryoCaneV2,
  CryoSampleContainer,
  CryoSampleDonor,
  CryoInventoryCard,
  CryoDiscardReason,
  CryoInventoryCardExternalSample,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {ServiceGroupToServiceTypeRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/service-group-to-service-type.repository'
import {AfterVisitSummary} from '@libs/data-layer/apps/scheduling/entities/typeorm/after-visit-summary.entity'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {PatientMilestoneRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-milestone.repository'
import {AfterVisitSummaryRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/after-visit-summary.repository'
import {TestTypeResultOptionRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-type-result-option.repository'
import {PatientDefaultMilestone} from '@libs/data-layer/apps/users/entities/typeorm/default-milestone.entity'
import {PatientAlertRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-alert.repository'
import {
  PatientDefaultMilestoneRepository,
  PatientDetailFemaleRepository,
  PatientDetailRepository,
  PatientPastSurgeryRepository,
  PatientVitaminSupplementRepository,
  PatientPreviousFertilityTreatmentRepository,
  PatientNoteRepository,
  PatientDetailMaleRepository,
  PatientFamilyHealthProblemRepository,
  PatientContactFormRepository,
  PatientDoctorRepository,
  PatientReferralRepository,
  MilestoneToTestTypeOrPanelRepository,
  PatientDocumentRepository,
  DocumentCategoryRepository,
  PatientEncounterAttachmentRepository,
  PatientEncounterAddendumAttachmentRepository,
  PatientStaffNoteAttachmentRepository,
  PatientStaffNoteAddendumAttachmentRepository,
  PatientPlanDiscontinuedMedicationRepository,
  PatientFullTermDeliveryHistoryRepository,
  PatientPreTermDeliveryHistoryRepository,
  PatientMiscarriageHistoryRepository,
  PatientEctopicPregnancyHistoryRepository,
  PatientAbortionHistoryRepository,
  ProfileAlertRepository,
  PatientProfileAlertRepository,
  PatientCommonRepository,
  BulkDownloadRequestRepository,
  BulkDownloadRequestItemRepository,
  PatientFeedbackFormRepository,
  PatientCryoSubscriptionRepository,
  PatientCryoSubscriptionEventRepository,
  ConsentModuleRepository,
  PredefinedConsentPackageRepository,
  PredefinedConsentPackageToModuleRepository,
  PatientConsentPackageRepository,
  PatientConsentModuleRepository,
  PatientConsentPackageSignatoryRepository,
  PatientQuestionnaireRepository,
  PatientQuestionnaireToQuestionRepository,
  ConsentModuleToQuestionRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {PatientMilestoneToAppointment} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone-to-appointment.entity'
import {PatientMilestoneToAppointmentRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-milestone-to-appointment.repository'
import {PatientAddress} from '@libs/data-layer/apps/users/entities/typeorm/patient-address.entity'
import {PatientAddressRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-address.repository'
import {SpecimenIncompletionReasonRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/specimen-incompletion-reason.repository'
import {SpecimenIncompletionReason} from '@libs/data-layer/apps/clinic-test/entities/typeorm/specimen-incompletion-reason.entity'
import {
  AutomatedTask,
  ExternalDoctor,
  Permission,
  Role,
  Staff,
  StaffDefault,
  Task,
  TaskReassignment,
  TaskTemplate,
} from '@libs/data-layer/apps/clinic-tasks/entities'
import {TaskRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm/task.repository'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm/staff.repository'
import {
  ExternalDoctorRepository,
  PermissionRepository,
  RoleRepository,
  StaffDefaultRepository,
  TaskReassignmentRepository,
  TaskTemplateRepository,
} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {ServiceGroupAvailabilityRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/service-group-availability.repository'
import {ServiceGroupAvailability} from '@libs/data-layer/apps/scheduling/entities/typeorm/service-group-availability.entity'
import {PatientFamilyHealthProblem} from '@libs/data-layer/apps/users/entities/typeorm/patient-family-health-problem.entity'
import {PatientCustomAlert} from '@libs/data-layer/apps/users/entities/typeorm/patient-custom-alert.entity'
import {PatientCustomAlertRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-custom-alert.repository'
import {
  PatientPlan,
  PatientPlanChangeNotificationEntity,
  PatientPlanDetail,
  PatientPlanEmbryoTypeTransferInstruction,
  PatientPlanGeneticTesting,
  PatientPlanLabInstruction,
  PatientPlanSheet,
  PatientPlanSheetAdditionalDay,
  PatientPlanStatus,
  PatientScheduledMilestone,
  PlanCategory,
  PlanInitialResult,
  PlanLabInstruction,
  PlanMedication,
  PlanTypeComponent,
  PlanTypeComponentMedicationCategory,
  PlanTypeComponentTestType,
  PlanTypeHeading,
  PlanType,
  PlanTypePaymentReceiptDescriptionItem,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  PatientPlanChecklistItemRepository,
  PatientPlanAddonRepository,
  PatientPlanLabInstructionRepository,
  PatientPlanLutealSupportItemRepository,
  PatientPlanRepository,
  PatientPlanSheetActionRepository,
  PatientPlanSheetAdditionalDayRepository,
  PatientScheduledMilestoneRepository,
  PlanAddonRepository,
  PlanCategoryRepository,
  PlanChecklistItemRepository,
  PlanChecklistRepository,
  PlanInitialResultRepository,
  PlanLabInstructionRepository,
  PlanLutealSupportItemRepository,
  PlanMedicationRepository,
  PlanSheetActionRepository,
  PlanTypeRepository,
  SignatureRepository,
} from '@libs/data-layer/apps/plan/repositories'
import {MilestoneToTestTypeOrPanel} from '../apps/users/entities/typeorm/milestone-to-test-type-or-panel.entity'
import {PatientPushNotificationRepository} from '../apps/users/repositories/typeorm/patient-push-notification.repository'
import {CatheterTypeRepository} from '../apps/scheduling/repositories/typeorm/catheter-type.repository'
import {PatientPlanStatusRepository} from '@libs/data-layer/apps/plan/repositories/patient-plan-status.repository'
import {Signature} from '../apps/plan/entities/typeorm/signature.entity'
import {PatientPlanToTestTypeProcedure} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-to-test-type-procedure.entity'
import {PatientPlanToTestTypeProcedureRepository} from '@libs/data-layer/apps/plan/repositories/patient-plan-to-test-type-procedure.repository'
import {StaffFeedbackRepository} from '@libs/data-layer/apps/core/repositories/typeorm'
import {StaffFeedback} from '@libs/data-layer/apps/core/entities/typeorm'
import {AppointmentPartnersRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/appointment-partners.repository'
import {AppointmentPartner} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment-partners.entity'
import {MilestoneServiceTypeLimitationRepository} from '../apps/users/repositories/typeorm/milestone-service-type-limitation.repository'
import {TestResultUterusMeasurement} from '../apps/clinic-test/entities/typeorm/test-result-uterus-measurement.entity'
import {TestResultUltrasoundFinalReport} from '../apps/clinic-test/entities/typeorm/test-result-ultrasound-final-report.entity'
import {
  MdBillingDiagnosticCode,
  OhipClaimToCode,
  OhipClaim,
  MdBillingServiceCode,
  ServiceTypeToServiceCode,
} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {
  MdBillingDiagnosticCodeRepository,
  MdBillingServiceCodeRepository,
  OhipClaimRepository,
  OhipClaimToCodeRepository,
  PatientPaymentEstimateEmailAttemptRepository,
  PatientPaymentEstimateItemRepository,
  PatientPaymentEstimateRepository,
} from '@libs/data-layer/apps/clinic-billing/repositories'
import {PatientPlanSheetRepository} from '../apps/plan/repositories/patient-plan-sheet.repository'
import {Addon} from '@libs/data-layer/apps/scheduling/entities/typeorm/addon.entity'
import {AppointmentAddon} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment-addon.entity'
import {TestResultStatusHistory} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-result-status-history.entity'
import {EmailTemplateRepository} from '@libs/data-layer/apps/email/repositories/email-template.repository'
import {EmailTemplate} from '@libs/data-layer/apps/email/entities/typeorm'
import {PatientPlanSpermSource} from '../apps/plan/entities/typeorm/patient-plan-sperm-source.entity'
import {PatientPlanSpermSourceRepository} from '../apps/plan/repositories/patient-plan-sperm-source.repository'
import {PlanTypeToAutomatedTask} from '../apps/plan/entities/typeorm/plan-type-to-automated-task.entity'
import {LibraryContentRepository} from '../apps/users/repositories/typeorm/library-content.repository'
import {LibraryContent} from '../apps/users/entities/typeorm/library-content.entity'
import {PlanAddon} from '../apps/plan/entities/typeorm/plan-addons.entity'
import {
  IvfTaskToDayToPlanType,
  IvfTaskToDay,
  PatientPlanCohort,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskSummary,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhoto,
  PatientPlanCohortSignOffHistory,
  PatientPlanCohortIvfTaskGroup,
  IvfEmbryoGrade,
  PatientPlanCohortIvfTaskEmbryoGroupPhoto,
  PatientPlanCohortIvfTaskExpandedEmbryo,
  PatientPlanCohortIvfTaskExpandedEmbryoBiopsyAttachment,
  PatientPlanCohortIvfTaskDetailsHistory,
  EmbryoType,
  IVFCancellationReason,
  IVFUnitOption,
  IvfTaskToPlanLabInstruction,
  PatientPlanCohortIvfDish,
  IvfDishToIvfTaskGroup,
  IvfDishToPlanAddon,
  IvfDishToPlanType,
  IvfDish,
  IVFDispositionReason,
  PatientPlanCohortEggToThaw,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortIvfTaskSummaryRepository,
  IvfDishBarcodeRepository,
  PatientPlanCohortIvfDishRepository,
  PatientPlanCohortRepository,
  PatientPlanCohortSignOffHistoryRepository,
  PatientPlanCohortIvfTaskDetailsRepository,
  IvfEmbryoGradeRepository,
  PatientPlanCohortIvfTaskEmbryoGroupPhotoRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoBiopsyAttachmentRepository,
  PatientPlanCohortIvfTaskDetailsHistoryRepository,
  IVFCancellationReasonRepository,
  IVFDispositionReasonRepository,
  PatientPlanCohortEggToThawRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {AppointmentLinkedServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm/appointment-linked-service-provider.entity'
import {PatientPlanToEndometrialAssessment} from '../apps/plan/entities/typeorm/patient-plan-to-endometrial-assessment.entity'
import {PatientPlanCohortIvfTaskMatureOocyteGroupPhotoRepository} from '../apps/clinic-ivf/repositories/typeorm/patient-plan-cohort-ivf-task-mature-oocyte-group-photo.repository'
import {PatientPlanCohortIvfTaskExpandedEmbryoRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/patient-plan-cohort-ivf-task-expanded-embryo.repository'
import {LabSyncObservationRequestStatusHistoryRepository} from '../apps/clinic-test/repositories/typeorm/lab-sync-observation-request-status-history.repository'
import {PlanChecklist} from '../apps/plan/entities/typeorm/plan-checklist.entity'
import {PatientPlanChecklistItem} from '../apps/plan/entities/typeorm/patient-plan-checklist-item.entity'
import {PlanChecklistItem} from '../apps/plan/entities/typeorm/plan-checklist-item.entity'
import {PlanChecklistToItem} from '../apps/plan/entities/typeorm/plan-checklist-to-item.entity'
import {TestOrderCommentRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-order-comment.repository'
import {TestOrderComment} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-order-comment.entity'
import {TestOrderStaffActionHistoryRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-order-staff-action-history.repository'
import {TestOrderStaffActionHistory} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-order-staff-action-history.entity'
import {PaymentMethod} from '@libs/data-layer/apps/checkout/entities/typeorm'
import {PaymentMethodRepository} from '@libs/data-layer/apps/checkout/repositories/typeorm/payment-method.repository'
import {PatientPlanChangeNotificationRepository} from '@libs/data-layer/apps/plan/repositories/patient-plan-change-notification.repository'
import {PatientPlanCohortCryoSampleContainers} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-cryo-sample-containers.entity'
import {PatientPlanCohortCryoSampleContainersRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/patient-plan-cohort-cryo-sample-containers.repository'
import {MedicationPredefinedDosageRepository} from '../apps/medication/repositories/medication-predefined-dosage.repository'
import {TestTypeGroupForAnyResult} from '../apps/clinic-test/entities/typeorm/test-type-group-for-any-result.entity'
import {TestTypeGroupForAnyResultTestType} from '../apps/clinic-test/entities/typeorm/test-type-group-for-any-result-test-type.entity'
import {
  GoogleAdConversion,
  GoogleAdConversionSync,
} from '@libs/data-layer/apps/google-ads/entities/typeorm'
import {GoogleAdConversionRepository} from '@libs/data-layer/apps/google-ads/repositories/google-ad-conversion.repository'
import {GoogleAdConversionSyncRepository} from '@libs/data-layer/apps/google-ads/repositories/google-ad-conversion-sync.repository'
import {PlanTypeSheet} from '../apps/plan/entities/typeorm/plan-type-sheet.entity'
import {PatientPlanCohortFrozenEmbryoTransfer} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-frozen-embryo-transfer.entity'
import {PatientPlanCohortFrozenEmbryoTransferRepository} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm/patient-plan-cohort-frozen-embryo-transfer.repository'
import {SchedulingTimeOffBlockRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm/scheduling-time-off-block.repository'
import {PatientPlanLutealSupportItem} from '../apps/plan/entities/typeorm/patient-plan-luteal-support-item.entity'
import {PlanLutealSupportItem} from '../apps/plan/entities/typeorm/plan-luteal-support-item.entity'
import {IvfUnitOptionRepository} from '../apps/clinic-ivf/repositories/typeorm/ivf-unit-option.repository'
import {PatientFertilityIQRepository} from '../apps/clinic-test/repositories/typeorm/patient-fertility-iq.repository'
import {PatientFertilityIQFemaleRepository} from '../apps/clinic-test/repositories/typeorm/patient-fertility-iq-female.repository'
import {PatientFertilityIQTestResultRepository} from '../apps/clinic-test/repositories/typeorm/patient-fertility-iq-test-result.repository'
import {PriorityStatusRepository} from '@libs/data-layer/apps/users/repositories/typeorm/priority-status.repository'
import {PriorityStatus} from '@libs/data-layer/apps/users/entities/typeorm/priority-status.entity'
import {PatientReport} from '@libs/data-layer/apps/clinic-test/entities/typeorm/patient-report.entity'
import {ReportType} from '@libs/data-layer/apps/clinic-test/entities/typeorm/report-type.entity'
import {TestObservationMetadata} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-observations-metadata.entity'
import {TestTypeRange} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-type-range.entity'
import {TestObservationMetadataRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-observation-metadata.repository'
import {TestTypeRangeRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-type-range.repository'
import {PatientReportRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/patient-report.repository'
import {ReportTypeRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/report-type.repository'
import {
  CryoTankRepository,
  CryoCanRepository,
  CryoCaneRepository,
  CryoTankV2Repository,
  CryoCanV2Repository,
  CryoCaneV2Repository,
  CryoSampleDonorRepository,
  CryoSampleContainerRepository,
  CryoInventoryCardRepository,
  CryoVialRepository,
  ReagentRepository,
  MediaLotRepository,
  CryoInventoryCardExternalSampleRepository,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {PaymentReceiptDescriptionItemRepository} from '@libs/data-layer/apps/plan/repositories/payment-receipt-description-item.repository'
import {PaymentReceiptDescriptionItem} from '@libs/data-layer/apps/plan/entities/typeorm/payment-receipt-description-item.entity'
import {PlanTypePaymentReceiptDescriptionItemRepository} from '@libs/data-layer/apps/plan/repositories/plan-type-payment-receipt-description-item-repository.service'
import {DefaultFilterForAppointment} from '../apps/scheduling/entities/typeorm/default-filter-for-appointment.entity'
import {DefaultFilterForAppointmentToColumn} from '../apps/scheduling/entities/typeorm/default-filter-for-appointment-to-column.entity'
import {DefaultFilterForAppointmentToServiceType} from '../apps/scheduling/entities/typeorm/default-filter-for-appointment-to-service-type.entity'
import {DefaultFilterForAppointmentRepository} from '../apps/scheduling/repositories/typeorm/default-filter-for-appointment.repository'
import {DefaultFilterForAppointmentToColumnRepository} from '../apps/scheduling/repositories/typeorm/default-filter-for-appointment-to-column.repository'
import {DefaultFilterForAppointmentToServiceTypeRepository} from '../apps/scheduling/repositories/typeorm/default-filter-for-appointment-to-service-type.repository'
import {TestObservationTypeResultOption} from '../apps/clinic-test/entities/typeorm/test-observation-type-result-option.entity'
import {PatientPlanAlert} from '../apps/plan/entities/typeorm/patient-plan-alert.entity'
import {PatientPlanAlertRepository} from '../apps/plan/repositories/patient-plan-alert.repository'
import {PlanTypeComponentRepository} from '../apps/plan/repositories/plan-type-component.repository'
import {PatientPlanSheetAction} from '../apps/plan/entities/typeorm/patient-plan-sheet-action.entity'
import {PlanSheetAction} from '../apps/plan/entities/typeorm/plan-sheet-action.entity'
import {PlanSheetActionList} from '../apps/plan/entities/typeorm/plan-sheet-action-list.entity'
import {PlanSheetActionListToAction} from '../apps/plan/entities/typeorm/plan-sheet-action-list-action.entity'
import {TestTypeNormalRangeRepository} from '../apps/clinic-test/repositories/typeorm/test-type-normal-range.repository'
import {TestTypeNormalRange} from '../apps/clinic-test/entities/typeorm/test-type-normal-range.entity'
import {EncounterTypeComponent} from '../apps/users/entities/typeorm/encounter-type-component.entity'
import {SpecimenDetailSyncStatusLog} from '../apps/clinic-test/entities/typeorm/specimen-detail-sync-status-log.entity'
import {SpecimenDetailSyncStatusLogRepository} from '../apps/clinic-test/repositories/typeorm/specimen-detail-sync-status-log.repository'
import {PredefinedConsentPackageToModule} from '../apps/users/entities/typeorm/predefined-consent-package-to-module.entity'
import {MedicationConsentModule} from '../apps/medication/entities/typeorm/medication-consent-module.entity'
import {PlanAddonConsentModule} from '../apps/plan/entities/typeorm/plan-addon-consent-module.entity'
import {PlanTypeConsentModule} from '../apps/plan/entities/typeorm/plan-type-consent-module.entity'
import {BillableItem} from '../apps/core/entities/typeorm/billable-item.entity'
import {BillableItemRepository} from '../apps/core/repositories/typeorm/billable-item.repository'
import {PlanTypeSheetTestType} from '../apps/plan/entities/typeorm/plan-type-sheet-test-type.entity'
import {PatientPlanAddon} from '../apps/plan/entities/typeorm/patient-plan-addon.entity'
import {PushNotificationTemplate} from '@libs/data-layer/apps/notification/entities/typeorm/push-notification-template.entity'
import {PushNotificationTemplateRepository} from '@libs/data-layer/apps/notification/repositories/push-notification-template.repository'
import {
  PatientPaymentEstimate,
  PatientPaymentEstimateEmailAttempt,
  PatientPaymentEstimateItem,
} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {SmsTemplateRepository} from '@libs/data-layer/apps/sms/repositories/sms-template.repository'
import {SmsTemplate} from '@libs/data-layer/apps/sms/entities/typeorm'

const repositories = [
  IVFCancellationReasonRepository,
  PaymentMethodRepository,
  PatientPlanCohortIvfTaskDetailsHistoryRepository,
  IvfEmbryoGradeRepository,
  PatientPlanCohortIvfTaskEmbryoGroupPhotoRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoRepository,
  PatientPlanCohortIvfTaskExpandedEmbryoBiopsyAttachmentRepository,
  LabSyncRawDataRepository,
  LabSyncTestResultFieldMatchRepository,
  LabSyncObservationRequestRepository,
  LabSyncObservationRequestStatusHistoryRepository,
  LabSyncObservationResultRepository,
  PatientPlanCohortRepository,
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortSignOffHistoryRepository,
  PatientPlanCohortIvfTaskSummaryRepository,
  TestOrderActionRepository,
  SuperTypeRepository,
  TaskTemplateRepository,
  OhipClaimToCodeRepository,
  OhipClaimRepository,
  MdBillingServiceCodeRepository,
  MdBillingDiagnosticCodeRepository,
  PatientRepository,
  PatientAlertRepository,
  PatientContactFormRepository,
  PatientCustomAlertRepository,
  PatientMilestoneRepository,
  ServiceCategoryRepository,
  ServiceGroupRepository,
  ServiceGroupAvailabilityRepository,
  ServiceGroupToServiceTypeRepository,
  TestOrderStatusHistoryRepository,
  ServiceProviderRepository,
  AnswerOptionRepository,
  PatientQuestionnaireAnswerRepository,
  QuestionRepository,
  QuestionnaireRepository,
  QuestionConstraintRepository,
  ApplicationCodeRepository,
  QuestionnaireToQuestionRepository,
  PaymentOrderRepository,
  PaymentOrderItemRepository,
  ServiceTypeRepository,
  AppointmentRepository,
  SchedulingSlotRepository,
  SchedulingTemplateRepository,
  SchedulingTemplatePeriodRepository,
  PatientEncounterAddendumRepository,
  PatientEncounterRepository,
  PatientEncounterAttachmentRepository,
  PatientEncounterAddendumAttachmentRepository,
  EncounterTypeRepository,

  PatientStaffNoteAddendumRepository,
  PatientStaffNoteRepository,
  PatientStaffNoteAttachmentRepository,
  PatientStaffNoteAddendumAttachmentRepository,
  StaffNoteTypeRepository,
  StaffDefaultRepository,

  AppliedTemplatePeriodRepository,
  PatientPartnerRepository,
  PatientPrescriptionRepository,
  TestResultRepository,
  MedicationRepository,
  TestPanelRepository,
  TestTypeRepository,
  TestResultMeasurementRepository,
  TestResultAttachmentRepository,
  TestResultCommentRepository,
  TestResultStatusHistoryRepository,
  TestResultObUltrasoundRepository,
  LabInfoRepository,
  ProfileTestResultRepository,
  SpecimenRepository,
  SpecimenGroupRepository,
  LabMachineRepository,
  SpecimenTestRepository,
  SpecimenStorageLocationRepository,
  TransportFolderRepository,
  AfterVisitSummaryRepository,
  TestOrderTypeRepository,
  PatientPlanDiscontinuedMedicationRepository,
  TestOrderRepository,
  TestOrderItemRepository,
  TestGroupRepository,
  TestGroupItemRepository,
  TestOrderCancellationReasonRepository,
  TestTypeResultOptionRepository,
  PatientDefaultMilestoneRepository,
  ConsentModuleRepository,
  PredefinedConsentPackageRepository,
  PredefinedConsentPackageToModuleRepository,
  PatientQuestionnaireRepository,
  PatientQuestionnaireToQuestionRepository,
  ConsentModuleToQuestionRepository,
  LibraryContentRepository,
  PatientMilestoneToAppointmentRepository,
  PatientAddressRepository,
  PatientDetailRepository,
  SpecimenIncompletionReasonRepository,
  TaskRepository,
  StaffRepository,
  TaskReassignmentRepository,
  PatientDetailMaleRepository,
  PatientDetailFemaleRepository,
  PatientPastSurgeryRepository,
  PatientFamilyHealthProblemRepository,
  PatientPreviousFertilityTreatmentRepository,
  PatientVitaminSupplementRepository,
  PatientNoteRepository,
  MedicationCategoryRepository,
  MedicationToMedicationCategoryRepository,
  PatientPlanRepository,
  PatientEggFreezingReportRepository,
  AppointmentPartnersRepository,
  PlanCategoryRepository,
  PlanInitialResultRepository,
  PlanMedicationRepository,
  PatientDoctorRepository,
  PatientPushNotificationRepository,
  PatientReferralRepository,
  MilestoneToTestTypeOrPanelRepository,
  SemenVerificationFormRepository,
  SemenVerificationFormRepository,
  PatientPlanSpermSourceRepository,
  PermissionRepository,
  RoleRepository,
  SignatureRepository,
  CatheterTypeRepository,
  PatientPlanStatusRepository,
  PatientScheduledMilestoneRepository,
  TestResultUterusMeasurement,
  TestResultOvaryMeasurementRepository,
  TestResultOvaryCystMeasurementRepository,
  TestResultOHSSOvaryMeasurementRepository,
  TestResultOHSSFluidMeasurementRepository,
  PatientPlanToTestTypeProcedureRepository,
  StaffFeedbackRepository,
  PatientDocumentRepository,
  DocumentCategoryRepository,
  CryoTankRepository,
  CryoCanRepository,
  CryoCaneRepository,
  CryoTankV2Repository,
  CryoCanV2Repository,
  CryoCaneV2Repository,
  CryoSampleDonorRepository,
  CryoSampleContainerRepository,
  CryoInventoryCardRepository,
  CryoVialRepository,
  ReagentRepository,
  MediaLotRepository,
  CryoInventoryCardExternalSampleRepository,
  MilestoneServiceTypeLimitationRepository,
  TestResultUltrasoundFinalReportRepository,
  PatientFullTermDeliveryHistoryRepository,
  PatientPreTermDeliveryHistoryRepository,
  PatientMiscarriageHistoryRepository,
  PatientEctopicPregnancyHistoryRepository,
  PatientAbortionHistoryRepository,
  PatientPlanSheetRepository,
  EmailTemplateRepository,
  SmsTemplateRepository,
  PushNotificationTemplateRepository,
  AppointmentAddonRepository,
  AddonRepository,
  PlanTypeRepository,
  PlanAddonRepository,
  PatientPlanCohortRepository,
  IvfDishBarcodeRepository,
  PatientPlanCohortIvfDishRepository,
  PatientPlanCohortIvfTaskDetailsRepository,
  PatientPlanCohortFrozenEmbryoTransferRepository,
  PatientPlanCohortCryoSampleContainersRepository,
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortIvfTaskSummaryRepository,
  PatientPlanCohortSignOffHistoryRepository,
  PatientPlanAlertRepository,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhotoRepository,
  PatientPlanSheetAdditionalDayRepository,
  PatientPlanLabInstructionRepository,
  PlanLabInstructionRepository,
  PatientPlanChecklistItemRepository,
  PatientPlanChangeNotificationRepository,
  PlanChecklistRepository,
  PlanChecklistItemRepository,
  PatientPlanAddonRepository,
  TestOrderStaffActionHistoryRepository,
  GoogleAdConversionRepository,
  GoogleAdConversionSyncRepository,
  MedicationPredefinedDosageRepository,
  ThyroidProtocolResultRepository,
  ThyroidProtocolResultNoteRepository,
  SchedulingTimeOffBlockRepository,
  PlanLutealSupportItemRepository,
  PatientPlanLutealSupportItemRepository,
  AppointmentMetadataRepository,
  DefaultFilterForAppointmentRepository,
  DefaultFilterForAppointmentToColumnRepository,
  DefaultFilterForAppointmentToServiceTypeRepository,
  DefaultFilterForAppointmentToPatientStatusRepository,
  DefaultFilterForAppointmentToServiceProviderRepository,
  IvfUnitOptionRepository,
  ProfileAlertRepository,
  PatientProfileAlertRepository,
  PatientCommonRepository,
  PatientFertilityIQRepository,
  PatientFertilityIQFemaleRepository,
  PatientFertilityIQTestResultRepository,
  PriorityStatusRepository,
  TestObservationMetadataRepository,
  TestTypeRangeRepository,
  TestTypeNormalRangeRepository,
  PatientReportRepository,
  ReportTypeRepository,
  PaymentReceiptDescriptionItemRepository,
  PlanTypePaymentReceiptDescriptionItemRepository,
  BulkDownloadRequestRepository,
  BulkDownloadRequestItemRepository,
  TestTypeConfigurationRepository,
  PatientFeedbackFormRepository,
  TestResultObservationRepository,
  PlanTypeComponentRepository,
  PlanSheetActionRepository,
  PatientPlanSheetActionRepository,
  SchedulingTimeOffBlockPeriodRepository,
  ExternalDoctorRepository,
  PatientCryoSubscription,
  PatientCryoSubscriptionEvent,
  SpecimenDetailSyncStatusLogRepository,
  PatientConsentPackageRepository,
  PatientConsentModuleRepository,
  PatientConsentPackageSignatoryRepository,
  TestResultSonoDetailRepository,
  IVFDispositionReasonRepository,
  PatientPlanCohortEggToThawRepository,
  BillableItemRepository,
  PatientPaymentEstimateRepository,
  PatientPaymentEstimateEmailAttemptRepository,
  PatientPaymentEstimateItemRepository,
]

const entities = [
  IVFCancellationReason,
  PaymentMethod,
  PatientPlanCohortIvfTaskDetailsHistory,
  IvfEmbryoGrade,
  PatientPlanCohortIvfTaskEmbryoGroupPhoto,
  PatientPlanCohortIvfTaskExpandedEmbryo,
  PatientPlanCohortIvfTaskExpandedEmbryoBiopsyAttachment,
  LabSyncRawData,
  LabSyncTestResultFieldMatch,
  LabSyncObservationRequest,
  LabSyncObservationRequestStatusHistory,
  LabSyncObservationResult,
  TestOrderAction,
  SuperType,
  TaskTemplate,
  PatientAdhocPayment,
  MdBillingDiagnosticCode,
  MdBillingServiceCode,
  OhipClaim,
  OhipClaimToCode,
  ServiceTypeToServiceCode,
  PatientFamilyHealthProblem,
  Patient,
  PatientAlert,
  PatientContactForm,
  PatientCustomAlert,
  PatientQuestionnaireAnswer,
  ServiceCategory,
  ServiceGroup,
  ServiceGroupAvailability,
  ServiceProvider,
  AnswerOption,
  Question,
  Questionnaire,
  QuestionConstraint,
  ApplicationCode,
  QuestionnaireToQuestion,
  Appointment,
  ServiceType,
  PaymentOrder,
  PaymentOrderItem,
  SchedulingSlot,
  SchedulingTemplate,
  SchedulingTemplatePeriod,
  PatientEncounterAddendum,
  PatientEncounter,
  EncounterType,
  PatientEncounterAttachment,
  PatientEncounterAddendumAttachment,
  EncounterType,

  PatientStaffNoteAddendum,
  StaffNoteType,
  PatientStaffNote,
  PatientStaffNoteAttachment,
  PatientStaffNoteAddendumAttachment,
  StaffDefault,

  PatientPartner,
  AppliedSchedulingTemplatePeriod,
  Introduction,
  ServiceGroupToServiceType,
  ServiceTypeConstraint,
  ServiceGroupToApplicationCode,
  ServiceProviderToServiceType,
  PatientDetail,
  PatientMedication,
  TestResult,
  Specimen,
  SpecimenGroup,
  LabMachine,
  LabInfo,
  ProfileTestResult,
  TestPanel,
  TestPanelToTestType,
  TestResultAttachment,
  TestResultMeasurement,
  TestResultComment,
  TestResultObUltrasound,
  TestType,
  CareTeam,
  AppointmentPartner,
  PatientPrescription,
  Pharmacy,
  ServiceProviderGroup,
  Medication,
  MedicationInstruction,
  PatientToServiceProvider,
  MedicationInstructionStep,
  PatientDetailFemale,
  PatientDetailMale,
  PatientPastSurgery,
  PatientPreviousFertilityTreatment,
  PatientVitaminSupplement,
  PatientNote,
  PatientPreTermDeliveryHistory,
  PatientFullTermDeliveryHistory,
  PatientMiscarriageHistory,
  PatientEctopicPregnancyHistory,
  PatientAbortionHistory,
  SpecimenTest,
  SpecimenStorageLocation,
  TransportFolder,
  AfterVisitSummary,
  PatientMilestone,
  TestOrderStatusHistory,
  TestOrderType,
  TestOrder,
  TestOrderItem,
  TestGroup,
  TestGroupItem,
  TestOrderCancellationReason,
  TestTypeResultOption,
  PatientDefaultMilestone,
  ConsentModule,
  PredefinedConsentPackage,
  PredefinedConsentPackageToModule,

  PatientQuestionnaire,
  PatientQuestionnaireToQuestion,
  ConsentModuleToQuestion,

  LibraryContent,
  PatientAlert,
  PatientMilestoneToAppointment,
  PatientAddress,
  SpecimenIncompletionReason,
  Task,
  Staff,
  TaskReassignment,
  MedicationCategory,
  MedicationToMedicationCategory,
  PatientPlan,
  PlanCategory,
  PlanInitialResult,
  PatientPlanStatus,
  PlanMedication,
  PlanType,
  PatientDoctor,
  PatientPushNotification,
  PatientReferral,
  SemenVerificationForm,
  MilestoneToTestTypeOrPanel,
  Permission,
  Role,
  AutomatedTask,
  CatheterType,
  Signature,
  TestResultOvaryMeasurement,
  TestResultOvaryCystMeasurement,
  PatientPlanToTestTypeProcedure,
  PatientScheduledMilestone,
  StaffFeedback,
  PatientDocument,
  DocumentCategory,
  CryoTank,
  CryoCan,
  CryoCane,
  CryoTankV2,
  CryoCanV2,
  CryoCaneV2,
  CryoSampleDonor,
  CryoSampleContainer,
  CryoInventoryCard,
  CryoInventoryCardExternalSample,
  CryoVial,
  CryoDiscardReason,
  Reagent,
  MediaLot,
  MilestoneServiceTypeLimitation,
  TestResultUterusMeasurement,
  TestResultUltrasoundFinalReport,
  PatientPlanDiscontinuedMedication,
  PatientPlanSheet,
  EmailTemplate,
  SmsTemplate,
  PushNotificationTemplate,
  Addon,
  AppointmentAddon,
  TestResultStatusHistory,
  PatientPlanDetail,
  PatientPlanSpermSource,
  PlanTypeToAutomatedTask,
  PlanAddon,
  IvfTaskToDayToPlanType,
  IvfTaskToDay,
  PatientPlanCohort,
  IvfDishBarcode,
  PatientPlanCohortIvfDish,
  IvfDishToIvfTaskGroup,
  IvfDishToPlanAddon,
  IvfDishToPlanType,
  IvfDish,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskSummary,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhoto,
  PatientPlanCohortSignOffHistory,
  PatientPlanCohortIvfTaskGroup,
  AppointmentLinkedServiceProvider,
  AppointmentMetadata,
  DefaultFilterForAppointment,
  DefaultFilterForAppointmentToColumn,
  DefaultFilterForAppointmentToServiceType,
  PatientPlanToEndometrialAssessment,
  PatientPlanSheetAdditionalDay,
  PatientPlanLabInstruction,
  PatientPlanAlert,
  PlanLabInstruction,
  PlanChecklist,
  PlanChecklistItem,
  PlanChecklistToItem,
  PatientPlanChecklistItem,
  TestOrderCommentRepository,
  TestOrderComment,
  PatientPlanGeneticTesting,
  PatientPlanEmbryoTypeTransferInstruction,
  EmbryoType,
  TestOrderStaffActionHistory,
  MedicationPredifinedDosage,
  PlanTypeComponent,
  PlanTypeHeading,
  PlanTypeComponentMedicationCategory,
  PlanTypeComponentTestType,
  PatientPlanChangeNotificationEntity,
  PatientPlanCohortCryoSampleContainers,
  IVFDispositionReason,
  PatientPlanCohortEggToThaw,
  PatientPlanCohortFrozenEmbryoTransfer,
  TestTypeGroupForAnyResult,
  TestTypeGroupForAnyResultTestType,
  GoogleAdConversion,
  GoogleAdConversionSync,
  PlanTypeSheet,
  TestResultOHSSOvaryMeasurement,
  TestResultOHSSFluidMeasurement,
  ThyroidProtocolResult,
  ThyroidProtocolResultNote,
  SchedulingTimeOffBlock,
  PlanLutealSupportItem,
  PatientPlanLutealSupportItem,
  IVFUnitOption,
  ProfileAlert,
  PatientProfileAlert,
  PatientFertilityIQ,
  PatientFertilityIQFemale,
  PatientFertilityIQTestResult,
  PatientEggFreezingReport,
  IvfTaskToPlanLabInstruction,
  PriorityStatus,
  PatientReport,
  ReportType,
  TestObservationMetadata,
  TestTypeRange,
  TestTypeNormalRange,
  PaymentReceiptDescriptionItem,
  PlanTypePaymentReceiptDescriptionItem,
  TestTypeConfiguration,
  BulkDownloadRequest,
  BulkDownloadRequestItem,
  PatientFeedbackForm,
  TestObservationType,
  TestResultObservation,
  TestTypeObservationType,
  TestObservationTypeResultOption,
  PatientPlanSheetAction,
  PlanSheetAction,
  PlanSheetActionList,
  PlanSheetActionListToAction,
  SchedulingTimeOffBlockPeriod,
  DefaultFilterForAppointmentToServiceProvider,
  DefaultFilterForAppointmentToPatientStatus,
  ExternalDoctor,
  PatientCryoSubscriptionRepository,
  PatientCryoSubscriptionEventRepository,
  EncounterTypeComponent,
  SpecimenDetailSyncStatusLog,
  MedicationConsentModule,
  PlanAddonConsentModule,
  PlanTypeConsentModule,
  PatientConsentPackage,
  PatientConsentModule,
  PatientConsentPackageSignatory,
  TestResultSonoDetail,
  BillableItem,
  PlanTypeSheetTestType,
  PatientPlanAddon,
  PatientPaymentEstimate,
  PatientPaymentEstimateEmailAttempt,
  PatientPaymentEstimateItem,
]

export const TypeORMConfiguration = TypeOrmModule.forFeature([...repositories, ...entities])
