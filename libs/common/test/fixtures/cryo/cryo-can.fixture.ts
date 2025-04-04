/** @deprecated */
import {CryoCan} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'

export const cryoCanFixture: Partial<CryoCan> = {
  id: 1,
  uuid: '9bab9508-fcf2-4ef9-99b0-2ea543354a7a',
  name: 'Cryo Can',
}

export const cryoCanSecondFixture: Partial<CryoCan> = {
  id: 2,
  uuid: 'b9143891-02db-4b07-b365-b578f88050ce',
  name: 'Cryo Can 2',
}

export const cryoCanThirdFixture: Partial<CryoCan> = {
  id: 3,
  uuid: 'fc3ca380-ef6e-4aa9-a4c2-9a55b861e2e0',
  name: 'Cryo Can 3',
}
