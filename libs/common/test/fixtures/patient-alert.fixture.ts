import {PatientAlert} from '@libs/data-layer/apps/users/entities/typeorm/patient-alert.entity'
import {PatientAlertType} from '@libs/services-common/enums/patient.enum'
import {
  cartPatientFixture,
  milestoneDetailsPatientFixture,
  milestonePatientFixture,
  patientBookedAppointmentCartFixture,
  patientEmailVerifiedFixture,
  patientForAdhocPaymentFixture,
  patientForArchivedAdhocPaymentFixture,
  patientForPatientUpdateFixture,
  patientForProfileDoctorsFixture,
  patientJourneyFixture,
  patientQuestionnaireControllerFixture,
  patientForQuestionnaireFixture,
  patientWithoutDoctorSoftDeletedFixture,
  patientWithQuestionnaireIntentAnswersFixture,
  patientForLinkedBillsFixture,
  patientForLinkedItemAdhocCheckoutFixture,
  patientForPrescriptionUpdateFixture,
} from './patient.fixture'
import {
  patientMilestonesConfirmRequiredActionFixture,
  patientMilestonesFixture,
} from '@libs/common/test/fixtures/patient-milestone.fixture'
import {
  questionnaireForStaticAnswerConstraintFixture,
  questionnaireWithAnswersFixture,
  questionnaireWithPatientIntakeFemaleCompletedFixture,
} from './questionnaire.fixture'
import {
  appointmentForAdhocCheckoutFixture,
  appointmentForBookedAppointmentCheckoutFixture,
  appointmentForPaymentAlertPendingFixture,
  appointmentForProcedureServiceTypeFixture,
  appointmentForReferralWithOhipReferralRequiredFixture,
  appointmentForRequiredActionMilestoneFixture,
  appointmentForRequiredActionMilestoneMoreThan72HoursFixture,
  appointmentForStimSheetWithoutEncounterLinkFixture,
} from './appointment.fixture'
import {
  patientPrescriptionForCreateCart,
  patientPrescriptionForPDFCreationFixture,
  patientPrescriptionPrescribedStatusFixture,
  patientPrescriptionForAdhocCheckoutFixture,
  patientPrescriptionForDetailsExternalTypeFixture,
} from './patient-prescription.fixture'
import {milestonePatientReportsFixture} from '@libs/common/test/fixtures/patient-report.fixture'
import {patientPlanWireTransferFixture} from '@libs/common/test/fixtures/patient-plan.fixture'

export const patientAlertInvitePartnersFixture: Partial<PatientAlert> = {
  id: 1,
  uuid: 'patientInvitePartnersAlert',
  type: PatientAlertType.InvitePartners,
  patientId: patientEmailVerifiedFixture.id,
}

export const patientAlertMilestoneInvitePartnerFixture: Partial<PatientAlert> = {
  id: 2,
  uuid: 'InvitePartner',
  type: PatientAlertType.InvitePartners,
  patientId: milestoneDetailsPatientFixture.id,
  milestoneId: patientMilestonesFixture.id,
}

export const patientAlertMilestoneCompleteRequiredActionsFixture: Partial<PatientAlert> = {
  id: 3,
  uuid: 'CompleteRequiredActions',
  type: PatientAlertType.CompleteRequiredActions,
  patientId: milestoneDetailsPatientFixture.id,
  milestoneId: patientMilestonesFixture.id,
  appointmentId: appointmentForRequiredActionMilestoneFixture.id,
}

export const patientAlertQuestionnaireIntakeFixture: Partial<PatientAlert> = {
  id: 4,
  uuid: 'patientAlertQuestionnaireIntake',
  type: PatientAlertType.Questionnaire,
  patientId: milestoneDetailsPatientFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
}

export const patientAlertQuestionnaireFixture: Partial<PatientAlert> = {
  id: 5,
  uuid: 'patientAlertQuestionnaire',
  type: PatientAlertType.Questionnaire,
  patientId: patientQuestionnaireControllerFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
}

