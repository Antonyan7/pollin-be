/* eslint-disable max-lines */
import {CryoSampleContainer} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {
  cryoCaneCalculateCapacityFixture,
  cryoCaneCalculateCapacityThawedFixture,
  cryoCaneForCryoCardIVFDetailsFixture,
  cryoCaneV2Fixture,
  cryoCaneV2ForUpdateCryoCardDetailsFixture,
} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {
  cryoCardForAutomaticCardCreatedFixture,
  cryoCardForBiopsyInTransitFixture,
  cryoCardForCalculateCapacityFixture,
  cryoCardForDeleteEmbryoFutureFixture,
  cryoCardForEggPatientPlansV3Fixture,
  cryoCardForEggPatientPlansWithEmptySampleV3Fixture,
  cryoCardForEmbryoFixture,
  cryoCardForEmbryosToTransferFixture,
  cryoCardForExternalSampleFixture,
  cryoCardForExternalSampleSpermFixture,
  cryoCardForGTResultFixture,
  cryoCardForMaxDiscardedValidationFixture,
  cryoCardForPatientPlansV3Fixture,
  cryoCardForSpecimenEmbryosFixture,
  cryoCardForStrawSelectionOocyteCollectionFixture,
  cryoCardForThawedStrawFixture,
  cryoCardForThawedStrawSelectionFixture,
  cryoCardForUpdateCryoCardDetailsFixture,
  cryoCardGetListFixture,
  cryoCardGetListFixtureWithFrozenSampleWithoutLocation,
  cryoCardWithAppointmentAndSemenVerificationFormFixture,
  cryoInventoryCardForEggSampleFixture,
} from '@libs/common/test/fixtures/cryo/cryo-inventory-card.fixture'
import {
  specimenForBiopsyFixture,
  specimenForBiopsyInTransitFixture,
  specimenForGeneticTestsResultFixture,
  specimenForGetDetailsFixture,
  specimenWithEmbryoForTransportFixture,
} from '../specimen.fixture'
import {
  cryoCanForCryoCardIVFDetailsFixture,
  cryoCanV2StrawFixture,
} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'

