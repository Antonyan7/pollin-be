import {PubSubAdapter} from '@libs/common/adapters'
import {NestprojectConfigService, StructuredLogger} from '@libs/common'
import {
  CreatePatientAndAppointmentPayload,
  CreatePatientAndAppointmentSchema,
} from '../model/proto-schemas/create-patient-and-appointment.schema'
import {
  MedicationAddedPubSubPayload,
  MedicationAddedSchema,
} from '../model/proto-schemas/medication-added.schema'
import {
  AuditTrailPubSubPayload,
  AuditTrailSchema,
} from '@libs/common/model/proto-schemas/audit-trail.schema'
import {
  PaymentAlertCreatedPubSubPayload,
  PaymentAlertCreatedSchema,
} from '../model/proto-schemas/payment-alert-created.schema'
import {
  TestOrderMilestonesCreatedPubSubPayload,
  TestOrderMilestonesCreatedSchema,
} from '../model/proto-schemas/test-order-milestones-created.schema'
import {HistoryUserType} from '@libs/common/enums'
import {getAuditTrailRequestMetadata} from '@libs/services-common/helpers/async-hook'
import {
  MedicationsDiscontinuedPubSubPayload,
  MedicationsDiscontinuedSchema,
} from '../model/proto-schemas/medications-discontinued.schema'
import {
  QuestionAnswerSubmittedPubsubPayload,
  QuestionAnswerSubmittedSchema,
} from '../model/proto-schemas/question-answer-submitted.schema.'
import {
  PatientMilestoneIdPubSubPayload,
  PatientMilestoneIdSchema,
} from '../model/proto-schemas/patient-milestone-id.schema'
import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {
  TestResultUpdatedPubSubPayload,
  TestResultUpdatedSchema,
} from '../model/proto-schemas/test-result-updated.schema'
import {
  AppointmentsCreatedPubSubPayload,
  AppointmentsCreatedSchema,
} from '../model/proto-schemas/appointment-created.schema'
import {
  GoogleAdsConversionPayload,
  GoogleAdsConversionSchema,
} from '../model/proto-schemas/google-ads-conversion.schema'
import {
  PatientContactInformationUpdatedPayload,
  PatientContactInformationUpdatedSchema,
} from '../model/proto-schemas/patient-contact-information-updated.schema'
import {PlanPeriodReportedSchema} from '../model/proto-schemas/plan-period-reported.schema'
import {
  GenerateSpecimenPubSubPayload,
  GenerateSpecimenSchema,
} from '@libs/common/model/proto-schemas/generata-specimen.schema'
import {PlanPaidSchema} from '@libs/common/model/proto-schemas/plan-paid.schema'
import {GenerateTestResultPubSubPayload} from '../model/proto-schemas/generate-test-result.schema'
import {
  AppointmentPayload,
  AppointmentUpdatedPubSubPayload,
  AppointmentUpdatedSchema,
} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {
  FertilityIQReleasedPubSubPayload,
  FertilityIQReleasedSchema,
} from '@libs/common/model/proto-schemas/fertility-iq-released.schema'
import {
  SendFeedbackToClinicTeamPayload,
  SendFeedbackToClinicTeamPayloadSchema,
} from '@libs/common/model/proto-schemas/send-patient-feedback.schema'
import {
  StripeCryoSubscriptionEventProcessedPayload,
  StripeCryoSubscriptionEventProcessedSchema,
} from '../model/proto-schemas/stripe-cryo-subscription-event-processed.schema'
import {
  PatientSampleUpdatedPayload,
  PatientSampleUpdatedSchema,
} from '../model/proto-schemas/patient-sample-updated.schema'
import {
  PartnerInvitationUpdatePubSubPayload,
  PartnerInvitationUpdatedSchema,
} from '@libs/common/model/proto-schemas/partner-invitation-updated.schema'
import {
  IvfTaskSignedPayload,
  IvfTaskSignedSchema,
} from '../model/proto-schemas/ivf-task-signed.schema'
import * as activityLogs from '../enums/active-logs'
import {
  ConsentPackageUpdatedPayload,
  ConsentPackageUpdatedSchema,
} from '../model/proto-schemas/consent-package-updated.schema'
import {
  ConsentPackageSentPayload,
  ConsentPackageSentSchema,
} from '../model/proto-schemas/consent-package-created.schema'
import {
  SendBookingRequestReminderPayload,
  SendBookingRequestReminderSchema,
} from '../model/proto-schemas/send-booking-request-reminder.schema'
import {
  GenerateExternalTestResultRequestedPubSubPayload,
  GenerateExternalTestResultRequestedSchema,
} from '../model/proto-schemas/generate-external-test-result-requested.schema'

