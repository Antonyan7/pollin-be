/** @deprecated */
import {CryoTank} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'

export const cryoTankFixture: Partial<CryoTank> = {
  id: 1,
  uuid: '4ea0ed7d-82b5-11ed-b47d-45010aa2000d',
  name: 'Cryo Tank',
}

export const cryoTankSecondFixture: Partial<CryoTank> = {
  id: 2,
  uuid: '8ffbb180-43b4-420e-9889-636d24092755',
  name: 'Cryo Tank 2',
}

export const cryoTankThirdFixture: Partial<CryoTank> = {
  id: 3,
  uuid: '6455bc97-a0cf-4d3b-95dd-b95205e8bd98',
  name: 'Cryo Tank 3',
}
