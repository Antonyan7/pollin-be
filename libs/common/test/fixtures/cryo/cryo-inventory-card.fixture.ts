import {CryoInventoryCard} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {
  activeMediaLotForCreateCryoCardFixture,
  appointmentForCryoSemenCollectionFixture,
  appointmentForSpermCryoSemenCollectionFixture,
  patientClinicEmrKimberlySId,
  patientForDeletingStrawFutureFixture,
  patientForIVFTasks2Fixture,
  patientForMiiDay1CryoMaxDeletionFieldValidationFixture,
  patientForPlansV3Fixture,
  patientForStrawSelectionOocyteCollectionFixture,
  patientForStrawSelectionVisibilityFixture,
  patientToManuallySetCohortDateFixture,
  reagentFixture,
  reagentForEggFixture,
} from '@libs/common/test/fixtures'
import {CryoSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {
  ivfPatientFemaleFixture,
  patientEmailVerifiedFixture,
  patientForIVFTasks1Fixture,
  patientForPlanPartnerFixture,
  patientForTestResultAuthFixture,
} from '../patient.fixture'
import {cryoSampleDonorFixture} from './cryo-sample-donor.fixture'
import {
  cryoInventoryCardExternalSampleFixture,
  cryoInventoryCardExternalSpermSampleFixture,
} from './cryo-inventory-card-external-sample.fixture'

export const cryoInventoryCardForEggSampleFixture: Partial<CryoInventoryCard> = {
  id: 1,
  uuid: '243afec0-18b2-4d45-bd57-a1c7da468780',
  patientId: patientForIVFTasks1Fixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-02-15',
  cryoDonorId: cryoSampleDonorFixture.id,
}

export const cryoCardGetListFixture: Partial<CryoInventoryCard> = {
  id: 2,
  uuid: 'bedff075-de0e-41a2-8d42-20afc58f7889',
  mediaLotNote: 'medialotNote',
  reagentNote: 'reagentNote',
  reagentId: reagentFixture.id,
  mediaLotId: activeMediaLotForCreateCryoCardFixture.id,
  patientId: patientClinicEmrKimberlySId,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2025-01-06',
  cryoDonorId: cryoSampleDonorFixture.id,
}

export const cryoCardForUpdateCryoCardDetailsFixture: Partial<CryoInventoryCard> = {
  id: 3,
  uuid: '584fe584-19c4-4d93-8cad-385e70e910cc',
  patientId: patientClinicEmrKimberlySId,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
  reagentId: reagentForEggFixture.id,
}

export const cryoCardGetListFixtureWithFrozenSampleWithoutLocation: Partial<CryoInventoryCard> = {
  id: 4,
  uuid: '980e4b5b-99d8-488a-a966-0dfd9ed8fb83',
  mediaLotNote: 'medialotNote',
  reagentNote: 'reagentNote',
  reagentId: reagentFixture.id,
  mediaLotId: activeMediaLotForCreateCryoCardFixture.id,
  patientId: patientForIVFTasks2Fixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2025-01-06',
  cryoDonorId: cryoSampleDonorFixture.id,
}

export const cryoCardForCalculateCapacityFixture: Partial<CryoInventoryCard> = {
  id: 5,
  uuid: '48c2c965-377f-4dfd-b689-c0e6660dd2b6',
  patientId: patientClinicEmrKimberlySId,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForCreateStrawFixture: Partial<CryoInventoryCard> = {
  id: 6,
  uuid: 'f4d8faf0-6421-4f44-9f09-35dc5bf6a3c7',
  patientId: patientClinicEmrKimberlySId,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForAutomaticCardCreatedFixture: Partial<CryoInventoryCard> = {
  id: 7,
  uuid: 'ca679e06-7c94-44a1-b00f-029c247f952e',
  patientId: patientToManuallySetCohortDateFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForPatientPlansV3Fixture: Partial<CryoInventoryCard> = {
  id: 8,
  uuid: 'ca679e06-7c94-44a1-b00f-029c247f952f',
  patientId: patientForPlansV3Fixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForSpecimenEmbryosFixture: Partial<CryoInventoryCard> = {
  id: 9,
  uuid: '45c2c965-377f-4dfd-b689-a0e6660dd2b6',
  patientId: patientEmailVerifiedFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2022-01-17',
}

export const cryoCardForThawedStrawFixture: Partial<CryoInventoryCard> = {
  id: 10,
  uuid: 'f4d8faf0-2421-4f44-9f09-35dc5bf7a4a7',
  patientId: patientClinicEmrKimberlySId,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForEmbryosToTransferFixture: Partial<CryoInventoryCard> = {
  id: 11,
  uuid: 'a4d8faf0-2421-4f44-9f09-52dc5bf7a4a7',
  patientId: ivfPatientFemaleFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-01-17',
}

export const cryoCardForCreateStrawCanIdFixture: Partial<CryoInventoryCard> = {
  id: 12,
  uuid: 'f4d8faf0-6421-4f44-9f09-35dc5bf6a3c8',
  patientId: patientClinicEmrKimberlySId,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardWithPatientPlanFixture: Partial<CryoInventoryCard> = {
  id: 13,
  uuid: '3b883790-ea89-4817-8e00-015b881c2c7d',
  patientId: patientClinicEmrKimberlySId,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-01-17',
}

export const cryoCardForEggPatientPlansV3Fixture: Partial<CryoInventoryCard> = {
  id: 14,
  uuid: '23cc35d2-52f7-430a-8e8a-ba17c0d0853a',
  patientId: patientToManuallySetCohortDateFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}
export const cryoCardForEggPatientPlansWithEmptySampleV3Fixture: Partial<CryoInventoryCard> = {
  id: 16,
  uuid: 'd0a322b0-5e58-42ff-8fb3-bffaef30ecb7',
  patientId: patientToManuallySetCohortDateFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForEggThawFixture: Partial<CryoInventoryCard> = {
  id: 15,
  uuid: '9b90595e-8e1c-4dc9-b8ee-4000b8f548d9',
  patientId: patientClinicEmrKimberlySId,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForDeleteEmbryoFutureFixture: Partial<CryoInventoryCard> = {
  id: 17,
  uuid: '1d8419a3-f958-475f-8302-7aa82ac69c11',
  patientId: patientForDeletingStrawFutureFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-01-17',
}

export const cryoCardForGTResultFixture: Partial<CryoInventoryCard> = {
  id: 18,
  uuid: '2d8419a3-f958-475f-8302-7aa82ac69c12',
  patientId: patientForTestResultAuthFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-01-17',
}

export const cryoCardForStrawsAssignsMismatchFixture: Partial<CryoInventoryCard> = {
  id: 19,
  uuid: '75c7d469-dca0-431f-b117-10bc556a187c',
  patientId: ivfPatientFemaleFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-01-17',
}

export const cryoCardForBiopsyInTransitFixture: Partial<CryoInventoryCard> = {
  id: 20,
  uuid: '3d8419a3-f958-475f-8302-7aa82ac69c13',
  patientId: patientForPlanPartnerFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-01-17',
}

export const cryoCardForMaxDiscardedValidationFixture: Partial<CryoInventoryCard> = {
  id: 21,
  uuid: 'b2ba5270-b2ae-4c19-a485-63308174fa31',
  patientId: patientForMiiDay1CryoMaxDeletionFieldValidationFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-01-17',
}

export const cryoCardForExternalSampleFixture: Partial<CryoInventoryCard> = {
  id: 22,
  uuid: '9476e4b4-c59c-41f6-a692-f9451a1861fa',
  patientId: patientForTestResultAuthFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Sperm,
  collectionDate: '2025-02-26',
  mediaLotId: activeMediaLotForCreateCryoCardFixture.id,
  reagentId: reagentFixture.id,
  externalSampleId: cryoInventoryCardExternalSampleFixture.id,
}

export const cryoCardForThawedStrawSelectionFixture: Partial<CryoInventoryCard> = {
  id: 23,
  uuid: '4653e044-838a-4d37-b865-0ed2c919de25',
  patientId: patientForStrawSelectionVisibilityFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForExternalSampleSpermFixture: Partial<CryoInventoryCard> = {
  id: 24,
  uuid: '0176e4b4-c59c-41f6-a692-f9451a1861fa',
  patientId: patientForTestResultAuthFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Sperm,
  collectionDate: '2025-02-26',
  mediaLotId: activeMediaLotForCreateCryoCardFixture.id,
  externalSampleId: cryoInventoryCardExternalSpermSampleFixture.id,
}

export const cryoCardWithAppointmentAndSemenVerificationFormFixture: Partial<CryoInventoryCard> = {
  id: 25,
  uuid: '0db3cb00-744f-4754-8bd6-667dbad40499',
  patientId: patientForTestResultAuthFixture.id,
  appointmentId: appointmentForSpermCryoSemenCollectionFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Sperm,
  collectionDate: '2025-03-11',
  mediaLotId: activeMediaLotForCreateCryoCardFixture.id,
  reagentId: reagentFixture.id,
}

export const cryoCardForEmbryoFixture: Partial<CryoInventoryCard> = {
  id: 26,
  uuid: '8976e4b4-c59c-41f6-a692-f9451a1861fb',
  patientId: patientForTestResultAuthFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Embryo,
  collectionDate: '2024-03-20',
  mediaLotId: activeMediaLotForCreateCryoCardFixture.id,
}

export const cryoCardForStrawSelectionOocyteCollectionFixture: Partial<CryoInventoryCard> = {
  id: 27,
  uuid: '378e3505-2c84-41e3-932d-fe9eb8df446f',
  patientId: patientForStrawSelectionOocyteCollectionFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Egg,
  collectionDate: '2024-01-17',
}

export const cryoCardForInternalSampleFixture: Partial<CryoInventoryCard> = {
  id: 28,
  uuid: 'c245ae30-f917-427f-ab3d-a57254294e23',
  patientId: patientForTestResultAuthFixture.id,
  cryoDonorId: cryoSampleDonorFixture.id,
  sampleType: CryoSampleType.Sperm,
  collectionDate: '2025-02-26',
  mediaLotId: activeMediaLotForCreateCryoCardFixture.id,
  reagentId: reagentFixture.id,
  appointmentId: appointmentForCryoSemenCollectionFixture.id,
}