async function publishAppointmentUpdated(
  payload: {
    oldAppointment: AppointmentPayload
    newAppointment: AppointmentPayload
    authUserFullName: string
    authUserType: HistoryUserType
  },
  appointmentId: number,
  authUserId: string,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_APPOINTMENT_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  const message: AppointmentUpdatedPubSubPayload = {
    ...payload,
    authUserId,
    appointmentId,
    revisionId: null,
    ...reqMetadata,
  }
  await pubSubAdapter.publishWithSchema<AppointmentUpdatedPubSubPayload>(
    message,
    AppointmentUpdatedSchema,
  )
}

async function publishPatientFeedbackCreated(
  patientFeedbackId: number,
  authUserId: string,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_FEEDBACK_SUBMITTED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  const message: SendFeedbackToClinicTeamPayload = {
    patientFeedbackId,
    authUserId,
    ...reqMetadata,
  }
  await pubSubAdapter.publishWithSchema<SendFeedbackToClinicTeamPayload>(
    message,
    SendFeedbackToClinicTeamPayloadSchema,
  )
}

async function publishAppointmentsCreated(payload: {
  appointmentIds: number[]
  authUserId: string
  authUserFullName: string
  authUserType: HistoryUserType
}): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_APPOINTMENTS_CREATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  const message: AppointmentsCreatedPubSubPayload = {
    ...payload,
    revisionId: null,
    ...reqMetadata,
  }
  await pubSubAdapter.publishWithSchema<AppointmentsCreatedPubSubPayload>(
    message,
    AppointmentsCreatedSchema,
  )
}

async function publishCreatePatientAndAppointment(
  payload: {
    patientUUID: string
    serviceProviderUUID: string
    date: string
  },
  authUserId: string,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_AND_APPOINTMENT_CREATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  const message: CreatePatientAndAppointmentPayload = {
    ...payload,
    ...reqMetadata,
    authUserId,
  }
  await pubSubAdapter.publishWithSchema<CreatePatientAndAppointmentPayload>(
    message,
    CreatePatientAndAppointmentSchema,
  )
}

async function publishPatientContactInformationUpdated(
  payload: {
    patientId: number
    prevFirstName?: string
    prevLastName?: string
    prevDateOfBirth?: string
  },
  authUserId: string,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_CONTACT_INFORMATION_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  const message: PatientContactInformationUpdatedPayload = {
    ...payload,
    authUserId,
    ...reqMetadata,
  }
  await pubSubAdapter.publishWithSchema<PatientContactInformationUpdatedPayload>(
    message,
    PatientContactInformationUpdatedSchema,
  )
}

async function publishPlanWasPaid(payload: {
  patientPlanId: number
  paymentOrderId: number
  paymentAmount: number
  patientId: number
  dateTime: string
}): Promise<void> {
  const {patientPlanId, paymentOrderId, paymentAmount, patientId, dateTime} = payload
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PLAN_PAID')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(
    {patientPlanId, paymentOrderId, paymentAmount, patientId, dateTime},
    PlanPaidSchema,
  )
}

async function publishFertilityIQReleased(
  patientReportUUID: string,
  patientUUID: string,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_FERTILITY_IQ_RELEASED')
  const pubSubAdapter = new PubSubAdapter(topic)

  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<FertilityIQReleasedPubSubPayload>(
    {patientReportUUID, patientUUID, ...reqMetadata},
    FertilityIQReleasedSchema,
  )
}

