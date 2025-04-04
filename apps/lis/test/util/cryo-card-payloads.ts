/* eslint-disable max-lines */
import {
  CreateContainerRequestDto,
  CryoCardCreateDto,
  CryoCardListDto,
  UpdateCryoCardDetailsRequestDTO,
} from '@apps/lis/cryo-cards/dto/cryo-cards.dto'
import {
  cryoDiscardFirstReasonFixture,
  mediaLotForUpdateCryoCardDetailsFixture,
  patientClinicEmrKimberlySFixture,
  reagentFixture,
  reagentForUpdateCryoCardDetailsEggFixture,
} from '@libs/common/test/fixtures'
import {
  cryoCaneCalculateCapacityFixture,
  cryoCaneCalculateCapacityThawedFixture,
  cryoCaneV2ForUpdateCryoCardDetailsFixture,
} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {cryoCanV2StrawFixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {
  cryoCardForCalculateCapacityFixture,
  cryoCardForEmbryoFixture,
  cryoCardForExternalSampleFixture,
  cryoCardForExternalSampleSpermFixture,
  cryoCardForUpdateCryoCardDetailsFixture,
} from '@libs/common/test/fixtures/cryo/cryo-inventory-card.fixture'
import {
  cryoSampleContainerEmbryoFixture,
  cryoSampleContainerExternalForSpermFixture,
  cryoSampleContainerForCalculateEndFixture,
  cryoSampleContainerForCalculateFixture,
  cryoSampleContainerForCalculateSecondFixture,
  cryoSampleContainerForCalculateThirdFixture,
  cryoSampleContainerForUpdateCryoCardDetailsFixture,
  cryoSampleContainerForUpdateCryoCardDetailsToBeDeletedFixture,
  cryoSampleContainerFrozenToLockLocationFixture,
} from '@libs/common/test/fixtures/cryo/cryo-sample-container.fixture'
import {
  CryoSampleType,
  SpermSampleType,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {DonorEligibility} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/donor-eligibility.enum'
import {v4 as uuidv4} from 'uuid'
import {ivfEmbryoGrade3BBFixture} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'

export const cryoCardCreatePayload: CryoCardCreateDto = {
  patientId: patientClinicEmrKimberlySFixture.uuid,
  collectionDate: '2000-02-05',
  receiveDate: '2000-02-05',
  cryoSampleType: CryoSampleType.Embryo,
  externalClinicName: 'Dyna',
}

export const cryoCardCreatePayloadWithEmbryo: UpdateCryoCardDetailsRequestDTO = {
  card: {
    id: cryoCardForEmbryoFixture.uuid,
    removedContainerIds: [],
    donor: {
      note: null,
      details: {
        isDonorPresent: true,
        donorNumber: null,
        bank: null,
        donorEligibility: null,
      },
    },
    mediaLot: {
      note: null,
      value: null,
    },
    reagent: {
      note: null,
      value: null,
    },
    external: {
      note: null,
      sample: {
        dateReceived: '2025-02-25',
        dateCollected: '2025-02-25',
        sourceClinicName: 'External Clinic Name',
      },
    },
    containers: [
      {
        id: cryoSampleContainerEmbryoFixture.uuid,
        externalIdentifier: cryoSampleContainerEmbryoFixture.externalIdentifier,
        freeze: {
          date: '2025-02-25',
          caneId: null,
          canId: null,
          witness: 'John Doe',
          comments: 'Freeze process completed successfully',
        },
        thaw: null,
        discard: null,
        sampleDetails: {
          type: CryoSampleType.Embryo,
          details: {
            grade: ivfEmbryoGrade3BBFixture.uuid,
          },
        },
      },
    ],
  },
}

export const cryoCardsListPayload: CryoCardListDto = {
  page: 1,
}

export const cryoCardsListSearchStringPayload: CryoCardListDto = {
  searchString: patientClinicEmrKimberlySFixture.firstName,
  page: 1,
}

export const cryoCardsListSearchStringWrongPatientPayload: CryoCardListDto = {
  searchString: 'wrongPatientName',
  page: 1,
}

export const cryoCardCreateFailurePayload: CryoCardCreateDto = {
  patientId: 'payloadFailId',
  collectionDate: '2000-02-05',
  cryoSampleType: CryoSampleType.Egg,
  receiveDate: '2000-02-05',
  externalClinicName: 'QWERTY',
}

export const cryoCardCreateReceivedExternallyPayload: CryoCardCreateDto = {
  patientId: patientClinicEmrKimberlySFixture.uuid,
  collectionDate: '2025-02-25',
  receiveDate: '2025-02-27',
  cryoSampleType: CryoSampleType.Sperm,
  externalClinicName: 'FonDanTain',
}

export const updateCryoCardDetailsRequestPayload: UpdateCryoCardDetailsRequestDTO = {
  card: {
    id: cryoCardForUpdateCryoCardDetailsFixture.uuid,
    donor: {
      details: {
        isDonorPresent: true,
        bank: 'bank to be updated',
        donorNumber: 'donor number to be updated',
        donorEligibility: DonorEligibility.NonEligible,
      },
      note: 'note for donor details',
    },
    mediaLot: {
      value: mediaLotForUpdateCryoCardDetailsFixture.uuid,
      note: null,
    },
    reagent: {
      value: reagentForUpdateCryoCardDetailsEggFixture.uuid,
      note: 'note for reagent',
    },
    external: {
      sample: {
        dateReceived: '2025-02-27',
        dateCollected: '2025-02-27',
        sourceClinicName: 'QWERTY',
      },
      note: 'note for external sample',
    },
    containers: [
      {
        id: cryoSampleContainerForUpdateCryoCardDetailsFixture.uuid,
        externalIdentifier: null,
        freeze: {
          date: '2024-02-15',
          witness: 'freeze witness from payload',
          comments: 'comments from payload',
          caneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.uuid,
          canId: cryoCanV2StrawFixture.uuid,
        },
        thaw: null,
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForUpdateCryoCardDetailsToBeDeletedFixture.uuid,
        externalIdentifier: null,
        freeze: {
          date: '2024-02-15',
          witness: 'freeze witness from payload',
          comments: 'comments from payload',
          caneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.uuid,
          canId: cryoCanV2StrawFixture.uuid,
        },
        thaw: null,
        sampleDetails: {type: CryoSampleType.Embryo, details: {eggsCount: 1}},
      },
    ],
    removedContainerIds: [],
  },
}

export const updateCryoCardDetailsForStrawToBeThawedRequestPayload: UpdateCryoCardDetailsRequestDTO =
  {
    card: {
      ...updateCryoCardDetailsRequestPayload.card,
      containers: [
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsFixture.uuid,
          externalIdentifier: null,
          freeze: null,
          thaw: {
            date: '2024-02-16',
            witness: 'thaw witness from payload',
            comments: 'comments from payload',
          },
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsToBeDeletedFixture.uuid,
          externalIdentifier: null,
          freeze: {
            date: '2024-02-15',
            witness: 'freeze witness from payload',
            comments: 'comments from payload',
            caneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.uuid,
            canId: cryoCanV2StrawFixture.uuid,
          },
          thaw: null,
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
      ],
      removedContainerIds: [],
    },
  }

export const updateCryoCardDetailsForStrawToBeDiscardedCannotDeletePayload: UpdateCryoCardDetailsRequestDTO =
  {
    card: {
      ...updateCryoCardDetailsRequestPayload.card,
      containers: [
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsFixture.uuid,
          externalIdentifier: null,

          freeze: null,
          discard: {
            date: '2024-02-17',
            witness: 'discard witness from payload',
            comments: 'comment',
            reasonId: uuidv4(),
          },
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
      ],
      removedContainerIds: [],
    },
  }

export const updateCryoCardDetailsForStrawToBeDiscardedRequestNotFoundPayload: UpdateCryoCardDetailsRequestDTO =
  {
    card: {
      ...updateCryoCardDetailsRequestPayload.card,
      external: {sample: null, note: null},
      containers: [
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsFixture.uuid,
          externalIdentifier: null,
          freeze: null,
          discard: {
            date: '2024-02-17',
            witness: 'discard witness from payload',
            comments: 'comment',
            reasonId: uuidv4(),
          },
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsToBeDeletedFixture.uuid,
          externalIdentifier: null,
          freeze: {
            date: '2024-02-15',
            witness: 'freeze witness from payload',
            comments: 'comments from payload',
            caneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.uuid,
            canId: cryoCanV2StrawFixture.uuid,
          },
          thaw: null,
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
      ],
      removedContainerIds: [],
    },
  }

export const discardComments = 'comments from payload'

export const updateCryoCardDetailsForStrawToBeDiscardedRequestPayload: UpdateCryoCardDetailsRequestDTO =
  {
    card: {
      ...updateCryoCardDetailsRequestPayload.card,
      containers: [
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsFixture.uuid,
          externalIdentifier: null,
          freeze: null,
          discard: {
            date: '2024-02-17',
            witness: 'discard witness from payload',
            comments: discardComments,
            reasonId: cryoDiscardFirstReasonFixture.uuid,
          },
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsToBeDeletedFixture.uuid,
          externalIdentifier: null,
          freeze: {
            date: '2024-02-15',
            witness: 'freeze witness from payload',
            comments: 'comments from payload',
            caneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.uuid,
            canId: cryoCanV2StrawFixture.uuid,
          },
          thaw: null,
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
      ],
      removedContainerIds: [],
    },
  }

export const updateCryoCardDetailsForStrawDiscardedToThawRequestPayload: UpdateCryoCardDetailsRequestDTO =
  {
    card: {
      ...updateCryoCardDetailsRequestPayload.card,
      containers: [
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsFixture.uuid,
          externalIdentifier: null,
          freeze: null,
          thaw: {
            date: '2024-05-19',
            witness: 'thaw witness from payload',
            comments: 'thaw fail',
          },
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerForUpdateCryoCardDetailsToBeDeletedFixture.uuid,
          externalIdentifier: null,
          freeze: {
            date: '2024-02-15',
            witness: 'freeze witness from payload',
            comments: 'comments from payload',
            caneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.uuid,
            canId: cryoCanV2StrawFixture.uuid,
          },
          thaw: null,
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
      ],
      removedContainerIds: [],
    },
  }

export const updateCryoCardDetailsCalculateRequestPayload: UpdateCryoCardDetailsRequestDTO = {
  card: {
    id: cryoCardForCalculateCapacityFixture.uuid,
    donor: {
      details: {
        isDonorPresent: true,
        bank: 'bank to be updated',
        donorNumber: 'donor number to be updated',
        donorEligibility: DonorEligibility.NonEligible,
      },
      note: 'note for donor details',
    },
    mediaLot: {
      value: mediaLotForUpdateCryoCardDetailsFixture.uuid,
      note: null,
    },
    reagent: {
      value: reagentForUpdateCryoCardDetailsEggFixture.uuid,
      note: 'note for reagent',
    },
    external: {sample: null},
    containers: [
      {
        id: cryoSampleContainerForCalculateFixture.uuid,
        externalIdentifier: null,
        freeze: {
          date: '2024-02-15',
          witness: 'freeze witness from payload',
          comments: 'comments from payload',
          caneId: cryoCaneCalculateCapacityFixture.uuid,
          canId: cryoCanV2StrawFixture.uuid,
        },
        thaw: null,
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerFrozenToLockLocationFixture.uuid,
        externalIdentifier: null,
        freeze: {
          date: '2024-02-15',
          witness: 'freeze witness from payload',
          comments: 'comments from payload',
          caneId: cryoCaneCalculateCapacityFixture.uuid,
          canId: cryoCanV2StrawFixture.uuid,
        },
        thaw: null,
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForCalculateSecondFixture.uuid,
        externalIdentifier: null,
        freeze: null,
        thaw: {
          date: '2024-02-15',
          witness: 'thaw witness from payload',
          comments: 'comments from payload',
        },
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForCalculateThirdFixture.uuid,
        externalIdentifier: null,
        freeze: null,
        thaw: {
          date: '2024-02-15',
          witness: 'thaw witness from payload',
          comments: 'comments from payload',
        },
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForCalculateEndFixture.uuid,
        externalIdentifier: null,
        freeze: null,
        thaw: {
          date: '2024-02-15',
          witness: 'thaw witness from payload',
          comments: 'comments from payload',
        },
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
    ],
    removedContainerIds: [],
  },
}

export const updateCryoCardDetailsCalculateTwoFrozenRequestPayload: UpdateCryoCardDetailsRequestDTO =
  {
    card: {
      id: cryoCardForCalculateCapacityFixture.uuid,
      donor: {
        details: {
          isDonorPresent: true,
          bank: 'bank to be updated',
          donorNumber: 'donor number to be updated',
          donorEligibility: DonorEligibility.NonEligible,
        },
        note: 'note for donor details',
      },
      mediaLot: {
        value: mediaLotForUpdateCryoCardDetailsFixture.uuid,
        note: null,
      },
      reagent: {
        value: reagentForUpdateCryoCardDetailsEggFixture.uuid,
        note: 'note for reagent',
      },
      external: {sample: null},
      containers: [
        {
          id: cryoSampleContainerForCalculateSecondFixture.uuid,
          externalIdentifier: null,
          freeze: null,
          thaw: {
            date: '2024-02-15',
            witness: 'thaw witness from payload',
            comments: 'comments from payload',
          },
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerFrozenToLockLocationFixture.uuid,
          externalIdentifier: null,
          freeze: {
            date: '2024-02-15',
            witness: 'freeze witness from payload',
            comments: 'comments from payload',
            caneId: cryoCaneCalculateCapacityFixture.uuid,
            canId: cryoCanV2StrawFixture.uuid,
          },
          thaw: null,
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerForCalculateEndFixture.uuid,
          externalIdentifier: null,
          freeze: null,
          thaw: {
            date: '2024-02-15',
            witness: 'thaw witness from payload',
            comments: 'comments from payload',
          },
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerForCalculateFixture.uuid,
          externalIdentifier: null,
          freeze: {
            date: '2024-02-15',
            witness: 'freeze witness from payload',
            comments: 'comments from payload',
            caneId: cryoCaneCalculateCapacityFixture.uuid,
            canId: cryoCanV2StrawFixture.uuid,
          },
          thaw: null,
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
        {
          id: cryoSampleContainerForCalculateThirdFixture.uuid,
          externalIdentifier: null,
          freeze: {
            date: '2024-02-15',
            witness: 'freeze witness from payload',
            comments: 'comments from payload',
            caneId: cryoCaneCalculateCapacityThawedFixture.uuid,
            canId: cryoCanV2StrawFixture.uuid,
          },
          thaw: null,
          sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
        },
      ],
      removedContainerIds: [],
    },
  }

export const updateCryoCardDetailsChangeLocationPayload: UpdateCryoCardDetailsRequestDTO = {
  card: {
    id: cryoCardForCalculateCapacityFixture.uuid,
    donor: {
      details: {
        isDonorPresent: true,
        bank: 'bank to be updated',
        donorNumber: 'donor number to be updated',
        donorEligibility: DonorEligibility.NonEligible,
      },
      note: 'note for donor details',
    },
    mediaLot: {
      value: mediaLotForUpdateCryoCardDetailsFixture.uuid,
      note: null,
    },
    reagent: {
      value: reagentForUpdateCryoCardDetailsEggFixture.uuid,
      note: 'note for reagent',
    },
    external: {sample: null},
    containers: [
      {
        id: cryoSampleContainerFrozenToLockLocationFixture.uuid,
        externalIdentifier: null,
        freeze: {
          date: '2024-02-15',
          witness: 'freeze witness from payload',
          comments: 'comments from payload',
          caneId: cryoCaneCalculateCapacityFixture.uuid,
          canId: cryoCanV2StrawFixture.uuid,
        },
        thaw: null,
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForCalculateFixture.uuid,
        externalIdentifier: null,
        freeze: {
          date: '2024-02-15',
          witness: 'freeze witness from payload',
          comments: 'comments from payload',
          caneId: cryoCaneCalculateCapacityFixture.uuid,
          canId: cryoCanV2StrawFixture.uuid,
        },
        thaw: null,
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForCalculateSecondFixture.uuid,
        externalIdentifier: null,
        freeze: null,
        thaw: {
          date: '2024-02-15',
          witness: 'thaw witness from payload',
          comments: 'comments from payload',
        },
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForCalculateThirdFixture.uuid,
        externalIdentifier: null,
        freeze: null,
        thaw: {
          date: '2024-02-15',
          witness: 'thaw witness from payload',
          comments: 'comments from payload',
        },
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
      {
        id: cryoSampleContainerForCalculateEndFixture.uuid,
        externalIdentifier: null,
        freeze: null,
        thaw: {
          date: '2024-02-15',
          witness: 'thaw witness from payload',
          comments: 'comments from payload',
        },
        sampleDetails: {type: CryoSampleType.Egg, details: {eggsCount: 1}},
      },
    ],
    removedContainerIds: [],
  },
}

export const saveCryoContainerRequestPayload: CreateContainerRequestDto = {
  cardId: cryoCardForExternalSampleFixture.uuid,
  cryoSampleType: CryoSampleType.Sperm,
}

export const saveCryoContainerFailedRequestPayload: CreateContainerRequestDto = {
  ...saveCryoContainerRequestPayload,
  cardId: 'NOT_FOUND',
}

export const updateCryoCardDetailsForSpermRequestPayload: UpdateCryoCardDetailsRequestDTO = {
  card: {
    id: cryoCardForExternalSampleSpermFixture.uuid,
    donor: {
      details: {
        isDonorPresent: true,
        bank: 'bank to be updated',
        donorNumber: 'donor number to be updated',
        donorEligibility: DonorEligibility.NonEligible,
      },
      note: 'note for donor details',
    },
    mediaLot: {
      value: mediaLotForUpdateCryoCardDetailsFixture.uuid,
      note: null,
    },
    reagent: {
      value: reagentFixture.uuid,
      note: 'note for reagent',
    },
    external: {
      sample: {
        dateReceived: '2025-03-05',
        dateCollected: '2025-03-05',
        sourceClinicName: 'QWERTY',
      },
      note: 'Note Sperm external sample type',
    },
    containers: [
      {
        id: cryoSampleContainerExternalForSpermFixture.uuid,
        externalIdentifier: 'WEEEWSSwww',
        freeze: {
          date: '2024-02-15',
          witness: 'freeze witness from payload',
          comments: 'comments from payload',
          caneId: cryoCaneV2ForUpdateCryoCardDetailsFixture.uuid,
          canId: cryoCanV2StrawFixture.uuid,
        },
        thaw: null,
        sampleDetails: {
          type: CryoSampleType.Sperm,
          details: {spermSampleType: SpermSampleType.Ejaculate},
        },
      },
    ],
    removedContainerIds: [],
  },
}
