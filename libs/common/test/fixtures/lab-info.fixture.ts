import {LabInfo} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

import {LabInfoType, LabIntegrationCode} from '@libs/data-layer/apps/clinic-test/enums'

export const labInfoFixture: Partial<LabInfo> = {
  id: 14,
  uuid: '6d5bb10b-1117-4cdc-8705-63f1eecdd6d0',
  name: 'Laboratory Name',
  location: 'Address',
  phone: '+454545454545',
  type: LabInfoType.Internal,
}

export const labInfoSecondFixture: Partial<LabInfo> = {
  id: 15,
  uuid: '6d5bb10b-1117-4cdc-8705-63f1eecdd6d5',
  name: 'Second Laboratory Name 2',
  location: '2637 Yonge St Toronto, ON M4P 2J6',
  phone: '+454545454546',
}

export const labInfoThirdFixture: Partial<LabInfo> = {
  id: 16,
  uuid: '6d5bb10b-1117-4cdc-8705-63f1eecdd6d8',
  name: 'Laboratory Name 3',
  location: 'Address',
  phone: '+454545454548',
}

export const labInfoInHouseFixture: Partial<LabInfo> = {
  id: 17,
  uuid: '111bb10b-1117-4cdc-8705-63f1eecdd6d8',
  name: 'Laboratory Name 4',
  location: 'Address',
  phone: '+111545454548',
}

export const labInfoDynacareFixture: Partial<LabInfo> = {
  id: 18,
  uuid: '222bb10b-1117-4cdc-8705-63f1eecdd222',
  name: 'Dynacare',
  location: 'Address',
  phone: '+111545454548',
  integrationCode: LabIntegrationCode.Dynacare,
}

export const labInfoLifeLabsFixture: Partial<LabInfo> = {
  id: 19,
  uuid: '333bb10b-1117-4cdc-8705-63f1eecdd333',
  name: 'LifeLab',
  location: 'Address',
  phone: '+111545454548',
  integrationCode: LabIntegrationCode.LifelabsOntario,
}