async function publishPlanPeriodReported(patientPlanId: number, patientId: number): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PLAN_PERIOD_REPORTED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema({patientPlanId, patientId}, PlanPeriodReportedSchema)
}

async function publishMedicationUpdated(payload: MedicationAddedPubSubPayload): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_MEDICATION_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, MedicationAddedSchema)
}

async function publishMedicationAdded(payload: MedicationAddedPubSubPayload): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_MEDICATION_ADDED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, MedicationAddedSchema)
}

async function publishPaymentAlertCreated(
  payload: PaymentAlertCreatedPubSubPayload,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PAYMENT_ALERT_CREATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, PaymentAlertCreatedSchema)
}

async function publishTestOrderMilestonesCreated(
  payload: TestOrderMilestonesCreatedPubSubPayload,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_TEST_ORDER_MILESTONES_CREATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, TestOrderMilestonesCreatedSchema)
}

async function publishEmrDataChanged(payload: AuditTrailPubSubPayload): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_EMR_DATA_CHANGED')
  const pubSubAdapter = new PubSubAdapter(topic)

  if (!payload?.authUserId) {
    StructuredLogger.error(
      activityLogs.AuditTrailFunctions.AuditTrailHandler,
      activityLogs.AuditTrailActions.AuditTrailFailed,
      {
        message:
          'authUserId is missing for publishEmrDataChanged function. Audit trail publish failed.',
        errMsg: JSON.stringify({...payload, latestData: null}), // Hide PII
      },
    )

    return
  }

  await pubSubAdapter.publishWithSchema(payload, AuditTrailSchema)
}

async function publishPatientMedicationsDiscontinued(
  payload: MedicationsDiscontinuedPubSubPayload,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_MEDICATION_DISCONTINUED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, MedicationsDiscontinuedSchema)
}

async function publishQuestionAnswerSubmitted(
  payload: QuestionAnswerSubmittedPubsubPayload,
  configTopic: string,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>(configTopic)
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, QuestionAnswerSubmittedSchema)
}

async function publishReportPeriodMilestonePushed(
  payload: PatientMilestoneIdPubSubPayload,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_REPORT_PERIOD_MILESTONE_PUSHED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, PatientMilestoneIdSchema)
}

async function publishTestResultUpdated(
  testResultId: number,
  testResultPrevStatus: TestResultStatus,
  testResultNewStatus: TestResultStatus,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_TEST_RESULT_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)

  await pubSubAdapter.publishWithSchema<TestResultUpdatedPubSubPayload>(
    {
      testResultId,
      testResultPrevStatus,
      testResultNewStatus,
    },
    TestResultUpdatedSchema,
  )
}

async function publishSpecimenGeneration(payload: {
  appointmentId: number
  authUserId: string
}): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_GENERATE_SPECIMEN')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  const message: GenerateSpecimenPubSubPayload = {
    ...payload,
    revisionId: null,
    ...reqMetadata,
  }
  await pubSubAdapter.publishWithSchema<GenerateSpecimenPubSubPayload>(
    message,
    GenerateSpecimenSchema,
  )
}
async function publishTestResultGeneration(payload: {
  appointmentId: number
  authUserId: string
}): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_GENERATE_TEST_RESULT_REQUESTED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  const message: GenerateTestResultPubSubPayload = {
    ...payload,
    revisionId: null,
    ...reqMetadata,
  }
  await pubSubAdapter.publishWithSchema<GenerateTestResultPubSubPayload>(
    message,
    GenerateSpecimenSchema,
  )
}

async function publishAdsConversion(payload: GoogleAdsConversionPayload): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_ADS_CONVERSION')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(payload, GoogleAdsConversionSchema)
}

