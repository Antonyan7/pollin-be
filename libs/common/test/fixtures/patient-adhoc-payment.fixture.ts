import {PatientAdhocPayment, PatientAdhocType} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientAdhoc} from '@libs/services-common/enums/patient-adhoc.enum'
import {
  milestoneDetailsPatientFixture,
  patientEmailVerifiedFixture,
  patientForAdhocPaymentFixture,
  patientForArchivedAdhocPaymentFixture,
  patientForLinkedBillsFixture,
  patientForLinkedItemAdhocCheckoutFixture,
  patientWithoutDoctorSoftDeletedFixture,
  patientWithQuestionnaireIntentAnswersFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {staffClinicManagerFixture} from '@libs/common/test/fixtures/staff.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {
  patientAlertForAdhocCheckoutFixture,
  patientAlertForAdhocCheckoutTypeFixture,
  patientAlertForAdhocConfirmFixture,
  patientAlertForAdhocFixture,
  patientAlertForArchivedAdhocConfirmFixture,
  patientAlertForBillableItemsFixture,
  patientAlertForSoftDeletedPatientFixture,
} from '@libs/common/test/fixtures/patient-alert.fixture'
import {
  patientPlanAdhocCheckoutFixture,
  patientPlanWithAllBillsCreatedFixture,
  patientPlanWithLinkedBillsFixture,
  patientPlanWithoutLinkedBillsFixture,
} from './patient-plan.fixture'
import {
  appointmentForAdhocCheckoutFixture,
  appointmentForBillsNotPaidFixture,
} from './appointment.fixture'
import {
  patientPrescriptionForAdhocCheckoutFixture,
  patientPrescriptionForBillsFixture,
} from './patient-prescription.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)

export const patientAdhocPaymentForAlertFixtureId: number = 1
export const patientAdhocPaymentCheckoutFixtureId: number = 2
export const patientAdhocPaymentCreatedAt: Date = dateTimeUtil.toDate('2020-03-08T13:00:00')

export const patientAdhocPaymentForAlertFixture: Partial<PatientAdhocPayment> = {
  id: patientAdhocPaymentForAlertFixtureId,
  uuid: 'bf6b40bf-36f8-4f0a-819c-5221d46e67ca',
  patientId: milestoneDetailsPatientFixture.id,
  staffId: staffClinicManagerFixture.id,
  billableItemTitle: 'billableItemTitle',
  description: 'description',
  amount: '50',
  taxable: true,
  status: PatientAdhoc.Pending,
  createdAt: patientAdhocPaymentCreatedAt,
  patientAlertId: patientAlertForAdhocFixture.id,
  waivedAmount: '1.00',
  reasonForWaiving: '12312',
}

export const patientAdhocPaymentCheckoutFixture: Partial<PatientAdhocPayment> = {
  id: patientAdhocPaymentCheckoutFixtureId,
  uuid: 'f9ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForAdhocPaymentFixture.id,
  staffId: staffClinicManagerFixture.id,
  billableItemTitle: 'adhoc payments items',
  description: 'description',
  amount: '50.5',
  taxable: true,
  status: PatientAdhoc.Pending,
  createdAt: patientAdhocPaymentCreatedAt,
  patientAlertId: patientAlertForAdhocConfirmFixture.id,
}

export const patientAdhocPaidStatusFixture: Partial<PatientAdhocPayment> = {
  id: 3,
  uuid: '7e2ea8fd-b48a-4689-911b-77c9ad8016e3',
  patientId: patientEmailVerifiedFixture.id,
  staffId: staffClinicManagerFixture.id,
  billableItemTitle: 'adhoc payments items',
  description: 'description',
  amount: '50.5',
  taxable: true,
  status: PatientAdhoc.Paid,
  createdAt: patientAdhocPaymentCreatedAt,
  patientAlertId: patientAlertForAdhocConfirmFixture.id,
}

