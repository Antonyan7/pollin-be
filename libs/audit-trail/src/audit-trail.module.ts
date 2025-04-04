import {Module} from '@nestjs/common'
import {
  PatientAbortionHistoryRepository,
  PatientAddressRepository,
  PatientAdhocPaymentRepository,
  PatientDetailFemaleRepository,
  PatientDetailMaleRepository,
  PatientDetailRepository,
  PatientDoctorRepository,
  PatientEctopicPregnancyHistoryRepository,
  PatientFamilyHealthProblemRepository,
  PatientFullTermDeliveryHistoryRepository,
  PatientMedicationRepository,
  PatientMiscarriageHistoryRepository,
  PatientPastSurgeryRepository,
  PatientPreTermDeliveryHistoryRepository,
  PatientPreviousFertilityTreatmentRepository,
  PatientRepository,
  PatientVitaminSupplementRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {
  AuditTrailPubSubService,
  ClinicBillingAuditTrailService,
  CryoPreservationAuditTrailService,
  PatientAppointmentAuditTrailService,
  PatientAuditTrailService,
  PatientReportAuditTrailService,
  PatientFertilityIQAuditTrailService,
  PaymentOrderAuditTrailService,
} from '@libs/audit-trail/services'
import {NestprojectConfigService} from '@libs/common'
import {DataLayerModule} from '@libs/data-layer'
import {
  StaffRepository,
  TaskRepository,
} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import {PatientPlanAuditTrailService} from './services/patient-plan-audit-trail.service'
import {
  PatientPlanRepository,
  PlanInitialResultRepository,
  PlanMedicationRepository,
} from '@libs/data-layer/apps/plan/repositories'
import {PatientPlanToTestTypeProcedureRepository} from '@libs/data-layer/apps/plan/repositories/patient-plan-to-test-type-procedure.repository'
import {PatientOrderAndResultAuditTrailService} from './services/patient-order-and-result-audit-trail.service'
import {
  SpecimenRepository,
  SpecimenTestRepository,
  TestOrderItemRepository,
  TestOrderRepository,
  TestResultAttachmentRepository,
  TestResultMeasurementRepository,
  TestResultOvaryMeasurementRepository,
  TestResultRepository,
  TestResultUltrasoundFinalReportRepository,
  TestResultUterusMeasurementRepository,
  TransportFolderRepository,
  TestResultObUltrasoundRepository,
  TestResultOvaryCystMeasurementRepository,
  TestResultOHSSFluidMeasurementRepository,
  TestResultOHSSOvaryMeasurementRepository,
  PatientReportRepository,
  PatientFertilityIQRepository,
  PatientFertilityIQFemaleRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {
  AppointmentAddonRepository,
  AppointmentRepository,
} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {SchedulingAuditTrailService} from './services/scheduling-audit-trail.service'
import {PatientMedicationAuditTrailService} from './services/patient-medication-audit-trail.service'
import {PatientPrescriptionRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient-prescription.repository'
import {StaffAuditTrailService} from './services/staff-audit-trail.service'
import {
  OhipClaimRepository,
  OhipClaimToCodeRepository,
} from '@libs/data-layer/apps/clinic-billing/repositories'
import {PaymentOrderRepository} from '@libs/data-layer/apps/checkout/repositories/typeorm/payment-order.repository'
import {PaymentOrderItemRepository} from '@libs/data-layer/apps/checkout/repositories/typeorm/payment-order-item.repository'
import {AppointmentAddonAuditTrailService} from '@libs/audit-trail/services/appointment-addon-audit-trail.service'
import {TestOrderCommentRepository} from '@libs/data-layer/apps/clinic-test/repositories/typeorm/test-order-comment.repository'
import {
  CryoInventoryCardRepository,
  CryoSampleContainerRepository,
  CryoSampleDonorRepository,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/repositories/typeorm'
import {PatientConsentAuditTrailService} from './services/patient-consent-audit-trail.service'
import {PharmacyRepository} from '@libs/data-layer/apps/users/repositories/typeorm/pharmacy.repository'

@Module({
  imports: [DataLayerModule],
  providers: [
    OhipClaimRepository,
    PatientAbortionHistoryRepository,
    PatientAddressRepository,
    PatientDetailFemaleRepository,
    PatientDetailMaleRepository,
    PatientDetailRepository,
    PatientEctopicPregnancyHistoryRepository,
    PatientFamilyHealthProblemRepository,
    PatientFullTermDeliveryHistoryRepository,
    PatientMiscarriageHistoryRepository,
    PatientPreTermDeliveryHistoryRepository,
    PatientRepository,
    PatientDoctorRepository,
    PatientPastSurgeryRepository,
    PatientPreviousFertilityTreatmentRepository,
    PatientVitaminSupplementRepository,
    PatientMedicationRepository,
    PatientPlanRepository,
    PatientPlanToTestTypeProcedureRepository,
    PatientPrescriptionRepository,
    PlanInitialResultRepository,
    PlanMedicationRepository,
    NestprojectConfigService,
    StaffRepository,
    TestResultRepository,
    TestResultMeasurementRepository,
    TestResultAttachmentRepository,
    AppointmentRepository,
    SpecimenRepository,
    SpecimenTestRepository,
    TransportFolderRepository,
    TestOrderRepository,
    TestOrderItemRepository,
    AuditTrailPubSubService,
    TestResultUterusMeasurementRepository,
    TestResultOvaryMeasurementRepository,
    TestResultUltrasoundFinalReportRepository,
    AppointmentAddonRepository,
    TestResultObUltrasoundRepository,
    TaskRepository,
    OhipClaimToCodeRepository,
    PatientAuditTrailService,
    PatientPlanAuditTrailService,
    PatientOrderAndResultAuditTrailService,
    SchedulingAuditTrailService,
    PatientAppointmentAuditTrailService,
    PatientMedicationAuditTrailService,
    StaffAuditTrailService,
    ClinicBillingAuditTrailService,
    AppointmentAddonAuditTrailService,
    PaymentOrderAuditTrailService,
    PaymentOrderRepository,
    PaymentOrderItemRepository,
    PatientAdhocPaymentRepository,
    TestResultOvaryCystMeasurementRepository,
    CryoInventoryCardRepository,
    CryoSampleContainerRepository,
    CryoSampleDonorRepository,
    CryoPreservationAuditTrailService,
    TestOrderCommentRepository,
    TestResultOHSSFluidMeasurementRepository,
    TestResultOHSSOvaryMeasurementRepository,
    PatientReportRepository,
    PatientReportAuditTrailService,
    PatientFertilityIQRepository,
    PatientFertilityIQFemaleRepository,
    PatientFertilityIQAuditTrailService,
    PatientConsentAuditTrailService,
    PharmacyRepository,
  ],
  exports: [
    PaymentOrderAuditTrailService,
    AuditTrailPubSubService,
    PatientAuditTrailService,
    PatientPlanAuditTrailService,
    PatientOrderAndResultAuditTrailService,
    PatientAppointmentAuditTrailService,
    SchedulingAuditTrailService,
    PatientMedicationAuditTrailService,
    StaffAuditTrailService,
    AppointmentAddonAuditTrailService,
    ClinicBillingAuditTrailService,
    CryoPreservationAuditTrailService,
    PatientReportAuditTrailService,
    PatientFertilityIQAuditTrailService,
    PatientConsentAuditTrailService,
  ],
})
export class AuditTrailModule {}
