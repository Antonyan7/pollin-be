import {PlanLabInstruction} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanLabInstructionType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'

export const planInstructionFreezeEggFixture: Partial<PlanLabInstruction> = {
  id: 1,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d79',
  sequence: 2,
  text: 'freezeEggInstructionFixture',
  type: PlanLabInstructionType.EggFreeze,
}

export const planInstructionFreezeEggOrderFixture: Partial<PlanLabInstruction> = {
  id: 2,
  uuid: '226c619f-8d03-4660-a147-c4dcee193d79',
  sequence: 1,
  text: 'freezeEggInstructionForOrderFixture',
  type: PlanLabInstructionType.EggFreeze,
}

export const planInstructionFreezeEmbryoFixture: Partial<PlanLabInstruction> = {
  id: 3,
  uuid: '316c619f-8d03-4660-a147-c4dcee193d79',
  sequence: 1,
  text: 'planInstructionFreezeEmbryoFixture',
  type: PlanLabInstructionType.EmbryoTransferAndCryo,
}

export const planInstructionFETFixture: Partial<PlanLabInstruction> = {
  id: 4,
  uuid: '326c119f-8d03-4660-a147-c4dcee193d79',
  sequence: 1,
  text: 'planInstructionFETFixture',
  type: PlanLabInstructionType.FrozenEmbryoTransfer,
}

export const planInstructionIVFRetrievalOrderFixture: Partial<PlanLabInstruction> = {
  id: 5,
  uuid: '226c119f-8d03-4660-a147-c4dcee193d79',
  sequence: 1,
  text: 'planInstructionIVFRetrievalOrderFixture',
  type: PlanLabInstructionType.IVFRetrievalOrder,
}

export const planInstructionFETForIVFUpdatesFixture: Partial<PlanLabInstruction> = {
  id: 6,
  uuid: '336c229f-8d23-4660-a147-c4dcee193d79',
  sequence: 3,
  text: 'planInstructionFETForIVFUpdatesFixture',
  type: PlanLabInstructionType.FrozenEmbryoTransfer,
}

export const planInstructionRetrievalForIVFUpdatesFixture: Partial<PlanLabInstruction> = {
  id: 7,
  uuid: '326c129f-8d03-4660-a247-c4dcee193d79',
  sequence: 10,
  text: 'planInstructionRetrievalForIVFUpdatedFixture',
  type: PlanLabInstructionType.IVFRetrievalOrder,
}