export const patientAdhocPaymentForArchivedFixture: Partial<PatientAdhocPayment> = {
  id: 4,
  uuid: 'bf6b40bf-36f8-4f0a-819c-5221d46e67c5',
  patientId: patientWithQuestionnaireIntentAnswersFixture.id,
  staffId: staffClinicManagerFixture.id,
  billableItemTitle: 'billableItemTitle',
  description: 'description',
  amount: '50',
  taxable: true,
  status: PatientAdhoc.Archived,
  createdAt: patientAdhocPaymentCreatedAt,
  patientAlertId: patientAlertForAdhocCheckoutTypeFixture.id,
}

export const patientAdhocPaymentForSoftDeletedPatientFixture: Partial<PatientAdhocPayment> = {
  id: 5,
  uuid: 'bf6b40bf-36f8-2f0b-812c-5221d46e67ca',
  patientId: patientWithoutDoctorSoftDeletedFixture.id,
  staffId: staffClinicManagerFixture.id,
  billableItemTitle: 'billableItemTitle',
  description: 'description',
  amount: '50',
  taxable: true,
  status: PatientAdhoc.Pending,
  createdAt: patientAdhocPaymentCreatedAt,
  patientAlertId: patientAlertForSoftDeletedPatientFixture.id,
}

export const patientAdhocPaymentArchivedFixture: Partial<PatientAdhocPayment> = {
  id: 7,
  uuid: 7 + '9ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForArchivedAdhocPaymentFixture.id,
  staffId: staffClinicManagerFixture.id,
  billableItemTitle: 'adhoc payments itemsArchived billableItemTitle',
  description: 'descriptionArch',
  amount: '50.5',
  taxable: true,
  status: PatientAdhoc.Archived,
  createdAt: patientAdhocPaymentCreatedAt,
  patientAlertId: patientAlertForArchivedAdhocConfirmFixture.id,
}

export const patientAdhocPaymentForPlanWithTwoBillsFixture: Partial<PatientAdhocPayment> = {
  id: 8,
  uuid: 8 + '9ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedBillsFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPlanId: patientPlanWithLinkedBillsFixture.id,
  amount: '100.12',
  taxable: false,
  status: PatientAdhoc.Paid,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Plan,
  waivedAmount: '55.17',
  patientAlertId: patientAlertForBillableItemsFixture.id,
}

export const patientAdhocPaymentForPlanWithTwoBillsWaivedFixture: Partial<PatientAdhocPayment> = {
  id: 9,
  uuid: 9 + '9ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedBillsFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPlanId: patientPlanWithLinkedBillsFixture.id,
  amount: '53.12',
  taxable: false,
  status: PatientAdhoc.Paid,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Plan,
  waivedAmount: '115.12',
  patientAlertId: patientAlertForBillableItemsFixture.id,
}

export const patientAdhocPaymentForPlanWithAllPriceCoveredFixture: Partial<PatientAdhocPayment> = {
  id: 10,
  uuid: 10 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedBillsFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPlanId: patientPlanWithAllBillsCreatedFixture.id,
  amount: patientPlanWithAllBillsCreatedFixture.totalAmount,
  taxable: false,
  status: PatientAdhoc.Paid,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Plan,
  waivedAmount: '0',
  patientAlertId: patientAlertForBillableItemsFixture.id,
}

export const patientAdhocPaymentForPlanWithAllBillsArchivedFixture: Partial<PatientAdhocPayment> = {
  id: 11,
  uuid: 11 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedBillsFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPlanId: patientPlanWithoutLinkedBillsFixture.id,
  amount: patientPlanWithoutLinkedBillsFixture.totalAmount,
  taxable: false,
  status: PatientAdhoc.Archived,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Plan,
  patientAlertId: patientAlertForBillableItemsFixture.id,
}

export const patientAdhocPaymentForAppointmentFixture: Partial<PatientAdhocPayment> = {
  id: 12,
  uuid: 12 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedBillsFixture.id,
  staffId: staffClinicManagerFixture.id,
  appointmentId: appointmentForBillsNotPaidFixture.id,
  amount: '10',
  taxable: false,
  status: PatientAdhoc.Paid,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Appointment,
  patientAlertId: patientAlertForBillableItemsFixture.id,
}