export const patientAlertQuestionnaireIntakeInProgressFixture: Partial<PatientAlert> = {
  id: 6,
  uuid: 'questionnaireIntakeAlertInProgress',
  type: PatientAlertType.Questionnaire,
  patientId: patientWithQuestionnaireIntentAnswersFixture.id,
  questionnaireId: questionnaireWithAnswersFixture.id,
}

export const patientAlertCommonQuestionnaireFixture: Partial<PatientAlert> = {
  id: 7,
  uuid: 'patientCommonAlertQuestionnaire',
  type: PatientAlertType.Questionnaire,
  patientId: patientForQuestionnaireFixture.id,
  questionnaireId: questionnaireForStaticAnswerConstraintFixture.id,
}

export const patientAlertUploadPhotoFixture: Partial<PatientAlert> = {
  id: 8,
  uuid: 'patientAlertUploadPhoto',
  type: PatientAlertType.UploadPhoto,
  patientId: milestoneDetailsPatientFixture.id,
}

export const patientAlertDismissibleFixture: Partial<PatientAlert> = {
  id: 9,
  uuid: 'b0906cca-124f-11ed-861d-0242ac120002',
  type: PatientAlertType.InvitePartners,
  patientId: milestoneDetailsPatientFixture.id,
}

export const patientAlertNotDismissibleFixture: Partial<PatientAlert> = {
  id: 10,
  uuid: 'b0906cca-124f-11ed-861d-0242ac120003',
  type: PatientAlertType.UploadPhoto,
  patientId: milestoneDetailsPatientFixture.id,
}

export const patientAlertConfirmRequiredActionFixture: Partial<PatientAlert> = {
  id: 11,
  uuid: 'b0906cca-124f-11ed-861d-0242ac120004',
  type: PatientAlertType.CompleteRequiredActions,
  patientId: milestonePatientFixture.id,
  milestoneId: patientMilestonesConfirmRequiredActionFixture.id,
}
export const patientJourneyAlertUploadPhotoFixture: Partial<PatientAlert> = {
  id: 13,
  uuid: 13 + 'b0906cca-124f-11ed-861d-0242ac1200',
  type: PatientAlertType.UploadPhoto,
  patientId: patientJourneyFixture.id,
}

export const patientEmailVerifiedInfoAlertFixture: Partial<PatientAlert> = {
  id: 14,
  uuid: 14 + 'b0906cca-124f-11ed-861d-0242ac1200',
  type: PatientAlertType.Info,
  patientId: patientEmailVerifiedFixture.id,
}

export const patientEmailVerifiedUploadPhotoAlertFixture: Partial<PatientAlert> = {
  id: 15,
  uuid: 15 + 'b0906cca-124f-11ed-861d-0242ac1200',
  type: PatientAlertType.UploadPhoto,
  patientId: patientEmailVerifiedFixture.id,
}

export const patientAlertMilestoneCompleteRequiredActionsDisabledFixture: Partial<PatientAlert> = {
  id: 16,
  uuid: 'CompleteRequiredActionsDisabled',
  type: PatientAlertType.CompleteRequiredActions,
  patientId: milestoneDetailsPatientFixture.id,
  milestoneId: patientMilestonesFixture.id,
  appointmentId: appointmentForRequiredActionMilestoneMoreThan72HoursFixture.id,
}

export const patientAlertMedicationsCheckoutFixture: Partial<PatientAlert> = {
  id: 17,
  uuid: '6bf44eff-9efd-4664-ab20-742b3e214942',
  type: PatientAlertType.MedicationsCheckout,
  patientId: milestoneDetailsPatientFixture.id,
  milestoneId: patientMilestonesFixture.id,
  appointmentId: appointmentForRequiredActionMilestoneMoreThan72HoursFixture.id,
  prescriptionId: patientPrescriptionForPDFCreationFixture.id,
}

export const patientAlertMedicationsCheckoutForRemoveFixture: Partial<PatientAlert> = {
  id: 18,
  uuid: '0bc1b318-afd5-4390-8f3b-4406b6544876',
  type: PatientAlertType.MedicationsCheckout,
  patientId: cartPatientFixture.id,
  milestoneId: patientMilestonesFixture.id,
  prescriptionId: patientPrescriptionForCreateCart.id,
}

