import {PatientDoctor} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  patientBilling,
  patientForBackgroundInformationFixture,
  patientForProfileDoctorsFixture,
  patientForProfileHighlightFixture,
  patientToPushPaymentAlertFixture,
} from './patient.fixture'
import {PatientDoctorType} from '@libs/services-common/enums'

export const patientRefferingDoctorFixture: Partial<PatientDoctor> = {
  id: 1,
  patientId: patientForProfileDoctorsFixture.id,
  name: 'patientRefferingDoctorFixture',
  type: PatientDoctorType.Referring,
}

export const patientRefferingDoctorForGetInformationFixture: Partial<PatientDoctor> = {
  id: 2,
  patientId: patientToPushPaymentAlertFixture.id,
  type: PatientDoctorType.Referring,
  name: 'testName',
  email: 'testEmail',
  faxNumber: 'faxNumber',
  phoneNumber: 'testPhoneNumberRef',
}

export const patientFamilyDoctorForGetInformationFixture: Partial<PatientDoctor> = {
  id: 3,
  patientId: patientToPushPaymentAlertFixture.id,
  type: PatientDoctorType.Family,
  phoneNumber: 'testPhoneNumberFam',
  name: 'FamilyNameForGetInfo',
}

export const patientFamilyDoctorForGetHighlightFixture: Partial<PatientDoctor> = {
  id: 4,
  patientId: patientForProfileHighlightFixture.id,
  type: PatientDoctorType.Family,
  phoneNumber: 'testPhoneNumberFam',
  name: 'new James Doe',
}

export const patientReferringDoctorForGetHighlightFixture: Partial<PatientDoctor> = {
  id: 5,
  patientId: patientForProfileHighlightFixture.id,
  type: PatientDoctorType.Referring,
  phoneNumber: 'testPhoneNumberFam',
  name: 'new James Doe',
}

export const patientReferringDoctorSendClaimFixture: Partial<PatientDoctor> = {
  id: 6,
  patientId: patientBilling.id,
  type: PatientDoctorType.Referring,
  phoneNumber: 'testPhoneNumberFam',
  name: 'new James Doe',
  billingNumberForMdBilling: '1',
}

export const patientReferringForMBFixture: Partial<PatientDoctor> = {
  id: 8,
  patientId: patientForBackgroundInformationFixture.id,
  type: PatientDoctorType.Referring,
  phoneNumber: 'testPhoneNumberFam',
  name: 'new James Doe',
  billingNumberForMdBilling: '1',
}
