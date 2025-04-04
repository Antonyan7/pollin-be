import {CryoDiscardReason} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'

export const cryoDiscardFirstReasonFixture: Partial<CryoDiscardReason> = {
  id: 1,
  uuid: '243afec0-18b2-4d45-bd57-a1c7da468781',
  reason: 'first reason',
}

export const cryoDiscardSecondReasonFixture: Partial<CryoDiscardReason> = {
  id: 2,
  uuid: 'a5406be0-b34c-44cb-bb71-ffb84f03c407',
  reason: 'second reason',
}