async function publishCryoSubscriptionEventProcessed(
  payload: Partial<StripeCryoSubscriptionEventProcessedPayload>,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_STRIPE_CRYO_SUBSCRIPTION_EVENT_PROCESSED')
  const pubSubAdapter = new PubSubAdapter(topic)
  await pubSubAdapter.publishWithSchema(
    {
      authUserId: 'System',
      requestId: 'N/A',
      ipAddress: 'N/A',
      deviceId: 'N/A',
      revisionId: null,
      cryoSubscriptionId: payload.cryoSubscriptionId,
      actionType: payload.actionType,
      paymentOrderId: payload?.paymentOrderId || null,
    },
    StripeCryoSubscriptionEventProcessedSchema,
  )
}

async function publishPatientSampleUpdated(patientId: number): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_SAMPLE_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<PatientSampleUpdatedPayload>(
    {patientId, ...reqMetadata},
    PatientSampleUpdatedSchema,
  )
}

async function publishPartnerInvitationUpdated(invitationId: number): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PARTNER_INVITATION_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<PartnerInvitationUpdatePubSubPayload>(
    {invitationId, ...reqMetadata},
    PartnerInvitationUpdatedSchema,
  )
}

async function publishIvfTaskSigned(patientPlanCohortIvfTaskGroupId: number): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_IVF_TASK_SIGNED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<IvfTaskSignedPayload>(
    {patientPlanCohortIvfTaskGroupId, ...reqMetadata},
    IvfTaskSignedSchema,
  )
}

async function publishPatientConsentPackageUpdated(patientConsentPackageId: number): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_CONSENT_PACKAGE_UPDATED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<ConsentPackageUpdatedPayload>(
    {patientConsentPackageId, ...reqMetadata},
    ConsentPackageUpdatedSchema,
  )
}
/** Indicates either package created or milestoneCreated for next partner - to send notifications */
async function publishPatientConsentPackageSent(
  patientConsentPackageId: number,
  signingPatientId: number,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_PATIENT_CONSENT_PACKAGE_SENT')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<ConsentPackageSentPayload>(
    {patientConsentPackageId, signingPatientId, ...reqMetadata},
    ConsentPackageSentSchema,
  )
}

async function publishSendBookingRequestReminder(milestoneId: number): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_SEND_BOOKING_REQUEST_REMINDER')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<SendBookingRequestReminderPayload>(
    {milestoneId, isScheduledExecution: false, ...reqMetadata},
    SendBookingRequestReminderSchema,
  )
}

async function publishExternalAppointmentResultGenerationRequested(
  payload: {appointmentId: number; orderActionEncodedIdentifier: string},
  authUserId: string,
): Promise<void> {
  const configService = NestprojectConfigService.getInstance()
  const topic = configService.get<string>('TOPIC_GENERATE_EXTERNAL_TEST_RESULT_REQUESTED')
  const pubSubAdapter = new PubSubAdapter(topic)
  const reqMetadata = getAuditTrailRequestMetadata()

  await pubSubAdapter.publishWithSchema<GenerateExternalTestResultRequestedPubSubPayload>(
    {
      ...payload,
      ...reqMetadata,
      authUserId,
    },
    GenerateExternalTestResultRequestedSchema,
  )
}

const PubSubHelpers = {
  publishAppointmentUpdated,
  publishPatientFeedbackCreated,
  publishPlanWasPaid,
  publishPaymentAlertCreated,
  publishTestOrderMilestonesCreated,
  publishPlanPeriodReported,
  publishMedicationUpdated,
  publishMedicationAdded,
  publishEmrDataChanged,
  publishPatientMedicationsDiscontinued,
  publishQuestionAnswerSubmitted,
  publishReportPeriodMilestonePushed,
  publishTestResultUpdated,
  publishCreatePatientAndAppointment,
  publishPatientContactInformationUpdated,
  publishAppointmentsCreated,
  publishSpecimenGeneration,
  publishTestResultGeneration,
  publishFertilityIQReleased,
  publishAdsConversion,
  publishCryoSubscriptionEventProcessed,
  publishPatientSampleUpdated,
  publishPartnerInvitationUpdated,
  publishIvfTaskSigned,
  publishPatientConsentPackageUpdated,
  publishPatientConsentPackageSent,
  publishSendBookingRequestReminder,
  publishExternalAppointmentResultGenerationRequested,
}

export default PubSubHelpers
