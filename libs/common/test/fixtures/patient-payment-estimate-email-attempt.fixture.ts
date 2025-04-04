import {PatientPaymentEstimateEmailAttempt} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {PatientPaymentEstimateEmailAttemptStatus} from '@libs/data-layer/apps/clinic-billing/enum/patient-payment-estimate-email-attempt-status.enum'
import {
  patientPaymentEstimateForListFixture,
  patientPaymentEstimateToSendFixture,
} from './patient-payment-estimate.fixture'
import {staffUserFixture} from './staff.fixture'
import {DateTimeUtil} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientPaymentEstimateEmailAttemptForListFixture: Partial<PatientPaymentEstimateEmailAttempt> =
  {
    id: 1,
    uuid: 1 + '23e4567-e89b-12d3-a456-426614174000',
    patientPaymentEstimateId: patientPaymentEstimateForListFixture.id,
    status: PatientPaymentEstimateEmailAttemptStatus.Failed,
    sentByStaffId: staffUserFixture.id,
    createdAt: dateTimeUtil.toDate('2020-01-01'),
    statusCallbackReceivedOn: dateTimeUtil.toDate('2020-01-01'),
  }

export const patientPaymentEstimateEmailAttemptFailedFixture: Partial<PatientPaymentEstimateEmailAttempt> =
  {
    id: 2,
    uuid: 2 + '23e4567-e89b-12d3-a456-426614174000',
    patientPaymentEstimateId: patientPaymentEstimateForListFixture.id,
    status: PatientPaymentEstimateEmailAttemptStatus.Failed,
    sentByStaffId: staffUserFixture.id,
    createdAt: dateTimeUtil.toDate('2024-01-01'),
    statusCallbackReceivedOn: dateTimeUtil.toDate('2024-01-01'),
  }

export const patientPaymentEstimateEmailAttemptLatestFixture: Partial<PatientPaymentEstimateEmailAttempt> =
  {
    id: 3,
    uuid: 3 + '23e4567-e89b-12d3-a456-426614174000',
    patientPaymentEstimateId: patientPaymentEstimateForListFixture.id,
    status: PatientPaymentEstimateEmailAttemptStatus.InProgress,
    sentByStaffId: staffUserFixture.id,
    createdAt: dateTimeUtil.toDate('2025-01-01'),
    statusCallbackReceivedOn: dateTimeUtil.toDate('2025-01-01'),
  }

export const patientPaymentEstimateEmailAttemptToHideFixture: Partial<PatientPaymentEstimateEmailAttempt> =
  {
    id: 4,
    uuid: 4 + '23e4567-e89b-12d3-a456-426614174000',
    patientPaymentEstimateId: patientPaymentEstimateForListFixture.id,
    status: PatientPaymentEstimateEmailAttemptStatus.Failed,
    sentByStaffId: staffUserFixture.id,
    createdAt: dateTimeUtil.toDate('2015-01-01'),
    statusCallbackReceivedOn: dateTimeUtil.toDate('2015-01-01'),
  }

export const patientPaymentEstimateEmailAttemptToSendInProgressFixture: Partial<PatientPaymentEstimateEmailAttempt> =
  {
    id: 5,
    uuid: 5 + '23e4567-e89b-12d3-a456-426614174000',
    patientPaymentEstimateId: patientPaymentEstimateToSendFixture.id,
    status: PatientPaymentEstimateEmailAttemptStatus.InProgress,
    sentByStaffId: staffUserFixture.id,
    createdAt: dateTimeUtil.toDate('2015-01-01'),
    statusCallbackReceivedOn: null,
    emailIdFromProvider: null,
  }

export const patientPaymentEstimateEmailAttemptToSendSentFixture: Partial<PatientPaymentEstimateEmailAttempt> =
  {
    id: 6,
    uuid: 6 + '23e4567-e89b-12d3-a456-426614174000',
    patientPaymentEstimateId: patientPaymentEstimateToSendFixture.id,
    status: PatientPaymentEstimateEmailAttemptStatus.Sent,
    sentByStaffId: staffUserFixture.id,
    createdAt: dateTimeUtil.toDate('2015-01-01'),
    statusCallbackReceivedOn: dateTimeUtil.toDate('2015-01-01'),
    emailIdFromProvider: '6',
  }
