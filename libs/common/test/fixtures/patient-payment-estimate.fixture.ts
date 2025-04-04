import {PatientPaymentEstimate} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {
  patientForBackgroundInformationFixture,
  patientForEstimatesFixture,
  patientForProfileHighlightFixture,
} from './patient.fixture'
import {DateTimeUtil} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientPaymentEstimateForListFixture: Partial<PatientPaymentEstimate> = {
  id: 1,
  uuid: 1 + '23e4567-e89b-12d3-a456-426614174000',
  identifier: 'P1',
  patientId: patientForEstimatesFixture.id,
  fileURL: 'https://example.com/payment-estimate.pdf',
  createdAt: dateTimeUtil.toDate('2299-01-01'),
}

export const patientPaymentEstimateForListWithoutEmailAttemptsFixture: Partial<PatientPaymentEstimate> =
  {
    id: 2,
    uuid: 2 + '23e4567-e89b-12d3-a456-426614174000',
    identifier: 'P2',
    patientId: patientForProfileHighlightFixture.id,
    fileURL: 'https://example.com/payment-estimate.pdf',
    createdAt: dateTimeUtil.toDate('2300-01-01'),
  }

export const patientPaymentEstimateToSendFixture: Partial<PatientPaymentEstimate> = {
  id: 3,
  uuid: 3 + '23e4567-e89b-12d3-a456-426614174000',
  patientId: patientForBackgroundInformationFixture.id,
  fileURL: 'https://example.com/payment-estimate.pdf',
}
