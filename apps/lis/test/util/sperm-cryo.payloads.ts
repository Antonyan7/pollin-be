import {
  specimenForCreateCryoVialsFixture,
  specimenForCreateCryoVialsV2Fixture,
} from '@libs/common/test/fixtures/specimen.fixture'
import {DonorEligibility} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/donor-eligibility.enum'
import {
  activeMediaLotForCreateDetailsFixture,
  cryoCaneFixture,
  cryoCanFixture,
  cryoTankFixture,
  reagentDMSOFixture,
} from '@libs/common/test/fixtures'
import {SpermSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/sperm-sample.enum'
import {CryoVialStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums/cryo-vial-status.enum'
import {
  SpermCryoVial,
  UpdateSpermCryoDetailsRequestBodyV2,
} from '@apps/lis/sperm-cryo/dto/sperm-cryo.dto'

export const createSpermCryoPayload = {
  specimenCryo: {
    specimenId: specimenForCreateCryoVialsFixture.uuid,
    donor: {
      isDonorSperm: 'No',
      donorNumber: 'updatedDonorNumber',
      bank: null,
      donorEligibility: DonorEligibility.NonEligible,
      note: 'NewNoteDonor',
    },
    mediaLot: {value: activeMediaLotForCreateDetailsFixture.uuid, note: 'newNoteMediaLot'},
    reagent: {value: reagentDMSOFixture.uuid, note: 'newNoteReagent'},
    vials: [
      {
        identifier: specimenForCreateCryoVialsFixture.specimenIdentifier,
        status: CryoVialStatus.Frozen,
        freeze: {
          date: '2023-08-22',
          sampleTypeId: SpermSampleType.Ejaculate,
          tankId: cryoTankFixture.uuid,
          canId: cryoCanFixture.uuid,
          caneId: cryoCaneFixture.uuid,
          witness: 'Witness',
          //comment with 300 character
          comments:
            'comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_com',
        },
      },
    ],
  },
}

export const createSpermCryoPayloadFailCase = {
  specimenCryo: {
    specimenId: specimenForCreateCryoVialsFixture.uuid,
    donor: {
      isDonorSperm: 'No',
      donorNumber: 'updatedDonorNumber',
      bank: 'updatedBank',
      donorEligibility: DonorEligibility.NonEligible,
      note: 'hey',
    },
    mediaLot: {value: activeMediaLotForCreateDetailsFixture.uuid, note: null},
    reagent: {value: reagentDMSOFixture.uuid, note: null},
    vials: [
      {
        identifier: specimenForCreateCryoVialsFixture.specimenIdentifier,
        status: CryoVialStatus.Frozen,
        freeze: {
          date: '2023-08-22',
          sampleTypeId: SpermSampleType.Ejaculate,
          tankId: cryoTankFixture.uuid,
          canId: cryoCanFixture.uuid,
          caneId: cryoCaneFixture.uuid,
          witness: 'Witness',
          //comment with more then 300 character
          comments:
            'comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character_comment_with_300_character',
        },
      },
    ],
  },
}

export const createSpermCryoPayloadForV2: UpdateSpermCryoDetailsRequestBodyV2 = {
  specimenCryo: {
    specimenId: specimenForCreateCryoVialsV2Fixture.uuid,
    donor: {
      isDonorSperm: 'No',
      donorNumber: null,
      bank: null,
      donorEligibility: null,
      note: null,
    },
    mediaLot: {value: activeMediaLotForCreateDetailsFixture.uuid, note: 'new note for medialot'},
    reagent: {value: reagentDMSOFixture.uuid, note: 'new note for reagent'},
    vials: [
      {
        identifier: specimenForCreateCryoVialsV2Fixture.specimenIdentifier,
        status: CryoVialStatus.Frozen,
        freeze: {
          date: '2023-08-22',
          sampleTypeId: SpermSampleType.Ejaculate,
          tankId: cryoTankFixture.uuid,
          canId: cryoCanFixture.uuid,
          caneId: cryoCaneFixture.uuid,
          witness: 'Witness',
          comments: 'comment',
        },
      } as SpermCryoVial,
    ],
  },
}