export const cryoSampleContainerFixture: Partial<CryoSampleContainer> = {
  id: 1,
  uuid: '8dk4404i-8f12-603o-4596-879546b76c12',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier',
  thawWitness: 'thawWitness',
  freezeWitness: 'freezeWitness',
  thawComment: 'thawComment',
  freezeComment: 'freezeComment',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoCanId: cryoCanV2StrawFixture.id,
  cryoInventoryCardId: cryoCardGetListFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForUpdateCryoCardDetailsFixture: Partial<CryoSampleContainer> = {
  id: 2,
  uuid: '33k4404i-8f12-603o-4596-879546b7666',
  identifier: 'O24-33-1',
  status: CryoStatus.Frozen,
  cryoCaneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.id,
  cryoInventoryCardId: cryoCardForUpdateCryoCardDetailsFixture.id,
  freezeWitness: 'freeze witness',
  freezeComment: 'freeze comment',
  thawWitness: 'thaw witness from fixture',
  thawComment: 'thaw comment from fixture',
  eggCount: 2,
  strawNumber: 1,
}

export const cryoSampleContainerForUpdateCryoCardDetailsToBeDeletedFixture: Partial<CryoSampleContainer> =
  {
    id: 3,
    uuid: '9934404i-8f12-603o-4596-879546b7731',
    identifier: 'O24-33-2',
    status: CryoStatus.Frozen,
    cryoCaneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.id,
    cryoInventoryCardId: cryoCardForUpdateCryoCardDetailsFixture.id,
    strawNumber: 1,
  }

export const cryoSampleContainerGetInventoryListFixture: Partial<CryoSampleContainer> = {
  id: 4,
  uuid: 'f8ce4984-734e-4fa3-aae8-aa1923eefd6e',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier4',
  thawWitness: 'thawWitness4',
  freezeWitness: 'freezeWitness4',
  thawComment: 'thawComment4',
  freezeComment: 'freezeComment4',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoInventoryCardId: cryoCardGetListFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerGetInventoryListThawedFixture: Partial<CryoSampleContainer> = {
  id: 5,
  uuid: '4b617913-42a3-4092-8bda-10664ed16288',
  status: CryoStatus.Thawed,
  identifier: 'strawIdentifier5',
  thawWitness: 'thawWitness5',
  freezeWitness: 'freezeWitness5',
  thawComment: 'thawComment5',
  freezeComment: 'freezeComment5',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoInventoryCardId: cryoCardGetListFixture.id,
  strawNumber: 2,
}

export const cryoSampleContainerAlreadyExistingForCardFixture: Partial<CryoSampleContainer> = {
  id: 6,
  uuid: '8134404i-8f12-603o-4596-879546b7731',
  identifier: 'O24-1213-1',
  status: CryoStatus.Frozen,
  cryoCaneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.id,
  cryoInventoryCardId: cryoInventoryCardForEggSampleFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerFrozenWithoutLocationFixture: Partial<CryoSampleContainer> = {
  id: 7,
  uuid: '9d4b60d5-6b54-448a-ac89-ba80839888e2',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier7',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardGetListFixtureWithFrozenSampleWithoutLocation.id,
  strawNumber: 1,
}

export const cryoSampleContainerForCalculateFixture: Partial<CryoSampleContainer> = {
  id: 8,
  uuid: '0aa37b97-8cd4-4e4a-8b38-5e631f3b6c8f',
  status: CryoStatus.Thawed,
  identifier: 'O24-1213-7',
  cryoCaneId: cryoCaneCalculateCapacityFixture.id,
  cryoInventoryCardId: cryoCardForCalculateCapacityFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForCalculateSecondFixture: Partial<CryoSampleContainer> = {
  id: 9,
  uuid: '518a3acf-08d0-4844-8395-e6aa615b5857',
  status: CryoStatus.Thawed,
  identifier: 'O24-1213-8',
  cryoCaneId: cryoCaneCalculateCapacityFixture.id,
  cryoInventoryCardId: cryoCardForCalculateCapacityFixture.id,
  strawNumber: 3,
}

export const cryoSampleContainerForCalculateThirdFixture: Partial<CryoSampleContainer> = {
  id: 10,
  uuid: '704cbe12-c731-4a2c-8b1e-9be0ec6b6cac',
  status: CryoStatus.Thawed,
  identifier: 'O24-1213-9',
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForCalculateCapacityFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForCalculateEndFixture: Partial<CryoSampleContainer> = {
  id: 11,
  uuid: 'a38f9071-1fb3-44c3-9755-4c510bf99c84',
  status: CryoStatus.Thawed,
  identifier: 'O24-1213-10',
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForCalculateCapacityFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerTransferredFixture: Partial<CryoSampleContainer> = {
  id: 12,
  uuid: '9d4b60d5-6b54-448a-ac89-ba80839877cs',
  status: CryoStatus.Transferred,
  identifier: 'strawIdentifier10',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForThawedStrawFixture.id,
  strawNumber: 4,
}

export const cryoSampleContainerForMiiDayFixture: Partial<CryoSampleContainer> = {
  id: 13,
  uuid: '32086d59-415d-4d2c-82bd-03506b12d047',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier12',
  thawWitness: 'thawWitness12',
  freezeWitness: 'freezeWitness12',
  thawComment: 'thawComment12',
  freezeComment: 'freezeComment12',
  freezeDate: '2023-06-12',
  thawDate: '2023-08-12',
  eggCount: 2,
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoInventoryCardId: cryoCardGetListFixture.id,
  strawNumber: 4,
}

export const cryoSampleContainerForPlanComponentUpdate: Partial<CryoSampleContainer> = {
  id: 14,
  uuid: '3d650bae-90b4-4a36-b35e-a7a1f6f169e1',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier122',
  thawWitness: 'thawWitness12',
  freezeWitness: 'freezeWitness12',
  thawComment: 'thawComment12',
  freezeComment: 'freezeComment12',
  freezeDate: '2023-06-12',
  thawDate: '2023-08-12',
  eggCount: 2,
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoInventoryCardId: cryoCardForPatientPlansV3Fixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForPlanComponentUpdateSecondFixture: Partial<CryoSampleContainer> =
  {
    id: 15,
    uuid: 'b480caca-fd83-45a4-814c-9d3b0c9623a8',
    status: CryoStatus.Frozen,
    identifier: 'strawIdentifier1224',
    thawWitness: 'thawWitness12',
    freezeWitness: 'freezeWitness12',
    thawComment: 'thawComment12',
    freezeComment: 'freezeComment12',
    freezeDate: '2023-06-12',
    thawDate: '2023-08-12',
    eggCount: 2,
    cryoCaneId: cryoCaneV2Fixture.id,
    cryoInventoryCardId: cryoCardForPatientPlansV3Fixture.id,
    specimenId: specimenForBiopsyFixture.id,
    strawNumber: 1,
  }

export const cryoSampleContainerForEmbryoForTransportFixture: Partial<CryoSampleContainer> = {
  id: 16,
  uuid: 'a38f9071-1fb4-23c1-9755-4c510bf99c84',
  status: CryoStatus.Frozen,
  identifier: 'O24-1213-12',
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoInventoryCardId: cryoCardForSpecimenEmbryosFixture.id,
  specimenId: specimenWithEmbryoForTransportFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerFrozenToLockLocationFixture: Partial<CryoSampleContainer> = {
  id: 17,
  uuid: '9a4b60d5-6b54-448a-ac89-ba80839877cs',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier17',
  eggCount: 3,
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForCalculateCapacityFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForEmbryosToTransferFixture: Partial<CryoSampleContainer> = {
  id: 18,
  uuid: '9a4b60d5-ac52-443a-ac89-ba80839877cs',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier18',
  cryoCaneId: cryoCaneForCryoCardIVFDetailsFixture.id,
  cryoCanId: cryoCanForCryoCardIVFDetailsFixture.id,
  cryoInventoryCardId: cryoCardForEmbryosToTransferFixture.id,
  strawNumber: 1,
  freezeComment: 'freezeComment7',
  freezeWitness: 'freezeWitness',
  freezeDate: '2023-06-08',
}

export const cryoSampleContainerForIVFPlanCompletion1Fixture: Partial<CryoSampleContainer> = {
  id: 19,
  uuid: '3d650bae-90b4-4a36-b35e-a7a1f6f169e3',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier19',
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForEmbryosToTransferFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForIVFPlanCompletion2Fixture: Partial<CryoSampleContainer> = {
  id: 20,
  uuid: '3d650bae-90b4-4a36-b35e-a7a1f6f169e4',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier20',
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForEmbryosToTransferFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForIVFPlanCompletion3Fixture: Partial<CryoSampleContainer> = {
  id: 21,
  uuid: '3d650bae-90b4-4a36-b35e-a7a1f6f169e5',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier21',
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForEmbryosToTransferFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForInitialStrawFixture: Partial<CryoSampleContainer> = {
  id: 22,
  uuid: '3d650bae-90b4-4a36-b35e-a7a1f6f169e6',
  status: CryoStatus.Frozen,
  identifier: 'O24-1213-2',
  cryoCaneId: null,
  cryoInventoryCardId: cryoInventoryCardForEggSampleFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForEggThawFixture: Partial<CryoSampleContainer> = {
  id: 23,
  uuid: '1cf5873b-b0d9-4745-a904-82bcd0db2dc8',
  status: CryoStatus.Transferred,
  identifier: 'strawIdentifier11',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForThawedStrawFixture.id,
  strawNumber: 4,
}

export const cryoSampleContainerForEggPlanFixture: Partial<CryoSampleContainer> = {
  id: 25,
  uuid: '4b8e962a-8a05-4b26-94c6-4cef1f18dc53',
  status: CryoStatus.Frozen,
  identifier: 'O24-1213-3',
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForEggPatientPlansV3Fixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForEggWithoutPlanFixture: Partial<CryoSampleContainer> = {
  id: 24,
  uuid: '4ed20609-5e96-4884-a14e-2a8e0a5f813f',
  status: CryoStatus.Frozen,
  identifier: 'O24-1213-4',
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForAutomaticCardCreatedFixture.id,
  strawNumber: 2,
  eggCount: 3,
}

export const cryoSampleContainerForNotVisibleEmptySamplesFixture: Partial<CryoSampleContainer> = {
  id: 26,
  uuid: 'a34cc71f-c5a2-41d7-b1e7-d9dc7e8f229f',
  status: CryoStatus.Transferred,
  identifier: 'O24-1213-5',
  eggCount: 3,
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForEggPatientPlansWithEmptySampleV3Fixture.id,
  strawNumber: 5,
}

export const cryoSampleContainerForMiiDayForStrawDeleteFixture: Partial<CryoSampleContainer> = {
  id: 27,
  uuid: 'bcac2155-9dc8-43c0-81d0-97904fd8f76d',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier13',
  thawWitness: 'thawWitness12',
  freezeWitness: 'freezeWitness12',
  thawComment: 'thawComment12',
  freezeComment: 'freezeComment12',
  freezeDate: '2023-06-12',
  thawDate: '2023-08-12',
  eggCount: 2,
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoInventoryCardId: cryoCardGetListFixture.id,
  strawNumber: 4,
}
export const cryoSampleContainerForMiiDayForStrawDeleteFutureFixture: Partial<CryoSampleContainer> =
  {
    id: 28,
    uuid: 'fad3aef6-1d53-4bd7-a965-ac1c46520f50',
    status: CryoStatus.Frozen,
    identifier: 'strawIdentifier14',
    thawWitness: 'thawWitness12',
    freezeWitness: 'freezeWitness12',
    thawComment: 'thawComment12',
    freezeComment: 'freezeComment12',
    freezeDate: '2023-06-12',
    thawDate: '2023-08-12',
    eggCount: 2,
    cryoCaneId: cryoCaneV2Fixture.id,
    cryoInventoryCardId: cryoCardGetListFixture.id,
    strawNumber: 5,
  }

export const cryoSampleContainerForExpandedEmbryoDeletionFixture: Partial<CryoSampleContainer> = {
  id: 29,
  uuid: 'e1d4ec4a-50b0-4824-803c-8e5f0214dbbd',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier23',
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForDeleteEmbryoFutureFixture.id,
  strawNumber: 1,
}
export const cryoSampleContainerForExpandedEmbryoDeletionFutureFixture: Partial<CryoSampleContainer> =
  {
    id: 30,
    uuid: 'c837538d-00a2-4a46-b751-ced72776c685',
    status: CryoStatus.Frozen,
    identifier: 'strawIdentifier24',
    cryoCaneId: cryoCaneV2Fixture.id,
    cryoInventoryCardId: cryoCardForDeleteEmbryoFutureFixture.id,
    strawNumber: 1,
  }

export const cryoSampleContainerForGTResultFixture: Partial<CryoSampleContainer> = {
  id: 31,
  uuid: 'd837538d-00a2-4a46-b751-ced72776c686',
  status: CryoStatus.Frozen,
  identifier: 'E24-223-02',
  cryoCaneId: cryoCaneV2Fixture.id,
  cryoInventoryCardId: cryoCardForGTResultFixture.id,
  strawNumber: 1,
  specimenId: specimenForGeneticTestsResultFixture.id,
}

export const cryoSampleContainerForMiiDayForStrawsAssignsMismatchFixture: Partial<CryoSampleContainer> =
  {
    id: 32,
    uuid: '469ef8a7-25f0-4eb5-9d66-4fb3d2eddf51',
    status: CryoStatus.Frozen,
    identifier: 'strawIdentifier30',
    thawWitness: 'thawWitness12',
    freezeWitness: 'freezeWitness12',
    thawComment: 'thawComment12',
    freezeComment: 'freezeComment12',
    freezeDate: '2023-06-12',
    thawDate: '2023-08-12',
    eggCount: 10,
    cryoInventoryCardId: cryoCardGetListFixture.id,
    strawNumber: 4,
  }

export const cryoSampleContainerForBiopsyInTransitFixture: Partial<CryoSampleContainer> = {
  id: 33,
  uuid: 'e837538d-00a2-4a46-b751-ced72776c687',
  status: CryoStatus.Frozen,
  identifier: 'E25-224-01',
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForBiopsyInTransitFixture.id,
  strawNumber: 1,
  specimenId: specimenForBiopsyInTransitFixture.id,
}

export const cryoSampleContainerForMiiDayForMaxDiscardedValidationFixture: Partial<CryoSampleContainer> =
  {
    id: 34,
    uuid: '033cbf44-a051-47a0-91e0-15873331b260',
    status: CryoStatus.Frozen,
    identifier: 'strawIdentifier59',
    thawWitness: 'thawWitness12',
    freezeWitness: 'freezeWitness12',
    thawComment: 'thawComment12',
    freezeComment: 'freezeComment12',
    freezeDate: '2023-06-12',
    thawDate: '2023-08-12',
    eggCount: 10,
    cryoInventoryCardId: cryoCardForMaxDiscardedValidationFixture.id,
    strawNumber: 4,
  }

export const cryoSampleContainerForEggThawStrawSelectionFixture: Partial<CryoSampleContainer> = {
  id: 35,
  uuid: '80078a9e-9692-4136-8e66-3b218030cce2',
  status: CryoStatus.Thawed,
  identifier: 'strawIdentifier57',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForThawedStrawSelectionFixture.id,
  strawNumber: 4,
}

export const cryoSampleContainerForEggThawStrawSelection2Fixture: Partial<CryoSampleContainer> = {
  id: 36,
  uuid: '3715a819-ecae-4f56-ab9f-d0413629e6ff',
  status: CryoStatus.Thawed,
  identifier: 'strawIdentifier58',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForThawedStrawSelectionFixture.id,
  strawNumber: 4,
}

export const cryoSampleContainerForSpermFixture: Partial<CryoSampleContainer> = {
  id: 37,
  uuid: 'k14b60d5-6b54-448a-ac89-ba80839877np',
  status: CryoStatus.Transferred,
  identifier: 'strawIdentifier99',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2025-03-01',
  thawDate: '2025-03-01',
  eggCount: 1,
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForExternalSampleFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerExternalForSpermFixture: Partial<CryoSampleContainer> = {
  id: 38,
  uuid: 'v34b60d5-6b54-448a-ac89-ba80839877np',
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier100',
  externalIdentifier: 'wertyuwert',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2025-03-05',
  thawDate: '2025-03-05',
  eggCount: 1,
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  cryoInventoryCardId: cryoCardForExternalSampleSpermFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForSpermSampleFixture: Partial<CryoSampleContainer> = {
  id: 39,
  uuid: 'k14b60d5-6b54-448a-ac89-ba80839877pe',
  cryoInventoryCardId: cryoCardWithAppointmentAndSemenVerificationFormFixture.id,
  specimenId: specimenForGetDetailsFixture.id,
  status: CryoStatus.Frozen,
  identifier: 'strawIdentifier139',
  externalIdentifier: 'wertyuwertd',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2025-03-11',
  thawDate: '2025-03-11',
  eggCount: 1,
  cryoCaneId: cryoCaneCalculateCapacityThawedFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerEmbryoFixture: Partial<CryoSampleContainer> = {
  id: 40,
  uuid: 'w44b60d5-6b54-448a-ac89-ba80839878ns',
  status: CryoStatus.Frozen,
  identifier: 'EmbryoIDWithGrade',
  externalIdentifier: 'ExternalEmbryoIDWithGrade',
  thawWitness: null,
  freezeWitness: 'freezeWitness7',
  thawComment: null,
  freezeComment: 'freezeComment7',
  freezeDate: '2025-03-05',
  thawDate: null,
  eggCount: null,
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForEmbryoFixture.id,
  strawNumber: 1,
}

export const cryoSampleContainerForOocyteCollectionFixture: Partial<CryoSampleContainer> = {
  id: 41,
  uuid: 'ac53a05c-6f52-435e-aed8-25bd352c3802',
  status: CryoStatus.Thawed,
  identifier: 'strawIdentifier80',
  thawWitness: 'thawWitness7',
  freezeWitness: 'freezeWitness7',
  thawComment: 'thawComment7',
  freezeComment: 'freezeComment7',
  freezeDate: '2023-06-08',
  thawDate: '2023-08-08',
  eggCount: 3,
  cryoCaneId: null,
  cryoInventoryCardId: cryoCardForStrawSelectionOocyteCollectionFixture.id,
  strawNumber: 4,
}