export const patientAlertAppointmentCheckoutFixture: Partial<PatientAlert> = {
  id: 19,
  uuid: '0bc1b318-afd5-4390-8f3b-4406b6544899',
  type: PatientAlertType.AppointmentCheckout,
  patientId: milestoneDetailsPatientFixture.id,
  appointmentId: appointmentForPaymentAlertPendingFixture.id,
}

export const patientAlertForBookedAppointmentCheckoutFixture: Partial<PatientAlert> = {
  id: 20,
  uuid: '0bc1b318-afd5-4390-8f3b-4406b6544100',
  type: PatientAlertType.AppointmentCheckout,
  patientId: patientBookedAppointmentCartFixture.id,
  appointmentId: appointmentForBookedAppointmentCheckoutFixture.id,
}

export const patientAlertArchivePrescriptionFixture: Partial<PatientAlert> = {
  id: 21,
  uuid: 'b8873bc2-70f3-4597-ab46-7da064fd2dcd',
  type: PatientAlertType.MedicationsCheckout,
  patientId: patientEmailVerifiedFixture.id,
  appointmentId: appointmentForBookedAppointmentCheckoutFixture.id,
  prescriptionId: patientPrescriptionPrescribedStatusFixture.id,
}

export const patientAlertForOhipCoveredPayFixture: Partial<PatientAlert> = {
  id: 22,
  uuid: 'patientAppointmentCheckout',
  type: PatientAlertType.AppointmentCheckout,
  patientId: patientForProfileDoctorsFixture.id,
  appointmentId: appointmentForReferralWithOhipReferralRequiredFixture.id,
}

export const patientAlertForAdhocFixture: Partial<PatientAlert> = {
  id: 23,
  uuid: 'acf5f10f-6ae2-4cd5-83af-d60fe34216c5',
  type: PatientAlertType.AdhocCheckout,
  patientId: milestoneDetailsPatientFixture.id,
}

export const patientAlertForAdhocConfirmFixture: Partial<PatientAlert> = {
  id: 24,
  uuid: '2a75e77c-f948-46b0-a92a-31ca13a45297',
  type: PatientAlertType.AdhocCheckout,
  patientId: patientForAdhocPaymentFixture.id,
}

export const patientAlertIsTentativeFixture: Partial<PatientAlert> = {
  id: 25,
  uuid: '2a75e77c-f948-46b0-a92a-31ca13a45288',
  type: PatientAlertType.CompleteRequiredActions,
  patientId: milestoneDetailsPatientFixture.id,
  milestoneId: patientMilestonesFixture.id,
  appointmentId: appointmentForProcedureServiceTypeFixture.id,
}

export const patientAlertMilestonePaymentRequiredFixture: Partial<PatientAlert> = {
  id: 26,
  uuid: '7855014e-b6a5-4726-8386-2a384cddaaed',
  type: PatientAlertType.CompleteRequiredActions,
  patientId: milestoneDetailsPatientFixture.id,
  milestoneId: patientMilestonesFixture.id,
  appointmentId: appointmentForStimSheetWithoutEncounterLinkFixture.id,
}

export const patientAlertForBookedAppointmentCompleteRequiredFixture: Partial<PatientAlert> = {
  id: 27,
  uuid: '8eb0e175-2b0a-4923-9028-3f2d19ba26de',
  type: PatientAlertType.CompleteRequiredActions,
  patientId: patientBookedAppointmentCartFixture.id,
  appointmentId: appointmentForBookedAppointmentCheckoutFixture.id,
}

export const patientAlertForAdhocCheckoutTypeFixture: Partial<PatientAlert> = {
  id: 28,
  uuid: '8eb0e175-2b0a-4923-9028-3f2d19ba26bd',
  type: PatientAlertType.AdhocCheckout,
  patientId: patientWithQuestionnaireIntentAnswersFixture.id,
  appointmentId: appointmentForBookedAppointmentCheckoutFixture.id,
}