export const patientAdhocPaymentForAppointmentArchivedFixture: Partial<PatientAdhocPayment> = {
  id: 13,
  uuid: 13 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedBillsFixture.id,
  staffId: staffClinicManagerFixture.id,
  appointmentId: appointmentForBillsNotPaidFixture.id,
  amount: '10',
  taxable: false,
  status: PatientAdhoc.Archived,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Appointment,
  patientAlertId: patientAlertForBillableItemsFixture.id,
}

export const patientAdhocPaymentForPrescriptionFixture: Partial<PatientAdhocPayment> = {
  id: 14,
  uuid: 14 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedBillsFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPrescriptionId: patientPrescriptionForBillsFixture.id,
  amount: '22',
  taxable: false,
  status: PatientAdhoc.Paid,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Prescription,
  patientAlertId: patientAlertForBillableItemsFixture.id,
}

export const patientAdhocPaymentForAdhocCheckoutFixture: Partial<PatientAdhocPayment> = {
  id: 15,
  uuid: 15 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPlanId: patientPlanAdhocCheckoutFixture.id,
  amount: '100',
  waivedAmount: '0',
  taxable: false,
  billableItemTitle: 'patientAdhocPaymentForAdhocCheckoutFixture',
  status: PatientAdhoc.Pending,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Plan,
  patientAlertId: patientAlertForAdhocCheckoutFixture.id,
}

export const patientAdhocPaymentForAdhocCheckoutFinalFixture: Partial<PatientAdhocPayment> = {
  id: 16,
  uuid: 16 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPlanId: patientPlanAdhocCheckoutFixture.id,
  amount: '500.99',
  waivedAmount: '399.01',
  billableItemTitle: 'patientAdhocPaymentForAdhocCheckoutFinalFixture',
  taxable: false,
  status: PatientAdhoc.Pending,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Plan,
  patientAlertId: patientAlertForAdhocCheckoutFixture.id,
}

export const patientAdhocPaymentForAdhocCheckoutArchivedFixture: Partial<PatientAdhocPayment> = {
  id: 17,
  uuid: 17 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  staffId: staffClinicManagerFixture.id,
  patientPlanId: patientPlanAdhocCheckoutFixture.id,
  amount: '999',
  waivedAmount: '0',
  taxable: false,
  status: PatientAdhoc.Archived,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Plan,
  patientAlertId: patientAlertForAdhocCheckoutFixture.id,
}

export const patientAdhocPaymentForAppointmentAdhocCheckoutFixture: Partial<PatientAdhocPayment> = {
  id: 18,
  uuid: 18 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  staffId: staffClinicManagerFixture.id,
  appointmentId: appointmentForAdhocCheckoutFixture.id,
  amount: '100',
  waivedAmount: '0',
  taxable: false,
  billableItemTitle: 'patientAdhocPaymentForAppointmentAdhocCheckoutFixture',
  status: PatientAdhoc.Pending,
  createdAt: patientAdhocPaymentCreatedAt,
  type: PatientAdhocType.Appointment,
  patientAlertId: patientAlertForAdhocCheckoutFixture.id,
}

export const patientAdhocPaymentForPrescriptionAdhocCheckoutFixture: Partial<PatientAdhocPayment> =
  {
    id: 19,
    uuid: 19 + 'ce1a9b-0bf9-4c8a-aa02-836671ee4850',
    patientId: patientForLinkedItemAdhocCheckoutFixture.id,
    staffId: staffClinicManagerFixture.id,
    patientPrescriptionId: patientPrescriptionForAdhocCheckoutFixture.id,
    billableItemTitle: 'patientAdhocPaymentForPrescriptionAdhocCheckoutFixture',
    amount: '100',
    taxable: false,
    status: PatientAdhoc.Pending,
    createdAt: patientAdhocPaymentCreatedAt,
    type: PatientAdhocType.Prescription,
    patientAlertId: patientAlertForAdhocCheckoutFixture.id,
  }
