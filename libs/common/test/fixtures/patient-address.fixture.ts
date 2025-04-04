import {PatientAddressType} from '@libs/services-common/enums/patient.enum'
import {
  patientEmailVerifiedFixture,
  patientForGetContactInformation,
  patientForPatientUpdateFixture,
  patientForProfileHighlightFixture,
  patientForUltrasoundFixture,
  patientJourneyFixture,
  patientPartnerForProfileFixture,
  patientPlanCartFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {PatientAddress} from '@libs/data-layer/apps/users/entities/typeorm/patient-address.entity'

export const patientAddressFixture: Partial<PatientAddress> = {
  id: 1,
  patientId: patientEmailVerifiedFixture.id,
  type: PatientAddressType.Primary,
  country: 'patientAddressCountry',
  province: 'PatientAddressProvince',
  city: 'PatientAddressCity',
  postalCode: 'PatientAddressPostalCode',
  streetAddress: 'PatientAddressStreetAddress',
  unitNumber: 'PatientAddressUnitNumber',
}
export const patientAddressMailingFixture: Partial<PatientAddress> = {
  patientId: patientEmailVerifiedFixture.id,
  type: PatientAddressType.Mailing,
  country: 'patientAddressMailingCountry',
  province: 'patientAddressMailingProvince',
  city: 'patientAddressMailingCity',
  postalCode: 'patientAddressMailingPostalCode',
  streetAddress: 'patientAddressMailingStreetAddress',
  unitNumber: 'patientAddressMailingUnitNumber',
}

export const patientAddressMailingUpdateFixture: Partial<PatientAddress> = {
  country: 'patientAddressMailingCountry',
  province: 'patientAddressMailingProvince',
  city: 'patientAddressMailingCity',
  postalCode: 'patientAddressMailingPostalCode',
  streetAddress: 'patientAddressMailingStreetAddress',
  unitNumber: 'patientAddressMailingUnitNumber',
}
export const updatedPatientAddressFixture: Partial<PatientAddress> = {
  country: 'UpdatedPatientAddressCountry',
  province: 'UpdatedPatientAddressProvince',
  city: 'UpdatedPatientAddressCity',
  postalCode: 'UpdatedPatientAddressPostalCode',
  streetAddress: 'UpdatedPatientAddressStreetAddress',
}
export const patientJourneyPrimaryAddressFixture: Partial<PatientAddress> = {
  id: 3,
  patientId: patientJourneyFixture.id,
  type: PatientAddressType.Primary,
  country: 'patientAddressPrimaryCountry',
  province: 'PatientAddressPrimaryProvince',
  city: 'PatientAddressPrimaryCity',
  postalCode: 'PatientAddressPrimaryPostalCode',
  streetAddress: 'PatientAddressPrimaryStreetAddress',
  unitNumber: 'PatientAddressPrimaryUnitNumber',
}
export const patientJourneyMailingAddressFixture: Partial<PatientAddress> = {
  id: 4,
  patientId: patientJourneyFixture.id,
  type: PatientAddressType.Mailing,
  country: 'patientAddressMailingCountry',
  province: 'PatientAddressMailingProvince',
  city: 'PatientAddressMailingCity',
  postalCode: 'PatientAddressMailingPostalCode',
  streetAddress: 'PatientAddressMailingStreetAddress',
  unitNumber: 'PatientAddressMailingUnitNumber',
}
export const patientContactInfoPrimaryAddressMailingAddressFixture: Partial<PatientAddress> = {
  id: 5,
  patientId: patientForGetContactInformation.id,
  type: PatientAddressType.Primary,
  country: 'ContactInfoPrimaryCountry',
  province: 'ContactInfoPrimaryProvince',
  city: 'ContactInfoPrimaryCity',
  postalCode: 'ContactInfoPrimaryPostalCode',
  streetAddress: 'ContactInfoPrimaryStreetAddress',
  unitNumber: 'ContactInfoPrimaryUnitNumber',
}

export const patientContactInfoMailingAddressMailingAddressFixture: Partial<PatientAddress> = {
  id: 6,
  patientId: patientForGetContactInformation.id,
  type: PatientAddressType.Mailing,
  country: 'ContactInfoMailingCountry',
  province: 'ContactInfoMailingProvince',
  city: 'ContactInfoMailingCity',
  postalCode: 'ContactInfoMailingPostalCode',
  streetAddress: 'ContactInfoMailingStreetAddress',
  unitNumber: 'ContactInfoMailingUnitNumber',
}

export const patientPrimaryAddressForGetProfileFixture: Partial<PatientAddress> = {
  id: 7,
  patientId: patientPartnerForProfileFixture.id,
  type: PatientAddressType.Primary,
  country: 'ContactInfoPrimaryCountry',
  province: 'ContactInfoPrimaryProvince',
  city: 'ContactInfoPrimaryCity',
  postalCode: 'ContactInfoPrimaryPostalCode',
  streetAddress: 'ContactInfoPrimaryStreetAddress',
  unitNumber: 'ContactInfoPrimaryUnitNumber',
}

export const patientMailingAddressForGetProfileFixture: Partial<PatientAddress> = {
  id: 8,
  patientId: patientPartnerForProfileFixture.id,
  type: PatientAddressType.Mailing,
  country: 'ContactInfoPrimaryCountry',
  province: 'ContactInfoPrimaryProvince',
  city: 'ContactInfoPrimaryCity',
  postalCode: 'ContactInfoPrimaryPostalCode',
  streetAddress: 'ContactInfoPrimaryStreetAddress',
  unitNumber: 'ContactInfoPrimaryUnitNumber',
}
export const patientForUltrasoundPrimaryFixture: Partial<PatientAddress> = {
  id: 9,
  patientId: patientForUltrasoundFixture.id,
  type: PatientAddressType.Primary,
  country: 'ContactInfoPrimaryCountry',
  province: 'ContactInfoPrimaryProvince',
  city: 'ContactInfoPrimaryCity',
  postalCode: 'ContactInfoPrimaryPostalCode',
  streetAddress: 'ContactInfoPrimaryStreetAddress',
  unitNumber: 'ContactInfoPrimaryUnitNumber',
}

export const patientAddressForGetProfileFixture: Partial<PatientAddress> = {
  id: 10,
  patientId: patientForProfileHighlightFixture.id,
  type: PatientAddressType.Primary,
  country: 'patientAddressCountry',
  province: 'PatientAddressProvince',
  city: 'PatientAddressCity',
  postalCode: 'PatientAddressPostalCode',
  streetAddress: 'PatientAddressStreetAddress',
  unitNumber: null,
}

export const patientAddressPlanCartProfileFixture: Partial<PatientAddress> = {
  id: 11,
  patientId: patientPlanCartFixture.id,
  type: PatientAddressType.Primary,
  country: 'patientAddressCountry',
  province: 'PatientAddressProvince',
  city: 'PatientAddressCity',
  postalCode: 'PatientAddressPostalCode',
  streetAddress: 'PatientAddressStreetAddress',
  unitNumber: null,
}

export const patientAddressForPatientUpdateFixture: Partial<PatientAddress> = {
  id: 13,
  patientId: patientForPatientUpdateFixture.id,
  type: PatientAddressType.Primary,
  country: 'patientAddressCountryDd2',
  province: 'PatientAddressProvinceDd2',
  city: 'PatientAddressCityDd2',
  postalCode: 'PatientAddressPostalCodeDd2',
  streetAddress: 'PatientAddressStreetAddressDd2',
  unitNumber: 'PatientAddressUnitNumberDd2',
}
export const patientAddressMailingForPatientUpdateFixture: Partial<PatientAddress> = {
  patientId: patientForPatientUpdateFixture.id,
  type: PatientAddressType.Mailing,
  country: 'patientAddressMailingCountryDd2',
  province: 'patientAddressMailingProvinceDd2',
  city: 'patientAddressMailingCityDd2',
  postalCode: 'patientAddressMailingPostalCodeDd2',
  streetAddress: 'patientAddressMailingStreetAddressDd2',
  unitNumber: 'patientAddressMailingUnitNumberDd2',
}
