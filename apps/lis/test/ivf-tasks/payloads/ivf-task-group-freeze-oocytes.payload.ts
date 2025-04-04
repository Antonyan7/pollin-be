import {ivfTaskSummaryForFreezingOocytesFixture} from '@libs/common/test/fixtures'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {cryoCanV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {cryoCaneV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {cryoTankV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-tank-v2.fixture'
import {OocyteFreezing} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'

export const taskDetailsFreezingOocytesRemoveStraw = {
  matureOocytes: 7,
  immatureOocytes: 8,
  degenOocytes: 2,
  abnormalOocytes: 7,
  straws: [],
}

export const freezeOocytesSuccessResponsePayload = expect.objectContaining({
  id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
  uiid: IVFTaskType.OocyteFreezing,
  lastUpdateDetails: expect.any(String),
  details: {
    totalOocyteCollected: 24,
    immatureOocytes: 8,
    matureOocytes: 7,
    degenOocytes: 2,
    abnormalOocytes: 7,
    lastStrawNumber: 1,
    straws: [
      {
        id: expect.any(String),
        title: expect.stringMatching(/^Straw \d*/),
        identifier: expect.any(String),
        numberOfEggs: 3,
        details: {
          canId: cryoCanV2Fixture.uuid,
          caneId: cryoCaneV2Fixture.uuid,
          comments: 'test',
          freezeDate: '2029-02-24',
          freezeWitness: 'Test',
          tankId: cryoTankV2Fixture.uuid,
          status: CryoStatus.Frozen,
        },
      },
    ],
  },
})

export const taskDetailsFreezingOocytesRemoveStrawRequestPayload = {
  matureOocytes: 7,
  immatureOocytes: 8,
  degenOocytes: 2,
  abnormalOocytes: 7,
  straws: [],
}

export const taskDetailsFreezingOocytesWithStrawRequestPayload = {
  matureOocytes: 7,
  immatureOocytes: 8,
  degenOocytes: 2,
  abnormalOocytes: 7,
  lastStrawNumber: 1,
  straws: [
    {
      strawNumber: 1,
      numberOfEggs: 3,
      details: {
        freezeDate: '2029-02-24',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test',
        comments: 'test',
      },
    },
  ],
}

export const taskDetailsFreezingOocytesWithStrawToCheck = expect.objectContaining({
  id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
  uiid: IVFTaskType.OocyteFreezing,
  lastUpdateDetails: expect.any(String),
  details: {
    totalOocyteCollected: 24,
    immatureOocytes: 8,
    matureOocytes: 7,
    degenOocytes: 2,
    abnormalOocytes: 7,
    lastStrawNumber: 1,
    straws: [
      {
        id: expect.any(String),
        title: expect.stringMatching(/^Straw \d*/),
        identifier: expect.any(String),
        numberOfEggs: 3,
        details: {
          canId: cryoCanV2Fixture.uuid,
          caneId: cryoCaneV2Fixture.uuid,
          comments: 'test',
          freezeDate: '2029-02-24',
          freezeWitness: 'Test',
          tankId: cryoTankV2Fixture.uuid,
          status: CryoStatus.Frozen,
        },
      },
    ],
  },
})

export const taskDetailsFreezingOocytesEditedStrawRequestPayload = (
  immatureOocytes: number,
  degenOocytes: number,
): OocyteFreezing => ({
  matureOocytes: 7,
  immatureOocytes,
  degenOocytes,
  abnormalOocytes: 7,
  straws: [],
})

export const taskDetailsFreezingOocytesUpdatedStrawRequestPayload = (
  id: string,
  eggCount: number,
  matureOocytes = 7,
): OocyteFreezing => ({
  matureOocytes,
  immatureOocytes: 8,
  degenOocytes: 2,
  abnormalOocytes: 7,
  straws: [
    {
      strawNumber: 1,
      id,
      numberOfEggs: eggCount,
      details: {
        freezeDate: '2029-02-01',
        canId: cryoCanV2Fixture.uuid,
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test23',
        comments: 'tes3t23',
        status: CryoStatus.Frozen,
      },
    },
  ],
})

export const taskDetailsFreezingOocytesUpdatedWithoutCaneRequestPayload = (
  id: string,
  eggCount: number,
  matureOocytes = 7,
): OocyteFreezing => ({
  matureOocytes,
  immatureOocytes: 8,
  degenOocytes: 2,
  abnormalOocytes: 7,
  lastStrawNumber: 1,
  straws: [
    {
      strawNumber: 1,
      id,
      numberOfEggs: eggCount,
      details: {
        freezeDate: '2029-02-01',
        canId: null,
        caneId: null,
        freezeWitness: 'Test23',
        comments: 'tes3t23',
        status: CryoStatus.Frozen,
      },
    },
  ],
})

export const taskDetailsFreezingOocytesToCheck = expect.objectContaining({
  id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
  uiid: IVFTaskType.OocyteFreezing,
  lastUpdateDetails: expect.any(String),
  details: {
    immatureOocytes: 8,
    matureOocytes: 7,
    degenOocytes: 2,
    abnormalOocytes: 7,
    totalOocyteCollected: 24,
    straws: [
      {
        id: expect.any(String),
        title: expect.any(String),
        identifier: expect.stringMatching(/^O[0-9]+-[0-9]+-[0-9]+/g),
        numberOfEggs: 3,
        details: {
          canId: cryoCanV2Fixture.uuid,
          caneId: cryoCaneV2Fixture.uuid,
          comments: 'tes3t',
          freezeDate: '2029-02-25',
          freezeWitness: 'Test',
          tankId: cryoTankV2Fixture.uuid,
        },
      },
    ],
  },
})

export const taskDetailsFreezingOocytesUpdatedToCheck = expect.objectContaining({
  id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
  uiid: IVFTaskType.OocyteFreezing,
  lastUpdateDetails: expect.any(String),
  details: {
    immatureOocytes: 8,
    matureOocytes: 7,
    degenOocytes: 2,
    abnormalOocytes: 7,
    totalOocyteCollected: 24,
    lastStrawNumber: 1,
    straws: [
      {
        id: expect.any(String),
        title: expect.any(String),
        identifier: expect.stringMatching(/^O[0-9]+-[0-9]+-[0-9]+/g),
        numberOfEggs: 2,
        details: {
          canId: cryoCanV2Fixture.uuid,
          caneId: cryoCaneV2Fixture.uuid,
          freezeDate: '2029-02-01',
          freezeWitness: 'Test23',
          comments: 'tes3t23',
          tankId: cryoTankV2Fixture.uuid,
          status: CryoStatus.Frozen,
        },
      },
    ],
  },
})

export const taskDetailsAfterDeletionToCheck = expect.objectContaining({
  id: ivfTaskSummaryForFreezingOocytesFixture.uuid,
  uiid: IVFTaskType.OocyteFreezing,
  lastUpdateDetails: expect.any(String),
  details: {
    immatureOocytes: 8,
    matureOocytes: 7,
    degenOocytes: 2,
    abnormalOocytes: 7,
    totalOocyteCollected: 24,
    straws: [],
  },
})
