import {Pharmacy} from '@libs/data-layer/apps/users/entities/typeorm/pharmacy.entity'

export const pharmacyFixture: Partial<Pharmacy> = {
  id: 1,
  name: 'Pharmacy Fixture name',
}

export const pharmacyOfPatientForPrescriptionFileCreationFixture: Partial<Pharmacy> = {
  id: 2,
  name: 'Pharmacy Fixture name',
  unit: 'Unit 20-579',
  street: 'Liberty St.',
  province: 'Ontario',
  city: 'Toronto, ON',
  country: 'Canada',
  postalCode: 'M8H 6U3',
  phoneNumber: '(647) 000-1234',
}

export const pharmacyForBackgroundInformationFixture: Partial<Pharmacy> = {
  id: 3,
  name: 'Pharmacy name 3',
  unit: 'Unit 20-579',
  street: 'Liberty St.',
  province: 'Ontario',
  city: 'Toronto, ON',
  country: 'Canada',
  postalCode: 'M8H 6U3',
  phoneNumber: '(647) 000-1234',
}

export const pharmacyPatientForPrescriptionFixture: Partial<Pharmacy> = {
  id: 4,
}

export const pharmacyForPrescriptionDetailsFixture: Partial<Pharmacy> = {
  id: 5,
  name: 'Pharmacy Fixture name',
  unit: 'Unit 20-579',
  street: 'Liberty St.',
  province: 'Ontario',
  city: 'Toronto, ON',
  country: 'Canada',
  postalCode: 'M8H 6U3',
  phoneNumber: '(647) 000-1234',
  faxNumber: '(647) 000-1234',
}

export const pharmacyForPrescriptionUpdateFixture: Partial<Pharmacy> = {
  id: 6,
  name: 'Pharmacy Prescription Update',
  unit: 'Unit 20-579',
  street: 'Liberty St.',
  province: 'Ontario',
  city: 'Toronto, ON',
  country: 'Canada',
  postalCode: 'M8H 6U3',
  phoneNumber: '(647) 000-1234',
  faxNumber: '(647) 000-1234',
}
