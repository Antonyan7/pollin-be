import {commonConfig} from '@config/common.configuration'
import {DateTimeUtil} from '@libs/common'
import {SemenVerificationForm} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  SemenSpecimenCollectionContainer,
  SemenSpecimenCollectionMethod,
  SemenSpecimenCollectionPurpose,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  patientForGetSpecimenDetailsFixture,
  patientForMaleIcFormFixture,
  patientPartnerForGetSpecimenDetailsFixture,
} from './patient.fixture'
import {serviceProviderFixture} from './service-provider.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)
const collectedOn: Date = dateTimeUtil.toDate('2023-07-17T03:24:00')

export const semenVerificationFormFixture: Partial<SemenVerificationForm> = {
  id: 1,
  uuid: '638fdfa3-423f-44f8-8327-4522fb63fac3',
  patientId: patientForMaleIcFormFixture.id,
  partnerFirstName: 'Partner First Name',
  partnerLastName: 'Partner Last Name',
  partnerDateOfBirth: dateTimeUtil.toDate('1994-01-01'),
  serviceProviderId: serviceProviderFixture.id,
  collectedOn: dateTimeUtil.now(),
  daysSinceLastEjaculation: '2 days',
  collectionPurpose: SemenSpecimenCollectionPurpose.FreshIVFCycle,
  collectionMethod: SemenSpecimenCollectionMethod.Masturbation,
  collectionContainer: SemenSpecimenCollectionContainer.SterileSpecimenCup,
  entireSampleCollected: true,
  illnessRecently: false,
  takingMedications: false,
  smokes: false,
  smokesComment: 'rarely',
  comment: 'comment',
  photoPath: 'imageUrl',
}

export const semenVerificationFormForSpecimenDetailsFixture: Partial<SemenVerificationForm> = {
  id: 2,
  uuid: '6ccf7337-78cc-41f2-8a00-ae515d7b2f63',
  patientId: patientForGetSpecimenDetailsFixture.id,
  partnerFirstName: patientPartnerForGetSpecimenDetailsFixture.firstName,
  partnerLastName: patientPartnerForGetSpecimenDetailsFixture.lastName,
  partnerDateOfBirth: patientPartnerForGetSpecimenDetailsFixture.dateOfBirth,
  serviceProviderId: serviceProviderFixture.id,
  collectedOn: collectedOn,
  daysSinceLastEjaculation: '2 days',
  collectionPurpose: SemenSpecimenCollectionPurpose.FreshIVFCycle,
  collectionMethod: SemenSpecimenCollectionMethod.Masturbation,
  collectionContainer: SemenSpecimenCollectionContainer.SterileSpecimenCup,
  entireSampleCollected: true,
  illnessRecently: false,
  takingMedications: false,
  smokes: false,
  smokesComment: 'rarely',
  comment: 'comment',
  photoPath: 'imageUrl',
}

export const semenVerificationFormForCreateCryoDetailsFixture: Partial<SemenVerificationForm> = {
  id: 3,
  uuid: 'cbca0124-fc8a-47f4-a60e-8fee537a162c',
  patientId: patientForGetSpecimenDetailsFixture.id,
  partnerFirstName: patientPartnerForGetSpecimenDetailsFixture.firstName,
  partnerLastName: patientPartnerForGetSpecimenDetailsFixture.lastName,
  partnerDateOfBirth: patientPartnerForGetSpecimenDetailsFixture.dateOfBirth,
  serviceProviderId: serviceProviderFixture.id,
  collectedOn: collectedOn,
  daysSinceLastEjaculation: '2 days',
  collectionPurpose: SemenSpecimenCollectionPurpose.FreshIVFCycle,
  collectionMethod: SemenSpecimenCollectionMethod.Masturbation,
  collectionContainer: SemenSpecimenCollectionContainer.SterileSpecimenCup,
  entireSampleCollected: true,
  illnessRecently: false,
  takingMedications: false,
  smokes: false,
  smokesComment: 'rarely',
  comment: 'comment',
  photoPath: 'imageUrl',
}

export const semenVerificationFormForCreateCryoDetailsV2Fixture: Partial<SemenVerificationForm> = {
  id: 4,
  uuid: 'ffca0124-fc8a-47f4-a60e-8fee537a162c',
  patientId: patientForGetSpecimenDetailsFixture.id,
  partnerFirstName: patientPartnerForGetSpecimenDetailsFixture.firstName,
  partnerLastName: patientPartnerForGetSpecimenDetailsFixture.lastName,
  partnerDateOfBirth: patientPartnerForGetSpecimenDetailsFixture.dateOfBirth,
  serviceProviderId: serviceProviderFixture.id,
  collectedOn: collectedOn,
  daysSinceLastEjaculation: '2 days',
  collectionPurpose: SemenSpecimenCollectionPurpose.FreshIVFCycle,
  collectionMethod: SemenSpecimenCollectionMethod.Masturbation,
  collectionContainer: SemenSpecimenCollectionContainer.SterileSpecimenCup,
  entireSampleCollected: true,
  illnessRecently: false,
  takingMedications: false,
  smokes: false,
  smokesComment: 'rarely',
  comment: 'comment',
  photoPath: 'imageUrl',
}
