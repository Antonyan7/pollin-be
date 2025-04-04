import {PatientReferral} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientToPushPaymentAlertFixture} from './patient.fixture'

export const patientReferralForGetDoctorInformationFixture: Partial<PatientReferral> = {
  id: 1,
  patientId: patientToPushPaymentAlertFixture.id,
  title: 'title',
  uuid: '1651cf57-2a3f-47d7-8790-c771fa1e3345',
  url: 'url',
}