export const patientAlertForPatientForPatientUpdateForInvitePartnersFixture: Partial<PatientAlert> =
  {
    id: 30,
    uuid: 30 + '_PatientAlertUuid',
    type: PatientAlertType.InvitePartners,
    patientId: patientForPatientUpdateFixture.id,
  }

export const patientForPatientForPatientUpdateForInfoAlertFixture: Partial<PatientAlert> = {
  id: 31,
  uuid: 31 + '_PatientAlertUuid',
  type: PatientAlertType.Info,
  patientId: patientForPatientUpdateFixture.id,
}

export const patientAlertForPatientForPatientUpdateForUploadPhotoAlertFixture: Partial<PatientAlert> =
  {
    id: 32,
    uuid: 32 + '_PatientAlertUuid',
    type: PatientAlertType.UploadPhoto,
    patientId: patientForPatientUpdateFixture.id,
  }

export const patientReportDetailsFixture: Partial<PatientAlert> = {
  id: 33,
  uuid: '6822c5a8-d968-4b37-b130-51ddcf4e8633',
  type: PatientAlertType.FertilityIQ,
  patientId: milestoneDetailsPatientFixture.id,
  patientReportId: milestonePatientReportsFixture.id,
}

export const patientAlertForPlanDetailsFixture: Partial<PatientAlert> = {
  id: 34,
  uuid: 'c078c7ba-733c-41fb-9813-5983cd601db5',
  type: PatientAlertType.PlanDetails,
  patientId: milestoneDetailsPatientFixture.id,
  patientPlanId: patientPlanWireTransferFixture.id,
}

export const patientAlertForSoftDeletedPatientFixture: Partial<PatientAlert> = {
  id: 35,
  uuid: 'acf5f10f-6ae2-4cd5-83af-d60fe34216c7',
  type: PatientAlertType.AdhocCheckout,
  patientId: patientWithoutDoctorSoftDeletedFixture.id,
}

export const patientAlertForArchivedAdhocConfirmFixture: Partial<PatientAlert> = {
  id: 37,
  uuid: 37 + '75e77c-f948-46b0-a92a-31ca13a45297',
  type: PatientAlertType.AdhocCheckout,
  patientId: patientForArchivedAdhocPaymentFixture.id,
}

export const patientAlertForBillableItemsFixture: Partial<PatientAlert> = {
  id: 38,
  uuid: 38 + '75e77c-f948-46b0-a92a-31ca13a45297',
  type: PatientAlertType.AdhocCheckout,
  patientId: patientForLinkedBillsFixture.id,
}

export const patientAlertForAdhocCheckoutFixture: Partial<PatientAlert> = {
  id: 39,
  uuid: 39 + '75e77c-f948-46b0-a92a-31ca13a45297',
  type: PatientAlertType.AdhocCheckout,
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
}

export const patientAlertForAdhocCheckoutAppointmentFixture: Partial<PatientAlert> = {
  id: 40,
  uuid: 40 + '75e77c-f948-46b0-a92a-31ca13a45297',
  type: PatientAlertType.AppointmentCheckout,
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  appointmentId: appointmentForAdhocCheckoutFixture.id,
}

export const patientAlertForAdhocCheckoutPrescriptionFixture: Partial<PatientAlert> = {
  id: 41,
  uuid: 41 + '75e77c-f948-46b0-a92a-31ca13a45297',
  type: PatientAlertType.MedicationsCheckout,
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  prescriptionId: patientPrescriptionForAdhocCheckoutFixture.id,
}

export const patientAlertForPrescriptionCheckoutToDeleteFixture: Partial<PatientAlert> = {
  id: 42,
  uuid: 42 + '75e77c-f948-46b0-a92a-31ca13a45297',
  type: PatientAlertType.MedicationsCheckout,
  patientId: patientForPrescriptionUpdateFixture.id,
  prescriptionId: patientPrescriptionForDetailsExternalTypeFixture.id,
}
